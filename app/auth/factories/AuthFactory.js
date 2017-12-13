angular.module("BYOBlanket")
.factory("AuthFactory", function ($http, $timeout, $location , $route) {
    let currentUserData = null
    let provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            currentUserData = user
            console.log("User is authenticated")
            $timeout(function () {
                // $location.url("")
            }, 500)
            $route.reload()

        } else {
            currentUserData = null
            console.log("User is not authenticated")
            $timeout(function () {
                $location.url("/auth")
            }, 500);
        }
    })

    return Object.create(null, {
        isAuthenticated: {
            value: () => {
                let user = currentUserData
                return user ? true : false
            }
        },
        getUser: {
            value: () => firebase.auth().currentUser
        },
        logout: {
            value: () => firebase.auth().signOut()
        },
        authenticate: {
            value: credentials =>
            firebase.auth()
            .signInWithEmailAndPassword(
                credentials.email,
                credentials.password
            )
        },
        registerWithEmail: {
            value: user =>
                firebase.auth()
                        .createUserWithEmailAndPassword(
                            user.email,
                            user.password
                        )
        },
        // updateUser: {
        //     value: user =>
        //     firebase.auth().currentUser
        //     user.updateProfile({
        //       displayName: "Jesse Page",
        //     }).then(function() {
        //       // Update successful.
        //     }).catch(function(error) {
        //       // An error happened.
        //     });
        // }

    })
})