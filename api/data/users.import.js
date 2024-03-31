const { registerPathAliases } = require("./_setup");
registerPathAliases();

const jsonUserData = require("./users.json");

// We can't use the require and aliases as it is reserved to *.js and *.ts
// Make sure the path is always correct
const dbFilePath = "./storage/app_db.db";

const sqlite3 = require("sqlite3").verbose();

const { encryptMe } = require("~/utils/security.ts");

const db = new sqlite3.Database(dbFilePath);

jsonUserData.forEach((record) => {
  const encryptedPassword = encryptMe(record.password);
  db.run(
    "INSERT INTO users (username, email, password, firstname, lastname) VALUES (?, ?, ?, ?, ?)",
    [
      record.username,
      record.email,
      encryptedPassword,
      record.firstname,
      record.lastname,
    ],
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
