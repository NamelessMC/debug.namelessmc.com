<template>
    <div class="bg-gray-200 dark:bg-gray-900 h-full" v-bind:class="{ 'h-screen': !loaded }">

        <div class="py-9 bg-yellow-400 dark:bg-indigo-900 shadow-lg">
            <div class="container mx-auto flex">
                <img :src="`${publicPath}logo.png`" alt="NamelessMC logo" class="h-20 mr-4">
                <h1 class="font-bold text-4xl text-gray-50">
                      {{ $t('misc.header_title') }}
                    <h3 v-if="loaded" class="text-2xl font-bold mb-3">{{ $t('misc.generated_at', { time: formatDate(data.generated_at) }) }}</h3>
                </h1>
            </div>
        </div>

        <div class="container mx-auto pt-8">

            <div v-if="!loaded && !error">
                <div class="m-auto rounded-lg shadow-lg md:w-1/4 p-4 bg-gray-300 dark:bg-gray-500 mb-2 font-bold text-white">
                    {{ $t('misc.loading') }} <span class="float-right"><font-awesome-icon icon="spinner" spin size="lg"/></span>
                </div>
            </div>

            <div v-if="error">
                <div class="m-auto rounded-lg bg-red-400 shadow-lg w-1/3">
                    <div class="p-4 h-full bg-red-300 mb-2 rounded-t-lg font-bold text-white">
                        {{ $t('errors.error') }}
                    </div>
                    <div class="pt-2 pb-4 mb-8 pl-4 text-white" v-html="error"></div>
                </div>
            </div>

            <!-- NamelessMC version section -->
            <VersionSection v-if="loaded" :data="data" />

            <!-- NamelessMC settings section -->
            <SettingsSection v-if="loaded" :data="data" />

            <!-- NamelessMC config section -->
            <ConfigSection v-if="loaded" :data="data" />

            <!-- NamelessMC modules section -->
            <ModulesSection v-if="loaded" :data="data" />

            <!-- NamelessMC front end templates section -->
            <FrontEndTemplatesSection v-if="loaded" :data="data" />

            <!-- NamelessMC panel templates section -->
            <PanelTemplatesSection v-if="loaded" :data="data" />

            <!-- Enviroment section -->
            <EnviromentSection v-if="loaded" :data="data" />

        </div>

        <footer v-if="loaded" class="md:h-28 bg-yellow-400 dark:bg-indigo-900 text-center">
            <div class="grid md:grid-cols-4 sm:grid-cols-1 py-6">
                <div class="xl:-mr-48">
                    <h5 class="section-heading">{{ $t('footer.debug_log_version') }}: <span class="font-normal" v-html="this.asCode(data.debug_version)"></span></h5>
                    <h5 class="section-heading">{{ $t('footer.generated_by') }}: <img v-if="data.generated_by_uuid" class="inline" :src="`https://crafthead.net/helm/${data.generated_by_uuid}/16`"> <span class="font-normal">{{ data.generated_by_name }}</span></h5>
                    <h5 class="section-heading">{{ $t('footer.raw_json') }}: <a :href="`https://paste.rkslot.nl/${key}`" target="_blank"><span class="font-normal">https://paste.rkslot.nl/{{ key }}</span></a></h5>
                </div>
                <div>
                    <button @click="toggleTheme()" class="px-2 h-12 rounded-lg bg-gray-200 dark:bg-gray-900 text-black dark:text-gray-200 font-bold text-sm">{{ $t('footer.theme', { theme: capitalize(this.theme) }) }}</button>
                </div>
                <div class="text-normal">
                    <font-awesome-icon icon="globe"/>
                    <select v-model="$i18n.locale" class="ml-2 p-2 h-12 rounded-md bg-gray-200 dark:bg-gray-900">
                        <option v-for="lang of $i18n.availableLocales" :key="lang" :value="lang">
                            {{ lang }}
                        </option>
                    </select>
                </div>
                <div class="xl:-ml-48">
                    <h5 class="section-heading">{{ $t('footer.namelessmc_website') }}: <a href="https://namelessmc.com" target="_blank"><span class="font-normal">https://namelessmc.com</span></a></h5>
                    <h5 class="section-heading">{{ $t('footer.get_support') }}: <a href="https://discord.gg/nameless" target="_blank"><span class="font-normal">https://discord.gg/nameless</span></a></h5>
                    <h5 class="section-heading">{{ $t('footer.made_with_love') }}</h5>
                </div>
            </div>
        </footer>

    </div>
</template>

<script>

// TODO: something with php modules
// TODO: group sync rules
// TODO: finish module debug info
// TODO: display templates+panel templates side by side if there is only 1 of each
// TODO: collapsable each section
// TODO: drag to reorder sections and store in localstorage
// TODO: latest php error in dropdown <pre></pre>

import axios from 'axios';

import VersionSection from './VersionSection.vue';
import SettingsSection from './SettingsSection.vue';
import ConfigSection from './ConfigSection.vue';
import ModulesSection from './ModulesSection.vue';
import EnviromentSection from './EnviromentSection.vue';
import FrontEndTemplatesSection from './FrontEndTemplatesSection.vue';
import PanelTemplatesSection from './PanelTemplatesSection.vue';

export default {
    components: {
        VersionSection,
        SettingsSection,
        ConfigSection,
        ModulesSection,
        FrontEndTemplatesSection,
        PanelTemplatesSection,
        EnviromentSection,
    },
    mounted() {
        this.setDefaultTheme();
        this.renderTheme();
        this.listenForThemeChanges();
        this.loadData();
    },
    data() {
        return {
            loaded: false,
            error: null,
            data: null,
            publicPath: process.env.BASE_URL,
            theme: null,
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
                this.error = this.$t('errors.no_id_provided');
            } else {
                try {
                    const { data } = await axios.get(`https://paste.rkslot.nl/raw/${this.key}`);
                    this.data = data;

                    if (!this.data.generated_at) {
                        this.error = this.$t('errors.no_data_in_json');
                    } else if (this.data.debug_version != 1) {
                        this.error = this.$t('errors.invalid_debug_version', { version: this.data.debug_version });
                    } else {
                        this.loaded = true;
                    }

                } catch (err) {
                    this.error = this.$t('errors.invalid_link_id');
                }
            }
        },
        setDefaultTheme(forcedTheme = null) {
            let theme = 'light';

            if (forcedTheme != null) {
                theme = forcedTheme;
                localStorage.setItem('nmc-debug-theme', forcedTheme);
            } else {
                if (localStorage.getItem('nmc-debug-theme') != null) {
                    theme = localStorage.getItem('nmc-debug-theme');
                } else if (window.matchMedia) {
                    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                        theme = 'dark';
                    }
                }
            }

            this.theme = theme;
        },
        toggleTheme() {
            if (this.theme == 'light') {
                this.theme = 'dark';
            } else {
                this.theme = 'light';
            }

            localStorage.setItem('nmc-debug-theme', this.theme);

            this.renderTheme();
        },
        renderTheme() {
            if (this.theme == 'dark') {
                document.documentElement.classList.add('dark');
            } else {
                document.documentElement.classList.remove('dark');
            }
        },
        listenForThemeChanges() {
            if (window.matchMedia) {
                window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
                    this.setDefaultTheme(
                        window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
                    );
                    this.renderTheme();
                });
            }
        },
    },
}

</script>