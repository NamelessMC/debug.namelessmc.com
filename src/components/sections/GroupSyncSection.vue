<template>
    <div class="section-title-floating">
        <font-awesome-icon icon="sync-alt"/> {{ $t('group_sync_section.group_sync') }}
    </div>
     <div class="pt-2 mb-8 grid gap-4 md:grid-cols-2 sm:grid-cols-1">
        <div class="section-content-floating">
            <h3 class="section-subheading">{{ $t('group_sync_section.injectors') }}</h3>
            <table class="table-container">
                <tr>
                    <th class="table-title">{{ $t('group_sync_section.name') }}</th>
                    <th class="table-title">{{ $t('group_sync_section.enabled') }}</th>
                    <th class="table-title">{{ $t('group_sync_section.module') }}</th>
                    <th class="table-title">{{ $t('group_sync_section.column_name') }}</th>
                </tr>
                <tr v-for="injector in this.injectors()" :key="injector">
                    <td class="table-data">
                        {{ injector.name }}
                    </td>
                    <td v-html="booleanBadge(injector.enabled)"/>
                    <td class="table-data">
                        {{ injector.module }}
                    </td>
                    <td v-html="asCode(injector.column_name)" class="table-data"/>
                </tr>
            </table>
        </div>
        <div class="section-content-floating">
            <h3 class="section-subheading">{{ $t('group_sync_section.rules') }}</h3>
            <table class="table-container">
                <tr>
                    <th class="table-title">ID</th>
                    <th v-for="injector in this.injectors()" :key="injector" class="table-title">
                        {{ injector.name }}
                    </th>
                </tr>
                <tr v-for="rule in this.rules()" :key="rule">
                    <td class="table-data">
                        {{ rule.id }}
                    </td>
                    <td v-for="injector in this.injectors()" :key="injector" class="table-data">
                        <span v-if="injector.column_name == 'website_group_id'">
                            {{ this.getWebsiteGroupName(rule[injector.column_name]) + ' (' + rule[injector.column_name] + ')' }}
                        </span>
                        <span v-else v-html="isEmpty(rule[injector.column_name])"></span>
                    </td>
                </tr>
            </table> 
        </div>
     </div>
</template>

<script>
export default {
    props: [
        'data',
    ],
    methods: {
        injectors() {
            return this.data.namelessmc.settings.group_sync.injectors;
        },
        rules() {
            return this.data.namelessmc.settings.group_sync.rules;
        },
        getWebsiteGroupName(id) {
            return this.data.namelessmc.groups[id].name;
        }
    }
}
</script>