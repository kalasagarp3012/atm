// Load user info from session storage
const user = JSON.parse(sessionStorage.getItem("atmUser"));
if (user) {
  document.getElementById("userName").innerText = user.fullname || user.name || (user.email ? user.email.split('@')[0] : 'User');
}

// Helper: format number as Indian Rupee currency
function formatINR(value) {
  try {
    const num = Number(value) || 0;
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(num);
  } catch (e) {
    return '₹' + Number(value).toFixed(2);
  }
}

// Profile image: load stored image or placeholder
const profileImage = document.getElementById('profileImage');
const profileInput = document.getElementById('profileInput');
const storedProfile = localStorage.getItem('profileImageData');
if (profileImage) {
  if (storedProfile) {
    profileImage.src = storedProfile;
    profileImage.classList.remove('empty');
  } else {
    // set a safe placeholder (avoids broken image icon)
    profileImage.src = 'https://i.pravatar.cc/44?u=default';
    profileImage.classList.add('empty');
  }
}

// Open file picker when profile button clicked
const profileBtn = document.getElementById('profileBtn');
if (profileBtn && profileInput) {
  profileBtn.addEventListener('click', () => profileInput.click());
}

// Handle image selection and preview
if (profileInput) {
  profileInput.addEventListener('change', (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function (ev) {
      const dataUrl = ev.target.result;
      if (profileImage) {
        profileImage.src = dataUrl;
        profileImage.classList.remove('empty');
      }
      try {
        localStorage.setItem('profileImageData', dataUrl);
      } catch (err) {
        console.warn('Could not save profile image locally', err);
      }
    };
    reader.readAsDataURL(file);
  });
}

// Sample Values (you can replace with backend API calls)
document.getElementById("balanceAmount").innerText = formatINR(10000);
document.getElementById("savingAmount").innerText = formatINR(5000);

// Example transaction list (numeric amounts)
const sampleTransactions = [
  { name: "Central Burger", amount: -189.36 },
  { name: "The Market", amount: -92.50 },
  { name: "Quick Transfer", amount: 350.00 },
  { name: "The Market", amount: -36.20 }
];

const list = document.getElementById("transactionList");
if (list) {
  sampleTransactions.forEach(t => {
    const li = document.createElement("li");
    const date = t.date || new Date().toLocaleDateString('en-GB');
    const sign = t.amount < 0 ? '-' : '+';
    const amountHtml = `${sign}${formatINR(Math.abs(t.amount))}`;

    li.innerHTML = `
      <div class="txn-left">
        <div class="txn-icon">${(t.name || '?').split(' ').map(s=>s[0]).slice(0,2).join('')}</div>
        <div class="txn-meta">
          <div class="txn-name">${t.name}</div>
          <small class="txn-date">${date}</small>
        </div>
      </div>
      <div class="txn-amount ${t.amount < 0 ? 'negative' : 'positive'}">${amountHtml}</div>
    `;

    list.appendChild(li);
  });

  // If there are no transactions, show empty state
  if (!list.children.length) {
    const li = document.createElement('li');
    li.style.textAlign = 'center';
    li.style.padding = '12px 0';
    li.textContent = 'No recent transactions.';
    list.appendChild(li);
  }
}

// Settings button
document.getElementById("settingsBtn").addEventListener("click", () => {
  alert("Settings will open soon.");
});

// Logout button
document.getElementById("logoutBtn").addEventListener("click", () => {
  sessionStorage.removeItem("atmUser");
  window.location.href = "../login/login.html";
});

// Sidebar navigation: set active and navigate (targets are placeholders if pages absent)
document.querySelectorAll('.menu a').forEach(a => {
  a.addEventListener('click', (ev) => {
    ev.preventDefault();
    // set active class
    document.querySelectorAll('.menu a').forEach(x => x.classList.remove('active'));
    a.classList.add('active');

    const target = a.getAttribute('data-target');
    if (target) {
      // try navigating to the target relative path
      try {
        window.location.href = target;
      } catch (e) {
        console.warn('Navigation failed', e);
      }
    } else {
      // fallback behavior
      alert('This navigation item is a placeholder.');
    }
  });
});

// Statistics chart removed per user request. If you later want
// to re-enable a chart, restore the renderMonthlyChart function
// and add a canvas element with id "statsChart" in the HTML.
