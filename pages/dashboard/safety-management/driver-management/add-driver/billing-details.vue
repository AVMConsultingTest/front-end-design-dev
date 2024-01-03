<template>
  <div class="bg-white-500 h-full">
    <div class="h-full">
      <div class="pl-24 pr-28">
        <div
          class="flex flex-col justify-center items-start my-8"
          style="flex: 0.5"
        >
          <Badge
            title="Step: 3/3"
            class="bg-purple-100 text-crocus-purple mb-2"
            :size="SizeTypeEnum.LG"
          />
          <h3 class="font-semibold mb-1 mt-4 text-center">
            Driver Billing Details
          </h3>
        </div>
        <Form fclass="row my-2" @send="handleSubmit">
          <div class="col-6 mb-6">
            <Input
              v-model="billing.driver_routing_number"
              name="routing no"
              type="text"
              label="Bank Routing Number"
              :thin="true"
            />
          </div>
          <div class="col-6 mb-6">
            <Input
              v-model="billing.driver_account_number"
              name="acc no"
              type="text"
              label="Bank Accounting Number"
              :thin="true"
            />
          </div>
          <div class="col-6 mb-6">
            <Input
              v-model="billing.payment_type"
              name="payment-type"
              type="text"
              label="Payment Type"
              :thin="true"
            />
          </div>
          <div class="col-6 mb-6">
            <Input
              name="payment-rates"
              type="text"
              label="Payment Rates"
              :thin="true"
            />
          </div>
          <div class="col-6 mb-6">
            <Input
              v-model="billing.tax_form"
              name="tax-form"
              type="text"
              label="Tax Form"
            />
          </div>
          <div class="col-6 mb-6">
            <Input
              v-model="billing.recurring_deductions"
              name="recurring-deductions"
              type="text"
              label="Recurring Deductions"
            />
          </div>
          <div class="col-6 mb-6">
            <Input
              name="trailer-id"
              type="text"
              label="Compensation"
            />
          </div>
          <div class="row mt-10 justify-between mx-0">
            <div class="col-3">
              <Button
                :type="ButtonTypeEnum.LINK"
                :size="SizeTypeEnum.LG"
                :action="ActionTypeEnum.BUTTON"
                class="!justify-start"
                @click="$router.back()"
              >
                Go Back
              </Button>
            </div>
            <div class="col-3">
              <Button
                :type="ButtonTypeEnum.PRIMARY"
                :size="SizeTypeEnum.LG"
                :action="ActionTypeEnum.SUBMIT"
              >
              Save
              </Button>
            </div>
          </div>
        </Form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapActions } from 'vuex'
import { SelectOption } from '~/components/ts/interfaces'
import {
  SizeTypeEnum,
  ActionTypeEnum,
  ButtonTypeEnum
} from '~/components/ts/enums'
import { Driver } from '~/models/driver/driver'

export default Vue.extend({
  transition: 'page-left',
  data () {
    return {
      ButtonTypeEnum,
      ActionTypeEnum,
      SizeTypeEnum,
      showDrawer: false,
      firstName: '',
      billing: {} as Driver,
      selectedState: 0,
      multiSelectedState: [],
      checkBoxTest: false,
      testOptions: [
        { id: 1, text: 'a2as', selected: false },
        { id: 2, text: 'bdas', selected: true },
        { id: 3, text: 'baads', selected: true },
        { id: 4, text: 'bcasd', selected: true },
        { id: 5, text: 'bdasd', selected: true },
        { id: 6, text: 'b14e', selected: true },
        { id: 7, text: 'bf55', selected: true },
        { id: 8, text: 'bg765', selected: true },
        { id: 9, text: 'bhzxc', selected: true }
      ] as SelectOption[],
      cityOptions: [] as SelectOption[]
    }
  },
  computed: {
    addingDriver (): Driver {
      return this.$store.getters['driver/driverRequest'] as Driver
    },
    states () {
      return this.$store.getters['common/states']
    },
    cities () {
      return this.$store.getters['common/cities']
    }
  },
  mounted () {
    this.billing = { ...this.addingDriver }
    this.setDriver({ step: 3, title: 'Driver Billing Details' })
  },
  methods: {
    async handleSubmit () {
      this.setDriver({ driver: this.billing })
      console.log(this.addingDriver)
      await this.addDriver(this.addingDriver).then(() => {
        this.setDriver({ driver: {} })
        this.$emit('close-drawer')
        // this.$router.push('/dashboard/safety-management/driver-management/')
      })
    },
    ...mapActions({
      setDriver: (action, param) => action('driver/setDriver', param),
      addDriver: (action, param) => action('driver/addDriver', param),
      getStates: action => action('common/getStates'),
      getCities: (action, param) => action('common/getCities', param)
    })
  }
})
</script>

  <style>
.m-modal-overlay {
  @apply bg-dark/80 fixed bottom-0 left-0 right-0 top-0 flex justify-center;
}
.m-modal-content {
  @apply bg-white rounded-3xl shadow-2xl relative overflow-hidden;
}
</style>
