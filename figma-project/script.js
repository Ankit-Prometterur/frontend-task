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

const verifyBtn = document.querySelector('.verify-btn');
const kycStep = document.getElementById('kycStep');

if (verifyBtn && clubStep && kycStep) {
    verifyBtn.addEventListener('click', () => {
        clubStep.style.display = 'none';
        kycStep.style.display = 'block';
    });
}

const kycSubmitBtn = document.getElementById('kycSubmitBtn');
const kycFailed = document.getElementById('kycFailed');

if(kycSubmitBtn && kycFailed && kycStep){
    kycSubmitBtn.addEventListener('click', () => {
        kycStep.style.display = 'none';
        kycFailed.style.display = 'block';
    });
}

const resetForm = document.querySelector('.signup-form');
const forgetStep = document.getElementById('forgetStep');
const verifyContent = document.getElementById('verifyContent');


if (resetForm && forgetStep && verifyContent) {
    resetForm.addEventListener('submit', function (e) {
        e.preventDefault();

        forgetStep.style.display = 'none';
        verifyContent.style.display = 'flex';
    });
}


// const newPassForm = document.querySelector('.signup-form');
const submitBtn = document.getElementById('submitBtn');
const newPassContent = document.getElementById('newPassword');

if (submitBtn && verifyContent && newPassContent) {
    submitBtn.addEventListener('click', function (e) {
        e.preventDefault();

        verifyContent.style.display = 'none';
        newPassContent.style.display = 'block';
    });
}