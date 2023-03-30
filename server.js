const mongoose = require("mongoose");
const app = require("./app");

require("dotenv").config();

const PORT = process.env.PORT;
const DB_HOST = process.env.DB_HOST;

main().catch((err) => {
  console.log("ERROR! ", err);
  process.exit(1);
});

async function main() {
  await mongoose.connect(DB_HOST);

  console.log("Database connection successful");

  app.listen(PORT, () => {
    console.log(`Server running. Use our API on port: ${PORT}`);
  });
}
