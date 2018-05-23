angular.module("search.input",[]).run(["$templateCache",function(e){e.put("search/input/templates/searchInput.html",'<div id="searchWrap" class="searchWrap">\n    <div class="searchInput">\n        <div class="searchPro">\n            <form>\n                <table>\n                    <tr ng-repeat="item in queryProList" search-pro-item search-item="item" search-item-index="$index" search-item-total="queryProList.length"\n                        add-action="addProItem()" delete-action="deleteProItem(item)" config="config"></tr>\n                </table>\n                <div class="text-center">\n                    <button class="btn btn-search" ng-click="execProSearch()">\n                        <i class="ion-ios-search-strong"></i> 搜索</button>\n                    <button class="btn btn-reset" ng-click="resetProSearch()">\n                        <i class="ion-ios-undo"></i> 重置</button>\n                </div>\n            </form>\n        </div>\n    </div>\n</div>'),e.put("search/input/templates/searchProItem.html",'<tr class="form-group">\n    <td class="item-0">\n        <a class="btn btn-default" ng-show="searchItemIndex > 0 && searchItemIndex == searchItemTotal - 1" ng-click="addAction()">+</a>\n    </td>\n    <td class="item-1">\n        <span ng-show="searchItemIndex>0">\n                <ui-select theme="selectize" ng-model="searchItem.logic" title="">\n                    <ui-select-match placeholder="">{{$select.selected.title}}</ui-select-match>\n                    <ui-select-choices repeat="item.val as item in logicList">\n                        <div ng-bind-html="item.title"></div>\n                    </ui-select-choices>\n                </ui-select>\n         </span>\n        <a class="btn btn-default" style="float:right" ng-show="searchItemIndex == 0 && searchItemIndex == searchItemTotal - 1" ng-click="addAction()">+</a>\n    </td>\n    <td class="item-2">\n        <ui-select theme="selectize" ng-model="searchItem.attr" title="输入要搜索的字段">\n            <ui-select-match placeholder="输入要搜索的字段">{{$select.selected.name || $select.selected}}</ui-select-match>\n            <ui-select-choices repeat="item in queryAttrList  track by $index" refresh="searchKeyword($select.search)" refresh-delay="0">\n                <div ng-bind-html="item.name | highlight: $select.search"></div>\n                \x3c!-- <small ng-bind-html="item.group_name | highlight: $select.search "></small> --\x3e\n            </ui-select-choices>\n        </ui-select>\n    </td>\n    <td class="item-3">\n        <ui-select theme="selectize" ng-model="searchItem.operation" title="">\n            <ui-select-match placeholder="">{{$select.selected.title}}</ui-select-match>\n            <ui-select-choices repeat="item.val as item in operationList">\n                <div ng-bind-html="item.title"></div>\n            </ui-select-choices>\n        </ui-select>\n    </td>\n    <td class="item-4">\n        <input ng-model="searchItem.keyword" type="text" />\n    </td>\n    <td class="item-5">\n        <a class="btn btn-default" ng-show="searchItemTotal > 1" ng-click="deleteAction()">-</button>\n    </td>\n</tr>')}]);
angular.module("search.input").directive("searchInput",function(){return{restrict:"EA",templateUrl:"search/input/templates/searchInput.html",replace:!0,scope:{config:"="},controller:["$rootScope","$scope","$element","$attrs","$localStorage",function(r,t,e,o,i){t.config.onClickTab(),t.addProItem=function(){t.queryProList.push({logic:"and",operation:"="})},t.deleteProItem=function(r){var e=t.queryProList.indexOf(r);t.queryProList.splice(e,1)},t.execProSearch=function(){i["queryProList"+t.tabTypetabType]=t.queryProList;var a="";angular.forEach(t.queryProList,function(r,e){if(r.operation&&r.keyword&&r.attr&&r.attr.val){var t="";if(0!=e&&a){if(r.logic){var o=r.logic;"not"==o&&(o=" and "+o),t+=" "+o+" "+r.attr.val}}else t+=" "+r.attr.val;if(t){var i=r.keyword;i="like"==r.operation?"'%"+i+"%'":"'"+i+"'",t+=" "+r.operation+" "+i,a+=t}}});var r={queryLang:a=$.trim(a),queryKeyWord:""};i.execQuery=r,t.config.onClickSearch(r)},t.resetProSearch=function(){t.queryProList=[],t.queryProList.push({logic:"and",operation:"="}),i["queryProList"+t.tabType||""]=t.queryProList},t.config.onClickTab=function(r){i["queryProList"+t.tabType||""]=t.queryProList||[],console.info(JSON.stringify(r)),r&&(t.tabType=r.tabType),t.queryProList=i["queryProList"+t.tabType||""]||[],t.queryProList.length<=0&&t.queryProList.push({logic:"and",operation:"="})}}]}});
angular.module("search.input").directive("searchProItem",function(){return{restrict:"EA",templateUrl:"search/input/templates/searchProItem.html",replace:!0,scope:{addAction:"&",deleteAction:"&",searchItem:"=",searchItemIndex:"=",searchItemTotal:"=",config:"="},controller:["$rootScope","$scope","$element","$attrs",function(t,l,e,i){l.operationList=[{title:"等于",val:"="},{title:"大于",val:">"},{title:"小于",val:"<"},{title:"大于等于",val:">="},{title:"小于等于",val:"<="},{title:"包含",val:"like"}],l.logicList=[{title:"与",val:"and"},{title:"或",val:"or"},{title:"与非",val:"and not"},{title:"或非",val:"or not"}],l.queryAttrList=[],l.searchKeyword=function(e){if(l.config.searchInputField&&0<l.config.searchInputField.length){var t=l.config.searchInputField;t&&0<t.length&&(l.queryAttrList=[],angular.forEach(t,function(t){(!e||e&&-1!=t.name.indexOf(e))&&l.queryAttrList.push(t)}))}}}]}});
