const mongoose = require('mongoose');
const url = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/mongo_chess';

module.exports = mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology:true, 
  useFindAndModify:true
});