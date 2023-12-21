const mongoDb = require("mongodb");
const getDb = require("../utli/database").getDb;

class User {
  constructor(id, name, email, phone) {
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.id = id ? new mongoDb.ObjectId(id) : null;
  }

  save() {
    const db = getDb();
    let dbOp;
    if (!this.id) {
      this.created_at = new Date().toISOString();
      dbOp = db.collection("users").insertOne(this);
    } else {
      this.updated_at = new Date().toISOString();
      dbOp = db.collection("users").updateOne({ _id: this.id }, { $set: this });
    }
    return dbOp
      .then((result) => {
        return result;
      })
      .catch((err) => {
        return err;
      });
  }

  static signUp() {}

  static getOne(userId) {
    const db = getDb();
    return db
      .collection("users")
      .find({ _id: new mongoDb.ObjectId(userId) })
      .next()
      .then((user) => {
        return user;
      })
      .catch((err) => {
        return err;
      });
  }

  static getAll() {
    const db = getDb();
    return db
      .collection("users")
      .find()
      .toArray()
      .then((users) => {
        return users;
      })
      .catch((err) => {
        return err;
      });
  }

  static delete(userId) {
    const db = getDb();
    return db
      .collection("users")
      .deleteOne({ _id: new mongoDb.ObjectId(userId) })
      .then((result) => {
        return result;
      })
      .catch((err) => {
        console.log(
          "🚀 ~ file: product.js:72 ~ Product ~ returndb.collection ~ err:",
          err
        );
        return err;
      });
  }
}

module.exports = User;
