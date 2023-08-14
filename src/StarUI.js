
/** DOM */
const novemberizing = {
    dom: {
        parent: (node, name) => {
            while(node && node.nodeName && node.nodeName.toLowerCase() !== name) {
                node = node.parentNode;
            }
            return node;
        },
        previous: (node, name) => {
            while(node && node.nodeName.toLowerCase() !== name) {
                node = node.previousElementSibling;
            }
            return node;
        }
    }
}

export default class Star {
    static #root = /* html */ `<p class="d-inline-flex gap-1 star"></p>`;
    static #button = /* html */ `<button type="button"></button>`;
    static #press = /* html */ `<i class="fa-solid fa-star"></i>`;
    static #unpress = /* html */ `<i class="fa-regular fa-star"></i>`;

    static {
        const parser = new DOMParser();

        Star.#root = parser.parseFromString(Star.#root, "text/html").querySelector("p");
        Star.#button = parser.parseFromString(Star.#button, "text/html").querySelector("button");
        Star.#press = parser.parseFromString(Star.#press, "text/html").querySelector("i");
        Star.#unpress = parser.parseFromString(Star.#unpress, "text/html").querySelector("i");
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
            const o = new Star(element, typeof options === 'function' ? options(element) : options);
        }
    }

    static #createRoot() {
        return Star.#root.cloneNode(true);
    }

    static #createBtn(value, press) {
        const button = Star.#button.cloneNode(true);
        button.setAttribute("data-value", value + 1);
        button.setAttribute("aria-pressed", press);
        if(press) {
            button.appendChild(Star.#press.cloneNode(true));
        } else {
            button.appendChild(Star.#unpress.cloneNode(true));
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

        const root = Star.#createRoot();

        for(let i = this.#min; i < this.#max; i++) {
            const button = Star.#createBtn(i, i < this.#def);
            root.appendChild(button);
        }

        this.#element.style.display = "none";
        this.#parent.insertBefore(root, this.#next);
    }
}

