// server config
const http = require('http');
const serverHandle = require('../index');

const PORT = 8080;

const server = http.createServer(serverHandle);


server.listen(PORT);
