const supabase = require("../config/supabase");

//get overall ranking of candidates based on marks
exports.getOverallRanking = async (req, res) => {
  try {
    // Get category count
    const { count: categoriesCount, error: categoryError } =
      await supabase
        .from("categories")
        .select("*", {
          count: "exact",
          head: true,
        });

    if (categoryError) throw categoryError;

    const maxPossibleMarks = categoriesCount * 10;

    const { data, error } = await supabase
      .from("survey_marks")
      .select(`
        marks,
        candidate:candidate_id(
          id,
          name,
          image_url
        )
      `);

    if (error) throw error;

    const rankingMap = {};

    data.forEach((row) => {
      const candidate = row.candidate;

      if (!rankingMap[candidate.id]) {
        rankingMap[candidate.id] = {
          candidate_id: candidate.id,
          candidate_name: candidate.name,
          image_url: candidate.image_url,
          total_marks: 0,
          total_entries: 0,
        };
      }

      rankingMap[candidate.id].total_marks += Number(
        row.marks
      );

      rankingMap[candidate.id].total_entries += 1;
    });

    const rankings = Object.values(rankingMap)
      .map((item) => ({
        ...item,

        average_marks:
          item.total_entries > 0
            ? Number(
              (
                item.total_marks /
                (item.total_entries / categoriesCount)
              ).toFixed(2)
            )
            : 0,

        max_possible_marks: maxPossibleMarks,
      }))
      .sort(
        (a, b) =>
          b.average_marks - a.average_marks
      )
      .map((item, index) => ({
        rank: index + 1,
        ...item,
      }));

    res.json({
      success: true,
      data: rankings,
      maxScore: maxPossibleMarks,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
//get Category Ranking
exports.getCategoryRanking = async (
  req,
  res
) => {
  try {
    const { categoryId } = req.params;

    const { data, error } = await supabase
      .from("survey_marks")
      .select(`
        marks,
        candidate:candidate_id(
          id,
          name,
          image_url
        )
      `)
      .eq("category_id", categoryId);

    if (error) throw error;

    const rankingMap = {};

    data.forEach((row) => {
      const candidate = row.candidate;

      if (!rankingMap[candidate.id]) {
        rankingMap[candidate.id] = {
          candidate_id: candidate.id,
          candidate_name: candidate.name,
          image_url: candidate.image_url,
          total_marks: 0,
          votes: 0,
        };
      }

      rankingMap[candidate.id].total_marks += Number(
        row.marks
      );

      rankingMap[candidate.id].votes += 1;
    });

    const rankings = Object.values(rankingMap)
      .map((item) => ({
        ...item,

        average_marks:
          item.votes > 0
            ? Number(
              (
                item.total_marks / item.votes
              ).toFixed(2)
            )
            : 0,
      }))
      .sort(
        (a, b) =>
          b.average_marks -
          a.average_marks
      )
      .map((item, index) => ({
        rank: index + 1,
        ...item,
      }));

    res.json({
      success: true,
      data: rankings,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};


//get results dashboard
exports.getDashboardStats = async (
  req,
  res
) => {
  try {
    const { count: usersCount } =
      await supabase
        .from("profiles")
        .select("*", {
          count: "exact",
          head: true,
        });

    const { count: candidatesCount } =
      await supabase
        .from("candidates")
        .select("*", {
          count: "exact",
          head: true,
        });

    const { count: categoriesCount } =
      await supabase
        .from("categories")
        .select("*", {
          count: "exact",
          head: true,
        });

    const { count: surveyCount } =
      await supabase
        .from("survey_submissions")
        .select("*", {
          count: "exact",
          head: true,
        });

    res.json({
      success: true,
      data: {
        totalUsers: usersCount,
        totalCandidates: candidatesCount,
        totalCategories: categoriesCount,
        totalSurveys: surveyCount,
      },
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};