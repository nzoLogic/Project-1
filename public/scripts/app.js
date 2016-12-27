console.log('app.js online');
//active collection of moments
var momentHB;
var $momentsFeed;
var moments = [];
$(document).ready(function() {
    //select dropdown for materialize
    $('select').material_select();
    //parallax initialization
    $('.parallax').parallax()
        // Tabs
    $('ul.tabs').tabs();

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
            data: $(this).serialize(),
            success: newMomentSuccess,
            error: handleError
        });
        //       $('html, body').animate({
        //     scrollTop: $("#").offset().top
        // }, 2000);
    });


    var currentCat = "Inspiring";

    $('#motivating').on('click', function(e) {
        e.preventDefault();
        currentCat = "Motivating";
        render();
    })
    $('#inspiring').on('click', function(e) {
        e.preventDefault();
        currentCat = "Inspiring";
        render();
    })
    $('#lifeChanges').on('click', function(e) {
        e.preventDefault();
        currentCat = "Life Changes";
        render();
    })
    $('#perspective').on('click', function(e) {
            e.preventDefault();
            currentCat = "Perspective";
            render();
        })
        //handles successfull GET req for all moments
    function handleSuccess(json) {
        //call a function to sort each moment
        moments = json;
        select3();
    }
    //function that pushes moments message and categories into array

    //checks if moment feed has 3 moments inside. empties if it does.
    function select3() {
        var nOfMoments = $momentsFeed.children().length;
        //is there 3 moments?
        if (nOfMoments === 3) {
            console.log(nOfMoments);
            $momentsFeed.empty();
            return select3();
        }
        //render the first moment in collection
        render(moments.shift());
    }
    //appends data to moments feed section every 3 seconds
    function render(data) {
        $momentsFeed.append(momentHB({
            moment: data
        }));
        //pushes the data back into the moments collection 
        moments.push(data);
        setTimeout(function() {
            select3();
        }, 3000);
    }

    function handleError(err) {
        console.log('error in moments', err);
    }


    function newMomentSuccess(json) {

        $('#momentsFeed input').val('');
        moments.push(json);
        render();
    }

});
