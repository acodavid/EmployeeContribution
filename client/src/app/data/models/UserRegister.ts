export interface UserRegister {
    _id?: string,
    name: string,
    email: string,
    password: string,
    type: string,
    dateOfBirth: string,
    typeOfPosition: string,
    hiredDate: string,
    contractDuration: string,
    terminationDate: string,
    orgLevel: string,
    status: string,
    durationOfPreviousService: string,
    linkToPersonalFolder: string,
    firstLogin?: boolean,
    preferenceCreated?: boolean,
    statusForTable?: any
}