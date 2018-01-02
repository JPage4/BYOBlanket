angular
.module("BYOBlanket")
.controller("AuthCtrl", function($scope, $location, AuthFactory) {
    $scope.auth = {}

    $scope.logMeIn = function (credentials) {
        AuthFactory.authenticate(credentials).then(function (didLogin) {
            $scope.login = {}
            $scope.register = {}
            $location.url("/napSpace/list")
        })
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
