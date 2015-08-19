(function () {
	'use strict';
	var app = angular.module('app');
	app.config(['$routeProvider', '$controllerProvider', '$locationProvider', 'USER_ROLES', routeConfigurator]);

	function routeConfigurator($routeProvider, $controllerProvider, $locationProvider, USER_ROLES) {

		app.registerCtrl = $controllerProvider.register;
		/*$locationProvider.html5Mode(true);*/

        debugger;
		$routeProvider
			.when('/main', {
				title: 'main',
				masterpage: 'app/layout/shell-main.html',
				templateUrl: 'app/components/main/main.html',
				access: {
					authorizedRoles: [USER_ROLES.all]
				}
			})

            .when('/login', {
                title:'login',
                masterpage:'app/layout/shell-login.html',
                templateUrl:'app/components/login/login.html',
                access: {
                    authorizedRoles: [USER_ROLES.all]
                }
            })

            .when('/login23', {
                title:'login',
                masterpage:'app/layout/shell-login.html',
                templateUrl:'app/components/login/login.html',
                access: {
                    authorizedRoles: [USER_ROLES.all]
                }
            })

            .otherwise({
				redirectTo: '/login23'
			});
	}

	app.run(['$location', '$rootScope',
				function ($location, $rootScope) {

			$rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
                if(current.$$route == undefined) {
                    return;
                }
				if (current.$$route.title != null) {
					$rootScope.title = current.$$route.title;
				}

				if (current.$$route.masterpage != null) {
					$rootScope.masterpage = current.$$route.masterpage;
				}

			});
		}]);

})();