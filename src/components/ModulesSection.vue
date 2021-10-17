<template>
    <div v-if="loaded">
        <div class="rounded-lg p-4 h-full bg-blue-400 mb-2 rounded-t-lg shadow-lg font-bold text-white">
            <font-awesome-icon icon="puzzle-piece"/> Modules
        </div>
        <div class="pt-2 mb-8 grid gap-8" :class="gridColsClass(data.namelessmc.modules)">
            <div v-for="module in data.namelessmc.modules" :key="module.name">
                <div class="p-4 rounded-lg bg-gray-100 shadow-lg">
                    <h3 class="text-md font-bold text-center">
                        {{ module.name }} <span v-if="isOfficialModule(module.name)" v-html="officialBadge()"></span>
                    </h3>

                    <h5 class="text-sm font-bold">
                        Enabled: <span class="font-normal" v-html="booleanBadge(module.enabled)"></span>
                    </h5>

                    <h5 class="text-sm font-bold inline-block">
                        Author: <h5 class="inline-block font-normal text-base" v-html="module.author"></h5>
                    </h5>

                    <br>

                    <h5 class="text-sm font-bold inline-block">
                        NamelessMC version: <h5 class="inline-block font-normal text-base" v-html="asCode(module.namelessmc_version)"></h5>
                    </h5>

                    <br>

                    <h5 class="text-sm font-bold inline-block">
                        Version: <h5 class="inline-block font-normal text-base" v-html="asCode(module.module_version)"></h5>
                    </h5>

                    <div v-if="isOfficialModule(module.name)">
                        <div v-if="module.name == 'Core'">
                            <div class="grid grid-cols-2">
                                <h5 class="text-sm font-bold">
                                    Minecraft Integration: <span class="font-normal" v-html="booleanBadge(module.debug_info.minecraft.mc_integration)"></span>
                                </h5>
                                <h5 class="text-sm font-bold">
                                    UUID Linking: <span class="font-normal" v-html="booleanBadge(module.debug_info.minecraft.uuid_linking)"></span>
                                </h5>
                                <h5 class="text-sm font-bold">
                                    Username Sync: <span class="font-normal" v-html="booleanBadge(module.debug_info.minecraft.username_sync)"></span>
                                </h5>
                                <h5 class="text-sm font-bold">
                                    Username Sync: <span class="font-normal" v-html="booleanBadge(module.debug_info.minecraft.username_sync)"></span>
                                </h5>
                            </div>
                        </div>
                        <div v-else-if="module.name == 'Forum'">
                            <!-- No specific debug info for Forum module *yet* -->
                        </div>
                        <div v-else-if="module.name == 'Discord Integration'">
                        </div>
                    </div>
                    <div v-else>
                        Debug Info:
                        <pre>{{ module.debug_info }}</pre>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import functions from '../functions.js';

export default {
    created() {
        this.gridColsClass = functions.gridColsClass;
        this.isOfficialModule = functions.isOfficialModule;
        this.officialBadge = functions.officialBadge;
        this.booleanBadge = functions.booleanBadge;
        this.asCode = functions.asCode;
    },
    props: [
        'loaded',
        'data'
    ],
}
</script>
