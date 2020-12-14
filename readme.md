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
  sportDuration FLOAT NOT NULL,
  studyDuration FLOAT NOT NULL,  
  quality INTEGER NOT NULL,
  mood INTEGER NOT NULL,
  user_id INTEGER REFERENCES users(id)
);

There is one short third-party snippet of code in ./routes/controllers/summaryController.js to get the week number from a js date. I could've made it myself but it seemed a bit counterproductive.