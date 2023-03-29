import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { GET_MOVIES } from "../types";

export const fetchMovies: any = createAsyncThunk(
    GET_MOVIES,
    async (search: string) => {
        if (!search) {
            return [];
        }

        try {
            const response = await axios.get("/movie", {
                params: {
                    search,
                },
            });

            if (!response.data) {
                throw new Error("Movies not fetched");
            }

            const {
                data: { data },
            } = response;

            return data;
        } catch (error) {
            console.log("Error", error);
        }
    }
);
