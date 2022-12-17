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
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\r\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nconst Book_1 = __webpack_require__(/*! ../src/db/interfaces/Book */ \"./src/db/interfaces/Book.ts\");\r\nlet totalLibraryBooks;\r\nlet displayedLibraryBooks;\r\nconst token = localStorage.getItem('token');\r\nvar source = localStorage.getItem('target-entity');\r\nlet search = document.getElementById('search');\r\nlet card_body = document.getElementById(\"error-card\");\r\nlet reset = document.getElementById('reset-btn');\r\nlet rows = document.querySelectorAll('tr');\r\nlet selected_item = document.getElementById('selected-item');\r\nlet accordion_selection = document.getElementById('accordion-selection');\r\nvar selected_item_name = document.getElementById('selected-element-name');\r\nvar selected_item_author = document.getElementById('selected-element-author');\r\nvar selected_item_ISBN = document.getElementById('selected-element-ISBN');\r\nvar selected_item_rating = document.getElementById('selected-element-rating');\r\nvar reserve_div = document.getElementById('reserve');\r\nlet description = document.getElementById('description');\r\nfunction GetEntities() {\r\n    return __awaiter(this, void 0, void 0, function* () {\r\n        switch (source) {\r\n            case 'library books':\r\n                const request = yield fetch(`/books?type=${Book_1.BookType.LIBRARY_BOOK}`, {\r\n                    headers: {\r\n                        'Authorization': JSON.stringify(\"Bearer \" + token)\r\n                    }\r\n                });\r\n                totalLibraryBooks = yield request.json();\r\n                displayedLibraryBooks = totalLibraryBooks;\r\n                break;\r\n            case 'bookstore books':\r\n                //Fetch bookstore books\r\n                break;\r\n            case 'reservations':\r\n                //Fetch reservations\r\n                break;\r\n            case 'borrows':\r\n                //Fetch Borrows\r\n                break;\r\n            case 'workshops':\r\n                //Fetch workshops\r\n                break;\r\n            case 'enrollments':\r\n                //Fetch Enrollments\r\n                break;\r\n            case 'upcoming events':\r\n                //Fetch Upcoming Events\r\n                break;\r\n            case 'previous events':\r\n                //Fetch Previous Events\r\n                break;\r\n        }\r\n    });\r\n}\r\nfunction prepareHeader() {\r\n    let tableHeader = document.getElementById('table-header');\r\n    switch (source) {\r\n        case 'library books':\r\n            tableHeader.innerHTML = '<th scope=\"col\">ISBN</th><th scope=\"col\">Book Name</th><th scope=\"col\">Genre</th><th scope=\"col\">Author</th><th scope=\"col\">Rating</th><th scope=\"col\">Available Quantity</th>';\r\n            break;\r\n        case 'bookstore books':\r\n            tableHeader.innerHTML = '<th scope=\"col\">#</th><th scope=\"col\">Book Name</th><th scope=\"col\">Genre</th><th scope=\"col\">Author</th><th scope=\"col\">Rating</th><th scope=\"col\">Description</th><th scope=\"col\">Available Quantity</th>';\r\n            break;\r\n        case 'reservations':\r\n            tableHeader.innerHTML = '<th scope=\"col\">ISBN</th><th scope=\"col\">Book Name</th><th scope=\"col\">Reservation Date</th><th scope=\"col\">Deadline</th>';\r\n            break;\r\n        case 'borrows':\r\n            tableHeader.innerHTML = '<th scope=\"col\">ISBN</th><th scope=\"col\">Book Name</th><th scope=\"col\">Accepting Staff Member</th><th scope=\"col\">Borrow Date</th><th scope=\"col\">Deadline</th>';\r\n            break;\r\n        case 'workshops':\r\n            tableHeader.innerHTML = '<th scope=\"col\">Workshop Title</th><th scope=\"col\">Enrollment Price</th><th scope=\"col\">Instructor Name</th><th scope=\"col\">Sponsoring Organization</th><th scope=\"col\">Average Rating</th>';\r\n            break;\r\n        case 'enrollments':\r\n            tableHeader.innerHTML = '<th scope=\"col\">Workshop Title</th><th scope=\"col\">Enrollment Date</th><th scope=\"col\">Start Date</th><th scope=\"col\">End Date</th>';\r\n            break;\r\n        case 'upcoming events':\r\n            tableHeader.innerHTML = '<th scope=\"col\">Attending Author</th><th scope=\"col\">Date</th><th scope=\"col\">Start Time</th><th scope=\"col\">End Time</th>';\r\n            break;\r\n        case 'previous events':\r\n            tableHeader.innerHTML = '<th scope=\"col\">Attending Author</th><th scope=\"col\">Date</th><th scope=\"col\">Start Time</th><th scope=\"col\">End Time</th><th scope=\"col\">Average Rating</th>';\r\n            break;\r\n    }\r\n}\r\nfunction Show() {\r\n    let element = document.getElementById(\"table-body\");\r\n    element.innerHTML = \"\";\r\n    switch (source) {\r\n        case 'library books':\r\n            displayedLibraryBooks.forEach((book) => {\r\n                element.innerHTML += \"<tr> <td>\" + book.isbn + \"</td>\" + \"<td>\" + book.book_name + \"</td>\" + \"<td>\" + book.genre + \"</td>\" + \"<td>\" + book.author + \"</td>\" + \"<td>\" + book.avg_rating + \"</td>\" + \"<td>\" + book.borrow_quantity + \"</td>\" + \"</tr>\";\r\n            });\r\n            break;\r\n        case 'bookstore books':\r\n            //Display bookstore books\r\n            break;\r\n        case 'reservations':\r\n            //Display reservations\r\n            break;\r\n        case 'borrows':\r\n            //Display Borrows\r\n            break;\r\n        case 'workshops':\r\n            //Display workshops\r\n            break;\r\n        case 'enrollments':\r\n            //Display Enrollments\r\n            break;\r\n        case 'upcoming events':\r\n            //Display Upcoming Events\r\n            break;\r\n        case 'previous events':\r\n            //Display Previous Events\r\n            break;\r\n    }\r\n    rows = document.querySelectorAll('tr');\r\n    rows.forEach(row => {\r\n        row === null || row === void 0 ? void 0 : row.addEventListener('click', function handleRowPress(event) {\r\n            selected_item === null || selected_item === void 0 ? void 0 : selected_item.scrollIntoView();\r\n            selected_item_name.innerHTML = \"Book Name: \" + displayedLibraryBooks[row.rowIndex - 1].book_name;\r\n            selected_item_author.innerHTML = \"Author: \" + displayedLibraryBooks[row.rowIndex - 1].author;\r\n            selected_item_ISBN.innerHTML = \"ISBN: \" + displayedLibraryBooks[row.rowIndex - 1].isbn;\r\n            selected_item_rating.innerHTML = \"Average Rating: \" + displayedLibraryBooks[row.rowIndex - 1].avg_rating.toString();\r\n            description.innerHTML = displayedLibraryBooks[row.rowIndex - 1].book_description;\r\n            accordion_selection.style.display = 'block';\r\n            reserve_div.style.display = 'block';\r\n        });\r\n    });\r\n}\r\nwindow.onload = function () {\r\n    return __awaiter(this, void 0, void 0, function* () {\r\n        reserve_div.style.display = 'none';\r\n        accordion_selection.style.display = 'none';\r\n        yield GetEntities();\r\n        prepareHeader();\r\n        Show();\r\n    });\r\n};\r\nsearch === null || search === void 0 ? void 0 : search.addEventListener('keypress', function handlePress(event) {\r\n    if (event.key != 'Enter') {\r\n        return;\r\n    }\r\n    card_body.innerHTML = \"\";\r\n    var name = search.value;\r\n    displayedLibraryBooks = [];\r\n    var i = 0;\r\n    for (var book of totalLibraryBooks) {\r\n        if (name.toLowerCase() === book.book_name.toLowerCase()) {\r\n            displayedLibraryBooks[i] = book;\r\n            i++;\r\n        }\r\n    }\r\n    if (i == 0) {\r\n        displayedLibraryBooks = [];\r\n        card_body.innerHTML = '<div class=\"card-body\"><i>No Book Exists With This Name. Please Check Your Spelling and Try Again.</i></div>';\r\n    }\r\n    Show();\r\n});\r\nreset === null || reset === void 0 ? void 0 : reset.addEventListener('click', function handlePress(event) {\r\n    card_body.innerHTML = \"\";\r\n    search.value = \"\";\r\n    displayedLibraryBooks = totalLibraryBooks;\r\n    selected_item_name.innerHTML = \"\";\r\n    selected_item_ISBN.innerHTML = \"\";\r\n    selected_item_author.innerHTML = \"\";\r\n    selected_item_rating.innerHTML = \"\";\r\n    reserve_div.style.display = 'none';\r\n    accordion_selection.style.display = 'none';\r\n    Show();\r\n});\r\n\n\n//# sourceURL=webpack://db-project/./client_side/DataTable.ts?");

/***/ }),

/***/ "./src/db/interfaces/Book.ts":
/*!***********************************!*\
  !*** ./src/db/interfaces/Book.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.BookType = void 0;\r\nvar BookType;\r\n(function (BookType) {\r\n    BookType[BookType[\"LIBRARY_BOOK\"] = 0] = \"LIBRARY_BOOK\";\r\n    BookType[BookType[\"BOOKSTORE_BOOK\"] = 1] = \"BOOKSTORE_BOOK\";\r\n})(BookType = exports.BookType || (exports.BookType = {}));\r\n\n\n//# sourceURL=webpack://db-project/./src/db/interfaces/Book.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./client_side/DataTable.ts");
/******/ 	
/******/ })()
;