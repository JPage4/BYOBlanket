angular
    .module("BYOBlanket")
    .factory("napSpaceFactory", function ($http) {
        let firebaseURL = "https://byoblanket-b8f8a.firebaseio.com"

        return Object.create(null, {
            "cache": {
                value: null,
                writable: true
            },
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
                                    // "napSpaceID": "",
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
            "find": {
                value: function (searchString) {
                    const result = this.cache.find(napSpace => {
                        return napSpace.address.includes(searchString) || napSpace.title.includes(searchString) || napSpace.price.includes(searchString)
                    })
                    return result
                }
            },
            "geocodeAddress": {
                value: function (address, map) {
                    // var map = new google.maps.Map(document.getElementById("map"), {
                    //     zoom: 12,
                    //     center: {lat: 36.1627, lng: 86.7816}
                    //     });
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
            }
        })
    })
// "edit": { FIX THIS LATER!!!!
//     value: function (napSpace, key) {
//         napSpace.title = ""
//         napSpace.price = ""
//         napSpace.description = ""
//         napSpace.address = ""
//         napSpace.payment = ""
//         napSpace.rules = ""
//         napSpace.picture = ""
//         return $http({
//             method: "PUT",
//             url: `${firebaseURL}/napSpace/${key}/.json?auth=${idToken}`,
//             data: napSpace
//         })
//     }
// },
// "delete": { UPDATE THIS LATER
//     value: function (key) {
//         return $http({
//             method: "DELETE",
//             url: `${firebaseURL}/napSpace/${key}/.json?auth=${idToken}`
//         })
//     }
// },