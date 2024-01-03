<template>
  <div class="h-full">
    <div class="pl-24 pr-28">
      <div class="flex-col justify-center items-start my-8 flex" style="flex: 0.5">
        <h3 class="font-semibold mb-1 mt-4 text-cent">
          Add Quote
        </h3>
      </div>
      <Form fclass="row my-2" @send="handleSubmit">
        <div class="col-6 mb-6">
          <Input
            v-model="request.shipper_name"
            name="shipperName"
            type="text"
            label="Customer Name"
            rules="required"
          />
        </div>
        <div class="col-6 mb-6">
          <m-select
            v-model="request.load_origin"
            :multiple="false"
            :searchable="true"
            :bind-text="true"
            :options="locationsOptions"
            :addable="true"
            name="originLocation"
            label="Origin Location"
          />
        </div>
        <div class="col-6 mb-6">
          <m-select
            v-model="request.load_destination"
            :multiple="false"
            :searchable="true"
            :bind-text="true"
            :options="locationsOptions"
            :addable="true"
            name="destinationLocation"
            label="Destination"
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
            rules=""
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
  name: 'AddQuotes',
  data () {
    return {
      ButtonTypeEnum,
      ActionTypeEnum,
      SizeTypeEnum,
      response: {
        equipment: '',
        load_destination: '',
        load_origin: ''
      },
      request: {} as QuotesDetails,
      statusOptions: [
        { id: 1, text: 'Open', selected: false },
        { id: 2, text: 'Closed', selected: false },
        { id: 3, text: 'Awarded', selected: false },
        { id: 4, text: 'Pending', selected: false }
      ] as SelectOption[],
      cargoOptions: [
        { id: 1, text: 'Retail Goods', selected: false },
        { id: 2, text: 'Machinery', selected: false },
        { id: 3, text: 'General Goods', selected: false },
        { id: 4, text: 'Food Items', selected: false },
        { id: 5, text: 'Freight of All Kinds', selected: false }
      ] as SelectOption[],
      locationsOptions: [
        { id: 1, text: 'Naperville, IL', selected: false },
        { id: 2, text: 'Tacoma, WA', selected: false },
        { id: 3, text: 'Phoenix, AZ', selected: false },
        { id: 4, text: ' Houston, TX', selected: false },
        { id: 5, text: '+ Add New Location', selected: false }

      ]as SelectOption[],
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
      this.addQuote({
        ...this.request,
        broker_id: this.brokerId,
        pickup_date: moment(this.request.pickup_date).toISOString(),
        delivery_date: moment(this.request.delivery_date).toISOString(),
        last_quote: 1
      })
      this.$emit('close-drawer')
    }
  }
})
</script>
<style>
.hide-arrows {
  -webkit-appearance: none;
  margin: 0;
  appearance: none;
  -moz-appearance: textfield !important;
}
input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

</style>
