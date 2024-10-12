// common.js
const footerContent = `
<footer id="footer">
    <section id="footer-main" class="text-center">
        <section class="container-footer">
            <div class="row">
                <div class="col-md-6 col-md-offset-3">
                    <div class="heading-with-sub m-bottom-50">
                        <h3 class="title sans-font m-bottom-30"><a href="index.html" title="Home" style="font-size:30px; color:gray">Tahsin Mostafiz</a></h3>
                        <h4 class="text-center">Contact me via <a href="mailto:m.tahsinmostafiz@ufl.edu" style="color:gray"><b>m.tahsinmostafiz@ufl.edu</b></a>.</h4>
                        <div class="row">
                            <div class="span10 offset1">
                                <div class="social-icons">
                                    <!--<h1>Horizontal Social Icon List</h1>-->
                                    <ul>
                                        <li>
                                            <a class="ai ai-google-scholar big-icon" style="font-size:30px; color:gray" aria-hidden="true" href="https://scholar.google.com/citations?user=1gDQkNIAAAAJ&hl=en&authuser=1" target="_blank"></i>
                                            </a>
                                        </li>
                                        <li>
                                            <a class="ai ai-researchgate big-icon" style="font-size:30px; color:gray" aria-hidden="true" href="https://www.researchgate.net/profile/Tahsin_Mostafiz" target="_blank"></i>
                                            </a>
                                        </li>

                                        <!--<li><a class="fa fa-facebook-official w3-hover-opacity w3-margin-left" style="font-size:30px; color:gray" aria-hidden="true" href="https://www.facebook.com/tahsin.mostafiz" target="_blank"></i></a></li>-->
                                        <!--<li><a class="fa fa-instagram w3-hover-opacity w3-margin-left" style="font-size:30px; color:gray" aria-hidden="true" href="https://www.instagram.com/tahsin_mostafiz/" target="_blank"></i></a></li>-->
                                        <li>
                                            <a class="fa fa-linkedin w3-hover-opacity w3-margin-left" style="font-size:30px; color:gray" aria-hidden="true" href="https://www.linkedin.com/in/tahsin-mostafiz-276292141/" target="_blank"></i>
                                            </a>
                                        </li>
                                        <li>
                                            <a class="fa fa-youtube w3-hover-opacity w3-margin-left" style="font-size:30px; color:gray" aria-hidden="true" href="https://www.youtube.com/channel/UCsA63C_GRkhkMVE7LOjODCA/" target="_blank"></i>
                                            </a>
                                        </li>
                                        <li>
                                            <a class="fa fa-github w3-hover-opacity w3-margin-left" style="font-size:30px; color:gray" aria-hidden="true" href="https://www.github.com/tahsin314" target="_blank"></i>
                                            </a>
                                        </li>

                                    </ul>
                                    <!-- <p align="center"> <img src="https://komarev.com/ghpvc/?username=tahsin314&label=Profile%20views&color=0e75b6&style=flat&theme=dark" alt="tahsin314" /> </p>  -->
                                    <p align="center" <a href="https://hits.sh/github.com/tahsin314/hits/"><img alt="Total View" src="https://hits.sh/github.com/tahsin314/hits.svg?style=for-the-badge&label=Profile%20Views&color=fe7d37&logo=base64"/></a> </p>
                                    <div id="revolver-map" align="center">
                                        <script type="text/javascript" src="//rf.revolvermaps.com/0/0/8.js?i=5gkbov5q09l&amp;m=0&amp;c=ff0000&amp;cr1=ffffff&amp;f=arial&amp;l=33" async="async"></script>
                                    </div>
                                        <!-- <p align="center"> <a href="https://github.com/ryo-ma/github-profile-trophy"><img src="https://github-profile-trophy.vercel.app/?username=tahsin314&theme=onedark" alt="tahsin314" /></a> </p> -->
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
                <a href="index.html" class="standard-logo text-logo"><img src="assets/img/Pro_pic.jpg" alt="Tahsin Mostafiz">
                    <div class="text-wrapper">
                        <h1 class="title">Tahsin <span> Mostafiz</span></h1>
                    </div>
                </a>
            </div>
            <ul id="primary-menu">
                <li class="current-menu-item"><a href="index.html" title="Home"><span>Home</span></a></li>
                <li><a href="/#publications_all" data-target="#publications_all"><span>Publications</span></a></li>
                <li><a href="/#projects_all" data-target="#projects_all" title="Projects"><span>Projects</span></a></li>
                <li><a href="timeline.html" title="Timeline"><span>Timeline</span></a></li>
                <li><a href="resources.html" title="Resources"><span>Resources</span></a></li>
                <li><a href="blog.html" title="Blog"><span>Blog</span></a></li>
            </ul>
            <div class="header-icons">
                <div class="ol-mobile-trigger hamburger hamburger--elastic">
                    <div class="hamburger-box">
                        <div class="hamburger-inner"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</header>
`;

function loadHeaderAndFooter() {
    // Insert header and footer content
    document.body.insertAdjacentHTML("afterbegin", headerContent);
    document.body.insertAdjacentHTML("beforeend", footerContent);

    // Sticky header functionality
    const header = document.getElementById("header");
    window.addEventListener("scroll", function () {
        if (window.scrollY > 50) {
            header.classList.add("is-sticky");
        } else {
            header.classList.remove("is-sticky");
        }
    });
}

// Call loadHeaderAndFooter after the DOM is fully loaded
document.addEventListener("DOMContentLoaded", loadHeaderAndFooter);