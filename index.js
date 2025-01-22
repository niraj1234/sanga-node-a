const express = require('express');
const app = express();
const PORT = 3000 ;

app.get('/' , (req,res) => {
    console.log("GEt method called ")
    res.send("Hello from NodeJS Sanga");
});

app.listen(PORT , ()=>{
    console.log(`NodeJS server running on ${PORT}`);
})
