const mongoDb = require("mongodb");
const getDb = require("../utli/database").getDb;

class Admin {
  constructor(
    name,
    email,
    phone,
    gender,
    social_website,
    city,
    state,
    password
  ) {
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.gender = gender;
    this.social_website = social_website;
    this.city = city;
    this.state = state;
    this.password = password;
  }

  save() {
    const db = getDb();
    return db.collection("admins").insertOne(this);
  }

  static fetchOneByEmail(adminEmail) {
    console.log(
      "🚀 ~ file: admin.model.js:31 ~ Admin ~ fetchOneEmail ~ adminEmail:",
      adminEmail
    );
    const db = getDb();
    return db
      .collection("admins")
      .find({ email: adminEmail })
      .next()
      .then((admin) => {
        return admin;
      })
      .catch((err) => {
        return err;
      });
  }
}

module.exports = Admin;
