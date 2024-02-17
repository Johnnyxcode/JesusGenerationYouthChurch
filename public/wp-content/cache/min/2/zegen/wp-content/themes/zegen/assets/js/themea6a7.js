(function ($) {
    "use strict";
    var zegen_body_atts = zegen_ajax_var.body_atts;
    var responsive_width =
        zegen_body_atts && zegen_body_atts.res_width
            ? zegen_body_atts.res_width
            : 360;
    $(document).ready(function () {
        var $window = $(window);
        var $header_cont = $(
            ".portfolio-single-wrapper .portfolio-single-slide .item"
        );
        $header_cont.height($window.height());
        $window.resize(function () {
            $header_cont.height($window.height());
        });
        var css_out = "";
        $(".zegen-inline-css").each(function () {
            var shortcode = $(this);
            if (shortcode.attr("data-css")) {
                var shortcode_css = shortcode.attr("data-css");
                css_out += $.parseJSON(shortcode_css);
                shortcode.removeAttr("data-css");
            }
        });
        if (css_out != "") {
            $("head").append(
                '<style id="zegen-shortcode-styles">' + css_out + "</style>"
            );
        }
        $(document).on("click", ".secondary-space-toggle", function () {
            $(".secondary-space-toggle").toggleClass("active");
            $("body").toggleClass("secondary-active");
            var sec_width = $(".secondary-menu-area").width();
            var sec_pos = $(".secondary-menu-area").data("pos")
                ? $(".secondary-menu-area").data("pos")
                : "left";
            if (sec_pos == "overlay") {
                $(".secondary-menu-area").fadeToggle(500);
            } else if ($("body").hasClass("secondary-active")) {
                if (sec_pos == "left") {
                    if ($(".secondary-menu-area").hasClass("left-overlay")) {
                        $(".secondary-menu-area").animate(
                            { left: "0" },
                            {
                                duration: 500,
                                specialEasing: { left: "easeInOutExpo" },
                            }
                        );
                    } else {
                        $("body").toggleClass("secondary-push-actived");
                        $(".secondary-menu-area").animate(
                            { left: "0" },
                            { duration: 500 }
                        );
                        $("body").css("overflow", "hidden");
                        $("body .zegen-wrapper").animate(
                            { left: sec_width + "px" },
                            500
                        );
                        if ($(".sticky-outer").length) {
                            $(
                                ".sticky-outer .header-sticky, .sticky-outer .show-menu"
                            ).animate(
                                {
                                    left: sec_width + "px",
                                    right: "-" + sec_width + "px",
                                },
                                500
                            );
                        }
                    }
                } else {
                    if ($(".secondary-menu-area").hasClass("right-overlay")) {
                        $(".secondary-menu-area").animate(
                            { right: "0" },
                            {
                                duration: 500,
                                specialEasing: { right: "easeInOutExpo" },
                            }
                        );
                    } else {
                        $("body").toggleClass("secondary-push-actived");
                        $(".secondary-menu-area").animate(
                            { right: "0" },
                            { duration: 500 }
                        );
                        $("body").css("overflow", "hidden");
                        $("body .zegen-wrapper").animate(
                            { right: sec_width + "px" },
                            500
                        );
                        if ($(".sticky-outer").length) {
                            $(
                                ".sticky-outer .header-sticky, .sticky-outer .show-menu"
                            ).animate(
                                {
                                    right: sec_width + "px",
                                    left: "-" + sec_width + "px",
                                },
                                500
                            );
                        }
                    }
                }
            } else {
                if (sec_pos == "left") {
                    if ($(".secondary-menu-area").hasClass("left-overlay")) {
                        $(".secondary-menu-area").animate(
                            { left: "-" + sec_width + "px" },
                            {
                                duration: 500,
                                specialEasing: { left: "easeInOutExpo" },
                            }
                        );
                    } else {
                        $("body").toggleClass("secondary-push-actived");
                        $(".secondary-menu-area").animate(
                            { left: "-" + sec_width + "px" },
                            { duration: 500 }
                        );
                        $("body .zegen-wrapper").animate(
                            { left: 0 },
                            500,
                            function () {
                                $("body").css("overflow-y", "scroll");
                            }
                        );
                        if ($(".sticky-outer").length) {
                            $(
                                ".sticky-outer .header-sticky, .sticky-outer .show-menu"
                            ).animate({ left: 0, right: 0 }, 500);
                        }
                    }
                } else {
                    if ($(".secondary-menu-area").hasClass("right-overlay")) {
                        $(".secondary-menu-area").animate(
                            { right: "-" + sec_width + "px" },
                            {
                                duration: 500,
                                specialEasing: { right: "easeInOutExpo" },
                            }
                        );
                    } else {
                        $("body").toggleClass("secondary-push-actived");
                        $(".secondary-menu-area").animate(
                            { right: "-" + sec_width + "px" },
                            { duration: 500 }
                        );
                        $("body .zegen-wrapper").animate(
                            { right: 0 },
                            500,
                            function () {
                                $("body").css("overflow-y", "scroll");
                            }
                        );
                        if ($(".sticky-outer").length) {
                            $(
                                ".sticky-outer .header-sticky, .sticky-outer .show-menu"
                            ).animate({ right: 0, left: 0 }, 500);
                        }
                    }
                }
            }
            if ($(".rev_slider_wrapper").length) {
                $(".rev_slider_wrapper").css("left", "inherit");
            }
            return !1;
        });
        if ($(".sticky-header-space").length) {
            $(".sticky-header-space .zegen-main-menu")
                .find(".menu-item-has-children")
                .append('<span class="zmm-dropdown-toggle ti-plus"></span>');
            $(".sticky-header-space .zegen-main-menu")
                .find(".sub-menu")
                .slideToggle();
            $(".sticky-header-space .zmm-dropdown-toggle").on(
                "click",
                function () {
                    var parent = $(this).parent("li").children(".sub-menu");
                    $(this).parent("li").children(".sub-menu").slideToggle();
                    $(this).toggleClass("ti-minus");
                    if ($(parent).find(".sub-menu").length) {
                        $(parent).find(".sub-menu").slideUp();
                        $(parent)
                            .find(".zmm-dropdown-toggle")
                            .removeClass("ti-minus");
                    }
                }
            );
        }
        var win_width = $(window).width();
        if (responsive_width) {
            zegen_set_custom_hidden_elements(win_width, responsive_width);
        }
        $(document).on("click", ".full-search-toggle", function () {
            $(".full-search-wrapper").toggleClass("search-wrapper-opened");
            $(".full-search-wrapper").fadeToggle(500);
            var search_in = $(".search-wrapper-opened").find(
                "input.form-control"
            );
            search_in.focus();
            return !1;
        });
        $(document).on("click", ".mobile-bar-toggle", function () {
            $(".mobile-bar").toggleClass("active");
            $("body").toggleClass("mobile-bar-active");
            if ($(".mobile-bar").hasClass("animate-from-left")) {
                if ($(".mobile-bar").hasClass("active"))
                    $(".mobile-bar").animate(
                        { left: 0 },
                        {
                            duration: 500,
                            specialEasing: { left: "easeInOutExpo" },
                        }
                    );
                else
                    $(".mobile-bar").animate(
                        { left: "-100%" },
                        {
                            duration: 500,
                            specialEasing: { left: "easeInOutExpo" },
                        }
                    );
            }
            if ($(".mobile-bar").hasClass("animate-from-right")) {
                if ($(".mobile-bar").hasClass("active"))
                    $(".mobile-bar").animate(
                        { right: 0 },
                        {
                            duration: 500,
                            specialEasing: { right: "easeInOutExpo" },
                        }
                    );
                else
                    $(".mobile-bar").animate(
                        { right: "-100%" },
                        {
                            duration: 500,
                            specialEasing: { right: "easeInOutExpo" },
                        }
                    );
            }
            if ($(".mobile-bar").hasClass("animate-from-top")) {
                if ($(".mobile-bar").hasClass("active"))
                    $(".mobile-bar").animate(
                        { top: 0 },
                        {
                            duration: 500,
                            specialEasing: { top: "easeInOutExpo" },
                        }
                    );
                else
                    $(".mobile-bar").animate(
                        { top: "-100%" },
                        {
                            duration: 500,
                            specialEasing: { top: "easeInOutExpo" },
                        }
                    );
            }
            if ($(".mobile-bar").hasClass("animate-from-bottom")) {
                if ($(".mobile-bar").hasClass("active"))
                    $(".mobile-bar").animate(
                        { bottom: 0 },
                        {
                            duration: 500,
                            specialEasing: { bottom: "easeInOutExpo" },
                        }
                    );
                else
                    $(".mobile-bar").animate(
                        { bottom: "-100%" },
                        {
                            duration: 500,
                            specialEasing: { bottom: "easeInOutExpo" },
                        }
                    );
            }
            return !1;
        });
        if ($(".mobile-bar").length) {
            if (
                $(".zegen-main-menu").length ||
                $(".secondary-menu-area-inner ul.menu").length
            ) {
                var main_menu = ".zegen-main-menu";
                if (!$(".zegen-main-menu").length) {
                    $(".secondary-menu-area-inner ul.menu").addClass(
                        "zegen-main-menu"
                    );
                }
                var mobile_menu = ".mobile-bar .zegen-mobile-main-menu";
                var find_classes =
                    ".dropdown, .mega-dropdown, .dropdown-toggle, .dropdown-menu, .mega-dropdown-menu, .mega-child-heading, .mega-child-dropdown, .mega-child-dropdown-menu, .hidden-xs-up, .row, .mega-sub-dropdown, .mega-sub-dropdown-menu, .mega-sub-child, .mega-sub-child-inner, .left-side";
                var removable_classes =
                    "dropdown mega-dropdown dropdown-toggle dropdown-menu mega-dropdown-menu mega-child-heading mega-child-dropdown mega-child-dropdown-menu hidden-xs-up row mega-sub-dropdown mega-sub-dropdown-menu mega-sub-child mega-sub-child-inner left-side";
                if ($(mobile_menu).html() == "")
                    $(main_menu).clone().appendTo(mobile_menu);
                $(mobile_menu + " " + main_menu).addClass("flex-column");
                $(mobile_menu + " .mega-child-widget")
                    .parent("li.menu-item")
                    .remove();
                $(mobile_menu + " .mega-child-divider").remove();
                $(mobile_menu + " .menu-item-logo").remove();
                $(mobile_menu + " li.menu-item").removeClass(function (
                    index,
                    css
                ) {
                    return (css.match(/\bcol-\S+/g) || []).join(" ");
                });
                $(mobile_menu + " li.menu-item").removeClass(function (
                    index,
                    css
                ) {
                    return (css.match(/\bmax-col-\S+/g) || []).join(" ");
                });
                $(mobile_menu)
                    .find(
                        ".dropdown-menu, .mega-child-dropdown-menu, .mega-sub-child-inner"
                    )
                    .toggleClass("sub-menu");
                $(mobile_menu + " .mega-child-item-disabled").replaceWith(
                    "<a class='nav-link' href='#'>" +
                        $(mobile_menu + " .mega-child-item-disabled").html() +
                        "</a>"
                );
                $(mobile_menu)
                    .find(find_classes)
                    .removeClass(removable_classes);
                $(mobile_menu + " .sub-menu").css("background", "none");
                $(".mobile-bar " + main_menu)
                    .find(".menu-item-has-children")
                    .append(
                        '<span class="zmm-dropdown-toggle ti-plus"></span>'
                    );
                $(".mobile-bar " + main_menu)
                    .find(".sub-menu")
                    .slideToggle();
                $(".mobile-bar " + main_menu)
                    .removeClass("zegen-main-menu")
                    .addClass("zegen-mobile-menu");
                $(".mobile-bar .zmm-dropdown-toggle").on("click", function () {
                    var parent = $(this).parent("li").children(".sub-menu");
                    $(this).parent("li").children(".sub-menu").slideToggle();
                    $(this).toggleClass("ti-minus");
                    if ($(parent).find(".sub-menu").length) {
                        $(parent).find(".sub-menu").slideUp();
                        $(parent)
                            .find(".zmm-dropdown-toggle")
                            .removeClass("ti-minus");
                    }
                });
            }
        }
        if ($(".secondary-menu-area-inner ul.menu").length) {
            var sec_menu = ".secondary-menu-area-inner ul.menu";
            $(sec_menu).addClass("flex-column");
            $(sec_menu)
                .find(".menu-item-has-children")
                .append('<span class="zmm-dropdown-toggle ti-plus"></span>');
            $(sec_menu).find(".sub-menu").slideToggle();
            $(sec_menu + " .zmm-dropdown-toggle").on("click", function () {
                var parent = $(this).parent("li").children(".sub-menu");
                $(this).parent("li").children(".sub-menu").slideToggle();
                $(this).toggleClass("ti-minus");
                if ($(parent).find(".sub-menu").length) {
                    $(parent).find(".sub-menu").slideUp();
                    $(parent)
                        .find(".zmm-dropdown-toggle")
                        .removeClass("ti-minus");
                }
            });
        }
        if ($(".twitter-slider").length) {
            $(".twitter-slider").each(function () {
                var twit_slider = $(this);
                var slide = twit_slider.attr("data-show");
                twit_slider.easyTicker({
                    direction: "up",
                    visible: parseInt(slide),
                    easing: "swing",
                    interval: 4000,
                });
            });
        }
        var cur_offset = 0;
        var o_stat = 0;
        $(
            ".zegen-main-menu li.menu-item, .zegen-mobile-menu li.menu-item"
        ).each(function (index) {
            var cur_item = this;
            var target = $(cur_item).children("a").attr("href");
            if (target && target.indexOf("#section-") != -1) {
                o_stat = 1;
                var res = target.split("#");
                if (res.length == 2) {
                    $(cur_item).children("a").attr("data-target", res[0]);
                    $(cur_item)
                        .children("a")
                        .attr("href", "#" + res[1]);
                }
            }
        });
        if (o_stat) {
            if (
                $(".zegen-main-menu .menu-item").find('a[href="#section-top"]')
                    .length
            ) {
                $("body").attr("id", "section-top");
            }
            $(
                ".zegen-main-menu li.menu-item, .zegen-mobile-menu li.menu-item"
            ).removeClass("current-menu-item");
            $(window).on("scroll", function () {
                var minus_height = $("#wpadminbar").length
                    ? $("#wpadminbar").outerHeight()
                    : 0;
                minus_height +=
                    win_width >= zegen_body_atts.res_width
                        ? parseInt(zegen_body_atts.menu_offset) + 1
                        : parseInt(zegen_body_atts.mobile_menu_offset);
                $('section.elementor-section[id*="section-"], body').each(
                    function () {
                        var anchored = $(this).attr("id"),
                            targetOffset = $(this).offset().top - minus_height;
                        if ($(window).scrollTop() > targetOffset) {
                            $(".zegen-main-menu .menu-item")
                                .find("a")
                                .removeClass("active");
                            $(".zegen-main-menu .menu-item")
                                .find('a[href="#' + anchored + '"]')
                                .addClass("active");
                            $(".zegen-mobile-menu .menu-item")
                                .find("a")
                                .removeClass("active");
                            $(".zegen-mobile-menu .menu-item")
                                .find('a[href="#' + anchored + '"]')
                                .addClass("active");
                        }
                    }
                );
            });
            $(
                '.zegen-main-menu .menu-item > a[href^="#section-"], .zegen-mobile-main-menu .menu-item > a[href^="#section-"]'
            ).on("click", function (e) {
                var cur_item = this;
                var target = $(cur_item).attr("href");
                if ($(cur_item).parents(".zegen-mobile-main-menu").length) {
                    $(".mobile-bar-toggle.close").trigger("click");
                }
                if ($(".secondary-menu-area")) {
                    $(
                        ".secondary-menu-area .secondary-space-toggle.active"
                    ).trigger("click");
                }
                var target_id = target.slice(
                    target.indexOf("#"),
                    target.length
                );
                var cur_url =
                    location.protocol +
                    "//" +
                    location.host +
                    location.pathname;
                var data_targ = $(cur_item).attr("data-target");
                var another_page = !1;
                if (target_id == "#section-top" && data_targ != "") {
                    if (cur_url != data_targ) {
                        another_page = !0;
                    }
                }
                if ($(target_id).length && !another_page) {
                    var minus_height = $("#wpadminbar").length
                        ? $("#wpadminbar").outerHeight()
                        : 0;
                    minus_height +=
                        win_width >= zegen_body_atts.res_width
                            ? parseInt(zegen_body_atts.menu_offset)
                            : parseInt(zegen_body_atts.mobile_menu_offset);
                    var offs = $(target_id).offset().top - minus_height;
                    var sec_ani_call = 1;
                    if (target_id == "#section-top") {
                        sec_ani_call = 1;
                        offs = 0;
                    }
                    $("html,body").animate(
                        { scrollTop: offs },
                        0,
                        "easeInOutExpo"
                    );
                    return !1;
                } else {
                    if (target_id == "#section-top" && cur_url == data_targ) {
                        $("html,body").animate(
                            { scrollTop: 0 },
                            0,
                            "easeInOutExpo"
                        );
                        return !1;
                    } else {
                        if (cur_url != data_targ && target_id != "#") {
                            window.location.href = data_targ + target;
                        } else {
                            window.location.href = target;
                        }
                    }
                }
            });
        }
        if ($(".back-to-top").length) {
            $(document).on("click", "#back-to-top", function () {
                $("html,body").animate({ scrollTop: 0 }, 0, "easeInOutExpo");
                return !1;
            });
            $(document).scroll(function () {
                var y = $(this).scrollTop();
                if (y > 300) $("#back-to-top").fadeIn();
                else $("#back-to-top").fadeOut();
            });
        }
        if ($(".top-sliding-bar").length) {
            $(document).on("click", ".top-sliding-toggle", function () {
                $(".top-sliding-bar-inner").slideToggle();
                $(".top-sliding-toggle").toggleClass("ti-minus");
                return !1;
            });
        }
        if ($(".sticky-header-space").length) {
            var elem_pos = $(".sticky-header-space").hasClass("left-sticky")
                ? "left"
                : "right";
            var elem_width = $(".sticky-header-space").outerWidth();
            zegen_sticky_header_adjust(elem_pos, elem_width);
            $(window).resize(function () {
                zegen_sticky_header_adjust(elem_pos, elem_width);
            });
        }
        if ($(".textbox-search-toggle").length) {
            $(document).on("click", ".textbox-search-toggle", function () {
                $(this).parents(".search-toggle-wrap").toggleClass("active");
                setTimeout(function () {
                    $(".search-toggle-wrap").find("input.form-control").focus();
                }, 500);
                return !1;
            });
        } else if ($(".full-bar-search-toggle").length) {
            $(document).on("click", ".full-bar-search-toggle", function () {
                $(".full-bar-search-wrap").toggleClass("active");
                setTimeout(function () {
                    $(".full-bar-search-wrap")
                        .find("input.form-control")
                        .focus();
                }, 500);
                return !1;
            });
        } else if ($(".bottom-search-toggle").length) {
            $(document).on("click", ".bottom-search-toggle", function () {
                $(this).parents(".search-toggle-wrap").toggleClass("active");
                setTimeout(function () {
                    $(".search-toggle-wrap").find("input.form-control").focus();
                }, 500);
                return !1;
            });
        }
        if ($(".footer-fixed").length) {
            if ($(window).width() > 1023) {
                $(".zegen-wrapper").css({
                    "margin-bottom": $(".footer-fixed").outerHeight() + "px",
                });
            } else {
                $(".zegen-wrapper").css({ "margin-bottom": "0" });
            }
        } else if ($(".footer-bottom-fixed").length) {
            if ($(window).width() > 1023) {
                $(".zegen-wrapper").css({
                    "margin-bottom":
                        $(".footer-bottom-fixed").outerHeight() + "px",
                });
            } else {
                $(".zegen-wrapper").css({ "margin-bottom": "0" });
            }
        }
        $(window).resize(function () {
            if ($(".footer-fixed").length) {
                if ($(window).width() > 1023) {
                    $(".zegen-wrapper").css({
                        "margin-bottom":
                            $(".footer-fixed").outerHeight() + "px",
                    });
                } else {
                    $(".zegen-wrapper").css({ "margin-bottom": "0" });
                }
            } else if ($(".footer-bottom-fixed").length) {
                if ($(window).width() > 1023) {
                    $(".zegen-wrapper").css({
                        "margin-bottom":
                            $(".footer-bottom-fixed").outerHeight() + "px",
                    });
                } else {
                    $(".zegen-wrapper").css({ "margin-bottom": "0" });
                }
            }
        });
        if ($(".parallax-item").length) {
            $.stellar({ horizontalScrolling: !1, verticalOffset: 40 });
        }
        if ($(".zoom-gallery").length) {
            $(".zoom-gallery").magnificPopup({
                delegate: "a",
                type: "image",
                closeOnContentClick: !1,
                closeBtnInside: !1,
                mainClass: "mfp-with-zoom mfp-img-mobile",
                gallery: { enabled: !0 },
                zoom: {
                    enabled: !0,
                    duration: 300,
                    opener: function (element) {
                        return element.find("img");
                    },
                },
            });
        }
        if ($(".image-gallery .image-gallery-link").length) {
            $(".image-gallery").magnificPopup({
                delegate: ".image-gallery-link",
                type: "image",
                closeOnContentClick: !1,
                closeBtnInside: !1,
                mainClass: "mfp-with-zoom mfp-img-mobile",
                gallery: { enabled: !0 },
            });
        }
        if (
            $(".popup-video-post, .popup-audio-post, .zegen-popup-gmaps").length
        ) {
            $(
                ".popup-video-post, .popup-audio-post, .zegen-popup-gmaps"
            ).magnificPopup({
                disableOn: 700,
                type: "iframe",
                mainClass: "mfp-fade",
                removalDelay: 160,
                preloader: !1,
                fixedContentPos: !1,
            });
        }
        if ($(".popup-with-zoom-anim").length) {
            $(".popup-with-zoom-anim").magnificPopup({
                disableOn: 700,
                type: "inline",
                mainClass: "mfp-fade",
                removalDelay: 160,
                preloader: !1,
                fixedContentPos: !1,
                callbacks: {
                    open: function () {
                        if (!$(this.content).find("video").length) {
                            var parent = $(this.content).parent(
                                "post-video-wrap"
                            );
                            var url = $(this.content).find("span").data("url");
                            var video =
                                '<video width="100%" height="450" preload="true" style="max-width:100%;" autoplay="true"><source src="' +
                                url +
                                '" type="video/mp4"></video>';
                            $(this.content).find("span").replaceWith(video);
                        } else {
                            $(this.content).find("video")[0].load();
                        }
                    },
                    close: function () {
                        $(this.content).find("video")[0].pause();
                    },
                },
            });
        }
        if ($(".modal-popup-content").length) {
            $(".modal-box-trigger").magnificPopup({
                type: "inline",
                preloader: !1,
                focus: "#username",
                modal: !0,
                mainClass: "mfp-fade",
                removalDelay: 300,
            });
            $(document).on("click", ".popup-modal-dismiss", function (e) {
                e.preventDefault();
                $.magnificPopup.close();
            });
        }
        if ($(".post-quote-wrap, .post-link-wrap").length) {
            $(".post-quote-wrap, .post-link-wrap").each(function () {
                var img_url = $(this).data("url");
                if (img_url) {
                    $(this).css("background-image", "url(" + img_url + ")");
                }
            });
        }
        if ($(".set-bg-img").length) {
            $(".set-bg-img").each(function () {
                var img_url = $(this).data("src");
                if (img_url) {
                    $(this).css("background-image", "url(" + img_url + ")");
                }
            });
        }
        if ($(".zegen-sticky-wrapper").length) {
            $("a.zegen-sticky-trigger").on("click", function (e) {
                $(this).parent(".zegen-sticky-wrapper").toggleClass("active");
                return !1;
            });
        }
        if ($("a.onclick-video-post").length) {
            $(document).on("click", "a.onclick-video-post", function () {
                var parent = $(this).parent(".post-video-wrap");
                var frame =
                    '<iframe src="' +
                    $(this).attr("href") +
                    '?autoplay=1" width="100%" height="' +
                    parent.height() +
                    '" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>';
                $(this).fadeOut(300);
                $(this).replaceWith(frame);
                return !1;
            });
        }
        if ($("a.onclick-custom-video").length) {
            $(document).on("click", ".onclick-custom-video", function () {
                var parent = $(this).parent(".post-video-wrap");
                var video =
                    '<video width="100%" height="' +
                    parent.height() +
                    '" preload="true" style="max-width:100%;" autoplay="true"><source src="' +
                    $(this).data("url") +
                    '" type="video/mp4"></video>';
                $(this).fadeOut(300);
                $(this).replaceWith(video);
                return !1;
            });
        }
        if ($("#page-title-bg .page-title-wrap-inner").length) {
            $("#page-title-bg .page-title-wrap-inner").YTPlayer();
        }
        if ($(".comment-like-wrapper").length) {
            $(document).on("click", ".comment-like", function (event) {
                var cmt_cur = $(this);
                var cmt_meta = cmt_cur.data("id");
                var cmt_id = cmt_cur.data("cmt-id");
                var parent = cmt_cur.parents(".comment-like-wrapper");
                if (cmt_meta == "1") {
                    cmt_cur
                        .parents(".list-inline")
                        .find(".comment-liked")
                        .removeClass("theme-color comment-liked")
                        .addClass("comment-like");
                    cmt_cur
                        .removeClass("comment-like")
                        .addClass("theme-color comment-liked");
                } else {
                    cmt_cur
                        .parents(".list-inline")
                        .find(".comment-liked")
                        .removeClass("theme-color comment-liked")
                        .addClass("comment-like");
                    cmt_cur
                        .removeClass("comment-like")
                        .addClass("theme-color comment-liked");
                }
                if (cmt_id != "" && cmt_meta != "") {
                    jQuery.ajax({
                        type: "post",
                        url: zegen_ajax_var.admin_ajax_url,
                        data:
                            "action=comment_like&nonce=" +
                            zegen_ajax_var.cmt_nonce +
                            "&cmt_id=" +
                            cmt_id +
                            "&cmt_meta=" +
                            cmt_meta,
                        success: function (res) {
                            $(parent).html(res);
                        },
                        error: function (jqXHR, exception) {
                            console.log(jqXHR);
                        },
                    });
                }
                return !1;
            });
        }
        if ($(".zozo-mc").length) {
            $(".zozo-mc").on("click", function () {
                var c_btn = $(this);
                var mc_wrap = $(this).parents(".mailchimp-wrapper");
                var mc_form = $(this).parents(".zozo-mc-form");
                if (mc_form.find('input[name="zozo_mc_email"]').val() == "") {
                    mc_wrap
                        .find(".mc-notice-msg")
                        .text(zegen_ajax_var.must_fill);
                } else {
                    c_btn.attr("disabled", "disabled");
                    $.ajax({
                        type: "POST",
                        url: zegen_ajax_var.admin_ajax_url,
                        data:
                            "action=zozo-mc&nonce=" +
                            zegen_ajax_var.mc_nounce +
                            "&" +
                            mc_form.serialize(),
                        success: function (data) {
                            c_btn.removeAttr("disabled");
                            mc_wrap
                                .find(".mc-notice-msg")
                                .removeClass("mc-success mc-failed");
                            if (data == "success") {
                                mc_wrap
                                    .find(".mc-notice-msg")
                                    .addClass("mc-success");
                                mc_wrap
                                    .find(".mc-notice-msg")
                                    .text(
                                        mc_wrap
                                            .find(".mc-notice-group")
                                            .attr("data-success")
                                    );
                            } else {
                                mc_wrap
                                    .find(".mc-notice-msg")
                                    .addClass("mc-failed");
                                mc_wrap
                                    .find(".mc-notice-msg")
                                    .text(
                                        mc_wrap
                                            .find(".mc-notice-group")
                                            .attr("data-fail")
                                    );
                            }
                        },
                        error: function (xhr, status, error) {
                            c_btn.removeAttr("disabled");
                            mc_wrap
                                .find(".mc-notice-msg")
                                .removeClass("mc-success mc-failed");
                            mc_wrap
                                .find(".mc-notice-msg")
                                .addClass("mc-failed");
                            mc_wrap
                                .find(".mc-notice-msg")
                                .text(
                                    mc_wrap
                                        .find(".mc-notice-group")
                                        .attr("data-fail")
                                );
                        },
                    });
                }
            });
        }
        if ($(".fb-comments-wrapper").length) {
            $(window).resize(function () {
                setTimeout(function () {
                    if ($(window).width() <= 768) {
                        $(".fb-comments-wrapper iframe").width(
                            $(".content-area").width()
                        );
                    } else {
                        $(".fb-comments-wrapper iframe").width(
                            $(".content-area .fb-comments").data("width")
                        );
                    }
                }, 200);
            });
        }
        if ($(".popover-wrapper .popover-trigger").length) {
            $(".popover-trigger").each(function (index) {
                var evnt_name = $(this).attr("data-event")
                    ? $(this).attr("data-event")
                    : "hover";
                $(this).on(evnt_name, function (e) {
                    e.preventDefault();
                    $(this)
                        .parents(".popover-wrapper")
                        .toggleClass("popover-active");
                });
            });
        }
        if ($(".sermon-download-all").length) {
            $(".sermon-download-all").on("click", function (e) {
                var cur_parent = $(this).parents("ul.sermon-tool-list");
                if ($(cur_parent).find(".sermon-video-link").length)
                    $(cur_parent).find(".sermon-video-link").get(0).click();
                if ($(cur_parent).find(".sermon-audio-link").length)
                    $(cur_parent).find(".sermon-audio-link").get(0).click();
                if ($(cur_parent).find(".sermon-pdf-link").length)
                    $(cur_parent).find(".sermon-pdf-link").get(0).click();
                return !1;
            });
        }
        $(window).scroll(function () {
            zegen_scroll_animation();
        });
    });
    $(window).load(function () {
        setTimeout(zegen_center_menu_margin, 300);
        zegen_set_sticky_outer_height();
        if ($(".header-inner .sticky-head").length) {
            zegen_sticky_part(".header-inner");
        }
        if ($(".header-inner .sticky-scroll").length) {
            zegen_sticky_scroll_up_part(".header-inner", "header");
        }
        if ($(".mobile-header-inner .sticky-head").length) {
            zegen_sticky_part(".mobile-header-inner");
        }
        if ($(".mobile-header-inner .sticky-scroll").length) {
            zegen_sticky_scroll_up_part(
                ".mobile-header-inner",
                ".mobile-header"
            );
        }
        if ($(".page-loader").length) {
            $(".page-loader").fadeOut("slow");
        } else if ($("body.opacity-zero").length) {
            $("body").removeClass("opacity-zero");
            $("body").addClass("opacity-one");
        } else if (zegen_body_atts.core_stat == !0) {
            $("body").addClass("opacity-one");
        }
        if ($(".header-slider-wrapper").length) {
            $(".header-slider-wrapper").css({ height: "auto" });
        }
        if ($(".grid-layout.grid-normal").length) {
            $(".grid-layout.grid-normal").each(function () {
                var c_elem = $(this);
                var parent_width = c_elem.width();
                var gutter_size = c_elem.data("gutter");
                var grid_cols = c_elem.data("cols");
                var net_width = Math.floor(
                    (parent_width - gutter_size * (grid_cols - 1)) / grid_cols
                );
                var gn_ele = 1;
                c_elem.children("article").each(function () {
                    if (gn_ele % grid_cols == 0) {
                        $(this).css({
                            width: net_width + "px",
                            "margin-right": "0",
                            "margin-bottom": gutter_size + "px",
                        });
                    } else {
                        $(this).css({
                            width: net_width + "px",
                            "margin-right": gutter_size + "px",
                            "margin-bottom": gutter_size + "px",
                        });
                    }
                    gn_ele++;
                });
                c_elem.children("article").addClass("grid-dyno-visible");
                $(window).resize(function () {
                    setTimeout(function () {
                        parent_width = c_elem.width();
                        var mgrid_cols = 1;
                        if ($(window).width() < 768) {
                            mgrid_cols = 1;
                        } else {
                            mgrid_cols = grid_cols;
                        }
                        var net_width = Math.floor(
                            (parent_width - gutter_size * (mgrid_cols - 1)) /
                                mgrid_cols
                        );
                        var gn_ele = 1;
                        c_elem.children("article").each(function () {
                            if (gn_ele % mgrid_cols == 0) {
                                $(this).css({
                                    width: net_width + "px",
                                    "margin-right": "0",
                                    "margin-bottom": gutter_size + "px",
                                });
                            } else {
                                $(this).css({
                                    width: net_width + "px",
                                    "margin-right": gutter_size + "px",
                                    "margin-bottom": gutter_size + "px",
                                });
                            }
                            gn_ele++;
                        });
                    }, 200);
                });
                c_elem
                    .find(".top-standard-post article")
                    .css({ width: "auto" });
            });
        }
        $(".owl-carousel").each(function () {
            if (!$(this).parents(".isotope").length) {
                zegen_owl_settings($(this));
            }
        });
        if ($(".grid-layout > .isotope").length) {
            $(".grid-layout > .isotope").each(function () {
                var c_elem = $(this);
                var parent_width = c_elem.width();
                var gutter_size = c_elem.data("gutter");
                var grid_cols = c_elem.data("cols");
                var layoutmode = c_elem.is("[data-layout]")
                    ? c_elem.data("layout")
                    : "";
                layoutmode = layoutmode ? layoutmode : "masonry";
                if ($(window).width() < 768) grid_cols = 1;
                var net_width = Math.floor(
                    (parent_width - gutter_size * (grid_cols - 1)) / grid_cols
                );
                c_elem.find("article").css({
                    width: net_width + "px",
                    "margin-bottom": gutter_size + "px",
                });
                if ($(".top-standard-post").length) {
                    $(".top-standard-post article").css({
                        "margin-bottom": gutter_size + "px",
                    });
                }
                c_elem.find(".owl-carousel").each(function () {
                    zegen_owl_settings($(this));
                });
                c_elem.find("video").each(function (index) {
                    $(this).attr("src", $(this).find("source").attr("src"));
                    $(this).css({ height: "200px" });
                });
                var filter = "*";
                var isot_parent = c_elem.parent(".grid-layout");
                if ($(isot_parent).attr("data-filter-stat") == 0) {
                    filter = $(isot_parent).attr("data-first-cat")
                        ? "." + $(isot_parent).attr("data-first-cat")
                        : "*";
                }
                c_elem.imagesLoaded(function () {
                    c_elem.isotope({
                        itemSelector: "article",
                        layoutMode: layoutmode,
                        filter: filter,
                        masonry: { gutter: gutter_size },
                        fitRows: { gutter: gutter_size },
                    });
                });
                c_elem.children("article").addClass("grid-dyno-visible");
                if ($(".portfolio-filter").length) {
                    $(".portfolio-filter-item").on("click", function () {
                        $(this)
                            .parents("ul.nav")
                            .find("li")
                            .removeClass("active");
                        $(this).parent("li").addClass("active");
                        var filterValue = $(this).attr("data-filter");
                        c_elem = $(this)
                            .parents(".portfolio-wrapper")
                            .find(".grid-layout .isotope");
                        c_elem.isotope({ filter: filterValue });
                        return !1;
                    });
                }
                $(window).resize(function () {
                    setTimeout(function () {
                        grid_cols = c_elem.data("cols");
                        if ($(window).width() < 768) grid_cols = 1;
                        var parent_width = c_elem.width();
                        net_width = Math.floor(
                            (parent_width - gutter_size * (grid_cols - 1)) /
                                grid_cols
                        );
                        c_elem.find("article").css({ width: net_width + "px" });
                        c_elem.imagesLoaded(function () {
                            var $isot = c_elem.isotope({
                                itemSelector: "article",
                                masonry: { gutter: gutter_size },
                            });
                            $isot.on("arrangeComplete", isotopeArrange);
                        });
                    }, 200);
                });
                if (
                    c_elem.data("infinite") == 1 &&
                    $(".post-pagination").length
                ) {
                    c_elem.infinitescroll(
                        {
                            navSelector: ".post-pagination",
                            nextSelector: "a.next-page",
                            itemSelector: "article",
                            loading: {
                                msgText: zegen_ajax_var.load_posts,
                                finishedMsg: zegen_ajax_var.no_posts,
                                img: zegen_ajax_var.infinite_loader,
                            },
                        },
                        function (newElements) {
                            var elems = $(newElements);
                            var net_width = Math.floor(
                                (parent_width - gutter_size * (grid_cols - 1)) /
                                    grid_cols
                            );
                            c_elem.find("article").css({
                                width: net_width + "px",
                                "margin-bottom": gutter_size + "px",
                            });
                            if ($(".top-standard-post").length) {
                                $(".top-standard-post article").css({
                                    "margin-bottom": gutter_size + "px",
                                });
                            }
                            c_elem.find(".owl-carousel").each(function () {
                                zegen_owl_settings($(this));
                            });
                            elems.find("video").each(function (index) {
                                $(this).attr(
                                    "src",
                                    $(this).find("source").attr("src")
                                );
                                $(this).css({ height: "200px" });
                            });
                            elems.imagesLoaded(function () {
                                c_elem.isotope("appended", elems);
                                elems.addClass("grid-dyno-visible");
                            });
                            if (
                                c_elem.find("article").hasClass("zegen-animate")
                            ) {
                                zegen_scroll_animation();
                            }
                        }
                    );
                }
            });
        }
        if ($(".related-slider .empty-post-image").length) {
            if ($(".related-slider .item .wp-post-image").length) {
                $(".related-slider .item .empty-post-image").height(
                    $(".related-slider .item .wp-post-image").height()
                );
            }
        }
        if ($(".featured-slider .empty-post-image").length) {
            if ($(".featured-slider .item .wp-post-image").length) {
                $(".featured-slider .item .empty-post-image").height(
                    $(".featured-slider .item .wp-post-image").height()
                );
            }
        }
        if ($(".zegen-sticky-obj").length) {
            var $sticky_sidebars = $(".zegen-sticky-obj");
            if ($(window).width() > 767) {
                $sticky_sidebars.stick_in_parent();
            }
            $(window).resize(function () {
                if ($(window).width() > 767) {
                    $sticky_sidebars.trigger("sticky_kit:detach");
                    $sticky_sidebars.stick_in_parent();
                    $sticky_sidebars.trigger("sticky_kit:recalc");
                } else {
                    $sticky_sidebars.trigger("sticky_kit:detach");
                }
            });
        }
        if ($(".circle-progress-circle").length) {
            var circle = $(".circle-progress-circle");
            circle.appear(function () {
                var c_circle = $(this);
                var c_value = c_circle.attr("data-value");
                var c_size = c_circle.attr("data-size");
                var c_thickness = c_circle.attr("data-thickness");
                var c_duration = c_circle.attr("data-duration");
                var c_empty =
                    c_circle.attr("data-empty") != ""
                        ? c_circle.attr("data-empty")
                        : "transparent";
                var c_scolor = c_circle.attr("data-scolor");
                var c_ecolor =
                    c_circle.attr("data-ecolor") != ""
                        ? c_circle.attr("data-ecolor")
                        : c_scolor;
                c_circle
                    .circleProgress({
                        value: Math.floor(c_value) / 100,
                        size: Math.floor(c_size),
                        thickness: Math.floor(c_thickness),
                        emptyFill: c_empty,
                        animation: { duration: Math.floor(c_duration) },
                        lineCap: "round",
                        fill: { gradient: [c_scolor, c_ecolor] },
                    })
                    .on(
                        "circle-animation-progress",
                        function (event, progress) {
                            $(this)
                                .find(".progress-value")
                                .html(Math.round(c_value * progress) + "%");
                        }
                    );
            });
        }
        if ($(".day-counter").length) {
            $(".day-counter").each(function () {
                var day_counter = $(this);
                var dprogress = $(day_counter).hasClass("day-counter-progress")
                    ? !0
                    : !1;
                var c_date = day_counter.attr("data-date");
                day_counter.countdown(c_date, function (event) {
                    if (day_counter.find(".counter-day").length) {
                        day_counter
                            .find(".counter-day h3")
                            .text(event.strftime("%D"));
                        if (dprogress) {
                            var yr = parseInt(event.strftime("%D"));
                            yr = yr ? parseInt((yr / 365) * 100) : 100;
                            zegen_day_circle(
                                day_counter.find(".counter-day"),
                                yr
                            );
                        }
                    }
                    if (day_counter.find(".counter-hour").length) {
                        day_counter
                            .find(".counter-hour h3")
                            .text(event.strftime("%H"));
                        if (dprogress) {
                            var hur = parseInt(event.strftime("%H"));
                            hur = hur ? parseInt((hur / 24) * 100) : 100;
                            zegen_day_circle(
                                day_counter.find(".counter-hour"),
                                hur
                            );
                        }
                    }
                    if (day_counter.find(".counter-min").length) {
                        day_counter
                            .find(".counter-min h3")
                            .text(event.strftime("%M"));
                        if (dprogress) {
                            var mnth = parseInt(event.strftime("%M"));
                            mnth = mnth ? parseInt((mnth / 60) * 100) : 100;
                            zegen_day_circle(
                                day_counter.find(".counter-min"),
                                mnth
                            );
                        }
                    }
                    if (day_counter.find(".counter-sec").length) {
                        day_counter
                            .find(".counter-sec h3")
                            .text(event.strftime("%S"));
                        if (dprogress) {
                            var tme = parseInt(event.strftime("%S"));
                            tme = tme ? parseInt((tme / 60) * 100) : 100;
                            zegen_day_circle(
                                day_counter.find(".counter-sec"),
                                tme
                            );
                        }
                    }
                    if (day_counter.find(".counter-week").length) {
                        day_counter
                            .find(".counter-week h3")
                            .text(event.strftime("%w"));
                        if (dprogress) {
                            var wk = parseInt(event.strftime("%S"));
                            wk = wk ? parseInt((wk / 60) * 100) : 100;
                            zegen_day_circle(
                                day_counter.find(".counter-week"),
                                wk
                            );
                        }
                    }
                });
            });
        }
        if ($(".canvas_agon").length) {
            $(".canvas_agon").each(function () {
                zegen_agon($(this));
            });
        }
        if ($(".zegengmap").length) {
            initZegenGmap();
        }
        if (
            $("body.rtl").length &&
            $("section.elementor-section-stretched").length
        ) {
            zegen_for_elementor_row();
        }
        zegen_scroll_animation();
    });
    $(window).smartresize(function () {
        if (
            $("body.rtl").length &&
            $("section.elementor-section-stretched").length
        ) {
            zegen_for_elementor_row();
        }
        var win_width = $(window).width();
        if (responsive_width) {
            zegen_set_custom_hidden_elements(win_width, responsive_width);
        }
        setTimeout(function () {
            $(".mobile-bar.active").length
                ? $(".mobile-header .mobile-bar-toggle").trigger("click")
                : "";
        }, 100);
        setTimeout(zegen_center_menu_margin, 300);
        setTimeout(zegen_set_sticky_outer_height, 100);
        if ($(".header-inner .sticky-head").length) {
            setTimeout(zegen_sticky_part(".header-inner"), 100);
        }
        if ($(".header-inner .sticky-scroll").length) {
            setTimeout(
                zegen_sticky_scroll_up_part(".header-inner", "header"),
                100
            );
        }
        if ($(".mobile-header-inner .sticky-head").length) {
            setTimeout(zegen_sticky_part(".mobile-header-inner"), 100);
        }
        if ($(".mobile-header-inner .sticky-scroll").length) {
            setTimeout(
                zegen_sticky_scroll_up_part(
                    ".mobile-header-inner",
                    ".mobile-header"
                ),
                100
            );
        }
        zegen_scroll_animation();
    });
    function zegen_day_circle(ele, value) {
        var c_circle = $(ele);
        var parent_ele = $(ele).parent(".day-counter-progress");
        var c_value = value;
        var c_size = $(parent_ele).attr("data-size")
            ? $(parent_ele).attr("data-size")
            : 100;
        var c_thickness = $(parent_ele).attr("data-thick")
            ? $(parent_ele).attr("data-thick")
            : 10;
        var c_duration = 0;
        var c_empty = $(parent_ele).attr("data-empty-color")
            ? $(parent_ele).attr("data-empty-color")
            : "#eee";
        var c_scolor = $(parent_ele).attr("data-fill-color")
            ? $(parent_ele).attr("data-fill-color")
            : "#333";
        var c_ecolor = c_scolor;
        c_circle.circleProgress({
            value: Math.floor(c_value) / 100,
            size: Math.floor(c_size),
            thickness: Math.floor(c_thickness),
            emptyFill: c_empty,
            animation: { duration: Math.floor(c_duration) },
            lineCap: "round",
            fill: { gradient: [c_scolor, c_ecolor] },
        });
    }
    function isotopeArrange() {
        $(".grid-layout > .isotope")
            .find("audio, video")
            .each(function (index) {
                $(this)[0].play();
                $(this)[0].pause();
            });
    }
    function zegen_for_elementor_row() {
        $("body.rtl section.elementor-section-stretched").each(function () {
            var left_pos = $(this).css("left");
            left_pos = Math.abs(parseFloat(left_pos));
            if (left_pos) $(this).css("left", left_pos);
        });
    }
    function zegen_set_custom_hidden_elements(win_width, responsive_width) {
        if (win_width > responsive_width) {
            $(".header-inner").show();
            $(".mobile-header-inner, .mobile-topbar-wrap").hide();
        } else {
            $(".header-inner").hide();
            $(".mobile-header-inner, .mobile-topbar-wrap").show();
        }
    }
    function zegen_sticky_header_adjust(elem_pos, elem_width) {
        var win_width = $(window).width();
        var compare_wdth;
        if ($(".zegen-header .header-inner.hidden-md-land-down").length) {
            compare_wdth = 1024;
        } else {
            compare_wdth = 991;
        }
        if (win_width <= compare_wdth) {
            if (elem_pos == "left") {
                $(".sticky-header-space").css("left", "-" + elem_width + "px");
                $("body, .top-sliding-bar").css("padding-left", "0");
            } else {
                $(".sticky-header-space").css("right", "-" + elem_width + "px");
                $("body, .top-sliding-bar").css("padding-right", "0");
            }
        } else {
            if (elem_pos == "left") {
                $(".sticky-header-space").css("left", 0);
                $("body, .top-sliding-bar").css(
                    "padding-left",
                    elem_width + "px"
                );
            } else {
                $(".sticky-header-space").css("right", 0);
                $("body, .top-sliding-bar").css(
                    "padding-right",
                    elem_width + "px"
                );
            }
        }
    }
    function zegen_center_menu_margin() {
        $.each(
            ["topbar", "logobar", "navbar", "mobile-header", "footer-bottom"],
            function (index, margin_key) {
                var left_width = 0,
                    right_width = 0,
                    center_width = 0,
                    margin_left = 0,
                    parent_width = 0;
                if (
                    $(
                        "." +
                            margin_key +
                            " ." +
                            margin_key +
                            "-inner .pull-center"
                    ).length
                ) {
                    if (margin_key == "mobile-header")
                        parent_width = $(
                            "." +
                                margin_key +
                                " ." +
                                margin_key +
                                "-inner .container"
                        ).width();
                    else
                        parent_width = $(
                            "." + margin_key + " ." + margin_key + "-inner"
                        ).width();
                    if (
                        $(
                            "." +
                                margin_key +
                                " ." +
                                margin_key +
                                "-inner ." +
                                margin_key +
                                "-items.pull-left"
                        ).length
                    ) {
                        left_width = $(
                            "." +
                                margin_key +
                                " ." +
                                margin_key +
                                "-inner ." +
                                margin_key +
                                "-items.pull-left"
                        ).width();
                    }
                    if (
                        $(
                            "." +
                                margin_key +
                                " ." +
                                margin_key +
                                "-inner ." +
                                margin_key +
                                "-items.pull-right"
                        ).length
                    ) {
                        right_width = $(
                            "." +
                                margin_key +
                                " ." +
                                margin_key +
                                "-inner ." +
                                margin_key +
                                "-items.pull-right"
                        ).width();
                    }
                    if (
                        $(
                            "." +
                                margin_key +
                                " ." +
                                margin_key +
                                "-inner ." +
                                margin_key +
                                "-items.pull-center"
                        ).length
                    ) {
                        center_width = $(
                            "." +
                                margin_key +
                                " ." +
                                margin_key +
                                "-inner ." +
                                margin_key +
                                "-items.pull-center"
                        ).width();
                    }
                    if (left_width + center_width + right_width) {
                        if (margin_key == "mobile-header") {
                            parent_width -=
                                left_width + center_width + right_width;
                            margin_left = parent_width / 2;
                        } else {
                            var midd_point = parent_width / 2;
                            var left_point = midd_point - center_width / 2;
                            margin_left = Math.floor(left_point - left_width);
                        }
                        if (!$("body.rtl").length) {
                            $(
                                "." +
                                    margin_key +
                                    " ." +
                                    margin_key +
                                    "-inner ." +
                                    margin_key +
                                    "-items.pull-center"
                            ).css("margin-left", margin_left + "px");
                        } else {
                            $(
                                "." +
                                    margin_key +
                                    " ." +
                                    margin_key +
                                    "-inner ." +
                                    margin_key +
                                    "-items.pull-center"
                            ).css("margin-right", margin_left + "px");
                        }
                        $(
                            "." +
                                margin_key +
                                " ." +
                                margin_key +
                                "-inner ." +
                                margin_key +
                                "-items.pull-center"
                        ).addClass("show-opacity");
                    }
                }
            }
        );
    }
    function zegen_sticky_part(main_class) {
        var outer_class = ".sticky-outer";
        var lastScrollTop = 0;
        var header_top = 0;
        var t_header_h = $(main_class + " " + outer_class).data("height");
        $(main_class + " " + outer_class).css("height", t_header_h);
        header_top = $(main_class + " " + outer_class).offset().top;
        header_top += t_header_h;
        $(window).scroll(function (event) {
            var st = $(this).scrollTop();
            if (st > header_top) {
                $(main_class + " .sticky-head").addClass("header-sticky");
            } else {
                $(main_class + " .sticky-head").removeClass("header-sticky");
            }
            if (st == 0) {
                $(main_class + " .sticky-head").removeClass("header-sticky");
            }
            lastScrollTop = st;
        });
    }
    function zegen_sticky_scroll_up_part(main_class, sticky_div) {
        var outer_class = ".sticky-outer";
        var out_height = "";
        var lastScrollTop = 0;
        var header_top = 0;
        $(main_class + " " + outer_class).css(
            "height",
            $(main_class + " " + outer_class).data("height")
        );
        out_height =
            "-" + $(main_class + " " + outer_class).outerHeight() + "px";
        header_top = $(main_class + " " + outer_class).offset().top;
        sticky_div = $(sticky_div).height();
        $(window).scroll(function (event) {
            var st = $(this).scrollTop();
            if (st < lastScrollTop && header_top < lastScrollTop) {
                $(main_class + " .sticky-scroll").addClass("show-menu");
                $(main_class + " .sticky-scroll.show-menu").css({
                    transform: "translate3d(0px, 0px, 0px)",
                });
            } else {
                if (st < sticky_div) {
                    $(main_class + " .sticky-scroll").css({ transform: "" });
                    $(main_class + " .sticky-scroll.show-menu").removeClass(
                        "show-menu"
                    );
                } else {
                    $(main_class + " .sticky-scroll").css({
                        transform: "translate3d(0px, " + out_height + ", 0px)",
                    });
                }
            }
            if (st == 0) {
                $(main_class + " .sticky-scroll").css({ transform: "" });
                $(main_class + " .sticky-scroll.show-menu").removeClass(
                    "show-menu"
                );
            }
            lastScrollTop = st;
        });
    }
    function zegen_set_sticky_outer_height() {
        $(".sticky-outer").each(function () {
            var class_name = "";
            var sticky_parent = $(this).parent("div");
            if ($(sticky_parent).is("[class*=hidden-]")) {
                class_name = $(sticky_parent).attr("class");
                var t_stat = "";
                if ($(sticky_parent).hasClass("mobile-header-inner")) {
                    class_name = class_name.replace("mobile-header-inner", "");
                    t_stat = "m";
                }
                if ($(sticky_parent).hasClass("header-inner")) {
                    class_name = class_name.replace("header-inner", "");
                    t_stat = "d";
                }
                $(sticky_parent).attr("class", "");
                if (t_stat == "m") {
                    $(sticky_parent).attr("class", "mobile-header-inner");
                }
                if (t_stat == "d") {
                    $(sticky_parent).attr("class", "header-inner");
                }
            }
            $(this).css({
                position: "relative",
                visibility: "hidden",
                display: "block",
                height: "auto",
            });
            var hght = $(this).outerHeight();
            $(this).attr("data-height", hght);
            if (class_name != "") {
                $(sticky_parent).addClass(class_name);
            }
            $(this).css({
                position: "",
                visibility: "",
                display: "",
                height: hght,
            });
        });
    }
    function zegen_agon(canvas_ele) {
        var canvas = document.getElementById("canvas_agon");
        var cxt = canvas.getContext("2d");
        var agon_size = canvas_ele.attr("data-size");
        var agon_side = canvas_ele.attr("data-side");
        var agon_color = canvas_ele.attr("data-color");
        var div_val = 1;
        switch (parseInt(agon_side)) {
            case 3:
                div_val = 6;
                break;
            case 4:
                div_val = 4;
                break;
            case 5:
                div_val = 3.3;
                break;
            case 6:
                div_val = 3;
                break;
            case 7:
                div_val = 2.8;
                break;
            case 8:
                div_val = 2.7;
                break;
            case 9:
                div_val = 2.6;
                break;
            case 10:
                div_val = 2.5;
                break;
        }
        var numberOfSides = parseInt(agon_side),
            size = parseInt(agon_size),
            Xcenter = parseInt(agon_size),
            Ycenter = parseInt(agon_size),
            step = (2 * Math.PI) / numberOfSides,
            shift = Math.PI / div_val;
        cxt.beginPath();
        for (var i = 0; i <= numberOfSides; i++) {
            var curStep = i * step + shift;
            cxt.lineTo(
                Xcenter + size * Math.cos(curStep),
                Ycenter + size * Math.sin(curStep)
            );
        }
        cxt.fillStyle = agon_color;
        cxt.fill();
    }
    function zegentesipagecallback(event) {
        var current = event.item.index;
        $(event.target).find(".owl-item.active").eq(0).addClass("current");
    }
    function zegen_owl_settings(c_owlCarousel) {
        var page_slide = !1;
        var pagi_slide = !1;
        if (c_owlCarousel.hasClass("zegen-page-carousel")) {
            page_slide = !0;
        }
        if (c_owlCarousel.hasClass("zegen-pagination-carousel")) {
            pagi_slide = !0;
        }
        var loop = c_owlCarousel.data("loop");
        var margin = c_owlCarousel.data("margin");
        var center = c_owlCarousel.data("center");
        var nav = c_owlCarousel.data("nav");
        var dots_ = c_owlCarousel.data("dots");
        var items = c_owlCarousel.data("items");
        var items_tab = c_owlCarousel.data("items-tab");
        var items_mob = c_owlCarousel.data("items-mob");
        var duration = c_owlCarousel.data("duration");
        var smartspeed = c_owlCarousel.data("smartspeed");
        var scrollby = c_owlCarousel.data("scrollby");
        var autoheight = c_owlCarousel.data("autoheight");
        var autoplay = c_owlCarousel.data("autoplay");
        var rtl = $("body.rtl").length ? !0 : !1;
        $(c_owlCarousel).owlCarousel({
            rtl: rtl,
            loop: loop,
            autoplayTimeout: duration,
            smartSpeed: smartspeed,
            center: center,
            margin: margin,
            nav: nav,
            dots: dots_,
            autoplay: autoplay,
            autoheight: autoheight,
            slideBy: scrollby,
            responsive: {
                0: { items: items_mob },
                544: { items: items_tab },
                992: { items: items },
            },
            onInitialized: pagi_slide ? zegentesipagecallback : "",
        });
        if (pagi_slide) {
            var cur_testi_slide = $(c_owlCarousel)
                .parent("div")
                .children(".zegen-page-carousel");
            var cur_pagination_slide = $(c_owlCarousel);
            $(c_owlCarousel).on("click", ".owl-item", function (event) {
                var current = $(this).index();
                $(cur_testi_slide).trigger("to.owl.carousel", [current, 500]);
            });
            $(c_owlCarousel).on("dragged.owl.carousel", function (event) {
                var current = event.item.index;
                $(cur_testi_slide).trigger("to.owl.carousel", [current, 500]);
                cur_pagination_slide
                    .find(".owl-item.current")
                    .removeClass("current");
                cur_pagination_slide
                    .find(".owl-item")
                    .eq(current)
                    .addClass("current");
            });
        }
        if (page_slide) {
            var cur_pagination_slide = $(c_owlCarousel)
                .parent("div")
                .children(".zegen-pagination-carousel");
            $(c_owlCarousel).on("changed.owl.carousel", function (event) {
                var current = event.item.index;
                $(cur_pagination_slide).trigger("to.owl.carousel", [
                    current,
                    500,
                ]);
                $(cur_pagination_slide)
                    .find(".owl-item.current")
                    .removeClass("current");
                $(cur_pagination_slide)
                    .find(".owl-item")
                    .eq(current)
                    .addClass("current");
            });
        }
    }
    function convert_time(duration) {
        var a = duration.match(/\d+/g);
        if (
            duration.indexOf("M") >= 0 &&
            duration.indexOf("H") == -1 &&
            duration.indexOf("S") == -1
        ) {
            a = [0, a[0], 0];
        }
        if (duration.indexOf("H") >= 0 && duration.indexOf("M") == -1) {
            a = [a[0], 0, a[1]];
        }
        if (
            duration.indexOf("H") >= 0 &&
            duration.indexOf("M") == -1 &&
            duration.indexOf("S") == -1
        ) {
            a = [a[0], 0, 0];
        }
        duration = 0;
        if (a.length == 3) {
            duration = duration + parseInt(a[0]) * 3600;
            duration = duration + parseInt(a[1]) * 60;
            duration = duration + parseInt(a[2]);
        }
        if (a.length == 2) {
            duration = duration + parseInt(a[0]) * 60;
            duration = duration + parseInt(a[1]);
        }
        if (a.length == 1) {
            duration = duration + parseInt(a[0]);
        }
        var h = Math.floor(duration / 3600);
        var m = Math.floor((duration % 3600) / 60);
        var s = Math.floor((duration % 3600) % 60);
        return (
            (h > 0 ? h + ":" + (m < 10 ? "0" : "") : "") +
            m +
            ":" +
            (s < 10 ? "0" : "") +
            s
        );
    }
    function zegen_scroll_animation() {
        setTimeout(function () {
            var anim_time = 300;
            $(".zegen-animate:not(.run-animate)").each(function () {
                var elem = $(this);
                var bottom_of_object = elem.offset().top;
                var bottom_of_window =
                    $(window).scrollTop() + $(window).height();
                if (bottom_of_window > bottom_of_object) {
                    setTimeout(function () {
                        elem.addClass("run-animate");
                    }, anim_time);
                }
                anim_time += 300;
            });
        }, 200);
    }
    function initZegenGmap() {
        if (zegen_ajax_var.gmap_stat == "0") {
            return;
        }
        var map_styles =
            '{ "Aubergine" : [	{"elementType":"geometry","stylers":[{"color":"#1d2c4d"}]},{"elementType":"labels.text.fill","stylers":[{"color":"#8ec3b9"}]},{"elementType":"labels.text.stroke","stylers":[{"color":"#1a3646"}]},{"featureType":"administrative.country","elementType":"geometry.stroke","stylers":[{"color":"#4b6878"}]},{"featureType":"administrative.land_parcel","elementType":"labels.text.fill","stylers":[{"color":"#64779e"}]},{"featureType":"administrative.province","elementType":"geometry.stroke","stylers":[{"color":"#4b6878"}]},{"featureType":"landscape.man_made","elementType":"geometry.stroke","stylers":[{"color":"#334e87"}]},{"featureType":"landscape.natural","elementType":"geometry","stylers":[{"color":"#023e58"}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#283d6a"}]},{"featureType":"poi","elementType":"labels.text.fill","stylers":[{"color":"#6f9ba5"}]},{"featureType":"poi","elementType":"labels.text.stroke","stylers":[{"color":"#1d2c4d"}]},{"featureType":"poi.park","elementType":"geometry.fill","stylers":[{"color":"#023e58"}]},{"featureType":"poi.park","elementType":"labels.text.fill","stylers":[{"color":"#3C7680"}]},{"featureType":"road","elementType":"geometry","stylers":[{"color":"#304a7d"}]},{"featureType":"road","elementType":"labels.text.fill","stylers":[{"color":"#98a5be"}]},{"featureType":"road","elementType":"labels.text.stroke","stylers":[{"color":"#1d2c4d"}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"color":"#2c6675"}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#255763"}]},{"featureType":"road.highway","elementType":"labels.text.fill","stylers":[{"color":"#b0d5ce"}]},{"featureType":"road.highway","elementType":"labels.text.stroke","stylers":[{"color":"#023e58"}]},{"featureType":"transit","elementType":"labels.text.fill","stylers":[{"color":"#98a5be"}]},{"featureType":"transit","elementType":"labels.text.stroke","stylers":[{"color":"#1d2c4d"}]},{"featureType":"transit.line","elementType":"geometry.fill","stylers":[{"color":"#283d6a"}]},{"featureType":"transit.station","elementType":"geometry","stylers":[{"color":"#3a4762"}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#0e1626"}]},{"featureType":"water","elementType":"labels.text.fill","stylers":[{"color":"#4e6d70"}]}], "Silver" : [{"elementType":"geometry","stylers":[{"color":"#f5f5f5"}]},{"elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"elementType":"labels.text.fill","stylers":[{"color":"#616161"}]},{"elementType":"labels.text.stroke","stylers":[{"color":"#f5f5f5"}]},{"featureType":"administrative.land_parcel","elementType":"labels.text.fill","stylers":[{"color":"#bdbdbd"}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#eeeeee"}]},{"featureType":"poi","elementType":"labels.text.fill","stylers":[{"color":"#757575"}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#e5e5e5"}]},{"featureType":"poi.park","elementType":"labels.text.fill","stylers":[{"color":"#9e9e9e"}]},{"featureType":"road","elementType":"geometry","stylers":[{"color":"#ffffff"}]},{"featureType":"road.arterial","elementType":"labels.text.fill","stylers":[{"color":"#757575"}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"color":"#dadada"}]},{"featureType":"road.highway","elementType":"labels.text.fill","stylers":[{"color":"#616161"}]},{"featureType":"road.local","elementType":"labels.text.fill","stylers":[{"color":"#9e9e9e"}]},{"featureType":"transit.line","elementType":"geometry","stylers":[{"color":"#e5e5e5"}]},{"featureType":"transit.station","elementType":"geometry","stylers":[{"color":"#eeeeee"}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#c9c9c9"}]},{"featureType":"water","elementType":"labels.text.fill","stylers":[{"color":"#9e9e9e"}]}], "Retro" : [{"elementType":"geometry","stylers":[{"color":"#ebe3cd"}]},{"elementType":"labels.text.fill","stylers":[{"color":"#523735"}]},{"elementType":"labels.text.stroke","stylers":[{"color":"#f5f1e6"}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#c9b2a6"}]},{"featureType":"administrative.land_parcel","elementType":"geometry.stroke","stylers":[{"color":"#dcd2be"}]},{"featureType":"administrative.land_parcel","elementType":"labels.text.fill","stylers":[{"color":"#ae9e90"}]},{"featureType":"landscape.natural","elementType":"geometry","stylers":[{"color":"#dfd2ae"}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#dfd2ae"}]},{"featureType":"poi","elementType":"labels.text.fill","stylers":[{"color":"#93817c"}]},{"featureType":"poi.park","elementType":"geometry.fill","stylers":[{"color":"#a5b076"}]},{"featureType":"poi.park","elementType":"labels.text.fill","stylers":[{"color":"#447530"}]},{"featureType":"road","elementType":"geometry","stylers":[{"color":"#f5f1e6"}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#fdfcf8"}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"color":"#f8c967"}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#e9bc62"}]},{"featureType":"road.highway.controlled_access","elementType":"geometry","stylers":[{"color":"#e98d58"}]},{"featureType":"road.highway.controlled_access","elementType":"geometry.stroke","stylers":[{"color":"#db8555"}]},{"featureType":"road.local","elementType":"labels.text.fill","stylers":[{"color":"#806b63"}]},{"featureType":"transit.line","elementType":"geometry","stylers":[{"color":"#dfd2ae"}]},{"featureType":"transit.line","elementType":"labels.text.fill","stylers":[{"color":"#8f7d77"}]},{"featureType":"transit.line","elementType":"labels.text.stroke","stylers":[{"color":"#ebe3cd"}]},{"featureType":"transit.station","elementType":"geometry","stylers":[{"color":"#dfd2ae"}]},{"featureType":"water","elementType":"geometry.fill","stylers":[{"color":"#b9d3c2"}]},{"featureType":"water","elementType":"labels.text.fill","stylers":[{"color":"#92998d"}]}], "Dark" : [{"elementType":"geometry","stylers":[{"color":"#212121"}]},{"elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"elementType":"labels.text.fill","stylers":[{"color":"#757575"}]},{"elementType":"labels.text.stroke","stylers":[{"color":"#212121"}]},{"featureType":"administrative","elementType":"geometry","stylers":[{"color":"#757575"}]},{"featureType":"administrative.country","elementType":"labels.text.fill","stylers":[{"color":"#9e9e9e"}]},{"featureType":"administrative.land_parcel","stylers":[{"visibility":"off"}]},{"featureType":"administrative.locality","elementType":"labels.text.fill","stylers":[{"color":"#bdbdbd"}]},{"featureType":"poi","elementType":"labels.text.fill","stylers":[{"color":"#757575"}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#181818"}]},{"featureType":"poi.park","elementType":"labels.text.fill","stylers":[{"color":"#616161"}]},{"featureType":"poi.park","elementType":"labels.text.stroke","stylers":[{"color":"#1b1b1b"}]},{"featureType":"road","elementType":"geometry.fill","stylers":[{"color":"#2c2c2c"}]},{"featureType":"road","elementType":"labels.text.fill","stylers":[{"color":"#8a8a8a"}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#373737"}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"color":"#3c3c3c"}]},{"featureType":"road.highway.controlled_access","elementType":"geometry","stylers":[{"color":"#4e4e4e"}]},{"featureType":"road.local","elementType":"labels.text.fill","stylers":[{"color":"#616161"}]},{"featureType":"transit","elementType":"labels.text.fill","stylers":[{"color":"#757575"}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#000000"}]},{"featureType":"water","elementType":"labels.text.fill","stylers":[{"color":"#3d3d3d"}]}], "Night" : [{"elementType":"geometry","stylers":[{"color":"#242f3e"}]},{"elementType":"labels.text.fill","stylers":[{"color":"#746855"}]},{"elementType":"labels.text.stroke","stylers":[{"color":"#242f3e"}]},{"featureType":"administrative.locality","elementType":"labels.text.fill","stylers":[{"color":"#d59563"}]},{"featureType":"poi","elementType":"labels.text.fill","stylers":[{"color":"#d59563"}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#263c3f"}]},{"featureType":"poi.park","elementType":"labels.text.fill","stylers":[{"color":"#6b9a76"}]},{"featureType":"road","elementType":"geometry","stylers":[{"color":"#38414e"}]},{"featureType":"road","elementType":"geometry.stroke","stylers":[{"color":"#212a37"}]},{"featureType":"road","elementType":"labels.text.fill","stylers":[{"color":"#9ca5b3"}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"color":"#746855"}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#1f2835"}]},{"featureType":"road.highway","elementType":"labels.text.fill","stylers":[{"color":"#f3d19c"}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#2f3948"}]},{"featureType":"transit.station","elementType":"labels.text.fill","stylers":[{"color":"#d59563"}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#17263c"}]},{"featureType":"water","elementType":"labels.text.fill","stylers":[{"color":"#515c6d"}]},{"featureType":"water","elementType":"labels.text.stroke","stylers":[{"color":"#17263c"}]}] }';
        var map_style_obj = JSON.parse(map_styles);
        var map_style_mode = [];
        var map_mode = "";
        var map_lang = "";
        var map_lat = "";
        var map_marker = "";
        var map_options = "";
        $(".zegengmap").each(function (index) {
            var gmap = this;
            if ($(gmap).attr("data-map-style")) {
                map_mode = $(gmap).data("map-style");
                map_lang = $(gmap).data("map-lang");
                map_lat = $(gmap).data("map-lat");
                map_marker = $(gmap).data("map-marker");
                if (map_mode === "aubergine")
                    map_style_mode = map_style_obj.Aubergine;
                else if (map_mode === "silver")
                    map_style_mode = map_style_obj.Silver;
                else if (map_mode === "retro")
                    map_style_mode = map_style_obj.Retro;
                else if (map_mode === "dark")
                    map_style_mode = map_style_obj.Dark;
                else if (map_mode === "night")
                    map_style_mode = map_style_obj.Night;
                else if (map_mode === "custom") {
                    var c_style =
                        $(gmap).attr("data-custom-style") &&
                        $(gmap).attr("data-custom-style") != ""
                            ? JSON.parse($(gmap).attr("data-custom-style"))
                            : "[]";
                    map_style_mode = c_style;
                } else {
                    map_style_mode = "[]";
                }
            }
            if (
                $(gmap).attr("data-multi-map") &&
                $(gmap).attr("data-multi-map") == "true"
            ) {
                var map_values = JSON.parse($(gmap).attr("data-maps"));
                var map_wheel =
                    $(gmap).attr("data-wheel") &&
                    $(gmap).attr("data-wheel") == "true"
                        ? !0
                        : !1;
                var map_zoom =
                    $(gmap).attr("data-zoom") && $(gmap).attr("data-zoom") != ""
                        ? parseInt($(gmap).attr("data-zoom"))
                        : 14;
                var map;
                var map_stat = 1;
                map_values.forEach(function (map_value) {
                    map_lat = map_value.map_latitude;
                    map_lang = map_value.map_longitude;
                    var LatLng = new google.maps.LatLng(map_lat, map_lang);
                    var mapProp = {
                        center: LatLng,
                        scrollwheel: map_wheel,
                        zoom: map_zoom,
                        styles: map_style_mode,
                    };
                    if (map_stat) {
                        var t_gmap = $(gmap);
                        map = new google.maps.Map(t_gmap[0], mapProp);
                        google.maps.event.addDomListener(
                            window,
                            "resize",
                            function () {
                                var center = map.getCenter();
                                google.maps.event.trigger(map, "resize");
                                map.setCenter(LatLng);
                            }
                        );
                        map_stat = 0;
                    }
                    var marker = new google.maps.Marker({
                        position: LatLng,
                        icon: map_value.map_marker,
                        map: map,
                    });
                    if (map_value.map_info_opt == "on") {
                        var info_title = map_value.map_info_title;
                        var info_addr = map_value.map_info_address;
                        var contentString =
                            '<div class="gmap-info-wrap"><h3>' +
                            info_title +
                            "</h3><p>" +
                            info_addr +
                            "</p></div>";
                        var infowindow = new google.maps.InfoWindow({
                            content: contentString,
                        });
                        marker.addListener("click", function () {
                            infowindow.open(map, marker);
                        });
                    }
                });
            } else {
                var LatLng = {
                    lat: parseFloat(map_lat),
                    lng: parseFloat(map_lang),
                };
                var map_wheel =
                    $(gmap).attr("data-wheel") &&
                    $(gmap).attr("data-wheel") == "true"
                        ? !0
                        : !1;
                var map_zoom =
                    $(gmap).attr("data-zoom") && $(gmap).attr("data-zoom") != ""
                        ? parseInt($(gmap).attr("data-zoom"))
                        : 14;
                var mapProp = {
                    center: LatLng,
                    scrollwheel: map_wheel,
                    zoom: map_zoom,
                    styles: map_style_mode,
                };
                var t_gmap = $(gmap);
                var map = new google.maps.Map(t_gmap[0], mapProp);
                var marker = new google.maps.Marker({
                    position: LatLng,
                    icon: map_marker,
                    map: map,
                });
                if ($(gmap).attr("data-info") == 1) {
                    var info_title = $(gmap).attr("data-info-title")
                        ? $(gmap).attr("data-info-title")
                        : "";
                    var info_addr = $(gmap).attr("data-info-addr")
                        ? $(gmap).attr("data-info-addr")
                        : "";
                    var contentString =
                        '<div class="gmap-info-wrap"><h3>' +
                        info_title +
                        "</h3><p>" +
                        info_addr +
                        "</p></div>";
                    var infowindow = new google.maps.InfoWindow({
                        content: contentString,
                    });
                    marker.addListener("click", function () {
                        infowindow.open(map, marker);
                    });
                }
                google.maps.event.addDomListener(window, "resize", function () {
                    var center = map.getCenter();
                    google.maps.event.trigger(map, "resize");
                    map.setCenter(LatLng);
                });
            }
        });
    }
})(jQuery);
