import { ProductTail } from "../../admin/models/ProductTail";

export class ProductModel{
    Id: string;
    Code: string;
    Name: string;
    Description : string;
    Details:string;
    IdCategory: string;
    Status: number;  
    CategoryName:string;
    ProductTails:ProductTail[];
    MinPrice:number;
    MaxPrice:number;
    TotalQuantity:number;
    DefaultImage:string;
    Discount : number;
    IsLove = false;
    constructor () {}

}