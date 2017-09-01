const Survey = require('../models/survey');

exports.createNew = (req, res, next) => {
  const userId = req.user._id;
  const options = req.body.options.map((option) => {
    return { 
      option,
      count: 0
    };
  });
  
  const newSurvey = new Survey({
    question: req.body.question,
    userId,
    options
  });

  newSurvey.save();
  res.json(newSurvey._id);
}

exports.fetchUserSurveys = (req, res, next) => {
  const userId = req.user._id;
  Survey.findByUserId(userId).then((data) => {
    return res.send({ data });
  });
}

exports.fetchAllSurveys = (req, res, next) => {
  Survey.find({}).then((data) => {
    return res.send({ data });
  })
}

exports.fetchSingleSurvey = (req, res, next) => {
  const id = req.params.id;
  Survey.findById(id).then((survey) => {
    return res.send(survey);
  });
}

exports.deleteSurvey = async (req, res, next) => {
  const id = req.params.id;
  const userId = req.user._id;

  try {
    const survey = await Survey.findOneAndRemove({
      _id: id,
      userId
    });

    if (!survey) {
      return res.status(404).send('Survey not found!');
    }
    res.status(200).send({survey});
  } catch (e) {
    res.status(400).send(e);
  }
}

exports.voteForOption = async (req, res, next) => {
  const optionIndex = req.body.optionIndex;
  const id = req.params.id;

  if (!optionIndex && optionIndex !== 0) { return res.status(400).send(); }

  const survey = await Survey.findOneAndUpdate({ "_id": id }, {
    $inc: {
      ['options.' + optionIndex + '.count']: 1
    },
    $push: {
      voters_ip: req.headers['x-forwarded-for']
    }
  }, {new: true});
  res.send({survey});
}

exports.voteForNewOption = async (req, res, next) => {
  const newOption = req.body.newOption;
  const id = req.params.id;

  if (!newOption) { res.status(400).send(); }
  const survey = await Survey.findOneAndUpdate({ "_id": id}, {
    $push: {
      options: {
        option: newOption,
        count: 1
      },    
      voters_ip: req.ip
    }
  }, {new: true});
  res.send({survey});
}

exports.addOption = async (req, res, next) => {
  const id = req.params.id;
  const newOption = req.body.newOption;

  if (!newOption) { return res.status(400).send(); }

  const survey = await Survey.findOneAndUpdate({ _id: id }, {
    $addToSet : { 'options': {
      'option': newOption,
      'count': 0
    }}
  }, {new: true});

  res.send({survey});
}