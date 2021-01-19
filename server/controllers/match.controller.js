const ChessMatch = require('../models/chessMatch.model');
const services = require('../services/services');

exports.getMatches = async (req, res) => {
  try {
    //console.log('♛ A Player Requested Matches ♛:  ');
    const { email, token } = req.body
    const tokenValid = await services.checkToken( email, token );
    if ( tokenValid === true ) {
      const allMatches = await ChessMatch.find()
      res.send(allMatches);
    } else res.send({error: 'Not Authenticated'})
  } catch (error) {
    res.sendStatus(500);
  }
};

exports.addMatch = async (req, res) => {
  //console.log('♟️ A Player Created A Match ♟️:  ', req.body);
  try {
    const { username, email, token, level, rating, time, opponent } = req.body;
    const tokenValid = await services.checkToken( email, token );
    if ( tokenValid === true ) {
      let hostColor;
      if (Math.random() >= .5) hostColor = 'white'
      else hostColor = 'black';
      let id = services.keyGen(10);
      const match = await ChessMatch.create({ id, username, hostColor, level, rating, time, opponent });
      res.status(201);
      res.send(match);
    } else res.send({error: 'Not Authenticated'})
  } catch (error) {
    res.sendStatus(500);
  }
};

exports.removeMatch = async (req, res) => {
  try {
    const { username, email, token } = req.body;
    const tokenValid = await services.checkToken( email, token );
    if ( tokenValid === true ) {
      const filter = { username: username };
      const matchRemoved = await ChessMatch.deleteMany(filter);
      res.send({success: true})
    } else res.send({error: 'Not Authenticated'})
  } catch (error) {
    res.sendStatus(500);
  }
}

exports.lookForOpponent = async (req, res) => {
  //console.log('♟️ Checking For Opponent ♟️:  ', req.body.username);
  try {
    const { username, email, token } = req.body;
    const tokenValid = await services.checkToken( email, token );
    if ( tokenValid === true ) {
      let filter = { username: username }
      const match = await ChessMatch.findOne(filter);
      res.send(match);
    } else res.send({error: 'Not Authenticated'})
  } catch (error) {
    res.sendStatus(500);
  }
}

exports.acceptMatch = async (req, res) => {
  //console.log('♟️ A Player ACCEPTED A Match ♟️:  ', req.body);
  try {
    const { username, email, token, opponent } = req.body;
    const tokenValid = await services.checkToken( email, token );
    if ( tokenValid === true ) {
      let filter = { username: username }
      const update = { opponent: opponent }
      const match = await ChessMatch.findOneAndUpdate(filter, update, { new: true })
      //console.log('Accepted Match & Updated Opponent: ', match);
      res.send(match);
    } else res.send({error: 'Not Authenticated'})
  } catch (error) {
    res.sendStatus(500);
  }
}

  exports.startMatch = async (req, res) => {
    //console.log('♟️ Two Players Started A Match ♟️:  ', req.body);
    try {
      const { username, email, token } = req.body;
      const tokenValid = await services.checkToken( email, token );
      if ( tokenValid === true ) {
        let filter = { username: username }
        const match = await ChessMatch.findOne(filter);
        res.send(match);
        const removeMatch = await ChessMatch.findOneAndDelete(filter);
      } else res.send({error: 'Not Authenticated'})
    } catch (error) {
      res.sendStatus(500);
    }
  }
  