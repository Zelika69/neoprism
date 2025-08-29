document.addEventListener('DOMContentLoaded', function() {
    const navPlaceholder = document.createElement('div');
    navPlaceholder.id = 'nav-placeholder';
    document.body.prepend(navPlaceholder);

    // Adjust the path to nav.html based on the current page's location
    const isSubdirectory = window.location.pathname.includes('/pages/');
    const navPath = isSubdirectory ? '../components/nav.html' : 'components/nav.html';

    fetch(navPath)
        .then(response => response.text())
        .then(data => {
            navPlaceholder.innerHTML = data;

            // Now that the nav is loaded, load the main script
            const script = document.createElement('script');
            const mainScriptPath = isSubdirectory ? '../js/main.js' : 'js/main.js';
            script.src = mainScriptPath;
            script.onload = function() {
                // Initialize menu after script loads
                if (typeof initializeMenu === 'function') {
                    initializeMenu();
                }
            };
            document.body.appendChild(script);
        });
});
