// import SHA356 from "crypto-js/sha256";
var sha256 = require("crypto-js/sha256");

class Block {
  constructor(index, timestamp, data, previousHash = "") {
    this.index = index;
    this.timestamp = timestamp;
    this.data = data;
    this.previousHash = previousHash;
    this.hash = this.calculateHash();
  }

  calculateHash() {
    return sha256(
      this.index +
        this.previousHash +
        this.timestamp +
        JSON.stringify(this.data)
    ).toString();
  }
}

class BlockChain {
  constructor() {
    this.chain = [this.createGenesisBlock()];
  }

  createGenesisBlock() {
    return new Block(0, "01/01/2017", "Genesis block", "0");
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  addBlock(newBlock) {
    newBlock.previousHash = this.getLatestBlock().hash;
    newBlock.hash = newBlock.calculateHash();
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
gCoin.addBlock(new Block(1, "10/07/2017", { amount: 4 }));
gCoin.addBlock(new Block(2, "12/07/2017", { amount: 10 }));

console.log(JSON.stringify(gCoin, null, 4));
console.log(gCoin.isChainValid());
