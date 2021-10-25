<template>
  <Debug/>
</template>

<script>
import Debug from './components/Debug.vue'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faSpinner, faDownload, faCogs, faWrench, faPuzzlePiece, faPaintBrush, faTachometerAlt, faServer, faGlobe } from '@fortawesome/free-solid-svg-icons'

library.add(
    faSpinner,
    faDownload,
    faCogs,
    faWrench,
    faPuzzlePiece,
    faPaintBrush,
    faTachometerAlt,
    faServer,
    faGlobe,
)

export default {
    components: {
        Debug
    }
}
</script>
