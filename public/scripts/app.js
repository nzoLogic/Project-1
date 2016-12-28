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
    $('.button-collapse').sideNav();
    //dropdown hover
    $('.dropdown-button').dropdown({
      hover: true,
      belowOrigin: true
      });

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
        $('html, body').animate({
            scrollTop: $('.moment-section').offset().top
        }, 2000);
    });


    //event listener for categories sideNav
    $('#categoryDropdown').on('click', 'a',function(e) {
            var $category = $(this).data('id');
            momentsFeed = moments.filter(function(moment){
               return moment.categories.includes($category);
            })
        })
        //handles successfull GET req for all moments
    function handleSuccess(json) {
        //call a function to sort each moment
        momentsFeed = json.map(function(moment){
          return {
            message: moment.message,
            categories: moment.categories,
            location: moment.location
          }
        })
        moments = momentsFeed;
        console.log(momentsFeed)
        select3();
    }
    //checks if moment feed has 3 moments inside.
    function select3() {
        var nOfMoments = $momentsFeed.children().length;
        //toggle 2nd child class popout
        if (nOfMoments > 0) {
            $('.moment:nth-child(2)').toggleClass('z-depth-5');
        }
        //remove first child
        if (nOfMoments === 3) {
            // console.log(topChild);
            $('.moment:first').detach();
            return select3();
        }

        //render the first moment in collection
        render(momentsFeed.shift());
    }
    //appends data to moments feed section every 3 seconds
    function render(data) {
        $momentsFeed.append(momentHB({
            moment: data
        }));

    }

    function handleError(err) {
        console.log('error in moments', err);
    }
    //takes a new moment and pushes it into moments collection
    function newMomentSuccess(json) {

        $('#momentsFeed input').val('');
        moments.push(json);
    }

});
