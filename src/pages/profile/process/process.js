const reader = new FileReader();
let imageUrl
document.addEventListener('DOMContentLoaded', function () {
    const imgDiv = document.querySelector('.user_img');
    const imgUser = document.querySelector('#photo');
    const file = document.querySelector('#file');
    const uploadbtn = document.querySelector('#btnupload');
    const profilePhotoGlobal = document.querySelector('#profilePhotoGlobal');
    const savedImg = localStorage.getItem('userImage');

    if (savedImg) {
        imgUser.setAttribute('src', savedImg);
        profilePhotoGlobal.setAttribute('src', savedImg);
    }
    file.addEventListener('change', async function () {
        const chosedFile = this.files[0];
        if (chosedFile) {

            reader.addEventListener('load', function () {
                imageUrl = reader.result;
                localStorage.setItem('userImage', imageUrl);

                profilePhotoGlobal.setAttribute('src', imageUrl)
                imgUser.setAttribute('src', imageUrl);
                localStorage.setItem('userImage', imageUrl);
            });
            reader.readAsDataURL(chosedFile);
        }
    })
})

export function getImageProfile() {
    const imageUrl = localStorage.getItem('userImage');
    return imageUrl || './src/icon/profile.svg' || '../../../src/icon/profile.svg';
}