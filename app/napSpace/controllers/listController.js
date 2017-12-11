angular
    .module("BYOBlanket")
    .controller("listController", function (napSpaceFactory, $scope, $timeout) {
        $scope.spaces = []



        napSpaceFactory.list().then(spaces => {
            $timeout()
            $scope.spaces = spaces

            const map = new google.maps.Map(document.getElementById("map"), {
                zoom: 10,
                center: { lat: 36.1627, lng: 86.7816 }
            })

            for (let i = 0; i < spaces.length; i++) {
                const currentSpace = spaces[i]
                let address = currentSpace.address;
                const geocoder = new google.maps.Geocoder();

                geocoder.geocode({ "address": address }, function (results, status) {
                    if (status === "OK") {

                        // Create a marker for the current location
                        const marker = new google.maps.Marker({
                            map: map,
                            position: results[0].geometry.location
                        });

                        // Center the map on the current location
                        map.setCenter(results[0].geometry.location);

                        // Create info window object for this marker
                        const infoWindow = new google.maps.InfoWindow()

                        // Add event listener for each marker to display the info window
                        google.maps.event.addListener(marker, "click", (function (marker) {
                            return function () {
                                infoWindow.setContent(`<a href="#!/napSpace/detail/${currentSpace.id}" class="detailPage">${currentSpace.title}</a>`);
                                infoWindow.open(map, marker);
                            }
                        })(marker));

                    } else {
                        alert("Geocode was not successful for the following reason: " + status);
                    }
                })
            }
        })
    })
