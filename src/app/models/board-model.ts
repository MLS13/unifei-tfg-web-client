export interface BoardModel {
    license_key: string,
    owner_email: string,
    device_nickname: string
    device_type: string,
    device_setup: SetupModel[]
}

export interface SetupModel {
    IO_TYPE: string,
    PIN: number,
    CODE: string,
    VALUE: number,
    VALUE_TYPE: string,
    NAME: string,
    _id: string
}