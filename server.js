const http = require("http");
const fs = require("fs");
const path = require('path');
const port = 5500;

const server = http.createServer((req, res) => {
    // req.url == / when index html file is wanted. Hence "graphics.html" should be the html file you want displayed first. after that req.url goes looking for the fight files without any problem
    const filePath = path.join(__dirname, req.url == "/" ? "graphics.html" : req.url);

    fs.readFile(filePath, (error, data) => {
        if(error){
            res.writeHead(404);
            res.write("Something went wrong. Check file names.");
        } 
        else{
            const extname = path.extname(filePath);
            // figure out if the client asks for html, css or javascript. Change content-type accordingly
            let contentType = 'text/html';
            if (extname === '.css') {
                contentType = 'text/css';
            } else if (extname === '.js') {
                contentType = 'application/javascript';
            }

            res.writeHead(200, { 'Content-Type': contentType });
            res.write(data);
        }

        res.end();
    })
})

server.listen(port, (err) => {
    if(err){
        console.log("❌  Error: ", err);
    }
    else{
        console.log("✔️  Server is listening on port " + port);
    }
})
