const express = require('express');
const router = express.Router();

router.get('/sections', (req, res) => {
    const section = ["First Year", "Second Year", "Third Year", "Final Year"];
    return res.status(200).json({
        success: true,
        message: "herr in section...",
        section: section
    });
})

router.get('/subject/:section', (req, res) => {
    const subject = { "First Year": ["OOPS", "Engineering Drawing"], "Second Year": ["Data Structure", "Automata Theory"], "Third Year": ["Artificial Intelligence"], "Final Year": ["Project Management", "Internship"] };
    return res.status(200).json({
        success: true,
        message: "herr in section...",
        subjects: subject[req.params.section]
    });
})


module.exports = router;