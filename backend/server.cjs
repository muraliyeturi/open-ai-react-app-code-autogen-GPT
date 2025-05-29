/**
 * Express server for AI suggestion API.
 * Proxies OpenAI requests and returns language-specific suggestions for form fields.
 * @module backend/server
 */

const fetch = require("node-fetch");
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(
  cors({
    origin: "*", // Allow all origins
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);
app.use(express.json());

/**
 * POST /api/ai-suggestion
 * Receives a field and language, returns AI-generated suggestions for that field in the requested language.
 * @param {string} field - The form field to generate suggestions for (currentFinancial, employmentCircumstances, reason)
 * @param {string} lang - The language code ('en' or 'ar')
 * @returns {Object} JSON with AI suggestions
 */
app.post("/api/ai-suggestion", async (req, res) => {
  const { field } = req.body;

  /**
   * helpPrompts: Prompt for OpenAI to generate suggestions for all fields in both English and Arabic.
   * The OpenAI response is expected to be a JSON object with translations for each field.
   */
  const helpPrompts =
    'as a public user prepare a list of suggestions as options for describing user "current financial situation", "employment Circumstances", "reason" for filling social support request form. format the options to json response using template({response:[{currentFinancial: "", employmentCircumstances: "", reason: ""}]}) limit options to 10';
  const prompt = helpPrompts;
  if (!prompt) return res.status(400).json({ error: "Invalid field" });

  try {
    /**
     * Forwards the prompt to OpenAI and returns the AI-generated suggestions.
     * Handles errors and returns a 500 status if OpenAI fails.
     */
    const openaiRes = await fetch(process.env.OPENAI_API_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content:
              "You are a helpful assistant for public user form filling.",
          },
          { role: "user", content: prompt },
        ],
        max_tokens: 1000,
        temperature: 0.7,
      }),
    });
    if (!openaiRes.ok) {
      const err = await openaiRes.text();
      return res.status(500).json({ error: "OpenAI API error", details: err });
    }
    const data = await openaiRes.json();
    res.json({ suggestion: data.choices?.[0]?.message?.content || "" });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

const PORT = process.env.PORT || 4000;
/**
 * Starts the Express server on the specified port.
 */
app.listen(PORT, () => {
  console.log(`AI backend listening on port ${PORT}`);
});
