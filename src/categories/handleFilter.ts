// Code written with help of GPT-4, 

interface Group {
    name: string;
}

// this function fetches the groups from the server 
export async function fetchGroups() {
    const response = await fetch('/api/groups');
    const data = await response.json();
    
    if (data.groups) {
        populateDropdown(data.groups);
    }
}

// this function populates the dropdown with the groups
export function populateDropdown(groups: Group[]) {
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

export async function filterTopicsByGroup(groupName: string): Promise<any[]> {
    try {
        // Making an API call to fetch topics based on the groupName
        const response = await fetch(`/api/topic?group=${encodeURIComponent(groupName)}`);
        if (!response.ok) {
            throw new Error(`Error fetching topics for group ${groupName}: ${response.statusText}`);
        }

        const topics = await response.json();
        
        // Assuming the response is an array of topics
        return topics;
    } catch (error) {
        console.error(`An error occurred while fetching topics for group ${groupName}: ${error}`);
        return [];  // Return an empty array in case of error
    }
}

// this function is listener
document.addEventListener('DOMContentLoaded', () => {
    fetchGroups();
});
