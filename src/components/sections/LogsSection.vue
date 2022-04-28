<template>
  <div class="section-background">
    <div class="section-title">
      <font-awesome-icon icon="file-pen"/> {{ $t('logs_section.logs') }}
    </div>
    <div class="section-content grid grid-cols-1 gap-y-4">
      <div v-for="(content, type) of data.logs" :key="type">
        <p class="text-normal text-left pl-4 font-medium">{{ $t(`logs_section.${type}_log`) }}</p>
        <highlightjs
            class="log-content"
            language="log"
            :code="content ? content : $t('logs_section.empty_log')"
        />
      </div>
    </div>
  </div>
</template>

<script>
import hljs from 'highlight.js/lib/core';
import log from 'highlight.js/lib/languages/accesslog';
import hljsVuePlugin from "@highlightjs/vue-plugin";
import 'highlight.js/styles/github-dark-dimmed.css';

export default {
  props: [
    'data',
  ],
  components: {
    highlightjs: hljsVuePlugin.component
  },
  beforeMount() {
    hljs.registerLanguage('log', log);
  }
}
</script>
