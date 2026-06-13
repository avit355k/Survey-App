const supabase = require('../config/supabase');

//create a candidate
exports.createCandidate = async (req, res) => {
    try {
        const { name, image_url } = req.body;

        const { data, error } = await supabase
            .from("candidates")
            .insert([
                {
                    name,
                    image_url,
                },
            ])
            .select();

        if (error) throw error;

        res.status(201).json(data);
    } catch (err) {
        res.status(500).json({
            message: err.message,
        });
    }
};

//get all candidates
exports.getCandidates = async (req, res) => {
    try {
        const { data, error } = await supabase
            .from("candidates")
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

//update a candidate
exports.updateCandidate = async (req, res) => {
    try {
        const { id } = req.params;

        const { data, error } = await supabase
            .from("candidates")
            .update(req.body)
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

//delete a candidate
exports.deleteCandidate = async (req, res) => {
    try {
        const { id } = req.params;

        const { error } = await supabase
            .from("candidates")
            .delete()
            .eq("id", id);
            
        if (error) throw error;

        res.json({
            message: "Candidate deleted",
        });
    } catch (err) {
        res.status(500).json({
            message: err.message,
        });
    }
};