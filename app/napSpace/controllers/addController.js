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
        return firebase.auth().currentUser.getIdToken(true)
        .then(idToken => {
        let storageRef = firebase.storage().ref("photos/" + file.name)
        storageRef.put(file)
        .then(() => {
            storageRef.getDownloadURL()
            .then((URL) => {
                const listing = {
                    "ownerId": firebase.auth().currentUser.uid,
                    // "napSpaceID": "",
                    "title": $scope.newNapSpace.title,
                    "price": $scope.newNapSpace.price,
                    "description": $scope.newNapSpace.description,
                    "address": $scope.newNapSpace.address,
                    "payment": $scope.newNapSpace.payment,
                    "rules": $scope.newNapSpace.rules,
                    "picture": URL,
                }
                napSpaceFactory.add(listing)
                .then((newListing) => {
                    console.log(newListing)
                    // return napSpaceFactory.list()
                })
                clearInputs()
            })
        })
    })
}

clearInputs = function() {
    $scope.newNapSpace.title = "",
    $scope.newNapSpace.price = "",
    $scope.newNapSpace.description = "",
    $scope.newNapSpace.address = "",
    $scope.newNapSpace.payment = "",
    $scope.newNapSpace.rules = ""
    document.getElementById("uploadFile").value = null
}

let file = ""
let submitButton = document.getElementById("uploadFile")
submitButton.addEventListener("change", function(event) {
    // get files
    file = event.target.files[0];
    // create storage ref
    let storageRef = firebase.storage().ref("photos/" + file.name)
    // upload file
    })
})