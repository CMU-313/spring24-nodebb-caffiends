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
            if (categoryEl.hasClass('disabled')) {
                return false;
            }
            selector.selectClassLabel(classLabelEl.attr('data-name'));
            onSelect(selector.selectedClassLabel);
        });
        const defaultSelectHtml = selector.el.find('[component="classLabel-selector-selected"]').html();
        selector.selectClassLabel = function(name) {
            const classLabelEl = selector.el.find('[data-name="' + name + '"]');
            selector.selectedClassLabel = {
                name: name
            };
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
})