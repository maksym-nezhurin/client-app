export interface IApiResponse<IData> {
    data: IData[] | [];
    message?: string;
    pagination: {
        page: number;
        limit: number;
        total: number;
        pages: number;
    };
}