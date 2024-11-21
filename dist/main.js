/*
* to include js file write: `//= include ./path-to-file`
* */

// CUSTOM SCRIPTS
document.addEventListener('DOMContentLoaded', function () {

// SCROLL TO ANCHOR
//     function smoothScrollToAnchor(selector, headerSelector, headerPageSelector) {
//         document.querySelectorAll(selector).forEach((element) => {
//             element.addEventListener('click', function (event) {
//                 const anchor = this.getAttribute('href');
//
//                 if (anchor.startsWith('#') && anchor !== '#') {
//                     event.preventDefault();
//                     console.log(anchor, headerPageSelector);
//                     const targetElement = document.querySelector(anchor);
//                     const headerElement = document.querySelector(headerSelector);
//                     const headerPageElement = document.querySelector(headerPageSelector);
//                     const headerHeight = headerElement ? headerElement.clientHeight : 0;
//
//                     const headerPageHeight = headerPageElement ? headerPageElement.clientHeight : 0;
//
//                     if (targetElement) {
//                         function getElementOffsetTop(element) {
//                             const rect = element.getBoundingClientRect();
//                             const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
//                             return rect.top + scrollTop;
//                         }
//                         const targetPosition = getElementOffsetTop(targetElement) - headerHeight - headerPageHeight;
//                         // const targetPosition = getElementOffsetTop(targetElement) - ((window.innerWidth <= 991 ? 90 : 10) + headerPageHeight);
//                         console.log(headerPageHeight)
//                         window.scrollTo({
//                             top: targetPosition,
//                             behavior: 'smooth'
//                         });
//
//                     }
//                 }
//             });
//         });
//     }
//
//     smoothScrollToAnchor('.scroll-to-anchor  a', '.header', '.page__header');
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

            tabThumbNav.forEach(link => link.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            link.classList.add('active');

            const targetId = link.getAttribute('dataTarget').substring(1);
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

})
;


//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJtYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qXHJcbiogdG8gaW5jbHVkZSBqcyBmaWxlIHdyaXRlOiBgLy89IGluY2x1ZGUgLi9wYXRoLXRvLWZpbGVgXHJcbiogKi9cclxuXHJcbi8vIENVU1RPTSBTQ1JJUFRTXHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmdW5jdGlvbiAoKSB7XHJcblxyXG4vLyBTQ1JPTEwgVE8gQU5DSE9SXHJcbi8vICAgICBmdW5jdGlvbiBzbW9vdGhTY3JvbGxUb0FuY2hvcihzZWxlY3RvciwgaGVhZGVyU2VsZWN0b3IsIGhlYWRlclBhZ2VTZWxlY3Rvcikge1xyXG4vLyAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpLmZvckVhY2goKGVsZW1lbnQpID0+IHtcclxuLy8gICAgICAgICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uIChldmVudCkge1xyXG4vLyAgICAgICAgICAgICAgICAgY29uc3QgYW5jaG9yID0gdGhpcy5nZXRBdHRyaWJ1dGUoJ2hyZWYnKTtcclxuLy9cclxuLy8gICAgICAgICAgICAgICAgIGlmIChhbmNob3Iuc3RhcnRzV2l0aCgnIycpICYmIGFuY2hvciAhPT0gJyMnKSB7XHJcbi8vICAgICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuLy8gICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhhbmNob3IsIGhlYWRlclBhZ2VTZWxlY3Rvcik7XHJcbi8vICAgICAgICAgICAgICAgICAgICAgY29uc3QgdGFyZ2V0RWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYW5jaG9yKTtcclxuLy8gICAgICAgICAgICAgICAgICAgICBjb25zdCBoZWFkZXJFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihoZWFkZXJTZWxlY3Rvcik7XHJcbi8vICAgICAgICAgICAgICAgICAgICAgY29uc3QgaGVhZGVyUGFnZUVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGhlYWRlclBhZ2VTZWxlY3Rvcik7XHJcbi8vICAgICAgICAgICAgICAgICAgICAgY29uc3QgaGVhZGVySGVpZ2h0ID0gaGVhZGVyRWxlbWVudCA/IGhlYWRlckVsZW1lbnQuY2xpZW50SGVpZ2h0IDogMDtcclxuLy9cclxuLy8gICAgICAgICAgICAgICAgICAgICBjb25zdCBoZWFkZXJQYWdlSGVpZ2h0ID0gaGVhZGVyUGFnZUVsZW1lbnQgPyBoZWFkZXJQYWdlRWxlbWVudC5jbGllbnRIZWlnaHQgOiAwO1xyXG4vL1xyXG4vLyAgICAgICAgICAgICAgICAgICAgIGlmICh0YXJnZXRFbGVtZW50KSB7XHJcbi8vICAgICAgICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uIGdldEVsZW1lbnRPZmZzZXRUb3AoZWxlbWVudCkge1xyXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVjdCA9IGVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBzY3JvbGxUb3AgPSB3aW5kb3cucGFnZVlPZmZzZXQgfHwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcDtcclxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZWN0LnRvcCArIHNjcm9sbFRvcDtcclxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB0YXJnZXRQb3NpdGlvbiA9IGdldEVsZW1lbnRPZmZzZXRUb3AodGFyZ2V0RWxlbWVudCkgLSBoZWFkZXJIZWlnaHQgLSBoZWFkZXJQYWdlSGVpZ2h0O1xyXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAvLyBjb25zdCB0YXJnZXRQb3NpdGlvbiA9IGdldEVsZW1lbnRPZmZzZXRUb3AodGFyZ2V0RWxlbWVudCkgLSAoKHdpbmRvdy5pbm5lcldpZHRoIDw9IDk5MSA/IDkwIDogMTApICsgaGVhZGVyUGFnZUhlaWdodCk7XHJcbi8vICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGhlYWRlclBhZ2VIZWlnaHQpXHJcbi8vICAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvdy5zY3JvbGxUbyh7XHJcbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b3A6IHRhcmdldFBvc2l0aW9uLFxyXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYmVoYXZpb3I6ICdzbW9vdGgnXHJcbi8vICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4vL1xyXG4vLyAgICAgICAgICAgICAgICAgICAgIH1cclxuLy8gICAgICAgICAgICAgICAgIH1cclxuLy8gICAgICAgICAgICAgfSk7XHJcbi8vICAgICAgICAgfSk7XHJcbi8vICAgICB9XHJcbi8vXHJcbi8vICAgICBzbW9vdGhTY3JvbGxUb0FuY2hvcignLnNjcm9sbC10by1hbmNob3IgIGEnLCAnLmhlYWRlcicsICcucGFnZV9faGVhZGVyJyk7XHJcbiAgICBmdW5jdGlvbiBzbW9vdGhTY3JvbGxUb0FuY2hvcihzZWxlY3RvciwgaGVhZGVyU2VsZWN0b3IsIGhlYWRlclBhZ2VTZWxlY3Rvcikge1xyXG4gICAgICAgIGxldCBoZWFkZXJQYWdlSGVpZ2h0ID0gMDtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gZGVsYXkobXMpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4gc2V0VGltZW91dChyZXNvbHZlLCBtcykpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgYXN5bmMgZnVuY3Rpb24gdXBkYXRlSGVhZGVySGVpZ2h0V2l0aERlbGF5KCkge1xyXG4gICAgICAgICAgICBhd2FpdCBkZWxheSgxMDApOyAvLyDQl9Cw0YLRgNC40LzQutCwIDEwMCDQvNGBXHJcbiAgICAgICAgICAgIGNvbnN0IGhlYWRlclBhZ2VFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihoZWFkZXJQYWdlU2VsZWN0b3IpO1xyXG4gICAgICAgICAgICBpZiAoaGVhZGVyUGFnZUVsZW1lbnQpIHtcclxuICAgICAgICAgICAgICAgIGhlYWRlclBhZ2VIZWlnaHQgPSBoZWFkZXJQYWdlRWxlbWVudC5jbGllbnRIZWlnaHQgfHwgMDtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdVcGRhdGVkIGhlYWRlclBhZ2VIZWlnaHQgd2l0aCBkZWxheTonLCBoZWFkZXJQYWdlSGVpZ2h0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgaGVhZGVyUGFnZUVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGhlYWRlclBhZ2VTZWxlY3Rvcik7XHJcbiAgICAgICAgaWYgKGhlYWRlclBhZ2VFbGVtZW50KSB7XHJcbiAgICAgICAgICAgIGNvbnN0IG9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoYXN5bmMgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgYXdhaXQgdXBkYXRlSGVhZGVySGVpZ2h0V2l0aERlbGF5KCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgb2JzZXJ2ZXIub2JzZXJ2ZShoZWFkZXJQYWdlRWxlbWVudCwge1xyXG4gICAgICAgICAgICAgICAgYXR0cmlidXRlczogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIGNoaWxkTGlzdDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBzdWJ0cmVlOiBmYWxzZSxcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB1cGRhdGVIZWFkZXJIZWlnaHRXaXRoRGVsYXkoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpLmZvckVhY2goKGVsZW1lbnQpID0+IHtcclxuICAgICAgICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGFzeW5jIGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgYW5jaG9yID0gdGhpcy5nZXRBdHRyaWJ1dGUoJ2hyZWYnKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoYW5jaG9yLnN0YXJ0c1dpdGgoJyMnKSAmJiBhbmNob3IgIT09ICcjJykge1xyXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdGFyZ2V0RWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYW5jaG9yKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBoZWFkZXJFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihoZWFkZXJTZWxlY3Rvcik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0YXJnZXRFbGVtZW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uIGdldEVsZW1lbnRPZmZzZXRUb3AoZWxlbWVudCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVjdCA9IGVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBzY3JvbGxUb3AgPSB3aW5kb3cucGFnZVlPZmZzZXQgfHwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZWN0LnRvcCArIHNjcm9sbFRvcDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgYXdhaXQgZGVsYXkoMTAwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgdGFyZ2V0UG9zaXRpb24gPSBnZXRFbGVtZW50T2Zmc2V0VG9wKHRhcmdldEVsZW1lbnQpIC0gKCh3aW5kb3cuaW5uZXJXaWR0aCA8PSA5OTEgPyA5MCA6IDEwKSArIGhlYWRlclBhZ2VIZWlnaHQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnU2Nyb2xsIHRvIHBvc2l0aW9uIHdpdGggZGVsYXk6JywgdGFyZ2V0UG9zaXRpb24pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3cuc2Nyb2xsVG8oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9wOiB0YXJnZXRQb3NpdGlvbixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJlaGF2aW9yOiAnc21vb3RoJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHNtb290aFNjcm9sbFRvQW5jaG9yKCcuc2Nyb2xsLXRvLWFuY2hvciBhJywgJy5oZWFkZXInLCAnLnBhZ2VfX2hlYWRlcicpO1xyXG5cclxuXHJcblxyXG4vLyBNT0JJTEUgTUVOVVxyXG5jb25zdCBzaWRlYmFyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNpZGViYXInKTtcclxuY29uc3QgaGVhZGVyU2JPcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5oZWFkZXInKTtcclxuY29uc3QgYnRuQnVyZ2VyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJ0bi1idXJnZXInKTtcclxuY29uc3QgbWVudUxpbmtzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnNpZGViYXIgLm1lbnVfX2xpbmsnKTtcclxuY29uc3Qgb3ZlcmxheSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zaWRlYmFyX19vdmVybGF5Jyk7XHJcbmNvbnN0IGJ0bkNhbGxTYiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5idG5fY2FsbCcpO1xyXG5cclxuYnRuQnVyZ2VyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgIHNpZGViYXIuY2xhc3NMaXN0LnRvZ2dsZSgnb3BlbicpO1xyXG4gICAgaGVhZGVyU2JPcC5jbGFzc0xpc3QudG9nZ2xlKCdvcGVuJyk7XHJcbiAgICBvdmVybGF5LmNsYXNzTGlzdC50b2dnbGUoJ2VsLXZpc2libGUnKTtcclxufSk7XHJcblxyXG5tZW51TGlua3MuZm9yRWFjaChmdW5jdGlvbiAobGluaykge1xyXG4gICAgbGluay5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBzaWRlYmFyLmNsYXNzTGlzdC5yZW1vdmUoJ29wZW4nKTtcclxuICAgICAgICBvdmVybGF5LmNsYXNzTGlzdC5yZW1vdmUoJ2VsLXZpc2libGUnKTtcclxuICAgIH0pO1xyXG59KTtcclxuXHJcbm92ZXJsYXkuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICBzaWRlYmFyLmNsYXNzTGlzdC5yZW1vdmUoJ29wZW4nKTtcclxuICAgIG92ZXJsYXkuY2xhc3NMaXN0LnJlbW92ZSgnZWwtdmlzaWJsZScpO1xyXG59KTtcclxuXHJcbmJ0bkNhbGxTYi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgIHNpZGViYXIuY2xhc3NMaXN0LnJlbW92ZSgnb3BlbicpO1xyXG4gICAgb3ZlcmxheS5jbGFzc0xpc3QucmVtb3ZlKCdlbC12aXNpYmxlJyk7XHJcbn0pO1xyXG5cclxuLy9TVElDS1kgSEVBREVSIFBBR0VcclxuXHJcbmNvbnN0IHN0aWNreUVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucGFnZV9faGVhZGVyJyk7XHJcbmxldCBzdGlja3lPZmZzZXQgPSAwO1xyXG5cclxuZnVuY3Rpb24gdXBkYXRlU3RpY2t5QmFubmVyT2Zmc2V0KCkge1xyXG4gICAgY29uc3QgcGFnZUJhbm5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zZWN0aW9uLWJhbm5lcicpO1xyXG5cclxuICAgIGlmIChwYWdlQmFubmVyKSB7XHJcbiAgICAgICAgY29uc3QgYmFubmVySCA9IHBhZ2VCYW5uZXIub2Zmc2V0SGVpZ2h0O1xyXG4gICAgICAgIGNvbnN0IHN0aWNreUggPSBzdGlja3lFbGVtZW50Lm9mZnNldEhlaWdodDtcclxuXHJcbiAgICAgICAgY29uc3QgbW9iaWxlT2Zmc2V0ID0gd2luZG93LmlubmVyV2lkdGggPD0gOTkxID8gODAgOiAwO1xyXG5cclxuICAgICAgICBzdGlja3lPZmZzZXQgPSBiYW5uZXJIIC0gc3RpY2t5SCAtIG1vYmlsZU9mZnNldDtcclxuXHJcbiAgICAgICAgaWYgKHdpbmRvdy5wYWdlWU9mZnNldCA+PSBzdGlja3lPZmZzZXQpIHtcclxuICAgICAgICAgICAgc3RpY2t5RWxlbWVudC5jbGFzc0xpc3QuYWRkKCdzdGlja3knKTtcclxuICAgICAgICAgICAgc3RpY2t5T2Zmc2V0ID0gc3RpY2t5RWxlbWVudC5vZmZzZXRUb3A7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgc3RpY2t5RWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdzdGlja3knKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCB1cGRhdGVTdGlja3lCYW5uZXJPZmZzZXQpO1xyXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIHVwZGF0ZVN0aWNreUJhbm5lck9mZnNldCk7XHJcblxyXG5jb25zdCBiYW5uZXJUaHVtYiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2VjdGlvbi1iYW5uZXJfX3RodW1iXCIpO1xyXG5jb25zdCBiYW5uZXJUaXRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wYWdlLXRpdGxlJyk7XHJcblxyXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInNjcm9sbFwiLCAoKSA9PiB7XHJcbiAgICB1cGRhdGVTdGlja3lCYW5uZXJPZmZzZXQoKVxyXG5cclxuICAgIGlmIChiYW5uZXJUaHVtYiAmJiBiYW5uZXJUaXRsZSkge1xyXG4gICAgICAgIGlmICh3aW5kb3cuc2Nyb2xsWSA+IDApIHtcclxuICAgICAgICAgICAgYmFubmVyVGh1bWIuY2xhc3NMaXN0LmFkZChcImhpZGUtdGh1bWJcIik7XHJcbiAgICAgICAgICAgIGJhbm5lclRpdGxlLmNsYXNzTGlzdC5hZGQoXCJzbWFsbC10aXRsZVwiKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBiYW5uZXJUaHVtYi5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZS10aHVtYlwiKTtcclxuICAgICAgICAgICAgYmFubmVyVGl0bGUuY2xhc3NMaXN0LnJlbW92ZShcInNtYWxsLXRpdGxlXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSk7XHJcblxyXG4vLyBzdGlja3lPZmZzZXQgLSA4MFxyXG4vL1NMSURFUlxyXG5cclxuY29uc3Qgc3dpcGVySW5mbyA9IG5ldyBTd2lwZXIoJy5zd2lwZXItaW5mbycsIHtcclxuICAgIHBhZ2luYXRpb246IHtcclxuICAgICAgICBlbDogJy5zd2lwZXItaW5mbyAuc3dpcGVyLXBhZ2luYXRpb24nLFxyXG4gICAgICAgIGNsaWNrYWJsZTogdHJ1ZSxcclxuICAgICAgICBkeW5hbWljQnVsbGV0czogdHJ1ZSxcclxuICAgIH0sXHJcbn0pO1xyXG5cclxuaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcm9kdWN0LXNsaWRlcicpKSB7XHJcbiAgICBjb25zdCBwcm9kdWN0U2xpZGVyID0gbmV3IFN3aXBlcignLnByb2R1Y3Qtc2xpZGVyICcsIHtcclxuICAgICAgICBwYWdpbmF0aW9uOiB7XHJcbiAgICAgICAgICAgIGVsOiAnLnByb2R1Y3Qtc2xpZGVyIC5zd2lwZXItcGFnaW5hdGlvbicsXHJcbiAgICAgICAgICAgIGNsaWNrYWJsZTogdHJ1ZSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIG5hdmlnYXRpb246IHtcclxuICAgICAgICAgICAgbmV4dEVsOiBcIi5zd2lwZXItYnV0dG9uLW5leHRcIixcclxuICAgICAgICAgICAgcHJldkVsOiBcIi5zd2lwZXItYnV0dG9uLXByZXZcIixcclxuICAgICAgICB9LFxyXG4gICAgICAgIGJyZWFrcG9pbnRzOiB7XHJcbiAgICAgICAgICAgIDU3Nzoge1xyXG4gICAgICAgICAgICAgICAgc2xpZGVzUGVyVmlldzogMixcclxuICAgICAgICAgICAgICAgIHNwYWNlQmV0d2VlbjogMTZcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICB9KTtcclxufVxyXG5pZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNhcmRzLXNsaWRlcicpKSB7XHJcbiAgICBjb25zdCBjYXJkU2xpZGVyID0gbmV3IFN3aXBlcignLmNhcmRzLXNsaWRlciAnLCB7XHJcbiAgICAgICAgcGFnaW5hdGlvbjoge1xyXG4gICAgICAgICAgICBlbDogJy5jYXJkcy1zbGlkZXIgLnN3aXBlci1wYWdpbmF0aW9uJyxcclxuICAgICAgICAgICAgY2xpY2thYmxlOiB0cnVlLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbmF2aWdhdGlvbjoge1xyXG4gICAgICAgICAgICBuZXh0RWw6IFwiLnN3aXBlci1idXR0b24tbmV4dFwiLFxyXG4gICAgICAgICAgICBwcmV2RWw6IFwiLnN3aXBlci1idXR0b24tcHJldlwiLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYnJlYWtwb2ludHM6IHtcclxuICAgICAgICAgICAgNTc3OiB7XHJcbiAgICAgICAgICAgICAgICBzbGlkZXNQZXJWaWV3OiAyLFxyXG4gICAgICAgICAgICAgICAgc3BhY2VCZXR3ZWVuOiAxNixcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICB9KTtcclxufVxyXG5pZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmdyZWVuLXNsaWRlcicpKSB7XHJcbiAgICBjb25zdCBncmVlblNsaWRlciA9IG5ldyBTd2lwZXIoJy5ncmVlbi1zbGlkZXInLCB7XHJcbiAgICAgICAgcGFnaW5hdGlvbjoge1xyXG4gICAgICAgICAgICBlbDogJy5ncmVlbi1zbGlkZXIgLnN3aXBlci1wYWdpbmF0aW9uJyxcclxuICAgICAgICAgICAgY2xpY2thYmxlOiB0cnVlLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbmF2aWdhdGlvbjoge1xyXG4gICAgICAgICAgICBuZXh0RWw6IFwiLnN3aXBlci1idXR0b24tbmV4dFwiLFxyXG4gICAgICAgICAgICBwcmV2RWw6IFwiLnN3aXBlci1idXR0b24tcHJldlwiLFxyXG4gICAgICAgIH0sXHJcbiAgICB9KTtcclxufVxyXG5pZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNsaWRlci00LWNvbCcpKSB7XHJcbiAgICBjb25zdCBzbGlkZXI0Q29sID0gbmV3IFN3aXBlcignLnNsaWRlci00LWNvbCcsIHtcclxuICAgICAgICBzbGlkZXNQZXJWaWV3OiAxLFxyXG4gICAgICAgIHBhZ2luYXRpb246IHtcclxuICAgICAgICAgICAgZWw6ICcuc2xpZGVyLTQtY29sIC5zd2lwZXItcGFnaW5hdGlvbicsXHJcbiAgICAgICAgICAgIGNsaWNrYWJsZTogdHJ1ZSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIG5hdmlnYXRpb246IHtcclxuICAgICAgICAgICAgbmV4dEVsOiBcIi5zbGlkZXItNC1jb2wgLnN3aXBlci1idXR0b24tbmV4dFwiLFxyXG4gICAgICAgICAgICBwcmV2RWw6IFwiLnNsaWRlci00LWNvbCAuc3dpcGVyLWJ1dHRvbi1wcmV2XCIsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBicmVha3BvaW50czoge1xyXG4gICAgICAgICAgICA1Nzc6IHtcclxuICAgICAgICAgICAgICAgIHNsaWRlc1BlclZpZXc6IDIsXHJcbiAgICAgICAgICAgICAgICBzcGFjZUJldHdlZW46IDE2XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIDc2Nzoge1xyXG4gICAgICAgICAgICAgICAgc2xpZGVzUGVyVmlldzogMyxcclxuICAgICAgICAgICAgICAgIHNwYWNlQmV0d2VlbjogMTZcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgOTkxOiB7XHJcbiAgICAgICAgICAgICAgICBzbGlkZXNQZXJWaWV3OiA0LFxyXG4gICAgICAgICAgICAgICAgc3BhY2VCZXR3ZWVuOiAxNlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgIH0pO1xyXG59XHJcbmlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2xpZGVyLWdhbGxlcnkyJykpIHtcclxuICAgIGNvbnN0IHNsaWRlckdhbGxlcnkyID0gbmV3IFN3aXBlcignLnNsaWRlci1nYWxsZXJ5MiAnLCB7XHJcbiAgICAgICAgc3BhY2VCZXR3ZWVuOiAxNixcclxuICAgICAgICBuYXZpZ2F0aW9uOiB7XHJcbiAgICAgICAgICAgIG5leHRFbDogXCIuc2xpZGVyLWdhbGxlcnkyIC5zd2lwZXItYnV0dG9uLW5leHRcIixcclxuICAgICAgICAgICAgcHJldkVsOiBcIi5zbGlkZXItZ2FsbGVyeTIgLnN3aXBlci1idXR0b24tcHJldlwiLFxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgfSk7XHJcbn1cclxuXHJcbmpRdWVyeSgnYm9keScpLm9uKCdjbGljaycsICcucHJvZHVjdC1mZWF0dXJlX190aHVtYicsIGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICBqUXVlcnkodGhpcykuc2libGluZ3MoJy5wcm9kdWN0LWZlYXR1cmVfX3RodW1iJykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgalF1ZXJ5KHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLmZpbmQoJy5wcm9kdWN0LWZlYXR1cmVfX2NvbnRlbnQgLnRhYi1jb250ZW50JykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG5cclxuICAgIGpRdWVyeSh0aGlzKS5hZGRDbGFzcygnYWN0aXZlJyk7XHJcblxyXG4gICAgbGV0IHRhcmdldElkID0galF1ZXJ5KHRoaXMpLmF0dHIoJ2RhdGFUYXJnZXQnKTtcclxuICAgIGpRdWVyeSh0YXJnZXRJZCkuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xyXG59KTtcclxuXHJcbi8vVEFCU1xyXG5jb25zdCB0YWJMaW5rcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy50YWJzX19uYXYtbGluaycpO1xyXG5cclxuZnVuY3Rpb24gZmluZFBhcmVudChlbCwgcGFyZW50Q2xhc3NOYW1lKSB7XHJcbiAgICBpZiAoIWVsKSByZXR1cm4gZG9jdW1lbnQuYm9keTtcclxuICAgIC8vIFN0YXJ0IGZyb20gdGhlIGN1cnJlbnQgZWxlbWVudFxyXG4gICAgbGV0IGlnbm9yZUNsaWNrT3V0c2lkZSA9IGVsLmNsYXNzTGlzdC5jb250YWlucyhwYXJlbnRDbGFzc05hbWUpO1xyXG4gICAgbGV0IHBhcmVudEVsID0gZWwucGFyZW50RWxlbWVudDtcclxuXHJcbiAgICAvLyBMb29wIHVudGlsIHdlIHJlYWNoIHRoZSB0b3Agb2YgdGhlIERPTVxyXG4gICAgd2hpbGUgKCFpZ25vcmVDbGlja091dHNpZGUgJiYgcGFyZW50RWwpIHtcclxuICAgICAgICAvLyBNb3ZlIHVwIHRvIHRoZSBwYXJlbnQgZWxlbWVudFxyXG4gICAgICAgIGlnbm9yZUNsaWNrT3V0c2lkZSA9IHBhcmVudEVsLmNsYXNzTGlzdC5jb250YWlucyhwYXJlbnRDbGFzc05hbWUpO1xyXG4gICAgICAgIGlmICghaWdub3JlQ2xpY2tPdXRzaWRlKSB7XHJcbiAgICAgICAgICAgIHBhcmVudEVsID0gcGFyZW50RWwucGFyZW50RWxlbWVudDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHBhcmVudEVsO1xyXG59XHJcblxyXG50YWJMaW5rcy5mb3JFYWNoKGxpbmsgPT4ge1xyXG4gICAgbGluay5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIGNvbnN0IHBhcmVudCA9IGZpbmRQYXJlbnQoZS50YXJnZXQsICd0YWJzJyk7XHJcblxyXG4gICAgICAgIGNvbnN0IHRhYkxpbmtzID0gcGFyZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy50YWJzX19uYXYtbGluaycpO1xyXG4gICAgICAgIGNvbnN0IHRhYkNvbnRlbnRzID0gcGFyZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy50YWItY29udGVudCcpO1xyXG5cclxuICAgICAgICB0YWJMaW5rcy5mb3JFYWNoKGxpbmsgPT4gbGluay5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKSk7XHJcbiAgICAgICAgdGFiQ29udGVudHMuZm9yRWFjaChjb250ZW50ID0+IGNvbnRlbnQuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJykpO1xyXG4gICAgICAgIGxpbmsuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XHJcblxyXG4gICAgICAgIGNvbnN0IHRhcmdldElkID0gbGluay5nZXRBdHRyaWJ1dGUoJ2RhdGFUYXJnZXQnKS5zdWJzdHJpbmcoMSk7XHJcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGFyZ2V0SWQpLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xyXG4gICAgfSk7XHJcbn0pO1xyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuLy9CTE9DSyBGRUFUVVJFIFBST0RVQ1RcclxuY29uc3QgdGh1bWJOYXZCbG9jayA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5wcm9kdWN0LWZlYXR1cmVfX25hdicpO1xyXG5jb25zdCB0YWJUaHVtYk5hdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5wcm9kdWN0LWZlYXR1cmVfX3RodW1iJyk7XHJcblxyXG50YWJUaHVtYk5hdi5mb3JFYWNoKGxpbmsgPT4ge1xyXG4gICAgaWYgKHdpbmRvdy5pbm5lcldpZHRoID4gNzY3KSB7XHJcbiAgICAgICAgbGluay5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XHJcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgY29uc3QgcGFyZW50ID0gZmluZFBhcmVudChlLnRhcmdldCwgJ3Byb2R1Y3QtZmVhdHVyZScpO1xyXG5cclxuICAgICAgICAgICAgY29uc3QgdGFiVGh1bWJOYXYgPSBwYXJlbnQucXVlcnlTZWxlY3RvckFsbCgnLnByb2R1Y3QtZmVhdHVyZV9fdGh1bWInKTtcclxuICAgICAgICAgICAgY29uc3QgdGFiQ29udGVudHMgPSBwYXJlbnQucXVlcnlTZWxlY3RvckFsbCgnLmZlYXR1cmUtY29udGVudCcpO1xyXG5cclxuICAgICAgICAgICAgdGFiVGh1bWJOYXYuZm9yRWFjaChsaW5rID0+IGxpbmsuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJykpO1xyXG4gICAgICAgICAgICB0YWJDb250ZW50cy5mb3JFYWNoKGNvbnRlbnQgPT4gY29udGVudC5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKSk7XHJcbiAgICAgICAgICAgIGxpbmsuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XHJcblxyXG4gICAgICAgICAgICBjb25zdCB0YXJnZXRJZCA9IGxpbmsuZ2V0QXR0cmlidXRlKCdkYXRhVGFyZ2V0Jykuc3Vic3RyaW5nKDEpO1xyXG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0YXJnZXRJZCkuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIGlmICh0aHVtYk5hdkJsb2NrKSB7XHJcbiAgICAgICAgICAgIHRhYlRodW1iTmF2LmZvckVhY2goYmxvY2sgPT4gYmxvY2suc3R5bGUuZGlzcGxheSA9ICdub25lJyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGFiVGh1bWJOYXYuZm9yRWFjaChibG9jayA9PiBibG9jay5zdHlsZS5kaXNwbGF5ID0gJ2ZsZXgnKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0pO1xyXG5cclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblxyXG4vLyBQT1BVUFxyXG4vLyAgICAgY29uc3QgcG9wdXBDb250ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wb3B1cF9jb250YWN0c1wiKTtcclxuLy8gICAgIGNvbnN0IGJ0bkNhbGwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmJ0bl9jYWxsXCIpO1xyXG4vLyAgICAgY29uc3QgY29udGFjdHNDbG9zZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wb3B1cF9jbG9zZScpO1xyXG4vLyAgICAgY29uc3QgYmFja2Ryb3AgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYmFja2Ryb3AnKTtcclxuLy9cclxuLy8gICAgIGJ0bkNhbGwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbi8vICAgICAgICAgcG9wdXBDb250LmNsYXNzTGlzdC5hZGQoJ29wZW5fbW9kYWwnKTtcclxuLy8gICAgICAgICBiYWNrZHJvcC5jbGFzc0xpc3QudG9nZ2xlKCdlbC12aXNpYmxlJyk7XHJcbi8vICAgICB9KTtcclxuLy9cclxuLy8gICAgIGNvbnN0IGNsb3NlUG9wdXAgPSAoKSA9PiB7XHJcbi8vICAgICAgICAgcG9wdXBDb250LmNsYXNzTGlzdC5yZW1vdmUoJ29wZW5fbW9kYWwnKTtcclxuLy8gICAgICAgICBiYWNrZHJvcC5jbGFzc0xpc3QucmVtb3ZlKCdlbC12aXNpYmxlJyk7XHJcbi8vICAgICAgICAgaWYgKHdpbmRvdy5jbGVhckNvbnRhY3RGb3JtKSB7XHJcbi8vICAgICAgICAgICAgIHdpbmRvdy5jbGVhckNvbnRhY3RGb3JtKCk7XHJcbi8vICAgICAgICAgfVxyXG4vLyAgICAgfVxyXG4vL1xyXG4vLyAgICAgY29udGFjdHNDbG9zZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNsb3NlUG9wdXApO1xyXG4vLyAgICAgYmFja2Ryb3AuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjbG9zZVBvcHVwKTtcclxuLy9cclxuLy8gICAgIGNvbnN0IHBvcHVwTG9jID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wb3B1cF9sb2NhdGlvblwiKTtcclxuLy8gICAgIGNvbnN0IHRyaWdnZXJQb3B1cCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudHJpZ2dlci1wb3B1cFwiKTtcclxuLy8gICAgIGNvbnN0IGxvY0Nsb3NlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBvcHVwX2Nsb3NlJyk7XHJcbi8vICAgICBjb25zdCBiYWNrZHJvcEwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYmFja2Ryb3AnKTtcclxuLy9cclxuLy8gICAgIHRyaWdnZXJQb3B1cC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuLy8gICAgICAgICBwb3B1cExvYy5jbGFzc0xpc3QuYWRkKCdvcGVuX21vZGFsJyk7XHJcbi8vICAgICAgICAgYmFja2Ryb3BMLmNsYXNzTGlzdC50b2dnbGUoJ2VsLXZpc2libGUnKTtcclxuLy8gICAgIH0pO1xyXG4vL1xyXG4vLyAgICAgY29uc3QgY2xvc2VMb2NQb3B1cCA9ICgpID0+IHtcclxuLy8gICAgICAgICBwb3B1cExvYy5jbGFzc0xpc3QucmVtb3ZlKCdvcGVuX21vZGFsJyk7XHJcbi8vICAgICAgICAgYmFja2Ryb3BMLmNsYXNzTGlzdC5yZW1vdmUoJ2VsLXZpc2libGUnKTtcclxuLy8gICAgIH1cclxuLy9cclxuLy8gICAgIHBvcHVwTG9jLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY2xvc2VMb2NQb3B1cCk7XHJcbi8vICAgICBiYWNrZHJvcEwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjbG9zZUxvY1BvcHVwKTtcclxuY29uc3QgaW5pdFBvcHVwID0gKHBvcHVwU2VsZWN0b3IsIHRyaWdnZXJTZWxlY3RvciwgYmFja2Ryb3BTZWxlY3RvcikgPT4ge1xyXG4gICAgY29uc3QgcG9wdXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHBvcHVwU2VsZWN0b3IpO1xyXG4gICAgY29uc3QgdHJpZ2dlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodHJpZ2dlclNlbGVjdG9yKTtcclxuICAgIGNvbnN0IGJhY2tkcm9wID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJhY2tkcm9wJyk7XHJcbiAgICBjb25zdCBjbG9zZUJ1dHRvbiA9IHBvcHVwLnF1ZXJ5U2VsZWN0b3IoJy5wb3B1cF9jbG9zZScpO1xyXG5cclxuICAgIGlmICghcG9wdXAgfHwgIXRyaWdnZXIgfHwgIWJhY2tkcm9wIHx8ICFjbG9zZUJ1dHRvbikge1xyXG4gICAgICAgIGNvbnNvbGUud2FybihcItCe0LTQuNC9INC3INC10LvQtdC80LXQvdGC0ZbQsiDQvdC1INC30L3QsNC50LTQtdC90L5cIiwgcG9wdXBTZWxlY3RvciwgdHJpZ2dlclNlbGVjdG9yLCBiYWNrZHJvcFNlbGVjdG9yKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBjb25zdCBvcGVuUG9wdXAgPSAoKSA9PiB7XHJcbiAgICAgICAgcG9wdXAuY2xhc3NMaXN0LmFkZCgnb3Blbl9tb2RhbCcpO1xyXG4gICAgICAgIGJhY2tkcm9wLmNsYXNzTGlzdC5hZGQoJ2VsLXZpc2libGUnKTtcclxuICAgIH07XHJcblxyXG4gICAgY29uc3QgY2xvc2VQb3B1cCA9ICgpID0+IHtcclxuICAgICAgICBwb3B1cC5jbGFzc0xpc3QucmVtb3ZlKCdvcGVuX21vZGFsJyk7XHJcbiAgICAgICAgYmFja2Ryb3AuY2xhc3NMaXN0LnJlbW92ZSgnZWwtdmlzaWJsZScpO1xyXG4gICAgICAgIGlmICh3aW5kb3cuY2xlYXJDb250YWN0Rm9ybSkge1xyXG4gICAgICAgICAgICB3aW5kb3cuY2xlYXJDb250YWN0Rm9ybSgpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICB0cmlnZ2VyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgb3BlblBvcHVwKTtcclxuICAgIGNsb3NlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY2xvc2VQb3B1cCk7XHJcbiAgICBiYWNrZHJvcC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNsb3NlUG9wdXApO1xyXG59O1xyXG5cclxuaW5pdFBvcHVwKCcucG9wdXBfY29udGFjdHMnLCAnLmJ0bl9jYWxsJywgJy5iYWNrZHJvcCcpO1xyXG5pbml0UG9wdXAoJy5wb3B1cF9sb2NhdGlvbicsICcudHJpZ2dlci1wb3B1cCcsICcuYmFja2Ryb3AnKTtcclxuXHJcbi8vICAgIE1VTFRJIFNURVAgRk9STVxyXG5jb25zdCBtc0Zvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubXVsdGktc3RlcC1mb3JtJyk7XHJcblxyXG5pZiAobXNGb3JtKSB7XHJcbiAgICBsZXQgYWN0aXZlSW5kZXggPSAwO1xyXG4gICAgY29uc3Qgc3RlcHNDaXJjbGUgPSBtc0Zvcm0ucXVlcnlTZWxlY3RvckFsbCgnLnByb2dyZXNzLXN0ZXAnKTtcclxuICAgIGNvbnN0IHN0ZXBDb250ZW50ID0gbXNGb3JtLnF1ZXJ5U2VsZWN0b3JBbGwoJy5mb3JtX19zdGVwJyk7XHJcblxyXG4gICAgY29uc3QgYnRuc05leHQgPSBtc0Zvcm0ucXVlcnlTZWxlY3RvckFsbCgnLmJ0bl9uZXh0Jyk7XHJcbiAgICBjb25zdCBwcmV2QnRucyA9IG1zRm9ybS5xdWVyeVNlbGVjdG9yQWxsKCcuZm9ybV9fbmF2LWxpbmsnKTtcclxuXHJcbiAgICBjb25zdCB0aFlvdVBhZ2UgPSBtc0Zvcm0ucXVlcnlTZWxlY3RvcignLnRoYW5rcy15b3UtcGFnZScpO1xyXG5cclxuICAgIHN0ZXBzQ2lyY2xlW2FjdGl2ZUluZGV4XS5jbGFzc0xpc3QuYWRkKCdwcm9ncmVzcy1zdGVwX2FjdGl2ZScpO1xyXG4gICAgc3RlcENvbnRlbnRbYWN0aXZlSW5kZXhdLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xyXG4gICAgcHJldkJ0bnNbYWN0aXZlSW5kZXhdLmNsYXNzTGlzdC5hZGQoJ3Nob3cnKTtcclxuXHJcbiAgICBjb25zdCBnb1RvU3RlcCA9IChhY3RpdmVJbmRleCkgPT4ge1xyXG4gICAgICAgIHN0ZXBDb250ZW50LmZvckVhY2goZWwgPT4gZWwuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJykpXHJcblxyXG4gICAgICAgIHN0ZXBzQ2lyY2xlLmZvckVhY2goKGVsLCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoaW5kZXggPiBhY3RpdmVJbmRleCkge1xyXG4gICAgICAgICAgICAgICAgZWwuY2xhc3NMaXN0LnJlbW92ZSgncHJvZ3Jlc3Mtc3RlcF9hY3RpdmUnKVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgZWwuY2xhc3NMaXN0LmFkZCgncHJvZ3Jlc3Mtc3RlcF9hY3RpdmUnKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgcHJldkJ0bnMuZm9yRWFjaCgoZWwsIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChpbmRleCA+IGFjdGl2ZUluZGV4KSB7XHJcbiAgICAgICAgICAgICAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKCdzaG93Jyk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBlbC5jbGFzc0xpc3QuYWRkKCdzaG93Jyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICBjb25zdCBhY3RpdmVDb250ZW50ID0gc3RlcENvbnRlbnRbYWN0aXZlSW5kZXhdO1xyXG4gICAgICAgIGlmIChhY3RpdmVDb250ZW50KSB7XHJcbiAgICAgICAgICAgIGFjdGl2ZUNvbnRlbnQuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJylcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgd2luZG93LmNsZWFyQ29udGFjdEZvcm0gPSAoKSA9PiB7XHJcbiAgICAgICAgbXNGb3JtLnJlc2V0KCk7XHJcbiAgICAgICAgYWN0aXZlSW5kZXggPSAwO1xyXG4gICAgICAgIGdvVG9TdGVwKGFjdGl2ZUluZGV4KTtcclxuICAgICAgICB0aFlvdVBhZ2UuY2xhc3NMaXN0LnJlbW92ZSgnc2hvdycpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBidG5zTmV4dC5mb3JFYWNoKGJ0biA9PiBidG4uYWRkRXZlbnRMaXN0ZW5lcihcclxuICAgICAgICAnY2xpY2snLCAoZSkgPT4ge1xyXG4gICAgICAgICAgICBhY3RpdmVJbmRleCA9IGFjdGl2ZUluZGV4ICsgMTtcclxuICAgICAgICAgICAgaWYgKGFjdGl2ZUluZGV4IDwgc3RlcENvbnRlbnQubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICBnb1RvU3RlcChhY3RpdmVJbmRleCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChlLnRhcmdldC50eXBlID09PSAnc3VibWl0Jykge1xyXG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgICAgICAgICAgIHRoWW91UGFnZS5jbGFzc0xpc3QuYWRkKCdzaG93Jyk7XHJcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjbG9zZVBvcHVwKCk7XHJcbiAgICAgICAgICAgICAgICB9LCAzMDAwKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgKSk7XHJcblxyXG4gICAgcHJldkJ0bnMuZm9yRWFjaChidG4gPT4gYnRuLmFkZEV2ZW50TGlzdGVuZXIoXHJcbiAgICAgICAgJ2NsaWNrJywgKGUpID0+IHtcclxuICAgICAgICAgICAgYWN0aXZlSW5kZXggPSBBcnJheS5mcm9tKHByZXZCdG5zKS5maW5kSW5kZXgoZWwgPT4gZWwgPT09IGUudGFyZ2V0KTtcclxuXHJcbiAgICAgICAgICAgIGdvVG9TdGVwKGFjdGl2ZUluZGV4KTtcclxuICAgICAgICB9XHJcbiAgICApKTtcclxuXHJcbiAgICBtc0Zvcm0ucXVlcnlTZWxlY3RvckFsbCgnLmpzLWZvcm0tZmllbGQnKS5mb3JFYWNoKGVsID0+IHtcclxuICAgICAgICBlbC5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsIChlKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGFjdGl2ZVNldENvbnRyb2xzID0gc3RlcENvbnRlbnRbYWN0aXZlSW5kZXhdLnF1ZXJ5U2VsZWN0b3JBbGwoJy5qcy1mb3JtLWZpZWxkJyk7XHJcbiAgICAgICAgICAgIGNvbnN0IHN1Ym1pdEJ0biA9IHN0ZXBDb250ZW50W2FjdGl2ZUluZGV4XS5xdWVyeVNlbGVjdG9yKCcuYnRuX25leHQnKTtcclxuXHJcbiAgICAgICAgICAgIGxldCBkaXNhYmxlZCA9IHRydWU7XHJcbiAgICAgICAgICAgIGlmIChhY3RpdmVJbmRleCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgZGlzYWJsZWQgPSBBcnJheS5mcm9tKGFjdGl2ZVNldENvbnRyb2xzKS5maWx0ZXIoZWwgPT4gZWwuaGFzQXR0cmlidXRlKCdyZXF1aXJlZCcpKS5zb21lKGVsID0+IGVsLnZhbHVlID09PSAnJyk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoYWN0aXZlSW5kZXggPT09IDEpIHtcclxuICAgICAgICAgICAgICAgIGRpc2FibGVkID0gIUFycmF5LmZyb20oc3RlcENvbnRlbnRbYWN0aXZlSW5kZXhdLnF1ZXJ5U2VsZWN0b3JBbGwoJ1t0eXBlPVwiY2hlY2tib3hcIl0nKSkuc29tZShlbCA9PiBlbC5jaGVja2VkKVxyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGFjdGl2ZUluZGV4ID09PSAyKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBvdGhlckNpdHkgPSBtc0Zvcm0ucXVlcnlTZWxlY3RvcignW25hbWU9XCJvdGhlcl9jaXR5XCJdJyk7XHJcbiAgICAgICAgICAgICAgICBpZiAob3RoZXJDaXR5ID09PSBlLnRhcmdldCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHN0ZXBDb250ZW50W2FjdGl2ZUluZGV4XS5xdWVyeVNlbGVjdG9yQWxsKCdbdHlwZT1cInJhZGlvXCJdJykuZm9yRWFjaChlbCA9PiBlbC5jaGVja2VkID0gZmFsc2UpXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIG90aGVyQ2l0eS52YWx1ZSA9ICcnO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGRpc2FibGVkID0gIUFycmF5LmZyb20oc3RlcENvbnRlbnRbYWN0aXZlSW5kZXhdLnF1ZXJ5U2VsZWN0b3JBbGwoJ1t0eXBlPVwicmFkaW9cIl0nKSkuc29tZShlbCA9PiBlbC5jaGVja2VkKSAmJlxyXG4gICAgICAgICAgICAgICAgICAgIG90aGVyQ2l0eS52YWx1ZSA9PT0gJyc7XHJcblxyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cobXNGb3JtLnF1ZXJ5U2VsZWN0b3IoJ1tuYW1lPVwib3RoZXJfY2l0eVwiXScpKVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBzdWJtaXRCdG4uZGlzYWJsZWQgPSBkaXNhYmxlZFxyXG4gICAgICAgIH0pO1xyXG4gICAgfSlcclxufVxyXG5cclxuY29uc3QgYnRuQ2xvc1RoYW5rcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5idG5fY2xvc2UtdGhhbmtzJyk7XHJcblxyXG5idG5DbG9zVGhhbmtzLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBvcHVwX2NvbnRhY3RzJykuY2xhc3NMaXN0LnJlbW92ZSgnb3Blbl9tb2RhbCcpO1xyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJhY2tkcm9wJykuY2xhc3NMaXN0LnJlbW92ZSgnZWwtdmlzaWJsZScpO1xyXG59KTtcclxuLy8gICAgU0lERUJBUiBIT1ZFUiBPVkVSTEFZXHJcbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5zaWRlYmFyX19uYXYgLmRyb3Bkb3duJykuZm9yRWFjaChmdW5jdGlvbiAoZWxlbWVudCkge1xyXG4gICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWVudGVyJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zaWRlYmFyX19vdmVybGF5JykuY2xhc3NMaXN0LmFkZCgnc2hvdycpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWxlYXZlJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zaWRlYmFyX19vdmVybGF5JykuY2xhc3NMaXN0LnJlbW92ZSgnc2hvdycpO1xyXG4gICAgfSk7XHJcbn0pO1xyXG5cclxuZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnI2FjY29yZGlvbiAucGFuZWxfX2hlYWRpbmcnKS5mb3JFYWNoKChoZWFkaW5nKSA9PiB7XHJcbiAgICBoZWFkaW5nLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGNvbnN0IGlzT3BlbiA9IHRoaXMuY2xhc3NMaXN0LmNvbnRhaW5zKCdvcGVuJyk7XHJcbiAgICAgICAgY29uc3QgYWxsUGFuZWxzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnI2FjY29yZGlvbiAucGFuZWxfX2hlYWRpbmcnKTtcclxuICAgICAgICBjb25zdCBhbGxDb250ZW50cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5wYW5lbC1jb2xsYXBzZScpO1xyXG5cclxuICAgICAgICBhbGxQYW5lbHMuZm9yRWFjaChwYW5lbCA9PiBwYW5lbC5jbGFzc0xpc3QucmVtb3ZlKCdvcGVuJykpO1xyXG4gICAgICAgIGFsbENvbnRlbnRzLmZvckVhY2goY29udGVudCA9PiBjb250ZW50LnN0eWxlLm1heEhlaWdodCA9IG51bGwpO1xyXG5cclxuICAgICAgICBpZiAoIWlzT3Blbikge1xyXG4gICAgICAgICAgICB0aGlzLmNsYXNzTGlzdC5hZGQoJ29wZW4nKTtcclxuICAgICAgICAgICAgY29uc3QgcGFuZWxDb250ZW50ID0gdGhpcy5uZXh0RWxlbWVudFNpYmxpbmc7XHJcbiAgICAgICAgICAgIHBhbmVsQ29udGVudC5zdHlsZS5tYXhIZWlnaHQgPSBwYW5lbENvbnRlbnQuc2Nyb2xsSGVpZ2h0ICsgJ3B4JztcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufSk7XHJcbi8vVEFCTEUgQ09MTEFQU0UgUk9XXHJcbmlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGVjaC1jaGFyYWN0X19yb3cnKSkge1xyXG4gICAgY29uc3QgbWF4VmlzaWJsZVJvd3MgPSA1O1xyXG4gICAgY29uc3Qgcm93cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy50ZWNoLWNoYXJhY3RfX3JvdycpO1xyXG4gICAgY29uc3Qgc2hvd01vcmVCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYnRuX21vcmUnKTtcclxuXHJcbiAgICBpZiAocm93cy5sZW5ndGggPiBtYXhWaXNpYmxlUm93cykge1xyXG4gICAgICAgIHNob3dNb3JlQnRuLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xyXG5cclxuICAgICAgICByb3dzLmZvckVhY2goKHJvdywgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgaWYgKGluZGV4ID49IG1heFZpc2libGVSb3dzKSB7XHJcbiAgICAgICAgICAgICAgICByb3cuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHNob3dNb3JlQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByb3dzLmZvckVhY2gocm93ID0+IHJvdy5zdHlsZS5kaXNwbGF5ID0gJycpO1xyXG5cclxuICAgICAgICAgICAgc2hvd01vcmVCdG4uc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG5cclxufSlcclxuO1xyXG5cclxuIl0sImZpbGUiOiJtYWluLmpzIn0=
