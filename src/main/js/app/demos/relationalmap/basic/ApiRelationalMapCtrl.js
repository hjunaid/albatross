/**
 * @author: Junaid Malik
 */
'use strict'
angular.module('albatross').controller('ApiRelationalMapCtrl',
    ['$scope', 'mockFactory', '$window','relmapDocs', function ($scope, mockFactory, $window,relmapDocs) {

        $scope.items = {
            xDataProvider : mockFactory.getDummyData(5, "A"),
            yDataProvider : mockFactory.getDummyData(5, "M")
        }

        $scope.diagonal = false;
        var id = $window.setInterval(updateData, 2000);

        function updateData() {
            $scope.statusData = mockFactory.getRandomStatusData($scope.items.xDataProvider, $scope.items.yDataProvider);
            if (!$scope.$$phase) {
                $scope.$apply();
            }
        }

        updateData();

        $scope.$on('$destroy', function iVeBeenDismissed() {
            $window.clearInterval(id);
            $scope = null;
        })

        $scope.docPage = relmapDocs;

        $scope.codeSnippetId = "apiCode";
    }]);