<template>
  <div class="flex min-h-screen min-w-full flex-col">
    <LandingHeader container-class="absolute left-0 right-0" />
    <transition name="fade" mode="in-out">
      <Nuxt />
    </transition>
    <LandingFooter />
  </div>
</template>

<script lang="ts">
import { mapActions } from 'vuex'

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
  methods: {
    ...mapActions({
      toggleMenu: (action, param) => action('toggleMenu', param),
      getCarrier: (action, id) => action('carriers/getCarrier', id)
    }),
    onClick (item:any) {
      if (this.expandeds.includes(item)) {
        this.expandeds = this.expandeds.filter((it: any) => it !== item)
      } else {
        this.expandeds.push(item)
      }
    }
  }

}
</script>

  <style>
  .menu-item.exact-link-active {
    @apply bg-indigo-900
  }
  </style>
