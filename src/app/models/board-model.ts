export interface BoardModel {
    license_key: string,
    owner_email: string,
    device_nickname: string
    device_type: string,
    device_setup: SetupModel[]
}

export interface SetupModel {
    TYPE?: string,
    PIN?: number,
    CODE?: string,
    VALUE?: number | Boolean,
    VALUE_TYPE: string,
    NAME?: string,
    _id: string
}