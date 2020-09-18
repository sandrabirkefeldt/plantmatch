"use strict";

// Web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDqo3bvIq7-YaxChuVF4GShgpuaffy8T1M",
    authDomain: "plant-match-bef7b.firebaseapp.com",
    databaseURL: "https://plant-match-bef7b.firebaseio.com",
    projectId: "plant-match-bef7b",
    storageBucket: "plant-match-bef7b.appspot.com",
    messagingSenderId: "46789833113",
    appId: "1:46789833113:web:87ee664e9519c0e38b6308"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

let _firebaseUI;

// ========== FIREBASE AUTH ========== //
// Listen on authentication state change
firebase.auth().onAuthStateChanged(function (user) {
    if (user) { // if user exists and is authenticated
        userAuthenticated(user);
    } else { // if user is not logged in
        userNotAuthenticated();
    }
});

function userAuthenticated(user) {
    appendUserData(user);
    hideTabbar(false);
}

function userNotAuthenticated() {
    hideTabbar(true);
    showPage("login");

    // Firebase UI configuration
    const uiConfig = {
        credentialHelper: firebaseui.auth.CredentialHelper.NONE,
        signInOptions: [
            firebase.auth.EmailAuthProvider.PROVIDER_ID
        ],
        signInSuccessUrl: '#plants' // Efter log ind kommer man ind på swipe-siden
    };
    // Init Firebase UI Authentication
    if (!_firebaseUI) {
        _firebaseUI = new firebaseui.auth.AuthUI(firebase.auth());
    }
    _firebaseUI.start('#firebaseui-auth-container', uiConfig);
}

// show and hide tabbar
function hideTabbar(hide) {
    let tabbar = document.querySelector('#tabbar');
    if (hide) {
        tabbar.classList.add("hide");
    } else {
        tabbar.classList.remove("hide");
    }
}


// sign out user
function logout() {
    firebase.auth().signOut();
    console.log()
    showPage('login'); // Ved log ud bliver man sendt tilbage til login siden

}

// Indsætter de indtastet data fra oprettelse af bruger på ens profil
function appendUserData(user) {
    console.log(user);
    document.querySelector('#user-data').innerHTML = `
  <img id="logo" src="img/logo-gron.png" alt="logo">
    <h3>${user.displayName}</h3>
    <p>${user.email}</p>
  `;
}