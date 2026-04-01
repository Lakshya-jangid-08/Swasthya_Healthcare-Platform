const dotenv = require("dotenv")
const http = require('http')
const app = require("./app");
const connectDB = require("./configs/db");
const initSocket = require("./socket/socket");
dotenv.config();

const PORT = process.env.PORT || 5000;

const server = http.createServer(app); // socket can't attached directly to express so we do this

initSocket(server);

const startServer = async () => {
  try {
    await connectDB();
    server.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

startServer();