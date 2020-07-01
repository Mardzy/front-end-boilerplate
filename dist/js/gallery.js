/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/components/gallery.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/components/gallery.js":
/*!**************************************!*\
  !*** ./src/js/components/gallery.js ***!
  \**************************************/
/*! exports provided: LoadGallery */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"LoadGallery\", function() { return LoadGallery; });\n/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./helpers */ \"./src/js/components/helpers/index.js\");\n\nvar _window = window,\n    localStorage = _window.localStorage;\nvar characters = [];\nvar searchValue = '';\nvar LoadGallery = function LoadGallery(data) {\n  console.log(data.length, 'Characters found');\n  return data;\n};\n/**\n * Handle search bar submit\n * @param event\n */\n\nvar searchBar = Object(_helpers__WEBPACK_IMPORTED_MODULE_0__[\"getElementByClass\"])('.search-bar');\n\nvar handleSubmit = function handleSubmit(event) {\n  event.preventDefault();\n  searchValue = searchBar.elements.search.value;\n};\n\nif (searchBar) {\n  searchBar.addEventListener('submit', handleSubmit);\n}\n/**\n * Fetch Characters from local storage\n * @returns {any}\n */\n\n\nvar getCharacters = JSON.parse(localStorage.getItem('star-wars-characters'));\n\nvar filterCharacters = function filterCharacters(search) {\n  return getCharacters.filter(function (character) {\n    return character.name === search;\n  });\n};\n/**\n * Send character to local storage\n * @param name\n * @returns {*[]}\n */\n\n\nvar sendCharacterToLocalStorage = function sendCharacterToLocalStorage(name) {\n  return characters.filter(function (_char) {\n    var startCaseName = name.includes('_') ? name.replace('_', ' ') : name;\n\n    if (_char.name === startCaseName) {\n      return localStorage.setItem('character', JSON.stringify(_char));\n    }\n  });\n};\n\nvar characterGallery = Object(_helpers__WEBPACK_IMPORTED_MODULE_0__[\"getElementByClass\"])('.gallery__row');\ncharacters = searchValue.length > 1 ? filterCharacters(searchValue) : getCharacters;\n/**\n * Make certain names are all in original format\n * @param name\n * @returns {*}\n */\n\nvar normalizeName = function normalizeName(name) {\n  return name.includes(' ') ? name.replace(/ /g, '_') : name;\n};\n/**\n * Create gallery items\n * @type {boolean|string[]}\n */\n\n\nvar characterGalleryItems = characters && !!characters.length && characters.map(function (_ref) {\n  var image = _ref.image,\n      name = _ref.name,\n      wiki = _ref.wiki;\n  return \"<div class=\\\"card col-md-12 col-lg-4 gallery__col\\\" style=\\\"width: 18rem;\\\">\\n        <a href=\\\"/front-end-boilerplate/dist/character.html\\\" class=\\\"gallery__link\\\" id=\".concat(normalizeName(name), \">\\n            <img src=\").concat(image || _helpers__WEBPACK_IMPORTED_MODULE_0__[\"backupImage\"], \" class=\\\"card-img-top\\\" alt=\").concat(normalizeName(name), \">      \\n        </a>\\n        <div class=\\\"card-body\\\">\\n          <h2 class=\\\"card-title\\\">\").concat(name, \"</h2>\\n          <a href=\").concat(wiki, \" class=\\\"btn btn-secondary\\\" target=\\\"_blank\\\">Wiki</a>         \\n        </div>\\n      </div>\");\n});\n\nif (characterGallery && characterGalleryItems) {\n  characterGallery.innerHTML = characterGalleryItems !== null ? characterGalleryItems.join('') : [];\n}\n/**\n * Handles click event on gallery link\n * @param event\n */\n\n\nvar galleryLink = Object(_helpers__WEBPACK_IMPORTED_MODULE_0__[\"getElementByClass\"])('.gallery__link');\n\nif (galleryLink) {\n  document.addEventListener('click', function (event) {\n    localStorage.removeItem('character');\n    sendCharacterToLocalStorage(event.target.alt || event.target.id);\n  });\n}\n\n//# sourceURL=webpack:///./src/js/components/gallery.js?");

/***/ }),

/***/ "./src/js/components/helpers/index.js":
/*!********************************************!*\
  !*** ./src/js/components/helpers/index.js ***!
  \********************************************/
/*! exports provided: getElementByClass, backupImage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getElementByClass\", function() { return getElementByClass; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"backupImage\", function() { return backupImage; });\nvar getElementByClass = function getElementByClass(className) {\n  return document.querySelector(className);\n};\nvar backupImage = 'https://www.pngkit.com/png/detail/49-498166_yoda-silhouette-png-star-wars-topps-funny.png';\n\n//# sourceURL=webpack:///./src/js/components/helpers/index.js?");

/***/ })

/******/ });