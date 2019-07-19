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
                $scope.addProItem = function () {
                    $scope.queryProList.push({
                        logic: 'and',
                        items: [{
                            logic: 'and',
                            operation: '='
                        }]
                    });
                };

                $scope.deleteProItem = function (item) {
                    var index = $scope.queryProList.indexOf(item);
                    $scope.queryProList.splice(index, 1);
                };

                // v2.0.0
                $scope.execProSearch = function () {
                    if ($scope.config.debug) {
                        console.info("##-->>execProSearch();" + JSON.stringify($scope.queryProList));
                    }
                    $localStorage["queryProList" + $scope.config.cacheType || ""] = $scope.queryProList;
                    var queryLangPro = '';
                    var queryMongo = {};
                    var queryMongoOr = [];
                    var queryMongoAnd = [];
                    angular.forEach($scope.queryProList, function (data, index) {
                        if (data && data.items && data.items.length > 0) {
                            var queryLang = '';
                            var _queryMongo = {};
                            var queryOr = [];
                            var queryAnd = [];
                            angular.forEach(data.items, function (data, index) {
                                if (data.operation && data.attr && data.attr.val) {
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
                                        var operation = data.operation;
                                        if (data.operation == "is not null") {
                                            operation = "is not null and " + data.attr.val + " != ''";
                                            item += ' ' + operation;
                                            queryLang += item;
                                        } else if (data.operation == "is null") {
                                            operation = "is null or " + data.attr.val + " = ''";
                                            item += ' ' + operation;
                                            queryLang += item;
                                        } else if (data.keyword) {
                                            var keyword = data.keyword;
                                            if (data.operation == "like") {
                                                keyword = "'%" + keyword + "%'";
                                            } else if (data.operation == "=") {
                                                if (data.keyword && data.keyword.constructor === String && data.keyword.indexOf(",") != -1) {
                                                    var _temp = data.keyword.split(",");
                                                    keyword = "("
                                                    for (var index in _temp) {
                                                        keyword += "'" + _temp[index] + "'";
                                                        if (index != _temp.length - 1) {
                                                            keyword += ","
                                                        }
                                                    }
                                                    keyword += ")"
                                                    operation = "in";
                                                } else {
                                                    keyword = "'" + keyword + "'";
                                                }
                                            } else {
                                                keyword = "'" + keyword + "'";
                                            }
                                            item += ' ' + operation + ' ' + keyword;
                                            queryLang += item;
                                            // ---------------------------Mongo
                                            var logic = data.logic || "and";
                                            var key = data.attr.val;
                                            var value;
                                            if (data.operation == "=") {
                                                if (data.keyword && data.keyword.constructor === String && data.keyword.indexOf(",") != -1) {
                                                    var _temp = data.keyword.split(",");
                                                    value = { $in: _temp };
                                                } else {
                                                    value = data.keyword;
                                                }
                                            } else if (data.operation == ">") {
                                                value = { $gt: data.keyword };
                                            } else if (data.operation == ">=") {
                                                value = { $gte: data.keyword };
                                            } else if (data.operation == "<") {
                                                value = { $lt: data.keyword };
                                            } else if (data.operation == "<=") {
                                                value = { $lte: data.keyword };
                                            } else if (data.operation == "!=") {
                                                if (data.keyword && data.keyword.constructor === String && data.keyword.indexOf(",") != -1) {
                                                    var _temp = data.keyword.split(",");
                                                    value = { $nin: _temp };
                                                } else {
                                                    value = { $ne: data.keyword };
                                                }
                                            } else if (data.operation == "like") {
                                                value = { $regex: data.keyword };
                                            }
                                            if (logic.indexOf("and") != -1) {
                                                var _temp = {};
                                                _temp[key] = value;
                                                queryAnd.push(_temp);
                                            } else if (logic.indexOf("or") != -1) {
                                                var _temp = {};
                                                _temp[key] = value;
                                                queryOr.push(_temp);
                                            }
                                        }
                                    }
                                }
                            });
                            if (queryLang) {
                                if (queryLangPro) {
                                    if (data.logic) {
                                        queryLangPro += ' ' + data.logic + ' (' + queryLang + ")";
                                    }
                                } else {
                                    queryLangPro = "(" + queryLang + ")";
                                }
                            }
                            if (queryAnd.length > 0 || queryOr.length > 0) {
                                if (!_queryMongo["$or"]) {
                                    _queryMongo["$or"] = [];
                                }
                                if (queryOr.length > 0) {
                                    _queryMongo["$or"] = queryOr;
                                }
                                if (queryAnd.length > 0) {
                                    _queryMongo["$or"].push({
                                        "$and": queryAnd
                                    });
                                }
                                var logic = data.logic || "and";
                                if (!queryMongo["$or"]) {
                                    queryMongo["$or"] = [];
                                }
                                if (logic == "and") {
                                    queryMongoAnd.push(_queryMongo);
                                } else {
                                    queryMongo["$or"].push(_queryMongo);
                                }
                            }
                        }
                    });
                    if (queryMongoAnd.length > 0) {
                        queryMongo["$or"].push({
                            "$and": queryMongoAnd
                        });
                    }
                    queryLangPro = $.trim(queryLangPro);
                    var execQuery = {
                        query: queryLangPro,
                        queryMongo: queryMongo,
                        queryKeyWord: $scope.queryProList
                    };
                    $scope.config.onClickSearch(execQuery);
                };

                $scope.resetProSearch = function () {
                    $scope.queryProList = [];
                    $scope.queryProList.push({
                        logic: 'and',
                        items: [{
                            logic: 'and',
                            operation: '='
                        }]
                    });
                    $localStorage["queryProList" + $scope.config.cacheType || ""] = $scope.queryProList;
                };

                $scope.config.onClickTab = function (params) {
                    if (params) {
                        $localStorage["queryProList" + $scope.config.cacheType || ""] = $scope.queryProList || [];
                        $scope.config.cacheType = params.cacheType;
                    }
                    $scope.queryProList = $localStorage["queryProList" + $scope.config.cacheType || ""] || [];
                    if ($scope.config.debug) {
                        console.info("##-->>onClickTab();" + JSON.stringify($scope.queryProList));
                    }
                    if ($scope.queryProList.length <= 0) {
                        $scope.queryProList.push({
                            logic: 'and',
                            items: [{
                                logic: 'and',
                                operation: '='
                            }]
                        });
                    }
                };
                $scope.config.onClickTab();
            }
        };
    });