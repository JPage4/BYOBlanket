angular
.module("BYOBlanket")
.controller("addController", function ($scope, napSpaceFactory) {
    $scope.newNapSpace = {}

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