    {{{each othergroups}}}
    <div class="col-lg-4 col-md-6 col-sm-12" component="groups/summary" data-slug="{othergroups.slug}">
        <div class="panel panel-default">
            <a href="{config.relative_path}/groups/{othergroups.slug}" class="panel-heading list-cover" style="<!-- IF othergroups.cover:thumb:url -->background-image: url({othergroups.cover:thumb:url});<!-- ENDIF othergroups.cover:thumb:url -->">
                <h3 class="panel-title">{othergroups.displayName} <small>{othergroups.memberCount}</small></h3>
            </a>
            <div class="panel-body">
                <ul class="members">
                    {{{each othergroups.members}}}
                    <li>
                        <a href="{config.relative_path}/user/{othergroups.members.userslug}">{buildAvatar(othergroups.members, "sm", true)}</a>
                    </li>
                    {{{end}}}
                    <!-- IF othergroups.truncated -->
                    <li class="truncated"><i class="fa fa-ellipsis-h"></i></li>
                    <!-- ENDIF othergroups.truncated -->
                </ul>
            </div>
        </div>
    </div>
    {{{end}}}