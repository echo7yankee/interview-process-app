import express from "express";
import Movie from "../controllers/Movie";
const movieRouter = express.Router();
const { getMovies } = new Movie();

movieRouter.get("/", getMovies);

export { movieRouter };
