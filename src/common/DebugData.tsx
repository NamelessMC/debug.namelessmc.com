interface DebugData {
    generatedAt: number;
    generatedByName: string;
    generatedByUuid: string;
    namelessMc: {
        version: string;
        updateAvailable: boolean;
        updateChecked: number;
        settings: {
            phpMailer: boolean;
            apiEnabled: boolean;
            emailVerification: boolean;
            apiVerification: boolean;
            loginMethod: 'email' | 'username' | 'email_or_username';
            captchaType: string;
            captchaLogin: boolean;
            captchaContact: boolean;
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
                captcha: boolean;
            },
            allowedProxies: string[];
        },
        modules: Module[];
        templates: {
            frontEnd: Template[];
            panel: Template[];
        }
    },
    environment: {
        phpVersion: string;
        phpModules: string[];
        hostOs: string;
        hostKernelVersion: string;
        officialDockerImage: boolean;
        diskTotalSpace: number;
        diskFreeSpace: number;
        memoryTotalSpace: string;
        memoryFreeSpace: string;
        configWritable: boolean;
        cacheWritable: boolean;
    }
}

interface GroupSyncInjector {
    name: string;
    enabled: boolean;
    module: string;
    columnName: string;
}

interface Group {
    [id: number] : {
        id: number;
        name: string;
        groupHtml: string;
        adminCp: boolean;
        staff: boolean;
        permissions: string[];
        defaultGroup: boolean;
        order: number;
        forceTfa: boolean;
        deleted: boolean;
    }
}

interface Module {
    [name: string]: {
        name: string;
        enabled: boolean;
        author: string;
        moduleVersion: string;
        namelessMcVersion: string;
        debugInfo: any; // array?
    };
}

interface Template {
    [name: string]: {
        name: string;
        enabled: boolean;
        isDefault: boolean;
        author: string;
        templateVersion: string;
        namelessMcVersion: string;
    }
}

export default DebugData;
