'use client'

import { Keypair, Connection, LAMPORTS_PER_SOL, PublicKey } from '@solana/web3.js'
import { getMint } from '@solana/spl-token'

const networks = {
  mainnet: 'https://api.mainnet-beta.solana.com',
  testnet: 'https://api.testnet.solana.com',
  devnet: 'https://api.devnet.solana.com',
}

export default function Read() {
  const test = async () => {
    const keypair = Keypair.generate() // aqui ele gera uma nova chave publica de forma aleatoria
    console.log(`Public Key: ${keypair.publicKey}`)

    const connection = new Connection(networks.devnet, 'confirmed')

    try {
      // Funding an address with SOL automatically creates an account
      const signature = await connection.requestAirdrop(keypair.publicKey, LAMPORTS_PER_SOL)
      await connection.confirmTransaction(signature, 'confirmed')
    } catch (error) {
      console.error('Error ao solicitar airdrop para poder interagir com a rede', error)
    }

    try {
      const accountInfo = await connection.getAccountInfo(keypair.publicKey)
      console.log(JSON.stringify(accountInfo, null, 2))
    } catch (error) {
      console.error('Error ao buscar informações sobre a conta', error)
    }
  }

  const test2 = async () => {
    const connection = new Connection(networks.devnet, 'confirmed')

    const address = new PublicKey('EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v')
    const mintData = await getMint(connection, address, 'confirmed')

    console.log(
      JSON.stringify(
        mintData,
        (key, value) => {
          // Convert BigInt to String
          if (typeof value === 'bigint') {
            return value.toString()
          }
          // Handle Buffer objects
          if (Buffer.isBuffer(value)) {
            return `<Buffer ${value.toString('hex')}>`
          }
          return value
        },
        2,
      ),
    )
  }

  return (
    <main>
      <h1>ler informações da rede</h1>
      <button onClick={test}>Test</button> <br />
      <button onClick={test2}>Test 2</button>
    </main>
  )
}
