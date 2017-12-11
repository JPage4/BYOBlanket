angular
.module("BYOBlanket")
.controller("detailController",
    function ($scope, $location, $routeParams, napSpaceFactory, $timeout) {
        $scope.spaces = {}

        var map = new google.maps.Map(document.getElementById("map"), {
            zoom: 12,
            center: {lat: 36.1627, lng: 86.7816}
            });

        napSpaceFactory.single($routeParams.napSpaceID).then(napSpace => {
            console.log(napSpace)
            $timeout()
            $scope.napSpace = napSpace
            napSpaceFactory.geocodeAddress(napSpace.address, map)
        })
        $timeout(() => {
        }, 100)
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