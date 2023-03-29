const express = require("express");
const redis = require("redis");
const app = express();

const redisCLient = redis.createClient({
  host: "redis",
  port: 6379,
});

app.get("/", function (req, res) {
  redisCLient.get("keyVisitor", function (err, numVisitor) {
    let displayvisitor = parseInt(numVisitor) + 1;
    if (isNaN(displayvisitor)) {
      displayvisitor = 1;
    }
    res.send("web1: Total number of visitors is" + displayvisitor);
    redisCLient.set("keyVisitor", displayvisitor);
  });
});

app.listen(5000, () => {
  console.log("web1 is listening on port 5000");
});
