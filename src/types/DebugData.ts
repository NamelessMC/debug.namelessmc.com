import {GroupSyncInjector} from "./GroupSyncInjector";
import {GroupSyncRule} from "./GroupSyncRule";
import {WebhookAction} from "./WebhookAction";
import {WebhookHook} from "./WebhookHook";
import {Group} from "./Group";
import {Integration} from "./Integration";
import {OAuthProvider} from "./OAuthProvider";
import {WebhookForumHook} from "./WebhookForumHook";
import {Template} from "./Template";
import {Module} from "./Module";
import {Log} from "./Log";

export interface DebugData {
    generated_at: number;
    generated_by_name: string;
    generated_by_uuid: string;
    namelessmc: {
        version: string;
        update_available: boolean;
        update_checked: number;
        settings: {
            phpmailer: boolean;
            api_enabled: boolean;
            email_verification: boolean;
            apiVerification: boolean;
            login_method: 'email' | 'username' | 'email_or_username';
            captcha_type: string;
            captcha_login: boolean;
            captchaContact: boolean;
            trustedProxies: string[];
            groupSync: {
                injectors: GroupSyncInjector[];
                rules: GroupSyncRule[];
            },
            webhooks: {
                actions: WebhookAction[];
                hooks: WebhookHook[];
                forumHooks: WebhookForumHook[];
            }
        },
        groups: Group[];
        config: {
            core: {
                path: string;
                friendly: boolean;
                forceHttps: boolean;
                forceWww: boolean;
            },
        },
        modules: Module[];
        templates: {
            frontEnd: Template[];
            panel: Template[];
        },
        integrations: Integration[];
        oauthProviders: OAuthProvider[];
    },
    logs: Log[];
    environment: {
        php_version: string;
        phpModules: string[];
        host_os: string;
        host_kernel_version: string;
        official_docker_image: boolean;
        disk_total_space: number;
        disk_free_space: number;
        memory_total_space: string;
        memory_used_space: number;
        config_writable: boolean;
        cache_writable: boolean;
    },
}
