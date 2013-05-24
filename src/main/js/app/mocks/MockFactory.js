angular.module('albatross').factory('mockFactory', [function () {
    var mocks = {};
    mocks.getDummyData = function (count, title) {
        var result = [];
        for (var i = 0; i < count; i++) {
            result.push({field : title + i, title : title + " " + i});
        }
        return result;
    }

    mocks.getRandomStatusData = function(xData, yData){
        var result = {};
        for (var i = 0; i < xData.length; i++) {
            var xItem = xData[i];
            for (var j = 0; j < yData.length; j++) {
                var yItem = yData[j];
                var obj = result[xItem.field] || {};
                obj[yItem.field] = {};
                obj[yItem.field].className = getRandomClass();
                result[xItem.field] = obj;
            }
        }

        function getRandomClass(){
            var num = Math.floor(Math.random() * 6) + 1;
            switch(num)
            {
                case 1:
                    return "item-red";
                    break;
                case 2:
                    return "item-green";
                    break;
                case 3:
                    return "item-yellow";
                    break;
                case 4:
                    return "item-orange";
                    break;
                default:
                    return "item-grey";
            }
        }
        return result;
    }

    return mocks;
}]);

