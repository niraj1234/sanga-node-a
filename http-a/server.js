const http = require('http');
const server = http.createServer((req,res) => {
    console.log("Requst Object ==> " , req);
    res.writeHead(200 , {"Content-Type":"text/plain"});
    res.end("Hello from Sanga Node Project");
});

const PORT = 3000 ;
server.listen(PORT , ()=>{
    console.log(`Server is running on ${PORT}`);
})
