export interface OAuthProvider {
    [name: string]: {
        providerName: string;
        module: string;
        class: string;
        userIdName: string;
        scopeIdName: string;
        enabled: boolean;
        clientId: string;
    }
}
