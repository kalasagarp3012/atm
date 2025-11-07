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
      
      // ✅ Show card number popup
      alert(`✅ Registration successful!\n\nYour Card Number is:\n💳 ${user.cardNumber}\n\nPlease save it for login.`);
      
      // Clear form after success
      form.reset();
    } else {
      alert("❌ Registration failed! Please check backend or MySQL connection.");
    }
  } catch (error) {
    console.error("Error:", error);
    alert("⚠️ Something went wrong. Check if your backend server is running.");
  }
});
