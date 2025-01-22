const fs = require('fs');

fs.readFile("index.txt" , "utf-8" , (err,data)=>{
    if(err){
        console.error("Some error has occured");
    }
    console.log(data);
});

