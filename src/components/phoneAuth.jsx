import React from 'react';
import firebase, { initializeApp} from 'firebase'

export default function Example() {
    
const firebaseConfig = {
apiKey: "AIzaSyC4rA1w4H5sRwXkxei0AjqgI_T99Jhk638",
authDomain: "acord-659d0.firebaseapp.com",
databaseURL: "https://acord-659d0.firebaseio.com",
projectId: "acord-659d0",
storageBucket: "acord-659d0.appspot.com",
messagingSenderId: "287905987520",
appId: "1:287905987520:web:52f2b886f9475385096625",
measurementId: "G-R27V84X3LB"
};

initializeApp(firebaseConfig)


///////////////////////////////////////////////////
window.onload = function() {
// Listening for auth state changes.
firebase.auth().onAuthStateChanged(function(user) {
if (user) {
// User is signed in.
var uid = user.uid;
var email = user.email;
var photoURL = user.photoURL;
var phoneNumber = user.phoneNumber;
var isAnonymous = user.isAnonymous;
var displayName = user.displayName;
var providerData = user.providerData;
var emailVerified = user.emailVerified;
}
updateSignInButtonUI();
updateSignInFormUI();
updateSignOutButtonUI();
updateSignedInUserStatusUI();
updateVerificationCodeFormUI();
});
// Event bindings.
document.getElementById('sign-out-button').addEventListener('click', onSignOutClick);
document.getElementById('phone-number').addEventListener('keyup', updateSignInButtonUI);
document.getElementById('phone-number').addEventListener('change', updateSignInButtonUI);
document.getElementById('verification-code').addEventListener('keyup', updateVerifyCodeButtonUI);
document.getElementById('verification-code').addEventListener('change', updateVerifyCodeButtonUI);
document.getElementById('verification-code-form').addEventListener('submit', onVerifyCodeSubmit);
document.getElementById('cancel-verify-code-button').addEventListener('click', cancelVerification);
// [START appVerifier]
window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
size: 'invisible',
callback: function(response) {
// reCAPTCHA solved, allow signInWithPhoneNumber.
onSignInSubmit();
}
});
// [END appVerifier]

window.recaptchaVerifier.render().then(function(widgetId) {
window.recaptchaWidgetId = widgetId;
updateSignInButtonUI();
});
};
/**
* Function called when clicking the Login/Logout button.
*/
function onSignInSubmit() {
if (isPhoneNumberValid()) {
window.signingIn = true;
updateSignInButtonUI();
var phoneNumber = getPhoneNumberFromUserInput();
var appVerifier = window.recaptchaVerifier;
firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
.then(function (confirmationResult) {
// SMS sent. Prompt user to type the code from the message, then sign the
// user in with confirmationResult.confirm(code).
window.confirmationResult = confirmationResult;
window.signingIn = false;
updateSignInButtonUI();
updateVerificationCodeFormUI();
updateVerifyCodeButtonUI();
updateSignInFormUI();
}).catch(function (error) {
// Error; SMS not sent
console.error('Error during signInWithPhoneNumber', error);
window.alert('Error during signInWithPhoneNumber:\n\n'
+ error.code + '\n\n' + error.message);
window.signingIn = false;
updateSignInFormUI();
updateSignInButtonUI();
});
}
}
/**
* Function called when clicking the "Verify Code" button.
*/
function onVerifyCodeSubmit(e) {
e.preventDefault();
if (!!getCodeFromUserInput()) {
window.verifyingCode = true;
updateVerifyCodeButtonUI();
var code = getCodeFromUserInput();
window.confirmationResult.confirm(code).then(function (result) {
// User signed in successfully.
var user = result.user;
window.verifyingCode = false;
window.confirmationResult = null;
updateVerificationCodeFormUI();
}).catch(function (error) {
// User couldn't sign in (bad verification code?)
console.error('Error while checking the verification code', error);
window.alert('Error while checking the verification code:\n\n'
+ error.code + '\n\n' + error.message);
window.verifyingCode = false;
updateSignInButtonUI();
updateVerifyCodeButtonUI();
});
}
}
/**
* Cancels the verification code input.
*/
function cancelVerification(e) {
e.preventDefault();
window.confirmationResult = null;
updateVerificationCodeFormUI();
updateSignInFormUI();
}
/**
* Signs out the user when the sign-out button is clicked.
*/
function onSignOutClick() {
firebase.auth().signOut();
}
/**
* Reads the verification code from the user input.
*/
function getCodeFromUserInput() {
return document.getElementById('verification-code').value;
}
/**
* Reads the phone number from the user input.
*/
function getPhoneNumberFromUserInput() {
return document.getElementById('phone-number').value;
}
/**
* Returns true if the phone number is valid.
*/
function isPhoneNumberValid() {
var pattern = /^\+[0-9\s\-\(\)]+$/;
var phoneNumber = getPhoneNumberFromUserInput();
return phoneNumber.search(pattern) !== -1;
}
/**
* Re-initializes the ReCaptacha widget.
*/
function resetReCaptcha() {
if (typeof window.grecaptcha !== 'undefined'
&& typeof window.recaptchaWidgetId !== 'undefined') {
window.grecaptcha.reset(window.recaptchaWidgetId);
}
}
/**
* Updates the Sign-in button state depending on ReCAptcha and form values state.
*/
function updateSignInButtonUI() {
document.getElementById('sign-in-button').disabled =
!isPhoneNumberValid()
|| !!window.signingIn;
}
/**
* Updates the Verify-code button state depending on form values state.
*/
function updateVerifyCodeButtonUI() {
document.getElementById('verify-code-button').disabled =
!!window.verifyingCode
|| !getCodeFromUserInput();
}
/**
* Updates the state of the Sign-in form.
*/
function updateSignInFormUI() {
if (firebase.auth().currentUser || window.confirmationResult) {
document.getElementById('sign-in-form').style.display = 'none';
} else {
resetReCaptcha();
document.getElementById('sign-in-form').style.display = 'block';
}
}
/**
* Updates the state of the Verify code form.
*/
function updateVerificationCodeFormUI() {
if (!firebase.auth().currentUser && window.confirmationResult) {
document.getElementById('verification-code-form').style.display = 'block';
} else {
document.getElementById('verification-code-form').style.display = 'none';
}
}
/**
* Updates the state of the Sign out button.
*/
function updateSignOutButtonUI() {
if (firebase.auth().currentUser) {
document.getElementById('sign-out-button').style.display = 'block';
} else {
document.getElementById('sign-out-button').style.display = 'none';
}
}
/**
* Updates the Signed in user status panel.
*/
function updateSignedInUserStatusUI() {
var user = firebase.auth().currentUser;
if (user) {
document.getElementById('sign-in-status').textContent = 'Signed in';
document.getElementById('account-details').textContent = JSON.stringify(user, null, ' ');
} else {
document.getElementById('sign-in-status').textContent = 'Signed out';
document.getElementById('account-details').textContent = 'null';
}
}
////////////////////////////////////////////////////




return (

<div className="demo-layout mdl-layout mdl-js-layout mdl-layout--fixed-header">
    <main className="mdl-layout__content mdl-color--grey-100">
        <div className="mdl-cell mdl-cell--12-col mdl-cell--12-col-tablet mdl-grid">
            <div id="sign-in-card"
                className="mdl-card mdl-shadow--2dp mdl-cell mdl-cell--12-col mdl-cell--12-col-tablet mdl-cell--12-col-desktop">
                <div className="mdl-card__supporting-text mdl-color-text--grey-600">
                    <p>Sign in with your phone number below.</p>
                    <form id="sign-in-form" action="#">
                        <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                            <input className="mdl-textfield__input" type="text" pattern="\+[0-9\s\-\(\)]+"
                                id="phone-number" />
                            <label className="mdl-textfield__label" htmlFor="phone-number">Enter your phone
                                number...</label>
                            <span className="mdl-textfield__error">Input is not an international phone number!</span>
                        </div>
                        <button className="mdl-button mdl-js-button mdl-button--raised"
                            id="sign-in-button">Sign-in</button>
                    </form>
                    <button className="mdl-button mdl-js-button mdl-button--raised"
                        id="sign-out-button">Sign-out</button>
                    <form id="verification-code-form" action="#">
                        <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                            <input className="mdl-textfield__input" type="text" id="verification-code" />
                            <label className="mdl-textfield__label" htmlFor="verification-code">Enter the verification
                                code...</label>
                        </div>
                        <input type="submit" className="mdl-button mdl-js-button mdl-button--raised"
                            id="verify-code-button" value="Verify Code" />
                        <button className="mdl-button mdl-js-button mdl-button--raised"
                            id="cancel-verify-code-button">Cancel</button>
                    </form>
                </div>
            </div>
            <div id="user-details-card"
                className="mdl-card mdl-shadow--2dp mdl-cell mdl-cell--12-col mdl-cell--12-col-tablet mdl-cell--12-col-desktop">
                <div className="mdl-card__title mdl-color--light-blue-600 mdl-color-text--white">
                    <h2 className="mdl-card__title-text">User sign-in status</h2>
                </div>
                <div className="mdl-card__supporting-text mdl-color-text--grey-600">
                    <div className="user-details-container">
                        Firebase sign-in status: <span id="sign-in-status">Unknown</span>
                        <div>Firebase auth <code>currentUser</code> object value:</div>
                        <pre><code id="account-details">null</code></pre>
                    </div>
                </div>
            </div>
        </div>
    </main>
</div>
);
}