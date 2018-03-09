angular.module("BYOBlanket")
.factory("AuthFactory", function ($http, $timeout, $location , $route) {
    let currentUserData = null

      function isUserLoggedIn(){
        return localStorage.getItem("token") !== null;
      }

      function saveThatToken(tokenResult) {
        return localStorage.setItem("token", tokenResult.data);
      }

      function getSavedToken() {
        return localStorage.getItem("token");
      }

      function removeToken() {
        return localStorage.removeItem("token");
      }

      const isAuthenticated = () => {
        if (localStorage.getItem("token") === null)
        {
            return false
        }
        return true
    }

      return {isUserLoggedIn, saveThatToken, getSavedToken, removeToken, isAuthenticated}
})