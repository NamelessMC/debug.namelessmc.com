<template>
  <div class="section-background">
    <div class="section-title">
      <font-awesome-icon icon="user-shield"/> {{ $t('oauth_providers_section.oauth_providers') }}
    </div>
    <div class="section-content mx-4">
      <table class="table-container">
        <tr>
          <th class="table-title">{{ $t('oauth_providers_section.name') }}</th>
          <th class="table-title">{{ $t('oauth_providers_section.module') }}</th>
          <th class="table-title w-1/4">{{ $t('oauth_providers_section.class') }}</th>
          <th class="table-title">{{ $t('oauth_providers_section.user_id_name') }}</th>
          <th class="table-title">{{ $t('oauth_providers_section.scope_id_name') }}</th>
          <th class="table-title">{{ $t('oauth_providers_section.client_id') }}</th>
          <th class="table-title">{{ $t('oauth_providers_section.enabled') }}</th>
        </tr>
        <template v-if="Object.keys(this.data.namelessmc.oauth_providers).length > 0">
          <tr v-for="provider in this.data.namelessmc.oauth_providers" :key="provider">
            <td class="table-data">{{ capitalize(provider.provider_name) }}</td>
            <td class="table-data hover:underline cursor-pointer" @click="goToModule(provider.module)">{{ provider.module }}</td>
            <td class="table-data" v-html="asCode(provider.class, true)"></td>
            <td class="table-data" v-html="asCode(provider.user_id_name, true)"></td>
            <td class="table-data" v-html="asCode(provider.scope_id_name, true)"></td>
            <td class="table-data" v-html="isEmpty(provider.client_id, true)"></td>
            <td class="table-data" v-html="booleanValue(provider.enabled)"></td>
          </tr>
        </template>
        <tr v-else>
          <td class="table-data" colspan="8">
            <i>{{ $t('oauth_providers_section.no_providers') }}</i>
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
