'use client';
import { useMemo } from 'react';
import {
  ConnectionProvider,
  WalletProvider,
} from '@solana/wallet-adapter-react';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets';
import { clusterApiUrl } from '@solana/web3.js';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
const SolanaWalletProvider = ({ children }) => {
  // The network can be set to 'devnet', 'testnet', or 'mainnet-beta'.
  // You can also provide a custom RPC endpoint.
  const endpoint = clusterApiUrl('devnet');

  const wallets = useMemo(() => [new PhantomWalletAdapter()], [endpoint]);
  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};

export default SolanaWalletProvider;
