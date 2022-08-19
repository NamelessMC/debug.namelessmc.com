export interface Integration {
    [name: string]: {
        id: number;
        name: string;
        enabled: boolean;
        canUnlink: boolean;
        required: boolean;
        order: number;
    }
}
