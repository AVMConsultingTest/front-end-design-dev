<template>
  <div class="bg-white-500 h-full">
    <div class="pl-24 pr-28">
      <div
        class="flex flex-col justify-center items-start my-8"
        style="flex: 0.5"
      >
        <Badge
          title="Step: 2/3"
          class="bg-purple-100 text-crocus-purple mb-2"
          :size="SizeTypeEnum.LG"
        />
        <h3 class="font-semibold mb-1 mt-4 text-center">
          Driver Address Details
        </h3>
      </div>
      <Form fclass="row my-2" @send="handleSubmit">
        <div class="col-6 mb-6">
          <Input
            v-model="address.driver_address_line_1"
            name="address1"
            type="text"
            label="Address Line 1 *"
            rules="required"
            :thin="true"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model="address.driver_address_line_2"
            name="address2"
            type="text"
            label="Address Line 2"
            rules=""
            :thin="true"
          />
        </div>
        <StateSelects :city.sync="address.city" :state.sync="address.state" />
        <div class="col-6 mb-6">
          <Input
            v-model="address.zip"
            name="zip"
            type="text"
            label="Zip Code *"
            rules="required"
            :thin="true"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model="address.employee_id"
            name="employee-id"
            type="text"
            label="Employee ID"
            :thin="true"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model="address.employee_type"
            name="employee-type"
            type="text"
            label="Employee Type"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model="address.truck_id"
            name="truck-id"
            type="text"
            label="Truck ID"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model="address.trailer_id"
            name="trailer-id"
            type="text"
            label="Trailer ID"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model="address.notes"
            name="notes"
            type="text"
            label="Notes"
          />
        </div>
        <div class="row mt-10 mx-0 justify-between">
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
            <Button :type="ButtonTypeEnum.PRIMARY" :size="SizeTypeEnum.LG" :action="ActionTypeEnum.SUBMIT">
              Continue
            </Button>
          </div>
        </div>
      </Form>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapActions } from 'vuex'
import {
  SizeTypeEnum,
  ActionTypeEnum,
  ButtonTypeEnum
} from '~/components/ts/enums'

export default Vue.extend({
  transition: 'page-left',
  data () {
    return {
      ButtonTypeEnum,
      ActionTypeEnum,
      SizeTypeEnum,
      showDrawer: false,
      firstName: '',
      address: {},
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
      ],
      cityOptions: [
        { id: 1, text: 'New York', selected: false },
        { id: 2, text: 'California', selected: false },
        { id: 3, text: 'Texas', selected: false }
      ]
    }
  },
  computed: {
    addingDriver () {
      return this.$store.getters['driver/driverRequest']
    },
    states () {
      console.log(this.$store.getters['common/states'])
      return this.$store.getters['common/states']
    },
    cities () {
      console.log(this.$store.getters['common/cities'])
      return this.$store.getters['common/cities']
    }
  },
  watch: {
    'address.state' (oldVal, newVal) {
      if (oldVal !== newVal) {
        this.getCities(this.address.state)
        this.cityOptions = { ...this.cities }
      }
    }
  },
  mounted () {
    this.getStates()
    if (this.addingDriver.address) {
      this.address = { ...this.addingDriver.address }
    } else {
      this.address = { ...this.addingDriver }
    }
    this.setDriver({ step: 2, title: 'Driver Address Details' })
  },
  methods: {
    handleSubmit () {
      let request = { ...this.addingDriver }
      request = { ...this.address }
      this.setDriver({ driver: request })
      console.log(this.addingDriver)
      this.$router.push('/carrier/dashboard/safety-management/driver-management/add-driver/billing-details')
    },
    ...mapActions({
      setDriver: (action, param) => action('driver/setDriver', param),
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
