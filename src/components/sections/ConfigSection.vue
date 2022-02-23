<template>
    <div class="section-background">
        <div class="section-title">
            <font-awesome-icon icon="wrench"/> {{ $t('config_section.config') }}
        </div>
        <div class="section-content grid-cols-5">
            <div>
                <h5 class="section-heading">{{ $t('config_section.path') }}</h5>
                <h2 v-html="isEmpty(data.namelessmc.config.path, true)"></h2>
            </div>
            <div>
                <h5 class="section-heading">{{ $t('config_section.friendly_urls') }}</h5>
                <h2 v-html="booleanBadge(data.namelessmc.config.friendly)"></h2>
            </div>
            <div>
                <h5 class="section-heading">{{ $t('config_section.force_https') }}</h5>
                <h2 v-html="booleanBadge(data.namelessmc.config.force_https)"></h2>
            </div>
            <div>
                <h5 class="section-heading">{{ $t('config_section.force_www') }}</h5>
                <h2 v-html="booleanValue(data.namelessmc.config.force_www)"></h2>
            </div>
            <div>
                <h5 class="section-heading">{{ $t('config_section.allowed_proxies') }}</h5>
                <h2 v-html="isEmpty(data.namelessmc.config.allowed_proxies, true)"></h2>
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
