import { ISystemUser, ISystemUserQuery } from "./System_User";

export interface IMember extends ISystemUser {
    username: string,
    password: string,
    membership_type: string,
    warning_count?: number, 
    follower_count?: number,
    token?: string,
}


export interface IMemberQuery extends ISystemUserQuery {
    username?: string,
    membership_type?: string,
    warning_count?: number,
    follower_count?: number,
}