<template>
    <div class="bg-gray-200 h-full" v-bind:class="{ 'h-screen': !loaded }">

        <div class="py-12 bg-yellow-400 shadow-lg">
            <div class="container mx-auto flex">
                <img :src="`${publicPath}logo.png`" alt="NamelessMC logo" class="h-20 mr-4">
                <h1 class="font-bold text-4xl text-gray-50">
                    NamelessMC Debug Info
                    <h3 v-if="loaded" class="text-2xl font-bold mb-3">Generated @ {{ formatDate(data.generated_at) }}</h3>
                </h1>
            </div>
        </div>

        <div class="container mx-auto pt-8">

            <div v-if="!loaded && !error">
                <div class="m-auto rounded-lg shadow-lg w-1/3 p-4 bg-gray-300 mb-2 font-bold text-white">
                    Loading... <span class=" float-right"><font-awesome-icon icon="spinner" spin size="lg"/></span>
                </div>
            </div>

            <div v-if="error">
                <div class="m-auto rounded-lg bg-red-400 shadow-lg w-1/3">
                    <div class="p-4 h-full bg-red-300 mb-2 rounded-t-lg font-bold text-white">
                        Error
                    </div>
                    <div class="pt-2 pb-4 mb-8 pl-4 text-white" v-html="error"></div>
                </div>
            </div>

            <!-- NamelessMC version section -->
            <div v-if="loaded" class="section-background">
                <div class="section-title">
                    <font-awesome-icon icon="download"/> Version
                </div>
                <div class="section-content grid-cols-3">
                    <div>
                        <h5 class="section-heading">Version</h5>
                        <h2 v-html="asCode(data.namelessmc.version)"></h2>
                    </div>
                    <div>
                        <h5 class="section-heading">Update available</h5>
                        <h5 v-html="booleanBadge(data.namelessmc.update_available)"></h5>
                    </div>
                    <div>
                        <h5 class="section-heading">Last update check</h5>
                        <h2>{{ formatDate(data.namelessmc.update_checked) }}</h2>
                    </div>
                </div>
            </div>

            <!-- NamelessMC settings section -->
            <div v-if="loaded" class="section-background">
                <div class="section-title">
                    <font-awesome-icon icon="cogs"/> Settings
                </div>
                <div class="section-content grid-cols-4 gap-8">
                    <div>
                        <h5 class="section-heading">PHPMailer enabled</h5>
                        <h2 v-html="booleanBadge(data.namelessmc.settings.phpmailer)"></h2>
                    </div>
                    <div>
                        <h5 class="section-heading">API enabled</h5>
                        <h2 v-html="booleanBadge(data.namelessmc.settings.api_enabled)"></h2>
                    </div>
                    <div>
                        <h5 class="section-heading">API verification</h5>
                        <h2 v-html="booleanBadge(data.namelessmc.settings.api_verification)"></h2>
                    </div>
                    <div>
                        <h5 class="section-heading">Email verification enabled</h5>
                        <h2 v-html="booleanBadge(data.namelessmc.settings.email_verification)"></h2>
                    </div>

                    <div>
                        <h5 class="section-heading">Login method</h5>
                        <h2>{{ data.namelessmc.settings.login_method }}</h2>
                    </div>
                    <div>
                        <h5 class="section-heading">Captcha type</h5>
                        <h2>{{ data.namelessmc.settings.captcha_type }}</h2>
                    </div>
                    <div>
                        <h5 class="section-heading">Captcha on login page</h5>
                        <h2 v-html="booleanBadge(data.namelessmc.settings.captcha_login)"></h2>
                    </div>
                    <div>
                        <h5 class="section-heading">Captcha on contact page</h5>
                        <h2 v-html="booleanBadge(data.namelessmc.settings.captcha_contact)"></h2>
                    </div>
                </div>
            </div>

            <!-- NamelessMC config section -->
            <div v-if="loaded" class="section-background">
                <div class="section-title">
                    <font-awesome-icon icon="wrench"/> Config
                </div>
                <div class="section-content grid-cols-5">
                    <div>
                        <h5 class="section-heading">Path</h5>
                        <h2 v-html="isEmpty(data.namelessmc.config.path, true)"></h2>
                    </div>
                    <div>
                        <h5 class="section-heading">Friendly URLs</h5>
                        <h2 v-html="booleanBadge(data.namelessmc.config.friendly)"></h2>
                    </div>
                    <div>
                        <h5 class="section-heading">Force HTTPS</h5>
                        <h2 v-html="booleanBadge(data.namelessmc.config.force_https)"></h2>
                    </div>
                    <div>
                        <h5 class="section-heading">Force www</h5>
                        <h2 v-html="booleanBadge(data.namelessmc.config.force_www)"></h2>
                    </div>
                    <div>
                        <h5 class="section-heading">Allowed proxies</h5>
                        <h2 v-html="isEmpty(data.namelessmc.config.allowed_proxies, true)"></h2>
                    </div>
                </div>
            </div>

            <!-- NamelessMC modules section -->
            <div v-if="loaded">
                <div class="section-title-floating">
                    <font-awesome-icon icon="puzzle-piece"/> Modules
                </div>
                <div class="pt-2 mb-8 grid gap-8 sm:grid-cols-1" :class="gridColsClass(data.namelessmc.modules)">
                    <div v-for="module in data.namelessmc.modules" :key="module.name">
                        <div class="p-4 rounded-lg bg-gray-100 shadow-lg">

                            <div>
                                <h3 class="text-md font-bold text-center">
                                    {{ module.name }} <span v-if="isOfficialModule(module.name)" v-html="officialBadge()"></span>
                                </h3>
        
                                <h5 class="section-heading">
                                    Enabled: <span v-html="booleanBadge(module.enabled)"></span>
                                </h5>

                                <h5 class="section-heading">
                                    Author: <span class="font-normal text-base" v-html="module.author"></span>
                                </h5>

                                <h5 class="section-heading">
                                    NamelessMC version: <span v-html="asCode(module.namelessmc_version)"></span>
                                </h5>

                                <h5 class="section-heading">
                                    Version: <span v-html="asCode(module.module_version)"></span>
                                </h5>
                            </div>

                            <div class="w-full text-center border-b-2 border-blue-400" style="height: 14px;">
                                <span class="bg-gray-100 text-base">&nbsp;Debug Info&nbsp;</span>
                            </div>

                            <div class="pt-3">
                                <div v-if="module.name == 'Core'">
                                    <h5 class="section-heading pb-1 text-center">Minecraft Integration</h5>
                                    <div class="grid grid-cols-2">
                                        <h5 class="section-heading">
                                            Integration enabled: <span v-html="booleanBadge(module.debug_info.minecraft.mc_integration)"></span>
                                        </h5>
                                        <h5 class="section-heading">
                                            UUID linking: <span v-html="booleanBadge(module.debug_info.minecraft.uuid_linking)"></span>
                                        </h5>
                                        <h5 class="section-heading">
                                            Username sync: <span v-html="booleanBadge(module.debug_info.minecraft.username_sync)"></span>
                                        </h5>
                                        <h5 class="section-heading">
                                            External query: <span v-html="booleanBadge(module.debug_info.minecraft.external_query)"></span>
                                        </h5>
                                    </div>
                                    <h5 class="section-heading pb-1 text-center pt-1">Servers</h5>
                                    <div v-for="server in module.debug_info.minecraft.servers" :key="server.id" class="divide-y-2 divide-blue-400">
                                        <div>
                                            <div class="grid grid-cols-2 pb-1">
                                                <h5 class="section-heading">
                                                    ID: <span v-html="asCode(server.id)"></span>
                                                </h5>
                                                <h5 class="section-heading">
                                                    Name: <span class="font-normal text-base">{{ server.name }}</span>
                                                </h5>
                                            </div>
                                            <div class="grid grid-cols-2 pb-1">
                                                <h5 class="section-heading">
                                                    IP: <span v-html="asCode(server.ip)"></span>
                                                </h5>
                                                <h5 class="section-heading">
                                                    Query IP: <span v-html="asCode(server.query_ip)"></span>
                                                </h5>
                                            </div>
                                            <div class="grid grid-cols-2">
                                                <h5 class="section-heading">
                                                    Port: <span v-html="asCode(server.port)"></span>
                                                </h5>
                                                <h5 class="section-heading">
                                                    Query Port: <span v-html="asCode(server.query_port)"></span>
                                                </h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div v-else-if="module.name == 'Discord Integration'">
                                    <div class="grid grid-cols-2">
                                        <h5 class="section-heading">
                                            Syncing enabled: <span v-html="booleanBadge(module.enabled && module.debug_info.guild_id && module.debug_info.bot_url)"></span>
                                        </h5>
                                        <h5 class="section-heading">
                                            Guild ID: <span v-html="isEmpty(module.debug_info.guild_id)"></span>
                                        </h5>
                                        <h5 class="section-heading">
                                            Bot setup: <span v-html="booleanBadge(module.debug_info.bot_setup)"></span>
                                        </h5>
                                        <h5 class="section-heading">
                                            Bot URL: <span v-html="isEmpty(module.debug_info.bot_url)"></span>
                                        </h5>
                                        <!-- TODO: roles -->
                                    </div>
                                </div>
                                <div v-else>
                                    <pre>{{ module.debug_info }}</pre>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- NamelessMC front end templates section -->
            <div v-if="loaded">
                <div class="section-title-floating">
                    <font-awesome-icon icon="paint-brush"/> Templates
                </div>
                <div class="pt-2 mb-8 grid gap-8" :class="gridColsClass(data.namelessmc.templates.front_end)">
                    <div v-for="template in data.namelessmc.templates.front_end" :key="template.name">
                        <div class="p-4 rounded-lg bg-gray-100 shadow-lg">
                            <h3 class="text-md font-bold text-center">
                                {{ template.name }} <span v-if="isOfficialTemplate(template.name)" v-html="officialBadge()"></span>
                            </h3>
    
                            <h5 class="section-heading">
                                Enabled: <span v-html="booleanBadge(template.enabled)"></span>
                            </h5>

                            <h5 class="section-heading">
                                Is default: <span v-html="booleanBadge(template.is_default)"></span>
                            </h5>

                            <h5 class="section-heading">
                                Author: <span class="font-normal text-base" v-html="template.author"></span>
                            </h5>

                            <h5 class="section-heading">
                                NamelessMC version: <span v-html="asCode(template.namelessmc_version)"></span>
                            </h5>

                            <h5 class="section-heading">
                                Version: <span v-html="asCode(template.template_version)"></span>
                            </h5>
                        </div>
                    </div>
                </div>
            </div>

            <!-- NamelessMC panel templates section -->
            <div v-if="loaded">
                <div class="section-title-floating">
                    <font-awesome-icon icon="tachometer-alt"/> Panel Templates
                </div>
                <div class="pt-2 mb-8 grid gap-8" :class="gridColsClass(data.namelessmc.templates.panel)">
                    <div v-for="template in data.namelessmc.templates.panel" :key="template.name">
                        <div class="p-4 rounded-lg bg-gray-100 shadow-lg">
                            <h3 class="text-md font-bold text-center">
                                {{ template.name }} <span v-if="isOfficialTemplate(template.name)" v-html="officialBadge()"></span>
                            </h3>

                            <h5 class="section-heading">
                                Enabled: <span v-html="booleanBadge(template.enabled)"></span>
                            </h5>

                            <h5 class="section-heading">
                                Is default: <span v-html="booleanBadge(template.is_default)"></span>
                            </h5>

                            <h5 class="section-heading">
                                Author: <span class="font-normal text-base" v-html="template.author"></span>
                            </h5>

                            <h5 class="section-heading">
                                NamelessMC version: <span v-html="asCode(template.namelessmc_version)"></span>
                            </h5>

                            <h5 class="section-heading">
                                Version: <span v-html="asCode(template.template_version)"></span>
                            </h5>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Enviroment section -->
            <div v-if="loaded" class="section-background">
                <div class="section-title">
                    <font-awesome-icon icon="server"/> Enviroment
                </div>
                <div class="section-content grid-cols-4">
                    <div>
                        <h5 class="section-heading">PHP version</h5>
                        <h2 v-html="asCode(data.enviroment.php_version)"></h2>
                    </div>
                    <div>
                        <h5 class="section-heading">Host OS</h5>
                        <h2>{{ data.enviroment.host_os }}</h2>
                    </div>
                    <div>
                        <h5 class="section-heading">Host kernel version</h5>
                        <h2 v-html="asCode(data.enviroment.host_kernel_version)"></h2>
                    </div>
                    <div>
                        <h5 class="section-heading">Using official Docker image</h5>
                        <h5 v-html="booleanBadge(data.enviroment.official_docker_image)"></h5>
                    </div>
                </div>
            </div>

        </div>

        <footer v-if="loaded" class="h-24 bg-yellow-400 text-center flex flex-col justify-center ">
            <h5 class="section-heading">Debug log version <span class="font-normal" v-html="asCode(data.debug_version)"></span></h5>
            <h5 class="section-heading">Generated by <img v-if="data.generated_by_uuid" class="inline" :src="`https://crafthead.net/helm/${data.generated_by_uuid}/16`"> <span class="font-normal">{{ data.generated_by_name }}</span></h5>
            <h5 class="section-heading">Raw JSON <a :href="`https://paste.rkslot.nl/${key}`" target="_blank"><span class="font-normal">https://paste.rkslot.nl/{{ key }}</span></a></h5>
        </footer>

    </div>
</template>

<script>

// TODO: disk/ram total, usage
// TODO: something with php modules
// TODO: directories writable
// TODO: finish module debug info
// TODO: make font sizes match in modules and settings etc
// TODO: seperate sections into own components
// TODO: collapsable each section
// TODO: drag to reorder sections and store in localstorage

import axios from 'axios';

export default {
    mounted() {
        this.loadData();
    },
    data() {
        return {
            loaded: false,
            error: null,
            data: null,
            publicPath: process.env.BASE_URL,
        }
    },
    computed: {
        key() {
            return window.location.pathname.substring(1);
        }
    },
    methods: {
        async loadData() {

            if (this.key.length == 0) {
                this.error = 'No debug link ID provided'
            } else {
                try {
                    const { data } = await axios.get(`https://paste.rkslot.nl/raw/${this.key}`);
                    this.data = data;

                    if (!this.data.generated_at) {
                        this.error = 'No debug data available in JSON';
                    } else if (this.data.debug_version != 1) {
                        this.error = `Debug version <strong>${this.data.debug_version}</strong> is not supported`;
                    } else {
                        this.loaded = true;
                    }

                } catch (err) {
                    this.error = 'Invalid debug link ID';
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
                    ? '<span class="font-bold text-base text-green-600">Yes</span>'
                    : '<span class="font-bold text-base text-yellow-500">No</span>';
        },
        asCode(value) {
            return `<span class="text-sm text-black font-normal font-mono">${value}</span`;
        },
        isEmpty(value, code = false) {
            return !value
                    ? '<i class="font-normal text-base">Empty</i>'
                    : code 
                        ? this.asCode(value) 
                        : `<span class="font-normal text-base">${value}</span>`;
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
            return ['Core', 'Forum', 'Discord Integration'].includes(moduleName);
        },
        isOfficialTemplate(templateName) {
            return ['DefaultRevamp', 'Default'].includes(templateName)
        },
        officialBadge() {
            return '<span class="rounded-md text-white bg-blue-500 px-2 py-1 text-xs ml-1">OFFICIAL</span>'
        }
    },
}

</script>