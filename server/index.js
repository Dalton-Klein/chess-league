//dalton Deadmau55
const express = require('express');
const cors = require('cors');
const router = require('./router');
//process.env for heroku
const port = process.env.PORT || 3001
const app = express();

app
.use(cors())
.use(express.json())
.use(router);

const connection = require('./models/index');

(async function () {
  try {
    await connection;
    console.log('🌈😊 Database Is Connected 😊🌈');
    app.listen(port, () => {
      console.log(`✨ Server started ✨ on Port: ${port}:  `);
    });
  } catch (error) {
    console.log('There was an error: ', error);
  }
})();
