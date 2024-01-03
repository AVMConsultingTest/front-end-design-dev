<template>
  <div class="w-full">
    <PageHeader title="Locations" :no-actions="true" />
    <Drawer ref="drawer" />
    <div class="col-12 my-6">
      <Table
        title="Locations"
        icon-color="purple"
        :icon-alpha="800"
        :icon-rounded="true"
        :headers="headers"
        :data="locations"
        :search-enabled="true"
        :download-enabled="true"
        :request-function="getLocations"
        :page-count="locationPageCount"
        :delete-enabled="true"
        :edit-enabled="true"
        edit-page="EditLocationsPage"
        :filtering-model="vfilter"
        :delete-function="removeLocation"
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
        <template #item-categories="{ item }">
          <div class="block">
            <span class="block">{{ item.categories }}</span>
            <span class="block text-c-1 text-gray-400">
              {{ item.description }}
            </span>
          </div>
        </template>
        <template #item-location_status="{ item }">
          <Status
            :item="item"
            :active="extendeds.includes(item.id)"
            :item-status="item.location_status"
            :dropdown-menu="dropdownMenu"
            :dropdown-style="dropdownStyle"
            @extend="extendItem"
            @set-status="setStatus"
          />
        </template>
        <div slot="actions" class=" flex items-center">
          <div
            class="!bg-black !border-none m-input flex items-center justify-center cursor-pointer"
            @click="drawer('AddLocationsPage')"
          >
            <Button
              class="flex !h-10 !bg-black !w-40 max-w-max p-4"
              :type="ButtonTypeEnum.PRIMARY"
              :size="SizeTypeEnum.MD"
              :action="ActionTypeEnum.BUTTON"
            >
              Add New
            </Button>
          </div>
        </div>
      </Table>
    </div>
    <DeleteModal
      ref="modal"
      :delete-id="deletionId"
      :delete-function="removeLocation"
      :delete-subtext="deleteSubtext"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapActions } from 'vuex'
import { SizeTypeEnum, ActionTypeEnum, ButtonTypeEnum } from '~/components/ts/enums'
import { LocationsDetails } from '~/models/DISPATCH/locations/locationsDetails'

export default Vue.extend({
  name: 'Locations',
  layout: 'Dashboard',
  data () {
    return {
      SizeTypeEnum,
      ActionTypeEnum,
      ButtonTypeEnum,
      deletionId: 0,
      deleteSubtext: 'Test',
      extendeds: [] as any[],
      dropdownStyle: 'a',
      dropdownMenu: [
        { text: 'Active', bg: 'green' },
        { text: 'Inactive', bg: 'red' },
        { text: 'Not In Use', bg: 'gray' }

      ],
      statusOptions: [
        { id: 1, text: 'Active' },
        { id: 2, text: 'Inactive' },
        { id: 3, text: 'Not In Use' }

      ],
      innerTab: 0,
      vfilter: {} as { [key: string]: unknown },
      filterModels: [
        {
          modelName: 'location_address_1',
          filterName: 'Address 1',
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
          modelName: 'location_city',
          filterName: 'City',
          inputType: 'input',
          colSpan: 2,
          multiple: true,
          tabShown: 0
        },
        {
          modelName: 'location_state',
          filterName: 'State',
          inputType: 'input',
          colSpan: 2,
          multiple: true,
          tabShown: 0
        },
        {
          modelName: 'location_status',
          filterName: 'Status',
          inputType: 'select',
          colSpan: 2,
          multiple: true,
          tabShown: 0,
          options: [
            { id: 1, text: 'Active' },
            { id: 2, text: 'Inactive' },
            { id: 3, text: 'Not In Use' }
          ]
        }
      ],
      headers: {
        name: {
          label: 'Locations',
          searchable: true
        },
        address_line1: {
          label: 'Address 1',
          searchable: true
        },
        address_line2: {
          label: 'Address 2',
          searchable: true
        },
        city:
        {
          label: 'City',
          searchable: true
        },
        state:
        {
          label: 'State',
          searchable: true
        },
        // location_full_address: {
        //   label: 'Full Address',
        //   searchable: true
        // },
        zip_code:
        {
          label: 'Zip Code',
          searchable: true
        },
        // location_country:
        // {
        //   label: 'Country',
        //   searchable: true
        // },
        status:
        {
          label: 'Status',
          searchable: true
        }
      },
      testData: [
        {
          id: 1,
          location_name: 'Fed Ex Central Napperville IL',
          description: 'Place description here',
          location_address_1: '711 Washington St.',
          location_address_2: 'Manchester, Kentucky 39495',
          location_city: 'Napervillie',
          location_state: 'IL',
          location_full_address: '4517 Washington Ave. Manchester, Kentucky 39495',
          location_zip_code: '21632',
          location_country: 'USA',
          impact: 'Active'
        },
        {
          id: 2,
          location_name: 'UPS Facility #35',
          description: 'Place description here',
          location_address_1: '814 N 3rd St.',
          location_address_2: 'Manchester, Kentucky 39495',
          location_city: 'Compton',
          location_state: 'CA',
          location_full_address: '4517 Washington Ave. Manchester, Kentucky 39495',
          location_zip_code: '12532',
          location_country: 'USA',
          impact: 'Not In Use'
        },
        {
          id: 3,
          location_name: 'Amazon Facility #135',
          description: 'Place description here',
          location_address_1: '1259 W West Rd.',
          location_address_2: 'Manchester, Kentucky 39495',
          location_city: 'Phoenix',
          location_state: 'AZ',
          location_full_address: '4517 Washington Ave. Manchester, Kentucky 39495',
          location_zip_code: '15232',
          location_country: 'USA',
          impact: 'Active'
        },
        {
          id: 4,
          location_name: 'Gregory Shippers Wharehouse #12',
          description: 'Place description here',
          location_address_1: '9874 S 64N',
          location_address_2: 'Manchester, Kentucky 39495',
          location_city: 'Dallas',
          location_state: 'TX',
          location_full_address: '4517 Washington Ave. Manchester, Kentucky 39495',
          location_zip_code: '83452',
          location_country: 'USA',
          impact: 'Active'
        },
        {
          id: 5,
          location_name: 'Fed Ex CentralNapperville IL',
          description: 'Place description here',
          location_address_1: '1259 W West Rd.',
          location_address_2: 'Manchester, Kentucky 39495',
          location_city: 'Dallas',
          location_state: 'TX',
          location_full_address: '4517 Washington Ave. Manchester, Kentucky 39495',
          location_zip_code: '12423',
          location_country: 'USA',
          impact: 'Inactive'
        },
        {
          id: 6,
          location_name: 'UPS Facility #35',
          description: 'Place description here',
          location_address_1: '1259 W West Rd.',
          location_address_2: 'Manchester, Kentucky 39495',
          location_city: 'New York',
          location_state: 'NY',
          location_full_address: '4517 Washington Ave. Manchester, Kentucky 39495',
          location_zip_code: '22663',
          location_country: 'USA',
          impact: 'Not In Use'
        },
        {
          id: 7,
          location_name: 'Amazon Facility #135',
          description: 'Place description here',
          location_address_1: '711 Washington St.',
          location_address_2: 'Manchester, Kentucky 39495',
          location_city: 'Phoenix',
          location_state: 'CO',
          location_full_address: '4517 Washington Ave. Manchester, Kentucky 39495',
          location_zip_code: '72341',
          location_country: 'USA',
          impact: 'Inactive'
        }
      ]
    }
  },
  computed: {
    locations (): LocationsDetails[] {
      return (this.$store.getters['locations/carrierLocations'])
    },
    locationPageCount (): Number {
      return (this.$store.getters['locations/pageCount'])
    }
  },
  methods: {
    drawer (componentName: string) {
      this.$refs.drawer.showDrawer(componentName)
    },
    modalShow (): void {
      (this.$refs.modal as Vue & { showModal: () => Function }).showModal()
    },
    findDiv (id: number) {
      if (id === undefined) { return '' }
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
    setStatus (id:number, newStatus:any) {
      const data = this.locations.slice()
      console.log(id, newStatus)
      const item = data.find((w:any) => w.id === id)
      this.updateLocation({ ...item, location_status: newStatus })
    },
    ...mapActions({
      // getLocations: (action, page) => action('locations/getLocations', page),
      getLocations: (action, page) => action('locations/getLocationsByCarrierId', page),
      removeLocation: (action, id) => action('locations/removeLocation', id),
      updateLocation: (action, request) => action('locations/updateLocation', request)
    })
  }
})
</script>

<style scoped>

</style>
