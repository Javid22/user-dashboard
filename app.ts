interface User {
    id: number;
    name: string;
    email: string;
    role: string;
  }
  
  let users: User[] = [];
  
  const userTableBody = document.getElementById('userTableBody')!;
  const userForm = document.getElementById('userForm')! as HTMLFormElement;
  const nameInput = document.getElementById('name')! as HTMLInputElement;
  const emailInput = document.getElementById('email')! as HTMLInputElement;
  const roleInput = document.getElementById('role')! as HTMLSelectElement;
  const formTitle = document.getElementById('form-title')!;

  // Flag to track if we're editing a user
  let editingUserId: number | null = null;
  
  function renderUsers(usersList: User[]): void {
    const userTable = document.getElementById('userTable') as HTMLElement;
    userTableBody.innerHTML = '';
    if (usersList.length === 0) {
        userTable.style.display = 'none';
        return;
    }
    userTable.style.display = 'table';

    usersList.forEach(user => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${user.name}</td>
        <td>${user.email}</td>
        <td>
          <button class="btn btn-warning btn-sm" onclick="editUser(${user.id})">Edit</button>
          <button class="btn btn-danger btn-sm" onclick="deleteUser(${user.id})">Delete</button>
        </td>
      `;
      userTableBody.appendChild(row);
    });
  }
  
  userForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const role = roleInput.value;
  
    // Basic validation
    if (!name || !email) {
      alert('Name and Email are required!');
      return;
    }

    const existingUser = users.find(user => user.email === email);
  
    if (existingUser) {
      alert('This email is already taken!');
      return;
    }

    if (editingUserId !== null) {
        const userToEdit = users.find(user => user.id === editingUserId);
        if (userToEdit) {
          userToEdit.name = name;
          userToEdit.email = email;
          userToEdit.role = role;
          renderUsers(users);
          formTitle.textContent = 'Add New User';
          editingUserId = null;
        }
      } else {
          const newUser: User = {
            id: Date.now(), // Using timestamp as unique ID
            name,
            email,
            role
          };
        
          users.push(newUser);
          renderUsers(users);
      }
  
    userForm.reset();
    editingUserId = null; 
    formTitle.textContent = 'Add New User';
  });
  
  // Edit User function
  function editUser(userId: number): void {
    const userToEdit = users.find(user => user.id === userId);
  
    if (userToEdit) {
      nameInput.value = userToEdit.name;
      emailInput.value = userToEdit.email;
      roleInput.value = userToEdit.role;
      formTitle.textContent = 'Edit User';

      editingUserId = userToEdit.id;
    }
  }
  
  function deleteUser(userId: number): void {
    let userIndex = -1;
    for (let i = 0; i < users.length; i++) {
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
  document.getElementById('sort-name')?.addEventListener('click', () => {
    users.sort((a, b) => a.name.localeCompare(b.name));
    renderUsers(users);
  });
  
  document.getElementById('sort-email')?.addEventListener('click', () => {
    users.sort((a, b) => a.email.localeCompare(b.email));
    renderUsers(users);
  });
  
  // Initial render
  renderUsers(users);
  