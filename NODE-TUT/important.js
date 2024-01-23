const express = require('express');
require("./config");
const Product = require('./product');
const app = express();

app.use(express.json());

app.get("/search/:key",(req,resp)=>{
   resp.send("search done")

})
app.listen(5000);