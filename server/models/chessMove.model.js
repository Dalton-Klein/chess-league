const { Schema, model } = require('mongoose');

const TopicSchema = new Schema({
  color:        {type: String, required: true},
  pieceName:        {type: String, required: true},
  fromColumn:        {type: Number, default: 0},
  fromRow:        {type: Number, default: 0},
  toColumn:        {type: Number, default: 0},
  toRow:        {type: Number, default: 0},
  published_at: {type: Date, default: Date.now},
});

module.exports = model('chess_move_made', TopicSchema);