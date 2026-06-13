const supabase = require("../config/supabase");

const roleMiddleware = (role) => {
  return async (req, res, next) => {

    const { data: profile } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", req.user.id)
      .single();

    if (!profile) {
      return res.status(404).json({
        message: "Profile not found"
      });
    }

    if (profile.role !== role) {
      return res.status(403).json({
        message: "Access denied"
      });
    }

    next();
  };
};

module.exports = roleMiddleware;