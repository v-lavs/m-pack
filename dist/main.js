/*
* to include js file write: `//= include ./path-to-file`
* */

// CUSTOM SCRIPTS
document.addEventListener('DOMContentLoaded', function () {

// SCROLL TO ANCHOR
    function smoothScrollToAnchor(selector, headerSelector, headerPageSelector) {
        document.querySelectorAll(selector).forEach((element) => {
            element.addEventListener('click', function (event) {
                const anchor = this.getAttribute('href');

                if (anchor.startsWith('#') && anchor !== '#') {
                    event.preventDefault();
                    console.log(anchor);
                    const targetElement = document.querySelector(anchor);
                    const headerElement = document.querySelector(headerSelector);
                    const headerPageElement = document.querySelector(headerPageSelector);
                    const headerHeight = headerElement ? headerElement.offsetHeight : 0;
                    const headerPageHeight = headerPageElement ? headerPageElement.offsetHeight : 0;

                    if (targetElement) {
                        function getElementOffsetTop(element) {
                            const rect = element.getBoundingClientRect();
                            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                            return rect.top + scrollTop;
                        }

                        const targetPosition = getElementOffsetTop(targetElement) - headerHeight - headerPageHeight;

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
        updateStickyBannerOffset()

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
            dynamicBullets: true,
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

    jQuery('body').on('click', '.product-feature__thumb', function(){

        jQuery(this).siblings('.product-feature__thumb').removeClass('active');
        jQuery(this).parent().parent().find('.product-feature__content .tab-content').removeClass('active');

        jQuery(this).addClass('active');

        let targetId = jQuery(this).attr('dataTarget');
        jQuery(targetId).addClass('active');
    });

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
const  thumbNavBlock = document.querySelectorAll('.product-feature__nav');
    const tabThumbNav = document.querySelectorAll('.product-feature__thumb');

    tabThumbNav.forEach(link => {
     if(window.innerWidth >767)   {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const parent = findParent(e.target, 'product-feature');

                const tabThumbNav = parent.querySelectorAll('.product-feature__thumb');
                const tabContents = parent.querySelectorAll('.feature-content');

                tabThumbNav.forEach(link => link.classList.remove('active'));
                tabContents.forEach(content => content.classList.remove('active'));
                link.classList.add('active');

                const targetId = link.getAttribute('dataTarget').substring(1);
                document.getElementById(targetId).classList.add('active');
            });
        } else {
         if (thumbNavBlock) {
             thumbNavBlock.style.display = 'none';
         }

         // const targetId = link.getAttribute('data-target').replace('#', '');
         // const targetElement = document.getElementById(targetId);

         // if (targetElement) {
         //
         //     const mobileThumb = targetElement.querySelector('.product-feature__thumb-mob img');
         //     if (mobileThumb) {
         //         mobileThumb.src = link.getAttribute('data-src');
         //     }
         // }
     }
    });

//-------------------------------------------------------

// POPUP
//     const popupCont = document.querySelector(".popup_contacts");
//     const btnCall = document.querySelector(".btn_call");
//     const contactsClose = document.querySelector('.popup_close');
//     const backdrop = document.querySelector('.backdrop');
//
//     btnCall.addEventListener('click', () => {
//         popupCont.classList.add('open_modal');
//         backdrop.classList.toggle('el-visible');
//     });
//
//     const closePopup = () => {
//         popupCont.classList.remove('open_modal');
//         backdrop.classList.remove('el-visible');
//         if (window.clearContactForm) {
//             window.clearContactForm();
//         }
//     }
//
//     contactsClose.addEventListener('click', closePopup);
//     backdrop.addEventListener('click', closePopup);
//
//     const popupLoc = document.querySelector(".popup_location");
//     const triggerPopup = document.querySelector(".trigger-popup");
//     const locClose = document.querySelector('.popup_close');
//     const backdropL = document.querySelector('.backdrop');
//
//     triggerPopup.addEventListener('click', () => {
//         popupLoc.classList.add('open_modal');
//         backdropL.classList.toggle('el-visible');
//     });
//
//     const closeLocPopup = () => {
//         popupLoc.classList.remove('open_modal');
//         backdropL.classList.remove('el-visible');
//     }
//
//     popupLoc.addEventListener('click', closeLocPopup);
//     backdropL.addEventListener('click', closeLocPopup);
    const initPopup = (popupSelector, triggerSelector, backdropSelector) => {
        const popup = document.querySelector(popupSelector);
        const trigger = document.querySelector(triggerSelector);
        const backdrop = document.querySelector('.backdrop');
        const closeButton = popup.querySelector('.popup_close');

        if (!popup || !trigger || !backdrop || !closeButton) {
            console.warn("Один з елементів не знайдено", popupSelector, triggerSelector, backdropSelector);
            return;
        }
        const openPopup = () => {
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
    initPopup('.popup_location', '.trigger-popup', '.backdrop');

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

});


//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJtYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qXHJcbiogdG8gaW5jbHVkZSBqcyBmaWxlIHdyaXRlOiBgLy89IGluY2x1ZGUgLi9wYXRoLXRvLWZpbGVgXHJcbiogKi9cclxuXHJcbi8vIENVU1RPTSBTQ1JJUFRTXHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmdW5jdGlvbiAoKSB7XHJcblxyXG4vLyBTQ1JPTEwgVE8gQU5DSE9SXHJcbiAgICBmdW5jdGlvbiBzbW9vdGhTY3JvbGxUb0FuY2hvcihzZWxlY3RvciwgaGVhZGVyU2VsZWN0b3IsIGhlYWRlclBhZ2VTZWxlY3Rvcikge1xyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpLmZvckVhY2goKGVsZW1lbnQpID0+IHtcclxuICAgICAgICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgYW5jaG9yID0gdGhpcy5nZXRBdHRyaWJ1dGUoJ2hyZWYnKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoYW5jaG9yLnN0YXJ0c1dpdGgoJyMnKSAmJiBhbmNob3IgIT09ICcjJykge1xyXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coYW5jaG9yKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCB0YXJnZXRFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihhbmNob3IpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGhlYWRlckVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGhlYWRlclNlbGVjdG9yKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBoZWFkZXJQYWdlRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoaGVhZGVyUGFnZVNlbGVjdG9yKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBoZWFkZXJIZWlnaHQgPSBoZWFkZXJFbGVtZW50ID8gaGVhZGVyRWxlbWVudC5vZmZzZXRIZWlnaHQgOiAwO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGhlYWRlclBhZ2VIZWlnaHQgPSBoZWFkZXJQYWdlRWxlbWVudCA/IGhlYWRlclBhZ2VFbGVtZW50Lm9mZnNldEhlaWdodCA6IDA7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0YXJnZXRFbGVtZW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uIGdldEVsZW1lbnRPZmZzZXRUb3AoZWxlbWVudCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVjdCA9IGVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBzY3JvbGxUb3AgPSB3aW5kb3cucGFnZVlPZmZzZXQgfHwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZWN0LnRvcCArIHNjcm9sbFRvcDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgdGFyZ2V0UG9zaXRpb24gPSBnZXRFbGVtZW50T2Zmc2V0VG9wKHRhcmdldEVsZW1lbnQpIC0gaGVhZGVySGVpZ2h0IC0gaGVhZGVyUGFnZUhlaWdodDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvdy5zY3JvbGxUbyh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b3A6IHRhcmdldFBvc2l0aW9uLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYmVoYXZpb3I6ICdzbW9vdGgnXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgc21vb3RoU2Nyb2xsVG9BbmNob3IoJy5zY3JvbGwtdG8tYW5jaG9yIGEnLCAnLmhlYWRlcicsICcucGFnZV9faGVhZGVyJyk7XHJcblxyXG5cclxuLy8gTU9CSUxFIE1FTlVcclxuICAgIGNvbnN0IHNpZGViYXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2lkZWJhcicpO1xyXG4gICAgY29uc3QgaGVhZGVyU2JPcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5oZWFkZXInKTtcclxuICAgIGNvbnN0IGJ0bkJ1cmdlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5idG4tYnVyZ2VyJyk7XHJcbiAgICBjb25zdCBtZW51TGlua3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuc2lkZWJhciAubWVudV9fbGluaycpO1xyXG4gICAgY29uc3Qgb3ZlcmxheSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zaWRlYmFyX19vdmVybGF5Jyk7XHJcbiAgICBjb25zdCBidG5DYWxsU2IgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYnRuX2NhbGwnKTtcclxuXHJcbiAgICBidG5CdXJnZXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICBzaWRlYmFyLmNsYXNzTGlzdC50b2dnbGUoJ29wZW4nKTtcclxuICAgICAgICBoZWFkZXJTYk9wLmNsYXNzTGlzdC50b2dnbGUoJ29wZW4nKTtcclxuICAgICAgICBvdmVybGF5LmNsYXNzTGlzdC50b2dnbGUoJ2VsLXZpc2libGUnKTtcclxuICAgIH0pO1xyXG5cclxuICAgIG1lbnVMaW5rcy5mb3JFYWNoKGZ1bmN0aW9uIChsaW5rKSB7XHJcbiAgICAgICAgbGluay5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgc2lkZWJhci5jbGFzc0xpc3QucmVtb3ZlKCdvcGVuJyk7XHJcbiAgICAgICAgICAgIG92ZXJsYXkuY2xhc3NMaXN0LnJlbW92ZSgnZWwtdmlzaWJsZScpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgb3ZlcmxheS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBzaWRlYmFyLmNsYXNzTGlzdC5yZW1vdmUoJ29wZW4nKTtcclxuICAgICAgICBvdmVybGF5LmNsYXNzTGlzdC5yZW1vdmUoJ2VsLXZpc2libGUnKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGJ0bkNhbGxTYi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBzaWRlYmFyLmNsYXNzTGlzdC5yZW1vdmUoJ29wZW4nKTtcclxuICAgICAgICBvdmVybGF5LmNsYXNzTGlzdC5yZW1vdmUoJ2VsLXZpc2libGUnKTtcclxuICAgIH0pO1xyXG5cclxuLy9TVElDS1kgSEVBREVSIFBBR0VcclxuXHJcbiAgICBjb25zdCBzdGlja3lFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBhZ2VfX2hlYWRlcicpO1xyXG4gICAgbGV0IHN0aWNreU9mZnNldCA9IDA7XHJcblxyXG4gICAgZnVuY3Rpb24gdXBkYXRlU3RpY2t5QmFubmVyT2Zmc2V0KCkge1xyXG4gICAgICAgIGNvbnN0IHBhZ2VCYW5uZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2VjdGlvbi1iYW5uZXInKTtcclxuXHJcbiAgICAgICAgaWYgKHBhZ2VCYW5uZXIpIHtcclxuICAgICAgICAgICAgY29uc3QgYmFubmVySCA9IHBhZ2VCYW5uZXIub2Zmc2V0SGVpZ2h0O1xyXG4gICAgICAgICAgICBjb25zdCBzdGlja3lIID0gc3RpY2t5RWxlbWVudC5vZmZzZXRIZWlnaHQ7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBtb2JpbGVPZmZzZXQgPSB3aW5kb3cuaW5uZXJXaWR0aCA8PSA5OTEgPyA4MCA6IDA7XHJcblxyXG4gICAgICAgICAgICBzdGlja3lPZmZzZXQgPSBiYW5uZXJIIC0gc3RpY2t5SCAtIG1vYmlsZU9mZnNldDtcclxuXHJcbiAgICAgICAgICAgIGlmICh3aW5kb3cucGFnZVlPZmZzZXQgPj0gc3RpY2t5T2Zmc2V0KSB7XHJcbiAgICAgICAgICAgICAgICBzdGlja3lFbGVtZW50LmNsYXNzTGlzdC5hZGQoJ3N0aWNreScpO1xyXG4gICAgICAgICAgICAgICAgc3RpY2t5T2Zmc2V0ID0gc3RpY2t5RWxlbWVudC5vZmZzZXRUb3A7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBzdGlja3lFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ3N0aWNreScpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCB1cGRhdGVTdGlja3lCYW5uZXJPZmZzZXQpO1xyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCB1cGRhdGVTdGlja3lCYW5uZXJPZmZzZXQpO1xyXG5cclxuICAgIGNvbnN0IGJhbm5lclRodW1iID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zZWN0aW9uLWJhbm5lcl9fdGh1bWJcIik7XHJcbiAgICBjb25zdCBiYW5uZXJUaXRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wYWdlLXRpdGxlJyk7XHJcblxyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJzY3JvbGxcIiwgKCkgPT4ge1xyXG4gICAgICAgIHVwZGF0ZVN0aWNreUJhbm5lck9mZnNldCgpXHJcblxyXG4gICAgICAgIGlmIChiYW5uZXJUaHVtYiAmJiBiYW5uZXJUaXRsZSkge1xyXG4gICAgICAgICAgICBpZiAod2luZG93LnNjcm9sbFkgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICBiYW5uZXJUaHVtYi5jbGFzc0xpc3QuYWRkKFwiaGlkZS10aHVtYlwiKTtcclxuICAgICAgICAgICAgICAgIGJhbm5lclRpdGxlLmNsYXNzTGlzdC5hZGQoXCJzbWFsbC10aXRsZVwiKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGJhbm5lclRodW1iLmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRlLXRodW1iXCIpO1xyXG4gICAgICAgICAgICAgICAgYmFubmVyVGl0bGUuY2xhc3NMaXN0LnJlbW92ZShcInNtYWxsLXRpdGxlXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gc3RpY2t5T2Zmc2V0IC0gODBcclxuLy9TTElERVJcclxuXHJcbiAgICBjb25zdCBzd2lwZXJJbmZvID0gbmV3IFN3aXBlcignLnN3aXBlci1pbmZvJywge1xyXG4gICAgICAgIHBhZ2luYXRpb246IHtcclxuICAgICAgICAgICAgZWw6ICcuc3dpcGVyLWluZm8gLnN3aXBlci1wYWdpbmF0aW9uJyxcclxuICAgICAgICAgICAgY2xpY2thYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICBkeW5hbWljQnVsbGV0czogdHJ1ZSxcclxuICAgICAgICB9LFxyXG4gICAgfSk7XHJcblxyXG4gICAgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcm9kdWN0LXNsaWRlcicpKSB7XHJcbiAgICAgICAgY29uc3QgcHJvZHVjdFNsaWRlciA9IG5ldyBTd2lwZXIoJy5wcm9kdWN0LXNsaWRlciAnLCB7XHJcbiAgICAgICAgICAgIHBhZ2luYXRpb246IHtcclxuICAgICAgICAgICAgICAgIGVsOiAnLnByb2R1Y3Qtc2xpZGVyIC5zd2lwZXItcGFnaW5hdGlvbicsXHJcbiAgICAgICAgICAgICAgICBjbGlja2FibGU6IHRydWUsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIG5hdmlnYXRpb246IHtcclxuICAgICAgICAgICAgICAgIG5leHRFbDogXCIuc3dpcGVyLWJ1dHRvbi1uZXh0XCIsXHJcbiAgICAgICAgICAgICAgICBwcmV2RWw6IFwiLnN3aXBlci1idXR0b24tcHJldlwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBicmVha3BvaW50czoge1xyXG4gICAgICAgICAgICAgICAgNTc3OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzUGVyVmlldzogMixcclxuICAgICAgICAgICAgICAgICAgICBzcGFjZUJldHdlZW46IDE2XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNhcmRzLXNsaWRlcicpKSB7XHJcbiAgICAgICAgY29uc3QgY2FyZFNsaWRlciA9IG5ldyBTd2lwZXIoJy5jYXJkcy1zbGlkZXIgJywge1xyXG4gICAgICAgICAgICBwYWdpbmF0aW9uOiB7XHJcbiAgICAgICAgICAgICAgICBlbDogJy5jYXJkcy1zbGlkZXIgLnN3aXBlci1wYWdpbmF0aW9uJyxcclxuICAgICAgICAgICAgICAgIGNsaWNrYWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgbmF2aWdhdGlvbjoge1xyXG4gICAgICAgICAgICAgICAgbmV4dEVsOiBcIi5zd2lwZXItYnV0dG9uLW5leHRcIixcclxuICAgICAgICAgICAgICAgIHByZXZFbDogXCIuc3dpcGVyLWJ1dHRvbi1wcmV2XCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGJyZWFrcG9pbnRzOiB7XHJcbiAgICAgICAgICAgICAgICA1Nzc6IHtcclxuICAgICAgICAgICAgICAgICAgICBzbGlkZXNQZXJWaWV3OiAyLFxyXG4gICAgICAgICAgICAgICAgICAgIHNwYWNlQmV0d2VlbjogMTYsXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmdyZWVuLXNsaWRlcicpKSB7XHJcbiAgICAgICAgY29uc3QgZ3JlZW5TbGlkZXIgPSBuZXcgU3dpcGVyKCcuZ3JlZW4tc2xpZGVyJywge1xyXG4gICAgICAgICAgICBwYWdpbmF0aW9uOiB7XHJcbiAgICAgICAgICAgICAgICBlbDogJy5ncmVlbi1zbGlkZXIgLnN3aXBlci1wYWdpbmF0aW9uJyxcclxuICAgICAgICAgICAgICAgIGNsaWNrYWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgbmF2aWdhdGlvbjoge1xyXG4gICAgICAgICAgICAgICAgbmV4dEVsOiBcIi5zd2lwZXItYnV0dG9uLW5leHRcIixcclxuICAgICAgICAgICAgICAgIHByZXZFbDogXCIuc3dpcGVyLWJ1dHRvbi1wcmV2XCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNsaWRlci00LWNvbCcpKSB7XHJcbiAgICAgICAgY29uc3Qgc2xpZGVyNENvbCA9IG5ldyBTd2lwZXIoJy5zbGlkZXItNC1jb2wnLCB7XHJcbiAgICAgICAgICAgIHNsaWRlc1BlclZpZXc6IDEsXHJcbiAgICAgICAgICAgIHBhZ2luYXRpb246IHtcclxuICAgICAgICAgICAgICAgIGVsOiAnLnNsaWRlci00LWNvbCAuc3dpcGVyLXBhZ2luYXRpb24nLFxyXG4gICAgICAgICAgICAgICAgY2xpY2thYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBuYXZpZ2F0aW9uOiB7XHJcbiAgICAgICAgICAgICAgICBuZXh0RWw6IFwiLnNsaWRlci00LWNvbCAuc3dpcGVyLWJ1dHRvbi1uZXh0XCIsXHJcbiAgICAgICAgICAgICAgICBwcmV2RWw6IFwiLnNsaWRlci00LWNvbCAuc3dpcGVyLWJ1dHRvbi1wcmV2XCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGJyZWFrcG9pbnRzOiB7XHJcbiAgICAgICAgICAgICAgICA1Nzc6IHtcclxuICAgICAgICAgICAgICAgICAgICBzbGlkZXNQZXJWaWV3OiAyLFxyXG4gICAgICAgICAgICAgICAgICAgIHNwYWNlQmV0d2VlbjogMTZcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICA3Njc6IHtcclxuICAgICAgICAgICAgICAgICAgICBzbGlkZXNQZXJWaWV3OiAzLFxyXG4gICAgICAgICAgICAgICAgICAgIHNwYWNlQmV0d2VlbjogMTZcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICA5OTE6IHtcclxuICAgICAgICAgICAgICAgICAgICBzbGlkZXNQZXJWaWV3OiA0LFxyXG4gICAgICAgICAgICAgICAgICAgIHNwYWNlQmV0d2VlbjogMTZcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2xpZGVyLWdhbGxlcnkyJykpIHtcclxuICAgICAgICBjb25zdCBzbGlkZXJHYWxsZXJ5MiA9IG5ldyBTd2lwZXIoJy5zbGlkZXItZ2FsbGVyeTIgJywge1xyXG4gICAgICAgICAgICBzcGFjZUJldHdlZW46IDE2LFxyXG4gICAgICAgICAgICBuYXZpZ2F0aW9uOiB7XHJcbiAgICAgICAgICAgICAgICBuZXh0RWw6IFwiLnNsaWRlci1nYWxsZXJ5MiAuc3dpcGVyLWJ1dHRvbi1uZXh0XCIsXHJcbiAgICAgICAgICAgICAgICBwcmV2RWw6IFwiLnNsaWRlci1nYWxsZXJ5MiAuc3dpcGVyLWJ1dHRvbi1wcmV2XCIsXHJcbiAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGpRdWVyeSgnYm9keScpLm9uKCdjbGljaycsICcucHJvZHVjdC1mZWF0dXJlX190aHVtYicsIGZ1bmN0aW9uKCl7XHJcblxyXG4gICAgICAgIGpRdWVyeSh0aGlzKS5zaWJsaW5ncygnLnByb2R1Y3QtZmVhdHVyZV9fdGh1bWInKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAgICAgalF1ZXJ5KHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLmZpbmQoJy5wcm9kdWN0LWZlYXR1cmVfX2NvbnRlbnQgLnRhYi1jb250ZW50JykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG5cclxuICAgICAgICBqUXVlcnkodGhpcykuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xyXG5cclxuICAgICAgICBsZXQgdGFyZ2V0SWQgPSBqUXVlcnkodGhpcykuYXR0cignZGF0YVRhcmdldCcpO1xyXG4gICAgICAgIGpRdWVyeSh0YXJnZXRJZCkuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy9UQUJTXHJcbiAgICBjb25zdCB0YWJMaW5rcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy50YWJzX19uYXYtbGluaycpO1xyXG5cclxuICAgIGZ1bmN0aW9uIGZpbmRQYXJlbnQoZWwsIHBhcmVudENsYXNzTmFtZSkge1xyXG4gICAgICAgIGlmICghZWwpIHJldHVybiBkb2N1bWVudC5ib2R5O1xyXG4gICAgICAgIC8vIFN0YXJ0IGZyb20gdGhlIGN1cnJlbnQgZWxlbWVudFxyXG4gICAgICAgIGxldCBpZ25vcmVDbGlja091dHNpZGUgPSBlbC5jbGFzc0xpc3QuY29udGFpbnMocGFyZW50Q2xhc3NOYW1lKTtcclxuICAgICAgICBsZXQgcGFyZW50RWwgPSBlbC5wYXJlbnRFbGVtZW50O1xyXG5cclxuICAgICAgICAvLyBMb29wIHVudGlsIHdlIHJlYWNoIHRoZSB0b3Agb2YgdGhlIERPTVxyXG4gICAgICAgIHdoaWxlICghaWdub3JlQ2xpY2tPdXRzaWRlICYmIHBhcmVudEVsKSB7XHJcbiAgICAgICAgICAgIC8vIE1vdmUgdXAgdG8gdGhlIHBhcmVudCBlbGVtZW50XHJcbiAgICAgICAgICAgIGlnbm9yZUNsaWNrT3V0c2lkZSA9IHBhcmVudEVsLmNsYXNzTGlzdC5jb250YWlucyhwYXJlbnRDbGFzc05hbWUpO1xyXG4gICAgICAgICAgICBpZiAoIWlnbm9yZUNsaWNrT3V0c2lkZSkge1xyXG4gICAgICAgICAgICAgICAgcGFyZW50RWwgPSBwYXJlbnRFbC5wYXJlbnRFbGVtZW50O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gcGFyZW50RWw7XHJcbiAgICB9XHJcblxyXG4gICAgdGFiTGlua3MuZm9yRWFjaChsaW5rID0+IHtcclxuICAgICAgICBsaW5rLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcclxuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICBjb25zdCBwYXJlbnQgPSBmaW5kUGFyZW50KGUudGFyZ2V0LCAndGFicycpO1xyXG5cclxuICAgICAgICAgICAgY29uc3QgdGFiTGlua3MgPSBwYXJlbnQucXVlcnlTZWxlY3RvckFsbCgnLnRhYnNfX25hdi1saW5rJyk7XHJcbiAgICAgICAgICAgIGNvbnN0IHRhYkNvbnRlbnRzID0gcGFyZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy50YWItY29udGVudCcpO1xyXG5cclxuICAgICAgICAgICAgdGFiTGlua3MuZm9yRWFjaChsaW5rID0+IGxpbmsuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJykpO1xyXG4gICAgICAgICAgICB0YWJDb250ZW50cy5mb3JFYWNoKGNvbnRlbnQgPT4gY29udGVudC5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKSk7XHJcbiAgICAgICAgICAgIGxpbmsuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XHJcblxyXG4gICAgICAgICAgICBjb25zdCB0YXJnZXRJZCA9IGxpbmsuZ2V0QXR0cmlidXRlKCdkYXRhVGFyZ2V0Jykuc3Vic3RyaW5nKDEpO1xyXG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0YXJnZXRJZCkuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICAvL0JMT0NLIEZFQVRVUkUgUFJPRFVDVFxyXG5jb25zdCAgdGh1bWJOYXZCbG9jayA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5wcm9kdWN0LWZlYXR1cmVfX25hdicpO1xyXG4gICAgY29uc3QgdGFiVGh1bWJOYXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucHJvZHVjdC1mZWF0dXJlX190aHVtYicpO1xyXG5cclxuICAgIHRhYlRodW1iTmF2LmZvckVhY2gobGluayA9PiB7XHJcbiAgICAgaWYod2luZG93LmlubmVyV2lkdGggPjc2NykgICB7XHJcbiAgICAgICAgICAgIGxpbmsuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgcGFyZW50ID0gZmluZFBhcmVudChlLnRhcmdldCwgJ3Byb2R1Y3QtZmVhdHVyZScpO1xyXG5cclxuICAgICAgICAgICAgICAgIGNvbnN0IHRhYlRodW1iTmF2ID0gcGFyZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5wcm9kdWN0LWZlYXR1cmVfX3RodW1iJyk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB0YWJDb250ZW50cyA9IHBhcmVudC5xdWVyeVNlbGVjdG9yQWxsKCcuZmVhdHVyZS1jb250ZW50Jyk7XHJcblxyXG4gICAgICAgICAgICAgICAgdGFiVGh1bWJOYXYuZm9yRWFjaChsaW5rID0+IGxpbmsuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJykpO1xyXG4gICAgICAgICAgICAgICAgdGFiQ29udGVudHMuZm9yRWFjaChjb250ZW50ID0+IGNvbnRlbnQuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJykpO1xyXG4gICAgICAgICAgICAgICAgbGluay5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcclxuXHJcbiAgICAgICAgICAgICAgICBjb25zdCB0YXJnZXRJZCA9IGxpbmsuZ2V0QXR0cmlidXRlKCdkYXRhVGFyZ2V0Jykuc3Vic3RyaW5nKDEpO1xyXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGFyZ2V0SWQpLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICBpZiAodGh1bWJOYXZCbG9jaykge1xyXG4gICAgICAgICAgICAgdGh1bWJOYXZCbG9jay5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICAgICB9XHJcblxyXG4gICAgICAgICAvLyBjb25zdCB0YXJnZXRJZCA9IGxpbmsuZ2V0QXR0cmlidXRlKCdkYXRhLXRhcmdldCcpLnJlcGxhY2UoJyMnLCAnJyk7XHJcbiAgICAgICAgIC8vIGNvbnN0IHRhcmdldEVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0YXJnZXRJZCk7XHJcblxyXG4gICAgICAgICAvLyBpZiAodGFyZ2V0RWxlbWVudCkge1xyXG4gICAgICAgICAvL1xyXG4gICAgICAgICAvLyAgICAgY29uc3QgbW9iaWxlVGh1bWIgPSB0YXJnZXRFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcm9kdWN0LWZlYXR1cmVfX3RodW1iLW1vYiBpbWcnKTtcclxuICAgICAgICAgLy8gICAgIGlmIChtb2JpbGVUaHVtYikge1xyXG4gICAgICAgICAvLyAgICAgICAgIG1vYmlsZVRodW1iLnNyYyA9IGxpbmsuZ2V0QXR0cmlidXRlKCdkYXRhLXNyYycpO1xyXG4gICAgICAgICAvLyAgICAgfVxyXG4gICAgICAgICAvLyB9XHJcbiAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHJcbi8vIFBPUFVQXHJcbi8vICAgICBjb25zdCBwb3B1cENvbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnBvcHVwX2NvbnRhY3RzXCIpO1xyXG4vLyAgICAgY29uc3QgYnRuQ2FsbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYnRuX2NhbGxcIik7XHJcbi8vICAgICBjb25zdCBjb250YWN0c0Nsb3NlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBvcHVwX2Nsb3NlJyk7XHJcbi8vICAgICBjb25zdCBiYWNrZHJvcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5iYWNrZHJvcCcpO1xyXG4vL1xyXG4vLyAgICAgYnRuQ2FsbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuLy8gICAgICAgICBwb3B1cENvbnQuY2xhc3NMaXN0LmFkZCgnb3Blbl9tb2RhbCcpO1xyXG4vLyAgICAgICAgIGJhY2tkcm9wLmNsYXNzTGlzdC50b2dnbGUoJ2VsLXZpc2libGUnKTtcclxuLy8gICAgIH0pO1xyXG4vL1xyXG4vLyAgICAgY29uc3QgY2xvc2VQb3B1cCA9ICgpID0+IHtcclxuLy8gICAgICAgICBwb3B1cENvbnQuY2xhc3NMaXN0LnJlbW92ZSgnb3Blbl9tb2RhbCcpO1xyXG4vLyAgICAgICAgIGJhY2tkcm9wLmNsYXNzTGlzdC5yZW1vdmUoJ2VsLXZpc2libGUnKTtcclxuLy8gICAgICAgICBpZiAod2luZG93LmNsZWFyQ29udGFjdEZvcm0pIHtcclxuLy8gICAgICAgICAgICAgd2luZG93LmNsZWFyQ29udGFjdEZvcm0oKTtcclxuLy8gICAgICAgICB9XHJcbi8vICAgICB9XHJcbi8vXHJcbi8vICAgICBjb250YWN0c0Nsb3NlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY2xvc2VQb3B1cCk7XHJcbi8vICAgICBiYWNrZHJvcC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNsb3NlUG9wdXApO1xyXG4vL1xyXG4vLyAgICAgY29uc3QgcG9wdXBMb2MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnBvcHVwX2xvY2F0aW9uXCIpO1xyXG4vLyAgICAgY29uc3QgdHJpZ2dlclBvcHVwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50cmlnZ2VyLXBvcHVwXCIpO1xyXG4vLyAgICAgY29uc3QgbG9jQ2xvc2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucG9wdXBfY2xvc2UnKTtcclxuLy8gICAgIGNvbnN0IGJhY2tkcm9wTCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5iYWNrZHJvcCcpO1xyXG4vL1xyXG4vLyAgICAgdHJpZ2dlclBvcHVwLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4vLyAgICAgICAgIHBvcHVwTG9jLmNsYXNzTGlzdC5hZGQoJ29wZW5fbW9kYWwnKTtcclxuLy8gICAgICAgICBiYWNrZHJvcEwuY2xhc3NMaXN0LnRvZ2dsZSgnZWwtdmlzaWJsZScpO1xyXG4vLyAgICAgfSk7XHJcbi8vXHJcbi8vICAgICBjb25zdCBjbG9zZUxvY1BvcHVwID0gKCkgPT4ge1xyXG4vLyAgICAgICAgIHBvcHVwTG9jLmNsYXNzTGlzdC5yZW1vdmUoJ29wZW5fbW9kYWwnKTtcclxuLy8gICAgICAgICBiYWNrZHJvcEwuY2xhc3NMaXN0LnJlbW92ZSgnZWwtdmlzaWJsZScpO1xyXG4vLyAgICAgfVxyXG4vL1xyXG4vLyAgICAgcG9wdXBMb2MuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjbG9zZUxvY1BvcHVwKTtcclxuLy8gICAgIGJhY2tkcm9wTC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNsb3NlTG9jUG9wdXApO1xyXG4gICAgY29uc3QgaW5pdFBvcHVwID0gKHBvcHVwU2VsZWN0b3IsIHRyaWdnZXJTZWxlY3RvciwgYmFja2Ryb3BTZWxlY3RvcikgPT4ge1xyXG4gICAgICAgIGNvbnN0IHBvcHVwID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcihwb3B1cFNlbGVjdG9yKTtcclxuICAgICAgICBjb25zdCB0cmlnZ2VyID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0cmlnZ2VyU2VsZWN0b3IpO1xyXG4gICAgICAgIGNvbnN0IGJhY2tkcm9wID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJhY2tkcm9wJyk7XHJcbiAgICAgICAgY29uc3QgY2xvc2VCdXR0b24gPSBwb3B1cC5xdWVyeVNlbGVjdG9yKCcucG9wdXBfY2xvc2UnKTtcclxuXHJcbiAgICAgICAgaWYgKCFwb3B1cCB8fCAhdHJpZ2dlciB8fCAhYmFja2Ryb3AgfHwgIWNsb3NlQnV0dG9uKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihcItCe0LTQuNC9INC3INC10LvQtdC80LXQvdGC0ZbQsiDQvdC1INC30L3QsNC50LTQtdC90L5cIiwgcG9wdXBTZWxlY3RvciwgdHJpZ2dlclNlbGVjdG9yLCBiYWNrZHJvcFNlbGVjdG9yKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBvcGVuUG9wdXAgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIHBvcHVwLmNsYXNzTGlzdC5hZGQoJ29wZW5fbW9kYWwnKTtcclxuICAgICAgICAgICAgYmFja2Ryb3AuY2xhc3NMaXN0LmFkZCgnZWwtdmlzaWJsZScpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGNvbnN0IGNsb3NlUG9wdXAgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIHBvcHVwLmNsYXNzTGlzdC5yZW1vdmUoJ29wZW5fbW9kYWwnKTtcclxuICAgICAgICAgICAgYmFja2Ryb3AuY2xhc3NMaXN0LnJlbW92ZSgnZWwtdmlzaWJsZScpO1xyXG4gICAgICAgICAgICBpZiAod2luZG93LmNsZWFyQ29udGFjdEZvcm0pIHtcclxuICAgICAgICAgICAgICAgIHdpbmRvdy5jbGVhckNvbnRhY3RGb3JtKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIHRyaWdnZXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBvcGVuUG9wdXApO1xyXG4gICAgICAgIGNsb3NlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY2xvc2VQb3B1cCk7XHJcbiAgICAgICAgYmFja2Ryb3AuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjbG9zZVBvcHVwKTtcclxuICAgIH07XHJcblxyXG4gICAgaW5pdFBvcHVwKCcucG9wdXBfY29udGFjdHMnLCAnLmJ0bl9jYWxsJywgJy5iYWNrZHJvcCcpO1xyXG4gICAgaW5pdFBvcHVwKCcucG9wdXBfbG9jYXRpb24nLCAnLnRyaWdnZXItcG9wdXAnLCAnLmJhY2tkcm9wJyk7XHJcblxyXG4vLyAgICBNVUxUSSBTVEVQIEZPUk1cclxuICAgIGNvbnN0IG1zRm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tdWx0aS1zdGVwLWZvcm0nKTtcclxuXHJcbiAgICBpZiAobXNGb3JtKSB7XHJcbiAgICAgICAgbGV0IGFjdGl2ZUluZGV4ID0gMDtcclxuICAgICAgICBjb25zdCBzdGVwc0NpcmNsZSA9IG1zRm9ybS5xdWVyeVNlbGVjdG9yQWxsKCcucHJvZ3Jlc3Mtc3RlcCcpO1xyXG4gICAgICAgIGNvbnN0IHN0ZXBDb250ZW50ID0gbXNGb3JtLnF1ZXJ5U2VsZWN0b3JBbGwoJy5mb3JtX19zdGVwJyk7XHJcblxyXG4gICAgICAgIGNvbnN0IGJ0bnNOZXh0ID0gbXNGb3JtLnF1ZXJ5U2VsZWN0b3JBbGwoJy5idG5fbmV4dCcpO1xyXG4gICAgICAgIGNvbnN0IHByZXZCdG5zID0gbXNGb3JtLnF1ZXJ5U2VsZWN0b3JBbGwoJy5mb3JtX19uYXYtbGluaycpO1xyXG5cclxuICAgICAgICBjb25zdCB0aFlvdVBhZ2UgPSBtc0Zvcm0ucXVlcnlTZWxlY3RvcignLnRoYW5rcy15b3UtcGFnZScpO1xyXG5cclxuICAgICAgICBzdGVwc0NpcmNsZVthY3RpdmVJbmRleF0uY2xhc3NMaXN0LmFkZCgncHJvZ3Jlc3Mtc3RlcF9hY3RpdmUnKTtcclxuICAgICAgICBzdGVwQ29udGVudFthY3RpdmVJbmRleF0uY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XHJcbiAgICAgICAgcHJldkJ0bnNbYWN0aXZlSW5kZXhdLmNsYXNzTGlzdC5hZGQoJ3Nob3cnKTtcclxuXHJcbiAgICAgICAgY29uc3QgZ29Ub1N0ZXAgPSAoYWN0aXZlSW5kZXgpID0+IHtcclxuICAgICAgICAgICAgc3RlcENvbnRlbnQuZm9yRWFjaChlbCA9PiBlbC5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKSlcclxuXHJcbiAgICAgICAgICAgIHN0ZXBzQ2lyY2xlLmZvckVhY2goKGVsLCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGluZGV4ID4gYWN0aXZlSW5kZXgpIHtcclxuICAgICAgICAgICAgICAgICAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKCdwcm9ncmVzcy1zdGVwX2FjdGl2ZScpXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGVsLmNsYXNzTGlzdC5hZGQoJ3Byb2dyZXNzLXN0ZXBfYWN0aXZlJylcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgIHByZXZCdG5zLmZvckVhY2goKGVsLCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGluZGV4ID4gYWN0aXZlSW5kZXgpIHtcclxuICAgICAgICAgICAgICAgICAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKCdzaG93Jyk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGVsLmNsYXNzTGlzdC5hZGQoJ3Nob3cnKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGFjdGl2ZUNvbnRlbnQgPSBzdGVwQ29udGVudFthY3RpdmVJbmRleF07XHJcbiAgICAgICAgICAgIGlmIChhY3RpdmVDb250ZW50KSB7XHJcbiAgICAgICAgICAgICAgICBhY3RpdmVDb250ZW50LmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHdpbmRvdy5jbGVhckNvbnRhY3RGb3JtID0gKCkgPT4ge1xyXG4gICAgICAgICAgICBtc0Zvcm0ucmVzZXQoKTtcclxuICAgICAgICAgICAgYWN0aXZlSW5kZXggPSAwO1xyXG4gICAgICAgICAgICBnb1RvU3RlcChhY3RpdmVJbmRleCk7XHJcbiAgICAgICAgICAgIHRoWW91UGFnZS5jbGFzc0xpc3QucmVtb3ZlKCdzaG93Jyk7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgYnRuc05leHQuZm9yRWFjaChidG4gPT4gYnRuLmFkZEV2ZW50TGlzdGVuZXIoXHJcbiAgICAgICAgICAgICdjbGljaycsIChlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBhY3RpdmVJbmRleCA9IGFjdGl2ZUluZGV4ICsgMTtcclxuICAgICAgICAgICAgICAgIGlmIChhY3RpdmVJbmRleCA8IHN0ZXBDb250ZW50Lmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGdvVG9TdGVwKGFjdGl2ZUluZGV4KTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoZS50YXJnZXQudHlwZSA9PT0gJ3N1Ym1pdCcpIHtcclxuICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRoWW91UGFnZS5jbGFzc0xpc3QuYWRkKCdzaG93Jyk7XHJcbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsb3NlUG9wdXAoKTtcclxuICAgICAgICAgICAgICAgICAgICB9LCAzMDAwKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgKSk7XHJcblxyXG4gICAgICAgIHByZXZCdG5zLmZvckVhY2goYnRuID0+IGJ0bi5hZGRFdmVudExpc3RlbmVyKFxyXG4gICAgICAgICAgICAnY2xpY2snLCAoZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgYWN0aXZlSW5kZXggPSBBcnJheS5mcm9tKHByZXZCdG5zKS5maW5kSW5kZXgoZWwgPT4gZWwgPT09IGUudGFyZ2V0KTtcclxuXHJcbiAgICAgICAgICAgICAgICBnb1RvU3RlcChhY3RpdmVJbmRleCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICApKTtcclxuXHJcbiAgICAgICAgbXNGb3JtLnF1ZXJ5U2VsZWN0b3JBbGwoJy5qcy1mb3JtLWZpZWxkJykuZm9yRWFjaChlbCA9PiB7XHJcbiAgICAgICAgICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgKGUpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGFjdGl2ZVNldENvbnRyb2xzID0gc3RlcENvbnRlbnRbYWN0aXZlSW5kZXhdLnF1ZXJ5U2VsZWN0b3JBbGwoJy5qcy1mb3JtLWZpZWxkJyk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBzdWJtaXRCdG4gPSBzdGVwQ29udGVudFthY3RpdmVJbmRleF0ucXVlcnlTZWxlY3RvcignLmJ0bl9uZXh0Jyk7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IGRpc2FibGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGlmIChhY3RpdmVJbmRleCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkID0gQXJyYXkuZnJvbShhY3RpdmVTZXRDb250cm9scykuZmlsdGVyKGVsID0+IGVsLmhhc0F0dHJpYnV0ZSgncmVxdWlyZWQnKSkuc29tZShlbCA9PiBlbC52YWx1ZSA9PT0gJycpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChhY3RpdmVJbmRleCA9PT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkID0gIUFycmF5LmZyb20oc3RlcENvbnRlbnRbYWN0aXZlSW5kZXhdLnF1ZXJ5U2VsZWN0b3JBbGwoJ1t0eXBlPVwiY2hlY2tib3hcIl0nKSkuc29tZShlbCA9PiBlbC5jaGVja2VkKVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChhY3RpdmVJbmRleCA9PT0gMikge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG90aGVyQ2l0eSA9IG1zRm9ybS5xdWVyeVNlbGVjdG9yKCdbbmFtZT1cIm90aGVyX2NpdHlcIl0nKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAob3RoZXJDaXR5ID09PSBlLnRhcmdldCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdGVwQ29udGVudFthY3RpdmVJbmRleF0ucXVlcnlTZWxlY3RvckFsbCgnW3R5cGU9XCJyYWRpb1wiXScpLmZvckVhY2goZWwgPT4gZWwuY2hlY2tlZCA9IGZhbHNlKVxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG90aGVyQ2l0eS52YWx1ZSA9ICcnO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQgPSAhQXJyYXkuZnJvbShzdGVwQ29udGVudFthY3RpdmVJbmRleF0ucXVlcnlTZWxlY3RvckFsbCgnW3R5cGU9XCJyYWRpb1wiXScpKS5zb21lKGVsID0+IGVsLmNoZWNrZWQpICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG90aGVyQ2l0eS52YWx1ZSA9PT0gJyc7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKG1zRm9ybS5xdWVyeVNlbGVjdG9yKCdbbmFtZT1cIm90aGVyX2NpdHlcIl0nKSlcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBzdWJtaXRCdG4uZGlzYWJsZWQgPSBkaXNhYmxlZFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGJ0bkNsb3NUaGFua3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYnRuX2Nsb3NlLXRoYW5rcycpO1xyXG5cclxuICAgIGJ0bkNsb3NUaGFua3MuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBvcHVwX2NvbnRhY3RzJykuY2xhc3NMaXN0LnJlbW92ZSgnb3Blbl9tb2RhbCcpO1xyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5iYWNrZHJvcCcpLmNsYXNzTGlzdC5yZW1vdmUoJ2VsLXZpc2libGUnKTtcclxuICAgIH0pO1xyXG4vLyAgICBTSURFQkFSIEhPVkVSIE9WRVJMQVlcclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5zaWRlYmFyX19uYXYgLmRyb3Bkb3duJykuZm9yRWFjaChmdW5jdGlvbiAoZWxlbWVudCkge1xyXG4gICAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VlbnRlcicsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNpZGViYXJfX292ZXJsYXknKS5jbGFzc0xpc3QuYWRkKCdzaG93Jyk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VsZWF2ZScsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNpZGViYXJfX292ZXJsYXknKS5jbGFzc0xpc3QucmVtb3ZlKCdzaG93Jyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcjYWNjb3JkaW9uIC5wYW5lbF9faGVhZGluZycpLmZvckVhY2goKGhlYWRpbmcpID0+IHtcclxuICAgICAgICBoZWFkaW5nLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBjb25zdCBpc09wZW4gPSB0aGlzLmNsYXNzTGlzdC5jb250YWlucygnb3BlbicpO1xyXG4gICAgICAgICAgICBjb25zdCBhbGxQYW5lbHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcjYWNjb3JkaW9uIC5wYW5lbF9faGVhZGluZycpO1xyXG4gICAgICAgICAgICBjb25zdCBhbGxDb250ZW50cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5wYW5lbC1jb2xsYXBzZScpO1xyXG5cclxuICAgICAgICAgICAgYWxsUGFuZWxzLmZvckVhY2gocGFuZWwgPT4gcGFuZWwuY2xhc3NMaXN0LnJlbW92ZSgnb3BlbicpKTtcclxuICAgICAgICAgICAgYWxsQ29udGVudHMuZm9yRWFjaChjb250ZW50ID0+IGNvbnRlbnQuc3R5bGUubWF4SGVpZ2h0ID0gbnVsbCk7XHJcblxyXG4gICAgICAgICAgICBpZiAoIWlzT3Blbikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jbGFzc0xpc3QuYWRkKCdvcGVuJyk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBwYW5lbENvbnRlbnQgPSB0aGlzLm5leHRFbGVtZW50U2libGluZztcclxuICAgICAgICAgICAgICAgIHBhbmVsQ29udGVudC5zdHlsZS5tYXhIZWlnaHQgPSBwYW5lbENvbnRlbnQuc2Nyb2xsSGVpZ2h0ICsgJ3B4JztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgICAvL1RBQkxFIENPTExBUFNFIFJPV1xyXG4gICAgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50ZWNoLWNoYXJhY3RfX3JvdycpKSB7XHJcbiAgICAgICAgY29uc3QgbWF4VmlzaWJsZVJvd3MgPSA1O1xyXG4gICAgICAgIGNvbnN0IHJvd3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudGVjaC1jaGFyYWN0X19yb3cnKTtcclxuICAgICAgICBjb25zdCBzaG93TW9yZUJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5idG5fbW9yZScpO1xyXG5cclxuICAgICAgICBpZiAocm93cy5sZW5ndGggPiBtYXhWaXNpYmxlUm93cykge1xyXG4gICAgICAgICAgICBzaG93TW9yZUJ0bi5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcclxuXHJcbiAgICAgICAgICAgIHJvd3MuZm9yRWFjaCgocm93LCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGluZGV4ID49IG1heFZpc2libGVSb3dzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcm93LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBzaG93TW9yZUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHJvd3MuZm9yRWFjaChyb3cgPT4gcm93LnN0eWxlLmRpc3BsYXkgPSAnJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgc2hvd01vcmVCdG4uc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxufSk7XHJcblxyXG4iXSwiZmlsZSI6Im1haW4uanMifQ==
