import { io } from "socket.io-client";
import bootstrap from "bootstrap";
import Mustache from "mustache";

const socket = io();
// // const navContent = document.getElementById("navContent");
// // console.log(navContent);
// // const bsOffcanvas = new bootstrap.Offcanvas('#myOffcanvas')
// // bsOffcanvas.show(navContent as HTMLElement)
// const button = document.getElementById("navButton") as HTMLButtonElement;
// const homeButton = document.getElementById("home") as HTMLButtonElement;
// const featuresButton = document.getElementById("features") as HTMLButtonElement;

// console.log(homeButton, featuresButton);

// featuresButton.onclick = (e) => {
//     e.preventDefault();
//     homeButton.className = "nav-link";
//     featuresButton.className = "nav-link active"
// }

// homeButton.onclick = (e) => {
//     e.preventDefault();
//     featuresButton.className = "nav-link";
//     homeButton.className = "nav-link active"
// }
// button.onclick = (e) => {
//     e.preventDefault();
//     const navContent = document.getElementById("navContent") as HTMLElement;
//     console.log(navContent);
//     const bsOffcanvas = new bootstrap.Offcanvas(navContent)
//     bsOffcanvas.show();
// }



// async function func() {
//     const test_data = await fetch("/test");
//     return test_data
// }

// func().then(test_data => {
//     console.log(`Hiii  `)
//     let html = document.e
//     html = test_data as unknown as HTMLElement
// });
// console.log(`Hiii  `)
// let cardsContainer = document.getElementById("cards-container");
// const CardTemplate = document.getElementById("card-template")?.innerHTML as string;

// function createCard() {
//     const data = {
//         title: "Harry Potter",
//         description: "Wizards and Witches"
//     }

//     const updatedHTML = Mustache.render(CardTemplate, data);

//     cardsContainer?.insertAdjacentHTML("beforeend",updatedHTML);
// }

// createCard();
// createCard();
// createCard();