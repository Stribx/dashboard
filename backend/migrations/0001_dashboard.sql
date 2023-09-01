DROP TABLE IF EXISTS tasks;
DROP TABLE IF EXISTS users;

CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    pseudo VARCHAR(256) NOT NULL,
    password VARCHAR(256) NOT NULL,
    roles VARCHAR(255)[] NOT NULL
);

CREATE TABLE tasks(
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id),
    title VARCHAR(256) NOT NULL,
    description TEXT NOT NULL,
    duration TIME NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(9) CHECK (status IN ('on going', 'completed', 'deleted'))
);
