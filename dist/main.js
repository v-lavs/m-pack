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
                nextEl: ".slider-gallery2 .swiper-button-next",
                prevEl: ".slider-gallery2 .swiper-button-prev",
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
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },

        });
    }
    window.addEventListener('load', function () {
        if (document.querySelector('.gallery')) {
            baguetteBox.run('.gallery', {});
        }
        if (document.querySelector('.gallery2')) {

            baguetteBox.run('.gallery2', {});
        }
    });
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


// POPUP
    const popupCont = document.querySelector(".popup_contacts");
    const btnCall = document.querySelector(".btn_call");
    const contactsClose = document.querySelector('.popup_contacts .popup_close');
    const backdrop = document.querySelector('.backdrop');

    btnCall.addEventListener('click', () => {
        popupCont.classList.add('open_modal');
        backdrop.classList.toggle('el-visible');
    });

    const closePopup = () => {
        popupCont.classList.remove('open_modal');
        backdrop.classList.remove('el-visible');
        if (window.clearContactForm) {
            window.clearContactForm();
        }
    }

    contactsClose.addEventListener('click', closePopup);
    backdrop.addEventListener('click', closePopup);


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

});


//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJtYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qXHJcbiogdG8gaW5jbHVkZSBqcyBmaWxlIHdyaXRlOiBgLy89IGluY2x1ZGUgLi9wYXRoLXRvLWZpbGVgXHJcbiogKi9cclxuXHJcbi8vIENVU1RPTSBTQ1JJUFRTXHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmdW5jdGlvbiAoKSB7XHJcblxyXG4vLyBTQ1JPTEwgVE8gQU5DSE9SXHJcbiAgICBmdW5jdGlvbiBzbW9vdGhTY3JvbGxUb0FuY2hvcihzZWxlY3RvciwgaGVhZGVyU2VsZWN0b3IsIGhlYWRlclBhZ2VTZWxlY3Rvcikge1xyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpLmZvckVhY2goKGVsZW1lbnQpID0+IHtcclxuICAgICAgICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgYW5jaG9yID0gdGhpcy5nZXRBdHRyaWJ1dGUoJ2hyZWYnKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoYW5jaG9yLnN0YXJ0c1dpdGgoJyMnKSAmJiBhbmNob3IgIT09ICcjJykge1xyXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coYW5jaG9yKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCB0YXJnZXRFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihhbmNob3IpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGhlYWRlckVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGhlYWRlclNlbGVjdG9yKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBoZWFkZXJQYWdlRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoaGVhZGVyUGFnZVNlbGVjdG9yKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBoZWFkZXJIZWlnaHQgPSBoZWFkZXJFbGVtZW50ID8gaGVhZGVyRWxlbWVudC5vZmZzZXRIZWlnaHQgOiAwO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGhlYWRlclBhZ2VIZWlnaHQgPSBoZWFkZXJQYWdlRWxlbWVudCA/IGhlYWRlclBhZ2VFbGVtZW50Lm9mZnNldEhlaWdodCA6IDA7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0YXJnZXRFbGVtZW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uIGdldEVsZW1lbnRPZmZzZXRUb3AoZWxlbWVudCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVjdCA9IGVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBzY3JvbGxUb3AgPSB3aW5kb3cucGFnZVlPZmZzZXQgfHwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZWN0LnRvcCArIHNjcm9sbFRvcDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB0YXJnZXRQb3NpdGlvbiA9IGdldEVsZW1lbnRPZmZzZXRUb3AodGFyZ2V0RWxlbWVudCkgLSBoZWFkZXJIZWlnaHQgLSBoZWFkZXJQYWdlSGVpZ2h0O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93LnNjcm9sbFRvKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvcDogdGFyZ2V0UG9zaXRpb24sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBiZWhhdmlvcjogJ3Ntb290aCdcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBzbW9vdGhTY3JvbGxUb0FuY2hvcignLnNjcm9sbC10by1hbmNob3IgYScsICcuaGVhZGVyJywgJy5wYWdlX19oZWFkZXInKTtcclxuXHJcblxyXG4vLyBNT0JJTEUgTUVOVVxyXG4gICAgY29uc3Qgc2lkZWJhciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zaWRlYmFyJyk7XHJcbiAgICBjb25zdCBoZWFkZXJTYk9wID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhlYWRlcicpO1xyXG4gICAgY29uc3QgYnRuQnVyZ2VyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJ0bi1idXJnZXInKTtcclxuICAgIGNvbnN0IG1lbnVMaW5rcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5zaWRlYmFyIC5tZW51X19saW5rJyk7XHJcbiAgICBjb25zdCBvdmVybGF5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNpZGViYXJfX292ZXJsYXknKTtcclxuICAgIGNvbnN0IGJ0bkNhbGxTYiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5idG5fY2FsbCcpO1xyXG5cclxuICAgIGJ0bkJ1cmdlci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIHNpZGViYXIuY2xhc3NMaXN0LnRvZ2dsZSgnb3BlbicpO1xyXG4gICAgICAgIGhlYWRlclNiT3AuY2xhc3NMaXN0LnRvZ2dsZSgnb3BlbicpO1xyXG4gICAgICAgIG92ZXJsYXkuY2xhc3NMaXN0LnRvZ2dsZSgnZWwtdmlzaWJsZScpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgbWVudUxpbmtzLmZvckVhY2goZnVuY3Rpb24gKGxpbmspIHtcclxuICAgICAgICBsaW5rLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBzaWRlYmFyLmNsYXNzTGlzdC5yZW1vdmUoJ29wZW4nKTtcclxuICAgICAgICAgICAgb3ZlcmxheS5jbGFzc0xpc3QucmVtb3ZlKCdlbC12aXNpYmxlJyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBvdmVybGF5LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHNpZGViYXIuY2xhc3NMaXN0LnJlbW92ZSgnb3BlbicpO1xyXG4gICAgICAgIG92ZXJsYXkuY2xhc3NMaXN0LnJlbW92ZSgnZWwtdmlzaWJsZScpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgYnRuQ2FsbFNiLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHNpZGViYXIuY2xhc3NMaXN0LnJlbW92ZSgnb3BlbicpO1xyXG4gICAgICAgIG92ZXJsYXkuY2xhc3NMaXN0LnJlbW92ZSgnZWwtdmlzaWJsZScpO1xyXG4gICAgfSk7XHJcblxyXG4vL1NUSUNLWSBIRUFERVIgUEFHRVxyXG5cclxuICAgIGNvbnN0IHN0aWNreUVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucGFnZV9faGVhZGVyJyk7XHJcbiAgICBsZXQgc3RpY2t5T2Zmc2V0ID0gMDtcclxuXHJcbiAgICBmdW5jdGlvbiB1cGRhdGVTdGlja3lCYW5uZXJPZmZzZXQoKSB7XHJcbiAgICAgICAgY29uc3QgcGFnZUJhbm5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zZWN0aW9uLWJhbm5lcicpO1xyXG5cclxuICAgICAgICBpZiAocGFnZUJhbm5lcikge1xyXG4gICAgICAgICAgICBjb25zdCBiYW5uZXJIID0gcGFnZUJhbm5lci5vZmZzZXRIZWlnaHQ7XHJcbiAgICAgICAgICAgIGNvbnN0IHN0aWNreUggPSBzdGlja3lFbGVtZW50Lm9mZnNldEhlaWdodDtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IG1vYmlsZU9mZnNldCA9IHdpbmRvdy5pbm5lcldpZHRoIDw9IDk5MSA/IDgwIDogMDtcclxuXHJcbiAgICAgICAgICAgIHN0aWNreU9mZnNldCA9IGJhbm5lckggLSBzdGlja3lIIC0gbW9iaWxlT2Zmc2V0O1xyXG5cclxuICAgICAgICAgICAgaWYgKHdpbmRvdy5wYWdlWU9mZnNldCA+PSBzdGlja3lPZmZzZXQpIHtcclxuICAgICAgICAgICAgICAgIHN0aWNreUVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnc3RpY2t5Jyk7XHJcbiAgICAgICAgICAgICAgICBzdGlja3lPZmZzZXQgPSBzdGlja3lFbGVtZW50Lm9mZnNldFRvcDtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHN0aWNreUVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgnc3RpY2t5Jyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIHVwZGF0ZVN0aWNreUJhbm5lck9mZnNldCk7XHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIHVwZGF0ZVN0aWNreUJhbm5lck9mZnNldCk7XHJcblxyXG4gICAgY29uc3QgYmFubmVyVGh1bWIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNlY3Rpb24tYmFubmVyX190aHVtYlwiKTtcclxuICAgIGNvbnN0IGJhbm5lclRpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBhZ2UtdGl0bGUnKTtcclxuXHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInNjcm9sbFwiLCAoKSA9PiB7XHJcbiAgICAgICAgdXBkYXRlU3RpY2t5QmFubmVyT2Zmc2V0KClcclxuXHJcbiAgICAgICAgaWYgKGJhbm5lclRodW1iICYmIGJhbm5lclRpdGxlKSB7XHJcbiAgICAgICAgICAgIGlmICh3aW5kb3cuc2Nyb2xsWSA+IDApIHtcclxuICAgICAgICAgICAgICAgIGJhbm5lclRodW1iLmNsYXNzTGlzdC5hZGQoXCJoaWRlLXRodW1iXCIpO1xyXG4gICAgICAgICAgICAgICAgYmFubmVyVGl0bGUuY2xhc3NMaXN0LmFkZChcInNtYWxsLXRpdGxlXCIpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgYmFubmVyVGh1bWIuY2xhc3NMaXN0LnJlbW92ZShcImhpZGUtdGh1bWJcIik7XHJcbiAgICAgICAgICAgICAgICBiYW5uZXJUaXRsZS5jbGFzc0xpc3QucmVtb3ZlKFwic21hbGwtdGl0bGVcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBzdGlja3lPZmZzZXQgLSA4MFxyXG4vL1NMSURFUlxyXG5cclxuICAgIGNvbnN0IHN3aXBlckluZm8gPSBuZXcgU3dpcGVyKCcuc3dpcGVyLWluZm8nLCB7XHJcbiAgICAgICAgcGFnaW5hdGlvbjoge1xyXG4gICAgICAgICAgICBlbDogJy5zd2lwZXItaW5mbyAuc3dpcGVyLXBhZ2luYXRpb24nLFxyXG4gICAgICAgICAgICBjbGlja2FibGU6IHRydWUsXHJcbiAgICAgICAgICAgIGR5bmFtaWNCdWxsZXRzOiB0cnVlLFxyXG4gICAgICAgIH0sXHJcbiAgICB9KTtcclxuXHJcbiAgICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByb2R1Y3Qtc2xpZGVyJykpIHtcclxuICAgICAgICBjb25zdCBwcm9kdWN0U2xpZGVyID0gbmV3IFN3aXBlcignLnByb2R1Y3Qtc2xpZGVyICcsIHtcclxuICAgICAgICAgICAgcGFnaW5hdGlvbjoge1xyXG4gICAgICAgICAgICAgICAgZWw6ICcucHJvZHVjdC1zbGlkZXIgLnN3aXBlci1wYWdpbmF0aW9uJyxcclxuICAgICAgICAgICAgICAgIGNsaWNrYWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgbmF2aWdhdGlvbjoge1xyXG4gICAgICAgICAgICAgICAgbmV4dEVsOiBcIi5zd2lwZXItYnV0dG9uLW5leHRcIixcclxuICAgICAgICAgICAgICAgIHByZXZFbDogXCIuc3dpcGVyLWJ1dHRvbi1wcmV2XCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGJyZWFrcG9pbnRzOiB7XHJcbiAgICAgICAgICAgICAgICA1Nzc6IHtcclxuICAgICAgICAgICAgICAgICAgICBzbGlkZXNQZXJWaWV3OiAyLFxyXG4gICAgICAgICAgICAgICAgICAgIHNwYWNlQmV0d2VlbjogMTZcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY2FyZHMtc2xpZGVyJykpIHtcclxuICAgICAgICBjb25zdCBjYXJkU2xpZGVyID0gbmV3IFN3aXBlcignLmNhcmRzLXNsaWRlciAnLCB7XHJcbiAgICAgICAgICAgIHBhZ2luYXRpb246IHtcclxuICAgICAgICAgICAgICAgIGVsOiAnLmNhcmRzLXNsaWRlciAuc3dpcGVyLXBhZ2luYXRpb24nLFxyXG4gICAgICAgICAgICAgICAgY2xpY2thYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBuYXZpZ2F0aW9uOiB7XHJcbiAgICAgICAgICAgICAgICBuZXh0RWw6IFwiLnN3aXBlci1idXR0b24tbmV4dFwiLFxyXG4gICAgICAgICAgICAgICAgcHJldkVsOiBcIi5zd2lwZXItYnV0dG9uLXByZXZcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgYnJlYWtwb2ludHM6IHtcclxuICAgICAgICAgICAgICAgIDU3Nzoge1xyXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1BlclZpZXc6IDIsXHJcbiAgICAgICAgICAgICAgICAgICAgc3BhY2VCZXR3ZWVuOiAxNixcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZ3JlZW4tc2xpZGVyJykpIHtcclxuICAgICAgICBjb25zdCBncmVlblNsaWRlciA9IG5ldyBTd2lwZXIoJy5ncmVlbi1zbGlkZXInLCB7XHJcbiAgICAgICAgICAgIHBhZ2luYXRpb246IHtcclxuICAgICAgICAgICAgICAgIGVsOiAnLmdyZWVuLXNsaWRlciAuc3dpcGVyLXBhZ2luYXRpb24nLFxyXG4gICAgICAgICAgICAgICAgY2xpY2thYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBuYXZpZ2F0aW9uOiB7XHJcbiAgICAgICAgICAgICAgICBuZXh0RWw6IFwiLnN3aXBlci1idXR0b24tbmV4dFwiLFxyXG4gICAgICAgICAgICAgICAgcHJldkVsOiBcIi5zd2lwZXItYnV0dG9uLXByZXZcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2xpZGVyLTQtY29sJykpIHtcclxuICAgICAgICBjb25zdCBzbGlkZXI0Q29sID0gbmV3IFN3aXBlcignLnNsaWRlci00LWNvbCcsIHtcclxuICAgICAgICAgICAgc2xpZGVzUGVyVmlldzogMSxcclxuICAgICAgICAgICAgcGFnaW5hdGlvbjoge1xyXG4gICAgICAgICAgICAgICAgZWw6ICcuc2xpZGVyLTQtY29sIC5zd2lwZXItcGFnaW5hdGlvbicsXHJcbiAgICAgICAgICAgICAgICBjbGlja2FibGU6IHRydWUsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIG5hdmlnYXRpb246IHtcclxuICAgICAgICAgICAgICAgIG5leHRFbDogXCIuc2xpZGVyLWdhbGxlcnkyIC5zd2lwZXItYnV0dG9uLW5leHRcIixcclxuICAgICAgICAgICAgICAgIHByZXZFbDogXCIuc2xpZGVyLWdhbGxlcnkyIC5zd2lwZXItYnV0dG9uLXByZXZcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgYnJlYWtwb2ludHM6IHtcclxuICAgICAgICAgICAgICAgIDU3Nzoge1xyXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1BlclZpZXc6IDIsXHJcbiAgICAgICAgICAgICAgICAgICAgc3BhY2VCZXR3ZWVuOiAxNlxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIDc2Nzoge1xyXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1BlclZpZXc6IDMsXHJcbiAgICAgICAgICAgICAgICAgICAgc3BhY2VCZXR3ZWVuOiAxNlxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIDk5MToge1xyXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1BlclZpZXc6IDQsXHJcbiAgICAgICAgICAgICAgICAgICAgc3BhY2VCZXR3ZWVuOiAxNlxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zbGlkZXItZ2FsbGVyeTInKSkge1xyXG4gICAgICAgIGNvbnN0IHNsaWRlckdhbGxlcnkyID0gbmV3IFN3aXBlcignLnNsaWRlci1nYWxsZXJ5MiAnLCB7XHJcbiAgICAgICAgICAgIHNwYWNlQmV0d2VlbjogMTYsXHJcbiAgICAgICAgICAgIG5hdmlnYXRpb246IHtcclxuICAgICAgICAgICAgICAgIG5leHRFbDogXCIuc3dpcGVyLWJ1dHRvbi1uZXh0XCIsXHJcbiAgICAgICAgICAgICAgICBwcmV2RWw6IFwiLnN3aXBlci1idXR0b24tcHJldlwiLFxyXG4gICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZ2FsbGVyeScpKSB7XHJcbiAgICAgICAgICAgIGJhZ3VldHRlQm94LnJ1bignLmdhbGxlcnknLCB7fSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZ2FsbGVyeTInKSkge1xyXG5cclxuICAgICAgICAgICAgYmFndWV0dGVCb3gucnVuKCcuZ2FsbGVyeTInLCB7fSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICAvL1RBQlNcclxuICAgIGNvbnN0IHRhYkxpbmtzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnRhYnNfX25hdi1saW5rJyk7XHJcbiAgICBjb25zdCB0YWJDb250ZW50cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy50YWItY29udGVudCcpO1xyXG5cclxuICAgIHRhYkxpbmtzLmZvckVhY2gobGluayA9PiB7XHJcbiAgICAgICAgbGluay5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XHJcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgICAgIHRhYkxpbmtzLmZvckVhY2gobGluayA9PiBsaW5rLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpKTtcclxuICAgICAgICAgICAgdGFiQ29udGVudHMuZm9yRWFjaChjb250ZW50ID0+IGNvbnRlbnQuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJykpO1xyXG4gICAgICAgICAgICBsaW5rLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xyXG5cclxuICAgICAgICAgICAgY29uc3QgdGFyZ2V0SWQgPSBsaW5rLmdldEF0dHJpYnV0ZSgnaHJlZicpLnN1YnN0cmluZygxKTtcclxuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGFyZ2V0SWQpLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG5cclxuLy8gUE9QVVBcclxuICAgIGNvbnN0IHBvcHVwQ29udCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucG9wdXBfY29udGFjdHNcIik7XHJcbiAgICBjb25zdCBidG5DYWxsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5idG5fY2FsbFwiKTtcclxuICAgIGNvbnN0IGNvbnRhY3RzQ2xvc2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucG9wdXBfY29udGFjdHMgLnBvcHVwX2Nsb3NlJyk7XHJcbiAgICBjb25zdCBiYWNrZHJvcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5iYWNrZHJvcCcpO1xyXG5cclxuICAgIGJ0bkNhbGwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgcG9wdXBDb250LmNsYXNzTGlzdC5hZGQoJ29wZW5fbW9kYWwnKTtcclxuICAgICAgICBiYWNrZHJvcC5jbGFzc0xpc3QudG9nZ2xlKCdlbC12aXNpYmxlJyk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBjb25zdCBjbG9zZVBvcHVwID0gKCkgPT4ge1xyXG4gICAgICAgIHBvcHVwQ29udC5jbGFzc0xpc3QucmVtb3ZlKCdvcGVuX21vZGFsJyk7XHJcbiAgICAgICAgYmFja2Ryb3AuY2xhc3NMaXN0LnJlbW92ZSgnZWwtdmlzaWJsZScpO1xyXG4gICAgICAgIGlmICh3aW5kb3cuY2xlYXJDb250YWN0Rm9ybSkge1xyXG4gICAgICAgICAgICB3aW5kb3cuY2xlYXJDb250YWN0Rm9ybSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjb250YWN0c0Nsb3NlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY2xvc2VQb3B1cCk7XHJcbiAgICBiYWNrZHJvcC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNsb3NlUG9wdXApO1xyXG5cclxuXHJcbi8vICAgIE1VTFRJIFNURVAgRk9STVxyXG4gICAgY29uc3QgbXNGb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm11bHRpLXN0ZXAtZm9ybScpO1xyXG5cclxuICAgIGlmIChtc0Zvcm0pIHtcclxuICAgICAgICBsZXQgYWN0aXZlSW5kZXggPSAwO1xyXG4gICAgICAgIGNvbnN0IHN0ZXBzQ2lyY2xlID0gbXNGb3JtLnF1ZXJ5U2VsZWN0b3JBbGwoJy5wcm9ncmVzcy1zdGVwJyk7XHJcbiAgICAgICAgY29uc3Qgc3RlcENvbnRlbnQgPSBtc0Zvcm0ucXVlcnlTZWxlY3RvckFsbCgnLmZvcm1fX3N0ZXAnKTtcclxuXHJcbiAgICAgICAgY29uc3QgYnRuc05leHQgPSBtc0Zvcm0ucXVlcnlTZWxlY3RvckFsbCgnLmJ0bl9uZXh0Jyk7XHJcbiAgICAgICAgY29uc3QgcHJldkJ0bnMgPSBtc0Zvcm0ucXVlcnlTZWxlY3RvckFsbCgnLmZvcm1fX25hdi1saW5rJyk7XHJcblxyXG4gICAgICAgIGNvbnN0IHRoWW91UGFnZSA9IG1zRm9ybS5xdWVyeVNlbGVjdG9yKCcudGhhbmtzLXlvdS1wYWdlJyk7XHJcblxyXG4gICAgICAgIHN0ZXBzQ2lyY2xlW2FjdGl2ZUluZGV4XS5jbGFzc0xpc3QuYWRkKCdwcm9ncmVzcy1zdGVwX2FjdGl2ZScpO1xyXG4gICAgICAgIHN0ZXBDb250ZW50W2FjdGl2ZUluZGV4XS5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcclxuICAgICAgICBwcmV2QnRuc1thY3RpdmVJbmRleF0uY2xhc3NMaXN0LmFkZCgnc2hvdycpO1xyXG5cclxuICAgICAgICBjb25zdCBnb1RvU3RlcCA9IChhY3RpdmVJbmRleCkgPT4ge1xyXG4gICAgICAgICAgICBzdGVwQ29udGVudC5mb3JFYWNoKGVsID0+IGVsLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpKVxyXG5cclxuICAgICAgICAgICAgc3RlcHNDaXJjbGUuZm9yRWFjaCgoZWwsIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoaW5kZXggPiBhY3RpdmVJbmRleCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGVsLmNsYXNzTGlzdC5yZW1vdmUoJ3Byb2dyZXNzLXN0ZXBfYWN0aXZlJylcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZWwuY2xhc3NMaXN0LmFkZCgncHJvZ3Jlc3Mtc3RlcF9hY3RpdmUnKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgcHJldkJ0bnMuZm9yRWFjaCgoZWwsIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoaW5kZXggPiBhY3RpdmVJbmRleCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGVsLmNsYXNzTGlzdC5yZW1vdmUoJ3Nob3cnKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZWwuY2xhc3NMaXN0LmFkZCgnc2hvdycpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgY29uc3QgYWN0aXZlQ29udGVudCA9IHN0ZXBDb250ZW50W2FjdGl2ZUluZGV4XTtcclxuICAgICAgICAgICAgaWYgKGFjdGl2ZUNvbnRlbnQpIHtcclxuICAgICAgICAgICAgICAgIGFjdGl2ZUNvbnRlbnQuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJylcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgd2luZG93LmNsZWFyQ29udGFjdEZvcm0gPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIG1zRm9ybS5yZXNldCgpO1xyXG4gICAgICAgICAgICBhY3RpdmVJbmRleCA9IDA7XHJcbiAgICAgICAgICAgIGdvVG9TdGVwKGFjdGl2ZUluZGV4KTtcclxuICAgICAgICAgICAgdGhZb3VQYWdlLmNsYXNzTGlzdC5yZW1vdmUoJ3Nob3cnKTtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBidG5zTmV4dC5mb3JFYWNoKGJ0biA9PiBidG4uYWRkRXZlbnRMaXN0ZW5lcihcclxuICAgICAgICAgICAgJ2NsaWNrJywgKGUpID0+IHtcclxuICAgICAgICAgICAgICAgIGFjdGl2ZUluZGV4ID0gYWN0aXZlSW5kZXggKyAxO1xyXG4gICAgICAgICAgICAgICAgaWYgKGFjdGl2ZUluZGV4IDwgc3RlcENvbnRlbnQubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZ29Ub1N0ZXAoYWN0aXZlSW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmIChlLnRhcmdldC50eXBlID09PSAnc3VibWl0Jykge1xyXG4gICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdGhZb3VQYWdlLmNsYXNzTGlzdC5hZGQoJ3Nob3cnKTtcclxuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2xvc2VQb3B1cCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sIDMwMDApXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICApKTtcclxuXHJcbiAgICAgICAgcHJldkJ0bnMuZm9yRWFjaChidG4gPT4gYnRuLmFkZEV2ZW50TGlzdGVuZXIoXHJcbiAgICAgICAgICAgICdjbGljaycsIChlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBhY3RpdmVJbmRleCA9IEFycmF5LmZyb20ocHJldkJ0bnMpLmZpbmRJbmRleChlbCA9PiBlbCA9PT0gZS50YXJnZXQpO1xyXG5cclxuICAgICAgICAgICAgICAgIGdvVG9TdGVwKGFjdGl2ZUluZGV4KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICkpO1xyXG5cclxuICAgICAgICBtc0Zvcm0ucXVlcnlTZWxlY3RvckFsbCgnLmpzLWZvcm0tZmllbGQnKS5mb3JFYWNoKGVsID0+IHtcclxuICAgICAgICAgICAgZWwuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCAoZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgYWN0aXZlU2V0Q29udHJvbHMgPSBzdGVwQ29udGVudFthY3RpdmVJbmRleF0ucXVlcnlTZWxlY3RvckFsbCgnLmpzLWZvcm0tZmllbGQnKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHN1Ym1pdEJ0biA9IHN0ZXBDb250ZW50W2FjdGl2ZUluZGV4XS5xdWVyeVNlbGVjdG9yKCcuYnRuX25leHQnKTtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgZGlzYWJsZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgaWYgKGFjdGl2ZUluZGV4ID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQgPSBBcnJheS5mcm9tKGFjdGl2ZVNldENvbnRyb2xzKS5maWx0ZXIoZWwgPT4gZWwuaGFzQXR0cmlidXRlKCdyZXF1aXJlZCcpKS5zb21lKGVsID0+IGVsLnZhbHVlID09PSAnJyk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGFjdGl2ZUluZGV4ID09PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQgPSAhQXJyYXkuZnJvbShzdGVwQ29udGVudFthY3RpdmVJbmRleF0ucXVlcnlTZWxlY3RvckFsbCgnW3R5cGU9XCJjaGVja2JveFwiXScpKS5zb21lKGVsID0+IGVsLmNoZWNrZWQpXHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGFjdGl2ZUluZGV4ID09PSAyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgb3RoZXJDaXR5ID0gbXNGb3JtLnF1ZXJ5U2VsZWN0b3IoJ1tuYW1lPVwib3RoZXJfY2l0eVwiXScpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvdGhlckNpdHkgPT09IGUudGFyZ2V0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0ZXBDb250ZW50W2FjdGl2ZUluZGV4XS5xdWVyeVNlbGVjdG9yQWxsKCdbdHlwZT1cInJhZGlvXCJdJykuZm9yRWFjaChlbCA9PiBlbC5jaGVja2VkID0gZmFsc2UpXHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb3RoZXJDaXR5LnZhbHVlID0gJyc7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZCA9ICFBcnJheS5mcm9tKHN0ZXBDb250ZW50W2FjdGl2ZUluZGV4XS5xdWVyeVNlbGVjdG9yQWxsKCdbdHlwZT1cInJhZGlvXCJdJykpLnNvbWUoZWwgPT4gZWwuY2hlY2tlZCkgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgb3RoZXJDaXR5LnZhbHVlID09PSAnJztcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cobXNGb3JtLnF1ZXJ5U2VsZWN0b3IoJ1tuYW1lPVwib3RoZXJfY2l0eVwiXScpKVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHN1Ym1pdEJ0bi5kaXNhYmxlZCA9IGRpc2FibGVkXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcbi8vICAgIFNJREVCQVIgSE9WRVIgT1ZFUkxBWVxyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnNpZGViYXJfX25hdiAuZHJvcGRvd24nKS5mb3JFYWNoKGZ1bmN0aW9uIChlbGVtZW50KSB7XHJcbiAgICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWVudGVyJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2lkZWJhcl9fb3ZlcmxheScpLmNsYXNzTGlzdC5hZGQoJ3Nob3cnKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWxlYXZlJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2lkZWJhcl9fb3ZlcmxheScpLmNsYXNzTGlzdC5yZW1vdmUoJ3Nob3cnKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJyNhY2NvcmRpb24gLnBhbmVsX19oZWFkaW5nJykuZm9yRWFjaCgoaGVhZGluZykgPT4ge1xyXG4gICAgICAgIGhlYWRpbmcuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGlzT3BlbiA9IHRoaXMuY2xhc3NMaXN0LmNvbnRhaW5zKCdvcGVuJyk7XHJcbiAgICAgICAgICAgIGNvbnN0IGFsbFBhbmVscyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJyNhY2NvcmRpb24gLnBhbmVsX19oZWFkaW5nJyk7XHJcbiAgICAgICAgICAgIGNvbnN0IGFsbENvbnRlbnRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnBhbmVsLWNvbGxhcHNlJyk7XHJcblxyXG4gICAgICAgICAgICBhbGxQYW5lbHMuZm9yRWFjaChwYW5lbCA9PiBwYW5lbC5jbGFzc0xpc3QucmVtb3ZlKCdvcGVuJykpO1xyXG4gICAgICAgICAgICBhbGxDb250ZW50cy5mb3JFYWNoKGNvbnRlbnQgPT4gY29udGVudC5zdHlsZS5tYXhIZWlnaHQgPSBudWxsKTtcclxuXHJcbiAgICAgICAgICAgIGlmICghaXNPcGVuKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNsYXNzTGlzdC5hZGQoJ29wZW4nKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHBhbmVsQ29udGVudCA9IHRoaXMubmV4dEVsZW1lbnRTaWJsaW5nO1xyXG4gICAgICAgICAgICAgICAgcGFuZWxDb250ZW50LnN0eWxlLm1heEhlaWdodCA9IHBhbmVsQ29udGVudC5zY3JvbGxIZWlnaHQgKyAncHgnO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbn0pO1xyXG5cclxuIl0sImZpbGUiOiJtYWluLmpzIn0=
