<template>
    <div class="bg-gray-50 h-screen">
        <div class="py-12 bg-yellow-400 shadow-lg">
            <h1 class="font-bold text-4xl text-gray-50 pl-20">
                NamelessMC Debug Info
                <h3 v-if="loaded" class="text-2xl font-bold mb-3">Generated @ {{ formatDate(data.generated_at) }}</h3>
            </h1>
        </div>

        <div class="container mx-auto pt-8">

            <div v-if="loading">
                <div class="m-auto rounded-lg shadow-lg w-1/3 p-4 bg-gray-300 mb-2 font-bold text-white">
                    Loading...
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
            <div v-if="loaded" class="rounded-lg bg-gray-100 shadow-lg">
                <div class="p-4 h-full bg-blue-400 mb-2 rounded-t-lg font-bold text-white">
                    NamelessMC version
                </div>
                <div class="pt-2 pb-8 mb-8 grid grid-cols-3 place-items-center items-center text-center align-middle">
                    <div>
                        <h5 class="text-sm font-bold">Version</h5>
                        <h2>{{ data.namelessmc.version }}</h2>
                    </div>
                    <div>
                        <h5 class="text-sm font-bold">Update available</h5>
                        <h5 v-html="booleanBadge(data.namelessmc.update_available)"></h5>
                    </div>
                    <div>
                        <h5 class="text-sm font-bold">Last update check</h5>
                        <h2>{{ formatDate(data.namelessmc.update_checked) }}</h2>
                    </div>
                </div>
            </div>

            <!-- NamelessMC settings section -->
            <div v-if="loaded" class="rounded-lg bg-gray-100 shadow-lg">
                <div class="p-4 h-full bg-blue-400 mb-2 rounded-t-lg font-bold text-white">
                    NamelessMC settings
                </div>
                <div class="pt-2 pb-8 mb-8 grid grid-cols-4 gap-8 place-items-center items-center text-center align-middle">
                    <div>
                        <h5 class="text-sm font-bold">PHPMailer enabled</h5>
                        <h2 v-html="booleanBadge(data.namelessmc.settings.phpmailer)"></h2>
                    </div>
                    <div>
                        <h5 class="text-sm font-bold">API enabled</h5>
                        <h2 v-html="booleanBadge(data.namelessmc.settings.api_enabled)"></h2>
                    </div>
                    <div>
                        <h5 class="text-sm font-bold">API verification</h5>
                        <h2 v-html="booleanBadge(data.namelessmc.settings.api_verification)"></h2>
                    </div>
                    <div>
                        <h5 class="text-sm font-bold">Email verification enabled</h5>
                        <h2 v-html="booleanBadge(data.namelessmc.settings.email_verification)"></h2>
                    </div>

                    <div>
                        <h5 class="text-sm font-bold">Login method</h5>
                        <h2>{{ data.namelessmc.settings.login_method }}</h2>
                    </div>
                    <div>
                        <h5 class="text-sm font-bold">Captcha type</h5>
                        <h2>{{ data.namelessmc.settings.captcha_type }}</h2>
                    </div>
                    <div>
                        <h5 class="text-sm font-bold">Captcha on login page</h5>
                        <h2 v-html="booleanBadge(data.namelessmc.settings.captcha_login)"></h2>
                    </div>
                    <div>
                        <h5 class="text-sm font-bold">Captcha on contact page</h5>
                        <h2 v-html="booleanBadge(data.namelessmc.settings.captcha_contact)"></h2>
                    </div>
                </div>
            </div>

            <!-- NamelessMC config section -->
            <div v-if="loaded" class="rounded-lg bg-gray-100 shadow-lg">
                <div class="p-4 h-full bg-blue-400 mb-2 rounded-t-lg font-bold text-white">
                    NamelessMC config
                </div>
                <div class="pt-2 pb-8 mb-8 grid grid-cols-5 place-items-center items-center text-center align-middle">
                    <div>
                        <h5 class="text-sm font-bold">Path</h5>
                        <h2 v-html="isEmpty(data.namelessmc.config.path)"></h2>
                    </div>
                    <div>
                        <h5 class="text-sm font-bold">Friendly URLs</h5>
                        <h2 v-html="booleanBadge(data.namelessmc.config.friendly)"></h2>
                    </div>
                    <div>
                        <h5 class="text-sm font-bold">Force HTTPS</h5>
                        <h2 v-html="booleanBadge(data.namelessmc.config.force_https)"></h2>
                    </div>
                    <div>
                        <h5 class="text-sm font-bold">Force www</h5>
                        <h2 v-html="booleanBadge(data.namelessmc.config.force_www)"></h2>
                    </div>
                    <div>
                        <h5 class="text-sm font-bold">Allowed Proxies</h5>
                        <h2 v-html="isEmpty(data.namelessmc.config.allowed_proxies)"></h2>
                    </div>
                </div>
            </div>

            <!-- NamelessMC modules section -->
            <div v-if="loaded">
                <div class="rounded-lg p-4 h-full bg-blue-400 mb-2 rounded-t-lg shadow-lg font-bold text-white">
                    NamelessMC modules
                </div>
                <div class="pt-2 mb-8 grid gap-8" :class="gridColsClass(data.namelessmc.modules)">
                    <div v-for="module in data.namelessmc.modules" :key="module.name">
                        <div class="p-4 rounded-lg bg-gray-100 shadow-lg">
                            <h3 class="text-md font-bold text-center">
                                {{ module.name }} <span v-if="isOfficialModule(module.name)" v-html="officialBadge()"></span>
                            </h3>
    
                            <h5 class="text-sm font-bold">
                                Enabled: <span class="font-normal" v-html="booleanBadge(module.enabled)"></span>
                            </h5>

                            <h5 class="text-sm font-bold inline-block">
                                Author: <h5 class="inline-block font-normal text-base" v-html="module.author"></h5>
                            </h5>

                            <br>

                            <h5 class="text-sm font-bold inline-block">
                                NamelessMC version: <h5 class="inline-block font-normal text-base">{{ module.namelessmc_version }}</h5>
                            </h5>

                            <br>

                            <h5 class="text-sm font-bold inline-block">
                                Version: <h5 class="inline-block font-normal text-base">{{ module.module_version }}</h5>
                            </h5>

                            <div v-if="isOfficialModule(module.name)">
                                <div v-if="module.name == 'Core'">
                                    <h5 class="text-sm font-bold inline-block pt-3">Extra Info:</h5>
                                </div>
                                <div v-else-if="module.name == 'Forum'">
                                    <!-- No specific debug info for Forum module *yet* -->
                                </div>
                                <div v-else-if="module.name == 'Discord Integration'">
                                    <h5 class="text-sm font-bold inline-block pt-3">Extra Info:</h5>
                                </div>
                            </div>
                            <div v-else>
                                Debug Info:
                                <pre>{{ module.debug_info }}</pre>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- NamelessMC front end templates section -->
            <div v-if="loaded">
                <div class="rounded-lg p-4 h-full bg-blue-400 mb-2 rounded-t-lg shadow-lg font-bold text-white">
                    NamelessMC templates (front end)
                </div>
                <div class="pt-2 mb-8 grid gap-8" :class="gridColsClass(data.namelessmc.templates.front_end)">
                    <div v-for="template in data.namelessmc.templates.front_end" :key="template.name">
                        <div class="p-4 rounded-lg bg-gray-100 shadow-lg">
                            <h3 class="text-md font-bold text-center">
                                {{ template.name }} <span v-if="isOfficialTemplate(template.name)" v-html="officialBadge()"></span>
                            </h3>
    
                            <h5 class="text-sm font-bold">
                                Enabled: <span class="font-normal" v-html="booleanBadge(template.enabled)"></span>
                            </h5>

                            <h5 class="text-sm font-bold">
                                Is default: <span class="font-normal" v-html="booleanBadge(template.is_default)"></span>
                            </h5>

                            <h5 class="text-sm font-bold inline-block">
                                Author: <h5 class="inline-block font-normal text-base" v-html="template.author"></h5>
                            </h5>

                            <br>

                            <h5 class="text-sm font-bold inline-block">
                                NamelessMC version: <h5 class="inline-block font-normal text-base">{{ template.namelessmc_version }}</h5>
                            </h5>

                            <br>

                            <h5 class="text-sm font-bold inline-block">
                                Version: <h5 class="inline-block font-normal text-base">{{ template.template_version }}</h5>
                            </h5>
                        </div>
                    </div>
                </div>
            </div>

            <!-- NamelessMC panel templates section -->
            <div v-if="loaded">
                <div class="rounded-lg p-4 h-full bg-blue-400 mb-2 rounded-t-lg shadow-lg font-bold text-white">
                    NamelessMC templates (panel)
                </div>
                <div class="pt-2 mb-8 grid gap-8" :class="gridColsClass(data.namelessmc.templates.panel)">
                    <div v-for="template in data.namelessmc.templates.panel" :key="template.name">
                        <div class="p-4 rounded-lg bg-gray-100 shadow-lg">
                            <h3 class="text-md font-bold text-center">
                                {{ template.name }} <span v-if="isOfficialTemplate(template.name)" v-html="officialBadge()"></span>
                            </h3>

                            <h5 class="text-sm font-bold">
                                Enabled: <span class="font-normal" v-html="booleanBadge(template.enabled)"></span>
                            </h5>

                            <h5 class="text-sm font-bold">
                                Is default: <span class="font-normal" v-html="booleanBadge(template.is_default)"></span>
                            </h5>

                            <h5 class="text-sm font-bold inline-block">
                                Author: <h5 class="inline-block font-normal text-base" v-html="template.author"></h5>
                            </h5>

                            <br>

                            <h5 class="text-sm font-bold inline-block">
                                NamelessMC version: <h5 class="inline-block font-normal text-base">{{ template.namelessmc_version }}</h5>
                            </h5>

                            <br>

                            <h5 class="text-sm font-bold inline-block">
                                Version: <h5 class="inline-block font-normal text-base">{{ template.template_version }}</h5>
                            </h5>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Enviroment section -->
            <div v-if="loaded" class="rounded-lg bg-gray-100 shadow-lg">
                <div class="p-4 h-full bg-blue-400 mb-2 rounded-t-lg font-bold text-white">
                    Enviroment
                </div>
                <div class="pt-2 pb-8 mb-8 grid grid-cols-4 place-items-center items-center text-center align-middle">
                    <div>
                        <h5 class="text-sm font-bold">PHP version</h5>
                        <h2>{{ data.enviroment.php_version }}</h2>
                    </div>
                    <div>
                        <h5 class="text-sm font-bold">Host OS</h5>
                        <h2>{{ data.enviroment.host_os }}</h2>
                    </div>
                    <div>
                        <h5 class="text-sm font-bold">Host Kernel version</h5>
                        <h2>{{ data.enviroment.host_kernel_version }}</h2>
                    </div>
                    <div>
                        <h5 class="text-sm font-bold">Using official Docker image</h5>
                        <h5 v-html="booleanBadge(data.enviroment.official_docker_image)"></h5>
                    </div>
                </div>
            </div>

        </div>

        <footer v-if="loaded" class="h-20 bg-yellow-400 text-center">
            <h5 class="text-sm font-bold pt-2">Debug log version: <span class="font-normal">{{ data.debug_version }}</span></h5>
            <h5 class="text-sm font-bold">Generated by: <img v-if="data.generated_by_uuid" class="inline" :src="`https://crafthead.net/helm/${data.generated_by_uuid}/16`"> <span class="font-normal">{{ data.generated_by_name }}</span></h5>
            <h5 class="text-sm font-bold">Raw JSON: <a :href="`https://paste.rkslot.nl/${key}`" target="_blank"><span class="font-normal">https://paste.rkslot.nl/{{ key }}</span></a></h5>
        </footer>

    </div>
</template>

<script>
import axios from 'axios';

export default {
    mounted() {
        this.loading = true;
        this.loadData();
    },
    data() {
        return {
            loading: false,
            loaded: false,
            error: null,
            data: null,
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

            this.loading = false;
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
            //return value ? 'Yes' : 'No';
            return value 
                    ? '<span class="inline-block rounded-md text-white bg-green-500 px-2 py-1 text-s mt-1">Yes</span>'
                    : '<span class="inline-block rounded-md text-white bg-yellow-500 px-2 py-1 text-s mt-1">No</span>';
        },
        isEmpty(value) {
            return value == undefined ? "<i>Empty</i>" : value;
        },
        gridColsClass(obj) {
            let count = Object.keys(obj).length;

            if (count > 3) {
                count = 3;
            }

            return `grid-cols-${count}`;
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