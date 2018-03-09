angular
    .module("BYOBlanket")
    .factory("napSpaceFactory", function ($http) {
        let BYOBlanketAPI = "http://localhost:57260/api"

        return Object.create(null, {
            "cache": {
                value: null,
                writable: true
            },
            // lists all napSpaces
            "list": {
                value: function () {
                    console.log("Get. ALL. the. THINGS!")
                    const token = localStorage.getItem("token")
                    console.log(token, "token")
                    return $http({
                        method: "GET",
                        headers: {
                            "Authorization": `Bearer ${token}`
                        },
                        url: `${BYOBlanketAPI}/NapSpace`
                    }).then(response => {
                        const data = response.data
                        // Make an array of objects so we can use filters
                        return Object.keys(data).map(key => {
                            data[key].id = key
                            return data[key]
                        })
                    })
                }
            },
            // lists specific napSpace by id to display details page
            "single": {
                value: function (key) {
                    console.log("The only begotten NapSpace")
                    const token = localStorage.getItem("token")
                    console.log(token, "token")
                    return $http({
                        method: "GET",
                        headers: {
                            "Authorization": `Bearer ${token}`
                        },
                        url: `${BYOBlanketAPI}/NapSpace/${key}`
                    }).then(response => {
                        return response.data
                    })
                }
            },
            // creates new napSpace and stores in firebase
            "add": {
                value: function (napSpace) {
                    console.log("Dis bitch was added!")
                    const token = localStorage.getItem("token")
                    console.log(token, "token")
                    return $http({
                        method: "POST",
                        headers: {
                            "Authorization": `Bearer ${token}`
                        },
                        url: `${BYOBlanketAPI}/NapSpace`,
                        data: {
                            // "ownerId": firebase.auth().currentUser.uid,
                            // "ownerEmail": firebase.auth().currentUser.email,
                            "title": napSpace.title,
                            "price": napSpace.price,
                            "description": napSpace.description,
                            "address": napSpace.address,
                            "payment": napSpace.payment,
                            "rules": napSpace.rules
                            // "picture": napSpace.picture
                        }
                    })
                }
            },
            "edit": {
                value: function (NapSpace, key) {
                    console.log("Edited hell yeah")
                    const token = localStorage.getItem("token")
                    console.log(token, "token")
                    return $http({
                        method: "PUT",
                        headers: {
                            "Authorization": `Bearer ${token}`
                        },
                        url: `${BYOBlanketAPI}/NapSpace/${key}`,
                        data: {
                            // "ownerId": firebase.auth().currentUser.uid,
                            // "ownerEmail": firebase.auth().currentUser.email,
                            "title": NapSpace.title,
                            "price": NapSpace.price,
                            "description": NapSpace.description,
                            "address": NapSpace.address,
                            "payment": NapSpace.payment,
                            "rules": NapSpace.rules
                            // "picture": napSpace.picture
                        }
                    })
                }
            },
            "delete": {
                value: function (key) {
                    console.log("Delete that shit")
                    const token = localStorage.getItem("token")
                    console.log(token, "token")
                    return $http({
                        method: "DELETE",
                        headers: {
                            "Authorization": `Bearer ${token}`
                        },
                        url: `${BYOBlanketAPI}/NapSpace/${key}`
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
                    console.log("Rezzie has been made")
                    const token = localStorage.getItem("token")
                    console.log(token, "token")
                    return $http({
                        method: "POST",
                        headers: {
                            "Authorization": `Bearer ${token}`
                        },
                        url: `${BYOBlanketAPI}/Reservation/.json?auth=${idToken}`,
                        data: reservation
                    })
                }
            },
            // gets all the reservations under specific napSpaceID
            "getReservation": {
                value: function (key) {
                    console.log("GET your nap on")
                    const token = localStorage.getItem("token")
                    console.log(token, "token")
                    return $http({
                        method: "GET",
                        url: `${BYOBlanketAPI}/Reservation/orderBy="NapSpaceId"&equalTo="${key}"`
                    }).then(response => {
                        const data = response.data
                        console.log(data)
                        let reservations = Object.keys(data).map(key => {
                            data[key].id = key
                            return data[key]
                        })
                        console.log("getReservation", reservations)
                        return reservations
                    })
                }
            }
        })
    })
