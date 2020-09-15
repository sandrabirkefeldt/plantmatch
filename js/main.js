"use strict";
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
  let template = "";
  for (const plant of plants) {
    template += /*html*/ `
    <article>
      <h2>${plant.title.rendered}</h2>
      <div class="slideshow-container">
        <img src="${plant.acf.image_1.url}" style="width=100%">
        <img src = "${plant.acf.image_2.url}" style = "width=100%">
        <img src = "${plant.acf.image_3.url}" style = "width=100%" >
  </div>
  </article>
    `;
    carousel.push(template);
  }
  carousel.handle();
}

// append plants to the DOM

// function appendPlants(plants) {
//   let htmlTemplate = "";
//   for (let plant of plants) {
//     htmlTemplate += /*html*/ `
//       <article>
//         <h2>${plant.title.rendered}</h2>
//         <p>Størrelse: ${plant.acf.storrelse}</p>
//         <p>Familie: ${plant.acf.familie}</p>
//         <p>Oprindelse: ${plant.acf.oprindelse}</p>
//         <p>${plant.content.rendered}</p>
//       </article>
//     `;
//   }
//   
//}