<template>
  <NamelessDebug/>
</template>

<script>
import NamelessDebug from './components/NamelessDebug.vue'

import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faSpinner,
  faDownload,
  faCogs,
  faWrench,
  faPuzzlePiece,
  faAddressBook,
  faSyncAlt,
  faPlug,
  faLink,
  faUserShield,
  faPaintBrush,
  faTachometerAlt,
  faServer,
  faFilePen,
  faSun,
  faMoon,
  faGlobe
} from '@fortawesome/free-solid-svg-icons'

library.add(
    faSpinner,
    faDownload,
    faCogs,
    faWrench,
    faPuzzlePiece,
    faAddressBook,
    faSyncAlt,
    faPlug,
    faLink,
    faUserShield,
    faPaintBrush,
    faTachometerAlt,
    faServer,
    faFilePen,
    faSun,
    faMoon,
    faGlobe,
)

export default {
    components: {
        NamelessDebug
    }
}
</script>
