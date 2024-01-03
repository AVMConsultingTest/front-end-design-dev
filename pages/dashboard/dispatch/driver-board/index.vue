<template>
  <div class="w-full">
    <PageHeader title="Driver Boards Details" />
    <Drawer ref="drawer" />
    <Modal ref="modal" size="sm" position="center">
      <div slot="body" class="row flex items-center justify-center pt-16 pb-14">
        <div class="col-8 items-center justify-center">
          <h3 class="font-semibold text-center mb-2">
            Edit Driver Info
          </h3>
        </div>
        <div class="col-8 mt-16">
          <Form fclass="row my-2" @send="handleSubmit">
            <div class="col-12 mb-6">
              <phone-input
                v-model="request.driver_phone_number"
                name="phoneNumber"
                label="Contact Phone Number"
                :thin="true"
                minlength="14"
                maxlength="14"
                rules="required|min:14|max:14"
              />
            </div>
            <div class="col-12 mb-6">
              <Input
                v-model="request.driver_email_address"
                name="mail"
                type="text"
                label="E-mail Address"
                rules="required"
              />
            </div>
            <div class="col-12 mt-12">
              <Button
                :type="ButtonTypeEnum.GREEN"
                :size="SizeTypeEnum.LG"
                :action="ActionTypeEnum.SUBMIT"
              >
                Save
              </Button>
              <Button
                :type="ButtonTypeEnum.LINK"
                :size="SizeTypeEnum.LG"
                @click="hideModal()"
              >
                Cancel
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </Modal>
    <Modal ref="modal2" size="sm" position="center">
      <div slot="body" class="row flex items-center justify-center py-16">
        <div class="col-12 flex items-center justify-center">
          <div class="bg-green-400/40 rounded-full w-40 h-40 relative">
            <svg
              width="160"
              height="160"
              viewBox="0 0 1024 1024"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path fill="rgb(41, 45, 50)" d="M451.392 664.751c-8.533 0-16.64-3.413-22.613-9.387l-120.749-120.747c-12.373-12.373-12.373-32.853 0-45.227s32.853-12.373 45.227 0l98.135 98.133 219.307-219.307c12.373-12.373 32.853-12.373 45.227 0s12.373 32.853 0 45.227l-241.92 241.92c-5.973 5.973-14.080 9.387-22.613 9.387z" stroke="#BAF1DA" />   </svg>
          </div>
        </div>
        <div class="col-8 items-center justify-center my-14">
          <h3 class="font-semibold text-center mb-2">
            Congratulations !
          </h3>
        </div>
        <div class="col-8">
          <Button :type="ButtonTypeEnum.GREEN" :size="SizeTypeEnum.LG" @click="()=> { $refs.modal2.hideModal()}">
            Done
          </Button>
        </div>
      </div>
    </Modal>
    <div class="row mb-5">
      <div class="col-12 mb-5 mt-6">
        <Table
          title="Driver Board"
          icon="user-octagon"
          icon-color="blue"
          :icon-alpha="800"
          :headers="headers"
          :data="drivers"
          :request-function="getDrivers"
          :page-count="driverPageCount"
          :search-enabled="true"
          table-content-class="!tw-unset"
          :download-enabled="true"
          :filtering-model="vfilter"
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
          <template #item-name="{ item, data, index } ">
            <div class="flex items-center" @click="$router.push(`/carrier/dashboard/dispatch/driver-board/${item.id}`)">
              <div class="mr-2">
                <img class="inline-block h-10 w-10 min-h-[2.5rem] min-w-[2.5rem] max-h-[2.5rem] max-w-[2.5rem] rounded-full ring-2 ring-white" src="/images/Ellipse_49.png" alt="driver">
              </div>
              <div class="col-auto">
                <span class="block text-c-1 font-semibold whitespace-nowrap">
                  {{ data[index].name }}
                </span>
                <span class="block text-c-1 text-gray-400">
                  {{ data[index].title }}
                </span>
              </div>
            </div>
          </template>
          <template #item-driver_type="{ item } ">
            <div class="flex items-center" @click="$router.push(`/carrier/dashboard/dispatch/driver-board/${item.id}`)">
              <div class="col-auto">
                <span class="block text-c-1 font-semibold whitespace-nowrap">
                  {{ item.type }}
                </span>
              </div>
            </div>
          </template>
          <template #item-contact_phone_number="{ item } ">
            <div class="flex items-center" @click="$router.push(`/carrier/dashboard/dispatch/driver-board/${item.id}`)">
              <div class="col-auto">
                <span class="block text-c-1 font-semibold whitespace-nowrap">
                  {{ item.contact_phone_number }}
                </span>
              </div>
            </div>
          </template>
          <template #item-driver_email_address="{ item } ">
            <div class="flex items-center" @click="$router.push(`/carrier/dashboard/dispatch/driver-board/${item.id}`)">
              <div class="col-auto">
                <span class="block text-c-1  text-blue-1000 font-semibold whitespace-nowrap">
                  {{ item.email }}
                </span>
              </div>
            </div>
          </template>
          <template #item-on_time="{ item } ">
            <div class="flex items-center" @click="$router.push(`/carrier/dashboard/dispatch/driver-board/${item.id}`)">
              <div class="col-auto">
                <span class="block text-b-4 font-medium whitespace-nowrap">
                  {{ item.on_time }}
                </span>
              </div>
            </div>
          </template>
          <template #item-acceptance="{ item } ">
            <div class="flex items-center" @click="$router.push(`/carrier/dashboard/dispatch/driver-board/${item.id}`)">
              <div class="col-auto">
                <span class="block text-c-1 font-semibold whitespace-nowrap">
                  {{ item.acceptance }}
                </span>
              </div>
            </div>
          </template>
          <template #item-actions="{item}">
            <div
              class="w-8 h-8 border border-gray-300 rounded-lg flex items-center justify-center"
              @click="showUpdate(item.id)"
            >
              <Icon
                icon="more-2"
                color="grey-dark"
                :alpha="100"
                :disable-fill="false"
                class="w-4 h-4 cursor-pointer rotate-90"
              />
            </div>
          </template>
          <template #item-notes="{item}">
            <NotesEdit
              :item="getNoteItem(item)"

              note-prop-key="notes"

              :edit-function="updateDriver"
            />
          </template>
          <template #item-driver_status="{ item }">
            <Status
              :item="item"
              :active="extendeds.includes(item.id)"
              :item-status="item.driver_status"
              :dropdown-menu="dropdownMenu"
              :dropdown-style="dropdownStyle"
              @extend="extendItem"
              @set-status="setStatus"
            />
          </template>
          <div slot="actions" class="flex items-center justify-end">
            <div
              class="!bg-black !w-24 max-w-max p-4 !border-none m-input flex items-center justify-center cursor-pointer"
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
import { SizeTypeEnum, ActionTypeEnum, ButtonTypeEnum } from '~/components/ts/enums'
import { DriversDetails } from '~/models/DISPATCH/drivers/driversDetails'
export default Vue.extend({
  name: 'DispatchDashboard',
  layout: 'Dashboard',
  data () {
    return {
      SizeTypeEnum,
      ActionTypeEnum,
      ButtonTypeEnum,
      request: {} as DriversDetails,
      showModal: false,
      dropdownStyle: 'a',
      innerTab: 0,
      vfilter: {} as { [key: string]: unknown },
      filterModels: [
        {
          modelName: 'driver_first_name',
          filterName: 'Driver Name',
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
          modelName: 'driver_type',
          filterName: 'Driver Type',
          inputType: 'select',
          colSpan: 2,
          multiple: true,
          tabShown: 0,
          options: [
            { id: 1, text: 'Full time' },
            { id: 2, text: 'Lease Driver' }
          ]
        }
      ],
      dropdownMenu: [
        { text: 'Active', bg: 'green' },
        { text: 'Terminated', bg: 'orange' },
        { text: 'Vacation', bg: 'purple' }
      ],
      statusOptions: [
        { id: 1, text: 'Active' },
        { id: 2, text: 'Terminated' },
        { id: 3, text: 'Vacation' }
      ],
      extendeds: [] as any[],
      headers: {
        id: {
          label: 'ID'
        },
        name: {
          label: 'Driver',
          sortable: true
        },

        driver_type: {
          label: 'Driver Type'
        },
        contact_phone_number: {
          label: 'Contact #'
        },
        email: {
          label: 'E-mail'
        },
        driver_status: {
          label: 'Status'
        },
        on_time: {
          label: 'On Time (%)'
        },
        acceptance: {
          label: 'Acceptance (%)'
        },
        notes: {
          label: 'Notes'
        },
        actions: {
          label: 'Actions'
        }
      },
      testData: [
        {
          id: 1,
          avatar: 'https://sap.github.io/ui5-webcomponents/assets/images/avatars/man_avatar_3.png',
          driver: 'Bill Sanders',
          title: 'Caption',
          driver_type: 'Company Driver',
          contact: '555-555-1214',
          email: 'billsander@gmail.com',
          status: 'Open',
          notes: 'Driver is on PTO',
          on_time: '100',
          acceptance: '100'
        },
        {
          id: 2,
          avatar: 'https://sap.github.io/ui5-webcomponents/assets/images/avatars/man_avatar_3.png',
          driver: 'Bill Sanders',
          title: 'Caption',
          driver_type: 'Owner Operator',
          contact: '555-555-1214',
          email: 'brokkly@gmail.com',
          status: 'At Pickup',
          notes: 'On the road',
          on_time: '80',
          acceptance: '80'
        },
        {
          id: 3,
          avatar: 'https://sap.github.io/ui5-webcomponents/assets/images/avatars/man_avatar_3.png',
          driver: 'Brooklyn Simmons',
          title: 'Caption',
          driver_type: 'Company Driver',
          contact: '555-555-1214',
          email: 'cameronwillamson@gmail.com',
          status: 'Open',
          notes: 'At shop',
          on_time: '65',
          acceptance: '65'
        },
        {
          id: 4,
          avatar: 'https://sap.github.io/ui5-webcomponents/assets/images/avatars/man_avatar_3.png',
          driver: 'Brooklyn Simmons',
          title: 'Caption',
          driver_type: 'Lease Operator',
          contact: '555-555-1214',
          email: 'johncage@gmail.com',
          status: 'Open',
          notes: 'West Coasts trips only',
          on_time: '70',
          acceptance: '70'
        },
        {
          id: 5,
          avatar: 'https://sap.github.io/ui5-webcomponents/assets/images/avatars/man_avatar_3.png',
          driver: 'Eleanor Pena',
          title: 'Caption',
          driver_type: 'Company Driver',
          contact: '555-555-1214',
          email: 'hrrisn@gamil.com',
          status: 'Dispatched',
          notes: 'At shop',
          on_time: '245',
          acceptance: '245'
        },
        {
          id: 6,
          avatar: 'https://sap.github.io/ui5-webcomponents/assets/images/avatars/man_avatar_3.png',
          driver: 'Cameron Williamson',
          title: 'Caption',
          driver_type: 'Company Driver',
          contact: '555-555-1214',
          email: 'maryln@gmail.com',
          status: 'At Pickup',
          notes: 'West Coasts trips only',
          on_time: '75',
          acceptance: '75'
        },
        {
          id: 7,
          avatar: 'https://sap.github.io/ui5-webcomponents/assets/images/avatars/man_avatar_3.png',
          driver: 'Cameron Williamson',
          title: 'Caption',
          driver_type: 'Lease Operator',
          contact: '555-555-1214',
          email: 'buckberrytm@gmail.com',
          status: 'Dispatched',
          notes: 'Driver is on PTO',
          on_time: '189',
          acceptance: '189'
        }
      ]
    }
  },
  computed: {
    drivers (): DriversDetails[] {
      return (this.$store.getters['driverBoard/carrierDriversBoard'])
    },
    driver (): DriversDetails {
      return (this.$store.getters['driverBoard/driver'])
    },
    driverPageCount (): Number {
      return (this.$store.getters['driverBoard/pageCount'])
    }
  },
  // created () {
  //   const queryFilter = this.$route.query.filter
  //   if (queryFilter) {
  //     this.vFilter.driver_status = queryFilter
  //   }
  // },
  methods: {
    drawer () {
      (this.$refs.drawer as Vue & { showDrawer: (component: String, routeUrl?: String) => Element }).showDrawer('AddDriverBoardPage')
    },
    getNoteItem (item: { [x:string] : any }) {
      return {
        ...item,
        hire_date: moment(item.hire_date).toISOString(),
        driver_dob: moment(item.driver_dob).toISOString()
      } as DriversDetails
    },
    async showUpdate (id:number) {
      await this.getDriver(id).then(() => {
        this.request = { ...this.driver }
        this.$refs.modal.showModal()
      })
    },
    modalShow (): void {
      (this.$refs.modal as Vue & { showModal: () => Function }).showModal()
    },
    hideModal (): void {
      (this.$refs.modal as Vue & { hideModal: () => Function }).hideModal()
    },
    findDiv (id: number) {
      const offsets = ((document as Document).getElementById(id.toString()) as HTMLElement).getBoundingClientRect()
      const top = offsets.top
      const left = offsets.left
      return `left: ${left}; top: ${top}`
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
    handleSubmit () {
      this.updateDriver(this.request).then(() => {
        (this.$refs.modal as Vue & { showModal: () => Element }).hideModal();
        (this.$refs.modal2 as Vue & { showModal: () => Element }).showModal()
        this.request = {}
      })
    },
    setStatus (id:number, newStatus:any) {
      const data = this.drivers.slice()
      console.log(id, newStatus)
      const item = data.find((w:any) => w.id === id)
      this.updateDriver({
        ...item,
        driver_status: newStatus,
        driver_dob: moment(item.driver_dob).toISOString(),
        hire_date: moment(item.hire_date).toISOString()
      })
    },
    ...mapActions({
      // getDrivers: (action, page) => action('driverBoard/getDrivers', page),
      getDriver: (action, id) => action('driverBoard/getDriver', id),
      getDrivers: (action, page) => action('driverBoard/getDriversBoardByCarrierId', page),
      removeDriver: (action, id) => action('driverBoard/removeDriver', id),
      updateDriver: (action, request) => action('driverBoard/updateDriver', request)
    }),
    formatDate (date: Date) {
      return moment(date).format('MMMM D, yyyy')
    }
  }
})
</script>
