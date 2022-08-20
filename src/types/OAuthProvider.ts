export interface OAuthProvider {
    [name: string]: {
        provider_name: string;
        module: string;
        class: string;
        user_id_scope: string;
        scope_id_name: string;
        enabled: boolean;
        clientId: string;
    }
}
