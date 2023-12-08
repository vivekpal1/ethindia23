import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { LightNodeProvider } from '@waku/react';
import { createWeb3Modal, defaultWagmiConfig } from '@web3modal/wagmi/react'

import { WagmiConfig } from 'wagmi'
import { arbitrum, mainnet } from 'viem/chains'

// 1. Get projectId at https://cloud.walletconnect.com
const projectId = 'a74db643f90e8f82e7ddc3132543ff6f'

// 2. Create wagmiConfig
const metadata = {
  name: 'Uniboard',
  description: 'Decentralised Universal Clipboard',
  url: 'https://uniboard.com',
  icons: ['https://avatars.githubusercontent.com/u/37784886']
}

const chains = [mainnet, arbitrum]
const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata })

// 3. Create modal
createWeb3Modal({ wagmiConfig, projectId, chains })

const NODE_OPTIONS = { defaultBootstrap: true };

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <WagmiConfig config={wagmiConfig}>
    <React.StrictMode>
      <LightNodeProvider options={NODE_OPTIONS}>
        <App />
      </LightNodeProvider>
    </React.StrictMode>
  </WagmiConfig>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
