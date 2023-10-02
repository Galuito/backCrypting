# backCrypting
The repository in which the backend of a test encrypting application is going to be stored.

This is basically the backend that is going to handle receiving and storing files that were sent from the frontend, there'll also be a decrypting function laying around that will have the task of decrypting the received files symmetrically and asymmetrically.

### Cert directory
Contains the certificate and keys for the SSL authentication of this server.

### Storing Files
The way to store the files received from the frontend was using multer, they are stored in the uploads directory, the rule is to receive 2 files from the frontend that meet a requirement that is, they both have the same name but one ends with ".sym" and the other with ".asy" so that they can be differenced.

Immediately after they are marked as stored correctly decryption starts. The encrypted file pairs can be found in the uploads directory as stated before, one in hexadecimal and the other as an object that contains bytes.

### Decrypting
The decrypt.js file found in the js folder is the one that was developed to handle the decryption of the symmetric key encrypted using the public key of the server and the file itself using the symmetric key, the file is not called by itself though, it is managed through the use of child processes in the post request endpoint found in the server, also, it uses process in order to access argument values, in this case, the original name of the encrypted file without the propietary file extensions that were used in the previous step.

If a file were to be missing its pair then the decryption would fail because of the lack of one of the main components that accomplish the decryption.

Once the decryption is completely done, a single decrypted file is inserted in the decryptedFiles directory.

The server by itself is really basic, only one important endpoint, reading of files so that it has access to the certificate, file storing through the use of multer and finally, child processes so that it can invoke decrypt.js

Also, one thing to mention is that asymKeyGen.js was used to generate the asymmetric keys so that they could be used multiple times by the frontend and the backend.

# Sorry
Sorry for not being as thorough as I was in frontCrypt, I am really tired.