require("dotenv").config();

const express = require("express")
const cors = require("cors");
const dbCollections = require("./Config/DatabaseConnection")
const { tokencheck, tokenerr } = require("./Utility/Customwork")
const auth = require("./Routes/Auth")
const dash = require("./Routes/Dashboard")
const uploadError = require("./Middleware/Error");
const reviewModel = require("./Models/reviewModel")


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


app.post("/feedback", async (req, res) => {
  try {
    const result = tokencheck(req.headers.authorization);
    if (!result.success) {
      return res.status(401).send(result);
    }
    const { star, feedback } = req.body;
    if (!star || !feedback?.trim()) {
      return res.status(400).send({
        success: false,
        message: "Rating and feedback are required"
      });
    }
    await reviewModel.findOneAndUpdate(
      { authId: result.decoded.id },
      { star, feedback },
      { returnDocument: "after", upsert: true }
    );
    return res.status(200).send({
      success: true,
      message: "Feedback saved successfully"
    });
  } catch (err) {
    const result = tokenerr(err, "Feedback Error:");
    return res.status(result.status).send({
      success: result.success,
      message: result.message
    });
  }
});


app.use("/auth", auth)
app.use("/profile", dash)
app.use(uploadError);


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