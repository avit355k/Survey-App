const supabase = require("../config/supabase");

// Submit Survey
exports.submitSurvey = async (req, res) => {
  try {
    const userId = req.user.id;
    const { ratings } = req.body;

    if (!ratings || !Array.isArray(ratings) || ratings.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Ratings are required",
      });
    }

    // Check duplicate submission
    const { data: existingSubmission } = await supabase
      .from("survey_submissions")
      .select("id")
      .eq("user_id", userId)
      .maybeSingle();

    if (existingSubmission) {
      return res.status(400).json({
        success: false,
        message: "You have already submitted the survey",
      });
    }

    // Create Submission
    const { data: submission, error: submissionError } = await supabase
      .from("survey_submissions")
      .insert([
        {
          user_id: userId,
        },
      ])
      .select()
      .single();

    if (submissionError) throw submissionError;

    const marksRows = ratings.map((item) => ({
      submission_id: submission.id,
      candidate_id: item.candidate_id,
      category_id: item.category_id,
      marks: item.marks,
    }));

    const { error: marksError } = await supabase
      .from("survey_marks")
      .insert(marksRows);

    if (marksError) throw marksError;

    res.status(201).json({
      success: true,
      message: "Survey submitted successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};


// Check Survey Status
exports.hasSubmittedSurvey = async (req, res) => {
  try {
    const userId = req.user.id;

    const { data } = await supabase
      .from("survey_submissions")
      .select("id")
      .eq("user_id", userId)
      .maybeSingle();

    res.json({
      success: true,
      submitted: !!data,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// Get User Submitted Survey
exports.getMySurvey = async (req, res) => {
  try {
    const userId = req.user.id;

    const { data: submission, error: submissionError } =
      await supabase
        .from("survey_submissions")
        .select("id")
        .eq("user_id", userId)
        .single();

    if (submissionError) {
      return res.status(404).json({
        success: false,
        message: "Survey not found",
      });
    }

    const { data: marks, error: marksError } =
      await supabase
        .from("survey_marks")
        .select(`
          candidate_id,
          category_id,
          marks
        `)
        .eq("submission_id", submission.id);

    if (marksError) throw marksError;

    res.json({
      success: true,
      ratings: marks,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};