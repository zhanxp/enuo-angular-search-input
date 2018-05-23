angular.module('search.input')
    .directive('searchInput', function () {
        return {
            restrict: 'EA',
            templateUrl: 'search/input/templates/searchInput.html',
            replace: true,
            scope: {
                config: '='
            },
            /** @ngInject */
            controller: function ($rootScope, $scope, $element, $attrs, $localStorage) {
                $scope.config.onClickTab();

                $scope.addProItem = function () {
                    $scope.queryProList.push({
                        logic: 'and',
                        operation: '='
                    });
                };

                $scope.deleteProItem = function (item) {
                    var index = $scope.queryProList.indexOf(item);
                    $scope.queryProList.splice(index, 1);
                };

                $scope.execProSearch = function () {
                    $localStorage["queryProList" + $scope.tabTypetabType] = $scope.queryProList;
                    // $localStorage.queryProList = $scope.queryProList;
                    //console.log($scope.queryProList);
                    var queryLang = '';
                    angular.forEach($scope.queryProList, function (data, index) {
                        if (data.operation && data.keyword && data.attr && data.attr.val) {
                            var item = '';
                            if (index == 0 || !queryLang) {
                                item += ' ' + data.attr.val;
                            } else {
                                if (data.logic) {
                                    var logic = data.logic;
                                    if (logic == "not") {
                                        logic = " and " + logic;
                                    }
                                    item += ' ' + logic + ' ' + data.attr.val;
                                }
                            }
                            if (item) {
                                var keyword = data.keyword;
                                if (data.operation == "like") {
                                    keyword = "'%" + keyword + "%'";
                                } else {
                                    keyword = "'" + keyword + "'";
                                }
                                item += ' ' + data.operation + ' ' + keyword;
                                queryLang += item;
                            }
                        }
                    });
                    queryLang = $.trim(queryLang)
                    var execQuery = { queryLang: queryLang, queryKeyWord: '' };
                    $localStorage.execQuery = execQuery;
                    // $scope.searchAction({ q: execQuery });
                    $scope.config.onClickSearch(execQuery);
                };

                $scope.resetProSearch = function () {
                    $scope.queryProList = [];
                    $scope.queryProList.push({
                        logic: 'and',
                        operation: '='
                    });
                    // $localStorage.queryProList = $scope.queryProList;
                    $localStorage["queryProList" + $scope.tabType || ""] = $scope.queryProList;
                };

                $scope.config.onClickTab = function (params) {
                    $localStorage["queryProList" + $scope.tabType || ""] = $scope.queryProList || [];
                    console.info(JSON.stringify(params));
                    if (params) {
                        // var params = JSON.parse(paramsStr);
                        $scope.tabType = params.tabType;
                    }
                    $scope.queryProList = $localStorage["queryProList" + $scope.tabType || ""] || [];
                    if ($scope.queryProList.length <= 0) {
                        $scope.queryProList.push({
                            logic: 'and',
                            operation: '='
                        });
                    }
                }
            }
        };
    });