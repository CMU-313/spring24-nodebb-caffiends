'use strict';

define('classLabelSelector', [
    'bootbox', 'hooks',
], function (bootbox, hooks) {
    const classLabelSelector = {};

    classLabelSelector.init = function (el, options) {
        if (!el || el.length) {
            return;
        }
        options = options || {};
        const onSelect = options.onSelect || function () {};
        const selector = {
            el: el,
            selectedClassLabel: null,
        };
        el.on('click', '[data-name]', function () {
            const classLabelEl = $(this);
            // if (classLabelEl.hasClass('disabled')) {
            //     return false;
            // }
            alert("was");
            selector.el.find('[component="classLabel-selector-selected"]').text('fdfdf');
            //selector.selectClassLabel(classLabelEl.attr('data-name'));
            onSelect(selector.selectedClassLabel);
        });
        const defaultSelectHtml = selector.el.find('[component="classLabel-selector-selected"]').html();
        selector.selectClassLabel = function (name) {
            const classLabelEl = selector.el.find('[data-name="' + name + '"]');
            selector.selectedClassLabel = {
                name: name
            };
            
            if (classLabelEl.length) {
                selector.el.find('[component="classLabel-selector-selected"]').html(
                    classLabelEl.find('[component="classLabel-markup"]').html()
                );
            } else {
                selector.el.find('[component="classLabel-selector-selected"]').html(
                    defaultSelectHtml
                );
            }
        };
        selector.getSelectedClassLabel = function () {
            return selector.selectedClassLabel;
        };
        return selector;
    };

    classLabelSelector.modal = function (options) {
        options = options || {};
        options.onSelect = options.onSelect || function () {};
        options.onSubmit = options.onSubmit || function () {};
        //app.parseAndTranslate();
    };

    return classLabelSelector;
});