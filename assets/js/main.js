console.log("Embedded main script started");

const themes = {
    'theme-default': 'Matte Canyon (Default)',
    'theme-calm-breeze': 'Calm Breeze',
    'theme-warm-paper': 'Warm Paper',
    'theme-forest-moss': 'Forest Moss',
    'theme-deep-neon': 'Deep Neon',
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
    if (grid) {
        document.querySelectorAll('.project-toolbar button').forEach(btn => {
            btn.addEventListener('click', () => {
                const filter = btn.getAttribute('data-filter');
                grid.querySelectorAll('.project-item').forEach(item => {
                    const visible = filter === '*' || item.matches(filter);
                    item.hidden = !visible;
                });
                document.querySelectorAll('.project-toolbar button').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
            });
        });
    } else {
        console.warn("Project container missing.");
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
