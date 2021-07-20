export interface PresenceAbsence {
    _id?: string,
    type: string,
    remoteOffice?: string,
    workingFrom?: string,
    workingTo?: string,
    onPauseFrom?: string,
    onPauseTo?: string,
    typeOfAbsence?: string,
    date: string,
    placeOfBusinessTrip?: string,
    user: string
}