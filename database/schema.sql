CREATE DATABASE hp;

CREATE TABLE houses (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    founder VARCHAR(100) NOT NULL
);

CREATE TABLE wizards (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    house_id INTEGER REFERENCES houses(id) ON DELETE SET NULL
);

INSERT INTO houses (name, founder) VALUES 
    ('Grifinória', 'Godric Gryffindor'),
    ('Sonserina', 'Salazar Slytherin'),
    ('Corvinal', 'Rowena Ravenclaw'),
    ('Lufa-Lufa', 'Helga Hufflepuff');

INSERT INTO wizards (name, house_id) VALUES 
    ('Harry Potter', 1),
    ('Draco Malfoy', 2),
    ('Luna Lovegood', 3),
    ('Cedrico Diggory', 4);
