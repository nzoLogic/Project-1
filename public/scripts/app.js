console.log('app.js online');
var $momentsFeed;

$(document).ready(function(){
  $('select').material_select();
  //
  // $momentsFeed = $('#momentsFeed');
  //
  // var source = $('#moments-template').html();
  //   template = Handlebars.compile(source);

    $.ajax({
      method: 'GET',
      url: '/api/moments',
      success: handleSuccess,
      error: handleError
    });

    $('#textarea1').on('submit', function(e) {
      console.log('clicked')
       e.preventDefault();
       console.log('new moment serialized', $(this).serializeArray());
       $.ajax({
         method: 'POST',
         url: '/api/moments',
         data: $(this).serializeArray(),
         success: newMomentSuccess,
         error: momentError
       });
     });

     function render () {

      //  $momentsFeed.empty();


      //  var momentsHtml = template({ moments: moments });


       $momentsFeed.append(momentsHtml);
     }


 function handleSuccess(success){
console.log(success);

 }

 function handleError(success){
console.log(succes);

 }


     function newMomentSuccess(moments) {
       $('#textarea1 input').val('');

       json.forEach(moments);
       console.log(moments);
       render();
     }

     function newMomentError() {
       console.log('new moment error!');
     }







});
