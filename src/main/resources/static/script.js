// LOGIN FUNCTION
function login() {
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let role = document.getElementById("role").value;

    if (email === "" || password === "") {
        alert("Please enter email and password");
        return;
    }

    if (role === "Employee") {
        window.location.href = "employee.html";
    } else {
        window.location.href = "manager.html";
    }
}

// PASSWORD TOGGLE
function togglePassword() {
    let pass = document.getElementById("password");

    if (pass.type === "password") {
        pass.type = "text";
    } else {
        pass.type = "password";
    }
}

function login() {
    alert("Login clicked");
}


//         APPLY LEAVE 

function applyLeave() {
    let employeeName = document.getElementById("employeeName").value;
    let leaveType = document.getElementById("type").value;
    let startDate = document.getElementById("startDate").value;
    let endDate = document.getElementById("endDate").value;
    let reason = document.getElementById("reason").value;

    let leaveData = {
        employeeName: employeeName,   
        leaveType: leaveType,         
        startDate: startDate,
        endDate: endDate,
        reason: reason,
        status: "Pending"
    };

    fetch("http://localhost:8080/leave/request", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(leaveData)
    })
    .then(res => res.json())
    .then(data => {
        alert("Leave Request Submitted");
    })
    .catch(err => console.error(err));
}
//           GET LEAVES

function getLeaves() {
    fetch("http://localhost:8080/leave/all")
    .then(response => response.json())
    .then(data => {
        let table = document.getElementById("leaveTable");
        table.innerHTML = "";

        data.forEach(leave => {
            let row = `
                <tr>
                    <td>${leave.id}</td>
                    <td>${leave.leaveType}</td>
                    <td>${leave.reason}</td>
                    <td>${leave.status}</td>
                </tr>
            `;
            table.innerHTML += row;
        });
    })
    .catch(error => console.error("Error:", error));
}

//       LOAD LEAVES FOR MANAGER 

function loadLeaves() {
    fetch("http://localhost:8080/leave/all")
    .then(response => response.json())
    .then(data => {
        let container = document.getElementById("leaveContainer");
        container.innerHTML = "";

        data.forEach(leave => {
            let card = `
                <div style="margin:20px;">
                    <p><b>Leave ID:</b> ${leave.id}</p>
                    <p><b>Type:</b> ${leave.leaveType}</p>
                    <p><b>Reason:</b> ${leave.reason}</p>
                    <p><b>Status:</b> ${leave.status}</p>

                    <button onclick="approveLeave(${leave.id})">Approve</button>
                    <button onclick="rejectLeave(${leave.id})">Reject</button>
                    <hr>
                </div>
            `;
            container.innerHTML += card;
        });
    })
    .catch(error => console.error("Error:", error));
}

//          APPROVE 

function approveLeave(id) {
    fetch(`http://localhost:8080/leave/approve/${id}`, {
        method: "PUT"
    })
    .then(response => response.json())
    .then(data => {
        alert("Leave Approved");
        loadLeaves(); // refresh
    })
    .catch(error => console.error("Error:", error));
}

//         REJECT 

function rejectLeave(id) {
    fetch(`http://localhost:8080/leave/reject/${id}`, {
        method: "PUT"
    })
    .then(response => response.json())
    .then(data => {
        alert("Leave Rejected");
        loadLeaves(); // refresh
    })
    .catch(error => console.error("Error:", error));
}

//          LOGOUT 

function logout() {
    window.location.href = "login.html";
}