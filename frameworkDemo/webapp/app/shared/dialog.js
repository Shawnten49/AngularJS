angular.module('app').controller('dialogCtrl', ['$rootScope', '$scope','$modal','$timeout','$location','utilities',  '$translate','$filter',dialogFactory]);
angular.module('app').controller('quoteModalCtrl', quoteModalInstant);
angular.module('app').controller('progressCtrl', progressInstant);

function dialogFactory($rootScope, $scope, $modal, $timeout,utilities, $location){
    
    dialogCtrl = this;
    
    $rootScope.toggleTest = toggleTest;
    $scope.toggleSaveQuote = toggleSaveQuote;
    $scope.toggleAutoRegis = toggleAutoRegis;
    $scope.toggleSuccess = toggleSuccess;
    $scope.toggleLogin = toggleLogin;
    $scope.toggleRegis = toggleRegis;
    $rootScope.toggleWarningAgreement = toggleWarningAgreement;
    $scope.toggleAgreement = toggleAgreement;
    $scope.togglePayProgress = togglePayProgress;

    $scope.toggleRecentlyQuote = toggleRecentlyQuote;
    $scope.toggleContinueInsuredQuote=toggleContinueInsuredQuote;
    $rootScope.toggleErrorMsg = toggleErrorMsg;
            
    function toggleTest(mobile){
        var modalInstance = $modal.open({
            templateUrl: 'app/layout/dialog/dialog-template.html',
            controller: 'quoteModalCtrl',
            backdrop: true,
            resolve: {
                popdata: function(){
                    return mobile;
                }
            }
        });
        
    };
    
    function toggleWarningAgreement(){
        var modalInstance = $modal.open({
            templateUrl: 'app/layout/dialog/warning-agreement-template.html',
            controller: 'quoteModalCtrl',
            backdrop: true,
            resolve: {
                popdata: function(){
                    return "";
                }
            }
        });
        
        modalInstance.result.then(function (selectedItem) {
            if("call_agree" == selectedItem.type){
                $scope.toggleAgreement();
            }
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };
    
    function toggleAgreement(){
        var modalInstance = $modal.open({
            templateUrl: 'app/layout/dialog/agreement-template.html',
            controller: 'quoteModalCtrl',
            backdrop: true,
            resolve: {
                popdata: function(){
                    return "";
                }
            }
        });
    };
    
    function toggleSaveQuote(mobile){
        var modalInstance = $modal.open({
            templateUrl: 'app/layout/dialog/save-quote-template.html',
            controller: 'quoteModalCtrl',
            backdrop: true,
            resolve: {
                popdata: function(){
                    return mobile;
                }
            }
        });
        
        modalInstance.result.then(function (selectedItem) {
            if("auto_regis" == selectedItem.type){
                $scope.toggleAutoRegis(selectedItem.mobile);
            }else if("login" == selectedItem.type){
                $scope.toggleLogin();
            }else if("common_regis" == selectedItem.type){
                $scope.toggleRegis();
            }
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
        
    };
    
    function toggleAutoRegis(mobile){
        var modalInstance = $modal.open({
            templateUrl: 'app/layout/dialog/auto-regis-template.html',
            controller: 'quoteModalCtrl',
            backdrop: true,
            resolve: {
                popdata: function(){
                    return mobile;
                }
            }
        });
        
        modalInstance.result.then(function (selectedItem) {
            $scope.toggleSuccess();
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };
    
    function toggleSuccess(){
        var modalInstance = $modal.open({
            templateUrl: 'app/layout/dialog/success-template.html',
            controller: 'quoteModalCtrl',
            backdrop: true,
            resolve: {
                popdata: function(){
                    return "";
                }
            }
        });
        
    };
    
    function toggleLogin(){
        var modalInstance = $modal.open({
            templateUrl: 'app/layout/dialog/login-template.html',
            controller: 'quoteModalCtrl',
            backdrop: true,
            resolve: {
                popdata: function(){
                    return "";
                }
            }
        });
        
        modalInstance.result.then(function (selectedItem) {
            if("common_regis" == selectedItem.type){
                $scope.toggleRegis();
            }else{
                $scope.toggleSuccess();
            }
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
        
    };
    
    function toggleRegis(){
        var modalInstance = $modal.open({
            templateUrl: 'app/layout/dialog/regis-template.html',
            controller: 'quoteModalCtrl',
            backdrop: true,
            resolve: {
                popdata: function(){
                    return "";
                }
            }
        });
        
        modalInstance.result.then(function (selectedItem) {
            if("login" == selectedItem.type){
                $scope.toggleLogin();
            }else{
                $scope.toggleSuccess();
            }
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };
    function toggleRecentlyQuote(){
        var modalInstance = $modal.open({
            templateUrl: 'app/layout/dialog/recently-quote-template.html',
            controller: 'quoteModalCtrl',
            backdrop: true,
            resolve: {
                popdata: function(){
                    return "";
                }
            }
        });
    };
    function toggleContinueInsuredQuote(){
        var modalInstance = $modal.open({
            templateUrl: 'app/layout/dialog/query-retrieve-quote-template.html',
            controller: 'quoteModalCtrl',
            backdrop: true,
            resolve: {
                popdata: function(){
                    return "";
                }
            }
        });
    };
    function togglePayProgress(){
        var modalInstance = $modal.open({
            templateUrl: 'app/layout/dialog/payment-progress-template.html',
            controller: 'progressCtrl',
            backdrop: true,
            resolve: {
                popdata: function(){
                    return "";
                }
            }
        });
        
        modalInstance.result.then(function (selectedItem) {
            $location.path('/quote/policy-info');
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
        
    };
    
    function toggleErrorMsg(mobile){
        var modalInstance = $modal.open({
            templateUrl: 'app/layout/dialog/error-template.html',
            controller: 'quoteModalCtrl',
            backdrop: true,
            resolve: {
                popdata: function(){
                    return mobile;
                }
            }
        });
        
    };
}

function quoteModalInstant($scope, $modalInstance,$filter, $translate,popdata,$location,utilities,digitalMotorServices) {
    $scope.dialogOk = dialogOk;
    $scope.dialogCancel = dialogCancel;
    $scope.dialogLogin = dialogLogin;
    $scope.dialogAutoRegis = dialogAutoRegis;
    $scope.dialogSubmitLogin = dialogSubmitLogin;
    $scope.dialogRegis = dialogRegis;
    $scope.dialogSubmitRegis = dialogSubmitRegis;
    $scope.callAgreement = callAgreement;
    $scope.loginProcess = loginProcess;
    $scope.canLogin = canLogin;
    $scope.canRegis = canRegis;
    $scope.canAutoRegis = canAutoRegis;
    $scope.selectedData = [];
    $scope.msg = popdata;
    $scope.loginInfo = {}
    $scope.regisInfo = {}
    $scope.autoRetisInfo = {}
        
    function dialogOk () {		
        $modalInstance.close($scope);
    };

    function dialogCancel() {
        $modalInstance.dismiss('cancel');
    };
    
    function dialogAutoRegis () {
        $scope.type = "auto_regis";
        $scope.mobile = $scope.msg;
        $modalInstance.close($scope);
    };
    
    function dialogLogin () {
        $scope.type = "login";
        $modalInstance.close($scope);
    };
    
    function dialogSubmitLogin () {
        $modalInstance.close($scope);
    };
    
    function dialogRegis () {
        $scope.type = "common_regis";
        $modalInstance.close($scope);
    };
    
    function dialogSubmitRegis () {
        $modalInstance.close($scope);
    };
    
    function callAgreement () {
        $scope.type = "call_agree";
        $modalInstance.close($scope);
    };
    
    function loginProcess () {		
        $modalInstance.close($scope);
    };
    $scope.totalServerItems = 0;
    $scope.pagingOptions = {
        pageSizes: [5, 10, 25],
        pageSize:10,
        currentPage: 1
    };
    //模拟数据，待后台部分完成后模拟数据功能该删除
    $scope.dataInfo =digitalMotorServices.getRecentlyQuote();
    $scope.gridOptions = {
        data: 'dataInfo',
        plugins: [new ngGridFlexibleHeightPlugin()],
        columnDefs: [
            {field:'brandModel', displayName:'品牌型号'},
            {field:'VINNumber', displayName:'车架号'},
            {field:'EngineNumber', displayName:'发动机号'},
            {field:'premium', displayName:'保费'},
            {field:'createTime', displayName:'创建时间'},
        ],
        selectedItems: $scope.selectedData,
        multiSelect: false,
        afterSelectionChange: function (theRow, evt) {
            console.log($scope.selectedData);
            $modalInstance.dismiss('cancel');
            var item = $scope.selectedData[0];
            utilities.addKeyData("dataseleted", item);
            $location.path('/quote/search-vehicle');
        }
    };
    $scope.dataQueryInfo =digitalMotorServices.getQueryQuote();
    $scope.gridQueryOptions = {
        data: 'dataQueryInfo',
        plugins: [new ngGridFlexibleHeightPlugin()],
        columnDefs: [
            {field:'No', displayName:$filter('translate')('retrieve-quote.grid-head-consignee')},
            {field:'BrandModel', displayName:$filter('translate')('retrieve-quote.grid-head-shipping-address')},
            {field:'VINNumber', displayName:$filter('translate')('retrieve-quote.grid-head-phoneNumber')},
            {field:'EngineNumber', displayName:$filter('translate')('retrieve-quote.grid-head-zip-code')},
            {field:'Premium', displayName:$filter('translate')('package-selection.grid-head-premium')},
            {field:'CreateTime', displayName:$filter('translate')('retrieve-quote.grid-head-create-time')},
            {field:'edit', displayName:$filter('translate')('retrieve-quote.grid-head-operation'),cellTemplate: "<button ng-click='setContactAdd(lg)'>{{'retrieve-quote.grid-btn-continue-insured' | translate}}</button>"}
        ]
    };
    function canLogin () {
        var mobile = ($scope.login_form.mobile.$valid && $scope.loginInfo.mobile == "13123456789");
        var password = ($scope.login_form.password.$valid && $scope.loginInfo.password == "p@ssw0rd");
        var verify = ($scope.login_form.verifyNumber.$valid && $scope.loginInfo.verifyNumber == "VXV3D");
        
        var valid = (mobile && password && verify);
        return valid;
    }
    
    function canRegis () {
        var mobile = ($scope.regis_form.mobile.$valid && $scope.regisInfo.mobile == "13123456789");
        var password = ($scope.regis_form.password.$valid && $scope.regisInfo.password == "p@ssw0rd");
        var vPassword = ($scope.regis_form.verifyPassword.$valid && $scope.regisInfo.verifyPassword == "p@ssw0rd");
        var vNumber = ($scope.regis_form.verifyNumber.$valid && $scope.regisInfo.verifyNumber == "ABCDEF");
        
        var valid = (mobile && password && vPassword && vNumber);
        return valid;
    }
    
    function canAutoRegis () {
        var mobile = ($scope.auto_regis_form.mobile.$valid && $scope.autoRetisInfo.mobile == "13123456789");
        
        return mobile;
    }
    
    // Tab detail
    var tabClasses;
    function initTabs() {
        tabClasses = ["", ""];
    }
    
    $scope.getTabClass = function (tabNum) {
        return tabClasses[tabNum];
    };
    
    $scope.getTabPaneClass = function (tabNum) {
        return "tab-pane " + tabClasses[tabNum];
    }
    
    $scope.setActiveTab = function (tabNum) {
        initTabs();
        tabClasses[tabNum] = "active";
    };
    
    initTabs();
    $scope.setActiveTab(1);
    
}

function progressInstant($scope, $modalInstance, $timeout, popdata) {
    $scope.dialogCancel = dialogCancel;
    
    function dialogCancel() {
        $modalInstance.dismiss('cancel');
    };
    
    $timeout(function() {
       $modalInstance.close($scope);
    }, 2000);
}