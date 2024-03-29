"use strict";

define("categorySelector", ["categorySearch", "bootbox", "hooks"], function (
    categorySearch,
    bootbox,
    hooks,
) {
    const categorySelector = {};

    // init: (el: object, options: object) => void
    categorySelector.init = function (el, options) {
        console.assert(typeof el === "object");
        console.assert(typeof options === "object");
        if (!el || !el.length) {
            return;
        }
        options = options || {};
        const onSelect = options.onSelect || function () {};
        const classType = options.class || "";
        var selector = {};
        if (classType === "") {
            options.states = options.states || [
                "watching",
                "notwatching",
                "ignoring",
            ];
            options.template = "partials/category-selector";
            hooks.fire("action:category.selector.options", {
                el: el,
                options: options,
            });

            categorySearch.init(el, options);

            selector = {
                el: el,
                selectedCategory: null,
            };
            el.on("click", "[data-cid]", function () {
                const categoryEl = $(this);
                if (categoryEl.hasClass("disabled")) {
                    return false;
                }

                selector.selectCategory(categoryEl.attr("data-cid"));
                onSelect(selector.selectedCategory);
            });
            const defaultSelectHtml = selector.el
                .find('[component="category-selector-selected"]')
                .html();
            selector.selectCategory = function (cid) {
                const categoryEl = selector.el.find('[data-cid="' + cid + '"]');
                selector.selectedCategory = {
                    cid: cid,
                    name: categoryEl.attr("data-name"),
                };
                if (categoryEl.length) {
                    selector.el
                        .find('[component="category-selector-selected"]')
                        .html(
                            categoryEl
                                .find('[component="category-markup"]')
                                .html(),
                        );
                } else {
                    selector.el
                        .find('[component="category-selector-selected"]')
                        .html(defaultSelectHtml);
                }
            };
        } else if (classType === "classLabel") {
            selector = {
                el: el,
                selectedClassLabel: null,
            };
            el.on("click", "[data-name]", function () {
                const classLabelEl = $(this);
                // if (classLabelEl.hasClass('disabled')) {
                //     return false;
                // }
                selector.selectClassLabel(classLabelEl.attr("data-name"));
                onSelect(selector.selectedClassLabel);
            });
            const defaultSelectHtml = selector.el
                .find('[component="classLabel-selector-selected"]')
                .html();
            // selectClassLabel: (name: string) => void
            selector.selectClassLabel = function (name) {
                console.assert(typeof name === "string");
                const classLabelEl = selector.el.find(
                    '[data-name="' + name + '"]',
                );
                selector.selectedClassLabel = {
                    name: name,
                };
                if (classLabelEl.length) {
                    selector.el
                        .find('[component="classLabel-selector-selected"]')
                        .html(
                            classLabelEl
                                .find('[component="classLabel-markup"]')
                                .html(),
                        );
                } else {
                    selector.el
                        .find('[component="classLabel-selector-selected"]')
                        .html(defaultSelectHtml);
                }
            };
        }
        // getSelectedClassLabel: void => object
        selector.getSelectedClassLabel = function () {
            console.assert(typeof selector.selectedClassLabel === "object");
            return selector.selectedClassLabel;
        };
        selector.getSelectedCategory = function () {
            return selector.selectedCategory;
        };
        selector.getSelectedCid = function () {
            return selector.selectedCategory
                ? selector.selectedCategory.cid
                : 0;
        };
        return selector;
    };

    categorySelector.modal = function (options) {
        options = options || {};
        options.onSelect = options.onSelect || function () {};
        options.onSubmit = options.onSubmit || function () {};
        app.parseAndTranslate(
            "admin/partials/categories/select-category",
            { message: options.message },
            function (html) {
                const modal = bootbox.dialog({
                    title:
                        options.title || "[[modules:composer.select_category]]",
                    message: html,
                    buttons: {
                        save: {
                            label: "[[global:select]]",
                            className: "btn-primary",
                            callback: submit,
                        },
                    },
                });

                var selector = categorySelector.init(
                    modal.find('[component="category-selector"]'),
                    options,
                );
                function submit(ev) {
                    ev.preventDefault();
                    if (selector.selectedCategory) {
                        options.onSubmit(selector.selectedCategory);
                        modal.modal("hide");
                    }
                    return false;
                }
                if (options.openOnLoad) {
                    modal.on("shown.bs.modal", function () {
                        modal.find(".dropdown-toggle").dropdown("toggle");
                    });
                }
                modal.find("form").on("submit", submit);
            },
        );
    };

    return categorySelector;
});
