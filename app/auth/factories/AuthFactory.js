angular.module("BYOBlanket")
.factory("AuthFactory", function ($http, $timeout, $location , $route) {
    let currentUserData = null

      function isUserLoggedIn(){
        return localStorage.getItem("token") !== null;
      }

      function getSavedToken() {
        return localStorage.getItem("token");
      }

      return {}


})