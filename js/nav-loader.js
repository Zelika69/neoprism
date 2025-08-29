document.addEventListener('DOMContentLoaded', function() {
    const navPlaceholder = document.createElement('div');
    navPlaceholder.id = 'nav-placeholder';
    document.body.prepend(navPlaceholder);

    // Use absolute path for nav.html
    const navPath = '/components/nav.html';

    fetch(navPath)
        .then(response => response.text())
        .then(data => {
            navPlaceholder.innerHTML = data;

            // Now that the nav is loaded, load the main script
            const script = document.createElement('script');
            script.src = '/js/main.js';
            script.onload = function() {
                // Initialize menu after script loads
                if (typeof initializeMenu === 'function') {
                    initializeMenu();
                }
            };
            document.body.appendChild(script);
        });
});
