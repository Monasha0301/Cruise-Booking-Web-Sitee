const passengers = [
  { username: "Shane", passcode: "Shane123" },
  { username: "Rifan", passcode: "Rifan123" },
  { username: "Rifni", passcode: "Rifni123" },
  { username: "Droov", passcode: "Droov123" },
  { username: "Riyon", passcode: "Riyon123" },
];

function setupLoginAndSignup() {
  const loginForm = document.getElementById("login-form");
  const signupForm = document.getElementById("signup-form");

  if (loginForm) loginForm.addEventListener("submit", handleLogin);
  if (signupForm) signupForm.addEventListener("submit", handleSignup);
}

function handleLogin(e) {
  e.preventDefault();
  const username = document.getElementById("login-username").value.trim();
  const password = document.getElementById("login-password").value.trim();

  const match = passengers.find(p => p.username === username && p.passcode === password);
  if (match) {
    alert("✅ Login successful!");
    window.location.href = "index.html";
  } else {
    alert("❌ Invalid username or password.");
  }
}

function handleSignup(e) {
  e.preventDefault();
  const username = document.getElementById("signup-username").value.trim();
  const password = document.getElementById("signup-password").value.trim();

  const match = passengers.find(p => p.username === username && p.passcode === password);

  if (match) {
    alert("✅ Sign-in successful!");
    window.location.href = "login.html"; // Redirect after successful sign-in
  } else {
    alert("❌ Invalid username or password.");
  }
}

