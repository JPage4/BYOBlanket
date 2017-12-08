angular
.module("BYOBlanket")
.controller("addController", function ($scope, napSpaceFactory) {
    $scope.newNapSpace = {}

    /**
     * Use this event listener to check if there is any data
     * in the factory cache each time the user loads a view
     * that is bound to this controller
     */

    // $scope.$on("$viewContentLoaded", function(event) {
    //     if (!napSpaceFactory.cache) {
    //         console.info("No cached data")
    //         napSpaceFactory.list(true).then(data => {
    //             $scope.napSpace = data
    //         })
    //     } else {
    //         console.info("Using cached data")
    //         $scope.napSpace = napSpaceFactory.cache
    //     }
    // })
    $scope.addNapSpace = function () {
        const listing = {
            "ownerId": firebase.auth().currentUser.uid,
            // "napSpaceID": "",
            "title": $scope.newNapSpace.title,
            "price": $scope.newNapSpace.price,
            "description": $scope.newNapSpace.description,
            "address": $scope.newNapSpace.address,
            "payment": $scope.newNapSpace.payment,
            "rules": $scope.newNapSpace.rules,
            "picture": $scope.newNapSpace.picture,
        }

        /**
         * If POST was successful, retrieve new list of napSpace
         */
        napSpaceFactory.add(listing)
        .then((newListing) => {
            console.log(newListing)
            // return napSpaceFactory.list()
        })

        // Bind new list of napSpace to scope so view gets updated

        .then(napSpace => {
            $scope.napSpace = napSpace
        })
    }
})