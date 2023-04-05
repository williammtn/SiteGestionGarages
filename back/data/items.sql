DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS garages;
DROP TABLE IF EXISTS benefits;
DROP TABLE IF EXISTS appointment;
DROP TABLE IF EXISTS disponibilities;

CREATE TABLE users (
    user_id integer primary key autoincrement,
    user_role integer not null,
    user_name varchar not null,
    user_firstname varchar not null,
    user_mail varchar not null,
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
    garage_city varchar not null,
    garage_opening TIME not null,
    garage_closing TIME not null
);

CREATE TABLE benefits (
    benefits_id integer primary key autoincrement,
    benefits_name varchar not null,
    benefits_type varchar not null,
    benefits_duration TIME not null,
    garage_id integer not null,
    CONSTRAINT fk_garage_id FOREIGN KEY (garage_id) REFERENCES garages(garage_id)
);

CREATE TABLE disponibilities (
    disponibility_id integer primary key autoincrement,
    garage_id integer not null,
    disponibility_date date not null,
    start_hour TIME not null,
    end_hour TIME not null CHECK (end_hour > start_hour),
    CONSTRAINT fk_garage_id FOREIGN KEY (garage_id) REFERENCES garages(garage_id)
);

CREATE TABLE appointment (
    appointment_id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    garage_id INTEGER NOT NULL,
    disponibility_id integer not null,
    benefits_id integer not null,
    CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES users(user_id),
    CONSTRAINT fk_garage_id FOREIGN KEY (garage_id) REFERENCES garages(garage_id),
    CONSTRAINT fk_disponibility_id FOREIGN KEY (disponibility_id) REFERENCES garages(garage_id),
    CONSTRAINT fk_benefits_id FOREIGN KEY (benefits_id) REFERENCES benefits(benefits_id)
);

INSERT INTO users (user_role, user_name, user_firstname, user_mail, user_password, user_tel)
VALUES (1, 'Doe', 'John', 'john.doe@example.com', 'password123', '0123456789');

INSERT INTO garages (garage_name, garage_mechanics, garage_body, garage_address, garage_zipcode, garage_city, garage_opening, garage_closing)
VALUES ('Garage Tropicana', 1, 0, '10 Rue du jus frais', '75009', 'Paris', '08:00', '19:00');

INSERT INTO garages (garage_name, garage_mechanics, garage_body, garage_address, garage_zipcode, garage_city, garage_opening, garage_closing)
VALUES ('Garage Joker', 1, 0, '5 Rue du jus bien bien frais', '59000', 'Lille', '09:00', '20:00');

INSERT INTO benefits (benefits_name, benefits_type, benefits_duration, garage_id)
VALUES ('Vidange', 'Mecanique', '01:00:00', 1);

INSERT INTO benefits (benefits_name, benefits_type, benefits_duration, garage_id)
VALUES ('Réparation', 'Carosserie', '01:00:00', 2);

INSERT INTO disponibilities (garage_id, disponibility_date, start_hour, end_hour)
VALUES (1, '2023-04-10', '09:00', '12:00');

INSERT INTO disponibilities (garage_id, disponibility_date, start_hour, end_hour)
VALUES (2, '2023-04-11', '09:00', '20:00');

INSERT INTO appointment (user_id, garage_id, disponibility_id, benefits_id)
VALUES (1, 1, 1, 1);

