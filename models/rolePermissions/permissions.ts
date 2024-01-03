export interface permissions {
    route: string
    can_write: boolean
    can_read: boolean
    role_id: number

    [x: string]: string|Date|number|boolean;
}
