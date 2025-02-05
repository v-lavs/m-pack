/*
* to include js file write: `//= include ./path-to-file`
* */
"use strict";

// CUSTOM SCRIPTS
document.addEventListener('DOMContentLoaded', function () {

// SCROLL TO ANCHOR
    function smoothScrollToAnchor(selector, headerSelector, headerPageSelector) {
        let headerPageHeight = 0;

        function delay(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }

        async function updateHeaderHeightWithDelay() {
            await delay(100); // Затримка 100 мс
            const headerPageElement = document.querySelector(headerPageSelector);
            if (headerPageElement) {
                headerPageHeight = headerPageElement.clientHeight || 0;
                console.log('Updated headerPageHeight with delay:', headerPageHeight);
            }
        }

        const headerPageElement = document.querySelector(headerPageSelector);
        if (headerPageElement) {
            const observer = new MutationObserver(async () => {
                await updateHeaderHeightWithDelay();
            });

            observer.observe(headerPageElement, {
                attributes: true,
                childList: false,
                subtree: false,
            });

            updateHeaderHeightWithDelay();
        }

        document.querySelectorAll(selector).forEach((element) => {
            element.addEventListener('click', async function (event) {
                const anchor = this.getAttribute('href');

                if (anchor.startsWith('#') && anchor !== '#') {
                    event.preventDefault();
                    const targetElement = document.querySelector(anchor);
                    const headerElement = document.querySelector(headerSelector);

                    if (targetElement) {
                        function getElementOffsetTop(element) {
                            const rect = element.getBoundingClientRect();
                            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                            return rect.top + scrollTop;
                        }

                        await delay(100);
                        const targetPosition = getElementOffsetTop(targetElement) - ((window.innerWidth <= 991 ? 90 : 10) + headerPageHeight);
                        console.log('Scroll to position with delay:', targetPosition);
                        window.scrollTo({
                            top: targetPosition,
                            behavior: 'smooth'
                        });
                    }
                }
            });
        });
    }

    smoothScrollToAnchor('.scroll-to-anchor a', '.header', '.page__header');


// MOBILE MENU
    const sidebar = document.querySelector('.sidebar');
    const headerSbOp = document.querySelector('.header');
    const btnBurger = document.querySelector('.btn-burger');
    const menuLinks = document.querySelectorAll('.sidebar .menu__link');
    const overlay = document.querySelector('.sidebar__overlay');
    const btnCallSb = document.querySelector('.btn_call');

    btnBurger.addEventListener('click', function (e) {
        e.preventDefault();
        sidebar.classList.toggle('open');
        btnBurger.classList.toggle('toggle-open');
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

            const mobileOffset = window.innerWidth <= 991 ? 80 : 0;

            stickyOffset = bannerH - stickyH - mobileOffset;

            if (window.pageYOffset >= stickyOffset) {
                stickyElement.classList.add('sticky');
                stickyOffset = stickyElement.offsetTop;
            } else {
                stickyElement.classList.remove('sticky');
            }
        }
    }

    window.addEventListener('scroll', updateStickyBannerOffset);
    window.addEventListener('load', updateStickyBannerOffset);

    const bannerThumb = document.querySelector(".section-banner__thumb");
    const bannerTitle = document.querySelector('.page-title');

    window.addEventListener("scroll", () => {
        updateStickyBannerOffset();

        if (bannerThumb && bannerTitle) {
            if (window.scrollY > 0) {
                bannerThumb.classList.add("hide-thumb");
                bannerTitle.classList.add("small-title");
            } else {
                bannerThumb.classList.remove("hide-thumb");
                bannerTitle.classList.remove("small-title");
            }
        }
    });


// stickyOffset - 80
//SLIDER

    const swiperInfo = new Swiper('.swiper-info', {
        pagination: {
            el: '.swiper-info .swiper-pagination',
            clickable: true,
        },
    });

    if (document.querySelector('.product-slider')) {
        const productSlider = new Swiper('.product-slider ', {
            autoHeight: true,
            slidesPerView: 1,
            spaceBetween: 16,
            pagination: {
                el: '.product-slider .swiper-pagination',
                clickable: true,
                dynamicBullets: true,
            },
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
            breakpoints: {
                577: {
                    slidesPerView: 2,
                    spaceBetween: 16
                },
                768: {
                    autoHeight: false,
                    slidesPerView: 2,
                    spaceBetween: 16
                }
            },
            preloadImages: false,
            lazy: true,
            observer: true,
            observeParents: true
        });
    }
    if (document.querySelector('.cards-slider')) {
        const cardSlider = new Swiper('.cards-slider ', {
            autoHeight: true,
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
                },
                768: {
                    autoHeight: false,
                    slidesPerView: 2,
                    spaceBetween: 16
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
            autoHeight: true,
            slidesPerView: 1,
            pagination: {
                el: '.slider-4-col .swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: ".slider-4-col .swiper-button-next",
                prevEl: ".slider-4-col .swiper-button-prev",
            },
            breakpoints: {
                577: {
                    slidesPerView: 2,
                    spaceBetween: 16
                },
                767: {
                    autoHeight: false,
                    slidesPerView: 3,
                    spaceBetween: 16
                },
                991: {
                    slidesPerView: 4,
                    spaceBetween: 16
                }
            },
        });
    }
    if (document.querySelector('.slider-gallery2')) {
        const sliderGallery2 = new Swiper('.slider-gallery2 ', {
            spaceBetween: 16,
            navigation: {
                nextEl: ".slider-gallery2 .swiper-button-next",
                prevEl: ".slider-gallery2 .swiper-button-prev",
            },

        });
    }

    jQuery('body').on('click', '.product-feature__thumb', function () {

        jQuery(this).siblings('.product-feature__thumb').removeClass('active');
        jQuery(this).parent().parent().find('.product-feature__content .tab-content').removeClass('active');

        jQuery(this).addClass('active');

        let targetId = jQuery(this).attr('dataTarget');
        jQuery(targetId).addClass('active');
    });
    setTimeout(() => {
        swiper.update();
    }, 200);
//TABS
    const tabLinks = document.querySelectorAll('.tabs__nav-link');

    function findParent(el, parentClassName) {
        if (!el) return document.body;
        // Start from the current element
        let ignoreClickOutside = el.classList.contains(parentClassName);
        let parentEl = el.parentElement;

        // Loop until we reach the top of the DOM
        while (!ignoreClickOutside && parentEl) {
            // Move up to the parent element
            ignoreClickOutside = parentEl.classList.contains(parentClassName);
            if (!ignoreClickOutside) {
                parentEl = parentEl.parentElement;
            }
        }

        return parentEl;
    }

    tabLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const parent = findParent(e.target, 'tabs');

            const tabLinks = parent.querySelectorAll('.tabs__nav-link');
            const tabContents = parent.querySelectorAll('.tab-content');

            tabLinks.forEach(link => link.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            link.classList.add('active');

            const targetId = link.getAttribute('dataTarget').substring(1);
            document.getElementById(targetId).classList.add('active');
        });
    });
//----------------------------------------------------
//BLOCK FEATURE PRODUCT
    const thumbNavBlock = document.querySelectorAll('.product-feature__nav');
    const tabThumbNav = document.querySelectorAll('.product-feature__thumb');

    tabThumbNav.forEach(link => {
        if (window.innerWidth > 767) {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const parent = findParent(e.target, 'product-feature');

                const tabThumbNav = parent.querySelectorAll('.product-feature__thumb');
                const tabContents = parent.querySelectorAll('.feature-content');
                if (tabThumbNav[0]) {
                    tabThumbNav[0].classList.add('active');
                }
                tabThumbNav.forEach(link => link.classList.remove('active'));
                tabContents.forEach(content => content.classList.remove('active'));
                link.classList.add('active');

                const targetId = link.getAttribute('dataTarget');
                document.getElementById(targetId).classList.add('active');
            });
        } else {
            if (thumbNavBlock) {
                tabThumbNav.forEach(block => block.style.display = 'none');
            } else {
                tabThumbNav.forEach(block => block.style.display = 'flex');
            }
        }
    });

//-------------------------------------------------------

// POPUP
    const initPopup = (popupSelector, triggerSelector, backdropSelector) => {
        const popup = document.querySelector(popupSelector);
        if (popup == null)
            return false;

        const trigger = document.querySelector(triggerSelector);
        const backdrop = document.querySelector('.backdrop');
        const closeButton = popup.querySelector('.popup_close');

        if (!popup || !trigger || !backdrop || !closeButton) {
            console.warn("Один з елементів не знайдено", popupSelector, triggerSelector, backdropSelector);
            return;
        }
        const openPopup = () => {
            event.preventDefault();
            popup.classList.add('open_modal');
            backdrop.classList.add('el-visible');
        };

        const closePopup = () => {
            popup.classList.remove('open_modal');
            backdrop.classList.remove('el-visible');
            if (window.clearContactForm) {
                window.clearContactForm();
            }
        };
        trigger.addEventListener('click', openPopup);
        closeButton.addEventListener('click', closePopup);
        backdrop.addEventListener('click', closePopup);
    };

    initPopup('.popup_contacts', '.btn_call', '.backdrop');
    initPopup('.popup_contacts', '.btn_call_footer', '.backdrop');
    initPopup('.popup_location', '.trigger-popup', '.backdrop');
    initPopup('.popup_location', '.footer-trigger-popup', '.backdrop');
    initPopup('.popup_contacts', '.call_main', '.backdrop');

//    MULTI STEP FORM
    const msForm = document.querySelector('.multi-step-form');

    if (msForm) {
        let activeIndex = 0;
        const stepsCircle = msForm.querySelectorAll('.progress-step');
        const stepContent = msForm.querySelectorAll('.form__step');

        const btnsNext = msForm.querySelectorAll('.btn_next');
        const prevBtns = msForm.querySelectorAll('.form__nav-link');

        const thYouPage = msForm.querySelector('.thanks-you-page');

        stepsCircle[activeIndex].classList.add('progress-step_active');
        stepContent[activeIndex].classList.add('active');
        prevBtns[activeIndex].classList.add('show');

        const goToStep = (activeIndex) => {
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

        window.clearContactForm = () => {
            msForm.reset();
            activeIndex = 0;
            goToStep(activeIndex);
            thYouPage.classList.remove('show');
        }


        btnsNext.forEach(btn => btn.addEventListener(
            'click', (e) => {
                activeIndex = activeIndex + 1;
                if (activeIndex < stepContent.length) {
                    goToStep(activeIndex);
                }

                if (e.target.type === 'submit') {
                    e.preventDefault();

                    thYouPage.classList.add('show');
                    setTimeout(() => {
                        closePopup();
                    }, 3000)
                }
            }
        ));

        prevBtns.forEach(btn => btn.addEventListener(
            'click', (e) => {
                activeIndex = Array.from(prevBtns).findIndex(el => el === e.target);

                goToStep(activeIndex);
            }
        ));

        msForm.querySelectorAll('.js-form-field').forEach(el => {
            el.addEventListener('input', (e) => {
                const activeSetControls = stepContent[activeIndex].querySelectorAll('.js-form-field');
                const submitBtn = stepContent[activeIndex].querySelector('.btn_next');

                let disabled = true;
                if (activeIndex === 0) {
                    disabled = Array.from(activeSetControls).filter(el => el.hasAttribute('required')).some(el => el.value === '');
                } else if (activeIndex === 1) {
                    disabled = !Array.from(stepContent[activeIndex].querySelectorAll('[type="checkbox"]')).some(el => el.checked)
                } else if (activeIndex === 2) {
                    const otherCity = msForm.querySelector('[name="other_city"]');
                    if (otherCity === e.target) {
                        stepContent[activeIndex].querySelectorAll('[type="radio"]').forEach(el => el.checked = false)
                    } else {
                        otherCity.value = '';
                    }

                    disabled = !Array.from(stepContent[activeIndex].querySelectorAll('[type="radio"]')).some(el => el.checked) &&
                        otherCity.value === '';

                    console.log(msForm.querySelector('[name="other_city"]'))
                }

                submitBtn.disabled = disabled
            });
        })
    }

    const btnClosThanks = document.querySelector('.btn_close-thanks');

    btnClosThanks.addEventListener('click', function () {
        document.querySelector('.popup_contacts').classList.remove('open_modal');
        document.querySelector('.backdrop').classList.remove('el-visible');
    });

//    SIDEBAR HOVER OVERLAY
    document.querySelectorAll('.sidebar__nav .dropdown').forEach(function (element) {
        element.addEventListener('mouseenter', function () {
            document.querySelector('.sidebar__overlay').classList.add('show');
        });

        element.addEventListener('mouseleave', function () {
            document.querySelector('.sidebar__overlay').classList.remove('show');
        });
    });

    document.querySelectorAll('#accordion .panel__heading').forEach((heading) => {
        heading.addEventListener('click', function () {
            const isOpen = this.classList.contains('open');
            const allPanels = document.querySelectorAll('#accordion .panel__heading');
            const allContents = document.querySelectorAll('.panel-collapse');

            allPanels.forEach(panel => panel.classList.remove('open'));
            allContents.forEach(content => content.style.maxHeight = null);

            if (!isOpen) {
                this.classList.add('open');
                const panelContent = this.nextElementSibling;
                panelContent.style.maxHeight = panelContent.scrollHeight + 'px';
            }
        });
    });

//TABLE COLLAPSE ROW
    if (document.querySelector('.tech-charact__row')) {
        const maxVisibleRows = 5;
        const rows = document.querySelectorAll('.tech-charact__row');
        const showMoreBtn = document.querySelector('.btn_more');

        if (rows.length > maxVisibleRows) {
            showMoreBtn.style.display = 'block';

            rows.forEach((row, index) => {
                if (index >= maxVisibleRows) {
                    row.style.display = 'none';
                }
            });
            showMoreBtn.addEventListener('click', function () {
                rows.forEach(row => row.style.display = '');

                showMoreBtn.style.display = 'none';
            });
        }
    }

    //BTN-FIXED MAIN
    const roundBtn = document.querySelector('.round');
    const fixedBlock = document.querySelector('.wrap-round');

    roundBtn.addEventListener('click', function () {
        fixedBlock.classList.toggle('active');
    });

    //    BACK TO TOP
    (function () {
        const goTopBtn = document.querySelector('.to-top');

        function trackScroll() {
            const scrolled = window.pageYOffset;
            const coords = document.documentElement.clientHeight;

            if (scrolled > coords) {
                goTopBtn.classList.add('show');
            } else {
                goTopBtn.classList.remove('show');
            }
        }

        function backToTop() {
            if (window.pageYOffset > 0) {
                window.scrollBy(0, -80);
                setTimeout(backToTop, 10);
            }
        }

        if (goTopBtn) {
            window.addEventListener('scroll', trackScroll);
            goTopBtn.addEventListener('click', backToTop);
        }
    })();
});


//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJtYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qXHJcbiogdG8gaW5jbHVkZSBqcyBmaWxlIHdyaXRlOiBgLy89IGluY2x1ZGUgLi9wYXRoLXRvLWZpbGVgXHJcbiogKi9cclxuXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG4vLyBDVVNUT00gU0NSSVBUU1xyXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgZnVuY3Rpb24gKCkge1xyXG5cclxuLy8gU0NST0xMIFRPIEFOQ0hPUlxyXG4gICAgZnVuY3Rpb24gc21vb3RoU2Nyb2xsVG9BbmNob3Ioc2VsZWN0b3IsIGhlYWRlclNlbGVjdG9yLCBoZWFkZXJQYWdlU2VsZWN0b3IpIHtcclxuICAgICAgICBsZXQgaGVhZGVyUGFnZUhlaWdodCA9IDA7XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGRlbGF5KG1zKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHNldFRpbWVvdXQocmVzb2x2ZSwgbXMpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGFzeW5jIGZ1bmN0aW9uIHVwZGF0ZUhlYWRlckhlaWdodFdpdGhEZWxheSgpIHtcclxuICAgICAgICAgICAgYXdhaXQgZGVsYXkoMTAwKTsgLy8g0JfQsNGC0YDQuNC80LrQsCAxMDAg0LzRgVxyXG4gICAgICAgICAgICBjb25zdCBoZWFkZXJQYWdlRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoaGVhZGVyUGFnZVNlbGVjdG9yKTtcclxuICAgICAgICAgICAgaWYgKGhlYWRlclBhZ2VFbGVtZW50KSB7XHJcbiAgICAgICAgICAgICAgICBoZWFkZXJQYWdlSGVpZ2h0ID0gaGVhZGVyUGFnZUVsZW1lbnQuY2xpZW50SGVpZ2h0IHx8IDA7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnVXBkYXRlZCBoZWFkZXJQYWdlSGVpZ2h0IHdpdGggZGVsYXk6JywgaGVhZGVyUGFnZUhlaWdodCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IGhlYWRlclBhZ2VFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihoZWFkZXJQYWdlU2VsZWN0b3IpO1xyXG4gICAgICAgIGlmIChoZWFkZXJQYWdlRWxlbWVudCkge1xyXG4gICAgICAgICAgICBjb25zdCBvYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKGFzeW5jICgpID0+IHtcclxuICAgICAgICAgICAgICAgIGF3YWl0IHVwZGF0ZUhlYWRlckhlaWdodFdpdGhEZWxheSgpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIG9ic2VydmVyLm9ic2VydmUoaGVhZGVyUGFnZUVsZW1lbnQsIHtcclxuICAgICAgICAgICAgICAgIGF0dHJpYnV0ZXM6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBjaGlsZExpc3Q6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgc3VidHJlZTogZmFsc2UsXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgdXBkYXRlSGVhZGVySGVpZ2h0V2l0aERlbGF5KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKS5mb3JFYWNoKChlbGVtZW50KSA9PiB7XHJcbiAgICAgICAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBhc3luYyBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGFuY2hvciA9IHRoaXMuZ2V0QXR0cmlidXRlKCdocmVmJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGFuY2hvci5zdGFydHNXaXRoKCcjJykgJiYgYW5jaG9yICE9PSAnIycpIHtcclxuICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHRhcmdldEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGFuY2hvcik7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaGVhZGVyRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoaGVhZGVyU2VsZWN0b3IpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAodGFyZ2V0RWxlbWVudCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbiBnZXRFbGVtZW50T2Zmc2V0VG9wKGVsZW1lbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlY3QgPSBlbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgc2Nyb2xsVG9wID0gd2luZG93LnBhZ2VZT2Zmc2V0IHx8IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxUb3A7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVjdC50b3AgKyBzY3JvbGxUb3A7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGF3YWl0IGRlbGF5KDEwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHRhcmdldFBvc2l0aW9uID0gZ2V0RWxlbWVudE9mZnNldFRvcCh0YXJnZXRFbGVtZW50KSAtICgod2luZG93LmlubmVyV2lkdGggPD0gOTkxID8gOTAgOiAxMCkgKyBoZWFkZXJQYWdlSGVpZ2h0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ1Njcm9sbCB0byBwb3NpdGlvbiB3aXRoIGRlbGF5OicsIHRhcmdldFBvc2l0aW9uKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93LnNjcm9sbFRvKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvcDogdGFyZ2V0UG9zaXRpb24sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBiZWhhdmlvcjogJ3Ntb290aCdcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBzbW9vdGhTY3JvbGxUb0FuY2hvcignLnNjcm9sbC10by1hbmNob3IgYScsICcuaGVhZGVyJywgJy5wYWdlX19oZWFkZXInKTtcclxuXHJcblxyXG4vLyBNT0JJTEUgTUVOVVxyXG4gICAgY29uc3Qgc2lkZWJhciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zaWRlYmFyJyk7XHJcbiAgICBjb25zdCBoZWFkZXJTYk9wID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhlYWRlcicpO1xyXG4gICAgY29uc3QgYnRuQnVyZ2VyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJ0bi1idXJnZXInKTtcclxuICAgIGNvbnN0IG1lbnVMaW5rcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5zaWRlYmFyIC5tZW51X19saW5rJyk7XHJcbiAgICBjb25zdCBvdmVybGF5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNpZGViYXJfX292ZXJsYXknKTtcclxuICAgIGNvbnN0IGJ0bkNhbGxTYiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5idG5fY2FsbCcpO1xyXG5cclxuICAgIGJ0bkJ1cmdlci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIHNpZGViYXIuY2xhc3NMaXN0LnRvZ2dsZSgnb3BlbicpO1xyXG4gICAgICAgIGhlYWRlclNiT3AuY2xhc3NMaXN0LnRvZ2dsZSgnb3BlbicpO1xyXG4gICAgICAgIG92ZXJsYXkuY2xhc3NMaXN0LnRvZ2dsZSgnZWwtdmlzaWJsZScpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgbWVudUxpbmtzLmZvckVhY2goZnVuY3Rpb24gKGxpbmspIHtcclxuICAgICAgICBsaW5rLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBzaWRlYmFyLmNsYXNzTGlzdC5yZW1vdmUoJ29wZW4nKTtcclxuICAgICAgICAgICAgb3ZlcmxheS5jbGFzc0xpc3QucmVtb3ZlKCdlbC12aXNpYmxlJyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBvdmVybGF5LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHNpZGViYXIuY2xhc3NMaXN0LnJlbW92ZSgnb3BlbicpO1xyXG4gICAgICAgIG92ZXJsYXkuY2xhc3NMaXN0LnJlbW92ZSgnZWwtdmlzaWJsZScpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgYnRuQ2FsbFNiLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHNpZGViYXIuY2xhc3NMaXN0LnJlbW92ZSgnb3BlbicpO1xyXG4gICAgICAgIG92ZXJsYXkuY2xhc3NMaXN0LnJlbW92ZSgnZWwtdmlzaWJsZScpO1xyXG4gICAgfSk7XHJcblxyXG4vL1NUSUNLWSBIRUFERVIgUEFHRVxyXG5cclxuICAgIGNvbnN0IHN0aWNreUVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucGFnZV9faGVhZGVyJyk7XHJcbiAgICBsZXQgc3RpY2t5T2Zmc2V0ID0gMDtcclxuXHJcbiAgICBmdW5jdGlvbiB1cGRhdGVTdGlja3lCYW5uZXJPZmZzZXQoKSB7XHJcbiAgICAgICAgY29uc3QgcGFnZUJhbm5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zZWN0aW9uLWJhbm5lcicpO1xyXG5cclxuICAgICAgICBpZiAocGFnZUJhbm5lcikge1xyXG4gICAgICAgICAgICBjb25zdCBiYW5uZXJIID0gcGFnZUJhbm5lci5vZmZzZXRIZWlnaHQ7XHJcbiAgICAgICAgICAgIGNvbnN0IHN0aWNreUggPSBzdGlja3lFbGVtZW50Lm9mZnNldEhlaWdodDtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IG1vYmlsZU9mZnNldCA9IHdpbmRvdy5pbm5lcldpZHRoIDw9IDk5MSA/IDgwIDogMDtcclxuXHJcbiAgICAgICAgICAgIHN0aWNreU9mZnNldCA9IGJhbm5lckggLSBzdGlja3lIIC0gbW9iaWxlT2Zmc2V0O1xyXG5cclxuICAgICAgICAgICAgaWYgKHdpbmRvdy5wYWdlWU9mZnNldCA+PSBzdGlja3lPZmZzZXQpIHtcclxuICAgICAgICAgICAgICAgIHN0aWNreUVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnc3RpY2t5Jyk7XHJcbiAgICAgICAgICAgICAgICBzdGlja3lPZmZzZXQgPSBzdGlja3lFbGVtZW50Lm9mZnNldFRvcDtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHN0aWNreUVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgnc3RpY2t5Jyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIHVwZGF0ZVN0aWNreUJhbm5lck9mZnNldCk7XHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIHVwZGF0ZVN0aWNreUJhbm5lck9mZnNldCk7XHJcblxyXG4gICAgY29uc3QgYmFubmVyVGh1bWIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNlY3Rpb24tYmFubmVyX190aHVtYlwiKTtcclxuICAgIGNvbnN0IGJhbm5lclRpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBhZ2UtdGl0bGUnKTtcclxuXHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInNjcm9sbFwiLCAoKSA9PiB7XHJcbiAgICAgICAgdXBkYXRlU3RpY2t5QmFubmVyT2Zmc2V0KCk7XHJcblxyXG4gICAgICAgIGlmIChiYW5uZXJUaHVtYiAmJiBiYW5uZXJUaXRsZSkge1xyXG4gICAgICAgICAgICBpZiAod2luZG93LnNjcm9sbFkgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICBiYW5uZXJUaHVtYi5jbGFzc0xpc3QuYWRkKFwiaGlkZS10aHVtYlwiKTtcclxuICAgICAgICAgICAgICAgIGJhbm5lclRpdGxlLmNsYXNzTGlzdC5hZGQoXCJzbWFsbC10aXRsZVwiKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGJhbm5lclRodW1iLmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRlLXRodW1iXCIpO1xyXG4gICAgICAgICAgICAgICAgYmFubmVyVGl0bGUuY2xhc3NMaXN0LnJlbW92ZShcInNtYWxsLXRpdGxlXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4vLyBzdGlja3lPZmZzZXQgLSA4MFxyXG4vL1NMSURFUlxyXG5cclxuICAgIGNvbnN0IHN3aXBlckluZm8gPSBuZXcgU3dpcGVyKCcuc3dpcGVyLWluZm8nLCB7XHJcbiAgICAgICAgcGFnaW5hdGlvbjoge1xyXG4gICAgICAgICAgICBlbDogJy5zd2lwZXItaW5mbyAuc3dpcGVyLXBhZ2luYXRpb24nLFxyXG4gICAgICAgICAgICBjbGlja2FibGU6IHRydWUsXHJcbiAgICAgICAgfSxcclxuICAgIH0pO1xyXG5cclxuICAgIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJvZHVjdC1zbGlkZXInKSkge1xyXG4gICAgICAgIGNvbnN0IHByb2R1Y3RTbGlkZXIgPSBuZXcgU3dpcGVyKCcucHJvZHVjdC1zbGlkZXIgJywge1xyXG4gICAgICAgICAgICBwYWdpbmF0aW9uOiB7XHJcbiAgICAgICAgICAgICAgICBlbDogJy5wcm9kdWN0LXNsaWRlciAuc3dpcGVyLXBhZ2luYXRpb24nLFxyXG4gICAgICAgICAgICAgICAgY2xpY2thYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgZHluYW1pY0J1bGxldHM6IHRydWUsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIG5hdmlnYXRpb246IHtcclxuICAgICAgICAgICAgICAgIG5leHRFbDogXCIuc3dpcGVyLWJ1dHRvbi1uZXh0XCIsXHJcbiAgICAgICAgICAgICAgICBwcmV2RWw6IFwiLnN3aXBlci1idXR0b24tcHJldlwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBicmVha3BvaW50czoge1xyXG4gICAgICAgICAgICAgICAgNTc3OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzUGVyVmlldzogMixcclxuICAgICAgICAgICAgICAgICAgICBzcGFjZUJldHdlZW46IDE2XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNhcmRzLXNsaWRlcicpKSB7XHJcbiAgICAgICAgY29uc3QgY2FyZFNsaWRlciA9IG5ldyBTd2lwZXIoJy5jYXJkcy1zbGlkZXIgJywge1xyXG4gICAgICAgICAgICBwYWdpbmF0aW9uOiB7XHJcbiAgICAgICAgICAgICAgICBlbDogJy5jYXJkcy1zbGlkZXIgLnN3aXBlci1wYWdpbmF0aW9uJyxcclxuICAgICAgICAgICAgICAgIGNsaWNrYWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgbmF2aWdhdGlvbjoge1xyXG4gICAgICAgICAgICAgICAgbmV4dEVsOiBcIi5zd2lwZXItYnV0dG9uLW5leHRcIixcclxuICAgICAgICAgICAgICAgIHByZXZFbDogXCIuc3dpcGVyLWJ1dHRvbi1wcmV2XCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGJyZWFrcG9pbnRzOiB7XHJcbiAgICAgICAgICAgICAgICA1Nzc6IHtcclxuICAgICAgICAgICAgICAgICAgICBzbGlkZXNQZXJWaWV3OiAyLFxyXG4gICAgICAgICAgICAgICAgICAgIHNwYWNlQmV0d2VlbjogMTYsXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmdyZWVuLXNsaWRlcicpKSB7XHJcbiAgICAgICAgY29uc3QgZ3JlZW5TbGlkZXIgPSBuZXcgU3dpcGVyKCcuZ3JlZW4tc2xpZGVyJywge1xyXG4gICAgICAgICAgICBwYWdpbmF0aW9uOiB7XHJcbiAgICAgICAgICAgICAgICBlbDogJy5ncmVlbi1zbGlkZXIgLnN3aXBlci1wYWdpbmF0aW9uJyxcclxuICAgICAgICAgICAgICAgIGNsaWNrYWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgbmF2aWdhdGlvbjoge1xyXG4gICAgICAgICAgICAgICAgbmV4dEVsOiBcIi5zd2lwZXItYnV0dG9uLW5leHRcIixcclxuICAgICAgICAgICAgICAgIHByZXZFbDogXCIuc3dpcGVyLWJ1dHRvbi1wcmV2XCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNsaWRlci00LWNvbCcpKSB7XHJcbiAgICAgICAgY29uc3Qgc2xpZGVyNENvbCA9IG5ldyBTd2lwZXIoJy5zbGlkZXItNC1jb2wnLCB7XHJcbiAgICAgICAgICAgIHNsaWRlc1BlclZpZXc6IDEsXHJcbiAgICAgICAgICAgIHBhZ2luYXRpb246IHtcclxuICAgICAgICAgICAgICAgIGVsOiAnLnNsaWRlci00LWNvbCAuc3dpcGVyLXBhZ2luYXRpb24nLFxyXG4gICAgICAgICAgICAgICAgY2xpY2thYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBuYXZpZ2F0aW9uOiB7XHJcbiAgICAgICAgICAgICAgICBuZXh0RWw6IFwiLnNsaWRlci00LWNvbCAuc3dpcGVyLWJ1dHRvbi1uZXh0XCIsXHJcbiAgICAgICAgICAgICAgICBwcmV2RWw6IFwiLnNsaWRlci00LWNvbCAuc3dpcGVyLWJ1dHRvbi1wcmV2XCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGJyZWFrcG9pbnRzOiB7XHJcbiAgICAgICAgICAgICAgICA1Nzc6IHtcclxuICAgICAgICAgICAgICAgICAgICBzbGlkZXNQZXJWaWV3OiAyLFxyXG4gICAgICAgICAgICAgICAgICAgIHNwYWNlQmV0d2VlbjogMTZcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICA3Njc6IHtcclxuICAgICAgICAgICAgICAgICAgICBzbGlkZXNQZXJWaWV3OiAzLFxyXG4gICAgICAgICAgICAgICAgICAgIHNwYWNlQmV0d2VlbjogMTZcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICA5OTE6IHtcclxuICAgICAgICAgICAgICAgICAgICBzbGlkZXNQZXJWaWV3OiA0LFxyXG4gICAgICAgICAgICAgICAgICAgIHNwYWNlQmV0d2VlbjogMTZcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2xpZGVyLWdhbGxlcnkyJykpIHtcclxuICAgICAgICBjb25zdCBzbGlkZXJHYWxsZXJ5MiA9IG5ldyBTd2lwZXIoJy5zbGlkZXItZ2FsbGVyeTIgJywge1xyXG4gICAgICAgICAgICBzcGFjZUJldHdlZW46IDE2LFxyXG4gICAgICAgICAgICBuYXZpZ2F0aW9uOiB7XHJcbiAgICAgICAgICAgICAgICBuZXh0RWw6IFwiLnNsaWRlci1nYWxsZXJ5MiAuc3dpcGVyLWJ1dHRvbi1uZXh0XCIsXHJcbiAgICAgICAgICAgICAgICBwcmV2RWw6IFwiLnNsaWRlci1nYWxsZXJ5MiAuc3dpcGVyLWJ1dHRvbi1wcmV2XCIsXHJcbiAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGpRdWVyeSgnYm9keScpLm9uKCdjbGljaycsICcucHJvZHVjdC1mZWF0dXJlX190aHVtYicsIGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgalF1ZXJ5KHRoaXMpLnNpYmxpbmdzKCcucHJvZHVjdC1mZWF0dXJlX190aHVtYicpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcclxuICAgICAgICBqUXVlcnkodGhpcykucGFyZW50KCkucGFyZW50KCkuZmluZCgnLnByb2R1Y3QtZmVhdHVyZV9fY29udGVudCAudGFiLWNvbnRlbnQnKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XHJcblxyXG4gICAgICAgIGpRdWVyeSh0aGlzKS5hZGRDbGFzcygnYWN0aXZlJyk7XHJcblxyXG4gICAgICAgIGxldCB0YXJnZXRJZCA9IGpRdWVyeSh0aGlzKS5hdHRyKCdkYXRhVGFyZ2V0Jyk7XHJcbiAgICAgICAgalF1ZXJ5KHRhcmdldElkKS5hZGRDbGFzcygnYWN0aXZlJyk7XHJcbiAgICB9KTtcclxuXHJcbi8vVEFCU1xyXG4gICAgY29uc3QgdGFiTGlua3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudGFic19fbmF2LWxpbmsnKTtcclxuXHJcbiAgICBmdW5jdGlvbiBmaW5kUGFyZW50KGVsLCBwYXJlbnRDbGFzc05hbWUpIHtcclxuICAgICAgICBpZiAoIWVsKSByZXR1cm4gZG9jdW1lbnQuYm9keTtcclxuICAgICAgICAvLyBTdGFydCBmcm9tIHRoZSBjdXJyZW50IGVsZW1lbnRcclxuICAgICAgICBsZXQgaWdub3JlQ2xpY2tPdXRzaWRlID0gZWwuY2xhc3NMaXN0LmNvbnRhaW5zKHBhcmVudENsYXNzTmFtZSk7XHJcbiAgICAgICAgbGV0IHBhcmVudEVsID0gZWwucGFyZW50RWxlbWVudDtcclxuXHJcbiAgICAgICAgLy8gTG9vcCB1bnRpbCB3ZSByZWFjaCB0aGUgdG9wIG9mIHRoZSBET01cclxuICAgICAgICB3aGlsZSAoIWlnbm9yZUNsaWNrT3V0c2lkZSAmJiBwYXJlbnRFbCkge1xyXG4gICAgICAgICAgICAvLyBNb3ZlIHVwIHRvIHRoZSBwYXJlbnQgZWxlbWVudFxyXG4gICAgICAgICAgICBpZ25vcmVDbGlja091dHNpZGUgPSBwYXJlbnRFbC5jbGFzc0xpc3QuY29udGFpbnMocGFyZW50Q2xhc3NOYW1lKTtcclxuICAgICAgICAgICAgaWYgKCFpZ25vcmVDbGlja091dHNpZGUpIHtcclxuICAgICAgICAgICAgICAgIHBhcmVudEVsID0gcGFyZW50RWwucGFyZW50RWxlbWVudDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHBhcmVudEVsO1xyXG4gICAgfVxyXG5cclxuICAgIHRhYkxpbmtzLmZvckVhY2gobGluayA9PiB7XHJcbiAgICAgICAgbGluay5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XHJcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgY29uc3QgcGFyZW50ID0gZmluZFBhcmVudChlLnRhcmdldCwgJ3RhYnMnKTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IHRhYkxpbmtzID0gcGFyZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy50YWJzX19uYXYtbGluaycpO1xyXG4gICAgICAgICAgICBjb25zdCB0YWJDb250ZW50cyA9IHBhcmVudC5xdWVyeVNlbGVjdG9yQWxsKCcudGFiLWNvbnRlbnQnKTtcclxuXHJcbiAgICAgICAgICAgIHRhYkxpbmtzLmZvckVhY2gobGluayA9PiBsaW5rLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpKTtcclxuICAgICAgICAgICAgdGFiQ29udGVudHMuZm9yRWFjaChjb250ZW50ID0+IGNvbnRlbnQuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJykpO1xyXG4gICAgICAgICAgICBsaW5rLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xyXG5cclxuICAgICAgICAgICAgY29uc3QgdGFyZ2V0SWQgPSBsaW5rLmdldEF0dHJpYnV0ZSgnZGF0YVRhcmdldCcpLnN1YnN0cmluZygxKTtcclxuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGFyZ2V0SWQpLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4vL0JMT0NLIEZFQVRVUkUgUFJPRFVDVFxyXG4gICAgY29uc3QgdGh1bWJOYXZCbG9jayA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5wcm9kdWN0LWZlYXR1cmVfX25hdicpO1xyXG4gICAgY29uc3QgdGFiVGh1bWJOYXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucHJvZHVjdC1mZWF0dXJlX190aHVtYicpO1xyXG5cclxuICAgIHRhYlRodW1iTmF2LmZvckVhY2gobGluayA9PiB7XHJcbiAgICAgICAgaWYgKHdpbmRvdy5pbm5lcldpZHRoID4gNzY3KSB7XHJcbiAgICAgICAgICAgIGxpbmsuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgcGFyZW50ID0gZmluZFBhcmVudChlLnRhcmdldCwgJ3Byb2R1Y3QtZmVhdHVyZScpO1xyXG5cclxuICAgICAgICAgICAgICAgIGNvbnN0IHRhYlRodW1iTmF2ID0gcGFyZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5wcm9kdWN0LWZlYXR1cmVfX3RodW1iJyk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB0YWJDb250ZW50cyA9IHBhcmVudC5xdWVyeVNlbGVjdG9yQWxsKCcuZmVhdHVyZS1jb250ZW50Jyk7XHJcbiAgICAgICAgICAgICAgICBpZiAodGFiVGh1bWJOYXZbMF0pIHtcclxuICAgICAgICAgICAgICAgICAgICB0YWJUaHVtYk5hdlswXS5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRhYlRodW1iTmF2LmZvckVhY2gobGluayA9PiBsaW5rLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpKTtcclxuICAgICAgICAgICAgICAgIHRhYkNvbnRlbnRzLmZvckVhY2goY29udGVudCA9PiBjb250ZW50LmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpKTtcclxuICAgICAgICAgICAgICAgIGxpbmsuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgY29uc3QgdGFyZ2V0SWQgPSBsaW5rLmdldEF0dHJpYnV0ZSgnZGF0YVRhcmdldCcpO1xyXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGFyZ2V0SWQpLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAodGh1bWJOYXZCbG9jaykge1xyXG4gICAgICAgICAgICAgICAgdGFiVGh1bWJOYXYuZm9yRWFjaChibG9jayA9PiBibG9jay5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRhYlRodW1iTmF2LmZvckVhY2goYmxvY2sgPT4gYmxvY2suc3R5bGUuZGlzcGxheSA9ICdmbGV4Jyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxuLy8gUE9QVVBcclxuICAgIGNvbnN0IGluaXRQb3B1cCA9IChwb3B1cFNlbGVjdG9yLCB0cmlnZ2VyU2VsZWN0b3IsIGJhY2tkcm9wU2VsZWN0b3IpID0+IHtcclxuICAgICAgICBjb25zdCBwb3B1cCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IocG9wdXBTZWxlY3Rvcik7XHJcbiAgICAgICAgaWYgKHBvcHVwID09IG51bGwpXHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuXHJcbiAgICAgICAgY29uc3QgdHJpZ2dlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodHJpZ2dlclNlbGVjdG9yKTtcclxuICAgICAgICBjb25zdCBiYWNrZHJvcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5iYWNrZHJvcCcpO1xyXG4gICAgICAgIGNvbnN0IGNsb3NlQnV0dG9uID0gcG9wdXAucXVlcnlTZWxlY3RvcignLnBvcHVwX2Nsb3NlJyk7XHJcblxyXG4gICAgICAgIGlmICghcG9wdXAgfHwgIXRyaWdnZXIgfHwgIWJhY2tkcm9wIHx8ICFjbG9zZUJ1dHRvbikge1xyXG4gICAgICAgICAgICBjb25zb2xlLndhcm4oXCLQntC00LjQvSDQtyDQtdC70LXQvNC10L3RgtGW0LIg0L3QtSDQt9C90LDQudC00LXQvdC+XCIsIHBvcHVwU2VsZWN0b3IsIHRyaWdnZXJTZWxlY3RvciwgYmFja2Ryb3BTZWxlY3Rvcik7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3Qgb3BlblBvcHVwID0gKCkgPT4ge1xyXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICBwb3B1cC5jbGFzc0xpc3QuYWRkKCdvcGVuX21vZGFsJyk7XHJcbiAgICAgICAgICAgIGJhY2tkcm9wLmNsYXNzTGlzdC5hZGQoJ2VsLXZpc2libGUnKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBjb25zdCBjbG9zZVBvcHVwID0gKCkgPT4ge1xyXG4gICAgICAgICAgICBwb3B1cC5jbGFzc0xpc3QucmVtb3ZlKCdvcGVuX21vZGFsJyk7XHJcbiAgICAgICAgICAgIGJhY2tkcm9wLmNsYXNzTGlzdC5yZW1vdmUoJ2VsLXZpc2libGUnKTtcclxuICAgICAgICAgICAgaWYgKHdpbmRvdy5jbGVhckNvbnRhY3RGb3JtKSB7XHJcbiAgICAgICAgICAgICAgICB3aW5kb3cuY2xlYXJDb250YWN0Rm9ybSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0cmlnZ2VyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgb3BlblBvcHVwKTtcclxuICAgICAgICBjbG9zZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNsb3NlUG9wdXApO1xyXG4gICAgICAgIGJhY2tkcm9wLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY2xvc2VQb3B1cCk7XHJcbiAgICB9O1xyXG5cclxuICAgIGluaXRQb3B1cCgnLnBvcHVwX2NvbnRhY3RzJywgJy5idG5fY2FsbCcsICcuYmFja2Ryb3AnKTtcclxuICAgIGluaXRQb3B1cCgnLnBvcHVwX2NvbnRhY3RzJywgJy5idG5fY2FsbF9mb290ZXInLCAnLmJhY2tkcm9wJyk7XHJcbiAgICBpbml0UG9wdXAoJy5wb3B1cF9sb2NhdGlvbicsICcudHJpZ2dlci1wb3B1cCcsICcuYmFja2Ryb3AnKTtcclxuICAgIGluaXRQb3B1cCgnLnBvcHVwX2NvbnRhY3RzJywgJy5jYWxsX21haW4nLCAnLmJhY2tkcm9wJyk7XHJcblxyXG4vLyAgICBNVUxUSSBTVEVQIEZPUk1cclxuICAgIGNvbnN0IG1zRm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tdWx0aS1zdGVwLWZvcm0nKTtcclxuXHJcbiAgICBpZiAobXNGb3JtKSB7XHJcbiAgICAgICAgbGV0IGFjdGl2ZUluZGV4ID0gMDtcclxuICAgICAgICBjb25zdCBzdGVwc0NpcmNsZSA9IG1zRm9ybS5xdWVyeVNlbGVjdG9yQWxsKCcucHJvZ3Jlc3Mtc3RlcCcpO1xyXG4gICAgICAgIGNvbnN0IHN0ZXBDb250ZW50ID0gbXNGb3JtLnF1ZXJ5U2VsZWN0b3JBbGwoJy5mb3JtX19zdGVwJyk7XHJcblxyXG4gICAgICAgIGNvbnN0IGJ0bnNOZXh0ID0gbXNGb3JtLnF1ZXJ5U2VsZWN0b3JBbGwoJy5idG5fbmV4dCcpO1xyXG4gICAgICAgIGNvbnN0IHByZXZCdG5zID0gbXNGb3JtLnF1ZXJ5U2VsZWN0b3JBbGwoJy5mb3JtX19uYXYtbGluaycpO1xyXG5cclxuICAgICAgICBjb25zdCB0aFlvdVBhZ2UgPSBtc0Zvcm0ucXVlcnlTZWxlY3RvcignLnRoYW5rcy15b3UtcGFnZScpO1xyXG5cclxuICAgICAgICBzdGVwc0NpcmNsZVthY3RpdmVJbmRleF0uY2xhc3NMaXN0LmFkZCgncHJvZ3Jlc3Mtc3RlcF9hY3RpdmUnKTtcclxuICAgICAgICBzdGVwQ29udGVudFthY3RpdmVJbmRleF0uY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XHJcbiAgICAgICAgcHJldkJ0bnNbYWN0aXZlSW5kZXhdLmNsYXNzTGlzdC5hZGQoJ3Nob3cnKTtcclxuXHJcbiAgICAgICAgY29uc3QgZ29Ub1N0ZXAgPSAoYWN0aXZlSW5kZXgpID0+IHtcclxuICAgICAgICAgICAgc3RlcENvbnRlbnQuZm9yRWFjaChlbCA9PiBlbC5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKSlcclxuXHJcbiAgICAgICAgICAgIHN0ZXBzQ2lyY2xlLmZvckVhY2goKGVsLCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGluZGV4ID4gYWN0aXZlSW5kZXgpIHtcclxuICAgICAgICAgICAgICAgICAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKCdwcm9ncmVzcy1zdGVwX2FjdGl2ZScpXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGVsLmNsYXNzTGlzdC5hZGQoJ3Byb2dyZXNzLXN0ZXBfYWN0aXZlJylcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgIHByZXZCdG5zLmZvckVhY2goKGVsLCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGluZGV4ID4gYWN0aXZlSW5kZXgpIHtcclxuICAgICAgICAgICAgICAgICAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKCdzaG93Jyk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGVsLmNsYXNzTGlzdC5hZGQoJ3Nob3cnKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGFjdGl2ZUNvbnRlbnQgPSBzdGVwQ29udGVudFthY3RpdmVJbmRleF07XHJcbiAgICAgICAgICAgIGlmIChhY3RpdmVDb250ZW50KSB7XHJcbiAgICAgICAgICAgICAgICBhY3RpdmVDb250ZW50LmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHdpbmRvdy5jbGVhckNvbnRhY3RGb3JtID0gKCkgPT4ge1xyXG4gICAgICAgICAgICBtc0Zvcm0ucmVzZXQoKTtcclxuICAgICAgICAgICAgYWN0aXZlSW5kZXggPSAwO1xyXG4gICAgICAgICAgICBnb1RvU3RlcChhY3RpdmVJbmRleCk7XHJcbiAgICAgICAgICAgIHRoWW91UGFnZS5jbGFzc0xpc3QucmVtb3ZlKCdzaG93Jyk7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgYnRuc05leHQuZm9yRWFjaChidG4gPT4gYnRuLmFkZEV2ZW50TGlzdGVuZXIoXHJcbiAgICAgICAgICAgICdjbGljaycsIChlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBhY3RpdmVJbmRleCA9IGFjdGl2ZUluZGV4ICsgMTtcclxuICAgICAgICAgICAgICAgIGlmIChhY3RpdmVJbmRleCA8IHN0ZXBDb250ZW50Lmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGdvVG9TdGVwKGFjdGl2ZUluZGV4KTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoZS50YXJnZXQudHlwZSA9PT0gJ3N1Ym1pdCcpIHtcclxuICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRoWW91UGFnZS5jbGFzc0xpc3QuYWRkKCdzaG93Jyk7XHJcbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsb3NlUG9wdXAoKTtcclxuICAgICAgICAgICAgICAgICAgICB9LCAzMDAwKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgKSk7XHJcblxyXG4gICAgICAgIHByZXZCdG5zLmZvckVhY2goYnRuID0+IGJ0bi5hZGRFdmVudExpc3RlbmVyKFxyXG4gICAgICAgICAgICAnY2xpY2snLCAoZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgYWN0aXZlSW5kZXggPSBBcnJheS5mcm9tKHByZXZCdG5zKS5maW5kSW5kZXgoZWwgPT4gZWwgPT09IGUudGFyZ2V0KTtcclxuXHJcbiAgICAgICAgICAgICAgICBnb1RvU3RlcChhY3RpdmVJbmRleCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICApKTtcclxuXHJcbiAgICAgICAgbXNGb3JtLnF1ZXJ5U2VsZWN0b3JBbGwoJy5qcy1mb3JtLWZpZWxkJykuZm9yRWFjaChlbCA9PiB7XHJcbiAgICAgICAgICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgKGUpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGFjdGl2ZVNldENvbnRyb2xzID0gc3RlcENvbnRlbnRbYWN0aXZlSW5kZXhdLnF1ZXJ5U2VsZWN0b3JBbGwoJy5qcy1mb3JtLWZpZWxkJyk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBzdWJtaXRCdG4gPSBzdGVwQ29udGVudFthY3RpdmVJbmRleF0ucXVlcnlTZWxlY3RvcignLmJ0bl9uZXh0Jyk7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IGRpc2FibGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGlmIChhY3RpdmVJbmRleCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkID0gQXJyYXkuZnJvbShhY3RpdmVTZXRDb250cm9scykuZmlsdGVyKGVsID0+IGVsLmhhc0F0dHJpYnV0ZSgncmVxdWlyZWQnKSkuc29tZShlbCA9PiBlbC52YWx1ZSA9PT0gJycpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChhY3RpdmVJbmRleCA9PT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkID0gIUFycmF5LmZyb20oc3RlcENvbnRlbnRbYWN0aXZlSW5kZXhdLnF1ZXJ5U2VsZWN0b3JBbGwoJ1t0eXBlPVwiY2hlY2tib3hcIl0nKSkuc29tZShlbCA9PiBlbC5jaGVja2VkKVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChhY3RpdmVJbmRleCA9PT0gMikge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG90aGVyQ2l0eSA9IG1zRm9ybS5xdWVyeVNlbGVjdG9yKCdbbmFtZT1cIm90aGVyX2NpdHlcIl0nKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAob3RoZXJDaXR5ID09PSBlLnRhcmdldCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdGVwQ29udGVudFthY3RpdmVJbmRleF0ucXVlcnlTZWxlY3RvckFsbCgnW3R5cGU9XCJyYWRpb1wiXScpLmZvckVhY2goZWwgPT4gZWwuY2hlY2tlZCA9IGZhbHNlKVxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG90aGVyQ2l0eS52YWx1ZSA9ICcnO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQgPSAhQXJyYXkuZnJvbShzdGVwQ29udGVudFthY3RpdmVJbmRleF0ucXVlcnlTZWxlY3RvckFsbCgnW3R5cGU9XCJyYWRpb1wiXScpKS5zb21lKGVsID0+IGVsLmNoZWNrZWQpICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG90aGVyQ2l0eS52YWx1ZSA9PT0gJyc7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKG1zRm9ybS5xdWVyeVNlbGVjdG9yKCdbbmFtZT1cIm90aGVyX2NpdHlcIl0nKSlcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBzdWJtaXRCdG4uZGlzYWJsZWQgPSBkaXNhYmxlZFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGJ0bkNsb3NUaGFua3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYnRuX2Nsb3NlLXRoYW5rcycpO1xyXG5cclxuICAgIGJ0bkNsb3NUaGFua3MuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBvcHVwX2NvbnRhY3RzJykuY2xhc3NMaXN0LnJlbW92ZSgnb3Blbl9tb2RhbCcpO1xyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5iYWNrZHJvcCcpLmNsYXNzTGlzdC5yZW1vdmUoJ2VsLXZpc2libGUnKTtcclxuICAgIH0pO1xyXG5cclxuLy8gICAgU0lERUJBUiBIT1ZFUiBPVkVSTEFZXHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuc2lkZWJhcl9fbmF2IC5kcm9wZG93bicpLmZvckVhY2goZnVuY3Rpb24gKGVsZW1lbnQpIHtcclxuICAgICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZW50ZXInLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zaWRlYmFyX19vdmVybGF5JykuY2xhc3NMaXN0LmFkZCgnc2hvdycpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbGVhdmUnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zaWRlYmFyX19vdmVybGF5JykuY2xhc3NMaXN0LnJlbW92ZSgnc2hvdycpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnI2FjY29yZGlvbiAucGFuZWxfX2hlYWRpbmcnKS5mb3JFYWNoKChoZWFkaW5nKSA9PiB7XHJcbiAgICAgICAgaGVhZGluZy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgY29uc3QgaXNPcGVuID0gdGhpcy5jbGFzc0xpc3QuY29udGFpbnMoJ29wZW4nKTtcclxuICAgICAgICAgICAgY29uc3QgYWxsUGFuZWxzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnI2FjY29yZGlvbiAucGFuZWxfX2hlYWRpbmcnKTtcclxuICAgICAgICAgICAgY29uc3QgYWxsQ29udGVudHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucGFuZWwtY29sbGFwc2UnKTtcclxuXHJcbiAgICAgICAgICAgIGFsbFBhbmVscy5mb3JFYWNoKHBhbmVsID0+IHBhbmVsLmNsYXNzTGlzdC5yZW1vdmUoJ29wZW4nKSk7XHJcbiAgICAgICAgICAgIGFsbENvbnRlbnRzLmZvckVhY2goY29udGVudCA9PiBjb250ZW50LnN0eWxlLm1heEhlaWdodCA9IG51bGwpO1xyXG5cclxuICAgICAgICAgICAgaWYgKCFpc09wZW4pIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2xhc3NMaXN0LmFkZCgnb3BlbicpO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgcGFuZWxDb250ZW50ID0gdGhpcy5uZXh0RWxlbWVudFNpYmxpbmc7XHJcbiAgICAgICAgICAgICAgICBwYW5lbENvbnRlbnQuc3R5bGUubWF4SGVpZ2h0ID0gcGFuZWxDb250ZW50LnNjcm9sbEhlaWdodCArICdweCc7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuLy9UQUJMRSBDT0xMQVBTRSBST1dcclxuICAgIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGVjaC1jaGFyYWN0X19yb3cnKSkge1xyXG4gICAgICAgIGNvbnN0IG1heFZpc2libGVSb3dzID0gNTtcclxuICAgICAgICBjb25zdCByb3dzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnRlY2gtY2hhcmFjdF9fcm93Jyk7XHJcbiAgICAgICAgY29uc3Qgc2hvd01vcmVCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYnRuX21vcmUnKTtcclxuXHJcbiAgICAgICAgaWYgKHJvd3MubGVuZ3RoID4gbWF4VmlzaWJsZVJvd3MpIHtcclxuICAgICAgICAgICAgc2hvd01vcmVCdG4uc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XHJcblxyXG4gICAgICAgICAgICByb3dzLmZvckVhY2goKHJvdywgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChpbmRleCA+PSBtYXhWaXNpYmxlUm93cykge1xyXG4gICAgICAgICAgICAgICAgICAgIHJvdy5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgc2hvd01vcmVCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICByb3dzLmZvckVhY2gocm93ID0+IHJvdy5zdHlsZS5kaXNwbGF5ID0gJycpO1xyXG5cclxuICAgICAgICAgICAgICAgIHNob3dNb3JlQnRuLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvL0JUTi1GSVhFRCBNQUlOXHJcbiAgICBjb25zdCByb3VuZEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5yb3VuZCcpO1xyXG4gICAgY29uc3QgZml4ZWRCbG9jayA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy53cmFwLXJvdW5kJyk7XHJcblxyXG4gICAgcm91bmRCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgZml4ZWRCbG9jay5jbGFzc0xpc3QudG9nZ2xlKCdhY3RpdmUnKTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vICAgIEJBQ0sgVE8gVE9QXHJcbiAgICAoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGNvbnN0IGdvVG9wQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRvLXRvcCcpO1xyXG5cclxuICAgICAgICBmdW5jdGlvbiB0cmFja1Njcm9sbCgpIHtcclxuICAgICAgICAgICAgY29uc3Qgc2Nyb2xsZWQgPSB3aW5kb3cucGFnZVlPZmZzZXQ7XHJcbiAgICAgICAgICAgIGNvbnN0IGNvb3JkcyA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRIZWlnaHQ7XHJcblxyXG4gICAgICAgICAgICBpZiAoc2Nyb2xsZWQgPiBjb29yZHMpIHtcclxuICAgICAgICAgICAgICAgIGdvVG9wQnRuLmNsYXNzTGlzdC5hZGQoJ3Nob3cnKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGdvVG9wQnRuLmNsYXNzTGlzdC5yZW1vdmUoJ3Nob3cnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gYmFja1RvVG9wKCkge1xyXG4gICAgICAgICAgICBpZiAod2luZG93LnBhZ2VZT2Zmc2V0ID4gMCkge1xyXG4gICAgICAgICAgICAgICAgd2luZG93LnNjcm9sbEJ5KDAsIC04MCk7XHJcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGJhY2tUb1RvcCwgMTApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoZ29Ub3BCdG4pIHtcclxuICAgICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIHRyYWNrU2Nyb2xsKTtcclxuICAgICAgICAgICAgZ29Ub3BCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBiYWNrVG9Ub3ApO1xyXG4gICAgICAgIH1cclxuICAgIH0pKCk7XHJcbn0pO1xyXG5cclxuIl0sImZpbGUiOiJtYWluLmpzIn0=
