const Admin = require("../models/admin.model");

exports.signUp = async (req, res, next) => {
  const name = req.body.name;
  const email = req.body.email;
  const phone = req.body.phone;
  const gender = req.body.gender;
  const social_website = req.body.social_website;
  const city = req.body.city;
  const state = req.body.state;
  const password = req.body.password;

  try {
    const admin = new Admin(
      name,
      email,
      phone,
      gender,
      social_website,
      city,
      state,
      password
    );
    const adminRes = await admin.save();
    res.status(200).json({ message: "Signed Up Succesfully", admin: adminRes });
  } catch (err) {
    res.status(400).json({ message: err.message, error: err });
    console.log(
      "🚀 ~ file: auth.controller.js:9 ~ exports.signUp=async ~ err:",
      err
    );
  }
};

exports.login = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  try {
    const admin = await Admin.fetchOneByEmail(email);
    if (!admin) {
      res.status(401).json({ message: "No Users in this email id" });
    }
    if (admin) {
      if (admin.password !== password) {
        res.status(401).json({ message: "invalid Password" });
      } else {
        res
          .status(200)
          .json({ message: "User Sucessfully logged", admin: admin });
      }
    }
  } catch (err) {
    res.status(400).json({ message: err.message, error: err });
  }
};
