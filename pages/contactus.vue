<template>
  <div>
    <header class="bg-landing">
      <LandingHeader />
    </header>
    <div class="max-w-[1440px] mx-auto">
      <div class="lg:flex xl:flex  block">
        <div class="xl:col-6 lg:col-6 col-12 xl:mt-28 lg:mt-28 mt-14">
          <div class="xl:mx-32 lg:mx-32 mx-4">
            <h1 class="font-semibold text-5xl text-gray-900">
              Contact us
            </h1>
            <p class="font-normal text-b-3 text-gray-500 mt-2">
              Our friendly team would love to hear from you.
            </p>
          </div>

          <Form class="py-8 xl:mx-32 lg:mx-32 mx-4">
            <div class="lg:flex xl:flex block">
              <div class="xl:col-6 lg:col-6 col-12 mb-6">
                <Input
                  v-model="request.firstName"
                  name="firstName"
                  type="text"
                  label="First Name"
                  rules="required"
                />
              </div>
              <div class="xl:col-6 lg:col-6 col-12 mb-6 xl:ml-4 lg:ml-4">
                <Input
                  v-model="request.lastName"
                  name="lastName"
                  type="text"
                  label="Last Name"
                  rules="required"
                />
              </div>
            </div>
            <div class="col-12 mb-6">
              <Input
                v-model="request.email"
                name="email"
                type="email"
                label="E-mail"
                rules="required|email"
              />
            </div>
            <div class="col-12 mb-6">
              <phone-input
                v-model="request.phoneNumber"
                label="Contact Phone Number"
                name="phoneNumber"
                :thin="true"
                rules="required|min:14|max:14"
                maxlength="14"
              />
            </div>
            <div class="col-12 mb-6">
              <label for="message" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Message</label>
              <textarea id="message" rows="5" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
            </div>
            <div class="col-12 mb-6">
              <check-box v-model="agreed" :value="agreed" rules="required">
                <p class="text-b-3">
                  You agree to our friendly
                  <strong class="underline">privacy policy.</strong>
                </p>
              </check-box>
            </div>
            <div class="col-4 pt-8 xl:pb-20 lg:pb-20 pb-4">
              <Button
                class="bg-dark-blue"
                :size="SizeTypeEnum.MD"
                :action="ActionTypeEnum.SUBMIT"
              >
                Send
              </Button>
            </div>
          </Form>
        </div>
        <div class="col-6 mt-10 hidden xl:flex lg:flex">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2974.249014949215!2d-88.12296119999999!3d41.8013958!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x880e56f394d55d4f%3A0xab7fafeaee7a0f17!2s1250%20E%20Diehl%20Rd%2C%20Naperville%2C%20IL%2060563%2C%20USA!5e0!3m2!1sen!2str!4v1689142149702!5m2!1sen!2str"
            width="100%"
            height="100%"
            style="border:0;filter: grayscale(0.9);"
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
      <section class="bg-[#F2F4F7]">
        <div class="mx-4 xl:mx-32 lg:mx-32 xl:py-24 lg:py-24 py-16 block xl:flex lg:flex justify-between">
          <div class="block xl:col-4 lg:col-4 col-12 pb-12">
            <h3 class="text-dark-blue font-semibold text-base leading-6">
              Our locations
            </h3>
            <h1 class="font-semibold text-4xl text-gray-900 mt-3">
              Visit us
            </h1>
            <h4 class="font-normal text-xl text-gray-800 mt-3">
              Find us at these locations.
            </h4>
          </div>
          <div class="block xl:col-4 lg:col-4 col-12">
            <div class="block col-6">
              <h1 class=" font-semibold text-xl leading-7 text-gray-900">
                Address
              </h1>
              <h4 class="font-normal text-b-4 leading-6 text-gray-800">
                1250 E.Diehl Road, Naperville IL 60563 USA
              </h4>
            </div>
          </div>
        </div>
      </section>
    </div>
    <LandingFooter />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {
  ButtonTypeEnum,
  SizeTypeEnum,
  ActionTypeEnum
} from '../components/ts/enums'
import { SelectOption } from '../components/ts/interfaces'
import { ContactUs } from '~/models/Landing/contactUs'

export default Vue.extend({
  name: 'Request',
  transition: 'page-right',
  data () {
    return {
      ButtonTypeEnum,
      SizeTypeEnum,
      ActionTypeEnum,
      request: {} as ContactUs,
      multiSelectedState: '',
      agreed: false,
      sourceOptions: [
        {
          id: 'fb',
          text: 'facebook'
        },
        {
          id: 'ln',
          text: 'linkedin'
        }
      ] as SelectOption[]
    }
  },
  computed: {
    companyTypes (): SelectOption[] {
      return this.$store.getters['common/companyTypes']
    }
  },
  methods: {
    onSubmit () {
      console.log('Is submıtted??')
      this.$router.push('/request-free-demo/completed')
    }
  }
})
</script>

<style>

</style>
