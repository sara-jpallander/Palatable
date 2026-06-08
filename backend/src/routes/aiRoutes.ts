import express from "express";
import type { Request, Response } from "express";
import OpenAI from "openai";

import Palette from "../models/Palette.ts";

const router = express.Router(); 

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

router.post("/suggest", async (req: Request, res: Response) => {
    const {message} = req.body;
    if (!message || typeof message !== "string") {
        return res.status(400).json({error: "Meddelande saknas"});
     }
     //hämtar alla paletter från får databas använder lean för att få vanliga js objekt istället för mongoose dokument
     const palettes = await Palette.find({}, {_id: 0, name: 1}).lean();
     //bygger en lista som Ai kan läsa och förstå
     const paletteList = palettes
     .map((p) => `- name: "${p.name}", tags: [${p.tags.join(", ")}]`)
        .join("\n");

     const completion = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
        {
        role: "system",
        content: `You are a color palette recommendation assistant for a web app called Palatable.
You have access to a curated list of color palettes, each with a name and tags describing their mood, style, and use-case.
When the user describes what they need, suggest 3 to 5 palettes from the list that best match their request.
Always respond with valid JSON only — no markdown, no extra text.
Svara ENDAST med giltig JSON i detta format:
{
  "suggestions": [
    { "name": "...", "tags": ["..."], "reason": "..." }
  ]
}`
        },
        {
        role: "user",
        content: `Here are the available palettes:\n${paletteList}\n\nUser request: "${message}"`
        }
    ],
    //begränasar text som Ai genererar så att den inte blir för lång och svår att hantera i frontend
    temperature: 0.5,
    max_tokens: 500
     });

     const raw = completion.choices[0].message?.content ?? "{}";
     const parsed = JSON.parse(raw);

     res.status(200).json(parsed);
});

export default router;