!(function (s) {
    "use strict";
    var r = {
        init: function () {
            s(document.body).on(
                "keyup change",
                "form.register #reg_password, form.checkout #account_password, form.edit-account #password_1, form.lost_reset_password #password_1",
                this.strengthMeter
            ),
                s("form.checkout #createaccount").trigger("change");
        },
        strengthMeter: function () {
            var e,
                t = s(
                    "form.register, form.checkout, form.edit-account, form.lost_reset_password"
                ),
                o = s('button[type="submit"]', t),
                a = s("#reg_password, #account_password, #password_1", t),
                d = a.val(),
                n = !t.is("form.checkout");
            r.includeMeter(t, a),
                (e = r.checkPasswordStrength(t, a)),
                wc_password_strength_meter_params.stop_checkout && (n = !0),
                d.length > 0 &&
                e < wc_password_strength_meter_params.min_password_strength &&
                -1 !== e &&
                n
                    ? o.attr("disabled", "disabled").addClass("disabled")
                    : o.prop("disabled", !1).removeClass("disabled");
        },
        includeMeter: function (r, e) {
            var t = r.find(".woocommerce-password-strength");
            "" === e.val()
                ? (t.hide(),
                  s(document.body).trigger("wc-password-strength-hide"))
                : 0 === t.length
                ? (e.after(
                      '<div class="woocommerce-password-strength" aria-live="polite"></div>'
                  ),
                  s(document.body).trigger("wc-password-strength-added"))
                : (t.show(),
                  s(document.body).trigger("wc-password-strength-show"));
        },
        checkPasswordStrength: function (s, r) {
            var e = s.find(".woocommerce-password-strength"),
                t = s.find(".woocommerce-password-hint"),
                o =
                    '<small class="woocommerce-password-hint">' +
                    wc_password_strength_meter_params.i18n_password_hint +
                    "</small>",
                a = wp.passwordStrength.meter(
                    r.val(),
                    wp.passwordStrength.userInputDisallowedList()
                ),
                d = "";
            if (
                (e.removeClass("short bad good strong"),
                t.remove(),
                e.is(":hidden"))
            )
                return a;
            switch (
                (a < wc_password_strength_meter_params.min_password_strength &&
                    (d =
                        " - " +
                        wc_password_strength_meter_params.i18n_password_error),
                a)
            ) {
                case 0:
                    e.addClass("short").html(pwsL10n.short + d), e.after(o);
                    break;
                case 1:
                case 2:
                    e.addClass("bad").html(pwsL10n.bad + d), e.after(o);
                    break;
                case 3:
                    e.addClass("good").html(pwsL10n.good + d);
                    break;
                case 4:
                    e.addClass("strong").html(pwsL10n.strong + d);
                    break;
                case 5:
                    e.addClass("short").html(pwsL10n.mismatch);
            }
            return a;
        },
    };
    r.init();
})(jQuery);
