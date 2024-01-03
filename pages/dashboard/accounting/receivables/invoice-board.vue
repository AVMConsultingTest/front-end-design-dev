<template>
  <div class="w-full">
    <PageHeader title="Invoice Board" class="mb-10" :no-actions="true" @goback="$router.go(-1)" />
    <div class="row mb-5">
      <div class="col-12">
        <Table
          title="Invoice Board"
          icon="bill"
          icon-color="green"
          :icon-alpha="800"
          :icon-rounded="true"
          :search-enabled="true"
          :headers="headers"
          :data="testData"
          :filter-enabled="true"
        >
          <template #item-load="{ item }">
            <nuxt-link to="#">
              <span class="text-dark-blue"> {{ item.load }}</span>
            </nuxt-link>
          </template>
          <template #item-load_complete_date="{ item }">
            <span class="font-normal"> {{ item.load_complete_date }}</span>
          </template>
          <template #item-broker_id="{ item }">
            <span class="text-gray-400"> {{ item.broker_id }}</span>
          </template>
          <template #item-driver_id="{ item }">
            <span class="font-normal"> {{ item.driver_id }}</span>
          </template>
          <template #item-payout="{ item }">
            <span> {{ item.payout | toCurrency }}</span>
          </template>
          <template #item-documents="{ item }">
            <div class="flex items-center gap-2">
              <Icon icon="document-text" color="purple-blue" :alpha="0" variant="bulk" class="w-4 h-4" />
              <span> {{ item.documents.length }} Doc(s)</span>
            </div>
          </template>
          <template #item-status="{ item }">
            <div
              :id="item.id"
              class="relative"
            >
              <div
                @click="(e)=> {extendItem(e,item)}"
              >
                <Badge
                  :title="item.status[0].toUpperCase() + item.status.slice(1)"
                  :class="[
                    { 'bg-green-100 text-green-800': item.status === 'Paid' },
                    { 'bg-orange-100 text-orange-800': item.status === 'Rejected' },
                    { 'bg-red-100 text-red-800': item.status.includes('In-dispute') },
                  ]"
                  icon="arrow-down-1"
                  :right-icon="true"
                  :size="SizeTypeEnum.MD"
                />
              </div>
              <transition name="slide">
                <div
                  v-if="extendeds.includes(item.id)"
                  class="fixed flex justify-between top-20 rounded-lg bg-white left-0 right-0  w-40 shadow-2xl z-50"
                  :style="[extendeds.includes(item.id) ? findDiv(item.id) : '',dropdownStyle]"
                >
                  <ul class="px-4 py-5 col-12 h-72 overflow-auto sidebar-scroll">
                    <h6 class="font-semibold mb-4">
                      Status
                    </h6>
                    <li
                      v-for="(menuItem, index) in dropdownMenu"
                      :key="index"
                      class="text-c-1 font-semibold text-gray-800 w-full flex items-center justify-between cursor-pointer mb-7"
                      @click="item.status = menuItem"
                    >
                      {{ menuItem }}
                      <Icon
                        v-if="item.status === menuItem"
                        icon="tick-circle"
                        variant="linear"
                        color="blue"
                        :disable-fill="true"
                        class="w-6 h-6"
                      />
                    </li>
                  </ul>
                  <div class="tester hidden" @click="(e)=> {extendItem(e,item)}">
                    <Icon
                      icon="close-square"
                      variant="linear"
                      color="red"
                      :disable-fill="true"
                      class="w-6 h-6 mt-2"
                    />
                  </div>
                </div>
              </transition>
            </div>
          </template>
        </Table>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { SizeTypeEnum } from '@/components/ts/enums'
import { SelectOption } from '~/components/ts/interfaces'
export default Vue.extend({
  name: 'InvoiceBoard',
  layout: 'Dashboard',
  data () {
    return {
      SizeTypeEnum,
      extendeds: [] as any[],
      dropdownStyle: '',
      dropdownMenu: [
        'Paid',
        'Rejected',
        'In-dispute'
      ],
      statusOptions: [
        { id: 1, text: 'Paid' },
        { id: 2, text: 'Rejected' },
        { id: 3, text: 'In-dispute' }
      ],
      headers: {
        load: {
          label: 'Load',
          searchable: true,
          sortable: true
        },
        load_complete_date: {
          label: 'Load Complete Date',
          searchable: true,
          sortable: true
        },
        broker_name:
                {
                  label: 'Amazon',
                  searchable: true,
                  sortable: true
                },
        broker_id:
                {
                  label: 'Broker ID',
                  searchable: true,
                  sortable: true
                },
        driver_name:
                {
                  label: 'Driver Name',
                  searchable: true,
                  sortable: true
                },
        driver_id: {
          label: 'Driver ID',
          searchable: true,
          sortable: true
        },
        payout:
                {
                  label: 'Payout',
                  searchable: true,
                  sortable: true
                },
        documents:
                {
                  label: 'Documents',
                  searchable: true,
                  sortable: true
                },
        invoice_id:
                {
                  label: 'Invoice ID',
                  searchable: true,
                  sortable: true
                },
        billing:
                {
                  label: 'Billing',
                  searchable: true,
                  sortable: true
                },
        factory_payment:
                {
                  label: 'Factory Payment',
                  searchable: true,
                  sortable: true
                },
        status:
                {
                  label: 'Status',
                  searchable: true,
                  sortable: true,
                  sticky: true
                }
      },
      testData: [
        {
          id: 1,
          load: 'Load 1',
          load_complete_date: '6/17/2022',
          broker_name: 'Amazon',
          broker_id: 'MC #1',
          driver_name: 'Bill Sanders',
          driver_id: '#1123',
          payout: 3.122,
          documents: ['doc1', 'doc2', 'doc3'],
          invoice_id: 3498,
          billing: 'Factory',
          factory_payment: 'Paid',
          status: 'Paid'
        },
        {
          id: 2,
          load: 'Load 1',
          load_complete_date: '6/17/2022',
          broker_name: 'Amazon',
          broker_id: 'MC #1',
          driver_name: 'Bill Sanders',
          driver_id: '#1123',
          payout: 3.122,
          documents: ['doc1', 'doc2', 'doc3'],
          invoice_id: 3498,
          billing: 'Factory',
          factory_payment: 'Paid',
          status: 'Rejected'
        },
        {
          id: 3,
          load: 'Load 1',
          load_complete_date: '6/17/2022',
          broker_name: 'Amazon',
          broker_id: 'MC #1',
          driver_name: 'Bill Sanders',
          driver_id: '#1123',
          payout: 3.122,
          documents: ['doc1', 'doc2', 'doc3'],
          invoice_id: 3498,
          billing: 'Factory',
          factory_payment: 'Paid',
          status: 'Paid'
        },
        {
          id: 4,
          load: 'Load 1',
          load_complete_date: '6/17/2022',
          broker_name: 'Amazon',
          broker_id: 'MC #1',
          driver_name: 'Bill Sanders',
          driver_id: '#1123',
          payout: 3.122,
          documents: ['doc1', 'doc2', 'doc3'],
          invoice_id: 3498,
          billing: 'Factory',
          factory_payment: 'Pending',
          status: 'Rejected'
        },
        {
          id: 5,
          load: 'Load 1',
          load_complete_date: '6/17/2022',
          broker_name: 'Amazon',
          broker_id: 'MC #1',
          driver_name: 'Bill Sanders',
          driver_id: '#1123',
          payout: 3.122,
          documents: ['doc1', 'doc2', 'doc3'],
          invoice_id: 3498,
          billing: 'Factory',
          factory_payment: 'Paid',
          status: 'In-dispute'
        },
        {
          id: 6,
          load: 'Load 1',
          load_complete_date: '6/17/2022',
          broker_name: 'Amazon',
          broker_id: 'MC #1',
          driver_name: 'Bill Sanders',
          driver_id: '#1123',
          payout: 3.122,
          documents: ['doc1', 'doc2', 'doc3'],
          invoice_id: 3498,
          billing: 'Factory',
          factory_payment: 'Paid',
          status: 'Paid'
        },
        {
          id: 7,
          load: 'Load 1',
          load_complete_date: '6/17/2022',
          broker_name: 'Amazon',
          broker_id: 'MC #1',
          driver_name: 'Bill Sanders',
          driver_id: '#1123',
          payout: 3.122,
          documents: ['doc1', 'doc2', 'doc3'],
          invoice_id: 3498,
          billing: 'Factory',
          factory_payment: 'Pending',
          status: 'In-Dispute'
        }
      ]
    }
  },
  methods: {
    findDiv (id: number) {
      if (id === undefined) { return '' }
      const offsets = ((document as Document).getElementById(id.toString()) as HTMLElement).getBoundingClientRect()
      const top = offsets.top
      const left = offsets.left
      return `left: ${left}; top: ${top}`
    },
    extendItem (event:any, item: any): void {
      if (this.extendeds.includes(item.id)) {
        this.extendeds = this.extendeds.filter((a: any) => {
          return a !== item.id
        })
      } else {
        this.extendeds.push(item.id)
        const { clientX, clientY } = event
        this.dropdownStyle = {
          top: `${clientY + 20}px`,
          left: `${clientX - 100}px`
        }
      }
    }
  }
})
</script>

<style scoped>

</style>
