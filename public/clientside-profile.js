//Handle Buttons and AJAX calls

// move this form to the EJS file
// then in css set .create-countdown-form-wrapper { display: none; }
// then all this code does is set it to display: block; or even show it as a modal
// <button class="edit-countdown" data-id="109371073" data-title="Let's Go Pikachu" data-target-date="11-16-2018" data-notes="Here is some notes, blah blah blah">Edit Countdown</button>
// when you click on this button, again show the form, and grab those data attributes to populate the
// form fields
// another field would be <input type="hidden" name="countdownID" class="countdown-id" value=""/>

$(document).ready(function(){
  if($('#countdowns-length').length){
    var countdownLength = $('#countdowns-length').val();
    for(var i=0; i<countdownLength; i++){
      var clock = $('#clock-'+i)
        .FlipClock((new Date($('#clock-'+i).attr('data-time-left')+"T00:00:00")
                        .getTime() / 1000) - (new Date().getTime()/1000), {
          clockFace: 'DailyCounter',
          countdown: true,
          autoPlay: true
        });
      }
  }
})


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
  $('.delete').click(function(event) {
    deleteCountdown(event);
  });
}

//Delete AJAX call
function deleteCountdown(event) {

  let countdownID = $(event.target).val();

  let prefix = '/countdowns/';

  $.ajax({
    url: prefix + countdownID,
    method: 'DELETE',
    contentType: 'application/json',
    success: function(res) {
      $(event.target).parent().remove();
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
