import StarUI from "./StarUI.js";
import DateUI from "./DateUI.js";
import PopoverUI from "./PopoverUI.js";
import ModalUI from "./ModalUI.js";
import ValidityUI from "./ValidityUI.js";

if(typeof window.novemberizing === 'undefined') {
    console.error('need to ...');
} else {
    if(typeof window.novemberizing.bootstrap === 'undefined') {
        window.novemberizing.bootstrap = {
            Star: StarUI,
            Date: DateUI,

            modal: ModalUI,
            popover: PopoverUI,
            validity: ValidityUI
        };
    } else {
        window.novemberizing.bootstrap.Star = StarUI;
        window.novemberizing.bootstrap.Date = DateUI;

        window.novemberizing.bootstrap.modal = ModalUI;
        window.novemberizing.bootstrap.popover = PopoverUI;
        window.novemberizing.bootstrap.validity = ValidityUI;
    }
}
