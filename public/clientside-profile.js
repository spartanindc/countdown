//Handle Buttons and AJAX calls

// move this form to the EJS file
// then in css set .create-countdown-form-wrapper { display: none; }
// then all this code does is set it to display: block; or even show it as a modal
// <button class="edit-countdown" data-id="109371073" data-title="Let's Go Pikachu" data-target-date="11-16-2018" data-notes="Here is some notes, blah blah blah">Edit Countdown</button>
// when you click on this button, again show the form, and grab those data attributes to populate the
// form fields
// another field would be <input type="hidden" name="countdownID" class="countdown-id" value=""/>


// Create
function createButton() {
  $('.create').on('click', event => {
        event.preventDefault();
        $('#create-countdown').toggle();
    });
}

// Update
  //Call API and update
function updateAPICall() {
  let update_url = "./countdowns/:id"



  $.ajax(
    type: 'PUT',
    url: update_url,
    dataType: 'json',
    data: {
      title: ,
      targetDate: ,
      comments: ,
    }
    success: ,
    error: console.log('Update failed')

  )

}
  //Event handler for update submit buttton
function showUpdateFormButton() {
    $('.create').on('click', event => {
        event.preventDefault();
        $('.edit-countdown').toggle();
    });
}

// Delete

//Run Button Scripts
function runButtons() {
  createButton();
  showUpdateFormButton();
  deleteButton();
}
// Endpoint
function endPointCalls() {

}
runButtons();
