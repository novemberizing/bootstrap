
export default class ValidityUI {
    static check(element, condition = true) {
        if(element.validity) {
            if(!element.validity.valid || !condition) {
                if(condition === false) {
                    element.setAttribute(value, "");
                }

                if(element.classList.contains("is-valid")) {
                    element.classList.replace("is-valid", "is-invalid");
                } else {
                    element.classList.add('is-invalid');
                }

                element.focus();
    
                return false;
            }

            element.classList.remove("is-valid");
            element.classList.remove("is-invalid");

            return true;
        }

        throw new Error(); // TODO: Change ...
    }
}