// import React, { useRef, useEffect } from 'react';
// import Helmet from 'react-helmet';
// import htmlDoc from '../../UE4-HTML5/html.js';

// export default function Canvas() {
//   // useEffect(() => {
//   //   // Your code here
//   //  <script id="firstscript" src="https://code.jquery.com/jquery-2.1.3.min.js"></script>
//   //	<script id="secondscript" src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/js/bootstrap.min.js"></script>
   
//   //   'ChessLeague.UE4.js'
   
//   // }, []);

//   // <div dangerouslySetInnerHTML={{__html: htmlDoc}}>
//   // </div> 

//   const iframe = '<iframe id="canvas" width="500" height="300" src="../../UE4-HTML5/html.js" scrolling="no" frameborder="0"></iframe>';

//   return (
//     <>
      
      
//     </>
//   )
// }



import React from 'react';
const Canvas = (props) => {
  
  return (
    <iframe src="http://127.0.0.1:5500/client/chess-league/src/UE4-HTML5/ChessLeague.html" scrolling="no" frameBorder="0"  id="canvas" width="1000" height="800"
    />
  );
};

export default Canvas;