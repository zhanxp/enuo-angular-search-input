angular.module("search.input",[]).run(["$templateCache",function(e){e.put("search/input/templates/searchInput.html",'<div id="searchWrap" class="searchWrap">\n    <div class="searchInput">\n        <div class="searchPro">\n            <form>\n                <table>\n                    <tr ng-repeat="item in queryProList" search-pro search-item-pro="item" search-item-index-pro="$index" search-item-total-pro="queryProList.length"\n                        add-action="addProItem()" delete-action="deleteProItem(item)" config="config"></tr>\n                </table>\n                <div class="text-center">\n                    <button class="btn btn-search" ng-click="execProSearch()">\n                        <i class="ion-ios-search-strong"></i> 搜索</button>\n                    <button class="btn btn-reset" ng-click="resetProSearch()">\n                        <i class="ion-ios-undo"></i> 重置</button>\n                </div>\n            </form>\n        </div>\n    </div>\n</div>'),e.put("search/input/templates/searchPro.html",'<tr class="form-group">\n    <td class="item-0">\n        <a class="btn btn-default" ng-show="searchItemIndexPro > 0 && searchItemIndexPro == searchItemTotalPro - 1" ng-click="addAction()">+</a>\n    </td>\n    <td class="item-1">\n        <span ng-show="searchItemIndexPro>0">\n            <ui-select theme="selectize" ng-model="searchItemPro.logic" title="">\n                <ui-select-match placeholder="">{{$select.selected.title}}</ui-select-match>\n                <ui-select-choices repeat="item.val as item in logicList">\n                    <div ng-bind-html="item.title"></div>\n                </ui-select-choices>\n            </ui-select>\n        </span>\n        <a class="btn btn-default" style="float:right" ng-show="searchItemIndexPro == 0 && searchItemIndexPro == searchItemTotalPro - 1" ng-click="addAction()">+</a>\n    </td>\n    <td>\n        <div class="searchProItem">\n            <table>\n                <tr ng-repeat="item in searchItemPro.items" search-pro-item search-item="item" search-item-index="$index" search-item-total="searchItemPro.items.length"\n                    add-action="addProItem()" delete-action="deleteProItem(item)" config="config"></tr>\n            </table>\n        </div>\n    </td>\n    <td class="item-5">\n        <a class="btn btn-default" ng-show="searchItemTotalPro > 1" ng-click="deleteAction()">-</button>\n    </td>\n</tr>'),e.put("search/input/templates/searchProItem.html",'<tr class="form-group">\n    <td class="item-0">\n        <a class="btn btn-default" ng-show="searchItemIndex > 0 && searchItemIndex == searchItemTotal - 1" ng-click="addAction()">+</a>\n    </td>\n    <td class="item-1">\n        <span ng-show="searchItemIndex>0">\n                <ui-select theme="selectize" ng-model="searchItem.logic" title="">\n                    <ui-select-match placeholder="">{{$select.selected.title}}</ui-select-match>\n                    <ui-select-choices repeat="item.val as item in (config.dbType&&config.dbType==\'mongo\'?logicListMongo:logicList)">\n                        <div ng-bind-html="item.title"></div>\n                    </ui-select-choices>\n                </ui-select>\n         </span>\n        <a class="btn btn-default" style="float:right" ng-show="searchItemIndex == 0 && searchItemIndex == searchItemTotal - 1" ng-click="addAction()">+</a>\n    </td>\n    <td class="item-2">\n        <ui-select theme="selectize" ng-model="searchItem.attr" title="输入要搜索的字段">\n            <ui-select-match placeholder="输入要搜索的字段">{{$select.selected.name || $select.selected}}</ui-select-match>\n            <ui-select-choices repeat="item in queryAttrList  track by $index" refresh="searchKeyword($select.search)" refresh-delay="0">\n                <div ng-bind-html="item.name | highlight: $select.search"></div>\n                <small ng-bind-html="item.remark"></small>\n            </ui-select-choices>\n        </ui-select>\n    </td>\n    <td class="item-3">\n        <ui-select theme="selectize" ng-model="searchItem.operation" title="">\n            <ui-select-match placeholder="">{{$select.selected.title}}</ui-select-match>\n            <ui-select-choices repeat="item.val as item in (config.dbType&&config.dbType==\'mongo\'?operationListMongo:operationList)">\n                <div ng-bind-html="item.title"></div>\n            </ui-select-choices>\n        </ui-select>\n    </td>\n    <td class="item-4">\n        <input ng-model="searchItem.keyword" type="text" />\n    </td>\n    <td class="item-5">\n        <a class="btn btn-default" ng-show="searchItemTotal > 1" ng-click="deleteAction()">-</button>\n    </td>\n</tr>')}]);
angular.module("search.input").directive("searchInput",function(){return{restrict:"EA",templateUrl:"search/input/templates/searchInput.html",replace:!0,scope:{config:"="},controller:["$rootScope","$scope","$element","$attrs","$localStorage",function(e,o,r,i,t){o.addProItem=function(){o.queryProList.push({logic:"and",items:[{logic:"and",operation:"="}]})},o.deleteProItem=function(e){var r=o.queryProList.indexOf(e);o.queryProList.splice(r,1)},o.execProSearch=function(){t["queryProList"+o.config.cacheType||""]=o.queryProList;var f,c="",e={},y=[];angular.forEach(o.queryProList,function(e,r){if(e.operation&&e.attr&&e.attr.val){var o="";if(0!=r&&c){if(e.logic)"not"==(l=e.logic)&&(l=" and "+l),o+=" "+l+" "+e.attr.val}else o+=" "+e.attr.val;if(o){var i=e.operation;if("is not null"==e.operation)i="is not null and "+e.attr.val+" != ''",c+=o+=" "+i;else if("is null"==e.operation)i="is null or "+e.attr.val+" = ''",c+=o+=" "+i;else if(e.keyword){var t=e.keyword;if("like"==e.operation)t="'%"+t+"%'";else if("="==e.operation)if(e.keyword&&-1!=e.keyword.indexOf(",")){var n=e.keyword.split(",");for(var r in t="(",n)t+="'"+n[r]+"'",r!=n.length-1&&(t+=",");t+=")",i="in"}else t="'"+t+"'";else t="'"+t+"'";c+=o+=" "+i+" "+t;var a,l=e.logic||"and",s=e.attr.val;if("="==e.operation)if(e.keyword&&-1!=e.keyword.indexOf(","))a={$in:n=e.keyword.split(",")};else a=e.keyword;else if(">"==e.operation)a={$gt:e.keyword};else if(">="==e.operation)a={$gte:e.keyword};else if("<"==e.operation)a={$lt:e.keyword};else if("<="==e.operation)a={$lte:e.keyword};else if("!="==e.operation){if(e.keyword&&-1!=e.keyword.indexOf(","))a={$nin:n=e.keyword.split(",")};else a={$ne:e.keyword}}else"like"==e.operation&&(a={$regex:e.keyword});if(-1!=l.indexOf("and"))f||(f={}),f[s]=a;else if(-1!=l.indexOf("or")){(n={})[s]=a,y.push(n)}}}}}),f&&y.push(f),0<y.length&&(e.$or=y);var r={query:c=$.trim(c),queryMongo:e,queryKeyWord:""};t.execQuery=r,o.config.onClickSearch(r)},o.execProSearch=function(){t["queryProList"+o.cacheType||""]=o.queryProList;var n="",e={},a=[],l={};angular.forEach(o.queryProList,function(e,r){if(e&&e.items&&0<e.items.length){var f,c="",y=[];angular.forEach(e.items,function(e,r){if(e.operation&&e.attr&&e.attr.val){var o="";if(0!=r&&c){if(e.logic)"not"==(l=e.logic)&&(l=" and "+l),o+=" "+l+" "+e.attr.val}else o+=" "+e.attr.val;if(o){var i=e.operation;if("is not null"==e.operation)i="is not null and "+e.attr.val+" != ''",c+=o+=" "+i;else if("is null"==e.operation)i="is null or "+e.attr.val+" = ''",c+=o+=" "+i;else if(e.keyword){var t=e.keyword;if("like"==e.operation)t="'%"+t+"%'";else if("="==e.operation)if(e.keyword&&-1!=e.keyword.indexOf(",")){var n=e.keyword.split(",");for(var r in t="(",n)t+="'"+n[r]+"'",r!=n.length-1&&(t+=",");t+=")",i="in"}else t="'"+t+"'";else t="'"+t+"'";c+=o+=" "+i+" "+t;var a,l=e.logic||"and",s=e.attr.val;if("="==e.operation)if(e.keyword&&-1!=e.keyword.indexOf(","))a={$in:n=e.keyword.split(",")};else a=e.keyword;else if(">"==e.operation)a={$gt:e.keyword};else if(">="==e.operation)a={$gte:e.keyword};else if("<"==e.operation)a={$lt:e.keyword};else if("<="==e.operation)a={$lte:e.keyword};else if("!="==e.operation){if(e.keyword&&-1!=e.keyword.indexOf(","))a={$nin:n=e.keyword.split(",")};else a={$ne:e.keyword}}else"like"==e.operation&&(a={$regex:e.keyword});if(-1!=l.indexOf("and"))f||(f={}),f[s]=a;else if(-1!=l.indexOf("or")){(n={})[s]=a,y.push(n)}}}}}),c&&(n?e.logic&&(n+=" "+e.logic+" ("+c+")"):n="("+c+")");var o=e.logic||"and";if(f)if("and"==o)for(var i in f)l[i]=f[i];else y.push(f);if(0<y.length)if("and"==o);else for(var t in y)a.push(y[t])}}),l&&a.push(l),0<a.length&&(e.$or=a);var r={query:n=$.trim(n),queryMongo:e,queryKeyWord:o.queryProList};t.execQuery=r,o.config.onClickSearch(r)},o.resetProSearch=function(){o.queryProList=[],o.queryProList.push({logic:"and",items:[{logic:"and",operation:"="}]}),t["queryProList"+o.cacheType||""]=o.queryProList},o.config.onClickTab=function(e){e&&(t["queryProList"+o.config.cacheType||""]=o.queryProList||[],o.config.cacheType=e.cacheType),o.queryProList=t["queryProList"+o.config.cacheType||""]||[],o.queryProList.length<=0&&o.queryProList.push({logic:"and",items:[{logic:"and",operation:"="}]})},o.config.onClickTab()}]}});
angular.module("search.input").directive("searchProItem",function(){return{restrict:"EA",templateUrl:"search/input/templates/searchProItem.html",replace:!0,scope:{addAction:"&",deleteAction:"&",searchItem:"=",searchItemIndex:"=",searchItemTotal:"=",config:"="},controller:["$rootScope","$scope","$element","$attrs",function(t,l,e,i){l.operationList=[{title:"等于",val:"="},{title:"大于",val:">"},{title:"小于",val:"<"},{title:"大于等于",val:">="},{title:"小于等于",val:"<="},{title:"包含",val:"like"},{title:"不为空",val:"is not null"},{title:"为空",val:"is null"}],l.operationListMongo=[{title:"等于",val:"="},{title:"大于",val:">"},{title:"小于",val:"<"},{title:"大于等于",val:">="},{title:"小于等于",val:"<="},{title:"包含",val:"like"},{title:"不等于",val:"!="}],l.logicList=[{title:"与",val:"and"},{title:"或",val:"or"},{title:"与非",val:"and not"},{title:"或非",val:"or not"}],l.logicListMongo=[{title:"与",val:"and"},{title:"或",val:"or"}],l.queryAttrList=[],l.searchKeyword=function(e){if(l.config.searchInputField&&0<l.config.searchInputField.length){var t=l.config.searchInputField;t&&0<t.length&&(l.queryAttrList=[],angular.forEach(t,function(t){(!e||e&&-1!=t.name.indexOf(e))&&l.queryAttrList.push(t)}))}}}]}});
angular.module("search.input").directive("searchPro",function(){return{restrict:"EA",templateUrl:"search/input/templates/searchPro.html",replace:!0,scope:{addAction:"&",deleteAction:"&",searchItemPro:"=",searchItemIndexPro:"=",searchItemTotalPro:"=",config:"="},controller:["$rootScope","$scope","$element","$attrs",function(e,r,t,o){r.logicList=[{title:"与",val:"and"},{title:"或",val:"or"}],r.addProItem=function(){r.searchItemPro.items.push({logic:"and",operation:"="})},r.deleteProItem=function(e){var t=r.searchItemPro.items.indexOf(e);r.searchItemPro.items.splice(t,1)}}]}});