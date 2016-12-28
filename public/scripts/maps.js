console.log('maps.js online');
// var map;
$(document).ready(function(){
  var map;
  //maps initial options
  var mapOptions = {
      center: new google.maps.LatLng(37.7831, -122.4039),
      zoom: 12,
      mapTypeId: google.maps.MapTypeId.ROADMAP
  };
   map = new google.maps.Map(document.getElementById('map'), mapOptions);

  var markerOptions = {
      position: new google.maps.LatLng(37.7831, -122.4039)
  };
  var marker = new google.maps.Marker(markerOptions);
  marker.setMap(map);

// get all locations
  $.ajax({
      method: 'GET',
      url: '/api/locations',
      success: mapSuccess,
      error: mapError
  });

//new locations
  // $.ajax({
  //     method: 'POST',
  //     url: '/api/moments',
  //     data: $(this).serialize(),
  //     success: newMapSuccess,
  //     error: mapError
  // });

  //handles successfull GET req for locations
function mapSuccess(map){
  markers = map;
   console.log(map);
   currentLocation();
   currentMarkers();
}

// coordinates for current markers
function currentMarkers(){
 markers.forEach(function(marker){
  console.log(marker);
  var lngLat = {
    lng: marker.coordinates.lng,
    lat: marker.coordinates.lat
  };
  // set coordinates in google maps
  var marker = new google.maps.Marker({
   map: map,
   position: lngLat
 });

});

}
// current location
var infoWindow = new google.maps.InfoWindow({map: map});
function currentLocation() {

     // Try HTML5 geolocation.
     if (navigator.geolocation) {
       navigator.geolocation.getCurrentPosition(function(position) {
         var pos = {
           lat: position.coords.latitude,
           lng: position.coords.longitude
         };
         console.log(pos);

         infoWindow.setPosition(pos);
         infoWindow.setContent('Location found.');
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
   }



function newMapSuccess(map){



}

function mapError(){

}



});
