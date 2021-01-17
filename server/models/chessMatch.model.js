const { Schema, model } = require('mongoose');

const MatchSchema = new Schema({
  id:            {type: String, required: true},
  username:      {type: String, required: true},
  hostColor:     {type: String, required: true},
  level:         {type: String, required: true},
  rating:        {type: String, required: true},
  time:          {type: String, required: true},
  opponent:      {type: String, required: true},
  published_at:  {type: Date, default: Date.now},
});

module.exports = model('chess_matches', MatchSchema);