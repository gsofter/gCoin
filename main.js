require("dotenv").config();
const { BlockChain, Transaction } = require("./blockchain");

const EC = require("elliptic").ec;
const ec = new EC("secp256k1");

const myKey = ec.keyFromPrivate(process.env.PRIVATE_KEY);
const myWalletAddress = myKey.getPublic("hex");

let gCoin = new BlockChain();
const tx1 = new Transaction(myWalletAddress, "public key goes here", 10);
tx1.signTransaction(myKey);
gCoin.addTransaction(tx1);

console.log("----Starting the miner ----");
gCoin.minePendingTransactions(myWalletAddress);

console.log(
  "\n Balance of gCoin is",
  gCoin.getBalanceOfAddress(myWalletAddress)
);
