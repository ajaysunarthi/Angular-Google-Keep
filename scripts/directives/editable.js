angular.module('assessment').directive('editable', editable);

editable.$inject = ['$sce'];

function editable($sce) {
    return {
        restrict: 'AE',
        require: '?ngModel',
        link: function(scope, element, attrs, ngModel) {

            element.bind('blur keyup change mouseenter mousemove', function() {
                scope.$apply(function() {
                    ngModel.$setViewValue(element.html());
                });

            });


            ngModel.$render = function() {
                element.html(ngModel.$viewValue);
            };

            ngModel.$render();
        }
    }
}
