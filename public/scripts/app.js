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



    $('#motivating').on('click', function(e){
      e.preventDefault();
      currentCat = "Motivating";
      render();
    })
    $('#inspiring').on('click', function(e){
      e.preventDefault();
      currentCat = "Inspiring";
      render();
    })
    $('#lifeChanges').on('click', function(e){
      e.preventDefault();
      currentCat = "Life Changes";
      render();
    })
    $('#perspective').on('click', function(e){
      e.preventDefault();
      currentCat = "Perspective";
      render();
    })

    function handleSuccess(json) {
        //for each moment in moments... render
        moments = json;
        moments.forEach(function(moment){
          for(var i = 0; i < moment.categories.length; i++){
            // console.log(moment.message , moment.categories[i])
            if(moment.categories[i] === currentCat){
              var momentHtml = momentHB({
                  moments: moment.message,
                  categories: moment.categories
              });
              // console.log(moment);
              $momentsFeed.append(momentHtml);
            }
          }
        });
    }

    function render(){
      $momentsFeed.empty();
      // inspiring
      moments.forEach(function(moment){
        for(var i = 0; i < moment.categories.length; i++){
          // console.log(moment.message , moment.categories[i])
          if(moment.categories[i] === currentCat){
            var momentHtml = momentHB({
              moments: moment.message,
              categories: moment.categories
            });
            // console.log(moment);
            $momentsFeed.append(momentHtml);
          }
        }
      });
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
