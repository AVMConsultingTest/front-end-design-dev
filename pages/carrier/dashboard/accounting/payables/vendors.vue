<template>
  <div class="w-full">
    <Drawer ref="drawer" />
    <PageHeader title="Vendors" class="mb-6" @goback="$router.go(-1)" />
    <div class="row mb-5">
      <div class="col-12 mb-5">
        <Table
          title="Vendors"
          icon="money-recive"
          icon-color="green"
          icon-alpha="800"
          :headers="headers"
          :data="vendors"
          :search-enabled="true"
          :download-enabled="true"
          :edit-page="getEditPage"
          :edit-enabled="getEdit"
          :filtering-model="vfilter"
          :delete-enabled="true"
          :delete-function="removeVendor"
          :request-function="getVendorsByCarrierId"
          :page-count="vendorPageCount"
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
          <template #item-id="{ item }">
            <div class="flex" @click="$router.push(`/carrier/dashboard/accounting/payables/vendor-profile/${item.id}`)">
              <div class="col-auto text-dark-blue border-b border-dark-blue">
                <span>
                  {{ item.id }}
                </span>
              </div>
            </div>
          </template>
          <template #item-vendor_name="{ data, index }">
            <div class="row" @click="$router.push(`/carrier/dashboard/accounting/payables/vendor-profile/${index}`)">
              <div class="col-auto">
                <span>
                  {{ data[index].vendor_name }}
                </span>
              </div>
            </div>
          </template>
          <template #item-e_mail="{ data, index }">
            <div class="flex">
              <div class="col-auto text-blue-1000">
                <span>
                  {{ data[index].e_mail }}
                </span>
              </div>
            </div>
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
          <div slot="actions" class="col-auto flex items-center justify-end">
            <div
              class="!border-none m-input flex items-center justify-center cursor-pointer"
            >
              <Button
                :type="ButtonTypeEnum.PRIMARY"
                :size="SizeTypeEnum.MD"
                :action="ActionTypeEnum.SUBMIT"
                class="!text-c-1 !h-12 max-w-max p-4 !bg-black"
                @click="drawer('AddVendorsPage')"
              >
                Add a New Vendor
              </Button>
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
import { SizeTypeEnum, ActionTypeEnum, ButtonTypeEnum } from '~/components/ts/enums'
import { VendorsDetails } from '~/models/accounting/vendors/vendorsDetails'
export default Vue.extend({
  layout: 'Dashboard',
  data () {
    return {
      SizeTypeEnum,
      ButtonTypeEnum,
      ActionTypeEnum,
      request: {} as VendorsDetails,
      extendeds: [] as any[],
      dropdownStyle: '',
      editPageArr: ['EditVendor'],
      dropdownMenu: [
        { text: 'Active', bg: 'green' },
        { text: 'In vacation', bg: 'purple' },
        { text: 'Inactive', bg: 'red' }
      ],
      statusOptions: [
        { id: 1, text: 'Active' },
        { id: 2, text: 'In vacation' },
        { id: 3, text: 'Inactive' }
      ],
      headers: {
        id: {
          label: 'Vendor ID'
        },
        name: {
          label: 'Vendor Name'
        },
        contact_name: {
          label: 'Contact Name'
        },
        address_line1: {
          label: 'Address'
        },
        phone_number: {
          label: 'Phone'
        },
        email: {
          label: 'E-mail'
        },
        line_of_business: {
          label: 'Line of Business'
        },
        status: {
          label: 'Vendor Status'
        }
      },
      testData: [
        {
          id: 1,
          vendor_id: 'Vendor ID 1',
          vendor_name: 'Vendor Name',
          contact_name: 'Bill Sanders',
          address: '4517 Washington Ave. Manchester, Kentucky 39495',
          phone: '555-555-1234',
          e_mail: 'billsander@gmail.com',
          line_of_business: 'Truck Leasing',
          status: 'Active'
        },
        {
          id: 2,
          vendor_id: 'Vendor ID 1',
          vendor_name: 'Vendor Name',
          contact_name: 'Bill Sanders',
          address: '4517 Washington Ave. Manchester, Kentucky 39495',
          phone: '555-555-1234',
          e_mail: 'billsander@gmail.com',
          line_of_business: 'Truck Leasing',
          status: 'New'
        },
        {
          id: 3,
          vendor_id: 'Vendor ID 1',
          vendor_name: 'Vendor Name',
          contact_name: 'Bill Sanders',
          address: '4517 Washington Ave. Manchester, Kentucky 39495',
          phone: '555-555-1234',
          e_mail: 'billsander@gmail.com',
          line_of_business: 'Truck Leasing',
          status: 'Inactive'
        },
        {
          id: 4,
          vendor_id: 'Vendor ID 1',
          vendor_name: 'Vendor Name',
          contact_name: 'Bill Sanders',
          address: '4517 Washington Ave. Manchester, Kentucky 39495',
          phone: '555-555-1234',
          e_mail: 'billsander@gmail.com',
          line_of_business: 'Truck Leasing',
          status: 'Suspending'
        },
        {
          id: 5,
          vendor_id: 'Vendor ID 1',
          vendor_name: 'Vendor Name',
          contact_name: 'Bill Sanders',
          address: '4517 Washington Ave. Manchester, Kentucky 39495',
          phone: '555-555-1234',
          e_mail: 'billsander@gmail.com',
          line_of_business: 'Truck Leasing',
          status: 'Pending'
        }
      ],
      component: 'UploadTollReport',
      innerTab: 0,
      vfilter: {} as { [key: string]: unknown },
      filterModels: [
        {
          modelName: 'vendor_name',
          filterName: 'Vendor Name',
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
          modelName: 'vendor_address_1',
          filterName: 'Vendor Address 1',
          inputType: 'input',
          colSpan: 3,
          multiple: true,
          tabShown: 0,
          options: [
            { id: 1, text: 'Driving' }
          ]
        },
        {
          modelName: 'vendor_address_2',
          filterName: 'Vendor Address 2',
          inputType: 'input',
          colSpan: 3,
          multiple: true,
          tabShown: 0,
          options: [
            { id: 1, text: 'Option 1' },
            { id: 2, text: 'Option 2' },
            { id: 3, text: 'Option 3' }
          ]
        },
        {
          modelName: 'vendor_email_address',
          filterName: 'E-mail',
          inputType: 'input',
          colSpan: 2,
          multiple: true,
          tabShown: 0,
          options: [
            { id: 1, text: 'Option 1' },
            { id: 2, text: 'Option 2' },
            { id: 3, text: 'Option 3' }
          ]
        },
        {
          modelName: 'vendor_phone_number',
          filterName: 'Phone',
          inputType: 'input',
          colSpan: 2,
          multiple: true,
          tabShown: 0,
          options: [
            { id: 1, text: 'Option 1' },
            { id: 2, text: 'Option 2' },
            { id: 3, text: 'Option 3' }
          ]
        },
        {
          modelName: 'vendor_status',
          filterName: 'Status',
          inputType: 'select',
          colSpan: 3,
          multiple: true,
          tabShown: 0,
          options: [
            { id: 1, text: 'Active' },
            { id: 2, text: 'Inactive' },
            { id: 3, text: 'In vacation' }
          ]
        }
      ]
    }
  },
  computed: {
    vendors (): VendorsDetails {
      return (this.$store.getters['accounting/vendors/carrierVendors'])
    },
    vendor (): VendorsDetails {
      return (this.$store.getters['accounting/vendors/vendor'])
    },
    vendorPageCount (): Number {
      return (this.$store.getters['accounting/vendors/pageCount'])
    },
    getEdit () {
      switch (this.selectedTab) {
        case 0:
          return true
        case 1:
          return true
        default:
          return false
      }
    },
    getEditPage () {
      switch (this.selectedTab) {
        case 0:
          return 'EditVendor'
        case 1:
          return null
        default:
          return null
      }
    }
  },
  methods: {
    ...mapActions({
      getVendorsByCarrierId: (action, page) => action('accounting/vendors/getVendorsByCarrierId', page),
      getVendors: (action, page) => action('accounting/vendors/getVendors', page),
      removeVendor: (action, page) => action('accounting/vendors/removeVendor', page),
      getVendor: (action, id) => action('accounting/vendors/getVendor', id),
      updateVendor: (action, request) => action('accounting/vendors/updateVendor', request)
    }),
    drawer (componentName: String) {
      (this.$refs.drawer as Vue & { showDrawer: (component: String, routeUrl?: String) => Element }).showDrawer(componentName)
    },
    findDiv (id: number) {
      if (id === undefined) { return '' }
      const offsets = ((document as Document).getElementById(id.toString()) as HTMLElement).getBoundingClientRect()
      const top = offsets.top
      const left = offsets.left
      return `left: ${left}; top: ${top}`
    },
    extendItem (event:MouseEvent, item: any, menuItem?:string | null): void {
      if (menuItem) { item.status = menuItem }
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
      const data = this.vendors.slice()
      console.log(id, newStatus)
      const item = data.find((w:any) => w.id === id)
      this.updateVendor({ ...item, status: newStatus })
    }
  }

})
</script>

  <style scoped>

  </style>
