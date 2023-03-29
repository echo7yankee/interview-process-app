import BuildResponse from "./BuildResponse";

describe("BuildResponse", () => {
    const buildResponse = new BuildResponse();
    const resMock = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
    };

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe("buildSuccess", () => {
        it("should return success response", () => {
            const data = { id: 1, name: "Test" };
            const expectedResponse = { data };
            const statusCode = 200;
            buildResponse.buildSuccess({ res: resMock, statusCode, data });
            expect(resMock.status).toHaveBeenCalledWith(statusCode);
            expect(resMock.json).toHaveBeenCalledWith(expectedResponse);
        });
    });

    describe("buildError", () => {
        it("should return error response", () => {
            const error = new Error("Something went wrong");
            const expectedResponse = { error };
            const statusCode = 500;
            buildResponse.buildError({ res: resMock, statusCode, error });
            expect(resMock.status).toHaveBeenCalledWith(statusCode);
            expect(resMock.json).toHaveBeenCalledWith(expectedResponse);
        });
    });
});
