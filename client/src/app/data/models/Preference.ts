export interface Preference {
    _id?: string,
    user?: string,
    remoteOrOffice: string,
    workingFrom: string,
    workingTo: string,
    onPauseFrom: string,
    onPauseTo: string
}