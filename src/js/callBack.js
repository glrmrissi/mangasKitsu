function loadScripts(scripts, callback) {
    let index = 0;

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
        'src/js/modules/search/btnSearch.js',
        'src/js/modules/search/search.js',
        'src/js/modules/loadProfilePhoto/loadProfilePhoto.js',
        'src/pages/profile/process/process.js',
        'src/templates/footer/footer.js',
        'src/js/components/styles.js',
        'src/js/modules/fadeInOut/fadeInOut.js',
        'src/js/services/theme/theme.js',
        'src/js/modules/goToTop/goToTop.js',

    ], function () {
        // console.log("Scripts carregados");
    }, { type: "module", defer: true })
})