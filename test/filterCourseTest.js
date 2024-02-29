import { populateDropdown, filterTopicsByGroup } from 'src/categories/handleFilter.ts';

describe('filterCoursesByGroup', () => {
    // Mock the console.log to test if it gets called
    const logSpy = jest.spyOn(console, 'log');

    // Simulate the DOM structure for the dropdown
    document.body.innerHTML = '<ul class="dropdown-menu pull-right">' +
                              '  <li><a href="#" class="courses-filter" data-group-name="Group 1">Group 1</a></li>' +
                              '  <li><a href="#" class="courses-filter" data-group-name="Group 2">Group 2</a></li>' +
                              '</ul>';

    it('should log the correct message when a group is selected', () => {
        // Simulate clicking the first group
        const firstGroupLink = document.querySelector('.courses-filter');

        // You need to ensure that the click handler calls filterCoursesByGroup.
        // This might be done in the populateDropdown or another setup function.
        // Here, we directly test filterCoursesByGroup as if it was triggered by a click.
        firstGroupLink?.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent the default anchor action
            const groupName = firstGroupLink.getAttribute('data-group-name');
            if (groupName) {
                filterCoursesByGroup(groupName);
            }
        });

        firstGroupLink?.click();

        expect(logSpy).toHaveBeenCalledWith('Filtering courses for group: Group 1');
    });

    // Cleanup mock after all tests are done
    afterAll(() => {
        logSpy.mockRestore();
    });
});
