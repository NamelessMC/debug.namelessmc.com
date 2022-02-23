<template>
    <div class="section-title-floating">
        <font-awesome-icon icon="puzzle-piece"/> {{ $t('modules_section.modules') }}
    </div>
    <div class="pt-2 mb-8 grid gap-4 sm:grid-cols-1" :class="gridColsClass(data.namelessmc.modules)">
        <div v-for="module in data.namelessmc.modules" :key="module.name">
            <div class="section-content-floating h-full" :id="module.name">
                <div>
                    <h3 class="section-subheading">
                        {{ module.name }} <span v-if="isOfficialModule(module.name)" v-html="officialBadge()"></span>
                    </h3>

                    <h5 class="section-heading">
                        {{ $t('modules_section.enabled') }}: <span v-html="booleanBadge(module.enabled)"></span>
                    </h5>

                    <h5 class="section-heading">
                        {{ $t('modules_section.author') }}: <span class="font-normal text-base" v-html="module.author"></span>
                    </h5>

                    <h5 class="section-heading">
                        {{ $t('modules_section.namelessmc_version') }}: <span v-html="asCode(module.namelessmc_version)"></span>
                    </h5>

                    <h5 class="section-heading">
                        {{ $t('modules_section.version') }}: <span v-html="asCode(module.module_version)"></span>
                    </h5>
                </div>

                <div class="w-full text-center border-b-2 border-blue-400" style="height: 14px;">
                    <span class="bg-gray-100 dark:bg-gray-800 dark:text-gray-300 text-base">&nbsp;{{ $t('modules_section.debug_info') }}&nbsp;</span>
                </div>

                <div v-if="this.shouldShowDebugInfo(module.name)" class="pt-3">
                    <div v-if="module.name === 'Core'">
                        <h5 class="section-heading pb-1 text-center">{{ $t('modules_section.core.minecraft_integration') }}</h5>

                        <div class="grid grid-cols-2">
                            <h5 class="section-heading">
                                {{ $t('modules_section.core.integration_enabled') }}: <span v-html="booleanBadge(module.debug_info.minecraft.mc_integration)"></span>
                            </h5>
                            <h5 class="section-heading">
                                {{ $t('modules_section.core.uuid_linking') }}: <span v-html="booleanBadge(module.debug_info.minecraft.uuid_linking)"></span>
                            </h5>
                            <h5 class="section-heading">
                                {{ $t('modules_section.core.username_sync') }}: <span v-html="booleanBadge(module.debug_info.minecraft.username_sync)"></span>
                            </h5>
                            <h5 class="section-heading">
                                {{ $t('modules_section.core.external_query') }}: <span v-html="booleanBadge(module.debug_info.minecraft.external_query)"></span>
                            </h5>
                        </div>

                        <div v-if="module.debug_info.minecraft.servers.length > 0">
                            <h5 class="section-heading pb-1 text-center pt-1">{{ $t('modules_section.core.servers') }}</h5>
                              <div v-for="server in module.debug_info.minecraft.servers" :key="server.id" class="divide-y-2 divide-blue-400">
                                  <div>
                                      <div class="grid grid-cols-2 pb-1">
                                          <h5 class="section-heading">
                                              {{ $t('modules_section.core.id') }}: <span v-html="asCode(server.id)"></span>
                                          </h5>
                                          <h5 class="section-heading">
                                              {{ $t('modules_section.core.name') }}: <span class="font-normal text-base">{{ server.name }}</span>
                                          </h5>
                                      </div>
                                      <div class="grid grid-cols-2 pb-1">
                                          <h5 class="section-heading">
                                              {{ $t('modules_section.core.ip') }}: <span v-html="asCode(server.ip)"></span>
                                          </h5>
                                          <h5 class="section-heading">
                                              {{ $t('modules_section.core.query_ip') }}: <span v-html="asCode(server.query_ip)"></span>
                                          </h5>
                                      </div>
                                      <div class="grid grid-cols-2">
                                        <h5 class="section-heading">
                                            {{ $t('modules_section.core.port') }}: <span v-html="asCode(server.port)"></span>
                                        </h5>
                                        <h5 class="section-heading">
                                            {{ $t('modules_section.core.query_port') }}: <span v-html="asCode(server.query_port)"></span>
                                        </h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-else-if="module.name === 'Discord Integration'">
                        <div class="grid grid-cols-2">
                            <h5 class="section-heading">
                                {{ $t('modules_section.discord_integration.syncing_enabled') }}: <span v-html="booleanBadge(module.enabled && module.debug_info.guild_id && module.debug_info.bot_url)"></span>
                            </h5>
                            <h5 class="section-heading">
                                {{ $t('modules_section.discord_integration.guild_id') }}: <span v-html="isEmpty(module.debug_info.guild_id, true)"></span>
                            </h5>
                            <h5 class="section-heading">
                                {{ $t('modules_section.discord_integration.bot_setup') }}: <span v-html="booleanBadge(module.debug_info.bot_setup)"></span>
                            </h5>
                            <h5 class="section-heading">
                                {{ $t('modules_section.discord_integration.bot_url') }}: <span v-html="isEmpty(module.debug_info.bot_url)"></span>
                            </h5>
                            <!-- TODO: roles -->
                        </div>
                    </div>
                    <div v-else>
                        <pre class="text-normal">{{ module.debug_info }}</pre>
                    </div>
                </div>
                <div v-else class="pt-3">
                  <p class="text-normal italic">{{ $t('modules_section.no_debug_info') }}</p>
                </div>
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
        shouldShowDebugInfo(name) {
            return name === 'Core'
                || name === 'Discord Integration'
                || this.data.namelessmc.modules[name].debug_info.length > 0;
        },
    }
}
</script>
