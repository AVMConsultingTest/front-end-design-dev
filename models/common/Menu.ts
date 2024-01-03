export interface Menu {
    icon: string,
    variant: string,
    name: string,
    link: string,
    submenu: Menu[],
}
