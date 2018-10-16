const mongoose = require('mongoose');

let enteredDate = moment

const countdownSchema = mongoose.Schema({
  user: req.user,
  title: 'string',
  date: 'string',
  notes: 'string'
})

module.exports = mongoose.model('Countdown', countdownSchema);
