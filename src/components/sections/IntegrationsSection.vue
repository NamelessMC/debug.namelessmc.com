<template>
  <div class="section-background">
    <div class="section-title">
      <font-awesome-icon icon="plug"/> {{ $t('integrations_section.integrations') }}
    </div>
    <div class="section-content">
      <table class="table-container mx-4">
        <tr>
          <th class="table-title">{{ $t('integrations_section.name') }}</th>
          <th class="table-title">{{ $t('integrations_section.enabled') }}</th>
          <th class="table-title">{{ $t('integrations_section.can_unlink') }}</th>
          <th class="table-title">{{ $t('integrations_section.required') }}</th>
        </tr>
        <template v-if="Object.keys(this.data.namelessmc.integrations).length > 0">
          <tr v-for="integration in this.data.namelessmc.integrations" :key="integration">
            <td class="table-data">{{ integration.name }}</td>
            <td class="table-data" v-html="booleanBadge(integration.enabled)"></td>
            <td class="table-data" v-html="booleanValue(integration.can_unlink)"></td>
            <td class="table-data" v-html="booleanValue(integration.required)"></td>
          </tr>
        </template>
        <tr v-else>
          <td class="table-data" colspan="4">
            <i>{{ $t('integrations_section.no_integrations') }}</i>
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
}
</script>
