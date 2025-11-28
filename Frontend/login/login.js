const form = document.getElementById('loginForm');
const msg = document.getElementById('message');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  msg.textContent = '';

  const cardNumber = document.getElementById('cardNumber').value.trim();
  const pin = document.getElementById('pin').value.trim();

  if (!cardNumber || !pin) {
    msg.textContent = 'Enter card number and PIN';
    return;
  }

  try {
    const res = await fetch('http://localhost:8080/api/atm/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ cardNumber, pin })
    });

    if (res.ok) {
      const user = await res.json();
      // save minimal info locally to show on dashboard
      sessionStorage.setItem('atmUser', JSON.stringify(user));
      // go to dashboard page (same tab)
      window.location.href = '../user/dashboard.html';
    } else if (res.status === 401) {
      msg.textContent = 'Invalid card number or PIN';
    } else {
      const t = await res.text();
      msg.textContent = t || 'Login error';
    }
  } catch (err) {
    console.error(err);
    msg.textContent = 'Cannot reach server. Make sure backend is running.';
  }
});

// Open register page in a new tab when Create Account is clicked
const createBtn = document.getElementById("createAccountBtn");
if (createBtn) {
  createBtn.addEventListener("click", () => {
    window.open("../register/index.html", "_blank");
  });
}
