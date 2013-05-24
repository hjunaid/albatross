/**
 * @author: Junaid Malik
 */
'use strict'
angular.module('albatross', ['ui.bootstrap','ui.bootstrap.tooltip']).config(function($routeProvider) {
    $routeProvider.
        when('/demos/relationalmap/basic', {controller:'BasicRelationalMapCtrl', templateUrl:'partials/demos/relationalmap/relationalmap.html'}).
        when('/demos/relationalmap/diagonal', {controller:'DiagonalRelationalMapCtrl', templateUrl:'partials/demos/relationalmap/relationalmap.html'}).
        when('/demos/relationalmap/api', {controller:'ApiRelationalMapCtrl', templateUrl:'partials/demos/relationalmap/relationalmap.html'}).
        otherwise({redirectTo:'/demos/relationalmap/basic'});
});
angular.module('albatross').controller('MainController', ['$scope','$rootScope','$location',function($scope, $rootScope,$location){
    $scope.sideBarActive= function(path){
        var pathRegExp = new RegExp('\/'+path+'$');
        return pathRegExp.test($location.path());
    }

}]);

