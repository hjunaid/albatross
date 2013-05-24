/**
 * @author: Junaid Malik
 */
'use strict'

angular.module('albatross').directive('codeDoc', function () {
    return {
        restrict : 'A',
        scope:{
            items : "="
        },
        template:'<div ng-repeat="item in items"><h6 class="doc-item-name">{{item.name}}</h6> <h7 class="doc-item-type">{{item.type}}<span ng-show="item.defaultValue.length>0"> (default : {{item.defaultValue}})</span></h7>'+
            '<p>{{item.text}}</p></div><hr>',
        link : function (scope, element, attrs) {

        }
    }
});