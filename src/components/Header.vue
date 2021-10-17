<template>
    <div class="py-12 bg-yellow-400 shadow-lg">
        <div class="container mx-auto flex">
            <img :src="`${publicPath}logo.png`" alt="NamelessMC logo" class="h-20 mr-4">
            <h1 class="font-bold text-4xl text-gray-50">
                NamelessMC Debug Info
                <h3 v-if="loaded" class="text-2xl font-bold mb-3">Generated @ {{ formatDate(data.generated_at) }}</h3>
            </h1>
        </div>
    </div>
</template>

<script>
import functions from '../functions.js';

export default {
    created() {
        this.formatDate = functions.formatDate;
    },
    props: [
        'loaded',
        'data'
    ],
    data() {
        return {
            publicPath: process.env.BASE_URL,
        }
    },
}
</script>
