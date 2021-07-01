export interface IUser {
    email: string,
    email_verified: boolean,
    roles: string[],
    tenant: string,
    name: string,
    nickname: string,
    picture: string,
    sub: string,
    updated_at: string
}