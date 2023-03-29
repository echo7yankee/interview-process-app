import { createSlice } from "@reduxjs/toolkit";
import { fetchMovies } from "../actions/movies";

interface InitialStateInterface {
    movies: [];
    isLoading: boolean;
}

const initialState: InitialStateInterface = {
    movies: [],
    isLoading: false,
};

const moviesSlice = createSlice({
    name: "movies",
    initialState,
    reducers: {},
    extraReducers: {
        [fetchMovies.pending]: (state) => {
            state.isLoading = true;
        },
        [fetchMovies.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.movies = action.payload;
        },
        [fetchMovies.rejected]: (state) => {
            state.isLoading = false;
        },
    },
});

export default moviesSlice.reducer;
