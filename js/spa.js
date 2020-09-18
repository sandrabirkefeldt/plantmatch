"use strict";

// Gemmer alle sider væk
function hideAllPages() {
    let pages = document.querySelectorAll(".page");
    for (let page of pages) {
        page.style.display = "none";
    }
}

// Viser den enkelte side
function showPage(pageId) {
    hideAllPages();
    document.querySelector(`#${pageId}`).style.display = "block";
    setActiveTab(pageId);
}

// Når man trykker på menupunktet bliver man ledt videre til den pågældende side, men uden at loade den.
// Den navigerer ved hjælp af href
function setActiveTab(pageId) {
    let pages = document.querySelectorAll(".tabbar a");
    for (let page of pages) {
        if (`#${pageId}` === page.getAttribute("href")) {
            page.classList.add("active");
        } else {
            page.classList.remove("active");
        }
    }
}

// Ved tryk på nyt menupunkt guider den en videre til en ny side
function navigateTo(pageId) {
    location.href = `#${pageId}`;
}

// Sætter vores "home-page" som er swipesiden, til at være default ved hjælp af hash url.
// funktionen er kaldet 'onhashchange' og ligger i body-tag i HTML.
function pageChange() {
    let page = "plants";
    if (location.hash) {
        page = location.hash.slice(1);
    }
    showPage(page);
}

pageChange(); // called by default when the app is loaded for the first time