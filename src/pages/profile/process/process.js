// Working for while

document.addEventListener("DOMContentLoaded", function () {
  let imageUrl;
  const reader = new FileReader();
  const imgDiv = document.querySelector(".user_img");
  const imgUser = document.querySelector("#photo");
  const uploadbtn = document.querySelector("#btnupload");
  const profilePhotoGlobal = document.querySelector("#profilePhotoGlobal");
  const savedImg = localStorage.getItem("userImage");
  const file = document.getElementById("file");

  savedImg
    ? (imgUser.setAttribute("src", savedImg),
      profilePhotoGlobal.setAttribute("src", savedImg))
    : savedImg;

  file == null ? (file = "") : file;

  file.addEventListener("change", async function () {
    const chosedFile = this.files[0];
    if (chosedFile) {
      reader.addEventListener("load", function () {
        imageUrl = reader.result;
        localStorage.setItem("userImage", imageUrl);

        profilePhotoGlobal.setAttribute("src", imageUrl);
        imgUser.setAttribute("src", imageUrl);
        localStorage.setItem("userImage", imageUrl);
      });
      reader.readAsDataURL(chosedFile);
    }
  });
});

const pathImg = [
  "/src/icon/profile.svg",
  "src/icon/profile.svg",
  "../../src/icon/profile.svg",
  "../../../src/icon/profile.svg"
];

// Sendo exportada em loadProfilePhoto.js

export async function getImageProfile() {
  const imageUrl = localStorage.getItem("userImage");

  if (imageUrl) return imageUrl

  let path;
  for (path of pathImg) {
    try {
      const response = await fetch(path);
      if (response.ok) {
        return path;
      }
    } catch (error) {
      console.error(`Error: ${path}`);
    }
  }
};