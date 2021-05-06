export interface Contact{
    name: string,
    email: string,
    contacted: boolean
    id?:number
}

export interface User {
    userName: string,
    name?: string,
    email: string,
    contactsId?: string[],
    token?: string
}