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

routes.post("/signin ", (req, res) => {
  db.get(
    "SELECT * FROM users WHERE user_name = $name",
    { $name: req.body.name },
    async (err, row) => {
      if (err) {
        console.log(err);
        return res.status(500).json(err);
      }
      if (!row) {
        return res.status(401).json("bad user");
      }
      const match = await bcrypt.compare(req.body.password, row.per_password);
      if (match) {
        const token = jwt.sign({ id: row.per_id }, cfg.jwtSecret, {
          expiresIn: "1h",
        });
        return res.json({ token: token });
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

routes.get("/benefits/:id", (req, res) => {
  const { id } = req.params;
  db.all(`SELECT * FROM benefits WHERE garage_id = ?`, [id], (err, rows) => {
    if (err) {
      res.status(500).send({ error: "Oups!" });
      console.error(err.stack);
    } else {
      res.json(rows);
    }
  });
});

routes.get("/appointment", (req, res) => {
  db.all(
    "SELECT appointment_id, appointment_date, appointment_name, appointment_duration, user_name, user_firstname, user_tel, garage_name, garage_city FROM appointment LEFT JOIN users USING(user_id) LEFT JOIN garages USING(garage_id)",
    (err, rows) => {
      if (err) {
        res.status(500).send({ error: "Oups!" });
        console.error(err.stack);
      } else {
        res.json(rows);
      }
    }
  );
});

routes.post("/benefits", (req, res) => {
  db.run(
    " INSERT INTO benefits ( benefits_name, benefits_type, benefits_duration, garage_id)values($name, $type,$duration, $garage_id)",
    {
      $name: req.body.name,
      $type: req.body.type,
      $duration: req.body.duration,
      $garage_id: req.body.garage_id,
    },
    (err, row) => {
      if (err) {
        console.log('body', req.body);
        console.log('err', err);
        return res.json(err).status(401);
      }
      return res.sendStatus(201);
    }
  );
});

routes.post("/garages", (req, res) => {
  db.run(
    " INSERT INTO garages (garage_name, garage_mechanics, garage_body, garage_address, garage_zipcode, garage_city)values($name, $mechanics, $body, $address, $zipcode, $city)",
    {
      $name: req.body.name,
      $mechanics: req.body.mechanics,
      $body: req.body.body,
      $address: req.body.address,
      $zipcode: req.body.zipcode,
      $city: req.body.city,
    },
    (err, row) => {
      if (err) {
        console.log('body', req.body);
        console.log('err', err);
        return res.json(err).status(401);
      }
      return res.sendStatus(201);
    }
  );
});

routes.post("/appointment", (req, res) => {
  db.run(
    " INSERT INTO appointment (appointment_date, appointment_name, appointment_duration, user_id, garage_id)values($date, $name, $duration, $user_id, $garage_id)",
    {
      $date: req.body.date,
      $name: req.body.name,
      $duration: req.body.duration,
      $user_id: req.body.user_id,
      $garage_id: req.body.garage_id,
    },
    (err, row) => {
      if (err) {
        console.log('body', req.body);
        console.log('err', err);
        return res.json(err).status(401);
      }
      return res.sendStatus(201);
    }
  );
});