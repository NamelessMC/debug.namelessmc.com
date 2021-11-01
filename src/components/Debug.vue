<template>
    <div class="bg-gray-200 dark:bg-gray-900 h-full" v-bind:class="{ 'h-screen': !loaded }">

        <div class="py-9 bg-yellow-400 dark:bg-indigo-900 shadow-lg">
            <div class="container mx-auto flex">
                <img :src="`${publicPath}logo.png`" alt="NamelessMC logo" class="h-20 mr-4">
                <h1 class="font-bold text-4xl text-gray-50">
                      {{ $t('misc.header_title') }}
                    <h3 v-if="loaded" class="text-2xl font-bold mb-3">{{ $t('misc.generated_at', { time: formatDate(data.generated_at) }) }}</h3>
                </h1>
            </div>
        </div>

        <div class="container mx-auto pt-8">

            <div v-if="!loaded && !error">
                <div class="m-auto rounded-lg shadow-lg md:w-1/4 p-4 bg-gray-300 dark:bg-gray-500 mb-2 font-bold text-white">
                    {{ $t('misc.loading') }} <span class="float-right"><font-awesome-icon icon="spinner" spin size="lg"/></span>
                </div>
            </div>

            <div v-if="error">
                <div class="m-auto rounded-lg bg-red-400 shadow-lg w-1/3">
                    <div class="p-4 h-full bg-red-300 mb-2 rounded-t-lg font-bold text-white">
                        {{ $t('errors.error') }}
                    </div>
                    <div class="pt-2 pb-4 mb-8 pl-4 text-white" v-html="error"></div>
                </div>
            </div>

            <!-- NamelessMC version section -->
            <div v-if="loaded" class="section-background">
                <div class="section-title">
                    <font-awesome-icon icon="download"/> {{ $t('version_section.version') }}
                </div>
                <div class="section-content grid-cols-3">
                    <div>
                        <h5 class="section-heading">{{ $t('version_section.version') }}</h5>
                        <h2 v-html="asCode(data.namelessmc.version)"></h2>
                    </div>
                    <div>
                        <h5 class="section-heading">{{ $t('version_section.update_available') }}</h5>
                        <h5 v-html="booleanBadge(data.namelessmc.update_available)"></h5>
                    </div>
                    <div>
                        <h5 class="section-heading">{{ $t('version_section.last_update_check') }}</h5>
                        <h2 class="text-normal">{{ formatDate(data.namelessmc.update_checked) }}</h2>
                    </div>
                </div>
            </div>

            <!-- NamelessMC settings section -->
            <div v-if="loaded" class="section-background">
                <div class="section-title">
                    <font-awesome-icon icon="cogs"/> {{ $t('settings_section.settings') }}
                </div>
                <div class="section-content grid-cols-4 gap-8">
                    <div>
                        <h5 class="section-heading">{{ $t('settings_section.phpmailer_enabled') }}</h5>
                        <h2 v-html="booleanBadge(data.namelessmc.settings.phpmailer)"></h2>
                    </div>
                    <div>
                        <h5 class="section-heading">{{ $t('settings_section.api_enabled') }}</h5>
                        <h2 v-html="booleanBadge(data.namelessmc.settings.api_enabled)"></h2>
                    </div>
                    <div>
                        <h5 class="section-heading">{{ $t('settings_section.api_verification_enabled') }}</h5>
                        <h2 v-html="booleanBadge(data.namelessmc.settings.api_verification)"></h2>
                    </div>
                    <div>
                        <h5 class="section-heading">{{ $t('settings_section.email_verification_enabled') }}</h5>
                        <h2 v-html="booleanBadge(data.namelessmc.settings.email_verification)"></h2>
                    </div>

                    <div>
                        <h5 class="section-heading">{{ $t('settings_section.login_method') }}</h5>
                        <h2 class="text-normal">{{ capitalize(data.namelessmc.settings.login_method) }}</h2>
                    </div>
                    <div>
                        <h5 class="section-heading">{{ $t('settings_section.captcha_type') }}</h5>
                        <h2 class="text-normal">{{ data.namelessmc.settings.captcha_type }}</h2>
                    </div>
                    <div>
                        <h5 class="section-heading">{{ $t('settings_section.captcha_login_page') }}</h5>
                        <h2 v-html="booleanBadge(data.namelessmc.settings.captcha_login)"></h2>
                    </div>
                    <div>
                        <h5 class="section-heading">{{ $t('settings_section.captcha_contact_page') }}</h5>
                        <h2 v-html="booleanBadge(data.namelessmc.settings.captcha_contact)"></h2>
                    </div>
                </div>
            </div>

            <!-- NamelessMC config section -->
            <div v-if="loaded" class="section-background">
                <div class="section-title">
                    <font-awesome-icon icon="wrench"/> {{ $t('config_section.config') }}
                </div>
                <div class="section-content grid-cols-5">
                    <div>
                        <h5 class="section-heading">{{ $t('config_section.path') }}</h5>
                        <h2 v-html="isEmpty(data.namelessmc.config.path, true)"></h2>
                    </div>
                    <div>
                        <h5 class="section-heading">{{ $t('config_section.friendly_urls') }}</h5>
                        <h2 v-html="booleanBadge(data.namelessmc.config.friendly)"></h2>
                    </div>
                    <div>
                        <h5 class="section-heading">{{ $t('config_section.force_https') }}</h5>
                        <h2 v-html="booleanBadge(data.namelessmc.config.force_https)"></h2>
                    </div>
                    <div>
                        <h5 class="section-heading">{{ $t('config_section.force_www') }}</h5>
                        <h2 v-html="booleanBadge(data.namelessmc.config.force_www)"></h2>
                    </div>
                    <div>
                        <h5 class="section-heading">{{ $t('config_section.allowed_proxies') }}</h5>
                        <h2 v-html="isEmpty(data.namelessmc.config.allowed_proxies, true)"></h2>
                    </div>
                </div>
            </div>

            <!-- NamelessMC modules section -->
            <div v-if="loaded">
                <div class="section-title-floating">
                    <font-awesome-icon icon="puzzle-piece"/> {{ $t('modules_section.modules') }}
                </div>
                <div class="pt-2 mb-8 grid gap-8 sm:grid-cols-1" :class="gridColsClass(data.namelessmc.modules)">
                    <div v-for="module in data.namelessmc.modules" :key="module.name">
                        <div class="section-content-floating">
                            <div>
                                <h3 class="section-subheading">
                                    {{ module.name }} <span v-if="isOfficialModule(module.name)" v-html="officialBadge()"></span>
                                </h3>
        
                                <h5 class="section-heading">
                                    {{ $t('modules_section.enabled') }}: <span v-html="booleanBadge(module.enabled)"></span>
                                </h5>

                                <h5 class="section-heading">
                                    {{ $t('modules_section.author') }}: <span class="font-normal text-base" v-html="module.author"></span>
                                </h5>

                                <h5 class="section-heading">
                                    {{ $t('modules_section.namelessmc_version') }}: <span v-html="asCode(module.namelessmc_version)"></span>
                                </h5>

                                <h5 class="section-heading">
                                    {{ $t('modules_section.version') }}: <span v-html="asCode(module.module_version)"></span>
                                </h5>
                            </div>

                            <div class="w-full text-center border-b-2 border-blue-400" style="height: 14px;">
                                <span class="bg-gray-100 dark:bg-gray-800 dark:text-gray-300 text-base">&nbsp;{{ $t('modules_section.debug_info') }}&nbsp;</span>
                            </div>

                            <div class="pt-3">
                                <div v-if="module.name == 'Core'">
                                    <h5 class="section-heading pb-1 text-center">{{ $t('modules_section.core.minecraft_integration') }}</h5>

                                    <div class="grid grid-cols-2">
                                        <h5 class="section-heading">
                                            {{ $t('modules_section.core.integration_enabled') }}: <span v-html="booleanBadge(module.debug_info.minecraft.mc_integration)"></span>
                                        </h5>
                                        <h5 class="section-heading">
                                            {{ $t('modules_section.core.uuid_linking') }}: <span v-html="booleanBadge(module.debug_info.minecraft.uuid_linking)"></span>
                                        </h5>
                                        <h5 class="section-heading">
                                            {{ $t('modules_section.core.username_sync') }}: <span v-html="booleanBadge(module.debug_info.minecraft.username_sync)"></span>
                                        </h5>
                                        <h5 class="section-heading">
                                            {{ $t('modules_section.core.external_query') }}: <span v-html="booleanBadge(module.debug_info.minecraft.external_query)"></span>
                                        </h5>
                                    </div>

                                    <h5 class="section-heading pb-1 text-center pt-1">{{ $t('modules_section.core.servers') }}</h5>
                                    <div v-for="server in module.debug_info.minecraft.servers" :key="server.id" class="divide-y-2 divide-blue-400">
                                        <div>
                                            <div class="grid grid-cols-2 pb-1">
                                                <h5 class="section-heading">
                                                    {{ $t('modules_section.core.id') }}: <span v-html="asCode(server.id)"></span>
                                                </h5>
                                                <h5 class="section-heading">
                                                    {{ $t('modules_section.core.name') }}: <span class="font-normal text-base">{{ server.name }}</span>
                                                </h5>
                                            </div>
                                            <div class="grid grid-cols-2 pb-1">
                                                <h5 class="section-heading">
                                                    {{ $t('modules_section.core.ip') }}: <span v-html="asCode(server.ip)"></span>
                                                </h5>
                                                <h5 class="section-heading">
                                                    {{ $t('modules_section.core.query_ip') }}: <span v-html="asCode(server.query_ip)"></span>
                                                </h5>
                                            </div>
                                            <div class="grid grid-cols-2">
                                                <h5 class="section-heading">
                                                    {{ $t('modules_section.core.port') }}: <span v-html="asCode(server.port)"></span>
                                                </h5>
                                                <h5 class="section-heading">
                                                    {{ $t('modules_section.core.query_port') }}: <span v-html="asCode(server.query_port)"></span>
                                                </h5>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                <div v-else-if="module.name == 'Discord Integration'">
                                    <div class="grid grid-cols-2">
                                        <h5 class="section-heading">
                                            {{ $t('modules_section.discord_integration.syncing_enabled') }}: <span v-html="booleanBadge(module.enabled && module.debug_info.guild_id && module.debug_info.bot_url)"></span>
                                        </h5>
                                        <h5 class="section-heading">
                                            {{ $t('modules_section.discord_integration.guild_id') }}: <span v-html="isEmpty(module.debug_info.guild_id)"></span>
                                        </h5>
                                        <h5 class="section-heading">
                                            {{ $t('modules_section.discord_integration.bot_setup') }}: <span v-html="booleanBadge(module.debug_info.bot_setup)"></span>
                                        </h5>
                                        <h5 class="section-heading">
                                            {{ $t('modules_section.discord_integration.bot_url') }}: <span v-html="isEmpty(module.debug_info.bot_url)"></span>
                                        </h5>
                                        <!-- TODO: roles -->
                                    </div>
                                </div>
                                <div v-else>
                                    <pre class="dark:text-gray-200">{{ module.debug_info }}</pre>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- NamelessMC front end templates section -->
            <div v-if="loaded">
                <div class="section-title-floating">
                    <font-awesome-icon icon="paint-brush"/> {{ $t('templates_section.templates') }}
                </div>
                <div class="pt-2 mb-8 grid gap-8" :class="gridColsClass(data.namelessmc.templates.front_end)">
                    <div v-for="template in data.namelessmc.templates.front_end" :key="template.name">
                        <div class="section-content-floating">
                            <h3 class="section-subheading">
                                {{ template.name }} <span v-if="isOfficialTemplate(template.name)" v-html="officialBadge()"></span>
                            </h3>
    
                            <h5 class="section-heading">
                                {{ $t('templates_section.enabled') }}: <span v-html="booleanBadge(template.enabled)"></span>
                            </h5>

                            <h5 class="section-heading">
                                {{ $t('templates_section.is_default') }}: <span v-html="booleanBadge(template.is_default)"></span>
                            </h5>

                            <h5 class="section-heading">
                                {{ $t('templates_section.author') }}: <span class="font-normal text-base" v-html="template.author"></span>
                            </h5>

                            <h5 class="section-heading">
                                {{ $t('templates_section.namelessmc_version') }}: <span v-html="asCode(template.namelessmc_version)"></span>
                            </h5>

                            <h5 class="section-heading">
                                {{ $t('templates_section.version') }}: <span v-html="asCode(template.template_version)"></span>
                            </h5>
                        </div>
                    </div>
                </div>
            </div>

            <!-- NamelessMC panel templates section -->
            <div v-if="loaded">
                <div class="section-title-floating">
                    <font-awesome-icon icon="tachometer-alt"/> {{ $t('panel_templates_section.panel_templates') }}
                </div>
                <div class="pt-2 mb-8 grid gap-8" :class="gridColsClass(data.namelessmc.templates.panel)">
                    <div v-for="template in data.namelessmc.templates.panel" :key="template.name">
                        <div class="section-content-floating">
                            <h3 class="section-subheading">
                                {{ template.name }} <span v-if="isOfficialTemplate(template.name)" v-html="officialBadge()"></span>
                            </h3>

                            <h5 class="section-heading">
                                {{ $t('panel_templates_section.enabled') }}: <span v-html="booleanBadge(template.enabled)"></span>
                            </h5>

                            <h5 class="section-heading">
                                {{ $t('panel_templates_section.is_default') }}: <span v-html="booleanBadge(template.is_default)"></span>
                            </h5>

                            <h5 class="section-heading">
                                {{ $t('panel_templates_section.author') }}: <span class="font-normal text-base" v-html="template.author"></span>
                            </h5>

                            <h5 class="section-heading">
                                {{ $t('panel_templates_section.namelessmc_version') }}: <span v-html="asCode(template.namelessmc_version)"></span>
                            </h5>

                            <h5 class="section-heading">
                                {{ $t('panel_templates_section.version') }}: <span v-html="asCode(template.template_version)"></span>
                            </h5>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Enviroment section -->
            <div v-if="loaded" class="section-background">
                <div class="section-title">
                    <font-awesome-icon icon="server"/> {{ $t('enviroment_section.enviroment') }}
                </div>
                <div class="section-content grid-cols-4 gap-8">
                    <div>
                        <h5 class="section-heading">{{ $t('enviroment_section.php_version') }}</h5>
                        <h2 v-html="asCode(data.enviroment.php_version)"></h2>
                    </div>
                    <div>
                        <h5 class="section-heading">{{ $t('enviroment_section.host_os') }}</h5>
                        <h2 class="text-normal">{{ data.enviroment.host_os }}</h2>
                    </div>
                    <div>
                        <h5 class="section-heading">{{ $t('enviroment_section.host_kernel_version') }}</h5>
                        <h2 v-html="asCode(data.enviroment.host_kernel_version)"></h2>
                    </div>
                    <div>
                        <h5 class="section-heading">{{ $t('enviroment_section.using_docker_image') }}</h5>
                        <h5 v-html="booleanBadge(data.enviroment.official_docker_image)"></h5>
                    </div>
                    <div>
                        <h5 class="section-heading">{{ $t('enviroment_section.disk_usage') }}</h5>
                        <h2 class="text-normal" v-html="humanFileSize(data.enviroment.disk_total_space - data.enviroment.disk_free_space) + ' / ' + humanFileSize(data.enviroment.disk_total_space)"></h2>
                    </div>
                    <div>
                        <h5 class="section-heading">{{ $t('enviroment_section.ram_usage') }}</h5>
                        <h5 class="text-normal" v-html="humanFileSize(data.enviroment.memory_used_space) + ' / ' + data.enviroment.memory_total_space"></h5>
                    </div>
                    <div>
                        <h5 class="section-heading">{{ $t('enviroment_section.config_writable') }}</h5>
                        <h5 v-html="booleanBadge(data.enviroment.config_writable)"></h5>
                    </div>
                    <div>
                        <h5 class="section-heading">{{ $t('enviroment_section.cache_writable') }}</h5>
                        <h5 v-html="booleanBadge(data.enviroment.cache_writable)"></h5>
                    </div>
                </div>
            </div>

        </div>

        <footer v-if="loaded" class="md:h-28 bg-yellow-400 dark:bg-indigo-900 text-center">
            <div class="grid md:grid-cols-4 sm:grid-cols-1 py-6">
                <div class="xl:-mr-48">
                    <h5 class="section-heading">{{ $t('footer.debug_log_version') }}: <span class="font-normal" v-html="asCode(data.debug_version)"></span></h5>
                    <h5 class="section-heading">{{ $t('footer.generated_by') }}: <img v-if="data.generated_by_uuid" class="inline" :src="`https://crafthead.net/helm/${data.generated_by_uuid}/16`"> <span class="font-normal">{{ data.generated_by_name }}</span></h5>
                    <h5 class="section-heading">{{ $t('footer.raw_json') }}: <a :href="`https://paste.rkslot.nl/${key}`" target="_blank"><span class="font-normal">https://paste.rkslot.nl/{{ key }}</span></a></h5>
                </div>
                <div>
                    <button @click="toggleTheme()" class="px-2 h-12 rounded-lg bg-gray-200 dark:bg-gray-900 text-black dark:text-gray-200 font-bold text-sm">{{ $t('footer.theme', { theme: capitalize(this.theme)}) }}</button>
                </div>
                <div class="text-normal">
                    <font-awesome-icon icon="globe"/>
                    <select v-model="$i18n.locale" class="ml-2 p-2 h-12 rounded-md bg-gray-200 dark:bg-gray-900">
                        <option v-for="lang of $i18n.availableLocales" :key="lang" :value="lang">
                            {{ lang }}
                        </option>
                    </select>
                </div>
                <div class="xl:-ml-48">
                    <h5 class="section-heading">{{ $t('footer.namelessmc_website') }}: <a href="https://namelessmc.com" target="_blank"><span class="font-normal">https://namelessmc.com</span></a></h5>
                    <h5 class="section-heading">{{ $t('footer.get_support') }}: <a href="https://discord.gg/nameless" target="_blank"><span class="font-normal">https://discord.gg/nameless</span></a></h5>
                    <h5 class="section-heading">{{ $t('footer.made_with_love') }}</h5>
                </div>
            </div>
        </footer>
    </div>
</template>

<script>

// TODO: something with php modules
// TODO: group sync rules
// TODO: finish module debug info
// TODO: seperate sections into own components
// TODO: display templates+panel templates side by side if there is only 1 of each
// TODO: collapsable each section
// TODO: drag to reorder sections and store in localstorage
// TODO: latest php error in dropdown <pre></pre>

import axios from 'axios';

export default {
    mounted() {
        this.setDefaultTheme();
        this.renderTheme();
        this.listenForThemeChanges();
        this.loadData();
    },
    data() {
        return {
            loaded: false,
            error: null,
            data: null,
            publicPath: process.env.BASE_URL,
            theme: null,
        }
    },
    computed: {
        key() {
            return window.location.pathname.substring(1);
        }
    },
    methods: {
        setDefaultTheme(forcedTheme = null) {
            let theme = 'light';

            if (forcedTheme != null) {
                theme = forcedTheme;
                localStorage.setItem('nmc-debug-theme', forcedTheme);
            } else {
                if (localStorage.getItem('nmc-debug-theme') != null) {
                    theme = localStorage.getItem('nmc-debug-theme');
                } else if (window.matchMedia) {
                    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                        theme = 'dark';
                    }
                }
            }

            this.theme = theme;
        },
        toggleTheme() {
            if (this.theme == 'light') {
                this.theme = 'dark';
            } else {
                this.theme = 'light';
            }

            localStorage.setItem('nmc-debug-theme', this.theme);

            this.renderTheme();
        },
        renderTheme() {
            if (this.theme == 'dark') {
                document.documentElement.classList.add('dark');
            } else {
                document.documentElement.classList.remove('dark');
            }
        },
        listenForThemeChanges() {
            if (window.matchMedia) {
                window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
                    this.setDefaultTheme(
                        window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
                    );
                    this.renderTheme();
                });
            }
        },
        async loadData() {

            if (this.key.length == 0) {
                this.error = this.$t('errors.no_id_provided');
            } else {
                try {
                    const { data } = await axios.get(`https://paste.rkslot.nl/raw/${this.key}`);
                    this.data = data;

                    if (!this.data.generated_at) {
                        this.error = this.$t('errors.no_data_in_json');
                    } else if (this.data.debug_version != 1) {
                        this.error = this.$t('errors.invalid_debug_version', { version: this.data.debug_version });
                    } else {
                        this.loaded = true;
                    }

                } catch (err) {
                    this.error = this.$t('errors.invalid_link_id');
                }
            }
        },
        formatDate(seconds) {
            const date = new Date(seconds * 1000);

            const day = date.toLocaleDateString('en-US', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
            });

            const time = date.toLocaleTimeString('en-US', {
                timeStyle: 'short',
            });

            return `${day} ${time}`;
        },
        booleanBadge(value) {
            return value
                    ? `<span class="font-bold text-base text-green-600">${ this.$t('misc.yes') }</span>`
                    : `<span class="font-bold text-base text-yellow-500">${ this.$t('misc.no') }</span>`;
        },
        asCode(value) {
            return `<span class="text-sm text-black dark:text-gray-300 font-normal font-mono">${value}</span`;
        },
        isEmpty(value, code = false) {
            return !value
                    ? `<i class="font-normal text-base dark:text-gray-300">${ this.$t('misc.empty') }</i>`
                    : code 
                        ? this.asCode(value) 
                        : `<span class="font-normal text-base dark:text-gray-300">${value}</span>`;
        },
        gridColsClass(obj) {
            let count = Object.keys(obj).length;

            if (count == 1) {
                return 'md:grid-cols-1';
            }

            if (count == 2) {
                return 'md:grid-cols-2';
            }

            return 'md:grid-cols-3';
        },
        isOfficialModule(moduleName) {
            return ['Core', 'Forum', 'Discord Integration', 'Cookie Consent'].includes(moduleName);
        },
        isOfficialTemplate(templateName) {
            return ['DefaultRevamp', 'Default'].includes(templateName)
        },
        officialBadge() {
            return `<span class="rounded-md text-white bg-blue-500 px-2 py-1 text-xs ml-1">${ this.$t('misc.official') }</span>`
        },
        capitalize(string) {
            return string[0].toUpperCase() + string.substring(1);
        },
        humanFileSize(size) {
            const i = Math.floor( Math.log(size) / Math.log(1024) );
            return ( size / Math.pow(1024, i) ).toFixed(2) * 1 + ' ' + ['B', 'kB', 'MB', 'GB', 'TB'][i];
        },
    },
}

</script>