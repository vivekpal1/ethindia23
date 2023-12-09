import logo from './logo.svg';
import './App.css';
import { useWaku } from '@waku/react';
import { createEncoder, createDecoder } from "@waku/sdk";
import protobuf from 'protobufjs';
import Header from './component/header';
import Clipboard from './component/clipboard';
import { useEffect, useState } from 'react';

function App() {
  const { node, error, isLoading } = useWaku();

  return (
    <div className="App min-h-screen w-full grid place-content-center">
      <Header />
      <h2 className='text-white text-xl mt-20'>Welcome to <span className='text-purple-300'>Uniboard</span></h2>
      <Clipboard />
    </div>
  );
}

export default App;
