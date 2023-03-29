import { FormControl, useMediaQuery, MenuItem, Select } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import { SetStateAction, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchMovies } from "../../store/actions/movies";
import Spinner from "../Spinner/Spinner";
import Movie from "./Movie";

export type MovieType = {
    title: string;
    imdbID: string;
    year: string;
    image: string;
    movieName: string;
};

type MoviesCType = {
    search: string;
};

const Movies = ({ search }: MoviesCType) => {
    const isMobile = useMediaQuery("(max-width:1024px)");
    const [sortOrder, setSortOrder] = useState("Ascending");
    const { movies, isLoading } = useSelector((state: any) => state.movie);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchMovies(search));
    }, [dispatch, search]);

    if (isLoading) return <Spinner />;

    const handleSortOrderChange = (event: {
        target: { value: SetStateAction<string> };
    }) => {
        setSortOrder(event.target.value);
    };

    const sortMovies = () => {
        if (sortOrder === "Ascending") {
            return [...movies].sort(
                (a: MovieType, b: MovieType) => Number(a.year) - Number(b.year)
            );
        }
        return [...movies].sort(
            (a: MovieType, b: MovieType) => Number(b.year) - Number(a.year)
        );
    };

    return (
        <>
            <FormControl data-testid="form-control">
                <Select value={sortOrder} onChange={handleSortOrderChange}>
                    {["Ascending", "Descending"].map((item) => (
                        <MenuItem key={item} value={item}>
                            {item}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <Grid2
                data-testid="movies-container"
                container
                spacing={6}
                mt={5}
                direction={isMobile ? "column" : "row"}
            >
                {sortMovies().map((movie: MovieType) => (
                    <Movie key={movie.imdbID} {...movie} />
                ))}
            </Grid2>
        </>
    );
};

export default Movies;
