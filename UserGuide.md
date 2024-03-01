Alejandro Miranda Documentation

The feature that I worked on was the private and public posts toggling so that only admins can view privated posts by students. The goal of the private and public posts feature is to enable to students to provide information to the professor/admin while maintaining confidentiality and ensuring that they
don't commit any academic integrity violations. This enables students to share more specific issues about problems they are facing on academic work without sharing too much with the class that may ruin the challenge of solving the problem for others. My implementation currently lacks the ability to interface
with the frontend; however, it possesses the ability to filter posts by private and public types.

Automatic Private Posts Filtering:
- Allow the user to view only public posts on their feed
- Allow only the admin to view privated posts on their feed

Testing:
test/posts.js: it('Private posts should be hidden from non-admin users', async function () )- should test the posts ability to remain privated and unseen by non-admin users. This is sufficient for the users side since it ensures
visibility is present only to the students

test/posts.js: it('Admin users should see private posts', async function () ) - tests the posts visibility to the admin users. This ensures that the posts maintain visibility to the intended audience - the admin/professor. This provides sufficient coverage, since
there is already a test for non-admin users in place and this ensures that the admin can view the posts that are privated. 

These backend tests are sufficient for the implemented filtering function I added. The UI was tested visually. Although the backend for filtering remains unconnected to the frontend with a few features missing, there is function in the handling of privated posts.

