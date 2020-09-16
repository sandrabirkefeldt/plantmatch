"use strict";

// SWIPE SIDEN
import Carousel from "./carousel.js";

let board = document.querySelector("#board");

let carousel = new Carousel(board);

let _plants = [];

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
  <article>
    <button class="knap-dislike">dislike</button>
    <button class="knap-like">like</button>
  
  </article>

  
    `;
    carousel.push(template, plant.id);
  }
  carousel.handle();
}

window.like = function like(id) {
  console.log("like, post id " + id);
}

window.dislike = function dislike(id) {
  console.log("dislike, post id " + id);
}

// FAVORIT SIDEN