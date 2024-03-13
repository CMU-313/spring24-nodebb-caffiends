"use strict";

const validator = require("validator");
const nconf = require("nconf");

const meta = require("../meta");
const groups = require("../groups");
const user = require("../user");
const helpers = require("./helpers");
const pagination = require("../pagination");
const privileges = require("../privileges");
// const user = require('../user');
const accountHelpers = require("./accounts/helpers");

const groupsController = module.exports;

groupsController.list = async function (req, res) {
    let groupData;
    let othergroupData;

    const sort = req.query.sort || "alpha";

    const userslug = await user.getUserField(req.uid, "userslug");
    const userData = await accountHelpers.getUserDataByUserSlug(
        userslug,
        req.uid,
        req.query,
    );
    if (!userData) {
        groupData = await groups.getGroupsBySort(sort, 0, 14);
    } else {
        groupData = await groups.getUserGroups([userData.uid]);
        groupData = groupData[0];
        const groupNames = groupData.filter(Boolean).map((group) => group.name);
        const groupmembers = await groups.getMemberUsers(groupNames, 0, 3);
        groupData.forEach((group, index) => {
            group.members = groupmembers[index];
        });

        othergroupData = await groups.getUserOtherGroups([userData.uid]);
        othergroupData = othergroupData[0];
        const othergroupNames = othergroupData
            .filter(Boolean)
            .map((group) => group.name);
        const othergroupmembers = await groups.getMemberUsers(
            othergroupNames,
            0,
            3,
        );
        groupData.forEach((group, index) => {
            othergroupData.members = othergroupmembers[index];
        });
    }
    const allowGroupCreation = await privileges.global.can(
        "group:create",
        req.uid,
    );

    res.render("groups/list", {
        groups: groupData,
        othergroups: othergroupData, // new
        allowGroupCreation: allowGroupCreation,
        nextStart: 15,
        title: "[[pages:groups]]",
        breadcrumbs: helpers.buildBreadcrumbs([{ text: "[[pages:groups]]" }]),
    });
};

groupsController.details = async function (req, res, next) {
    const lowercaseSlug = req.params.slug.toLowerCase();

    if (req.params.slug !== lowercaseSlug) {
        if (res.locals.isAPI) {
            req.params.slug = lowercaseSlug;
        } else {
            return res.redirect(
                `${nconf.get("relative_path")}/groups/${lowercaseSlug}`,
            );
        }
    }
    const groupName = await groups.getGroupNameByGroupSlug(req.params.slug);
    if (!groupName) {
        return next();
    }
    const [exists, isHidden, isAdmin, isGlobalMod] = await Promise.all([
        groups.exists(groupName),
        groups.isHidden(groupName),
        user.isAdministrator(req.uid),
        user.isGlobalModerator(req.uid),
    ]);
    if (!exists) {
        return next();
    }
    if (isHidden && !isAdmin && !isGlobalMod) {
        const [isMember, isInvited] = await Promise.all([
            groups.isMember(req.uid, groupName),
            groups.isInvited(req.uid, groupName),
        ]);
        if (!isMember && !isInvited) {
            return next();
        }
    }
    const [groupData, posts] = await Promise.all([
        groups.get(groupName, {
            uid: req.uid,
            truncateUserList: true,
            userListCount: 20,
        }),
        groups.getLatestMemberPosts(groupName, 10, req.uid),
    ]);
    if (!groupData) {
        return next();
    }
    groupData.isOwner =
        groupData.isOwner || isAdmin || (isGlobalMod && !groupData.system);

    res.render("groups/details", {
        title: `[[pages:group, ${groupData.displayName}]]`,
        group: groupData,
        posts: posts,
        isAdmin: isAdmin,
        isGlobalMod: isGlobalMod,
        allowPrivateGroups: meta.config.allowPrivateGroups,
        breadcrumbs: helpers.buildBreadcrumbs([
            { text: "[[pages:groups]]", url: "/groups" },
            { text: groupData.displayName },
        ]),
    });
};

groupsController.members = async function (req, res, next) {
    const page = parseInt(req.query.page, 10) || 1;
    const usersPerPage = 50;
    const start = Math.max(0, (page - 1) * usersPerPage);
    const stop = start + usersPerPage - 1;
    const groupName = await groups.getGroupNameByGroupSlug(req.params.slug);
    if (!groupName) {
        return next();
    }
    const [groupData, isAdminOrGlobalMod, isMember, isHidden] =
        await Promise.all([
            groups.getGroupData(groupName),
            user.isAdminOrGlobalMod(req.uid),
            groups.isMember(req.uid, groupName),
            groups.isHidden(groupName),
        ]);

    if (isHidden && !isMember && !isAdminOrGlobalMod) {
        return next();
    }
    const users = await user.getUsersFromSet(
        `group:${groupName}:members`,
        req.uid,
        start,
        stop,
    );

    const breadcrumbs = helpers.buildBreadcrumbs([
        { text: "[[pages:groups]]", url: "/groups" },
        {
            text: validator.escape(String(groupName)),
            url: `/groups/${req.params.slug}`,
        },
        { text: "[[groups:details.members]]" },
    ]);

    const pageCount = Math.max(
        1,
        Math.ceil(groupData.memberCount / usersPerPage),
    );
    res.render("groups/members", {
        users: users,
        pagination: pagination.create(page, pageCount, req.query),
        breadcrumbs: breadcrumbs,
    });
};
