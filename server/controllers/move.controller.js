const ChessMove = require('../models/chessMove.model');
const services = require('../services/services');

exports.getLatestMove = async (req, res) => {
  console.log('♟️ A Player Requested Latest Move ♟️:  ', req.body);
  try {
    const { email, token, matchid } = req.body;
    const tokenValid = await services.checkToken( email, token );
    if ( tokenValid === true ) {
        const latestMove = await ChessMove.find({ matchid: matchid }).sort({ _id: -1 }).limit(1)
        res.send(latestMove);
      }
      else res.send({error: 'Not Authenticated'})
  } catch (error) {
    res.sendStatus(500);
  }
};

exports.postMove = async (req, res) => {
  try {
    const { email, token, matchid, color, pieceName, fromColumn, fromRow, toColumn, toRow } = req.body;
    const tokenValid = await services.checkToken( email, token );
    if ( tokenValid === true ) {
      console.log('♟️ A Player Moved ♟️:  ', req.body);
      let filter = { matchid: matchid }
        const isFirstMove = await ChessMove.findOne(filter)
        let moveSaving;
        if (isFirstMove === [] || isFirstMove === null ) {
          moveSaving = await ChessMove.create({ matchid, color, pieceName, fromColumn, fromRow, toColumn, toRow });
        }
        else {
          const update = {$set :
            { color:      color, 
              pieceName:  pieceName, 
              fromColumn: fromColumn, 
              fromRow:    fromRow,
              toColumn:   toColumn, 
              toRow:      toRow 
            } 
          }
          moveSaving = await ChessMove.findOneAndUpdate(filter, update, { new: true, useFindAndModify: false })
        }
        res.status(201);
        res.send(moveSaving);
      }
      else res.send({error: 'Not Authenticated'})
  } catch (error) {
    res.sendStatus(500);
    console.log(error);
  }
};

exports.deleteMove = async (req, res) => {
  // console.log('What is req? ', req.body);
  try {
    const { email, token, id } = req.body;
    const tokenValid = await services.checkToken( email, token );
    if ( tokenValid === true ) {
        await ChessMove.deleteOne({ id: id });
        res.sendStatus(204);
      }
      else res.send({error: 'Not Authenticated'})
  } catch (error) {
    res.sendStatus(500);
  }
};




