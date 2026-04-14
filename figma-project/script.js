const signupBtn = document.querySelector('.register-btn');

if (signupBtn) {
    signupBtn.addEventListener('click', () => {
        window.location.href = 'register.html';
    });
}

const loginBtn = document.querySelector('.login-btn');

if (loginBtn) {
    loginBtn.addEventListener('click', () => {
        window.location.href = 'login.html';
    });
}

const signupForm = document.querySelector('.signup-form');
const signupStep = document.getElementById('signupStep');
const clubStep = document.getElementById('clubStep');

if (signupForm && signupStep && clubStep) {
    signupForm.addEventListener('submit', function (e) {
        e.preventDefault();

        signupStep.style.display = 'none';
        clubStep.style.display = 'block';
    });
}