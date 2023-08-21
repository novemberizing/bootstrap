/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ var __webpack_modules__ = ({

/***/ "./src/DateUI.js":
/*!***********************!*\
  !*** ./src/DateUI.js ***!
  \***********************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ DateUI)\n/* harmony export */ });\n/* harmony import */ var _novemberizing_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./novemberizing.js */ \"./src/novemberizing.js\");\n\r\n\r\nclass DateUI {\r\n    static #all = /* html */ `<div class=\"calendar\">\r\n    <div class=\"input-group\">\r\n        <input type=\"text\" class=\"form-control\" data-date=\"\" disabled>\r\n        <span class=\"input-group-text\">\r\n            <button type=\"button\" class=\"btn btn-link\"><i class=\"fa-regular fa-calendar\"></i></button>\r\n        </span>\r\n    </div>\r\n    <div class=\"form calendar-form-ui small hide\" data-focus-date=\"\">\r\n        <div class=\"calendar-header d-flex justify-content-between mb-3\">\r\n            <button type=\"button\" class=\"btn btn-light btn-sm text-start month fw-bold\"></button>\r\n            <div>\r\n                <button type=\"button\" class=\"btn btn-light btn-sm up\"><i class=\"fa-solid fa-caret-up\"></i></button>\r\n                <button type=\"button\" class=\"btn btn-light btn-sm down\"><i class=\"fa-solid fa-caret-down\"></i></button>\r\n            </div>\r\n        </div>\r\n        <div class=\"calendar-body mb-2\">\r\n            <table class=\"table\">\r\n                <thead>\r\n                    <tr>\r\n                        <th scope=\"col\">Sun</th>\r\n                        <th scope=\"col\">Mon</th>\r\n                        <th scope=\"col\">Tue</th>\r\n                        <th scope=\"col\">Wed</th>\r\n                        <th scope=\"col\">Thu</th>\r\n                        <th scope=\"col\">Fri</th>\r\n                        <th scope=\"col\">Sat</th>\r\n                    </tr>\r\n                </thead>\r\n            </table>\r\n            <div class=\"calendar-date\">\r\n                <table class=\"table\">\r\n                    <tbody>\r\n                        <tr>\r\n                            <td><button type=\"button\" class=\"btn btn-link btn-sm\"></button></td>\r\n                            <td><button type=\"button\" class=\"btn btn-link btn-sm\"></button></td>\r\n                            <td><button type=\"button\" class=\"btn btn-link btn-sm\"></button></td>\r\n                            <td><button type=\"button\" class=\"btn btn-link btn-sm\"></button></td>\r\n                            <td><button type=\"button\" class=\"btn btn-link btn-sm\"></button></td>\r\n                            <td><button type=\"button\" class=\"btn btn-link btn-sm\"></button></td>\r\n                            <td><button type=\"button\" class=\"btn btn-link btn-sm\"></button></td>\r\n                        </tr>\r\n                    </tbody>\r\n                </table>\r\n            </div>\r\n        </div>\r\n        <div class=\"calendar-footer d-flex justify-content-between\">\r\n            <button type=\"button\" class=\"btn btn-light btn-sm erase\">삭제</button>\r\n            <button type=\"button\" class=\"btn btn-light btn-sm today\">오늘</button>\r\n        </div>\r\n    </div>\r\n</div>`;\r\n\r\n    static #root = null;\r\n    static #td = null;\r\n\r\n    static {\r\n        const parser = new DOMParser();\r\n\r\n        DateUI.#all = parser.parseFromString(DateUI.#all, \"text/html\");\r\n        DateUI.#root = DateUI.#all.querySelector(\"div.calendar\");\r\n\r\n        const div = DateUI.#root.querySelector(\"div.calendar-date\");\r\n        const tr = div.querySelector(\"tr\");\r\n\r\n        DateUI.#td = tr.querySelector(\"td\");\r\n        DateUI.#td = DateUI.#td.cloneNode(true);\r\n\r\n        tr.remove();\r\n    }\r\n\r\n    static load(options) {\r\n        const elements = document.querySelectorAll(`input[type=\"date\"].form-control`);\r\n        for(const element of elements) {\r\n            new DateUI(element, typeof options === 'function' ? options(element) : options);\r\n        }\r\n    }\r\n\r\n    #element = null;\r\n    #options = null;\r\n    #parent = null;\r\n    #next = null;\r\n\r\n    #calendar = null;\r\n    #input = null;\r\n    #form = null;\r\n    #body = null;\r\n\r\n    #hide() {\r\n        if(this.#form.classList.contains(\"show\")) {\r\n            this.#form.classList.replace(\"show\", \"hide\");\r\n        } else {\r\n            this.#form.classList.add(\"hide\");\r\n        }\r\n        _novemberizing_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].dom.children.remove(this.#body);\r\n        const focus = _novemberizing_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].date.month.begin(new Date());\r\n        this.#form.setAttribute(\"data-focus-date\", focus);\r\n        const begin = _novemberizing_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].date.week.begin(new Date(focus));\r\n        const title = this.#form.querySelector(\"div.calendar-header button.month\");\r\n        title.textContent = _novemberizing_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].date.month.str(focus);\r\n    }\r\n\r\n    #createDate(start, body, month, basis = null) {\r\n        let date = new Date(start);\r\n        for(let i = 0; i < 6; i++) {\r\n            if(!body.querySelector(`tr[data-date=\"${date}\"]`)) {\r\n                const tr = document.createElement(\"tr\");\r\n                tr.setAttribute(\"data-date\", date);\r\n                for(let j = 0; j < 7; j++) {\r\n                    const td = DateUI.#td.cloneNode(true);\r\n                    const button = td.querySelector(\"button\");\r\n                    button.appendChild(document.createTextNode(date.getDate()));\r\n                    const now = new Date(date);\r\n                    button.addEventListener(\"click\", e=> {\r\n                        if(this.#form.classList.contains(\"show\")) {\r\n                            this.#form.classList.replace(\"show\", \"hide\");\r\n                        } else {\r\n                            this.#form.classList.add(\"hide\");\r\n                        }\r\n                        const focus = _novemberizing_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].date.month.begin(new Date(now));\r\n                        this.#form.setAttribute(\"data-focus-date\", focus);\r\n                        this.#input.setAttribute(\"value\", _novemberizing_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].date.str(now));\r\n                        this.#input.setAttribute(\"data-date\", now);\r\n                        this.#element.setAttribute(\"value\", _novemberizing_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].date.str(now, '-'));\r\n                    });\r\n                    \r\n                    tr.appendChild(td);\r\n\r\n                    date = _novemberizing_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].date.next(date);\r\n                }\r\n                body.insertBefore(tr, basis);\r\n            } else {\r\n                date = _novemberizing_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].date.next(date, 7);\r\n            }\r\n        }\r\n        date = new Date(start);\r\n        const value = new Date(this.#input.getAttribute(\"data-date\"));\r\n\r\n        for(let i = 0; i < 6; i++) {\r\n            const tr = body.querySelector(`tr[data-date=\"${date}\"]`);\r\n            let td = tr.querySelector(\"td\");\r\n            for(let j = 0; j < 7; j++) {\r\n                const button = td.querySelector(\"button\");\r\n                button.classList.remove(\"active\");\r\n                button.classList.remove(\"fw-bold\");\r\n                if(date.getMonth() !== month) {\r\n                    if(!button.classList.contains(\"not-current\")) {\r\n                        button.classList.add(\"not-current\");\r\n                    }\r\n                } else {\r\n                    if(button.classList.contains(\"not-current\")) {\r\n                        button.classList.remove(\"not-current\");\r\n                    }\r\n                    if(_novemberizing_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].date.equal(date,value)) {\r\n                        button.classList.add(\"active\");\r\n                        button.classList.add(\"fw-bold\");\r\n                    }\r\n                }\r\n                date = _novemberizing_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].date.next(date);\r\n                td = td.nextElementSibling;\r\n            }\r\n        }\r\n    }\r\n\r\n    #scorll(element) {\r\n        element.scrollIntoView({ behavior: \"smooth\" });\r\n    }\r\n\r\n    #up(e) {\r\n        const focus = new Date(this.#form.getAttribute(\"data-focus-date\"));\r\n        const move = _novemberizing_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].date.month.previous(new Date(focus));\r\n        const start = _novemberizing_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].date.week.begin(new Date(move));\r\n        const begin = _novemberizing_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].date.week.begin(_novemberizing_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].date.month.begin(new Date(focus)));\r\n        const basis = this.#body.querySelector(`tr[data-date=\"${begin}\"]`);\r\n\r\n        this.#createDate(start, this.#body, move.getMonth(), basis);\r\n        this.#form.setAttribute(\"data-focus-date\", move);\r\n\r\n        const title = this.#form.querySelector(\"div.calendar-header button.month\");\r\n        title.textContent = _novemberizing_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].date.month.str(move);\r\n\r\n        this.#scorll(this.#body.querySelector(`tr[data-date=\"${start}\"]`));\r\n    }\r\n\r\n    #down(e) {\r\n        const focus = new Date(this.#form.getAttribute(\"data-focus-date\"));\r\n        const move = _novemberizing_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].date.month.next(new Date(focus));\r\n        const start = _novemberizing_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].date.week.begin(new Date(move));\r\n        const end = _novemberizing_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].date.next(new Date(start), 42);\r\n        const basis = this.#body.querySelector(`tr[data-date=\"${end}\"]`);\r\n\r\n        this.#createDate(start, this.#body, move.getMonth(), basis);\r\n        this.#form.setAttribute(\"data-focus-date\", move);\r\n\r\n        const title = this.#form.querySelector(\"div.calendar-header button.month\");\r\n        title.textContent = _novemberizing_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].date.month.str(move);\r\n\r\n        this.#scorll(this.#body.querySelector(`tr[data-date=\"${start}\"]`));\r\n    }\r\n\r\n    #position() {\r\n        const rect = this.#input.getBoundingClientRect();\r\n\r\n        this.#form.style.top = `${rect.top + rect.height + window.scrollY + 5}px`;\r\n        this.#form.style.left = `${rect.left + 5}px`;\r\n    }\r\n\r\n    #create(date) {\r\n        const focus = _novemberizing_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].date.month.begin(new Date(date));\r\n        const begin = _novemberizing_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].date.week.begin(new Date(focus));\r\n\r\n        this.#calendar = DateUI.#root.cloneNode(true);\r\n        const toggle = this.#calendar.querySelector(\"div.input-group button\");\r\n        this.#input = this.#calendar.querySelector(\"div.input-group input\");\r\n        this.#form = this.#calendar.querySelector(\"div.form\");\r\n        this.#body = this.#form.querySelector(\"div.form div.calendar-date tbody\");\r\n\r\n        for(const attribute of this.#element.attributes) {\r\n            this.#input.setAttribute(attribute.name, attribute.value);\r\n        }\r\n        this.#input.setAttribute(\"type\", \"text\");\r\n        this.#input.removeAttribute(\"id\");\r\n\r\n        const up = this.#form.querySelector(\"div.calendar-header button.up\");\r\n        up.addEventListener(\"click\", e => this.#up(e));\r\n\r\n        const down = this.#form.querySelector(\"div.calendar-header button.down\");\r\n        down.addEventListener(\"click\", e => this.#down(e));\r\n\r\n        const title = this.#form.querySelector(\"div.calendar-header button.month\");\r\n        title.textContent = _novemberizing_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].date.month.str(focus);\r\n\r\n        const today = this.#form.querySelector(\"div.calendar-footer button.today\");\r\n\r\n        today.addEventListener(\"click\", e => {\r\n            const now = new Date();\r\n            const focus = _novemberizing_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].date.month.begin(new Date(now));\r\n            this.#form.setAttribute(\"data-focus-date\", focus);\r\n            this.#input.setAttribute(\"value\", _novemberizing_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].date.str(now));\r\n            this.#input.setAttribute(\"data-date\", now);\r\n            this.#element.setAttribute(\"value\", _novemberizing_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].date.str(now, '-'));\r\n\r\n            if(this.#form.classList.contains(\"show\")) {\r\n                this.#form.classList.replace(\"show\", \"hide\");\r\n            } else {\r\n                this.#form.classList.replace(\"hide\", \"show\");\r\n                this.#position();\r\n            }\r\n        });\r\n        const erase = this.#form.querySelector(\"div.calendar-footer button.erase\");\r\n        erase.addEventListener(\"click\", e => {\r\n            const now = new Date();\r\n            const focus = _novemberizing_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].date.month.begin(new Date(now));\r\n            this.#form.setAttribute(\"data-focus-date\", focus);\r\n            this.#input.setAttribute(\"value\", '');\r\n            this.#input.setAttribute(\"data-date\", '');\r\n            this.#element.setAttribute(\"value\", '');\r\n\r\n            if(this.#form.classList.contains(\"show\")) {\r\n                this.#form.classList.replace(\"show\", \"hide\");\r\n            } else {\r\n                this.#form.classList.replace(\"hide\", \"show\");\r\n                this.#position();\r\n            }\r\n        });\r\n\r\n        this.#form.setAttribute(\"data-focus-date\", focus);\r\n\r\n        toggle.addEventListener(\"click\", e => {\r\n            if(this.#form.classList.contains(\"show\")) {\r\n                this.#form.classList.replace(\"show\", \"hide\");\r\n\r\n                _novemberizing_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].dom.children.remove(this.#body);\r\n                const focus = _novemberizing_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].date.month.begin(new Date());\r\n                this.#form.setAttribute(\"data-focus-date\", focus);\r\n                const begin = _novemberizing_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].date.week.begin(new Date(focus));\r\n                const title = this.#form.querySelector(\"div.calendar-header button.month\");\r\n                title.textContent = _novemberizing_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].date.month.str(focus);\r\n            } else if(this.#form.classList.contains(\"hide\")) {\r\n                _novemberizing_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].dom.children.remove(this.#body);\r\n    \r\n                const focus = new Date(this.#form.getAttribute(\"data-focus-date\"));\r\n                const begin = _novemberizing_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].date.week.begin(new Date(focus));\r\n                const basis = this.#body.querySelector(`tr[data-date=\"${begin}\"]`);\r\n                this.#createDate(begin, this.#body, focus.getMonth(), basis);\r\n                const title = this.#form.querySelector(\"div.calendar-header button.month\");\r\n                title.textContent = _novemberizing_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].date.month.str(focus);\r\n    \r\n                this.#form.classList.replace(\"hide\", \"show\");\r\n                this.#position();\r\n            }\r\n        });\r\n\r\n        this.#createDate(begin, this.#body, focus.getMonth());\r\n\r\n        this.#parent.insertBefore(this.#calendar, this.#next);\r\n    }\r\n\r\n    constructor(element, options) {\r\n        this.#element = element;\r\n        this.#options = options;\r\n\r\n        if(typeof this.#element === \"string\") this.#element = document.getElementById(this.#element);\r\n\r\n        this.#parent = this.#element.parentNode;\r\n        this.#next = this.#element.nextSibling;\r\n\r\n        const value = this.#element.getAttribute(\"value\") || this.#element.getAttribute(\"defaultValue\");\r\n\r\n        this.#create(value ? new Date(value) : new Date());\r\n\r\n        this.#element.style.display = \"none\";\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://@novemberizing/bootstrap/./src/DateUI.js?");

/***/ }),

/***/ "./src/PopoverUI.js":
/*!**************************!*\
  !*** ./src/PopoverUI.js ***!
  \**************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ PopoverUI)\n/* harmony export */ });\n/* harmony import */ var _novemberizing_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./novemberizing.js */ \"./src/novemberizing.js\");\n\r\n\r\nclass PopoverUI {\r\n    static #popovers = new Set();\r\n\r\n    static #off() {\r\n        for(const popover of PopoverUI.#popovers) {\r\n            const element = document.getElementById(popover);\r\n            if(element.classList.contains(\"show\")) {\r\n                element.classList.replace(\"show\", \"hide\");\r\n            } else {\r\n                element.classList.add(\"hide\");\r\n            }\r\n        }\r\n    }\r\n\r\n    static on(event, id, container) {\r\n        const target = document.getElementById(id);\r\n        if(target.classList.contains('hide')) {\r\n            target.classList.replace('hide', 'show');\r\n            PopoverUI.#off();\r\n            PopoverUI.#popovers.add(id);\r\n        } else {\r\n            target.classList.add('show');\r\n            PopoverUI.#off();\r\n            PopoverUI.#popovers.add(id);\r\n        }\r\n        const button = _novemberizing_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].dom.parent(event.target, \"button\");\r\n        const rect = button.getBoundingClientRect();\r\n        target.addEventListener(\"click\", e => {\r\n            PopoverUI.toggle(event, id, container);\r\n        }, { once: true });\r\n        console.log(rect, rect.bottom, window.scrollY);\r\n        if(container) {\r\n            const rect = container.getBoundingClientRect();\r\n            target.style.left = `${rect.left + 20}px`;\r\n            target.style.width = `${rect.width - 40}px`;\r\n        } else {\r\n            target.style.left = `${rect.left}px`;\r\n        }\r\n        const targetRect = target.getBoundingClientRect();\r\n        console.log(targetRect);\r\n        target.style.top = `${parseInt(rect.top + window.scrollY - targetRect.height)}px`;\r\n    }\r\n    static toggle(event, id, container = undefined) {\r\n        const target = document.getElementById(id);\r\n        if(target.classList.contains('hide')) {\r\n            PopoverUI.#off();\r\n            target.classList.replace('hide', 'show');\r\n            PopoverUI.#popovers.add(id);\r\n            const button = _novemberizing_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].dom.parent(event.target, \"button\");\r\n            const rect = button.getBoundingClientRect();\r\n            console.log(rect, rect.bottom, window.scrollY);\r\n            target.addEventListener(\"click\", e => {\r\n                PopoverUI.toggle(event, id, container);\r\n            }, { once: true });\r\n\r\n            if(container) {\r\n                const rect = container.getBoundingClientRect();\r\n                target.style.left = `${rect.left + 20}px`;\r\n                target.style.width = `${rect.width - 40}px`;\r\n            } else {\r\n                target.style.left = `${rect.left}px`;\r\n            }\r\n            \r\n            const targetRect = target.getBoundingClientRect();\r\n            console.log(targetRect);\r\n            target.style.top = `${parseInt(rect.top + window.scrollY - targetRect.height)}px`;\r\n        } else if(target.classList.contains('show')) {\r\n            PopoverUI.#popovers.delete(id);\r\n            target.classList.replace('show', 'hide');\r\n        } else {\r\n            PopoverUI.#off();\r\n            target.classList.add('show');\r\n            PopoverUI.#popovers.add(id);\r\n\r\n            const button = _novemberizing_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].dom.parent(event.target, \"button\");\r\n            const rect = button.getBoundingClientRect();\r\n            console.log(rect, rect.bottom, window.scrollY);\r\n            target.addEventListener(\"click\", e => {\r\n                PopoverUI.toggle(event, id, container);\r\n            }, { once: true });\r\n\r\n            if(container) {\r\n                const rect = container.getBoundingClientRect();\r\n                target.style.left = `${rect.left + 20}px`;\r\n                target.style.width = `${rect.width - 40}px`;\r\n            } else {\r\n                target.style.left = `${rect.left}px`;\r\n            }\r\n\r\n            const targetRect = target.getBoundingClientRect();\r\n            console.log(targetRect);\r\n            target.style.top = `${parseInt(rect.top + window.scrollY - targetRect.height)}px`;\r\n        }\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://@novemberizing/bootstrap/./src/PopoverUI.js?");

/***/ }),

/***/ "./src/StarUI.js":
/*!***********************!*\
  !*** ./src/StarUI.js ***!
  \***********************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Star)\n/* harmony export */ });\n/* harmony import */ var _novemberizing_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./novemberizing.js */ \"./src/novemberizing.js\");\n\r\n\r\nclass Star {\r\n    static #root = /* html */ `<p class=\"d-inline-flex gap-1 star\"></p>`;\r\n    static #button = /* html */ `<button type=\"button\"></button>`;\r\n    static #press = /* html */ `<i class=\"fa-solid fa-star\"></i>`;\r\n    static #unpress = /* html */ `<i class=\"fa-regular fa-star\"></i>`;\r\n\r\n    static {\r\n        const parser = new DOMParser();\r\n\r\n        Star.#root = parser.parseFromString(Star.#root, \"text/html\").querySelector(\"p\");\r\n        Star.#button = parser.parseFromString(Star.#button, \"text/html\").querySelector(\"button\");\r\n        Star.#press = parser.parseFromString(Star.#press, \"text/html\").querySelector(\"i\");\r\n        Star.#unpress = parser.parseFromString(Star.#unpress, \"text/html\").querySelector(\"i\");\r\n    }\r\n\r\n    #parent = null;\r\n    #next = null;\r\n    #element = null;\r\n    #options = null;\r\n    #max = null;\r\n    #min = null;\r\n    #def = null;\r\n\r\n    static load(options) {\r\n        const elements = document.querySelectorAll(\"input[type='range'].form-control.star\");\r\n        for(const element of elements) {\r\n            const o = new Star(element, typeof options === 'function' ? options(element) : options);\r\n        }\r\n    }\r\n\r\n    static #createRoot() {\r\n        return Star.#root.cloneNode(true);\r\n    }\r\n\r\n    static #createBtn(value, press) {\r\n        const button = Star.#button.cloneNode(true);\r\n        button.setAttribute(\"data-value\", value + 1);\r\n        button.setAttribute(\"aria-pressed\", press);\r\n        if(press) {\r\n            button.appendChild(Star.#press.cloneNode(true));\r\n        } else {\r\n            button.appendChild(Star.#unpress.cloneNode(true));\r\n        }\r\n        button.addEventListener(\"click\", e => {\r\n            const button = _novemberizing_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].dom.parent(e.target, \"button\");\r\n            const p = _novemberizing_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].dom.parent(button, \"p\");\r\n            const input = _novemberizing_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].dom.previous(p, \"input\");\r\n            const value = parseInt(button.getAttribute(\"data-value\"));\r\n            const press = button.getAttribute(\"aria-pressed\");\r\n            const next = button.nextElementSibling;\r\n\r\n            if(press === 'true') {\r\n                if(next && next.getAttribute(\"aria-pressed\") === 'true') {\r\n                    input.setAttribute(\"value\", value);\r\n                } else {\r\n                    input.setAttribute(\"value\", value - 1);\r\n                }\r\n            } else {\r\n                input.setAttribute(\"value\", value);\r\n            }\r\n\r\n            const current = parseInt(input.getAttribute(\"value\"));\r\n            const nodes = p.querySelectorAll('button');\r\n            for(const node of nodes) {\r\n                const i = node.querySelector(\"i\");\r\n                const value = parseInt(node.getAttribute(\"data-value\"));\r\n                if(current < value) {\r\n                    if(i.classList.contains(\"fa-solid\")) {\r\n                        i.classList.replace(\"fa-solid\", \"fa-regular\");\r\n                    }\r\n                    node.setAttribute(\"aria-pressed\", \"false\");\r\n                } else {\r\n                    if(i.classList.contains(\"fa-regular\")) {\r\n                        i.classList.replace(\"fa-regular\", \"fa-solid\");\r\n                    }\r\n                    node.setAttribute(\"aria-pressed\", \"true\");\r\n                }\r\n            }\r\n        });\r\n        return button;\r\n    } \r\n\r\n    constructor(element, options) {\r\n        this.#element = element;\r\n        this.#options = options;\r\n\r\n        if(typeof this.#element === \"string\") this.#element = document.getElementById(this.#element);\r\n\r\n        this.#parent = this.#element.parentNode;\r\n        this.#next = this.#element.nextSibling;\r\n\r\n        this.#max = parseInt(this.#element.max);\r\n        this.#min = parseInt(this.#element.min);\r\n        this.#def = parseInt(this.#element.defaultValue);\r\n\r\n        const root = Star.#createRoot();\r\n\r\n        for(let i = this.#min; i < this.#max; i++) {\r\n            const button = Star.#createBtn(i, i < this.#def);\r\n            root.appendChild(button);\r\n        }\r\n\r\n        this.#element.style.display = \"none\";\r\n        this.#parent.insertBefore(root, this.#next);\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://@novemberizing/bootstrap/./src/StarUI.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _StarUI_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./StarUI.js */ \"./src/StarUI.js\");\n/* harmony import */ var _DateUI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./DateUI.js */ \"./src/DateUI.js\");\n/* harmony import */ var _PopoverUI_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./PopoverUI.js */ \"./src/PopoverUI.js\");\n\r\n\r\n\r\n\r\nif(typeof window.novemberizing === 'undefined') {\r\n    console.error('need to ...');\r\n} else {\r\n    if(typeof window.novemberizing.bootstrap === 'undefined') {\r\n        window.novemberizing.bootstrap = {\r\n            Star: _StarUI_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"],\r\n            Date: _DateUI_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"],\r\n            popover: _PopoverUI_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"]\r\n        };\r\n    } else {\r\n        window.novemberizing.bootstrap.Star = _StarUI_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"];\r\n        window.novemberizing.bootstrap.Date = _DateUI_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"];\r\n        window.novemberizing.bootstrap.popover = _PopoverUI_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"];\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://@novemberizing/bootstrap/./src/index.js?");

/***/ }),

/***/ "./src/novemberizing.js":
/*!******************************!*\
  !*** ./src/novemberizing.js ***!
  \******************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n\r\nconst novemberizing = {\r\n    dom: {\r\n        parent: (node, name) => {\r\n            while(node && node.nodeName && node.nodeName.toLowerCase() !== name) {\r\n                node = node.parentNode;\r\n            }\r\n            return node;\r\n        },\r\n        previous: (node, name) => {\r\n            while(node && node.nodeName.toLowerCase() !== name) {\r\n                node = node.previousElementSibling;\r\n            }\r\n            return node;\r\n        },\r\n        children: {\r\n            remove: o => {\r\n                while(o.firstChild) {\r\n                    o.lastChild.remove();\r\n                }\r\n            }\r\n        }\r\n    },\r\n    date: {\r\n        equal: (x, y) => {\r\n            return x.getFullYear() === y.getFullYear() && x.getMonth() === y.getMonth() && x.getDate() === y.getDate();\r\n        },\r\n        str: (date, splitter = '/') => {\r\n            function adjust(n) {\r\n                return n < 10 ? `0${n}` : n;\r\n            }\r\n            return `${date.getFullYear()}${splitter}${adjust(date.getMonth() + 1)}${splitter}${adjust(date.getDate())}`;\r\n        },\r\n        next: (date, step = 1) => {\r\n            date.setDate(date.getDate() + step);\r\n            return date;\r\n        },\r\n        month: {\r\n            str: date => {\r\n                function adjust(n) {\r\n                    return n < 10 ? `0${n}` : n;\r\n                }\r\n                return `${date.getFullYear()}/${adjust(date.getMonth() + 1)}`;\r\n            },\r\n            begin: date => {\r\n                date.setDate(1);\r\n                date.setHours(0);\r\n                date.setMinutes(0);\r\n                date.setSeconds(0);\r\n                date.setMilliseconds(0);\r\n                return date;\r\n            },\r\n            previous: date => {\r\n                date.setMonth(date.getMonth() - 1);\r\n                date.setDate(1);\r\n                date.setHours(0);\r\n                date.setMinutes(0);\r\n                date.setSeconds(0);\r\n                date.setMilliseconds(0);\r\n                return date;\r\n            },\r\n            next: date => {\r\n                date.setMonth(date.getMonth() + 1);\r\n                date.setDate(1);\r\n                date.setHours(0);\r\n                date.setMinutes(0);\r\n                date.setSeconds(0);\r\n                date.setMilliseconds(0);\r\n                return date;\r\n            }\r\n        },\r\n        week: {\r\n            begin: date => {\r\n                date.setDate(date.getDate() - date.getDay());\r\n                date.setHours(0);\r\n                date.setMinutes(0);\r\n                date.setSeconds(0);\r\n                date.setMilliseconds(0);\r\n                return date;\r\n            }\r\n        }\r\n    }\r\n};\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (novemberizing);\n\n//# sourceURL=webpack://@novemberizing/bootstrap/./src/novemberizing.js?");

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
