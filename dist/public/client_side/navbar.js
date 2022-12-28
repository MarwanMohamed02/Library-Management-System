/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./client_side/navbar.ts":
/*!*******************************!*\
  !*** ./client_side/navbar.ts ***!
  \*******************************/
/***/ (function() {

eval("\r\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\nconst library_btn = document.getElementById(\"btn-books-library\");\r\nconst bookstore_btn = document.getElementById(\"btn-books-bookstore\");\r\nconst reservations_btn = document.getElementById(\"btn-reservations\");\r\nconst borrows_btn = document.getElementById(\"btn-borrows\");\r\nconst workshops_btn = document.getElementById(\"btn-available-workshops\");\r\nconst enrollments_btn = document.getElementById(\"btn-enrollments\");\r\nconst upcoming_events_btn = document.getElementById(\"btn-upcoming-events\");\r\nconst prev_events_btn = document.getElementById(\"btn-prev-events\");\r\nconst warnings = document.getElementById(\"Warnings\");\r\nconst logo_navbar = document.getElementById(\"logo\");\r\nconst { token } = localStorage;\r\nlibrary_btn === null || library_btn === void 0 ? void 0 : library_btn.addEventListener('click', function handleClick(event) {\r\n    localStorage.setItem('target-entity', 'library books');\r\n    console.log(\"hamada\");\r\n});\r\nbookstore_btn === null || bookstore_btn === void 0 ? void 0 : bookstore_btn.addEventListener('click', function handleClick(event) {\r\n    localStorage.setItem('target-entity', 'bookstore books');\r\n});\r\nreservations_btn === null || reservations_btn === void 0 ? void 0 : reservations_btn.addEventListener('click', function handleClick(event) {\r\n    localStorage.setItem('target-entity', 'reservations');\r\n});\r\nborrows_btn === null || borrows_btn === void 0 ? void 0 : borrows_btn.addEventListener('click', function handleClick(event) {\r\n    localStorage.setItem('target-entity', 'borrows');\r\n});\r\nworkshops_btn === null || workshops_btn === void 0 ? void 0 : workshops_btn.addEventListener('click', function handleClick(event) {\r\n    localStorage.setItem('target-entity', 'workshops');\r\n});\r\nenrollments_btn === null || enrollments_btn === void 0 ? void 0 : enrollments_btn.addEventListener('click', function handleClick(event) {\r\n    localStorage.setItem('target-entity', 'enrollments');\r\n});\r\nupcoming_events_btn === null || upcoming_events_btn === void 0 ? void 0 : upcoming_events_btn.addEventListener('click', function handleClick(event) {\r\n    localStorage.setItem('target-entity', 'upcoming events');\r\n});\r\nprev_events_btn === null || prev_events_btn === void 0 ? void 0 : prev_events_btn.addEventListener('click', function handleClick(event) {\r\n    localStorage.setItem('target-entity', 'previous events');\r\n});\r\nwarnings === null || warnings === void 0 ? void 0 : warnings.addEventListener('click', function handleClick(event) {\r\n    location.href = \"warnings.html\";\r\n});\r\n// window.onload = function () {\r\n//     logo_navbar.innerText = \"10\";   //we should here call fetch function that will return count of warnings\r\n// }\r\n//Next lines related to warnings\r\n//Logout\r\nconst logout_button = document.getElementById(\"logout\");\r\nlogout_button.onclick = () => __awaiter(void 0, void 0, void 0, function* () {\r\n    yield fetch(\"members/logout\", {\r\n        method: \"POST\",\r\n        headers: {\r\n            'Content-Type': 'application/json',\r\n            'Authorization': `Bearer ${token}`\r\n        }\r\n    });\r\n    location.href = \"/\";\r\n});\r\n\n\n//# sourceURL=webpack://db-project/./client_side/navbar.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./client_side/navbar.ts"]();
/******/ 	
/******/ })()
;