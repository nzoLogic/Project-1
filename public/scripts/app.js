console.log('app.js online');
//active collection of moments
var $momentsFeed;

$(document).ready(function() {
    $('select').material_select();

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
      $('.carousel').carousel();


    //event listener for a new moment submission
    $('#momentForm').on('submit', function(e) {
        console.log('clicked');
        e.preventDefault();
        console.log('new moment serialized', $(this).serializeArray());
        $.ajax({
            method: 'POST',
            url: '/api/moments',
            data: $(this).serializeArray(),
            success: newMomentSuccess,
            error: handleError
        });
    });
    //takes each moment and displays relative data
    function render(moment) {
      $('#momentsFeed').append(momentHB({moment: moment}));
    }


    function handleSuccess(moments) {
      //for each moment in moments... render
      moments.forEach(function(moment){
        render(moment);
      });
    }

    function handleError(err) {
       console.log('error in moments', err);
    }


    function newMomentSuccess(moments) {
        $('#textarea1 input').val('');

        json.forEach(moments);
        console.log(moments);
        render();
    }


});
