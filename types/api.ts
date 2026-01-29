import { IPagination } from "./pagination";

export interface IApiResponse<IData> {
    data: IData[] | [];
    message?: string;
    pagination: IPagination;
}