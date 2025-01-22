const http = require('http');
const server = http.createServer((req,res) => {

    const url  = req.url;
    if(url === "/"){
        res.writeHead(200 , {"Content-Type":"text/plain"});
        res.end("Home Page");
    } else if(url === "/projects"){
        res.writeHead(200 , {"Content-Type":"text/plain"});
        res.end("Project List");
    } else if(url === "/json"){
        res.writeHead(200 , {"Content-Type":"application/json"});
        res.end('{name:"John", age:31, city:"New York"}');
    } else {
        res.writeHead(404 , {"Content-Type":"text/plain"});
        res.end("Page not found.");
    }

 }
)

const PORT = 3000 ;
server.listen(PORT , ()=>{
    console.log(`Server is running on ${PORT}`);
})