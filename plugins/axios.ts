import https from 'https'
import { Plugin } from '@nuxt/types'

import { NuxtAxiosInstance } from '@nuxtjs/axios'
import { Store } from 'vuex'
import { NuxtRuntimeConfig } from '@nuxt/types/config/runtime'
import { initializeAxios } from '~/utils/api'
import { injectStore } from '~/utils/store'
import { refreshAccessToken } from '~/services/auth'
import { StoreState } from '~/store'

interface AxiosPlugin {
  $axios: NuxtAxiosInstance,
  store: Store<StoreState>
  isDev: boolean,
  $config: NuxtRuntimeConfig
}

const accessor: Plugin = ({ $axios, store, isDev }: AxiosPlugin) => {
  initializeAxios($axios)
  injectStore(store)
  console.log(isDev)

  if (isDev) {
    https.globalAgent = new https.Agent({
      rejectUnauthorized: false
    })
  }
  $axios.onRequest((config) => {
    const { token } = store.state
    if (token) {
      config.headers.common.Authorization = `Bearer ${token}`
      console.log(token)
    }
  })

  $axios.onResponseError((error) => {
    const { token } = store.state
    console.log('axios error:', error)
    if (error?.code && error.code === '401') {
      refreshAccessToken(token).then((token) => {
        error.config.headers.common.Authorization = `Bearer ${token}`
        console.log('refresh token success')
        return $axios.request(error.config) // retry
      }).catch((err) => {
        console.log('refresh token error', err)
      })
    }
  })
}

export default accessor
