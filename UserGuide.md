### Kate Lee Documentation

The feature I worked on is filtering the main Groups page into two different subsections called My Groups and Other Groups. This was deemed a useful feature, as if a user sees all groups that exists on nodebb in one big page (i.e. a CMU student seeing all CMU classes to currently exist on nodebb), it is very hard for the user to find the groups they actually want to see, which are the groups that they are a part of. In My Groups, the user should see the groups that they are a member of, and in Other Groups should be all the other groups that the user is not a part of. Clicking on the groups themselves acts the same way as it did previously, leading the user to the page specific to the group.

### A user can test this feature by: 

Clicking on the Groups page from the navigation bar and finding the subsections My Groups and Other Groups.

Example 1: When a user is an Administrator: 
![Alt text](images/groups_page_admin.png)

Example 2: When a user is an Instructor (and student alike):
![Alt text](images/groups_page_instructor.png)

Example 3: When a user is not logged in at all: (should see all groups in My Groups, none in Other Groups)
![Alt text](images/groups_page_logged_out.png)

These are sufficient examples of user tests that explain the UI changes I made. Since I only rearranged the existing group panels, clicking on each of them takes the user to the individual group pages as previously done before. 

### Automated Testing: 

test/groups.js: describe('Group membership tests') creates one user and five groups (groups 1~5), which the user joins groups 1~3 and does not join groups 4~5.

The test it('getUserGroups should return 2 groups the user is a member of') actually tests an existing function getUserGroups (and three functions that are used by the function: getUserGroupsFromSet, getUserGroupMembership, findUserGroups) all located in src/groups/users.js which were never tested before. This checks that the length of the groups that the current user is a member of is exactly 3 as intended, and that the group names match up as well.

The test it it('getUserOtherGroups should return 1 group the user is not a member of') tests the new set of functions that I wrote based off the previous 4 functions: getUserOtherGroups, getUserOtherGroupsFromSet, getUserOtherGroupMembership, findUserOtherGroups.Similarly, this checks that the length of the groups that the current use is NOT a member of is exactly 2 as intended, and that the group names match up as well. 

These tests are sufficient for thc changes I made for the backend of the system. These functions were what I used in src/controllers/groups.js to feed the api routes the two different sets of groups, which is rendered mainly through themes/nodebb-theme-persona/templates/groups/list.tpl.