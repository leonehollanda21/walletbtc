const bip32 = require('bip32')
const bip39 = require('bip39')
const bitcoin = require('bitcoinjs-lib')

const network = bitcoin.networks.testnet

// O caminho de derivação para Native SegWit (BIP84) na Testnet é 84'/1'/0'/0
const path = `m/84'/1'/0'/0`

let mnemonic = bip39.generateMnemonic()
const seed = bip39.mnemonicToSeedSync(mnemonic)

let root = bip32.fromSeed(seed, network)

let account = root.derivePath(path)
let node = account.derive(0).derive(0)

// Aqui usamos p2wpkh direto (sem embrulhar em p2sh)
let btcAddress = bitcoin.payments.p2wpkh({
    pubkey: node.publicKey,
    network: network,
}).address

console.log("Carteira Native SegWit (Bech32) Gerada")
console.log("Endereço: ", btcAddress) // Deve começar com 'tb1'
console.log("Chave privada (WIF):", node.toWIF())
console.log("Seed:", mnemonic)