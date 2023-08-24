import novemberizing from "./novemberizing.js";

export default class StarUI {
    static #root = `<p class="d-inline-flex gap-1 star"></p>`;
    static #button = `<button type="button"></button>`;
    static #press = `<i class="fa-solid fa-star"></i>`;
    static #unpress = `<i class="fa-regular fa-star"></i>`;

    static {
        const parser = new DOMParser();

        StarUI.#root = parser.parseFromString(StarUI.#root, "text/html").querySelector("p");
        StarUI.#button = parser.parseFromString(StarUI.#button, "text/html").querySelector("button");
        StarUI.#press = parser.parseFromString(StarUI.#press, "text/html").querySelector("i");
        StarUI.#unpress = parser.parseFromString(StarUI.#unpress, "text/html").querySelector("i");
    }

    #parent = null;
    #next = null;
    #element = null;
    #options = null;
    #max = null;
    #min = null;
    #def = null;

    static load(options) {
        const elements = document.querySelectorAll("input[type='range'].form-control.star");
        for(const element of elements) {
            const o = new StarUI(element, typeof options === 'function' ? options(element) : options);
        }
    }

    static #createRoot() {
        return StarUI.#root.cloneNode(true);
    }

    static #createBtn(value, press) {
        const button = StarUI.#button.cloneNode(true);
        button.setAttribute("data-value", value + 1);
        button.setAttribute("aria-pressed", press);
        if(press) {
            button.appendChild(StarUI.#press.cloneNode(true));
        } else {
            button.appendChild(StarUI.#unpress.cloneNode(true));
        }
        button.addEventListener("click", e => {
            const button = novemberizing.dom.parent(e.target, "button");
            const p = novemberizing.dom.parent(button, "p");
            const input = novemberizing.dom.previous(p, "input");
            const value = parseInt(button.getAttribute("data-value"));
            const press = button.getAttribute("aria-pressed");
            const next = button.nextElementSibling;

            if(press === 'true') {
                if(next && next.getAttribute("aria-pressed") === 'true') {
                    input.setAttribute("value", value);
                } else {
                    input.setAttribute("value", value - 1);
                }
            } else {
                input.setAttribute("value", value);
            }

            const current = parseInt(input.getAttribute("value"));
            const nodes = p.querySelectorAll('button');
            for(const node of nodes) {
                const i = node.querySelector("i");
                const value = parseInt(node.getAttribute("data-value"));
                if(current < value) {
                    if(i.classList.contains("fa-solid")) {
                        i.classList.replace("fa-solid", "fa-regular");
                    }
                    node.setAttribute("aria-pressed", "false");
                } else {
                    if(i.classList.contains("fa-regular")) {
                        i.classList.replace("fa-regular", "fa-solid");
                    }
                    node.setAttribute("aria-pressed", "true");
                }
            }
        });
        return button;
    } 

    constructor(element, options) {
        this.#element = element;
        this.#options = options;

        if(typeof this.#element === "string") this.#element = document.getElementById(this.#element);

        this.#parent = this.#element.parentNode;
        this.#next = this.#element.nextSibling;

        this.#max = parseInt(this.#element.max);
        this.#min = parseInt(this.#element.min);
        this.#def = parseInt(this.#element.defaultValue);

        const root = StarUI.#createRoot();

        for(let i = this.#min; i < this.#max; i++) {
            const button = StarUI.#createBtn(i, i < this.#def);
            root.appendChild(button);
        }

        this.#element.style.display = "none";
        this.#parent.insertBefore(root, this.#next);
    }
}
