import { createPerimeter } from 'vue-kindergarten'
import { $store } from '@/utils/store'

export default createPerimeter({
  purpose: 'base',
  can: {
    isAdmin: () => {
      return $store.state.currentUser?.is_owner ?? false
    }
  }
})
