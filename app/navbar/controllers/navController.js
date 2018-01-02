angular.module("BYOBlanket").controller("navController",
    function ($scope, $location, AuthFactory, napSpaceFactory) {
    /*
    Just a pass-through method to the AuthFactory method of the
    same name.
    */
    $scope.isAuthenticated = () => AuthFactory.isAuthenticated();

    /*
    Unauthenticate the client.
    */
    $scope.logoutUser = () => AuthFactory.logout();

    }
)