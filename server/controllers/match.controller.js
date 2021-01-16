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
    let id = await ChessMatch.find().sort({id: -1}).limit(1);
    id = parseInt(id[0].id) + 1;
    const match = await ChessMatch.create({ id, username, hostColor, level, rating, time, opponent });
    res.status(201);
    res.send(match);
  } catch (error) {
    res.sendStatus(500);
  }
};

exports.lookForOpponent = async (req, res) => {
  console.log('♟️ CheckForOpponent ♟️:  ', req.body.username);
  try {
    const { username } = req.body;
    let filter = { username: username }
    const match = await ChessMatch.findOne(filter, function (err, docs) 
      {console.log('Find Result : ', docs)} 
    );
    res.send(match);
  } catch (error) {
    res.sendStatus(500);
  }
}

exports.acceptMatch = async (req, res) => {
  console.log('♟️ A Player ACCEPTED A Match ♟️:  ', req.body);
  try {
    const { username, opponent } = req.body;
    let filter = { username: username }
    const update = { opponent: opponent }
    const match = await ChessMatch.findOneAndUpdate(filter, update, { new:true }, (err, doc) => {
      if (err) console.log('Error Updating Opponent');
    })
    console.log('Accepted Match & Updated Opponent: ', match);
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
      const match = await ChessMatch.findOne(filter, function (err, doc) 
        {if (err) console.log('Error Starting Match!!!')}
      );
      {console.log("Find Result : ", match)} 
      res.send(match);
      const removeMatch = await ChessMatch.findOneAndDelete(filter, function (err, docs) 
        {if (err) console.log('Error Deleting Match!!!')} 
      );
    } catch (error) {
      res.sendStatus(500);
    }
  }
  