console.log('maps.js online');

$(document).ready(function() {
    //maps initial options
    var mapOptions = {
        center: new google.maps.LatLng(37.7831, -122.4039),
        zoom: 12,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        zoomControl: false
    };

    new google.maps.Map(document.getElementsByClassName('map')[0], mapOptions);
    $('.mapInit').click(function(e) {
      $('.map').toggle('display');
    })
})
