$('#submit').click(function(){  
    let url = $('#url').val();
  $.ajax({  
      url:`/shorturl?url=${url}`,  
      method:'get',  
      dataType:'json',
      success:function(response){  
          console.log(response.shortendURL);
          $("p").css("color", "green");
          $('#message').text(`Sortend URL is:  ${response.shortendURL}`);
      },  
      error:function(response){  
          console.log(response);
          $("p").css("color", "red");
          $('#message').text(`Error: ${response.responseJSON.errorMessage || "Something went wrong"}`);

      }  
  });  
}); 