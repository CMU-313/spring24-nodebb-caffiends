'use strict';

define('composer/classLabelList', [
    'categorySelector', 'taskbar', 'api',
], function ( categorySelector, taskbar, api) {
    var classLabelList = {};
    var selector;

    classLabelList.init = function (postContainer, postData) {
        var listContainer = postContainer.find('.classLabel-list-container');
        if (!listContainer.length) {
            return;
        }

        postContainer.on('action:composer.resize', function () {
            toggleDropDirection(postContainer);
        });

        //classLabelList.updateTaskbar(postContainer, postData);

        var other = listContainer.find('[component="classLabel-selector"]');
        
        //other.find('[component="classLabel-selector-selected"]').text("asd");
        selector = categorySelector.init(listContainer.find('[component="classLabel-selector"]'), {
            class: 'classLabel',
            onSelect: function (selectedClassLabel) {
                changeClassLabel(postContainer, postData, selectedClassLabel);
            }
        });
        if (!selector) {
            return;
        }
        if (postData.classLabel) {
            selector.selectedClassLabel = {name: postData.classLabel};
        }

        toggleDropDirection(postContainer);
    };

    function toggleDropDirection(postContainer) {
        postContainer.find('.classLabel-list-container [component="classLabel-selector"]').toggleClass('dropup', postContainer.outerHeight() < $(window).height() / 2)
    }

    classLabelList.getSelectedClassLabel = function () {
        var selectedClassLabel;
        if (selector) {
            selectedClassLabel = selector.getSelectedClassLabel();
        }
        return selectedClassLabel ? selectedClassLabel.name : '';
    };

    async function changeClassLabel(postContainer, postData, selectedClassLabel) {
        postData.classLabel = selectedClassLabel.name;
        var uuid = postContainer.attr('data-uuid');
        taskbar.update('composer', uuid, {
            classLabel: selectedClassLabel.name,
        });
    }

    return classLabelList;
})