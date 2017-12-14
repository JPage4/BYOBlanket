angular
    .module("BYOBlanket")
    .controller("detailController",
    function ($scope, $location, $routeParams, napSpaceFactory, $timeout) {
        $scope.spaces = {}
        // map default loads nashville
        var map = new google.maps.Map(document.getElementById("map"), {
            zoom: 12,
            center: { lat: 36.1627, lng: 86.7816 }
        });
        // display napSpace details AND runs the geocodeAddress method
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
        // reservations pushed into events array
        $scope.events = []
        // new reservation objects have these properties
        $scope.reservation =
            {
                napSpaceID: $routeParams.napSpaceID,
                title: "",
                start: new Date().setHours(),
                end: new Date().setHours(),
                color: "#5f6dd0"
            }
        // function creates reservation objects, pushes into events array, then gets back reservation data to only display those for specific napSpace
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
        // calls again for page reload
        napSpaceFactory.getReservation($routeParams.napSpaceID).then(reservationData => {
            $scope.events = reservationData
        })
    })