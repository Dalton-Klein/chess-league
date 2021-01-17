const ChessMove = require('../models/chessMove.model');

exports.getLatestMove = async (req, res) => {
  console.log('♟️ A Player Requested Latest Move ♟️:  ', req.body);
  try {
    const { matchid } = req.body
    const latestMove = await ChessMove.find({ matchid: matchid }).sort({ _id: -1 }).limit(1)
    res.send(latestMove);
  } catch (error) {
    res.sendStatus(500);
  }
};

exports.postMove = async (req, res) => {
  try {
    console.log('♟️ A Player Moved ♟️:  ', req.body);
    const { matchid, color, pieceName, fromColumn, fromRow, toColumn, toRow } = req.body;
    let filter = { matchid: matchid }
    const isFirstMove = await ChessMove.findOne(filter, (err, doc) => {
      if (err) console.log('Error Updating Opponent');
    })
    let moveSaving;
    if (isFirstMove === [] || isFirstMove === null ) {
      moveSaving = await ChessMove.create({ matchid, color, pieceName, fromColumn, fromRow, toColumn, toRow });
    }
    else {
      const update = {$set :
        { color: color, 
          pieceName: pieceName, 
          fromColumn: fromColumn, 
          fromRow: fromRow,
          toColumn: toColumn, 
          toRow: toRow 
        } 
      }
      moveSaving = await ChessMove.findOneAndUpdate(filter, update, { new: true, useFindAndModify: false }, (err, doc) => {
        if (err) console.log('Error Updating Opponent');
      })
    }
    console.log('Updating....', moveSaving);
    res.status(201);
    res.send(moveSaving);
  } catch (error) {
    res.sendStatus(500);
  }
};

exports.deleteMove = async (req, res) => {
  // console.log('What is req? ', req.body);
  try {
    const { id } = req.params;
    await ChessMove.deleteOne({ id: id });
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

