const mongoose = require('mongoose');

//let enteredDate = moment();

const countdownSchema = mongoose.Schema({
  title: 'string',
  targetDate: 'string',
  notes: 'string',
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

countdownSchema.methods.serialize = function() {
  return {
    id: this._id,
    title: this.title,
    targetDate: this.targetDate,
    notes: this.notes,
    user: this.user.email
  };
};

countdownSchema.pre('find',function(){
  this.populate('user');
});

countdownSchema.pre('findOne',function(){
  this.populate('user');
});

const Countdowns = mongoose.model('Countdowns', countdownSchema);

module.exports = { Countdowns }; // {Countdown: Countdown}
