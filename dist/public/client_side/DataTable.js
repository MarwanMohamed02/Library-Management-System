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

/***/ "./client_side/DataTable.ts":
/*!**********************************!*\
  !*** ./client_side/DataTable.ts ***!
  \**********************************/
/***/ (function (__unused_webpack_module, exports) {

        eval("\r\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nlet totalBooks;\r\nlet displayedBooks;\r\nfunction Show() {\r\n    let element = document.getElementById(\"MyTable\");\r\n    element.innerHTML = \"\";\r\n    for (let i = 0; i < displayedBooks.length; i++) {\r\n        element.innerHTML += \"<tr> <th scope=\\\"row\\\">\" + (i + 1) + \"</th>\" + \"<td>\" + displayedBooks[i].book_name + \"</td>\" + \"<td>\" + displayedBooks[i].genre + \"</td>\" + \"<td>\" + displayedBooks[i].author + \"</td>\" + \"<td>\" + displayedBooks[i].avg_rating + \"</td>\" + \"<td>\" + displayedBooks[i].book_description + \"</td>\" + \"</tr>\";\r\n    }\r\n}\r\nconst search = document.getElementById('search-a');\r\nsearch === null || search === void 0 ? void 0 : search.addEventListener('click', function handleClick(event) {\r\n    var element = document.getElementById(\"search\");\r\n    var name = element.value;\r\n    displayedBooks = [];\r\n    var i = 0;\r\n    for (var book of totalBooks) {\r\n        if (name == book.book_name) {\r\n            displayedBooks[i] = book;\r\n            i++;\r\n        }\r\n    }\r\n    if (i == 0) {\r\n        window.alert(\"No Book with this name\");\r\n        displayedBooks = totalBooks;\r\n    }\r\n    Show();\r\n});\r\nfunction GetEntities() {\r\n    return __awaiter(this, void 0, void 0, function* () {\r\n        const request = yield fetch(\"/books\");\r\n        totalBooks = yield request.json();\r\n    });\r\n}\r\nwindow.onload = function () {\r\n    return __awaiter(this, void 0, void 0, function* () {\r\n        yield GetEntities();\r\n        displayedBooks = totalBooks;\r\n        Show();\r\n    });\r\n};\r\n\n\n//# sourceURL=webpack://db-project/./client_side/DataTable.ts?");

        /***/
})

    /******/
});
/************************************************************************/
/******/
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./client_side/DataTable.ts"](0, __webpack_exports__);
  /******/
  /******/
})()
  ;