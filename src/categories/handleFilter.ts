// Code written with help of GPT-4, 

interface Group {
    name: string;
}

// this function fetches the groups from the server 
async function fetchGroups() {
    const response = await fetch('/api/groups');
    const data = await response.json();
    
    if (data.groups) {
        populateDropdown(data.groups);
    }
}

// this function populates the dropdown with the groups
function populateDropdown(groups: Group[]) {
    const dropdown = document.querySelector('.dropdown-menu');
    groups.forEach(group => {
        const listItem = document.createElement('li');
        const link = document.createElement('a');
        link.href = "#";
        link.className = "courses-filter";
        link.dataset.groupName = group.name;
        link.textContent = group.name;

        listItem.appendChild(link);
        dropdown?.appendChild(listItem);
    });
}

// this function handles the filter
document.addEventListener('DOMContentLoaded', () => {
    fetchGroups();
});
