angular
.module("BYOBlanket")
.controller("AuthCtrl", function($scope, $location, AuthFactory, $http) {
    $scope.auth = {}

    $scope.logMeIn = function (credentials) {
        $http({
            method: "POST",
            url: `http://localhost:5000/api/token?username=${$scope.auth.email}&password=${$scope.auth.password}`
        }).then(result => console.log(result))
        clearInput()
    }

    $scope.registerUser = function(registerNewUser) {
        AuthFactory.registerWithEmail(registerNewUser).then(function (didRegister) {
            $scope.logMeIn(registerNewUser)
        })
        clearInput()
    }

    $scope.logoutUser = function(){
        AuthFactory.logout()
        $location.url("/auth")
        // clearInput()
    }

    clearInput = function() {
        $scope.auth.email = "";
        $scope.auth.password = "";
    }
})
