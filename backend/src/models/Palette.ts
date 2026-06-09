import mongoose, {type InferSchemaType} from "mongoose";


const paletteSchema = new mongoose.Schema({
    id: {type: String, required: true, unique: true},
    name: {type: String, required: true},
    tags: [{type: String}]
}, {collection: "palettes"});

export default mongoose.model("Palette", paletteSchema);

export type paletteType = InferSchemaType<typeof paletteSchema>;