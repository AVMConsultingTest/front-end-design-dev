<template>
  <div :class="[containerClass]">
    <nav :class="{ 'nav-scroll': isScrolled }" class="relative z-20 bg-landing">
      <div class="max-w-screen-xl flex flex-wrap items-center mx-auto p-4">
        <div class="col-10 xl:col-2">
          <nuxt-link to="/">
            <img class="h-8" :src="imgUrl" alt="Nebula GTS">
          </nuxt-link>
        </div>
        <div class="xl:col-9 col-2">
          <div>
            <button class="md:hidden flex items-center px-3 py-2 border rounded text-white border-white hover:text-white hover:border-white" @click="menuOpen = !menuOpen">
              <svg class="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" /></svg>
            </button>
            <transition name="slide-fade">
              <div v-if="menuOpen" class="fixed z-50 inset-0 overflow-hidden bg-gray-800 bg-opacity-95 flex">
                <button class="absolute top-0 right-0 mt-4 mr-4 z-10" @click="menuOpen = false">
                  <svg
                    class="h-6 w-6 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                <div class="relative w-full ">
                  <div class="px-4 py-6 space-y-2">
                    <nuxt-link to="/">
                      <img class="h-16 mb-6" :src="imgUrl" alt="Nebula GTS">
                    </nuxt-link>
                    <template v-for="item in menuItems">
                      <div v-if="item.subItems" :key="item.text" class="py-1 pl-3">
                        <button class="text-white w-full text-left flex items-center" @click="item.isSubmenuOpen = !item.isSubmenuOpen">
                          <p class="text-white pr-2 text-2xl">
                            {{ item.text }}
                          </p>
                          <Icon
                            icon="arrow-down"
                            variant="linear"
                            color="white"
                            :alpha="400"
                            class="w-6 h-6 cursor-pointer ml-2"
                            :disable-fill="true"
                          />
                        </button>
                        <div v-if="item.isSubmenuOpen" class="mt-4 mb-4">
                          <a v-for="subItem in item.subItems" :key="subItem.text" :href="subItem.link" class="block py-1 pr-4 text-white text-b-3 hover:bg-gray-100">{{ subItem.text }}</a>
                        </div>
                      </div>
                      <a v-else :key="item.text" :href="item.link" class="block py-2 pl-3 pr-4 text-white text-2xl hover:bg-gray-100">{{ item.text }}</a>
                    </template>
                    <div class="button col-1 landing-button xl:flex !mb-4 fixed bottom-0">
                      <button
                        class="border border-transparent rounded-lg border-[#696E82] px-[1.3rem] py-[0.2rem]"
                        @click="handleSubmit"
                      >
                        <span class="text-white">Login</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </transition>
          </div>
          <div id="navbar-dropdown" class="hidden w-full md:block md:w-auto">
            <ul class="flex flex-col font-medium p-4 md:p-0 mt-4 md:flex-row md:space-x-8 md:mt-0 md:border-0 landing-nav">
              <li class="relative">
                <button class="text-white text-b-3 font-medium" @mouseover="showMenu" @mouseleave="hideMenu">
                  For Carriers
                </button>
                <ul
                  v-if="isMenuVisible"
                  v-show="isMenuVisible"
                  class="absolute bg-white rounded-xl text-black transition-all duration-300 w-[436px] h-auto pb-10 pt-10 mt-4"
                  @mouseover="cancelHideMenu"
                  @mouseleave="hideMenu"
                >
                  <div class="ml-[27px] mt-[-48px]">
                    <img src="/images/header_polygon.png" alt="" class="w-3 h-2">
                  </div>
                  <nuxt-link to="/carrier/safety">
                    <li class="flex col m-0 mx-auto col-10 hover:bg-[#EAECF0] rounded-xl p-4">
                      <div>
                        <Icon
                          icon="box-tick"
                          color="purple"
                          :alpha="700"
                          class="w-10 h-10  mr-4"
                          variant="bulk"
                        />
                      </div>
                      <div class="flex flex-col">
                        <h1 class="text-b-3 font-medium">
                          Safety Management
                        </h1>
                        <p class="text-c-1 text-[#667085] font-medium">
                          Integrates cutting-edge safety measures into its platform, safeguarding both personnel and cargo, thereby ensuring the operational continuity of your business.
                        </p>
                      </div>
                    </li>
                  </nuxt-link>
                  <nuxt-link to="/carrier/dispatch">
                    <li class="flex col m-0 mx-auto col-10 hover:bg-[#EAECF0] rounded-xl p-4">
                      <div>
                        <Icon
                          icon="tag-right"
                          color="green"
                          :alpha="600"
                          class="w-10 h-10 mr-4"
                          variant="bulk"
                        />
                      </div>
                      <div class="flex flex-col">
                        <h1 class="text-b-3 font-medium">
                          Dispatch Management
                        </h1>
                        <p class="text-c-1 text-[#667085] font-medium">
                          Offers a robust dispatch management system that streamlines your operations, boosts efficiency, and enhances customer satisfaction.
                        </p>
                      </div>
                    </li>
                  </nuxt-link>
                  <nuxt-link to="/carrier/accounting">
                    <li class="flex col m-0 mx-auto col-10 hover:bg-[#EAECF0] rounded-xl p-4">
                      <div>
                        <Icon
                          icon="wallet-check"
                          color="blue"
                          :alpha="600"
                          class="w-10 h-10 mr-4"
                          variant="bulk"
                        />
                      </div>
                      <div class="flex flex-col">
                        <h1 class="text-b-3 font-medium">
                          Accounting Management
                        </h1>
                        <p class="text-c-1 text-[#667085] font-medium">
                          Supercharge your logistics operations with our innovative Marketplace feature, designed to revolutionize how you source and manage your transportation services
                        </p>
                      </div>
                    </li>
                  </nuxt-link>
                </ul>
              </li>
              <li class="relative">
                <button class="text-white text-b-3 font-medium" @mouseover="showMenuTwo" @mouseleave="hideMenuTwo">
                  For Brokers
                </button>
                <ul
                  v-if="isMenuVisibleTwo"
                  v-show="isMenuVisibleTwo"
                  class="absolute bg-white rounded-xl text-black transition-all duration-300 w-[436px] h-auto pb-10 pt-16 mt-4"
                  @mouseover="cancelHideMenuTwo"
                  @mouseleave="hideMenuTwo"
                >
                  <div class="ml-[27px] mt-[-72px]">
                    <img src="/images/header_polygon.png" alt="" class="w-3 h-2">
                  </div>
                  <nuxt-link to="/broker/customer-carrier">
                    <li class="flex col m-0 mx-auto col-10 hover:bg-[#EAECF0] rounded-xl p-4">
                      <div>
                        <Icon
                          icon="profile-2user"
                          color="blue"
                          :alpha="700"
                          class="w-10 h-10 mr-4"
                          variant="bulk"
                        />
                      </div>
                      <div class="flex flex-col">
                        <h1 class="text-b-3 font-medium">
                          Customer and Carrier Management
                        </h1>
                        <p class="text-c-1 text-[#667085] font-medium">
                          Gain real-time visibility and control over your transportation network. Track shipments, monitor routes, and manage resources efficiently
                        </p>
                      </div>
                    </li>
                  </nuxt-link>
                  <nuxt-link to="/broker/load-management">
                    <li class="flex col m-0 mx-auto col-10 hover:bg-[#EAECF0] rounded-xl p-4">
                      <div>
                        <Icon
                          icon="box-time"
                          color="purple"
                          :alpha="600"
                          class="w-10 h-10 mr-4"
                          variant="bulk"
                        />
                      </div>

                      <div class="flex flex-col">
                        <h1 class="text-b-3 font-medium">
                          Load Management
                        </h1>
                        <p class="text-c-1 text-[#667085] font-medium">
                          Offers a robust dispatch management system that streamlines your operations, boosts efficiency, and enhances customer satisfaction.
                        </p>
                      </div>
                    </li>
                  </nuxt-link>
                  <nuxt-link to="/broker/invoicing">
                    <li class="flex col m-0 mx-auto col-10 hover:bg-[#EAECF0] rounded-xl p-4">
                      <div>
                        <Icon
                          icon="wallet-check"
                          color="green"
                          :alpha="600"
                          class="w-10 h-10 mr-4"
                          variant="bulk"
                        />
                      </div>
                      <div class="flex flex-col">
                        <h1 class="text-b-3 font-medium">
                          Invoicing
                        </h1>
                        <p class="text-c-1 text-[#667085] font-medium">
                          Supercharge your logistics operations with our innovative Marketplace feature, designed to revolutionize how you source and manage your transportation services
                        </p>
                      </div>
                    </li>
                  </nuxt-link>
                  <nuxt-link to="/broker/access-management">
                    <li class="flex col m-0 mx-auto col-10 hover:bg-[#EAECF0] rounded-xl p-4">
                      <div>
                        <Icon
                          icon="truck"
                          color="orange"
                          :alpha="500"
                          class="w-10 h-10 mr-4"
                        />
                      </div>
                      <div class="flex flex-col">
                        <h1 class="text-b-3 font-medium">
                          Access Management and
                          UI Customization
                        </h1>
                        <p class="text-c-1 text-[#667085] font-medium">
                          Streamline your shipping process, optimize routes, and ensure timely deliveries with our powerful and intuitive solution.
                        </p>
                      </div>
                    </li>
                  </nuxt-link>
                </ul>
              </li>
              <li>
                <nuxt-link to="/faq" class="block py-2 pl-3 pr-4 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                  FAQ
                </nuxt-link>
              </li>
              <li>
                <nuxt-link to="/about-us" class="block py-2 pl-3 pr-4 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                  About Us
                </nuxt-link>
              </li>
              <li>
                <nuxt-link class="block py-2 pl-3 pr-4 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent" to="/contactus">
                  Contact Us
                </nuxt-link>
              </li>
            </ul>
          </div>
        </div>
        <div class="button col-1 landing-button xl:flex hidden">
          <button
            class="border border-transparent rounded-lg border-[#696E82] px-[1.3rem]  py-[0.2rem]"
            @click="handleSubmit"
          >
            <span class="text-white">Login</span>
          </button>
        </div>
      </div>
    </nav>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'LandingHeader',
  props: {
    containerClass: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      imgUrl: '/images/Logo_White.png',
      companyInfo: {
        img: '/images/company_logo.png',
        name: 'Dirilis Group'
      },
      isScrolled: false,
      isMenuVisible: false,
      timeoutId: null,
      isMenuVisibleTwo: false,
      timeoutIdTwo: null,
      menuOpen: false,
      menuItems: [
        {
          text: 'For Carriers',
          isSubmenuOpen: false,
          subItems: [
            { text: 'Safety Management', link: '/carrier/safety' },
            { text: 'Dispatch Management', link: '/carrier/dispatch' },
            { text: 'Accounting Management', link: '/carrier/accounting' }
          ]
        },
        {
          text: 'For Brokers',
          isSubmenuOpen: false,
          subItems: [
            { text: 'Access Management', link: '/broker/access-management' },
            { text: 'Customer & Carrier', link: '/broker/customer-carrier' },
            { text: 'Invoicing', link: '/broker/invoicing' },
            { text: 'Load Management', link: '/broker/load-management' }
          ]
        },
        {
          text: 'FAQ',
          link: '/faq'
        },
        {
          text: 'About Us',
          link: '/about-us'
        },
        {
          text: 'Contact Us',
          link: '/contactus'
        }
      ]
    }
  },
  mounted () {
    window.addEventListener('scroll', this.handleScroll)
  },
  destroyed () {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleScroll () {
      this.isScrolled = window.scrollY > 0
    },
    handleSubmit () {
      console.log(this.request)
      this.$router.push('/signin')
      // this.$auth.loginWith('oauth2')
      // window.location.href = 'https://tms-backend.auth.us-east-1.amazoncognito.com/login?response_type=code&client_id=417f1huokr5pfdo52c0b2s7r13&scope=TMSBackendResourceServer%2F*&redirect_uri=https://nebulagts.com'
    },

    showMenu () {
      clearTimeout(this.timeoutId) // Önceki gizleme zamanlayıcısını iptal et
      this.isMenuVisible = true
    },
    hideMenu () {
      this.timeoutId = setTimeout(() => {
        this.isMenuVisible = false
      }, 100) // 500ms (yarım saniye) sonra menüyü gizle
    },
    cancelHideMenu () {
      clearTimeout(this.timeoutId) // Gizleme zamanlayıcısını iptal et
    },
    showMenuTwo () {
      clearTimeout(this.timeoutIdTwo) // Önceki gizleme zamanlayıcısını iptal et
      this.isMenuVisibleTwo = true
    },
    hideMenuTwo () {
      this.timeoutIdTwo = setTimeout(() => {
        this.isMenuVisibleTwo = false
      }, 100) // 500ms (yarım saniye) sonra menüyü gizle
    },
    cancelHideMenuTwo () {
      clearTimeout(this.timeoutIdTwo) // Gizleme zamanlayıcısını iptal et
    }
  }
})
</script>
  <style>
  .menu-item.exact-link-active {
    @apply bg-indigo-900
  }
  .nav-scroll {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
}

/* Slide-Fade Transition */
.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to {
  transform: translateX(-10px);
  opacity: 0;
}
  </style>
