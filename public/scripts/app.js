console.log('app.js online');
//active collection of moments
var momentHB;
var $momentsFeed;
var moments =[];
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
    function render() {
       $momentsFeed.empty();
       var momentHtml = momentHB({
           moments: moments
       });
        $momentsFeed.append(momentHtml);
    }


    function handleSuccess(json) {
        //for each moment in moments... render
        moments= json;
        console.log(json);
          render();
    }

    function handleError(err) {
        console.log('error in moments', err);
    }


    function newMomentSuccess(json) {

        $('#momentsFeed input').val('');
          moments.push(json);
        render();
        console.log(json);
        // render();
    }

});
