// Interactive Elements
const controlCenter = document.getElementById('control-center');
const homeScreen = document.getElementById('home-screen');
const topPullZone = document.getElementById('top-pull-zone');
const overlay = document.getElementById('modal-overlay');

const btnConnectX = document.getElementById('btn-connectx');
const btnSendOtp = document.getElementById('btn-send-otp');
const btnVerify = document.getElementById('btn-verify');
const btnBackOtp = document.getElementById('btn-back-otp');

const modalShare = document.getElementById('modal-share');
const modalOtp = document.getElementById('modal-otp');
const modalLoading = document.getElementById('modal-loading');
const modalSuccess = document.getElementById('modal-success');

const inputMobile = document.getElementById('mobile-number');
const errorPhone = document.getElementById('phone-error');
const otpBoxes = document.querySelectorAll('.otp-box');
const errorOtp = document.getElementById('otp-error');
const dataOpts = document.querySelectorAll('.data-opt');

let selectedData = '1GB';
let enteredMobile = '';

// Clock Logic
function updateClock() {
    const clock = document.getElementById('clock');
    const now = new Date();
    clock.innerText = now.getHours() + ':' + String(now.getMinutes()).padStart(2, '0');
}
setInterval(updateClock, 1000);
updateClock();

// Format Mobile Number (Indian Format)
inputMobile.addEventListener('input', function (e) {
    let val = e.target.value.replace(/\D/g, '');
    if (val.startsWith('91')) val = val.substring(2);
    val = val.substring(0, 10);

    if (val.length === 0) e.target.value = '';
    else if (val.length <= 5) e.target.value = '+91 ' + val;
    else e.target.value = '+91 ' + val.substring(0, 5) + ' ' + val.substring(5, 10);
});

// Control Center Open/Close
topPullZone.addEventListener('click', () => {
    controlCenter.classList.add('active');
    homeScreen.style.transform = 'scale(0.95)';
    homeScreen.style.filter = 'blur(10px) brightness(0.6)';
});

controlCenter.addEventListener('click', (e) => {
    // If clicking outside cc modules, close it
    if (e.target.classList.contains('cc-content') || e.target.classList.contains('control-center') || e.target.classList.contains('cc-close-hint')) {
        closeControlCenter();
    }
});

function closeControlCenter() {
    controlCenter.classList.remove('active');
    homeScreen.style.transform = 'scale(1)';
    homeScreen.style.filter = 'blur(0px) brightness(1)';
}

// Open ConnectX Modal
btnConnectX.addEventListener('click', () => {
    overlay.classList.add('active');
    modalShare.classList.add('active');
});

function closeAllModals() {
    document.querySelectorAll('.glass-modal').forEach(m => m.classList.remove('active'));
    overlay.classList.remove('active');
    // Ensure cc resets if we opened from there
    closeControlCenter();
    resetForms();
}

function resetForms() {
    inputMobile.value = '';
    inputMobile.parentElement.classList.remove('has-error');
    otpBoxes.forEach(box => box.value = '');
    document.getElementById('otp-error').parentElement.classList.remove('has-error');
    document.getElementById('otp-error').style.display = 'none';
}

// Select Data
dataOpts.forEach(btn => {
    btn.addEventListener('click', () => {
        dataOpts.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        selectedData = btn.dataset.val;
    });
});

// Proceed to OTP
btnSendOtp.addEventListener('click', () => {
    enteredMobile = inputMobile.value.replace(/\D/g, '');
    if (enteredMobile.length !== 12) { // Needs 91 + 10 digits
        inputMobile.parentNode.classList.add('has-error');
        return;
    }
    inputMobile.parentNode.classList.remove('has-error');

    // Switch to step 2
    document.getElementById('display-number').innerText = inputMobile.value;
    modalShare.classList.remove('active');

    // Simulate slight delay for "sending OTP"
    setTimeout(() => {
        modalOtp.classList.add('active');
        otpBoxes[0].focus();
    }, 300);
});

// Back from OTP
btnBackOtp.addEventListener('click', () => {
    modalOtp.classList.remove('active');
    modalShare.classList.add('active');
});

// OTP Input Logic (Auto-focus next)
otpBoxes.forEach((box, i) => {
    box.addEventListener('input', (e) => {
        if (box.value && i < 3) {
            otpBoxes[i + 1].focus();
        }
    });
    box.addEventListener('keydown', (e) => {
        if (e.key === 'Backspace' && !box.value && i > 0) {
            otpBoxes[i - 1].focus();
        }
    });
});

// Verify & Transfer
btnVerify.addEventListener('click', () => {
    const otp = Array.from(otpBoxes).map(b => b.value).join('');
    if (otp.length < 4) {
        document.getElementById('otp-error').style.display = 'block';
        return;
    }
    document.getElementById('otp-error').style.display = 'none';

    // Switch to Loading
    modalOtp.classList.remove('active');
    modalLoading.classList.add('active');

    // Simulate API request/Transfer
    setTimeout(() => {
        document.getElementById('success-data').innerText = selectedData;
        document.getElementById('success-number').innerText = inputMobile.value;

        modalLoading.classList.remove('active');
        modalSuccess.classList.add('active');
    }, 2000);
});
