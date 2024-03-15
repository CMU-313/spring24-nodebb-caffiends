import {
    populateDropdown,
    filterTopicsByGroup,
} from "src/categories/handleFilter.ts";

describe("filterCoursesByGroup", () => {
    const logSpy = jest.spyOn(console, "log");
    let firstGroupLink;
    let secondGroupLink;

    beforeEach(() => {
        document.body.innerHTML =
            '<ul class="dropdown-menu pull-right">' +
            '  <li><a href="#" class="courses-filter" data-group-name="Group 1">Group 1</a></li>' +
            '  <li><a href="#" class="courses-filter" data-group-name="Group 2">Group 2</a></li>' +
            "</ul>";

        firstGroupLink = document.querySelector(".courses-filter");
        secondGroupLink = document.querySelectorAll(".courses-filter")[1];
    });

    it("should filter courses by group", () => {
        const groupName = firstGroupLink.getAttribute("data-group-name");
        filterCoursesByGroup(groupName);

        expect(logSpy).toHaveBeenCalledWith(
            `Filtering courses for group: ${groupName}`,
        );
    });

    it("should prevent default behavior when clicked", () => {
        const event = new Event("click", { bubbles: true });
        firstGroupLink.dispatchEvent(event);

        expect(event.defaultPrevented).toBe(true);
    });

    it("should filter courses for the second group", () => {
        const groupName = secondGroupLink.getAttribute("data-group-name");
        filterCoursesByGroup(groupName);

        expect(logSpy).toHaveBeenCalledWith(
            `Filtering courses for group: ${groupName}`,
        );
    });

    afterEach(() => {
        logSpy.mockRestore();
    });
});
it("should handle multiple group links", () => {
    const groupLinks = document.querySelectorAll(".courses-filter");
    groupLinks.forEach((link) => {
        const groupName = link.getAttribute("data-group-name");
        filterCoursesByGroup(groupName);

        expect(logSpy).toHaveBeenCalledWith(
            `Filtering courses for group: ${groupName}`,
        );
    });
});

it("should handle dynamically added group links", () => {
    const newGroupLink = document.createElement("a");
    newGroupLink.href = "#";
    newGroupLink.classList.add("courses-filter");
    newGroupLink.setAttribute("data-group-name", "New Group");
    document.querySelector(".dropdown-menu").appendChild(newGroupLink);

    const groupName = newGroupLink.getAttribute("data-group-name");
    filterCoursesByGroup(groupName);

    expect(logSpy).toHaveBeenCalledWith(
        `Filtering courses for group: ${groupName}`,
    );
});
