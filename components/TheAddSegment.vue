<template>
  <div class="my-5">
    <widget :title="`Segment ${index + 1}`" icon="hashtag-1" icon-color="purple" :no-border="true" :no-card-body="!toggle">
      <template #actions>
        <div @click="toggle = !toggle">
          <Icon
            icon="add"
            color="dark"
            :alpha="400"
            class="w-10 h-10 cursor-pointer"
          />
        </div>
      </template>
      <transition name="slide">
        <div v-show="toggle">
          <p class="text-dark-blue font-bold">
            Pickup Info
          </p>
          <div class="row">
            <div class="col-4 my-5">
              <m-select
                v-model="stop.pickupLocation"
                :multiple="false"
                :searchable="true"
                :options="locationOptions"
                name="pickupLocation"
                label="Pickup Location"
                :addable="true"
              />
            </div>
            <div class="col-4 my-5">
              <Input
                v-model="stop.address1"
                name="addressLine1"
                type="text"
                label="Address Line 1"
                rules="required"
              />
            </div>
            <div class="col-4 my-5">
              <Input
                v-model="stop.address2"
                name="addressLine2"
                type="text"
                label="Address Line 2"
                rules="required"
              />
            </div>
            <StateSelects select-classes="my-5" :col-span="4" :city.sync="stop.city" :state.sync="stop.state" />
            <div class="col-4 my-5">
              <Input
                v-model="stop.zipCode"
                name="zipcode"
                type="text"
                label="Zip Code"
                rules="required"
              />
            </div>
          </div>
          <div class="row">
            <div class="col-4 my-5">
              <m-select
                v-model="stop.country"
                :multiple="false"
                :searchable="true"
                :options="countryOptions"
                name="country"
                label="Country"
              />
            </div>
            <div class="col-4 my-5">
              <Input
                v-model="stop.pickupDate"
                name="pickupDate"
                type="date"
                label="Pickup Date"
                rules="required"
              />
            </div>
            <div class="col-4 my-5">
              <Input
                v-model="stop.pickupTime"
                name="pickupTime"
                type="time"
                label="Pickup Time"
                rules="required"
              />
            </div>
          </div>
          <div class="row">
            <div class="col-4 my-5">
              <m-select
                v-model="stop.timezone"
                :multiple="false"
                :searchable="true"
                :options="tzOptions"
                name="pickupTimezone"
                label="Pickup Timezone"
                :addable="true"
              />
            </div>
          </div>
          <hr class="my-5">
          <p class="text-dark-blue font-bold">
            Drop-off Info
          </p>
          <div class="row">
            <div class="col-4 my-5">
              <m-select
                v-model="stop.dropOffLocation"
                :multiple="false"
                :searchable="true"
                :options="locationOptions"
                name="drupOffLocation"
                label="Drop-off Location"
                :addable="true"
              />
            </div>
            <div class="col-4 my-5">
              <Input
                v-model="stop.dropOffAddress1"
                name="addressLine1"
                type="text"
                label="Address Line 1"
                rules="required"
              />
            </div>
            <div class="col-4 my-5">
              <Input
                v-model="stop.dropOffAddress2"
                name="addressLine2"
                type="text"
                label="Address Line 2"
                rules="required"
              />
            </div>
            <StateSelects select-classes="my-5" :col-span="4" :city.sync="stop.city" :state.sync="stop.state" />
            <div class="col-4 my-5">
              <Input
                v-model="stop.zipCode"
                name="zipcode"
                type="text"
                label="Zip Code"
                rules="required"
              />
            </div>
            <div class="col-4 my-5">
              <m-select
                v-model="stop.dropOffCountry"
                :multiple="false"
                :searchable="true"
                :options="countryOptions"
                name="country"
                label="Country"
              />
            </div>
            <div class="col-4 my-5">
              <Input
                v-model="stop.dropOffDate"
                name="dropOffDate"
                type="date"
                label="Dropoff Date"
                rules="required"
              />
            </div>
            <div class="col-4 my-5">
              <Input
                v-model="stop.dropOffTime"
                name="dropOffTime"
                type="time"
                label="Dropoff Time"
                rules="required"
              />
            </div>
            <div class="col-4 my-5">
              <m-select
                v-model="stop.dropOffTimezone"
                :multiple="false"
                :searchable="true"
                :options="tzOptions"
                name="dropOffTimezone"
                label="Dropoff Timezone"
                :addable="true"
              />
            </div>
          </div>
          <hr class="my-5">
          <p class="text-dark-blue font-bold">
            Other Info
          </p>
          <div class="row">
            <div class="col-4 my-5">
              <Input
                v-model="stop.revenue"
                name="revenue"
                type="text"
                label="Revenue"
                rules="required"
              />
            </div>
            <div class="col-4 my-5">
              <Input
                v-model="stop.distance"
                name="distance"
                type="text"
                label="Distance"
                rules="required"
              />
            </div>
            <div class="col-4 my-5">
              <Input
                v-model="stop.weight"
                name="weight"
                type="text"
                label="Weight"
                rules="required"
              />
            </div>
          </div>
          <div class="row">
            <div class="col-4 my-5">
              <Input
                v-model="stop.contact"
                name="contact"
                type="text"
                label="Contact"
                rules="required"
              />
            </div>
            <div class="col-4 my-5">
              <Input
                v-model="stop.firstName"
                name="firstName"
                type="text"
                label="First Name"
                rules="required"
              />
            </div>
            <div class="col-4 my-5">
              <Input
                v-model="stop.lastName"
                name="lastName"
                type="text"
                label="Last Name"
                rules="required"
              />
            </div>
          </div>
          <div class="row">
            <div class="col-4 my-5">
              <Input
                v-model="stop.email"
                name="loadReference"
                type="text"
                label="Load Reference #"
                rules="required"
              />
            </div>
            <div class="col-4 my-5">
              <Input
                v-model="stop.email"
                name="email"
                type="email"
                label="E-mail Address"
                rules="required"
              />
            </div>
            <div class="col-4 my-5">
              <phone-input
                v-model="stop.phoneNumber"
                name="phoneNumber"
                label="Contact Phone Number"
                :thin="true"
                rules="required|min:14|max:14"
              />
            </div>
          </div>
          <div class="row">
            <div class="col-4 my-5">
              <FileInput label="Document Upload" name="logo" />
            </div>
            <div class="col-8 my-5">
              <Input
                name="instructions"
                type="textarea"
                label="Instructions"
                rules="required"
              />
            </div>
          </div>
          <hr class="my-5">
          <p class="text-dark-blue font-bold">
            Carrier Details
          </p>
          <div class="row">
            <div class="col-4 my-5">
              <Input
                v-model="stop.carrier_name"
                name="carrierName"
                type="text"
                label="Carrier Name"
                rules="required"
              />
            </div>
            <div class="col-4 my-5">
              <Input
                v-model="stop.mc_number"
                name="mc#"
                type="text"
                label="MC#"
                rules="required"
              />
            </div>
            <div class="col-4 my-5">
              <Input
                v-model="stop.dot_number"
                name="dot#"
                type="text"
                label="DOT#"
                rules="required"
              />
            </div>
            <div class="col-4 my-5">
              <Input
                v-model="stop.dispatcher"
                name="dispatcher"
                type="text"
                label="Dispatcher"
                rules="required"
              />
            </div>
            <div class="col-4 my-5">
              <phone-input
                v-model="stop.dispatcher_phone_number"
                name="dispatcherPhoneNumber"
                label="Dispatcher Phone Number"
                :thin="true"
                rules="required|min:14|max:14"
              />
            </div>
            <div class="col-4 my-5">
              <Input
                v-model="stop.dispatcher_e_mail"
                name="email"
                type="email"
                label="Dispatcher E-mail Address"
                rules="required"
              />
            </div>
            <div class="col-4 my-5">
              <Input
                v-model="stop.driver_1"
                name="driver"
                type="text"
                label="Driver #1"
                rules="required"
              />
            </div>
            <div class="col-4 my-5">
              <phone-input
                v-model="stop.driver_phone_number_1"
                name="driver1PhoneNumber"
                label="Driver #1 Phone Number"
                :thin="true"
                rules="required|min:14|max:14"
              />
            </div>
            <div class="col-4 my-5">
              <Input
                v-model="stop.driver_2"
                name="driver2"
                type="text"
                label="Driver #2"
                rules="required"
              />
            </div>
            <div class="col-4 my-5">
              <phone-input
                v-model="stop.driver_phone_number_2"
                name="driver2PhoneNumber"
                label="Driver #2 Phone Number"
                :thin="true"
                rules="required|min:14|max:14"
              />
            </div>
            <div class="col-4 my-5">
              <Input
                v-model="stop.truck"
                name="truck"
                type="text"
                label="Truck #"
                rules="required"
              />
            </div>
            <div class="col-4 my-5">
              <Input
                v-model="stop.trailer"
                name="trailer"
                type="text"
                label="Trailer #"
                rules="required"
              />
            </div>
          </div>
          <div class="row mt-1 mb-8">
            <div class="col-2 col-lg-1 ml-auto pt-16">
              <Button
                class="flex"
                :type="ButtonTypeEnum.PRIMARY"
                :size="SizeTypeEnum.MD"
                :action="ActionTypeEnum.BUTTON"
                @click="$emit('save-stop', stop)"
              >
                Add new segment
              </Button>
            </div>
          </div>
        </div>
      </transition>
    </widget>
  </div>
</template>

<script lang="ts">
import { mapActions } from 'vuex'
import Vue from 'vue'
import {
  SizeTypeEnum,
  ActionTypeEnum,
  ButtonTypeEnum
} from '@/components/ts/enums'
export default Vue.extend({
  props: {
    index: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      ButtonTypeEnum,
      ActionTypeEnum,
      SizeTypeEnum,
      toggle: false,
      locationOptions: [
        { id: 1, text: 'Roanoke, TX' }
      ],
      countryOptions: [{
        id: 'USA', text: 'United States', selected: true, img: '/images/flags/united-states.svg'
      }],
      tzOptions: [
        { id: 'EST', text: 'EST', selected: true },
        { id: 'MST', text: 'MST', selected: false },
        { id: 'PST', text: 'PST', selected: false },
        { id: 'CST', text: 'CST', selected: false }
      ],
      statusOptions: [{
        id: 'Upcoming Load', text: 'Upcoming Load', selected: true, img: '/images/flags/united-states.svg'
      }],
      stop: {
        carrier_name: '',
        mc_number: '',
        dot_number: '',
        dispatcher: '',
        dispatcher_phone_number: '',
        dispatcher_e_mail: '',
        driver_1: '',
        driver_phone_number_1: '',
        driver_2: '',
        driver_phone_number_2: '',
        truck: '',
        trailer: '',
        pickupLocation: '',
        country: '',
        city: '',
        state: '',
        timezone: '',
        zipCode: '',
        pickupDate: '',
        pickupTime: '',
        address1: '',
        address2: '',
        dropOffLocation: '',
        dropOffCountry: '',
        dropOffCity: '',
        dropOffState: '',
        dropOffTimezone: '',
        dropOffDate: '',
        dropOffTime: '',
        dropOffAddress1: '',
        dropOffAddress2: '',
        status: '',
        other_status: '',
        revenue: '',
        distance: '',
        weight: '',
        contact: '',
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: ''
      }
    }
  },
  computed: {
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
    'state' (oldVal, newVal) {
      if (oldVal !== newVal) {
        this.getCities(this.address.state)
        this.cityOptions = { ...this.cities }
      }
    }
  },
  mounted () {
    this.getStates()
  },
  methods: {
    ...mapActions({
      getStates: action => action('common/getStates'),
      getCities: (action, param) => action('common/getCities', param)
    })
  }
})
</script>
