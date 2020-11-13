const router = require("express").Router();

const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Buyer = require("./auth-model-buyer.js");

const { isValid } = require("./auth-service.js");

//Buyers End Points

// GET all Buyers
router.get("/", (req, res) => {
  Buyer.findAllBuyer()
    .then((buyer) => {
      console.log(buyer, "BUYER BUYER BUYER");
      res.status(200).json(buyer);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ message: " buyer's data can not be retrieved" });
    });
});

// 1) Buyers Register
router.post("/register", (req, res) => {
  const credentials = req.body;

  if (isValid(credentials)) {
    const rounds = process.env.BCRYPT_ROUNDS || 8;

    // here hashing  the password
    const hash = bcryptjs.hashSync(credentials.password, 8);
    credentials.password = hash;

    // and here saving the buyer to the database
    Buyer.addBuyer(credentials)
      .then((buyer) => {
        const token = makeJwt(buyer);
        res.status(201).json({
          data: buyer,
          token,
          buyerId: buyer.id,
          email: buyer.email,
          admin: false,
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
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (isValid(req.body)) {
    Buyer.findByBuyer({ email }).then(([buyer]) => {
      console.log(buyer, "BUYER");

      if (buyer && bcryptjs.compareSync(password, buyer.password)) {
        const token = makeJwt(buyer);

        res.status(200).json({
          message: `Welcome ${email}`,
          token,
          buyerId: buyer.id,
          email: buyer.email,
          admin: false,
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

function makeJwt(buyer) {
  const payload = {
    subject: buyer.id,
    email: buyer.email,
  };
  const secret = process.env.JWT_secret || "supersecret";
  const options = {
    expiresIn: "1d",
  };
  return jwt.sign(payload, secret, options);
}

module.exports = router;
