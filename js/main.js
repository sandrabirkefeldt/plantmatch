"use strict";

// SWIPE SIDEN
import Carousel from "./carousel.js";

let board = document.querySelector("#board");

let carousel = new Carousel(board);

let _plants = [];

//Tilføjer de liket planter til ens favorit ved hjælp af et array
let _favorits = [];

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
//Henter her også de liket planter fra array'et og pusher til "mine favoritter"
window.like = function like(id) {
  console.log("like, post id " + id);
  _favorits.push(findFavorit(id));
  appendFavorits();
}

// Disliker et billede
window.dislike = function dislike(id) {
  console.log("dislike, post id " + id);
}

// FAVORIT SIDEN - Alle ens favoritter samlet
// Viser favoritter inde i "Mine favoritter"
window.showFavorit = function (id) {
  showFavorit(id);
}

// Henter ID'et fra den liket plante og kalder på funktionen forneden
function findFavorit(id) {
  for (const plant of _plants) {
    if (plant.id == id) {
      return plant;
    }
  }
}
// Henter den enkelte plante og tilføjer den til favoritsiden med innerHTML
function appendFavorits() {
  let favoritTemplate = "";
  for (const favorit of _favorits) {
    favoritTemplate += /*html*/ `
      <article onclick="showFavorit('${favorit.id}')">
        <img src="${favorit.acf.image_1.url}">
        <h2>${favorit.title.rendered}</h2>
      </article>
    `;
  }
  document.querySelector('.favorit-container').innerHTML = favoritTemplate;
}

// Oplysningsside for hver plante - Her kan man læse om den enkelte liket plante
function showFavorit(id) {
  let plant = findFavorit(id);
  let template = /*html*/ `
  <header class="topbar">
    <div class="topbar-top">
      <a href="#favoritter" class="fa" style="font-size: 50px; color: black; text-decoration: none; padding-left: 10px;">&#xf104;</a>
     <img id="logo" style="width: 80px;" src="img/logo-hvid.png" alt="Logo i hvid">
    
</div>

    <h2>${plant.title.rendered}</h2> 
  
    <div class="mini-info">
      <div class="mini-info-p">
    <p><b>Størrelse:</b> ${plant.acf.storrelse}</p>
    <p><b>Familie:</b> ${plant.acf.familie}</p>
    <p><b>Oprindelse:</b> ${plant.acf.oprindelse}</p>
</div>
    <img src="${plant.acf.image_1.url}">
</div>
    </header>
    <div class="plante-container">
      <h3 style="margin: 10px;">Overblik</h3>
      <img src="${plant.acf.kort_info_image.url}">
    <p>${plant.content.rendered}</p>
    <h2>Inspiration til hjemmet</h2>
    <img src="${plant.acf.image_2.url}">
    <img src="${plant.acf.image_3.url}">
    </div>
  `;
  document.querySelector('#plant-information').innerHTML = template;
  navigateTo("plant-information");
}


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
    signInSuccessUrl: '#plants'
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
}

function appendUserData(user) {
  console.log(user);
  document.querySelector('#user-data').innerHTML = `
    <img class="profile-img" src="${user.photoURL || "img/placeholder.jpg"}">
    <h3>${user.displayName}</h3>
    <p>${user.email}</p>
  `;
}