angular
.module("BYOBlanket")
.controller("detailController",
    function ($scope, $location, $routeParams, napSpaceFactory) {
        $scope.napSpace = {}

        // napSpaceFactory.single($routeParams.napSpaceID).then(napSpace => {
        //     $scope.napSpace = napSpace
        // })
        // // ng-click button edit HOW TO ONLY ALLOW EDITING BY OWNER??
        // $scope.editNapSpace = () => {
        //     napSpaceFactory.edit($scope.napSpace, $routeParams.napSpaceID).then(() =>
        //     $location.url("/napSpace/list"));
        // }
        // // ng-click button delete HOW TO ONLY ALLOW DELETING BY OWNER??
        // $scope.deleteNapSpace = () => {
        // napSpaceFactory.delete($routeParams.napSpaceID).then(() =>
        //     $location.url("/napSpace/list"));
        // }
    }
)