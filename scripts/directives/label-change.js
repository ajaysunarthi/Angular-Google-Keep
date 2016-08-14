angular.module('assessment').directive('labelChange', labelChange);

function labelChange() {
    return function(scope, element) {
        element.bind('focus', function() {
            element[0].previousElementSibling.firstChild.className = 'fa fa-trash';
            element[0].nextElementSibling.firstChild.className = 'fa fa-check';
        });
        element.bind('blur', function() {
            element[0].previousElementSibling.firstChild.className = 'fa fa-tags';
            element[0].nextElementSibling.firstChild.className = 'fa fa-pencil';
        });
    };
}


angular.module('assessment').directive('inputlabelChange', inputlabelChange);

function inputlabelChange() {
    return function(scope, element) {
        element.bind('focus', function() {

            element[0].previousElementSibling.firstChild.className = 'fa fa-times';
            element[0].nextElementSibling.firstChild.className = 'fa fa-check';
        });
        element.bind('blur', function() {
            if (element[0].value.length == 0) {
                element[0].previousElementSibling.firstChild.className = 'fa fa-plus';
                element[0].nextElementSibling.firstChild.className = '';
            }

        });

    };
}
