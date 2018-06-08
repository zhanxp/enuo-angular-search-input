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
            controller: function ($rootScope, $scope, $element, $attrs) {
                $scope.operationList = [
                    { title: '等于', val: '=' },
                    { title: '大于', val: '>' },
                    { title: '小于', val: '<' },
                    { title: '大于等于', val: '>=' },
                    { title: '小于等于', val: '<=' },
                    { title: '包含', val: 'like' },
                    { title: '不为空', val: "is not null" },
                    { title: '为空', val: "is null" },
                ];

                $scope.operationListMongo = [
                    { title: '等于', val: '=' },
                    { title: '大于', val: '>' },
                    { title: '小于', val: '<' },
                    { title: '大于等于', val: '>=' },
                    { title: '小于等于', val: '<=' },
                    { title: '包含', val: 'like' },
                    { title: '不等于', val: '!=' },
                ];

                $scope.logicList = [
                    { title: '与', val: 'and' },
                    { title: '或', val: 'or' },
                    { title: '与非', val: 'and not' },
                    { title: '或非', val: 'or not' },
                ];

                $scope.logicListMongo = [
                    { title: '与', val: 'and' },
                    { title: '或', val: 'or' }
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
                    // var params = {
                    //     keyword: keyword,
                    //     projectConfigId: $scope.tabIndex,
                    //     projectId: $scope.projectId
                    // };
                    // cdrSrv.searchKeyword(params).success(function (res) {
                    //     if (res && res.success) {
                    //         var results = res.data || [];
                    //         $scope.queryAttrList = [];
                    //         angular.forEach(results, function (data) {
                    //             $scope.queryAttrList.push({
                    //                 name: data.title,
                    //                 // group_name: data.title,
                    //                 key: data.field_name
                    //                 // group_key: data.group_key,
                    //                 // val: data.group_key + '.' + data.key
                    //             });
                    //         });
                    //     }
                    // });
                    // console.log("##-->>queryAttrList:" + JSON.stringify($scope.queryAttrList));
                };
            }
        };
    });