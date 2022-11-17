const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mysqlPoolQuery = require("./connectionPool");
const app = express();

app.use(bodyParser.json());
app.use(function (req, res, next) {
  req.con = mysqlPoolQuery;
  next();
});
app.use(cors());


app.get("/movies", (req, res) => {
  req.con("SELECT * FROM movies", (err, rows) => {
    if (err) console.log(err);
    res.json({ movies: rows });
  });
});

app.get("/movie", (req, res) => {
  req.con(
    `SELECT * FROM movies WHERE id='${req.query.id}'`,
    (err, rows) => {
      if (err || rows.length == 0) {
        res.json({ status: "error", message: "No movies is matched." });
      } else {
        res.json({ movie: rows[0] });
      }
    }
  );
});

app.get("/comments", (req, res) => {
  req.con(
    `SELECT * FROM comments WHERE movieId = '${req.query.movieId}' ORDER BY id DESC`,
    (err, rows) => {
      if(err) res.json({ status: "error", message: "No comment is matched." });
      res.json({status: 'success', comments: rows});
    }
  )
})

app.post("/comment", (req, res) => {
  let input = req.body;
  req.con(
    `INSERT INTO comments (movieId, username, comment) VALUES ('${input.movieId}', '${input.username}', '${input.comment}')`,
    (err, result) => {
      if (err) res.json({ status: "error" });
      res.json({ status: "success", id: result.insertId });
    }
  );
});
app.listen(8888, () => {
  console.log("api serivce has started.");
});
