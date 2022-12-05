export interface ISystemUser {
    uuid?: string,
    firstname: string,
    lastname: string,
    email: string,
    phone_number: number
}


export interface ISystemUserQuery {
    uuid?: string,
    firstname?: string,
    lastname?: string,
    email?: string,
    phone_number?: number
}