<template>
  <div
    class="load-card p-4 bg-white rounded-xl transition-all duration-500
      hover:border-transparent dark:bg-[#21293B] shadow-2xl shadow-gray-500/10 dark:shadow-none"
  >
    <div class="load-body px-6 py-2 flex flex-auto border-b border-b-grey-blue-100 dark:border-b-gray-600">
      <div class="col-6">
        <div class="card-left col-span-3">
          <div class="flex ml-[-1rem]">
            <img class="inline-block h-12 w-12 rounded-full ring-2 ring-white" src="/images/Amazon.png" alt="driver">
            <div>
              <span class="font-medium text-b-4 block">{{ data.shipper_name }}</span>
              <div class="col-6 text-gray-400 text-c-2">
                <span class="font-medium">Shipper</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-8 pl-4">
        <div class="flex gap-1">
          <Icon
            icon="calendar"
            variant="bulk"
            color="green"
            :alpha="500"
            class="w-8 h-8"
          />
          <div class="flex flex-col px-2">
            <span class="text-grey-dark-200 text-c-1 block">Load Complete</span>
            <span class="font-medium text-b-4 block">{{ formatDate(data.load_complete_date) }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="card-right col-span-4 mb-4">
      <div class="row mt-7">
        <div class="col-4">
          <div class="flex gap-1">
            <div class="flex flex-col">
              <span class="text-grey-dark-200 text-c-1 block">Load ID</span>
              <span class="font-medium text-b-4 block">{{ data.load_id }}</span>
            </div>
          </div>
        </div>
        <div class="col-4">
          <div class="flex gap-1">
            <div class="flex flex-col">
              <span class="text-grey-dark-200 text-c-1 block">Broker ID</span>
              <span class="font-medium text-b-4 block">{{ data.broker_id }}</span>
            </div>
          </div>
        </div>
        <div class="col-4">
          <div class="flex gap-1">
            <div class="flex flex-col">
              <span class="text-grey-dark-200 text-c-1 block">Invoice ID</span>
              <span class="font-medium text-b-4 block">{{ data.invoice_id }}</span>
            </div>
          </div>
        </div>
        <div class="col-4">
          <div class="flex gap-1">
            <div class="flex flex-col">
              <span class="text-grey-dark-200 text-c-1 block">Driver</span>
              <span class="font-medium text-b-4 block">{{ data.driver_name }}</span>
            </div>
          </div>
        </div>
        <div class="col-4">
          <div class="flex gap-1">
            <div class="flex flex-col">
              <span class="text-grey-dark-200 text-c-1 block">Driver ID</span>
              <span class="font-medium text-b-4 block">{{ data.driver_id }}</span>
            </div>
          </div>
        </div>
        <div class="col-4">
          <div class="flex gap-1">
            <div class="flex flex-col">
              <span class="text-grey-dark-200 text-c-1 block">Gross Pay</span>
              <span class="font-medium text-b-4 block">$ {{ data.gross_pay }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="card-bottom px-6 py-5 flex flex-auto border-t border-t-grey-blue-100 dark:border-t-gray-600">
      <div class="col-6">
        <div class="flex gap-1 border-r border-r-grey-blue-100 dark:border-r-gray-600">
          <div class="bg-purple-100 w-10 h-10 rounded-full flex items-center justify-center">
            <Icon
              icon="document-text"
              variant="bulk"
              color="purple"
              :alpha="500"
              class="w-8 h-8"
            />
          </div>
          <div class="flex flex-col justify-center">
            <span class="font-medium text-b-4 block">3 Docs</span>
          </div>
          <div class="text-c-1 col-auto items-center flex gap-2 font-medium m-2 cursor-pointer">
            <Icon
              icon="export-3"
              color="dark-blue"
              class="w-4 h-4"
            />
          </div>
        </div>
      </div>
      <div class="col-6">
        <div class="flex gap-1 pl-4">
          <div class="bg-purple-100 w-10 h-10 rounded-full flex items-center justify-center">
            <Icon
              icon="document-text"
              variant="bulk"
              color="purple"
              :alpha="500"
              class="w-8 h-8"
            />
          </div>
          <div class="flex flex-col col-6 justify-center">
            <span class="font-medium text-b-4 block">3 Notes</span>
          </div>
          <div class="text-c-1 col-auto items-center flex gap-2 font-medium m-2 cursor-pointer">
            <Icon icon="export-3" color="dark-blue" class="w-4 h-4" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
// import Vue from 'vue'
import { PropOptions } from 'vue'
import moment from 'moment'
import { SizeTypeEnum } from './ts/enums'
import { InvoicingDetails } from '~/models/Broker/invoicingDetails/invoicingDetails'

export default {
  name: 'BrokerInvoicing',
  props: {
    data: {
      type: Object,
      required: true,
      default: null
    } as PropOptions<InvoicingDetails>,
    linkId: {
      type: Number,
      default: null
    }
  },
  data () {
    return {
      SizeTypeEnum,
      shipper: '',
      load_complete: '',
      load_id: '',
      broker_id: '',
      invoice_id: '',
      driver: '',
      driver_id: '',
      gross_pay: '',
      docs: '',
      notes: '',
      showDetail: false
    }
  },
  methods: {
    formatDate (date: string) {
      return moment(date).format('MM-DD-yyyy')
    }
  }
}
</script>

    <style scoped>

    </style>
