/*
* to include js file write: `//= include ./path-to-file`
* */

// CUSTOM SCRIPTS

$(document).ready(function () {

// MOBILE MENU
    const sidebar = document.querySelector('.sidebar');
    const btnBurger = document.querySelector('.btn-burger');
    const menuLinks = document.querySelectorAll('.sidebar .menu__link');
    const overlay = document.querySelector('.backdrop');

    btnBurger.addEventListener('click', function (e) {
        e.preventDefault();
        sidebar.classList.toggle('open');
        overlay.classList.toggle('el-visible');
    });

    menuLinks.forEach(function (link) {
        link.addEventListener('click', function () {
            sidebar.classList.remove('open');
            overlay.classList.remove('el-visible');
        });
    });

    overlay.addEventListener('click', function () {
        sidebar.classList.remove('open');
        overlay.classList.remove('el-visible');
    });

//STICKY HEADER PAGE
    const stickyElement = document.querySelector('.page__header');
    let stickyOffset = 0;

    function updateStickyBannerOffset() {
        const pageBanner = document.querySelector('.section-banner');
        if (pageBanner) {
            const bannerH = pageBanner.offsetHeight;
            const stickyH = stickyElement.offsetHeight;

            stickyOffset = bannerH - stickyH;

            if (window.pageYOffset >= stickyOffset) {
                stickyElement.classList.add('sticky');
                stickyOffset = stickyElement.offsetTop;
            } else {
                stickyElement.classList.remove('sticky');
            }
        }
    }

    window.addEventListener('resize', updateStickyBannerOffset);
    window.addEventListener('load', updateStickyBannerOffset);


    const bannerThumb = document.querySelector(".section-banner__thumb");
    const bannerTitle = document.querySelector('.page-title');

    window.addEventListener("scroll", () => {
        updateStickyBannerOffset()

        if (window.scrollY > 0) {
            bannerThumb.classList.add("hide-thumb");
            bannerTitle.classList.add("small-title");
        } else {
            bannerThumb.classList.remove("hide-thumb");
            bannerTitle.classList.remove("small-title");
        }
    });


//SLIDER

    const swiperInfo = new Swiper('.swiper-info', {
        pagination: {
            el: '.swiper-info .swiper-pagination',
            clickable: true,
        },
    });

    if (document.querySelector('.product-slider')) {
        const productSlider = new Swiper('.product-slider ', {
            pagination: {
                el: '.product-slider .swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
            breakpoints: {
                577: {
                    slidesPerView: 2,
                    spaceBetween: 16
                }
            },
        });
    }
    if (document.querySelector('.cards-slider')) {
        const cardSlider = new Swiper('.cards-slider ', {
            pagination: {
                el: '.cards-slider .swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
            breakpoints: {
                577: {
                    slidesPerView: 2,
                    spaceBetween: 16,
                }
            },
        });
    }

    if (document.querySelector('.green-slider')) {
        const greenSlider = new Swiper('.green-slider', {
            pagination: {
                el: '.green-slider .swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
        });
    }

    if (document.querySelector('.slider-4-col')) {
        const slider4Col = new Swiper('.slider-4-col', {
            slidesPerView: 4,
            pagination: {
                el: '.slider-4-col .swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
            breakpoints: {
                577: {
                    slidesPerView: 3,
                    spaceBetween: 16
                },
                767: {
                    slidesPerView: 4,
                    spaceBetween: 16
                }
            },
        });
    }
    window.addEventListener('load', function () {
        if ($('.gallery').length > 0) {
            $('.gallery a').click(function (e) {
                e.preventDefault();
            });
            baguetteBox.run('.gallery', {});
        }
    })


    //TABS
    const tabLinks = document.querySelectorAll('.tabs__nav-link');
    const tabContents = document.querySelectorAll('.tab-content');

    tabLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();

            tabLinks.forEach(link => link.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            link.classList.add('active');

            const targetId = link.getAttribute('href').substring(1);
            document.getElementById(targetId).classList.add('active');
        });
    });
});





