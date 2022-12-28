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

/***/ "./client_side/signup.ts":
/*!*******************************!*\
  !*** ./client_side/signup.ts ***!
  \*******************************/
/***/ (function() {

eval("\r\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\nconst signup_button = document.getElementById(\"signup-button\");\r\nsignup_button.onclick = () => __awaiter(void 0, void 0, void 0, function* () {\r\n    const firstname = document.getElementById(\"firstname\");\r\n    const lastname = document.getElementById(\"lastname\");\r\n    const username = document.getElementById(\"username\");\r\n    const email = document.getElementById(\"email\");\r\n    const password = document.getElementById(\"pass\");\r\n    const phone = document.getElementById(\"phonenumber\");\r\n    const signupData = {\r\n        firstname: firstname.value,\r\n        lastname: lastname.value,\r\n        email: email.value,\r\n        phone_number: phone.value,\r\n        username: username.value,\r\n        pass: password.value\r\n    };\r\n    const response = yield fetch(\"/members/signup\", {\r\n        method: \"POST\",\r\n        headers: {\r\n            'Content-Type': 'application/json'\r\n        },\r\n        body: JSON.stringify(signupData)\r\n    });\r\n    const { token, error } = yield response.json();\r\n    if (error) {\r\n        const msg = document.getElementById(\"error-msg\");\r\n        msg.innerText = error;\r\n    }\r\n    else {\r\n        localStorage.setItem(\"token\", token);\r\n        location.href = \"./home\";\r\n    }\r\n});\r\n\n\n//# sourceURL=webpack://db-project/./client_side/signup.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./client_side/signup.ts"]();
/******/ 	
/******/ })()
;