const ChessAuth = require('../models/chessAuth.model');
const ChessToken = require('../models/chessToken.model');
const bcrypt    = require('bcrypt')
const keygen = require('../services/services');

exports.signin = async (req, res) => {
  try {
    console.log('♛ A Player Requested Sign In ♛:  ');
    const { email, password } = req.body;
    filter = {email: email }
    const user = await ChessAuth.findOne(filter);
    let result = '';
    if ( user !== null) {
      const validPass = await bcrypt.compare(password, user.hashed)
      if ( validPass ) {
        let token = keygen.keyGen(15);
        const deleteOldTokens = await ChessToken.deleteMany({email: email})
        const newToken = await ChessToken.create({ email, token });
        result = {success: token}
      }
      else result = {error: 'One of your credentials is incorrect!'};
    } else result = {error: 'One of your credentials is incorrect!'};
    res.send(result);
  } catch (error) {
    console.log(error);
    res.sendStatus(500); 
  }
};

exports.signup = async (req, res) => {
  try {
    console.log('♛ A Player Requested Sign Up ♛:  ');
    const { email, username, password } = req.body;
    const filter1 =  {username: username };
    const filter2 =  {email: email };
    const userCheck = await ChessAuth.findOne(filter1);
    const emailCheck = await ChessAuth.findOne(filter2);
    let result = '';
    if (userCheck === null  && emailCheck === null) {
      const hashed = await bcrypt.hash(password, 10);
      const newUser = await ChessAuth.create({ email, username, hashed });
      result = {success: 'User created'}
    } else {
      if (userCheck !== null) result = {error: 'Username is taken'};
      if (emailCheck !== null) result = {error: 'Account exists with this email'};
    }
    res.send(result);
  } catch (error) {
    console.log('What is error: ', error);
    res.sendStatus(500); 
  }
};

