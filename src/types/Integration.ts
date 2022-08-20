export interface Integration {
    id: number;
    name: string;
    enabled: boolean;
    canUnlink: boolean;
    required: boolean;
    order: number;
}
