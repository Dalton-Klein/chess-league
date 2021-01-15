const ChessMatch = require('../models/chessMatch.model');

exports.getMatches = async (req, res) => {
  try {
    const allMatches = await ChessMatch.find()
    console.log('♛ A Player Requested Matches ♛:  ', allMatches);
    res.send(allMatches);
  } catch (error) {
    res.sendStatus(500);
  }
};

exports.addMatch = async (req, res) => {
  console.log('♟️ A Player Created A Match ♟️:  ', req.body);
  try {
    const { username, level, rating, time, opponent } = req.body;
    let hostColor;
    if (Math.random() >= .5) hostColor = 'white'
    else hostColor = 'black';
    const match = await ChessMatch.create({ username, hostColor, level, rating, time, opponent });
    res.status(201);
    res.send(match);
  } catch (error) {
    res.sendStatus(500);
  }
};

exports.lookForOpponent = async (req, res) => {
  console.log('♟️ CheckForOpponent ♟️:  ', req.body.username);
  try {
    const { username, opponentUsername } = req.body;
    let filter = { username: username }
    const match = await ChessMatch.findOne(filter, function (err, docs) 
      {console.log("Find Result : ", docs)} 
    );
    res.send(match);
  } catch (error) {
    res.sendStatus(500);
  }
}

exports.acceptMatch = async (req, res) => {
  console.log('♟️ A Player ACCEPTED A Match ♟️:  ', req.body);
  try {
    const { username, opponentUsername } = req.body;
    let filter = { username: username }
    const update = { opponent: opponentUsername }
    const match = await ChessMatch.findOneAndUpdate(filter, update, {
      new:true
    })
    res.send(match);
  } catch (error) {
    res.sendStatus(500);
  }
}

  exports.startMatch = async (req, res) => {
    console.log('♟️ Two Players Started A Match ♟️:  ', req.body);
    try {
      const { username } = req.body;
      let filter = { username: username }
      const match = await ChessMatch.findOneAndDelete(filter, function (err, docs) 
      {console.log("Delete Result : ", docs)} 
      );
      res.send(match);
    } catch (error) {
      res.sendStatus(500);
    }
  }
  
  