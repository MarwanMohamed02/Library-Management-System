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

/***/ "./client_side/warnings.ts":
/*!*********************************!*\
  !*** ./client_side/warnings.ts ***!
  \*********************************/
/***/ (() => {

eval("\r\nconst warnings_notification = document.getElementById(\"Warnings\");\r\nconst all = document.getElementById(\"WarPen\");\r\nconst War = document.getElementById(\"War\");\r\nconst Pen = document.getElementById(\"Pen\");\r\nconst Mytitle = document.getElementById(\"Mytitle\");\r\nconst Menu = document.getElementById(\"Menu\");\r\nall === null || all === void 0 ? void 0 : all.addEventListener('click', function handleClick(event) {\r\n    if (Mytitle != null)\r\n        Mytitle.innerText = \"Notifications: \";\r\n    if (Menu)\r\n        Menu.innerText = \"All\";\r\n});\r\nWar === null || War === void 0 ? void 0 : War.addEventListener('click', function handleClick(event) {\r\n    if (Mytitle != null)\r\n        Mytitle.innerText = \"Your Warnings: \";\r\n    if (Menu)\r\n        Menu.innerText = \"Warnings\";\r\n});\r\nPen === null || Pen === void 0 ? void 0 : Pen.addEventListener('click', function handleClick(event) {\r\n    if (Mytitle != null)\r\n        Mytitle.innerText = \"Your Penalties: \";\r\n    if (Menu)\r\n        Menu.innerText = \"Penalties\";\r\n});\r\nwindow.onload = function () {\r\n    for (let i = 0; i < employee.length; i++) {\r\n        Warnings_List.insertAdjacentHTML(\"afterbegin\", \"<a  href=\\\"#\\\" class=\\\"list-group-item list-group-item-action\\\"><div class=\\\"d-flex w-100 justify-content-between\\\"> <h5 class=\\\"mb-1\\\">\" + employee[i].emp_name + \"</h5><small class=\\\"text-muted\\\">\" + employee[i].emp_desg + \"</small></div><p class=\\\"mb-1\\\">\" + \"warning description\" + \"</p><small class=\\\"text-muted\\\">\" + employee[i].emp_id + \"</small></a>\");\r\n    }\r\n};\r\nlet Warnings_List = document.getElementById(\"Warninglist\");\r\nlet employee = [\r\n    { \"emp_id\": 0, \"emp_name\": \"Saideep\", \"emp_desg\": \"Tech Lead\" },\r\n    { \"emp_id\": 1, \"emp_name\": \"Karthik\", \"emp_desg\": \"Manager\" },\r\n    { \"emp_id\": 2, \"emp_name\": \"Kiran\", \"emp_desg\": \"Senior Systems Engineer\" }\r\n]; //this is for testing only but will be changed with an array containing the warnings\r\nwindow.onbeforeunload = () => {\r\n    // save notifications\r\n};\r\n\n\n//# sourceURL=webpack://db-project/./client_side/warnings.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./client_side/warnings.ts"]();
/******/ 	
/******/ })()
;