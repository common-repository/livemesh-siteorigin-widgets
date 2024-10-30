/**
 * Reviews JS
 */
if (typeof (jQuery) != 'undefined') {

    (function ($) {
        "use strict";

        $(function () {


            var LSOW_Frontend = {

                init: function () {
                    this.output_custom_css();
                    this.carousel();
                    this.setup_parallax();
                    this.setup_ytp();
                    this.setup_animations();
                },

                setup_animations: function () {

                    /* Hide the elements if required to prepare for animation */
                    $(".lsow-visible-on-scroll:not(.animated)").css('opacity', 0);

                    "function" != typeof window.lsow_animate_widgets && (window.lsow_animate_widgets = function () {
                        "undefined" != typeof $.fn.livemeshWaypoint && $(".lsow-animate-on-scroll:not(.animated)").livemeshWaypoint(function () {
                            var animateClass = $(this.element).data("animation");
                            $(this.element).addClass("animated " + animateClass).css('opacity', 1);
                        }, {
                            offset: "85%"
                        })
                    });

                    window.setTimeout(lsow_animate_widgets, 500)
                },

                output_custom_css: function () {

                    var custom_css = lsow_settings['custom_css'];
                    if (custom_css !== undefined && custom_css != '') {
                        custom_css = '<style type="text/css">' + custom_css + '</style>';
                        $('head').append(custom_css);
                    }
                },

                isMobile: function () {
                    "use strict";
                    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                        return true;
                    }
                    return false;
                },

                vendor_prefix: function () {

                    var prefix;

                    function prefix() {
                        var styles = window.getComputedStyle(document.documentElement, '');
                        prefix = (Array.prototype.slice.call(styles).join('').match(/-(moz|webkit|ms)-/) || (styles.OLink === '' && ['', 'o']))[1];

                        return prefix;
                    }

                    prefix();

                    return prefix;
                },

                carousel: function () {

                    if ($().slick === undefined) {
                        return;
                    }

                    var carousel_elements = $('.lsow-carousel, .lsow-posts-carousel,.lsow-gallery-carousel');

                    carousel_elements.each(function () {

                        var carousel_elem = $(this);

                        var rtl = carousel_elem.attr( 'dir' ) === 'rtl';

                        var settings = carousel_elem.data('settings');

                        var arrows = settings['arrows'];

                        var dots = settings['dots'];

                        var autoplay = settings['autoplay'];

                        var adaptive_height = settings['adaptive_height'];

                        var autoplay_speed = parseInt(settings['autoplay_speed']) || 3000;

                        var animation_speed = parseInt(settings['animation_speed']) || 300;

                        var fade = ( 'fade' in settings && ( settings['fade'] === true ) );

                        var vertical = ( 'vertical' in settings && ( settings['vertical'] === true ) );

                        var pause_on_hover = settings['pause_on_hover'];

                        var pause_on_focus = ( 'pause_on_focus' in settings && ( settings['pause_on_focus'] == true ) );

                        var display_columns = parseInt(settings['display_columns']) || 4;

                        var scroll_columns = parseInt(settings['scroll_columns']) || 4;

                        var tablet_width = parseInt(settings['tablet_width']) || 800;

                        var tablet_display_columns = parseInt(settings['tablet_display_columns']) || 2;

                        var tablet_scroll_columns = parseInt(settings['tablet_scroll_columns']) || 2;

                        var mobile_width = parseInt(settings['mobile_width']) || 480;

                        var mobile_display_columns = parseInt(settings['mobile_display_columns']) || 1;

                        var mobile_scroll_columns = parseInt(settings['mobile_scroll_columns']) || 1;

                        carousel_elem.slick({
                            arrows: arrows,
                            dots: dots,
                            infinite: true,
                            autoplay: autoplay,
                            autoplaySpeed: autoplay_speed,
                            speed: animation_speed,
                            fade: false,
                            vertical: vertical,
                            pauseOnHover: pause_on_hover,
                            pauseOnFocus: pause_on_focus,
                            adaptiveHeight: adaptive_height,
                            slidesToShow: display_columns,
                            slidesToScroll: scroll_columns,
                            rtl: rtl,
                            responsive: [
                                {
                                    breakpoint: tablet_width,
                                    settings: {
                                        slidesToShow: tablet_display_columns,
                                        slidesToScroll: tablet_scroll_columns
                                    }
                                },
                                {
                                    breakpoint: mobile_width,
                                    settings: {
                                        slidesToShow: mobile_display_columns,
                                        slidesToScroll: mobile_scroll_columns
                                    }
                                }
                            ]
                        });
                    });
                },

                setup_parallax: function () {

                    var scroll = window.requestAnimationFrame ||
                        window.webkitRequestAnimationFrame ||
                        window.mozRequestAnimationFrame ||
                        window.msRequestAnimationFrame ||
                        window.oRequestAnimationFrame ||
                        function (callback) {
                            window.setTimeout(callback, 1000 / 600);
                        };

                    function init_parallax() {

                        if (LSOW_Frontend.isMobile() === false) {
                            var windowHeight = $(window).height();
                            $('.lsow-section-bg-parallax').each(function () {
                                var segment = $(this);
                                var elementHeight = segment.outerHeight(true);

                                /* Apply transform only when the element is in the viewport */
                                var boundingRect = segment[0].getBoundingClientRect();
                                if (boundingRect.bottom >= 0 && boundingRect.top <= windowHeight) {
                                    var distanceToCover = windowHeight + elementHeight;
                                    var pixelsMoved = windowHeight - boundingRect.top;
                                    var toTransform = 50; // only 50% of the image height is available for transforming
                                    var transformPercent = toTransform * Math.abs(pixelsMoved / distanceToCover);
                                    transformPercent = -transformPercent.toFixed(2); // not more than 2 decimal places for performance reasons

                                    segment.find('.lsow-parallax-bg').css('-' + LSOW_Frontend.vendor_prefix() + '-transform', 'translate3d(0px, ' + transformPercent + '%, 0px)');
                                }
                            });
                        }

                    }

                    if (this.isMobile() === false) {

                        // Call once to initialize parallax and then call on each scroll
                        scroll(init_parallax);
                        $(window).on('scroll', function () {
                            scroll(init_parallax);
                        });
                    }

                },

                setup_ytp: function () {

                    // Do not initialize YouTube backgrounds in mobile devices
                    if (this.isMobile() || $().youtube_background === undefined) {
                        return;
                    }

                    jQuery('[data-vbg]').youtube_background();

                },
            }

            LSOW_Frontend.init();

        });

    }(jQuery));

}