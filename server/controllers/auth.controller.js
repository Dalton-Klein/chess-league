const ChessAuth = require('../models/chessAuth.model');

exports.getLatestAuth = async (req, res) => {
  try {
    const auth = await ChessAuth.find().sort({ _id: -1 }).limit(1)
    console.log('♛ A Player Requested Latest Auth ♛:  ', auth);
    res.send(auth);
  } catch (error) {
    res.sendStatus(500);
  }
};

exports.addAuth = async (req, res) => {
  console.log('♟️ A Player Moved ♟️:  ', req.body);
  try {
    const { username } = req.body;
    const auth = await ChessAuth.create({ username });
    res.status(201);
    res.send(auth);
  } catch (error) {
    res.sendStatus(500);
  }
};