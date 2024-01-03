
<template>
  <div class="w-full">
    <Drawer ref="drawer" />
    <PageHeader title="Brokers" class="mb-6" :no-actions="true" />
    <Modal ref="modal" size="sm" position="center">
      <div slot="body" class="row flex items-center justify-center pt-16 pb-14">
        <div class="col-8 items-center justify-center">
          <h3 class="font-semibold text-center mb-2">
            Add Notes
          </h3>
        </div>
        <div class="col-8 mt-10">
          <Form fclass="row my-2" @send="handleSubmit">
            <div class="col-12 mb-6">
              <label for="message" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your notes</label>
              <textarea id="message" rows="6" class="block p-2.5 w-full text-sm text-gray-900  rounded-lg border border-gray-300   dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
            </div>
            <div class="col-12 flex justify-around items-baseline">
              <div class="col-6">
                <Button
                  :type="ButtonTypeEnum.GREEN"
                  :size="SizeTypeEnum.LG"
                  :action="ActionTypeEnum.SUBMIT"
                  class="!bg-orange-700 !text-white max-w-max p-4"
                >
                  Add Notes
                </Button>
              </div>

              <div class="col-auto ml-auto">
                <Button
                  :type="ButtonTypeEnum.PRIMARY"
                  :size="SizeTypeEnum.LG"
                  :action="ActionTypeEnum.BUTTON"
                  class="mt-2 max-w-max p-4"
                  @click="hideModal()"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </Form>
        </div>
      </div>
    </Modal>
    <div class="row mb-5">
      <div class="col-12 mb-5">
        <Table
          title="Brokers"
          icon="money-recive"
          icon-color="green"
          icon-alpha="800"
          :headers="headers"
          :data="brokers"
          :search-enabled="true"
          :download-enabled="true"
          :filtering-model="vfilter"
          :request-function="getBrokersByCarrierId"
          :page-count="brokerPageCount"
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
          <template #item-name="{ item, data, index }">
            <div class="flex items-center" @click="$router.push(`/carrier/dashboard/accounting/receivables/brokers/${item.id}`)">
              <div class="col-auto pr-0 mr-2">
                <img :src="testData[0].avatar" :alt="data[index].name" class="rounded-full w-10 h-10">
              </div>
              <div class="col-auto">
                <span class="block text-c-1 font-semibold whitespace-nowrap">
                  {{ data[index].name }}
                </span>
                <span class="block text-c-1 text-gray-400">
                  {{ response.driver_type }}
                </span>
              </div>
            </div>
          </template>
          <template #item-broker_notes="{item}">
            <NotesEdit
              :item="getNoteItem(item)"
              note-prop-key="broker_notes"
              :edit-function="updateBroker"
            />
          </template>
          <template #item-status="{ item }">
            <Status
              :item="item"
              :active="extendeds.includes(item.id)"
              :item-status="item.status"
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
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapActions } from 'vuex'
import moment from 'moment'
import { SizeTypeEnum, ButtonTypeEnum, ActionTypeEnum } from '~/components/ts/enums'
import { BrokersDetails } from '~/models/accounting/brokers/brokersDetails'
export default Vue.extend({
  layout: 'Dashboard',
  data () {
    return {
      SizeTypeEnum,
      ActionTypeEnum,
      ButtonTypeEnum,
      showModal: false,
      extendeds: [] as any[],
      dropdownStyle: 'a',
      innerTab: 0,
      vfilter: {} as { [key: string]: unknown },
      filterModels: [
        {
          modelName: 'broker_name',
          filterName: 'Broker Name',
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
          modelName: 'broker_mc_number',
          filterName: 'MC#',
          inputType: 'input',
          colSpan: 2,
          multiple: true,
          tabShown: 0
        },
        {
          modelName: 'broker_score',
          filterName: 'Score',
          inputType: 'input',
          colSpan: 2,
          multiple: true,
          tabShown: 0
        }
      ],
      dropdownMenu: [
        { text: 'Active', bg: 'green' },
        { text: 'New', bg: 'purple' },
        { text: 'Inactive', bg: 'red' },
        { text: 'Suspending', bg: 'gray' },
        { text: 'Pending', bg: 'orange' }
      ],
      statusOptions: [
        { id: 1, text: 'Active' },
        { id: 2, text: 'New' },
        { id: 3, text: 'Inactive' },
        { id: 4, text: 'Suspending' },
        { id: 5, text: 'Pending' }
      ],
      headers: {
        name: {
          label: 'Broker Name',
          sortable: true
        },
        mc: {
          label: 'MC#'
        },
        score: {
          label: 'Score'
        },
        status: {
          label: 'Status'
        },
        contract: {
          label: 'Contract'
        },
        credit_limit: {
          label: 'Credit Limit'
        },
        credit_available: {
          label: 'Available Credit'
        },
        notes: {
          label: 'Notes'
        }
      },
      response: {
        driver_type: 'Caption'
      },
      testData: [
        {
          id: 1,
          avatar: 'https://sap.github.io/ui5-webcomponents/assets/images/avatars/man_avatar_3.png',
          broker_name: 'Bill Sanders',
          mc: 'MC1',
          score: 'A',
          status: 'Active',
          contract: 'Accepted',
          credit_limit: '$30K',
          available_credit: '$10K',
          note: 'Empty at 9am in Ontario, CA // Won’t come down From '
        },
        {
          id: 2,
          avatar: 'https://sap.github.io/ui5-webcomponents/assets/images/avatars/man_avatar_3.png',
          broker_name: 'Bill Sanders',
          mc: 'MC2',
          score: 'B',
          status: 'Pending',
          contract: 'Pending',
          credit_limit: '$30K',
          available_credit: '$10K',
          note: 'Empty at 9am in Ontario, CA // Won’t come down From '
        },
        {
          id: 3,
          avatar: 'https://sap.github.io/ui5-webcomponents/assets/images/avatars/man_avatar_3.png',
          broker_name: 'Bill Sanders',
          mc: 'MC2',
          score: 'B',
          status: 'New',
          contract: 'Pending',
          credit_limit: '$30K',
          available_credit: '$10K',
          note: 'Empty at 9am in Ontario, CA // Won’t come down From '
        },
        {
          id: 4,
          avatar: 'https://sap.github.io/ui5-webcomponents/assets/images/avatars/man_avatar_3.png',
          broker_name: 'Bill Sanders',
          mc: 'MC2',
          score: 'B',
          status: 'Inactive',
          contract: 'Pending',
          credit_limit: '$30K',
          available_credit: '$10K',
          note: 'Empty at 9am in Ontario, CA // Won’t come down From '
        },
        {
          id: 5,
          avatar: 'https://sap.github.io/ui5-webcomponents/assets/images/avatars/man_avatar_3.png',
          broker_name: 'Bill Sanders',
          mc: 'MC2',
          score: 'B',
          status: 'Suspending',
          contract: 'Pending',
          credit_limit: '$30K',
          available_credit: '$10K',
          note: 'Empty at 9am in Ontario, CA // Won’t come down From '
        }
      ]
    }
  },
  computed: {
    brokers (): BrokersDetails[] {
      return (this.$store.getters['accounting/brokers/carrierBrokers'])
    },
    broker (): BrokersDetails[] {
      return (this.$store.getters['accounting/brokers/broker'])
    },
    brokerPageCount (): Number {
      console.log('page:', this.$store.getters['accounting/brokers/pageCount'])
      return (this.$store.getters['accounting/brokers/pageCount'])
    }
  },
  methods: {
    ...mapActions({
      getBrokersByCarrierId: (action, page) => action('accounting/brokers/getBrokersByCarrierId', page),
      getBroker: (action, page) => action('accounting/brokers/getBroker', page),
      getBrokers: (action, page) => action('accounting/brokers/getVendors', page),
      removeBroker: (action, id) => action('accounting/brokers/removeBroker', id),
      updateBroker: (action, request) => action('accounting/brokers/updateBroker', request)
    }),
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
    setStatus (id:number, newStatus:any) {
      const data = this.brokers.slice()
      console.log(id, newStatus)
      const item = data.find((w:any) => w.id === id)
      this.updateBroker({
        ...item,
        status: newStatus,
        // broker_billing_zipcode: parseInt(item.broker_billing_zipcode),
        // last_active_date: moment(item.last_active_date).toISOString(),
        // last_credit_change_date: moment(item.last_credit_change_date).toISOString()
        // broker_address: undefined,
      })
    },
    drawer () {
      (this.$refs.drawer as Vue & { showDrawer: (component: String, routeUrl?: String) => Element }).showDrawer('AddBrokerPage')
    },
    getNoteItem (item: { [x:string] : any }) {
      return {
        ...item,
        first_active_date: moment(item.first_active_date).toISOString(),
        last_active_date: moment(item.last_active_date).toISOString(),
        last_credit_change_date: moment(item.last_credit_change_date).toISOString()

      }
    },
    findDiv (id: number) {
      if (id === undefined) { return '' }
      const offsets = ((document as Document).getElementById(id.toString()) as HTMLElement).getBoundingClientRect()
      const top = offsets.top
      const left = offsets.left
      return `left: ${left}; top: ${top}`
    },
    formatDate (date: string) {
      return moment(date).format('MM-DD-yyyy')
    },
    handleSubmit () {
      (this.$refs.modal as Vue & { showModal: () => Element }).showModal()
    },
    hideModal (): void {
      (this.$refs.modal as Vue & { hideModal: () => Function }).hideModal()
    }
  }

})
</script>

  <style scoped>

  </style>
