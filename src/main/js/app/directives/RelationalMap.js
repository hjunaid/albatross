/**
 * User:  Junaid Malik
 */
'use strict'
angular.module('albatross').directive('relationalMap', function () {
    return {
        restrict : 'A',
        scope :{
          items : '=aItems',
          diagonal :'=aDiagonal',
          statusData :'=aStatusData'
        },
        link : function (scope, element, attrs ) {
            var config = {
                elementId : element.attr('id'),
                styles : {
                    itemDimension : 50
                },
                multiSelect : false,
                diagonal : scope.diagonal,
                data : {
                    xDataProvider :scope.items.xDataProvider,
                    yDataProvider : scope.items.yDataProvider
                },
                click : onClick,
                select : onSelect
            };

            function onClick(data, e) {
//                $('#events').append($("<li></li>").text("On Click Event :: " + data.xData.field +" : "+data.yData.field));
            }

            function onSelect(data,e) {
//                $('#events').append($("<li></li>").text("On Select :: " + data.xData.field +" : "+data.yData.field));
            }

            var relMap = new albatross.relationalMap(config);

            scope.$watch('statusData', function (data) {
                 if(!!data){
                    relMap.updateStatusData(data);
                 }
            });
        }
    }
});
