import novemberizing from "./novemberizing.js";

export default class PopoverUI {
    static on(event, id) {
        const target = document.getElementById(id);
        if(target.classList.contains('hide')) {
            target.classList.replace('hide', 'show');
        } else {
            target.classList.add('show');
        }
        const button = novemberizing.dom.parent(event.target, "button");
        const rect = button.getBoundingClientRect();
        target.addEventListener("click", e => {
            PopoverUI.toggle(event, id);
        }, { once: true });
        target.style.left = `${rect.left}px`;
        target.style.top = `${rect.top + window.scrollY - rect.height - 16}px`;
    }
    static toggle(event, id) {
        const target = document.getElementById(id);
        if(target.classList.contains('hide')) {
            target.classList.replace('hide', 'show');
            const button = novemberizing.dom.parent(event.target, "button");
            const rect = button.getBoundingClientRect();
            target.addEventListener("click", e => {
                PopoverUI.toggle(event, id);
            }, { once: true });
            target.style.left = `${rect.left}px`;
            target.style.top = `${rect.top + window.scrollY - rect.height - 16}px`;
        } else if(target.classList.contains('show')) {
            target.classList.replace('show', 'hide');
        } else {
            target.classList.add('show');
            const button = novemberizing.dom.parent(event.target, "button");
            const rect = button.getBoundingClientRect();
            target.addEventListener("click", e => {
                PopoverUI.toggle(event, id);
            }, { once: true });
            target.style.left = `${rect.left}px`;
            target.style.top = `${rect.top + window.scrollY - rect.height - 16}px`;
        }
    }
}
