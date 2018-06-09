export enum AddressType {
    ShippingAddress = 0,
    BillingAddress = 1
}

export class AddressModel{
    Name: string;
    Phone: string;
    Street: string;
    District: string;
    Province: string;
    Type: number;

    constructor(){}
}