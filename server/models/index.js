const mongoose = require('mongoose');
const url = 'mongodb+srv://dalton:Deadmau55@chess-cluster.6e51e.mongodb.net/mongo_chess?retryWrites=true&w=majority' || 'mongodb://127.0.0.1:27017/mongo_chess';

module.exports = mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology:true, 
  useFindAndModify:true
});