import { getImageProfile } from "../../../pages/profile/process/process.js"
const profilePhotoGlobal = document.querySelector('#profilePhotoGlobal');
window.addEventListener('load', function() {
    profilePhotoGlobal.setAttribute('src', getImageProfile())
});