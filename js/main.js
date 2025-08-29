function initializeMenu() {
    const menuToggle = document.getElementById('menu-toggle');
    const menu = document.getElementById('menu');

    if (menuToggle && menu) {
        menuToggle.addEventListener('click', function() {
            menu.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }

    // Highlight active page
    const currentPage = window.location.pathname.split('/').pop();
    const menuLinks = document.querySelectorAll('.menu a');

    menuLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        const linkPage = linkHref.split('/').pop();

        // Handle index page linking from root and subdirectories
        const isIndexLink = linkPage === 'index.html' || linkHref === 'index.html';
        const onIndexPage = currentPage === 'index.html' || currentPage === '';

        if (linkPage === currentPage || (onIndexPage && isIndexLink)) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Function will be called directly from nav-loader.js
// document.addEventListener('DOMContentLoaded', initializeMenu);
