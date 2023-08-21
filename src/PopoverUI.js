import novemberizing from "./novemberizing.js";

/**
 * TODO: onResize 적용
 * TODO: remove Event Handler 적용
 * TODO: 공통으로 사용하는 코드 함수화
 */
export default class PopoverUI {
    static #popovers = new Set();

    static #off() {
        for(const popover of PopoverUI.#popovers) {
            const element = document.getElementById(popover);
            if(element.classList.contains("show")) {
                element.classList.replace("show", "hide");
            } else {
                element.classList.add("hide");
            }
        }
    }

    static on(event, id, container) {
        const target = document.getElementById(id);
        if(target.classList.contains('hide')) {
            target.classList.replace('hide', 'show');
            PopoverUI.#off();
            PopoverUI.#popovers.add(id);
        } else {
            target.classList.add('show');
            PopoverUI.#off();
            PopoverUI.#popovers.add(id);
        }
        const button = novemberizing.dom.parent(event.target, "button");
        const rect = button.getBoundingClientRect();
        target.addEventListener("click", e => {
            PopoverUI.toggle(event, id, container);
        }, { once: true });
        console.log(rect, rect.bottom, window.scrollY);
        if(container) {
            const rect = container.getBoundingClientRect();
            target.style.left = `${rect.left + 20}px`;
            target.style.width = `${rect.width - 40}px`;
        } else {
            target.style.left = `${rect.left}px`;
        }
        const targetRect = target.getBoundingClientRect();
        console.log(targetRect);
        target.style.top = `${parseInt(rect.top + window.scrollY - targetRect.height - 4)}px`;
    }
    static toggle(event, id, container = undefined) {
        const target = document.getElementById(id);
        if(target.classList.contains('hide')) {
            PopoverUI.#off();
            target.classList.replace('hide', 'show');
            PopoverUI.#popovers.add(id);
            const button = novemberizing.dom.parent(event.target, "button");
            const rect = button.getBoundingClientRect();
            console.log(rect, rect.bottom, window.scrollY);
            target.addEventListener("click", e => {
                PopoverUI.toggle(event, id, container);
            }, { once: true });

            if(container) {
                const rect = container.getBoundingClientRect();
                target.style.left = `${rect.left + 20}px`;
                target.style.width = `${rect.width - 40}px`;
            } else {
                target.style.left = `${rect.left}px`;
            }
            
            const targetRect = target.getBoundingClientRect();
            console.log(targetRect);
            target.style.top = `${parseInt(rect.top + window.scrollY - targetRect.height - 4)}px`;
        } else if(target.classList.contains('show')) {
            PopoverUI.#popovers.delete(id);
            target.classList.replace('show', 'hide');
        } else {
            PopoverUI.#off();
            target.classList.add('show');
            PopoverUI.#popovers.add(id);

            const button = novemberizing.dom.parent(event.target, "button");
            const rect = button.getBoundingClientRect();
            console.log(rect, rect.bottom, window.scrollY);
            target.addEventListener("click", e => {
                PopoverUI.toggle(event, id, container);
            }, { once: true });

            if(container) {
                const rect = container.getBoundingClientRect();
                target.style.left = `${rect.left + 20}px`;
                target.style.width = `${rect.width - 40}px`;
            } else {
                target.style.left = `${rect.left}px`;
            }

            const targetRect = target.getBoundingClientRect();
            console.log(targetRect);
            target.style.top = `${parseInt(rect.top + window.scrollY - targetRect.height - 4)}px`;
        }
    }
}
