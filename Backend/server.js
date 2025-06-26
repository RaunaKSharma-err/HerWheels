const http = require("http");
const app = require("./app");
const { initializeSocket } = require("./socket");

const server = http.createServer(app);

initializeSocket(server);
