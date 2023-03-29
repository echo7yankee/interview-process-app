import mongoose from "mongoose";

const MovieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    year: {
        type: String,
        required: true,
    },
    imdbID: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    movieName: {
        type: String,
        required: true,
    },
});

MovieSchema.virtual("id").get(function () {
    return this._id.toHexString();
});

// Ensure virtual fields are serialised.
MovieSchema.set("toJSON", {
    virtuals: true,
});

const MovieModel = mongoose.model("Movie", MovieSchema);
export { MovieModel };
