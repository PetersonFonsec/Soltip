'use client'
import { useState, useEffect } from 'react'
import { encodeURL, createQR } from '@solana/pay';
import {  clusterApiUrl, Connection, Keypair, PublicKey } from '@solana/web3.js';
import BigNumber from 'bignumber.js';

export default function Home() {
  // Variable to keep state of the payment status
  let paymentStatus: string;

  // Connecting to devnet for this example
  console.log('1. ✅ Establish connection to the network');
  // const connection = new Connection(clusterApiUrl('devnet'), 'confirmed'); //Na doc diz para criar essa conexao, mas não sei se é necessário pois mesmo comentado o qrCode funciona

  const [walletAddress, setWalletAddress] = useState<string | null>(null)
  const [qrCodeUrl, setQrCodeUrl] = useState<QRCodeStyling | null>(null)

  const connectWallet = async () => {
    if (!window.solana || !window.solana.isPhantom) return
    // Aqui ele se coneca com a carteira
    const response = await window.solana.connect()
    console.log(response)

    // Aqui ele pega o endereço da carteira
    setWalletAddress(response.publicKey.toString())
  }
  
  // const connection = new Connection( //Ambiente de conexão com a rede Solana
  //   // "https://api.devnet.solana.com",
  //   // "https://api.testnet.solana.com",
  //   "https://api.mainnet-beta.solana.com",
  //   "confirmed"
  // );

  const generateQrCode = async () => {
    if (!walletAddress) return

    console.log('2. 🛍 Simulate a customer checkout \n');
    const recipient = new PublicKey(walletAddress); //A conta que vai receber o pagamento
    const splToken = new PublicKey('EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v'); //a moeda que vai ser utilizada para o pagamento
    const amount = new BigNumber(20); // quaantidade de moeda que vai ser enviada
    const reference = new Keypair().publicKey; // uma chave aleatória que vai ser gerada para cada pagamento

    // Informações adicionais que podem ser passadas para o QR code e mostra na tela do celular no momento do pagamento
    const label = 'Jungle Cats store';
    const message = 'Jungle Cats store - your order - #001234';
    const memo = 'JC#4098';

    const url = encodeURL({ recipient, amount, splToken, reference, label, message, memo });
    console.log(url);
    
    const qrCode = await createQR(url, 200, 'transparent');
    console.log(qrCode);
    const element = document.getElementById('qr-code');
    qrCode.append(element);

    console.log('3. 📱 Generate a QR code') ;
  }

  useEffect(() => {
    if (walletAddress) {
      generateQrCode().then()
    }
  }, [walletAddress])

  return (
    <main>
      <h1>Connect Sua Carteira</h1>
      {walletAddress && <p>Carteira conectada: {walletAddress}</p>}

      <button onClick={connectWallet}>Conectar</button>
      <br />

      qrcode:
      <div id="qr-code"></div>
    </main>
  )
}
