function loadScripts(scripts, callback) {
    let index = 1;

    function loadNextScripts() {
        if (index < scripts.length) {
            let script = document.createElement("script");
            script.type = "module"
            script.src = scripts[index]
            script.defer = true
            script.onload = function () {
                // console.log(`Scripts carregados: ${scripts[index]}`);
                index++;
                loadNextScripts();
            };
            script.onerror = function () {
                console.error(`Erro em: ${scripts[index]}`);
                index++;
                loadNextScripts();
            }
            document.head.appendChild(script)
        } else if (callback) {
            callback();
        }
    }
    loadNextScripts();
};

document.addEventListener("DOMContentLoaded", function () {
    loadScripts([
        'src/js/modules/search/search.js',
        'src/js/modules/fadeInOut/fadeInOut.js',
        'src/js/modules/goToTop/goToTop.js',
        'src/js/modules/swiper/swiper.js',

    ], function () {
        // console.log("Scripts carregados");
    }, { type: "module", defer: true })
})

console.log("What u looking? 👀")