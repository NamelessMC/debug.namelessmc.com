<template>
    <div class="section-title-floating">
        <font-awesome-icon icon="paint-brush"/> {{ $t('templates_section.templates') }}
    </div>
    <div class="pt-2 mb-8 grid gap-8" :class="gridColsClass(data.namelessmc.templates.front_end)">
        <div v-for="template in data.namelessmc.templates.front_end" :key="template.name">
            <div class="section-content-floating">
                <h3 class="section-subheading">
                    {{ template.name }} <span v-if="isOfficialTemplate(template.name)" v-html="officialBadge()"></span>
                </h3>

                <h5 class="section-heading">
                    {{ $t('templates_section.enabled') }}: <span v-html="booleanBadge(template.enabled)"></span>
                </h5>

                <h5 class="section-heading">
                    {{ $t('templates_section.is_default') }}: <span v-html="booleanBadge(template.is_default)"></span>
                </h5>

                <h5 class="section-heading">
                    {{ $t('templates_section.author') }}: <span class="font-normal text-base" v-html="template.author"></span>
                </h5>

                <h5 class="section-heading">
                    {{ $t('templates_section.namelessmc_version') }}: <span v-html="asCode(template.namelessmc_version)"></span>
                </h5>

                <h5 class="section-heading">
                    {{ $t('templates_section.version') }}: <span v-html="asCode(template.template_version)"></span>
                </h5>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: [
        'data',
    ],
}
</script>
