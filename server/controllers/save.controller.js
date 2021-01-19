const ChessUserSave = require('../models/chessUserSave.model');
const services = require('../services/services');

exports.saveProgress = async (req, res) => {
  try {
    const { email, token, username, rating, rankLevel, rankExp, wins, losses, draws } = req.body;
    const tokenValid = await services.checkToken( email, token );
    if ( tokenValid === true ) {
      console.log('♟️ A Player Updated Their Save ♟️:  ', req.body.email);
      let filter = { username: username }
      const update = {$set :
        { username:  username, 
          rating:    rating, 
          rankLevel: rankLevel, 
          rankExp:   rankExp,
          wins:      wins, 
          losses:    losses,
          draws:     draws
        } 
      }
      const userSave = await ChessUserSave.findOneAndUpdate(filter, update, { new: true, useFindAndModify: false })
      res.status(201);
      res.send(userSave);
      }
      else res.send({error: 'Not Authenticated'})
  } catch (error) {
    res.sendStatus(500);
  }
};