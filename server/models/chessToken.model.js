const { Schema, model } = require('mongoose');

const TokenSchema = new Schema({
  email:      {type: String, required: true},
  token:        {type: String, required: true},
  published_at: {type: Date, default: Date.now},
});

module.exports = model('chess_tokens', TokenSchema);