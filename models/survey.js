const mongoose = require('mongoose');
const { Schema } = mongoose;

const surveySchema = new Schema({
  question: {
    type: String,
    required: true
  },
  userId: {
    type: String,
    required: true
  },
  options: [],
  voters_ip: []
});

surveySchema.statics.findByUserId = function(userId) {
  const Survey = this;

  return Survey.find({ userId }).then((listOfSurveys) => {
    if (!listOfSurveys) {
      return Promise.reject();
    } else {
      return Promise.resolve(listOfSurveys);
    }
  });
}

module.exports = mongoose.model('survey', surveySchema);