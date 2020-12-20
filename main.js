// import SHA356 from "crypto-js/sha256";
var sha256 = require("crypto-js/sha256");

class Block {
  constructor(timestamp, data, previousHash = "") {
    this.timestamp = timestamp;
    this.data = data;
    this.previousHash = previousHash;
    this.hash = this.calculateHash();
    this.nonce = 0;
  }

  calculateHash() {
    return sha256(
      this.previousHash +
        this.timestamp +
        JSON.stringify(this.data) +
        this.nonce
    ).toString();
  }

  mineBlock(difficulty) {
    while (
      this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")
    ) {
      this.nonce++;
      this.hash = this.calculateHash();
    }

    console.log("Block mined: ", this.hash);
  }
}

class BlockChain {
  constructor() {
    this.chain = [this.createGenesisBlock()];
    this.difficulty = 2;
  }

  createGenesisBlock() {
    return new Block("01/01/2017", "Genesis block", "0");
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  addBlock(newBlock) {
    newBlock.previousHash = this.getLatestBlock().hash;
    newBlock.mineBlock(this.difficulty);
    this.chain.push(newBlock);
  }

  isChainValid() {
    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i - 1];

      if (currentBlock.hash !== currentBlock.calculateHash()) {
        // console.log(currentBlock);
        return false;
      }

      if (currentBlock.previousHash !== previousBlock.hash) {
        // console.log(currentBlock);
        return false;
      }
    }

    return true;
  }
}

let gCoin = new BlockChain();
console.log("Mining Block 1... ");
gCoin.addBlock(new Block("10/07/2017", { amount: 4 }));

console.log("Mining Block 2... ");
gCoin.addBlock(new Block("12/07/2017", { amount: 10 }));

console.log(gCoin.isChainValid());
