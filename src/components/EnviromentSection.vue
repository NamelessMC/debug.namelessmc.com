<template>
    <div v-if="loaded" class="rounded-lg bg-gray-100 shadow-lg">
        <div class="p-4 h-full bg-blue-400 mb-2 rounded-t-lg font-bold text-white">
            <font-awesome-icon icon="server"/> Enviroment
        </div>
        <div class="pt-2 pb-8 mb-8 grid grid-cols-4 text-center">
            <div>
                <h5 class="text-sm font-bold">PHP version</h5>
                <h2 v-html="asCode(data.enviroment.php_version)"></h2>
            </div>
            <div>
                <h5 class="text-sm font-bold">Host OS</h5>
                <h2>{{ data.enviroment.host_os }}</h2>
            </div>
            <div>
                <h5 class="text-sm font-bold">Host Kernel version</h5>
                <h2 v-html="asCode(data.enviroment.host_kernel_version)"></h2>
            </div>
            <div>
                <h5 class="text-sm font-bold">Using official Docker image</h5>
                <h5 v-html="booleanBadge(data.enviroment.official_docker_image)"></h5>
            </div>
        </div>
    </div>
</template>

<script>
import functions from '../functions.js';

export default {
    created() {
        this.asCode = functions.asCode;
        this.booleanBadge = functions.booleanBadge;
    },
    props: [
        'loaded',
        'data'
    ]
}
</script>