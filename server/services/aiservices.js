const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

async function analyzeResume(resumeText) {
    try {
        const prompt = `
You are a Senior Software Engineering Recruiter.

Analyze the following resume carefully.

Return ONLY clean Markdown.

Formatting Rules:
- Do NOT use *** or --- separators.
- Use proper Markdown headings (# and ##).
- Use bullet points instead of long paragraphs.
- Keep each bullet concise.
- Do not repeat information.
- Keep the response professional.

Generate the response in this exact format:

# 📄 Resume Analysis

## ⭐ Overall Score
Give a score out of 10 with one sentence.

## 💪 Strengths
- Point 1
- Point 2
- Point 3

## ⚠ Weaknesses
- Point 1
- Point 2
- Point 3

## 🚀 Suggestions
- Point 1
- Point 2
- Point 3

## 🎯 ATS Score
Give an ATS score out of 100 with one sentence.

Resume:
${resumeText}
`;

        const response = await ai.models.generateContent({
    model: "gemini-3.5-flash",
    contents: prompt,
});

console.log("FULL RESPONSE:");
console.log(response);
console.log("typeof response.text =", typeof response.text);
console.log("response.text =", response.text);

console.log("============== RESPONSE ==============");
console.dir(response, { depth: null });

return response.text;

    } catch (error) {

    console.error("Gemini Error:", error);

    if (error.status === 503) {

        console.log("Gemini is busy. Retrying in 2 seconds...");

        await new Promise(resolve => setTimeout(resolve, 2000));

        const retryResponse = await ai.models.generateContent({
            model: "gemini-3.5-flash",
            contents: prompt,
        });

        return retryResponse.text;
    }

    throw error;
}
} 
async function generateCoverLetter(company, role) {

    const prompt = `
You are an expert career coach.

Write a professional cover letter.

Company:
${company}

Role:
${role}

The cover letter should:

- Be professional
- Be enthusiastic
- Mention relevant technical skills
- Be around 250-300 words
- End politely
`;

    const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
    });

    return response.text;
}
async function generateInterviewQuestions(company, role) {

    const prompt = `
You are an experienced technical interviewer.

Generate interview preparation material for the following job.

Company:
${company}

Role:
${role}

Provide:

1. 5 Technical Questions
2. 5 HR Questions
3. 3 Behavioral Questions
4. Important topics to revise
5. Tips to crack the interview

Format the response neatly with headings.
`;

    const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
    });

    return response.text;
}

module.exports = {
    analyzeResume,
    generateCoverLetter,
    generateInterviewQuestions
};