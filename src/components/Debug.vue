<template>
    <div class="bg-gray-50 h-screen">
        <div class="py-12 bg-yellow-400">
            <h1 class="font-bold text-4xl text-gray-50 pl-20">
                NamelessMC Debug Info
                <h3 v-if="loaded" class="text-2xl font-bold mb-3 italic">Generated @ {{ formatDate(data.generated_at) }}</h3>
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
                <div class="p-4 h-full bg-red-300 mb-2 rounded-t-lg font-bold text-white">
                    NamelessMC version
                </div>
                <div class="pt-2 pb-8 mb-8 grid grid-cols-3 place-items-center items-center text-center align-middle">
                    <div>
                        <h5 class="text-sm font-bold">Version</h5>
                        <h2>{{ data.namelessmc.version }}</h2>
                    </div>
                    <div>
                        <h5 class="text-sm font-bold">Update available</h5>
                        <h5>{{ booleanBadge(data.namelessmc.update_available) }}</h5>
                    </div>
                    <div>
                        <h5 class="text-sm font-bold">Last update check</h5>
                        <h2>{{ formatDate(data.namelessmc.update_checked) }}</h2>
                    </div>
                </div>
            </div>

            <!-- NamelessMC settings section -->
            <div v-if="loaded" class="rounded-lg bg-gray-100 shadow-lg">
                <div class="p-4 h-full bg-purple-300 mb-2 rounded-t-lg font-bold text-white">
                    NamelessMC settings
                </div>
                <div class="pt-2 pb-8 mb-8 grid grid-cols-4 gap-8 place-items-center items-center text-center align-middle">
                    <div>
                        <h5 class="text-sm font-bold">PHPMailer enabled</h5>
                        <h2>{{ booleanBadge(data.namelessmc.settings.phpmailer) }}</h2>
                    </div>
                    <div>
                        <h5 class="text-sm font-bold">API enabled</h5>
                        <h2>{{ booleanBadge(data.namelessmc.settings.api_enabled) }}</h2>
                    </div>
                    <div>
                        <h5 class="text-sm font-bold">API verification</h5>
                        <h2>{{ booleanBadge(data.namelessmc.settings.api_verification) }}</h2>
                    </div>
                    <div>
                        <h5 class="text-sm font-bold">Email verification enabled</h5>
                        <h2>{{ booleanBadge(data.namelessmc.settings.email_verification) }}</h2>
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
                        <h2>{{ booleanBadge(data.namelessmc.settings.captcha_login) }}</h2>
                    </div>
                    <div>
                        <h5 class="text-sm font-bold">Captcha on contact page</h5>
                        <h2>{{ booleanBadge(data.namelessmc.settings.captcha_contact) }}</h2>
                    </div>
                </div>
            </div>

            <!-- NamelessMC config section -->
            <div v-if="loaded" class="rounded-lg bg-gray-100 shadow-lg">
                <div class="p-4 h-full bg-green-300 mb-2 rounded-t-lg font-bold text-white">
                    NamelessMC config
                </div>
                <div class="pt-2 pb-8 mb-8 grid grid-cols-5 place-items-center items-center text-center align-middle">
                    <div>
                        <h5 class="text-sm font-bold">Path</h5>
                        <h2 v-html="isEmpty(data.namelessmc.config.path)"></h2>
                    </div>
                    <div>
                        <h5 class="text-sm font-bold">Friendly URLs</h5>
                        <h2>{{ booleanBadge(data.namelessmc.config.friendly) }}</h2>
                    </div>
                    <div>
                        <h5 class="text-sm font-bold">Force HTTPS</h5>
                        <h2>{{ booleanBadge(data.namelessmc.config.force_https) }}</h2>
                    </div>
                    <div>
                        <h5 class="text-sm font-bold">Force www</h5>
                        <h2>{{ booleanBadge(data.namelessmc.config.force_www) }}</h2>
                    </div>
                    <div>
                        <h5 class="text-sm font-bold">Allowed Proxies</h5>
                        <h2 v-html="isEmpty(data.namelessmc.config.allowed_proxies)"></h2>
                    </div>
                </div>
            </div>

            <!-- NamelessMC modules section -->
            <div v-if="loaded">
                <div class="rounded-lg p-4 h-full bg-pink-300 mb-2 rounded-t-lg shadow-lg font-bold text-white">
                    NamelessMC modules
                </div>
                <div class="pt-2 pb-8 mb-8 grid place-items-center" :class="gridColsClass(data.namelessmc.modules)">
                    <div v-for="module in data.namelessmc.modules" :key="module.name">
                        <div class="p-4 px-44 rounded-lg bg-gray-100 shadow-lg">
                            <h5 class="text-sm font-bold">{{ module.name }}</h5>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Enviroment section -->
            <div v-if="loaded" class="rounded-lg bg-gray-100 shadow-lg">
                <div class="p-4 h-full bg-blue-300 mb-2 rounded-t-lg font-bold text-white">
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
                        <h5 class="text-sm font-bold">Using offical Docker image</h5>
                        <h5>{{ booleanBadge(data.enviroment.offical_docker_image) }}</h5>
                    </div>
                </div>
            </div>

        </div>

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
            } finally {
                this.loading = false;
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
            return value ? 'Yes' : 'No';
        },
        isEmpty(value) {
            return value == undefined ? "<i>Empty</i>" : value;
        },
        gridColsClass(obj) {
            return `grid-cols-${Object.keys(obj).length}`;
        }
    },
}

</script>