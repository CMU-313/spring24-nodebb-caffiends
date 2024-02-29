// Code written with help of GPT-4, 
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// this function fetches the groups from the server 
function fetchGroups() {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch('/api/groups');
        const data = yield response.json();
        if (data.groups) {
            populateDropdown(data.groups);
        }
    });
}
// this function populates the dropdown with the groups
function populateDropdown(groups) {
    const dropdown = document.querySelector('.dropdown-menu');
    groups.forEach(group => {
        const listItem = document.createElement('li');
        const link = document.createElement('a');
        link.href = "#";
        link.className = "courses-filter";
        link.dataset.groupName = group.name;
        link.textContent = group.name;
        link.addEventListener('click', (event) => {
            event.preventDefault();
            filterCoursesByGroup(group.name);
        });
        listItem.appendChild(link);
        dropdown.appendChild(listItem);
    });
}
// Define a function to filter courses based on the group name.
function filterCoursesByGroup(groupName) {
    console.log(`Filtering courses for group: ${groupName}`);
    // Implement the logic to filter courses based on the selected group.
    // This might involve making another API call to fetch the filtered data
    // and updating the DOM to reflect the filtered courses.
}
// this function is listener
document.addEventListener('DOMContentLoaded', () => {
    fetchGroups();
});
