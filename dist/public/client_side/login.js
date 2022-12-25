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

/***/ "./client_side/login.ts":
/*!******************************!*\
  !*** ./client_side/login.ts ***!
  \******************************/
/***/ (function(__unused_webpack_module, exports) {

eval("\r\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nconst login_button = document.getElementById(\"login-button\");\r\nlocalStorage.clear();\r\n// const socket = io();\r\n// socket.emit(\"hi\");\r\nconsole.log(login_button);\r\nlogin_button.onclick = () => __awaiter(void 0, void 0, void 0, function* () {\r\n    const username = document.getElementById(\"username\");\r\n    const password = document.getElementById(\"password\");\r\n    const loginData = {\r\n        username: username.value,\r\n        pass: password.value\r\n    };\r\n    const response = yield fetch(\"/members/login\", {\r\n        method: \"POST\",\r\n        headers: {\r\n            'Content-Type': 'application/json'\r\n        },\r\n        body: JSON.stringify(loginData)\r\n    });\r\n    const { token, error } = yield response.json();\r\n    if (error) {\r\n        const msg = document.getElementById(\"error-msg\");\r\n        msg.innerText = error;\r\n    }\r\n    else {\r\n        localStorage.setItem(\"token\", token);\r\n        location.href = \"./home\";\r\n    }\r\n    console.log(\"token: \" + token);\r\n    console.log(\"error: \" + error);\r\n});\r\n\n\n//# sourceURL=webpack://db-project/./client_side/login.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./client_side/login.ts"](0, __webpack_exports__);
/******/ 	
/******/ })()
;