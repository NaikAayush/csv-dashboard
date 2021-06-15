var express = require("express");
var router = express.Router();
var path = require("path");
/* GET home page. */
router.get("/csv/:file", function (req, res, next) {
  const fileName = req.params.file;
  const fs = require("fs");
  const csv = require("fast-csv");

  var data = [];

  fs.createReadStream(
    path.resolve(__dirname, "../public/data", fileName + ".csv")
  )
    .pipe(csv.parse({ headers: true }))
    .on("error", (error) => console.error(error))
    .on("data", (row) => {
      console.log(row);
      data.push(row);
      console.log(data);
    })
    .on("end", (result) => {
      res.send(JSON.stringify(data));
    });
});

module.exports = router;
