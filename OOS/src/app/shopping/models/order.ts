import { OrderDetailModel } from "./OrderDetail";
import { AddressModel } from "./address";

export enum OrderStatus {
    Confirming,
    Confirmed,
    Shipping,
    Shipped
}
export class OrdersModel{
    Id: string;
    IdBill:string;
    Email: string;
    UserId: string;
    OrderDetails: Array<OrderDetailModel>;
    Address: Array<AddressModel>;
    Total: number;
    Status: number;
    
    constructor(){}
}