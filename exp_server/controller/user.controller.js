const User = require("../models/user.model");

exports.getOneUser = async (req, res, next) => {
  const userId = req.params.userId;
  try {
    const userDetail = await User.getOne(userId);
    res
      .status(200)
      .json({ message: "User sucessfully fetched", user: userDetail });
  } catch (err) {
    res.status(401).json({ message: err.message, err: err });
  }
};

exports.addUser = async (req, res, next) => {
  const name = req.body.name;
  const email = req.body.email;
  const phone = req.body.phone;
  const user = new User(null, name, email, phone);
  try {
    const userRes = await user.save();
    res.status(200).json({ message: "User sucessfully saved", user: userRes });
  } catch (err) {
    res.status(401).json({ message: err.message, err: err });
  }
};

exports.updateUser = async (req, res, next) => {
  const userId = req.body.userId;
  const name = req.body.name;
  const email = req.body.email;
  const phone = req.body.phone;
  const user = new User(userId, name, email, phone);
  try {
    const userRes = await user.save();
    res
      .status(200)
      .json({ message: "User sucessfully updated", user: userRes });
  } catch (err) {
    res.status(401).json({ message: err.message, err: err });
  }
};

exports.deleteUser = async (req, res, next) => {
  const userId = req.params.userId;

  try {
    const userRes = await User.delete(userId);
    res
      .status(200)
      .json({ message: "User sucessfully deleted", user: userRes });
  } catch (err) {
    res.status(401).json({ message: err.message, err: err });
  }
};

exports.getAllUsers = (req, res, next) => {
  User.getAll()
    .then((users) => {
      res
        .status(200)
        .json({ message: "sucessfully fetched users", users: users });
    })
    .catch((err) => {
      res.status(401).json({ message: err.message, err: err });
    });
};
