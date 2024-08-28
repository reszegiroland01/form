document.getElementById("registrationForm").addEventListener("submit", function(event) {
    event.preventDefault(); //Megakadályozza az űrlap alapértelmezett beküldését hogy a JS tudja kezelni a beküldést

    // Adatok összegyűjtése
    let gender = document.getElementById("gender").value;
    let name = document.getElementById("name").value;
    let age = document.getElementById("age").value;
    let phone = document.getElementById("phone").value;
    let email = document.getElementById("email").value;
    let address = document.getElementById("address").value;

    // Felhasználók objektuma
    let newUser = {
        gender: gender,
        name: name,
        age: age,
        phone: phone,
        email: email,
        address: address,
        registrationAccepted: false 
    };

    // A meglévő felhasználók listájának betöltése és az új felhasználó hozzáadása
    let users = JSON.parse(localStorage.getItem("users")) || [];
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users)); // Felhasználók mentése

    // Modal megjelenítése
    let modal = document.getElementById("modal");
    let loadingIcon = document.getElementById("loadingIcon");
    let modalText = document.getElementById("modalText");

    modal.style.display = "flex";
    modalText.style.display = "none";
    loadingIcon.style.display = "block";

    // Töltés után jelenjen meg az üzenet 1mp múlva
    setTimeout(function() {
        loadingIcon.style.display = "none";
        modalText.style.display = "block";
        modalText.innerHTML = "<h2>Köszönöm a regisztrációt!</h2><p>Név: " + name + "</p><p>Kor: " + age + "</p><p>Telefonszám: " + phone + "</p><p>Email cím: " + email + "</p>";
        document.getElementById("registrationForm").reset();
    }, 1000);
});
