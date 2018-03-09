angular
    .module("BYOBlanket")
    .controller("detailController",
    function ($scope, $location, $routeParams, napSpaceFactory, $timeout, $window) {
        $scope.spaces = {}
        $scope.napSpace = {}
        $scope.napSpace.title ="fjiorenvijnvjifnji"
        // map default loads nashville
        var map = new google.maps.Map(document.getElementById("map"), {
            zoom: 12,
            center: { lat: 36.1627, lng: 86.7816 }
        });
        // display napSpace details AND runs the geocodeAddress method
        napSpaceFactory.single($routeParams.napSpaceId).then(napSpace => {
            $timeout(() => {
                $scope.napSpace = napSpace
                console.log(napSpace);

                napSpaceFactory.geocodeAddress(napSpace.address, map)
            })
        })

        // start of all those calendar things
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
                napperEmail: "fsfff",
                color: "#5f6dd0"
            }
        // function creates reservation objects, pushes into events array, then gets back reservation data to only display those for specific napSpace
        $scope.makeReservation = function () {
                // email confirmation function
            $scope.confirmEmail = function(ownerEmail){
                let napperEmail = "vefivmfkmv"
                let message = `User ${$scope.reservation.napperEmail} would like to reserve ${$scope.napSpace.title} from ${$scope.reservation.start} to ${$scope.reservation.end}. Please respond to accept or decline. Thank you! BYOB Team`
                let subject = `Reservation Request for ${$scope.napSpace.title}`
                location.href= "mailto:" + ownerEmail + "?subject=" + subject + "&body=" + message
            }
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