console.log("Embedded main script started");

const themes = {
    'theme-forest-moss': 'Default Theme (Click to change)',
    'theme-matte-dust': 'Matte Dust',
    'theme-matte-pastel': 'Matte Pastel',
    'theme-matte-sage-lavender': 'Matte Sage Lavender',
    'theme-matte-blue-peach': 'Matte Blue Peach',
    'theme-matte-coral-cream': 'Matte Coral Cream',
    'theme-neon-sunset': 'Neon Sunset',
    'theme-forest-canopy': 'Forest Canopy',
    'theme-tron-legacy': 'Tron Legacy',
};

function applyTheme(themeName) {
    document.documentElement.className = themeName;
    localStorage.setItem('portfolioTheme', themeName);

    const label = themes[themeName];
    const labelSpan = document.querySelector('#theme-dropdown-button .theme-label');
    if (labelSpan && label) {
        labelSpan.textContent = label;
    }

    requestAnimationFrame(() => {
        if (typeof redraw === 'function') {
            try { redraw(); } catch (e) { console.warn("Redraw failed:", e); }
        }
        terrainNeedsRefresh = true;
    });
}


function initStickyHeader() {
    const header = document.getElementById("header");
    if (!header) return;
    window.addEventListener("scroll", () => {
        header.classList.toggle("is-sticky", window.scrollY > 50);
    });
}

function initMobileMenu() {
    const trigger = document.querySelector('.ol-mobile-trigger');
    const menu = document.getElementById('primary-menu');
    if (trigger && menu) {
        trigger.addEventListener('click', () => {
            trigger.classList.toggle('is-active');
            menu.classList.toggle('mobile-active');
        });
    }
}

function initProjectFilter() {
    const grid = document.querySelector('#container-projects');
    if (grid && typeof Isotope !== 'undefined') {
        const iso = new Isotope(grid, {
            itemSelector: '.project-item',
            layoutMode: 'fitRows'
        });

        document.querySelectorAll('.project-toolbar button').forEach(btn => {
            btn.addEventListener('click', () => {
                const filter = btn.getAttribute('data-filter');
                iso.arrange({ filter });
                document.querySelectorAll('.project-toolbar button').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
            });
        });
    } else {
        console.warn("Isotope not found or container missing.");
    }
}

document.addEventListener('DOMContentLoaded', () => {
    console.log("DOMContentLoaded");

    if (typeof loadHeaderAndFooter === 'function') {
        loadHeaderAndFooter();
        requestAnimationFrame(() => {
            setTimeout(() => {
                // initThemeDropdown();
                initStickyHeader();
                initMobileMenu();
                initProjectFilter();
                console.log("All UI components initialized.");
            }, 50);
        });
    }
});
