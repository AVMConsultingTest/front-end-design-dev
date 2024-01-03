import Vue from 'vue'
import VueKindergarten from 'vue-kindergarten'

import { $store } from '~/utils/store'

Vue.use(VueKindergarten, {
  child: () => $store.currentUser
})
