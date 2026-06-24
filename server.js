const express = require("express");
const cors = require("cors");

const api = require("./routes/api");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/bfhl", api);

app.get("/", (req, res) => {
  res.send("BFHL API Running");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Running on ${PORT}`);
});