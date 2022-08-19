export interface Module {
    [name: string]: {
        name: string;
        enabled: boolean;
        author: string;
        moduleVersion: string;
        namelessMcVersion: string;
        debugInfo: any; // array?
    };
}
