import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

import MovieReducer from "./slices/movies";

const store = configureStore({
    reducer: {
        movie: MovieReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export default store;
