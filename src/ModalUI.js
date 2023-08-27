
export default class ModalUI {
    static #modal = null;

    static #show(modal) {
        ModalUI.#modal = modal;
        ModalUI.#modal._element.addEventListener("hidden.bs.modal", e => {
            ModalUI.#modal = null;
        }, { once: true });
        ModalUI.#modal.show();
    }

    static hide(callback) {
        if(ModalUI.#modal) {
            if(typeof callback === "function") {
                ModalUI.#modal._element.addEventListener("hidden.bs.modal", e => {
                    ModalUI.#modal = null;
                    callback();
                }, { once: true });
            }
            ModalUI.#modal.hide();
        }
    }

    static show(modal) {
        if(ModalUI.#modal) {
            ModalUI.#modal.hide();
            ModalUI.#modal._element.addEventListener("hidden.bs.modal", e => {
                ModalUI.#show(modal);
            }, { once: true });
        } else {
            ModalUI.#show(modal);
        }
    }
}