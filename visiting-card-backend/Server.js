require("dotenv").config();
const express = require("express")
const cors = require("cors");
const dbCollections = require("./Config/DatabaseConnection")
const auth = require("./Routes/Auth")

const app = express()
const port = process.env.Port || 3000

app.use(express.json())
app.use(cors());
dbCollections()

app.get("/", (req, res) => {
  res.status(200).send({
    Title: "NexLink",
    Tagline: "Next Generation Digital Identity",
    message: "This is Base Url"
  });
});

app.use("/auth", auth)

app.use((req, res) => {
  res.status(404).send({
    Title: "NexLink",
    Tagline: "Next Generation Digital Identity",
    message: "Route not Created Yet"
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});