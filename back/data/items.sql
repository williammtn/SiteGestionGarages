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
    FOREIGN KEY garage_id REFERENCES garages(garage_id)
);

CREATE TABLE appointement (
    appointement_id integer primary key autoincrement,
    appointement_date datetime not null,
    appointement_name varchar not null,
    appointement_duration varchar not null,
    users_id integer not null,
    garages_id integer not null,
    FOREIGN KEY users_id REFERENCES users(user_id),
    FOREIGN KEY garages_id REFERENCES garages(garage_id)
);

