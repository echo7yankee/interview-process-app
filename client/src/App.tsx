import { useState } from "react";
import Movies from "./components/Movies/Movies";
import Container from "@mui/material/Container";
import Button from "./components/Button/Button";
import { ButtonsWrapper } from "./App.styled";

const movieButtons: string[] = [
    "Matrix",
    "Matrix Reloaded",
    "Matrix Revolutions",
];

const App = () => {
    const [search, setSearch] = useState<string>("");

    const onSearchMoviesHandler = (movie: string) => {
        setSearch(movie);
    };

    return (
        <Container maxWidth="xl">
            <ButtonsWrapper>
                {movieButtons.map((movie: string) => (
                    <Button
                        key={movie}
                        label={movie}
                        onClick={() => onSearchMoviesHandler(movie)}
                    />
                ))}
            </ButtonsWrapper>
            <Movies search={search} />
        </Container>
    );
};

export default App;
