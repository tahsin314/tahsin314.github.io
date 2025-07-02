// common.js
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
                                Contact me via <a href="mailto:m.tahsinmostafiz@ufl.edu" style="color:var(--footer-link-color); font-weight:600;" class="hover:underline">
                                m.tahsinmostafiz@ufl.edu</a>.
                            </h4>
                            <div class="flex justify-center"> 
                                <div class="w-full md:w-10/12">  
                                    <div class="social-icons mt-4 mb-6">
                                        <ul class="flex justify-center space-x-6"> 
                                            <li><a class="ai ai-google-scholar big-icon" style="font-size:30px; color:var(--footer-icon-color);" aria-hidden="true" href="https://scholar.google.com/citations?user=1gDQkNIAAAAJ&hl=en&authuser=1" target="_blank" rel="noopener noreferrer"></a></li>
                                            <li><a class="ai ai-researchgate big-icon" style="font-size:30px; color:var(--footer-icon-color);" aria-hidden="true" href="https://www.researchgate.net/profile/Tahsin_Mostafiz" target="_blank" rel="noopener noreferrer"></a></li>
                                            <li><a class="fab fa-linkedin" style="font-size:30px; color:var(--footer-icon-color);" aria-hidden="true" href="https://www.linkedin.com/in/tahsin314/" target="_blank" rel="noopener noreferrer"></a></li>
                                            <li><a class="fab fa-youtube" style="font-size:30px; color:var(--footer-icon-color);" aria-hidden="true" href="https://www.youtube.com/channel/UCsA63C_GRkhkMVE7LOjODCA/" target="_blank" rel="noopener noreferrer"></a></li>
                                            <li><a class="fab fa-github" style="font-size:30px; color:var(--footer-icon-color);" aria-hidden="true" href="https://www.github.com/tahsin314" target="_blank" rel="noopener noreferrer"></a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div class="text-center">
                                <a href="https://clustrmaps.com/site/1c22o" title="Visit tracker">
                                    <img src="https://clustrmaps.com/map_v2.png?cl=a45d45&w=800&t=tt&d=Jo6MEuju2fMWNwRzj2QLXu5fzvGT-G_NVZN9xWS_YVk&co=382b3c" alt="ClustrMaps visitor tracker map" style="margin-top: 20px; display: block; margin-left:auto; margin-right:auto; max-width:100%; width:auto; border-radius: 8px;" />
                                </a>
                            </div>
                             <p class="text-xs mt-6" style="color: var(--footer-subtext-color);">© <script>document.write(new Date().getFullYear())</script> Tahsin Mostafiz. All rights reserved.</p>
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
                    <div id="theme-switcher-placeholder" class="mr-4 relative">
                        <!-- Theme dropdown button will be injected here by JS -->
                    </div>
                    <div class="header-icons md:hidden"> 
                        <div class="ol-mobile-trigger hamburger hamburger--elastic">
                            <div class="hamburger-box"><div class="hamburger-inner" style="background-color: var(--hamburger-color);"></div></div>
                        </div>
                    </div>
                    <ul id="primary-menu" class="hidden md:flex space-x-1"> 
                        <li class="current-menu-item"><a href="https://tahsin314.github.io" title="Home"><span style="color:var(--nav-link-color);">Home</span></a></li>
                        <li><a href="https://tahsin314.github.io/index.html#publications" data-target="#publications_all"><span style="color:var(--nav-link-color);">Publications</span></a></li>
                        <li><a href="https://tahsin314.github.io/index.html#projects" data-target="#projects_all" title="Projects"><span style="color:var(--nav-link-color);">Projects</span></a></li>
                        <li><a href="https://tahsin314.github.io/timeline.html" title="Timeline"><span style="color:var(--nav-link-color);">Timeline</span></a></li>
                        <li><a href="https://tahsin314.github.io/resources.html" title="Resources"><span style="color:var(--nav-link-color);">Resources</span></a></li>
                        <li><a href="https://tahsin314.github.io/blog.html" title="Blog"><span style="color:var(--nav-link-color);">Blog</span></a></li>
                    </ul>
                </div>
            </div>
        </div>
    </header>
`;


function loadHeaderAndFooter() {
    console.log("Inserting header and footer...");

    // Insert header and footer content
    document.body.insertAdjacentHTML("afterbegin", headerContent);
    document.body.insertAdjacentHTML("beforeend", footerContent);

    console.log("Header and footer inserted.");

    // Sticky header functionality
    const header = document.getElementById("header");
    window.addEventListener("scroll", function () {
        if (window.scrollY > 50) {
            header.classList.add("is-sticky");
        } else {
            header.classList.remove("is-sticky");
        }
    });

    console.log("loadHeaderAndFooter completed.");
}
