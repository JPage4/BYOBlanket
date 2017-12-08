angular
.module("BYOBlanket")
.controller("listController", function(napSpaceFactory, $scope) {
    $scope.napSpace = []

    // napSpaceFactory.list().then(data => {
    //     $scope.napSpace = data
    // })
})

// somehow import google maps here?