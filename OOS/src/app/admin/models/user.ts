export enum GenderType {
    Male = 1,
    Female = 2
}

export class UserModel{
    Id:string
    UserName: string;
    Password:string;
    PasswordConfirm: string;
    FirstName:string;
    MiddleName:String;
    LastName:string;
    Image:string;
    Gender:number;
    Email:string;
    Photo:string;
    PhoneNumber:string;
    Country:string;
    DateOfBirth:string
    constructor(){}
}