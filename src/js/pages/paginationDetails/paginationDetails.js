const btn_details = document.querySelectorAll(".btn-details")
const section_details = document.querySelectorAll(".section-details")

for (let i = 0; i < btn_details.length; i++) {
    btn_details[i].onclick = function () {
        for (let j = 0; j < btn_details.length; j++) {
            btn_details[j].classList.remove("actived");
            section_details[j].classList.remove("actived");
        }
        btn_details[i].classList.add("actived");
        section_details[i].classList.add("actived");
    }
}
