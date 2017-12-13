angular
    .module("BYOBlanket")
    .controller("detailController",
    function ($scope, $location, $routeParams, napSpaceFactory, $timeout) {
        $scope.spaces = {}

        var map = new google.maps.Map(document.getElementById("map"), {
            zoom: 12,
            center: { lat: 36.1627, lng: 86.7816 }
        });

        napSpaceFactory.single($routeParams.napSpaceID).then(napSpace => {
            console.log(napSpace)
            $timeout()
            $scope.napSpace = napSpace
            napSpaceFactory.geocodeAddress(napSpace.address, map)
        })
        $timeout(() => {
        }, 100)
        $scope.calendarOptions = {
        };
        $scope.events = []
        $scope.reservation =
            {
                napSpaceID: $routeParams.napSpaceID,
                title: "",
                start: new Date(),// :) how you can use Date
                // description: "This is a cool event",
                color: "#5f6dd0"
            }

        $scope.makeReservation = function () {
            napSpaceFactory.makeReservation($scope.reservation).then( ()=>   {
                console.log("It's nap time yall!")
                $scope.events.push($scope.reservation)
                console.log($routeParams.napSpaceID)
                napSpaceFactory.getReservation($routeParams.napSpaceID).then(reservationData => {
                    $scope.events = reservationData
                })
            })
        }
        napSpaceFactory.getReservation($routeParams.napSpaceID).then(reservationData => {
            $scope.events = reservationData
        })
    })