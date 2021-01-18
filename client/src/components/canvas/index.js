import React from 'react';
import './canvas.css';

const Canvas = (props) => {
  
  return (
    <iframe src="http://127.0.0.1:5500/client/src/UE4/ChessLeague.html" scrolling="no" frameBorder="0"  id="canvas" className="canvas" />
  );
};

export default Canvas;