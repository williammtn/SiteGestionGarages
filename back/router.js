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

routes.post("/signin",(req, res) => {
  db.get("SELECT * FROM users WHERE user_mail = $mail",
    { $mail: req.body.mail },
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

routes.get("/user", (req, res) => {
  db.all("SELECT * FROM users u WHERE user_id NOT IN (SELECT user_id FROM garages)", (err, rows) => {
    if (err) {
      res.status(500).send({ error: "Oups!" });
      console.error(err.stack);
    } else {
      res.json(rows);
    }
  });
});

routes.get("/profil/:id", auth.authenticate(),(req, res) => {
  db.get("SELECT * FROM users where user_id= ?", req.params.id, (err, rows) => {
    if (err) {
      res.status(500).send({ error: "Oups!" });
      console.error(err.stack);
    } else {
      res.json(rows);
    }
  });
});

routes.delete("/delete/:id", (req, res) => {
  const userId = req.params.id;
  db.run("DELETE FROM users WHERE user_id = ?", userId, (err) => {
    if (err) {
      res.status(500).send({ error: "Erreur lors de la suppression de l'utilisateur" });
      console.error(err.stack);
    } else {
      db.run("DELETE FROM appointment WHERE user_id = ?", userId, (err) => {
        if (err) {
          res.status(500).send({ error: "Erreur lors de la suppression des rendez-vous de l'utilisateur" });
          console.error(err.stack);
        } else {
          res.status(204).send(); // 204 signifie "No Content"
        }
      });
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

//récupère les prestation liée à un garage
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

routes.get("/disponibilities/:id", (req, res) => {
  const { id } = req.params;
  db.all(`SELECT * FROM disponibilities WHERE garage_id = ? AND available = 1`, [id], (err, rows) => {
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
    "SELECT appointment_id, user_name, user_firstname, user_tel, garage_name, garage_city, benefits_name, benefits_type, disponibility_date FROM appointment LEFT JOIN users USING(user_id) LEFT JOIN garages USING(garage_id) LEFT JOIN benefits USING(benefits_id) LEFT JOIN disponibilities USING(disponibility_id)",
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

routes.get("/appointment/:id", (req, res) => {
  db.all("SELECT appointment_id, user_name, user_firstname, user_tel, garage_name, garage_city, benefits_name, benefits_type, disponibility_date, start_hour, end_hour FROM appointment LEFT JOIN users USING(user_id) LEFT JOIN garages USING(garage_id) LEFT JOIN benefits USING(benefits_id) LEFT JOIN disponibilities USING(disponibility_id) WHERE user_id=?", req.params.id,
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

routes.delete("/appointment_delete/:id", (req, res) => {
  db.run("DELETE FROM appointment WHERE appointment_id=?", req.params.id,
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

routes.get("/appointment_liste/:id", (req, res) => {
  db.all("SELECT appointment_id, users.user_name, users.user_firstname, users.user_mail, users.user_tel, disponibilities.disponibility_date, disponibilities.start_hour, disponibilities.end_hour FROM disponibilities JOIN garages ON garages.garage_id = disponibilities.garage_id JOIN users ON users.user_id = garages.user_id JOIN appointment ON appointment.garage_id = garages.garage_id WHERE garages.garage_id = ? AND appointment.appointment_id = appointment_id ", req.params.id,
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
    " INSERT INTO garages (garage_name, garage_mechanics, garage_body, garage_address, garage_zipcode, garage_city,garage_opening, garage_closing, user_id)values($name, $mechanics, $body, $address, $zipcode, $city, $garage_opening,$garage_closing, $user_id)",
    {
      $name: req.body.name,
      $mechanics: req.body.mechanics,
      $body: req.body.body,
      $address: req.body.address,
      $zipcode: req.body.zipcode,
      $city: req.body.city,
      $garage_opening: req.body.garage_opening,
      $garage_closing: req.body.garage_closing,
      $user_id: req.body.user_id
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
    " INSERT INTO appointment (user_id, garage_id, disponibility_id, benefits_id)values($user_id, $garage_id, $disponibility_id, $benefits_id)",
    {
      $user_id: req.body.user_id,
      $garage_id: req.body.garage_id,
      $disponibility_id: req.body.disponibility_id,
      $benefits_id: req.body.benefits_id,
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

routes.patch("/disponibilities/:id", (req, res) => {
  const { id } = req.params;

  db.run(
    "UPDATE disponibilities SET available=0 WHERE disponibility_id = $disponibility_id",
    {
      $disponibility_id: id
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

routes.post("/disponibilities", (req, res) => {
  db.run(
    " INSERT INTO disponibilities (garage_id, disponibility_date, start_hour, end_hour) VALUES ($garage_id, $date, $start_hour, $end_hour)",
    {
      $garage_id: req.body.garage_id,
      $date: req.body.date,
      $start_hour: req.body.start_hour,
      $end_hour: req.body.end_hour,
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

routes.get("/profile/disponibilities/:id", (req, res) => {
  const { id } = req.params;
  db.all(`SELECT disponibility_id, disponibility_date, start_hour, end_hour 
          FROM disponibilities 
          join garages on garages.garage_id = disponibilities.garage_id  
          join users on users.user_id = garages.user_id 
          where garages.garage_id = ?
          order by disponibility_date asc;`, [id], (err, rows) => {
    if (err) {
      res.status(500).send({ error: "Oups!" });
      console.error(err.stack);
    } else {
      res.json(rows);
    }
  });
});

routes.delete("/profile/disponibilities/delete/:id", (req, res) => {
  const { id } = req.params;
  db.run(
    `DELETE FROM disponibilities WHERE disponibility_id = ?`,
    [id],
    (err) => {
      if (err) {
        res.status(500).send({ error: "Oups!" });
        console.error(err.stack);
      } else {
        res.send({ message: "Disponibilité supprimée avec succès." });
      }
    }
  );
});

routes.put("/users/modify/:id", (req, res) => {
  const { id } = req.params;
  bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
    if (err) {
      return res.status(500).send({ error: "Erreur lors du hashage du mot de passe" });
    }
    const { name, firstname, mail, tel } = req.body;
    db.run(
      `UPDATE users SET user_name = ?, user_firstname = ?, user_mail = ?, user_password = ?, user_tel = ? WHERE user_id = ?`,
      [name, firstname, mail, hash, tel, id],
      (err) => {
        if (err) {
          console.error(err.stack);
          return res.status(500).send({ error: "Erreur lors de la mise à jour de l'utilisateur" });
        } else {
          return res.status(200).send({ message: "Utilisateur mis à jour avec succès" });
        }
      }
    );
  });
});
