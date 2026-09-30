async function userListController() {
    let response = await fetch('/api/users');
    let result = await response.json();

    if (response.ok) {
        userListView(result.data);
        document.getElementById("message").innerHTML = "Users loaded";
    } else {
        document.getElementById("message").innerHTML = result.error;
    }

    return result.data;
}

function userListView(users){
    let table = document.getElementById("usertable");
    let view =  `<thead><tr><th>User ID</th>` + 
                `<th>Last Name</th>` + 
                `<th>First Name</th>` +
                `<th>Email</th>` +
                `<th>Username</th>` +
                `<th>Role</th></tr></thead>`;
    
    users.forEach(user => {
            view = view + 
            `<tr><td>${user['userID']}</td>` +
            `<td>${user['lastname']}</td>` +
            `<td>${user['firstname']}</td>` +
            `<td>${user['email']}</td>` +
            `<td>${user['username']}</td>` +
            `<td>${user['urole']}</td></tr>`;
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
        urole: document.getElementById("urole").value
    };

    let response = await fetch('/api/users', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newUser)
    });

    let result = await response.json();

    if (response.ok) {
        document.getElementById("message").innerHTML = "User added";
        document.getElementById("userForm").reset();
        userListController();
    } else {
        document.getElementById("message").innerHTML = result.error;
    }
}

document.getElementById("userForm").addEventListener("submit", addUserController);
