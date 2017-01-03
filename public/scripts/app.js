console.log('app.js online');
//active collection of moments
var $momentsFeed;
var moments = [],
    momentsFeed = [];
//callback functions

$(document).ready(function() {
    //select dropdown for materialize
    $('select').material_select();
    //parallax initialization
    $('.parallax').parallax()
        // Tabs
    $('ul.tabs').tabs();
    //materialize button collapsible
    $('.button-collapse').sideNav({
        edge: 'right'
    });
    //dropdown hover
    $('.dropdown-button').dropdown({
        hover: true,
        belowOrigin: true
    });
    // model
    $('.modal').modal();
    // $('#modifyMoment').modal('open')

    //Handelbars variable
    $momentsFeed = $('#momentsFeed');
    var momentSource = $('#moments-template').html();
    var momentHB = Handlebars.compile(momentSource);

    //get all moments
    $.ajax({
        method: 'GET',
        url: '/api/moments',
        success: handleSuccess,
        error: handleError
    });

    //event listener for a new moment submission
    $('#momentForm').on('submit', function(e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/api/moments',
            data: $(this).serialize(),
            success: newMomentSuccess,
            error: handleError
        });
        $('#Form').modal('close');
    });

        //event listener for categories sideNav
    $('#categoryFilter').on('click', 'input', function(e) {
        var $category = $(this).val();
        momentsFeed = moments.filter(function(moment) {
            return moment.categories.includes($category);
        })
        console.log(momentsFeed);
    })

    //event listener for clearing filters
    $('.clear').on('click', (function(e) {
        $('input[type="checkbox"]').prop('checked', false);
        momentsFeed = moments;
    }));
    //handles successfull GET req for all moments
    function handleSuccess(json) {
        //call a function to sort each moment
        console.log(json);
        moments = json.map(sortMoment)
        momentsFeed = moments;
        // console.log(momentsFeed)
        momentsFeed.forEach(render);
        locationContainer(moments);
    }
    //call back function for returning data we want
    function sortMoment(obj) {
        return {
            message: obj.message,
            categories: obj.categories,
            location: obj.location
        }
    }
    //callback function that handles edited moment responses
    function handleEdit(moment) {
        var freshMoment = sortMoment(moment);
        // console.log(test);
         updateMomentCollection(freshMoment);
         renderMarker(freshMoment.location);
    }

    function updateMomentCollection(moment){
      moments.unshift(moment);
      momentsFeed.unshift(moment);
      render(moment)
    }

    //appends data to moments feed section every 3 seconds
    function render(data) {
        $momentsFeed.prepend(momentHB({
            moment: data
        }));
    }

    function handleError(err) {
        console.log('error in moments', err);
    }
    //takes a new moment and pushes it into moments collection
    function newMomentSuccess(json) {
        console.log('response id is ', resId);

        $('#modifyMoment').modal('open');
        $('.finished').click(function() {
          handleEdit(json);
          $('.finished').off();
            return $('#modifyMoment').modal('close');
        });
        var resId = json._id;
        //adds event listener to modify moment buttons
        $('.modify-moment').on('click', {'id': resId}, function(e) {
                var data = {
                  'method': getDataMethod($(this)),
                  'id': e.data.id
                };
                console.log('e data object is ', data.method);
                //check if method is delete
                if(data.method === 'delete'){
                  e.data = data;
                  e.data.success = handleDeletedMoment;
                  console.log(e.data)
                  editMomentReq(e);
                  return;
                }
                $('.edit-modal').toggle();
                data.success = handleEdit;
                $('#editForm').on('submit', data, editMomentReq);
            })
            // momentsFeed.unshift(newMome);
            // renderMarker(newMome.location)
    }
    //returns the data-method property of an element
    function getDataMethod($element) {
        return $element.data('method');
    }
    //handles delete response
    function handleDeletedMoment(res){
      console.log(res);
      $('#deletedModal').modal('open');
      setTimeout(function(){
        $('#deletedModal').modal('close');
      }, 3000);
    }

    function editMomentReq(e) {
        e.preventDefault();
        $('#modifyMoment').modal('close');
      console.log($(this).serialize());
        $.ajax({
            method: e.data.method,
            url: '/api/moments/' + e.data.id,
            data: $(this).serialize(),
            success: e.data.success,
            error: handleError
        });
    }
    /*******************************************************************

                            MAP section

    *******************************************************************/

    //maps initial options
    var mapOptions = {
        center: new google.maps.LatLng(37.7831, -122.4039),
        zoom: 12,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        disableDefaultUI: true,
        mapTypeControlOptions: {
            mapTypeIds: ['roadmap', 'satellite', 'hybrid', 'terrain', 'styled_map']
        }
    };
    var styledMapType = new google.maps.StyledMapType([{
            "elementType": "geometry",
            "stylers": [{
                "color": "#1d2c4d"
            }]
        },
        {
            "elementType": "labels.text.fill",
            "stylers": [{
                "color": "#8ec3b9"
            }]
        },
        {
            "elementType": "labels.text.stroke",
            "stylers": [{
                "color": "#1a3646"
            }]
        },
        {
            "featureType": "administrative.country",
            "elementType": "geometry.stroke",
            "stylers": [{
                "color": "#4b6878"
            }]
        },
        {
            "featureType": "administrative.land_parcel",
            "elementType": "labels.text.fill",
            "stylers": [{
                "color": "#64779e"
            }]
        },
        {
            "featureType": "administrative.province",
            "elementType": "geometry.stroke",
            "stylers": [{
                "color": "#4b6878"
            }]
        },
        {
            "featureType": "landscape.man_made",
            "elementType": "geometry.stroke",
            "stylers": [{
                "color": "#334e87"
            }]
        },
        {
            "featureType": "landscape.natural",
            "elementType": "geometry",
            "stylers": [{
                "color": "#023e58"
            }]
        },
        {
            "featureType": "poi",
            "elementType": "geometry",
            "stylers": [{
                "color": "#283d6a"
            }]
        },
        {
            "featureType": "poi",
            "elementType": "labels.text.fill",
            "stylers": [{
                "color": "#6f9ba5"
            }]
        },
        {
            "featureType": "poi",
            "elementType": "labels.text.stroke",
            "stylers": [{
                "color": "#1d2c4d"
            }]
        },
        {
            "featureType": "poi.park",
            "elementType": "geometry.fill",
            "stylers": [{
                "color": "#023e58"
            }]
        },
        {
            "featureType": "poi.park",
            "elementType": "labels.text.fill",
            "stylers": [{
                "color": "#3C7680"
            }]
        },
        {
            "featureType": "road",
            "elementType": "geometry",
            "stylers": [{
                "color": "#304a7d"
            }]
        },
        {
            "featureType": "road",
            "elementType": "labels.text.fill",
            "stylers": [{
                "color": "#98a5be"
            }]
        },
        {
            "featureType": "road",
            "elementType": "labels.text.stroke",
            "stylers": [{
                "color": "#1d2c4d"
            }]
        },
        {
            "featureType": "road.highway",
            "stylers": [{
                "visibility": "off"
            }]
        },
        {
            "featureType": "road.highway",
            "elementType": "geometry",
            "stylers": [{
                "color": "#2c6675"
            }]
        },
        {
            "featureType": "road.highway",
            "elementType": "geometry.stroke",
            "stylers": [{
                "color": "#255763"
            }]
        },
        {
            "featureType": "road.highway",
            "elementType": "labels.text.fill",
            "stylers": [{
                "color": "#b0d5ce"
            }]
        },
        {
            "featureType": "road.highway",
            "elementType": "labels.text.stroke",
            "stylers": [{
                "color": "#023e58"
            }]
        },
        {
            "featureType": "transit",
            "elementType": "labels.text.fill",
            "stylers": [{
                "color": "#98a5be"
            }]
        },
        {
            "featureType": "transit",
            "elementType": "labels.text.stroke",
            "stylers": [{
                "color": "#1d2c4d"
            }]
        },
        {
            "featureType": "transit.line",
            "elementType": "geometry.fill",
            "stylers": [{
                "color": "#283d6a"
            }]
        },
        {
            "featureType": "transit.station",
            "elementType": "geometry",
            "stylers": [{
                "color": "#3a4762"
            }]
        },
        {
            "featureType": "water",
            "elementType": "geometry",
            "stylers": [{
                "color": "#0e1626"
            }]
        },
        {
            "featureType": "water",
            "elementType": "labels.text.fill",
            "stylers": [{
                "color": "#4e6d70"
            }]
        }
    ], {
        name: 'Styled Map'
    });
    var map = new google.maps.Map(document.getElementsByClassName('map')[0], mapOptions);
    map.mapTypes.set('styled_map', styledMapType);
    map.setMapTypeId('styled_map');
    var markerContainer = [];

    // var infoWindow = new google.maps.InfoWindow({
    //     map: map
    // });
    var markerCluster = new MarkerClusterer(map);

    //toggle map display
    $('.mapInit').click(function(e) {
        $('.map').toggle('display');
    })

    //checks if location radio is checked
    $('#geoLoc').click(currentLocation);

    ///iterates through collections of location, and stores them.
    function locationContainer(collections) {
        collections.forEach(function(collection) {
            // markerContainer.push(collection)
            renderMarker(collection.location);
        });
    }
    //renders markers to map
    function renderMarker(loc) {
        // console.log(loc);
        var marker = new google.maps.Marker({
            position: loc,
            animation: google.maps.Animation.DROP
        });
        markerCluster.addMarker(marker);
        markerContainer.push(marker);
    }

    function currentLocation() {
        // Try HTML5 geolocation.
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                var test =
                    'l' + position.coords.latitude +
                    'l' + position.coords.longitude;
                console.log(test)
                $('#geoLoc').val(test);
                // infoWindow.setPosition(pos);
                // infoWindow.setContent('Moment');
                // map.setCenter(pos);
            });
        } else {
            alert("Looks like your browser doesn't support geocoding!");
        }
    }

    function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
            'Error: The Geolocation service failed.' :
            'Error: Your browser doesn\'t support geolocation.');
    }



});
