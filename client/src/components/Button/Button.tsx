import Button from "@mui/material/Button";

type ButtonType = {
    label: string;
    onClick: () => void;
};

const ButtonComponent = ({ label, onClick }: ButtonType) => (
    <Button variant="outlined" onClick={onClick}>
        {label}
    </Button>
);

export default ButtonComponent;
