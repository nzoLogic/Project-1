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
  $.ajax({
      method: 'POST',
      url: '/api/locations',
      data: $(this).serialize(),
      success: newMapSuccess,
      error: mapError
  });

  //handles successfull GET req for locations
function mapSuccess(map){
  markers = map;
   console.log(map);
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


function newMapSuccess(){

}

function mapError(){

}



});
