// Mock data
const mockUsers = [
    { id: 1, username: 'akash', role: 'Admin', status: 'Active' },
    { id: 2, username: 'harry', role: 'Editor', status: 'Inactive' },
    { id: 3, username: 'john', role: 'Viewer', status: 'Active' },
    { id: 4, username: 'albert', role: 'Viewer', status: 'Active' },
    { id: 5, username: 'avengers', role: 'Viewer', status: 'Active' }
   
];

const mockRoles = [
    { id: 1, name: 'Admin', permissions: ['Read', 'Write', 'Delete'] },
    { id: 2, name: 'Editor', permissions: ['Read', 'Write'] },
    { id: 3, name: 'Viewer', permissions: ['Read'] }
];

// Initialize user and role data on page load
document.addEventListener('DOMContentLoaded', () => {
    populateUserTable();
    populateRoleTable();
    showSection('users'); // Default section
    populateRoleSelect(); // Populate role select dropdown in modal
});

// Show selected section
function showSection(sectionId) {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.style.display = 'none';
    });
    document.getElementById(sectionId).style.display = 'block';
}

// Populate user table with mock data
function populateUserTable() {
    const userTableBody = document.querySelector('#user-table tbody');
    userTableBody.innerHTML = ''; // Clear table before adding rows

    mockUsers.forEach(user => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${user.username}</td>
            <td>${user.role}</td>
            <td>
                <button onclick="toggleUserStatus(${user.id})">${user.status}</button>
            </td>
            <td>
                <button class="edit" onclick="editUser(${user.id})">Edit</button>
                <button class="delete" onclick="deleteUser(${user.id})">Delete</button>
            </td>
        `;
        userTableBody.appendChild(row);
    });
}

// Populate role table with mock data
function populateRoleTable() {
    const roleTableBody = document.querySelector('#role-table tbody');
    roleTableBody.innerHTML = ''; // Clear table before adding rows

    mockRoles.forEach(role => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${role.name}</td>
            <td>${role.permissions.join(', ')}</td>
        `;
        roleTableBody.appendChild(row);
    });
}

// Toggle user status (Active/Inactive)
function toggleUserStatus(userId) {
    const user = mockUsers.find(u => u.id === userId);
    if (user) {
        user.status = user.status === 'Active' ? 'Inactive' : 'Active';
    }
    populateUserTable(); // Re-populate table with updated data
}

// Open Edit User Modal
function editUser(userId) {
    const user = mockUsers.find(u => u.id === userId);
    if (user) {
        // Populate the modal with the user's data
        document.getElementById('edit-username').value = user.username;
        document.getElementById('edit-role').value = user.role;

        // Show the modal
        document.getElementById('edit-user-modal').style.display = 'block';

        // Save the user ID in a global variable to keep track of which user is being edited
        window.editedUserId = user.id;
    }
}

// Update user data after edit
function updateUser() {
    const username = document.getElementById('edit-username').value;
    const role = document.getElementById('edit-role').value;

    // Find the user by the saved editedUserId
    const user = mockUsers.find(u => u.id === window.editedUserId);

    if (user) {
        // Update the user data
        user.username = username;
        user.role = role;

        // Close the modal
        closeModal();

        // Re-populate the user table with updated data
        populateUserTable();
    }
}

// Close the edit modal
function closeModal() {
    document.getElementById('edit-user-modal').style.display = 'none';
}

// Delete user
function deleteUser(userId) {
    const userIndex = mockUsers.findIndex(u => u.id === userId);
    if (userIndex !== -1) {
        const confirmDelete = confirm("Are you sure you want to delete this user?");
        if (confirmDelete) {
            mockUsers.splice(userIndex, 1); // Remove the user from the array
            populateUserTable(); // Re-populate table after deletion
        }
    }
}

// Populate role select options in the edit user modal
function populateRoleSelect() {
    const roleSelect = document.getElementById('edit-role');
    roleSelect.innerHTML = ''; // Clear the existing options
    mockRoles.forEach(role => {
        const option = document.createElement('option');
        option.value = role.name;
        option.textContent = role.name;
        roleSelect.appendChild(option);
    });
}

// Open Add User Modal
function openAddUserModal() {
    document.getElementById('add-user-modal').style.display = 'flex';
}

// Close Add User Modal
function closeAddUserModal() {
    document.getElementById('add-user-modal').style.display = 'none';
}




// Search functionality for users
function searchUsers() {
    const searchInput = document.getElementById('search-users').value.toLowerCase();
    
    // Filter users based on the search input
    const filteredUsers = mockUsers.filter(user => user.username.toLowerCase().includes(searchInput));
    
    // Call populateUserTable to update the table with filtered users
    populateUserTable(filteredUsers);
}

// Search functionality for roles
function searchRoles() {
    const searchInput = document.getElementById('search-roles').value.toLowerCase();
    
    // Filter roles based on the search input
    const filteredRoles = mockRoles.filter(role => role.name.toLowerCase().includes(searchInput));
    
    // Call populateRoleTable to update the table with filtered roles
    populateRoleTable(filteredRoles);
}

// Function to populate the user table with filtered users (or all users if no filter)
function populateUserTable(filteredUsers = mockUsers) {
    const userTableBody = document.querySelector('#user-table tbody');
    userTableBody.innerHTML = ''; // Clear the table before adding new rows

    filteredUsers.forEach(user => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${user.username}</td>
            <td>${user.role}</td>
            <td>
                <button onclick="toggleUserStatus(${user.id})">${user.status}</button>
            </td>
            <td>
                <button class="edit" onclick="editUser(${user.id})">Edit</button>
                <button class="delete" onclick="deleteUser(${user.id})">Delete</button>
            </td>
        `;
        userTableBody.appendChild(row);
    });
}

// Function to populate the role table with filtered roles (or all roles if no filter)
function populateRoleTable(filteredRoles = mockRoles) {
    const roleTableBody = document.querySelector('#role-table tbody');
    roleTableBody.innerHTML = ''; // Clear the table before adding new rows

    filteredRoles.forEach(role => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${role.name}</td>
            <td>${role.permissions.join(', ')}</td>
        `;
        roleTableBody.appendChild(row);
    });
}

