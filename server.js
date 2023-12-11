const express = require("express");
const FileUpload = require("express-fileupload");
const cors = require("cors");
const bodyParser = require("body-parser");
const routes = require("./routes");

const app = express();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(bodyParser.json());
app.use(FileUpload());
app.use(routes);
app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
});