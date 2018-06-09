// export enum FeedbackStatus {
//     Publish = 1,
//     Unpublish
// }

export class FeedbackModel{
    Id: string;
    ToEmail: string;
    Status: boolean;
    Content : string;
    Subject : string;
    constructor(){}
}