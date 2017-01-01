
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
        // $('html, body').animate({
        //     scrollTop: $('.moment-section').offset().top
        // }, 2000);
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
    $('.clear').on('click',(function(e){
      console.log('click');
      $('input[type="checkbox"]').prop('checked', false);
      momentsFeed = moments;
    }));
        //handles successfull GET req for all moments
    function handleSuccess(json) {
        //call a function to sort each moment
        momentsFeed = json.map(sortMoment)
        moments = momentsFeed;
        console.log(momentsFeed)
        select3();
        locationContainer(moments);
    }
    //call back function for returning data we want
    function sortMoment(obj){
      return {
       message : obj.message,
       categories : obj.categories,
       location : obj.location
     }
    }
    //checks if moment feed has 3 moments inside.
    function select3() {
        var nOfMoments = $momentsFeed.children().length;
        // //toggle 2nd child class popout
        // if (nOfMoments > 0) {
        //     $('.moment:nth-child(2)').toggleClass('z-depth-5');
        // }
        // //remove first child
        // if (nOfMoments === 3) {
        //     // console.log(topChild);
        //     $('.moment:first').detach();
        //     return select3();
        // }

        //render the first moment in collection
        render(momentsFeed.shift());
    }
    //appends data to moments feed section every 3 seconds
    function render(data) {
        $momentsFeed.append(momentHB({
            moment: data
        }));

        momentsFeed.push(data);
        setTimeout(select3, 3000);
    }

    function handleError(err) {
        console.log('error in moments', err);
    }
    //takes a new moment and pushes it into moments collection
    function newMomentSuccess(json) {
      var newMome = sortMoment(json);
      // console.log('moments location is ', json.location);
        $('#momentsFeed input').val('');
        moments.push(newMome);
        renderMarker(newMome.location)
    }

    //Error Form

/*******************************************************************

                        MAP section

*******************************************************************/

    //maps initial options
    var mapOptions = {
        center: new google.maps.LatLng(37.7831, -122.4039),
        zoom: 12,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
    };
    var map = new google.maps.Map(document.getElementsByClassName('map')[0], mapOptions);
    var markerContainer = [];

    // var infoWindow = new google.maps.InfoWindow({
    //     map: map
    // });
    var options = {imagePath: '../somer/'};
    var markerCluster = new MarkerClusterer(map, options);

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
        console.log(loc);
        var marker = new google.maps.Marker({
            position: loc,
            animation: google.maps.Animation.DROP
        });
        console.log(marker)
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
          }
          else {
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
