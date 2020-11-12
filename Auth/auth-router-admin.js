const router = require("express").Router();

const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Admin = require("./auth-model-admin.js");

const { isValid } = require("./auth-service.js");

// Admin endpoints

// GET all Admin
router.get("/", (req, res) => {
  Admin.findAllAdmin()
    .then((admin) => {
      res.status(200).json(admin);
    })
    .catch((error) => {
      console.log(error);
      res
        .status(500)
        .json({ message: "Please provide your admin email and password." });
    });
});
// 1) Admin Register
router.post("/register", (req, res) => {
  const credentials = req.body;
  console.log(credentials, " What is here");

  if (isValid(credentials)) {
    const rounds = process.env.BCRYPT_ROUNDS || 8;

    // here hashing  the password
    const hash = bcryptjs.hashSync(credentials.password, 8);
    credentials.password = hash;

    // and here saving the admin to the database
    Admin.addAdmin(credentials)
      .then((admin) => {
        const token = makeJwt(admin);
        res.status(201).json({
          data: admin,
          token,
          admin_id: admin.id,
          email: admin.email,
          admin: true,
        });
      })
      .catch((error) => {
        res.status(500).json({ message: error.message });
      });
  } else {
    res.status(400).json({
      message: "please provide email and password",
    });
  }
});

// 2) Admin Login
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (isValid(req.body)) {
    Admin.findAllAdmin({ email }).then(([admin]) => {
      if (admin && bcryptjs.compareSync(password, admin.password)) {
        const token = makeJwt(admin);
        res.status(200).json({
          message: `Welcome ${email}`,
          token,
          adminId: admin.id,
          email: admin.email,
          admin: true,
        });
      } else {
        res.status(401).json({ message: "invalid Credentials" });
      }
    });
  } else {
    res.status(400).json({
      message: "Please provide email and password",
    });
  }
});

function makeJwt(admin) {
  const payload = {
    subject: admin.id,
    email: admin.email,
  };
  const secret = process.env.JWT_secret || "supersecret";
  const options = {
    expiresIn: "1d",
  };
  return jwt.sign(payload, secret, options);
}

module.exports = router;
