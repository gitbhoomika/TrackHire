const fs = require("fs");

const { GoogleGenAI } = require("@google/genai");
require("dotenv").config();

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

async function main() {
    try {
        const response = await fetch(
            "https://generativelanguage.googleapis.com/v1beta/models?key=" +
            process.env.GEMINI_API_KEY
        );

       const data = await response.json();

for (const model of data.models) {
    console.log(model.name);
}

        fs.writeFileSync(
            "models.json",
            JSON.stringify(data, null, 2)
        );

        console.log("Models saved to models.json");

    } catch (err) {
        console.error(err);
    }
}

main();