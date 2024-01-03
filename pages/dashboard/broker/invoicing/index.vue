<template>
  <div class="w-full">
    <Drawer ref="drawer" />
    <PageHeader title="Invoicing" class="mb-10">
      <template #actions>
        <div class="w-32 h-10 mr-2">
          <Button
            class="flex bg-dark-blue"
            :type="ButtonTypeEnum.PRIMARY"
            :size="SizeTypeEnum.MD"
            :action="ActionTypeEnum.BUTTON"
            @click="drawer('BrokerCreateInvoice')"
          >
            Add New Invoice
          </Button>
        </div>
      </template>
    </PageHeader>
    <div class="border border-gray-300/50 bg-gray-300/20 w-full rounded-lg flex flex-row p-3 mb-8 filter-drops">
      <div class="row items-center w-full">
        <div class="col-2">
          <m-select
            v-model="selectedFilter"
            wrapper-class="bg-white"
            drop-icon="sort"
            name="Filter"
            placeholder="Filters"
            :options="filters"
          />
        </div>
        <div class="col-3">
          <m-select
            v-model="selectedFilter"
            wrapper-class="bg-white"
            name="Filter"
            placeholder="Filters"
            :options="filters"
          />
        </div>
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
    <div class="broker-cards">
      <transition-group name="fade" mode="in-out">
        <div v-if="mode==='grid'" key="grid">
          <div class="flex w-100 flex-wrap">
            <div v-for="(data, index) in invoices" :key="index" class="load px-2.5 col-6 mb-5 flex flex-col justify-between">
              <BrokerInvoicing class="border-2 mx-12 mb-4" :link-id="index" :data="data" />
            </div>
          </div>
          <Pagination :request-function="getInvoices" :page-count="invoicePageCount" />
        </div>
        <div v-if="mode==='list'" key="list">
          <Table
            title="Invoicing"
            icon="note-2"
            icon-color="purple"
            :icon-alpha="800"
            :headers="headers"
            :data="invoices"
            :search-enabled="true"
            :request-function="getInvoices"
            :page-count="invoicePageCount"
            :multiple-enabled="true"
            class="mb-10"
          >
            <template #item-load_id="{ item }">
              <div class="block text-dark-blue">
                {{ item.load_id }}
              </div>
            </template>
            <template #item-load_pickup_date="{ item }">
              <div class="block text-gray-400 whitespace-nowrap">
                {{ formatDate(item.load_pickup_date) }}
              </div>
            </template>
            <template #item-load_delivery_date="{ item }">
              <div class="block whitespace-nowrap">
                {{ formatDate(item.load_delivery_date) }}
              </div>
            </template>
            <template #item-notes="{item}">
              <NotesEdit
                :item="getNoteItem(item)"
                note-prop-key="notes"
                :edit-function="updateInvoice"
              />
            </template>
            <template #item-status="{ item }">
              <Badge
                :icon-color="'green'"
                :title="item.status[0].toUpperCase() + item.status.slice(1)"
                class="bg-green-100 text-green-800"
                :size="SizeTypeEnum.MD"
              />
            </template>
            <template #item-customer_payment_status="{ item }">
              <Badge
                :title="item.customer_payment_status"
                :class="[
                  {'bg-[#ECFDF3] text-[#027A48]' : item.customer_payment_status === 'Paid'},
                  {'bg-orange-200 text-orange' : item.customer_payment_status === 'Pending'},
                ]"
                :size="SizeTypeEnum.SM"
              />
            </template>
            <template #item-carrier_payment_status="{ item }">
              <Badge
                :title="item.carrier_payment_status"
                :class="[
                  {'bg-[#ECFDF3] text-[#027A48]' : item.carrier_payment_status === 'Paid'},
                  {'bg-orange-200 text-orange' : item.carrier_payment_status === 'Pending'},
                ]"
                :size="SizeTypeEnum.SM"
              />
            </template>
            <template #item-invoice_status="{ item }">
              <Badge
                :title="item.invoice_status"
                :class="[
                  {'bg-blue-200 text-blue-800' : item.invoice_status === 'Open'},
                  {'bg-[#D3F4E680] text-green-800' : item.invoice_status === 'Created'},
                  {'bg-purple-200 text-purple-500' : item.invoice_status === 'Submitted'},
                ]"
                :size="SizeTypeEnum.SM"
              />
            </template>
            <template #item-documents="{ data, index }">
              <div class="flex items-center">
                <div class="flex items-center justify-center mr-2">
                  <Icon
                    icon="document-text"
                    color="purple"
                    :alpha="400"
                    variant="bulk"
                    class="w-5 h-5"
                  />
                </div>
                <div class="col-auto pr-0 mr-2">
                  <span class="block whitespace-nowrap">
                    {{ data[index].documents }}
                  </span>
                </div>
              </div>
            </template>
          </Table>
        </div>
      </transition-group>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapActions } from 'vuex'
import moment from 'moment'
import loads from '@/static/loads'
import {
  SizeTypeEnum,
  ActionTypeEnum,
  ButtonTypeEnum
} from '@/components/ts/enums'
import { SelectOption } from '~/components/ts/interfaces'
import { InvoicingDetails } from '~/models/Broker/invoicingDetails/invoicingDetails'
export default Vue.extend({
  name: 'LoadTransit',
  layout: 'Dashboard',
  data () {
    return {
      searchTerm: '',
      ButtonTypeEnum,
      ActionTypeEnum,
      SizeTypeEnum,
      loads,
      headers: {
        broker_id: {
          label: 'Broker Load ID',
          searchable: true
        },
        customer_load_id: {
          label: 'Customer Load ID',
          searchable: true
        },
        invoice_date: {
          label: 'Load Complate Date',
          searchable: true
        },
        customer_name: {
          label: 'Customer Name',
          searchable: true
        },
        customer_id: {
          label: 'Customer ID',
          searchable: true
        },
        carrier_name: {
          label: 'Carrier Name',
          searchable: true
        },
        carrier_id: {
          label: 'Carrier ID',
          searchable: true
        },
        revenue: {
          label: 'Revenue',
          searchable: true
        },
        documents: {
          label: 'Documents',
          searchable: true
        },
        invoice_id: {
          label: 'Invoice ID',
          searchable: true
        },
        customer_payment_status: {
          label: 'Customer Payment',
          searchable: true
        },
        carrier_payment_status: {
          label: 'Carrier Payment',
          searchable: true
        },
        notes: {
          label: 'Notes',
          searchable: true
        },
        invoice_status: {
          label: 'Invoice Status',
          searchable: true,
          sticky: true
        }
      },
      invoicingData: [
        {
          shipper_load_id: 'Load 1',
          load_complete: '09/07/2022',
          shipper_name: 'Bill Sanders',
          broker_id: 'MC # 1',
          driver_name: 'Driver 1',
          driver_id: 'Driver ID 1',
          gross_pay: '$5624',
          documents: '3 Doc',
          invoice_id: '3498',
          notes: 'Test'
        },
        {
          shipper_load_id: 'Load 1',
          load_complete: '09/07/2022',
          shipper_name: 'Bill Sanders',
          broker_id: 'MC # 1',
          driver_name: 'Driver 1',
          driver_id: 'Driver ID 1',
          gross_pay: '$5624',
          documents: '3 Doc',
          invoice_id: '3498',
          notes: 'Test'
        },
        {
          shipper_load_id: 'Load 1',
          load_complete: '09/07/2022',
          shipper_name: 'Bill Sanders',
          broker_id: 'MC # 1',
          driver_name: 'Driver 1',
          driver_id: 'Driver ID 1',
          gross_pay: '$5624',
          documents: '3 Doc',
          invoice_id: '3498',
          notes: 'Test'
        },
        {
          shipper_load_id: 'Load 1',
          load_complete: '09/07/2022',
          shipper_name: 'Bill Sanders',
          broker_id: 'MC # 1',
          driver_name: 'Driver 1',
          driver_id: 'Driver ID 1',
          gross_pay: '$5624',
          documents: '3 Doc',
          invoice_id: '3498',
          notes: 'Test'
        },
        {
          shipper_load_id: 'Load 1',
          load_complete: '09/07/2022',
          shipper_name: 'Bill Sanders',
          broker_id: 'MC # 1',
          driver_name: 'Driver 1',
          driver_id: 'Driver ID 1',
          gross_pay: '$5624',
          documents: '3 Doc',
          invoice_id: '3498',
          notes: 'Test'
        },
        {
          shipper_load_id: 'Load 1',
          load_complete: '09/07/2022',
          shipper_name: 'Bill Sanders',
          broker_id: 'MC # 1',
          driver_name: 'Driver 1',
          driver_id: 'Driver ID 1',
          gross_pay: '$5624',
          documents: '3 Doc',
          invoice_id: '3498',
          notes: 'Test'
        }
      ],
      filters: [
        { id: 1, text: 'Filter 1', selected: true },
        { id: 2, text: 'Filter 2', selected: false },
        { id: 3, text: 'Filter 3', selected: false },
        { id: 4, text: 'Filter 4', selected: false }
      ] as SelectOption[],
      selectedFilter: '',
      mode: 'list'
    }
  },
  computed: {
    invoice (): InvoicingDetails {
      return (this.$store.getters['Broker/invoicingDetails/invoice'])
    },
    invoices (): InvoicingDetails[] {
      return (this.$store.getters['Broker/invoicingDetails/brokerInvoices'])
    },
    invoicePageCount (): Number {
      return (this.$store.getters['Broker/invoicingDetails/pageCount'])
    },
    // loads () {
    //   return this.$store.getters['loads/loads']
    // },
    loadPageCount () {
      return this.$store.getters['loads/pageCount']
    }
  },
  methods: {
    ...mapActions({
      getInvoice: (action, id) => action('Broker/invoicingDetails/getInvoice', id),
      getInvoices: (action, page) => action('Broker/invoicingDetails/getInvoicesByBrokerId', page),
      updateInvoice: (action, request) => action('Broker/invoicingDetails/updateInvoice', request),
      removeInvoice: (action, page) => action('Broker/invoicingDetails/removeInvoice', page)
      // getLoads: (action, page) => action('loads/getLoads', page)
    }),
    formatDate (date: string) {
      return moment(date).format('MM-DD-yyyy')
    },
    drawer (componentName: any) {
      this.$refs.drawer.showDrawer(componentName)
    },
    getNoteItem (item: { [x:string] : any }) {
      return {
        ...item,
        delivery_date: moment(item.load_complete_date).toISOString(),
        invoice_date: moment(item.invoice_date).toISOString(),
        shipment_date: moment(item.shipment_date).toISOString(),
        documents: {}
      }
    }
  }
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
