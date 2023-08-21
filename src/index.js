import StarUI from "./StarUI.js";
import DateUI from "./DateUI.js";
import PopoverUI from "./PopoverUI.js";

if(typeof window.novemberizing === 'undefined') {
    console.error('need to ...');
} else {
    console.log(1);
    if(typeof window.novemberizing.bootstrap === 'undefined') {
        window.novemberizing.bootstrap = {
            Star: StarUI,
            Date: DateUI,
            popover: PopoverUI
        };
    } else {
        window.novemberizing.bootstrap.Star = StarUI;
        window.novemberizing.bootstrap.Date = DateUI;
        window.novemberizing.bootstrap.popover = PopoverUI;
    }
}
