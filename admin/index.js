let users = JSON.parse(localStorage.getItem("users")) || [];

function renderUsers() {
    let userList = ''; // Kezdő érték üres string
    
    users.map(function(user, index) {
        userList += '<div class="user-item">';
        userList += '<p>Név: ' + user.name + '</p>';
        userList += '<p>Nem: ' + user.gender + '</p>';
        userList += '<p>Kor: ' + user.age + '</p>';
        userList += '<p>Telefonszám: ' + user.phone + '</p>';
        userList += '<p>Email: ' + user.email + '</p>';
        userList += '<p>Lakcím: ' + user.address + '</p>';
        userList += '<label><input type="checkbox" ' + (user.registrationAccepted ? 'checked' : '') + ' onchange="toggleRegistration(' + index + ')"> Regisztráció elfogadása</label>';
        userList += '<button onclick="deleteUser(' + index + ')">Törlés</button>';
        userList += '<hr>';
        userList += '</div>';
    });

    document.getElementById("userList").innerHTML = userList; // Elemek megjelenítése a userList-ben
}
renderUsers()

// Felhasználó törlése
function deleteUser(index) {
    users.splice(index, 1);
    localStorage.setItem("users", JSON.stringify(users));
    applyFilters();
}

// Regisztráció elfogadásának váltása
function toggleRegistration(index) {
    users[index].registrationAccepted = !users[index].registrationAccepted;
    localStorage.setItem("users", JSON.stringify(users));
}

function applyFilters() {
    let genderFilter = document.getElementById("genderFilter").value;
    let ageFilter = document.getElementById("ageFilter").value;
    let emailFilter = document.getElementById("emailFilter").value;

    let filteredUsers = users.filter(function(user) {
        let matchesGender = (genderFilter === "all" || user.gender === genderFilter);
        let matchesAge = (ageFilter === "all" || 
                         (ageFilter === "under18" && user.age < 18) || 
                         (ageFilter === "over70" && user.age > 70));
        let matchesEmail = (emailFilter === "all" || 
                           (emailFilter === "gmail" && user.email.includes("@gmail.com")));

        return matchesGender && matchesAge &&  matchesEmail;
    });

    renderFilteredUsers(filteredUsers);
}

function renderFilteredUsers(filteredUsers) {
    let userList = '';
    
    filteredUsers.map(function(user, index) {
        userList += '<div class="user-item">';
        userList += '<p>Név: ' + user.name + '</p>';
        userList += '<p>Nem: ' + user.gender + '</p>';
        userList += '<p>Kor: ' + user.age + '</p>';
        userList += '<p>Telefonszám: ' + user.phone + '</p>';
        userList += '<p>Email: ' + user.email + '</p>';
        userList += '<p>Lakcím: ' + user.address + '</p>';
        userList += '<label><input type="checkbox" ' + (user.registrationAccepted ? 'checked' : '') + ' onchange="toggleRegistration(' + index + ')"> Regisztráció elfogadása</label>';
        userList += '<button onclick="deleteUser(' + index + ')">Törlés</button>';
        userList += '<hr>';
        userList += '</div>';
    });

    document.getElementById("userList").innerHTML = userList;
}
