const { Schema, model } = require('mongoose');

const TopicSchema = new Schema({
  email:       {type: String, required: true},
  username:       {type: String, required: true},
  password:       {type: String, required: true},
  published_at: {type: Date, default: Date.now},
});

module.exports = model('chess_active_users', TopicSchema);