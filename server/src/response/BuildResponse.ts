import {
    IBuildResponseError,
    IBuildResponseSuccess,
} from "../constants/interfaces";

export default class BuildResponse {
    buildSuccess = ({ res, statusCode, data }: IBuildResponseSuccess) => {
        return res.status(statusCode).json({ data });
    };

    buildError = ({ res, statusCode, error }: IBuildResponseError) => {
        console.log("Something went wrong!", error);
        return res.status(statusCode).json({ error });
    };
}
