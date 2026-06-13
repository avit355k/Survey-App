const supabase = require("../config/supabase");


// SIGNUP
exports.signup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true
    });

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }

    const user = data.user;

    const { error: profileError } = await supabase
      .from("profiles")
      .insert([
        {
          id: user.id,
          name,
          role: role || "user"
        }
      ]);

    if (profileError) {
      return res.status(400).json({
        success: false,
        message: profileError.message
      });
    }

    res.status(201).json({
      success: true,
      message: "User created",
      user
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};


// LOGIN
exports.login = async (req, res) => {
  try {

    const { email, password } = req.body;

    const { data, error } =
      await supabase.auth.signInWithPassword({
        email,
        password
      });

    if (error) {
      return res.status(401).json({
        success: false,
        message: error.message
      });
    }

    const userId = data.user.id;

    const { data: profile } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single();

    res.status(200).json({
      success: true,
      token: data.session.access_token,
      user: {
        id: userId,
        email: data.user.email,
        name: profile.name,
        role: profile.role
      }
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message
    });

  }
};