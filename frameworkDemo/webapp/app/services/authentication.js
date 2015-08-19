(function(){
	'use strict';
	
	var serviceId = 'authentication';
	angular.module('app').factory(serviceId, ['$rootScope','$http', 'authService', 'session', authentication]);
	
	function authentication($rootScope, $http, authService, session){
		var service = {
			login: login,
			valid: valid,
			isAuthorized: isAuthorized,
			logout: logout
		};
		
		return service;
		
		function login(param){
			
			/*var data ="j_username=" + encodeURIComponent(param.username) +"&j_password=" + encodeURIComponent(param.password) +"&_spring_security_remember_me=" + param.rememberMe +"&submit=Login";
			$http.post('app/authentication', data, {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                ignoreAuthModule: 'ignoreAuthModule'
            }).success(function (data, status, headers, config) {
                account.get(function(data) {
                    session.create(data.login, data.firstName, data.lastName, data.email, data.roles);
                    $rootScope.account = session;
                    authService.loginConfirmed(data);
                });
            }).error(function (data, status, headers, config) {
                $rootScope.authenticationError = true;
                session.invalidate();
            });*/
		}
		
		function valid(authorizedRoles){
			// TODO: do something;	
			return true;
			
			/*
			 $http.get('protected/authentication_check.gif', {
                    ignoreAuthModule: 'ignoreAuthModule'
                }).success(function (data, status, headers, config) {
                    if (!Session.login) {
                        Account.get(function(data) {
                            Session.create(data.login, data.firstName, data.lastName, data.email, data.roles);
                            $rootScope.account = Session;
                            if (!$rootScope.isAuthorized(authorizedRoles)) {
                                // user is not allowed
                               $rootScope.$broadcast("event:auth-notAuthorized");
                            } else {
                                $rootScope.$broadcast("event:auth-loginConfirmed");
                            }
                        });
                    }else{
                        if (!$rootScope.isAuthorized(authorizedRoles)) {
                                // user is not allowed
                                $rootScope.$broadcast("event:auth-notAuthorized");
                        } else {
                                $rootScope.$broadcast("event:auth-loginConfirmed");
                        }
                    }
                }).error(function (data, status, headers, config) {
                    if (!$rootScope.isAuthorized(authorizedRoles)) {
                        $rootScope.$broadcast('event:auth-loginRequired', data);
                    }
                });
			 */
		}
		
		function isAuthorized(authorizedRoles){
			// TODO: do something;
			if (!angular.isArray(authorizedRoles)) {
                if (authorizedRoles == '*') {
                    return true;
                }

                authorizedRoles = [authorizedRoles];
            }

            var isAuthorized = false;
            angular.forEach(authorizedRoles, function(authorizedRole) {
                var authorized = (!!Session.login &&
                    session.userRoles.indexOf(authorizedRole) !== -1);

                if (authorized || authorizedRole == '*') {
                    isAuthorized = true;
                }
            });

            return isAuthorized;
		}
		
		function logout(){
			// TODO: do something;
			$rootScope.authenticationError = false;
            $rootScope.authenticated = false;
            $rootScope.account = null;
            
            // TODO: call logout service
            // $http.get('app/logout');
            session.invalidate();
            authService.loginCancelled();
		}
	}
})();