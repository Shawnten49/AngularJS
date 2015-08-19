(function () {
	'use strict';
	var app = angular.module('app', [
	     
		// Angular modules
	     'ngRoute',
	     'ngAnimate',
		 'ngResource',
	     
		// Custom modules
	     'app.core',
		 'app.services.utilities',
		 'app.services.digitalMotor',
	     
		// 3rd party modules
	     'http-auth-interceptor',
		 'pascalprecht.translate',
		 'treeControl',
		 'textAngular',
         'ui.bootstrap',
		 'ngGrid',
		 'angularFileUpload',
		 'angularValidator'
		
	     ]);

	// Handle routing errors and success events
	app.run(['$rootScope', '$location', '$route', '$http', 'authentication', 'session', 'USER_ROLES',
        function ($rootScope, $location, $route, $http, authentication, session, USER_ROLES) {
			// Include $route to kick start the router.
			$rootScope.authenticated = false;
			$rootScope.$on('$routeChangeStart', function (event, next) {
				$rootScope.userRoles = USER_ROLES;
				$rootScope.isAuthorized = authentication.isAuthorized;
				//authentication.valid(next.access.authorizedRoles);
			});

			// Call when the client is confirmed
			$rootScope.$on('event:auth-loginConfirmed', function (data) {
				$rootScope.authenticated = true;
				if ($location.path() === '/login') {
					var search = $location.search();
					if (search.redirect !== undefined) {
						$location.path(search.redirect).search('redirect', null).replace();
					} else {
						$location.path('/').replace();
					}
				}
			});

			// Call when the 401 response is returned by the server
			$rootScope.$on('event:auth-loginRequired', function (reject) {
				session.invalidate();
				$rootScope.authenticated = false;
				var redirect = $location.path();
				if (redirect !== '/' && redirect !== '' && redirect !== 'register' && redirect !== '/login') {
					$location.path('/login').search('redirect', redirect).replace();
				}
			});

			// Call when the 403 response is returned by the server
			$rootScope.$on('event:auth-notAuthorized', function (reject) {
				$rootScope.errorMessage = 'error.403';
				$location.path('/error').replace();
			});

			// Call when the user logout
			$rootScope.$on('event:auth-loginCancelled', function () {
				$location.path('');
			});

	}]);
})();