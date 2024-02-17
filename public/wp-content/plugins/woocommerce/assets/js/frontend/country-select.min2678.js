jQuery(function (t) {
    if ("undefined" == typeof wc_country_select_params) return !1;
    if (t().selectWoo) {
        var e = function () {
            t(
                "select.country_select:visible, select.state_select:visible"
            ).each(function () {
                var e = t(this),
                    n = t.extend(
                        {
                            placeholder:
                                e.attr("data-placeholder") ||
                                e.attr("placeholder") ||
                                "",
                            label: e.attr("data-label") || null,
                            width: "100%",
                        },
                        {
                            language: {
                                errorLoading: function () {
                                    return wc_country_select_params.i18n_searching;
                                },
                                inputTooLong: function (t) {
                                    var e = t.input.length - t.maximum;
                                    return 1 === e
                                        ? wc_country_select_params.i18n_input_too_long_1
                                        : wc_country_select_params.i18n_input_too_long_n.replace(
                                              "%qty%",
                                              e
                                          );
                                },
                                inputTooShort: function (t) {
                                    var e = t.minimum - t.input.length;
                                    return 1 === e
                                        ? wc_country_select_params.i18n_input_too_short_1
                                        : wc_country_select_params.i18n_input_too_short_n.replace(
                                              "%qty%",
                                              e
                                          );
                                },
                                loadingMore: function () {
                                    return wc_country_select_params.i18n_load_more;
                                },
                                maximumSelected: function (t) {
                                    return 1 === t.maximum
                                        ? wc_country_select_params.i18n_selection_too_long_1
                                        : wc_country_select_params.i18n_selection_too_long_n.replace(
                                              "%qty%",
                                              t.maximum
                                          );
                                },
                                noResults: function () {
                                    return wc_country_select_params.i18n_no_matches;
                                },
                                searching: function () {
                                    return wc_country_select_params.i18n_searching;
                                },
                            },
                        }
                    );
                t(this)
                    .on("select2:select", function () {
                        t(this).trigger("focus");
                    })
                    .selectWoo(n);
            });
        };
        e(),
            t(document.body).on("country_to_state_changed", function () {
                e();
            });
    }
    var n = wc_country_select_params.countries.replace(/&quot;/g, '"'),
        o = JSON.parse(n),
        a =
            ".woocommerce-billing-fields,.woocommerce-shipping-fields,.woocommerce-address-fields,.woocommerce-shipping-calculator";
    t(document.body).on(
        "change refresh",
        "select.country_to_state, input.country_to_state",
        function () {
            var e = t(this).closest(a);
            e.length || (e = t(this).closest(".form-row").parent());
            var n,
                c = t(this).val(),
                r = e.find(
                    "#billing_state, #shipping_state, #calc_shipping_state"
                ),
                i = r.closest(".form-row"),
                s = r.attr("name"),
                _ = r.attr("id"),
                l = r.attr("data-input-classes"),
                p = r.val(),
                u = r.attr("placeholder") || r.attr("data-placeholder") || "";
            if (o[c])
                if (t.isEmptyObject(o[c]))
                    (n = t('<input type="hidden" />')
                        .prop("id", _)
                        .prop("name", s)
                        .prop("placeholder", u)
                        .attr("data-input-classes", l)
                        .addClass("hidden " + l)),
                        i.hide().find(".select2-container").remove(),
                        r.replaceWith(n),
                        t(document.body).trigger("country_to_state_changed", [
                            c,
                            e,
                        ]);
                else {
                    var d = o[c],
                        h = t('<option value=""></option>').text(
                            wc_country_select_params.i18n_select_state_text
                        );
                    u || (u = wc_country_select_params.i18n_select_state_text),
                        i.show(),
                        r.is("input") &&
                            ((n = t("<select></select>")
                                .prop("id", _)
                                .prop("name", s)
                                .data("placeholder", u)
                                .attr("data-input-classes", l)
                                .addClass("state_select " + l)),
                            r.replaceWith(n),
                            (r = e.find(
                                "#billing_state, #shipping_state, #calc_shipping_state"
                            ))),
                        r.empty().append(h),
                        t.each(d, function (e) {
                            var n = t("<option></option>")
                                .prop("value", e)
                                .text(d[e]);
                            r.append(n);
                        }),
                        r.val(p).trigger("change"),
                        t(document.body).trigger("country_to_state_changed", [
                            c,
                            e,
                        ]);
                }
            else
                r.is('select, input[type="hidden"]') &&
                    ((n = t('<input type="text" />')
                        .prop("id", _)
                        .prop("name", s)
                        .prop("placeholder", u)
                        .attr("data-input-classes", l)
                        .addClass("input-text  " + l)),
                    i.show().find(".select2-container").remove(),
                    r.replaceWith(n),
                    t(document.body).trigger("country_to_state_changed", [
                        c,
                        e,
                    ]));
            t(document.body).trigger("country_to_state_changing", [c, e]);
        }
    ),
        t(document.body).on("wc_address_i18n_ready", function () {
            t(a).each(function () {
                var e = t(this).find(
                    "#billing_country, #shipping_country, #calc_shipping_country"
                );
                0 !== e.length && 0 !== e.val().length && e.trigger("refresh");
            });
        });
});
