(function(){
	'use strict';
	
	var serviceId = 'session';
	angular.module('app').factory(serviceId, ['$http', session]);
	
	function session($http){
		
		var service = {
			create: create,
			invalidate: invalidate
		};
		
		return service;
		
		function create(login, firstName, lastName, email, userRoles){
			this.login = login;
			this.firstName = firstName;
			this.lastName = lastName;
			this.userRoles = userRoles;
			
			return this;
		}
		
		function invalidate(){
			this.login = null;
			this.firstName = null;
			this.lastName = null;
			this.userRoles = null;
			
			return this;
		}
		
	}
})();