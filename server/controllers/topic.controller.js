const Topic = require('../models/topic.model');

exports.getAllTopics = async (_, res) => {
  // console.log('What is res? ', res);
  try {
    const topics = await Topic.find();
    res.send(topics);
  } catch (error) {
    res.sendStatus(500);
  }
};

exports.postOneTopic = async (req, res) => {
  // console.log('What is req? ', req.body);
  try {
    const { title } = req.body;
    const topic = await Topic.create({ title });
    res.status(201);
    res.send(topic);
  } catch (error) {
    res.sendStatus(500);
  }
};

exports.deleteTopic = async (req, res) => {
  // console.log('What is req? ', req.body);
  try {
    const { id } = req.params;
    await Topic.deleteOne({ _id: id });
    res.sendStatus(204);
  } catch (error) {
    res.sendStatus(500);
  }
};

exports.voteUpTopic = (req, res) => this.voteTopic (req, res, 1);
exports.voteDownTopic = (req, res) => this.voteTopic (req, res, -1);

exports.voteTopic = async (req, res, direction) => {
  // console.log('What is req? ', req.body);
  try {
    const { id } = req.params;
    const topic = await Topic.findByIdAndUpdate(
      { _id:  id },
      { $inc: {score: direction }},
      { new:  true }
    );
    res.send(topic);
  } catch (error) {
    res.sendStatus(500);
  }
};

