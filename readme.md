# WSD Project for year 2020

This is a project that I made for an university course I was doing (https://wsd.cs.aalto.fi).

## Demo

A working demo can be found running for at least the end of the year on my webpage at http://lyrete.me:7777/

## Dependencies

There is one short third-party snippet of code in ./routes/controllers/summaryController.js to get the week number from a js date. I could've made it myself but it seemed a bit counterproductive.

The page is styled mostly using [Darkly](https://bootswatch.com/darkly/) that is just a darker theme of [Bootstrap](https://getbootstrap.com/);

### Demoing on your own machine

Use these CREATE statements to create the require tables in your own DB for testing

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(320),
  password VARCHAR(60)
);

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

### Tests

Sadly unit testing is completely missing as I didn't have the time to complete it.
