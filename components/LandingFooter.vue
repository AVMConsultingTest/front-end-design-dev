<template>
  <div :class="[containerClass]">
    <footer class="">
      <div class="mx-[7.5rem] max-md:m-0">
        <section class="">
          <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6  mail-subrisce">
            <div class="mx-auto max-w-screen-md sm:text-center">
              <h2 class="mb-5 text-36 tracking-tight font-extrabold text-gray-900 sm:text-4xl text-center dark:text-white">
                Sign up for our newsletter
              </h2>
              <p class="mx-auto mb-10 max-w-2xl font-normal text-xl leading-7 text-center text-gray-800">
                Be the first to know about releases and industry news and insights.
              </p>
              <form action="#">
                <div class="items-center mx-auto mb-3 space-y-4 max-w-screen-sm sm:flex sm:space-y-0 xl:col-8 col-12">
                  <div class="relative xl:w-[360px] w-full">
                    <label for="email" class="hidden mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Email address</label>
                    <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                    </div>
                    <input
                      id="email"
                      class="h-12 block p-3 w-full text-sm text-gray-900 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 placeholder:text-[#667085]"
                      type="email"
                      required
                      placeholder="Enter your email"
                    >
                  </div>
                  <div>
                    <Button
                      :type="ButtonTypeEnum.PRIMARY"
                      :size="SizeTypeEnum.MD"
                      :action="ActionTypeEnum.SUBMIT"
                      class="bg-dark-blue p-4 xl:ml-4 w-full xl:!w-[119px] !h-12"
                    >
                      Subscribe
                    </Button>
                  </div>
                </div>
                <div class="xl:col-8 col-12 mx-auto max-w-screen-sm text-sm text-left text-[#475467] newsletter-form-footer dark:text-gray-300">
                  We care about your data in our
                  <nuxt-link class="font-medium underline text-primary-600 dark:text-primary-200 hover:underline" to="/privacy-policy">
                    privacy policy
                  </nuxt-link>.
                </div>
              </form>
            </div>
          </div>
        </section>
      </div>
      <section class="bg-landing dark:bg-gray-900 h-[380px] max-md:h-[480px]">
        <div class=" mx-auto w-full max-w-screen-xl p-4">
          <div class="md:flex md:justify-between mt-16">
            <div class="mb-6 md:mb-0 col-4 max-md:col-12">
              <div class="col-12">
                <nuxt-link to="/">
                  <img class="h-8" :src="imgUrl" alt="Nebula GTS">
                </nuxt-link>
              </div>
              <div class="logoSubDesc w-80 max-md:w-full">
                <p class="font-normal text-base leading-6 text-[#D0D5DD] mt-8">
                  Revolutionize the transportation industry through innovative, user-friendly management solutions.
                </p>
              </div>
            </div>
            <div class="grid col-8 max-md:col-12 grid-cols-2 max-md:grid-cols-4 md:gap-8 sm:grid-cols-5">
              <div class="col-5">
                <h2 class="mb-4 text-sm font-semibold text-white dark:text-white">
                  Product
                </h2>
                <ul class="text-gray-100 dark:text-gray-400 font-medium">
                  <li class="mb-3">
                    <nuxt-link to="/broker" class="hover:underline">
                      For Brokers
                    </nuxt-link>
                  </li>
                  <li class="mb-3">
                    <nuxt-link class="hover:underline" to="/carrier">
                      For Carriers
                    </nuxt-link>
                  </li>
                </ul>
              </div>
              <div class="col-3">
                <h2 class="mb-4 text-sm font-semibold text-white dark:text-white">
                  Company
                </h2>
                <ul class="text-gray-100 dark:text-gray-400 font-medium">
                  <li class="mb-3">
                    <nuxt-link class="hover:underline" to="/about-us">
                      About Us
                    </nuxt-link>
                  </li>
                  <li class="">
                    <nuxt-link class="hover:underline" to="/contactus">
                      Contact Us
                    </nuxt-link>
                  </li>
                </ul>
              </div>
              <div class="col-2">
                <h2 class="mb-4 text-sm font-semibold text-white dark:text-white">
                  Resources
                </h2>
                <ul class="text-gray-100 dark:text-gray-400 font-medium">
                  <li class="mb-3">
                    <nuxt-link class="hover:underline" to="/faq">
                      FAQ
                    </nuxt-link>
                  </li>
                </ul>
              </div>
              <div class="col-2">
                <h2 class="mb-4 text-sm font-semibold text-white dark:text-white">
                  Legal
                </h2>
                <ul class="text-gray-100 dark:text-gray-400 font-medium">
                  <li class="mb-3">
                    <nuxt-link to="/privacy-policy" class="hover:underline">
                      Privacy
                    </nuxt-link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <hr class="border-gray-400 md:hidden max-md:mt-3">
          <div class="sm:flex sm:items-center sm:justify-between">
            <span class="text-base text-[#D0D5DD] sm:text-center dark:text-gray-400">© 2023 <a href="/" class="hover:underline">NebulaGTS™</a>. All Rights Reserved.
            </span>
            <div class="flex mt-4 space-x-6 sm:justify-center sm:mt-0 ">
              <a href="https://www.instagram.com/nebula_gts/?igshid=NTc4MTIwNjQ2YQ==" target="_blank" class="text-gray-400 hover:text-gray-400 dark:hover:text-gray-400">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fill-rule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clip-rule="evenodd" /></svg>
                <span class="sr-only">Instagram page</span>
              </a>
              <a href="https://t.me/dirilisgroupSaaS" target="_blank" class="text-gray-400 hover:text-gray-400 dark:hover:text-gray-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  class="bi bi-telegram w-5 h-5"
                  viewBox="0 0 16 16"
                > <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.287 5.906c-.778.324-2.334.994-4.666 2.01-.378.15-.577.298-.595.442-.03.243.275.339.69.47l.175.055c.408.133.958.288 1.243.294.26.006.549-.1.868-.32 2.179-1.471 3.304-2.214 3.374-2.23.05-.012.12-.026.166.016.047.041.042.12.037.141-.03.129-1.227 1.241-1.846 1.817-.193.18-.33.307-.358.336a8.154 8.154 0 0 1-.188.186c-.38.366-.664.64.015 1.088.327.216.589.393.85.571.284.194.568.387.936.629.093.06.183.125.27.187.331.236.63.448.997.414.214-.02.435-.22.547-.82.265-1.417.786-4.486.906-5.751a1.426 1.426 0 0 0-.013-.315.337.337 0 0 0-.114-.217.526.526 0 0 0-.31-.093c-.3.005-.763.166-2.984 1.09z" /> </svg>
                <span class="sr-only">telegram</span>
              </a>
              <a href="#" target="_blank" class="text-gray-400 hover:text-gray-400 dark:hover:text-gray-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  class="bi bi-linkedin w-5 h-5"
                  viewBox="0 0 16 16"
                > <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z" /> </svg>
                <span class="sr-only">linkedin</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </footer>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { ButtonTypeEnum, SizeTypeEnum, ActionTypeEnum } from '~/components/ts/enums'
export default Vue.extend({
  name: 'LandingFooter',
  props: {
    containerClass: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      ButtonTypeEnum,
      SizeTypeEnum,
      ActionTypeEnum,
      imgUrl: '/images/Logo_White.png',
      companyInfo: {
        img: '/images/company_logo.png',
        name: 'Dirilis Group'
      }
    }
  }

})
</script>

<style>
.menu-item.exact-link-active {
  @apply bg-indigo-900
}
</style>
