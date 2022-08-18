interface Props {
    loaded: boolean;
    generatedByUuid: string;
    generatedByName: string;
    namelessMcVersion: string;
    key: string;
    theme: 'light' | 'dark';
}

function Footer({
    loaded,
    generatedByUuid,
    generatedByName,
    namelessMcVersion,
    key,
    theme,
}: Props) {
    return (
        <footer v-if="loaded" className="h-auto bg-yellow-400 dark:bg-indigo-900 text-center">
            <div className="container mx-auto grid md:grid-cols-3 sm:grid-cols-1 py-6">
                <div>
                    <h5 className="section-heading">
                        {{ $t('footer.generated_by') }}:
                        { generatedByUuid &&
                            <img alt={generatedByName} className="inline" src={`https://crafthead.net/helm/${generatedByUuid}/16`}>
                        }
                        <span className="font-normal">
                            { generatedByName }
                        </span>
                    </h5>
                    <h5 class="section-heading">
                        {{ $t('footer.namelessmc_version') }}:
                        <span className="font-normal" v-html="this.asCode(data.namelessmc.version)"></span>
                    </h5>
                    <h5 class="section-heading">
                        {{ $t('footer.raw_json') }}:
                        <a :href="`https://bytebin.rkslot.nl/${key}`" target="_blank">
                            <span class="font-normal">https://bytebin.rkslot.nl/{{ key }}</span>
                        </a>
                    </h5>
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
                    <h5 class="section-heading">
                        {{ $t('footer.namelessmc_website') }}:
                        <a href="https://namelessmc.com" target="_blank">
                            <span class="font-normal">
                                https://namelessmc.com
                            </span>
                        </a>
                    </h5>
                    <h5 class="section-heading">
                        {{ $t('footer.get_support') }}:
                        <a href="https://discord.gg/nameless" target="_blank">
                            <span class="font-normal">
                                https://discord.gg/nameless
                            </span>
                        </a>
                    </h5>
                    <h5 class="section-heading">
                        {{ $t('footer.made_with_love') }}
                    </h5>
                </div>
            </div>
        </footer>
    )
}
