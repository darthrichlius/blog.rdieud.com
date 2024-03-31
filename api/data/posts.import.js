const jsonUserData = require("./posts.json");
const slugify = require("slugify");

// We can't use the require and aliases as it is reserved to *.js and *.ts
// Make sure the path is always correct
const dbFilePath = "./storage/app_db.db";

const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database(dbFilePath);

jsonUserData.forEach((record) => {
  const slug = slugify(record.title);
  db.run(
    "INSERT INTO posts (title, slug, body, isPublished, userID) VALUES (?, ?, ?, ?, ?)",
    [record.title, slug, record.body, record.isPublished, record.userId],
    (err) => {
      if (err) {
        console.error(err.message);
      } else {
        console.log("Connected to the database");
      }
    }
  );
});

db.close();
