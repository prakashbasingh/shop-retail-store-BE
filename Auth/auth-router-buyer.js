const router = require("express").Router();

const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Buyers = require("./buyer-model.js");

const { isValid } = require(".auth-service.js");

//Buyers End Points

// GET all Buyers
router.post("/admin", (req, res) => {
    Buyers.findAllBuyers()
    .then(admin => {
        res.status(200).json(admin)
    })
    .catch(error => {
        res.status(500).json({ message: " admin data can not be retrieved"})
    })
}

// 1) Buyers Register
router.post("/buyer/register", (req, res) => {
  const credentials = req.body;

  if (isValid(credentials)) {
    const rounds = process.env.BCRYPT_ROUNDS || 8;

    // here hashing  the password
    const hash = bcryptjs.hashSync(credentials.password, rounds);
    credentials.password = hash;

    // and here saving the user to the database
    Buyers.addBuyer(credentials)
      .then((user) => {
        const token = makeJwt(user);
        res.status(201).json({
          data: user,
          token,
          admin_id: user.id,
          email: user.email,
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

// 2) Buyers Login
router.post("/buyer/login", (req, res) => {
  const { email, password } = req.body;

  if (isValid(req.body)) {
    Buyers.findBuyer({ email }).then(([user]) => {
      if (user && bcryptjs.compareSync(password, user.password)) {
        const token = makeJwt(user);
        res.status(200).json({
          message: `Welcome ${email}`,
          token,
          adminId: user.id,
          email: user.email,
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

function makeJwt(user) {
  const payload = {
    subject: user.id,
    email: user.email,
  };
  const secret = process.env.JWT_secret || "supersecret";
  const options = {
    expiresIn: "1d",
  };
  return jwt.sign(payload, secret, options);
}

module.exports = router;
