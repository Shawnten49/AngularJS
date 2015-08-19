(function () {

	'use strict';

	var service = angular.module('app.services.utilities', []);
	service.factory('dummyGenerator', [dummyGenerator]);
	service.factory('utilities', [transferData]);
	service.factory('httpUtility', [httpUtility]);

	function transferData() {

		var dataList = [];
        
        //manage data without KEY
		var addData = function (newObj) {
			dataList.push(newObj);
		}
		var getData = function () {
			return dataList;
		}
		var clearData = function () {
			dataList = [];
		}
        
        //manage data with KEY
		var addKeyData = function (key,newObj) {
			dataList[key] = newObj;
		}		
		var getKeyData = function (key) {
			return dataList[key];
		}		
        var clearKeyData = function (key) {
			dataList[key] = [];
		}
        
		return {
			addData: addData,
			getData: getData,
            addKeyData: addKeyData,
			getKeyData: getKeyData,
			clearKeyData: clearKeyData,
            clearData: clearData
		};
	};
	
	function httpUtility($http){
		return{
			
			getDataFromURL: function (URL) {
				
				var util = $http.get(URL)
				.then (function(response){		
					console.log(response.data); 
					return response.data;
				});
				return util;
			}
		}			
	}

	function dummyGenerator(appconstant) {
		var helpers = {

				watchersContainedIn: function (scope) {
				var watchers = (scope.$$watchers) ? scope.$$watchers.length : 0;
				var child = scope.$$childHead;
				while (child) {
					watchers += (child.$$watchers) ? child.$$watchers.length : 0;
					child = child.$$nextSibling;
				}
				return watchers;
			},

			randomGender: function () {
				return (Math.floor(Math.random() * 2) % 2 === 0) ? 'M' : 'F';
			},

			randomAge: function () {
				return Math.floor(Math.random() * 90) + 1;
			},
			
			randomNumber: function (length) {
				return Math.floor(Math.random() * length);
			},

			randomName: function (length,lang) {
				var nome = "";
				for (var i = 0; i < length; i++)
					nome += this.getLetter(lang).charAt(Math.floor(Math.random() * this.getLetter(lang).length));
				return nome;
			},

			randomUrl: function () {
				return (Math.floor(Math.random() * 2) % 2 === 0) ? 'http://www.' + (helpers.randomName(20) + '.' + helpers.randomName(2)).toLowerCase() : '';
			},
			
			getLetter : function(lang){
				
				if(lang == "cn"){
					return "人有我他这个们中来上大为和国地到以说时要就出会可也你对生能而子那得于着下自之年过发后作里用道行所然家种事成方多经么去法学如都同现当没动面起看定天分还进好小部其些主样理心她本前开但因只从想实日军者意无力它与长把机十民第公此已工使情明性知全三又关点正业外将两高间由问很最重并物手应战向头文体政美相";
				}
				else{
					return "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
				}
				
				
			}
		}
		return helpers;
	};

	service.constant('appconstant', {
		letters: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
	});

})();