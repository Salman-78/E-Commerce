const jwt = require("jsonwebtoken");

const fetchUser = async (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) return res.status(404).send({ error: "Token missing" });

  try {
    const data = jwt.verify(token, "secret_ecom");
    req.user = data.user;
    next();
  } catch (err) {
    res.status(401).send({ error: "Invalid Token" });
  }
};

module.exports = fetchUser;
