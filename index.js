require("dotenv").config();

const server = require("./api/server.js");

const port = process.env.PORT || 5000;
server.listen(port, () =>
  console.log(
    `\n <<==||==>> Back-End server up and running for Shop-Retail-Store and server running on port ${port} <<==||==>> \n `
  )
);
