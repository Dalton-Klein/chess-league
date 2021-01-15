const { Schema, model } = require('mongoose');

const TopicSchema = new Schema({
  username:     {type: String, required: true},
  level:        {type: String, required: true},
  rating:       {type: String, required: true},
  time:         {type: String, required: true},
  published_at: {type: Date, default: Date.now},
});

module.exports = model('chess_matches', TopicSchema);