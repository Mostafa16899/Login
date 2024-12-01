var emailInput = document.getElementById('Email');
var passwordInput = document.getElementById('pass');
var loginForm = document.getElementById('login');
var registerForm = document.getElementById('Register');
var homeSection = document.getElementById('home');
var registerLink = document.getElementById('link1');
var loginLink = document.getElementById('link2');
var registerFeedback = document.getElementById('registerFeedback');
var loginFeedback = document.getElementById('loginFeedback');
var welcomeName = document.getElementById('welcomeName')


var users = JSON.parse(localStorage.getItem('users')) || [];

// Switch to Register form
registerLink.addEventListener('click', function () {
    registerForm.classList.remove('d-none');
    loginForm.classList.add('d-none');
    registerFeedback.classList.add('d-none');
});

// Switch to Login form
loginLink.addEventListener('click', function () {
    registerForm.classList.add('d-none');
    loginForm.classList.remove('d-none');
    loginFeedback.classList.add('d-none');
});

// Register a new user
registerForm.querySelector('button').addEventListener('click', function (e) {
    e.preventDefault();
    var regName = registerForm.querySelector('input[type="text"]').value;
    var regEmail = registerForm.querySelector('input[type="email"]').value;
    var regPassword = registerForm.querySelector('input[type="password"]').value;

    // Clear previous feedback
    registerFeedback.classList.add('d-none');

    // Validate input
    if (!regName || !regEmail || !regPassword) {
        registerFeedback.textContent = "Please fill in all fields.";
        registerFeedback.classList.remove('d-none');
        return;
    }

    // Check if email already exists
    if (users.find(user => user.email === regEmail)) {
        registerFeedback.textContent = "Email already registered. Please log in.";
        registerFeedback.classList.remove('d-none');
        return;
    }

    // Save user data
    users.push({ name: regName, email: regEmail, password: regPassword });
    localStorage.setItem('users', JSON.stringify(users));

    registerFeedback.textContent = "Registration successful! You can now log in.";
    registerFeedback.classList.remove('d-none');
    registerFeedback.classList.add('text-success');
});

// Handle Login
loginForm.querySelector('button').addEventListener('click', function (e) {
    e.preventDefault();
    var loginEmail = emailInput.value;
    var loginPassword = passwordInput.value;

    // Clear previous feedback
    loginFeedback.classList.add('d-none');

    // Validate input
    if (!loginEmail || !loginPassword) {
        loginFeedback.textContent = "Please enter your email and password.";
        loginFeedback.classList.remove('d-none');
        loginFeedback.classList.add('text-danger');
        return;
    }

    // Check if user exists
    var user = users.find(user => user.email === loginEmail && user.password === loginPassword);
    if (user) {
        welcomeName.textContent = `Welcome ${user.name}`;
        loginFeedback.classList.remove('d-none');
        loginFeedback.classList.add('text-success');

        // Navigate to home section
        homeSection.classList.remove('d-none');
        loginForm.classList.add('d-none');
        registerForm.classList.add('d-none');
    } else {
        loginFeedback.textContent = "Invalid email or password.";
        loginFeedback.classList.remove('d-none');
        loginFeedback.classList.add('text-danger');
    }
});



document.getElementById('logoutButton').addEventListener('click', function () {
    document.getElementById('home').classList.add('d-none');
    document.getElementById('login').classList.remove('d-none');
});

