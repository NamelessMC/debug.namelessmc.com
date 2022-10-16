export interface Group {
    id: number
    name: string
    group_html: string
    admin_cp: boolean
    staff: boolean
    permissions: Record<string, boolean>
    default_group: boolean
    order: number
    force_tfa: boolean
    deleted: boolean
}
