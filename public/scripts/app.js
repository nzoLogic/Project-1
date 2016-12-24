console.log('app.js online');
//active collection of moments
var $momentsFeed;

$(document).ready(function() {
    //select dropdown for materialize
    $('select').material_select();
    //parallax initialization
    $('.parallax').parallax()

    $momentsFeed = $('#momentsFeed');

    var momentSource = $('#moments-template').html();
    momentHB = Handlebars.compile(momentSource);

    //get all moments
    $.ajax({
        method: 'GET',
        url: '/api/moments',
        success: handleSuccess,
        error: handleError
    });
    //carousel initialization


    //event listener for a new moment submission
    $('#momentForm').on('submit', function(e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/api/moments',
            data: $(this).serializeArray(),
            success: newMomentSuccess,
            error: handleError
        });
  //       $('html, body').animate({
  //     scrollTop: $("#").offset().top
  // }, 2000);
    });
    //takes each moment and displays relative data
    function render(moment) {
        $('#momentsFeed').append(momentHB({
            moment: moment
        }));
    }


    function handleSuccess(moments) {
        //for each moment in moments... render
        moments.forEach(function(moment) {
            // render(moment);
        });
    }

    function handleError(err) {
        console.log('error in moments', err);
    }


    function newMomentSuccess(moment) {
        // $('#textarea1 input').val('');
        console.log(moment);
        // render();
    }

});
