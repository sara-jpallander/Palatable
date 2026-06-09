import mongoose from "mongoose";
import dotenv from "dotenv";
import Palette from "../models/Palette";

dotenv.config();

const palettes = [
  { id: 1, name: "Modern Blue", tags: ["modern", "professional", "saas"] },
  { id: 2, name: "Warm Autumn", tags: ["warm", "nature", "organic"] },
  { id: 3, name: "Midnight Dark", tags: ["dark", "minimal", "elegant"] },
  { id: 4, name: "Fresh Mint", tags: ["fresh", "health", "clean"] },
  { id: 5, name: "Sunset Orange", tags: ["bold", "energetic", "creative"] },
  { id: 6, name: "Soft Lavender", tags: ["soft", "calm", "beauty"] },
  { id: 7, name: "Forest Green", tags: ["nature", "eco", "organic"] },
  { id: 8, name: "Ocean Breeze", tags: ["cool", "calm", "travel"] },
  { id: 9, name: "Rose Gold", tags: ["luxury", "feminine", "modern"] },
  { id: 10, name: "Arctic White", tags: ["minimal", "clean", "nordic"] },
  { id: 11, name: "Deep Purple", tags: ["creative", "bold", "artistic"] },
  { id: 12, name: "Coral Pink", tags: ["playful", "warm", "lifestyle"] },
  { id: 13, name: "Steel Gray", tags: ["professional", "tech", "neutral"] },
  { id: 14, name: "Golden Hour", tags: ["warm", "luxury", "premium"] },
  { id: 15, name: "Cyber Neon", tags: ["dark", "neon", "gaming"] },
  { id: 16, name: "Terracotta", tags: ["earthy", "warm", "organic"] },
  { id: 17, name: "Electric Blue", tags: ["bold", "tech", "modern"] },
  { id: 18, name: "Sage Green", tags: ["calm", "nature", "wellness"] },
  { id: 19, name: "Charcoal", tags: ["dark", "minimal", "professional"] },
  { id: 20, name: "Blush Pink", tags: ["soft", "romantic", "beauty"] },
  { id: 21, name: "Midnight Navy", tags: ["professional", "trust", "finance"] },
  { id: 22, name: "Lime Fresh", tags: ["energetic", "food", "health"] },
  { id: 23, name: "Warm Sand", tags: ["neutral", "earthy", "lifestyle"] },
  { id: 24, name: "Ice Blue", tags: ["cool", "clean", "medical"] },
  { id: 25, name: "Ruby Red", tags: ["bold", "passion", "luxury"] },
  { id: 26, name: "Olive Drab", tags: ["earthy", "military", "outdoor"] },
  { id: 27, name: "Pastel Rainbow", tags: ["playful", "kids", "colorful"] },
  { id: 28, name: "Monochrome", tags: ["minimal", "editorial", "clean"] },
  { id: 29, name: "Tropical Vibes", tags: ["colorful", "summer", "travel"] },
  {
    id: 30,
    name: "Urban Concrete",
    tags: ["modern", "architecture", "neutral"],
  },
  { id: 31, name: "Vintage Cream", tags: ["retro", "warm", "classic"] },
  { id: 32, name: "Nordic Frost", tags: ["minimal", "cold", "scandinavian"] },
  { id: 33, name: "Earthy Clay", tags: ["earthy", "handmade", "artisan"] },
  { id: 34, name: "Neon Sunset", tags: ["vibrant", "bold", "nightlife"] },
  { id: 35, name: "Soft Sky", tags: ["calm", "light", "airy"] },
  { id: 36, name: "Deep Ocean", tags: ["dark", "blue", "mysterious"] },
  { id: 37, name: "Candy Shop", tags: ["playful", "sweet", "kids"] },
  { id: 38, name: "Industrial", tags: ["dark", "metal", "urban"] },
  { id: 39, name: "Spring Blossom", tags: ["fresh", "floral", "light"] },
  { id: 40, name: "Coffee Brown", tags: ["warm", "cozy", "food"] },
  { id: 41, name: "Glacier", tags: ["cold", "minimal", "clean"] },
  { id: 42, name: "Retro Funk", tags: ["retro", "bold", "70s"] },
  { id: 43, name: "Zen Garden", tags: ["calm", "japanese", "minimal"] },
  { id: 44, name: "Fiesta", tags: ["colorful", "festive", "bold"] },
  { id: 45, name: "Stormy Night", tags: ["dark", "dramatic", "moody"] },
  { id: 46, name: "Peachy Keen", tags: ["warm", "soft", "friendly"] },
  { id: 47, name: "Matrix Green", tags: ["dark", "neon", "tech"] },
  { id: 48, name: "Dusty Rose", tags: ["muted", "romantic", "vintage"] },
  { id: 49, name: "Bold Bauhaus", tags: ["geometric", "bold", "art"] },
  { id: 50, name: "Midnight Bloom", tags: ["dark", "floral", "elegant"] },
];

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI as string, {
    dbName: "Palatable_DB",
  });
  await Palette.deleteMany({});
  await Palette.insertMany(palettes);
  console.log("50 paletter seedade :D");
  await mongoose.disconnect();
}

seed();
