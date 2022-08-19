export interface Group {
    [id: number] : {
        id: number;
        name: string;
        groupHtml: string;
        adminCp: boolean;
        staff: boolean;
        permissions: Record<string, boolean>;
        defaultGroup: boolean;
        order: number;
        forceTfa: boolean;
        deleted: boolean;
    }
}
