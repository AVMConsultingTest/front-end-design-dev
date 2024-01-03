<template>
  <div class="w-full">
    <Drawer ref="drawer" />
    <PageHeader title="Quotes" class="mb-10">
      <template #actions>
        <div class="w-32 h-10 mr-2">
          <Button
            class="flex !bg-dark-blue"
            :type="ButtonTypeEnum.PRIMARY"
            :size="SizeTypeEnum.MD"
            :action="ActionTypeEnum.BUTTON"
            @click="$refs.modal.showModal()"
          >
            Get Rate
          </Button>
          <Modal ref="modal" size="sm">
            <div slot="body" class="row flex items-center justify-center py-32">
              <div class="col-8 items-center justify-center my-0">
                <h3 class="font-semibold text-center mb-2">
                  Get Rate
                </h3>
                <Form fclass="row my-2">
                  <div class="col-12 mb-6">
                    <m-select
                      v-model="response.equipment"
                      :multiple="false"
                      :searchable="true"
                      :options="testOptions"
                      :addable="true"
                      name="state"
                      label="Equipment Type"
                    />
                  </div>
                  <div class="col-12 mb-6">
                    <m-select
                      v-model="response.origin"
                      :multiple="false"
                      :searchable="true"
                      :options="locationsOptions"
                      :addable="true"
                      name="originLocation"
                      label="Origin"
                    />
                  </div>
                  <div class="col-12 mb-6">
                    <m-select
                      v-model="response.destination"
                      :multiple="false"
                      :searchable="true"
                      :options="locationsOptions"
                      :addable="true"
                      name="destinationLocation"
                      label="Destination"
                    />
                  </div>
                </Form>
              </div>
              <div class="col-8 mt-4">
                <Button
                  :type="ButtonTypeEnum.GREEN"
                  :size="SizeTypeEnum.LG"
                  :action="ActionTypeEnum.SUBMIT"
                  @click="openModal()"
                >
                  Submit
                </Button>
                <Button
                  :type="ButtonTypeEnum.LINK"
                  :size="SizeTypeEnum.LG"
                  :action="ActionTypeEnum.BUTTON"
                  class="mt-2"
                  @click="hideModal()"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </Modal>
          <Modal ref="modal2" content-class="w-6/12">
            <div slot="body" class="row flex items-center justify-center pt-7 px-2">
              <div class="col-12 items-center justify-center my-0">
                <h3 class="font-semibold text-start mb-2">
                  Customer Quote
                </h3>
                <div class="row border rounded-lg mt-6 py-6 mx-1">
                  <div class="col-6">
                    <div class="row">
                      <div class="col-5 2xl:col-3">
                        <div class="row">
                          <span class="text-grey-dark-200 text-c-2 col-12 mb-1 font-medium">Origin</span>
                          <div class="col-auto flex items-center gap-2">
                            <span v-if="stops.length > 0" class="text-b-4 font-medium dark:text-white">
                              {{ stops[0].value }}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div class="col-2 flex items-center pt-3 justify-center">
                        <Icon icon="routing-2" color="gray" variant="bulk" :alpha="400" class="w-7 h-7" />
                      </div>
                      <div class="col-5 2xl:col-3">
                        <div class="row border-r">
                          <span class="text-grey-dark-200 text-c-2 col-12 mb-1 font-medium">Destination</span>
                          <div class="col-auto flex items-center gap-2">
                            <span v-if="stops.length > 0" class="text-b-4 font-medium dark:text-white">
                              {{ stops[stops.length-1].value }}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-3">
                    <div class="row border-r">
                      <span class="text-grey-dark-200 text-c-2 col-12 mb-1 font-medium">Equipment Type</span>
                      <span v-if="stops.length > 0" class="text-b-4 font-medium dark:text-white">
                        Box Truck
                      </span>
                    </div>
                  </div>
                  <div class="col-3">
                    <div class="row">
                      <span class="text-grey-dark-200 text-c-2 col-12 mb-1 font-medium">Carrier Rate</span>
                      <span v-if="stops.length > 0" class="text-b-4 font-medium dark:text-white">
                        $1,200
                      </span>
                    </div>
                  </div>
                </div>

                <h6 class="my-6 font-semibold">
                  Do you want to create a new quote?
                </h6>
                <Form fclass="row my-2">
                  <div class="col-6 mb-6">
                    <Input
                      v-model="request.name"
                      name="customerName"
                      type="text"
                      label="Customer Name"
                      rules="required"
                    />
                  </div>
                  <div class="col-6 mb-6">
                    <Input
                      v-model="request.customer_email"
                      name="customerEMail"
                      type="text"
                      label="Customer E-mail"
                      rules="required"
                    />
                  </div>
                  <div class="col-6 mb-6">
                    <Input
                      v-model="brokerMargin"
                      name="brokerMargin"
                      type="number"
                      label="Broker Margin"
                      rules="required"
                    />
                  </div>
                  <div class="col-6 mb-6">
                    <phone-input
                      v-model="request.customer_phone_number"
                      name="customerPhoneNo"
                      label="Customer Phone Number"
                      :thin="true"
                      minlength="14"
                      maxlength="14"
                      rules="min:14|max:14"
                    />
                  </div>
                  <div class="mb-8 flex flex-col justify-center items-center">
                    <p class="text-b-4 font-medium text-gray-400 text-start">
                      Customer quote
                    </p>
                    <h4 class="font-semibold">
                      {{ '$' + customerQuote }}
                    </h4>
                  </div>
                </Form>
              </div>
              <div class="col-8">
                <Button
                  :type="ButtonTypeEnum.GREEN"
                  :size="SizeTypeEnum.LG"
                  @click="() => { $refs.modal2.hideModal() }"
                >
                  Create a new quote
                </Button>
                <Button
                  :type="ButtonTypeEnum.LINK"
                  :size="SizeTypeEnum.LG"
                  :action="ActionTypeEnum.BUTTON"
                  class="mt-2"
                  @click="() => { $refs.modal2.hideModal() }"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </Modal>
          <Modal ref="modal3" size="lg">
            <div slot="body" class="row flex items-center justify-center py-0">
              <div class="col-8 items-center justify-center my-0">
                <h3 class="font-semibold text-center mb-4 mt-4">
                  Add Quote
                </h3>
                <Form fclass="row my-2" @send="handleSubmit">
                  <div class="col-6 mb-6">
                    <Input
                      v-model="request.name"
                      name="customerName"
                      type="text"
                      label="Customer Name"
                      rules="required"
                    />
                  </div>
                  <div class="col-6 mb-6">
                    <Input
                      v-model="request.customer_email"
                      name="customerEMail"
                      type="text"
                      label="Customer E-mail"
                      rules=""
                    />
                  </div>
                  <div class="col-6 mb-6">
                    <phone-input
                      v-model="request.customer_phone_number"
                      name="customerTwoPhoneNo"
                      label="Customer Phone Number"
                      :thin="true"
                      minlength="14"
                      maxlength="14"
                      rules="min:14|max:14"
                    />
                  </div>
                  <div class="col-6 mb-6">
                    <m-select
                      v-model="request.origin"
                      :multiple="false"
                      :searchable="true"
                      :bind-text="true"
                      :addable="true"
                      :options="locationsOptions"
                      name="originLocation"
                      rules="required"
                      label="Origin"
                    />
                  </div>
                  <div class="col-6 mb-6">
                    <m-select
                      v-model="request.destination"
                      :multiple="false"
                      :searchable="true"
                      :bind-text="true"
                      :options="locationsOptions"
                      :addable="true"
                      rules="required"
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
                    <m-select
                      v-model="request.equipment_type"
                      :multiple="false"
                      :searchable="true"
                      :options="equipmentOptions"
                      :addable="true"
                      :bind-text="true"
                      name="equipmentType"
                      type="text"
                      label="Equipment Type"
                      rules="required"
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
                    <Input
                      v-model.number="request.quote"
                      name="quote"
                      type="number"
                      label="Customer Quote"
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
                        @click="() => { $refs.modal3.hideModal() }"
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
                        Add Quote
                      </Button>
                    </div>
                  </div>
                </Form>
              </div>
            </div>
          </Modal>
        </div>
        <div class="w-32 h-10">
          <Button
            class="flex"
            :type="ButtonTypeEnum.PRIMARY"
            :size="SizeTypeEnum.MD"
            :action="ActionTypeEnum.BUTTON"
            @click="$refs.modal3.showModal()"
          >
            Add Quote
          </Button>
        </div>
      </template>
    </PageHeader>
    <div class="border border-gray-300/50 bg-gray-300/20 w-full rounded-lg flex flex-row p-3 mb-8 filter-drops">
      <div class="row items-center w-full">
        <div class="ml-auto w-[7.5rem]">
          <div class="view-mode relative">
            <div class="mode" @click="mode = 'grid'">
              <Icon
                variant="linear"
                :color="mode === 'grid' ? 'white': 'gray'"
                :alpha="mode === 'grid' ? 0 : 400"
                :disable-fill="true"
                icon="pause"
                class="w-5 h-5 rotate-90"
              />
            </div>
            <div class="mode" @click="mode = 'list'">
              <Icon
                variant="linear"
                :color="mode === 'list' ? 'white': 'gray'"
                :alpha="mode === 'list' ? 0 : 400"
                :disable-fill="true"
                icon="textalign-justifycenter"
                class="w-5 h-5"
              />
            </div>
            <div
              class="select-backdrop absolute top-1 left-1 w-10 h-8 z-0 bg-dark-blue rounded-lg transition-all"
              :class="[{'translate-x-12' : mode === 'list'}]"
            />
          </div>
        </div>
      </div>
    </div>
    <div v-if="mode==='grid'" key="grid">
      <div class="flex w-100 flex-wrap">
        <div v-for="(data, index) in quotes" :key="index" class="load px-2.5 col-12 mb-2 flex flex-col justify-between">
          <BrokerCard class="mb-4" :link-id="data.id" :data="data" />
        </div>
      </div>
      <Pagination :request-function="getQuotes" :page-count="quotePageCount" />
    </div>
    <div v-if="mode==='list'" key="list">
      <Table
        title="Quotes"
        icon="archive"
        icon-color="green"
        :icon-alpha="800"
        :headers="headers"
        :data="quotes"
        :filtering-model="vfilter"
        :page-count="quotePageCount"
        :request-function="getQuotes"
        :search-enabled="true"
        :extend-enabled="false"
        :delete-enabled="true"
        :delete-function="removeQuote"
        :edit-enabled="true"
        edit-page="EditQuotes"
        class="mb-10"
      >
        <template #custom-filter>
          <div class="flex flex-wrap p-6">
            <div
              v-for="(filter, index) in filterModels"
              v-if="filter.tabShown === innerTab"
              :key="index"
              :class="`col-${filter.colSpan} px-1 mb-2`"
            >
              <Input
                v-if="filter.inputType === 'input' || filter.inputType === 'date'"
                v-model="vfilter[filter.modelName]"
                :name="filter.modelName"
                :type="filter.inputType === 'input' ? 'text' : 'date'"
                :placeholder="filter.filterName"
                :debounce-timer="1000"
              />
              <m-select
                v-else
                v-model="vfilter[filter.modelName]"
                :options="filter.options"
                :name="filter.filterName"
                :horizontal="filter.multiple !== undefined && filter.multiple"
                :placeholder="filter.filterName"
                :bind-text="true"
                :is-nullable="true"
              />
            </div>
          </div>
        </template>
        <template #item-shipper_name="{ data, index }">
          <div class="flex items-center">
            <div class="col-auto pr-0 mr-2">
              <img src="/images/Intel.png" :alt="data[index].shipper_name" class="rounded-full w-10 h-10">
            </div>
            <div class="col-auto">
              <span class="block whitespace-nowrap">
                {{ data[index].shipper_name }}
              </span>
            </div>
          </div>
        </template>
        <template #item-last_quote="{ data, index }">
          <div class="row">
            <div class="col-auto">
              <span class="block">
                ${{ data[index].last_quote }} / ${{ data[index].quote }}
              </span>
            </div>
          </div>
        </template>
        <template #item-quote_status="{ item }">
          <Status
            :item="item"
            :active="extendeds.includes(item.id)"
            :item-status="item.quote_status"
            :dropdown-menu="dropdownQuoteStatusMenu"
            :dropdown-style="dropdownQuoteStatusStyle"
            @extend="extendItemQuoteStatus"
            @set-status="setQuoteStatus"
          />
        </template>
      </Table>
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
} from '@/components/ts/enums'
import { SelectOption } from '~/components/ts/interfaces'
import { QuotesDetails } from '~/models/Broker/Quotes/QuotesDetails'
import ApiService from '~/services/baseService'

const service = ApiService
export default Vue.extend({
  layout: 'Dashboard',
  data () {
    return {
      brokerMargin: 0,
      dropdownQuoteStatusStyle: 'a',
      dropdownQuoteStatusMenu: [
        { text: 'Open', bg: 'green' },
        { text: 'Closed', bg: 'red' },
        { text: 'Awarded', bg: 'orange' }
      ],
      extendeds: [] as any[],
      showModal: false,
      request: {} as QuotesDetails,
      response: {
        equipment: '',
        destination: '',
        origin: ''
      },
      stops: [
        {
          id: 10,
          value: 'Roanoke, TX',
          code: 'CLT5',
          driver: 'Jenny Wilson',
          totalMiles: 425.5,
          totalDuration: '1d 10h 15m',
          bolLink: '#'
        },
        {
          id: 11,
          value: 'Roanoke, TX',
          code: 'BHM1',
          driver: 'Jenny Wilson',
          totalMiles: 425.5,
          totalDuration: '1d 10h 15m',
          bolLink: '#'
        },
        {
          id: 12,
          value: 'Roanoke, TX',
          code: 'AGS5',
          driver: 'Jenny Wilson',
          totalMiles: 425.5,
          totalDuration: '1d 10h 15m',
          bolLink: '#'
        },
        {
          id: 13,
          value: 'Roanoke, TX',
          code: 'HKL1',
          driver: 'Guy Hawkins',
          totalMiles: 425.5,
          totalDuration: '1d 10h 15m',
          bolLink: '#'
        },
        {
          id: 14,
          value: 'Oxnard, CA',
          code: 'MYK3',
          driver: 'Guy Hawkins',
          totalMiles: 425.5,
          totalDuration: '1d 10h 15m',
          bolLink: '#'
        }
      ],
      innerTab: 0,
      vfilter: {} as { [key: string]: unknown },
      filterModels: [
        {
          modelName: 'name',
          filterName: 'Customer Name',
          inputType: 'input',
          colSpan: 3,
          multiple: true,
          tabShown: 0,
          options: [
            { id: 1, text: 'Tabbatha Sawford' },
            { id: 2, text: 'Queenie McHale' },
            { id: 3, text: 'Giralda Kilfoyle' }
          ]
        },
        {
          modelName: 'origin',
          filterName: 'Origin',
          inputType: 'input',
          colSpan: 2,
          multiple: true,
          tabShown: 0
        },
        {
          modelName: 'destination',
          filterName: 'Destination',
          inputType: 'input',
          colSpan: 2,
          multiple: true,
          tabShown: 0
        },
        {
          modelName: 'status',
          filterName: 'Status',
          inputType: 'select',
          colSpan: 3,
          multiple: true,
          tabShown: 0,
          options: [
            { id: 1, text: 'Open' },
            { id: 2, text: 'Closed' },
            { id: 3, text: 'Awarded' },
            { id: 4, text: 'Pending' }
          ]
        }
      ],
      ButtonTypeEnum,
      ActionTypeEnum,
      SizeTypeEnum,
      selectedFilter: '',
      headers: {
        name: {
          label: 'Customer Name'
        },
        customer_email: {
          label: 'Customer E-mail'
        },
        customer_phone_number: {
          label: 'Customer Phone Number'
        },
        quote: {
          label: 'Customer Quote'
        },
        id: {
          label: 'Quote ID'
        },
        load_id: {
          label: 'Load ID'
        },
        origin: {
          label: 'Origin'
        },
        destination: {
          label: 'Destination'
        },
        pickup_time: {
          label: 'Pickup Date'
        },
        delivery_time: {
          label: 'Delivery Date'
        },
        // last_quote: {
        //   label: 'Last/New Quote'
        // },
        cargo_type: {
          label: 'Commodity Type'
        },
        cargo_weight: {
          label: 'Weight'
        },
        equipment_type: {
          label: 'Equipment Type'
        },
        status: {
          label: 'Status'
        }
      },
      data: [
        {
          avatar: '/images/Intel.png',
          shipper_name: 'Catalog',
          quote_id: 'Q09621',
          load_id: 'LD09621',
          origin: 'Roanoke, TX',
          destination: 'Phoenix, AZ',
          pickup_date: '17 Oct, 2020',
          delivery_date: '17 Oct, 2020',
          last_new_quote: '$500 / $450',
          cargo_type: 'Industrial Equipment',
          status: 'Open'
        },
        {
          avatar: '/images/Intel.png',
          shipper_name: 'Catalog',
          quote_id: 'Q09621',
          load_id: 'LD09621',
          origin: 'Roanoke, TX',
          destination: 'Phoenix, AZ',
          pickup_date: '17 Oct, 2020',
          delivery_date: '17 Oct, 2020',
          last_new_quote: '$500 / $450',
          cargo_type: 'Industrial Equipment',
          status: 'Open'
        },
        {
          avatar: '/images/Intel.png',
          shipper_name: 'Catalog',
          quote_id: 'Q09621',
          load_id: 'LD09621',
          origin: 'Roanoke, TX',
          destination: 'Phoenix, AZ',
          pickup_date: '17 Oct, 2020',
          delivery_date: '17 Oct, 2020',
          last_new_quote: '$500 / $450',
          cargo_type: 'Industrial Equipment',
          status: 'Open'
        },
        {
          avatar: '/images/Intel.png',
          shipper_name: 'Catalog',
          quote_id: 'Q09621',
          load_id: 'LD09621',
          origin: 'Roanoke, TX',
          destination: 'Phoenix, AZ',
          pickup_date: '17 Oct, 2020',
          delivery_date: '17 Oct, 2020',
          last_new_quote: '$500 / $450',
          cargo_type: 'Industrial Equipment',
          status: 'Open'
        },
        {
          avatar: '/images/Intel.png',
          shipper_name: 'Catalog',
          quote_id: 'Q09621',
          load_id: 'LD09621',
          origin: 'Roanoke, TX',
          destination: 'Phoenix, AZ',
          pickup_date: '17 Oct, 2020',
          delivery_date: '17 Oct, 2020',
          last_new_quote: '$500 / $450',
          cargo_type: 'Industrial Equipment',
          status: 'Open'
        },
        {
          avatar: '/images/Intel.png',
          shipper_name: 'Catalog',
          quote_id: 'Q09621',
          load_id: 'LD09621',
          origin: 'Roanoke, TX',
          destination: 'Phoenix, AZ',
          pickup_date: '17 Oct, 2020',
          delivery_date: '17 Oct, 2020',
          last_new_quote: '$500 / $450',
          cargo_type: 'Industrial Equipment',
          status: 'Open'
        },
        {
          avatar: '/images/Intel.png',
          shipper_name: 'Catalog',
          quote_id: 'Q09621',
          load_id: 'LD09621',
          origin: 'Roanoke, TX',
          destination: 'Phoenix, AZ',
          pickup_date: '17 Oct, 2020',
          delivery_date: '17 Oct, 2020',
          last_new_quote: '$500 / $450',
          cargo_type: 'Industrial Equipment',
          status: 'Open'
        }
      ],
      filters: [
        { id: 1, text: 'Filter 1', selected: true },
        { id: 2, text: 'Filter 2', selected: false },
        { id: 3, text: 'Filter 3', selected: false },
        { id: 4, text: 'Filter 4', selected: false }
      ] as SelectOption[],
      filters2: [
        { id: 1, text: 'Filter 1', selected: true },
        { id: 2, text: 'Filter 2', selected: false }
      ] as SelectOption[],
      statusOptions: [
        { id: 1, text: 'Open', selected: false },
        { id: 2, text: 'Closed', selected: false },
        { id: 3, text: 'Awarded', selected: false }
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
      ] as SelectOption[],
      locationsOptions: [
        { id: 1, text: 'Naperville, IL', selected: false },
        { id: 2, text: 'Tacoma, WA', selected: false },
        { id: 3, text: 'Phoenix, AZ', selected: false },
        { id: 4, text: ' Houston, TX', selected: false }

      ]as SelectOption[],
      testOptions: [
        { id: 1, text: '53\' Dryvan', selected: true },
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
      ] as SelectOption[],
      mode: 'list'
    }
  },
  computed: {
    customerQuote () {
      if (this.brokerMargin) {
        return parseInt(this.brokerMargin) + 1200
      } else {
        return 1200
      }
    },
    quote (): QuotesDetails {
      return (this.$store.getters['Broker/quotes/quote'])
    },
    quotes (): QuotesDetails[] {
      return (this.$store.getters['Broker/quotes/brokerQuotes'])
    },
    quotePageCount (): Number {
      return (this.$store.getters['Broker/quotes/pageCount'])
    },
    brokerId (): number {
      return this.$store.state.brokerId
    }
  },
  methods: {
    extendItemQuoteStatus (event:MouseEvent, item: any, menuItem?:string | null): void {
      if (menuItem) { item.impact = menuItem }

      if (this.extendeds.includes(item.id)) {
        this.extendeds = this.extendeds.filter((a: any) => {
          return a !== item.id
        })
      } else {
        this.extendeds.push(item.id)
        const { clientX, clientY } = event
        this.dropdownQuoteStatusStyle = {
          top: `${clientY + 20}px`,
          left: `${clientX - 100}px`
        }
      }
    },
    setQuoteStatus (id:number, newStatus:any) {
      const data = this.quotes.slice()
      console.log(id, newStatus)
      const item = data.find((w:any) => w.id === id)
      this.updateQuote({
        ...item,
        quote_status: newStatus,
        delivery_date: moment(item.delivery_date).toISOString(),
        pickup_date: moment(item.pickup_date).toISOString()
      })
    },
    ...mapActions({
      addQuote: (action, param) => action('Broker/quotes/addQuote', param),
      updateQuote: (action, request) => action('Broker/quotes/updateQuote', request),
      getQuote: (action, id) => action('Broker/quotes/getQuote', id),
      getQuotes: (action, page) => action('Broker/quotes/getQuotesByBrokerId', page),
      removeQuote: (action, page) => action('Broker/quotes/removeQuote', page)
    }),
    drawer () {
      (this.$refs.drawer as Vue & { showDrawer: (component: String, routeUrl?: String) => Element }).showDrawer('AddQuotes')
    },
    handleSubmit () {
      this.addQuote({
        ...this.request,
        // broker_id: this.brokerId,
        pickup_time: moment(this.request.pickup_time).toISOString(),
        delivery_time: moment(this.request.delivery_time).toISOString(),
        // load_id: 1,
        status:'Open',
        // customer_phone_number: undefined,
        customer_email: undefined
      });
      (this.$refs.modal3 as Vue & { hideModal: () => Element }).hideModal()
    },
    hideModal (): void {
      (this.$refs.modal as Vue & { hideModal: () => Function }).hideModal();
      (this.$refs.modal3 as Vue & { hideModal: () => Function }).hideModal()
    },

    // id = id="modal"
    // ref = $('#modal')
    openModal () {
      (this.$refs.modal2 as Vue & { showModal: () => Element }).showModal()
    }
  },
  // mounted() {
  //   this.service.get(`/brokers`).then((res: any) => {
  //     console.warn(res);
  //   })
  // }
  
})
</script>

<style>
  .filter-tabs .filter-tab {
    @apply mx-2 my-1 px-1 py-[6px] flex items-center cursor-pointer rounded-md;
  }
  .view-mode {
   @apply  flex items-center gap-2 bg-white rounded-lg w-full p-1 border border-gray-300;
  }
  .view-mode .mode {
    @apply w-11 h-8 flex items-center justify-center cursor-pointer z-10;
  }
</style>
