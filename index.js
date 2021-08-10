const express = require("express");
const fs = require("fs");
const { spawn } = require("child_process");
const app = express();
app.use(express.json());

app.post("/write", (req, res) => {
  try {
    if (fs.existsSync(req.body.filename)) {
      const ls = spawn("sh", ["run.sh"]);

      ls.stdout.on("data", (data) => {
        res.send(data);
        console.log(`stdout: ${data}`);
      });

      ls.stderr.on("data", (data) => {
        console.log(`stderr: ${data}`);
      });

      ls.on("error", (error) => {
        console.log(`error: ${error.message}`);
      });

      ls.on("close", (code) => {
        console.log(`child process exited with code ${code}`);
      });
    } else {
      res.send("not exits");
    }
  } catch (err) {
    res.send(err);
  }

  console.log(req.body.filename);
});
app.listen(3000, () => {
  console.log("app is running on port 300");
});
