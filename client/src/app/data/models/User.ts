export interface User {
    id?: string,
    email: string,
    password?: string,
    isAdmin: boolean,
    firstLogin?: boolean
}