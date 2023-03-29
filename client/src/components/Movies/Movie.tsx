import { MovieType } from "./Movies";
import Grid2 from "@mui/material/Unstable_Grid2";
import {
    CardContent,
    CardMedia,
    Typography,
    useMediaQuery,
} from "@mui/material";

const Movie = ({ title, year, image }: MovieType) => {
    const isMobile = useMediaQuery("(max-width:1024px)");
    return (
        <Grid2 xs={isMobile ? 12 : 2} md={4}>
            <CardMedia component="img" alt={title} height="640" image={image} />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {year}
                </Typography>
            </CardContent>
        </Grid2>
    );
};

export default Movie;
