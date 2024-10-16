/*
* to include js file write: `//= include ./path-to-file`
* */

// CUSTOM SCRIPTS
document.addEventListener('DOMContentLoaded', function(){

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
        if(window.clearContactForm) {
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
});






//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJtYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qXHJcbiogdG8gaW5jbHVkZSBqcyBmaWxlIHdyaXRlOiBgLy89IGluY2x1ZGUgLi9wYXRoLXRvLWZpbGVgXHJcbiogKi9cclxuXHJcbi8vIENVU1RPTSBTQ1JJUFRTXHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmdW5jdGlvbigpe1xyXG5cclxuLy8gTU9CSUxFIE1FTlVcclxuICAgIGNvbnN0IHNpZGViYXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2lkZWJhcicpO1xyXG4gICAgY29uc3QgaGVhZGVyU2JPcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5oZWFkZXInKTtcclxuICAgIGNvbnN0IGJ0bkJ1cmdlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5idG4tYnVyZ2VyJyk7XHJcbiAgICBjb25zdCBtZW51TGlua3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuc2lkZWJhciAubWVudV9fbGluaycpO1xyXG4gICAgY29uc3Qgb3ZlcmxheSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5iYWNrZHJvcCcpO1xyXG4gICAgY29uc3QgYnRuQ2FsbFNiID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJ0bl9jYWxsJyk7XHJcblxyXG4gICAgYnRuQnVyZ2VyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgc2lkZWJhci5jbGFzc0xpc3QudG9nZ2xlKCdvcGVuJyk7XHJcbiAgICAgICAgaGVhZGVyU2JPcC5jbGFzc0xpc3QudG9nZ2xlKCdvcGVuJyk7XHJcbiAgICAgICAgb3ZlcmxheS5jbGFzc0xpc3QudG9nZ2xlKCdlbC12aXNpYmxlJyk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBtZW51TGlua3MuZm9yRWFjaChmdW5jdGlvbiAobGluaykge1xyXG4gICAgICAgIGxpbmsuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHNpZGViYXIuY2xhc3NMaXN0LnJlbW92ZSgnb3BlbicpO1xyXG4gICAgICAgICAgICBvdmVybGF5LmNsYXNzTGlzdC5yZW1vdmUoJ2VsLXZpc2libGUnKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIG92ZXJsYXkuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgc2lkZWJhci5jbGFzc0xpc3QucmVtb3ZlKCdvcGVuJyk7XHJcbiAgICAgICAgb3ZlcmxheS5jbGFzc0xpc3QucmVtb3ZlKCdlbC12aXNpYmxlJyk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBidG5DYWxsU2IuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgc2lkZWJhci5jbGFzc0xpc3QucmVtb3ZlKCdvcGVuJyk7XHJcbiAgICAgICAgb3ZlcmxheS5jbGFzc0xpc3QucmVtb3ZlKCdlbC12aXNpYmxlJyk7XHJcbiAgICB9KTtcclxuXHJcbi8vU1RJQ0tZIEhFQURFUiBQQUdFXHJcbiAgICBjb25zdCBzdGlja3lFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBhZ2VfX2hlYWRlcicpO1xyXG4gICAgbGV0IHN0aWNreU9mZnNldCA9IDA7XHJcblxyXG4gICAgZnVuY3Rpb24gdXBkYXRlU3RpY2t5QmFubmVyT2Zmc2V0KCkge1xyXG4gICAgICAgIGNvbnN0IHBhZ2VCYW5uZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2VjdGlvbi1iYW5uZXInKTtcclxuICAgICAgICBpZiAocGFnZUJhbm5lcikge1xyXG4gICAgICAgICAgICBjb25zdCBiYW5uZXJIID0gcGFnZUJhbm5lci5vZmZzZXRIZWlnaHQ7XHJcbiAgICAgICAgICAgIGNvbnN0IHN0aWNreUggPSBzdGlja3lFbGVtZW50Lm9mZnNldEhlaWdodDtcclxuXHJcbiAgICAgICAgICAgIHN0aWNreU9mZnNldCA9IGJhbm5lckggLSBzdGlja3lIO1xyXG5cclxuICAgICAgICAgICAgaWYgKHdpbmRvdy5wYWdlWU9mZnNldCA+PSBzdGlja3lPZmZzZXQpIHtcclxuICAgICAgICAgICAgICAgIHN0aWNreUVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnc3RpY2t5Jyk7XHJcbiAgICAgICAgICAgICAgICBzdGlja3lPZmZzZXQgPSBzdGlja3lFbGVtZW50Lm9mZnNldFRvcDtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHN0aWNreUVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgnc3RpY2t5Jyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHVwZGF0ZVN0aWNreUJhbm5lck9mZnNldCk7XHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIHVwZGF0ZVN0aWNreUJhbm5lck9mZnNldCk7XHJcblxyXG4gICAgY29uc3QgYmFubmVyVGh1bWIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNlY3Rpb24tYmFubmVyX190aHVtYlwiKTtcclxuICAgIGNvbnN0IGJhbm5lclRpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBhZ2UtdGl0bGUnKTtcclxuXHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInNjcm9sbFwiLCAoKSA9PiB7XHJcbiAgICAgICAgdXBkYXRlU3RpY2t5QmFubmVyT2Zmc2V0KClcclxuXHJcbiAgICAgICAgaWYgKHdpbmRvdy5zY3JvbGxZID4gMCkge1xyXG4gICAgICAgICAgICBiYW5uZXJUaHVtYi5jbGFzc0xpc3QuYWRkKFwiaGlkZS10aHVtYlwiKTtcclxuICAgICAgICAgICAgYmFubmVyVGl0bGUuY2xhc3NMaXN0LmFkZChcInNtYWxsLXRpdGxlXCIpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGJhbm5lclRodW1iLmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRlLXRodW1iXCIpO1xyXG4gICAgICAgICAgICBiYW5uZXJUaXRsZS5jbGFzc0xpc3QucmVtb3ZlKFwic21hbGwtdGl0bGVcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG5cclxuLy9TTElERVJcclxuXHJcbiAgICBjb25zdCBzd2lwZXJJbmZvID0gbmV3IFN3aXBlcignLnN3aXBlci1pbmZvJywge1xyXG4gICAgICAgIHBhZ2luYXRpb246IHtcclxuICAgICAgICAgICAgZWw6ICcuc3dpcGVyLWluZm8gLnN3aXBlci1wYWdpbmF0aW9uJyxcclxuICAgICAgICAgICAgY2xpY2thYmxlOiB0cnVlLFxyXG4gICAgICAgIH0sXHJcbiAgICB9KTtcclxuXHJcbiAgICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByb2R1Y3Qtc2xpZGVyJykpIHtcclxuICAgICAgICBjb25zdCBwcm9kdWN0U2xpZGVyID0gbmV3IFN3aXBlcignLnByb2R1Y3Qtc2xpZGVyICcsIHtcclxuICAgICAgICAgICAgcGFnaW5hdGlvbjoge1xyXG4gICAgICAgICAgICAgICAgZWw6ICcucHJvZHVjdC1zbGlkZXIgLnN3aXBlci1wYWdpbmF0aW9uJyxcclxuICAgICAgICAgICAgICAgIGNsaWNrYWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgbmF2aWdhdGlvbjoge1xyXG4gICAgICAgICAgICAgICAgbmV4dEVsOiBcIi5zd2lwZXItYnV0dG9uLW5leHRcIixcclxuICAgICAgICAgICAgICAgIHByZXZFbDogXCIuc3dpcGVyLWJ1dHRvbi1wcmV2XCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGJyZWFrcG9pbnRzOiB7XHJcbiAgICAgICAgICAgICAgICA1Nzc6IHtcclxuICAgICAgICAgICAgICAgICAgICBzbGlkZXNQZXJWaWV3OiAyLFxyXG4gICAgICAgICAgICAgICAgICAgIHNwYWNlQmV0d2VlbjogMTZcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY2FyZHMtc2xpZGVyJykpIHtcclxuICAgICAgICBjb25zdCBjYXJkU2xpZGVyID0gbmV3IFN3aXBlcignLmNhcmRzLXNsaWRlciAnLCB7XHJcbiAgICAgICAgICAgIHBhZ2luYXRpb246IHtcclxuICAgICAgICAgICAgICAgIGVsOiAnLmNhcmRzLXNsaWRlciAuc3dpcGVyLXBhZ2luYXRpb24nLFxyXG4gICAgICAgICAgICAgICAgY2xpY2thYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBuYXZpZ2F0aW9uOiB7XHJcbiAgICAgICAgICAgICAgICBuZXh0RWw6IFwiLnN3aXBlci1idXR0b24tbmV4dFwiLFxyXG4gICAgICAgICAgICAgICAgcHJldkVsOiBcIi5zd2lwZXItYnV0dG9uLXByZXZcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgYnJlYWtwb2ludHM6IHtcclxuICAgICAgICAgICAgICAgIDU3Nzoge1xyXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1BlclZpZXc6IDIsXHJcbiAgICAgICAgICAgICAgICAgICAgc3BhY2VCZXR3ZWVuOiAxNixcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZ3JlZW4tc2xpZGVyJykpIHtcclxuICAgICAgICBjb25zdCBncmVlblNsaWRlciA9IG5ldyBTd2lwZXIoJy5ncmVlbi1zbGlkZXInLCB7XHJcbiAgICAgICAgICAgIHBhZ2luYXRpb246IHtcclxuICAgICAgICAgICAgICAgIGVsOiAnLmdyZWVuLXNsaWRlciAuc3dpcGVyLXBhZ2luYXRpb24nLFxyXG4gICAgICAgICAgICAgICAgY2xpY2thYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBuYXZpZ2F0aW9uOiB7XHJcbiAgICAgICAgICAgICAgICBuZXh0RWw6IFwiLnN3aXBlci1idXR0b24tbmV4dFwiLFxyXG4gICAgICAgICAgICAgICAgcHJldkVsOiBcIi5zd2lwZXItYnV0dG9uLXByZXZcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2xpZGVyLTQtY29sJykpIHtcclxuICAgICAgICBjb25zdCBzbGlkZXI0Q29sID0gbmV3IFN3aXBlcignLnNsaWRlci00LWNvbCcsIHtcclxuICAgICAgICAgICAgc2xpZGVzUGVyVmlldzogNCxcclxuICAgICAgICAgICAgcGFnaW5hdGlvbjoge1xyXG4gICAgICAgICAgICAgICAgZWw6ICcuc2xpZGVyLTQtY29sIC5zd2lwZXItcGFnaW5hdGlvbicsXHJcbiAgICAgICAgICAgICAgICBjbGlja2FibGU6IHRydWUsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIG5hdmlnYXRpb246IHtcclxuICAgICAgICAgICAgICAgIG5leHRFbDogXCIuc3dpcGVyLWJ1dHRvbi1uZXh0XCIsXHJcbiAgICAgICAgICAgICAgICBwcmV2RWw6IFwiLnN3aXBlci1idXR0b24tcHJldlwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBicmVha3BvaW50czoge1xyXG4gICAgICAgICAgICAgICAgNTc3OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzUGVyVmlldzogMyxcclxuICAgICAgICAgICAgICAgICAgICBzcGFjZUJldHdlZW46IDE2XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgNzY3OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzUGVyVmlldzogNCxcclxuICAgICAgICAgICAgICAgICAgICBzcGFjZUJldHdlZW46IDE2XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpZiAoJCgnLmdhbGxlcnknKS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICQoJy5nYWxsZXJ5IGEnKS5jbGljayhmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgYmFndWV0dGVCb3gucnVuKCcuZ2FsbGVyeScsIHt9KTtcclxuICAgICAgICB9XHJcbiAgICB9KVxyXG5cclxuXHJcbiAgICAvL1RBQlNcclxuICAgIGNvbnN0IHRhYkxpbmtzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnRhYnNfX25hdi1saW5rJyk7XHJcbiAgICBjb25zdCB0YWJDb250ZW50cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy50YWItY29udGVudCcpO1xyXG5cclxuICAgIHRhYkxpbmtzLmZvckVhY2gobGluayA9PiB7XHJcbiAgICAgICAgbGluay5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XHJcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgICAgIHRhYkxpbmtzLmZvckVhY2gobGluayA9PiBsaW5rLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpKTtcclxuICAgICAgICAgICAgdGFiQ29udGVudHMuZm9yRWFjaChjb250ZW50ID0+IGNvbnRlbnQuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJykpO1xyXG4gICAgICAgICAgICBsaW5rLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xyXG5cclxuICAgICAgICAgICAgY29uc3QgdGFyZ2V0SWQgPSBsaW5rLmdldEF0dHJpYnV0ZSgnaHJlZicpLnN1YnN0cmluZygxKTtcclxuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGFyZ2V0SWQpLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG5cclxuLy8gUE9QVVBcclxuICAgIGNvbnN0IHBvcHVwQ29udCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucG9wdXBfY29udGFjdHNcIik7XHJcbiAgICBjb25zdCBidG5DYWxsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5idG5fY2FsbFwiKTtcclxuICAgIGNvbnN0IGNvbnRhY3RzQ2xvc2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucG9wdXBfY29udGFjdHMgLnBvcHVwX2Nsb3NlJyk7XHJcbiAgICBjb25zdCBiYWNrZHJvcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5iYWNrZHJvcCcpO1xyXG5cclxuICAgIGJ0bkNhbGwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgcG9wdXBDb250LmNsYXNzTGlzdC5hZGQoJ29wZW5fbW9kYWwnKTtcclxuICAgICAgICBiYWNrZHJvcC5jbGFzc0xpc3QudG9nZ2xlKCdlbC12aXNpYmxlJyk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBjb25zdCBjbG9zZVBvcHVwID0gKCkgPT4ge1xyXG4gICAgICAgIHBvcHVwQ29udC5jbGFzc0xpc3QucmVtb3ZlKCdvcGVuX21vZGFsJyk7XHJcbiAgICAgICAgYmFja2Ryb3AuY2xhc3NMaXN0LnJlbW92ZSgnZWwtdmlzaWJsZScpO1xyXG4gICAgICAgIGlmKHdpbmRvdy5jbGVhckNvbnRhY3RGb3JtKSB7XHJcbiAgICAgICAgICAgIHdpbmRvdy5jbGVhckNvbnRhY3RGb3JtKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNvbnRhY3RzQ2xvc2UuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjbG9zZVBvcHVwKTtcclxuICAgIGJhY2tkcm9wLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY2xvc2VQb3B1cCk7XHJcblxyXG5cclxuLy8gICAgTVVMVEkgU1RFUCBGT1JNXHJcbiAgICBjb25zdCBtc0Zvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubXVsdGktc3RlcC1mb3JtJyk7XHJcblxyXG4gICAgaWYgKG1zRm9ybSkge1xyXG4gICAgICAgIGxldCBhY3RpdmVJbmRleCA9IDA7XHJcbiAgICAgICAgY29uc3Qgc3RlcHNDaXJjbGUgPSBtc0Zvcm0ucXVlcnlTZWxlY3RvckFsbCgnLnByb2dyZXNzLXN0ZXAnKTtcclxuICAgICAgICBjb25zdCBzdGVwQ29udGVudCA9IG1zRm9ybS5xdWVyeVNlbGVjdG9yQWxsKCcuZm9ybV9fc3RlcCcpO1xyXG5cclxuICAgICAgICBjb25zdCBidG5zTmV4dCA9IG1zRm9ybS5xdWVyeVNlbGVjdG9yQWxsKCcuYnRuX25leHQnKTtcclxuICAgICAgICBjb25zdCBwcmV2QnRucyA9IG1zRm9ybS5xdWVyeVNlbGVjdG9yQWxsKCcuZm9ybV9fbmF2LWxpbmsnKTtcclxuXHJcbiAgICAgICAgY29uc3QgdGhZb3VQYWdlID0gbXNGb3JtLnF1ZXJ5U2VsZWN0b3IoJy50aGFua3MteW91LXBhZ2UnKTtcclxuXHJcbiAgICAgICAgc3RlcHNDaXJjbGVbYWN0aXZlSW5kZXhdLmNsYXNzTGlzdC5hZGQoJ3Byb2dyZXNzLXN0ZXBfYWN0aXZlJyk7XHJcbiAgICAgICAgc3RlcENvbnRlbnRbYWN0aXZlSW5kZXhdLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xyXG4gICAgICAgIHByZXZCdG5zW2FjdGl2ZUluZGV4XS5jbGFzc0xpc3QuYWRkKCdzaG93Jyk7XHJcblxyXG4gICAgICAgIGNvbnN0IGdvVG9TdGVwID0gKGFjdGl2ZUluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgIHN0ZXBDb250ZW50LmZvckVhY2goZWwgPT4gZWwuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJykpXHJcblxyXG4gICAgICAgICAgICBzdGVwc0NpcmNsZS5mb3JFYWNoKChlbCwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChpbmRleCA+IGFjdGl2ZUluZGV4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZWwuY2xhc3NMaXN0LnJlbW92ZSgncHJvZ3Jlc3Mtc3RlcF9hY3RpdmUnKVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBlbC5jbGFzc0xpc3QuYWRkKCdwcm9ncmVzcy1zdGVwX2FjdGl2ZScpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICBwcmV2QnRucy5mb3JFYWNoKChlbCwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChpbmRleCA+IGFjdGl2ZUluZGV4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZWwuY2xhc3NMaXN0LnJlbW92ZSgnc2hvdycpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBlbC5jbGFzc0xpc3QuYWRkKCdzaG93Jyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICBjb25zdCBhY3RpdmVDb250ZW50ID0gc3RlcENvbnRlbnRbYWN0aXZlSW5kZXhdO1xyXG4gICAgICAgICAgICBpZiAoYWN0aXZlQ29udGVudCkge1xyXG4gICAgICAgICAgICAgICAgYWN0aXZlQ29udGVudC5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB3aW5kb3cuY2xlYXJDb250YWN0Rm9ybSA9ICgpID0+IHtcclxuICAgICAgICAgICAgbXNGb3JtLnJlc2V0KCk7XHJcbiAgICAgICAgICAgIGFjdGl2ZUluZGV4ID0gMDtcclxuICAgICAgICAgICAgZ29Ub1N0ZXAoYWN0aXZlSW5kZXgpO1xyXG4gICAgICAgICAgICB0aFlvdVBhZ2UuY2xhc3NMaXN0LnJlbW92ZSgnc2hvdycpO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIGJ0bnNOZXh0LmZvckVhY2goYnRuID0+IGJ0bi5hZGRFdmVudExpc3RlbmVyKFxyXG4gICAgICAgICAgICAnY2xpY2snLCAoZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgYWN0aXZlSW5kZXggPSBhY3RpdmVJbmRleCArIDE7XHJcbiAgICAgICAgICAgICAgICBpZiAoYWN0aXZlSW5kZXggPCBzdGVwQ29udGVudC5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICAgICBnb1RvU3RlcChhY3RpdmVJbmRleCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGUudGFyZ2V0LnR5cGUgPT09ICdzdWJtaXQnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB0aFlvdVBhZ2UuY2xhc3NMaXN0LmFkZCgnc2hvdycpO1xyXG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjbG9zZVBvcHVwKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSwgMzAwMClcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICkpO1xyXG5cclxuICAgICAgICBwcmV2QnRucy5mb3JFYWNoKGJ0biA9PiBidG4uYWRkRXZlbnRMaXN0ZW5lcihcclxuICAgICAgICAgICAgJ2NsaWNrJywgKGUpID0+IHtcclxuICAgICAgICAgICAgICAgIGFjdGl2ZUluZGV4ID0gQXJyYXkuZnJvbShwcmV2QnRucykuZmluZEluZGV4KGVsID0+IGVsID09PSBlLnRhcmdldCk7XHJcblxyXG4gICAgICAgICAgICAgICAgZ29Ub1N0ZXAoYWN0aXZlSW5kZXgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgKSk7XHJcblxyXG4gICAgICAgIG1zRm9ybS5xdWVyeVNlbGVjdG9yQWxsKCcuanMtZm9ybS1maWVsZCcpLmZvckVhY2goZWwgPT4ge1xyXG4gICAgICAgICAgICBlbC5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsIChlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBhY3RpdmVTZXRDb250cm9scyA9IHN0ZXBDb250ZW50W2FjdGl2ZUluZGV4XS5xdWVyeVNlbGVjdG9yQWxsKCcuanMtZm9ybS1maWVsZCcpO1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgc3VibWl0QnRuID0gc3RlcENvbnRlbnRbYWN0aXZlSW5kZXhdLnF1ZXJ5U2VsZWN0b3IoJy5idG5fbmV4dCcpO1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCBkaXNhYmxlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBpZiAoYWN0aXZlSW5kZXggPT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZCA9IEFycmF5LmZyb20oYWN0aXZlU2V0Q29udHJvbHMpLmZpbHRlcihlbCA9PiBlbC5oYXNBdHRyaWJ1dGUoJ3JlcXVpcmVkJykpLnNvbWUoZWwgPT4gZWwudmFsdWUgPT09ICcnKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoYWN0aXZlSW5kZXggPT09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZCA9ICFBcnJheS5mcm9tKHN0ZXBDb250ZW50W2FjdGl2ZUluZGV4XS5xdWVyeVNlbGVjdG9yQWxsKCdbdHlwZT1cImNoZWNrYm94XCJdJykpLnNvbWUoZWwgPT4gZWwuY2hlY2tlZClcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoYWN0aXZlSW5kZXggPT09IDIpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBvdGhlckNpdHkgPSBtc0Zvcm0ucXVlcnlTZWxlY3RvcignW25hbWU9XCJvdGhlcl9jaXR5XCJdJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG90aGVyQ2l0eSA9PT0gZS50YXJnZXQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3RlcENvbnRlbnRbYWN0aXZlSW5kZXhdLnF1ZXJ5U2VsZWN0b3JBbGwoJ1t0eXBlPVwicmFkaW9cIl0nKS5mb3JFYWNoKGVsID0+IGVsLmNoZWNrZWQgPSBmYWxzZSlcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvdGhlckNpdHkudmFsdWUgPSAnJztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkID0gIUFycmF5LmZyb20oc3RlcENvbnRlbnRbYWN0aXZlSW5kZXhdLnF1ZXJ5U2VsZWN0b3JBbGwoJ1t0eXBlPVwicmFkaW9cIl0nKSkuc29tZShlbCA9PiBlbC5jaGVja2VkKSAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvdGhlckNpdHkudmFsdWUgPT09ICcnO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhtc0Zvcm0ucXVlcnlTZWxlY3RvcignW25hbWU9XCJvdGhlcl9jaXR5XCJdJykpXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgc3VibWl0QnRuLmRpc2FibGVkID0gZGlzYWJsZWRcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxufSk7XHJcblxyXG5cclxuXHJcblxyXG5cclxuIl0sImZpbGUiOiJtYWluLmpzIn0=
