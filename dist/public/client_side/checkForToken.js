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

/***/ "./client_side/checkForToken.ts":
/*!**************************************!*\
  !*** ./client_side/checkForToken.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.checkForToken = void 0;\r\nfunction checkForToken() {\r\n    const { token } = localStorage;\r\n    console.log(\"hanyyyyy\");\r\n    console.log(token);\r\n    if (!token)\r\n        location.href = \"/\";\r\n}\r\nexports.checkForToken = checkForToken;\r\ncheckForToken();\r\n\n\n//# sourceURL=webpack://db-project/./client_side/checkForToken.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./client_side/checkForToken.ts"](0, __webpack_exports__);
/******/ 	
/******/ })()
;