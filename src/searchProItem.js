angular.module('search.input')
    .directive('searchProItem', function () {
        return {
            restrict: 'EA',
            templateUrl: 'search/input/templates/searchProItem.html',
            replace: true,
            scope: {
                addAction: '&',
                deleteAction: '&',
                searchItem: '=',
                searchItemIndex: '=',
                searchItemTotal: '=',
                config: '='
            },
            /** @ngInject */
            controller: function ($rootScope, $scope, $element, $attrs, $filter) {
                $scope.operationList = [{
                        title: '等于',
                        val: '='
                    },
                    {
                        title: '大于',
                        val: '>'
                    },
                    {
                        title: '小于',
                        val: '<'
                    },
                    {
                        title: '大于等于',
                        val: '>='
                    },
                    {
                        title: '小于等于',
                        val: '<='
                    },
                    {
                        title: '包含',
                        val: 'like'
                    },
                    {
                        title: '不为空',
                        val: "is not null"
                    },
                    // {
                    //     title: '为空',
                    //     val: "is null"
                    // },
                ];

                $scope.operationListMongo = [{
                        title: '等于',
                        val: '='
                    },
                    {
                        title: '大于',
                        val: '>'
                    },
                    {
                        title: '小于',
                        val: '<'
                    },
                    {
                        title: '大于等于',
                        val: '>='
                    },
                    {
                        title: '小于等于',
                        val: '<='
                    },
                    {
                        title: '包含',
                        val: 'like'
                    },
                    {
                        title: '不等于',
                        val: '!='
                    },
                ];

                $scope.logicList = [{
                        title: '与',
                        val: 'and'
                    },
                    {
                        title: '或',
                        val: 'or'
                    },
                    {
                        title: '非',
                        val: 'and not'
                    },
                    // { title: '或非', val: 'or not' },
                ];

                $scope.logicListMongo = [{
                        title: '与',
                        val: 'and'
                    },
                    {
                        title: '或',
                        val: 'or'
                    }
                ];

                $scope.queryAttrList = [];
                $scope.searchKeyword = function (keyword) {
                    if ($scope.config.searchInputField && $scope.config.searchInputField.length > 0) {
                        var _field = $scope.config.searchInputField;
                        if (_field && _field.length > 0) {
                            // console.log("##-->>field:" + JSON.stringify(_field));
                            $scope.queryAttrList = [];
                            angular.forEach(_field, function (data) {
                                if (!keyword || (keyword && data.name.indexOf(keyword) != -1)) {
                                    $scope.queryAttrList.push(data);
                                }
                            });
                        }
                    }
                };

                $scope.fnSelect = function ($item, $model) {
                    $scope.searchItem.keyword = "";
                    $scope.searchItem.keyword_date = "";
                    $scope.searchItem.keyword_number = "";
                };
                $scope.$watchCollection('searchItem', function (n, o) {
                    if ($scope.searchItem.attr && $scope.searchItem.attr.type) {
                        if ($scope.searchItem.attr.type == "date") {
                            $scope.searchItem.keyword_date_value = $scope.searchItem.keyword_date ? $filter('date')($scope.searchItem.keyword_date, 'yyyy-MM-dd') : "";
                            $scope.searchItem.keyword = $scope.searchItem.keyword_date_value;
                        }
                        if ($scope.searchItem.attr.type == "number") {
                            $scope.searchItem.keyword = $scope.searchItem.keyword_number;
                        }
                        if ($scope.searchItem.attr.type == "timestamp") {
                            $scope.searchItem.keyword_date_value = $scope.searchItem.keyword_date ? $filter('date')($scope.searchItem.keyword_date, 'yyyy-MM-dd') : "";
                            $scope.searchItem.keyword = $scope.searchItem.keyword_date ? new Date($scope.searchItem.keyword_date).getTime() : "";
                        }
                    }
                });
            }
        };
    });