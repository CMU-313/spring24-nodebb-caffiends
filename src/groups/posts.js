"use strict";

const assert = require("assert");
const db = require("../database");
const groups = require(".");
const privileges = require("../privileges");
const posts = require("../posts");

module.exports = function (Groups) {
    // onNewPostMade: (postData: object) => void
    Groups.onNewPostMade = async function (postData) {
        assert(typeof postData === "object");
        if (!parseInt(postData.uid, 10)) {
            return;
        }
        if (postData.classLabel === "") {
            let groupNames = await Groups.getUserGroupMembership(
                "groups:visible:createtime",
                [postData.uid],
            );
            groupNames = groupNames[0];

            // Only process those groups that have the cid in its memberPostCids setting (or no setting at all)
            const groupData = await groups.getGroupsFields(groupNames, [
                "memberPostCids",
            ]);
            groupNames = groupNames.filter(
                (groupName, idx) =>
                    !groupData[idx].memberPostCidsArray.length ||
                    groupData[idx].memberPostCidsArray.includes(postData.cid),
            );

            const keys = groupNames.map(
                (groupName) => `group:${groupName}:member:pids`,
            );
            await db.sortedSetsAdd(keys, postData.timestamp, postData.pid);
            await Promise.all(
                groupNames.map((name) => truncateMemberPosts(name)),
            );
        } else {
            const groupName = postData.classLabel;
            const key = `group:${groupName}:member:pids`;
            await db.sortedSetAdd(key, postData.timestamp, postData.pid);
            await Promise.all([truncateMemberPosts(groupName)]);
        }
    };

    async function truncateMemberPosts(groupName) {
        let lastPid = await db.getSortedSetRevRange(
            `group:${groupName}:member:pids`,
            10,
            10,
        );
        lastPid = lastPid[0];
        if (!parseInt(lastPid, 10)) {
            return;
        }
        const score = await db.sortedSetScore(
            `group:${groupName}:member:pids`,
            lastPid,
        );
        await db.sortedSetsRemoveRangeByScore(
            [`group:${groupName}:member:pids`],
            "-inf",
            score,
        );
    }

    Groups.getLatestMemberPosts = async function (groupName, max, uid) {
        let pids = await db.getSortedSetRevRange(
            `group:${groupName}:member:pids`,
            0,
            max - 1,
        );
        pids = await privileges.posts.filter("topics:read", pids, uid);
        return await posts.getPostSummaryByPids(pids, uid, {
            stripTags: false,
        });
    };
};
