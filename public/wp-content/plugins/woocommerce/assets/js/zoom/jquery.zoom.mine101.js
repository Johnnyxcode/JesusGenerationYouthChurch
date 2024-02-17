/*!
	Zoom 1.7.21
	license: MIT
	http://www.jacklmoore.com/zoom
*/
!(function (o) {
    var t = {
        url: !1,
        callback: !1,
        target: !1,
        duration: 120,
        on: "mouseover",
        touch: !0,
        onZoomIn: !1,
        onZoomOut: !1,
        magnify: 1,
    };
    (o.zoom = function (t, e, n, i) {
        var u,
            a,
            c,
            r,
            l,
            m,
            f,
            s = o(t),
            h = s.css("position"),
            d = o(e);
        return (
            (t.style.position = /(absolute|fixed)/.test(h) ? h : "relative"),
            (t.style.overflow = "hidden"),
            (n.style.width = n.style.height = ""),
            o(n)
                .addClass("zoomImg")
                .css({
                    position: "absolute",
                    top: 0,
                    left: 0,
                    opacity: 0,
                    width: n.width * i,
                    height: n.height * i,
                    border: "none",
                    maxWidth: "none",
                    maxHeight: "none",
                })
                .appendTo(t),
            {
                init: function () {
                    (a = s.outerWidth()),
                        (u = s.outerHeight()),
                        e === t
                            ? ((r = a), (c = u))
                            : ((r = d.outerWidth()), (c = d.outerHeight())),
                        (l = (n.width - a) / r),
                        (m = (n.height - u) / c),
                        (f = d.offset());
                },
                move: function (o) {
                    var t = o.pageX - f.left,
                        e = o.pageY - f.top;
                    (e = Math.max(Math.min(e, c), 0)),
                        (t = Math.max(Math.min(t, r), 0)),
                        (n.style.left = t * -l + "px"),
                        (n.style.top = e * -m + "px");
                },
            }
        );
    }),
        (o.fn.zoom = function (e) {
            return this.each(function () {
                var n = o.extend({}, t, e || {}),
                    i = (n.target && o(n.target)[0]) || this,
                    u = this,
                    a = o(u),
                    c = document.createElement("img"),
                    r = o(c),
                    l = "mousemove.zoom",
                    m = !1,
                    f = !1;
                if (!n.url) {
                    var s = u.querySelector("img");
                    if (
                        (s &&
                            ((n.url =
                                s.getAttribute("data-src") ||
                                s.currentSrc ||
                                s.src),
                            (n.alt = s.getAttribute("data-alt") || s.alt)),
                        !n.url)
                    )
                        return;
                }
                a.one(
                    "zoom.destroy",
                    function (o, t) {
                        a.off(".zoom"),
                            (i.style.position = o),
                            (i.style.overflow = t),
                            (c.onload = null),
                            r.remove();
                    }.bind(this, i.style.position, i.style.overflow)
                ),
                    (c.onload = function () {
                        var t = o.zoom(i, u, c, n.magnify);
                        function e(e) {
                            t.init(),
                                t.move(e),
                                r
                                    .stop()
                                    .fadeTo(
                                        o.support.opacity ? n.duration : 0,
                                        1,
                                        "function" == typeof n.onZoomIn &&
                                            n.onZoomIn.call(c)
                                    );
                        }
                        function s() {
                            r.stop().fadeTo(
                                n.duration,
                                0,
                                "function" == typeof n.onZoomOut &&
                                    n.onZoomOut.call(c)
                            );
                        }
                        "grab" === n.on
                            ? a.on("mousedown.zoom", function (n) {
                                  1 === n.which &&
                                      (o(document).one(
                                          "mouseup.zoom",
                                          function () {
                                              s(), o(document).off(l, t.move);
                                          }
                                      ),
                                      e(n),
                                      o(document).on(l, t.move),
                                      n.preventDefault());
                              })
                            : "click" === n.on
                            ? a.on("click.zoom", function (n) {
                                  return m
                                      ? void 0
                                      : ((m = !0),
                                        e(n),
                                        o(document).on(l, t.move),
                                        o(document).one(
                                            "click.zoom",
                                            function () {
                                                s(),
                                                    (m = !1),
                                                    o(document).off(l, t.move);
                                            }
                                        ),
                                        !1);
                              })
                            : "toggle" === n.on
                            ? a.on("click.zoom", function (o) {
                                  m ? s() : e(o), (m = !m);
                              })
                            : "mouseover" === n.on &&
                              (t.init(),
                              a
                                  .on("mouseenter.zoom", e)
                                  .on("mouseleave.zoom", s)
                                  .on(l, t.move)),
                            n.touch &&
                                a
                                    .on("touchstart.zoom", function (o) {
                                        o.preventDefault(),
                                            f
                                                ? ((f = !1), s())
                                                : ((f = !0),
                                                  e(
                                                      o.originalEvent
                                                          .touches[0] ||
                                                          o.originalEvent
                                                              .changedTouches[0]
                                                  ));
                                    })
                                    .on("touchmove.zoom", function (o) {
                                        o.preventDefault(),
                                            t.move(
                                                o.originalEvent.touches[0] ||
                                                    o.originalEvent
                                                        .changedTouches[0]
                                            );
                                    })
                                    .on("touchend.zoom", function (o) {
                                        o.preventDefault(),
                                            f && ((f = !1), s());
                                    }),
                            "function" == typeof n.callback &&
                                n.callback.call(c);
                    }),
                    c.setAttribute("role", "presentation"),
                    (c.alt = n.alt || ""),
                    (c.src = n.url);
            });
        }),
        (o.fn.zoom.defaults = t);
})(window.jQuery);
