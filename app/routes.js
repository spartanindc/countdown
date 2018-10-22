const { Countdown } = require('./models/countdown');

module.exports = (app, passport) => {

//HOME PAGE (with login links)

    app.get('/', (req, res) => {
        res.render('index.ejs'); // load the index.ejs file
    });

// LOGIN
    // show the login form
    app.get('/login', (req, res) => {

        // render the page and pass in any flash data if it exists
        res.render('login.ejs', { message: req.flash('loginMessage') });
    });

    // process the login form
    app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/login', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));


// SIGNUP
    // show the signup form
    app.get('/signup', (req, res) => {

        // render the page and pass in any flash data if it exists
        res.render('signup.ejs', { message: req.flash('signupMessage') });
    });

    // process the signup form
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

// PROFILE/DASHBOARD SECTION

    // protected so you have to be logged in to visit
    // use route middleware to verify this (the isLoggedIn function)
    app.get('/profile', isLoggedIn, (req, res) => {
        res.render('profile.ejs', {
            user : req.user, // get the user out of session and pass to template
            countdowns : req.countdowns
        });
    });

// COUNTDOWN CRUD SECTION

    //View Countdowns in new PAGE

    app.get('/countdowns', isLoggedIn, (req, res) => {
      Countdown.find({},function(err,data){
        res.send(data);
      });
        /*res.render('countdowns.ejs', {
            user : req.user,
            countdownList: req.countdowns
        });*/
    });

    //CREATE countdowns
    app.post('/countdowns', isLoggedIn, (req, res) => {
      console.log(req.body);
      let newCountdown = req.body;
      newCountdown.user = ""+req.user._id+"";
      console.log(newCountdown);
      //const newCountdown = new Countdown();
      Countdown.create(newCountdown,function(err,countdown){
        res.send(countdown);
      });
      /*newCountdown.title = req.body.title;
      newCountdown.targetDate = req.body.targetDate;
      newCountdown.notes = req.body.notes;*/

      /*newCountdown.save(function(err) {
          if (err)
              throw err;
          return done(null, newCountdown);
      });*/
    });

    //UPDATE countdowns

  app.put('/countdowns/:id', (req, res) => {
      //Ensure valid request to update
      const requiredFields = ['date', 'time', 'id'];
      for (let i=0; i<requiredFields.length; i++) {
        const field = requiredFields[i];
        if (!(field in req.body)) {
          const message = `Missing \`${field}\` in request body`;
          console.error(message);
          return res.status(400).send(message);
        }
        if (req.params.id !== req.body.id) {
          const message = `Request path id (${req.params.id}) and request body id (${req.body.id}) must match`;
          console.error(message);
          return res.status(400).send(message);
        }
      }
      //Update
      const updated = {};
      const updateableFields = ['title', 'targetDate', 'notes'];

        updateableFields.forEach(field => {
          if (field in req.body) {
            updated[field] = req.body[field];
          }
        });

         Countdown
           .findByIdAndUpdate(req.params.id, { $set: updated }, { new: true })
           .then(updatedPost => res.status(204).end())
           .catch(err => res.status(500).json({ message: 'Something went wrong' }));

      console.log(`Updating Countdown item \`${req.params.id}\``);
    });

    //DELETE countdowns
    app.delete('/countdowns/:id', (req, res) => {
      Countdown
        .findbyIdandRemove(req.params.id)
        .then(() => {
          console.log(`deleted countdown with id \`${req.params.id}\``);
          res.status(204).end();
        });
    });

// LOGOUT
    app.get('/logout', (req, res) => {
        req.logout();
        res.redirect('/');
    });
};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}
