const ChessMatch = require('../models/chessMatch.model');
const services = require('../services/services');

exports.getMatches = async (req, res) => {
  try {
    const { email, token } = req.body
    if ( services.checkToken( email, token ) === true ) {
      const allMatches = await ChessMatch.find()
      console.log('♛ A Player Requested Matches ♛:  ', allMatches);
      res.send(allMatches);
    }
    else res.send({error: 'Not Authenticated'})
  } catch (error) {
    res.sendStatus(500);
  }
};

exports.addMatch = async (req, res) => {
  console.log('♟️ A Player Created A Match ♟️:  ', req.body);
  try {
    const { username, email, token, level, rating, time, opponent } = req.body;
    if ( services.checkToken( email, token ) === true ) {
      let hostColor;
      if (Math.random() >= .5) hostColor = 'white'
      else hostColor = 'black';
      let id = services.keyGen(10);
      const match = await ChessMatch.create({ id, username, hostColor, level, rating, time, opponent });
      res.status(201);
      res.send(match);
    }
    else res.send({error: 'Not Authenticated'})
  } catch (error) {
    res.sendStatus(500);
  }
};

exports.lookForOpponent = async (req, res) => {
  console.log('♟️ CheckForOpponent ♟️:  ', req.body.username);
  try {
    const { username, email, token } = req.body;
    if ( services.checkToken( email, token ) === true ) {
      let filter = { username: username }
      const match = await ChessMatch.findOne(filter, function (err, docs) 
        {console.log('Find Result : ', docs)} 
      );
      res.send(match);
    }
    else res.send({error: 'Not Authenticated'})
  } catch (error) {
    res.sendStatus(500);
  }
}

exports.acceptMatch = async (req, res) => {
  console.log('♟️ A Player ACCEPTED A Match ♟️:  ', req.body);
  try {
    const { username, email, token, opponent } = req.body;
    if ( services.checkToken( email, token ) === true ) {
      let filter = { username: username }
      const update = { opponent: opponent }
      const match = await ChessMatch.findOneAndUpdate(filter, update, { new: true }, (err, doc) => {
        if (err) console.log('Error Updating Opponent');
      })
      console.log('Accepted Match & Updated Opponent: ', match);
      res.send(match);
    }
    else res.send({error: 'Not Authenticated'})
  } catch (error) {
    res.sendStatus(500);
  }
}

  exports.startMatch = async (req, res) => {
    console.log('♟️ Two Players Started A Match ♟️:  ', req.body);
    try {
      const { username, email, token } = req.body;
      if ( services.checkToken( email, token ) === true ) {
        let filter = { username: username }
        const match = await ChessMatch.findOne(filter, function (err, doc) 
          {if (err) console.log('Error Starting Match!!!')}
        );
        {console.log("Find Result : ", match)} 
        res.send(match);
        const removeMatch = await ChessMatch.findOneAndDelete(filter, function (err, docs) 
          {if (err) console.log('Error Deleting Match!!!')} 
        );
      }
      else res.send({error: 'Not Authenticated'})
    } catch (error) {
      res.sendStatus(500);
    }
  }
  