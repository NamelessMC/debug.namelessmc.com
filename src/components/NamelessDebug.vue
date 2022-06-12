<template>
    <div class="bg-gray-200 dark:bg-gray-900 h-full" v-bind:class="{ 'h-screen': !loaded }">

        <div class="py-9 bg-yellow-400 dark:bg-indigo-900 shadow-lg">
            <div class="container mx-auto flex">
                <img :src="`${publicPath}logo.png`" alt="NamelessMC logo" class="h-20 mr-4">
                <div class="text-gray-50">
                    <h1 class="font-bold text-4xl">{{ $t('misc.header_title') }}</h1>
                    <p v-if="loaded" class="text-2xl font-bold">{{ $t('misc.generated_at', { time: formatDate(data.generated_at) }) }}</p>
                </div>
            </div>
        </div>

        <div class="container mx-auto pt-8">

            <div v-if="!loaded && !error">
                <div class="m-auto rounded-lg shadow-lg md:w-1/4 p-4 bg-gray-300 dark:bg-gray-500 mb-2 font-bold text-white">
                    {{ $t('misc.loading') }} <span class="float-right"><font-awesome-icon icon="spinner" spin size="lg"/></span>
                </div>
            </div>

            <div v-if="error">
                <div class="m-auto rounded-lg bg-red-400 dark:bg-red-500 shadow-lg w-1/3">
                    <div class="p-4 h-full bg-red-300 dark:bg-red-400 mb-2 rounded-t-lg font-bold text-white">
                        {{ $t('errors.error') }}
                    </div>
                    <div class="pt-2 pb-4 mb-8 pl-4 text-white" v-html="error"></div>
                </div>
            </div>

            <div v-if="loaded">

              <VersionSection :data="data" />

              <SettingsSection :data="data" />

              <ConfigSection :data="data" />

              <ModulesSection :data="data" />

              <GroupsSection :data="data" />

              <GroupSyncSection :data="data" />

              <IntegrationsSection :data="data" />

              <WebhooksSection :data="data" />

              <OAuthProvidersSection :data="data" />

              <div class="md:grid gap-4" :class="displayTemplatesSideBySide() ? 'grid-cols-2' : 'grid-cols-1'">
                <div>
                  <FrontEndTemplatesSection :data="data" />
                </div>
                <div>
                  <PanelTemplatesSection :data="data" />
                </div>
              </div>

              <LogsSection :data="data" />

              <EnvironmentSection :data="data" />

            </div>

        </div>

        <footer v-if="loaded" class="h-auto bg-yellow-400 dark:bg-indigo-900 text-center">
            <div class="container mx-auto grid md:grid-cols-3 sm:grid-cols-1 py-6">
                <div>
                    <h5 class="section-heading">{{ $t('footer.generated_by') }}: <img :alt="data.generated_by_name" v-if="data.generated_by_uuid" class="inline" :src="`https://crafthead.net/helm/${data.generated_by_uuid}/16`"> <span class="font-normal">{{ data.generated_by_name }}</span></h5>
                    <h5 class="section-heading">{{ $t('footer.namelessmc_version') }}: <span class="font-normal" v-html="this.asCode(data.namelessmc.version)"></span></h5>
                    <h5 class="section-heading">{{ $t('footer.raw_json') }}: <a :href="`https://bytebin.rkslot.nl/${key}`" target="_blank"><span class="font-normal">https://bytebin.rkslot.nl/{{ key }}</span></a></h5>
                </div>
                <div class="grid grid-cols-2 py-2">
                    <div>
                        <button @click="toggleTheme()" class="px-2 h-12 rounded-lg bg-gray-200 dark:bg-gray-900 text-black dark:text-gray-300 font-bold text-sm">
                          {{ $t('footer.theme') }} <font-awesome-icon :icon="this.theme === 'light' ? 'sun' : 'moon'" size="lg"/>
                        </button>
                    </div>
                    <div class="text-normal">
                        <font-awesome-icon icon="globe"/>
                        <select v-model="$i18n.locale" @change="saveLocale($event)" class="ml-2 p-2 h-12 rounded-md bg-gray-200 dark:bg-gray-900">
                            <option v-for="lang of $i18n.availableLocales" :key="lang" :value="lang">
                                {{ lang }}
                            </option>
                        </select>
                    </div>
                </div>
                <div>
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
// TODO: collapsable each section
// TODO: drag to reorder sections and store in localstorage
// TODO: dynamic og:description meta tag summary (version + date created?)

import axios from 'axios';

import VersionSection from './sections/VersionSection.vue';
import SettingsSection from './sections/SettingsSection.vue';
import ConfigSection from './sections/ConfigSection.vue';
import ModulesSection from './sections/ModulesSection.vue';
import GroupsSection from "@/components/sections/GroupsSection";
import GroupSyncSection from './sections/GroupSyncSection.vue';
import IntegrationsSection from "@/components/sections/IntegrationsSection";
import WebhooksSection from './sections/WebhooksSection.vue';
import EnvironmentSection from './sections/EnvironmentSection.vue';
import OAuthProvidersSection from './sections/OAuthProvidersSection';
import FrontEndTemplatesSection from './sections/FrontEndTemplatesSection.vue';
import PanelTemplatesSection from './sections/PanelTemplatesSection.vue';
import LogsSection from "@/components/sections/LogsSection";

export default {
    components: {
        VersionSection,
        SettingsSection,
        ConfigSection,
        ModulesSection,
        GroupsSection,
        GroupSyncSection,
        IntegrationsSection,
        WebhooksSection,
        OAuthProvidersSection,
        FrontEndTemplatesSection,
        PanelTemplatesSection,
        LogsSection,
        EnvironmentSection,
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
        },
    },
    methods: {
        async loadData() {
            if (this.key.length === 0) {
                this.error = this.$t('errors.no_id_provided');
            } else {
                try {
                    const { data } = await axios.get(`https://bytebin.rkslot.nl/${this.key}`);
                    this.data = data;

                    if (!this.data.generated_at) {
                        this.error = this.$t('errors.no_data_in_json');
                    } else if (this.data.namelessmc.version !== '2.0.0') {
                        this.error = this.$t('errors.invalid_namelessmc_version', {
                          required: '2.0.0',
                          version: this.data.namelessmc.version
                        });
                    } else {
                        this.loaded = true;
                    }

                } catch (err) {
                    this.error =  this.$t('errors.invalid_link_id');
                }
            }
        },
        displayTemplatesSideBySide() {
            return Object.keys(this.data.namelessmc.templates.front_end).length === 1
                    && Object.keys(this.data.namelessmc.templates.panel).length === 1;
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
            if (this.theme === 'light') {
                this.theme = 'dark';
            } else {
                this.theme = 'light';
            }

            localStorage.setItem('nmc-debug-theme', this.theme);

            this.renderTheme();
        },
        renderTheme() {
            if (this.theme === 'dark') {
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
        saveLocale(event) {
            window.localStorage.setItem('nmc-debug-locale', event.target.value);
        },
    },
}

</script>
