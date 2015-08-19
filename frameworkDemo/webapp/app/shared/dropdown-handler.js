angular.module('app').controller('dropdownHandler', ['$rootScope', '$scope', '$location', 'utilities', DropdownHandler]);

function DropdownHandler($rootScope, $scope, $location, utilities) {

    $scope.showDropdownMenu = false;
    $scope.hovertab = HoverTab;
    $scope.hideMenu = HideMenu;
    $scope.goToBasicInfo = gotoBasicInfoPage;
    $scope.goToPolicyPeriod = gotoPolicyPeriodPage;
    $scope.clickMenu = ClickedMenu;

    //event just show and hide tab.
    function HideMenu() {
        $scope.showDropdownMenu = false;
    }

    function HoverTab(itm) {
        $scope.showDropdownMenu = false;
        //check criiteria
        if (itm < $rootScope.currentTab) {
            $scope.showDropdownMenu = true;
        }
    }

    function ClickedMenu(itm) {
        $scope.showDropdownMenu = false;
        if ($scope.allowedEditTab == itm && itm == 1) {
            $location.path('/quote/basic-info');
        } else if ($scope.allowedEditTab == itm && itm == 2) {
            $location.path('/quote/package-selection');
        } else if ($scope.allowedEditTab == itm && itm == 3) {
            $location.path('/quote/personal-info');
        } else if ($scope.allowedEditTab == itm && itm == 4) {
            $location.path('/quote/payment-info');
        }
    }

    function gotoBasicInfoPage(itm) {
        $scope.showDropdownMenu = false;
        $location.path('/quote/basic-info');
        //set active tab menu.
        $rootScope.currentTab = itm;
    }

    function gotoPolicyPeriodPage(itm) {
        $scope.showDropdownMenu = false;
        $location.path('/quote/policy-period');
        //set active tab menu.
        $rootScope.currentTab = itm;
    }

    //init data.
    $scope.basicInfo = utilities.getKeyData("basicInfo");
    $scope.brandModel = utilities.getKeyData("criteria");
    $scope.policyDetail = utilities.getKeyData("policydetail");
    $scope.policyPeriod = utilities.getKeyData("policyperiod");

    $rootScope.$watch('currentTab', function (newValue, oldValue) {
        if (newValue) {
            $scope.menu1 = newValue == 1 ? 'active' : '';
            $scope.menu2 = newValue == 2 ? 'active' : '';
            $scope.menu3 = newValue == 3 ? 'active' : '';
            $scope.menu4 = newValue == 4 ? 'active' : '';
        }
    });
}