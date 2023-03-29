import BuildResponse from "../response/BuildResponse";
import { MovieModel } from "../models/Movie";
import { Response, Request } from "express";
import axios from "axios";
import {
    IBuildResponseError,
    IBuildResponseSuccess,
} from "../constants/interfaces";

type movieResponseType = {
    Title: string;
    Year: string;
    imdbID: string;
    Type: string;
    Poster: string;
};

interface IMovie {
    getMovies: (req: Request, res: Response) => Promise<any>;
}

export default class Movie extends BuildResponse implements IMovie {
    getMovies = async (req: Request, res: Response): Promise<void> => {
        const uri = "http://www.omdbapi.com/";
        const apiKey = "720c3666 ";
        const search = req.query.search;
        try {
            const moviesFromDB = await MovieModel.find({ movieName: search });
            // Don't call the API again if they are already in DB
            if (moviesFromDB.length) {
                this.buildSuccess({
                    res,
                    statusCode: 201,
                    data: moviesFromDB,
                });
                return;
            }

            const response = await axios.get(
                `${uri}?apikey=${apiKey}&s=${search}`
            );

            if (
                !response.data &&
                !response.data.length &&
                !response.data.Response
            ) {
                this.buildError({
                    res,
                    statusCode: 403,
                    error: "Something went wrong!",
                });
                return;
            }

            const formattedMovieFromRes: movieResponseType[] =
                response.data.Search.map(
                    ({
                        Title,
                        Year,
                        imdbID,
                        Type,
                        Poster,
                    }: movieResponseType) => ({
                        title: Title,
                        year: Year,
                        imdbID,
                        type: Type,
                        image: Poster,
                        movieName: search,
                    })
                );

            await MovieModel.insertMany(formattedMovieFromRes);

            this.buildSuccess({
                res,
                statusCode: 201,
                data: formattedMovieFromRes,
            });
        } catch (error) {
            this.buildError({
                res,
                statusCode: 500,
                error: `Something went wrong with Movie requests! See: ${error}`,
            });
        }
    };
}
