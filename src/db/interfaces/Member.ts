import { ISystemUser, ISystemUserQuery } from "./System_User";

export interface IMember extends ISystemUser {
    username: string,
    pass: string,
    membership_type: string,
    warning_count?: number, 
    follower_count?: number,
    token?: string,
}


export interface IMemberQuery extends ISystemUserQuery {
    username?: string,
    pass?: string,
    membership_type?: string,
    warning_count?: number,
    follower_count?: number,
    token?: string
}