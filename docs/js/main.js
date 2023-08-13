/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ var __webpack_modules__ = ({

/***/ "./src/Star.js":
/*!*********************!*\
  !*** ./src/Star.js ***!
  \*********************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Star)\n/* harmony export */ });\n\r\n/** DOM */\r\nconst novemberizing = {\r\n    dom: {\r\n        parent: (node, name) => {\r\n            while(node && node.nodeName && node.nodeName.toLowerCase() !== name) {\r\n                node = node.parentNode;\r\n            }\r\n            return node;\r\n        },\r\n        previous: (node, name) => {\r\n            while(node && node.nodeName.toLowerCase() !== name) {\r\n                node = node.previousElementSibling;\r\n            }\r\n            return node;\r\n        }\r\n    }\r\n}\r\n\r\nclass Star {\r\n    static #root = /* html */ `<p class=\"d-inline-flex gap-1 star\"></p>`;\r\n    static #button = /* html */ `<button type=\"button\"></button>`;\r\n    static #press = /* html */ `<i class=\"fa-solid fa-star\"></i>`;\r\n    static #unpress = /* html */ `<i class=\"fa-regular fa-star\"></i>`;\r\n\r\n    static {\r\n        const parser = new DOMParser();\r\n\r\n        Star.#root = parser.parseFromString(Star.#root, \"text/html\").querySelector(\"p\");\r\n        Star.#button = parser.parseFromString(Star.#button, \"text/html\").querySelector(\"button\");\r\n        Star.#press = parser.parseFromString(Star.#press, \"text/html\").querySelector(\"i\");\r\n        Star.#unpress = parser.parseFromString(Star.#unpress, \"text/html\").querySelector(\"i\");\r\n    }\r\n\r\n    #parent = null;\r\n    #next = null;\r\n    #element = null;\r\n    #options = null;\r\n    #max = null;\r\n    #min = null;\r\n    #def = null;\r\n\r\n    static load(options) {\r\n        const elements = document.querySelectorAll(\"input[type='range'].form-control.star\");\r\n        for(const element of elements) {\r\n            const o = new Star(element, typeof options === 'function' ? options(element) : options);\r\n        }\r\n    }\r\n\r\n    static #createRoot() {\r\n        return Star.#root.cloneNode(true);\r\n    }\r\n\r\n    static #createBtn(value, press) {\r\n        const button = Star.#button.cloneNode(true);\r\n        button.setAttribute(\"data-value\", value + 1);\r\n        button.setAttribute(\"aria-pressed\", press);\r\n        if(press) {\r\n            button.appendChild(Star.#press.cloneNode(true));\r\n        } else {\r\n            button.appendChild(Star.#unpress.cloneNode(true));\r\n        }\r\n        button.addEventListener(\"click\", e => {\r\n            const button = novemberizing.dom.parent(e.target, \"button\");\r\n            const p = novemberizing.dom.parent(button, \"p\");\r\n            const input = novemberizing.dom.previous(p, \"input\");\r\n            const value = parseInt(button.getAttribute(\"data-value\"));\r\n            const press = button.getAttribute(\"aria-pressed\");\r\n            const next = button.nextElementSibling;\r\n\r\n            if(press === 'true') {\r\n                if(next && next.getAttribute(\"aria-pressed\") === 'true') {\r\n                    input.setAttribute(\"value\", value);\r\n                } else {\r\n                    input.setAttribute(\"value\", value - 1);\r\n                }\r\n            } else {\r\n                input.setAttribute(\"value\", value);\r\n            }\r\n\r\n            const current = parseInt(input.getAttribute(\"value\"));\r\n            const nodes = p.querySelectorAll('button');\r\n            for(const node of nodes) {\r\n                const i = node.querySelector(\"i\");\r\n                const value = parseInt(node.getAttribute(\"data-value\"));\r\n                if(current < value) {\r\n                    if(i.classList.contains(\"fa-solid\")) {\r\n                        i.classList.replace(\"fa-solid\", \"fa-regular\");\r\n                    }\r\n                    node.setAttribute(\"aria-pressed\", \"false\");\r\n                } else {\r\n                    if(i.classList.contains(\"fa-regular\")) {\r\n                        i.classList.replace(\"fa-regular\", \"fa-solid\");\r\n                    }\r\n                    node.setAttribute(\"aria-pressed\", \"true\");\r\n                }\r\n            }\r\n        });\r\n        return button;\r\n    } \r\n\r\n    constructor(element, options) {\r\n        this.#element = element;\r\n        this.#options = options;\r\n\r\n        if(typeof this.#element === \"string\") this.#element = document.getElementById(this.#element);\r\n\r\n        this.#parent = this.#element.parentNode;\r\n        this.#next = this.#element.nextSibling;\r\n\r\n        this.#max = parseInt(this.#element.max);\r\n        this.#min = parseInt(this.#element.min);\r\n        this.#def = parseInt(this.#element.defaultValue);\r\n\r\n        const root = Star.#createRoot();\r\n\r\n        for(let i = this.#min; i < this.#max; i++) {\r\n            const button = Star.#createBtn(i, i < this.#def);\r\n            root.appendChild(button);\r\n        }\r\n\r\n        this.#element.style.display = \"none\";\r\n        this.#parent.insertBefore(root, this.#next);\r\n    }\r\n}\r\n\r\n\n\n//# sourceURL=webpack://@novemberizing/bootstrap/./src/Star.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Star_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Star.js */ \"./src/Star.js\");\n\r\n\r\nif(typeof window.novemberizing === 'undefined') {\r\n    console.error('need to ...');\r\n} else {\r\n    console.log(1);\r\n    if(typeof window.novemberizing.bootstrap === 'undefined') {\r\n        window.novemberizing.bootstrap = { Star: _Star_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"] };\r\n    } else {\r\n        window.novemberizing.bootstrap.Star = _Star_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"];\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://@novemberizing/bootstrap/./src/index.js?");

/***/ })

/******/ });
/************************************************************************/
/******/ // The module cache
/******/ var __webpack_module_cache__ = {};
/******/ 
/******/ // The require function
/******/ function __webpack_require__(moduleId) {
/******/ 	// Check if module is in cache
/******/ 	var cachedModule = __webpack_module_cache__[moduleId];
/******/ 	if (cachedModule !== undefined) {
/******/ 		return cachedModule.exports;
/******/ 	}
/******/ 	// Create a new module (and put it into the cache)
/******/ 	var module = __webpack_module_cache__[moduleId] = {
/******/ 		// no module.id needed
/******/ 		// no module.loaded needed
/******/ 		exports: {}
/******/ 	};
/******/ 
/******/ 	// Execute the module function
/******/ 	__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 
/******/ 	// Return the exports of the module
/******/ 	return module.exports;
/******/ }
/******/ 
/************************************************************************/
/******/ /* webpack/runtime/define property getters */
/******/ (() => {
/******/ 	// define getter functions for harmony exports
/******/ 	__webpack_require__.d = (exports, definition) => {
/******/ 		for(var key in definition) {
/******/ 			if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 				Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 			}
/******/ 		}
/******/ 	};
/******/ })();
/******/ 
/******/ /* webpack/runtime/hasOwnProperty shorthand */
/******/ (() => {
/******/ 	__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ })();
/******/ 
/******/ /* webpack/runtime/make namespace object */
/******/ (() => {
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = (exports) => {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/ })();
/******/ 
/************************************************************************/
/******/ 
/******/ // startup
/******/ // Load entry module and return exports
/******/ // This entry module can't be inlined because the eval devtool is used.
/******/ var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 
