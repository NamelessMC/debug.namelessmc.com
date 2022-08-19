export interface WebhookHook {
    [id: number]: {
        id: number;
        name: string;
        action: number;
        events: string[];
    }
}
