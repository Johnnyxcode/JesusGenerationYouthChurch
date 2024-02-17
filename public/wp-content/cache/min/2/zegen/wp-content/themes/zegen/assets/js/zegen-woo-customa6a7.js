(function ($) {
    "use strict";
    $(document).ready(function () {
        if ($(document).find(".mini-cart-item").length) {
            $(document).on("click", ".remove-cart-item", function () {
                var cur_ele = $(this);
                cur_ele.addClass("loading");
                var product_id = cur_ele.attr("data-product_id");
                $.ajax({
                    type: "post",
                    dataType: "json",
                    url: zegen_ajax_var.admin_ajax_url,
                    data: {
                        action: "zegen_product_remove",
                        nonce: zegen_ajax_var.remove_from_cart,
                        product_id: product_id,
                    },
                    success: function (data) {
                        if (data.status == 1) {
                            if (data.mini_cart) {
                                $(document)
                                    .find(
                                        '.mini-cart-dropdown li.cart-item[data-product-id="' +
                                            product_id +
                                            '"]'
                                    )
                                    .fadeOut(350, function () {
                                        $(document)
                                            .find(
                                                ".mini-cart-dropdown ul.cart-dropdown-menu"
                                            )
                                            .html(data.mini_cart);
                                        $(document)
                                            .find(
                                                ".mini-cart-dropdown .woo-icon-count"
                                            )
                                            .text(data.cart_count);
                                    });
                            }
                            $(document.body).trigger("wc_fragment_refresh");
                        }
                        cur_ele.removeClass("loading");
                    },
                    error: function (xhr, status, error) {
                        cur_ele.removeClass("loading");
                    },
                });
                return !1;
            });
            var mini_cart_parent = $(".mini-cart-dropdown a.mini-cart-item");
            $(mini_cart_parent).one("DOMSubtreeModified", function () {
                if ($(".mobile-header-items").find(".cart-bar-toggle").length) {
                    setTimeout(function () {
                        var mobile_cart_txt = mini_cart_parent.html();
                        $(".mobile-header-items")
                            .find(".cart-bar-toggle")
                            .html(mobile_cart_txt);
                    }, 100);
                }
            });
        }
        $(document).on("click", "a.zegen_ajax_add_to_cart", function (event) {
            if ($("body.page-template-zegen-wishlist").length) {
                $(this)
                    .parents("tr")
                    .find("a.zegen-wishlist-remove")
                    .trigger("click");
            }
            var cur_ele = $(this);
            cur_ele.addClass("loading");
            var product_id = $(this).attr("data-product_id");
            var main_parent = $(this).parents("li.menu-item.dropdown");
            $.ajax({
                type: "post",
                dataType: "json",
                url: zegen_ajax_var.admin_ajax_url,
                data: {
                    action: "zegen_add_to_cart",
                    product_id: product_id,
                    nonce: zegen_ajax_var.add_to_cart,
                },
                success: function (data) {
                    cur_ele.removeClass("loading");
                    if (data.status == 1) {
                        if (data.mini_cart) {
                            $(document)
                                .find(
                                    ".mini-cart-dropdown ul.cart-dropdown-menu"
                                )
                                .html(data.mini_cart);
                            $(document)
                                .find(".mini-cart-item .woo-icon-count")
                                .text(data.cart_count);
                        }
                        $(document.body).trigger("wc_fragment_refresh");
                    }
                },
                error: function (xhr, status, error) {
                    cur_ele.removeClass("loading");
                },
            });
            return !1;
        });
    });
})(jQuery);
