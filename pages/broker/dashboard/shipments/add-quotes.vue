<template>
  <div class="h-full">
    <div class="pl-24 pr-28">
      <div class="flex-col justify-center items-start my-8 flex" style="flex: 0.5">
        <h3 class="font-semibold mb-1 mt-4 text-cent">
          Add New Quote
        </h3>
      </div>
      <Form fclass="row my-2" @send="handleSubmit">
        <div class="col-6 mb-6">
          <Input
            v-model="request.shipper_name"
            name="shipperName"
            type="text"
            label="Shipper Name"
            rules="required"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model="request.load_origin"
            name="origin"
            type="text"
            label="Origin"
            rules="required"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model="request.load_destination"
            name="destination"
            type="text"
            label="Destination"
            rules="required"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model="request.pickup_date"
            name="pickupTime"
            type="date"
            label="Pickup Date"
            rules=""
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model="request.delivery_date"
            name="deliveryTime"
            type="date"
            label="Delivery Date"
            rules=""
          />
        </div>
        <div class="col-6 mb-6">
          <m-select
            v-model="request.cargo_type"
            :multiple="false"
            :searchable="true"
            :options="cargoOptions"
            :bind-text="true"
            :addable="true"
            name="cargoType"
            type="text"
            label="Commodity Type"
            rules=""
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model="request.cargo_weight"
            name="cargoWeight"
            type="text"
            label="Weight"
            rules=""
          />
        </div>
        <div class="col-6 mb-6">
          <m-select
            v-model="request.equipment_type"
            :multiple="false"
            :searchable="true"
            :options="equipmentOptions"
            :bind-text="true"
            :addable="true"
            name="equipmentType"
            type="text"
            label="Equipment Type"
            rules="required"
          />
        </div>
        <div class="col-6 mb-6">
          <m-select
            v-model="request.quote_status"
            :multiple="false"
            :searchable="true"
            :options="statusOptions"
            :addable="true"
            name="status"
            :bind-text="true"
            label="Status"
            rules="required"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model.number="request.quote"
            name="quote"
            type="number"
            label="Quote"
            rules="required"
            class="hide-arrows [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          />
        </div>
        <div class="row mt-10 justify-between mx-0">
          <div class="col-3">
            <Button
              :type="ButtonTypeEnum.LINK"
              :size="SizeTypeEnum.LG"
              :action="ActionTypeEnum.BUTTON"
              class="!justify-start"
              @click="$emit('close-drawer')"
            >
              Cancel
            </Button>
          </div>
          <div class="col-4 ml-auto">
            <Button
              class="flex"
              :type="ButtonTypeEnum.PRIMARY"
              :size="SizeTypeEnum.LG"
              :action="ActionTypeEnum.SUBMIT"
            >
              Create a Quote
            </Button>
          </div>
        </div>
      </Form>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapActions } from 'vuex'
import moment from 'moment'
import {
  SizeTypeEnum,
  ActionTypeEnum,
  ButtonTypeEnum
} from '~/components/ts/enums'
import { SelectOption } from '@/components/ts/interfaces'
import { QuotesDetails } from '~/models/Broker/Quotes/QuotesDetails'
export default Vue.extend({
  name: 'AddShipmentsQuotes',
  data () {
    return {
      ButtonTypeEnum,
      ActionTypeEnum,
      SizeTypeEnum,
      request: {} as QuotesDetails,
      statusOptions: [
        { id: 1, text: 'Open', selected: false },
        { id: 2, text: 'Assigned', selected: false },
        { id: 3, text: 'Dispatched', selected: false },
        { id: 4, text: 'At pickup', selected: false },
        { id: 5, text: 'In Transit', selected: false },
        { id: 6, text: 'At Delivery', selected: false },
        { id: 7, text: 'Delivered', selected: false },
        { id: 8, text: 'Cancelled', selected: false },
        { id: 9, text: 'Closed', selected: false }
      ] as SelectOption[],
      cargoOptions: [
        { id: 1, text: 'Retail Goods', selected: false },
        { id: 2, text: 'Machinery', selected: false },
        { id: 3, text: 'General Goods', selected: false },
        { id: 4, text: 'Food Items', selected: false },
        { id: 5, text: 'Freight of All Kinds', selected: false }
      ] as SelectOption[],
      equipmentOptions: [
        { id: 1, text: '53\' Dryvan', selected: false },
        { id: 2, text: '53\' Reefer', selected: false },
        { id: 3, text: '53\' Flatbed', selected: false },
        { id: 4, text: '48\' Flatbed', selected: false },
        { id: 5, text: 'Step Deck', selected: false },
        { id: 6, text: 'Straight Truck', selected: false },
        { id: 7, text: 'Hotshot', selected: false },
        { id: 8, text: '20\' Container', selected: false },
        { id: 9, text: '40\' Container', selected: false },
        { id: 10, text: 'Sprinter Van', selected: false },
        { id: 11, text: 'Power Only', selected: false }
      ] as SelectOption[]
    }
  },
  computed: {
    brokerId (): number {
      return this.$store.state.brokerId
    }
  },
  methods: {
    ...mapActions({
      addQuote: (action, param) => action('Broker/quotes/addQuote', param)
    }),
    handleSubmit () {
      const rest = {
        broker_id: 3,
        pickup_date: moment(this.request.pickup_date).toISOString(),
        delivery_date: moment(this.request.delivery_date).toISOString(),
        last_quote: 1,
        cargo_type: 'test',
        cargo_weight: 'test'
      }
      this.addQuote({ ...this.request, ...rest })
      this.$emit('close-drawer')
    }
  }
})
</script>
