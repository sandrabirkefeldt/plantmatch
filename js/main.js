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

// Giver den liket plante et ID
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

// FAVORIT SIDEN
// Henter ID'et fra den liket plante og kalder på funktionen forneden
function FindFavorit(id) {
for (const plant of _plants) {
  if (plant.id == id) {
    appendFavorit(plant)
    console.log(plant);
  }
}
}
// Appender den enkelte plante og tilføjer den til favoritsiden med innerHTML
function appendFavorit(favorit) {
  let favoritTemplate = /*html*/ `
      <article>
        <img src="${favorit.acf.image_1.url}">
        <h2>${favorit.title.rendered}</h2>
      </article>
    `;
  document.querySelector('.favorit-container').innerHTML += favoritTemplate;
}