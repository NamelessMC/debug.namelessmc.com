<template>
    <div v-if="loaded" class="rounded-lg bg-gray-100 shadow-lg">
        <div class="p-4 h-full bg-blue-400 mb-2 rounded-t-lg font-bold text-white">
            <font-awesome-icon icon="download"/> Version
        </div>
        <div class="pt-2 pb-8 mb-8 grid grid-cols-3 text-center">
            <div>
                <h5 class="text-sm font-bold">Version</h5>
                <h2 v-html="asCode(data.namelessmc.version)"></h2>
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
</template>

<script>
import functions from '../functions.js';

export default {
    created() {
        this.asCode = functions.asCode;
        this.booleanBadge = functions.booleanBadge;
        this.formatDate = functions.formatDate;
    },
    props: [
        'loaded',
        'data'
    ]
}
</script>
