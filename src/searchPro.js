(function () {
    'use strict';
    //
    angular.module('app.statistics')
        .directive('searchPro', searchPro);

    /** @ngInject */
    function searchPro($log, $timeout, $rootScope, $document, $compile, $localStorage) {

        return {
            restrict: 'EA',
            templateUrl: 'controller/search/directives/searchPro.html',
            replace: true,
            scope: {
                addAction: '&',
                deleteAction: '&',
                searchItemPro: '=',
                searchItemIndexPro: '=',
                searchItemTotalPro: '=',
                config: '='
            },
            /** @ngInject */
            controller: function ($rootScope, $scope, $element, $attrs) {
                $scope.logicList = [
                    { title: '与', val: 'and' },
                    { title: '或', val: 'or' },
                ];
                $scope.addProItem = function () {
                    $scope.searchItemPro.items.push({
                        logic: 'and',
                        operation: '='
                    });
                };
                $scope.deleteProItem = function (item) {
                    var index = $scope.searchItemPro.items.indexOf(item);
                    $scope.searchItemPro.items.splice(index, 1);
                };
            }
        };
    }
})();