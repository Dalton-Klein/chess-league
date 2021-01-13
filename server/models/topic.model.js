const { Schema, model } = require('mongoose');

const TopicSchema = new Schema({
  title:        {type: String, required: true},
  published_at: {type: Date, default: Date.now},
  score:        {type: Number, default: 0}
});

module.exports = model('mongoose_stored_topics', TopicSchema);