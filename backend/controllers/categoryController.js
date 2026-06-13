const supabase = require("../config/supabase");

//Create a category
exports.createCategory = async (req, res) => {
  try {
    const { name, max_marks } = req.body;

    const { data, error } = await supabase
      .from("categories")
      .insert([{ name, max_marks }])
      .select();

    if (error) throw error;

    res.status(201).json(data);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

//Get all categories
exports.getCategories = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("categories")
      .select("*")
      .order("id");

    if (error) throw error;

    res.json(data);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

//Update a category
exports.updateCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const { name, max_marks } = req.body;

    const { data, error } = await supabase
      .from("categories")
      .update({ name, max_marks })
      .eq("id", id)
      .select();

    if (error) throw error;

    res.json(data);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

//Delete a category
exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const { error } = await supabase
      .from("categories")
      .delete()
      .eq("id", id);

    if (error) throw error;

    res.json({
      message: "Category deleted",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};