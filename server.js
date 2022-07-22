const http = require('http');

//method that creates a server. Argument is a callback function
//callback has request and response objects. Request is loaded full of info about the request like URL being requested
//also request type (if get, post, etc)
//Response object is used to send a response to user in the browser

//RESPONSE HEADERS
//They give the browser a little more information about what kind of response is coming back (what type of data, text, etc)
//Can also use to "set cookies"
const server = http.createServer((req, res) => {
    //console.log('request made');
    console.log(req.url, req.method);

    //set header content type
    res.setHeader('Content-Type', 'text/html');

    res.write('<p>hello first time my guy</p>')
    res.write('<p>hello, neegus</p>');
    res.end();
});  

//Server must habve a "listen" function to listen for requests being sent to it:
//takes port number and host name
//Callback function fires when we start listening for a request
//"localhost" is like a domain name that takes us to a "loopback address" since it points back to your own computer
//Port numbers represent specific channels that our computer can communicate through.

server.listen(3000, 'localhost', () => {
    console.log('listening for requests on port 3000');
});