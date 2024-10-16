/*
* to include js file write: `//= include ./path-to-file`
* */

// CUSTOM SCRIPTS
document.addEventListener('DOMContentLoaded', function () {

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

});






//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJtYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qXHJcbiogdG8gaW5jbHVkZSBqcyBmaWxlIHdyaXRlOiBgLy89IGluY2x1ZGUgLi9wYXRoLXRvLWZpbGVgXHJcbiogKi9cclxuXHJcbi8vIENVU1RPTSBTQ1JJUFRTXHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmdW5jdGlvbiAoKSB7XHJcblxyXG4vLyBNT0JJTEUgTUVOVVxyXG4gICAgY29uc3Qgc2lkZWJhciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zaWRlYmFyJyk7XHJcbiAgICBjb25zdCBoZWFkZXJTYk9wID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhlYWRlcicpO1xyXG4gICAgY29uc3QgYnRuQnVyZ2VyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJ0bi1idXJnZXInKTtcclxuICAgIGNvbnN0IG1lbnVMaW5rcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5zaWRlYmFyIC5tZW51X19saW5rJyk7XHJcbiAgICBjb25zdCBvdmVybGF5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNpZGViYXJfX292ZXJsYXknKTtcclxuICAgIGNvbnN0IGJ0bkNhbGxTYiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5idG5fY2FsbCcpO1xyXG5cclxuICAgIGJ0bkJ1cmdlci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIHNpZGViYXIuY2xhc3NMaXN0LnRvZ2dsZSgnb3BlbicpO1xyXG4gICAgICAgIGhlYWRlclNiT3AuY2xhc3NMaXN0LnRvZ2dsZSgnb3BlbicpO1xyXG4gICAgICAgIG92ZXJsYXkuY2xhc3NMaXN0LnRvZ2dsZSgnZWwtdmlzaWJsZScpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgbWVudUxpbmtzLmZvckVhY2goZnVuY3Rpb24gKGxpbmspIHtcclxuICAgICAgICBsaW5rLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBzaWRlYmFyLmNsYXNzTGlzdC5yZW1vdmUoJ29wZW4nKTtcclxuICAgICAgICAgICAgb3ZlcmxheS5jbGFzc0xpc3QucmVtb3ZlKCdlbC12aXNpYmxlJyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBvdmVybGF5LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHNpZGViYXIuY2xhc3NMaXN0LnJlbW92ZSgnb3BlbicpO1xyXG4gICAgICAgIG92ZXJsYXkuY2xhc3NMaXN0LnJlbW92ZSgnZWwtdmlzaWJsZScpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgYnRuQ2FsbFNiLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHNpZGViYXIuY2xhc3NMaXN0LnJlbW92ZSgnb3BlbicpO1xyXG4gICAgICAgIG92ZXJsYXkuY2xhc3NMaXN0LnJlbW92ZSgnZWwtdmlzaWJsZScpO1xyXG4gICAgfSk7XHJcblxyXG4vL1NUSUNLWSBIRUFERVIgUEFHRVxyXG4gICAgY29uc3Qgc3RpY2t5RWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wYWdlX19oZWFkZXInKTtcclxuICAgIGxldCBzdGlja3lPZmZzZXQgPSAwO1xyXG5cclxuICAgIGZ1bmN0aW9uIHVwZGF0ZVN0aWNreUJhbm5lck9mZnNldCgpIHtcclxuICAgICAgICBjb25zdCBwYWdlQmFubmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNlY3Rpb24tYmFubmVyJyk7XHJcbiAgICAgICAgaWYgKHBhZ2VCYW5uZXIpIHtcclxuICAgICAgICAgICAgY29uc3QgYmFubmVySCA9IHBhZ2VCYW5uZXIub2Zmc2V0SGVpZ2h0O1xyXG4gICAgICAgICAgICBjb25zdCBzdGlja3lIID0gc3RpY2t5RWxlbWVudC5vZmZzZXRIZWlnaHQ7XHJcblxyXG4gICAgICAgICAgICBzdGlja3lPZmZzZXQgPSBiYW5uZXJIIC0gc3RpY2t5SDtcclxuXHJcbiAgICAgICAgICAgIGlmICh3aW5kb3cucGFnZVlPZmZzZXQgPj0gc3RpY2t5T2Zmc2V0KSB7XHJcbiAgICAgICAgICAgICAgICBzdGlja3lFbGVtZW50LmNsYXNzTGlzdC5hZGQoJ3N0aWNreScpO1xyXG4gICAgICAgICAgICAgICAgc3RpY2t5T2Zmc2V0ID0gc3RpY2t5RWxlbWVudC5vZmZzZXRUb3A7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBzdGlja3lFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ3N0aWNreScpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCB1cGRhdGVTdGlja3lCYW5uZXJPZmZzZXQpO1xyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCB1cGRhdGVTdGlja3lCYW5uZXJPZmZzZXQpO1xyXG5cclxuICAgIGNvbnN0IGJhbm5lclRodW1iID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zZWN0aW9uLWJhbm5lcl9fdGh1bWJcIik7XHJcbiAgICBjb25zdCBiYW5uZXJUaXRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wYWdlLXRpdGxlJyk7XHJcblxyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJzY3JvbGxcIiwgKCkgPT4ge1xyXG4gICAgICAgIHVwZGF0ZVN0aWNreUJhbm5lck9mZnNldCgpXHJcblxyXG4gICAgICAgIGlmICh3aW5kb3cuc2Nyb2xsWSA+IDApIHtcclxuICAgICAgICAgICAgYmFubmVyVGh1bWIuY2xhc3NMaXN0LmFkZChcImhpZGUtdGh1bWJcIik7XHJcbiAgICAgICAgICAgIGJhbm5lclRpdGxlLmNsYXNzTGlzdC5hZGQoXCJzbWFsbC10aXRsZVwiKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBiYW5uZXJUaHVtYi5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZS10aHVtYlwiKTtcclxuICAgICAgICAgICAgYmFubmVyVGl0bGUuY2xhc3NMaXN0LnJlbW92ZShcInNtYWxsLXRpdGxlXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuXHJcbi8vU0xJREVSXHJcblxyXG4gICAgY29uc3Qgc3dpcGVySW5mbyA9IG5ldyBTd2lwZXIoJy5zd2lwZXItaW5mbycsIHtcclxuICAgICAgICBwYWdpbmF0aW9uOiB7XHJcbiAgICAgICAgICAgIGVsOiAnLnN3aXBlci1pbmZvIC5zd2lwZXItcGFnaW5hdGlvbicsXHJcbiAgICAgICAgICAgIGNsaWNrYWJsZTogdHJ1ZSxcclxuICAgICAgICB9LFxyXG4gICAgfSk7XHJcblxyXG4gICAgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcm9kdWN0LXNsaWRlcicpKSB7XHJcbiAgICAgICAgY29uc3QgcHJvZHVjdFNsaWRlciA9IG5ldyBTd2lwZXIoJy5wcm9kdWN0LXNsaWRlciAnLCB7XHJcbiAgICAgICAgICAgIHBhZ2luYXRpb246IHtcclxuICAgICAgICAgICAgICAgIGVsOiAnLnByb2R1Y3Qtc2xpZGVyIC5zd2lwZXItcGFnaW5hdGlvbicsXHJcbiAgICAgICAgICAgICAgICBjbGlja2FibGU6IHRydWUsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIG5hdmlnYXRpb246IHtcclxuICAgICAgICAgICAgICAgIG5leHRFbDogXCIuc3dpcGVyLWJ1dHRvbi1uZXh0XCIsXHJcbiAgICAgICAgICAgICAgICBwcmV2RWw6IFwiLnN3aXBlci1idXR0b24tcHJldlwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBicmVha3BvaW50czoge1xyXG4gICAgICAgICAgICAgICAgNTc3OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzUGVyVmlldzogMixcclxuICAgICAgICAgICAgICAgICAgICBzcGFjZUJldHdlZW46IDE2XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNhcmRzLXNsaWRlcicpKSB7XHJcbiAgICAgICAgY29uc3QgY2FyZFNsaWRlciA9IG5ldyBTd2lwZXIoJy5jYXJkcy1zbGlkZXIgJywge1xyXG4gICAgICAgICAgICBwYWdpbmF0aW9uOiB7XHJcbiAgICAgICAgICAgICAgICBlbDogJy5jYXJkcy1zbGlkZXIgLnN3aXBlci1wYWdpbmF0aW9uJyxcclxuICAgICAgICAgICAgICAgIGNsaWNrYWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgbmF2aWdhdGlvbjoge1xyXG4gICAgICAgICAgICAgICAgbmV4dEVsOiBcIi5zd2lwZXItYnV0dG9uLW5leHRcIixcclxuICAgICAgICAgICAgICAgIHByZXZFbDogXCIuc3dpcGVyLWJ1dHRvbi1wcmV2XCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGJyZWFrcG9pbnRzOiB7XHJcbiAgICAgICAgICAgICAgICA1Nzc6IHtcclxuICAgICAgICAgICAgICAgICAgICBzbGlkZXNQZXJWaWV3OiAyLFxyXG4gICAgICAgICAgICAgICAgICAgIHNwYWNlQmV0d2VlbjogMTYsXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmdyZWVuLXNsaWRlcicpKSB7XHJcbiAgICAgICAgY29uc3QgZ3JlZW5TbGlkZXIgPSBuZXcgU3dpcGVyKCcuZ3JlZW4tc2xpZGVyJywge1xyXG4gICAgICAgICAgICBwYWdpbmF0aW9uOiB7XHJcbiAgICAgICAgICAgICAgICBlbDogJy5ncmVlbi1zbGlkZXIgLnN3aXBlci1wYWdpbmF0aW9uJyxcclxuICAgICAgICAgICAgICAgIGNsaWNrYWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgbmF2aWdhdGlvbjoge1xyXG4gICAgICAgICAgICAgICAgbmV4dEVsOiBcIi5zd2lwZXItYnV0dG9uLW5leHRcIixcclxuICAgICAgICAgICAgICAgIHByZXZFbDogXCIuc3dpcGVyLWJ1dHRvbi1wcmV2XCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNsaWRlci00LWNvbCcpKSB7XHJcbiAgICAgICAgY29uc3Qgc2xpZGVyNENvbCA9IG5ldyBTd2lwZXIoJy5zbGlkZXItNC1jb2wnLCB7XHJcbiAgICAgICAgICAgIHNsaWRlc1BlclZpZXc6IDQsXHJcbiAgICAgICAgICAgIHBhZ2luYXRpb246IHtcclxuICAgICAgICAgICAgICAgIGVsOiAnLnNsaWRlci00LWNvbCAuc3dpcGVyLXBhZ2luYXRpb24nLFxyXG4gICAgICAgICAgICAgICAgY2xpY2thYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBuYXZpZ2F0aW9uOiB7XHJcbiAgICAgICAgICAgICAgICBuZXh0RWw6IFwiLnN3aXBlci1idXR0b24tbmV4dFwiLFxyXG4gICAgICAgICAgICAgICAgcHJldkVsOiBcIi5zd2lwZXItYnV0dG9uLXByZXZcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgYnJlYWtwb2ludHM6IHtcclxuICAgICAgICAgICAgICAgIDU3Nzoge1xyXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1BlclZpZXc6IDMsXHJcbiAgICAgICAgICAgICAgICAgICAgc3BhY2VCZXR3ZWVuOiAxNlxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIDc2Nzoge1xyXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1BlclZpZXc6IDQsXHJcbiAgICAgICAgICAgICAgICAgICAgc3BhY2VCZXR3ZWVuOiAxNlxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaWYgKCQoJy5nYWxsZXJ5JykubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAkKCcuZ2FsbGVyeSBhJykuY2xpY2soZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGJhZ3VldHRlQm94LnJ1bignLmdhbGxlcnknLCB7fSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSlcclxuXHJcblxyXG4gICAgLy9UQUJTXHJcbiAgICBjb25zdCB0YWJMaW5rcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy50YWJzX19uYXYtbGluaycpO1xyXG4gICAgY29uc3QgdGFiQ29udGVudHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudGFiLWNvbnRlbnQnKTtcclxuXHJcbiAgICB0YWJMaW5rcy5mb3JFYWNoKGxpbmsgPT4ge1xyXG4gICAgICAgIGxpbmsuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xyXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAgICAgICB0YWJMaW5rcy5mb3JFYWNoKGxpbmsgPT4gbGluay5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKSk7XHJcbiAgICAgICAgICAgIHRhYkNvbnRlbnRzLmZvckVhY2goY29udGVudCA9PiBjb250ZW50LmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpKTtcclxuICAgICAgICAgICAgbGluay5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IHRhcmdldElkID0gbGluay5nZXRBdHRyaWJ1dGUoJ2hyZWYnKS5zdWJzdHJpbmcoMSk7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRhcmdldElkKS5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuXHJcbi8vIFBPUFVQXHJcbiAgICBjb25zdCBwb3B1cENvbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnBvcHVwX2NvbnRhY3RzXCIpO1xyXG4gICAgY29uc3QgYnRuQ2FsbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYnRuX2NhbGxcIik7XHJcbiAgICBjb25zdCBjb250YWN0c0Nsb3NlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBvcHVwX2NvbnRhY3RzIC5wb3B1cF9jbG9zZScpO1xyXG4gICAgY29uc3QgYmFja2Ryb3AgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYmFja2Ryb3AnKTtcclxuXHJcbiAgICBidG5DYWxsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgIHBvcHVwQ29udC5jbGFzc0xpc3QuYWRkKCdvcGVuX21vZGFsJyk7XHJcbiAgICAgICAgYmFja2Ryb3AuY2xhc3NMaXN0LnRvZ2dsZSgnZWwtdmlzaWJsZScpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgY29uc3QgY2xvc2VQb3B1cCA9ICgpID0+IHtcclxuICAgICAgICBwb3B1cENvbnQuY2xhc3NMaXN0LnJlbW92ZSgnb3Blbl9tb2RhbCcpO1xyXG4gICAgICAgIGJhY2tkcm9wLmNsYXNzTGlzdC5yZW1vdmUoJ2VsLXZpc2libGUnKTtcclxuICAgICAgICBpZiAod2luZG93LmNsZWFyQ29udGFjdEZvcm0pIHtcclxuICAgICAgICAgICAgd2luZG93LmNsZWFyQ29udGFjdEZvcm0oKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY29udGFjdHNDbG9zZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNsb3NlUG9wdXApO1xyXG4gICAgYmFja2Ryb3AuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjbG9zZVBvcHVwKTtcclxuXHJcblxyXG4vLyAgICBNVUxUSSBTVEVQIEZPUk1cclxuICAgIGNvbnN0IG1zRm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tdWx0aS1zdGVwLWZvcm0nKTtcclxuXHJcbiAgICBpZiAobXNGb3JtKSB7XHJcbiAgICAgICAgbGV0IGFjdGl2ZUluZGV4ID0gMDtcclxuICAgICAgICBjb25zdCBzdGVwc0NpcmNsZSA9IG1zRm9ybS5xdWVyeVNlbGVjdG9yQWxsKCcucHJvZ3Jlc3Mtc3RlcCcpO1xyXG4gICAgICAgIGNvbnN0IHN0ZXBDb250ZW50ID0gbXNGb3JtLnF1ZXJ5U2VsZWN0b3JBbGwoJy5mb3JtX19zdGVwJyk7XHJcblxyXG4gICAgICAgIGNvbnN0IGJ0bnNOZXh0ID0gbXNGb3JtLnF1ZXJ5U2VsZWN0b3JBbGwoJy5idG5fbmV4dCcpO1xyXG4gICAgICAgIGNvbnN0IHByZXZCdG5zID0gbXNGb3JtLnF1ZXJ5U2VsZWN0b3JBbGwoJy5mb3JtX19uYXYtbGluaycpO1xyXG5cclxuICAgICAgICBjb25zdCB0aFlvdVBhZ2UgPSBtc0Zvcm0ucXVlcnlTZWxlY3RvcignLnRoYW5rcy15b3UtcGFnZScpO1xyXG5cclxuICAgICAgICBzdGVwc0NpcmNsZVthY3RpdmVJbmRleF0uY2xhc3NMaXN0LmFkZCgncHJvZ3Jlc3Mtc3RlcF9hY3RpdmUnKTtcclxuICAgICAgICBzdGVwQ29udGVudFthY3RpdmVJbmRleF0uY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XHJcbiAgICAgICAgcHJldkJ0bnNbYWN0aXZlSW5kZXhdLmNsYXNzTGlzdC5hZGQoJ3Nob3cnKTtcclxuXHJcbiAgICAgICAgY29uc3QgZ29Ub1N0ZXAgPSAoYWN0aXZlSW5kZXgpID0+IHtcclxuICAgICAgICAgICAgc3RlcENvbnRlbnQuZm9yRWFjaChlbCA9PiBlbC5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKSlcclxuXHJcbiAgICAgICAgICAgIHN0ZXBzQ2lyY2xlLmZvckVhY2goKGVsLCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGluZGV4ID4gYWN0aXZlSW5kZXgpIHtcclxuICAgICAgICAgICAgICAgICAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKCdwcm9ncmVzcy1zdGVwX2FjdGl2ZScpXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGVsLmNsYXNzTGlzdC5hZGQoJ3Byb2dyZXNzLXN0ZXBfYWN0aXZlJylcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgIHByZXZCdG5zLmZvckVhY2goKGVsLCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGluZGV4ID4gYWN0aXZlSW5kZXgpIHtcclxuICAgICAgICAgICAgICAgICAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKCdzaG93Jyk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGVsLmNsYXNzTGlzdC5hZGQoJ3Nob3cnKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGFjdGl2ZUNvbnRlbnQgPSBzdGVwQ29udGVudFthY3RpdmVJbmRleF07XHJcbiAgICAgICAgICAgIGlmIChhY3RpdmVDb250ZW50KSB7XHJcbiAgICAgICAgICAgICAgICBhY3RpdmVDb250ZW50LmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHdpbmRvdy5jbGVhckNvbnRhY3RGb3JtID0gKCkgPT4ge1xyXG4gICAgICAgICAgICBtc0Zvcm0ucmVzZXQoKTtcclxuICAgICAgICAgICAgYWN0aXZlSW5kZXggPSAwO1xyXG4gICAgICAgICAgICBnb1RvU3RlcChhY3RpdmVJbmRleCk7XHJcbiAgICAgICAgICAgIHRoWW91UGFnZS5jbGFzc0xpc3QucmVtb3ZlKCdzaG93Jyk7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgYnRuc05leHQuZm9yRWFjaChidG4gPT4gYnRuLmFkZEV2ZW50TGlzdGVuZXIoXHJcbiAgICAgICAgICAgICdjbGljaycsIChlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBhY3RpdmVJbmRleCA9IGFjdGl2ZUluZGV4ICsgMTtcclxuICAgICAgICAgICAgICAgIGlmIChhY3RpdmVJbmRleCA8IHN0ZXBDb250ZW50Lmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGdvVG9TdGVwKGFjdGl2ZUluZGV4KTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoZS50YXJnZXQudHlwZSA9PT0gJ3N1Ym1pdCcpIHtcclxuICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRoWW91UGFnZS5jbGFzc0xpc3QuYWRkKCdzaG93Jyk7XHJcbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsb3NlUG9wdXAoKTtcclxuICAgICAgICAgICAgICAgICAgICB9LCAzMDAwKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgKSk7XHJcblxyXG4gICAgICAgIHByZXZCdG5zLmZvckVhY2goYnRuID0+IGJ0bi5hZGRFdmVudExpc3RlbmVyKFxyXG4gICAgICAgICAgICAnY2xpY2snLCAoZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgYWN0aXZlSW5kZXggPSBBcnJheS5mcm9tKHByZXZCdG5zKS5maW5kSW5kZXgoZWwgPT4gZWwgPT09IGUudGFyZ2V0KTtcclxuXHJcbiAgICAgICAgICAgICAgICBnb1RvU3RlcChhY3RpdmVJbmRleCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICApKTtcclxuXHJcbiAgICAgICAgbXNGb3JtLnF1ZXJ5U2VsZWN0b3JBbGwoJy5qcy1mb3JtLWZpZWxkJykuZm9yRWFjaChlbCA9PiB7XHJcbiAgICAgICAgICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgKGUpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGFjdGl2ZVNldENvbnRyb2xzID0gc3RlcENvbnRlbnRbYWN0aXZlSW5kZXhdLnF1ZXJ5U2VsZWN0b3JBbGwoJy5qcy1mb3JtLWZpZWxkJyk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBzdWJtaXRCdG4gPSBzdGVwQ29udGVudFthY3RpdmVJbmRleF0ucXVlcnlTZWxlY3RvcignLmJ0bl9uZXh0Jyk7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IGRpc2FibGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGlmIChhY3RpdmVJbmRleCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkID0gQXJyYXkuZnJvbShhY3RpdmVTZXRDb250cm9scykuZmlsdGVyKGVsID0+IGVsLmhhc0F0dHJpYnV0ZSgncmVxdWlyZWQnKSkuc29tZShlbCA9PiBlbC52YWx1ZSA9PT0gJycpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChhY3RpdmVJbmRleCA9PT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkID0gIUFycmF5LmZyb20oc3RlcENvbnRlbnRbYWN0aXZlSW5kZXhdLnF1ZXJ5U2VsZWN0b3JBbGwoJ1t0eXBlPVwiY2hlY2tib3hcIl0nKSkuc29tZShlbCA9PiBlbC5jaGVja2VkKVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChhY3RpdmVJbmRleCA9PT0gMikge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG90aGVyQ2l0eSA9IG1zRm9ybS5xdWVyeVNlbGVjdG9yKCdbbmFtZT1cIm90aGVyX2NpdHlcIl0nKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAob3RoZXJDaXR5ID09PSBlLnRhcmdldCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdGVwQ29udGVudFthY3RpdmVJbmRleF0ucXVlcnlTZWxlY3RvckFsbCgnW3R5cGU9XCJyYWRpb1wiXScpLmZvckVhY2goZWwgPT4gZWwuY2hlY2tlZCA9IGZhbHNlKVxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG90aGVyQ2l0eS52YWx1ZSA9ICcnO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQgPSAhQXJyYXkuZnJvbShzdGVwQ29udGVudFthY3RpdmVJbmRleF0ucXVlcnlTZWxlY3RvckFsbCgnW3R5cGU9XCJyYWRpb1wiXScpKS5zb21lKGVsID0+IGVsLmNoZWNrZWQpICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG90aGVyQ2l0eS52YWx1ZSA9PT0gJyc7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKG1zRm9ybS5xdWVyeVNlbGVjdG9yKCdbbmFtZT1cIm90aGVyX2NpdHlcIl0nKSlcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBzdWJtaXRCdG4uZGlzYWJsZWQgPSBkaXNhYmxlZFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG4vLyAgICBTSURFQkFSIEhPVkVSIE9WRVJMQVlcclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5zaWRlYmFyX19uYXYgLmRyb3Bkb3duJykuZm9yRWFjaChmdW5jdGlvbiAoZWxlbWVudCkge1xyXG4gICAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VlbnRlcicsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNpZGViYXJfX292ZXJsYXknKS5jbGFzc0xpc3QuYWRkKCdzaG93Jyk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VsZWF2ZScsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNpZGViYXJfX292ZXJsYXknKS5jbGFzc0xpc3QucmVtb3ZlKCdzaG93Jyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbn0pO1xyXG5cclxuXHJcblxyXG5cclxuXHJcbiJdLCJmaWxlIjoibWFpbi5qcyJ9
