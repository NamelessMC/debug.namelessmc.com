import type { GroupSyncInjector } from './GroupSyncInjector';
import type { GroupSyncRule } from './GroupSyncRule';
// import { WebhookAction } from './WebhookAction';
import type { WebhookHook } from './WebhookHook';
import type { Group } from './Group';
import type { Integration } from './Integration';
import type { OAuthProvider } from './OAuthProvider';
import type { WebhookForumHook } from './WebhookForumHook';
import type { Template } from './Template';
import type { Module } from './Module';

export interface DebugData {
    generated_at: number
    generated_by_name: string
    generated_by_uuid: string
    namelessmc: {
        version: string
        update_available: boolean
        update_checked: number
        settings: {
            phpmailer: boolean
            api_enabled: boolean
            email_verification: boolean
            api_verification: boolean
            login_method: 'email' | 'username' | 'email_or_username'
            captcha_type: string
            captcha_login: boolean
            captcha_contact: boolean
            trusted_proxies: string[]
            group_sync: {
                injectors: GroupSyncInjector[]
                rules: GroupSyncRule[]
            }
            webhooks: {
                actions: Record<number, string>
                hooks: WebhookHook[]
                forum_hooks: WebhookForumHook[]
            }
        }
        groups: Group[]
        config: {
            core: {
                path: string
                friendly: boolean
                force_https: boolean
                force_www: boolean
            }
        }
        modules: Module[]
        templates: {
            front_end: Template[]
            panel: Template[]
        }
        integrations: Integration[]
        oauth_providers: OAuthProvider[]
    }
    logs: Record<string, string>
    environment: {
        php_version: string
        php_modules: string[]
        host_os: string
        host_kernel_version: string
        official_docker_image: boolean
        disk_total_space: number
        disk_free_space: number
        memory_total_space: string
        memory_used_space: number
        config_writable: boolean
        cache_writable: boolean
    }
}
