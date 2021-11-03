<template>
    <div class="section-background">
        <div class="section-title">
            <font-awesome-icon icon="download"/> {{ $t('version_section.version') }}
        </div>
        <div class="section-content grid-cols-3">
            <div>
                <h5 class="section-heading">{{ $t('version_section.version') }}</h5>
                <h2 v-html="asCode(data.namelessmc.version)"></h2>
            </div>
            <div>
                <h5 class="section-heading">{{ $t('version_section.update_available') }}</h5>
                <h5 v-html="booleanBadge(data.namelessmc.update_available)"></h5>
            </div>
            <div>
                <h5 class="section-heading">{{ $t('version_section.last_update_check') }}</h5>
                <h2 class="text-normal">{{ formatDate(data.namelessmc.update_checked) }}</h2>
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

