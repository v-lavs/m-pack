<?php
/**
 * The template for displaying the footer
 */
	?>
</div>
    </main>
    <?php get_template_part('footer/footer', 'vanda-pagination'); ?>


     <?php if(wp_get_post_parent_id()) { ?>
    <div class="footer-top-block">
        <div class="container">
            <div class="ftb-text">
                <h4>Зацікавились продукцією?</h4>
                <p>Ви зацікавились нашою продукцією, або у Вас з’явились питання по продукції, ми з радістю відповімо на всі питання. Напишіть нам.</p>
            </div>
            <a href="#" class="btn btn_main btn_call_footer">Замовити дзвінок</a>
        </div>
    </div>
    <?php } ?>

    <?php get_template_part('footer/footer', 'vanda-popup'); ?>

	<!--footer-->
    <footer class="footer">
        <div class="wrap-round">
            <a href="#" class="btn call_main">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <g clip-path="url(#clip0_1739_14735)">
                        <path d="M17.93 16L19.56 14.37C16.79 11.35 16.79 6.81 19.56 3.63L17.93 2C14.03 5.89 14.02 11.95 17.93 16ZM22.92 10.95C22.08 9.77 22.08 8.24 22.92 7.06L21.24 5.37C19.22 7.39 19.22 10.44 21.24 12.64L22.92 10.95ZM9 13C11.21 13 13 11.21 13 9C13 6.79 11.21 5 9 5C6.79 5 5 6.79 5 9C5 11.21 6.79 13 9 13ZM15.39 15.56C13.71 14.7 11.53 14 9 14C6.47 14 4.29 14.7 2.61 15.56C1.61 16.07 1 17.1 1 18.22V21H17V18.22C17 17.1 16.39 16.07 15.39 15.56Z" fill="white"/>
                    </g>
                    <defs>
                        <clipPath id="clip0_1739_14735">
                            <rect width="24" height="24" fill="white"/>
                        </clipPath>
                    </defs>
                </svg>
            </a>
            <a href="tel:+380673738151" class="btn cont_main">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <g clip-path="url(#clip0_1739_14719)">
                        <path d="M18.9999 12H20.9999C20.9999 7.03 16.9699 3 11.9999 3V5C15.8699 5 18.9999 8.13 18.9999 12ZM14.9999 12H16.9999C16.9999 9.24 14.7599 7 11.9999 7V9C13.6599 9 14.9999 10.34 14.9999 12ZM13.2099 17.37C10.3799 15.93 8.0599 13.62 6.6199 10.78L9.1499 8.25L8.5399 3H3.0299C2.4499 13.18 10.8199 21.55 20.9999 20.97V15.46L15.7299 14.85L13.2099 17.37Z" fill="white"/>
                    </g>
                    <defs>
                        <clipPath id="clip0_1739_14719">
                            <rect width="24" height="24" fill="white"/>
                        </clipPath>
                    </defs>
                </svg>
            </a>
            <button type="button" class="round__close">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M6.4 19L5 17.6L10.6 12L5 6.4L6.4 5L12 10.6L17.6 5L19 6.4L13.4 12L19 17.6L17.6 19L12 13.4L6.4 19Z" fill="#27A737"/>
                </svg>
            </button>
            <button type="button" class="round">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <g clip-path="url(#clip0_1739_14732)">
                        <path d="M20.9999 15.46L15.7299 14.85L13.2099 17.37C10.3799 15.93 8.0599 13.62 6.6199 10.78L9.1499 8.25L8.5399 3H3.0299C2.4499 13.18 10.8199 21.55 20.9999 20.97V15.46Z" fill="white"/>
                    </g>
                    <defs>
                        <clipPath id="clip0_1739_14732">
                            <rect width="24" height="24" fill="white"/>
                        </clipPath>
                    </defs>
                </svg>
            </button>
        </div>
        <div class="footer_top">
            <div class="container">
                <div class="footer__top-line">
                    <a href="#" class="footer__logo">
                        <svg width="184" height="49" viewBox="0 0 184 49" fill="none"
                             xmlns="http://www.w3.org/2000/svg">
                            <g clip-path="url(#clip0_384_9835)">
                                <path fill-rule="evenodd" clip-rule="evenodd"
                                      d="M24.2759 0C10.8756 0 0 10.976 0 24.5C0 38.024 10.8756 49 24.2759 49C37.6762 49 48.5518 38.024 48.5518 24.5C48.5518 10.976 37.6762 0 24.2759 0ZM47.4837 24.5C34.666 24.5 24.2759 34.986 24.2759 47.922V24.5H47.4837ZM24.2759 24.5H1.06814C13.8858 24.5 24.2759 14.014 24.2759 1.078V24.5ZM169.873 31.5951L167.038 27.3223L165.737 28.5963V31.5951H163.057V18.1103H165.737V25.5191L169.543 21.4815H172.883L168.902 25.4603L173 31.5951H169.873ZM151.87 26.5581C151.87 29.6745 153.929 31.7717 157.036 31.7717V31.8109C159.347 31.8109 161.115 30.6937 161.678 28.7729L159.134 27.9889C158.765 29.0081 158.473 29.5765 156.997 29.5765C155.521 29.5765 154.589 28.4397 154.589 26.5777C154.589 24.7157 155.521 23.5789 156.997 23.5789C158.027 23.5789 158.765 24.1473 159.134 25.1665L161.678 24.3825C161.115 22.4617 160.124 21.3445 157.036 21.3445C153.948 21.3445 151.87 23.4417 151.87 26.5581ZM150.666 29.2825H151.074V31.6149C150.879 31.6541 150.607 31.6737 150.103 31.6737C148.86 31.6737 148.199 31.2033 148.005 30.1645C147.306 31.1837 146.005 31.7913 144.529 31.7913C143.053 31.7913 141.266 30.6153 141.266 28.8513C141.266 26.2249 143.694 25.7545 145.577 25.5193C146.704 25.3821 147.617 25.2253 147.617 24.6177C147.617 24.0101 146.956 23.5397 145.811 23.5397C144.665 23.5397 143.849 23.9513 143.072 24.7157L141.46 23.0693C142.664 21.9325 144.16 21.3445 145.966 21.3445C148.568 21.3445 150.103 22.6185 150.103 24.7549V28.7337C150.103 29.1061 150.297 29.3021 150.666 29.3021V29.2825ZM145.131 29.6549C146.471 29.6549 147.539 28.7729 147.539 27.6753V26.7933C147.147 27.0193 146.612 27.1186 145.916 27.2477L145.83 27.2637L145.8 27.2688C144.782 27.4432 143.83 27.6063 143.83 28.5769C143.83 29.5569 144.296 29.6549 145.131 29.6549ZM140.45 26.5384C140.45 23.3828 138.78 21.3248 136.178 21.3248V21.2856C134.799 21.2856 133.711 21.854 132.935 22.8732L132.799 21.462H130.391V34.9468H133.071V30.3996C133.218 30.56 133.33 30.7084 133.432 30.8435C133.866 31.4179 134.118 31.752 136.178 31.752C138.722 31.752 140.45 29.694 140.45 26.5384ZM137.77 26.5384C137.77 28.4004 136.858 29.5372 135.362 29.5372C133.867 29.5372 132.993 28.4004 132.993 26.5384C132.993 24.6764 133.847 23.5396 135.362 23.5396C136.877 23.5396 137.77 24.6764 137.77 26.5384ZM124.584 21.3248C126.72 21.3248 128.196 22.8731 128.196 25.2056V31.6147H125.516V25.8132C125.516 24.3627 124.856 23.5591 123.71 23.5591C122.564 23.5591 121.399 24.4999 121.399 25.8523V31.6147H118.719V21.5011H121.127L121.224 22.9123C122.001 21.9324 123.186 21.3248 124.564 21.3248H124.584ZM117.34 21.4621C117.049 21.4033 116.738 21.3641 116.447 21.3641L116.427 21.3445C114.99 21.3445 113.786 21.9717 113.126 22.9909L112.99 21.4817H110.582V31.5953H113.262V26.1073C113.262 24.5589 114.213 23.8533 115.689 23.8533C116.175 23.8533 116.738 23.8925 117.301 23.9513L117.34 21.4621ZM104.173 29.5373C102.743 29.5373 101.812 28.7803 101.536 27.4401H108.834C108.879 27.2213 108.903 27.6979 108.916 27.9529C108.92 28.0391 108.923 28.0999 108.926 28.0999C108.931 28.0998 108.931 27.7493 108.931 26.5581C108.931 23.4025 107.028 21.3445 103.959 21.3445C100.891 21.3445 98.8903 23.5593 98.8903 26.5581C98.8903 29.5569 100.658 31.7717 104.134 31.7717C106.076 31.7717 107.533 31.1053 108.542 30.0273L106.911 28.4005C106.27 29.1061 105.61 29.5373 104.173 29.5373ZM103.95 23.4809C102.712 23.4847 101.861 24.2288 101.551 25.4605H106.251C105.98 24.1899 105.187 23.4846 103.95 23.4809ZM97.2004 18.1301H94.5204V18.1693V22.7165C94.3725 22.556 94.2605 22.4076 94.1585 22.2725C93.7249 21.6981 93.4728 21.3641 91.4131 21.3641C88.869 21.3641 87.1405 23.4221 87.1405 26.5777C87.1405 29.7333 88.8107 31.7913 91.4131 31.7913C92.7919 31.7913 93.8795 31.2229 94.6563 30.2037L94.7923 31.6149H97.2004V18.1301ZM94.6175 26.5385C94.6175 28.4005 93.7436 29.5373 92.2482 29.5373C90.7333 29.5373 89.84 28.4005 89.84 26.5385C89.84 24.6765 90.7528 23.5397 92.2482 23.5397C93.7436 23.5397 94.6175 24.6765 94.6175 26.5385ZM80.9068 31.7717C77.7412 31.7717 75.6632 29.7137 75.6632 26.5581C75.6632 23.4025 77.7607 21.3445 80.9068 21.3445C84.053 21.3445 86.1504 23.4025 86.1504 26.5581C86.1504 29.7137 84.053 31.7717 80.9068 31.7717ZM80.9068 29.5373C82.4411 29.5373 83.4121 28.4201 83.4121 26.5385C83.4121 24.6569 82.4411 23.5397 80.9068 23.5397C79.3726 23.5397 78.4016 24.6569 78.4016 26.5385C78.4016 28.4201 79.3726 29.5373 80.9068 29.5373ZM74.1291 25.2056C74.1291 22.8731 72.7308 21.3248 70.6334 21.3248L70.5751 21.3443C69.0409 21.3443 67.7785 22.0695 67.0794 23.2063C66.555 22.0499 65.4286 21.3443 64.0497 21.3443C62.6709 21.3443 61.5445 21.9128 60.8065 22.8535L60.7094 21.5011H58.3012V31.6147H60.9813V25.8523C60.9813 24.4999 62.0106 23.5591 63.1564 23.5591C64.3022 23.5591 64.8654 24.3627 64.8654 25.8132V31.6147H67.5455V25.8523C67.5455 24.4999 68.633 23.5591 69.74 23.5591C70.847 23.5591 71.449 24.3627 71.449 25.8132V31.6147H74.1291V25.2056Z"
                                      fill="currentColor"/>
                            </g>
                            <defs>
                                <clipPath id="clip0_384_9835">
                                    <rect width="173" height="49" fill="white"/>
                                </clipPath>
                            </defs>
                        </svg>
                    </a>
                    <ul class="social-bar">
                        <li class="social-bar__item">
                            <a href="#" aria-label="email">
                                <svg width="24" height="25" viewBox="0 0 24 25" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path d="M22 4.5H2V20.5H22V4.5ZM20 8.5L12 13.5L4 8.5V6.5L12 11.5L20 6.5V8.5Z"
                                          fill="#748B86"/>
                                </svg>
                            </a>
                        </li>
                        <li class="social-bar__item">
                            <a href="#" aria-label="Facebook">
                                <svg width="24" height="25" viewBox="0 0 24 25" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                          d="M3 3.5H21V21.5H3V3.5ZM11.8594 6.43203C11.7539 6.46367 11.5641 6.54453 11.4375 6.61133C11.3109 6.67812 11.1246 6.81172 11.0227 6.91016C10.9242 7.00508 10.7766 7.18437 10.6957 7.30391C10.6184 7.42695 10.5234 7.62734 10.4883 7.75391C10.4496 7.88047 10.4039 8.08437 10.3828 8.21094C10.3652 8.3375 10.3477 8.87891 10.3477 9.41328V10.3906H9.08203V12.5H10.3477V18.7227H12.9141V12.5C14.2781 12.5 14.6719 12.4895 14.6719 12.4719C14.6719 12.4578 14.707 12.2012 14.7457 11.9023C14.7844 11.6035 14.8371 11.1395 14.8582 10.8758L14.9004 10.3906H12.9492L12.9457 8.86133C13.1004 8.64336 13.2059 8.55195 13.2762 8.5168C13.3887 8.46758 13.5152 8.45703 14.1621 8.45703H14.918V6.27734C12.9281 6.28437 12.4289 6.29844 12.2812 6.33008C12.1547 6.35117 11.9648 6.39688 11.8594 6.43203Z"
                                          fill="#748B86"/>
                                </svg>
                            </a>
                        </li>
                        <li class="social-bar__item">
                            <a href="#" aria-label="Instagram">
                                <svg width="24" height="25" viewBox="0 0 24 25" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path d="M3 3.5V21.5H21V3.5H3ZM18 5.5C18.552 5.5 19 5.948 19 6.5C19 7.052 18.552 7.5 18 7.5C17.448 7.5 17 7.052 17 6.5C17 5.948 17.448 5.5 18 5.5ZM12 7.5C14.761 7.5 17 9.739 17 12.5C17 15.261 14.761 17.5 12 17.5C9.239 17.5 7 15.261 7 12.5C7 9.739 9.239 7.5 12 7.5ZM12 9.5C11.2044 9.5 10.4413 9.81607 9.87868 10.3787C9.31607 10.9413 9 11.7044 9 12.5C9 13.2956 9.31607 14.0587 9.87868 14.6213C10.4413 15.1839 11.2044 15.5 12 15.5C12.7956 15.5 13.5587 15.1839 14.1213 14.6213C14.6839 14.0587 15 13.2956 15 12.5C15 11.7044 14.6839 10.9413 14.1213 10.3787C13.5587 9.81607 12.7956 9.5 12 9.5Z"
                                          fill="#748B86"/>
                                </svg>
                            </a>
                        </li>
                    </ul>
                </div>
                <div class="footer__content">
                    <div class="footer__item">
                        <div class="footer__item-part">
                            <h3>Ц.О. “ModernPack”</h3>
                            <p>м. Жидачів, вул. Грушевського, 37</p>
                        </div>
                        <div class="footer__item-part">
                            <h3>Формуємо культуру пакування</h3>
                            <a href="tel:+38(067)37-38-151" class="phone">+38 (067) 37-38-151</a>
                            <a href="#" class="link link_whith-arrow">Політика конфіденційності
                                <span class="link__icon">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                         xmlns="http://www.w3.org/2000/svg">
                                   <g clip-path="url(#clip0_384_9734)">
                                   <path d="M8.58984 16.59L13.1698 12L8.58984 7.41L9.99984 6L15.9998 12L9.99984 18L8.58984 16.59Z"
                                         fill="currentColor"/></g>
                                   <defs>
                                   <clipPath id="clip0_384_9734">
                                   <rect width="24" height="24" fill="white"/>
                                   </clipPath>
                                   </defs>
                                   </svg>
                                </span>
                            </a>
                        </div>
                    </div>
                    <div class="footer__item">
                        <div class="footer__item-part">
                            <div class="flocation">
                                <span class="flocation__icon">
                                    <img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/img/location.svg" alt="">
                                </span>Київ
                            </div>
                            вул. Генерала Алмазова, 18/7
                        </div>
                        <div class="footer__item-part">
                            <a href="#" class="link link_whith-arrow">Обрати інше місто
                                <span class="link__icon">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                         xmlns="http://www.w3.org/2000/svg">
                                   <g clip-path="url(#clip0_384_9734)">
                                   <path d="M8.58984 16.59L13.1698 12L8.58984 7.41L9.99984 6L15.9998 12L9.99984 18L8.58984 16.59Z"
                                         fill="currentColor"/></g>
                                   <defs>
                                   <clipPath id="clip0_384_9734">
                                   <rect width="24" height="24" fill="white"/>
                                   </clipPath>
                                   </defs>
                                   </svg>
                                </span>
                            </a>
                        </div>
                    </div>
                    <div class="footer__item">
                        <div class="footer__item-part">
                            <h3>Філії в Польщі</h3>
                            <div class="flocation">
                                <span class="flocation__icon">
                                    <img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/img/location.svg" alt="">
                                </span>Радом
                            </div>
                            <p>Inter Pack Polonia, sp. z o.o. ul. Biznesowa 9, 26-600 Radom, Poland</p>
                        </div>
                        <div class="footer__item-part">
                            <h3>Філії в Австрії</h3>
                            <div class="flocation">
                                <span class="flocation__icon">
                                    <img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/img/location.svg" alt="">
                                </span>Клагенфурд
                            </div>
                            <p>Profi Tec Verpackungen GmbH Feldkirchner Str. 117, 9020Klagenfurt am Worthersee,
                                Osterreich</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="footer_bottom">
            <div class="container">
                <div class="copyright">
                    Copyright &copy; 2024 "Modern Pack" of group UGPS "Ukrainian Green Packaging Solutions"
                </div>
            </div>
        </div>
    </footer>
</div>	
<?php get_template_part('footer/footer', 'map'); ?>
<?php wp_footer(); ?>
<div id="third-menu-container" class="third-menu-container"></div>
<script type="text/javascript">
    jQuery(document).ready(function(){

        jQuery.wait = function(ms) {
            var defer = jQuery.Deferred();
            setTimeout(function() { defer.resolve(); }, ms);
            return defer;
        };
        jQuery('#menu-holovne-meniu .menu__item > ul .dropdown').hover(
            function(e){

            jQuery(this).parent().addClass('active');
            let submenu = jQuery(this).find('.sub-menu').html();
            let thirdMenu = jQuery('#third-menu-container');

            thirdMenu.html('<ul class="sub-menu-third">' + submenu + '</ul>');
            thirdMenu.css({'opacity': 1, 'zIndex' : 555, 'visibility': 'visible'})
        }, function(){
            jQuery.wait(500).then( function(){

                let thirdMenu = jQuery('#third-menu-container');
                console.log(777);
                if(
                    thirdMenu.filter(':hover').length == 0 
                    && jQuery('#menu-holovne-meniu .menu__item > ul .dropdown:hover').length == 0)
                {
                    jQuery(this).parent().removeClass('active');
                    thirdMenu.css({'opacity': 0, 'zIndex' : -1, 'visibility': 'hidden'});
                    thirdMenu.html('');
                }
            });
        });

        jQuery( "#third-menu-container" ).on( "mouseleave", function(){
            let thirdMenu = jQuery('#third-menu-container');

            if(
                    jQuery('#menu-holovne-meniu .menu__item > ul .dropdown:hover').length == 0)
                {
                    jQuery("#menu-holovne-meniu *").removeClass('active');
                    thirdMenu.css({'opacity': 0, 'zIndex' : -1, 'visibility': 'hidden'});
                    thirdMenu.html('');
                }

        } );

    }

);

</script>

</body>
</html>