const express = require("express");
const multer = require("multer")
const https = require("https");
const path = require('path');
const fs = require('fs');
const cors = require('cors');

const app = express();
const port = 51012;
app.use(cors());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Specify the directory where you want to store the uploaded file
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  }
});

const upload = multer({ storage: storage });

app.use('/uploads', express.static('uploads'));

app.post('/documento', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No files were uploaded.');
  }

  res.redirect('https://127.0.0.1:5120/success');
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