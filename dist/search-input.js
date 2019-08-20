angular.module("search.input",[]).run(["$templateCache",function(e){e.put("search/input/templates/searchInput.html",'<div id="searchWrap" class="searchWrap">\n    <div class="searchInput">\n        <div class="searchPro">\n            <form>\n                <table>\n                    <tr ng-repeat="item in queryProList" search-pro search-item-pro="item" search-item-index-pro="$index" search-item-total-pro="queryProList.length"\n                        add-action="addProItem()" delete-action="deleteProItem(item)" config="config"></tr>\n                </table>\n                <div class="text-center">\n                    <button class="btn btn-search" ng-click="execProSearch()" style="box-shadow:1px 1px 5px #ccc;">\n                        <i class="ion-ios-search-strong"></i> 搜索</button>\n                    <button class="btn btn-reset" ng-click="resetProSearch()" style="box-shadow:1px 1px 5px #ccc;">\n                        <i class="ion-ios-undo"></i> 重置</button>\n                </div>\n            </form>\n        </div>\n    </div>\n</div>'),e.put("search/input/templates/searchPro.html",'<tr class="form-group">\n    <td ng-if="!config.isOne" class="item-0">\n        <div class="searchProItem2">\n            <a class="text-green btn btn-add icon ion-plus-round" ng-show="searchItemIndexPro > 0 && searchItemIndexPro == searchItemTotalPro - 1"\n                ng-click="addAction()" style="box-shadow:1px 1px 5px #ccc;"></a>\n        </div>\n    </td>\n    <td ng-if="!config.isOne" class="item-1">\n        <div class="searchProItem2">\n            <span ng-show="searchItemIndexPro>0">\n                <ui-select theme="selectize" ng-model="searchItemPro.logic" title="">\n                    <ui-select-match placeholder="">{{$select.selected.title}}</ui-select-match>\n                    <ui-select-choices repeat="item.val as item in logicList">\n                        <div>{{item.title}}</div>\n                    </ui-select-choices>\n                </ui-select>\n            </span>\n        </div>\n        <a class="text-green btn btn-add icon ion-plus-round" style="float:right;box-shadow:1px 1px 5px #ccc;" ng-show="searchItemIndexPro == 0 && searchItemIndexPro == searchItemTotalPro - 1"\n            ng-click="addAction()"></a>\n    </td>\n    <td>\n        <div class="searchProItem">\n            <table>\n                <tr ng-repeat="item in searchItemPro.items" search-pro-item search-item="item" search-item-index="$index" search-item-total="searchItemPro.items.length"\n                    add-action="addProItem()" delete-action="deleteProItem(item)" config="config"></tr>\n            </table>\n        </div>\n    </td>\n    <td ng-if="!config.isOne" class="item-5">\n        <div class="searchProItem2">\n            <a class="text-red btn btn-add icon ion-close-round" ng-show="searchItemTotalPro > 1" ng-click="deleteAction()" style="box-shadow:1px 1px 5px #ccc;"></a>\n        </div>\n    </td>\n</tr>'),e.put("search/input/templates/searchProItem.html",'<tr class="form-group">\n    <td class="item-0">\n        <a class="btn btn-add icon ion-android-add" ng-show="searchItemIndex > 0 && searchItemIndex == searchItemTotal - 1" ng-click="addAction()"></a>\n    </td>\n    <td class="item-1">\n        <span ng-show="searchItemIndex>0">\n            <ui-select theme="selectize" ng-model="searchItem.logic" title="">\n                <ui-select-match placeholder="">{{$select.selected.title}}</ui-select-match>\n                <ui-select-choices repeat="item.val as item in (config.dbType&&config.dbType==\'mongo\'?logicListMongo:logicList)">\n                    <div bind-html-compile="item.title"></div>\n                    \x3c!-- <div>{{item.title}}</div> --\x3e\n                </ui-select-choices>\n            </ui-select>\n        </span>\n        <a class="btn btn-add icon ion-android-add" style="float:right" ng-show="searchItemIndex == 0 && searchItemIndex == searchItemTotal - 1"\n            ng-click="addAction()"></a>\n    </td>\n    <td class="item-2">\n        <ui-select theme="selectize" ng-model="searchItem.attr" title="输入要搜索的字段" on-select="fnSelect($item, $model)">\n            <ui-select-match placeholder="输入要搜索的字段">{{$select.selected.name || $select.selected}}</ui-select-match>\n            <ui-select-choices repeat="item in queryAttrList  track by $index" refresh="searchKeyword($select.search)" refresh-delay="0">\n                <div bind-html-compile="item.name | highlight: $select.search"></div>\n                <small bind-html-compile="item.remark"></small>\n            </ui-select-choices>\n        </ui-select>\n    </td>\n    <td class="item-3">\n        <ui-select theme="selectize" ng-model="searchItem.operation" title="">\n            <ui-select-match placeholder="">{{$select.selected.title}}</ui-select-match>\n            <ui-select-choices repeat="item.val as item in (config.dbType&&config.dbType==\'mongo\'?operationListMongo:operationList)">\n                <div>{{item.title}}</div>\n            </ui-select-choices>\n        </ui-select>\n    </td>\n    <td class="item-4">\n        <input ng-show="searchItem.attr && !searchItem.attr.type && (!searchItem.attr.items || searchItem.attr.items.length == 0)" ng-model="searchItem.keyword" type="text" style="height:30px;padding-bottom:2px;" />\n        <div ng-show="searchItem.attr && searchItem.attr.type && (searchItem.attr.type == \'date\' || searchItem.attr.type == \'timestamp\')" class="has-feedback">\n            <input class=\'form-control\' ng-click="startDateOpened=true" is-open="startDateOpened" uib-datepicker-popup datepicker-options="dateOptions"\n                ng-model="searchItem.keyword_date" ng-value="searchItem.keyword_date_value" placeholder="" type="text" style="height:30px;padding-bottom:2px;"\n            />\n            <span class="glyphicon glyphicon-calendar form-control-feedback"></span>\n        </div>\n        <ui-select ng-show="searchItem.attr && !searchItem.attr.type && searchItem.attr.items && searchItem.attr.items.length > 0" theme="selectize" ng-model="searchItem.keyword" title="">\n            <ui-select-match placeholder="">{{$select.selected.name}}</ui-select-match>\n            <ui-select-choices repeat="item.val as item in searchItem.attr.items">\n                <div bind-html-compile="item.name"></div>\n            </ui-select-choices>\n        </ui-select>\n        <input ng-show="searchItem.attr && searchItem.attr.type && searchItem.attr.type == \'number\'" ng-model="searchItem.keyword_number" type="number" style="height:30px;padding-bottom:2px;"/>\n    </td>\n    <td class="item-5">\n        <a class="text-red btn btn-add icon ion-android-remove" ng-show="searchItemTotal > 1" ng-click="deleteAction()"></a>\n    </td>\n</tr>')}]);
angular.module("search.input").directive("searchInput",function(){return{restrict:"EA",templateUrl:"search/input/templates/searchInput.html",replace:!0,scope:{config:"="},controller:["$rootScope","$scope","$element","$attrs","$localStorage",function(e,r,o,i,l){r.addProItem=function(){r.queryProList.push({logic:"and",items:[{logic:"and",operation:"="}]})},r.deleteProItem=function(e){var o=r.queryProList.indexOf(e);r.queryProList.splice(o,1)},r.execProSearch=function(){r.config.debug&&console.info("##--\x3e>execProSearch();"+JSON.stringify(r.queryProList)),l["queryProList"+r.config.cacheType||""]=r.queryProList;var t="",n={},a=[];angular.forEach(r.queryProList,function(e,o){if(e&&e.items&&0<e.items.length){var s="",r={},u=[],f=[];if(angular.forEach(e.items,function(e,o){if(e.operation&&e.attr&&e.attr.val){var r="";if(0!=o&&s){if(e.logic)"not"==(l=e.logic)&&(l=" and "+l),r+=" "+l+" "+e.attr.val}else r+=" "+e.attr.val;if(r){var i=e.operation;if("is not null"==e.operation)i="is not null and "+e.attr.val+" != ''",s+=r+=" "+i;else if("is null"==e.operation)i="is null or "+e.attr.val+" = ''",s+=r+=" "+i;else if(e.keyword){var t=e.keyword;if("like"==e.operation)t="'%"+t+"%'";else if("="==e.operation)if(e.keyword&&e.keyword.constructor===String&&-1!=e.keyword.indexOf(",")){var n=e.keyword.split(",");for(var o in t="(",n)t+="'"+n[o]+"'",o!=n.length-1&&(t+=",");t+=")",i="in"}else t="'"+t+"'";else t="'"+t+"'";s+=r+=" "+i+" "+t;var a,l=e.logic||"and",c=e.attr.val;if("="==e.operation)if(e.keyword&&e.keyword.constructor===String&&-1!=e.keyword.indexOf(","))a={$in:n=e.keyword.split(",")};else a=e.keyword;else if(">"==e.operation)a={$gt:e.keyword};else if(">="==e.operation)a={$gte:e.keyword};else if("<"==e.operation)a={$lt:e.keyword};else if("<="==e.operation)a={$lte:e.keyword};else if("!="==e.operation){if(e.keyword&&e.keyword.constructor===String&&-1!=e.keyword.indexOf(","))a={$nin:n=e.keyword.split(",")};else a={$ne:e.keyword}}else"like"==e.operation&&(a={$regex:e.keyword});if(-1!=l.indexOf("and"))(n={})[c]=a,f.push(n);else if(-1!=l.indexOf("or")){(n={})[c]=a,u.push(n)}}}}}),s&&(t?e.logic&&(t+=" "+e.logic+" ("+s+")"):t="("+s+")"),0<f.length||0<u.length){r.$or||(r.$or=[]),0<u.length&&(r.$or=u),0<f.length&&r.$or.push({$and:f});var i=e.logic||"and";n.$or||(n.$or=[]),"and"==i?a.push(r):n.$or.push(r)}}}),0<a.length&&n.$or.push({$and:a});var e={query:t=$.trim(t),queryMongo:n,queryKeyWord:r.queryProList};r.config.onClickSearch(e)},r.resetProSearch=function(){r.queryProList=[],r.queryProList.push({logic:"and",items:[{logic:"and",operation:"="}]}),l["queryProList"+r.config.cacheType||""]=r.queryProList},r.config.onClickTab=function(e){e&&(l["queryProList"+r.config.cacheType||""]=r.queryProList||[],r.config.cacheType=e.cacheType),r.queryProList=l["queryProList"+r.config.cacheType||""]||[],r.config.debug&&console.info("##--\x3e>onClickTab();"+JSON.stringify(r.queryProList)),r.queryProList.length<=0&&r.queryProList.push({logic:"and",items:[{logic:"and",operation:"="}]})},r.config.onClickTab()}]}});
angular.module("search.input").directive("searchProItem",function(){return{restrict:"EA",templateUrl:"search/input/templates/searchProItem.html",replace:!0,scope:{addAction:"&",deleteAction:"&",searchItem:"=",searchItemIndex:"=",searchItemTotal:"=",config:"="},controller:["$rootScope","$scope","$element","$attrs","$filter",function(e,a,t,r,l){a.operationList=[{title:"等于",val:"="},{title:"大于",val:">"},{title:"小于",val:"<"},{title:"大于等于",val:">="},{title:"小于等于",val:"<="},{title:"包含",val:"like"},{title:"不为空",val:"is not null"},{title:"为空",val:"is null"}],a.operationListMongo=[{title:"等于",val:"="},{title:"大于",val:">"},{title:"小于",val:"<"},{title:"大于等于",val:">="},{title:"小于等于",val:"<="},{title:"包含",val:"like"},{title:"不等于",val:"!="}],a.logicList=[{title:"与",val:"and"},{title:"或",val:"or"},{title:"与非",val:"and not"},{title:"或非",val:"or not"}],a.logicListMongo=[{title:"与",val:"and"},{title:"或",val:"or"}],a.queryAttrList=[],a.searchKeyword=function(t){if(a.config.searchInputField&&0<a.config.searchInputField.length){var e=a.config.searchInputField;e&&0<e.length&&(a.queryAttrList=[],angular.forEach(e,function(e){(!t||t&&-1!=e.name.indexOf(t))&&a.queryAttrList.push(e)}))}},a.fnSelect=function(e,t){a.searchItem.keyword="",a.searchItem.keyword_date="",a.searchItem.keyword_number=""},a.$watchCollection("searchItem",function(e,t){a.searchItem.attr&&a.searchItem.attr.type&&("date"==a.searchItem.attr.type&&(a.searchItem.keyword_date_value=a.searchItem.keyword_date?l("date")(a.searchItem.keyword_date,"yyyy-MM-dd"):"",a.searchItem.keyword=a.searchItem.keyword_date_value),"number"==a.searchItem.attr.type&&(a.searchItem.keyword=a.searchItem.keyword_number),"timestamp"==a.searchItem.attr.type&&(a.searchItem.keyword_date_value=a.searchItem.keyword_date?l("date")(a.searchItem.keyword_date,"yyyy-MM-dd"):"",a.searchItem.keyword=a.searchItem.keyword_date?new Date(a.searchItem.keyword_date).getTime():""))})}]}});
angular.module("search.input").directive("bindHtmlCompile",["$compile",function(c){return{restrict:"A",link:function(i,e,l){i.$watch(function(){return i.$eval(l.bindHtmlCompile)},function(n){e.html(n&&n.toString());var t=i;l.bindHtmlScope&&(t=i.$eval(l.bindHtmlScope)),c(e.contents())(t)})}}}]);
angular.module("search.input").directive("searchPro",function(){return{restrict:"EA",templateUrl:"search/input/templates/searchPro.html",replace:!0,scope:{addAction:"&",deleteAction:"&",searchItemPro:"=",searchItemIndexPro:"=",searchItemTotalPro:"=",config:"="},controller:["$rootScope","$scope","$element","$attrs",function(e,r,t,o){r.logicList=[{title:"与",val:"and"},{title:"或",val:"or"}],r.addProItem=function(){r.searchItemPro.items.push({logic:"and",operation:"="})},r.deleteProItem=function(e){var t=r.searchItemPro.items.indexOf(e);r.searchItemPro.items.splice(t,1)}}]}});