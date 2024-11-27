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


//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJtYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qXHJcbiogdG8gaW5jbHVkZSBqcyBmaWxlIHdyaXRlOiBgLy89IGluY2x1ZGUgLi9wYXRoLXRvLWZpbGVgXHJcbiogKi9cclxuXHJcbi8vIENVU1RPTSBTQ1JJUFRTXHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmdW5jdGlvbiAoKSB7XHJcblxyXG4vLyBTQ1JPTEwgVE8gQU5DSE9SXHJcbiAgICBmdW5jdGlvbiBzbW9vdGhTY3JvbGxUb0FuY2hvcihzZWxlY3RvciwgaGVhZGVyU2VsZWN0b3IsIGhlYWRlclBhZ2VTZWxlY3Rvcikge1xyXG4gICAgICAgIGxldCBoZWFkZXJQYWdlSGVpZ2h0ID0gMDtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gZGVsYXkobXMpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4gc2V0VGltZW91dChyZXNvbHZlLCBtcykpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgYXN5bmMgZnVuY3Rpb24gdXBkYXRlSGVhZGVySGVpZ2h0V2l0aERlbGF5KCkge1xyXG4gICAgICAgICAgICBhd2FpdCBkZWxheSgxMDApOyAvLyDQl9Cw0YLRgNC40LzQutCwIDEwMCDQvNGBXHJcbiAgICAgICAgICAgIGNvbnN0IGhlYWRlclBhZ2VFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihoZWFkZXJQYWdlU2VsZWN0b3IpO1xyXG4gICAgICAgICAgICBpZiAoaGVhZGVyUGFnZUVsZW1lbnQpIHtcclxuICAgICAgICAgICAgICAgIGhlYWRlclBhZ2VIZWlnaHQgPSBoZWFkZXJQYWdlRWxlbWVudC5jbGllbnRIZWlnaHQgfHwgMDtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdVcGRhdGVkIGhlYWRlclBhZ2VIZWlnaHQgd2l0aCBkZWxheTonLCBoZWFkZXJQYWdlSGVpZ2h0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgaGVhZGVyUGFnZUVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGhlYWRlclBhZ2VTZWxlY3Rvcik7XHJcbiAgICAgICAgaWYgKGhlYWRlclBhZ2VFbGVtZW50KSB7XHJcbiAgICAgICAgICAgIGNvbnN0IG9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoYXN5bmMgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgYXdhaXQgdXBkYXRlSGVhZGVySGVpZ2h0V2l0aERlbGF5KCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgb2JzZXJ2ZXIub2JzZXJ2ZShoZWFkZXJQYWdlRWxlbWVudCwge1xyXG4gICAgICAgICAgICAgICAgYXR0cmlidXRlczogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIGNoaWxkTGlzdDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBzdWJ0cmVlOiBmYWxzZSxcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB1cGRhdGVIZWFkZXJIZWlnaHRXaXRoRGVsYXkoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpLmZvckVhY2goKGVsZW1lbnQpID0+IHtcclxuICAgICAgICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGFzeW5jIGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgYW5jaG9yID0gdGhpcy5nZXRBdHRyaWJ1dGUoJ2hyZWYnKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoYW5jaG9yLnN0YXJ0c1dpdGgoJyMnKSAmJiBhbmNob3IgIT09ICcjJykge1xyXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdGFyZ2V0RWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYW5jaG9yKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBoZWFkZXJFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihoZWFkZXJTZWxlY3Rvcik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0YXJnZXRFbGVtZW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uIGdldEVsZW1lbnRPZmZzZXRUb3AoZWxlbWVudCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVjdCA9IGVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBzY3JvbGxUb3AgPSB3aW5kb3cucGFnZVlPZmZzZXQgfHwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZWN0LnRvcCArIHNjcm9sbFRvcDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgYXdhaXQgZGVsYXkoMTAwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgdGFyZ2V0UG9zaXRpb24gPSBnZXRFbGVtZW50T2Zmc2V0VG9wKHRhcmdldEVsZW1lbnQpIC0gKCh3aW5kb3cuaW5uZXJXaWR0aCA8PSA5OTEgPyA5MCA6IDEwKSArIGhlYWRlclBhZ2VIZWlnaHQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnU2Nyb2xsIHRvIHBvc2l0aW9uIHdpdGggZGVsYXk6JywgdGFyZ2V0UG9zaXRpb24pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3cuc2Nyb2xsVG8oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9wOiB0YXJnZXRQb3NpdGlvbixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJlaGF2aW9yOiAnc21vb3RoJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHNtb290aFNjcm9sbFRvQW5jaG9yKCcuc2Nyb2xsLXRvLWFuY2hvciBhJywgJy5oZWFkZXInLCAnLnBhZ2VfX2hlYWRlcicpO1xyXG5cclxuXHJcbi8vIE1PQklMRSBNRU5VXHJcbiAgICBjb25zdCBzaWRlYmFyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNpZGViYXInKTtcclxuICAgIGNvbnN0IGhlYWRlclNiT3AgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaGVhZGVyJyk7XHJcbiAgICBjb25zdCBidG5CdXJnZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYnRuLWJ1cmdlcicpO1xyXG4gICAgY29uc3QgbWVudUxpbmtzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnNpZGViYXIgLm1lbnVfX2xpbmsnKTtcclxuICAgIGNvbnN0IG92ZXJsYXkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2lkZWJhcl9fb3ZlcmxheScpO1xyXG4gICAgY29uc3QgYnRuQ2FsbFNiID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJ0bl9jYWxsJyk7XHJcblxyXG4gICAgYnRuQnVyZ2VyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgc2lkZWJhci5jbGFzc0xpc3QudG9nZ2xlKCdvcGVuJyk7XHJcbiAgICAgICAgaGVhZGVyU2JPcC5jbGFzc0xpc3QudG9nZ2xlKCdvcGVuJyk7XHJcbiAgICAgICAgb3ZlcmxheS5jbGFzc0xpc3QudG9nZ2xlKCdlbC12aXNpYmxlJyk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBtZW51TGlua3MuZm9yRWFjaChmdW5jdGlvbiAobGluaykge1xyXG4gICAgICAgIGxpbmsuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHNpZGViYXIuY2xhc3NMaXN0LnJlbW92ZSgnb3BlbicpO1xyXG4gICAgICAgICAgICBvdmVybGF5LmNsYXNzTGlzdC5yZW1vdmUoJ2VsLXZpc2libGUnKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIG92ZXJsYXkuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgc2lkZWJhci5jbGFzc0xpc3QucmVtb3ZlKCdvcGVuJyk7XHJcbiAgICAgICAgb3ZlcmxheS5jbGFzc0xpc3QucmVtb3ZlKCdlbC12aXNpYmxlJyk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBidG5DYWxsU2IuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgc2lkZWJhci5jbGFzc0xpc3QucmVtb3ZlKCdvcGVuJyk7XHJcbiAgICAgICAgb3ZlcmxheS5jbGFzc0xpc3QucmVtb3ZlKCdlbC12aXNpYmxlJyk7XHJcbiAgICB9KTtcclxuXHJcbi8vU1RJQ0tZIEhFQURFUiBQQUdFXHJcblxyXG4gICAgY29uc3Qgc3RpY2t5RWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wYWdlX19oZWFkZXInKTtcclxuICAgIGxldCBzdGlja3lPZmZzZXQgPSAwO1xyXG5cclxuICAgIGZ1bmN0aW9uIHVwZGF0ZVN0aWNreUJhbm5lck9mZnNldCgpIHtcclxuICAgICAgICBjb25zdCBwYWdlQmFubmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNlY3Rpb24tYmFubmVyJyk7XHJcblxyXG4gICAgICAgIGlmIChwYWdlQmFubmVyKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGJhbm5lckggPSBwYWdlQmFubmVyLm9mZnNldEhlaWdodDtcclxuICAgICAgICAgICAgY29uc3Qgc3RpY2t5SCA9IHN0aWNreUVsZW1lbnQub2Zmc2V0SGVpZ2h0O1xyXG5cclxuICAgICAgICAgICAgY29uc3QgbW9iaWxlT2Zmc2V0ID0gd2luZG93LmlubmVyV2lkdGggPD0gOTkxID8gODAgOiAwO1xyXG5cclxuICAgICAgICAgICAgc3RpY2t5T2Zmc2V0ID0gYmFubmVySCAtIHN0aWNreUggLSBtb2JpbGVPZmZzZXQ7XHJcblxyXG4gICAgICAgICAgICBpZiAod2luZG93LnBhZ2VZT2Zmc2V0ID49IHN0aWNreU9mZnNldCkge1xyXG4gICAgICAgICAgICAgICAgc3RpY2t5RWxlbWVudC5jbGFzc0xpc3QuYWRkKCdzdGlja3knKTtcclxuICAgICAgICAgICAgICAgIHN0aWNreU9mZnNldCA9IHN0aWNreUVsZW1lbnQub2Zmc2V0VG9wO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgc3RpY2t5RWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdzdGlja3knKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgdXBkYXRlU3RpY2t5QmFubmVyT2Zmc2V0KTtcclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgdXBkYXRlU3RpY2t5QmFubmVyT2Zmc2V0KTtcclxuXHJcbiAgICBjb25zdCBiYW5uZXJUaHVtYiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2VjdGlvbi1iYW5uZXJfX3RodW1iXCIpO1xyXG4gICAgY29uc3QgYmFubmVyVGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucGFnZS10aXRsZScpO1xyXG5cclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwic2Nyb2xsXCIsICgpID0+IHtcclxuICAgICAgICB1cGRhdGVTdGlja3lCYW5uZXJPZmZzZXQoKVxyXG5cclxuICAgICAgICBpZiAoYmFubmVyVGh1bWIgJiYgYmFubmVyVGl0bGUpIHtcclxuICAgICAgICAgICAgaWYgKHdpbmRvdy5zY3JvbGxZID4gMCkge1xyXG4gICAgICAgICAgICAgICAgYmFubmVyVGh1bWIuY2xhc3NMaXN0LmFkZChcImhpZGUtdGh1bWJcIik7XHJcbiAgICAgICAgICAgICAgICBiYW5uZXJUaXRsZS5jbGFzc0xpc3QuYWRkKFwic21hbGwtdGl0bGVcIik7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBiYW5uZXJUaHVtYi5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZS10aHVtYlwiKTtcclxuICAgICAgICAgICAgICAgIGJhbm5lclRpdGxlLmNsYXNzTGlzdC5yZW1vdmUoXCJzbWFsbC10aXRsZVwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuLy8gc3RpY2t5T2Zmc2V0IC0gODBcclxuLy9TTElERVJcclxuXHJcbiAgICBjb25zdCBzd2lwZXJJbmZvID0gbmV3IFN3aXBlcignLnN3aXBlci1pbmZvJywge1xyXG4gICAgICAgIHBhZ2luYXRpb246IHtcclxuICAgICAgICAgICAgZWw6ICcuc3dpcGVyLWluZm8gLnN3aXBlci1wYWdpbmF0aW9uJyxcclxuICAgICAgICAgICAgY2xpY2thYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICBkeW5hbWljQnVsbGV0czogdHJ1ZSxcclxuICAgICAgICB9LFxyXG4gICAgfSk7XHJcblxyXG4gICAgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcm9kdWN0LXNsaWRlcicpKSB7XHJcbiAgICAgICAgY29uc3QgcHJvZHVjdFNsaWRlciA9IG5ldyBTd2lwZXIoJy5wcm9kdWN0LXNsaWRlciAnLCB7XHJcbiAgICAgICAgICAgIHBhZ2luYXRpb246IHtcclxuICAgICAgICAgICAgICAgIGVsOiAnLnByb2R1Y3Qtc2xpZGVyIC5zd2lwZXItcGFnaW5hdGlvbicsXHJcbiAgICAgICAgICAgICAgICBjbGlja2FibGU6IHRydWUsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIG5hdmlnYXRpb246IHtcclxuICAgICAgICAgICAgICAgIG5leHRFbDogXCIuc3dpcGVyLWJ1dHRvbi1uZXh0XCIsXHJcbiAgICAgICAgICAgICAgICBwcmV2RWw6IFwiLnN3aXBlci1idXR0b24tcHJldlwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBicmVha3BvaW50czoge1xyXG4gICAgICAgICAgICAgICAgNTc3OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzUGVyVmlldzogMixcclxuICAgICAgICAgICAgICAgICAgICBzcGFjZUJldHdlZW46IDE2XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNhcmRzLXNsaWRlcicpKSB7XHJcbiAgICAgICAgY29uc3QgY2FyZFNsaWRlciA9IG5ldyBTd2lwZXIoJy5jYXJkcy1zbGlkZXIgJywge1xyXG4gICAgICAgICAgICBwYWdpbmF0aW9uOiB7XHJcbiAgICAgICAgICAgICAgICBlbDogJy5jYXJkcy1zbGlkZXIgLnN3aXBlci1wYWdpbmF0aW9uJyxcclxuICAgICAgICAgICAgICAgIGNsaWNrYWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgbmF2aWdhdGlvbjoge1xyXG4gICAgICAgICAgICAgICAgbmV4dEVsOiBcIi5zd2lwZXItYnV0dG9uLW5leHRcIixcclxuICAgICAgICAgICAgICAgIHByZXZFbDogXCIuc3dpcGVyLWJ1dHRvbi1wcmV2XCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGJyZWFrcG9pbnRzOiB7XHJcbiAgICAgICAgICAgICAgICA1Nzc6IHtcclxuICAgICAgICAgICAgICAgICAgICBzbGlkZXNQZXJWaWV3OiAyLFxyXG4gICAgICAgICAgICAgICAgICAgIHNwYWNlQmV0d2VlbjogMTYsXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmdyZWVuLXNsaWRlcicpKSB7XHJcbiAgICAgICAgY29uc3QgZ3JlZW5TbGlkZXIgPSBuZXcgU3dpcGVyKCcuZ3JlZW4tc2xpZGVyJywge1xyXG4gICAgICAgICAgICBwYWdpbmF0aW9uOiB7XHJcbiAgICAgICAgICAgICAgICBlbDogJy5ncmVlbi1zbGlkZXIgLnN3aXBlci1wYWdpbmF0aW9uJyxcclxuICAgICAgICAgICAgICAgIGNsaWNrYWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgbmF2aWdhdGlvbjoge1xyXG4gICAgICAgICAgICAgICAgbmV4dEVsOiBcIi5zd2lwZXItYnV0dG9uLW5leHRcIixcclxuICAgICAgICAgICAgICAgIHByZXZFbDogXCIuc3dpcGVyLWJ1dHRvbi1wcmV2XCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNsaWRlci00LWNvbCcpKSB7XHJcbiAgICAgICAgY29uc3Qgc2xpZGVyNENvbCA9IG5ldyBTd2lwZXIoJy5zbGlkZXItNC1jb2wnLCB7XHJcbiAgICAgICAgICAgIHNsaWRlc1BlclZpZXc6IDEsXHJcbiAgICAgICAgICAgIHBhZ2luYXRpb246IHtcclxuICAgICAgICAgICAgICAgIGVsOiAnLnNsaWRlci00LWNvbCAuc3dpcGVyLXBhZ2luYXRpb24nLFxyXG4gICAgICAgICAgICAgICAgY2xpY2thYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBuYXZpZ2F0aW9uOiB7XHJcbiAgICAgICAgICAgICAgICBuZXh0RWw6IFwiLnNsaWRlci00LWNvbCAuc3dpcGVyLWJ1dHRvbi1uZXh0XCIsXHJcbiAgICAgICAgICAgICAgICBwcmV2RWw6IFwiLnNsaWRlci00LWNvbCAuc3dpcGVyLWJ1dHRvbi1wcmV2XCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGJyZWFrcG9pbnRzOiB7XHJcbiAgICAgICAgICAgICAgICA1Nzc6IHtcclxuICAgICAgICAgICAgICAgICAgICBzbGlkZXNQZXJWaWV3OiAyLFxyXG4gICAgICAgICAgICAgICAgICAgIHNwYWNlQmV0d2VlbjogMTZcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICA3Njc6IHtcclxuICAgICAgICAgICAgICAgICAgICBzbGlkZXNQZXJWaWV3OiAzLFxyXG4gICAgICAgICAgICAgICAgICAgIHNwYWNlQmV0d2VlbjogMTZcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICA5OTE6IHtcclxuICAgICAgICAgICAgICAgICAgICBzbGlkZXNQZXJWaWV3OiA0LFxyXG4gICAgICAgICAgICAgICAgICAgIHNwYWNlQmV0d2VlbjogMTZcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2xpZGVyLWdhbGxlcnkyJykpIHtcclxuICAgICAgICBjb25zdCBzbGlkZXJHYWxsZXJ5MiA9IG5ldyBTd2lwZXIoJy5zbGlkZXItZ2FsbGVyeTIgJywge1xyXG4gICAgICAgICAgICBzcGFjZUJldHdlZW46IDE2LFxyXG4gICAgICAgICAgICBuYXZpZ2F0aW9uOiB7XHJcbiAgICAgICAgICAgICAgICBuZXh0RWw6IFwiLnNsaWRlci1nYWxsZXJ5MiAuc3dpcGVyLWJ1dHRvbi1uZXh0XCIsXHJcbiAgICAgICAgICAgICAgICBwcmV2RWw6IFwiLnNsaWRlci1nYWxsZXJ5MiAuc3dpcGVyLWJ1dHRvbi1wcmV2XCIsXHJcbiAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGpRdWVyeSgnYm9keScpLm9uKCdjbGljaycsICcucHJvZHVjdC1mZWF0dXJlX190aHVtYicsIGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgalF1ZXJ5KHRoaXMpLnNpYmxpbmdzKCcucHJvZHVjdC1mZWF0dXJlX190aHVtYicpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcclxuICAgICAgICBqUXVlcnkodGhpcykucGFyZW50KCkucGFyZW50KCkuZmluZCgnLnByb2R1Y3QtZmVhdHVyZV9fY29udGVudCAudGFiLWNvbnRlbnQnKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XHJcblxyXG4gICAgICAgIGpRdWVyeSh0aGlzKS5hZGRDbGFzcygnYWN0aXZlJyk7XHJcblxyXG4gICAgICAgIGxldCB0YXJnZXRJZCA9IGpRdWVyeSh0aGlzKS5hdHRyKCdkYXRhVGFyZ2V0Jyk7XHJcbiAgICAgICAgalF1ZXJ5KHRhcmdldElkKS5hZGRDbGFzcygnYWN0aXZlJyk7XHJcbiAgICB9KTtcclxuXHJcbi8vVEFCU1xyXG4gICAgY29uc3QgdGFiTGlua3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudGFic19fbmF2LWxpbmsnKTtcclxuXHJcbiAgICBmdW5jdGlvbiBmaW5kUGFyZW50KGVsLCBwYXJlbnRDbGFzc05hbWUpIHtcclxuICAgICAgICBpZiAoIWVsKSByZXR1cm4gZG9jdW1lbnQuYm9keTtcclxuICAgICAgICAvLyBTdGFydCBmcm9tIHRoZSBjdXJyZW50IGVsZW1lbnRcclxuICAgICAgICBsZXQgaWdub3JlQ2xpY2tPdXRzaWRlID0gZWwuY2xhc3NMaXN0LmNvbnRhaW5zKHBhcmVudENsYXNzTmFtZSk7XHJcbiAgICAgICAgbGV0IHBhcmVudEVsID0gZWwucGFyZW50RWxlbWVudDtcclxuXHJcbiAgICAgICAgLy8gTG9vcCB1bnRpbCB3ZSByZWFjaCB0aGUgdG9wIG9mIHRoZSBET01cclxuICAgICAgICB3aGlsZSAoIWlnbm9yZUNsaWNrT3V0c2lkZSAmJiBwYXJlbnRFbCkge1xyXG4gICAgICAgICAgICAvLyBNb3ZlIHVwIHRvIHRoZSBwYXJlbnQgZWxlbWVudFxyXG4gICAgICAgICAgICBpZ25vcmVDbGlja091dHNpZGUgPSBwYXJlbnRFbC5jbGFzc0xpc3QuY29udGFpbnMocGFyZW50Q2xhc3NOYW1lKTtcclxuICAgICAgICAgICAgaWYgKCFpZ25vcmVDbGlja091dHNpZGUpIHtcclxuICAgICAgICAgICAgICAgIHBhcmVudEVsID0gcGFyZW50RWwucGFyZW50RWxlbWVudDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHBhcmVudEVsO1xyXG4gICAgfVxyXG5cclxuICAgIHRhYkxpbmtzLmZvckVhY2gobGluayA9PiB7XHJcbiAgICAgICAgbGluay5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XHJcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgY29uc3QgcGFyZW50ID0gZmluZFBhcmVudChlLnRhcmdldCwgJ3RhYnMnKTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IHRhYkxpbmtzID0gcGFyZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy50YWJzX19uYXYtbGluaycpO1xyXG4gICAgICAgICAgICBjb25zdCB0YWJDb250ZW50cyA9IHBhcmVudC5xdWVyeVNlbGVjdG9yQWxsKCcudGFiLWNvbnRlbnQnKTtcclxuXHJcbiAgICAgICAgICAgIHRhYkxpbmtzLmZvckVhY2gobGluayA9PiBsaW5rLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpKTtcclxuICAgICAgICAgICAgdGFiQ29udGVudHMuZm9yRWFjaChjb250ZW50ID0+IGNvbnRlbnQuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJykpO1xyXG4gICAgICAgICAgICBsaW5rLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xyXG5cclxuICAgICAgICAgICAgY29uc3QgdGFyZ2V0SWQgPSBsaW5rLmdldEF0dHJpYnV0ZSgnZGF0YVRhcmdldCcpLnN1YnN0cmluZygxKTtcclxuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGFyZ2V0SWQpLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4vL0JMT0NLIEZFQVRVUkUgUFJPRFVDVFxyXG4gICAgY29uc3QgdGh1bWJOYXZCbG9jayA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5wcm9kdWN0LWZlYXR1cmVfX25hdicpO1xyXG4gICAgY29uc3QgdGFiVGh1bWJOYXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucHJvZHVjdC1mZWF0dXJlX190aHVtYicpO1xyXG5cclxuICAgIHRhYlRodW1iTmF2LmZvckVhY2gobGluayA9PiB7XHJcbiAgICAgICAgaWYgKHdpbmRvdy5pbm5lcldpZHRoID4gNzY3KSB7XHJcbiAgICAgICAgICAgIGxpbmsuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgcGFyZW50ID0gZmluZFBhcmVudChlLnRhcmdldCwgJ3Byb2R1Y3QtZmVhdHVyZScpO1xyXG5cclxuICAgICAgICAgICAgICAgIGNvbnN0IHRhYlRodW1iTmF2ID0gcGFyZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5wcm9kdWN0LWZlYXR1cmVfX3RodW1iJyk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB0YWJDb250ZW50cyA9IHBhcmVudC5xdWVyeVNlbGVjdG9yQWxsKCcuZmVhdHVyZS1jb250ZW50Jyk7XHJcbiAgICAgICAgICAgICAgICBpZih0YWJUaHVtYk5hdlswXSl7XHJcbiAgICAgICAgICAgICAgICAgICAgdGFiVGh1bWJOYXZbMF0uY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0YWJUaHVtYk5hdi5mb3JFYWNoKGxpbmsgPT4gbGluay5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKSk7XHJcbiAgICAgICAgICAgICAgICB0YWJDb250ZW50cy5mb3JFYWNoKGNvbnRlbnQgPT4gY29udGVudC5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKSk7XHJcbiAgICAgICAgICAgICAgICBsaW5rLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xyXG5cclxuICAgICAgICAgICAgICAgIGNvbnN0IHRhcmdldElkID0gbGluay5nZXRBdHRyaWJ1dGUoJ2RhdGFUYXJnZXQnKTtcclxuICAgICAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRhcmdldElkKS5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKHRodW1iTmF2QmxvY2spIHtcclxuICAgICAgICAgICAgICAgIHRhYlRodW1iTmF2LmZvckVhY2goYmxvY2sgPT4gYmxvY2suc3R5bGUuZGlzcGxheSA9ICdub25lJyk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0YWJUaHVtYk5hdi5mb3JFYWNoKGJsb2NrID0+IGJsb2NrLnN0eWxlLmRpc3BsYXkgPSAnZmxleCcpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHJcbi8vIFBPUFVQXHJcbiAgICBjb25zdCBpbml0UG9wdXAgPSAocG9wdXBTZWxlY3RvciwgdHJpZ2dlclNlbGVjdG9yLCBiYWNrZHJvcFNlbGVjdG9yKSA9PiB7XHJcbiAgICAgICAgY29uc3QgcG9wdXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHBvcHVwU2VsZWN0b3IpO1xyXG4gICAgICAgIGlmKHBvcHVwID09IG51bGwpXHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuXHJcbiAgICAgICAgY29uc3QgdHJpZ2dlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodHJpZ2dlclNlbGVjdG9yKTtcclxuICAgICAgICBjb25zdCBiYWNrZHJvcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5iYWNrZHJvcCcpO1xyXG4gICAgICAgIGNvbnN0IGNsb3NlQnV0dG9uID0gcG9wdXAucXVlcnlTZWxlY3RvcignLnBvcHVwX2Nsb3NlJyk7XHJcblxyXG4gICAgICAgIGlmICghcG9wdXAgfHwgIXRyaWdnZXIgfHwgIWJhY2tkcm9wIHx8ICFjbG9zZUJ1dHRvbikge1xyXG4gICAgICAgICAgICBjb25zb2xlLndhcm4oXCLQntC00LjQvSDQtyDQtdC70LXQvNC10L3RgtGW0LIg0L3QtSDQt9C90LDQudC00LXQvdC+XCIsIHBvcHVwU2VsZWN0b3IsIHRyaWdnZXJTZWxlY3RvciwgYmFja2Ryb3BTZWxlY3Rvcik7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3Qgb3BlblBvcHVwID0gKCkgPT4ge1xyXG4gICAgICAgICAgICBwb3B1cC5jbGFzc0xpc3QuYWRkKCdvcGVuX21vZGFsJyk7XHJcbiAgICAgICAgICAgIGJhY2tkcm9wLmNsYXNzTGlzdC5hZGQoJ2VsLXZpc2libGUnKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBjb25zdCBjbG9zZVBvcHVwID0gKCkgPT4ge1xyXG4gICAgICAgICAgICBwb3B1cC5jbGFzc0xpc3QucmVtb3ZlKCdvcGVuX21vZGFsJyk7XHJcbiAgICAgICAgICAgIGJhY2tkcm9wLmNsYXNzTGlzdC5yZW1vdmUoJ2VsLXZpc2libGUnKTtcclxuICAgICAgICAgICAgaWYgKHdpbmRvdy5jbGVhckNvbnRhY3RGb3JtKSB7XHJcbiAgICAgICAgICAgICAgICB3aW5kb3cuY2xlYXJDb250YWN0Rm9ybSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0cmlnZ2VyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgb3BlblBvcHVwKTtcclxuICAgICAgICBjbG9zZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNsb3NlUG9wdXApO1xyXG4gICAgICAgIGJhY2tkcm9wLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY2xvc2VQb3B1cCk7XHJcbiAgICB9O1xyXG5cclxuICAgIGluaXRQb3B1cCgnLnBvcHVwX2NvbnRhY3RzJywgJy5idG5fY2FsbCcsICcuYmFja2Ryb3AnKTtcclxuICAgIGluaXRQb3B1cCgnLnBvcHVwX2xvY2F0aW9uJywgJy50cmlnZ2VyLXBvcHVwJywgJy5iYWNrZHJvcCcpO1xyXG5cclxuLy8gICAgTVVMVEkgU1RFUCBGT1JNXHJcbiAgICBjb25zdCBtc0Zvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubXVsdGktc3RlcC1mb3JtJyk7XHJcblxyXG4gICAgaWYgKG1zRm9ybSkge1xyXG4gICAgICAgIGxldCBhY3RpdmVJbmRleCA9IDA7XHJcbiAgICAgICAgY29uc3Qgc3RlcHNDaXJjbGUgPSBtc0Zvcm0ucXVlcnlTZWxlY3RvckFsbCgnLnByb2dyZXNzLXN0ZXAnKTtcclxuICAgICAgICBjb25zdCBzdGVwQ29udGVudCA9IG1zRm9ybS5xdWVyeVNlbGVjdG9yQWxsKCcuZm9ybV9fc3RlcCcpO1xyXG5cclxuICAgICAgICBjb25zdCBidG5zTmV4dCA9IG1zRm9ybS5xdWVyeVNlbGVjdG9yQWxsKCcuYnRuX25leHQnKTtcclxuICAgICAgICBjb25zdCBwcmV2QnRucyA9IG1zRm9ybS5xdWVyeVNlbGVjdG9yQWxsKCcuZm9ybV9fbmF2LWxpbmsnKTtcclxuXHJcbiAgICAgICAgY29uc3QgdGhZb3VQYWdlID0gbXNGb3JtLnF1ZXJ5U2VsZWN0b3IoJy50aGFua3MteW91LXBhZ2UnKTtcclxuXHJcbiAgICAgICAgc3RlcHNDaXJjbGVbYWN0aXZlSW5kZXhdLmNsYXNzTGlzdC5hZGQoJ3Byb2dyZXNzLXN0ZXBfYWN0aXZlJyk7XHJcbiAgICAgICAgc3RlcENvbnRlbnRbYWN0aXZlSW5kZXhdLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xyXG4gICAgICAgIHByZXZCdG5zW2FjdGl2ZUluZGV4XS5jbGFzc0xpc3QuYWRkKCdzaG93Jyk7XHJcblxyXG4gICAgICAgIGNvbnN0IGdvVG9TdGVwID0gKGFjdGl2ZUluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgIHN0ZXBDb250ZW50LmZvckVhY2goZWwgPT4gZWwuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJykpXHJcblxyXG4gICAgICAgICAgICBzdGVwc0NpcmNsZS5mb3JFYWNoKChlbCwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChpbmRleCA+IGFjdGl2ZUluZGV4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZWwuY2xhc3NMaXN0LnJlbW92ZSgncHJvZ3Jlc3Mtc3RlcF9hY3RpdmUnKVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBlbC5jbGFzc0xpc3QuYWRkKCdwcm9ncmVzcy1zdGVwX2FjdGl2ZScpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICBwcmV2QnRucy5mb3JFYWNoKChlbCwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChpbmRleCA+IGFjdGl2ZUluZGV4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZWwuY2xhc3NMaXN0LnJlbW92ZSgnc2hvdycpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBlbC5jbGFzc0xpc3QuYWRkKCdzaG93Jyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICBjb25zdCBhY3RpdmVDb250ZW50ID0gc3RlcENvbnRlbnRbYWN0aXZlSW5kZXhdO1xyXG4gICAgICAgICAgICBpZiAoYWN0aXZlQ29udGVudCkge1xyXG4gICAgICAgICAgICAgICAgYWN0aXZlQ29udGVudC5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB3aW5kb3cuY2xlYXJDb250YWN0Rm9ybSA9ICgpID0+IHtcclxuICAgICAgICAgICAgbXNGb3JtLnJlc2V0KCk7XHJcbiAgICAgICAgICAgIGFjdGl2ZUluZGV4ID0gMDtcclxuICAgICAgICAgICAgZ29Ub1N0ZXAoYWN0aXZlSW5kZXgpO1xyXG4gICAgICAgICAgICB0aFlvdVBhZ2UuY2xhc3NMaXN0LnJlbW92ZSgnc2hvdycpO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIGJ0bnNOZXh0LmZvckVhY2goYnRuID0+IGJ0bi5hZGRFdmVudExpc3RlbmVyKFxyXG4gICAgICAgICAgICAnY2xpY2snLCAoZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgYWN0aXZlSW5kZXggPSBhY3RpdmVJbmRleCArIDE7XHJcbiAgICAgICAgICAgICAgICBpZiAoYWN0aXZlSW5kZXggPCBzdGVwQ29udGVudC5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICAgICBnb1RvU3RlcChhY3RpdmVJbmRleCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGUudGFyZ2V0LnR5cGUgPT09ICdzdWJtaXQnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB0aFlvdVBhZ2UuY2xhc3NMaXN0LmFkZCgnc2hvdycpO1xyXG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjbG9zZVBvcHVwKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSwgMzAwMClcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICkpO1xyXG5cclxuICAgICAgICBwcmV2QnRucy5mb3JFYWNoKGJ0biA9PiBidG4uYWRkRXZlbnRMaXN0ZW5lcihcclxuICAgICAgICAgICAgJ2NsaWNrJywgKGUpID0+IHtcclxuICAgICAgICAgICAgICAgIGFjdGl2ZUluZGV4ID0gQXJyYXkuZnJvbShwcmV2QnRucykuZmluZEluZGV4KGVsID0+IGVsID09PSBlLnRhcmdldCk7XHJcblxyXG4gICAgICAgICAgICAgICAgZ29Ub1N0ZXAoYWN0aXZlSW5kZXgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgKSk7XHJcblxyXG4gICAgICAgIG1zRm9ybS5xdWVyeVNlbGVjdG9yQWxsKCcuanMtZm9ybS1maWVsZCcpLmZvckVhY2goZWwgPT4ge1xyXG4gICAgICAgICAgICBlbC5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsIChlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBhY3RpdmVTZXRDb250cm9scyA9IHN0ZXBDb250ZW50W2FjdGl2ZUluZGV4XS5xdWVyeVNlbGVjdG9yQWxsKCcuanMtZm9ybS1maWVsZCcpO1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgc3VibWl0QnRuID0gc3RlcENvbnRlbnRbYWN0aXZlSW5kZXhdLnF1ZXJ5U2VsZWN0b3IoJy5idG5fbmV4dCcpO1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCBkaXNhYmxlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBpZiAoYWN0aXZlSW5kZXggPT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZCA9IEFycmF5LmZyb20oYWN0aXZlU2V0Q29udHJvbHMpLmZpbHRlcihlbCA9PiBlbC5oYXNBdHRyaWJ1dGUoJ3JlcXVpcmVkJykpLnNvbWUoZWwgPT4gZWwudmFsdWUgPT09ICcnKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoYWN0aXZlSW5kZXggPT09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZCA9ICFBcnJheS5mcm9tKHN0ZXBDb250ZW50W2FjdGl2ZUluZGV4XS5xdWVyeVNlbGVjdG9yQWxsKCdbdHlwZT1cImNoZWNrYm94XCJdJykpLnNvbWUoZWwgPT4gZWwuY2hlY2tlZClcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoYWN0aXZlSW5kZXggPT09IDIpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBvdGhlckNpdHkgPSBtc0Zvcm0ucXVlcnlTZWxlY3RvcignW25hbWU9XCJvdGhlcl9jaXR5XCJdJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG90aGVyQ2l0eSA9PT0gZS50YXJnZXQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3RlcENvbnRlbnRbYWN0aXZlSW5kZXhdLnF1ZXJ5U2VsZWN0b3JBbGwoJ1t0eXBlPVwicmFkaW9cIl0nKS5mb3JFYWNoKGVsID0+IGVsLmNoZWNrZWQgPSBmYWxzZSlcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvdGhlckNpdHkudmFsdWUgPSAnJztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkID0gIUFycmF5LmZyb20oc3RlcENvbnRlbnRbYWN0aXZlSW5kZXhdLnF1ZXJ5U2VsZWN0b3JBbGwoJ1t0eXBlPVwicmFkaW9cIl0nKSkuc29tZShlbCA9PiBlbC5jaGVja2VkKSAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvdGhlckNpdHkudmFsdWUgPT09ICcnO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhtc0Zvcm0ucXVlcnlTZWxlY3RvcignW25hbWU9XCJvdGhlcl9jaXR5XCJdJykpXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgc3VibWl0QnRuLmRpc2FibGVkID0gZGlzYWJsZWRcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBidG5DbG9zVGhhbmtzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJ0bl9jbG9zZS10aGFua3MnKTtcclxuXHJcbiAgICBidG5DbG9zVGhhbmtzLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wb3B1cF9jb250YWN0cycpLmNsYXNzTGlzdC5yZW1vdmUoJ29wZW5fbW9kYWwnKTtcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYmFja2Ryb3AnKS5jbGFzc0xpc3QucmVtb3ZlKCdlbC12aXNpYmxlJyk7XHJcbiAgICB9KTtcclxuXHJcbi8vICAgIFNJREVCQVIgSE9WRVIgT1ZFUkxBWVxyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnNpZGViYXJfX25hdiAuZHJvcGRvd24nKS5mb3JFYWNoKGZ1bmN0aW9uIChlbGVtZW50KSB7XHJcbiAgICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWVudGVyJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2lkZWJhcl9fb3ZlcmxheScpLmNsYXNzTGlzdC5hZGQoJ3Nob3cnKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWxlYXZlJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2lkZWJhcl9fb3ZlcmxheScpLmNsYXNzTGlzdC5yZW1vdmUoJ3Nob3cnKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJyNhY2NvcmRpb24gLnBhbmVsX19oZWFkaW5nJykuZm9yRWFjaCgoaGVhZGluZykgPT4ge1xyXG4gICAgICAgIGhlYWRpbmcuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGlzT3BlbiA9IHRoaXMuY2xhc3NMaXN0LmNvbnRhaW5zKCdvcGVuJyk7XHJcbiAgICAgICAgICAgIGNvbnN0IGFsbFBhbmVscyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJyNhY2NvcmRpb24gLnBhbmVsX19oZWFkaW5nJyk7XHJcbiAgICAgICAgICAgIGNvbnN0IGFsbENvbnRlbnRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnBhbmVsLWNvbGxhcHNlJyk7XHJcblxyXG4gICAgICAgICAgICBhbGxQYW5lbHMuZm9yRWFjaChwYW5lbCA9PiBwYW5lbC5jbGFzc0xpc3QucmVtb3ZlKCdvcGVuJykpO1xyXG4gICAgICAgICAgICBhbGxDb250ZW50cy5mb3JFYWNoKGNvbnRlbnQgPT4gY29udGVudC5zdHlsZS5tYXhIZWlnaHQgPSBudWxsKTtcclxuXHJcbiAgICAgICAgICAgIGlmICghaXNPcGVuKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNsYXNzTGlzdC5hZGQoJ29wZW4nKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHBhbmVsQ29udGVudCA9IHRoaXMubmV4dEVsZW1lbnRTaWJsaW5nO1xyXG4gICAgICAgICAgICAgICAgcGFuZWxDb250ZW50LnN0eWxlLm1heEhlaWdodCA9IHBhbmVsQ29udGVudC5zY3JvbGxIZWlnaHQgKyAncHgnO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbi8vVEFCTEUgQ09MTEFQU0UgUk9XXHJcbiAgICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRlY2gtY2hhcmFjdF9fcm93JykpIHtcclxuICAgICAgICBjb25zdCBtYXhWaXNpYmxlUm93cyA9IDU7XHJcbiAgICAgICAgY29uc3Qgcm93cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy50ZWNoLWNoYXJhY3RfX3JvdycpO1xyXG4gICAgICAgIGNvbnN0IHNob3dNb3JlQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJ0bl9tb3JlJyk7XHJcblxyXG4gICAgICAgIGlmIChyb3dzLmxlbmd0aCA+IG1heFZpc2libGVSb3dzKSB7XHJcbiAgICAgICAgICAgIHNob3dNb3JlQnRuLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xyXG5cclxuICAgICAgICAgICAgcm93cy5mb3JFYWNoKChyb3csIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoaW5kZXggPj0gbWF4VmlzaWJsZVJvd3MpIHtcclxuICAgICAgICAgICAgICAgICAgICByb3cuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHNob3dNb3JlQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgcm93cy5mb3JFYWNoKHJvdyA9PiByb3cuc3R5bGUuZGlzcGxheSA9ICcnKTtcclxuXHJcbiAgICAgICAgICAgICAgICBzaG93TW9yZUJ0bi5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG59KTtcclxuXHJcbiJdLCJmaWxlIjoibWFpbi5qcyJ9
