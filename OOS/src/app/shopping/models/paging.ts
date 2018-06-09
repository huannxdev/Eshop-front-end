export class PagingModel{
    items: Array<Object>;
    totalItemCount: number;
    page: number;
    pageSize: number;
    pageCount: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
    startItemIndex: number;
    endItemIndex: number;
}