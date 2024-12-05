/*
* to include js file write: `//= include ./path-to-file`
* */

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
        },
    });

    if (document.querySelector('.product-slider')) {
        const productSlider = new Swiper('.product-slider ', {
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

    jQuery('body').on('click', '.product-feature__thumb', function () {

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
    const thumbNavBlock = document.querySelectorAll('.product-feature__nav');
    const tabThumbNav = document.querySelectorAll('.product-feature__thumb');

    tabThumbNav.forEach(link => {
        if (window.innerWidth > 767) {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const parent = findParent(e.target, 'product-feature');

                const tabThumbNav = parent.querySelectorAll('.product-feature__thumb');
                const tabContents = parent.querySelectorAll('.feature-content');
                if(tabThumbNav[0]){
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
        if(popup == null)
            return false;

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


//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJtYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qXHJcbiogdG8gaW5jbHVkZSBqcyBmaWxlIHdyaXRlOiBgLy89IGluY2x1ZGUgLi9wYXRoLXRvLWZpbGVgXHJcbiogKi9cclxuXHJcbi8vIENVU1RPTSBTQ1JJUFRTXHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmdW5jdGlvbiAoKSB7XHJcblxyXG4vLyBTQ1JPTEwgVE8gQU5DSE9SXHJcbiAgICBmdW5jdGlvbiBzbW9vdGhTY3JvbGxUb0FuY2hvcihzZWxlY3RvciwgaGVhZGVyU2VsZWN0b3IsIGhlYWRlclBhZ2VTZWxlY3Rvcikge1xyXG4gICAgICAgIGxldCBoZWFkZXJQYWdlSGVpZ2h0ID0gMDtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gZGVsYXkobXMpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4gc2V0VGltZW91dChyZXNvbHZlLCBtcykpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgYXN5bmMgZnVuY3Rpb24gdXBkYXRlSGVhZGVySGVpZ2h0V2l0aERlbGF5KCkge1xyXG4gICAgICAgICAgICBhd2FpdCBkZWxheSgxMDApOyAvLyDQl9Cw0YLRgNC40LzQutCwIDEwMCDQvNGBXHJcbiAgICAgICAgICAgIGNvbnN0IGhlYWRlclBhZ2VFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihoZWFkZXJQYWdlU2VsZWN0b3IpO1xyXG4gICAgICAgICAgICBpZiAoaGVhZGVyUGFnZUVsZW1lbnQpIHtcclxuICAgICAgICAgICAgICAgIGhlYWRlclBhZ2VIZWlnaHQgPSBoZWFkZXJQYWdlRWxlbWVudC5jbGllbnRIZWlnaHQgfHwgMDtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdVcGRhdGVkIGhlYWRlclBhZ2VIZWlnaHQgd2l0aCBkZWxheTonLCBoZWFkZXJQYWdlSGVpZ2h0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgaGVhZGVyUGFnZUVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGhlYWRlclBhZ2VTZWxlY3Rvcik7XHJcbiAgICAgICAgaWYgKGhlYWRlclBhZ2VFbGVtZW50KSB7XHJcbiAgICAgICAgICAgIGNvbnN0IG9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoYXN5bmMgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgYXdhaXQgdXBkYXRlSGVhZGVySGVpZ2h0V2l0aERlbGF5KCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgb2JzZXJ2ZXIub2JzZXJ2ZShoZWFkZXJQYWdlRWxlbWVudCwge1xyXG4gICAgICAgICAgICAgICAgYXR0cmlidXRlczogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIGNoaWxkTGlzdDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBzdWJ0cmVlOiBmYWxzZSxcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB1cGRhdGVIZWFkZXJIZWlnaHRXaXRoRGVsYXkoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpLmZvckVhY2goKGVsZW1lbnQpID0+IHtcclxuICAgICAgICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGFzeW5jIGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgYW5jaG9yID0gdGhpcy5nZXRBdHRyaWJ1dGUoJ2hyZWYnKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoYW5jaG9yLnN0YXJ0c1dpdGgoJyMnKSAmJiBhbmNob3IgIT09ICcjJykge1xyXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdGFyZ2V0RWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYW5jaG9yKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBoZWFkZXJFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihoZWFkZXJTZWxlY3Rvcik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0YXJnZXRFbGVtZW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uIGdldEVsZW1lbnRPZmZzZXRUb3AoZWxlbWVudCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVjdCA9IGVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBzY3JvbGxUb3AgPSB3aW5kb3cucGFnZVlPZmZzZXQgfHwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZWN0LnRvcCArIHNjcm9sbFRvcDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgYXdhaXQgZGVsYXkoMTAwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgdGFyZ2V0UG9zaXRpb24gPSBnZXRFbGVtZW50T2Zmc2V0VG9wKHRhcmdldEVsZW1lbnQpIC0gKCh3aW5kb3cuaW5uZXJXaWR0aCA8PSA5OTEgPyA5MCA6IDEwKSArIGhlYWRlclBhZ2VIZWlnaHQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnU2Nyb2xsIHRvIHBvc2l0aW9uIHdpdGggZGVsYXk6JywgdGFyZ2V0UG9zaXRpb24pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3cuc2Nyb2xsVG8oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9wOiB0YXJnZXRQb3NpdGlvbixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJlaGF2aW9yOiAnc21vb3RoJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHNtb290aFNjcm9sbFRvQW5jaG9yKCcuc2Nyb2xsLXRvLWFuY2hvciBhJywgJy5oZWFkZXInLCAnLnBhZ2VfX2hlYWRlcicpO1xyXG5cclxuXHJcbi8vIE1PQklMRSBNRU5VXHJcbiAgICBjb25zdCBzaWRlYmFyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNpZGViYXInKTtcclxuICAgIGNvbnN0IGhlYWRlclNiT3AgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaGVhZGVyJyk7XHJcbiAgICBjb25zdCBidG5CdXJnZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYnRuLWJ1cmdlcicpO1xyXG4gICAgY29uc3QgbWVudUxpbmtzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnNpZGViYXIgLm1lbnVfX2xpbmsnKTtcclxuICAgIGNvbnN0IG92ZXJsYXkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2lkZWJhcl9fb3ZlcmxheScpO1xyXG4gICAgY29uc3QgYnRuQ2FsbFNiID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJ0bl9jYWxsJyk7XHJcblxyXG4gICAgYnRuQnVyZ2VyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgc2lkZWJhci5jbGFzc0xpc3QudG9nZ2xlKCdvcGVuJyk7XHJcbiAgICAgICAgaGVhZGVyU2JPcC5jbGFzc0xpc3QudG9nZ2xlKCdvcGVuJyk7XHJcbiAgICAgICAgb3ZlcmxheS5jbGFzc0xpc3QudG9nZ2xlKCdlbC12aXNpYmxlJyk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBtZW51TGlua3MuZm9yRWFjaChmdW5jdGlvbiAobGluaykge1xyXG4gICAgICAgIGxpbmsuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHNpZGViYXIuY2xhc3NMaXN0LnJlbW92ZSgnb3BlbicpO1xyXG4gICAgICAgICAgICBvdmVybGF5LmNsYXNzTGlzdC5yZW1vdmUoJ2VsLXZpc2libGUnKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIG92ZXJsYXkuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgc2lkZWJhci5jbGFzc0xpc3QucmVtb3ZlKCdvcGVuJyk7XHJcbiAgICAgICAgb3ZlcmxheS5jbGFzc0xpc3QucmVtb3ZlKCdlbC12aXNpYmxlJyk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBidG5DYWxsU2IuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgc2lkZWJhci5jbGFzc0xpc3QucmVtb3ZlKCdvcGVuJyk7XHJcbiAgICAgICAgb3ZlcmxheS5jbGFzc0xpc3QucmVtb3ZlKCdlbC12aXNpYmxlJyk7XHJcbiAgICB9KTtcclxuXHJcbi8vU1RJQ0tZIEhFQURFUiBQQUdFXHJcblxyXG4gICAgY29uc3Qgc3RpY2t5RWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wYWdlX19oZWFkZXInKTtcclxuICAgIGxldCBzdGlja3lPZmZzZXQgPSAwO1xyXG5cclxuICAgIGZ1bmN0aW9uIHVwZGF0ZVN0aWNreUJhbm5lck9mZnNldCgpIHtcclxuICAgICAgICBjb25zdCBwYWdlQmFubmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNlY3Rpb24tYmFubmVyJyk7XHJcblxyXG4gICAgICAgIGlmIChwYWdlQmFubmVyKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGJhbm5lckggPSBwYWdlQmFubmVyLm9mZnNldEhlaWdodDtcclxuICAgICAgICAgICAgY29uc3Qgc3RpY2t5SCA9IHN0aWNreUVsZW1lbnQub2Zmc2V0SGVpZ2h0O1xyXG5cclxuICAgICAgICAgICAgY29uc3QgbW9iaWxlT2Zmc2V0ID0gd2luZG93LmlubmVyV2lkdGggPD0gOTkxID8gODAgOiAwO1xyXG5cclxuICAgICAgICAgICAgc3RpY2t5T2Zmc2V0ID0gYmFubmVySCAtIHN0aWNreUggLSBtb2JpbGVPZmZzZXQ7XHJcblxyXG4gICAgICAgICAgICBpZiAod2luZG93LnBhZ2VZT2Zmc2V0ID49IHN0aWNreU9mZnNldCkge1xyXG4gICAgICAgICAgICAgICAgc3RpY2t5RWxlbWVudC5jbGFzc0xpc3QuYWRkKCdzdGlja3knKTtcclxuICAgICAgICAgICAgICAgIHN0aWNreU9mZnNldCA9IHN0aWNreUVsZW1lbnQub2Zmc2V0VG9wO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgc3RpY2t5RWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdzdGlja3knKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgdXBkYXRlU3RpY2t5QmFubmVyT2Zmc2V0KTtcclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgdXBkYXRlU3RpY2t5QmFubmVyT2Zmc2V0KTtcclxuXHJcbiAgICBjb25zdCBiYW5uZXJUaHVtYiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2VjdGlvbi1iYW5uZXJfX3RodW1iXCIpO1xyXG4gICAgY29uc3QgYmFubmVyVGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucGFnZS10aXRsZScpO1xyXG5cclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwic2Nyb2xsXCIsICgpID0+IHtcclxuICAgICAgICB1cGRhdGVTdGlja3lCYW5uZXJPZmZzZXQoKVxyXG5cclxuICAgICAgICBpZiAoYmFubmVyVGh1bWIgJiYgYmFubmVyVGl0bGUpIHtcclxuICAgICAgICAgICAgaWYgKHdpbmRvdy5zY3JvbGxZID4gMCkge1xyXG4gICAgICAgICAgICAgICAgYmFubmVyVGh1bWIuY2xhc3NMaXN0LmFkZChcImhpZGUtdGh1bWJcIik7XHJcbiAgICAgICAgICAgICAgICBiYW5uZXJUaXRsZS5jbGFzc0xpc3QuYWRkKFwic21hbGwtdGl0bGVcIik7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBiYW5uZXJUaHVtYi5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZS10aHVtYlwiKTtcclxuICAgICAgICAgICAgICAgIGJhbm5lclRpdGxlLmNsYXNzTGlzdC5yZW1vdmUoXCJzbWFsbC10aXRsZVwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuLy8gc3RpY2t5T2Zmc2V0IC0gODBcclxuLy9TTElERVJcclxuXHJcbiAgICBjb25zdCBzd2lwZXJJbmZvID0gbmV3IFN3aXBlcignLnN3aXBlci1pbmZvJywge1xyXG4gICAgICAgIHBhZ2luYXRpb246IHtcclxuICAgICAgICAgICAgZWw6ICcuc3dpcGVyLWluZm8gLnN3aXBlci1wYWdpbmF0aW9uJyxcclxuICAgICAgICAgICAgY2xpY2thYmxlOiB0cnVlLFxyXG4gICAgICAgIH0sXHJcbiAgICB9KTtcclxuXHJcbiAgICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByb2R1Y3Qtc2xpZGVyJykpIHtcclxuICAgICAgICBjb25zdCBwcm9kdWN0U2xpZGVyID0gbmV3IFN3aXBlcignLnByb2R1Y3Qtc2xpZGVyICcsIHtcclxuICAgICAgICAgICAgcGFnaW5hdGlvbjoge1xyXG4gICAgICAgICAgICAgICAgZWw6ICcucHJvZHVjdC1zbGlkZXIgLnN3aXBlci1wYWdpbmF0aW9uJyxcclxuICAgICAgICAgICAgICAgIGNsaWNrYWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIGR5bmFtaWNCdWxsZXRzOiB0cnVlLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBuYXZpZ2F0aW9uOiB7XHJcbiAgICAgICAgICAgICAgICBuZXh0RWw6IFwiLnN3aXBlci1idXR0b24tbmV4dFwiLFxyXG4gICAgICAgICAgICAgICAgcHJldkVsOiBcIi5zd2lwZXItYnV0dG9uLXByZXZcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgYnJlYWtwb2ludHM6IHtcclxuICAgICAgICAgICAgICAgIDU3Nzoge1xyXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1BlclZpZXc6IDIsXHJcbiAgICAgICAgICAgICAgICAgICAgc3BhY2VCZXR3ZWVuOiAxNlxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jYXJkcy1zbGlkZXInKSkge1xyXG4gICAgICAgIGNvbnN0IGNhcmRTbGlkZXIgPSBuZXcgU3dpcGVyKCcuY2FyZHMtc2xpZGVyICcsIHtcclxuICAgICAgICAgICAgcGFnaW5hdGlvbjoge1xyXG4gICAgICAgICAgICAgICAgZWw6ICcuY2FyZHMtc2xpZGVyIC5zd2lwZXItcGFnaW5hdGlvbicsXHJcbiAgICAgICAgICAgICAgICBjbGlja2FibGU6IHRydWUsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIG5hdmlnYXRpb246IHtcclxuICAgICAgICAgICAgICAgIG5leHRFbDogXCIuc3dpcGVyLWJ1dHRvbi1uZXh0XCIsXHJcbiAgICAgICAgICAgICAgICBwcmV2RWw6IFwiLnN3aXBlci1idXR0b24tcHJldlwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBicmVha3BvaW50czoge1xyXG4gICAgICAgICAgICAgICAgNTc3OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzUGVyVmlldzogMixcclxuICAgICAgICAgICAgICAgICAgICBzcGFjZUJldHdlZW46IDE2LFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ncmVlbi1zbGlkZXInKSkge1xyXG4gICAgICAgIGNvbnN0IGdyZWVuU2xpZGVyID0gbmV3IFN3aXBlcignLmdyZWVuLXNsaWRlcicsIHtcclxuICAgICAgICAgICAgcGFnaW5hdGlvbjoge1xyXG4gICAgICAgICAgICAgICAgZWw6ICcuZ3JlZW4tc2xpZGVyIC5zd2lwZXItcGFnaW5hdGlvbicsXHJcbiAgICAgICAgICAgICAgICBjbGlja2FibGU6IHRydWUsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIG5hdmlnYXRpb246IHtcclxuICAgICAgICAgICAgICAgIG5leHRFbDogXCIuc3dpcGVyLWJ1dHRvbi1uZXh0XCIsXHJcbiAgICAgICAgICAgICAgICBwcmV2RWw6IFwiLnN3aXBlci1idXR0b24tcHJldlwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zbGlkZXItNC1jb2wnKSkge1xyXG4gICAgICAgIGNvbnN0IHNsaWRlcjRDb2wgPSBuZXcgU3dpcGVyKCcuc2xpZGVyLTQtY29sJywge1xyXG4gICAgICAgICAgICBzbGlkZXNQZXJWaWV3OiAxLFxyXG4gICAgICAgICAgICBwYWdpbmF0aW9uOiB7XHJcbiAgICAgICAgICAgICAgICBlbDogJy5zbGlkZXItNC1jb2wgLnN3aXBlci1wYWdpbmF0aW9uJyxcclxuICAgICAgICAgICAgICAgIGNsaWNrYWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgbmF2aWdhdGlvbjoge1xyXG4gICAgICAgICAgICAgICAgbmV4dEVsOiBcIi5zbGlkZXItNC1jb2wgLnN3aXBlci1idXR0b24tbmV4dFwiLFxyXG4gICAgICAgICAgICAgICAgcHJldkVsOiBcIi5zbGlkZXItNC1jb2wgLnN3aXBlci1idXR0b24tcHJldlwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBicmVha3BvaW50czoge1xyXG4gICAgICAgICAgICAgICAgNTc3OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzUGVyVmlldzogMixcclxuICAgICAgICAgICAgICAgICAgICBzcGFjZUJldHdlZW46IDE2XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgNzY3OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzUGVyVmlldzogMyxcclxuICAgICAgICAgICAgICAgICAgICBzcGFjZUJldHdlZW46IDE2XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgOTkxOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzUGVyVmlldzogNCxcclxuICAgICAgICAgICAgICAgICAgICBzcGFjZUJldHdlZW46IDE2XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNsaWRlci1nYWxsZXJ5MicpKSB7XHJcbiAgICAgICAgY29uc3Qgc2xpZGVyR2FsbGVyeTIgPSBuZXcgU3dpcGVyKCcuc2xpZGVyLWdhbGxlcnkyICcsIHtcclxuICAgICAgICAgICAgc3BhY2VCZXR3ZWVuOiAxNixcclxuICAgICAgICAgICAgbmF2aWdhdGlvbjoge1xyXG4gICAgICAgICAgICAgICAgbmV4dEVsOiBcIi5zbGlkZXItZ2FsbGVyeTIgLnN3aXBlci1idXR0b24tbmV4dFwiLFxyXG4gICAgICAgICAgICAgICAgcHJldkVsOiBcIi5zbGlkZXItZ2FsbGVyeTIgLnN3aXBlci1idXR0b24tcHJldlwiLFxyXG4gICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBqUXVlcnkoJ2JvZHknKS5vbignY2xpY2snLCAnLnByb2R1Y3QtZmVhdHVyZV9fdGh1bWInLCBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgIGpRdWVyeSh0aGlzKS5zaWJsaW5ncygnLnByb2R1Y3QtZmVhdHVyZV9fdGh1bWInKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAgICAgalF1ZXJ5KHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLmZpbmQoJy5wcm9kdWN0LWZlYXR1cmVfX2NvbnRlbnQgLnRhYi1jb250ZW50JykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG5cclxuICAgICAgICBqUXVlcnkodGhpcykuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xyXG5cclxuICAgICAgICBsZXQgdGFyZ2V0SWQgPSBqUXVlcnkodGhpcykuYXR0cignZGF0YVRhcmdldCcpO1xyXG4gICAgICAgIGpRdWVyeSh0YXJnZXRJZCkuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgfSk7XHJcblxyXG4vL1RBQlNcclxuICAgIGNvbnN0IHRhYkxpbmtzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnRhYnNfX25hdi1saW5rJyk7XHJcblxyXG4gICAgZnVuY3Rpb24gZmluZFBhcmVudChlbCwgcGFyZW50Q2xhc3NOYW1lKSB7XHJcbiAgICAgICAgaWYgKCFlbCkgcmV0dXJuIGRvY3VtZW50LmJvZHk7XHJcbiAgICAgICAgLy8gU3RhcnQgZnJvbSB0aGUgY3VycmVudCBlbGVtZW50XHJcbiAgICAgICAgbGV0IGlnbm9yZUNsaWNrT3V0c2lkZSA9IGVsLmNsYXNzTGlzdC5jb250YWlucyhwYXJlbnRDbGFzc05hbWUpO1xyXG4gICAgICAgIGxldCBwYXJlbnRFbCA9IGVsLnBhcmVudEVsZW1lbnQ7XHJcblxyXG4gICAgICAgIC8vIExvb3AgdW50aWwgd2UgcmVhY2ggdGhlIHRvcCBvZiB0aGUgRE9NXHJcbiAgICAgICAgd2hpbGUgKCFpZ25vcmVDbGlja091dHNpZGUgJiYgcGFyZW50RWwpIHtcclxuICAgICAgICAgICAgLy8gTW92ZSB1cCB0byB0aGUgcGFyZW50IGVsZW1lbnRcclxuICAgICAgICAgICAgaWdub3JlQ2xpY2tPdXRzaWRlID0gcGFyZW50RWwuY2xhc3NMaXN0LmNvbnRhaW5zKHBhcmVudENsYXNzTmFtZSk7XHJcbiAgICAgICAgICAgIGlmICghaWdub3JlQ2xpY2tPdXRzaWRlKSB7XHJcbiAgICAgICAgICAgICAgICBwYXJlbnRFbCA9IHBhcmVudEVsLnBhcmVudEVsZW1lbnQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBwYXJlbnRFbDtcclxuICAgIH1cclxuXHJcbiAgICB0YWJMaW5rcy5mb3JFYWNoKGxpbmsgPT4ge1xyXG4gICAgICAgIGxpbmsuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xyXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIGNvbnN0IHBhcmVudCA9IGZpbmRQYXJlbnQoZS50YXJnZXQsICd0YWJzJyk7XHJcblxyXG4gICAgICAgICAgICBjb25zdCB0YWJMaW5rcyA9IHBhcmVudC5xdWVyeVNlbGVjdG9yQWxsKCcudGFic19fbmF2LWxpbmsnKTtcclxuICAgICAgICAgICAgY29uc3QgdGFiQ29udGVudHMgPSBwYXJlbnQucXVlcnlTZWxlY3RvckFsbCgnLnRhYi1jb250ZW50Jyk7XHJcblxyXG4gICAgICAgICAgICB0YWJMaW5rcy5mb3JFYWNoKGxpbmsgPT4gbGluay5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKSk7XHJcbiAgICAgICAgICAgIHRhYkNvbnRlbnRzLmZvckVhY2goY29udGVudCA9PiBjb250ZW50LmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpKTtcclxuICAgICAgICAgICAgbGluay5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IHRhcmdldElkID0gbGluay5nZXRBdHRyaWJ1dGUoJ2RhdGFUYXJnZXQnKS5zdWJzdHJpbmcoMSk7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRhcmdldElkKS5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuLy9CTE9DSyBGRUFUVVJFIFBST0RVQ1RcclxuICAgIGNvbnN0IHRodW1iTmF2QmxvY2sgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucHJvZHVjdC1mZWF0dXJlX19uYXYnKTtcclxuICAgIGNvbnN0IHRhYlRodW1iTmF2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnByb2R1Y3QtZmVhdHVyZV9fdGh1bWInKTtcclxuXHJcbiAgICB0YWJUaHVtYk5hdi5mb3JFYWNoKGxpbmsgPT4ge1xyXG4gICAgICAgIGlmICh3aW5kb3cuaW5uZXJXaWR0aCA+IDc2Nykge1xyXG4gICAgICAgICAgICBsaW5rLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcclxuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHBhcmVudCA9IGZpbmRQYXJlbnQoZS50YXJnZXQsICdwcm9kdWN0LWZlYXR1cmUnKTtcclxuXHJcbiAgICAgICAgICAgICAgICBjb25zdCB0YWJUaHVtYk5hdiA9IHBhcmVudC5xdWVyeVNlbGVjdG9yQWxsKCcucHJvZHVjdC1mZWF0dXJlX190aHVtYicpO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgdGFiQ29udGVudHMgPSBwYXJlbnQucXVlcnlTZWxlY3RvckFsbCgnLmZlYXR1cmUtY29udGVudCcpO1xyXG4gICAgICAgICAgICAgICAgaWYodGFiVGh1bWJOYXZbMF0pe1xyXG4gICAgICAgICAgICAgICAgICAgIHRhYlRodW1iTmF2WzBdLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGFiVGh1bWJOYXYuZm9yRWFjaChsaW5rID0+IGxpbmsuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJykpO1xyXG4gICAgICAgICAgICAgICAgdGFiQ29udGVudHMuZm9yRWFjaChjb250ZW50ID0+IGNvbnRlbnQuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJykpO1xyXG4gICAgICAgICAgICAgICAgbGluay5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcclxuXHJcbiAgICAgICAgICAgICAgICBjb25zdCB0YXJnZXRJZCA9IGxpbmsuZ2V0QXR0cmlidXRlKCdkYXRhVGFyZ2V0Jyk7XHJcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0YXJnZXRJZCkuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGlmICh0aHVtYk5hdkJsb2NrKSB7XHJcbiAgICAgICAgICAgICAgICB0YWJUaHVtYk5hdi5mb3JFYWNoKGJsb2NrID0+IGJsb2NrLnN0eWxlLmRpc3BsYXkgPSAnbm9uZScpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGFiVGh1bWJOYXYuZm9yRWFjaChibG9jayA9PiBibG9jay5zdHlsZS5kaXNwbGF5ID0gJ2ZsZXgnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblxyXG4vLyBQT1BVUFxyXG4gICAgY29uc3QgaW5pdFBvcHVwID0gKHBvcHVwU2VsZWN0b3IsIHRyaWdnZXJTZWxlY3RvciwgYmFja2Ryb3BTZWxlY3RvcikgPT4ge1xyXG4gICAgICAgIGNvbnN0IHBvcHVwID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcihwb3B1cFNlbGVjdG9yKTtcclxuICAgICAgICBpZihwb3B1cCA9PSBudWxsKVxyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcblxyXG4gICAgICAgIGNvbnN0IHRyaWdnZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRyaWdnZXJTZWxlY3Rvcik7XHJcbiAgICAgICAgY29uc3QgYmFja2Ryb3AgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYmFja2Ryb3AnKTtcclxuICAgICAgICBjb25zdCBjbG9zZUJ1dHRvbiA9IHBvcHVwLnF1ZXJ5U2VsZWN0b3IoJy5wb3B1cF9jbG9zZScpO1xyXG5cclxuICAgICAgICBpZiAoIXBvcHVwIHx8ICF0cmlnZ2VyIHx8ICFiYWNrZHJvcCB8fCAhY2xvc2VCdXR0b24pIHtcclxuICAgICAgICAgICAgY29uc29sZS53YXJuKFwi0J7QtNC40L0g0Lcg0LXQu9C10LzQtdC90YLRltCyINC90LUg0LfQvdCw0LnQtNC10L3QvlwiLCBwb3B1cFNlbGVjdG9yLCB0cmlnZ2VyU2VsZWN0b3IsIGJhY2tkcm9wU2VsZWN0b3IpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IG9wZW5Qb3B1cCA9ICgpID0+IHtcclxuICAgICAgICAgICAgcG9wdXAuY2xhc3NMaXN0LmFkZCgnb3Blbl9tb2RhbCcpO1xyXG4gICAgICAgICAgICBiYWNrZHJvcC5jbGFzc0xpc3QuYWRkKCdlbC12aXNpYmxlJyk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgY29uc3QgY2xvc2VQb3B1cCA9ICgpID0+IHtcclxuICAgICAgICAgICAgcG9wdXAuY2xhc3NMaXN0LnJlbW92ZSgnb3Blbl9tb2RhbCcpO1xyXG4gICAgICAgICAgICBiYWNrZHJvcC5jbGFzc0xpc3QucmVtb3ZlKCdlbC12aXNpYmxlJyk7XHJcbiAgICAgICAgICAgIGlmICh3aW5kb3cuY2xlYXJDb250YWN0Rm9ybSkge1xyXG4gICAgICAgICAgICAgICAgd2luZG93LmNsZWFyQ29udGFjdEZvcm0oKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgdHJpZ2dlci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIG9wZW5Qb3B1cCk7XHJcbiAgICAgICAgY2xvc2VCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjbG9zZVBvcHVwKTtcclxuICAgICAgICBiYWNrZHJvcC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNsb3NlUG9wdXApO1xyXG4gICAgfTtcclxuXHJcbiAgICBpbml0UG9wdXAoJy5wb3B1cF9jb250YWN0cycsICcuYnRuX2NhbGwnLCAnLmJhY2tkcm9wJyk7XHJcbiAgICBpbml0UG9wdXAoJy5wb3B1cF9sb2NhdGlvbicsICcudHJpZ2dlci1wb3B1cCcsICcuYmFja2Ryb3AnKTtcclxuXHJcbi8vICAgIE1VTFRJIFNURVAgRk9STVxyXG4gICAgY29uc3QgbXNGb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm11bHRpLXN0ZXAtZm9ybScpO1xyXG5cclxuICAgIGlmIChtc0Zvcm0pIHtcclxuICAgICAgICBsZXQgYWN0aXZlSW5kZXggPSAwO1xyXG4gICAgICAgIGNvbnN0IHN0ZXBzQ2lyY2xlID0gbXNGb3JtLnF1ZXJ5U2VsZWN0b3JBbGwoJy5wcm9ncmVzcy1zdGVwJyk7XHJcbiAgICAgICAgY29uc3Qgc3RlcENvbnRlbnQgPSBtc0Zvcm0ucXVlcnlTZWxlY3RvckFsbCgnLmZvcm1fX3N0ZXAnKTtcclxuXHJcbiAgICAgICAgY29uc3QgYnRuc05leHQgPSBtc0Zvcm0ucXVlcnlTZWxlY3RvckFsbCgnLmJ0bl9uZXh0Jyk7XHJcbiAgICAgICAgY29uc3QgcHJldkJ0bnMgPSBtc0Zvcm0ucXVlcnlTZWxlY3RvckFsbCgnLmZvcm1fX25hdi1saW5rJyk7XHJcblxyXG4gICAgICAgIGNvbnN0IHRoWW91UGFnZSA9IG1zRm9ybS5xdWVyeVNlbGVjdG9yKCcudGhhbmtzLXlvdS1wYWdlJyk7XHJcblxyXG4gICAgICAgIHN0ZXBzQ2lyY2xlW2FjdGl2ZUluZGV4XS5jbGFzc0xpc3QuYWRkKCdwcm9ncmVzcy1zdGVwX2FjdGl2ZScpO1xyXG4gICAgICAgIHN0ZXBDb250ZW50W2FjdGl2ZUluZGV4XS5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcclxuICAgICAgICBwcmV2QnRuc1thY3RpdmVJbmRleF0uY2xhc3NMaXN0LmFkZCgnc2hvdycpO1xyXG5cclxuICAgICAgICBjb25zdCBnb1RvU3RlcCA9IChhY3RpdmVJbmRleCkgPT4ge1xyXG4gICAgICAgICAgICBzdGVwQ29udGVudC5mb3JFYWNoKGVsID0+IGVsLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpKVxyXG5cclxuICAgICAgICAgICAgc3RlcHNDaXJjbGUuZm9yRWFjaCgoZWwsIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoaW5kZXggPiBhY3RpdmVJbmRleCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGVsLmNsYXNzTGlzdC5yZW1vdmUoJ3Byb2dyZXNzLXN0ZXBfYWN0aXZlJylcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZWwuY2xhc3NMaXN0LmFkZCgncHJvZ3Jlc3Mtc3RlcF9hY3RpdmUnKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgcHJldkJ0bnMuZm9yRWFjaCgoZWwsIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoaW5kZXggPiBhY3RpdmVJbmRleCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGVsLmNsYXNzTGlzdC5yZW1vdmUoJ3Nob3cnKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZWwuY2xhc3NMaXN0LmFkZCgnc2hvdycpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgY29uc3QgYWN0aXZlQ29udGVudCA9IHN0ZXBDb250ZW50W2FjdGl2ZUluZGV4XTtcclxuICAgICAgICAgICAgaWYgKGFjdGl2ZUNvbnRlbnQpIHtcclxuICAgICAgICAgICAgICAgIGFjdGl2ZUNvbnRlbnQuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJylcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgd2luZG93LmNsZWFyQ29udGFjdEZvcm0gPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIG1zRm9ybS5yZXNldCgpO1xyXG4gICAgICAgICAgICBhY3RpdmVJbmRleCA9IDA7XHJcbiAgICAgICAgICAgIGdvVG9TdGVwKGFjdGl2ZUluZGV4KTtcclxuICAgICAgICAgICAgdGhZb3VQYWdlLmNsYXNzTGlzdC5yZW1vdmUoJ3Nob3cnKTtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBidG5zTmV4dC5mb3JFYWNoKGJ0biA9PiBidG4uYWRkRXZlbnRMaXN0ZW5lcihcclxuICAgICAgICAgICAgJ2NsaWNrJywgKGUpID0+IHtcclxuICAgICAgICAgICAgICAgIGFjdGl2ZUluZGV4ID0gYWN0aXZlSW5kZXggKyAxO1xyXG4gICAgICAgICAgICAgICAgaWYgKGFjdGl2ZUluZGV4IDwgc3RlcENvbnRlbnQubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZ29Ub1N0ZXAoYWN0aXZlSW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmIChlLnRhcmdldC50eXBlID09PSAnc3VibWl0Jykge1xyXG4gICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdGhZb3VQYWdlLmNsYXNzTGlzdC5hZGQoJ3Nob3cnKTtcclxuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2xvc2VQb3B1cCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sIDMwMDApXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICApKTtcclxuXHJcbiAgICAgICAgcHJldkJ0bnMuZm9yRWFjaChidG4gPT4gYnRuLmFkZEV2ZW50TGlzdGVuZXIoXHJcbiAgICAgICAgICAgICdjbGljaycsIChlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBhY3RpdmVJbmRleCA9IEFycmF5LmZyb20ocHJldkJ0bnMpLmZpbmRJbmRleChlbCA9PiBlbCA9PT0gZS50YXJnZXQpO1xyXG5cclxuICAgICAgICAgICAgICAgIGdvVG9TdGVwKGFjdGl2ZUluZGV4KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICkpO1xyXG5cclxuICAgICAgICBtc0Zvcm0ucXVlcnlTZWxlY3RvckFsbCgnLmpzLWZvcm0tZmllbGQnKS5mb3JFYWNoKGVsID0+IHtcclxuICAgICAgICAgICAgZWwuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCAoZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgYWN0aXZlU2V0Q29udHJvbHMgPSBzdGVwQ29udGVudFthY3RpdmVJbmRleF0ucXVlcnlTZWxlY3RvckFsbCgnLmpzLWZvcm0tZmllbGQnKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHN1Ym1pdEJ0biA9IHN0ZXBDb250ZW50W2FjdGl2ZUluZGV4XS5xdWVyeVNlbGVjdG9yKCcuYnRuX25leHQnKTtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgZGlzYWJsZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgaWYgKGFjdGl2ZUluZGV4ID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQgPSBBcnJheS5mcm9tKGFjdGl2ZVNldENvbnRyb2xzKS5maWx0ZXIoZWwgPT4gZWwuaGFzQXR0cmlidXRlKCdyZXF1aXJlZCcpKS5zb21lKGVsID0+IGVsLnZhbHVlID09PSAnJyk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGFjdGl2ZUluZGV4ID09PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQgPSAhQXJyYXkuZnJvbShzdGVwQ29udGVudFthY3RpdmVJbmRleF0ucXVlcnlTZWxlY3RvckFsbCgnW3R5cGU9XCJjaGVja2JveFwiXScpKS5zb21lKGVsID0+IGVsLmNoZWNrZWQpXHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGFjdGl2ZUluZGV4ID09PSAyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgb3RoZXJDaXR5ID0gbXNGb3JtLnF1ZXJ5U2VsZWN0b3IoJ1tuYW1lPVwib3RoZXJfY2l0eVwiXScpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvdGhlckNpdHkgPT09IGUudGFyZ2V0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0ZXBDb250ZW50W2FjdGl2ZUluZGV4XS5xdWVyeVNlbGVjdG9yQWxsKCdbdHlwZT1cInJhZGlvXCJdJykuZm9yRWFjaChlbCA9PiBlbC5jaGVja2VkID0gZmFsc2UpXHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb3RoZXJDaXR5LnZhbHVlID0gJyc7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZCA9ICFBcnJheS5mcm9tKHN0ZXBDb250ZW50W2FjdGl2ZUluZGV4XS5xdWVyeVNlbGVjdG9yQWxsKCdbdHlwZT1cInJhZGlvXCJdJykpLnNvbWUoZWwgPT4gZWwuY2hlY2tlZCkgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgb3RoZXJDaXR5LnZhbHVlID09PSAnJztcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cobXNGb3JtLnF1ZXJ5U2VsZWN0b3IoJ1tuYW1lPVwib3RoZXJfY2l0eVwiXScpKVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHN1Ym1pdEJ0bi5kaXNhYmxlZCA9IGRpc2FibGVkXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgYnRuQ2xvc1RoYW5rcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5idG5fY2xvc2UtdGhhbmtzJyk7XHJcblxyXG4gICAgYnRuQ2xvc1RoYW5rcy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucG9wdXBfY29udGFjdHMnKS5jbGFzc0xpc3QucmVtb3ZlKCdvcGVuX21vZGFsJyk7XHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJhY2tkcm9wJykuY2xhc3NMaXN0LnJlbW92ZSgnZWwtdmlzaWJsZScpO1xyXG4gICAgfSk7XHJcblxyXG4vLyAgICBTSURFQkFSIEhPVkVSIE9WRVJMQVlcclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5zaWRlYmFyX19uYXYgLmRyb3Bkb3duJykuZm9yRWFjaChmdW5jdGlvbiAoZWxlbWVudCkge1xyXG4gICAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VlbnRlcicsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNpZGViYXJfX292ZXJsYXknKS5jbGFzc0xpc3QuYWRkKCdzaG93Jyk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VsZWF2ZScsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNpZGViYXJfX292ZXJsYXknKS5jbGFzc0xpc3QucmVtb3ZlKCdzaG93Jyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcjYWNjb3JkaW9uIC5wYW5lbF9faGVhZGluZycpLmZvckVhY2goKGhlYWRpbmcpID0+IHtcclxuICAgICAgICBoZWFkaW5nLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBjb25zdCBpc09wZW4gPSB0aGlzLmNsYXNzTGlzdC5jb250YWlucygnb3BlbicpO1xyXG4gICAgICAgICAgICBjb25zdCBhbGxQYW5lbHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcjYWNjb3JkaW9uIC5wYW5lbF9faGVhZGluZycpO1xyXG4gICAgICAgICAgICBjb25zdCBhbGxDb250ZW50cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5wYW5lbC1jb2xsYXBzZScpO1xyXG5cclxuICAgICAgICAgICAgYWxsUGFuZWxzLmZvckVhY2gocGFuZWwgPT4gcGFuZWwuY2xhc3NMaXN0LnJlbW92ZSgnb3BlbicpKTtcclxuICAgICAgICAgICAgYWxsQ29udGVudHMuZm9yRWFjaChjb250ZW50ID0+IGNvbnRlbnQuc3R5bGUubWF4SGVpZ2h0ID0gbnVsbCk7XHJcblxyXG4gICAgICAgICAgICBpZiAoIWlzT3Blbikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jbGFzc0xpc3QuYWRkKCdvcGVuJyk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBwYW5lbENvbnRlbnQgPSB0aGlzLm5leHRFbGVtZW50U2libGluZztcclxuICAgICAgICAgICAgICAgIHBhbmVsQ29udGVudC5zdHlsZS5tYXhIZWlnaHQgPSBwYW5lbENvbnRlbnQuc2Nyb2xsSGVpZ2h0ICsgJ3B4JztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4vL1RBQkxFIENPTExBUFNFIFJPV1xyXG4gICAgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50ZWNoLWNoYXJhY3RfX3JvdycpKSB7XHJcbiAgICAgICAgY29uc3QgbWF4VmlzaWJsZVJvd3MgPSA1O1xyXG4gICAgICAgIGNvbnN0IHJvd3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudGVjaC1jaGFyYWN0X19yb3cnKTtcclxuICAgICAgICBjb25zdCBzaG93TW9yZUJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5idG5fbW9yZScpO1xyXG5cclxuICAgICAgICBpZiAocm93cy5sZW5ndGggPiBtYXhWaXNpYmxlUm93cykge1xyXG4gICAgICAgICAgICBzaG93TW9yZUJ0bi5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcclxuXHJcbiAgICAgICAgICAgIHJvd3MuZm9yRWFjaCgocm93LCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGluZGV4ID49IG1heFZpc2libGVSb3dzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcm93LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBzaG93TW9yZUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHJvd3MuZm9yRWFjaChyb3cgPT4gcm93LnN0eWxlLmRpc3BsYXkgPSAnJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgc2hvd01vcmVCdG4uc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxufSk7XHJcblxyXG4iXSwiZmlsZSI6Im1haW4uanMifQ==
