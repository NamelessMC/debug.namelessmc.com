<template>
    <div v-if="loaded">
        <div class="rounded-lg p-4 h-full bg-blue-400 mb-2 rounded-t-lg shadow-lg font-bold text-white">
            <font-awesome-icon icon="paint-brush"/> Templates
        </div>
        <div class="pt-2 mb-8 grid gap-8" :class="gridColsClass(data.namelessmc.templates.front_end)">
            <div v-for="template in data.namelessmc.templates.front_end" :key="template.name">
                <div class="p-4 rounded-lg bg-gray-100 shadow-lg">
                    <h3 class="text-md font-bold text-center">
                        {{ template.name }} <span v-if="isOfficialTemplate(template.name)" v-html="officialBadge()"></span>
                    </h3>

                    <h5 class="text-sm font-bold">
                        Enabled: <span class="font-normal" v-html="booleanBadge(template.enabled)"></span>
                    </h5>

                    <h5 class="text-sm font-bold">
                        Is default: <span class="font-normal" v-html="booleanBadge(template.is_default)"></span>
                    </h5>

                    <h5 class="text-sm font-bold inline-block">
                        Author: <h5 class="inline-block font-normal text-base" v-html="template.author"></h5>
                    </h5>

                    <br>

                    <h5 class="text-sm font-bold inline-block">
                        NamelessMC version: <h5 class="inline-block font-normal text-base" v-html="asCode(template.namelessmc_version)"></h5>
                    </h5>

                    <br>

                    <h5 class="text-sm font-bold inline-block">
                        Version: <h5 class="inline-block font-normal text-base" v-html="asCode(template.template_version)"></h5>
                    </h5>
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
        this.isOfficialTemplate = functions.isOfficialTemplate;
        this.officialBadge = functions.officialBadge;
        this.booleanBadge = functions.booleanBadge;
        this.asCode = functions.asCode;
    },
    props: [
        'loaded',
        'data'
    ]
}
</script>