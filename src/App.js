import React, { useState } from 'react';
import './App.css';
import Header from './component/header';
import Clipboard from './component/clipboard';
import ContextMenu from './component/context-menu';

function App() {
  const [contextMenu, setContextMenu] = useState(null);
  const [clipboardData, setClipboardData] = useState([]);

  const handleContextMenu = (event) => {
    event.preventDefault();
    setContextMenu({ x: event.pageX, y: event.pageY });
  };

  const handleClick = () => {
    setContextMenu(null);
  };

  return (
    <div className="App min-h-screen w-full grid place-content-center" onClick={handleClick} onContextMenu={handleContextMenu}>
      <Header />
      {contextMenu && (
        <ContextMenu 
          position={contextMenu}
          clipboardData={clipboardData}
        />
      )}
      <h2 className='text-white text-xl mt-20'>Welcome to <span className='text-purple-300'>Uniboard</span></h2>
      <Clipboard clipboardData={clipboardData} setClipboardData={setClipboardData} />
    </div>
  );
}

export default App;
