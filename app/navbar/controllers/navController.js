angular.module("BYOBLanket").controller("navController",
    function ($scope, $location, AuthFactory, napSpaceFactory) {
    /*
    Just a pass-through method to the AuthFactory method of the
    same name.
    */
    $scope.isAuthenticated = () => AuthFactory.isAuthenticated();

    $scope.find = event => {
        if (event.key === "Enter") {
            const napSpace = napSpaceFactory.find($scope.searchString)
            $location.url(`/napSpace/detail/${napSpace.id}`)
        }
    }

    /*
    Unauthenticate the client.
    */
    $scope.logout = () => AuthFactory.logout();

    }
)