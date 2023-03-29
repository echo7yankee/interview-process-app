import "@testing-library/jest-dom";
import { render, fireEvent } from "@testing-library/react";
import ButtonComponent from "./Button";
import "@testing-library/jest-dom/extend-expect";

describe("ButtonComponent", () => {
    const onClick = jest.fn();
    const label = "Test Button";

    afterAll(() => {
        jest.clearAllMocks();
    });

    it("should render the button with the correct label", () => {
        const { getByText } = render(
            <ButtonComponent label={label} onClick={onClick} />
        );
        expect(getByText(label)).toBeInTheDocument();
    });

    it("should call the onClick function when the button is clicked", () => {
        const { getByRole } = render(
            <ButtonComponent label={label} onClick={onClick} />
        );
        fireEvent.click(getByRole("button"));
        expect(onClick).toHaveBeenCalledTimes(1);
    });

    it("should render the Button from MUI", () => {
        const { container } = render(
            <ButtonComponent label={label} onClick={onClick} />
        );
        expect(container.querySelector("button")).toHaveClass(
            "MuiButtonBase-root MuiButton-root MuiButton-outlined"
        );
    });
});
