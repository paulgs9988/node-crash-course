const http = require('http');
const fs = require('fs');
const _ = require('lodash');

const server = http.createServer((req, res) => {
    console.log(req.url, req.method);

    //lodash
    const num = _.random(1, 53);
    console.log(num);

    const greet = _.once(() => {
        console.log('hello');
    });

    greet();
    greet();
    greet();

    //set header type
    res.setHeader('Content-Type', 'text/html');

    //This is an example of a simple routing system:
    let path = './views/';
    switch(req.url){
        case '/':
            path += 'index.html';
            res.statusCode = 200;
            break;
        case '/about':
            path += 'about.html';
            res.statusCode = 200;
            break;
        case '/about-blah':
            res.statusCode = 301;
            res.setHeader('Location', '/about');
            res.end();
        default: 
            path += '404.html';
            res.statusCode = 404;
            break;
    }

    //send an html file:
    fs.readFile(path, (err, data) => {
        if(err){
            console.log(err);
            res.end();
        }
        else{
            //res.write(data);
            res.end(data);
        }

    });

});

server.listen(3000, 'localhost', () => {
    console.log('listening for requests on port 3000');
});