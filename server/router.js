const express = require('express');
const chessMoveController = require('./controllers/move.controller');
const chessAuthController = require('./controllers/auth.controller');
const chessMatchController = require('./controllers/match.controller');
const router = express.Router();

router.post('/checkingForMove', chessMoveController.getLatestMove);
router.post('/moveMade',        chessMoveController.postMove);
router.post('/addAuth',         chessAuthController.addAuth);
router.post('/getAuth',         chessAuthController.getLatestAuth);
router.post('/addMatch',        chessMatchController.addMatch);
router.post('/getMatches',      chessMatchController.getMatches);
router.post('/lookForOpponent', chessMatchController.lookForOpponent);
router.post('/acceptMatch',     chessMatchController.acceptMatch);
router.post('/startMatch',      chessMatchController.startMatch);
router.post('/deleteMatch',      chessMatchController.deleteMatch);
//router.put('/chess/:id/down', chessController.voteDownchess);
//router.put('/chess/:id/up', chessController.voteUpchess);

module.exports = router;
