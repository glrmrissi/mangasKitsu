import { getImageProfile } from "../../../pages/profile/process/process.js";
const profilePhotoGlobal = document.querySelector("#profilePhotoGlobal");
window.addEventListener("load", async function () {
  profilePhotoGlobal.setAttribute("src", await getImageProfile());
});
