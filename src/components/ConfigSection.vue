<template>
    <div v-if="loaded" class="rounded-lg bg-gray-100 shadow-lg">
        <div class="p-4 h-full bg-blue-400 mb-2 rounded-t-lg font-bold text-white">
            <font-awesome-icon icon="wrench"/> Config
        </div>
        <div class="pt-2 pb-8 mb-8 grid grid-cols-5 text-center">
            <div>
                <h5 class="text-sm font-bold">Path</h5>
                <h2 v-html="isEmpty(data.namelessmc.config.path, true)"></h2>
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
                <h2 v-html="isEmpty(data.namelessmc.config.allowed_proxies, true)"></h2>
            </div>
        </div>
    </div>
</template>

<script>
import functions from '../functions.js';

export default {
    created() {
        this.isEmpty = functions.isEmpty;
        this.booleanBadge = functions.booleanBadge;
    },
    props: [
        'loaded',
        'data'
    ],
}
</script>
