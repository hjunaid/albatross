/**
 * @author: Junaid Malik
 */
'use strict'
angular.module('albatross').controller('DiagonalRelationalMapCtrl',
    ['$scope', 'mockFactory','relmapDocs', function ($scope, mockFactory,relmapDocs) {

        $scope.items = {
            xDataProvider : mockFactory.getDummyData(5, "A"),
            yDataProvider : mockFactory.getDummyData(5, "M")
        }

        $scope.diagonal = true;

        $scope.docPage = relmapDocs;
        $scope.codeSnippetId = "diagonalCode";
    }]);