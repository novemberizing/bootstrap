import StarUI from "./StarUI.js";
import DateUI from "./DateUI.js";

if(typeof window.novemberizing === 'undefined') {
    console.error('need to ...');
} else {
    console.log(1);
    if(typeof window.novemberizing.bootstrap === 'undefined') {
        window.novemberizing.bootstrap = {
            Star: StarUI,
            Date: DateUI
        };
    } else {
        window.novemberizing.bootstrap.Star = StarUI;
        window.novemberizing.bootstrap.Date = DateUI;
    }
}
