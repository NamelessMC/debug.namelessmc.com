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
                <div class="m-auto rounded-lg shadow-lg w-1/3 p-4 bg-indigo-300 mb-2 font-bold text-white">
                    Loading...
                </div>
            </div>

            <div v-if="error">
                <div class="m-auto rounded-lg bg-red-400 shadow-lg w-1/3">
                    <div class="p-4 h-full bg-red-300 mb-2 rounded-t-lg font-bold text-white">
                        Error
                    </div>
                    <div class="pt-2 pb-4 mb-8 pl-4 text-white">
                        {{ error }}
                    </div>
                </div>
            </div>

            <!-- NamelessMC version section -->
            <div v-if="loaded" class="rounded-lg bg-gray-100 shadow-lg">
                <div class="p-4 h-full bg-red-300 mb-2 rounded-t-lg font-bold text-white">
                    NamelessMC version
                </div>
                <div class="pt-2 pb-8 mb-8 grid grid-cols-3 gap-4 place-items-center items-center text-center align-middle">
                    <div>
                        <h5 class="text-sm font-bold">Version</h5>
                        <h2>{{ data.namelessmc.version }}</h2>
                    </div>
                    <div>
                        <h5 class="text-sm font-bold">Update available</h5>
                        <div>
                            <h5 v-if="data.namelessmc.update_available">Yes</h5>
                            <h2 v-else>No</h2>
                        </div>
                    </div>
                    <div>
                        <h5 class="text-sm font-bold">Last update check</h5>
                        <h2>{{ formatDate(data.namelessmc.update_checked) }}</h2>
                    </div>
                </div>
            </div>

            <!-- Enviroment section -->
            <div v-if="loaded" class="rounded-lg bg-gray-100 shadow-lg">
                <div class="p-4 h-full bg-blue-300 mb-2 rounded-t-lg font-bold text-white">
                    Enviroment
                </div>
                <div class="pt-2 pb-8 mb-8 grid grid-cols-4 gap-4 place-items-center items-center text-center align-middle">
                    <div>
                        <h5 class="text-sm font-bold">PHP Version</h5>
                        <h2>{{ data.enviroment.php_version }}</h2>
                    </div>
                    <div>
                        <h5 class="text-sm font-bold">Host OS</h5>
                        <h2>{{ data.enviroment.host_os }}</h2>
                    </div>
                    <div>
                        <h5 class="text-sm font-bold">Host Kernel Version</h5>
                        <h2>{{ data.enviroment.host_kernel_version }}</h2>
                    </div>
                    <div>
                        <h5 class="text-sm font-bold">Using offical Docker image</h5>
                        <div>
                            <h5 v-if="data.enviroment.offical_docker_image">Yes</h5>
                            <h2 v-else>No</h2>
                        </div>
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
                    this.error = 'Invalid URL';
                } else {
                    this.loaded = true;
                }

            } catch (err) {
                this.error = err.message;
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
        }
    },
}

</script>