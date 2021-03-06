angular
.module("BYOBlanket")
.controller("addController", function ($scope, $location, napSpaceFactory) {
    $scope.newNapSpace = {}
    // adds napSpace into firebase
    $scope.addNapSpace = function () {
        return firebase.auth().currentUser.getIdToken(true)
        .then(idToken => {
        // adds pics into storage bucket
        let storageRef = firebase.storage().ref("photos/" + file.name)
        storageRef.put(file)
        .then(() => {
            // gets the url to reference in FB database
            storageRef.getDownloadURL()
            .then((URL) => {
                // newNapSpace object created with these properties
                const listing = {
                    "ownerId": firebase.auth().currentUser.uid,
                    "ownerEmail": firebase.auth().currentUser.email,
                    "title": $scope.newNapSpace.title,
                    "price": $scope.newNapSpace.price,
                    "description": $scope.newNapSpace.description,
                    "address": $scope.newNapSpace.address,
                    "payment": $scope.newNapSpace.payment,
                    "rules": $scope.newNapSpace.rules,
                    "picture": URL,
                }

                // runs .add method
                napSpaceFactory.add(listing)
                .then((newListing) => {
                    console.log(newListing)
                })
                // clearInputs()
                $location.url("/napSpace/list")
                $timeout(function () {
                }, 500)
                $route.reload()
            })
        })
    })
}
// function for adding pics to storage bucket
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