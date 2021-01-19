const mongoose = require('mongoose');
const url = 'mongodb+srv://dalton:dalton@chess-cluster.6e51e.mongodb.net/mongo_chess' 
const localurl = 'mongodb://127.0.0.1:27017/mongo_chess';

module.exports = mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology:true, 
  useFindAndModify:true
}).then(() => console.log('MongoDB Connected...'))
.catch(err => console.log(err));