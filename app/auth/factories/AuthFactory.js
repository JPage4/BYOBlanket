angular.module("BYOBlanket")
.factory("AuthFactory", function ($http, $timeout, $location , $route) {
    let currentUserData = null

    // function handleError(xhr, textStatus, errorThrown){
    //     if (xhr.status === 401)
    //     document.querySelector("#responseContainer").html("Unauthorized request");
    //     else{
    //       var message = "<p>Status code: " + xhr.status + "</p>";
    //       message += "<pre>" + xhr.responseText + "</pre>";
    //       document.querySelector("#responseContainer").html(message);
    //     }
    //   }

      function isUserLoggedIn(){
        return localStorage.getItem("token") !== null;
      }

      function getSavedToken() {
        return localStorage.getItem("token");
      }

      $.ajaxSetup({
        beforeSend: function(xhr) {
            if (isUserLoggedIn()) {
                xhr.setRequestHeader("Authorization", "Bearer " + getSavedToken());
            }
        }
      });

      $(function(){
        document.querySelector("#btLogin").click(function() {
            $http.post("http://localhost:57260/api/token", $scope.auth).done(function(token){
                localStorage.setItem("token", token);
                // document.querySelector("#btLoginContainer").hide();
                // document.querySelector("#btLogoutContainer").show();
                // var message = "<p>Token received and saved in local storage under the key 'token'</p>";
                // message += "<p>Token Value: </p><p style='word-wrap:break-word'>" + token + "</p>";
                // document.querySelector("#responseContainer").html(message);
            }).fail(handleError);
        });

        document.querySelector("#btLogout").click(function(){
            localStorage.removeItem("token");
            // document.querySelector("#btLogoutContainer").hide();
            // document.querySelector("#btLoginContainer").show();
            // document.querySelector("#responseContainer").html("<p>Token deleted from local storage</p>");
        });


        document.querySelector("#btGetUserDetails").click(function(){
          const authToken = getSavedToken();

          $http({
            method: "GET",
            url: "http://localhost:57260/api/token",
            headers: {
              "Authorization": "Bearer " + authToken,
              "Accepts": "application/json"
            }
          })
          .done(function(userDetails){
            // document.querySelector("#responseContainer").html("<pre>" + JSON.stringify(userDetails) + "</pre>");
          })
          .fail(handleError);
        });

        document.querySelector("#btUpdateToken").click(function(){
          const authToken = getSavedToken();

          $http({
            method: "PUT",
            url: "http://localhost:57260/api/token",
            headers: {
              "Authorization": "Bearer " + authToken,
              "Accepts": "application/json"
            }
          })
          .done(function(newToken){
            localStorage.setItem("token", newToken);
            // document.querySelector("#btLoginContainer").hide();
            // document.querySelector("#btLogoutContainer").show();
            // var message = "<p>Token received and saved in local storage under the key 'token'</p>";
            // message += "<p>Token Value: </p><p style='word-wrap:break-word'>" + newToken + "</p>";
            // document.querySelector("#responseContainer").html(message);
          })
          .fail(handleError);
        });


        // if (isUserLoggedIn()){
        //     document.querySelector("#btLoginContainer").hide();
        //     document.querySelector("#btLogoutContainer").show();
        // }else {
        //     document.querySelector("#btLoginContainer").show();
        //     document.querySelector("#btLogoutContainer").hide();
        // }
      });
})