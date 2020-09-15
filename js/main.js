"use strict";


let _plants = [];

async function getPlants() {
  let response = await fetch("http://sandrabirkefeldt.dk/wordpress/wp-json/wp/v2/posts");
  let data = await response.json();
  console.log(data);
  _plants = data;
  appendPlants(data);
}

getPlants();

// append movies to the DOM
function appendPlants(plants) {
  let htmlTemplate = "";
  for (let plant of plants) {
    htmlTemplate += /*html*/ `
      <article>
        <h2>${plant.title.rendered}</h2>
        <img src="${plant.acf.img}">
        <p>Størrelse: ${plant.acf.storrelse}</p>
        <p>Familie: ${plant.acf.familie}</p>
        <p>Oprindelse: ${plant.acf.oprindelse}</p>
        <p>${plant.content.rendered}</p>
      </article>
    `;
  }
  document.querySelector('#plants-container').innerHTML = htmlTemplate;
}