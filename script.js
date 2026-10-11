// LOGIN PAGE

let loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", function(event) {

        event.preventDefault();

        let username = document.getElementById("username").value;
        let password = document.getElementById("password").value;

        fetch("users.xml")
            .then(response => response.text())
            .then(data => {

                let parser = new DOMParser();
                let xml = parser.parseFromString(data, "text/xml");
                let users = xml.getElementsByTagName("user");
                let found = false;

                for (let i = 0; i < users.length; i++) {

                    let u = users[i].getElementsByTagName("username")[0].textContent;
                    let p = users[i].getElementsByTagName("password")[0].textContent;

                    if (username === u && password === p) {
                        found = true;
                    }
                }

                if (found) {
                    window.location.href = "dashboard.html";
                } else {
                    document.getElementById("message").textContent =
                        "Incorrect username or password!";
                }

            })
            .catch(function() {
                document.getElementById("message").textContent =
                    "Could not load XML. Use Live Server.";
            });

    });
}


// DASHBOARD PAGE

function loadStudents() {

    fetch("students.xml")
        .then(response => response.text())
        .then(data => {

            let parser = new DOMParser();
            let xml = parser.parseFromString(data, "text/xml");
            let students = xml.getElementsByTagName("student");

            document.getElementById("total").textContent = students.length;

            let table = document.getElementById("studentData");
            table.innerHTML = "";

            let highest = -1;
            let topName = "";

            for (let i = 0; i < students.length; i++) {

                let name = students[i].getElementsByTagName("name")[0].textContent;
                let course = students[i].getElementsByTagName("course")[0].textContent;
                let semester = students[i].getElementsByTagName("semester")[0].textContent;
                let marks = Number(students[i].getElementsByTagName("marks")[0].textContent);

                let row = document.createElement("tr");

                row.innerHTML =
                    "<td>" + name + "</td>" +
                    "<td>" + course + "</td>" +
                    "<td>" + semester + "</td>" +
                    "<td>" + marks + "</td>";

                table.appendChild(row);

                if (marks > highest) {
                    highest = marks;
                    topName = name;
                }
            }

            document.getElementById("topStudent").textContent =
                topName + " (" + highest + " marks)";

        })
        .catch(function() {
            document.getElementById("total").textContent =
                "Could not load data. Use Live Server.";
        });
}


// LOAD XML ONLY ON THE DASHBOARD

if (document.getElementById("studentData")) {
    loadStudents();
}


// CHANGE HEADING

function changeHeading() {
    document.getElementById("heading").textContent =
        "Keep Learning and Improving!";
}


// SHOW OR HIDE TABLE

function toggleTable() {

    let table = document.getElementById("studentTable");

    if (table.style.display === "none") {
        table.style.display = "table";
    } else {
        table.style.display = "none";
    }
}


// LIGHT AND DARK MODE

function changeTheme() {
    document.body.classList.toggle("dark");
}