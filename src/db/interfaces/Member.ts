export interface IMember {
    uuid: string,
    username: string,
    email: string,
    password: string,
    membership_type: string,
    warning_count?: number, 
    follower_count?: number,
    token?: string,
}


export interface IMemberQuery {
    username?: string,
    email?: string,
    membership_type?: string,
    warning_count?: number,
    follower_count?: number,
}