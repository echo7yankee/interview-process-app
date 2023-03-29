import "@testing-library/jest-dom";
import { Store, AnyAction } from "@reduxjs/toolkit";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import Movies from "./Movies";
import "@testing-library/jest-dom/extend-expect";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe("Movies component", () => {
    let store: Store<unknown, AnyAction>;

    beforeEach(() => {
        store = mockStore({
            movie: {
                movies: [
                    {
                        title: "The Shawshank Redemption",
                        imdbID: "tt0111161",
                        year: "1994",
                        image: "https://www.example.com/shawshank_redemption.jpg",
                        movieName: "The Shawshank Redemption",
                    },
                    {
                        title: "The Godfather",
                        imdbID: "tt0068646",
                        year: "1972",
                        image: "https://www.example.com/godfather.jpg",
                        movieName: "The Godfather",
                    },
                    {
                        title: "The Dark Knight",
                        imdbID: "tt0468569",
                        year: "2008",
                        image: "https://www.example.com/dark_knight.jpg",
                        movieName: "The Dark Knight",
                    },
                ],
                isLoading: false,
            },
        });
    });

    afterAll(() => {
        jest.clearAllMocks();
    });

    it("should render the movies in ascending order by default", () => {
        render(
            <Provider store={store}>
                <Movies search="" />
            </Provider>
        );

        const firstMovieTitle = screen.getByText("The Godfather");
        const secondMovieTitle = screen.getByText("The Shawshank Redemption");
        const thirdMovieTitle = screen.getByText("The Dark Knight");

        expect(firstMovieTitle).toBeInTheDocument();
        expect(secondMovieTitle).toBeInTheDocument();
        expect(thirdMovieTitle).toBeInTheDocument();
        expect(firstMovieTitle.nextElementSibling?.textContent).toBe("1972");
        expect(secondMovieTitle.nextElementSibling?.textContent).toBe("1994");
    });

    it("should render the movies in descending order when the select value is set to 'Descending'", () => {
        render(
            <Provider store={store}>
                <Movies search="" />
            </Provider>
        );

        const selectElement: any = screen.getByTestId("form-control");

        selectElement.value = "Descending";
        selectElement.dispatchEvent(new Event("change"));

        const firstMovieTitle = screen.getByText("The Dark Knight");
        const secondMovieTitle = screen.getByText("The Shawshank Redemption");
        const thirdMovieTitle = screen.getByText("The Godfather");

        expect(firstMovieTitle).toBeInTheDocument();
        expect(secondMovieTitle).toBeInTheDocument();
        expect(thirdMovieTitle).toBeInTheDocument();
        expect(firstMovieTitle.nextElementSibling?.textContent).toBe("2008");
        expect(secondMovieTitle.nextElementSibling?.textContent).toBe("1994");
    });

    it("should render a spinner when the movies are loading", () => {
        store = mockStore({
            movie: {
                movies: [],
                isLoading: true,
            },
        });

        render(
            <Provider store={store}>
                <Movies search="" />
            </Provider>
        );

        const spinnerElement = screen.getByTestId("spinner");

        expect(spinnerElement).toBeInTheDocument();
    });
});
