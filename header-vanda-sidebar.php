<!--sidebar-->
<div class="sidebar__overlay"></div>
<div class="sidebar">
    <div class="sidebar__inner">
        <div class="sidebar__item info-section">
            <div class="swiper swiper-info">
                <div class="swiper-wrapper">
                    <div class="swiper-slide">
                        <p><strong>Формуємо культуру пакування</strong></p>
                        <p>Пакувальний сервіс №1</p>
                    </div>
                    <div class="swiper-slide">
                        <p><strong>Сертифікати</strong></p>
                        <p>ISO 9001:2015 I FSC-C149708</p>
                    </div>
                </div>
                <div class="swiper-pagination"></div>
            </div>
        </div>
        <div class="sidebar__item">
            <div class="location">
                <div class="location__factory">Київ</div>
                <a href="#" class="location__chose link">інше місто</a>
            </div>
            <div class="location__contacts">
                <a href="tel:+38(067)37-38-151">+38 (067) 37-38-151</a>
                <p>ПН—ПТ 08:00—18:00</p>
                <p>вул. Генерала Алмазова, 18/7</p>
            </div>
        </div>
        <div class="sidebar__footer">
        <a href="#" class="btn btn_main btn_call" id="btnCall">Замовити дзвінок</a>
        </div>

        <div class="sidebar__nav">
        <div class="sidebar__nav-inner">
        <?php 

    function add_additional_class_on_a($classes, $item, $args)
        {
            if (isset($args->add_a_class)) {
                $classes['class'] = $args->add_a_class;
            }
            return $classes;
        }

    add_filter('nav_menu_link_attributes', 'add_additional_class_on_a', 1, 3);

    $consult_menu = wp_nav_menu(array(
                    'menu'              => 45,
                    'depth'             => 3,
                    'container'         => 'div',
                    'container_class'   => 'sidebar__item',
                    'menu_class'        => 'menu menu_top',
                    'add_a_class'      => 'menu__link',
                    'echo'              => false, 
                    'walker' => new MPach_Walker_Nav_Menu()
                )
                );

    $consult_menu = str_replace(
        ['menu-item', 'menu__item-has-children'], 
        ['menu__item', 'dropdown'], 
        $consult_menu);
    echo $consult_menu;
        ?>
            

        <?php 


    $user_menu = wp_nav_menu(array(
                    'menu'              => 177,
                    'depth'             => 2,
                    'container'         => 'div',
                    'container_class'   => 'sidebar__item',
                    'menu_class'        => 'menu menu_top',
                    'add_a_class'      => 'menu__link',
                    'echo'              => false, 
                )
                );

    $user_menu = str_replace(
        ['menu-item', 'menu__item-has-children'], 
        ['menu__item', 'dropdown'], 
        $user_menu);
    echo $user_menu;
        ?>
            
            </div>
        </div>

    
</div>
</div>