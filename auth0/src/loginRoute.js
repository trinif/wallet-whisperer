const fs = require("fs");
const cors = require("cors");
const express = require("express");
const app = express();

app.use(express.json());
app.use(cors());

app.get("/userid", (req, res) => {
  fs.readFile("userid.json", "utf8", (err, data) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(JSON.parse(data));
  });
});

app.post("/updateLookupTable", (req, res) => {
    console.log(req.body);
    const data = fs.readFileSync("userid.json", "utf8");
    var text = JSON.parse(data);
    console.log(text);
    text.push(req.body);
    console.log(text);
    fs.writeFile("userid.json", JSON.stringify(text, null, 2), (err) => err && console.error(err));
    /* fs.appendFile("userid.json", ",\n"); */
    res.json({ message: "File updated successfully" });
  });

app.listen(3002, () => console.log("Server running on port 3002"));
