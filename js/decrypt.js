/**
 * Decrypting module in charge of symmetric files received from the frontend
 * from now.
 */

const {createDecipheriv, privateDecrypt} = require('crypto');
const process = require('process');
const fs = require('fs');
const path = require('path');

const iv = "f530f64b65eb2d84";

// PRIVATE KEY pair to the PUBLIC KEY
const privateKey = `-----BEGIN PRIVATE KEY-----
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
XHSxwxtjuHpthJ+Fxyfe2VbGL7hj
-----END PRIVATE KEY-----`

/**
 * Proccess is going to receive one argument value [2] which will be the name of the file inside of uploads. 
 * Either way, I am going to place an extension at the end of the file to determine what kind of encryption they 
 * are in (.sym and .asy)
 * 
 * The logic for no argument value is not going to be handled here.
 */

let file;
let symmetricKeyEncrypted;

// Storing the file to decrypt in the file variable
// and the encrypted symmetric key in the other variable
try{
  file = fs.readFileSync(path.join(__dirname, '..', 'uploads', process.argv[2] + '.sym')).toString();
  symmetricKeyEncrypted = fs.readFileSync(path.join(__dirname, '..', 'uploads', process.argv[2] + '.asy'));

}catch(err){
  console.error("Problem reading the file, try again or check spelling.");
  process.exit(1);
}

// Symmetric Key Decrypter
const symmetricKey = privateDecrypt(
  privateKey,
  symmetricKeyEncrypted
);

// Decrypting the received file
const decipher = createDecipheriv('aes256', symmetricKey, iv);
const decryptedMessage = decipher.update(file, 'hex', 'binary')
                         + decipher.final('binary');

// Saving the decrypted file
fs.writeFile(path.join(__dirname, '..', 'decryptedFiles', process.argv[2]), decryptedMessage, 'binary', (err) =>{
  if(err){
    throw err;
  }
  console.log(`Data has been written to file ${process.argv[2]} in folder decryptedFiles successfully.`);
})