var controllerId = 'loginFrom';

angular.module('app').controller(controllerId, ['$rootScope','$scope','$modal','$location','$filter','$translate','utilities','digitalMotorServices',loginFrom]);

function loginFrom($rootScope, $scope, $modal, $location, $filter, $translate, utilities, digitalMotorServices) {
//参数声明


//方法声明
    $scope.login = login;




//方法实现

    function login() {
        debugger;
        console.log("path:" + $location.path());
        $location.path('/main');
    }

}