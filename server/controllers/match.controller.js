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
    const { username, level, rating, time } = req.body;
    const auth = await ChessMatch.create({ username, level, rating, time });
    res.status(201);
    res.send(auth);
  } catch (error) {
    res.sendStatus(500);
  }
};