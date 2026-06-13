const supabase = require("../config/supabase");

const authMiddleware = async (req, res, next) => {

  try {

    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        message: "Token missing"
      });
    }

    const { data, error } =
      await supabase.auth.getUser(token);

    if (error) {
      return res.status(401).json({
        message: "Invalid token"
      });
    }

    req.user = data.user;

    next();

  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
};

module.exports = authMiddleware;