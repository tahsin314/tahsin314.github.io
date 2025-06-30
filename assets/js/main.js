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

function initThemeDropdown() {
    const placeholder = document.getElementById('theme-switcher-placeholder');
    if (!placeholder) {
        console.warn("Theme switcher placeholder not found.");
        return;
    }

    const dropdownButton = document.createElement('button');
    dropdownButton.id = 'theme-dropdown-button';
    dropdownButton.className = 'theme-dropdown-button';
    dropdownButton.setAttribute('aria-haspopup', 'true');
    dropdownButton.setAttribute('aria-expanded', 'false');
    dropdownButton.innerHTML = `
        <span class="theme-label">Color Palette</span>
        <span class="arrow-down"></span>
    `;

    const dropdownMenu = document.createElement('div');
    dropdownMenu.className = 'theme-dropdown-menu';

    placeholder.appendChild(dropdownButton);
    placeholder.appendChild(dropdownMenu);

    Object.entries(themes).forEach(([key, name]) => {
        const option = document.createElement('a');
        option.href = "#";
        option.textContent = name;
        option.dataset.themeKey = key;
        option.onclick = (e) => {
            e.preventDefault();
            applyTheme(key);
            dropdownMenu.classList.remove('active');
            dropdownButton.setAttribute('aria-expanded', 'false');
            dropdownButton.classList.remove('open');
        };
        dropdownMenu.appendChild(option);
    });

    dropdownButton.addEventListener('click', (e) => {
        e.stopPropagation();
        const isExpanded = dropdownMenu.classList.toggle('active');
        dropdownButton.setAttribute('aria-expanded', isExpanded.toString());
        dropdownButton.classList.toggle('open', isExpanded);
    });

    window.addEventListener('click', (e) => {
        if (!dropdownButton.contains(e.target) && !dropdownMenu.contains(e.target)) {
            dropdownMenu.classList.remove('active');
            dropdownButton.setAttribute('aria-expanded', 'false');
            dropdownButton.classList.remove('open');
        }
    });

    const saved = localStorage.getItem('portfolioTheme');
    const defaultTheme = saved && themes[saved] ? saved : 'theme-default';
    applyTheme(defaultTheme);
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
                initThemeDropdown();
                initStickyHeader();
                initMobileMenu();
                initProjectFilter();
                console.log("All UI components initialized.");
            }, 50);
        });
    }
});
