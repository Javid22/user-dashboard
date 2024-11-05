var _a, _b;
var users = [];
var userTableBody = document.getElementById('userTableBody');
var userForm = document.getElementById('userForm');
var nameInput = document.getElementById('name');
var emailInput = document.getElementById('email');
var roleInput = document.getElementById('role');
var formTitle = document.getElementById('form-title');
// Flag to track if we're editing a user
var editingUserId = null;
function renderUsers(usersList) {
    var userTable = document.getElementById('userTable');
    userTableBody.innerHTML = '';
    if (usersList.length === 0) {
        userTable.style.display = 'none';
        return;
    }
    userTable.style.display = 'table';
    usersList.forEach(function (user) {
        var row = document.createElement('tr');
        row.innerHTML = "\n        <td>".concat(user.name, "</td>\n        <td>").concat(user.email, "</td>\n        <td>\n          <button class=\"btn btn-warning btn-sm\" onclick=\"editUser(").concat(user.id, ")\">Edit</button>\n          <button class=\"btn btn-danger btn-sm\" onclick=\"deleteUser(").concat(user.id, ")\">Delete</button>\n        </td>\n      ");
        userTableBody.appendChild(row);
    });
}
userForm.addEventListener('submit', function (e) {
    e.preventDefault();
    var name = nameInput.value.trim();
    var email = emailInput.value.trim();
    var role = roleInput.value;
    // Basic validation
    if (!name || !email) {
        alert('Name and Email are required!');
        return;
    }
    // Check if the email is already taken
    var existingUser;
    for (var i = 0; i < users.length; i++) {
        if (users[i].email === email && (editingUserId === null || users[i].id !== editingUserId)) {
            existingUser = users[i];
            break;
        }
    }
    // const existingUser = users.find(user => user.email === email);
    if (existingUser) {
        alert('This email is already taken!');
        return;
    }
    if (editingUserId !== null) {
        // Update the existing user
        // const userToEdit = users.find(user => user.id === editingUserId);
        var userToEdit = null;
        for (var i = 0; i < users.length; i++) {
            if (users[i].id === editingUserId) {
                userToEdit = users[i];
                break;
            }
        }
        if (userToEdit) {
            userToEdit.name = name;
            userToEdit.email = email;
            userToEdit.role = role;
            console.log("userToEdit :: ", userToEdit);
            console.log("users :: ", users); // user is comming as empty so updated values are empty
            renderUsers(users);
            formTitle.textContent = 'Add New User';
            editingUserId = null;
        }
    }
    else {
        var newUser = {
            id: Date.now(), // Use timestamp as unique ID
            name: name,
            email: email,
            role: role
        };
        users.push(newUser);
        renderUsers(users);
    }
    userForm.reset();
    editingUserId = null;
    formTitle.textContent = 'Add New User';
});
// Edit User function
function editUser(userId) {
    // const userToEdit = users.find(user => user.id === userId);
    var userToEdit;
    for (var i = 0; i < users.length; i++) {
        if (users[i].id === userId) {
            userToEdit = users[i];
            break;
        }
    }
    if (userToEdit) {
        nameInput.value = userToEdit.name;
        emailInput.value = userToEdit.email;
        roleInput.value = userToEdit.role;
        formTitle.textContent = 'Edit User';
        //   // Replace the submit handler to update the user
        //   userForm.onsubmit = function (e) {
        //     e.preventDefault();
        //     userToEdit.name = nameInput.value.trim();
        //     userToEdit.email = emailInput.value.trim();
        //     userToEdit.role = roleInput.value;
        //     renderUsers(users);
        //     userForm.reset();
        //     formTitle.textContent = 'Add New User';
        //   };
        // Set the editingUserId flag to mark we're editing this user
        editingUserId = userToEdit.id;
    }
}
function deleteUser(userId) {
    var userIndex = -1;
    for (var i = 0; i < users.length; i++) {
        if (users[i].id === userId) {
            userIndex = i;
            break;
        }
    }
    if (userIndex !== -1) {
        users.splice(userIndex, 1);
        renderUsers(users);
    }
}
// Sort Users by Name or Email
(_a = document.getElementById('sort-name')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', function () {
    users.sort(function (a, b) { return a.name.localeCompare(b.name); });
    renderUsers(users);
});
(_b = document.getElementById('sort-email')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', function () {
    users.sort(function (a, b) { return a.email.localeCompare(b.email); });
    renderUsers(users);
});
// Initial render
renderUsers(users);
