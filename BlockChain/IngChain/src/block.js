/**
 * Auth : 곽인구
 * date : 2021-10-20
 * commnet : 블록 코어
 */
const fs = require("fs")
const merkle = require("merkle")
const CryptoJs = require("crypto-js")
const random = require("random")


const BLOCK_GENERATION_INTERVAL = 10
const BLOCK_ADJUSTIMENT_INTERVAL = 10
const Blocks = [createGenesisBlock()]

class BlockHeader {
    constructor(_version, _index, _previousHash, _time, _merkleRoot, _difficulty, _nonce) {
        this.version = _version
        this.index = _index
        this.previousHash = _previousHash
        this.time = time
        this.merkleRoot = merkleRoot

        this.difficulty = _difficulty
        this.nonce = _nonce
    }
}

class Block {
    constructor(_header,_body){
        this.header = _header
        this.body = _body
    }
}

function getBlocks(){
    return Blocks
}

function getLastBlock() {
    return Blocks[Blocks.length -1]
}

function createGenesisBlock(){
    const version = "1.0.0"
    const index = 0
    const time = 1630907567
    const previousHash = '0'.repeat(64)
    const body = ['hello block']

    const tree = merkle('sha256').sync(body)
    const root = tree.root() || '0'.repeat(64)

    const difficuly = 16
    const nonce = 0

    const header = new BlockHeader(version,index,previousHash,time,root,difficuly,nonce)
    return new Block(header,body)
}

function nextBlock(_data) { 
    const prevBlock = getLastBlock()
    const version = getVersion()
    const index = prevBlock.header.index + 1
    const previousHash = createHash(prevBlock)
    const time = getCurrentTime()
    const difficulty = getDifficulty(getBlocks())

    const merkleTree = merkle("sha256").sync(_data)
    const merkleRoot = merkleTree.root() || '0'.repeat(64)

    const header = findBlock(version,index,previousHash,time,merkleRoot,difficulty)
    return new Block(header,_data)
}

function getDifficulty(_blocks){
    const lastBlock = _blocks[blocks.length-1]
    let {index,difficulty} = lastBlock.header
    let bool = (index % BLOCK_ADJUSTIMENT_INTERVAL === 0) && index != 0
    
    if (bool) return  getAdjustedDiffiuclty(lastBlock,blocks)
    return difficulty
}

function getAdjustedDiffiuclty(_lastBlock,_blocks) {

    const prevAdjustmentBlock = _blocks[_blocks.length - BLOCK_ADJUSTIMENT_INTERVAL]
    let {difficulty,time} = prevAdjustmentBlock.header

    const timeToken = _lastBlock.header.time - time
    const timeExpected = BLOCK_ADJUSTIMENT_INTERVAL * BLOCK_GENERATION_INTERVAL
    
    switch(true) {
        case timeToken < timeExpected/2:
            difficulty++
        break;
        case timeToken > timeExpected * 2:
            difficulty--
        break;
    }

    return difficulty
}

function findBlock(_version,_index,_previousHash,_time,_merkleRoot,_difficulty) {
    let nonce = 0
    while (true) {
        let hash = createHeaderHash(_version,_index,_previousHash,_time,_merkleRoot,_difficulty,_nonce)
        if (hashMatchDifficulty(hash,difficulty)) {
            return new BlockHeader(_version,_index,_previousHash,_time,_merkleRoot,_difficulty,nonce)
        }
        nonce++
    }
}
