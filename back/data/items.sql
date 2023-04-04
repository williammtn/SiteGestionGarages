DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS garages;
DROP TABLE IF EXISTS benefits;
DROP TABLE IF EXISTS appointment;

CREATE TABLE users (
    user_id integer primary key autoincrement,
    user_role integer DEFAULT 0,
    user_name varchar not null,
    user_firstname varchar not null,
    user_mail varchar not null UNIQUE,
    user_password varchar not null,
    user_tel varchar not null
);

CREATE TABLE garages (
    garage_id integer primary key autoincrement,
    garage_name varchar not null,
    garage_mechanics boolean not null,
    garage_body boolean not null,
    garage_address varchar not null,
    garage_zipcode varchar not null,
    garage_city varchar not null
);

CREATE TABLE benefits (
    benefits_id integer primary key autoincrement,
    benefits_name varchar not null,
    benefits_type varchar not null,
    benefits_duration TIME not null,
    garage_id integer not null,
    CONSTRAINT fk_garage_id FOREIGN KEY (garage_id) REFERENCES garages(garage_id)
);

CREATE TABLE appointment (
    appointment_id INTEGER PRIMARY KEY AUTOINCREMENT,
    appointment_date DATETIME NOT NULL,
    appointment_name VARCHAR NOT NULL,
    appointment_duration TIME NOT NULL,
    user_id INTEGER NOT NULL,
    garage_id INTEGER NOT NULL,
    CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES users(user_id),
    CONSTRAINT fk_garage_id FOREIGN KEY (garage_id) REFERENCES garages(garage_id)
);

INSERT INTO benefits (benefits_name, benefits_type, benefits_duration, garage_id)
VALUES ('Vidange', 'Mecanique', '14:30:00', 1);

INSERT INTO benefits (benefits_name, benefits_type, benefits_duration, garage_id)
VALUES ('Carosserie', 'Carosserie', '08:00:00', 1);

INSERT INTO appointment (appointment_date, appointment_name, appointment_duration, user_id, garage_id)
VALUES ('2023-04-05 14:30:00', 'Vidange', '01:00:00', 1, 1);

INSERT INTO appointment (appointment_date, appointment_name, appointment_duration, user_id, garage_id)
VALUES ('2023-04-06 14:30:00', 'Carosserie', '01:00:00', 2, 1);

INSERT INTO users (user_role, user_name, user_firstname, user_mail, user_password, user_tel) VALUES (1, 'Dupont', 'Jean', 'jean.dupont@gmail.com', 'password123', '0102030405');

INSERT INTO garages (garage_name, garage_mechanics, garage_body, garage_address, garage_zipcode, garage_city) VALUES ('Garage Mécanique', 1, 0, '3 rue des Mécaniciens', '75010', 'Paris');

INSERT INTO benefits (benefits_name, benefits_type, benefits_duration, garage_id) VALUES ('Vidange', 'Révision', '01:30:00', 1);

INSERT INTO appointment (appointment_date, appointment_name, appointment_duration, user_id, garage_id) VALUES ('2023-04-10 14:00:00', 'Réparation', '02:00:00', 1, 1);

