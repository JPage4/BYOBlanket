angular
    .module("BYOBlanket")
    .controller("ownerHubController",
    function ($scope, $location, $routeParams, napSpaceFactory, $timeout, $window) {
        $scope.spaces = []
        // filter: {napSpace.ownerId === firebase.auth().currentUser.uid}

        napSpaceFactory.list().then(spaces => {
            let ownerSpaces = spaces.filter(napSpace => napSpace.ownerId === firebase.auth().currentUser.uid)
            $scope.spaces = ownerSpaces
            console.log($scope.spaces)
            $timeout()
        })
        $timeout(() => {
        }, 100)

        // GET napSpace details and put them in the input fields? is this possible?
        $scope.editFields = (napSpace) => {
            // console.log(napSpace)
            $scope.napSpace = napSpace
        }



        // put edited napSpace to firebase
        $scope.editNapSpace = () => {

            napSpaceFactory.edit($scope.napSpace, $scope.napSpace.id)

            // calendar section
            $scope.calendarOptions = {
            };

            // reservations pushed into events array
            $scope.events = []

            // new reservation objects have these properties
            $scope.reservation =
            {
                napSpaceID: $scope.napSpace.id,
                title: `${$scope.napSpace.title} Unavailable`,
                start: $scope.reservation.start,
                end: $scope.reservation.end,
                napperEmail: firebase.auth().currentUser.email,
                color: "#8B0000"
            }

            // function creates reservation objects, pushes into events array, then gets back reservation data to only display those for specific napSpace
            $scope.events.push($scope.reservation)
            napSpaceFactory.makeReservation($scope.reservation).then(() => {
                napSpaceFactory.getReservation(napSpace.id).then(reservationData => {
                    $scope.events = reservationData
                })
            })

            // calls again for page reload
            napSpaceFactory.getReservation($scope.napSpace.id).then(reservationData => {
                $scope.events = reservationData
            })
        }

        // ng-click button delete
        $scope.deleteNapSpace = (napSpace) => {
            napSpaceFactory.delete(napSpace.id).then(() => {
                console.log(napSpace)
                let deletedNapSpace = $scope.spaces.indexOf(napSpace)
                $scope.spaces.splice(deletedNapSpace, 1)
                $timeout()
            })
        }
    }
    )
