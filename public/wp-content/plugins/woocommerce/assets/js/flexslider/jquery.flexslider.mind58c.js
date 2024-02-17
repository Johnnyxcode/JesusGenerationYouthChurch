!(function (e) {
    var t = !0,
        a = {
            swing: "cubic-bezier(.02, .01, .47, 1)",
            linear: "linear",
            easeInQuad: "cubic-bezier(0.11, 0, 0.5, 0)",
            easeOutQuad: "cubic-bezier(0.5, 1, 0.89, 1)",
            easeInOutQuad: "cubic-bezier(0.45, 0, 0.55, 1)",
            easeInCubic: "cubic-bezier(0.32, 0, 0.67, 0)",
            easeOutCubic: "cubic-bezier(0.33, 1, 0.68, 1)",
            easeInOutCubic: "cubic-bezier(0.65, 0, 0.35, 1)",
            easeInQuart: "cubic-bezier(0.5, 0, 0.75, 0)",
            easeOutQuart: "cubic-bezier(0.25, 1, 0.5, 1)",
            easeInOutQuart: "cubic-bezier(0.76, 0, 0.24, 1)",
            easeInQuint: "cubic-bezier(0.64, 0, 0.78, 0)",
            easeOutQuint: "cubic-bezier(0.22, 1, 0.36, 1)",
            easeInOutQuint: "cubic-bezier(0.83, 0, 0.17, 1)",
            easeInSine: "cubic-bezier(0.12, 0, 0.39, 0)",
            easeOutSine: "cubic-bezier(0.61, 1, 0.88, 1)",
            easeInOutSine: "cubic-bezier(0.37, 0, 0.63, 1)",
            easeInExpo: "cubic-bezier(0.7, 0, 0.84, 0)",
            easeOutExpo: "cubic-bezier(0.16, 1, 0.3, 1)",
            easeInOutExpo: "cubic-bezier(0.87, 0, 0.13, 1)",
            easeInCirc: "cubic-bezier(0.55, 0, 1, 0.45)",
            easeOutCirc: "cubic-bezier(0, 0.55, 0.45, 1)",
            easeInOutCirc: "cubic-bezier(0.85, 0, 0.15, 1)",
            easeInBack: "cubic-bezier(0.36, 0, 0.66, -0.56)",
            easeOutBack: "cubic-bezier(0.34, 1.56, 0.64, 1)",
            easeInOutBack: "cubic-bezier(0.68, -0.6, 0.32, 1.6)",
        };
    (a.jswing = a.swing),
        (e.flexslider = function (n, i) {
            var s = e(n);
            "undefined" == typeof i.rtl &&
                "rtl" == e("html").attr("dir") &&
                (i.rtl = !0),
                (s.vars = e.extend({}, e.flexslider.defaults, i));
            var r,
                o = s.vars.namespace,
                l =
                    ("ontouchstart" in window ||
                        (window.DocumentTouch &&
                            document instanceof DocumentTouch)) &&
                    s.vars.touch,
                c = "click touchend keyup",
                u = "",
                d = a[s.vars.easing] || "ease",
                v = "vertical" === s.vars.direction,
                p = s.vars.reverse,
                m = s.vars.itemWidth > 0,
                f = "fade" === s.vars.animation,
                h = "" !== s.vars.asNavFor,
                g = {};
            e.data(n, "flexslider", s),
                (g = {
                    init: function () {
                        (s.animating = !1),
                            (s.currentSlide = parseInt(
                                s.vars.startAt ? s.vars.startAt : 0,
                                10
                            )),
                            isNaN(s.currentSlide) && (s.currentSlide = 0),
                            (s.animatingTo = s.currentSlide),
                            (s.atEnd =
                                0 === s.currentSlide ||
                                s.currentSlide === s.last),
                            (s.containerSelector = s.vars.selector.substr(
                                0,
                                s.vars.selector.search(" ")
                            )),
                            (s.slides = e(s.vars.selector, s)),
                            (s.container = e(s.containerSelector, s)),
                            (s.count = s.slides.length),
                            (s.syncExists = e(s.vars.sync).length > 0),
                            "slide" === s.vars.animation &&
                                (s.vars.animation = "swing"),
                            (s.prop = v
                                ? "top"
                                : s.vars.rtl
                                ? "marginRight"
                                : "marginLeft"),
                            (s.args = {}),
                            (s.manualPause = !1),
                            (s.stopped = !1),
                            (s.started = !1),
                            (s.startTimeout = null),
                            (s.transitions =
                                !s.vars.video && !f && s.vars.useCSS),
                            s.transitions && (s.prop = "transform"),
                            (s.isFirefox =
                                navigator.userAgent
                                    .toLowerCase()
                                    .indexOf("firefox") > -1),
                            (s.ensureAnimationEnd = ""),
                            "" !== s.vars.controlsContainer &&
                                (s.controlsContainer =
                                    e(s.vars.controlsContainer).length > 0 &&
                                    e(s.vars.controlsContainer)),
                            "" !== s.vars.manualControls &&
                                (s.manualControls =
                                    e(s.vars.manualControls).length > 0 &&
                                    e(s.vars.manualControls)),
                            "" !== s.vars.customDirectionNav &&
                                (s.customDirectionNav =
                                    2 === e(s.vars.customDirectionNav).length &&
                                    e(s.vars.customDirectionNav)),
                            s.vars.randomize &&
                                (s.slides.sort(function () {
                                    return Math.round(Math.random()) - 0.5;
                                }),
                                s.container.empty().append(s.slides)),
                            s.doMath(),
                            s.setup("init"),
                            s.vars.controlNav && g.controlNav.setup(),
                            s.vars.directionNav && g.directionNav.setup(),
                            s.vars.keyboard &&
                                (1 === e(s.containerSelector).length ||
                                    s.vars.multipleKeyboard) &&
                                e(document).on("keyup", function (e) {
                                    var t = e.keyCode;
                                    if (
                                        !s.animating &&
                                        (39 === t || 37 === t)
                                    ) {
                                        var a = s.vars.rtl
                                            ? 37 === t
                                                ? s.getTarget("next")
                                                : 39 === t &&
                                                  s.getTarget("prev")
                                            : 39 === t
                                            ? s.getTarget("next")
                                            : 37 === t && s.getTarget("prev");
                                        s.flexAnimate(a, s.vars.pauseOnAction);
                                    }
                                }),
                            s.vars.mousewheel &&
                                s.on("mousewheel", function (e, t, a, n) {
                                    e.preventDefault();
                                    var i =
                                        t < 0
                                            ? s.getTarget("next")
                                            : s.getTarget("prev");
                                    s.flexAnimate(i, s.vars.pauseOnAction);
                                }),
                            s.vars.pausePlay && g.pausePlay.setup(),
                            s.vars.slideshow &&
                                s.vars.pauseInvisible &&
                                g.pauseInvisible(),
                            s.vars.slideshow &&
                                (s.vars.pauseOnHover &&
                                    s
                                        .on("mouseenter", function () {
                                            s.manualPlay ||
                                                s.manualPause ||
                                                s.pause();
                                        })
                                        .on("mouseleave", function () {
                                            s.manualPause ||
                                                s.manualPlay ||
                                                s.stopped ||
                                                s.play();
                                        }),
                                (s.vars.pauseInvisible &&
                                    "visible" !== document.visibilityState) ||
                                    (s.vars.initDelay > 0
                                        ? (s.startTimeout = setTimeout(
                                              s.play,
                                              s.vars.initDelay
                                          ))
                                        : s.play())),
                            h && g.asNav.setup(),
                            l && s.vars.touch && g.touch(),
                            (!f || (f && s.vars.smoothHeight)) &&
                                e(window).on(
                                    "resize orientationchange focus",
                                    g.resize
                                ),
                            s.find("img").attr("draggable", "false"),
                            setTimeout(function () {
                                s.vars.start(s);
                            }, 200);
                    },
                    asNav: {
                        setup: function () {
                            (s.asNav = !0),
                                (s.animatingTo = Math.floor(
                                    s.currentSlide / s.move
                                )),
                                (s.currentItem = s.currentSlide),
                                s.slides
                                    .removeClass(o + "active-slide")
                                    .eq(s.currentItem)
                                    .addClass(o + "active-slide"),
                                s.slides.on(c, function (t) {
                                    t.preventDefault();
                                    var a = e(this),
                                        n = a.index();
                                    (s.vars.rtl
                                        ? -1 *
                                          (a.offset().right - e(s).scrollLeft())
                                        : a.offset().left -
                                          e(s).scrollLeft()) <= 0 &&
                                    a.hasClass(o + "active-slide")
                                        ? s.flexAnimate(s.getTarget("prev"), !0)
                                        : e(s.vars.asNavFor).data("flexslider")
                                              .animating ||
                                          a.hasClass(o + "active-slide") ||
                                          ((s.direction =
                                              s.currentItem < n
                                                  ? "next"
                                                  : "prev"),
                                          s.flexAnimate(
                                              n,
                                              s.vars.pauseOnAction,
                                              !1,
                                              !0,
                                              !0
                                          ));
                                });
                        },
                    },
                    controlNav: {
                        setup: function () {
                            s.manualControls
                                ? g.controlNav.setupManual()
                                : g.controlNav.setupPaging();
                        },
                        setupPaging: function () {
                            var t,
                                a,
                                n =
                                    "thumbnails" === s.vars.controlNav
                                        ? "control-thumbs"
                                        : "control-paging",
                                i = 1;
                            if (
                                ((s.controlNavScaffold = e(
                                    '<ol class="' +
                                        o +
                                        "control-nav " +
                                        o +
                                        n +
                                        '"></ol>'
                                )),
                                s.pagingCount > 1)
                            )
                                for (var r = 0; r < s.pagingCount; r++) {
                                    if (
                                        ((a = s.slides.eq(r)),
                                        undefined ===
                                            a.attr("data-thumb-alt") &&
                                            a.attr("data-thumb-alt", ""),
                                        (t = e("<a></a>")
                                            .attr("href", "#")
                                            .text(i)),
                                        "thumbnails" === s.vars.controlNav &&
                                            (t = e("<img/>", {
                                                onload: "this.width = this.naturalWidth; this.height = this.naturalHeight",
                                                src: a.attr("data-thumb"),
                                                alt: a.attr("alt"),
                                            })),
                                        "" !== a.attr("data-thumb-alt") &&
                                            t.attr(
                                                "alt",
                                                a.attr("data-thumb-alt")
                                            ),
                                        "thumbnails" === s.vars.controlNav &&
                                            !0 === s.vars.thumbCaptions)
                                    ) {
                                        var l = a.attr("data-thumbcaption");
                                        if ("" !== l && undefined !== l) {
                                            var d = e("<span></span>")
                                                .addClass(o + "caption")
                                                .text(l);
                                            t.append(d);
                                        }
                                    }
                                    var v = e("<li>");
                                    t.appendTo(v),
                                        v.append("</li>"),
                                        s.controlNavScaffold.append(v),
                                        i++;
                                }
                            s.controlsContainer
                                ? e(s.controlsContainer).append(
                                      s.controlNavScaffold
                                  )
                                : s.append(s.controlNavScaffold),
                                g.controlNav.set(),
                                g.controlNav.active(),
                                s.controlNavScaffold.on(
                                    c,
                                    "a, img",
                                    function (t) {
                                        if (
                                            (t.preventDefault(),
                                            "" === u || u === t.type)
                                        ) {
                                            var a = e(this),
                                                n = s.controlNav.index(a);
                                            a.hasClass(o + "active") ||
                                                ((s.direction =
                                                    n > s.currentSlide
                                                        ? "next"
                                                        : "prev"),
                                                s.flexAnimate(
                                                    n,
                                                    s.vars.pauseOnAction
                                                ));
                                        }
                                        "" === u && (u = t.type),
                                            g.setToClearWatchedEvent();
                                    }
                                );
                        },
                        setupManual: function () {
                            (s.controlNav = s.manualControls),
                                g.controlNav.active(),
                                s.controlNav.on(c, function (t) {
                                    if (
                                        (t.preventDefault(),
                                        "" === u || u === t.type)
                                    ) {
                                        var a = e(this),
                                            n = s.controlNav.index(a);
                                        a.hasClass(o + "active") ||
                                            (n > s.currentSlide
                                                ? (s.direction = "next")
                                                : (s.direction = "prev"),
                                            s.flexAnimate(
                                                n,
                                                s.vars.pauseOnAction
                                            ));
                                    }
                                    "" === u && (u = t.type),
                                        g.setToClearWatchedEvent();
                                });
                        },
                        set: function () {
                            var t =
                                "thumbnails" === s.vars.controlNav
                                    ? "img"
                                    : "a";
                            s.controlNav = e(
                                "." + o + "control-nav li " + t,
                                s.controlsContainer ? s.controlsContainer : s
                            );
                        },
                        active: function () {
                            s.controlNav
                                .removeClass(o + "active")
                                .eq(s.animatingTo)
                                .addClass(o + "active");
                        },
                        update: function (t, a) {
                            s.pagingCount > 1 && "add" === t
                                ? s.controlNavScaffold.append(
                                      e(
                                          '<li><a href="#">' +
                                              s.count +
                                              "</a></li>"
                                      )
                                  )
                                : 1 === s.pagingCount
                                ? s.controlNavScaffold.find("li").remove()
                                : s.controlNav.eq(a).closest("li").remove(),
                                g.controlNav.set(),
                                s.pagingCount > 1 &&
                                s.pagingCount !== s.controlNav.length
                                    ? s.update(a, t)
                                    : g.controlNav.active();
                        },
                    },
                    directionNav: {
                        setup: function () {
                            var t = e(
                                '<ul class="' +
                                    o +
                                    'direction-nav"><li class="' +
                                    o +
                                    'nav-prev"><a class="' +
                                    o +
                                    'prev" href="#">' +
                                    s.vars.prevText +
                                    '</a></li><li class="' +
                                    o +
                                    'nav-next"><a class="' +
                                    o +
                                    'next" href="#">' +
                                    s.vars.nextText +
                                    "</a></li></ul>"
                            );
                            s.customDirectionNav
                                ? (s.directionNav = s.customDirectionNav)
                                : s.controlsContainer
                                ? (e(s.controlsContainer).append(t),
                                  (s.directionNav = e(
                                      "." + o + "direction-nav li a",
                                      s.controlsContainer
                                  )))
                                : (s.append(t),
                                  (s.directionNav = e(
                                      "." + o + "direction-nav li a",
                                      s
                                  ))),
                                g.directionNav.update(),
                                s.directionNav.on(c, function (t) {
                                    var a;
                                    t.preventDefault(),
                                        ("" !== u && u !== t.type) ||
                                            ((a = e(this).hasClass(o + "next")
                                                ? s.getTarget("next")
                                                : s.getTarget("prev")),
                                            s.flexAnimate(
                                                a,
                                                s.vars.pauseOnAction
                                            )),
                                        "" === u && (u = t.type),
                                        g.setToClearWatchedEvent();
                                });
                        },
                        update: function () {
                            var e = o + "disabled";
                            1 === s.pagingCount
                                ? s.directionNav
                                      .addClass(e)
                                      .attr("tabindex", "-1")
                                : s.vars.animationLoop
                                ? s.directionNav
                                      .removeClass(e)
                                      .prop("tabindex", "-1")
                                : 0 === s.animatingTo
                                ? s.directionNav
                                      .removeClass(e)
                                      .filter("." + o + "prev")
                                      .addClass(e)
                                      .attr("tabindex", "-1")
                                : s.animatingTo === s.last
                                ? s.directionNav
                                      .removeClass(e)
                                      .filter("." + o + "next")
                                      .addClass(e)
                                      .attr("tabindex", "-1")
                                : s.directionNav
                                      .removeClass(e)
                                      .prop("tabindex", "-1");
                        },
                    },
                    pausePlay: {
                        setup: function () {
                            var t = e(
                                '<div class="' +
                                    o +
                                    'pauseplay"><a href="#"></a></div>'
                            );
                            s.controlsContainer
                                ? (s.controlsContainer.append(t),
                                  (s.pausePlay = e(
                                      "." + o + "pauseplay a",
                                      s.controlsContainer
                                  )))
                                : (s.append(t),
                                  (s.pausePlay = e(
                                      "." + o + "pauseplay a",
                                      s
                                  ))),
                                g.pausePlay.update(
                                    s.vars.slideshow ? o + "pause" : o + "play"
                                ),
                                s.pausePlay.on(c, function (t) {
                                    t.preventDefault(),
                                        ("" !== u && u !== t.type) ||
                                            (e(this).hasClass(o + "pause")
                                                ? ((s.manualPause = !0),
                                                  (s.manualPlay = !1),
                                                  s.pause())
                                                : ((s.manualPause = !1),
                                                  (s.manualPlay = !0),
                                                  s.play())),
                                        "" === u && (u = t.type),
                                        g.setToClearWatchedEvent();
                                });
                        },
                        update: function (e) {
                            "play" === e
                                ? s.pausePlay
                                      .removeClass(o + "pause")
                                      .addClass(o + "play")
                                      .html(s.vars.playText)
                                : s.pausePlay
                                      .removeClass(o + "play")
                                      .addClass(o + "pause")
                                      .html(s.vars.pauseText);
                        },
                    },
                    touch: function () {
                        var e,
                            t,
                            a,
                            i,
                            r,
                            o,
                            l,
                            c,
                            u,
                            d = !1,
                            h = 0,
                            g = 0;
                        (l = function (r) {
                            s.animating
                                ? r.preventDefault()
                                : 1 === r.touches.length &&
                                  (s.pause(),
                                  (i = v ? s.h : s.w),
                                  (o = Number(new Date())),
                                  (h = r.touches[0].pageX),
                                  (g = r.touches[0].pageY),
                                  (a =
                                      m && p && s.animatingTo === s.last
                                          ? 0
                                          : m && p
                                          ? s.limit -
                                            (s.itemW + s.vars.itemMargin) *
                                                s.move *
                                                s.animatingTo
                                          : m && s.currentSlide === s.last
                                          ? s.limit
                                          : m
                                          ? (s.itemW + s.vars.itemMargin) *
                                            s.move *
                                            s.currentSlide
                                          : p
                                          ? (s.last -
                                                s.currentSlide +
                                                s.cloneOffset) *
                                            i
                                          : (s.currentSlide + s.cloneOffset) *
                                            i),
                                  (e = v ? g : h),
                                  (t = v ? h : g),
                                  n.addEventListener("touchmove", c, !1),
                                  n.addEventListener("touchend", u, !1));
                        }),
                            (c = function (n) {
                                (h = n.touches[0].pageX),
                                    (g = n.touches[0].pageY),
                                    (r = v
                                        ? e - g
                                        : (s.vars.rtl ? -1 : 1) * (e - h));
                                (!(d = v
                                    ? Math.abs(r) < Math.abs(h - t)
                                    : Math.abs(r) < Math.abs(g - t)) ||
                                    Number(new Date()) - o > 500) &&
                                    (n.preventDefault(),
                                    !f &&
                                        s.transitions &&
                                        (s.vars.animationLoop ||
                                            (r /=
                                                (0 === s.currentSlide &&
                                                    r < 0) ||
                                                (s.currentSlide === s.last &&
                                                    r > 0)
                                                    ? Math.abs(r) / i + 2
                                                    : 1),
                                        s.setProps(a + r, "setTouch")));
                            }),
                            (u = function (l) {
                                if (
                                    (n.removeEventListener("touchmove", c, !1),
                                    s.animatingTo === s.currentSlide &&
                                        !d &&
                                        null !== r)
                                ) {
                                    var v = p ? -r : r,
                                        m =
                                            v > 0
                                                ? s.getTarget("next")
                                                : s.getTarget("prev");
                                    s.canAdvance(m) &&
                                    ((Number(new Date()) - o < 550 &&
                                        Math.abs(v) > 50) ||
                                        Math.abs(v) > i / 2)
                                        ? s.flexAnimate(m, s.vars.pauseOnAction)
                                        : f ||
                                          s.flexAnimate(
                                              s.currentSlide,
                                              s.vars.pauseOnAction,
                                              !0
                                          );
                                }
                                n.removeEventListener("touchend", u, !1),
                                    (e = null),
                                    (t = null),
                                    (r = null),
                                    (a = null);
                            }),
                            n.addEventListener("touchstart", l, !1);
                    },
                    resize: function () {
                        !s.animating &&
                            s.is(":visible") &&
                            (m || s.doMath(),
                            f
                                ? g.smoothHeight()
                                : m
                                ? (s.slides.width(s.computedW),
                                  s.update(s.pagingCount),
                                  s.setProps())
                                : v
                                ? (s.viewport.height(s.h),
                                  s.setProps(s.h, "setTotal"))
                                : (s.setProps(s.computedW, "setTotal"),
                                  s.newSlides.width(s.computedW),
                                  s.vars.smoothHeight && g.smoothHeight()));
                    },
                    smoothHeight: function (e) {
                        if (!v || f) {
                            var t = f ? s : s.viewport;
                            e
                                ? t.animate(
                                      {
                                          height: s.slides
                                              .eq(s.animatingTo)
                                              .innerHeight(),
                                      },
                                      e
                                  )
                                : t.innerHeight(
                                      s.slides.eq(s.animatingTo).innerHeight()
                                  );
                        }
                    },
                    sync: function (t) {
                        var a = e(s.vars.sync).data("flexslider"),
                            n = s.animatingTo;
                        switch (t) {
                            case "animate":
                                a.flexAnimate(n, s.vars.pauseOnAction, !1, !0);
                                break;
                            case "play":
                                a.playing || a.asNav || a.play();
                                break;
                            case "pause":
                                a.pause();
                        }
                    },
                    uniqueID: function (t) {
                        return (
                            t
                                .filter("[id]")
                                .add(t.find("[id]"))
                                .each(function () {
                                    var t = e(this);
                                    t.attr("id", t.attr("id") + "_clone");
                                }),
                            t
                        );
                    },
                    pauseInvisible: function () {
                        document.addEventListener(
                            "visibilitychange",
                            function () {
                                "hidden" === document.visibilityState
                                    ? s.startTimeout
                                        ? clearTimeout(s.startTimeout)
                                        : s.pause()
                                    : s.started
                                    ? s.play()
                                    : s.vars.initDelay > 0
                                    ? setTimeout(s.play, s.vars.initDelay)
                                    : s.play();
                            }
                        );
                    },
                    setToClearWatchedEvent: function () {
                        clearTimeout(r),
                            (r = setTimeout(function () {
                                u = "";
                            }, 3e3));
                    },
                }),
                (s.flexAnimate = function (t, a, n, i, r) {
                    if (
                        (s.vars.animationLoop ||
                            t === s.currentSlide ||
                            (s.direction =
                                t > s.currentSlide ? "next" : "prev"),
                        h &&
                            1 === s.pagingCount &&
                            (s.direction = s.currentItem < t ? "next" : "prev"),
                        !s.animating &&
                            (s.canAdvance(t, r) || n) &&
                            s.is(":visible"))
                    ) {
                        if (h && i) {
                            var c = e(s.vars.asNavFor).data("flexslider");
                            if (
                                ((s.atEnd = 0 === t || t === s.count - 1),
                                c.flexAnimate(t, !0, !1, !0, r),
                                (s.direction =
                                    s.currentItem < t ? "next" : "prev"),
                                (c.direction = s.direction),
                                Math.ceil((t + 1) / s.visible) - 1 ===
                                    s.currentSlide || 0 === t)
                            )
                                return (
                                    (s.currentItem = t),
                                    s.slides
                                        .removeClass(o + "active-slide")
                                        .eq(t)
                                        .addClass(o + "active-slide"),
                                    !1
                                );
                            (s.currentItem = t),
                                s.slides
                                    .removeClass(o + "active-slide")
                                    .eq(t)
                                    .addClass(o + "active-slide"),
                                (t = Math.floor(t / s.visible));
                        }
                        if (
                            ((s.animating = !0),
                            (s.animatingTo = t),
                            a && s.pause(),
                            s.vars.before(s),
                            s.syncExists && !r && g.sync("animate"),
                            s.vars.controlNav && g.controlNav.active(),
                            m ||
                                s.slides
                                    .removeClass(o + "active-slide")
                                    .eq(t)
                                    .addClass(o + "active-slide"),
                            (s.atEnd = 0 === t || t === s.last),
                            s.vars.directionNav && g.directionNav.update(),
                            t === s.last &&
                                (s.vars.end(s),
                                s.vars.animationLoop || s.pause()),
                            f)
                        )
                            l
                                ? (s.slides
                                      .eq(s.currentSlide)
                                      .css({ opacity: 0, zIndex: 1 }),
                                  s.slides.eq(t).css({ opacity: 1, zIndex: 2 }),
                                  s.wrapup(x))
                                : (s.slides
                                      .eq(s.currentSlide)
                                      .css({ zIndex: 1 })
                                      .animate(
                                          { opacity: 0 },
                                          s.vars.animationSpeed,
                                          s.vars.easing
                                      ),
                                  s.slides
                                      .eq(t)
                                      .css({ zIndex: 2 })
                                      .animate(
                                          { opacity: 1 },
                                          s.vars.animationSpeed,
                                          s.vars.easing,
                                          s.wrapup
                                      ));
                        else {
                            var u,
                                b,
                                y,
                                x = v
                                    ? s.slides.filter(":first").height()
                                    : s.computedW;
                            if (
                                (m
                                    ? ((u = s.vars.itemMargin),
                                      (b =
                                          (y =
                                              (s.itemW + u) *
                                              s.move *
                                              s.animatingTo) > s.limit &&
                                          1 !== s.visible
                                              ? s.limit
                                              : y))
                                    : (b =
                                          0 === s.currentSlide &&
                                          t === s.count - 1 &&
                                          s.vars.animationLoop &&
                                          "next" !== s.direction
                                              ? p
                                                  ? (s.count + s.cloneOffset) *
                                                    x
                                                  : 0
                                              : s.currentSlide === s.last &&
                                                0 === t &&
                                                s.vars.animationLoop &&
                                                "prev" !== s.direction
                                              ? p
                                                  ? 0
                                                  : (s.count + 1) * x
                                              : p
                                              ? (s.count -
                                                    1 -
                                                    t +
                                                    s.cloneOffset) *
                                                x
                                              : (t + s.cloneOffset) * x),
                                s.setProps(b, "", s.vars.animationSpeed),
                                s.transitions)
                            )
                                (s.vars.animationLoop && s.atEnd) ||
                                    ((s.animating = !1),
                                    (s.currentSlide = s.animatingTo)),
                                    s.container.off("transitionend"),
                                    s.container.on(
                                        "transitionend",
                                        function () {
                                            clearTimeout(s.ensureAnimationEnd),
                                                s.wrapup(x);
                                        }
                                    ),
                                    clearTimeout(s.ensureAnimationEnd),
                                    (s.ensureAnimationEnd = setTimeout(
                                        function () {
                                            s.wrapup(x);
                                        },
                                        s.vars.animationSpeed + 100
                                    ));
                            else {
                                var S = s.prop;
                                s.container.each(function () {
                                    var e = this,
                                        t = {};
                                    (t[S] = [
                                        window.getComputedStyle(e)[S],
                                        s.args[S],
                                    ]),
                                        (e.animate(t, {
                                            duration: s.vars.animationSpeed,
                                            easing: d,
                                        }).onfinish = function () {
                                            (e.style[S] = s.args[S]),
                                                s.wrapup(x);
                                        });
                                });
                            }
                        }
                        s.vars.smoothHeight &&
                            g.smoothHeight(s.vars.animationSpeed);
                    }
                }),
                (s.wrapup = function (e) {
                    f ||
                        m ||
                        (0 === s.currentSlide &&
                        s.animatingTo === s.last &&
                        s.vars.animationLoop
                            ? s.setProps(e, "jumpEnd")
                            : s.currentSlide === s.last &&
                              0 === s.animatingTo &&
                              s.vars.animationLoop &&
                              s.setProps(e, "jumpStart")),
                        (s.animating = !1),
                        (s.currentSlide = s.animatingTo),
                        s.vars.after(s);
                }),
                (s.animateSlides = function () {
                    !s.animating && t && s.flexAnimate(s.getTarget("next"));
                }),
                (s.pause = function () {
                    clearInterval(s.animatedSlides),
                        (s.animatedSlides = null),
                        (s.playing = !1),
                        s.vars.pausePlay && g.pausePlay.update("play"),
                        s.syncExists && g.sync("pause");
                }),
                (s.play = function () {
                    s.playing && clearInterval(s.animatedSlides),
                        (s.animatedSlides =
                            s.animatedSlides ||
                            setInterval(
                                s.animateSlides,
                                s.vars.slideshowSpeed
                            )),
                        (s.started = s.playing = !0),
                        s.vars.pausePlay && g.pausePlay.update("pause"),
                        s.syncExists && g.sync("play");
                }),
                (s.stop = function () {
                    s.pause(), (s.stopped = !0);
                }),
                (s.canAdvance = function (e, t) {
                    var a = h ? s.pagingCount - 1 : s.last;
                    return (
                        !!t ||
                        !(
                            !h ||
                            s.currentItem !== s.count - 1 ||
                            0 !== e ||
                            "prev" !== s.direction
                        ) ||
                        ((!h ||
                            0 !== s.currentItem ||
                            e !== s.pagingCount - 1 ||
                            "next" === s.direction) &&
                            !(e === s.currentSlide && !h) &&
                            (!!s.vars.animationLoop ||
                                ((!s.atEnd ||
                                    0 !== s.currentSlide ||
                                    e !== a ||
                                    "next" === s.direction) &&
                                    (!s.atEnd ||
                                        s.currentSlide !== a ||
                                        0 !== e ||
                                        "next" !== s.direction))))
                    );
                }),
                (s.getTarget = function (e) {
                    return (
                        (s.direction = e),
                        "next" === e
                            ? s.currentSlide === s.last
                                ? 0
                                : s.currentSlide + 1
                            : 0 === s.currentSlide
                            ? s.last
                            : s.currentSlide - 1
                    );
                }),
                (s.setProps = function (e, t, a) {
                    var n,
                        i =
                            ((n =
                                e ||
                                (s.itemW + s.vars.itemMargin) *
                                    s.move *
                                    s.animatingTo),
                            (function () {
                                if (m)
                                    return "setTouch" === t
                                        ? e
                                        : p && s.animatingTo === s.last
                                        ? 0
                                        : p
                                        ? s.limit -
                                          (s.itemW + s.vars.itemMargin) *
                                              s.move *
                                              s.animatingTo
                                        : s.animatingTo === s.last
                                        ? s.limit
                                        : n;
                                switch (t) {
                                    case "setTotal":
                                        return p
                                            ? (s.count -
                                                  1 -
                                                  s.currentSlide +
                                                  s.cloneOffset) *
                                                  e
                                            : (s.currentSlide + s.cloneOffset) *
                                                  e;
                                    case "setTouch":
                                        return e;
                                    case "jumpEnd":
                                        return p ? e : s.count * e;
                                    case "jumpStart":
                                        return p ? s.count * e : e;
                                    default:
                                        return e;
                                }
                            })() *
                                (s.vars.rtl ? 1 : -1) +
                                "px");
                    s.transitions &&
                        ((i = v
                            ? "translate3d(0," + i + ",0)"
                            : "translate3d(" + parseInt(i) + "px,0,0)"),
                        (a = a !== undefined ? a / 1e3 + "s" : "0s"),
                        s.container.css("transition-duration", a)),
                        (s.args[s.prop] = i),
                        (s.transitions || a === undefined) &&
                            s.container.css(s.args),
                        s.container.css("transform", i);
                }),
                (s.setup = function (t) {
                    var a, n;
                    f
                        ? (s.vars.rtl
                              ? s.slides.css({
                                    width: "100%",
                                    float: "right",
                                    marginLeft: "-100%",
                                    position: "relative",
                                })
                              : s.slides.css({
                                    width: "100%",
                                    float: "left",
                                    marginRight: "-100%",
                                    position: "relative",
                                }),
                          "init" === t &&
                              (l
                                  ? s.slides
                                        .css({
                                            opacity: 0,
                                            display: "block",
                                            transition:
                                                "opacity " +
                                                s.vars.animationSpeed / 1e3 +
                                                "s ease",
                                            zIndex: 1,
                                        })
                                        .eq(s.currentSlide)
                                        .css({ opacity: 1, zIndex: 2 })
                                  : 0 == s.vars.fadeFirstSlide
                                  ? s.slides
                                        .css({
                                            opacity: 0,
                                            display: "block",
                                            zIndex: 1,
                                        })
                                        .eq(s.currentSlide)
                                        .css({ zIndex: 2 })
                                        .css({ opacity: 1 })
                                  : s.slides
                                        .css({
                                            opacity: 0,
                                            display: "block",
                                            zIndex: 1,
                                        })
                                        .eq(s.currentSlide)
                                        .css({ zIndex: 2 })
                                        .animate(
                                            { opacity: 1 },
                                            s.vars.animationSpeed,
                                            s.vars.easing
                                        )),
                          s.vars.smoothHeight && g.smoothHeight())
                        : ("init" === t &&
                              ((s.viewport = e(
                                  '<div class="' + o + 'viewport"></div>'
                              )
                                  .css({
                                      overflow: "hidden",
                                      position: "relative",
                                  })
                                  .appendTo(s)
                                  .append(s.container)),
                              (s.cloneCount = 0),
                              (s.cloneOffset = 0),
                              p &&
                                  ((n = e.makeArray(s.slides).reverse()),
                                  (s.slides = e(n)),
                                  s.container.empty().append(s.slides))),
                          s.vars.animationLoop &&
                              !m &&
                              ((s.cloneCount = 2),
                              (s.cloneOffset = 1),
                              "init" !== t &&
                                  s.container.find(".clone").remove(),
                              s.container
                                  .append(
                                      g
                                          .uniqueID(
                                              s.slides
                                                  .first()
                                                  .clone()
                                                  .addClass("clone")
                                          )
                                          .attr("aria-hidden", "true")
                                  )
                                  .prepend(
                                      g
                                          .uniqueID(
                                              s.slides
                                                  .last()
                                                  .clone()
                                                  .addClass("clone")
                                          )
                                          .attr("aria-hidden", "true")
                                  )),
                          (s.newSlides = e(s.vars.selector, s)),
                          (a = p
                              ? s.count - 1 - s.currentSlide + s.cloneOffset
                              : s.currentSlide + s.cloneOffset),
                          v && !m
                              ? (s.container
                                    .height(
                                        200 * (s.count + s.cloneCount) + "%"
                                    )
                                    .css("position", "absolute")
                                    .width("100%"),
                                setTimeout(
                                    function () {
                                        s.newSlides.css({ display: "block" }),
                                            s.doMath(),
                                            s.viewport.height(s.h),
                                            s.setProps(a * s.h, "init");
                                    },
                                    "init" === t ? 100 : 0
                                ))
                              : (s.container.width(
                                    200 * (s.count + s.cloneCount) + "%"
                                ),
                                s.setProps(a * s.computedW, "init"),
                                setTimeout(
                                    function () {
                                        s.doMath(),
                                            s.vars.rtl
                                                ? s.newSlides.css({
                                                      width: s.computedW,
                                                      marginRight: s.computedM,
                                                      float: "right",
                                                      display: "block",
                                                  })
                                                : s.newSlides.css({
                                                      width: s.computedW,
                                                      marginRight: s.computedM,
                                                      float: "left",
                                                      display: "block",
                                                  }),
                                            s.vars.smoothHeight &&
                                                g.smoothHeight();
                                    },
                                    "init" === t ? 100 : 0
                                )));
                    m ||
                        s.slides
                            .removeClass(o + "active-slide")
                            .eq(s.currentSlide)
                            .addClass(o + "active-slide"),
                        s.vars.init(s);
                }),
                (s.doMath = function () {
                    var e = s.slides.first(),
                        t = s.vars.itemMargin,
                        a = s.vars.minItems,
                        n = s.vars.maxItems;
                    (s.w =
                        s.viewport === undefined
                            ? s.width()
                            : s.viewport.width()),
                        s.isFirefox && (s.w = s.width()),
                        (s.h = e.height()),
                        (s.boxPadding = e.outerWidth() - e.width()),
                        m
                            ? ((s.itemT = s.vars.itemWidth + t),
                              (s.itemM = t),
                              (s.minW = a ? a * s.itemT : s.w),
                              (s.maxW = n ? n * s.itemT - t : s.w),
                              (s.itemW =
                                  s.minW > s.w
                                      ? (s.w - t * (a - 1)) / a
                                      : s.maxW < s.w
                                      ? (s.w - t * (n - 1)) / n
                                      : s.vars.itemWidth > s.w
                                      ? s.w
                                      : s.vars.itemWidth),
                              (s.visible = Math.floor(s.w / s.itemW)),
                              (s.move =
                                  s.vars.move > 0 && s.vars.move < s.visible
                                      ? s.vars.move
                                      : s.visible),
                              (s.pagingCount = Math.ceil(
                                  (s.count - s.visible) / s.move + 1
                              )),
                              (s.last = s.pagingCount - 1),
                              (s.limit =
                                  1 === s.pagingCount
                                      ? 0
                                      : s.vars.itemWidth > s.w
                                      ? s.itemW * (s.count - 1) +
                                        t * (s.count - 1)
                                      : (s.itemW + t) * s.count - s.w - t))
                            : ((s.itemW = s.w),
                              (s.itemM = t),
                              (s.pagingCount = s.count),
                              (s.last = s.count - 1)),
                        (s.computedW = s.itemW - s.boxPadding),
                        (s.computedM = s.itemM);
                }),
                (s.update = function (e, t) {
                    s.doMath(),
                        m ||
                            (e < s.currentSlide
                                ? (s.currentSlide += 1)
                                : e <= s.currentSlide &&
                                  0 !== e &&
                                  (s.currentSlide -= 1),
                            (s.animatingTo = s.currentSlide)),
                        s.vars.controlNav &&
                            !s.manualControls &&
                            (("add" === t && !m) ||
                            s.pagingCount > s.controlNav.length
                                ? g.controlNav.update("add")
                                : (("remove" === t && !m) ||
                                      s.pagingCount < s.controlNav.length) &&
                                  (m &&
                                      s.currentSlide > s.last &&
                                      ((s.currentSlide -= 1),
                                      (s.animatingTo -= 1)),
                                  g.controlNav.update("remove", s.last))),
                        s.vars.directionNav && g.directionNav.update();
                }),
                (s.addSlide = function (t, a) {
                    var n = e(t);
                    (s.count += 1),
                        (s.last = s.count - 1),
                        v && p
                            ? a !== undefined
                                ? s.slides.eq(s.count - a).after(n)
                                : s.container.prepend(n)
                            : a !== undefined
                            ? s.slides.eq(a).before(n)
                            : s.container.append(n),
                        s.update(a, "add"),
                        (s.slides = e(s.vars.selector + ":not(.clone)", s)),
                        s.setup(),
                        s.vars.added(s);
                }),
                (s.removeSlide = function (t) {
                    var a = isNaN(t) ? s.slides.index(e(t)) : t;
                    (s.count -= 1),
                        (s.last = s.count - 1),
                        isNaN(t)
                            ? e(t, s.slides).remove()
                            : v && p
                            ? s.slides.eq(s.last).remove()
                            : s.slides.eq(t).remove(),
                        s.doMath(),
                        s.update(a, "remove"),
                        (s.slides = e(s.vars.selector + ":not(.clone)", s)),
                        s.setup(),
                        s.vars.removed(s);
                }),
                g.init();
        }),
        e(window)
            .on("blur", function (e) {
                t = !1;
            })
            .on("focus", function (e) {
                t = !0;
            }),
        (e.flexslider.defaults = {
            namespace: "flex-",
            selector: ".slides > li",
            animation: "fade",
            easing: "swing",
            direction: "horizontal",
            reverse: !1,
            animationLoop: !0,
            smoothHeight: !1,
            startAt: 0,
            slideshow: !0,
            slideshowSpeed: 7e3,
            animationSpeed: 600,
            initDelay: 0,
            randomize: !1,
            fadeFirstSlide: !0,
            thumbCaptions: !1,
            pauseOnAction: !0,
            pauseOnHover: !1,
            pauseInvisible: !0,
            useCSS: !0,
            touch: !0,
            video: !1,
            controlNav: !0,
            directionNav: !0,
            prevText: "Previous",
            nextText: "Next",
            keyboard: !0,
            multipleKeyboard: !1,
            mousewheel: !1,
            pausePlay: !1,
            pauseText: "Pause",
            playText: "Play",
            controlsContainer: "",
            manualControls: "",
            customDirectionNav: "",
            sync: "",
            asNavFor: "",
            itemWidth: 0,
            itemMargin: 0,
            minItems: 1,
            maxItems: 0,
            move: 0,
            allowOneSlide: !0,
            isFirefox: !1,
            start: function () {},
            before: function () {},
            after: function () {},
            end: function () {},
            added: function () {},
            removed: function () {},
            init: function () {},
            rtl: !1,
        }),
        (e.fn.flexslider = function (t) {
            if ((t === undefined && (t = {}), "object" == typeof t))
                return this.each(function () {
                    var a = e(this),
                        n = t.selector ? t.selector : ".slides > li",
                        i = a.find(n);
                    (1 === i.length && !1 === t.allowOneSlide) || 0 === i.length
                        ? (i.fadeIn(400), t.start && t.start(a))
                        : a.data("flexslider") === undefined &&
                          new e.flexslider(this, t);
                });
            var a = e(this).data("flexslider");
            switch (t) {
                case "play":
                    a.play();
                    break;
                case "pause":
                    a.pause();
                    break;
                case "stop":
                    a.stop();
                    break;
                case "next":
                    a.flexAnimate(a.getTarget("next"), !0);
                    break;
                case "prev":
                case "previous":
                    a.flexAnimate(a.getTarget("prev"), !0);
                    break;
                default:
                    "number" == typeof t && a.flexAnimate(t, !0);
            }
        });
})(jQuery);
