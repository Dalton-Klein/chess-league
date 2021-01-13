const express = require('express');
const topicController = require('./controllers/topic.controller');
const router = express.Router();

router.get('/topics', topicController.getAllTopics);
router.post('/topics', topicController.postOneTopic);
router.delete('/topics/:id', topicController.deleteTopic);
router.put('/topics/:id/down', topicController.voteDownTopic);
router.put('/topics/:id/up', topicController.voteUpTopic);

module.exports = router;
