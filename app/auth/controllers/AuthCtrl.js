angular
.module("BYOBlanket")
.controller("AuthCtrl", function($scope, $location, AuthFactory, $http) {
    $scope.auth = {}

    $scope.logMeIn = function (credentials) {
        $http({
            method: "POST",
            // WHY DOES THE LOCAL HOST KEEP CHANGING???
            url: `http://localhost:57260/api/token?username=${$scope.auth.email}&password=${$scope.auth.password}`
        }).then(result => {
            console.log(result)
            localStorage.setItem("token", result.data)
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
        AuthFactory.removeToken()
        $location.url("/auth")
        // clearInput()
    }

    clearInput = function() {
        $scope.auth.email = "";
        $scope.auth.password = "";
    }
})
