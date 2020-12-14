# WSD Project for year 2020

This is a project that I made for an university course I was doing (https://wsd.cs.aalto.fi).

The app runs a webpage that users can auth and use to log data about sleep and daily activity and view averages based on entered data.

An unauthed user can access average data through an API for all users and also see how the general mood has been lately.

Functionality to auth and register is provided.

## Demo

A working demo can be found running for at least the end of the year on my webpage at http://lyrete.me:7777/

Instructions on how to run a demo on your own computer are lower in the README.

The code is also available on my public [github](https://github.com/Lyrete/wsd-project)

## Dependencies

There is one short third-party snippet of code to get the week number from a js date. I could've made it myself but it seemed a bit counterproductive. It is commented pretty clearly and credited.

The page is styled mostly using [Darkly](https://bootswatch.com/darkly/) that is just a darker theme of [Bootstrap](https://getbootstrap.com/). Bootstrap is also used for some navigation functionality.

To enable said navigation there is a tiny bit of jQuery in one file as this was what I was most familiar with but it is solely to enable the navigation tabs.

Other elements should be content that is fairly well touched upon during the course.

### Demoing on your own build

The included config.js file only loads a .env file if one is present from the project folder. To ensure the db has the proper details for your own testDB make sure to include a .env file that has the following variables.

```
PGHOST=(YOUR-DBHOST-HERE)
PGUSER=(YOUR-DBUSER-HERE)
PGDATABASE=(YOUR-DB-HERE)
PGPASSWORD=(YOUR-PW-HERE)
PGPORT=5432 (or other port?)
```

Use these CREATE statements to create the require tables in your own DB for testing.

```
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(320),
  password VARCHAR(60)
);
```

```
CREATE TABLE morningReports (
  id SERIAL PRIMARY KEY,
  date DATE NOT NULL,
  duration FLOAT NOT NULL, 
  quality INTEGER NOT NULL,
  mood INTEGER NOT NULL,
  user_id INTEGER REFERENCES users(id)
);
```
```
CREATE TABLE eveningReports (
  id SERIAL PRIMARY KEY,
  date DATE NOT NULL,
  sportDuration FLOAT NOT NULL,
  studyDuration FLOAT NOT NULL,  
  quality INTEGER NOT NULL,
  mood INTEGER NOT NULL,
  user_id INTEGER REFERENCES users(id)
);
```

### Tests

Sadly unit testing is completely missing as I didn't have the time to complete it.
