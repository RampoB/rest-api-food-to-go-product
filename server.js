const express = require("express");
const FileUpload = require("express-fileupload");
const cors = require("cors");
const ProductRoutes = require("./routes");

const app = express();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());
app.use(FileUpload());
app.use(express.static());
app.use(ProductRoutes);
app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
});