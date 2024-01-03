<template>
  <div class="my-5">
    <widget title="Add Load Stop" icon="box" icon-color="purple" :no-border="true" :no-card-body="!toggle">
      <template #actions>
        <div @click="toggle = !toggle">
        </div>
      </template>
      <transition name="slide">
        <div v-show="toggle">
          <p>Pickup Info</p>
          <div class="row">
            <div class="col-4 my-5">
              <m-select
                v-model="stop.pickup_location"
                :multiple="false"
                :searchable="true"
                :options="locationOptions"
                :bind-text="true"
                name="pickupLocation"
                label="Pickup Location"
                :addable="true"
              />
            </div>
            <div class="col-4 my-5">
              <m-select
                v-model="stop.pickup_country"
                :multiple="false"
                :searchable="true"
                :options="countryOptions"
                name="country"
                label="Country"
                :addable="true"
              />
            </div>
            <StateSelects
              select-classes="my-5"
              :col-span="4"
              :city.sync="stop.pickup_city"
              :state.sync="stop.pickup_state"
            />
            <div class="col-4 my-5">
              <Input
                v-model="stop.pickup_zipcode"
                name="zipcode"
                type="text"
                label="Zip Code"
                rules="required"
              />
            </div>
            <div class="col-4 my-5">
              <m-select
                v-model="stop.pickup_timezone"
                :multiple="false"
                :searchable="true"
                :options="tzOptions"
                name="pickupTimezone"
                label="Pickup Timezone"
                :addable="true"
              />
            </div>
          </div>
          <div class="row">
            <div class="col-4 my-5">
              <Input
                v-model="stop.pickup_date"
                name="pickupDate"
                type="date"
                label="Pickup Date"
                rules="required"
              />
            </div>
            <div class="col-4 my-5">
              <Input
                v-model="stop.pickup_time"
                name="pickupTime"
                type="time"
                label="Pickup Time"
                rules="required"
              />
            </div>
            <div class="col-4 my-5">
              <Input
                v-model="stop.pickup_address_line_1"
                name="addressLine1"
                type="text"
                label="Address Line 1"
                rules="required"
              />
            </div>
          </div>
          <div class="row">
            <div class="col-4 my-5">
              <Input
                v-model="stop.pickup_address_line_2"
                name="addressLine2"
                type="text"
                label="Address Line 2"
                rules="required"
              />
            </div>
          </div>
          <hr class="my-5">
          <p>Drop-off Info</p>
          <div class="row">
            <div class="col-4 my-5">
              <m-select
                v-model="stop.drop_off_location"
                :multiple="false"
                :searchable="true"
                :options="locationOptions"
                :bind-text="true"
                name="drupOffLocation"
                label="Drop-off Location"
                :addable="true"
              />
            </div>
            <div class="col-4 my-5">
              <m-select
                v-model="stop.drop_off_country"
                :multiple="false"
                :searchable="true"
                :options="countryOptions"
                name="country"
                label="Country"
                :addable="true"
              />
            </div>
            <StateSelects
              select-classes="my-5"
              :col-span="4"
              :city.sync="stop.drop_off_city"
              :state.sync="stop.drop_off_state"
            />
            <div class="col-4 my-5">
              <Input
                v-model="stop.drop_off_zipcode"
                name="zipcode"
                type="text"
                label="Zip Code"
                rules="required"
              />
            </div>
            <div class="col-4 my-5">
              <m-select
                v-model="stop.drop_off_timezone"
                :multiple="false"
                :searchable="true"
                :options="tzOptions"
                name="dropOffTimezone"
                label="Drop-off Timezone"
                :addable="true"
              />
            </div>
          </div>
          <div class="row">
            <div class="col-4 my-5">
              <Input
                v-model="stop.drop_off_date"
                name="dropOffDate"
                type="date"
                label="Drop-off Date"
                rules="required"
              />
            </div>
            <div class="col-4 my-5">
              <Input
                v-model="stop.drop_off_time"
                name="dropOffTime"
                type="time"
                label="Drop-off Time"
                rules="required"
              />
            </div>
            <div class="col-4 my-5">
              <Input
                v-model="stop.drop_off_address_line_1"
                name="addressLine1"
                type="text"
                label="Address Line 1"
                rules="required"
              />
            </div>
          </div>
          <div class="row">
            <div class="col-4 my-5">
              <Input
                v-model="stop.drop_off_address_line_2"
                name="addressLine2"
                type="text"
                label="Address Line 2"
                rules="required"
              />
            </div>
            <div class="col-4 my-5">
              <m-select
                v-model="stop.load_status"
                :multiple="false"
                :searchable="true"
                :options="statusOptions"
                name="status"
                label="Status"
                :addable="true"
              />
            </div>
          </div>
          <hr class="my-5">
          <p>Other Info</p>
          <div class="row">
            <div class="col-4 my-5">
              <Input
                v-model.number="stop.load_payout"
                name="payout"
                type="number"
                label="Payout"
                rules="required"
              />
            </div>
            <div class="col-4 my-5">
              <Input
                v-model.number="stop.load_distance"
                name="distance"
                type="number"
                label="Distance"
                rules="required"
              />
            </div>
            <div class="col-4 my-5">
              <Input
                v-model.number="stop.load_weight"
                name="weight"
                type="number"
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
                v-model="stop.contact_first_name"
                name="firstName"
                type="text"
                label="First Name"
                rules="required"
              />
            </div>
            <div class="col-4 my-5">
              <Input
                v-model="stop.contact_last_name"
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
                v-model="stop.contact_email_address"
                name="email"
                type="email"
                label="E-mail"
                rules="required"
              />
            </div>
            <div class="col-4 my-5">
              <phone-input
                v-model="stop.contact_phone_number"
                name="phoneNumber"
                label="Contact Phone Number"
                placeholder="Phone number"
                :thin="true"
                rules="required|min:14|max:14"
              />
            </div>
          </div>
          <div class="row">
            <div class="col-3 my-5">
              <FileInput label="Document Upload" name="logo" />
            </div>
            <div class="col-9 my-5">
              <Input
                v-model="stop.instructions"
                name="instructions"
                type="textarea"
                label="Instructions"
                rules="required"
              />
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
import { Stop } from '~/models/stops'

export default Vue.extend({
  data () {
    return {
      ButtonTypeEnum,
      ActionTypeEnum,
      SizeTypeEnum,
      toggle: true,
      locationOptions: [
        {
          id: 1, text: 'Roanoke, TX'
        }
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
        id: 'Upcoming Load', text: 'Upcoming Load', selected: true
      }],
      stop: {} as Stop
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
    }),
    returnStop () {
      return this.stop
    }
  }

})
</script>
