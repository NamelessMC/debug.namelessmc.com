<template>
      <div class="section-title-floating">
          <font-awesome-icon icon="link"/> {{ $t('webhooks_section.webhooks') }}
      </div>
      <div class="pt-2 mb-8 grid gap-4 lg:grid-cols-2 md:grid-cols-1">
          <div class="section-content-floating">
              <h3 class="section-subheading">{{ $t('webhooks_section.hooks') }}</h3>
              <table class="table-container">
                  <tr>
                      <th class="table-title w-1/6">{{ $t('webhooks_section.id') }}</th>
                      <th class="table-title">{{ $t('webhooks_section.name') }}</th>
                      <th class="table-title">{{ $t('webhooks_section.type') }}</th>
                      <th class="table-title">{{ $t('webhooks_section.events') }}</th>
                  </tr>
                  <tr v-for="hook in this.data.namelessmc.settings.webhooks.hooks" :key="hook">
                      <td class="table-data">{{ hook.id }}</td>
                      <td class="table-data">{{ hook.name }}</td>
                      <td class="table-data">{{ this.getTypeById(hook.action) }}</td>
                      <td class="table-data">
                          <p v-for="event in hook.events" :key="event" v-html="asCode(event)"></p>
                      </td>
                  </tr>
              </table>
          </div>
          <div class="section-content-floating">
              <h3 class="section-subheading">{{ $t('webhooks_section.forum_hooks') }}</h3>
              <table class="table-container">
                  <tr>
                      <th class="table-title w-1/6">{{ $t('webhooks_section.forum_id') }}</th>
                      <th class="table-title">{{ $t('webhooks_section.forum_title') }}</th>
                      <th class="table-title">{{ $t('webhooks_section.hooks') }}</th>
                  </tr>
                  <tr v-for="forum_hook in this.data.namelessmc.settings.webhooks.forum_hooks" :key="forum_hook">
                      <td class="table-data">{{ forum_hook.forum_id }}</td>
                      <td class="table-data">{{ forum_hook.title }}</td>
                      <td class="table-data">
                          <p v-for="hook in forum_hook.hooks" :key="hook" v-html="asCode(this.getHookNameById(hook))"></p>
                      </td>
                  </tr>
              </table>
          </div>
      </div>
</template>

<script>
export default {
    created() {
        console.log(this.data.namelessmc.settings.webhooks.hooks.length);
    },
    props: [
        'data',
    ],
    methods: {
        getTypeById(id) {
            return this.data.namelessmc.settings.webhooks.actions[id];
        },
        getHookNameById(id) {
            return this.data.namelessmc.settings.webhooks.hooks[id].name;
        },
    },
}
</script>

