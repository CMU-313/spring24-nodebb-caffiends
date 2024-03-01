"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterTopicsByGroup = exports.populateDropdown = exports.fetchGroups = void 0;
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
exports.fetchGroups = fetchGroups;
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
            filterTopicsByGroup(group.name);
        });
        listItem.appendChild(link);
        dropdown.appendChild(listItem);
    });
}
exports.populateDropdown = populateDropdown;
function filterTopicsByGroup(groupName) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Making an API call to fetch topics based on the groupName
            const response = yield fetch(`/api/topic?group=${encodeURIComponent(groupName)}`);
            if (!response.ok) {
                throw new Error(`Error fetching topics for group ${groupName}: ${response.statusText}`);
            }
            const topics = yield response.json();
            // Assuming the response is an array of topics
            return topics;
        }
        catch (error) {
            console.error(`An error occurred while fetching topics for group ${groupName}: ${error}`);
            return []; // Return an empty array in case of error
        }
    });
}
exports.filterTopicsByGroup = filterTopicsByGroup;
// this function is listener
document.addEventListener('DOMContentLoaded', () => {
    fetchGroups();
});
