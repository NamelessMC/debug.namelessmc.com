<template>
    <div v-if="loading">
        <h1>Loading...</h1>
    </div>
    <div v-if="error">
        <h1>Error: {{ error }}</h1>
    </div>
    <div v-if="loaded">
        <h1>NamelessMC Version: {{ data.namelessmc.version }}</h1>
        <h2>Generated at: {{ data.generated_at }}</h2>
        <div>
            <h2 v-if="data.namelessmc.update_available">Update available</h2>
            <h2 v-else>No update available</h2>
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
        }
    },
}

</script>