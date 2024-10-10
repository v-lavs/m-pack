/*
* to include js file write: `//= include ./path-to-file`
* */
//= include ../../node_modules/jquery/dist/jquery.js
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

// SMOOTH SCROLL TO ANCHOR
// function smoothScrollToAnchor(selector) {
//     $(selector).on('click', function (event) {
//         let anchor = $.attr(this, 'href');
//
//         if (anchor.match(/^#/) && anchor !== '#') {
//             event.preventDefault();
//
//             $('html, body').animate({
//                 scrollTop: $($.attr(this, 'href')).offset().top
//             }, 800);
//         }
//     });
// }
//
// smoothScrollToAnchor('.menu__item a');

//STICKY HEADER PAGE
    const stickyElement = document.querySelector('.page__header');
    let stickyOffset = stickyElement.offsetTop;

    function updateStickyOffset() {
        stickyOffset = stickyElement.offsetTop;
    }

    window.addEventListener('resize', updateStickyOffset);
    window.addEventListener('load', updateStickyOffset);

    window.addEventListener('scroll', () => {
        if (window.pageYOffset >= stickyOffset) {
            stickyElement.classList.add('sticky');
        } else {
            stickyElement.classList.remove('sticky');
        }
    });

    const bannerThumb = document.querySelector(".section-banner__thumb");
    const bannerTitle = document.querySelector('.page-title');

    window.addEventListener("scroll", () => {
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
            el: '.swiper-pagination',
            clickable: true,
        },
    });

    if ($('.product-slider').get(0)) {
        const productSlider = new Swiper('.product-slider ', {
            pagination: {
                el: '.swiper-pagination',
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
    if ($('.cards-slider').get(0)) {
        const cardSlider = new Swiper('.cards-slider ', {
            pagination: {
                el: '.swiper-pagination',
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
    if ($('.green-slider').get(0)) {
        const greenSlider = new Swiper('.green-slider ', {
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
        });
    }
    //TABS
    // Отримуємо всі посилання-вкладки та всі елементи вмісту вкладок
    const tabLinks = document.querySelectorAll('.tabs__nav-link');
    const tabContents = document.querySelectorAll('.tab-content');

// Додаємо обробник події для кожної вкладки
    tabLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();

            // Видаляємо клас 'active' з усіх посилань та вмісту
            tabLinks.forEach(link => link.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            // Додаємо клас 'active' до натиснутого посилання та відповідного вмісту
            link.classList.add('active');
            const targetId = link.getAttribute('href').substring(1);
            document.getElementById(targetId).classList.add('active');
        });
    });



// //READ MORE TEXT
// const btnReadMore = document.querySelector('.btn_load-more');
// const textRead = document.querySelector(".text-read");
//
// btnReadMore.addEventListener("click", function (e) {
//     textRead.classList.add("active");
//     btnReadMore.classList.add("hide");
// })

});





