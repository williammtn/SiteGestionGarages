const express = require("express");
const routes = express.Router();
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./data/items.db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const auth = require("./auth/auth")();
const cfg = require("./auth/config");
const saltRounds = 10;
module.exports = routes;

routes.use(auth.initialize());

routes.get("/home", auth.authenticate(), (req, res) => {
  res.json("Hello world !!!! ");
});



routes.post("/signup", (req, res) => {
  bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
    db.get(
      " insert into users ( user_role, user_name, user_firstname , user_password, user_mail, user_tel )values($role,$name, $firstname,$password, $mail, $tel) returning user_id",
      {
        $role: 0,
        $name: req.body.name,
        $firstname: req.body.firstname,
        $password: hash,
        $mail: req.body.mail,
        $tel: req.body.tel,
      },
      (err, row) => {
        if (err) {
          return res.json(err).status(401);
        }
        return res.json({ id: row.user_id }).status(201);
      }
    );
  });
});

routes.post("/signin", (req,res) => {
  db.all("SELECT * FROM users WHERE user_mail = $mail",
    {$mail: req.body.mail},
    async (err, row) => {
      if (err) {
        console.log(err);
        return res.status(500).json(err);
      }
      if (!row) {
        return res.status(401).json("bad user");
      }
      const match = await bcrypt.compare(req.body.password, row.user_password);
      if (match) {
        const token = jwt.sign({ id: row.user_id }, cfg.jwtSecret, {
          expiresIn: "1h",
        });
        return res.json({ token: token , id: row.user_id});
      }
      res.json(" bad password ").status(401);
    }
  );
});

routes.get("/users", (req, res) => {
  db.all("SELECT * FROM users", (err, rows) => {
    if (err) {
      res.status(500).send({ error: "Oups!" });
      console.error(err.stack);
    } else {
      res.json(rows);
    }
  });
});

routes.get("/profil/:id", (req, res) => {
  db.get("SELECT * FROM users where user_id= ?", req.params.id, (err, rows) => {
    if (err) {
      res.status(500).send({ error: "Oups!" });
      console.error(err.stack);
    } else {
      res.json(rows);
    }
  });
});


routes.get("/garages", (req, res) => {
  db.all("SELECT * FROM garages", (err, rows) => {
    if (err) {
      res.status(500).send({ error: "Oups!" });
      console.error(err.stack);
    } else {
      res.json(rows);
    }
  });
});
routes.get("/benefits", (req, res) => {
  db.all("SELECT * FROM benefits", (err, rows) => {
    if (err) {
      res.status(500).send({ error: "Oups!" });
      console.error(err.stack);
    } else {
      res.json(rows);
    }
  });
});

routes.get("/appointment", (req, res) => {
  db.all("SELECT appointment_id, appointment_date, appointment_name, appointment_duration, user_name, user_firstname, user_tel, garage_name, garage_city FROM appointment LEFT JOIN users USING(user_id) LEFT JOIN garages USING(garage_id)", (err, rows) => {
    if (err) {
      res.status(500).send({ error: "Oups!" });
      console.error(err.stack);
    } else {
      res.json(rows);
    }
  });
});

  module.exports = routes;


