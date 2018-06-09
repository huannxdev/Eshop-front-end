import { ProductTail } from "./ProductTail";

 export enum ProductStatus {
     Publish = 1,
     Unpublish
 }

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
    constructor () {}
    BasicImage:string;
    Discount : number;

}

