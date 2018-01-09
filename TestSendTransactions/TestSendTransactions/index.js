var express = require('express');
var app = express();
bodyParser = require('body-parser'),
    app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.listen(9000, function(){
	console.log('SERVER IS RUNNING...');
});










////////////////////////////////////////////////////////////////////////

const ursa = require('ursa');
const _ = require('lodash');
const crypto = require('crypto');

const HASH_ALGORITHM = 'sha256';


/////////////////////////TẠO KEY CHO NGƯỜI DÙNG////////////////////////////////////////////

// SHA256 hash
let hash = function (data) {
    let hash = crypto.createHash(HASH_ALGORITHM);
    hash.update(data);
    return hash.digest();
};


// Tạo privateKey, publicKey, address | <có sử dụng thêm hàm hash>
let generateAddress = function () {
    let privateKey = ursa.generatePrivateKey(1024, 65537);
    let publicKey = privateKey.toPublicPem();
    return {
      privateKey: privateKey.toPrivatePem('hex'),
      publicKey: publicKey.toString('hex'),
      address: hash(publicKey).toString('hex')
    };
};

// console.log(generateAddress());

////////////////////////////TẠO CHỮ KÝ ĐIỆN TỬ LÊN TRANSACTION////////////////////////////////////////////


// Tạo chữ ký
let createSignature = function (message, privateKeyHex) {
    // Create private key form hex
    let privateKey = ursa.createPrivateKey(Buffer.from(privateKeyHex, 'hex'));
    // Create signer
    let signer = ursa.createSigner(HASH_ALGORITHM);
    // Push message to verifier
    signer.update(message);
    // Sign
    return signer.sign(privateKey, 'hex');
};

// Convert a transaction to binary format for hashing or checking the size
let toBinary = function (transaction, withoutUnlockScript) {
    let version = Buffer.alloc(4);
    version.writeUInt32BE(transaction.version);
    let inputCount = Buffer.alloc(4);
    inputCount.writeUInt32BE(transaction.inputs.length);
    let inputs = Buffer.concat(transaction.inputs.map(input => {
      // Output transaction hash
      let outputHash = Buffer.from(input.referencedOutputHash, 'hex');
      // Output transaction index
      let outputIndex = Buffer.alloc(4);
      // Signed may be -1
      outputIndex.writeInt32BE(input.referencedOutputIndex);
      let unlockScriptLength = Buffer.alloc(4);
      // For signing
      if (!withoutUnlockScript) {
        // Script length
        unlockScriptLength.writeUInt32BE(input.unlockScript.length);
        // Script
        let unlockScript = Buffer.from(input.unlockScript, 'binary');
        return Buffer.concat([ outputHash, outputIndex, unlockScriptLength, unlockScript ]);
      }
      // 0 input
      unlockScriptLength.writeUInt32BE(0);
      return Buffer.concat([ outputHash, outputIndex, unlockScriptLength]);
    }));
    let outputCount = Buffer.alloc(4);
    outputCount.writeUInt32BE(transaction.outputs.length);
    let outputs = Buffer.concat(transaction.outputs.map(output => {
      // Output value
      let value = Buffer.alloc(4);
      value.writeUInt32BE(output.value);
      // Script length
      let lockScriptLength = Buffer.alloc(4);
      lockScriptLength.writeUInt32BE(output.lockScript.length);
      // Script
      let lockScript = Buffer.from(output.lockScript);
      return Buffer.concat([value, lockScriptLength, lockScript ]);
    }));
    return Buffer.concat([ version, inputCount, inputs, outputCount, outputs ]);
};


// Sign transaction
let signTransaction = function (transaction, keys) {
    let message = toBinary(transaction, true);
    transaction.inputs.forEach((input, index) => {
        let key = keys[index];
        let signature = createSignature(message, key.privateKey);
        // Genereate unlock script
        input.unlockScript = 'PUB ' + key.publicKey + ' SIG ' + signature;
    });
};


//////////////////////////////////////////////////////////////////////

// Read key (address, public key, private key)
let key = require('./my_keys.json');
// let key = require('./my_keys_2.json');


// console.log(key);


// Số tiền đang có
const MONEY = 991;

// Số tiền gửi
const BOUNTY = 1;

// Số tiền dư (tiền thối)
const CHANGE = MONEY - BOUNTY;

// Generate transacitons
let bountyTransaction = {
    version: 1,
    inputs: [],
    outputs: []
};

// Là hash của transaction trước đó chứa output làm input của transaction này
let referenceOutputsHashes = [ 
    'f14620f7619594e3ca5c353569a4e479b229a816af5a8c05bbfd396c583153d6'
];

// Chứa địa chỉ nhận tiền
let destinations = [
    '30da374d28a54218c885fe3b4c7c21c419104558acb7c18ca18521e18a39717b',
];

// keys để chứa mảng key[private, public, address] ứng với số lượng input
let keys = [];

// Thêm input cho transaction
referenceOutputsHashes.forEach(hash => {
    bountyTransaction.inputs.push({
      referencedOutputHash: hash,
      referencedOutputIndex: 0,
      unlockScript: ''
    });
    keys.push(key);
});

// Change because reference output must be use all value
// Tiền dư sẽ được trả về chính địa chỉ này.
bountyTransaction.outputs.push({
    value: CHANGE,
    lockScript: 'ADD ' + key.address
});

// Output to all destination 10000 each
destinations.forEach(d => {
    bountyTransaction.outputs.push({
      value: BOUNTY,
      lockScript: 'ADD ' + d
    });
});

// Sign
signTransaction(bountyTransaction, keys);

console.log(JSON.stringify(bountyTransaction));