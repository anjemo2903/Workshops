const express = require('express');
const app = express();
const path = require('path');
// database connection
const mongoose = require("mongoose");
const db = mongoose.connect("mongodb+srv://molinajesus2003:weJyz3uFbpRRcg2M@cluster0.orvrvph.mongodb.net/");

// parser for the request body (required for the POST and PUT methods)
const bodyParser = require("body-parser");
app.use(bodyParser.json());

// check for cors
const cors = require("cors");
app.use(cors({
  domains: '*',
  methods: "*"
}));

app.use(express.static(path.join(__dirname, 'public')));

const {
  careerPost,
  careerPut,
  careerGet,
  careerDelete
} = require("./server/controllers/careerController.js");

app.post("/api/career", careerPost);
app.get("/api/career",careerGet);
app.put("/api/career", careerPut);
app.delete("/api/career", careerDelete);


app.listen(3001, () => console.log(`Example app listening on port 3001!`))