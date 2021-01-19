const ChessMove = require('../models/chessMove.model');
const services = require('../services/services');

exports.getLatestMove = async (req, res) => {
  //console.log('♟️ A Player Requested Latest Move ♟️:  ', req.body.email);
  try {
    const { email, token, matchid } = req.body;
    const tokenValid = await services.checkToken( email, token );
    if ( tokenValid === true ) {
        const latestMove = await ChessMove.find({ matchid: matchid }).sort({ _id: -1 }).limit(1)
        res.send(latestMove);
        //console.log(latestMove);
      }
      else res.send({error: 'Not Authenticated'})
  } catch (error) {
    res.sendStatus(500);
  }
};

exports.postMove = async (req, res) => {
  try {
    const { email, token, matchid, color, pieceName, fromColumn, fromRow, toColumn, toRow, winner } = req.body;
    const tokenValid = await services.checkToken( email, token );
    if ( tokenValid === true ) {
      //console.log('♟️ A Player Moved ♟️:  ', req.body);
      let filter = { matchid: matchid }
        const isFirstMove = await ChessMove.findOne(filter, { useFindAndModify: false })
        let moveSaving;
        if (isFirstMove === [] || isFirstMove === null ) {
          moveSaving = await ChessMove.create({ matchid, color, pieceName, fromColumn, fromRow, toColumn, toRow, winner });
        } else {
          console.log('What is winner in reg move?  ', winner);
          let update = '';
          if( winner ==='white' || winner ==='black' || winner ==='draw' ) {
            update = {$set :
              { color:      color, 
                pieceName:  pieceName, 
                fromColumn: fromColumn, 
                fromRow:    fromRow,
                toColumn:   toColumn, 
                toRow:      toRow,
                winner:     winner  
              } 
            }
          } else {
            update = {$set :
              { color:      color, 
                pieceName:  pieceName, 
                fromColumn: fromColumn, 
                fromRow:    fromRow,
                toColumn:   toColumn, 
                toRow:      toRow 
              } 
            }
          }
          moveSaving = await ChessMove.findOneAndUpdate(filter, update, { new: true, useFindAndModify: false })
          console.log('♟️ A Player Moved ♟️:  ', update);
        }
        res.status(201);
        res.send(moveSaving);
      }
      else res.send({error: 'Not Authenticated'})
  } catch (error) {
    res.sendStatus(500);
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




