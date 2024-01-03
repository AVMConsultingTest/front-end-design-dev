<template>
  <div class="w-full">
    <Drawer ref="drawer" />
    <PageHeader :show-date="false" title="Carrier" class="mb-10">
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
          <div v-if="date.custom === 'Custom'" class="col-3 ml-1">
            <div class="flex">
              <div class="mr-2">
                <Input
                  v-model="date.start_date"
                  name="startDate"
                  type="date"
                  rules="required"
                />
              </div>
              <div>
                <Input
                  v-model="date.end_date"
                  name="endDate"
                  type="date"
                  rules="required"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <v-if v-if="mode==='list'" key="list">
      <Table
        title="Carriers"
        :headers="headers"
        :filtering-model="vfilter"
        :data="carriers"
        :request-function="getCarriers"
        :page-count="carrierPageCount"
        :search-enabled="true"
        :extend-enabled="false"
        class="mb-16"
      >
        <template #item-carrier_status="{ item }">
          <Status
            :item="item"
            :active="extendeds.includes(item.id)"
            :item-status="item.carrier_status"
            :dropdown-menu="dropdownCarriersStatusMenu"
            :dropdown-style="dropdownCarriersStatusStyle"
            @extend="extendItemCarriersStatus"
            @set-status="setCarriersStatus"
          />
        </template>
        <template #item-carrier_name="{ item }">
          <div class="flex items-center">
            <div class="col-auto pr-0 mr-2">
              <img v-if="item?.avatar !== null && item?.avatar !== undefined" :src="item.avatar" :alt="item.carrier_name" class="rounded-full w-10 h-10">
            </div>
            <div class="col-auto">
              <span class="block text-c-1 font-semibold whitespace-nowrap">
                {{ item.carrier_name }}
              </span>
            </div>
          </div>
        </template>
        <template #item-active_insurance="{ item }">
          <div class="flex items-center">
            <div
              class="col-auto"
              :title="item.active_insurance"
              :class="[
                {'text-red-600' : item.active_insurance === 'No'},
                { 'text-green-800': item.active_insurance === 'Yes' },
              ]"
              :size="SizeTypeEnum.MD"
            >
              <span class="block text-c-1 font-semibold">
                {{ item.active_insurance }}
              </span>
            </div>
          </div>
        </template>
        <template #item-carrier_id="{ item }">
          <div class="block text-dark-blue">
            {{ item.carrier_id }}
          </div>
        </template>
      </Table>
    </v-if>
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
import InfoBox from '~/components/InfoBox.vue'
import { CarriersDetails } from '~/models/Broker/carriersDetails/carriersDetails'
export default Vue.extend({
  components: { InfoBox },
  layout: 'Dashboard',
  data () {
    return {
      innerTab: 0,
      date: {
        custom: '',
        start_date: '',
        end_date: ''
      },
      dropdownCarriersStatusStyle: 'a',
      dropdownCarriersStatusMenu: [
        { text: 'Active', bg: 'green' },
        { text: 'Inactive', bg: 'red' }
      ],
      extendeds: [] as any[],
      vfilter: {} as { [key: string]: unknown },
      filterModels: [
        {
          modelName: 'carrier_name',
          filterName: 'Carrier Name',
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
          modelName: 'home_base_city',
          filterName: 'Home Base City',
          inputType: 'input',
          colSpan: 2,
          multiple: true,
          tabShown: 0,
          options: [
            { id: 1, text: 'Driving' }
          ]
        },
        {
          modelName: 'home_base_state',
          filterName: 'Home Base State',
          inputType: 'input',
          colSpan: 2,
          multiple: true,
          tabShown: 0,
          options: [
          ]
        },
        {
          modelName: 'connection_status',
          filterName: 'Connection Status',
          inputType: 'select',
          colSpan: 2,
          multiple: true,
          tabShown: 0,
          options: [
            { id: 1, text: 'Nebula Customer' },
            { id: 2, text: 'Nebula User' },
            { id: 3, text: 'External' }
          ]
        },
        {
          modelName: 'cargo_coverage',
          filterName: 'Cargo Coverage',
          inputType: 'select',
          colSpan: 2,
          multiple: true,
          tabShown: 0,
          options: [

          ]
        }
      ],
      response: {
        carrier_name: 'Bill Sanders',
        carrier_dot: '151351',
        carrier_mc: '717401872',
        home_base: 'Orlando, FL',
        fleet_size: '300 - 500',
        rating: '97 / 100',
        joke_offer_rate: '14%'
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
      ButtonTypeEnum,
      ActionTypeEnum,
      SizeTypeEnum,
      selectedFilter: '',
      headers: {
        carrier_status: {
          label: 'Status'
        },
        carrier_name: {
          label: 'Carrier Name'
        },
        carrier_dba_name: {
          label: 'DBA Name'
        },
        carrier_id: {
          label: 'Carrier ID'
        },
        primary_contact: {
          label: 'Primary Contact'
        },
        phone_number: {
          label: 'Phone Number'
        },
        e_mail: {
          label: 'E-mail'
        },
        carrier_dot_number: {
          label: 'DOT Number'
        },
        carrier_mc_number: {
          label: 'MC Number'
        },
        scas: {
          label: 'SCAS'
        },
        poer_units: {
          label: 'Power Units'
        },
        carrier_base_city: {
          label: 'Home Base City'
        },
        carrier_base_state: {
          label: 'Home Base State'
        },
        conection_status: {
          label: 'Conncetion Status'
        },
        active_insurance: {
          label: 'Active Insurance'
        },
        insurance_expiration: {
          label: 'Insurance Expiration'
        },
        cargo_coverage: {
          label: 'Cargo Coverage'
        },
        revenue: {
          label: 'Revenue'
        },
        margin: {
          label: 'Margin'
        },
        load_count: {
          label: 'Load Count'
        },
        payment_method: {
          label: 'Payment Method'
        },
        payment_terms: {
          label: 'Payment Terms'
        },
        past_due: {
          label: 'A/P past due'
        },
        tax_id: {
          label: 'Tax ID',
          sticky: true
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
      filters: [
        { id: 1, text: 'Filter 1', selected: true },
        { id: 2, text: 'Filter 2', selected: false },
        { id: 3, text: 'Filter 3', selected: false },
        { id: 4, text: 'Filter 4', selected: false }
      ] as SelectOption[],
      mode: 'list',
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
    carrier (): CarriersDetails {
      return (this.$store.getters['Broker/carriersDetails/carrier'])
    },
    carriers (): CarriersDetails[] {
      return (this.$store.getters['Broker/carriersDetails/brokerCarriers'])
    },
    carrierPageCount (): Number {
      return (this.$store.getters['Broker/carriersDetails/pageCount'])
    }
  },
  methods: {
    extendItemCarriersStatus (event:MouseEvent, item: any, menuItem?:string | null): void {
      if (menuItem) { item.impact = menuItem }

      if (this.extendeds.includes(item.id)) {
        this.extendeds = this.extendeds.filter((a: any) => {
          return a !== item.id
        })
      } else {
        this.extendeds.push(item.id)
        const { clientX, clientY } = event
        this.dropdownCarriersStatusStyle = {
          top: `${clientY + 20}px`,
          left: `${clientX - 100}px`
        }
      }
    },
    setCarriersStatus (id:number, newStatus:any) {
      const data = this.carriers.slice()
      console.log(id, newStatus)
      const item = data.find((w:any) => w.id === id)
      this.updateCarrier({
        ...item,
        carrier_status: newStatus,
        active_insurance: true,
        insurance_expiration: moment(item.insurance_expiration).toISOString()
      })
    },
    ...mapActions({
      getCarrier: (action, id) => action('Broker/carriersDetails/getCarrier', id),
      getCarriers: (action, page) => action('Broker/carriersDetails/getCarriersByBrokerId', page),
      updateCarrier: (action, request) => action('Broker/carriersDetails/updateCarrier', request)
      // getLoads: (action, page) => action('loads/getLoads', page)
    }),
    drawer () {
      (this.$refs.drawer as Vue & {
        showDrawer: (component: String, routeUrl?: String) => Element;
      }).showDrawer('AddNewCarrier')
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
