jQuery(function (e) {
    if ("undefined" == typeof wc_address_i18n_params) return !1;
    var a = wc_address_i18n_params.locale.replace(/&quot;/g, '"'),
        i = JSON.parse(a);
    function d(e, a) {
        a
            ? (e.find("label .optional").remove(),
              e.addClass("validate-required"),
              0 === e.find("label .required").length &&
                  e
                      .find("label")
                      .append(
                          '&nbsp;<abbr class="required" title="' +
                              wc_address_i18n_params.i18n_required_text +
                              '">*</abbr>'
                      ))
            : (e.find("label .required").remove(),
              e.removeClass(
                  "validate-required woocommerce-invalid woocommerce-invalid-required-field"
              ),
              0 === e.find("label .optional").length &&
                  e
                      .find("label")
                      .append(
                          '&nbsp;<span class="optional">(' +
                              wc_address_i18n_params.i18n_optional_text +
                              ")</span>"
                      ));
    }
    e(document.body)
        .on("country_to_state_changing", function (a, r, t) {
            var l,
                n = t;
            l = "undefined" != typeof i[r] ? i[r] : i["default"];
            var o = n.find("#billing_postcode_field, #shipping_postcode_field"),
                s = n.find("#billing_city_field, #shipping_city_field"),
                p = n.find("#billing_state_field, #shipping_state_field");
            o.attr("data-o_class") ||
                (o.attr("data-o_class", o.attr("class")),
                s.attr("data-o_class", s.attr("class")),
                p.attr("data-o_class", p.attr("class")));
            var f = JSON.parse(wc_address_i18n_params.locale_fields);
            e.each(f, function (a, r) {
                var t = n.find(r),
                    o = e.extend(!0, {}, i["default"][a], l[a]);
                "undefined" != typeof o.label && t.find("label").html(o.label),
                    "undefined" != typeof o.placeholder &&
                        (t.find(":input").attr("placeholder", o.placeholder),
                        t
                            .find(":input")
                            .attr("data-placeholder", o.placeholder),
                        t
                            .find(".select2-selection__placeholder")
                            .text(o.placeholder)),
                    "undefined" != typeof o.placeholder ||
                        "undefined" == typeof o.label ||
                        t.find("label").length ||
                        (t.find(":input").attr("placeholder", o.label),
                        t.find(":input").attr("data-placeholder", o.label),
                        t
                            .find(".select2-selection__placeholder")
                            .text(o.label)),
                    "undefined" != typeof o.required
                        ? d(t, o.required)
                        : d(t, !1),
                    "undefined" != typeof o.priority &&
                        t.data("priority", o.priority),
                    "state" !== a &&
                        ("undefined" != typeof o.hidden && !0 === o.hidden
                            ? t.hide().find(":input").val("")
                            : t.show()),
                    Array.isArray(o["class"]) &&
                        (t.removeClass(
                            "form-row-first form-row-last form-row-wide"
                        ),
                        t.addClass(o["class"].join(" ")));
            }),
                e(
                    ".woocommerce-billing-fields__field-wrapper,.woocommerce-shipping-fields__field-wrapper,.woocommerce-address-fields__field-wrapper,.woocommerce-additional-fields__field-wrapper .woocommerce-account-fields"
                ).each(function (a, i) {
                    var d = e(i).find(".form-row"),
                        r = d.first().parent(),
                        t = 0;
                    d.each(function () {
                        e(this).data("priority") ||
                            e(this).data("priority", t + 1),
                            (t = e(this).data("priority"));
                    }),
                        d.sort(function (a, i) {
                            var d = parseInt(e(a).data("priority"), 10),
                                r = parseInt(e(i).data("priority"), 10);
                            return d > r ? 1 : d < r ? -1 : 0;
                        }),
                        d.detach().appendTo(r);
                });
        })
        .trigger("wc_address_i18n_ready");
});
