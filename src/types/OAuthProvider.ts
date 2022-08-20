export interface OAuthProvider {
    provider_name: string;
    module: string;
    class: string;
    user_id_name: string;
    scope_id_name: string;
    enabled: boolean;
    client_id: string;
}
