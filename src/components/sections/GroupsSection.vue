<template>
  <div class="section-background">
    <div class="section-title">
      <font-awesome-icon icon="address-book"/> {{ $t('groups_section.groups') }}
    </div>
    <div class="section-content mx-4">
      <table class="table-container">
        <tr>
          <th class="table-title">{{ $t('groups_section.id') }}</th>
          <th class="table-title">{{ $t('groups_section.name') }}</th>
          <th class="table-title">{{ $t('groups_section.group_html') }}</th>
          <th class="table-title">{{ $t('groups_section.can_view_staff_cp') }}</th>
          <th class="table-title">{{ $t('groups_section.staff') }}</th>
          <th class="table-title">{{ $t('groups_section.default') }}</th>
          <th class="table-title">{{ $t('groups_section.order') }}</th>
          <th class="table-title">{{ $t('groups_section.force_tfa') }}</th>
        </tr>
        <template v-if="Object.keys(this.data.namelessmc.groups).length > 0">
          <tr v-for="group in this.data.namelessmc.groups" :key="group">
            <td class="table-data">{{ group.id }}</td>
            <td class="table-data">{{ group.name }}</td>
            <td class="table-data" v-html="asCode(group.group_html, true)"></td>
            <td class="table-data" v-html="booleanValue(group.admin_cp)"></td>
            <td class="table-data" v-html="booleanValue(group.staff)"></td>
            <td class="table-data" v-html="booleanValue(group.default_group)"></td>
            <td class="table-data">{{ group.order }}</td>
            <td class="table-data" v-html="booleanBadge(group.force_tfa)"></td>
          </tr>
        </template>
        <tr v-else>
          <td class="table-data" colspan="8">
            <i>{{ $t('groups_section.no_groups') }}</i>
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
