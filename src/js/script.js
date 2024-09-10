document.addEventListener('DOMContentLoaded', function () {
    // Loader 
    const loader = document.querySelector('.loader');
    if (loader) {
        setTimeout(() => {
            document.body.classList.add('body--loaded');

            setTimeout(() => {
                loader.classList.add('loader--hidden');

                setTimeout(() => {
                    document.body.classList.remove('body--hidden');
                    setTimeout(() => {
                        document.body.classList.add('body--visible');
                    }, 1000)
                }, 500)
            }, 5500)
        }, 500)
    }

    // header Burger
    const headerBuger = document.querySelector('.header__button');
    if (headerBuger) {
        headerBuger.addEventListener('click', () => {
            document.body.classList.toggle('menu-is-open');
        }, false)
    }

    // move node menu
    const headerNav = document.querySelector('.header__nav');
    const navMobile = document.querySelector('.side-panel__mobile');
    if (headerNav && navMobile) {
        const headerNavList = document.querySelector('.header__nav-list');
        if (headerNavList) {
            function moveNav() {
                if (window.innerWidth < 992) {
                    navMobile.appendChild(headerNavList)
                } else {
                    headerNav.appendChild(headerNavList)
                }
            }
            moveNav()

            window.addEventListener('resize', moveNav, false)
        }
    }

    // Slide Button
    const heroSlideButtons = document.querySelectorAll('.hero__slide-button');
    const heroImages = document.querySelectorAll('.hero__col-image');

    if (heroSlideButtons.length && heroImages.length) {
        let activeHeroSlideButtons = document.querySelector('.hero__slide-button--active');
        heroSlideButtons.forEach(button => {
            button.addEventListener('click', () => {
                activeHeroSlideButtons.classList.remove('hero__slide-button--active');

                const curImage = document.querySelector(`.hero__col-image[id="${activeHeroSlideButtons.dataset.id}"]`)
                if (curImage) {
                    curImage.classList.remove('hero__col-image--active')
                }

                button.classList.add('hero__slide-button--active')
                const newImage = document.querySelector(`.hero__col-image[id="${button.dataset.id}"]`)
                if (newImage) {
                    newImage.classList.add('hero__col-image--active')
                }

                activeHeroSlideButtons = button;
                button.blur()
            })
        })
    }

    const results = Splitting({
        target: '.container--slide',
        by: 'items',
        matching: 'li'
    });

    // destroy/init tilt
    const tilts = document.querySelectorAll('*[data-tilt]');
    function initOrDestroy() {

        if (tilts.length) {
            if (window.innerWidth < 992) {
                tilts.forEach(tilt => {
                    tilt.vanillaTilt.destroy();
                })
            } else {
                tilts.forEach(tilt => {
                    VanillaTilt.init(tilt);
                })
            }
        }
    }

    initOrDestroy()

    window.addEventListener('resize', initOrDestroy, false);

    // parallax
    // const rellax = new Rellax('.rellax');

});