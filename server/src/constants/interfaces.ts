interface IBuildResponseBase {
    res: any;
    statusCode: number;
}

export interface IBuildResponseSuccess extends IBuildResponseBase {
    data: any;
}

export interface IBuildResponseError extends IBuildResponseBase {
    error: any;
}
