const ChessMove = require('../models/chessMove.model');

exports.getLatestMove = async (req, res) => {
  console.log('♟️ A Player Requested Latest Move ♟️:  ', req.body);
  try {
    const latestMove = await ChessMove.find().sort({ _id: -1 }).limit(1)
    res.send(latestMove);
  } catch (error) {
    res.sendStatus(500);
  }
};

exports.postMove = async (req, res) => {
  console.log('♟️ A Player Moved ♟️:  ', req.body);
  try {
    const { color, pieceName, fromColumn, fromRow, toColumn, toRow } = req.body;
    const topic = await ChessMove.create({ color, pieceName, fromColumn, fromRow, toColumn, toRow });
    res.status(201);
    res.send(topic);
  } catch (error) {
    res.sendStatus(500);
  }
};

exports.deleteTopic = async (req, res) => {
  // console.log('What is req? ', req.body);
  try {
    const { id } = req.params;
    await Topic.deleteOne({ _id: id });
    res.sendStatus(204);
  } catch (error) {
    res.sendStatus(500);
  }
};

exports.voteUpTopic = (req, res) => this.voteTopic (req, res, 1);
exports.voteDownTopic = (req, res) => this.voteTopic (req, res, -1);

exports.voteTopic = async (req, res, direction) => {
  // console.log('What is req? ', req.body);
  try {
    const { id } = req.params;
    const topic = await Topic.findByIdAndUpdate(
      { _id:  id },
      { $inc: {score: direction }},
      { new:  true }
    );
    res.send(topic);
  } catch (error) {
    res.sendStatus(500);
  }
};

