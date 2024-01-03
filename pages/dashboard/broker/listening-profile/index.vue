<template>
  <div class="w-full">
    <Drawer ref="drawer" />
    <PageHeader title="Customers" class="mb-10">
      <template #actions>
        <div class="w-32 h-10">
          <Button
            class="flex"
            :type="ButtonTypeEnum.PRIMARY"
            :size="SizeTypeEnum.MD"
            :action="ActionTypeEnum.BUTTON"
            @click="drawer()"
          >
            Add New
          </Button>
        </div>
      </template>
    </PageHeader>
    <div class="border border-gray-300/50 bg-gray-300/20 w-full rounded-lg flex flex-row p-3 mb-8 filter-drops">
      <div class="row items-center w-full">
        <div class="flex flex-wrap p-2 mt-4">
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
              :label="filter.inputType === 'date' ? filter.filterName : undefined"
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
          <div class="col-2 mb-6 ml-1 mr-1">
            <m-select
              v-model="date.custom"
              :options="choices"
              name="date"
              :bind-text="true"
              placeholder="Date"
            />
          </div>
          <div v-if="date.custom === 'Custom'" class="col-3 ml-1 mt-[-28px]">
            <div class="flex">
              <div class="mr-2">
                <Input
                  v-model="date.start_date"
                  name="startDate"
                  type="date"
                  label="Start Date"
                  rules="required"
                />
              </div>
              <div>
                <Input
                  v-model="date.end_date"
                  name="endDate"
                  type="date"
                  label="End Date"
                  rules="required"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="mode==='grid'" key="grid" mode="in-out" class="w-100">
      <BrokerCustomersCard class="mb-4" />
      <BrokerCustomersCard class="mb-4" />
      <BrokerCustomersCard class="mb-4" />
      <BrokerCustomersCard class="mb-4" />
      <BrokerCustomersCard class="mb-4" />
    </div>
    <transition-group name="fade" mode="in-out">
      <div v-if="mode==='grid'" key="grid">
        <div class="flex w-full flex-wrap">
          <div v-for="(data, index) in customers" :key="index" class="load px-2.5 col-12 mb-2 flex flex-col justify-between">
            <BrokerCustomersCard class="mb-4" :link-id="data.id" :data="data" />
          </div>
        </div>
        <Pagination :request-function="getCustomers" :page-count="customerPageCount" />
      </div>
    </transition-group>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { mapActions } from 'vuex'
import {
  SizeTypeEnum,
  ActionTypeEnum,
  ButtonTypeEnum
} from '@/components/ts/enums'
import { SelectOption } from '~/components/ts/interfaces'
import { CustomersDetails } from '~/models/Broker/customersDetails/customersDetails'
export default Vue.extend({
  layout: 'Dashboard',
  data () {
    return {
      response: {
        customer_name: 'Bill Sanders',
        sales: 'Jack',
        carrier_mc: '717401872',
        account_manager: 'Orlando, FL',
        fleet_size: '300 - 500',
        rating: '97 / 100',
        joke_offer_rate: '14%'
      },
      ButtonTypeEnum,
      ActionTypeEnum,
      SizeTypeEnum,
      date: {
        custom: '',
        start_date: '',
        end_date: ''
      },
      selectedFilter: '',
      headers: {
        carrier_name: {
          label: 'Carrier Name'
        },
        carrier_id: {
          label: 'Carrier ID'
        },
        dba_name: {
          label: 'DBA Name'
        },
        home_base_city: {
          label: 'Home Base City'
        },
        home_base_state: {
          label: 'Home Base State'
        },
        mc_number: {
          label: 'MC Number'
        },
        dot_number: {
          label: 'DOT Number'
        },
        active_insurance: {
          label: 'Active Insurance'
        },
        insurance_exp: {
          label: 'Insurance Expiration'
        },
        cargo_coverage: {
          label: 'Cargo Coverage'
        },
        status: {
          label: 'Status'
        }
      },
      data: [
        {
          avatar: '/images/Amazon.png',
          carrier_name: 'AMZ',
          carrier_id: 'CR219621',
          dba_name: 'AMZ',
          home_base_city: 'Roanoke',
          home_base_state: 'TX',
          mc_number: 'MC 7572890',
          dot_number: 'DOT 123433',
          active_insurance: 'Yes',
          insurance_exp: '09/07/2022',
          cargo_coverage: '$1,000.000',
          status: 'Active'
        },
        {
          avatar: '/images/adidas.png',
          carrier_name: 'BDM',
          carrier_id: 'CR219621',
          dba_name: 'AMZ',
          home_base_city: 'Roanoke',
          home_base_state: 'TX',
          mc_number: 'MC 7572890',
          dot_number: 'DOT 123433',
          active_insurance: 'No',
          insurance_exp: '09/07/2022',
          cargo_coverage: '$1,000.000',
          status: 'Inactive'
        },
        {
          avatar: '/images/chameleon.png',
          carrier_name: 'USC',
          carrier_id: 'CR219621',
          dba_name: 'AMZ',
          home_base_city: 'Roanoke',
          home_base_state: 'TX',
          mc_number: 'MC 7572890',
          dot_number: 'DOT 123433',
          active_insurance: 'Yes',
          insurance_exp: '09/07/2022',
          cargo_coverage: '$1,000.000',
          status: 'Open'
        },
        {
          avatar: '/images/stuart.png',
          carrier_name: 'UST',
          carrier_id: 'CR219621',
          dba_name: 'AMZ',
          home_base_city: 'Roanoke',
          home_base_state: 'TX',
          mc_number: 'MC 7572890',
          dot_number: 'DOT 123433',
          active_insurance: 'No',
          insurance_exp: '09/07/2022',
          cargo_coverage: '$1,000.000',
          status: 'Open'
        },
        {
          avatar: '/images/vtb.png',
          carrier_name: 'AMZ',
          carrier_id: 'CR219621',
          dba_name: 'AMZ',
          home_base_city: 'Roanoke',
          home_base_state: 'TX',
          mc_number: 'MC 7572890',
          dot_number: 'DOT 123433',
          active_insurance: 'No',
          insurance_exp: '09/07/2022',
          cargo_coverage: '$1,000.000',
          status: 'Inactive'
        },
        {
          avatar: '/images/yahoo.png',
          carrier_name: 'CAR',
          carrier_id: 'CR219621',
          dba_name: 'AMZ',
          home_base_city: 'Roanoke',
          home_base_state: 'TX',
          mc_number: 'MC 7572890',
          dot_number: 'DOT 123433',
          active_insurance: 'Yes',
          insurance_exp: '09/07/2022',
          cargo_coverage: '$1,000.000',
          status: 'Open'
        },
        {
          avatar: '/images/Intel.png',
          carrier_name: 'BDM',
          carrier_id: 'CR219621',
          dba_name: 'AMZ',
          home_base_city: 'Roanoke',
          home_base_state: 'TX',
          mc_number: 'MC 7572890',
          dot_number: 'DOT 123433',
          active_insurance: 'Yes',
          insurance_exp: '09/07/2022',
          cargo_coverage: '$1,000.000',
          status: 'Open'
        }
      ],
      innerTab: 0,
      vfilter: {} as { [key: string]: unknown },
      filterModels: [
        {
          modelName: 'shipper_name',
          filterName: 'Shipper Name',
          inputType: 'input',
          colSpan: 2,
          multiple: true,
          tabShown: 0,
          options: [
            { id: 1, text: 'Tabbatha Sawford' },
            { id: 2, text: 'Queenie McHale' },
            { id: 3, text: 'Giralda Kilfoyle' }
          ]
        },
        {
          modelName: 'sales_rep',
          filterName: 'Sales Rep',
          inputType: 'input',
          colSpan: 2,
          multiple: true,
          tabShown: 0,
          options: [
            { id: 1, text: 'Tabbatha Sawford' },
            { id: 2, text: 'Queenie McHale' },
            { id: 3, text: 'Giralda Kilfoyle' }
          ]
        },
        {
          modelName: 'account_manager',
          filterName: 'Account Manager',
          inputType: 'input',
          colSpan: 2,
          multiple: true,
          tabShown: 0,
          options: [
            { id: 1, text: 'Tabbatha Sawford' },
            { id: 2, text: 'Queenie McHale' },
            { id: 3, text: 'Giralda Kilfoyle' }
          ]
        }
        // {
        //   modelName: 'date',
        //   filterName: 'Date',
        //   inputType: 'select',
        //   colSpan: 2,
        //   multiple: true,
        //   tabShown: 0,
        //   options: [
        //     { id: 1, text: 'This week' },
        //     { id: 2, text: 'Last week' },
        //     { id: 3, text: 'This Month' },
        //     { id: 4, text: 'Last Month' },
        //     { id: 5, text: 'Custom' }
        //   ]
        // }
      ],
      filters: [
        { id: 1, text: 'Filter 1', selected: true },
        { id: 2, text: 'Filter 2', selected: false },
        { id: 3, text: 'Filter 3', selected: false },
        { id: 4, text: 'Filter 4', selected: false }
      ] as SelectOption[],
      mode: 'grid',
      choices: [
        { id: 1, text: 'This week', selected: false },
        { id: 2, text: 'Last week', selected: false },
        { id: 3, text: 'This Month', selected: false },
        { id: 4, text: 'Last Month', selected: false },
        { id: 5, text: 'Custom', selected: false }
      ] as SelectOption[]
    }
  },
  computed: {
    customer (): CustomersDetails {
      return (this.$store.getters['Broker/customersDetails/customer'])
    },
    customers (): CustomersDetails[] {
      return (this.$store.getters['Broker/customersDetails/brokerCustomers'])
    },
    customerPageCount (): Number {
      return (this.$store.getters['Broker/customersDetails/pageCount'])
    }
  },
  methods: {
    ...mapActions({
      getCustomer: (action, id) => action('Broker/customersDetails/getCustomer', id),
      getCustomers: (action, page) => action('Broker/customersDetails/getCustomerByBrokerId', page)
    }),
    drawer () {
      (this.$refs.drawer as Vue & {
        showDrawer: (component: String, routeUrl?: String) => Element;
       }).showDrawer('AddNewCustomer')
    },
    openModal () {
      (this.$refs.modal as Vue & { showModal: () => Element }).showModal()
      // (this.$refs.modal as Vue & {
      //           showModal: () => Element;
      //       }).showModal()
    },
    openModal2 () {
      (this.$refs.modal2 as Vue & { showModal: () => Element }).showModal()
    },
    modalHide (): void {
      (this.$refs.modal as Vue & { hideModal: () => Function }).hideModal();
      (this.$refs.modal2 as Vue & { hideModal: () => Function }).hideModal()
    },
    handleSubmit () {
      (this.$refs.modal as Vue & { showModal: () => Element }).showModal();
      (this.$refs.modal2 as Vue & { showModal: () => Element }).showModal()
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
