document.addEventListener('DOMContentLoaded', () => {


    let count = 1;
    const totalSlides = 6;

    document.getElementById("radio1").checked = true;

    setInterval(function () {
        nextImg();
    }, 6000);

    function nextImg() {
        const radioSelecionado = document.querySelector('input[name="radio-btn"]:checked');

        if (!radioSelecionado || parseInt(radioSelecionado.id.replace('radio', '')) === totalSlides) {
            count = 1;
        } else {
            count = parseInt(radioSelecionado.id.replace('radio', '')) + 1;
        }


        document.getElementById("radio" + count).checked = true;
        updateLabelBackground();
    }

    function updateLabelBackground() {
        var radioButtons = document.querySelectorAll('input[type="radio"]');
        var manualLabels = document.querySelectorAll('.manual_btn');

        radioButtons.forEach(function (radio, index) {
            if (radio.checked) {
                manualLabels[index].classList.add('checked');
            } else {
                manualLabels[index].classList.remove('checked');
            }
        });
    }

    updateLabelBackground();

    document.querySelectorAll('input[type="radio"]').forEach(function (radio) {
        radio.addEventListener('change', updateLabelBackground);
    });


    const track = document.querySelector('.slider');
    let isDragging = false;
    let startPos = 0;
    let currentTranslate = 0;
    let prevTranslate = 0;
    const maxTranslate = -1300;
    const minTranslate = 0;

    track.addEventListener('mousedown', (e) => {
        isDragging = true;
        startPos = e.clientX;
    });

    track.addEventListener('mousemove', (e) => {
        if (isDragging) {
            const currentPosition = e.clientX;
            currentTranslate = prevTranslate + currentPosition - startPos;

            if (currentTranslate > minTranslate) currentTranslate = minTranslate;
            if (currentTranslate < maxTranslate) currentTranslate = maxTranslate;

            track.style.transform = `translateX(${currentTranslate}px)`;
        }
    });

    track.addEventListener('mouseup', () => {
        isDragging = false;
        prevTranslate = currentTranslate;
    });

    track.addEventListener('mouseleave', () => {
        isDragging = false;
        prevTranslate = currentTranslate;
    });


    track.addEventListener('mousedown', (e) => {
        isDragging = true;
        startPos = e.clientX;
    });

    const carousel = document.querySelector('.slider');
    let startX, scrollLeft;

    carousel.addEventListener('touchstart', (e) => {
        isDragging = true;
        startX = e.touches[0].pageX - carousel.offsetLeft;
        scrollLeft = carousel.scrollLeft;
        e.preventDefault();
    });

    carousel.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        const x = e.touches[0].pageX - carousel.offsetLeft;
        const walk = (x - startX) * 2;
        carousel.scrollLeft = scrollLeft - walk;
        e.preventDefault();
    });

    carousel.addEventListener('touchend', () => {
        isDragging = false;
    });

    document.querySelectorAll('.carousel-track img').forEach(img => {
        img.setAttribute('draggable', 'false');
    });
})