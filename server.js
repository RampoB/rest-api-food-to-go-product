const express = require("express");
const FileUpload = require("express-fileupload");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());
app.use(FileUpload());

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
});