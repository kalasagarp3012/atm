const form = document.getElementById('registrationForm');

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const data = {
    fullname: document.getElementById('fullname').value,
    email: document.getElementById('email').value,
    mobile: document.getElementById('mobile').value,
    accountNumber: document.getElementById('accountNumber').value,
    cardType: document.getElementById('cardType').value,
    pin: document.getElementById('pin').value
  };

  try {
    const response = await fetch("http://localhost:8080/api/atm/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    if (response.ok) {
      const user = await response.json();
      console.log(user);

      if (user.cardNumber) {
        alert(`✅ Registration successful!\n\nYour Card Number: 💳 ${user.cardNumber}\n\nSave it for login.`);
      } else {
        alert("⚠️ Registration successful, but card number missing. Check backend.");
      }
      form.reset();
    } else {
      alert("❌ Registration failed. Check backend server or MySQL connection.");
    }
  } catch (error) {
    console.error(error);
    alert("⚠️ Server not reachable. Make sure Spring Boot is running.");
  }
});

