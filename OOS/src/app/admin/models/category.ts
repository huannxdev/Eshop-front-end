export enum CategoryStatus {
    Publish = 1,
    Unpublish
}

export class CategoryModel{
    Id: string;
    Name: string;
    Description: string;
    Status: number;

    constructor(){}
}