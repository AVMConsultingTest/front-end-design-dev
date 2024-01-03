<template>
  <div class="w-full">
    <Drawer ref="drawer" />
    <PageHeader title="Factoring" @goback="$router.go(-1)" />
    <Table
      class="mb-10"
      title="Factoring"
      icon="document-sketch"
      icon-color="purple"
      icon-alpha="800"
      :search-enabled="true"
      :headers="headers"
      :data="factorings"
      :filtering-model="vfilter"
      :request-function="getFactoringByCarrierId"
      :download-enabled="true"
      :page-count="factoringPageCount"
    >
      <template #item-actions>
        <div
          v-tooltip="`Send Invoice`"
          class="w-8 h-8 border border-gray-300 rounded-lg flex items-center justify-center"
          @click="() => {}"
        >
          <Icon
            icon="send-1"
            color="grey-dark"
            :alpha="500"
            :disable-fill="false"
            class="w-4 h-4 cursor-pointer"
          />
        </div>
      </template>
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
            <img src="/images/company_logo.png" alt="picture" class="rounded-full w-10 h-10">
          </div>
          <div class="col-auto">
            <span class="block text-c-1 font-semibold whitespace-nowrap">
              {{ data[index].shipper_name }}
            </span>
          </div>
        </div>
      </template>
      <template #item-invoice_date="{ item }">
        <span>{{ formatDate(item?.invoice_date) }}</span>
      </template>
      <template #item-factoring_status="{ item }">
        <Status
          :key="tableKey"
          :item="item"
          :active="extendeds.includes(item.id)"
          :item-status="item.factoring_status"
          :dropdown-menu="dropdownMenu"
          :dropdown-style="dropdownStyle"
          @extend="extendItem"
          @set-status="setStatus"
        />
      </template>
      <div slot="actions" class="flex items-center justify-end">
        <div
          class="!bg-black max-w-max p-4 !border-none m-input flex items-center justify-center cursor-pointer"
          @click="drawer()"
        >
          <Icon icon="add" color="white" class="w-6 h-6" />
        </div>
      </div>
    </Table>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapActions } from 'vuex'
import moment from 'moment'
import { FactoringDetails } from '~/models/accounting/factoringDetails'
export default Vue.extend({
  layout: 'Dashboard',
  data () {
    return {
      extendeds: [] as any[],
      dropdownStyle: 'a',
      tableKey: 0,
      dropdownMenu: [
        { text: 'Open', bg: 'blue' },
        { text: 'Submitted', bg: 'green' },
        { text: 'Pending', bg: 'orange' },
        { text: 'Received', bg: 'purple' },
        { text: 'Rejected', bg: 'red' }
      ],
      innerTab: 0,
      vfilter: {} as { [key: string]: unknown },
      filterModels: [
        {
          modelName: 'shipper_name',
          filterName: 'Shipper Name',
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
          modelName: 'invoice_number',
          filterName: 'Invoice No',
          inputType: 'input',
          colSpan: 2,
          multiple: true,
          tabShown: 0,
          options: [
            { id: 1, text: 'Driving' }
          ]
        },
        {
          modelName: 'invoice_date',
          filterName: 'Invoice Date',
          inputType: 'select',
          colSpan: 2,
          multiple: true,
          tabShown: 0,
          options: [
            { id: 1, text: 'Date 1' },
            { id: 2, text: 'Date 2' },
            { id: 3, text: 'Date 3' }
          ]
        }
      ],
      headers: {
        shipper_name: {
          label: 'Shipper Name 1',
          sortable: true
        },
        invoice_date: {
          label: 'Invoice Date',
          sortable: true
        },
        invoice_number: {
          label: 'Invoice No',
          sortable: true
        },
        reference_number: {
          label: 'Reference No',
          sortable: true
        },
        invoice_amount: {
          label: 'Invoice Amount',
          sortable: true
        },
        description: {
          label: 'Description',
          sortable: true
        },
        factoring_status: {
          label: 'Status',
          sortable: true
        },
        actions: {
          label: 'Actions'
        }
      },
      testData: [
        {
          id: 1,
          avatar: '/images/company_logo.png',
          shipper_name: 'Shipper Namex',
          invoice_date: 'Jan 12, 2023',
          invoice_no: '97129871823172',
          reference_no: '#8283982738273',
          invoice_amount: '$ 17,273.89',
          description: 'Test',
          status: 'Open'
        },
        {
          id: 2,
          avatar: '/images/company_logo.png',
          shipper_name: 'Shipper Namex',
          invoice_date: 'Jan 12, 2023',
          invoice_no: '97129871823172',
          reference_no: '#8283982738273',
          invoice_amount: '$ 17,273.89',
          description: 'Test',
          status: 'Submitted'
        },
        {
          id: 3,
          avatar: '/images/company_logo.png',
          shipper_name: 'Shipper Namex',
          invoice_date: 'Jan 12, 2023',
          invoice_no: '97129871823172',
          reference_no: '#8283982738273',
          invoice_amount: '$ 17,273.89',
          description: 'Test',
          status: 'Pending'
        },
        {
          id: 4,
          avatar: '/images/company_logo.png',
          shipper_name: 'Shipper Namex',
          invoice_date: 'Jan 12, 2023',
          invoice_no: '97129871823172',
          reference_no: '#8283982738273',
          invoice_amount: '$ 17,273.89',
          description: 'Test',
          status: 'Received'
        },
        {
          id: 5,
          avatar: '/images/company_logo.png',
          shipper_name: 'Shipper Namex',
          invoice_date: 'Jan 12, 2023',
          invoice_no: '97129871823172',
          reference_no: '#8283982738273',
          invoice_amount: '$ 17,273.89',
          description: 'Test',
          status: 'Rejected'
        },
        {
          id: 6,
          avatar: '/images/company_logo.png',
          shipper_name: 'Shipper Namex',
          invoice_date: 'Jan 12, 2023',
          invoice_no: '97129871823172',
          reference_no: '#8283982738273',
          invoice_amount: '$ 17,273.89',
          description: 'Test',
          status: 'Received'
        },
        {
          id: 7,
          avatar: '/images/company_logo.png',
          shipper_name: 'Shipper Namex',
          invoice_date: 'Jan 12, 2023',
          invoice_no: '97129871823172',
          reference_no: '#8283982738273',
          invoice_amount: '$ 17,273.89',
          description: 'Test',
          status: 'Open'
        }

      ]
    }
  },
  computed: {
    factorings (): FactoringDetails[] {
      return (this.$store.getters['accounting/factoring/carrierFactoring'])
    },
    factoring (): FactoringDetails {
      return (this.$store.getters['accounting/factoring/factoring'])
    },
    factoringPageCount (): Number {
      return (this.$store.getters['accounting/factoring/pageCount'])
    }
  },
  methods: {
    ...mapActions({
      getFactoringByCarrierId: (action, page) => action('accounting/factoring/getFactoringByCarrierId', page),
      getFactorings: (action, page) => action('accounting/factoring/getFactorings', page),
      removeFactoring: (action, id) => action('accounting/factoring/removeFactoring', id),
      getFactoring: (action, id) => action('accounting/factoring/getFactoring', id),
      updateFactoring: (action, request) => action('accounting/factoring/updateFactoring', request)
    }),
    drawer () {
      (this.$refs.drawer as Vue & { showDrawer: (component: String, routeUrl?: String) => Element }).showDrawer('AddFactoring')
    },
    extendItem (event:MouseEvent, item: any, menuItem?:string | null): void {
      if (menuItem) { item.impact = menuItem }

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
    },
    getKey () {
      this.tableKey = Math.random()
    },
    formatDate (date: string): string {
      const fixedArr = date.split('-')
      fixedArr[1] = fixedArr[1] === '00' ? '01' : fixedArr[1]
      return moment(fixedArr.join(), 'YYYY-MM-DD HH:mm:ss').format('MM-DD-YYYY HH:mm')
    },
    setStatus (id:number, newStatus:any) {
      const data = this.factorings.slice()
      console.log(id, newStatus)
      const item = data.find((w:any) => w.id === id)
      this.updateFactoring({
        ...item,
        factoring_status: newStatus,
        invoice_date: moment(item.invoice_date).toISOString()
      }).then(() => {
        this.getKey()
      })
    }
  }
})
</script>
