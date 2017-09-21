const Survey = require('../models/survey');
const User = require('../models/user');

exports.createNew = async (req, res, next) => {
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

  // Add survey id to user surveys list
  await User.findOneAndUpdate({ _id: userId }, {
    $push: {
      surveys: newSurvey._id
    }
  }, {new: true});

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
  const ip = req.headers['x-forwarded-for'] || '127.0.0.1';
  Survey.findById(id).then((survey) => {
    return res.send({survey, ip});
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
  let ip = req.headers['x-forwarded-for'] || '127.0.0.1';

  function extractIP(inputIP) {
    if (inputIP.indexOf(',') > -1) {
      let arr = inputIP.split(',');
      return arr[arr.length - 1].slice(1);
    }
    return inputIP;
  }

  ip = extractIP(ip);
  

  if (!optionIndex && optionIndex !== 0) { return res.status(400).send(); }

  const survey = await Survey.findOneAndUpdate({ "_id": id }, {
    $inc: {
      ['options.' + optionIndex + '.count']: 1
    },
    $push: {
      voters: {
        ip,
        option: optionIndex
      }
    }
  }, {new: true});
  res.send({survey, ip});
}

exports.voteForNewOption = async (req, res, next) => {
  const { newOption, optionIndex } = req.body;
  const id = req.params.id;
  const ip = req.headers['x-forwarded-for'] || '127.0.0.1';

  if (!newOption) { res.status(400).send(); }
  const survey = await Survey.findOneAndUpdate({ "_id": id}, {
    $push: {
      options: {
        option: newOption,
        count: 1
      },    
      voters: {
        ip,
        option: optionIndex
      }
    }
  }, {new: true});
  res.send({survey, ip});
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