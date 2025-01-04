document.addEventListener('DOMContentLoaded', function () {

    const imgDiv = document.querySelector('.user_img');
    const imgUser = document.querySelector('#photo');
    const file = document.querySelector('#file');
    const uploadbtn = document.querySelector('#btnupload');

    const savedImg = localStorage.getItem('userImage')

    if (savedImg) {
        imgUser.setAttribute('src', savedImg);
    }
    file.addEventListener('change', function () {
        const chosedFile = this.files[0];
        if (chosedFile) {
            const reader = new FileReader();

            reader.addEventListener('load', function () {
                const imageUrl = reader.result;

                imgUser.setAttribute('src', imageUrl);
                localStorage.setItem('userImage', imageUrl);
            });
            reader.readAsDataURL(chosedFile);
        }
    })
})