"use client"
import { useState } from "react";


export default function Home() {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);

  const connectWallet = async () => {
    if (!window.solana || !window.solana.isPhantom) return;
    const response = await window.solana.connect();
    console.log(response);
    setWalletAddress(response.publicKey.toString());
  }
  
  return <main>
    <h1>Connect Sua Carteira</h1>
    {walletAddress ? (
        <p>Carteira conectada: {walletAddress}</p>
      ) : (
        <button onClick={connectWallet}>Conectar</button>
      )}
  </main>
}
