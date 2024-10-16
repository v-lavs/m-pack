/*
* to include js file write: `//= include ./path-to-file`
* */

// CUSTOM SCRIPTS

$(document).ready(function () {

// MOBILE MENU
    const sidebar = document.querySelector('.sidebar');
    const headerSbOp = document.querySelector('.header');
    const btnBurger = document.querySelector('.btn-burger');
    const menuLinks = document.querySelectorAll('.sidebar .menu__link');
    const overlay = document.querySelector('.backdrop');
    const btnCallSb = document.querySelector('.btn_call');

    btnBurger.addEventListener('click', function (e) {
        e.preventDefault();
        sidebar.classList.toggle('open');
        headerSbOp.classList.toggle('open');
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

    btnCallSb.addEventListener('click', function () {
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

    // ADDED COLOR LABEL CHECKED CHECKBOX END RADIOBUTTON
    function setParentColor(input) {
        if (input.checked) {
            input.parentElement.style.color = '#FFFFFF';
        } else {
            input.parentElement.style.color = '#45655D';
        }
    }

    document.querySelectorAll('input[type="checkbox"], input[type="radio"]').forEach(function (input) {
        setParentColor(input);
        input.addEventListener('click', function () {
            if (input.type === 'radio') {
                document.querySelectorAll(`input[name="${input.name}"]`).forEach(function (radio) {
                    setParentColor(radio);
                });
            } else {
                setParentColor(input);
            }
        });
    });

// POPUP
    const popupCont = document.querySelector(".popup_contacts");
    const btnCall = document.querySelector(".btn_call");
    const contactsClose = document.querySelector('.popup_contacts .popup_close');
    const backdrop = document.querySelector('.backdrop');

    btnCall.addEventListener('click', () => {
        popupCont.classList.add('open_modal');
        backdrop.classList.toggle('el-visible');
    });

    contactsClose.addEventListener('click', () => {
        popupCont.classList.remove('open_modal');
        backdrop.classList.remove('el-visible');
    });
    backdrop.addEventListener('click', () => {
        popupCont.classList.remove('open_modal');
    });


//    MULTI STEP FORM
    const msForm = document.querySelector('.multi-step-form');
    if (msForm) {
        const stepsCircle = msForm.querySelectorAll('.progress-step');
        const stepContent = msForm.querySelectorAll('.form__step');

        const btnsNext = msForm.querySelectorAll('.btn_next');
        const prevBtns = msForm.querySelectorAll('.form__nav-link');

        stepsCircle[0].classList.add('progress-step_active');
        stepContent[0].classList.add('active');
        prevBtns[0].classList.add('show')

        btnsNext.forEach(btn => btn.addEventListener(
            'click', (e) => {
                const activeIndex = Array.from(stepContent).findIndex(el => el.classList.contains('active'));
                stepContent.forEach(el => el.classList.remove('active'))

                const activeContent = stepContent[activeIndex + 1];
                const activeCircle = stepsCircle[activeIndex + 1];
                if (activeContent) {
                    activeContent.classList.add('active')
                }
                if (activeCircle) {
                    activeCircle.classList.add('progress-step_active')
                }
                prevBtns.forEach((el, index) => {
                    if (index <= activeIndex + 1) {
                        el.classList.add('show');
                    } else {
                        el.classList.remove('show');
                    }
                })
            }
        ));

        prevBtns.forEach(btn => btn.addEventListener(
            'click', (e) => {
                const activeIndex = Array.from(prevBtns).findIndex(el => el === e.target);
                console.log(activeIndex)
                stepContent.forEach(el => el.classList.remove('active'))

                stepsCircle.forEach((el, index) => {
                    if (index > activeIndex) {
                        el.classList.remove('progress-step_active')
                    } else {
                        el.classList.add('progress-step_active')
                    }
                })

                prevBtns.forEach((el, index) => {
                    if (index > activeIndex) {
                        el.classList.remove('show');
                    } else {
                        el.classList.add('show');
                    }
                })

                const activeContent = stepContent[activeIndex];
                if (activeContent) {
                    activeContent.classList.add('active')
                }
            }
        ));


    }
});





