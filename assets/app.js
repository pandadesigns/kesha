var map;
var service;
var pos;
function initMap() {
	map = new google.maps.Map(document.getElementById('map'), {
		center: {lat: -34.397, lng: 150.644},
		zoom: 8
	});
	service = new google.maps.places.PlacesService(map);
	infoWindow = new google.maps.InfoWindow;
	// HTML5 geolocation
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function(position) {
			pos = {
				lat: position.coords.latitude,
				lng: position.coords.longitude
			};

			infoWindow.setPosition(pos);
			infoWindow.setContent('Location found.');
			infoWindow.open(map);
			map.setCenter(pos);
		}, function() {
			handleLocationError(true, infoWindow, map.getCenter());
		});
	} else {
      // Browser doesn't support Geolocation
      handleLocationError(false, infoWindow, map.getCenter());
  	}
}
function handleLocationError(browserHasGeolocation, infoWindow, pos) {
	infoWindow.setPosition(pos);
	infoWindow.setContent(browserHasGeolocation ?
		'Error: The Geolocation service failed.' :
		'Error: Your browser doesn\'t support geolocation.');
	infoWindow.open(map);
}

var searchButton = document.getElementById("search-button");
var userSearch = document.getElementById("search");

searchButton.addEventListener("click", function(){
	var request = {
		location: new google.maps.LatLng(pos),
		radius: "500",
		query: userSearch.value
	};
	service.textSearch(request, callback);
});

function callback(results, status){
	if (status == google.maps.places.PlacesServiceStatus.OK) {
    	for (var i = 0; i < results.length; i++) {
	    	var place = results[i];
	    	infoWindow.setPosition(place.geometry.location);
			infoWindow.setContent(place.name);
			infoWindow.open(map);
			map.setCenter(place.geometry.location);
			map.setZoom(15);
    	}
  	}
}