<template>
    <div class="bg-gray-200 h-full" v-bind:class="{ 'h-screen': !loaded }">

        <Header :loaded="loaded" :data="data"/>

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

            <VersionSection :loaded="loaded" :data="data"/>

            <SettingsSection :loaded="loaded" :data="data"/>

            <ConfigSection :loaded="loaded" :data="data"/>

            <ModulesSection :loaded="loaded" :data="data"/>

            <TemplatesSection :loaded="loaded" :data="data"/>

            <PanelTemplatesSection :loaded="loaded" :data="data"/>

            <EnviromentSection :loaded="loaded" :data="data"/>

        </div>

        <Footer :loaded="loaded" :data="data"/>

    </div>
</template>

<script>
// TODO: disk/ram total, usage
// TODO: something with php modules
// TODO: directories writable
// TODO: finish module debug info
// TODO: make font sizes match in modules and settings etc
// TODO: collapsable each section
// TODO: drag to reorder sections and store in localstorage
import axios from 'axios';

import Header from './components/Header.vue';
import VersionSection from './components/VersionSection.vue';
import SettingsSection from './components/SettingsSection.vue';
import ConfigSection from './components/ConfigSection.vue';
import ModulesSection from './components/ModulesSection.vue';
import TemplatesSection from './components/TemplatesSection.vue';
import PanelTemplatesSection from './components/PanelTemplatesSection.vue';
import EnviromentSection from './components/EnviromentSection.vue';
import Footer from './components/Footer.vue';

import { library } from '@fortawesome/fontawesome-svg-core'
import { faSpinner, faDownload, faCogs, faWrench, faPuzzlePiece, faPaintBrush, faTachometerAlt, faServer } from '@fortawesome/free-solid-svg-icons'

library.add(
    faSpinner,
    faDownload,
    faCogs,
    faWrench,
    faPuzzlePiece,
    faPaintBrush,
    faTachometerAlt,
    faServer,
)

export default {
    components: {
        Header,
        VersionSection,
        SettingsSection,
        ConfigSection,
        ModulesSection,
        TemplatesSection,
        PanelTemplatesSection,
        EnviromentSection,
        Footer
    },
    mounted() {
        this.loadData();
    },
    data() {
        return {
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
        },
    },
}
</script>
