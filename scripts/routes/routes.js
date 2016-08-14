angular.module('assessment')
    .config(function($resourceProvider) {
        $resourceProvider.defaults.stripTrailingSlashes = false;
    })

.config(function($stateProvider, $httpProvider) {
    $stateProvider.state('main', {
            url: '/main',
            templateUrl: 'views/main.html',
            controller: mainCtrl,
            controllerAs: 'vm'
        })
        .state('login', {
            url: '/login',
            templateUrl: 'views/login.html',
            controller: loginCtrl,
            controllerAs: 'vm'

        })
}).run(function($rootScope, $location, $state, $window) {
    $rootScope.$on("$locationChangeStart", function(event, toState, toParams, fromState, fromParams) {
        if (!$window.localStorage['Token']) {
            if (toState.split('#/')[1] != 'login') {
                $location.path('/login');
            }
        } else {
            $location.path('/main');
        }

    });
});
