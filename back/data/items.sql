DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS garages;
DROP TABLE IF EXISTS benefits;
DROP TABLE IF EXISTS appointement;

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
    garage_city varchar not null
);

CREATE TABLE benefits (
    benefits_id integer primary key autoincrement,
    benefits_name varchar not null,
    benefits_type varchar not null,
    benefits_duration varchart not null,
    garage_id integer not null,
    CONSTRAINT fk_garage_id FOREIGN KEY (garage_id) REFERENCES garages(garage_id)
);

CREATE TABLE appointment (
    appointment_id INTEGER PRIMARY KEY AUTOINCREMENT,
    appointment_date DATETIME NOT NULL,
    appointment_name VARCHAR NOT NULL,
    appointment_duration VARCHAR NOT NULL,
    user_id INTEGER NOT NULL,
    garage_id INTEGER NOT NULL,
    CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES users(user_id),
    CONSTRAINT fk_garage_id FOREIGN KEY (garage_id) REFERENCES garages(garage_id)
);

