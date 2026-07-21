const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const pdf = require("pdf-parse");


const {
    analyzeResume,
    generateCoverLetter,
    generateInterviewQuestions
} = require("../services/aiservices");
router.post(
    "/analyze-resume",
    upload.single("resume"),
    async (req, res) => {

        try {

            const data = await pdf(req.file.buffer);

            console.log(data.text);
            const analysis = await analyzeResume(data.text);

console.log("========== ANALYSIS ==========");
console.log(analysis);

res.json({
    analysis,
});

        } catch (error) {
    console.error(error);

    if (error.status === 503) {
        return res.status(503).json({
            message: "Gemini is currently busy. Please try again in a minute."
        });
    }

    res.status(500).json({
        message: "Internal server error"
    });
}

    }
);
router.post("/generate-cover-letter", async (req, res) => {

    try {

        const { company, role } = req.body;

        const coverLetter = await generateCoverLetter(company, role);

        res.json({
            coverLetter
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: error.message
        });

    }

});
router.post("/generate-interview-questions", async (req, res) => {

    try {

        const { company, role } = req.body;

        console.log(company);
        console.log(role);

        const questions = await generateInterviewQuestions(company, role);

res.json({
    questions
});

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Something went wrong"
        });

    }

});
module.exports = router;