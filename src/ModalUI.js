
export default class ModalUI {
    static #modal = null;
    static #submit = null;
    static #cancel = null;

    static submit() {
        if(ModalUI.#modal) {
            const submit = ModalUI.#submit;
            ModalUI.#modal._element.addEventListener("hidden.bs.modal", e => {
                console.log(submit);
                if(submit) submit(e);
            }, { once: true });
            ModalUI.#modal.hide();
        }
    }

    static cancel() {
        ModalUI.#modal.hide();
    }

    static hide() {
        ModalUI.#modal.hide();
    }

    static #show(modal, submit, cancel) {
        ModalUI.#modal = modal;
        ModalUI.#submit = submit;
        ModalUI.#cancel = cancel;

        ModalUI.#modal._element.addEventListener("hidden.bs.modal", e => {
            ModalUI.#modal = null;
            ModalUI.#submit = null;
            ModalUI.#cancel = null;
        }, { once: true });

        ModalUI.#modal.show();
    }

    static show(modal, submit, cancel) {
        if(ModalUI.#modal) {
            ModalUI.#modal._element.addEventListener("hidden.bs.modal", e => {
                if(cancel) cancel(e);

                ModalUI.#show(modal, submit, cancel);
            }, { once: true });

            ModalUI.#modal.hide();
            return;
        }

        ModalUI.#show(modal, submit, cancel);
    }
}