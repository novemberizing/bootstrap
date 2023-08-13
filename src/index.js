import Star from "./Star.js";

if(typeof window.novemberizing === 'undefined') {
    console.error('need to ...');
} else {
    console.log(1);
    if(typeof window.novemberizing.bootstrap === 'undefined') {
        window.novemberizing.bootstrap = { Star };
    } else {
        window.novemberizing.bootstrap.Star = Star;
    }
}
