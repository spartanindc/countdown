//Handle Buttons

// Create
function createButton() {
  $('.create').on('click', event => {
        event.preventDefault();
        $('.create-countdown').html(`
            <div class="well">
                <h3><span class="fa fa-user"></span>Create Countdown</h3>

                <form action="/countdowns" method="post">
                    <div class="form-group">
                        <label>Title for Countdown</label>
                        <input type="text" class="form-control" name="title">
                    </div>
                    <div class="form-group">
                        <label>Target Date</label>
                        <input type="date" class="form-control" name="targetDate">
                    </div>
                    <div class="form-group">
                        <label>Notes</label>
                        <input type="text" class="form-control" name="notes">
                    </div>

                    <button type="submit" class="btn btn-warning btn-lg">Create</button>
                </form>
            </div>`);
    });
}

// Update
function updateButton() {
    $('.create').on('click', event => {
        event.preventDefault();
        $('.create-countdown').html(`
            <div class="well">
                <h3><span class="fa fa-user"></span>Update Countdown</h3>

                <form action="/countdowns" method="post">
                    <div class="form-group">
                        <label>Title for Countdown</label>
                        <input type="text" class="form-control" name="title" value="<%= countdowns[i].title %>">
                    </div>
                    <div class="form-group">
                        <label>Target Date</label>
                        <input type="date" class="form-control" name="targetDate" value="<%= countdowns[i].targetDate %>">
                    </div>
                    <div class="form-group">
                        <label>Notes</label>
                        <input type="text" class="form-control" name="notes" value="<%= countdowns[i].notes %>">
                    </div>

                    <button type="submit" class="btn btn-warning btn-lg">Create</button>
                </form>
            </div>`);
    });
}



// Delete

//Run Button Scripts
function runButtons() {
  createButton();
  updateButton();
  deleteButton();
}
runButtons();
