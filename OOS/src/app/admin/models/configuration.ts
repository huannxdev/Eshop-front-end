export enum Currency {
    VND = 1,
    USD
}

export class ConfigurationModel{
    Id: string="1";
    Carousel:string[];
    Currency: number;
    ShippingReturnHtml: string;
    ShippingGuideHtml: string;
    FaqHtml: string;
    constructor(){}
}