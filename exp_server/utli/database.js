const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

let _db;
const mongoConnect = (callback) => {
  MongoClient.connect(
    "mongodb+srv://narenmartin14:cRUn4uUhbzOZSrBb@cluster0.xgsmrlp.mongodb.net/gulkul_server?retryWrites=true&w=majority"
  )
    .then((client) => {
      console.log("Connected!");
      _db = client.db();
      callback();
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
};

const getDb = () => {
  if (_db) {
    return _db;
  }
  throw "No Database Found!!";
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
