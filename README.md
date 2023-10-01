# backCrypting
The repository in which the backend of a test encrypting application is going to be stored.

This is basically the backend that is going to handle receiving and storing files that were sent from the frontend, there'll also be a decrypting function laying around that will have the task of decrypting the received files symmetrically and asymmetrically.

### Cert directory
Contains the certificate and keys for the SSL authentication of this server.

### Storing Files
The way to store the files received from the frontend was using multer, they are stored in the uploads directory.

### Decrypting
The Decrypting.js file is going to be the one handling the decryption of the received files.