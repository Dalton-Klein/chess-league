const { Schema, model } = require('mongoose');

const AuthSchema = new Schema({
  email:        {type: String, required: true},
  username:     {type: String, required: true},
  hashed:       {type: String, required: true},
  published_at: {type: Date, default: Date.now},
});

module.exports = model('chess_users', AuthSchema);