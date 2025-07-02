const footerContent = `
<footer id="footer">
    <section id="footer-main" class="text-center" style="background-color: var(--footer-bg); color: var(--footer-text-color); padding: 40px 0; border-top: 1px solid var(--footer-border-color);">
        <section class="container-footer container mx-auto px-6"> 
            <div class="flex flex-wrap justify-center"> 
                <div class="w-full md:w-8/12 lg:w-1/2"> 
                    <div class="heading-with-sub mb-12"> 
                        <h3 class="title sans-font mb-8"> 
                            <a href="index.html" title="Home" style="font-size:30px; color:var(--footer-heading-color);">Tahsin Mostafiz</a>
                        </h3>
                        <h4 class="text-center text-base" style="color:var(--footer-text-color);"> 
                            Contact me via <a href="mailto:tahsinmostafiz314@gmail.com" style="color:var(--footer-link-color); font-weight:600;" class="hover:underline">
                            tahsinmostafiz314@gmail.com</a>.
                        </h4>
                        <div class="flex justify-center"> 
                            <div class="w-full md:w-10/12">  
                                <div class="social-icons mt-4 mb-6">
                                    <ul class="flex justify-center space-x-6"> 
                                        <li><a class="ai ai-google-scholar big-icon" style="font-size:30px; color:var(--footer-icon-color);" href="https://scholar.google.com/citations?user=1gDQkNIAAAAJ" target="_blank" rel="noopener noreferrer"></a></li>
                                        <li><a class="ai ai-researchgate big-icon" style="font-size:30px; color:var(--footer-icon-color);" href="https://www.researchgate.net/profile/Tahsin_Mostafiz" target="_blank" rel="noopener noreferrer"></a></li>
                                        <li><a class="fab fa-linkedin" style="font-size:30px; color:var(--footer-icon-color);" href="https://www.linkedin.com/in/tahsin314/" target="_blank" rel="noopener noreferrer"></a></li>
                                        <li><a class="fab fa-youtube" style="font-size:30px; color:var(--footer-icon-color);" href="https://www.youtube.com/channel/UCsA63C_GRkhkMVE7LOjODCA/" target="_blank" rel="noopener noreferrer"></a></li>
                                        <li><a class="fab fa-github" style="font-size:30px; color:var(--footer-icon-color);" href="https://www.github.com/tahsin314" target="_blank" rel="noopener noreferrer"></a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="text-center">
                            <a href="https://clustrmaps.com/site/1c22o" title="Visit tracker">
                                <img src="https://clustrmaps.com/map_v2.png?cl=a45d45&w=800&t=tt&d=Jo6MEuju2fMWNwRzj2QLXu5fzvGT-G_NVZN9xWS_YVk&co=382b3c" alt="ClustrMaps visitor tracker map" style="margin-top: 20px; display: block; margin-left:auto; margin-right:auto; max-width:100%; width:auto; border-radius: 8px;" />
                            </a>
                        </div>
                        <p class="text-xs mt-6" style="color: var(--footer-subtext-color);">© <span id="footer-year"></span> Tahsin Mostafiz. All rights reserved.</p>
                        <p class="text-xs mt-1" style="color: var(--footer-subtext-color);">Styled with Tailwind CSS. Terrain animation powered by p5.js.</p>
                    </div>
                </div>
            </div>
        </section>
    </section>
</footer>
`;

const headerContent = `
<header id="header" class="trans header-personal-1 sticky top-0 z-50 shadow-lg" style="background-color: var(--header-bg); color: var(--header-text-color);">
    <div class="head-main text-center py-3">
        <div class="head container mx-auto flex justify-between items-center px-6">
            <div class="logo-wrapper visible-sticky">
                <a href="https://tahsin314.github.io/" class="standard-logo text-logo flex items-center">
                    <img src="https://tahsin314.github.io/assets/img/Pro_pic.jpg" alt="Tahsin Mostafiz" 
                         class="h-10 w-10 rounded-full mr-2 border-2" style="border-color: var(--profile-image-border-color);">
                    <div class="text-wrapper">
                        <h1 class="title" style="color: var(--nav-link-color); font-size: 1.25rem; font-weight: 700;">Tahsin 
                            <span style="color: var(--header-logo-span-color); font-weight: 400;">Mostafiz</span>
                        </h1>
                    </div>
                </a>
            </div>
            <div class="flex items-center"> 
                <div id="theme-switcher-placeholder" class="mr-4 relative"></div>
                <div class="header-icons md:hidden"> 
                    <button id="hamburger-btn" class="p-2 rounded hover:bg-gray-700 focus:outline-none">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                </div>
                <ul id="primary-menu" class="hidden md:flex space-x-1"> 
                    <li class="current-menu-item"><a href="https://tahsin314.github.io"><span style="color:var(--nav-link-color);">Home</span></a></li>
                    <li><a href="https://tahsin314.github.io/index.html#publications"><span style="color:var(--nav-link-color);">Publications</span></a></li>
                    <li><a href="https://tahsin314.github.io/index.html#projects"><span style="color:var(--nav-link-color);">Projects</span></a></li>
                    <li><a href="https://tahsin314.github.io/timeline.html"><span style="color:var(--nav-link-color);">Timeline</span></a></li>
                    <li><a href="https://tahsin314.github.io/resources.html"><span style="color:var(--nav-link-color);">Resources</span></a></li>
                    <li><a href="https://tahsin314.github.io/blog.html"><span style="color:var(--nav-link-color);">Blog</span></a></li>
                </ul>
            </div>
        </div>
    </div>
    <!-- Mobile Menu Dropdown -->
    <ul id="mobile-menu" class="hidden flex-col items-center w-full bg-gray-800 text-sm font-medium md:hidden py-4 space-y-3">
        <li><a href="https://tahsin314.github.io" class="hover:text-blue-400">Home</a></li>
        <li><a href="https://tahsin314.github.io/index.html#publications" class="hover:text-blue-400">Publications</a></li>
        <li><a href="https://tahsin314.github.io/index.html#projects" class="hover:text-blue-400">Projects</a></li>
        <li><a href="https://tahsin314.github.io/timeline.html" class="hover:text-blue-400">Timeline</a></li>
        <li><a href="https://tahsin314.github.io/resources.html" class="hover:text-blue-400">Resources</a></li>
        <li><a href="https://tahsin314.github.io/blog.html" class="hover:text-blue-400">Blog</a></li>
    </ul>
</header>
`;

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

function loadHeaderAndFooter() {
  console.log("Inserting header and footer...");

  document.body.insertAdjacentHTML("afterbegin", headerContent);
  document.body.insertAdjacentHTML("beforeend", footerContent);

  // Sticky behavior
  const header = document.getElementById("header");
  window.addEventListener("scroll", () => {
    header.classList.toggle("is-sticky", window.scrollY > 50);
  });

  // Mobile menu toggle
  const hamburger = document.getElementById("hamburger-btn");
  const mobileMenu = document.getElementById("mobile-menu");
  hamburger?.addEventListener("click", () => {
    mobileMenu?.classList.toggle("hidden");
  });

  // Close menu on link click
  mobileMenu?.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      mobileMenu.classList.add("hidden");
    });
  });

  // Year update
  const yearSpan = document.getElementById("footer-year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // ✅ Theme dropdown can now safely initialize
  if (typeof initThemeDropdown === 'function') {
    initThemeDropdown();
  }
  console.log("Header and footer loaded.");
}

// document.addEventListener("DOMContentLoaded", loadHeaderAndFooter);
