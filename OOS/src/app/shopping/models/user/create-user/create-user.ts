export enum GenderType {
    Unknown = 1,
    Female = 2,
    Male = 3
}

export class CreateUserModel{
    Id:string
    Password:string;
    ConfirmPassword: string;
    FirstName:string;
    MiddleName:String;
    LastName:string;
    Image:string;
    Gender:number;
    Email:string;
    Token:string;
    constructor(){}
}