<template>
    <div class="section-background">
        <div class="section-title">
            <font-awesome-icon icon="server"/> {{ $t('environment_section.environment') }}
        </div>
        <div class="section-content grid-cols-4 gap-8">
            <div>
                <h5 class="section-heading">{{ $t('environment_section.php_version') }}</h5>
                <h2 v-html="asCode(data.environment.php_version)"></h2>
            </div>
            <div>
                <h5 class="section-heading">{{ $t('environment_section.host_os') }}</h5>
                <h2 class="text-normal">{{ data.environment.host_os }}</h2>
            </div>
            <div>
                <h5 class="section-heading">{{ $t('environment_section.host_kernel_version') }}</h5>
                <h2 v-html="asCode(data.environment.host_kernel_version)"></h2>
            </div>
            <div>
                <h5 class="section-heading">{{ $t('environment_section.using_docker_image') }}</h5>
                <h5 v-html="booleanValue(data.environment.official_docker_image)"></h5>
            </div>
            <div>
                <h5 class="section-heading">{{ $t('environment_section.disk_usage') }}</h5>
                <h2 class="text-normal" v-html="humanFileSize(data.environment.disk_total_space - data.environment.disk_free_space) + ' / ' + humanFileSize(data.environment.disk_total_space)"></h2>
            </div>
            <div>
                <h5 class="section-heading">{{ $t('environment_section.ram_usage') }}</h5>
                <h5 class="text-normal" v-html="humanFileSize(data.environment.memory_used_space) + ' / ' + data.environment.memory_total_space"></h5>
            </div>
            <div>
                <h5 class="section-heading">{{ $t('environment_section.config_writable') }}</h5>
                <h5 v-html="booleanBadge(data.environment.config_writable)"></h5>
            </div>
            <div>
                <h5 class="section-heading">{{ $t('environment_section.cache_writable') }}</h5>
                <h5 v-html="booleanBadge(data.environment.cache_writable)"></h5>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: [
        'data',
    ],
    methods: {
        humanFileSize(bytes) {
            if (bytes === 0) {
                return '0 B';
            }
            const k = 1024;
            const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
            const i = Math.floor(Math.log(bytes) / Math.log(k));
            return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
        },
    }
}
</script>
