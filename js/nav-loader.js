document.addEventListener('DOMContentLoaded', function() {
    const navPlaceholder = document.createElement('div');
    navPlaceholder.id = 'nav-placeholder';
    document.body.prepend(navPlaceholder);

    // Detect environment and adjust paths accordingly
    const isGitHubPages = window.location.hostname.includes('github.io');
    const isSubdirectory = window.location.pathname.includes('/pages/');
    
    let navPath, mainScriptPath;
    
    if (isGitHubPages) {
        // GitHub Pages: use relative paths
        navPath = isSubdirectory ? '../components/nav.html' : 'components/nav.html';
        mainScriptPath = isSubdirectory ? '../js/main.js' : 'js/main.js';
    } else {
        // Local server: use absolute paths
        navPath = '/components/nav.html';
        mainScriptPath = '/js/main.js';
    }

    fetch(navPath)
        .then(response => response.text())
        .then(data => {
            navPlaceholder.innerHTML = data;
            
            // Adjust navigation links and logo based on environment
            if (isGitHubPages) {
                // Update logo path
                const logo = document.getElementById('brand-logo');
                if (logo) {
                    logo.src = isSubdirectory ? '../assets/neoprism.svg' : 'assets/neoprism.svg';
                }
                
                // Update navigation links
                const navInicio = document.getElementById('nav-inicio');
                const navServicios = document.getElementById('nav-servicios');
                const navNosotros = document.getElementById('nav-nosotros');
                const navContacto = document.getElementById('nav-contacto');
                
                if (isSubdirectory) {
                    if (navInicio) navInicio.href = '../index.html';
                    if (navServicios) navServicios.href = 'servicios.html';
                    if (navNosotros) navNosotros.href = 'nosotros.html';
                    if (navContacto) navContacto.href = 'contacto.html';
                } else {
                    if (navInicio) navInicio.href = 'index.html';
                    if (navServicios) navServicios.href = 'pages/servicios.html';
                    if (navNosotros) navNosotros.href = 'pages/nosotros.html';
                    if (navContacto) navContacto.href = 'pages/contacto.html';
                }
            }

            // Now that the nav is loaded, load the main script
            const script = document.createElement('script');
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
