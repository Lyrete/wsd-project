

Use these CREATE statements to create the require tables in your own DB for testing

CREATE TABLE morningReports (
  id SERIAL PRIMARY KEY,
  date DATE NOT NULL,
  duration FLOAT NOT NULL, 
  quality INTEGER NOT NULL,
  mood INTEGER NOT NULL,
  user_id INTEGER REFERENCES users(id)
);

CREATE TABLE eveningReports (
  id SERIAL PRIMARY KEY,
  date DATE NOT NULL,
  sleepDuration FLOAT NOT NULL,
  studyDuration FLOAT NOT NULL,  
  quality INTEGER NOT NULL,
  mood INTEGER NOT NULL,
  user_id INTEGER REFERENCES users(id)
);

Sadly I only realized way too late that PostgreSQL doesn't support camelCase :D