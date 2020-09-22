"use strict";

// SWIPE SIDEN
// Carousel håndtere animationer og at man kan swipe mellem planterne
import Carousel from "./carousel.js";

let board = document.querySelector("#board");

let carousel = new Carousel(board);

// Lister alle planter tilføjet i Wordpress i et array
let _plants = [];

//Tilføjer de liket planter til ens favorit ved hjælp af et array
let _favorits = [];

// Henter alt vores data om de forskellige planter fra Wordpress ved hjælp af en API
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
      <img src="${plant.acf.kort_info_image.url}">
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

// Henter ID'et fra den liket plante og når plante ID er = ID fra den liket plante returnerer den planten
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
    <h3>Inspiration til hjemmet</h3>
    <img src="${plant.acf.image_2.url}">
    <img src="${plant.acf.image_3.url}">
    </div>
  `;
  document.querySelector('#plant-information').innerHTML = template;
  navigateTo("plant-information"); // Tilføjer vores template til HTML med innerHTML, og guider videre til den enkelte side for hver plante
}