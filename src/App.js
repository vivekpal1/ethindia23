import logo from './logo.svg';
import './App.css';
import { useWaku } from '@waku/react';
import { createEncoder, createDecoder } from "@waku/sdk";
import protobuf from 'protobufjs';
import Header from './component/header';
import { useEffect, useState } from 'react';
const { clipboard } = require('electron');

function App() {
  const { node, error, isLoading } = useWaku();
  const [clipboardText, setClipboardText] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      const text = clipboard.readText();
      if (text !== clipboardText) {
          setClipboardText(text);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [clipboardText]);

  return (
    <div className="App min-h-screen w-full grid place-content-center">
      <Header />
      <h2 className='text-white font-light text-xl'>Welcome to <span className='text-purple-300'>Uniboard</span></h2>
      <p>{clipboardText}</p>
    </div>
  );
}

export default App;
