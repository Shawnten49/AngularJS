(function () {
	'use strict';

	var app = angular.module('app');

	app.directive('showtab', function () {
		return {
			link: function (scope, element, attrs) {
				element.click(function (e) {
					e.preventDefault();
					$(element).tab('show');
				});
			}
		};
	});

	app.factory("$savedContent", function () {
		return [];
	});

	app.directive("saveContent", function ($savedContent) {
		return {
			restrict: "A",
			compile: function ($element, $attrs) {
				var content = $element.html();
				$savedContent[$attrs.saveContent] = content;
			}
		}
	});

	app.directive("applyContent", function ($savedContent) {
		return {
			restrict: "EAC",
			compile: function ($element, $attrs) {
				return function ($scope, $element, $attrs) {
					var content = $savedContent[$attrs.applyContent];
					var lang = $attrs.highlightLang;
					if (lang == "html"){
						content = escapeHtml(content);
					content = trimIndent(content);
					var pre = prettyPrintOne(content, lang);
					$element.html(pre);
					}
				}
			},
		}
	});

    //five stars
    app.directive('star', function () {
        return {
            template: '<ul class="rating" ng-mouseleave="leave()">' +
            '<li ng-repeat="star in stars" ng-class="star" ng-click="click($index + 1)" ng-mouseover="over($index + 1)">' +
            '\u2605' +
            '</li>' +
            '</ul>',
            scope: {
                ratingValue: '=',
                max: '=',
                readonly: '@',
                onHover: '=',
                onLeave: '='
            },
            controller: function($scope){
                $scope.ratingValue = $scope.ratingValue || 0;
                $scope.max = $scope.max || 5;
                $scope.click = function(val){
                    if ($scope.readonly && $scope.readonly === 'true') {
                        return;
                    }
                    $scope.ratingValue = val;
                };
            /*    $scope.over = function(val){
                    $scope.onHover(val);
                };
                $scope.leave = function(){
                    $scope.onLeave();
                }*/
            },
            link: function (scope, elem, attrs) {
                elem.css("text-align", "center");
                var updateStars = function () {
                    scope.stars = [];
                    for (var i = 0; i < scope.max; i++) {
                        scope.stars.push({
                            filled: i < scope.ratingValue
                        });
                    }
                };
                updateStars();

                scope.$watch('ratingValue', function (oldVal, newVal) {
                    if (newVal) {
                        updateStars();
                    }
                });
                scope.$watch('max', function (oldVal, newVal) {
                    if (newVal) {
                        updateStars();
                    }
                });
            }
        };
    });
  /*  app.directive('dialog', function () {
        return {
          templateUrl: '/app/layout/popup/dialog-template.html',
          restrict: 'E',
          transclude: true,
          replace:true,
          scope:true,
          link: function postLink(scope, element, attrs) {
            scope.msg = attrs.msg;
            scope.warningIcon = attrs.warningIcon;

            scope.$watch(attrs.visible, function(value){
              if(value == true)
                $(element).modal('show');
              else
                $(element).modal('hide');
            });

            $(element).on('shown.bs.modal', function(){
              scope.$apply(function(){
                scope.$parent[attrs.visible] = true;
              });
            });

            $(element).on('hidden.bs.modal', function(){
              scope.$apply(function(){
                scope.$parent[attrs.visible] = false;
              });
            });
          }
        };
      }); */
    
    /* Date picker */
    app.directive('datepicker', function() {
       return function(scope, element, attrs) {
           element.datepicker({
               inline: true,
               dateFormat: 'dd.mm.yy',
               onSelect: function(dateText) {
                   var modelPath = $(this).attr('ng-model');
                   putObject(modelPath, scope, dateText);
                   scope.$apply();
               }
           });
       }
    });
    

})();