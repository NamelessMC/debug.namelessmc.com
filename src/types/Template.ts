export interface Template {
    [name: string]: {
        name: string;
        enabled: boolean;
        isDefault: boolean;
        author: string;
        templateVersion: string;
        namelessMcVersion: string;
    }
}
