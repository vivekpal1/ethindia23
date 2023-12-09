import React, { useEffect, useState } from 'react';
import { initializeWaku, sendClipboardData, listenToClipboardMessages } from './waku/renderer';
import ContextMenu from './components/ContextMenu'; // Import the ContextMenu component
import Header from './component/header';
import './App.css';

function App() {
  const { node, error, isLoading } = useWaku();
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
      const clipboardData = 'Sample clipboard data'; // Replace with actual clipboard data
      await sendClipboardData(waku, clipboardData, contentTopic);
    } catch (error) {
      console.error('Error sending clipboard data:', error);
    }
  };

  // Right-click handler to show context menu
  const handleContextMenu = (event) => {
    event.preventDefault();
    setContextMenu({
      position: { x: event.pageX, y: event.pageY },
      items: [
        { label: 'Copy as PNG', action: () => console.log('Copy as PNG') },
        { label: 'Copy as SVG', action: () => console.log('Copy as SVG') },
        // Add more items as needed
      ],
    });
  };

  // Click handler to hide context menu
  const handleClick = () => {
    setContextMenu(null);
  };

  return (
    <div className="App min-h-screen w-full grid place-content-center" onClick={handleClick} onContextMenu={handleContextMenu}>
      <Header />
      <h2 className='text-white font-light text-xl'>Welcome to <span className='text-purple-300'>Uniboard</span></h2>
      <button onClick={handleSyncClipboard}>Sync Clipboard</button>
      <p>Clipboard Content: {clipboardText}</p>
      {/* Render the context menu when it is set */}
      {contextMenu && (
        <ContextMenu
          items={contextMenu.items}
          position={contextMenu.position}
        />
      )}
      <h2 className='text-white text-xl mt-20'>Welcome to <span className='text-purple-300'>Uniboard</span></h2>
      <Clipboard />
    </div>
  );
}

export default App;
