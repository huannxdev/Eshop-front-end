
import { OrderDetailModel } from "../models/OrderDetail";
import { AddressModel } from "../models/Address";

export class OrdersModel{
    Id: string;
    IdBill:string;
    Email: string;
    UserId: string;
    OrderDetails: Array<OrderDetailModel>;
    Address: Array<AddressModel>;
    Total: number;
    Status: number;
    constructor(){
        
    }
}