async function userListController() {
    let response = await fetch('http://localhost:3000/users');
    let users = await response.json();
    userListView(users);
    return users;
}

function userListView(users){
    let table = document.getElementById("usertable");
    let view =  `<thead><tr><th>User ID</th>` + 
                `<th>Last Name</th>` + 
                `<th>First Name</th>` +
                `<th>Email</th>` +
                `<th>Username</th>` +
                `<th>Password</th></tr></thead>`;
    
    users.forEach(user => {
            view = view + 
            `<tr><td>${user['userID']}</td>` +
            `<td>${user['lastname']}</td>` +
            `<td>${user['firstname']}</td>` +
            `<td>${user['email']}</td>` +
            `<td>${user['username']}</td>` +
            `<td>${user['passwd']}</td></tr>`;
            
            
    });
    table.innerHTML=view;



}

document.getElementById("refresh").addEventListener("click", userListController);
userListController();


// Part 2 begins here
async function addUserController(event) {
    event.preventDefault();

    let newUser = {
        username: document.getElementById("username").value,
        firstname: document.getElementById("firstname").value,
        lastname: document.getElementById("lastname").value,
        email: document.getElementById("email").value,
        passwd: document.getElementById("passwd").value,
        urole: "user"
    };

    let response = await fetch('http://localhost:3000/users', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newUser)
    });

    if (response.ok) {
        document.getElementById("userForm").reset();
        userListController();
    }
}

document.getElementById("userForm").addEventListener("submit", addUserController);