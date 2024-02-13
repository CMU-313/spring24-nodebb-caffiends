'use strict';

define('classLabelSelector', [
    'bootbox', 'hooks',
], function (bootbox, hooks) {
    const classLabelSelector = {};

    // init: (el: object, options: object) => void
    classLabelSelector.init = function (el, options) {
        console.assert(typeof el === 'object');
        console.assert(typeof options === 'object');
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

        // selectClassLabel: (name: string) => void
        selector.selectClassLabel = function (name) {
            console.assert(typeof name === 'string');
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

        // getSelectedClassLabel: void => object
        selector.getSelectedClassLabel = function () {
            console.assert(typeof selector.selectedClassLabel === 'object');
            return selector.selectedClassLabel;
        };
        return selector;
    };

    // modal: (options: object) => void
    classLabelSelector.modal = function (options) {
        console.assert(typeof options === 'object');
        options = options || {};
        options.onSelect = options.onSelect || function () {};
        options.onSubmit = options.onSubmit || function () {};
        //app.parseAndTranslate();
    };

    return classLabelSelector;
});