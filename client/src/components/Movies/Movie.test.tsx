import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import Movie from "./Movie";
import { MovieType } from "./Movies";
import "@testing-library/jest-dom/extend-expect";

describe("Movie component", () => {
    afterAll(() => {
        jest.clearAllMocks();
    });

    const movie: MovieType = {
        title: "Test Movie",
        year: "2022",
        image: "http://test-image.com",
        imdbID: "test-id",
        movieName: "Test Movie Name",
    };

    it("renders movie details correctly", () => {
        const { getByText, getByAltText } = render(<Movie {...movie} />);
        expect(getByAltText(movie.title)).toBeInTheDocument();
        expect(getByText(movie.title)).toBeInTheDocument();
        expect(getByText(movie.year)).toBeInTheDocument();
    });
});
