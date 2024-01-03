<template>
  <div class="flex min-h-screen min-w-full">
    <div
      class="bg-sidebar-bg flex flex-col justify-between transition-all duration-700 h-screen !sticky left-0 top-0"
      :class="[
        { 'tw-col-[18%]': menuOpened },
        { 'tw-col-[0%] -translate-x-96': !menuOpened },
      ]"
    >
      <div class="relative w-full overflow-y-auto sidebar-scroll h-full">
        <div class="menu-header sticky top-0">
          <div class="p-6 bg-sidebar-bg">
            <nuxt-link to="/">
              <img class="h-8" :src="imgUrl" alt="Nebula GTS">
            </nuxt-link>
          </div>
          <div class="flex items-center ml-6 bg-sidebar-bg pb-4">
            <img :src="companyInfo.img" class="h-5 w-5 rounded-full mr-2" alt="Company logo">
            <span class="text-white text-c-1 font-normal mr-3">{{ companyInfo.name }}</span>
            <Icon icon="arrow-down-1" :size="20" color="gray" :alpha="100" class="w-5 h-5 mr-2" />
          </div>
          <div class="h-8 bg-gradient-to-b from-sidebar-bg" />
        </div>
        <div class="px-7 menu-items mb-14">
          <div v-for="(menuItem, index) in menuItems" :key="index">
            <div
              class="flex items-center"
              :class="[
                { 'exact-link-active': menuItem.submenu.some((w) => w.link === $router.currentRoute.fullPath) || menuItem.link === $router.currentRoute.fullPath}
              ]"
            >
              <nuxt-link :to="menuItem.link" class="flex items-center w-full menu-item pl-5 py-3 mb-1 rounded-lg transition-all hover:bg-indigo-900">
                <Icon
                  :icon="menuItem.icon"
                  :size="24"
                  color="green"
                  :alpha="400"
                  :variant="menuItem.variant"
                  class="w-6 h-6 mr-2"
                />
                <span class="text-white text-b-4 font-medium">{{ menuItem.name }}</span>
              </nuxt-link>

              <div class="ml-auto mr-5 w-5 h-5 z-[3] cursor-pointer" @click="onClick(menuItem)">
                <Icon
                  v-if="menuItem.submenu.length > 0 && menuItem.name === 'ELD'"
                  icon="arrow-down-1"
                  color="white"
                  :alpha="0"
                  class="w-5 h-5 transition-all duration-500"
                  :class="[
                    { 'rotate-180': expandeds.includes(menuItem) ||
                      menuItem.submenu.includes(w=> w.link === $router.currentRoute.fullPath) ||
                      menuItem.link === $router.currentRoute.fullPath},
                    { 'rotate-0': !expandeds.includes(menuItem) &&
                      !menuItem.submenu.includes(w=> w.link === $router.currentRoute.fullPath) },
                  ]"
                />
              </div>
            </div>
            <div v-if="menuItem.submenu.length > 0 && menuItem.name !== 'ELD'" class="sub-items">
              <nuxt-link
                v-for="(submenuItem, subIndex) in menuItem.submenu"
                :key="subIndex"
                :to="submenuItem.link"
                class="menu-item flex items-center ml-5 pl-5 py-2 mb-1 rounded-lg transition-all hover:bg-indigo-900"
              >
                <Icon
                  :icon="submenuItem.icon"
                  :size="20"
                  :color="$router.currentRoute.fullPath === submenuItem.link ? 'green' : 'gray'"
                  :alpha="$router.currentRoute.fullPath === submenuItem.link ? 400 : 200"
                  :variant="submenuItem.variant"
                  class="w-6 h-6 mr-2"
                />
                <span class="text-white text-c-1 font-normal">{{ submenuItem.name }}</span>
              </nuxt-link>
            </div>
            <transition name="slide">
              <div v-cloak v-show="expandeds.includes(menuItem)" class="sub-items">
                <nuxt-link
                  v-for="(submenuItem, subIndex) in menuItem.submenu"
                  :key="subIndex"
                  :to="submenuItem.link"
                  class="menu-item flex items-center ml-5 pl-5 py-2 mb-1 rounded-lg transition-all hover:bg-indigo-900"
                >
                  <Icon
                    :icon="submenuItem.icon"
                    :size="20"
                    :color="$router.currentRoute.fullPath === submenuItem.link ? 'green' : 'gray'"
                    :alpha="$router.currentRoute.fullPath === submenuItem.link ? 400 : 200"
                    :variant="submenuItem.variant"
                    class="w-6 h-6 mr-2"
                  />
                  <span class="text-white text-c-1 font-normal">{{ submenuItem.name }}</span>
                </nuxt-link>
              </div>
            </transition>
          </div>
        </div>
        <div class="menu-footer ml-1 mr-7 sticky bottom-0">
          <div class="h-8 bg-gradient-to-t" />
          <div class="bg-sidebar-bg">
            <div
              class=""
              @click="() => { opened = !opened }"
            >
              <div class="absolute top-5 right-0 cursor-pointer bg-sidebar-bg w-9 h-9 rounded-full">
                <div class="relative w-full h-full flex items-center justify-center">
                  <span class="text-white text-b-4">
                    <Icon
                      icon="arrow-circle-up"
                      :size="20"
                      color="gray"
                      :alpha="100"
                      class="w-6 h-6 transition-all duration-500"
                      :class="[
                        { 'rotate-0': !opened },
                        { 'rotate-180': opened },
                      ]"
                    />
                  </span>
                  <span
                    v-if="!opened"
                    class="absolute
                    -right-1
                    -top-1
                    text-[8px]
                    leading-4
                    font-semibold
                    text-sidebar-bg
                    w-4 h-4 min-h-[1rem] min-w-[1rem]
                    rounded-full
                    flex justify-center items-center
                    bg-red-600"
                  >
                    {{ totalCount }}</span>
                </div>
              </div>

              <transition name="slide">
                <div v-if="opened" class="">
                  <nuxt-link to="/carrier/dashboard/accounting/payables/task-reminders" class="flex items-center ml-2 pl-3 py-2 rounded-lg transition-all hover:bg-indigo-900">
                    <Icon
                      icon="task-square"
                      :size="20"
                      color="green"
                      :alpha="400"
                      variant="bulk"
                      class="w-6 h-6 mr-2"
                    />
                    <span class="text-white text-c-1 font-medium mr-2">Tasks</span>
                    <span
                      class="text-[8px] leading-4 font-semibold text-sidebar-bg w-4 h-4 rounded-full flex justify-center items-center bg-red-600"
                    >
                      {{ tasksCount }}</span>
                  </nuxt-link>
                  <nuxt-link to="/" class="flex items-center ml-2 pl-3 py-2 rounded-lg transition-all hover:bg-indigo-900">
                    <Icon
                      icon="notification"
                      :size="20"
                      color="green"
                      :alpha="400"
                      variant="bulk"
                      class="w-6 h-6 mr-2"
                    />
                    <span class="text-white text-c-1 font-medium mr-2">Notifications</span>
                    <span
                      class="text-[8px] leading-4 font-semibold text-sidebar-bg w-4 h-4 rounded-full flex justify-center items-center bg-red-600"
                    >
                      {{ notificationCount }}</span>
                  </nuxt-link>
                  <nuxt-link to="/carrier/dashboard/settings" class="flex items-center ml-2 pl-3 py-2 rounded-lg transition-all hover:bg-indigo-900">
                    <Icon
                      icon="setting-2"
                      :size="20"
                      color="green"
                      :alpha="400"
                      variant="bulk"
                      class="w-6 h-6 mr-2"
                    />
                    <span class="text-white text-c-1 font-medium">Settings</span>
                  </nuxt-link>
                  <button
                    class="flex items-center ml-2 pl-3 py-2 mb-2 rounded-lg transition-all hover:bg-indigo-900 w-full"
                    @click="logout"
                  >
                    <Icon
                      icon="login-1"
                      :size="20"
                      color="green"
                      :alpha="400"
                      variant="bulk"
                      class="w-6 h-6 mr-2"
                    />
                    <span class="text-white text-c-1 font-medium">Log Out</span>
                  </button>
                </div>
              </transition>
            </div>

            <div class="ml-2 my-1 py-3 px-4 rounded-lg transition-all hover:bg-indigo-900">
              <div class="flex">
                <img :src="userInfo.img" class="h-10 w-10 rounded-full mr-2" alt="Company logo">
                <div class="flex flex-col">
                  <span class="text-white text-b-4 font-medium">{{ userInfo.name }}</span>
                  <span class="text-gray-400 text-c-2 font-medium">{{ userInfo.role }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="relative transition-all"
      :class="[
        { 'tw-col-[82%]': menuOpened },
        { 'tw-col-[100%]': !menuOpened },
      ]"
    >
      <div
        class="absolute top-5 cursor-pointer bg-sidebar-bg w-9 h-9 rounded-full flex items-center justify-center"
        :class="[
          { 'left-0': !menuOpened },
          { '-left-4': menuOpened },
        ]"
        @click="toggleMenu(!menuOpened)"
      >
        <Icon
          icon="arrow-circle-left"
          color="white"
          :alpha="0"
          class="mx-2 w-6 h-6 transition-all duration-500"
          :class="[
            { 'rotate-180': !menuOpened },
            { 'rotate-0': menuOpened },
          ]"
        />
      </div>
      <div class="px-4 md:px-12">
        <transition name="fade" mode="in-out">
          <Nuxt />
        </transition>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { mapActions } from 'vuex'

import Cookies from 'js-cookie'
import menu from '@/static/menu'
import menuBroker from '@/static/menuBroker'
import menuEld from '@/static/menuEld'
import { $store } from '@/utils/store'
import { Menu } from '@/models/common/Menu'

export default {
  middleware: 'secureAuth',
  data () {
    return {
      imgUrl: '/images/Logo_White.png',
      companyInfo: {
        img: '/images/company_logo.png',
        name: 'Dirilis Group'
      },
      userInfo: {
        img: '/images/company_logo.png',
        name: 'Ellen Rose',
        role: 'Admin User'
      },
      brokerLogin: true,
      notificationCount: 20,
      tasksCount: 20,
      totalCount: 40,
      opened: false,
      expandeds: []
    }
  },
  computed: {
    menuOpened () {
      return this.$store.state.menuOpened
    },
    menuItems (): Menu[] {
      if (this.isBroker) {
        return menuBroker
      } else if (this.isELD) {
        return menuEld
      } else {
        return menu
      }
    },
    isBroker (): Boolean {
      if (this.$route.path.includes('/broker') && !this.$route.path.includes('/brokers')) {
        return true
      } else {
        return false
      }
    },
    isELD (): Boolean {
      if (this.$route.path.includes('/eld')) {
        return false
      } else {
        return false
      }
    },
    token () {
      return this.$store.state.token
    },
    secret () {
      return this.$store.state.secretKey
    }
  },
  created () {
    console.log(this.$route.path)
  },
  methods: {
    ...mapActions({
      toggleMenu: (action, param) => action('toggleMenu', param),
      setSecureAuth: (action, param) => action('setSecureAuth', param),
      getCarrier: (action, id) => action('carriers/getCarrier', id)
    }),
    async logout () {
      // Çerezleri temizle
      const cookieNames = Object.keys(Cookies.get())
      for (const cookieName of cookieNames) {
        Cookies.remove(cookieName)
      }

      // Çıkış işlemleri (örneğin, kullanıcıyı ana sayfaya yönlendir)
      await this.$auth.logout()
      setTimeout(() => {
        this.$router.push('/')
      }, 2000)
    },
    onClick (item:any) {
      if (this.expandeds.includes(item)) {
        this.expandeds = this.expandeds.filter((it: any) => it !== item)
      } else {
        this.expandeds.push(item)
      }
    },
    mounted () {
      this.menuItems.map((menuItem: Menu) => {
        if (menuItem.link === this.$router.currentRoute.fullPath || menuItem.submenu.some(a => a.link === this.$router.currentRoute.fullPath)) {
          this.expandeds.push(menuItem)
        }
        return menuItem
      })
      this.$store.dispatch('dispatchCarrier')
      console.log($store)
      // $store.dispatch('carriers/getCarrier', 1)
    }

  }

}
</script>

<style>
.menu-item.exact-link-active {
  @apply bg-indigo-900
}
</style>
