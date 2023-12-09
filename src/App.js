import React, { useEffect, useState } from 'react';
import { initializeWaku, sendClipboardData, listenToClipboardMessages } from './waku/renderer';
import ContextMenu from './component/context-menu';
import Header from './component/header';
import './App.css';

function App() {
  const [waku, setWaku] = useState(null);
  const [clipboardText, setClipboardText] = useState('');
  const [contextMenu, setContextMenu] = useState(null);
  const contentTopic = 'uniboardClipboardSync';

  useEffect(() => {
    async function setupWaku() {
      try {
        const wakuInstance = await initializeWaku();
        setWaku(wakuInstance);
        listenToClipboardMessages(wakuInstance, contentTopic, setClipboardText);
      } catch (error) {
        console.error('Error setting up Waku:', error);
      }
    }

    setupWaku();
  }, []);

  const handleSyncClipboard = async () => {
    try {
      const clipboardData = 'Sample clipboard data';
      await sendClipboardData(waku, clipboardData, contentTopic);
    } catch (error) {
      console.error('Error sending clipboard data:', error);
    }
  };

  const handleContextMenu = (event) => {
    event.preventDefault();
    setContextMenu({
      position: { x: event.pageX, y: event.pageY },
      items: [
        { label: 'Copy as PNG', action: () => console.log('Copy as PNG') },
        { label: 'Copy as SVG', action: () => console.log('Copy as SVG') },
      ],
    });
  };

  const handleClick = () => {
    setContextMenu(null);
  };

  return (
    <div className="App min-h-screen w-full grid place-content-center" onClick={handleClick} onContextMenu={handleContextMenu}>
      <Header />
      <h2 className='text-white font-light text-xl'>Welcome to <span className='text-purple-300'>Uniboard</span></h2>
      <button onClick={handleSyncClipboard}>Sync Clipboard</button>
      <p>Clipboard Content: {clipboardText}</p>
      {contextMenu && (
        <ContextMenu
          items={contextMenu.items}
          position={contextMenu.position}
        />
      )}
    </div>
  );
}

export default App;
