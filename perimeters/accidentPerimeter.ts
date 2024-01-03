import { createPerimeter } from 'vue-kindergarten'

import { $store } from '@/utils/store'

export default createPerimeter({
  purpose: 'accident',
  can: {
    read: () => {
      console.log('testtt', $store.state.currentUser)
      return $store.state.currentUser?.permissions.find((w: { route: string }) => w.route === 'accidents').can_read ?? false
    },
    write: () => {
      return $store.state.currentUser?.permissions.find((w: { route: string }) => w.route === 'accidents').can_write ?? false
    }
  }
})
