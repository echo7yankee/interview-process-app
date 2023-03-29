import { CircularProgress } from "@mui/material";
import { SpinnerWrapper } from "./Spinner.styled";

const Spinner = () => (
    <SpinnerWrapper data-testid="spinner">
        <CircularProgress color="primary" size={50} />
    </SpinnerWrapper>
);

export default Spinner;
