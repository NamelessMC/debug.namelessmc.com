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
    generatedAt: number;
    generated_by_name: string;
    generated_by_uuid: string;
    namelessmc: {
        version: string;
        update_available: boolean;
        update_checked: number;
        settings: {
            phpMailer: boolean;
            apiEnabled: boolean;
            emailVerification: boolean;
            apiVerification: boolean;
            loginMethod: 'email' | 'username' | 'email_or_username';
            captchaType: string;
            captchaLogin: boolean;
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
        phpVersion: string;
        phpModules: string[];
        hostOs: string;
        hostKernelVersion: string;
        officialDockerImage: boolean;
        diskTotalSpace: number;
        diskFreeSpace: number;
        memoryTotalSpace: string;
        memoryUsedSpace: number;
        configWritable: boolean;
        cacheWritable: boolean;
    },
}
