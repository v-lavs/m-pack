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

    if (document.querySelector('#product-slider')) {
        const productSlider = new Swiper('#product-slider ', {
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
    if (document.querySelector('#product-slider-3col')) {
        const productSlider_3col = new Swiper('#product-slider-3col ', {
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
                991: {
                    slidesPerView: 3,
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


//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJtYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qXHJcbiogdG8gaW5jbHVkZSBqcyBmaWxlIHdyaXRlOiBgLy89IGluY2x1ZGUgLi9wYXRoLXRvLWZpbGVgXHJcbiogKi9cclxuXHJcbi8vIENVU1RPTSBTQ1JJUFRTXHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmdW5jdGlvbiAoKSB7XHJcblxyXG4vLyBTQ1JPTEwgVE8gQU5DSE9SXHJcbiAgICBmdW5jdGlvbiBzbW9vdGhTY3JvbGxUb0FuY2hvcihzZWxlY3RvciwgaGVhZGVyU2VsZWN0b3IsIGhlYWRlclBhZ2VTZWxlY3Rvcikge1xyXG4gICAgICAgIGxldCBoZWFkZXJQYWdlSGVpZ2h0ID0gMDtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gZGVsYXkobXMpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4gc2V0VGltZW91dChyZXNvbHZlLCBtcykpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgYXN5bmMgZnVuY3Rpb24gdXBkYXRlSGVhZGVySGVpZ2h0V2l0aERlbGF5KCkge1xyXG4gICAgICAgICAgICBhd2FpdCBkZWxheSgxMDApOyAvLyDQl9Cw0YLRgNC40LzQutCwIDEwMCDQvNGBXHJcbiAgICAgICAgICAgIGNvbnN0IGhlYWRlclBhZ2VFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihoZWFkZXJQYWdlU2VsZWN0b3IpO1xyXG4gICAgICAgICAgICBpZiAoaGVhZGVyUGFnZUVsZW1lbnQpIHtcclxuICAgICAgICAgICAgICAgIGhlYWRlclBhZ2VIZWlnaHQgPSBoZWFkZXJQYWdlRWxlbWVudC5jbGllbnRIZWlnaHQgfHwgMDtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdVcGRhdGVkIGhlYWRlclBhZ2VIZWlnaHQgd2l0aCBkZWxheTonLCBoZWFkZXJQYWdlSGVpZ2h0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgaGVhZGVyUGFnZUVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGhlYWRlclBhZ2VTZWxlY3Rvcik7XHJcbiAgICAgICAgaWYgKGhlYWRlclBhZ2VFbGVtZW50KSB7XHJcbiAgICAgICAgICAgIGNvbnN0IG9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoYXN5bmMgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgYXdhaXQgdXBkYXRlSGVhZGVySGVpZ2h0V2l0aERlbGF5KCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgb2JzZXJ2ZXIub2JzZXJ2ZShoZWFkZXJQYWdlRWxlbWVudCwge1xyXG4gICAgICAgICAgICAgICAgYXR0cmlidXRlczogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIGNoaWxkTGlzdDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBzdWJ0cmVlOiBmYWxzZSxcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB1cGRhdGVIZWFkZXJIZWlnaHRXaXRoRGVsYXkoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpLmZvckVhY2goKGVsZW1lbnQpID0+IHtcclxuICAgICAgICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGFzeW5jIGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgYW5jaG9yID0gdGhpcy5nZXRBdHRyaWJ1dGUoJ2hyZWYnKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoYW5jaG9yLnN0YXJ0c1dpdGgoJyMnKSAmJiBhbmNob3IgIT09ICcjJykge1xyXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdGFyZ2V0RWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYW5jaG9yKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBoZWFkZXJFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihoZWFkZXJTZWxlY3Rvcik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0YXJnZXRFbGVtZW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uIGdldEVsZW1lbnRPZmZzZXRUb3AoZWxlbWVudCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVjdCA9IGVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBzY3JvbGxUb3AgPSB3aW5kb3cucGFnZVlPZmZzZXQgfHwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZWN0LnRvcCArIHNjcm9sbFRvcDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgYXdhaXQgZGVsYXkoMTAwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgdGFyZ2V0UG9zaXRpb24gPSBnZXRFbGVtZW50T2Zmc2V0VG9wKHRhcmdldEVsZW1lbnQpIC0gKCh3aW5kb3cuaW5uZXJXaWR0aCA8PSA5OTEgPyA5MCA6IDEwKSArIGhlYWRlclBhZ2VIZWlnaHQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnU2Nyb2xsIHRvIHBvc2l0aW9uIHdpdGggZGVsYXk6JywgdGFyZ2V0UG9zaXRpb24pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3cuc2Nyb2xsVG8oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9wOiB0YXJnZXRQb3NpdGlvbixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJlaGF2aW9yOiAnc21vb3RoJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHNtb290aFNjcm9sbFRvQW5jaG9yKCcuc2Nyb2xsLXRvLWFuY2hvciBhJywgJy5oZWFkZXInLCAnLnBhZ2VfX2hlYWRlcicpO1xyXG5cclxuXHJcbi8vIE1PQklMRSBNRU5VXHJcbiAgICBjb25zdCBzaWRlYmFyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNpZGViYXInKTtcclxuICAgIGNvbnN0IGhlYWRlclNiT3AgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaGVhZGVyJyk7XHJcbiAgICBjb25zdCBidG5CdXJnZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYnRuLWJ1cmdlcicpO1xyXG4gICAgY29uc3QgbWVudUxpbmtzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnNpZGViYXIgLm1lbnVfX2xpbmsnKTtcclxuICAgIGNvbnN0IG92ZXJsYXkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2lkZWJhcl9fb3ZlcmxheScpO1xyXG4gICAgY29uc3QgYnRuQ2FsbFNiID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJ0bl9jYWxsJyk7XHJcblxyXG4gICAgYnRuQnVyZ2VyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgc2lkZWJhci5jbGFzc0xpc3QudG9nZ2xlKCdvcGVuJyk7XHJcbiAgICAgICAgaGVhZGVyU2JPcC5jbGFzc0xpc3QudG9nZ2xlKCdvcGVuJyk7XHJcbiAgICAgICAgb3ZlcmxheS5jbGFzc0xpc3QudG9nZ2xlKCdlbC12aXNpYmxlJyk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBtZW51TGlua3MuZm9yRWFjaChmdW5jdGlvbiAobGluaykge1xyXG4gICAgICAgIGxpbmsuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHNpZGViYXIuY2xhc3NMaXN0LnJlbW92ZSgnb3BlbicpO1xyXG4gICAgICAgICAgICBvdmVybGF5LmNsYXNzTGlzdC5yZW1vdmUoJ2VsLXZpc2libGUnKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIG92ZXJsYXkuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgc2lkZWJhci5jbGFzc0xpc3QucmVtb3ZlKCdvcGVuJyk7XHJcbiAgICAgICAgb3ZlcmxheS5jbGFzc0xpc3QucmVtb3ZlKCdlbC12aXNpYmxlJyk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBidG5DYWxsU2IuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgc2lkZWJhci5jbGFzc0xpc3QucmVtb3ZlKCdvcGVuJyk7XHJcbiAgICAgICAgb3ZlcmxheS5jbGFzc0xpc3QucmVtb3ZlKCdlbC12aXNpYmxlJyk7XHJcbiAgICB9KTtcclxuXHJcbi8vU1RJQ0tZIEhFQURFUiBQQUdFXHJcblxyXG4gICAgY29uc3Qgc3RpY2t5RWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wYWdlX19oZWFkZXInKTtcclxuICAgIGxldCBzdGlja3lPZmZzZXQgPSAwO1xyXG5cclxuICAgIGZ1bmN0aW9uIHVwZGF0ZVN0aWNreUJhbm5lck9mZnNldCgpIHtcclxuICAgICAgICBjb25zdCBwYWdlQmFubmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNlY3Rpb24tYmFubmVyJyk7XHJcblxyXG4gICAgICAgIGlmIChwYWdlQmFubmVyKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGJhbm5lckggPSBwYWdlQmFubmVyLm9mZnNldEhlaWdodDtcclxuICAgICAgICAgICAgY29uc3Qgc3RpY2t5SCA9IHN0aWNreUVsZW1lbnQub2Zmc2V0SGVpZ2h0O1xyXG5cclxuICAgICAgICAgICAgY29uc3QgbW9iaWxlT2Zmc2V0ID0gd2luZG93LmlubmVyV2lkdGggPD0gOTkxID8gODAgOiAwO1xyXG5cclxuICAgICAgICAgICAgc3RpY2t5T2Zmc2V0ID0gYmFubmVySCAtIHN0aWNreUggLSBtb2JpbGVPZmZzZXQ7XHJcblxyXG4gICAgICAgICAgICBpZiAod2luZG93LnBhZ2VZT2Zmc2V0ID49IHN0aWNreU9mZnNldCkge1xyXG4gICAgICAgICAgICAgICAgc3RpY2t5RWxlbWVudC5jbGFzc0xpc3QuYWRkKCdzdGlja3knKTtcclxuICAgICAgICAgICAgICAgIHN0aWNreU9mZnNldCA9IHN0aWNreUVsZW1lbnQub2Zmc2V0VG9wO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgc3RpY2t5RWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdzdGlja3knKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgdXBkYXRlU3RpY2t5QmFubmVyT2Zmc2V0KTtcclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgdXBkYXRlU3RpY2t5QmFubmVyT2Zmc2V0KTtcclxuXHJcbiAgICBjb25zdCBiYW5uZXJUaHVtYiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2VjdGlvbi1iYW5uZXJfX3RodW1iXCIpO1xyXG4gICAgY29uc3QgYmFubmVyVGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucGFnZS10aXRsZScpO1xyXG5cclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwic2Nyb2xsXCIsICgpID0+IHtcclxuICAgICAgICB1cGRhdGVTdGlja3lCYW5uZXJPZmZzZXQoKVxyXG5cclxuICAgICAgICBpZiAoYmFubmVyVGh1bWIgJiYgYmFubmVyVGl0bGUpIHtcclxuICAgICAgICAgICAgaWYgKHdpbmRvdy5zY3JvbGxZID4gMCkge1xyXG4gICAgICAgICAgICAgICAgYmFubmVyVGh1bWIuY2xhc3NMaXN0LmFkZChcImhpZGUtdGh1bWJcIik7XHJcbiAgICAgICAgICAgICAgICBiYW5uZXJUaXRsZS5jbGFzc0xpc3QuYWRkKFwic21hbGwtdGl0bGVcIik7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBiYW5uZXJUaHVtYi5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZS10aHVtYlwiKTtcclxuICAgICAgICAgICAgICAgIGJhbm5lclRpdGxlLmNsYXNzTGlzdC5yZW1vdmUoXCJzbWFsbC10aXRsZVwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuLy8gc3RpY2t5T2Zmc2V0IC0gODBcclxuLy9TTElERVJcclxuXHJcbiAgICBjb25zdCBzd2lwZXJJbmZvID0gbmV3IFN3aXBlcignLnN3aXBlci1pbmZvJywge1xyXG4gICAgICAgIHBhZ2luYXRpb246IHtcclxuICAgICAgICAgICAgZWw6ICcuc3dpcGVyLWluZm8gLnN3aXBlci1wYWdpbmF0aW9uJyxcclxuICAgICAgICAgICAgY2xpY2thYmxlOiB0cnVlLFxyXG4gICAgICAgIH0sXHJcbiAgICB9KTtcclxuXHJcbiAgICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2R1Y3Qtc2xpZGVyJykpIHtcclxuICAgICAgICBjb25zdCBwcm9kdWN0U2xpZGVyID0gbmV3IFN3aXBlcignI3Byb2R1Y3Qtc2xpZGVyICcsIHtcclxuICAgICAgICAgICAgcGFnaW5hdGlvbjoge1xyXG4gICAgICAgICAgICAgICAgZWw6ICcucHJvZHVjdC1zbGlkZXIgLnN3aXBlci1wYWdpbmF0aW9uJyxcclxuICAgICAgICAgICAgICAgIGNsaWNrYWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIGR5bmFtaWNCdWxsZXRzOiB0cnVlLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBuYXZpZ2F0aW9uOiB7XHJcbiAgICAgICAgICAgICAgICBuZXh0RWw6IFwiLnN3aXBlci1idXR0b24tbmV4dFwiLFxyXG4gICAgICAgICAgICAgICAgcHJldkVsOiBcIi5zd2lwZXItYnV0dG9uLXByZXZcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgYnJlYWtwb2ludHM6IHtcclxuICAgICAgICAgICAgICAgIDU3Nzoge1xyXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1BlclZpZXc6IDIsXHJcbiAgICAgICAgICAgICAgICAgICAgc3BhY2VCZXR3ZWVuOiAxNlxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9kdWN0LXNsaWRlci0zY29sJykpIHtcclxuICAgICAgICBjb25zdCBwcm9kdWN0U2xpZGVyXzNjb2wgPSBuZXcgU3dpcGVyKCcjcHJvZHVjdC1zbGlkZXItM2NvbCAnLCB7XHJcbiAgICAgICAgICAgIHBhZ2luYXRpb246IHtcclxuICAgICAgICAgICAgICAgIGVsOiAnLnByb2R1Y3Qtc2xpZGVyIC5zd2lwZXItcGFnaW5hdGlvbicsXHJcbiAgICAgICAgICAgICAgICBjbGlja2FibGU6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBkeW5hbWljQnVsbGV0czogdHJ1ZSxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgbmF2aWdhdGlvbjoge1xyXG4gICAgICAgICAgICAgICAgbmV4dEVsOiBcIi5zd2lwZXItYnV0dG9uLW5leHRcIixcclxuICAgICAgICAgICAgICAgIHByZXZFbDogXCIuc3dpcGVyLWJ1dHRvbi1wcmV2XCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGJyZWFrcG9pbnRzOiB7XHJcbiAgICAgICAgICAgICAgICA1Nzc6IHtcclxuICAgICAgICAgICAgICAgICAgICBzbGlkZXNQZXJWaWV3OiAyLFxyXG4gICAgICAgICAgICAgICAgICAgIHNwYWNlQmV0d2VlbjogMTZcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICA5OTE6IHtcclxuICAgICAgICAgICAgICAgICAgICBzbGlkZXNQZXJWaWV3OiAzLFxyXG4gICAgICAgICAgICAgICAgICAgIHNwYWNlQmV0d2VlbjogMTZcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY2FyZHMtc2xpZGVyJykpIHtcclxuICAgICAgICBjb25zdCBjYXJkU2xpZGVyID0gbmV3IFN3aXBlcignLmNhcmRzLXNsaWRlciAnLCB7XHJcbiAgICAgICAgICAgIHBhZ2luYXRpb246IHtcclxuICAgICAgICAgICAgICAgIGVsOiAnLmNhcmRzLXNsaWRlciAuc3dpcGVyLXBhZ2luYXRpb24nLFxyXG4gICAgICAgICAgICAgICAgY2xpY2thYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBuYXZpZ2F0aW9uOiB7XHJcbiAgICAgICAgICAgICAgICBuZXh0RWw6IFwiLnN3aXBlci1idXR0b24tbmV4dFwiLFxyXG4gICAgICAgICAgICAgICAgcHJldkVsOiBcIi5zd2lwZXItYnV0dG9uLXByZXZcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgYnJlYWtwb2ludHM6IHtcclxuICAgICAgICAgICAgICAgIDU3Nzoge1xyXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1BlclZpZXc6IDIsXHJcbiAgICAgICAgICAgICAgICAgICAgc3BhY2VCZXR3ZWVuOiAxNixcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZ3JlZW4tc2xpZGVyJykpIHtcclxuICAgICAgICBjb25zdCBncmVlblNsaWRlciA9IG5ldyBTd2lwZXIoJy5ncmVlbi1zbGlkZXInLCB7XHJcbiAgICAgICAgICAgIHBhZ2luYXRpb246IHtcclxuICAgICAgICAgICAgICAgIGVsOiAnLmdyZWVuLXNsaWRlciAuc3dpcGVyLXBhZ2luYXRpb24nLFxyXG4gICAgICAgICAgICAgICAgY2xpY2thYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBuYXZpZ2F0aW9uOiB7XHJcbiAgICAgICAgICAgICAgICBuZXh0RWw6IFwiLnN3aXBlci1idXR0b24tbmV4dFwiLFxyXG4gICAgICAgICAgICAgICAgcHJldkVsOiBcIi5zd2lwZXItYnV0dG9uLXByZXZcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2xpZGVyLTQtY29sJykpIHtcclxuICAgICAgICBjb25zdCBzbGlkZXI0Q29sID0gbmV3IFN3aXBlcignLnNsaWRlci00LWNvbCcsIHtcclxuICAgICAgICAgICAgc2xpZGVzUGVyVmlldzogMSxcclxuICAgICAgICAgICAgcGFnaW5hdGlvbjoge1xyXG4gICAgICAgICAgICAgICAgZWw6ICcuc2xpZGVyLTQtY29sIC5zd2lwZXItcGFnaW5hdGlvbicsXHJcbiAgICAgICAgICAgICAgICBjbGlja2FibGU6IHRydWUsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIG5hdmlnYXRpb246IHtcclxuICAgICAgICAgICAgICAgIG5leHRFbDogXCIuc2xpZGVyLTQtY29sIC5zd2lwZXItYnV0dG9uLW5leHRcIixcclxuICAgICAgICAgICAgICAgIHByZXZFbDogXCIuc2xpZGVyLTQtY29sIC5zd2lwZXItYnV0dG9uLXByZXZcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgYnJlYWtwb2ludHM6IHtcclxuICAgICAgICAgICAgICAgIDU3Nzoge1xyXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1BlclZpZXc6IDIsXHJcbiAgICAgICAgICAgICAgICAgICAgc3BhY2VCZXR3ZWVuOiAxNlxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIDc2Nzoge1xyXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1BlclZpZXc6IDMsXHJcbiAgICAgICAgICAgICAgICAgICAgc3BhY2VCZXR3ZWVuOiAxNlxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIDk5MToge1xyXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1BlclZpZXc6IDQsXHJcbiAgICAgICAgICAgICAgICAgICAgc3BhY2VCZXR3ZWVuOiAxNlxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zbGlkZXItZ2FsbGVyeTInKSkge1xyXG4gICAgICAgIGNvbnN0IHNsaWRlckdhbGxlcnkyID0gbmV3IFN3aXBlcignLnNsaWRlci1nYWxsZXJ5MiAnLCB7XHJcbiAgICAgICAgICAgIHNwYWNlQmV0d2VlbjogMTYsXHJcbiAgICAgICAgICAgIG5hdmlnYXRpb246IHtcclxuICAgICAgICAgICAgICAgIG5leHRFbDogXCIuc2xpZGVyLWdhbGxlcnkyIC5zd2lwZXItYnV0dG9uLW5leHRcIixcclxuICAgICAgICAgICAgICAgIHByZXZFbDogXCIuc2xpZGVyLWdhbGxlcnkyIC5zd2lwZXItYnV0dG9uLXByZXZcIixcclxuICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgalF1ZXJ5KCdib2R5Jykub24oJ2NsaWNrJywgJy5wcm9kdWN0LWZlYXR1cmVfX3RodW1iJywgZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICBqUXVlcnkodGhpcykuc2libGluZ3MoJy5wcm9kdWN0LWZlYXR1cmVfX3RodW1iJykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgICAgIGpRdWVyeSh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKS5maW5kKCcucHJvZHVjdC1mZWF0dXJlX19jb250ZW50IC50YWItY29udGVudCcpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcclxuXHJcbiAgICAgICAgalF1ZXJ5KHRoaXMpLmFkZENsYXNzKCdhY3RpdmUnKTtcclxuXHJcbiAgICAgICAgbGV0IHRhcmdldElkID0galF1ZXJ5KHRoaXMpLmF0dHIoJ2RhdGFUYXJnZXQnKTtcclxuICAgICAgICBqUXVlcnkodGFyZ2V0SWQpLmFkZENsYXNzKCdhY3RpdmUnKTtcclxuICAgIH0pO1xyXG5cclxuLy9UQUJTXHJcbiAgICBjb25zdCB0YWJMaW5rcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy50YWJzX19uYXYtbGluaycpO1xyXG5cclxuICAgIGZ1bmN0aW9uIGZpbmRQYXJlbnQoZWwsIHBhcmVudENsYXNzTmFtZSkge1xyXG4gICAgICAgIGlmICghZWwpIHJldHVybiBkb2N1bWVudC5ib2R5O1xyXG4gICAgICAgIC8vIFN0YXJ0IGZyb20gdGhlIGN1cnJlbnQgZWxlbWVudFxyXG4gICAgICAgIGxldCBpZ25vcmVDbGlja091dHNpZGUgPSBlbC5jbGFzc0xpc3QuY29udGFpbnMocGFyZW50Q2xhc3NOYW1lKTtcclxuICAgICAgICBsZXQgcGFyZW50RWwgPSBlbC5wYXJlbnRFbGVtZW50O1xyXG5cclxuICAgICAgICAvLyBMb29wIHVudGlsIHdlIHJlYWNoIHRoZSB0b3Agb2YgdGhlIERPTVxyXG4gICAgICAgIHdoaWxlICghaWdub3JlQ2xpY2tPdXRzaWRlICYmIHBhcmVudEVsKSB7XHJcbiAgICAgICAgICAgIC8vIE1vdmUgdXAgdG8gdGhlIHBhcmVudCBlbGVtZW50XHJcbiAgICAgICAgICAgIGlnbm9yZUNsaWNrT3V0c2lkZSA9IHBhcmVudEVsLmNsYXNzTGlzdC5jb250YWlucyhwYXJlbnRDbGFzc05hbWUpO1xyXG4gICAgICAgICAgICBpZiAoIWlnbm9yZUNsaWNrT3V0c2lkZSkge1xyXG4gICAgICAgICAgICAgICAgcGFyZW50RWwgPSBwYXJlbnRFbC5wYXJlbnRFbGVtZW50O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gcGFyZW50RWw7XHJcbiAgICB9XHJcblxyXG4gICAgdGFiTGlua3MuZm9yRWFjaChsaW5rID0+IHtcclxuICAgICAgICBsaW5rLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcclxuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICBjb25zdCBwYXJlbnQgPSBmaW5kUGFyZW50KGUudGFyZ2V0LCAndGFicycpO1xyXG5cclxuICAgICAgICAgICAgY29uc3QgdGFiTGlua3MgPSBwYXJlbnQucXVlcnlTZWxlY3RvckFsbCgnLnRhYnNfX25hdi1saW5rJyk7XHJcbiAgICAgICAgICAgIGNvbnN0IHRhYkNvbnRlbnRzID0gcGFyZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy50YWItY29udGVudCcpO1xyXG5cclxuICAgICAgICAgICAgdGFiTGlua3MuZm9yRWFjaChsaW5rID0+IGxpbmsuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJykpO1xyXG4gICAgICAgICAgICB0YWJDb250ZW50cy5mb3JFYWNoKGNvbnRlbnQgPT4gY29udGVudC5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKSk7XHJcbiAgICAgICAgICAgIGxpbmsuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XHJcblxyXG4gICAgICAgICAgICBjb25zdCB0YXJnZXRJZCA9IGxpbmsuZ2V0QXR0cmlidXRlKCdkYXRhVGFyZ2V0Jykuc3Vic3RyaW5nKDEpO1xyXG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0YXJnZXRJZCkuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbi8vQkxPQ0sgRkVBVFVSRSBQUk9EVUNUXHJcbiAgICBjb25zdCB0aHVtYk5hdkJsb2NrID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnByb2R1Y3QtZmVhdHVyZV9fbmF2Jyk7XHJcbiAgICBjb25zdCB0YWJUaHVtYk5hdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5wcm9kdWN0LWZlYXR1cmVfX3RodW1iJyk7XHJcblxyXG4gICAgdGFiVGh1bWJOYXYuZm9yRWFjaChsaW5rID0+IHtcclxuICAgICAgICBpZiAod2luZG93LmlubmVyV2lkdGggPiA3NjcpIHtcclxuICAgICAgICAgICAgbGluay5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBwYXJlbnQgPSBmaW5kUGFyZW50KGUudGFyZ2V0LCAncHJvZHVjdC1mZWF0dXJlJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgY29uc3QgdGFiVGh1bWJOYXYgPSBwYXJlbnQucXVlcnlTZWxlY3RvckFsbCgnLnByb2R1Y3QtZmVhdHVyZV9fdGh1bWInKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHRhYkNvbnRlbnRzID0gcGFyZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5mZWF0dXJlLWNvbnRlbnQnKTtcclxuICAgICAgICAgICAgICAgIGlmKHRhYlRodW1iTmF2WzBdKXtcclxuICAgICAgICAgICAgICAgICAgICB0YWJUaHVtYk5hdlswXS5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRhYlRodW1iTmF2LmZvckVhY2gobGluayA9PiBsaW5rLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpKTtcclxuICAgICAgICAgICAgICAgIHRhYkNvbnRlbnRzLmZvckVhY2goY29udGVudCA9PiBjb250ZW50LmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpKTtcclxuICAgICAgICAgICAgICAgIGxpbmsuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgY29uc3QgdGFyZ2V0SWQgPSBsaW5rLmdldEF0dHJpYnV0ZSgnZGF0YVRhcmdldCcpO1xyXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGFyZ2V0SWQpLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAodGh1bWJOYXZCbG9jaykge1xyXG4gICAgICAgICAgICAgICAgdGFiVGh1bWJOYXYuZm9yRWFjaChibG9jayA9PiBibG9jay5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRhYlRodW1iTmF2LmZvckVhY2goYmxvY2sgPT4gYmxvY2suc3R5bGUuZGlzcGxheSA9ICdmbGV4Jyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxuLy8gUE9QVVBcclxuICAgIGNvbnN0IGluaXRQb3B1cCA9IChwb3B1cFNlbGVjdG9yLCB0cmlnZ2VyU2VsZWN0b3IsIGJhY2tkcm9wU2VsZWN0b3IpID0+IHtcclxuICAgICAgICBjb25zdCBwb3B1cCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IocG9wdXBTZWxlY3Rvcik7XHJcbiAgICAgICAgaWYocG9wdXAgPT0gbnVsbClcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG5cclxuICAgICAgICBjb25zdCB0cmlnZ2VyID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0cmlnZ2VyU2VsZWN0b3IpO1xyXG4gICAgICAgIGNvbnN0IGJhY2tkcm9wID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJhY2tkcm9wJyk7XHJcbiAgICAgICAgY29uc3QgY2xvc2VCdXR0b24gPSBwb3B1cC5xdWVyeVNlbGVjdG9yKCcucG9wdXBfY2xvc2UnKTtcclxuXHJcbiAgICAgICAgaWYgKCFwb3B1cCB8fCAhdHJpZ2dlciB8fCAhYmFja2Ryb3AgfHwgIWNsb3NlQnV0dG9uKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihcItCe0LTQuNC9INC3INC10LvQtdC80LXQvdGC0ZbQsiDQvdC1INC30L3QsNC50LTQtdC90L5cIiwgcG9wdXBTZWxlY3RvciwgdHJpZ2dlclNlbGVjdG9yLCBiYWNrZHJvcFNlbGVjdG9yKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBvcGVuUG9wdXAgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIHBvcHVwLmNsYXNzTGlzdC5hZGQoJ29wZW5fbW9kYWwnKTtcclxuICAgICAgICAgICAgYmFja2Ryb3AuY2xhc3NMaXN0LmFkZCgnZWwtdmlzaWJsZScpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGNvbnN0IGNsb3NlUG9wdXAgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIHBvcHVwLmNsYXNzTGlzdC5yZW1vdmUoJ29wZW5fbW9kYWwnKTtcclxuICAgICAgICAgICAgYmFja2Ryb3AuY2xhc3NMaXN0LnJlbW92ZSgnZWwtdmlzaWJsZScpO1xyXG4gICAgICAgICAgICBpZiAod2luZG93LmNsZWFyQ29udGFjdEZvcm0pIHtcclxuICAgICAgICAgICAgICAgIHdpbmRvdy5jbGVhckNvbnRhY3RGb3JtKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIHRyaWdnZXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBvcGVuUG9wdXApO1xyXG4gICAgICAgIGNsb3NlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY2xvc2VQb3B1cCk7XHJcbiAgICAgICAgYmFja2Ryb3AuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjbG9zZVBvcHVwKTtcclxuICAgIH07XHJcblxyXG4gICAgaW5pdFBvcHVwKCcucG9wdXBfY29udGFjdHMnLCAnLmJ0bl9jYWxsJywgJy5iYWNrZHJvcCcpO1xyXG4gICAgaW5pdFBvcHVwKCcucG9wdXBfbG9jYXRpb24nLCAnLnRyaWdnZXItcG9wdXAnLCAnLmJhY2tkcm9wJyk7XHJcblxyXG4vLyAgICBNVUxUSSBTVEVQIEZPUk1cclxuICAgIGNvbnN0IG1zRm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tdWx0aS1zdGVwLWZvcm0nKTtcclxuXHJcbiAgICBpZiAobXNGb3JtKSB7XHJcbiAgICAgICAgbGV0IGFjdGl2ZUluZGV4ID0gMDtcclxuICAgICAgICBjb25zdCBzdGVwc0NpcmNsZSA9IG1zRm9ybS5xdWVyeVNlbGVjdG9yQWxsKCcucHJvZ3Jlc3Mtc3RlcCcpO1xyXG4gICAgICAgIGNvbnN0IHN0ZXBDb250ZW50ID0gbXNGb3JtLnF1ZXJ5U2VsZWN0b3JBbGwoJy5mb3JtX19zdGVwJyk7XHJcblxyXG4gICAgICAgIGNvbnN0IGJ0bnNOZXh0ID0gbXNGb3JtLnF1ZXJ5U2VsZWN0b3JBbGwoJy5idG5fbmV4dCcpO1xyXG4gICAgICAgIGNvbnN0IHByZXZCdG5zID0gbXNGb3JtLnF1ZXJ5U2VsZWN0b3JBbGwoJy5mb3JtX19uYXYtbGluaycpO1xyXG5cclxuICAgICAgICBjb25zdCB0aFlvdVBhZ2UgPSBtc0Zvcm0ucXVlcnlTZWxlY3RvcignLnRoYW5rcy15b3UtcGFnZScpO1xyXG5cclxuICAgICAgICBzdGVwc0NpcmNsZVthY3RpdmVJbmRleF0uY2xhc3NMaXN0LmFkZCgncHJvZ3Jlc3Mtc3RlcF9hY3RpdmUnKTtcclxuICAgICAgICBzdGVwQ29udGVudFthY3RpdmVJbmRleF0uY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XHJcbiAgICAgICAgcHJldkJ0bnNbYWN0aXZlSW5kZXhdLmNsYXNzTGlzdC5hZGQoJ3Nob3cnKTtcclxuXHJcbiAgICAgICAgY29uc3QgZ29Ub1N0ZXAgPSAoYWN0aXZlSW5kZXgpID0+IHtcclxuICAgICAgICAgICAgc3RlcENvbnRlbnQuZm9yRWFjaChlbCA9PiBlbC5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKSlcclxuXHJcbiAgICAgICAgICAgIHN0ZXBzQ2lyY2xlLmZvckVhY2goKGVsLCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGluZGV4ID4gYWN0aXZlSW5kZXgpIHtcclxuICAgICAgICAgICAgICAgICAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKCdwcm9ncmVzcy1zdGVwX2FjdGl2ZScpXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGVsLmNsYXNzTGlzdC5hZGQoJ3Byb2dyZXNzLXN0ZXBfYWN0aXZlJylcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgIHByZXZCdG5zLmZvckVhY2goKGVsLCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGluZGV4ID4gYWN0aXZlSW5kZXgpIHtcclxuICAgICAgICAgICAgICAgICAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKCdzaG93Jyk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGVsLmNsYXNzTGlzdC5hZGQoJ3Nob3cnKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGFjdGl2ZUNvbnRlbnQgPSBzdGVwQ29udGVudFthY3RpdmVJbmRleF07XHJcbiAgICAgICAgICAgIGlmIChhY3RpdmVDb250ZW50KSB7XHJcbiAgICAgICAgICAgICAgICBhY3RpdmVDb250ZW50LmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHdpbmRvdy5jbGVhckNvbnRhY3RGb3JtID0gKCkgPT4ge1xyXG4gICAgICAgICAgICBtc0Zvcm0ucmVzZXQoKTtcclxuICAgICAgICAgICAgYWN0aXZlSW5kZXggPSAwO1xyXG4gICAgICAgICAgICBnb1RvU3RlcChhY3RpdmVJbmRleCk7XHJcbiAgICAgICAgICAgIHRoWW91UGFnZS5jbGFzc0xpc3QucmVtb3ZlKCdzaG93Jyk7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgYnRuc05leHQuZm9yRWFjaChidG4gPT4gYnRuLmFkZEV2ZW50TGlzdGVuZXIoXHJcbiAgICAgICAgICAgICdjbGljaycsIChlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBhY3RpdmVJbmRleCA9IGFjdGl2ZUluZGV4ICsgMTtcclxuICAgICAgICAgICAgICAgIGlmIChhY3RpdmVJbmRleCA8IHN0ZXBDb250ZW50Lmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGdvVG9TdGVwKGFjdGl2ZUluZGV4KTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoZS50YXJnZXQudHlwZSA9PT0gJ3N1Ym1pdCcpIHtcclxuICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRoWW91UGFnZS5jbGFzc0xpc3QuYWRkKCdzaG93Jyk7XHJcbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsb3NlUG9wdXAoKTtcclxuICAgICAgICAgICAgICAgICAgICB9LCAzMDAwKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgKSk7XHJcblxyXG4gICAgICAgIHByZXZCdG5zLmZvckVhY2goYnRuID0+IGJ0bi5hZGRFdmVudExpc3RlbmVyKFxyXG4gICAgICAgICAgICAnY2xpY2snLCAoZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgYWN0aXZlSW5kZXggPSBBcnJheS5mcm9tKHByZXZCdG5zKS5maW5kSW5kZXgoZWwgPT4gZWwgPT09IGUudGFyZ2V0KTtcclxuXHJcbiAgICAgICAgICAgICAgICBnb1RvU3RlcChhY3RpdmVJbmRleCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICApKTtcclxuXHJcbiAgICAgICAgbXNGb3JtLnF1ZXJ5U2VsZWN0b3JBbGwoJy5qcy1mb3JtLWZpZWxkJykuZm9yRWFjaChlbCA9PiB7XHJcbiAgICAgICAgICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgKGUpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGFjdGl2ZVNldENvbnRyb2xzID0gc3RlcENvbnRlbnRbYWN0aXZlSW5kZXhdLnF1ZXJ5U2VsZWN0b3JBbGwoJy5qcy1mb3JtLWZpZWxkJyk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBzdWJtaXRCdG4gPSBzdGVwQ29udGVudFthY3RpdmVJbmRleF0ucXVlcnlTZWxlY3RvcignLmJ0bl9uZXh0Jyk7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IGRpc2FibGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGlmIChhY3RpdmVJbmRleCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkID0gQXJyYXkuZnJvbShhY3RpdmVTZXRDb250cm9scykuZmlsdGVyKGVsID0+IGVsLmhhc0F0dHJpYnV0ZSgncmVxdWlyZWQnKSkuc29tZShlbCA9PiBlbC52YWx1ZSA9PT0gJycpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChhY3RpdmVJbmRleCA9PT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkID0gIUFycmF5LmZyb20oc3RlcENvbnRlbnRbYWN0aXZlSW5kZXhdLnF1ZXJ5U2VsZWN0b3JBbGwoJ1t0eXBlPVwiY2hlY2tib3hcIl0nKSkuc29tZShlbCA9PiBlbC5jaGVja2VkKVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChhY3RpdmVJbmRleCA9PT0gMikge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG90aGVyQ2l0eSA9IG1zRm9ybS5xdWVyeVNlbGVjdG9yKCdbbmFtZT1cIm90aGVyX2NpdHlcIl0nKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAob3RoZXJDaXR5ID09PSBlLnRhcmdldCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdGVwQ29udGVudFthY3RpdmVJbmRleF0ucXVlcnlTZWxlY3RvckFsbCgnW3R5cGU9XCJyYWRpb1wiXScpLmZvckVhY2goZWwgPT4gZWwuY2hlY2tlZCA9IGZhbHNlKVxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG90aGVyQ2l0eS52YWx1ZSA9ICcnO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQgPSAhQXJyYXkuZnJvbShzdGVwQ29udGVudFthY3RpdmVJbmRleF0ucXVlcnlTZWxlY3RvckFsbCgnW3R5cGU9XCJyYWRpb1wiXScpKS5zb21lKGVsID0+IGVsLmNoZWNrZWQpICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG90aGVyQ2l0eS52YWx1ZSA9PT0gJyc7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKG1zRm9ybS5xdWVyeVNlbGVjdG9yKCdbbmFtZT1cIm90aGVyX2NpdHlcIl0nKSlcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBzdWJtaXRCdG4uZGlzYWJsZWQgPSBkaXNhYmxlZFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGJ0bkNsb3NUaGFua3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYnRuX2Nsb3NlLXRoYW5rcycpO1xyXG5cclxuICAgIGJ0bkNsb3NUaGFua3MuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBvcHVwX2NvbnRhY3RzJykuY2xhc3NMaXN0LnJlbW92ZSgnb3Blbl9tb2RhbCcpO1xyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5iYWNrZHJvcCcpLmNsYXNzTGlzdC5yZW1vdmUoJ2VsLXZpc2libGUnKTtcclxuICAgIH0pO1xyXG5cclxuLy8gICAgU0lERUJBUiBIT1ZFUiBPVkVSTEFZXHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuc2lkZWJhcl9fbmF2IC5kcm9wZG93bicpLmZvckVhY2goZnVuY3Rpb24gKGVsZW1lbnQpIHtcclxuICAgICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZW50ZXInLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zaWRlYmFyX19vdmVybGF5JykuY2xhc3NMaXN0LmFkZCgnc2hvdycpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbGVhdmUnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zaWRlYmFyX19vdmVybGF5JykuY2xhc3NMaXN0LnJlbW92ZSgnc2hvdycpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnI2FjY29yZGlvbiAucGFuZWxfX2hlYWRpbmcnKS5mb3JFYWNoKChoZWFkaW5nKSA9PiB7XHJcbiAgICAgICAgaGVhZGluZy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgY29uc3QgaXNPcGVuID0gdGhpcy5jbGFzc0xpc3QuY29udGFpbnMoJ29wZW4nKTtcclxuICAgICAgICAgICAgY29uc3QgYWxsUGFuZWxzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnI2FjY29yZGlvbiAucGFuZWxfX2hlYWRpbmcnKTtcclxuICAgICAgICAgICAgY29uc3QgYWxsQ29udGVudHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucGFuZWwtY29sbGFwc2UnKTtcclxuXHJcbiAgICAgICAgICAgIGFsbFBhbmVscy5mb3JFYWNoKHBhbmVsID0+IHBhbmVsLmNsYXNzTGlzdC5yZW1vdmUoJ29wZW4nKSk7XHJcbiAgICAgICAgICAgIGFsbENvbnRlbnRzLmZvckVhY2goY29udGVudCA9PiBjb250ZW50LnN0eWxlLm1heEhlaWdodCA9IG51bGwpO1xyXG5cclxuICAgICAgICAgICAgaWYgKCFpc09wZW4pIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2xhc3NMaXN0LmFkZCgnb3BlbicpO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgcGFuZWxDb250ZW50ID0gdGhpcy5uZXh0RWxlbWVudFNpYmxpbmc7XHJcbiAgICAgICAgICAgICAgICBwYW5lbENvbnRlbnQuc3R5bGUubWF4SGVpZ2h0ID0gcGFuZWxDb250ZW50LnNjcm9sbEhlaWdodCArICdweCc7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuLy9UQUJMRSBDT0xMQVBTRSBST1dcclxuICAgIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGVjaC1jaGFyYWN0X19yb3cnKSkge1xyXG4gICAgICAgIGNvbnN0IG1heFZpc2libGVSb3dzID0gNTtcclxuICAgICAgICBjb25zdCByb3dzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnRlY2gtY2hhcmFjdF9fcm93Jyk7XHJcbiAgICAgICAgY29uc3Qgc2hvd01vcmVCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYnRuX21vcmUnKTtcclxuXHJcbiAgICAgICAgaWYgKHJvd3MubGVuZ3RoID4gbWF4VmlzaWJsZVJvd3MpIHtcclxuICAgICAgICAgICAgc2hvd01vcmVCdG4uc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XHJcblxyXG4gICAgICAgICAgICByb3dzLmZvckVhY2goKHJvdywgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChpbmRleCA+PSBtYXhWaXNpYmxlUm93cykge1xyXG4gICAgICAgICAgICAgICAgICAgIHJvdy5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgc2hvd01vcmVCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICByb3dzLmZvckVhY2gocm93ID0+IHJvdy5zdHlsZS5kaXNwbGF5ID0gJycpO1xyXG5cclxuICAgICAgICAgICAgICAgIHNob3dNb3JlQnRuLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbn0pO1xyXG5cclxuIl0sImZpbGUiOiJtYWluLmpzIn0=
