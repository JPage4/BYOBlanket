angular
    .module("BYOBlanket")
    .factory("napSpaceFactory", function ($http) {
        let firebaseURL = "https://byoblanket-b8f8a.firebaseio.com"

        return Object.create(null, {
            "cache": {
                value: null,
                writable: true
            },
            // lists all napSpaces
            "list": {
                value: function () {
                    return firebase.auth().currentUser.getIdToken(true)
                        .then(idToken => {
                            return $http({
                                method: "GET",
                                url: `${firebaseURL}/spaces/.json?auth=${idToken}`
                            }).then(response => {
                                const data = response.data
                                // Make an array of objects so we can use filters
                                return Object.keys(data).map(key => {
                                    data[key].id = key
                                    return data[key]
                                })
                            })
                        })
                }
            },
            // lists specific napSpace by id to display details page
            "single": {
                value: function (key) {
                    return firebase.auth().currentUser.getIdToken(true)
                        .then(idToken => {
                            return $http({
                                method: "GET",
                                url: `${firebaseURL}/spaces/${key}/.json?auth=${idToken}`
                            }).then(response => {
                                return response.data
                            })
                        })
                }
            },
            // creates new napSpace and stores in firebase
            "add": {
                value: function (napSpace) {
                    console.log("Dis bitch was added!")
                    return firebase.auth().currentUser.getIdToken(true)
                        .then(idToken => {
                            return $http({
                                method: "POST",
                                url: `${firebaseURL}/spaces/.json?auth=${idToken}`,
                                data: {
                                    "ownerId": firebase.auth().currentUser.uid,
                                    "ownerEmail": firebase.auth().currentUser.email,
                                    "title": napSpace.title,
                                    "price": napSpace.price,
                                    "description": napSpace.description,
                                    "address": napSpace.address,
                                    "payment": napSpace.payment,
                                    "rules": napSpace.rules,
                                    "picture": napSpace.picture
                                }
                            })
                        })
                }
            },
            "edit": {
                value: function (napSpace, key) {
                    console.log("Edited")
                    return firebase.auth().currentUser.getIdToken(true)
                        .then(idToken => {

                    return $http({
                        method: "PUT",
                        url: `${firebaseURL}/spaces/${key}/.json?auth=${idToken}`,
                        data: {
                            "ownerId": firebase.auth().currentUser.uid,
                            "ownerEmail": firebase.auth().currentUser.email,
                            "title": napSpace.title,
                            "price": napSpace.price,
                            "description": napSpace.description,
                            "address": napSpace.address,
                            "payment": napSpace.payment,
                            "rules": napSpace.rules,
                            "picture": napSpace.picture
                        }
                    })
                })
            }
        },
            "delete": {
                value: function (key) {
                    console.log("Delete that shit")
                    return firebase.auth().currentUser.getIdToken(true)
                    .then(idToken => {
                    return $http({
                        method: "DELETE",
                        url: `${firebaseURL}/spaces/${key}/.json?auth=${idToken}`
                        })
                    })
                }
            },
            // filters napSpaces for the search
            "find": {
                value: function (searchString) {
                    const result = this.cache.find(napSpace => {
                        return napSpace.address.includes(searchString) || napSpace.title.includes(searchString) || napSpace.price.includes(searchString) || napSpace.description.includes(searchString)
                    })
                    return result
                }
            },
            // converts address string into coords and adds marker
            "geocodeAddress": {
                value: function (address, map) {
                    var geocoder = new google.maps.Geocoder();
                    var address = address;

                    geocoder.geocode({ "address": address }, function (results, status) {
                        if (status === "OK") {
                            map.setCenter(results[0].geometry.location);
                            var marker = new google.maps.Marker({
                                map: map,
                                position: results[0].geometry.location
                            });
                        } else {
                            alert("Geocode was not successful for the following reason: " + status);
                        }
                    })
                }
            },
            // stores reservation object in firebase
            "makeReservation": {
                value: function (reservation) {
                    return firebase.auth().currentUser.getIdToken(true)
                        .then(idToken => {
                            return $http({
                                method: "POST",
                                url: `${firebaseURL}/reservations/.json?auth=${idToken}`,
                                data: reservation
                            })
                        })
                }
            },
            // gets all the reservations under specific napSpaceID
            "getReservation": {
                value: function (key) {
                    return firebase.auth().currentUser.getIdToken(true)
                        .then(idToken => {
                            return $http({
                                method: "GET",
                                url: `${firebaseURL}/reservations.json?orderBy="napSpaceID"&equalTo="${key}"&auth=${idToken}`
                            }).then(response => {
                                const data = response.data
                                console.log(data)
                                let reservations = Object.keys(data).map(key => {
                                    data[key].id = key
                                    return data[key]
                                })
                                console.log("getReservation",reservations)
                                return reservations
                            })
                    })
                }
            }
        })
    })
