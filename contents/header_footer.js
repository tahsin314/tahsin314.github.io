// common.js
const footerContent = `
<footer id="footer">
    <section id="footer-main" class="text-center">
        <section class="container-footer">
            <div class="row">
                <div class="col-md-6 col-md-offset-3">
                    <div class="heading-with-sub m-bottom-50">
                        <h3 class="title sans-font m-bottom-30">
                            <a href="index.html" title="Home" style="font-size:30px; color:gray">Tahsin Mostafiz</a>
                        </h3>
                        <h4 class="text-center">
                            Contact me via <a href="mailto:m.tahsinmostafiz@ufl.edu" style="color:gray">
                            <b>m.tahsinmostafiz@ufl.edu</b></a>.
                        </h4>
                        <div class="row">
                            <div class="span10 offset1">
                                <div class="social-icons">
                                    <ul>
                                        <li>
                                            <a class="ai ai-google-scholar big-icon" style="font-size:30px; color:gray"
                                               aria-hidden="true" 
                                               href="https://scholar.google.com/citations?user=1gDQkNIAAAAJ&hl=en&authuser=1" 
                                               target="_blank"></a>
                                        </li>
                                        <li>
                                            <a class="ai ai-researchgate big-icon" style="font-size:30px; color:gray"
                                               aria-hidden="true" 
                                               href="https://www.researchgate.net/profile/Tahsin_Mostafiz" 
                                               target="_blank"></a>
                                        </li>
                                        <li>
                                            <a class="fa fa-linkedin w3-hover-opacity w3-margin-left" 
                                               style="font-size:30px; color:gray" 
                                               aria-hidden="true" 
                                               href="https://www.linkedin.com/in/tahsin-mostafiz-276292141/" 
                                               target="_blank"></a>
                                        </li>
                                        <li>
                                            <a class="fa fa-youtube w3-hover-opacity w3-margin-left" 
                                               style="font-size:30px; color:gray" 
                                               aria-hidden="true" 
                                               href="https://www.youtube.com/channel/UCsA63C_GRkhkMVE7LOjODCA/" 
                                               target="_blank"></a>
                                        </li>
                                        <li>
                                            <a class="fa fa-github w3-hover-opacity w3-margin-left" 
                                               style="font-size:30px; color:gray" 
                                               aria-hidden="true" 
                                               href="https://www.github.com/tahsin314" 
                                               target="_blank"></a>
                                        </li>
                                    </ul>

                                    <div align="center" id="clustrmaps-container">
                                    <script type="text/javascript" id="clustrmaps" src="//clustrmaps.com/map_v2.js?d=Jo6MEuju2fMWNwRzj2QLXu5fzvGT-G_NVZN9xWS_YVk"></script>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </section>
</footer>
`;


const headerContent = `
<header id="header" class="trans header-personal-1">
    <div class="head-main text-center">
        <div class="head">
            <div class="logo-wrapper visible-sticky">
                <a href="index.html" class="standard-logo text-logo"><img src="https://tahsin314.github.io/assets/img/Pro_pic.jpg" alt="Tahsin Mostafiz">
                    <div class="text-wrapper">
                        <h1 class="title">Tahsin <span> Mostafiz</span></h1>
                    </div>
                </a>
            </div>
            <div class="header-icons">
    <div class="ol-mobile-trigger hamburger hamburger--elastic">
        <div class="hamburger-box">
            <div class="hamburger-inner"></div>
        </div>
    </div>
</div>

<ul id="primary-menu">
    <li class="current-menu-item">
        <a href="https://tahsin314.github.io" title="Home"><span>Home</span></a>
    </li>
    <li>
        <a href="https://tahsin314.github.io/index.html#publications_all" data-target="#publications_all"><span>Publications</span></a>
    </li>
    <li>
        <a href="https://tahsin314.github.io/index.html#projects_all" data-target="#projects_all" title="Projects"><span>Projects</span></a>
    </li>
    <li>
        <a href="https://tahsin314.github.io/timeline.html" title="Timeline"><span>Timeline</span></a>
    </li>
    <li>
        <a href="https://tahsin314.github.io/resources.html" title="Resources"><span>Resources</span></a>
    </li>
    <li>
        <a href="https://tahsin314.github.io/blog.html" title="Blog"><span>Blog</span></a>
    </li>
</ul>
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
