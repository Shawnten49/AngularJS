'use strict';

/* Services */

var services = angular.module('oneWebAppName.services', []);

services.service('dataService', function () {
	var dataList = [];
	var addData = function (newObj) {
		dataList.push(newObj);
	}
	var getData = function () {
		return dataList;
	}
	var clearData = function () {
		dataList = [];
	}
	return {
		addData: addData,
		getData: getData,
		clearData: clearData
	};
});

services.factory('messageService', function () {
	var messageImpl = {};

	messageImpl.messages = [];

	messageImpl.addMessage = function (name, message) {
		this.messages.push({
			name: name,
			message: message
		});
	};

	messageImpl.getNumMessages = function () {
		return this.messages.length;
	};

	messageImpl.getMessages = function () {
		return this.messages;
	};

	return messageImpl;
});


services.factory('quoteService', function ($rootScope, $http) {
    return {
    	getProduct: function() {
            var result = $http.get('http://localhost:8081/web-motor-backend/rest/opus').then(function(response){
                return response.data;
            });
            return result;
        }
    };
});

services.factory('getAQuote', function ($resource) {
	return $resource('https://api.github.com/repos/angular/angular.js/issues/:number', {
		number: '@number'
	}, {
		getIssue: {
			method: 'GET',
			params: {
				number: 0
			}
		}
	})
});