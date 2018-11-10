//Handle Buttons and AJAX calls

  //Keep the clock creation on the front end so that
  //the time is set to the user's time zone.

$(document).ready(function(){
  if($('#countdowns-length').length){
    var countdownLength = $('#countdowns-length').val();
    for(var i=0; i<countdownLength; i++){
      if((new Date($('#clock-'+i).attr('data-time-left')+"T00:00:00").getTime() / 1000) - (new Date().getTime()/1000) > 0) {
        var clock = $('#clock-'+i)
          .FlipClock((new Date($('#clock-'+i).attr('data-time-left')+"T00:00:00")
                          .getTime() / 1000) - (new Date().getTime()/1000), {
            clockFace: 'DailyCounter',
            countdown: true,
            autoPlay: true
          });
      } else {
        $('#clock-'+i).html('<p class="finished">Countdown has finished!</p>');
      }
    }
  }
});


// Create
function createButton() {

  //Create Form Display Toggle
  $('.create').click(function(event) {
    $('.create-countdown').slideToggle('slow');
    $(this).hide();
  });
}

function toggleUpdateButton() {

  //Update Form Display Toggle
  $('.update').click(function(event) {
    $(this).parent().children('.edit-countdown').slideToggle('slow');
    $(this).hide();
    console.log('Update button clicked');
  });
}

// Delete

//Delete Button Event Handler
function deleteButton() {
  $('.delete').click(function() {
    deleteCountdown(this);
  });
}

//Delete AJAX call
function deleteCountdown(self) {

  let countdownID = $(self).val();
  console.log(countdownID,$(self).val(),self);

  let prefix = '/countdowns/';

  $.ajax({
    url: prefix + countdownID,
    method: 'DELETE',
    contentType: 'application/json',
    success: function(res) {
      $(self).parent().remove();
    },
    error: function(req) {
      console.log('Delete Failed');
    }
  });
}

//Run Button Handlers
function runButtons() {
  createButton();
  toggleUpdateButton();
  deleteButton();
}

runButtons();
