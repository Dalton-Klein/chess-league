const app = require('express')();
const connection = require('./models/index');
const http = require('http').Server(app);
const io = require('socket.io')(http);
const util = require('util');
const port = 3001;
const clients = [];	//track connected clients

// //Server Web Client
// app.get('/', function(req, res){
//   res.sendFile(__dirname + '/index.html');
// });

//make one reference to event name so it can be easily renamed 
const moveEvent = "movePiece";

//When a client connects, bind each desired event to the client socket
io.on('connection', socket =>{
	//track connected clients via log
	clients.push(socket.id);
	const clientConnectedMsg = '🧙 User connected to Socket 🧙 ' + util.inspect(socket.id) + ', total: ' + clients.length;
	io.emit(moveEvent, clientConnectedMsg);
	console.log(clientConnectedMsg);

	//track disconnected clients via log
	socket.on('disconnect', ()=>{
		clients.pop(socket.id);
		const clientDisconnectedMsg = 'User disconnected from Socket ' + util.inspect(socket.id) + ', total: ' + clients.length;
		io.emit(moveEvent, clientDisconnectedMsg);
		console.log(clientDisconnectedMsg);
	})

	//multicast received message from client
	socket.on(moveEvent, msg =>{
		const combinedMsg = socket.id.substring(0,4) + ': ' + msg;
		io.emit(moveEvent, combinedMsg);
		console.log('♟️ A Player Moved ♟️: ' + combinedMsg);
	});
});

(async function () {
  try {
    await connection;
    console.log('🌈😊 Database Is Connected 😊🌈');
    http.listen(port, () => {
      console.log(`✨ Server started ✨ on Port: ${port}:  `);
    });
  } catch (error) {
    console.log('There was an error: ', error);
  }
})();