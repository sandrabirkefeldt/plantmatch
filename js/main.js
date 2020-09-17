"use strict";

// SWIPE SIDEN
import Carousel from "./carousel.js";

let board = document.querySelector("#board");

let carousel = new Carousel(board);

let _plants = [];

let favoritter = [];

async function getPlants() {
  let response = await fetch("http://sandrabirkefeldt.dk/wordpress/wp-json/wp/v2/posts");
  let data = await response.json();
  console.log(data);
  _plants = data;
  appendPlants(data);
}

getPlants();

function appendPlants(plants) {
  for (const plant of plants) {
    let template = /*html*/ `
    <article>
      <h2>${plant.title.rendered}</h2>
      <img src="${plant.acf.image_1.url}">
  </article>
    `;
    carousel.push(template, plant.id);
  }
  carousel.handle();
}

// Giver den liket plante et ID. Eks. ID 76, 79, 73...
window.like = function like(id) {
  console.log("like, post id " + id);
  favoritter.push(id);
  console.log(favoritter);
  FindFavorit(id)
}

// Disliker et billede
window.dislike = function dislike(id) {
  console.log("dislike, post id " + id);
}

// FAVORIT SIDEN - Alle ens favoritter samlet
// Henter ID'et fra den liket plante og kalder på funktionen forneden
function FindFavorit(id) {
  for (const plant of _plants) {
    if (plant.id == id) {
      appendFavorit(plant)
      console.log(plant);
    }
  }
}
// Henter den enkelte plante og tilføjer den til favoritsiden med innerHTML
function appendFavorit(favorit) {
  let favoritTemplate = /*html*/ `
      <article onclick="showFavorit('${favorit.title.rendered}')">
        <img src="${favorit.acf.image_1.url}">
        <h2>${favorit.title.rendered}</h2>
      </article>
    `;
  document.querySelector('.favorit-container').innerHTML += favoritTemplate;
}

function showFavorit(title) {
  let template = /*html*/ `
  <header class="topbar">
    <h2>${title}</h2>
    <div class="plante-container"></div>
    <a href="#favoritter" class="fa" style="font-size: 50px; color: black; text-decoration: none; padding-left: 10px;">&#xf104;</a>
    <img id="logo" style="width: 80px;" src="img/logo-hvid.png" alt="Logo i hvid">
    </header>
  `;
  document.querySelector('.informationsside').innerHTML = template;
  navigateTo("plant-information");
}

// Oplysningsside for hver plante - Her kan man læse om den enkelte liket plante







// Web app's Firebase configuration
var firebaseConfig = {
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
  showLoader(false);
}

function userNotAuthenticated() {
  hideTabbar(true);
  showPage("login");

  // Firebase UI configuration
  const uiConfig = {
    credentialHelper: firebaseui.auth.CredentialHelper.NONE,
    signInOptions: [
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID
    ],
    signInSuccessUrl: '#home'
  };
  // Init Firebase UI Authentication
  if (!_firebaseUI) {
    _firebaseUI = new firebaseui.auth.AuthUI(firebase.auth());
  }
  _firebaseUI.start('#firebaseui-auth-container', uiConfig);
  showLoader(false);
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
}

function appendUserData(user) {
  console.log(user);
  document.querySelector('#user-data').innerHTML = `
    <img class="profile-img" src="${user.photoURL || "img/placeholder.jpg"}">
    <h3>${user.displayName}</h3>
    <p>${user.email}</p>
  `;
}