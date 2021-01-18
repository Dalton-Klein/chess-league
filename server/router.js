const express = require('express');
const chessMoveController = require('./controllers/move.controller');
const chessAuthController = require('./controllers/auth.controller');
const chessMatchController = require('./controllers/match.controller');
const chessSaveController = require('./controllers/save.controller');
const router = express.Router();

//Authentication Related Routes
router.post('/signin',          chessAuthController.signin);
router.post('/signup',          chessAuthController.signup);
router.post('/guestSignIn',     chessAuthController.guestSignIn);

//User Progress Routes
router.post('/saveProgress',     chessSaveController.saveProgress);

//Matchmaking Related Routes
router.post('/getMatches',      chessMatchController.getMatches);
router.post('/addMatch',        chessMatchController.addMatch);
router.post('/removeMatch',      chessMatchController.removeMatch);
router.post('/lookForOpponent', chessMatchController.lookForOpponent);
router.post('/acceptMatch',     chessMatchController.acceptMatch);
router.post('/startMatch',      chessMatchController.startMatch);

//In Match Related Routes
router.post('/checkingForMove', chessMoveController.getLatestMove);
router.post('/moveMade',        chessMoveController.postMove);
router.post('/finishedGame',    chessMoveController.deleteMove);

module.exports = router;
