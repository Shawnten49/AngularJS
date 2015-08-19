 'use strict';

 /* Controllers */
 var controllers = angular.module('oneWebAppName.controllers', ['oneWebAppName.services', 'ui.bootstrap', 'ngRoute']);

 controllers.controller('Page.LandingPageCtrl', ['$scope', '$location', '$modal', 'messageService', 'dataService',
 function($scope, $location, $modal, messageService, dataService) {

 		$scope.getQuoteData = {};
 		$scope.name = '';
 		$scope.message = '';
 		$scope.messageService = messageService;
 		$scope.locationService = $location;
 		//$scope.getQuoteInfo.region = "GZ";

 		$scope.getQuote = function(appForm, getQuoteInfo) {
			console.log("Validation : "+appForm.ddRegion.$valid);
			console.log("Validation : "+appForm.txtVehiclePlateNo.$valid);

			if(appForm.ddRegion.$valid && appForm.txtVehiclePlateNo.$valid)
			{
				$scope.getQuoteData = angular.copy(getQuoteInfo);
 				dataService.clearData();
 				dataService.addData(getQuoteInfo);
 				$location.path('/purchase/step1');
			}
 		}

 		$scope.newVehicleCheck = function() {
 			if ($scope.getQuoteInfo.isNewVehicle) {
 				delete $scope.getQuoteInfo.vehiclePlateNo;
 			} else {
 				delete $scope.getQuoteInfo.newVehicleNo;
 			}
 		}

 		$scope.renewQuote = function(form, renewQuoteInfo) {
			if(form.$valid){
				$scope.renewQuote = angular.copy(renewQuoteInfo);
				$location.path('/purchase/step1-1');
			}
 		}

 		$scope.login = function(form, loginInfo) {
			if(form.$valid){}
 		}

 		$scope.addMessage = function() {
 			messageService.addMessage(angular.copy($scope.name), angular.copy($scope.message));
 			$scope.name = '';
 			$scope.message = '';
 		};

 		$scope.modalLoginOpen = function() {

 			var modalInstance = $modal.open({
 				templateUrl: 'PersonalLogin.html',
 				controller: 'ModalLogin',
 				size: 'sm'
 			});
 		}

 		$scope.retrieveQuoteOpen = function(){

 			var modalInstance = $modal.open({
 				templateUrl: 'RetrieveQuote.html',
 				controller: 'ModalRetrieveQuote',
 				size: 'sm'
 			});
 		}
		
		

 		//  :: Example ::	
 		//	 Service.query(function(data) {
 		//    	$scope.posts = data;
 		//		$location.path('/newValue')
 		//		var userID = ($routeParams.userId) ? parseInt($routeParams.userId) : 0;
 		//	 }

}]);

 controllers.controller('PurchasePathCtrl', ['$scope', '$location', '$modal', 'dataService', 'quoteService', 
 	function ($scope, $location, $modal, dataService,  quoteService, $route) {

 		$scope.rate = 2;
 		$scope.max = 5;
 		$scope.isReadonly = false;
		$scope.fullCountryName = "Guangzhou";
 		$scope.getQuoteData = {};
		$scope.products = {};
		
		console.log('Route :'+$location.path());
		if($location.path() == '/purchase/step1')
		{
		
			quoteService.getProduct().then(function(result) {
				$scope.products = result;
	        });
			
		}

 		$scope.getQuoteData =  dataService.getData()[0];
		console.log("data SV : "+ $scope.getQuoteData);
		
		if($scope.getQuoteData != null 
		   && $scope.getQuoteData.region != "GZ"){
				$scope.fullCountryName = "Beijing";
		}
		
 		$scope.buyNowOpen = function (obj) {

 			console.log(obj.target.attributes.data.value);
 			console.log($scope.selectedProduct);			

 			dataService.clearData();
 			dataService.addData($scope.getQuoteData);
 			dataService.addData(obj.target.attributes.data.value);

 			console.log("Add data to service completed.");
 			var modalInstance = $modal.open({
 				templateUrl: 'BuyNow.html',
 				controller: 'ModalBuyNow'
 			});

 		};
		
		$scope.vehicleSelectionOpen = function(){
			
			console.log("VehicleSelectionOpen");
 			var modalInstance = $modal.open({
 				templateUrl: 'ManualVehicleSelection.html',
 				controller: 'ModalManualVehicleSelection',
 				size: 'lg'
 			});
 		}

 		$scope.hoveringOver = function (value) {
 			$scope.overStar = value;
 			$scope.percent = 100 * (value / $scope.max);
 		};

 		$scope.next = function () {
 			$location.path('/purchase/step2');
 		};

 		$scope.nextToPayment = function () {
 			$location.path('/purchase/step3');
 		};

 		$scope.nextToCompleted = function () {
 			$location.path('/purchase/step4');
 		};


}]);

 controllers.controller('ModalBuyNow',
 	function ($scope, $location, dataService, $modalInstance) {

 		$scope.getQuoteData = {};

 		$scope.getQuoteData =  dataService.getData()[0];
 		$scope.selectedProduct = dataService.getData()[1];
 		console.log($scope.selectedProduct);

 		$scope.getAQuote = function () {
 			dataService.clearData();
 			dataService.addData($scope.getQuoteData);
 			$location.path('/purchase/step2');
 			$modalInstance.close();
 		};

 	});


 controllers.controller('ModalLogin', function ($scope, $modalInstance) {

 	$scope.ok = function () {
 		$modalInstance.close();
 	};

 	$scope.cancel = function () {
 		$modalInstance.dismiss('cancel');
 	};

 });

 controllers.controller('ModalRetrieveQuote', function ($scope, $modalInstance) {

 	$scope.ok = function () {
 		$modalInstance.close();
 	};

 	$scope.cancel = function () {
 		$modalInstance.dismiss('cancel');
 	};

 });

controllers.controller('ModalManualVehicleSelection', ['$scope',
 	function ($scope) {

}]);

 controllers.controller('DefaultCtrl', ['$scope',
 	function ($scope) {

}]);

