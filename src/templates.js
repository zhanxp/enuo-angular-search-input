angular.module('search.input', []).run(['$templateCache', function($templateCache) {$templateCache.put('search/input/templates/searchInput.html','<div id="searchWrap" class="searchWrap">\n    <div class="searchInput">\n        <div class="searchPro">\n            <form>\n                <table>\n                    <tr ng-repeat="item in queryProList" search-pro search-item-pro="item" search-item-index-pro="$index" search-item-total-pro="queryProList.length"\n                        add-action="addProItem()" delete-action="deleteProItem(item)" config="config"></tr>\n                </table>\n                <div class="text-center">\n                    <button class="btn btn-search" ng-click="execProSearch()">\n                        <i class="ion-ios-search-strong"></i> \u641C\u7D22</button>\n                    <button class="btn btn-reset" ng-click="resetProSearch()">\n                        <i class="ion-ios-undo"></i> \u91CD\u7F6E</button>\n                </div>\n            </form>\n        </div>\n    </div>\n</div>');
$templateCache.put('search/input/templates/searchPro.html','<tr class="form-group">\n    <td class="item-0">\n        <div class="searchProItem2">\n            <a class="btn btn-default" ng-show="searchItemIndexPro > 0 && searchItemIndexPro == searchItemTotalPro - 1" ng-click="addAction()">+</a>\n        </div>\n    </td>\n    <td class="item-1">\n        <div class="searchProItem2">\n            <span ng-show="searchItemIndexPro>0">\n                <ui-select theme="selectize" ng-model="searchItemPro.logic" title="">\n                    <ui-select-match placeholder="">{{$select.selected.title}}</ui-select-match>\n                    <ui-select-choices repeat="item.val as item in logicList">\n                        <div ng-bind-html="item.title"></div>\n                    </ui-select-choices>\n                </ui-select>\n            </span>\n            <a class="btn btn-default" style="float:right" ng-show="searchItemIndexPro == 0 && searchItemIndexPro == searchItemTotalPro - 1"\n                ng-click="addAction()">+</a>\n        </div>\n    </td>\n    <td>\n        <div class="searchProItem">\n            <table>\n                <tr ng-repeat="item in searchItemPro.items" search-pro-item search-item="item" search-item-index="$index" search-item-total="searchItemPro.items.length"\n                    add-action="addProItem()" delete-action="deleteProItem(item)" config="config"></tr>\n            </table>\n        </div>\n    </td>\n    <td class="item-5">\n        <div class="searchProItem2">\n            <a class="btn btn-default" ng-show="searchItemTotalPro > 1" ng-click="deleteAction()">-</a>\n        </div>\n    </td>\n</tr>');
$templateCache.put('search/input/templates/searchProItem.html','<tr class="form-group">\n    <td class="item-0">\n        <a class="btn btn-default" ng-show="searchItemIndex > 0 && searchItemIndex == searchItemTotal - 1" ng-click="addAction()">+</a>\n    </td>\n    <td class="item-1">\n        <span ng-show="searchItemIndex>0">\n                <ui-select theme="selectize" ng-model="searchItem.logic" title="">\n                    <ui-select-match placeholder="">{{$select.selected.title}}</ui-select-match>\n                    <ui-select-choices repeat="item.val as item in (config.dbType&&config.dbType==\'mongo\'?logicListMongo:logicList)">\n                        <div ng-bind-html="item.title"></div>\n                    </ui-select-choices>\n                </ui-select>\n         </span>\n        <a class="btn btn-default" style="float:right" ng-show="searchItemIndex == 0 && searchItemIndex == searchItemTotal - 1" ng-click="addAction()">+</a>\n    </td>\n    <td class="item-2">\n        <ui-select theme="selectize" ng-model="searchItem.attr" title="\u8F93\u5165\u8981\u641C\u7D22\u7684\u5B57\u6BB5">\n            <ui-select-match placeholder="\u8F93\u5165\u8981\u641C\u7D22\u7684\u5B57\u6BB5">{{$select.selected.name || $select.selected}}</ui-select-match>\n            <ui-select-choices repeat="item in queryAttrList  track by $index" refresh="searchKeyword($select.search)" refresh-delay="0">\n                <div ng-bind-html="item.name | highlight: $select.search"></div>\n                <small ng-bind-html="item.remark"></small>\n            </ui-select-choices>\n        </ui-select>\n    </td>\n    <td class="item-3">\n        <ui-select theme="selectize" ng-model="searchItem.operation" title="">\n            <ui-select-match placeholder="">{{$select.selected.title}}</ui-select-match>\n            <ui-select-choices repeat="item.val as item in (config.dbType&&config.dbType==\'mongo\'?operationListMongo:operationList)">\n                <div ng-bind-html="item.title"></div>\n            </ui-select-choices>\n        </ui-select>\n    </td>\n    <td class="item-4">\n        <input ng-model="searchItem.keyword" type="text" />\n    </td>\n    <td class="item-5">\n        <a class="btn btn-default" ng-show="searchItemTotal > 1" ng-click="deleteAction()">-</button>\n    </td>\n</tr>');}]);