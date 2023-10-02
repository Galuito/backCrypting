const express = require("express");
const multer = require("multer")
const https = require("https");
const path = require('path');
const fs = require('fs');
const cors = require('cors');
const childProcess = require('child_process');

childScriptPath = path.join(__dirname, 'js', 'decrypt.js');

const app = express();
const port = 51012;
app.use(cors());

function runScript(scriptPath, args, callback) {

  // keep track of whether callback has been invoked to prevent multiple invocations
  var invoked = false;

  var process = childProcess.fork(scriptPath, args);

  // listen for errors as they may prevent the exit event from firing
  process.on('error', function (err) {
      if (invoked) return;
      invoked = true;
      callback(err);
  });

  // execute the callback once the process has finished running
  process.on('exit', function (code) {
      if (invoked) return;
      invoked = true;
      var err = code === 0 ? null : new Error('exit code ' + code);
      callback(err);
  });

}

// Setting up a rule that is going to be applied later to set the place and name of the received file
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Specify the directory where you want to store the uploaded file
  },
  filename: function (req, file, cb) {
    // const ext = path.extname(file.originalname); // How to extract only the extension from the received file
    cb(null, file.originalname); // Specify the name that the file is going to have once stored (Same name)
  }
});

const upload = multer({ storage: storage }); // Put in rule the storage const that we just set up

app.post('/documento', upload.array('files', 2), (req, res) => {
  if (!req.files) {
    return res.status(400).send('No files were uploaded.');
  }

  res.redirect('https://127.0.0.1:5120/success');
  console.log("Files Successfully Stored")
  console.log('Uploaded Files: ', req.files[0].originalname.slice(0, -4));

  // Now we can run a script and invoke a callback when complete, e.g.
  runScript(childScriptPath, [req.files[0].originalname.slice(0, -4)], function (err) {
  if (err) throw err;
  console.log('finished running decrypt.js');
  });

});

app.get('/', (req, res) =>{
  res.send('You shouldn\'t be here...');
})

const sslServer = https.createServer({
  key: fs.readFileSync(path.join(__dirname, 'cert', 'key.pem')),
  cert: fs.readFileSync(path.join(__dirname, 'cert', 'cert.pem'))
}, app)

// To access https://127.0.0.1:51012
sslServer.listen(port, ()=>{
  console.log("SSL Backend listening on port", port)
})