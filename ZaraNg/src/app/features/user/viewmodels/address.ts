export interface Address{
    name:string
    surname:string
    street:string
    moreInfo:string
    city:string
    governorate:string
    phonePrefix:string
    phoneNumber:string
    region:string,
    [key: string]: string;
}