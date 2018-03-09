angular
.module("BYOBlanket")
.controller("AuthCtrl", function($scope, $location, AuthFactory, $http) {
    $scope.auth = {}

    $scope.logMeIn = function (credentials) {
        $http({
            method: "POST",
            url: `http://localhost:57260/api/token?username=${$scope.auth.email}&password=${$scope.auth.password}`
        }).then(result => {
            console.log(result)
            localStorage.setItem("token", result.data)
        }).then(()=> {
            window.location.href = "/#!/napSpace/list"
        })
        clearInput()
    }

    $scope.registerUser = function(registerNewUser) {
        $http({
            method: "POST",
            url: `http://localhost:57260/api/token?username=${$scope.auth.email}&password=${$scope.auth.password}`
        }).then(result => {
            console.log(result)
            localStorage.setItem("token", result.data)
        })
        clearInput()
    }

    $scope.logoutUser = function(){
        AuthFactory.removeToken()
        $location.url("/auth")
        // clearInput()
    }

    $scope.isAuthenticated = () => {
        if (localStorage.getItem("token") === "")
        {
            return false
        }
        return true
    }

    clearInput = function() {
        $scope.auth.email = "";
        $scope.auth.password = "";
    }
})
