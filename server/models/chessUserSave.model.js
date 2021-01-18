const { Schema, model } = require('mongoose');

const UserSaveSchema = new Schema({
  username:     {type: String, required: true},
  rating:       {type: String, required: true},
  rankLevel:    {type: String, required: true},
  rankExp:      {type: String, required: true},
  wins:         {type: String, required: true},
  losses:       {type: String, required: true},
  draws:        {type: String, required: true},
  published_at: {type: Date, default: Date.now},
});

module.exports = model('chess_user_saves', UserSaveSchema);