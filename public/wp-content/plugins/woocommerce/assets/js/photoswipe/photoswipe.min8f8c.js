/*! PhotoSwipe - v4.1.3 - 2019-01-08
 * http://photoswipe.com
 * Copyright (c) 2019 Dmitry Semenov; */
!(function (e, t) {
    "function" == typeof define && define.amd
        ? define(t)
        : "object" == typeof exports
        ? (module.exports = t())
        : (e.PhotoSwipe = t());
})(this, function () {
    "use strict";
    return function (e, t, n, i) {
        var o = {
            features: null,
            bind: function (e, t, n, i) {
                var o = (i ? "remove" : "add") + "EventListener";
                t = t.split(" ");
                for (var a = 0; a < t.length; a++) t[a] && e[o](t[a], n, !1);
            },
            isArray: function (e) {
                return e instanceof Array;
            },
            createEl: function (e, t) {
                var n = document.createElement(t || "div");
                return e && (n.className = e), n;
            },
            getScrollY: function () {
                var e = window.pageYOffset;
                return e !== undefined ? e : document.documentElement.scrollTop;
            },
            unbind: function (e, t, n) {
                o.bind(e, t, n, !0);
            },
            removeClass: function (e, t) {
                var n = new RegExp("(\\s|^)" + t + "(\\s|$)");
                e.className = e.className
                    .replace(n, " ")
                    .replace(/^\s\s*/, "")
                    .replace(/\s\s*$/, "");
            },
            addClass: function (e, t) {
                o.hasClass(e, t) ||
                    (e.className += (e.className ? " " : "") + t);
            },
            hasClass: function (e, t) {
                return (
                    e.className &&
                    new RegExp("(^|\\s)" + t + "(\\s|$)").test(e.className)
                );
            },
            getChildByClass: function (e, t) {
                for (var n = e.firstChild; n; ) {
                    if (o.hasClass(n, t)) return n;
                    n = n.nextSibling;
                }
            },
            arraySearch: function (e, t, n) {
                for (var i = e.length; i--; ) if (e[i][n] === t) return i;
                return -1;
            },
            extend: function (e, t, n) {
                for (var i in t)
                    if (t.hasOwnProperty(i)) {
                        if (n && e.hasOwnProperty(i)) continue;
                        e[i] = t[i];
                    }
            },
            easing: {
                sine: {
                    out: function (e) {
                        return Math.sin(e * (Math.PI / 2));
                    },
                    inOut: function (e) {
                        return -(Math.cos(Math.PI * e) - 1) / 2;
                    },
                },
                cubic: {
                    out: function (e) {
                        return --e * e * e + 1;
                    },
                },
            },
            detectFeatures: function () {
                if (o.features) return o.features;
                var e = o.createEl().style,
                    t = "",
                    n = {};
                if (
                    ((n.oldIE = document.all && !document.addEventListener),
                    (n.touch = "ontouchstart" in window),
                    window.requestAnimationFrame &&
                        ((n.raf = window.requestAnimationFrame),
                        (n.caf = window.cancelAnimationFrame)),
                    (n.pointerEvent =
                        !!window.PointerEvent || navigator.msPointerEnabled),
                    !n.pointerEvent)
                ) {
                    var i = navigator.userAgent;
                    if (/iP(hone|od)/.test(navigator.platform)) {
                        var a = navigator.appVersion.match(
                            /OS (\d+)_(\d+)_?(\d+)?/
                        );
                        a &&
                            a.length > 0 &&
                            (a = parseInt(a[1], 10)) >= 1 &&
                            a < 8 &&
                            (n.isOldIOSPhone = !0);
                    }
                    var r = i.match(/Android\s([0-9\.]*)/),
                        l = r ? r[1] : 0;
                    (l = parseFloat(l)) >= 1 &&
                        (l < 4.4 && (n.isOldAndroid = !0),
                        (n.androidVersion = l)),
                        (n.isMobileOpera = /opera mini|opera mobi/i.test(i));
                }
                for (
                    var s,
                        u,
                        c = ["transform", "perspective", "animationName"],
                        d = ["", "webkit", "Moz", "ms", "O"],
                        m = 0;
                    m < 4;
                    m++
                ) {
                    t = d[m];
                    for (var p = 0; p < 3; p++)
                        (s = c[p]),
                            (u =
                                t +
                                (t
                                    ? s.charAt(0).toUpperCase() + s.slice(1)
                                    : s)),
                            !n[s] && u in e && (n[s] = u);
                    t &&
                        !n.raf &&
                        ((t = t.toLowerCase()),
                        (n.raf = window[t + "RequestAnimationFrame"]),
                        n.raf &&
                            (n.caf =
                                window[t + "CancelAnimationFrame"] ||
                                window[t + "CancelRequestAnimationFrame"]));
                }
                if (!n.raf) {
                    var f = 0;
                    (n.raf = function (e) {
                        var t = new Date().getTime(),
                            n = Math.max(0, 16 - (t - f)),
                            i = window.setTimeout(function () {
                                e(t + n);
                            }, n);
                        return (f = t + n), i;
                    }),
                        (n.caf = function (e) {
                            clearTimeout(e);
                        });
                }
                return (
                    (n.svg =
                        !!document.createElementNS &&
                        !!document.createElementNS(
                            "http://www.w3.org/2000/svg",
                            "svg"
                        ).createSVGRect),
                    (o.features = n),
                    n
                );
            },
        };
        o.detectFeatures(),
            o.features.oldIE &&
                (o.bind = function (e, t, n, i) {
                    t = t.split(" ");
                    for (
                        var o,
                            a = (i ? "detach" : "attach") + "Event",
                            r = function () {
                                n.handleEvent.call(n);
                            },
                            l = 0;
                        l < t.length;
                        l++
                    )
                        if ((o = t[l]))
                            if ("object" == typeof n && n.handleEvent) {
                                if (i) {
                                    if (!n["oldIE" + o]) return !1;
                                } else n["oldIE" + o] = r;
                                e[a]("on" + o, n["oldIE" + o]);
                            } else e[a]("on" + o, n);
                });
        var a = this,
            r = {
                allowPanToNext: !0,
                spacing: 0.12,
                bgOpacity: 1,
                mouseUsed: !1,
                loop: !0,
                pinchToClose: !0,
                closeOnScroll: !0,
                closeOnVerticalDrag: !0,
                verticalDragRange: 0.75,
                hideAnimationDuration: 333,
                showAnimationDuration: 333,
                showHideOpacity: !1,
                focus: !0,
                escKey: !0,
                arrowKeys: !0,
                mainScrollEndFriction: 0.35,
                panEndFriction: 0.35,
                isClickableElement: function (e) {
                    return "A" === e.tagName;
                },
                getDoubleTapZoom: function (e, t) {
                    return e ? 1 : t.initialZoomLevel < 0.7 ? 1 : 1.33;
                },
                maxSpreadZoom: 1.33,
                modal: !0,
                scaleMode: "fit",
            };
        o.extend(r, i);
        var l,
            s,
            u,
            c,
            d,
            m,
            p,
            f,
            h,
            y,
            x,
            v,
            g,
            w,
            b,
            I,
            C,
            D,
            T,
            M,
            S,
            A,
            E,
            O,
            k,
            R,
            P,
            Z,
            F,
            L,
            z,
            _,
            N,
            U,
            H,
            Y,
            W,
            B,
            G,
            X,
            V,
            K,
            q,
            $,
            j,
            J,
            Q,
            ee,
            te,
            ne,
            ie,
            oe,
            ae,
            re,
            le,
            se,
            ue = { x: 0, y: 0 },
            ce = { x: 0, y: 0 },
            de = { x: 0, y: 0 },
            me = {},
            pe = 0,
            fe = {},
            he = { x: 0, y: 0 },
            ye = 0,
            xe = !0,
            ve = [],
            ge = {},
            we = !1,
            be = function (e, t) {
                o.extend(a, t.publicMethods), ve.push(e);
            },
            Ie = function (e) {
                var t = Ht();
                return e > t - 1 ? e - t : e < 0 ? t + e : e;
            },
            Ce = {},
            De = function (e, t) {
                return Ce[e] || (Ce[e] = []), Ce[e].push(t);
            },
            Te = function (e) {
                var t = Ce[e];
                if (t) {
                    var n = Array.prototype.slice.call(arguments);
                    n.shift();
                    for (var i = 0; i < t.length; i++) t[i].apply(a, n);
                }
            },
            Me = function () {
                return new Date().getTime();
            },
            Se = function (e) {
                (re = e), (a.bg.style.opacity = e * r.bgOpacity);
            },
            Ae = function (e, t, n, i, o) {
                (!we || (o && o !== a.currItem)) &&
                    (i /= o ? o.fitRatio : a.currItem.fitRatio),
                    (e[A] =
                        v + t + "px, " + n + "px" + g + " scale(" + i + ")");
            },
            Ee = function (e) {
                te &&
                    (e &&
                        (y > a.currItem.fitRatio
                            ? we || ($t(a.currItem, !1, !0), (we = !0))
                            : we && ($t(a.currItem), (we = !1))),
                    Ae(te, de.x, de.y, y));
            },
            Oe = function (e) {
                e.container &&
                    Ae(
                        e.container.style,
                        e.initialPosition.x,
                        e.initialPosition.y,
                        e.initialZoomLevel,
                        e
                    );
            },
            ke = function (e, t) {
                t[A] = v + e + "px, 0px" + g;
            },
            Re = function (e, t) {
                if (!r.loop && t) {
                    var n = c + (he.x * pe - e) / he.x,
                        i = Math.round(e - ct.x);
                    ((n < 0 && i > 0) || (n >= Ht() - 1 && i < 0)) &&
                        (e = ct.x + i * r.mainScrollEndFriction);
                }
                (ct.x = e), ke(e, d);
            },
            Pe = function (e, t) {
                var n = dt[e] - fe[e];
                return ce[e] + ue[e] + n - n * (t / x);
            },
            Ze = function (e, t) {
                (e.x = t.x), (e.y = t.y), t.id && (e.id = t.id);
            },
            Fe = function (e) {
                (e.x = Math.round(e.x)), (e.y = Math.round(e.y));
            },
            Le = null,
            ze = function () {
                Le &&
                    (o.unbind(document, "mousemove", ze),
                    o.addClass(e, "pswp--has_mouse"),
                    (r.mouseUsed = !0),
                    Te("mouseUsed")),
                    (Le = setTimeout(function () {
                        Le = null;
                    }, 100));
            },
            _e = function (e, t) {
                var n = Xt(a.currItem, me, e);
                return t && (ee = n), n;
            },
            Ne = function (e) {
                return e || (e = a.currItem), e.initialZoomLevel;
            },
            Ue = function (e) {
                return e || (e = a.currItem), e.w > 0 ? r.maxSpreadZoom : 1;
            },
            He = function (e, t, n, i) {
                return i === a.currItem.initialZoomLevel
                    ? ((n[e] = a.currItem.initialPosition[e]), !0)
                    : ((n[e] = Pe(e, i)),
                      n[e] > t.min[e]
                          ? ((n[e] = t.min[e]), !0)
                          : n[e] < t.max[e] && ((n[e] = t.max[e]), !0));
            },
            Ye = function (e) {
                var t = "";
                r.escKey && 27 === e.keyCode
                    ? (t = "close")
                    : r.arrowKeys &&
                      (37 === e.keyCode
                          ? (t = "prev")
                          : 39 === e.keyCode && (t = "next")),
                    t &&
                        (e.ctrlKey ||
                            e.altKey ||
                            e.shiftKey ||
                            e.metaKey ||
                            (e.preventDefault
                                ? e.preventDefault()
                                : (e.returnValue = !1),
                            a[t]()));
            },
            We = function (e) {
                e &&
                    (K || V || ne || W) &&
                    (e.preventDefault(), e.stopPropagation());
            },
            Be = function () {
                a.setScrollOffset(0, o.getScrollY());
            },
            Ge = {},
            Xe = 0,
            Ve = function (e) {
                Ge[e] && (Ge[e].raf && R(Ge[e].raf), Xe--, delete Ge[e]);
            },
            Ke = function (e) {
                Ge[e] && Ve(e), Ge[e] || (Xe++, (Ge[e] = {}));
            },
            qe = function () {
                for (var e in Ge) Ge.hasOwnProperty(e) && Ve(e);
            },
            $e = function (e, t, n, i, o, a, r) {
                var l,
                    s = Me();
                Ke(e);
                var u = function () {
                    if (Ge[e]) {
                        if ((l = Me() - s) >= i)
                            return Ve(e), a(n), void (r && r());
                        a((n - t) * o(l / i) + t), (Ge[e].raf = k(u));
                    }
                };
                u();
            },
            je = {
                shout: Te,
                listen: De,
                viewportSize: me,
                options: r,
                isMainScrollAnimating: function () {
                    return ne;
                },
                getZoomLevel: function () {
                    return y;
                },
                getCurrentIndex: function () {
                    return c;
                },
                isDragging: function () {
                    return G;
                },
                isZooming: function () {
                    return J;
                },
                setScrollOffset: function (e, t) {
                    (fe.x = e), (L = fe.y = t), Te("updateScrollOffset", fe);
                },
                applyZoomPan: function (e, t, n, i) {
                    (de.x = t), (de.y = n), (y = e), Ee(i);
                },
                init: function () {
                    if (!l && !s) {
                        var n;
                        (a.framework = o),
                            (a.template = e),
                            (a.bg = o.getChildByClass(e, "pswp__bg")),
                            (P = e.className),
                            (l = !0),
                            (z = o.detectFeatures()),
                            (k = z.raf),
                            (R = z.caf),
                            (A = z.transform),
                            (F = z.oldIE),
                            (a.scrollWrap = o.getChildByClass(
                                e,
                                "pswp__scroll-wrap"
                            )),
                            (a.container = o.getChildByClass(
                                a.scrollWrap,
                                "pswp__container"
                            )),
                            (d = a.container.style),
                            (a.itemHolders = I =
                                [
                                    {
                                        el: a.container.children[0],
                                        wrap: 0,
                                        index: -1,
                                    },
                                    {
                                        el: a.container.children[1],
                                        wrap: 0,
                                        index: -1,
                                    },
                                    {
                                        el: a.container.children[2],
                                        wrap: 0,
                                        index: -1,
                                    },
                                ]),
                            (I[0].el.style.display = I[2].el.style.display =
                                "none"),
                            (function () {
                                if (A) {
                                    var t = z.perspective && !O;
                                    return (
                                        (v = "translate" + (t ? "3d(" : "(")),
                                        void (g = z.perspective
                                            ? ", 0px)"
                                            : ")")
                                    );
                                }
                                (A = "left"),
                                    o.addClass(e, "pswp--ie"),
                                    (ke = function (e, t) {
                                        t.left = e + "px";
                                    }),
                                    (Oe = function (e) {
                                        var t = e.fitRatio > 1 ? 1 : e.fitRatio,
                                            n = e.container.style,
                                            i = t * e.w,
                                            o = t * e.h;
                                        (n.width = i + "px"),
                                            (n.height = o + "px"),
                                            (n.left =
                                                e.initialPosition.x + "px"),
                                            (n.top =
                                                e.initialPosition.y + "px");
                                    }),
                                    (Ee = function () {
                                        if (te) {
                                            var e = te,
                                                t = a.currItem,
                                                n =
                                                    t.fitRatio > 1
                                                        ? 1
                                                        : t.fitRatio,
                                                i = n * t.w,
                                                o = n * t.h;
                                            (e.width = i + "px"),
                                                (e.height = o + "px"),
                                                (e.left = de.x + "px"),
                                                (e.top = de.y + "px");
                                        }
                                    });
                            })(),
                            (h = {
                                resize: a.updateSize,
                                orientationchange: function () {
                                    clearTimeout(_),
                                        (_ = setTimeout(function () {
                                            me.x !== a.scrollWrap.clientWidth &&
                                                a.updateSize();
                                        }, 500));
                                },
                                scroll: Be,
                                keydown: Ye,
                                click: We,
                            });
                        var i =
                            z.isOldIOSPhone ||
                            z.isOldAndroid ||
                            z.isMobileOpera;
                        for (
                            (z.animationName && z.transform && !i) ||
                                (r.showAnimationDuration =
                                    r.hideAnimationDuration =
                                        0),
                                n = 0;
                            n < ve.length;
                            n++
                        )
                            a["init" + ve[n]]();
                        t && (a.ui = new t(a, o)).init(),
                            Te("firstUpdate"),
                            (c = c || r.index || 0),
                            (isNaN(c) || c < 0 || c >= Ht()) && (c = 0),
                            (a.currItem = Ut(c)),
                            (z.isOldIOSPhone || z.isOldAndroid) && (xe = !1),
                            e.setAttribute("aria-hidden", "false"),
                            r.modal &&
                                (xe
                                    ? (e.style.position = "fixed")
                                    : ((e.style.position = "absolute"),
                                      (e.style.top = o.getScrollY() + "px"))),
                            L === undefined &&
                                (Te("initialLayout"), (L = Z = o.getScrollY()));
                        var u = "pswp--open ";
                        for (
                            r.mainClass && (u += r.mainClass + " "),
                                r.showHideOpacity &&
                                    (u += "pswp--animate_opacity "),
                                u += O ? "pswp--touch" : "pswp--notouch",
                                u += z.animationName
                                    ? " pswp--css_animation"
                                    : "",
                                u += z.svg ? " pswp--svg" : "",
                                o.addClass(e, u),
                                a.updateSize(),
                                m = -1,
                                ye = null,
                                n = 0;
                            n < 3;
                            n++
                        )
                            ke((n + m) * he.x, I[n].el.style);
                        F || o.bind(a.scrollWrap, f, a),
                            De("initialZoomInEnd", function () {
                                a.setContent(I[0], c - 1),
                                    a.setContent(I[2], c + 1),
                                    (I[0].el.style.display =
                                        I[2].el.style.display =
                                            "block"),
                                    r.focus && e.focus(),
                                    o.bind(document, "keydown", a),
                                    z.transform &&
                                        o.bind(a.scrollWrap, "click", a),
                                    r.mouseUsed ||
                                        o.bind(document, "mousemove", ze),
                                    o.bind(
                                        window,
                                        "resize scroll orientationchange",
                                        a
                                    ),
                                    Te("bindEvents");
                            }),
                            a.setContent(I[1], c),
                            a.updateCurrItem(),
                            Te("afterInit"),
                            xe ||
                                (w = setInterval(function () {
                                    Xe ||
                                        G ||
                                        J ||
                                        y !== a.currItem.initialZoomLevel ||
                                        a.updateSize();
                                }, 1e3)),
                            o.addClass(e, "pswp--visible");
                    }
                },
                close: function () {
                    l &&
                        ((l = !1),
                        (s = !0),
                        Te("close"),
                        o.unbind(window, "resize scroll orientationchange", a),
                        o.unbind(window, "scroll", h.scroll),
                        o.unbind(document, "keydown", a),
                        o.unbind(document, "mousemove", ze),
                        z.transform && o.unbind(a.scrollWrap, "click", a),
                        G && o.unbind(window, p, a),
                        clearTimeout(_),
                        Te("unbindEvents"),
                        Yt(a.currItem, null, !0, a.destroy));
                },
                destroy: function () {
                    Te("destroy"),
                        Lt && clearTimeout(Lt),
                        e.setAttribute("aria-hidden", "true"),
                        (e.className = P),
                        w && clearInterval(w),
                        o.unbind(a.scrollWrap, f, a),
                        o.unbind(window, "scroll", a),
                        ft(),
                        qe(),
                        (Ce = null);
                },
                panTo: function (e, t, n) {
                    n ||
                        (e > ee.min.x
                            ? (e = ee.min.x)
                            : e < ee.max.x && (e = ee.max.x),
                        t > ee.min.y
                            ? (t = ee.min.y)
                            : t < ee.max.y && (t = ee.max.y)),
                        (de.x = e),
                        (de.y = t),
                        Ee();
                },
                handleEvent: function (e) {
                    (e = e || window.event), h[e.type] && h[e.type](e);
                },
                goTo: function (e) {
                    var t = (e = Ie(e)) - c;
                    (ye = t),
                        (c = e),
                        (a.currItem = Ut(c)),
                        (pe -= t),
                        Re(he.x * pe),
                        qe(),
                        (ne = !1),
                        a.updateCurrItem();
                },
                next: function () {
                    a.goTo(c + 1);
                },
                prev: function () {
                    a.goTo(c - 1);
                },
                updateCurrZoomItem: function (e) {
                    if ((e && Te("beforeChange", 0), I[1].el.children.length)) {
                        var t = I[1].el.children[0];
                        te = o.hasClass(t, "pswp__zoom-wrap") ? t.style : null;
                    } else te = null;
                    (ee = a.currItem.bounds),
                        (x = y = a.currItem.initialZoomLevel),
                        (de.x = ee.center.x),
                        (de.y = ee.center.y),
                        e && Te("afterChange");
                },
                invalidateCurrItems: function () {
                    b = !0;
                    for (var e = 0; e < 3; e++)
                        I[e].item && (I[e].item.needsUpdate = !0);
                },
                updateCurrItem: function (e) {
                    if (0 !== ye) {
                        var t,
                            n = Math.abs(ye);
                        if (!(e && n < 2)) {
                            (a.currItem = Ut(c)),
                                (we = !1),
                                Te("beforeChange", ye),
                                n >= 3 &&
                                    ((m += ye + (ye > 0 ? -3 : 3)), (n = 3));
                            for (var i = 0; i < n; i++)
                                ye > 0
                                    ? ((t = I.shift()),
                                      (I[2] = t),
                                      ke((++m + 2) * he.x, t.el.style),
                                      a.setContent(t, c - n + i + 1 + 1))
                                    : ((t = I.pop()),
                                      I.unshift(t),
                                      ke(--m * he.x, t.el.style),
                                      a.setContent(t, c + n - i - 1 - 1));
                            if (te && 1 === Math.abs(ye)) {
                                var o = Ut(C);
                                o.initialZoomLevel !== y &&
                                    (Xt(o, me), $t(o), Oe(o));
                            }
                            (ye = 0),
                                a.updateCurrZoomItem(),
                                (C = c),
                                Te("afterChange");
                        }
                    }
                },
                updateSize: function (t) {
                    if (!xe && r.modal) {
                        var n = o.getScrollY();
                        if (
                            (L !== n && ((e.style.top = n + "px"), (L = n)),
                            !t &&
                                ge.x === window.innerWidth &&
                                ge.y === window.innerHeight)
                        )
                            return;
                        (ge.x = window.innerWidth),
                            (ge.y = window.innerHeight),
                            (e.style.height = ge.y + "px");
                    }
                    if (
                        ((me.x = a.scrollWrap.clientWidth),
                        (me.y = a.scrollWrap.clientHeight),
                        Be(),
                        (he.x = me.x + Math.round(me.x * r.spacing)),
                        (he.y = me.y),
                        Re(he.x * pe),
                        Te("beforeResize"),
                        m !== undefined)
                    ) {
                        for (var i, l, s, u = 0; u < 3; u++)
                            (i = I[u]),
                                ke((u + m) * he.x, i.el.style),
                                (s = c + u - 1),
                                r.loop && Ht() > 2 && (s = Ie(s)),
                                (l = Ut(s)) && (b || l.needsUpdate || !l.bounds)
                                    ? (a.cleanSlide(l),
                                      a.setContent(i, s),
                                      1 === u &&
                                          ((a.currItem = l),
                                          a.updateCurrZoomItem(!0)),
                                      (l.needsUpdate = !1))
                                    : -1 === i.index &&
                                      s >= 0 &&
                                      a.setContent(i, s),
                                l && l.container && (Xt(l, me), $t(l), Oe(l));
                        b = !1;
                    }
                    (x = y = a.currItem.initialZoomLevel),
                        (ee = a.currItem.bounds) &&
                            ((de.x = ee.center.x),
                            (de.y = ee.center.y),
                            Ee(!0)),
                        Te("resize");
                },
                zoomTo: function (e, t, n, i, a) {
                    t &&
                        ((x = y),
                        (dt.x = Math.abs(t.x) - de.x),
                        (dt.y = Math.abs(t.y) - de.y),
                        Ze(ce, de));
                    var r = _e(e, !1),
                        l = {};
                    He("x", r, l, e), He("y", r, l, e);
                    var s = y,
                        u = de.x,
                        c = de.y;
                    Fe(l);
                    var d = function (t) {
                        1 === t
                            ? ((y = e), (de.x = l.x), (de.y = l.y))
                            : ((y = (e - s) * t + s),
                              (de.x = (l.x - u) * t + u),
                              (de.y = (l.y - c) * t + c)),
                            a && a(t),
                            Ee(1 === t);
                    };
                    n
                        ? $e(
                              "customZoomTo",
                              0,
                              1,
                              n,
                              i || o.easing.sine.inOut,
                              d
                          )
                        : d(1);
                },
            },
            Je = {},
            Qe = {},
            et = {},
            tt = {},
            nt = {},
            it = [],
            ot = {},
            at = [],
            rt = {},
            lt = 0,
            st = { x: 0, y: 0 },
            ut = 0,
            ct = { x: 0, y: 0 },
            dt = { x: 0, y: 0 },
            mt = { x: 0, y: 0 },
            pt = function (e, t) {
                return (
                    (rt.x = Math.abs(e.x - t.x)),
                    (rt.y = Math.abs(e.y - t.y)),
                    Math.sqrt(rt.x * rt.x + rt.y * rt.y)
                );
            },
            ft = function () {
                q && (R(q), (q = null));
            },
            ht = function () {
                G && ((q = k(ht)), Et());
            },
            yt = function (e, t) {
                return (
                    !(!e || e === document) &&
                    !(
                        e.getAttribute("class") &&
                        e.getAttribute("class").indexOf("pswp__scroll-wrap") >
                            -1
                    ) &&
                    (t(e) ? e : yt(e.parentNode, t))
                );
            },
            xt = {},
            vt = function (e, t) {
                return (
                    (xt.prevent = !yt(e.target, r.isClickableElement)),
                    Te("preventDragEvent", e, t, xt),
                    xt.prevent
                );
            },
            gt = function (e, t) {
                return (
                    (t.x = e.pageX), (t.y = e.pageY), (t.id = e.identifier), t
                );
            },
            wt = function (e, t, n) {
                (n.x = 0.5 * (e.x + t.x)), (n.y = 0.5 * (e.y + t.y));
            },
            bt = function () {
                var e = de.y - a.currItem.initialPosition.y;
                return 1 - Math.abs(e / (me.y / 2));
            },
            It = {},
            Ct = {},
            Dt = [],
            Tt = function (e) {
                for (; Dt.length > 0; ) Dt.pop();
                return (
                    E
                        ? ((se = 0),
                          it.forEach(function (e) {
                              0 === se ? (Dt[0] = e) : 1 === se && (Dt[1] = e),
                                  se++;
                          }))
                        : e.type.indexOf("touch") > -1
                        ? e.touches &&
                          e.touches.length > 0 &&
                          ((Dt[0] = gt(e.touches[0], It)),
                          e.touches.length > 1 &&
                              (Dt[1] = gt(e.touches[1], Ct)))
                        : ((It.x = e.pageX),
                          (It.y = e.pageY),
                          (It.id = ""),
                          (Dt[0] = It)),
                    Dt
                );
            },
            Mt = function (e, t) {
                var n,
                    i,
                    o,
                    l,
                    s = de[e] + t[e],
                    u = t[e] > 0,
                    c = ct.x + t.x,
                    d = ct.x - ot.x;
                if (
                    ((n =
                        s > ee.min[e] || s < ee.max[e] ? r.panEndFriction : 1),
                    (s = de[e] + t[e] * n),
                    (r.allowPanToNext || y === a.currItem.initialZoomLevel) &&
                        (te
                            ? "h" !== ie ||
                              "x" !== e ||
                              V ||
                              (u
                                  ? (s > ee.min[e] &&
                                        ((n = r.panEndFriction),
                                        ee.min[e],
                                        (i = ee.min[e] - ce[e])),
                                    (i <= 0 || d < 0) && Ht() > 1
                                        ? ((l = c),
                                          d < 0 && c > ot.x && (l = ot.x))
                                        : ee.min.x !== ee.max.x && (o = s))
                                  : (s < ee.max[e] &&
                                        ((n = r.panEndFriction),
                                        ee.max[e],
                                        (i = ce[e] - ee.max[e])),
                                    (i <= 0 || d > 0) && Ht() > 1
                                        ? ((l = c),
                                          d > 0 && c < ot.x && (l = ot.x))
                                        : ee.min.x !== ee.max.x && (o = s)))
                            : (l = c),
                        "x" === e))
                )
                    return (
                        l !== undefined && (Re(l, !0), ($ = l !== ot.x)),
                        ee.min.x !== ee.max.x &&
                            (o !== undefined
                                ? (de.x = o)
                                : $ || (de.x += t.x * n)),
                        l !== undefined
                    );
                ne || $ || (y > a.currItem.fitRatio && (de[e] += t[e] * n));
            },
            St = function (e) {
                if (!("mousedown" === e.type && e.button > 0))
                    if (Nt) e.preventDefault();
                    else if (!B || "mousedown" !== e.type) {
                        if (
                            (vt(e, !0) && e.preventDefault(),
                            Te("pointerDown"),
                            E)
                        ) {
                            var t = o.arraySearch(it, e.pointerId, "id");
                            t < 0 && (t = it.length),
                                (it[t] = {
                                    x: e.pageX,
                                    y: e.pageY,
                                    id: e.pointerId,
                                });
                        }
                        var n = Tt(e),
                            i = n.length;
                        (j = null),
                            qe(),
                            (G && 1 !== i) ||
                                ((G = oe = !0),
                                o.bind(window, p, a),
                                (Y = le = ae = W = $ = K = X = V = !1),
                                (ie = null),
                                Te("firstTouchStart", n),
                                Ze(ce, de),
                                (ue.x = ue.y = 0),
                                Ze(tt, n[0]),
                                Ze(nt, tt),
                                (ot.x = he.x * pe),
                                (at = [{ x: tt.x, y: tt.y }]),
                                (U = N = Me()),
                                _e(y, !0),
                                ft(),
                                ht()),
                            !J &&
                                i > 1 &&
                                !ne &&
                                !$ &&
                                ((x = y),
                                (V = !1),
                                (J = X = !0),
                                (ue.y = ue.x = 0),
                                Ze(ce, de),
                                Ze(Je, n[0]),
                                Ze(Qe, n[1]),
                                wt(Je, Qe, mt),
                                (dt.x = Math.abs(mt.x) - de.x),
                                (dt.y = Math.abs(mt.y) - de.y),
                                (Q = pt(Je, Qe)));
                    }
            },
            At = function (e) {
                if ((e.preventDefault(), E)) {
                    var t = o.arraySearch(it, e.pointerId, "id");
                    if (t > -1) {
                        var n = it[t];
                        (n.x = e.pageX), (n.y = e.pageY);
                    }
                }
                if (G) {
                    var i = Tt(e);
                    if (ie || K || J) j = i;
                    else if (ct.x !== he.x * pe) ie = "h";
                    else {
                        var a =
                            Math.abs(i[0].x - tt.x) - Math.abs(i[0].y - tt.y);
                        Math.abs(a) >= 10 &&
                            ((ie = a > 0 ? "h" : "v"), (j = i));
                    }
                }
            },
            Et = function () {
                if (j) {
                    var e = j.length;
                    if (0 !== e)
                        if (
                            (Ze(Je, j[0]),
                            (et.x = Je.x - tt.x),
                            (et.y = Je.y - tt.y),
                            J && e > 1)
                        ) {
                            if (
                                ((tt.x = Je.x),
                                (tt.y = Je.y),
                                !et.x &&
                                    !et.y &&
                                    (function (e, t) {
                                        return e.x === t.x && e.y === t.y;
                                    })(j[1], Qe))
                            )
                                return;
                            Ze(Qe, j[1]),
                                V || ((V = !0), Te("zoomGestureStarted"));
                            var t = pt(Je, Qe),
                                n = Zt(t);
                            n >
                                a.currItem.initialZoomLevel +
                                    a.currItem.initialZoomLevel / 15 &&
                                (le = !0);
                            var i = 1,
                                o = Ne(),
                                l = Ue();
                            if (n < o)
                                if (
                                    r.pinchToClose &&
                                    !le &&
                                    x <= a.currItem.initialZoomLevel
                                ) {
                                    var s = 1 - (o - n) / (o / 1.2);
                                    Se(s), Te("onPinchClose", s), (ae = !0);
                                } else
                                    (i = (o - n) / o) > 1 && (i = 1),
                                        (n = o - i * (o / 3));
                            else
                                n > l &&
                                    ((i = (n - l) / (6 * o)) > 1 && (i = 1),
                                    (n = l + i * o));
                            i < 0 && (i = 0),
                                wt(Je, Qe, st),
                                (ue.x += st.x - mt.x),
                                (ue.y += st.y - mt.y),
                                Ze(mt, st),
                                (de.x = Pe("x", n)),
                                (de.y = Pe("y", n)),
                                (Y = n > y),
                                (y = n),
                                Ee();
                        } else {
                            if (!ie) return;
                            if (
                                (oe &&
                                    ((oe = !1),
                                    Math.abs(et.x) >= 10 &&
                                        (et.x -= j[0].x - nt.x),
                                    Math.abs(et.y) >= 10 &&
                                        (et.y -= j[0].y - nt.y)),
                                (tt.x = Je.x),
                                (tt.y = Je.y),
                                0 === et.x && 0 === et.y)
                            )
                                return;
                            if (
                                "v" === ie &&
                                r.closeOnVerticalDrag &&
                                "fit" === r.scaleMode &&
                                y === a.currItem.initialZoomLevel
                            ) {
                                (ue.y += et.y), (de.y += et.y);
                                var u = bt();
                                return (
                                    (W = !0),
                                    Te("onVerticalDrag", u),
                                    Se(u),
                                    void Ee()
                                );
                            }
                            !(function (e, t, n) {
                                if (e - U > 50) {
                                    var i = at.length > 2 ? at.shift() : {};
                                    (i.x = t), (i.y = n), at.push(i), (U = e);
                                }
                            })(Me(), Je.x, Je.y),
                                (K = !0),
                                (ee = a.currItem.bounds),
                                Mt("x", et) || (Mt("y", et), Fe(de), Ee());
                        }
                }
            },
            Ot = function (e) {
                if (z.isOldAndroid) {
                    if (B && "mouseup" === e.type) return;
                    e.type.indexOf("touch") > -1 &&
                        (clearTimeout(B),
                        (B = setTimeout(function () {
                            B = 0;
                        }, 600)));
                }
                var t;
                if ((Te("pointerUp"), vt(e, !1) && e.preventDefault(), E)) {
                    var n = o.arraySearch(it, e.pointerId, "id");
                    n > -1 &&
                        ((t = it.splice(n, 1)[0]),
                        navigator.msPointerEnabled
                            ? ((t.type = { 4: "mouse", 2: "touch", 3: "pen" }[
                                  e.pointerType
                              ]),
                              t.type || (t.type = e.pointerType || "mouse"))
                            : (t.type = e.pointerType || "mouse"));
                }
                var i,
                    l = Tt(e),
                    s = l.length;
                if (("mouseup" === e.type && (s = 0), 2 === s))
                    return (j = null), !0;
                1 === s && Ze(nt, l[0]),
                    0 !== s ||
                        ie ||
                        ne ||
                        (t ||
                            ("mouseup" === e.type
                                ? (t = {
                                      x: e.pageX,
                                      y: e.pageY,
                                      type: "mouse",
                                  })
                                : e.changedTouches &&
                                  e.changedTouches[0] &&
                                  (t = {
                                      x: e.changedTouches[0].pageX,
                                      y: e.changedTouches[0].pageY,
                                      type: "touch",
                                  })),
                        Te("touchRelease", e, t));
                var u = -1;
                if (
                    (0 === s &&
                        ((G = !1),
                        o.unbind(window, p, a),
                        ft(),
                        J ? (u = 0) : -1 !== ut && (u = Me() - ut)),
                    (ut = 1 === s ? Me() : -1),
                    (i = -1 !== u && u < 150 ? "zoom" : "swipe"),
                    J &&
                        s < 2 &&
                        ((J = !1),
                        1 === s && (i = "zoomPointerUp"),
                        Te("zoomGestureEnded")),
                    (j = null),
                    K || V || ne || W)
                )
                    if ((qe(), H || (H = kt()), H.calculateSwipeSpeed("x"), W))
                        if (bt() < r.verticalDragRange) a.close();
                        else {
                            var c = de.y,
                                d = re;
                            $e(
                                "verticalDrag",
                                0,
                                1,
                                300,
                                o.easing.cubic.out,
                                function (e) {
                                    (de.y =
                                        (a.currItem.initialPosition.y - c) * e +
                                        c),
                                        Se((1 - d) * e + d),
                                        Ee();
                                }
                            ),
                                Te("onVerticalDrag", 1);
                        }
                    else {
                        if (($ || ne) && 0 === s) {
                            if (Pt(i, H)) return;
                            i = "zoomPointerUp";
                        }
                        ne ||
                            ("swipe" === i
                                ? !$ && y > a.currItem.fitRatio && Rt(H)
                                : Ft());
                    }
            },
            kt = function () {
                var e,
                    t,
                    n = {
                        lastFlickOffset: {},
                        lastFlickDist: {},
                        lastFlickSpeed: {},
                        slowDownRatio: {},
                        slowDownRatioReverse: {},
                        speedDecelerationRatio: {},
                        speedDecelerationRatioAbs: {},
                        distanceOffset: {},
                        backAnimDestination: {},
                        backAnimStarted: {},
                        calculateSwipeSpeed: function (i) {
                            at.length > 1
                                ? ((e = Me() - U + 50),
                                  (t = at[at.length - 2][i]))
                                : ((e = Me() - N), (t = nt[i])),
                                (n.lastFlickOffset[i] = tt[i] - t),
                                (n.lastFlickDist[i] = Math.abs(
                                    n.lastFlickOffset[i]
                                )),
                                n.lastFlickDist[i] > 20
                                    ? (n.lastFlickSpeed[i] =
                                          n.lastFlickOffset[i] / e)
                                    : (n.lastFlickSpeed[i] = 0),
                                Math.abs(n.lastFlickSpeed[i]) < 0.1 &&
                                    (n.lastFlickSpeed[i] = 0),
                                (n.slowDownRatio[i] = 0.95),
                                (n.slowDownRatioReverse[i] =
                                    1 - n.slowDownRatio[i]),
                                (n.speedDecelerationRatio[i] = 1);
                        },
                        calculateOverBoundsAnimOffset: function (e, t) {
                            n.backAnimStarted[e] ||
                                (de[e] > ee.min[e]
                                    ? (n.backAnimDestination[e] = ee.min[e])
                                    : de[e] < ee.max[e] &&
                                      (n.backAnimDestination[e] = ee.max[e]),
                                n.backAnimDestination[e] !== undefined &&
                                    ((n.slowDownRatio[e] = 0.7),
                                    (n.slowDownRatioReverse[e] =
                                        1 - n.slowDownRatio[e]),
                                    n.speedDecelerationRatioAbs[e] < 0.05 &&
                                        ((n.lastFlickSpeed[e] = 0),
                                        (n.backAnimStarted[e] = !0),
                                        $e(
                                            "bounceZoomPan" + e,
                                            de[e],
                                            n.backAnimDestination[e],
                                            t || 300,
                                            o.easing.sine.out,
                                            function (t) {
                                                (de[e] = t), Ee();
                                            }
                                        ))));
                        },
                        calculateAnimOffset: function (e) {
                            n.backAnimStarted[e] ||
                                ((n.speedDecelerationRatio[e] =
                                    n.speedDecelerationRatio[e] *
                                    (n.slowDownRatio[e] +
                                        n.slowDownRatioReverse[e] -
                                        (n.slowDownRatioReverse[e] *
                                            n.timeDiff) /
                                            10)),
                                (n.speedDecelerationRatioAbs[e] = Math.abs(
                                    n.lastFlickSpeed[e] *
                                        n.speedDecelerationRatio[e]
                                )),
                                (n.distanceOffset[e] =
                                    n.lastFlickSpeed[e] *
                                    n.speedDecelerationRatio[e] *
                                    n.timeDiff),
                                (de[e] += n.distanceOffset[e]));
                        },
                        panAnimLoop: function () {
                            if (
                                Ge.zoomPan &&
                                ((Ge.zoomPan.raf = k(n.panAnimLoop)),
                                (n.now = Me()),
                                (n.timeDiff = n.now - n.lastNow),
                                (n.lastNow = n.now),
                                n.calculateAnimOffset("x"),
                                n.calculateAnimOffset("y"),
                                Ee(),
                                n.calculateOverBoundsAnimOffset("x"),
                                n.calculateOverBoundsAnimOffset("y"),
                                n.speedDecelerationRatioAbs.x < 0.05 &&
                                    n.speedDecelerationRatioAbs.y < 0.05)
                            )
                                return (
                                    (de.x = Math.round(de.x)),
                                    (de.y = Math.round(de.y)),
                                    Ee(),
                                    void Ve("zoomPan")
                                );
                        },
                    };
                return n;
            },
            Rt = function (e) {
                if (
                    (e.calculateSwipeSpeed("y"),
                    (ee = a.currItem.bounds),
                    (e.backAnimDestination = {}),
                    (e.backAnimStarted = {}),
                    Math.abs(e.lastFlickSpeed.x) <= 0.05 &&
                        Math.abs(e.lastFlickSpeed.y) <= 0.05)
                )
                    return (
                        (e.speedDecelerationRatioAbs.x =
                            e.speedDecelerationRatioAbs.y =
                                0),
                        e.calculateOverBoundsAnimOffset("x"),
                        e.calculateOverBoundsAnimOffset("y"),
                        !0
                    );
                Ke("zoomPan"), (e.lastNow = Me()), e.panAnimLoop();
            },
            Pt = function (e, t) {
                var n, i, l;
                if ((ne || (lt = c), "swipe" === e)) {
                    var s = tt.x - nt.x,
                        u = t.lastFlickDist.x < 10;
                    s > 30 && (u || t.lastFlickOffset.x > 20)
                        ? (i = -1)
                        : s < -30 &&
                          (u || t.lastFlickOffset.x < -20) &&
                          (i = 1);
                }
                i &&
                    ((c += i) < 0
                        ? ((c = r.loop ? Ht() - 1 : 0), (l = !0))
                        : c >= Ht() && ((c = r.loop ? 0 : Ht() - 1), (l = !0)),
                    (l && !r.loop) || ((ye += i), (pe -= i), (n = !0)));
                var d,
                    m = he.x * pe,
                    p = Math.abs(m - ct.x);
                return (
                    n || m > ct.x == t.lastFlickSpeed.x > 0
                        ? ((d =
                              Math.abs(t.lastFlickSpeed.x) > 0
                                  ? p / Math.abs(t.lastFlickSpeed.x)
                                  : 333),
                          (d = Math.min(d, 400)),
                          (d = Math.max(d, 250)))
                        : (d = 333),
                    lt === c && (n = !1),
                    (ne = !0),
                    Te("mainScrollAnimStart"),
                    $e(
                        "mainScroll",
                        ct.x,
                        m,
                        d,
                        o.easing.cubic.out,
                        Re,
                        function () {
                            qe(),
                                (ne = !1),
                                (lt = -1),
                                (n || lt !== c) && a.updateCurrItem(),
                                Te("mainScrollAnimComplete");
                        }
                    ),
                    n && a.updateCurrItem(!0),
                    n
                );
            },
            Zt = function (e) {
                return (1 / Q) * e * x;
            },
            Ft = function () {
                var e = y,
                    t = Ne(),
                    n = Ue();
                y < t ? (e = t) : y > n && (e = n);
                var i,
                    r = re;
                return ae && !Y && !le && y < t
                    ? (a.close(), !0)
                    : (ae &&
                          (i = function (e) {
                              Se((1 - r) * e + r);
                          }),
                      a.zoomTo(e, 0, 200, o.easing.cubic.out, i),
                      !0);
            };
        be("Gestures", {
            publicMethods: {
                initGestures: function () {
                    var e = function (e, t, n, i, o) {
                        (D = e + t),
                            (T = e + n),
                            (M = e + i),
                            (S = o ? e + o : "");
                    };
                    (E = z.pointerEvent) && z.touch && (z.touch = !1),
                        E
                            ? navigator.msPointerEnabled
                                ? e("MSPointer", "Down", "Move", "Up", "Cancel")
                                : e("pointer", "down", "move", "up", "cancel")
                            : z.touch
                            ? (e("touch", "start", "move", "end", "cancel"),
                              (O = !0))
                            : e("mouse", "down", "move", "up"),
                        (p = T + " " + M + " " + S),
                        (f = D),
                        E &&
                            !O &&
                            (O =
                                navigator.maxTouchPoints > 1 ||
                                navigator.msMaxTouchPoints > 1),
                        (a.likelyTouchDevice = O),
                        (h[D] = St),
                        (h[T] = At),
                        (h[M] = Ot),
                        S && (h[S] = h[M]),
                        z.touch &&
                            ((f += " mousedown"),
                            (p += " mousemove mouseup"),
                            (h.mousedown = h[D]),
                            (h.mousemove = h[T]),
                            (h.mouseup = h[M])),
                        O || (r.allowPanToNext = !1);
                },
            },
        });
        var Lt,
            zt,
            _t,
            Nt,
            Ut,
            Ht,
            Yt = function (t, n, i, l) {
                var s;
                Lt && clearTimeout(Lt),
                    (Nt = !0),
                    (_t = !0),
                    t.initialLayout
                        ? ((s = t.initialLayout), (t.initialLayout = null))
                        : (s = r.getThumbBoundsFn && r.getThumbBoundsFn(c));
                var d,
                    m,
                    p = i ? r.hideAnimationDuration : r.showAnimationDuration,
                    f = function () {
                        Ve("initialZoom"),
                            i
                                ? (a.template.removeAttribute("style"),
                                  a.bg.removeAttribute("style"))
                                : (Se(1),
                                  n && (n.style.display = "block"),
                                  o.addClass(e, "pswp--animated-in"),
                                  Te("initialZoom" + (i ? "OutEnd" : "InEnd"))),
                            l && l(),
                            (Nt = !1);
                    };
                if (!p || !s || s.x === undefined)
                    return (
                        Te("initialZoom" + (i ? "Out" : "In")),
                        (y = t.initialZoomLevel),
                        Ze(de, t.initialPosition),
                        Ee(),
                        (e.style.opacity = i ? 0 : 1),
                        Se(1),
                        void (p
                            ? setTimeout(function () {
                                  f();
                              }, p)
                            : f())
                    );
                (d = u),
                    (m =
                        !a.currItem.src ||
                        a.currItem.loadError ||
                        r.showHideOpacity),
                    t.miniImg &&
                        (t.miniImg.style.webkitBackfaceVisibility = "hidden"),
                    i ||
                        ((y = s.w / t.w),
                        (de.x = s.x),
                        (de.y = s.y - Z),
                        (a[m ? "template" : "bg"].style.opacity = 0.001),
                        Ee()),
                    Ke("initialZoom"),
                    i && !d && o.removeClass(e, "pswp--animated-in"),
                    m &&
                        (i
                            ? o[(d ? "remove" : "add") + "Class"](
                                  e,
                                  "pswp--animate_opacity"
                              )
                            : setTimeout(function () {
                                  o.addClass(e, "pswp--animate_opacity");
                              }, 30)),
                    (Lt = setTimeout(
                        function () {
                            if ((Te("initialZoom" + (i ? "Out" : "In")), i)) {
                                var n = s.w / t.w,
                                    a = { x: de.x, y: de.y },
                                    r = y,
                                    l = re,
                                    u = function (t) {
                                        1 === t
                                            ? ((y = n),
                                              (de.x = s.x),
                                              (de.y = s.y - L))
                                            : ((y = (n - r) * t + r),
                                              (de.x = (s.x - a.x) * t + a.x),
                                              (de.y =
                                                  (s.y - L - a.y) * t + a.y)),
                                            Ee(),
                                            m
                                                ? (e.style.opacity = 1 - t)
                                                : Se(l - t * l);
                                    };
                                d
                                    ? $e(
                                          "initialZoom",
                                          0,
                                          1,
                                          p,
                                          o.easing.cubic.out,
                                          u,
                                          f
                                      )
                                    : (u(1), (Lt = setTimeout(f, p + 20)));
                            } else
                                (y = t.initialZoomLevel),
                                    Ze(de, t.initialPosition),
                                    Ee(),
                                    Se(1),
                                    m ? (e.style.opacity = 1) : Se(1),
                                    (Lt = setTimeout(f, p + 20));
                        },
                        i ? 25 : 90
                    ));
            },
            Wt = {},
            Bt = [],
            Gt = {
                index: 0,
                errorMsg:
                    '<div class="pswp__error-msg"><a href="%url%" target="_blank">The image</a> could not be loaded.</div>',
                forceProgressiveLoading: !1,
                preload: [1, 1],
                getNumItemsFn: function () {
                    return zt.length;
                },
            },
            Xt = function (e, t, n) {
                if (e.src && !e.loadError) {
                    var i = !n;
                    if (
                        (i &&
                            (e.vGap || (e.vGap = { top: 0, bottom: 0 }),
                            Te("parseVerticalMargin", e)),
                        (Wt.x = t.x),
                        (Wt.y = t.y - e.vGap.top - e.vGap.bottom),
                        i)
                    ) {
                        var o = Wt.x / e.w,
                            a = Wt.y / e.h;
                        e.fitRatio = o < a ? o : a;
                        var l = r.scaleMode;
                        "orig" === l
                            ? (n = 1)
                            : "fit" === l && (n = e.fitRatio),
                            n > 1 && (n = 1),
                            (e.initialZoomLevel = n),
                            e.bounds ||
                                (e.bounds = {
                                    center: { x: 0, y: 0 },
                                    max: { x: 0, y: 0 },
                                    min: { x: 0, y: 0 },
                                });
                    }
                    if (!n) return;
                    return (
                        (function (e, t, n) {
                            var i = e.bounds;
                            (i.center.x = Math.round((Wt.x - t) / 2)),
                                (i.center.y =
                                    Math.round((Wt.y - n) / 2) + e.vGap.top),
                                (i.max.x =
                                    t > Wt.x
                                        ? Math.round(Wt.x - t)
                                        : i.center.x),
                                (i.max.y =
                                    n > Wt.y
                                        ? Math.round(Wt.y - n) + e.vGap.top
                                        : i.center.y),
                                (i.min.x = t > Wt.x ? 0 : i.center.x),
                                (i.min.y = n > Wt.y ? e.vGap.top : i.center.y);
                        })(e, e.w * n, e.h * n),
                        i &&
                            n === e.initialZoomLevel &&
                            (e.initialPosition = e.bounds.center),
                        e.bounds
                    );
                }
                return (
                    (e.w = e.h = 0),
                    (e.initialZoomLevel = e.fitRatio = 1),
                    (e.bounds = {
                        center: { x: 0, y: 0 },
                        max: { x: 0, y: 0 },
                        min: { x: 0, y: 0 },
                    }),
                    (e.initialPosition = e.bounds.center),
                    e.bounds
                );
            },
            Vt = function (e, t, n, i, o, r) {
                t.loadError ||
                    (i &&
                        ((t.imageAppended = !0),
                        $t(t, i, t === a.currItem && we),
                        n.appendChild(i),
                        r &&
                            setTimeout(function () {
                                t &&
                                    t.loaded &&
                                    t.placeholder &&
                                    ((t.placeholder.style.display = "none"),
                                    (t.placeholder = null));
                            }, 500)));
            },
            Kt = function (e) {
                (e.loading = !0), (e.loaded = !1);
                var t = (e.img = o.createEl("pswp__img", "img")),
                    n = function () {
                        (e.loading = !1),
                            (e.loaded = !0),
                            e.loadComplete ? e.loadComplete(e) : (e.img = null),
                            (t.onload = t.onerror = null),
                            (t = null);
                    };
                return (
                    (t.onload = n),
                    (t.onerror = function () {
                        (e.loadError = !0), n();
                    }),
                    (t.src = e.src),
                    (t.alt = e.alt || ""),
                    t
                );
            },
            qt = function (e, t) {
                if (e.src && e.loadError && e.container)
                    return (
                        t && (e.container.innerHTML = ""),
                        (e.container.innerHTML = r.errorMsg.replace(
                            "%url%",
                            e.src
                        )),
                        !0
                    );
            },
            $t = function (e, t, n) {
                if (e.src) {
                    t || (t = e.container.lastChild);
                    var i = n ? e.w : Math.round(e.w * e.fitRatio),
                        o = n ? e.h : Math.round(e.h * e.fitRatio);
                    e.placeholder &&
                        !e.loaded &&
                        ((e.placeholder.style.width = i + "px"),
                        (e.placeholder.style.height = o + "px")),
                        (t.style.width = i + "px"),
                        (t.style.height = o + "px");
                }
            },
            jt = function () {
                if (Bt.length) {
                    for (var e, t = 0; t < Bt.length; t++)
                        (e = Bt[t]).holder.index === e.index &&
                            Vt(
                                e.index,
                                e.item,
                                e.baseDiv,
                                e.img,
                                0,
                                e.clearPlaceholder
                            );
                    Bt = [];
                }
            };
        be("Controller", {
            publicMethods: {
                lazyLoadItem: function (e) {
                    e = Ie(e);
                    var t = Ut(e);
                    t &&
                        ((!t.loaded && !t.loading) || b) &&
                        (Te("gettingData", e, t), t.src && Kt(t));
                },
                initController: function () {
                    o.extend(r, Gt, !0),
                        (a.items = zt = n),
                        (Ut = a.getItemAt),
                        (Ht = r.getNumItemsFn),
                        r.loop,
                        Ht() < 3 && (r.loop = !1),
                        De("beforeChange", function (e) {
                            var t,
                                n = r.preload,
                                i = null === e || e >= 0,
                                o = Math.min(n[0], Ht()),
                                l = Math.min(n[1], Ht());
                            for (t = 1; t <= (i ? l : o); t++)
                                a.lazyLoadItem(c + t);
                            for (t = 1; t <= (i ? o : l); t++)
                                a.lazyLoadItem(c - t);
                        }),
                        De("initialLayout", function () {
                            a.currItem.initialLayout =
                                r.getThumbBoundsFn && r.getThumbBoundsFn(c);
                        }),
                        De("mainScrollAnimComplete", jt),
                        De("initialZoomInEnd", jt),
                        De("destroy", function () {
                            for (var e, t = 0; t < zt.length; t++)
                                (e = zt[t]).container && (e.container = null),
                                    e.placeholder && (e.placeholder = null),
                                    e.img && (e.img = null),
                                    e.preloader && (e.preloader = null),
                                    e.loadError &&
                                        (e.loaded = e.loadError = !1);
                            Bt = null;
                        });
                },
                getItemAt: function (e) {
                    return e >= 0 && zt[e] !== undefined && zt[e];
                },
                allowProgressiveImg: function () {
                    return (
                        r.forceProgressiveLoading ||
                        !O ||
                        r.mouseUsed ||
                        screen.width > 1200
                    );
                },
                setContent: function (e, t) {
                    r.loop && (t = Ie(t));
                    var n = a.getItemAt(e.index);
                    n && (n.container = null);
                    var i,
                        s = a.getItemAt(t);
                    if (s) {
                        Te("gettingData", t, s), (e.index = t), (e.item = s);
                        var u = (s.container = o.createEl("pswp__zoom-wrap"));
                        if (
                            (!s.src &&
                                s.html &&
                                (s.html.tagName
                                    ? u.appendChild(s.html)
                                    : (u.innerHTML = s.html)),
                            qt(s),
                            Xt(s, me),
                            !s.src || s.loadError || s.loaded)
                        )
                            s.src &&
                                !s.loadError &&
                                (((i = o.createEl(
                                    "pswp__img",
                                    "img"
                                )).style.opacity = 1),
                                (i.src = s.src),
                                $t(s, i),
                                Vt(0, s, u, i));
                        else {
                            if (
                                ((s.loadComplete = function (n) {
                                    if (l) {
                                        if (e && e.index === t) {
                                            if (qt(n, !0))
                                                return (
                                                    (n.loadComplete = n.img =
                                                        null),
                                                    Xt(n, me),
                                                    Oe(n),
                                                    void (
                                                        e.index === c &&
                                                        a.updateCurrZoomItem()
                                                    )
                                                );
                                            n.imageAppended
                                                ? !Nt &&
                                                  n.placeholder &&
                                                  ((n.placeholder.style.display =
                                                      "none"),
                                                  (n.placeholder = null))
                                                : z.transform && (ne || Nt)
                                                ? Bt.push({
                                                      item: n,
                                                      baseDiv: u,
                                                      img: n.img,
                                                      index: t,
                                                      holder: e,
                                                      clearPlaceholder: !0,
                                                  })
                                                : Vt(0, n, u, n.img, 0, !0);
                                        }
                                        (n.loadComplete = null),
                                            (n.img = null),
                                            Te("imageLoadComplete", t, n);
                                    }
                                }),
                                o.features.transform)
                            ) {
                                var d = "pswp__img pswp__img--placeholder";
                                d += s.msrc
                                    ? ""
                                    : " pswp__img--placeholder--blank";
                                var m = o.createEl(d, s.msrc ? "img" : "");
                                s.msrc && (m.src = s.msrc),
                                    $t(s, m),
                                    u.appendChild(m),
                                    (s.placeholder = m);
                            }
                            s.loading || Kt(s),
                                a.allowProgressiveImg() &&
                                    (!_t && z.transform
                                        ? Bt.push({
                                              item: s,
                                              baseDiv: u,
                                              img: s.img,
                                              index: t,
                                              holder: e,
                                          })
                                        : Vt(0, s, u, s.img, 0, !0));
                        }
                        _t || t !== c
                            ? Oe(s)
                            : ((te = u.style), Yt(s, i || s.img)),
                            (e.el.innerHTML = ""),
                            e.el.appendChild(u);
                    } else e.el.innerHTML = "";
                },
                cleanSlide: function (e) {
                    e.img && (e.img.onload = e.img.onerror = null),
                        (e.loaded = e.loading = e.img = e.imageAppended = !1);
                },
            },
        });
        var Jt,
            Qt,
            en = {},
            tn = function (e, t, n) {
                var i = document.createEvent("CustomEvent"),
                    o = {
                        origEvent: e,
                        target: e.target,
                        releasePoint: t,
                        pointerType: n || "touch",
                    };
                i.initCustomEvent("pswpTap", !0, !0, o),
                    e.target.dispatchEvent(i);
            };
        be("Tap", {
            publicMethods: {
                initTap: function () {
                    De("firstTouchStart", a.onTapStart),
                        De("touchRelease", a.onTapRelease),
                        De("destroy", function () {
                            (en = {}), (Jt = null);
                        });
                },
                onTapStart: function (e) {
                    e.length > 1 && (clearTimeout(Jt), (Jt = null));
                },
                onTapRelease: function (e, t) {
                    var n, i;
                    if (
                        t &&
                        !K &&
                        !X &&
                        !Xe &&
                        a.container.contains(e.target)
                    ) {
                        var r = t;
                        if (
                            Jt &&
                            (clearTimeout(Jt),
                            (Jt = null),
                            (n = r),
                            (i = en),
                            Math.abs(n.x - i.x) < 25 &&
                                Math.abs(n.y - i.y) < 25)
                        )
                            return void Te("doubleTap", r);
                        if ("mouse" === t.type) return void tn(e, t, "mouse");
                        if (
                            "BUTTON" === e.target.tagName.toUpperCase() ||
                            o.hasClass(e.target, "pswp__single-tap")
                        )
                            return void tn(e, t);
                        Ze(en, r),
                            (Jt = setTimeout(function () {
                                tn(e, t), (Jt = null);
                            }, 300));
                    }
                },
            },
        }),
            be("DesktopZoom", {
                publicMethods: {
                    initDesktopZoom: function () {
                        F ||
                            (O
                                ? De("mouseUsed", function () {
                                      a.setupDesktopZoom();
                                  })
                                : a.setupDesktopZoom(!0));
                    },
                    setupDesktopZoom: function (t) {
                        Qt = {};
                        var n = "wheel mousewheel DOMMouseScroll";
                        De("bindEvents", function () {
                            o.bind(e, n, a.handleMouseWheel);
                        }),
                            De("unbindEvents", function () {
                                Qt && o.unbind(e, n, a.handleMouseWheel);
                            }),
                            (a.mouseZoomedIn = !1);
                        var i,
                            r = function () {
                                a.mouseZoomedIn &&
                                    (o.removeClass(e, "pswp--zoomed-in"),
                                    (a.mouseZoomedIn = !1)),
                                    y < 1
                                        ? o.addClass(e, "pswp--zoom-allowed")
                                        : o.removeClass(
                                              e,
                                              "pswp--zoom-allowed"
                                          ),
                                    l();
                            },
                            l = function () {
                                i &&
                                    (o.removeClass(e, "pswp--dragging"),
                                    (i = !1));
                            };
                        De("resize", r),
                            De("afterChange", r),
                            De("pointerDown", function () {
                                a.mouseZoomedIn &&
                                    ((i = !0), o.addClass(e, "pswp--dragging"));
                            }),
                            De("pointerUp", l),
                            t || r();
                    },
                    handleMouseWheel: function (e) {
                        if (y <= a.currItem.fitRatio)
                            return (
                                r.modal &&
                                    (!r.closeOnScroll || Xe || G
                                        ? e.preventDefault()
                                        : A &&
                                          Math.abs(e.deltaY) > 2 &&
                                          ((u = !0), a.close())),
                                !0
                            );
                        if ((e.stopPropagation(), (Qt.x = 0), "deltaX" in e))
                            1 === e.deltaMode
                                ? ((Qt.x = 18 * e.deltaX),
                                  (Qt.y = 18 * e.deltaY))
                                : ((Qt.x = e.deltaX), (Qt.y = e.deltaY));
                        else if ("wheelDelta" in e)
                            e.wheelDeltaX && (Qt.x = -0.16 * e.wheelDeltaX),
                                e.wheelDeltaY
                                    ? (Qt.y = -0.16 * e.wheelDeltaY)
                                    : (Qt.y = -0.16 * e.wheelDelta);
                        else {
                            if (!("detail" in e)) return;
                            Qt.y = e.detail;
                        }
                        _e(y, !0);
                        var t = de.x - Qt.x,
                            n = de.y - Qt.y;
                        (r.modal ||
                            (t <= ee.min.x &&
                                t >= ee.max.x &&
                                n <= ee.min.y &&
                                n >= ee.max.y)) &&
                            e.preventDefault(),
                            a.panTo(t, n);
                    },
                    toggleDesktopZoom: function (t) {
                        t = t || { x: me.x / 2 + fe.x, y: me.y / 2 + fe.y };
                        var n = r.getDoubleTapZoom(!0, a.currItem),
                            i = y === n;
                        (a.mouseZoomedIn = !i),
                            a.zoomTo(
                                i ? a.currItem.initialZoomLevel : n,
                                t,
                                333
                            ),
                            o[(i ? "remove" : "add") + "Class"](
                                e,
                                "pswp--zoomed-in"
                            );
                    },
                },
            });
        var nn,
            on,
            an,
            rn,
            ln,
            sn,
            un,
            cn,
            dn,
            mn,
            pn,
            fn,
            hn = { history: !0, galleryUID: 1 },
            yn = function () {
                return pn.hash.substring(1);
            },
            xn = function () {
                nn && clearTimeout(nn), an && clearTimeout(an);
            },
            vn = function () {
                var e = yn(),
                    t = {};
                if (e.length < 5) return t;
                var n,
                    i = e.split("&");
                for (n = 0; n < i.length; n++)
                    if (i[n]) {
                        var o = i[n].split("=");
                        o.length < 2 || (t[o[0]] = o[1]);
                    }
                if (r.galleryPIDs) {
                    var a = t.pid;
                    for (t.pid = 0, n = 0; n < zt.length; n++)
                        if (zt[n].pid === a) {
                            t.pid = n;
                            break;
                        }
                } else t.pid = parseInt(t.pid, 10) - 1;
                return t.pid < 0 && (t.pid = 0), t;
            },
            gn = function () {
                if ((an && clearTimeout(an), Xe || G)) an = setTimeout(gn, 500);
                else {
                    rn ? clearTimeout(on) : (rn = !0);
                    var e = c + 1,
                        t = Ut(c);
                    t.hasOwnProperty("pid") && (e = t.pid);
                    var n = un + "&gid=" + r.galleryUID + "&pid=" + e;
                    cn || (-1 === pn.hash.indexOf(n) && (mn = !0));
                    var i = pn.href.split("#")[0] + "#" + n;
                    fn
                        ? "#" + n !== window.location.hash &&
                          history[cn ? "replaceState" : "pushState"](
                              "",
                              document.title,
                              i
                          )
                        : cn
                        ? pn.replace(i)
                        : (pn.hash = n),
                        (cn = !0),
                        (on = setTimeout(function () {
                            rn = !1;
                        }, 60));
                }
            };
        be("History", {
            publicMethods: {
                initHistory: function () {
                    if ((o.extend(r, hn, !0), r.history)) {
                        (pn = window.location),
                            (mn = !1),
                            (dn = !1),
                            (cn = !1),
                            (un = yn()),
                            (fn = "pushState" in history),
                            un.indexOf("gid=") > -1 &&
                                (un = (un = un.split("&gid=")[0]).split(
                                    "?gid="
                                )[0]),
                            De("afterChange", a.updateURL),
                            De("unbindEvents", function () {
                                o.unbind(window, "hashchange", a.onHashChange);
                            });
                        var e = function () {
                            (sn = !0),
                                dn ||
                                    (mn
                                        ? history.back()
                                        : un
                                        ? (pn.hash = un)
                                        : fn
                                        ? history.pushState(
                                              "",
                                              document.title,
                                              pn.pathname + pn.search
                                          )
                                        : (pn.hash = "")),
                                xn();
                        };
                        De("unbindEvents", function () {
                            u && e();
                        }),
                            De("destroy", function () {
                                sn || e();
                            }),
                            De("firstUpdate", function () {
                                c = vn().pid;
                            });
                        var t = un.indexOf("pid=");
                        t > -1 &&
                            "&" === (un = un.substring(0, t)).slice(-1) &&
                            (un = un.slice(0, -1)),
                            setTimeout(function () {
                                l &&
                                    o.bind(
                                        window,
                                        "hashchange",
                                        a.onHashChange
                                    );
                            }, 40);
                    }
                },
                onHashChange: function () {
                    if (yn() === un) return (dn = !0), void a.close();
                    rn || ((ln = !0), a.goTo(vn().pid), (ln = !1));
                },
                updateURL: function () {
                    xn(), ln || (cn ? (nn = setTimeout(gn, 800)) : gn());
                },
            },
        }),
            o.extend(a, je);
    };
});
