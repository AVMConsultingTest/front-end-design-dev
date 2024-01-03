<template>
  <div class="w-full">
    <Drawer ref="drawer" />
    <PageHeader title="Truck Profile" class="mb-10" @goback="$router.go(-1)" />
    <div
      v-if="response"
      class="mb-12 col-12 relative bg-white shadow-2xl shadow-gray-200 rounded-xl p-12 dark:bg-[#21293B] dark:shadow-none"
    >
      <div class="row col-12">
        <div class="col-3">
          <div>
            <div class="flex items-center">
              <span class="text-b-3 font-semibold text-gray-800 mr-[11px]">{{ response.brand }} Truck</span>
              <span
                class="w-2 h-2 rounded-full mr-[9px]"
                :class="[{ 'bg-green-400': status === 0 },
                         { 'bg-lime': status !== 0 }]"
              />
              <span
                class="text-c-1"
                :class="[{ 'text-green-400': status === 0 },
                         { 'text-lime': status !== 0 }]"
              >
                {{ status === 0 ? 'Active' : 'Inactive' }}
              </span>
            </div>
            <div>
              <span class="text-c-1 font-medium text-gray">{{ response.model }} - {{ response.color }}</span>
            </div>
            <div class="pt-11">
              <img src="/images/Truck_pic.png" class="w-full h-auto">
            </div>
          </div>
        </div>
        <div class="col-6 px-6">
          <div class="row">
            <div class="col-4 mb-6">
              <div class="bg-indigo-50 flex flex-col items-center justify-center p-3 rounded-xl">
                <div class="icon w-8 h-8 bg-indigo-200 flex items-center justify-center rounded-full mb-2">
                  <Icon icon="calendar" color="dark" :size="20" variant="outline" class="w-5 h-5" />
                </div>
                <div class="info">
                  <span class="font-semibold text-c-1 block text-center">{{ response.model_year }}</span>
                  <span class="text-gray-400 text-c-2 block text-center">Model Year</span>
                </div>
              </div>
            </div>
            <div class="col-4">
              <div class="bg-purple-100 flex flex-col items-center justify-center p-3 rounded-xl">
                <div class="icon w-8 h-8 bg-purple-200 flex items-center justify-center rounded-full mb-2">
                  <Icon icon="document" :size="20" color="dark" variant="outline" class="w-5 h-5" />
                </div>
                <div class="info">
                  <span class="font-semibold text-c-1 block text-center">{{ response.plate }}</span>
                  <span class="text-gray-400 text-c-2 block text-center">Plate</span>
                </div>
              </div>
            </div>
            <div class="col-4">
              <div class="bg-blue-50 flex flex-col items-center justify-center p-3 rounded-xl">
                <div class="icon w-8 h-8 bg-blue-200 flex items-center justify-center rounded-full mb-2">
                  <Icon icon="truck" :size="20" color="dark" variant="outline" class="w-5 h-5" />
                </div>
                <div class="info">
                  <span class="font-semibold text-c-1 block text-center">{{ response.truck_id }}</span>
                  <span class="text-gray-400 text-c-2 block text-center">Truck ID</span>
                </div>
              </div>
            </div>
            <div class="col-4">
              <div class="bg-green-50 flex flex-col items-center justify-center p-3 rounded-xl">
                <div class="icon w-8 h-8 bg-green-200 flex items-center justify-center rounded-full mb-2">
                  <Icon icon="square" :size="20" color="dark" variant="outline" class="w-5 h-5" />
                </div>
                <div class="info">
                  <span class="font-semibold text-c-1 block text-center">{{ response.unit_number }} Truck</span>
                  <span class="text-gray-400 text-c-2 block text-center">Unit Number</span>
                </div>
              </div>
            </div>
            <div class="col-4">
              <div class="bg-yellow-50 flex flex-col items-center justify-center p-3 rounded-xl">
                <div class="icon w-8 h-8 bg-yellow-200 flex items-center justify-center rounded-full mb-2">
                  <Icon icon="user-tag" :size="20" color="dark" variant="outline" class="w-5 h-5" />
                </div>
                <div class="info">
                  <span class="font-semibold text-c-1 block text-center">{{ response.asset_owner }}</span>
                  <span class="text-gray-400 text-c-2 block text-center">Asset Owner</span>
                </div>
              </div>
            </div>
            <div class="col-4">
              <div class="bg-orange-50 flex flex-col items-center justify-center p-3 rounded-xl">
                <div class="icon w-8 h-8 bg-orange-200 flex items-center justify-center rounded-full mb-2">
                  <Icon icon="category" :size="20" color="dark" variant="outline" class="w-5 h-5" />
                </div>
                <div class="info">
                  <span class="font-semibold text-c-1 block text-center">{{ response.acquisition_type }}</span>
                  <span class="text-gray-400 text-c-2 block text-center">Acquisition Type</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-3 mt-auto border-l border-grey-blue-100 px-4">
          <div v-for="(driver, index) in truckDrivers" :key="index" class="pt-6">
            <div class="flex">
              <img :src="drivers[0].img" class="w-20 h-20 min-w-20 min-h-20 max-h-20 max-w-20 mr-4">
              <div class="flex flex-col">
                <span class="text-b-4 font-medium text-gray-800">{{ driver?.first_name }} {{ driver?.last_name }}</span>
                <span class="text-c-1 font-medium text-gray mt-1">{{ index === 0 ? 'Main Driver' : 'Co-Driver' }}</span>
                <div class="flex items-center mt-2">
                  <Icon icon="call" color="gray" :alpha="400" variant="bulk" class="w-4 h-4 transition-all mr-2" />
                  <span class="text-c-1 font-normal text-gray-800">{{ driver?.contact_phone_number }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <transition name="slide">
        <div v-show="!slideToggle" class="col-12 mt-[4.5rem]">
          <div class="col-12 mb-1">
            <div class="mb-6">
              <h6 class="font-semibold text-gray-800">
                Other Information
              </h6>
              <span class="text-c-1 text-gray font-medium">Pharetra, velit, commodo vivamus diam ut mauris.</span>
            </div>
            <div class="flex -mx-1 flex-wrap">
              <div class="col-4 px-1 mb-4">
                <InfoBox
                  :value="response.vin_number"
                  title="VIN Number"
                  icon="clipboard-text"
                  :alpha="800"
                  variant="outline"
                  class="p-4"
                  :border="true"
                />
              </div>
              <div class="col-4 px-1 mb-4">
                <InfoBox
                  :value="response.registration_renewal_date"
                  title="Registration Rewenal Date"
                  icon="calendar-1"
                  :alpha="800"
                  variant="outline"
                  class="p-4"
                  :border="true"
                />
              </div>
              <div class="col-4 px-1 mb-4">
                <InfoBox
                  :value="response.annual_inspection_date"
                  title="Annual Inspection Date"
                  icon="calendar-1"
                  :alpha="800"
                  variant="outline"
                  class="p-4"
                  :border="true"
                >
                  <Badge class="ml-auto bg-red-200 text-red" title="3 Days" />
                </InfoBox>
              </div>
              <div class="col-4 px-1 mb-4">
                <InfoBox
                  :value="response.preventive_maintenance_date"
                  title="Preventative Maintenance Due Date"
                  icon="calendar-1"
                  :alpha="800"
                  variant="outline"
                  class="p-4"
                  :border="true"
                />
              </div>
              <div class="col-4 px-1 mb-4">
                <InfoBox
                  :value="response.in_service_date"
                  title="In Service Date"
                  icon="calendar-1"
                  :alpha="800"
                  variant="outline"
                  class="p-4"
                  :border="true"
                />
              </div>
              <div class="col-4 px-1 mb-4">
                <InfoBox
                  :value="response.out_of_service_date"
                  title="Out of Service Date"
                  icon="calendar-1"
                  :alpha="800"
                  variant="outline"
                  class="p-4"
                  :border="true"
                >
                  <Badge class="ml-auto bg-orange-200 text-orange" title="Upcoming" />
                </InfoBox>
              </div>
            </div>
          </div>
        </div>
      </transition>

      <Button
        :type="ButtonTypeEnum.PRIMARY"
        :action="ActionTypeEnum.BUTTON"
        class="!w-5 !h-5 !rounded-full absolute -bottom-2.5 left-1/2 -translate-x-1/2"
        @click="(slideToggle = !slideToggle)"
      >
        <Icon
          icon="arrow-down-1"
          color="white"
          class="w-3 h-3 transition-all"
          :class="{ 'rotate-180': !slideToggle }"
        />
      </Button>
      <div class="flex absolute top-4 right-4">
        <div
          class="!rounded-full border !w-9 !h-9 border-gray-300  flex justify-center items-center cursor-pointer mr-2"
          @click="modalShow()"
        >
          <Icon icon="trash" variant="bold" color="gray" :alpha="400" class="w-5 h-5" />
        </div>
        <div
          class="!rounded-full border !w-9 !h-9 border-gray-300 flex justify-center items-center cursor-pointer"
          @click="drawer('EditTruck')"
        >
          <Icon icon="edit-2" variant="bold" color="gray" :alpha="400" class="w-5 h-5" />
        </div>
      </div>
    </div>

    <div class="row mb-5">
      <div class="col-12 mt-5 mb-6">
        <div class="row mx-0">
          <div class="col-auto p-0 pr-2">
            <TabButton
              :active="(selectedTab === 0)"
              title="Truck Maintenance"
              color="green"
              icon="setting"
              @click="(selectedTab = 0)"
            />
          </div>
          <div class="col-auto  p-0  pr-2">
            <TabButton
              :active="(selectedTab === 1)"
              title="Trailer History"
              color="green"
              icon="clock"
              @click="(selectedTab = 1)"
            />
          </div>
          <div class="col-auto  p-0  pr-2">
            <TabButton
              :active="(selectedTab === 2)"
              title="Driver History"
              color="green"
              icon="user-octagon"
              @click="(selectedTab = 2)"
            />
          </div>
          <div class="col-auto  p-0  pr-2">
            <TabButton
              :active="(selectedTab === 3)"
              title="Asset History"
              color="green"
              icon="box"
              @click="(selectedTab = 3)"
            />
          </div>
        </div>
      </div>
      <div class="col-12 mb-5">
        <Table
          v-show="(selectedTab === 0)"
          title="Truck Maintenance"
          :headers="mainHeaders"
          :data="[
            {
              categories: 'Vehicle Maintenance#1',
              description: '1 Description about vehicle Maintenance 1',
              status: 'in Process',
              date: '20/05/2022'
            },
            {
              categories: 'Vehicle Maintenance#2',
              description: '2 Description about vehicle Maintenance 2',
              status: 'in Process',
              date: '20/05/2022'
            },
            {
              categories: 'Vehicle Maintenance#3',
              description: '3 Description about vehicle Maintenance 3',
              status: 'in Process',
              date: '20/05/2022'
            },
            {
              categories: 'Vehicle Maintenance#4',
              description: '4 Description about vehicle Maintenance 4',
              status: 'scheduled',
              date: '20/05/2022'
            },
            {
              categories: 'Vehicle Maintenance#5',
              description: '5 Description about vehicle Maintenance 5',
              status: 'scheduled',
              date: '20/05/2022'
            }
          ]"
        >
          <template #item-status="{ item }">
            <Badge
              :title="item.status[0].toUpperCase() + item.status.slice(1)"
              :class="[
                { 'bg-green-100 text-green-800': item.status === 'in Process' },
                { 'bg-orange-100 text-orange': item.status === 'scheduled' },
              ]"
              :size="SizeTypeEnum.MD"
            />
          </template>
          <template #item-actions>
            <div class="flex items-center" @click="drawer('EditTruckMaintenance')">
              <Icon
                icon="edit"
                variant="linear"
                :alpha="400"
                :disable-fill="true"
                color="gray"
                class="w-6 h-6 mr-2"
              />
            </div>
          </template>
          <div slot="actions" class="w-full flex items-center justify-end">
            <div class="!bg-black !w-14 !border-none m-input flex items-center justify-center cursor-pointer">
              <Icon icon="add" color="white" class="w-6 h-6" />
            </div>
          </div>
        </Table>
        <Table v-show="(selectedTab === 1)" title="Trailer History" :headers="trailerHistoryHeaders" :data="trailerHistoryData" />
        <Table v-show="(selectedTab === 2)" title="Driver History" :headers="driverHistoryHeaders" :data="driverHistoryData" />
        <Table v-show="(selectedTab === 3)" title="Asset History" :headers="assetHistoryHeaders" :data="assetHistoryData" />
      </div>
    </div>

    <DeleteModal
      ref="modal"
      :delete-id="parseInt($route.params.id, 10)"
      :delete-function="removeTruck"
      :delete-subtext="deleteSubtext"
      :pop-back="true"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapActions } from 'vuex'
import { ActionTypeEnum, ButtonTypeEnum, SizeTypeEnum } from '~/components/ts/enums'
import { Driver } from '~/models/driver'
import { Truck } from '~/models/truck/truck'

export default Vue.extend({
  name: 'TruckProfilePage',
  layout: 'Dashboard',
  data () {
    return {
      ActionTypeEnum,
      ButtonTypeEnum,
      SizeTypeEnum,
      deleteSubtext: 'Test',
      slideToggle: true,
      drivers: [
        {
          driver_first_name: 'Richart ',
          driver_last_name: 'Williams',
          driver_type: 'Main Captain',
          driver_contact_phone_number: '495 - 233 - 0987',
          img: '/images/Ellipse_49.png'
        },
        {
          driver_first_name: 'Cameron',
          driver_last_name: 'Crucitti',
          driver_type: 'Co Driver',
          driver_contact_phone_number: '495 - 233 - 0987',
          img: '/images/Ellipse_49.png'
        }
      ], // TODO: Truck drivers a hangi servis ile ulaşılacak?
      status: 0, // TODO: status activity anlamına mı geliyor?
      // response: {
      //   brand: 'Volvo',
      //   model: 'VNL 860',
      //   color: 'Black',
      //   model_year: '2020',
      //   plate: 'ABC - 1234',
      //   truck_id: 24567897,
      //   asset_owner: 'Leslie Alexander',
      //   vin_number: '1234-5678-9101-456 -7896',
      //   registration_renewal_date: 'September 31, 2023',
      //   annual_inspection_date: 'Octaber 27, 2022',
      //   preventive_maintenance_date: 'September 31, 2023',
      //   in_service_date: 'October 31, 2022',
      //   out_of_service_date: 'December 1, 2022',
      //   acquisition_type: 'Leasing',
      //   unit_number: '4'

      // } as Truck,
      mainHeaders: {
        categories: {
          label: 'Categories'
        },
        description: {
          label: 'Description'
        },
        status: {
          label: 'Status'
        },
        date: {
          label: 'Date'
        },
        actions: {
          label: 'Actions'
        }
      },
      mainData: [
        {
          categories: 'Vehicle Maintenance#1',
          // description: 'Place description here',
          status: 'in Process',
          date: '20/05/2022'
        },
        {
          categories: 'Vehicle Maintenance#2',
          // description: 'Place description here',
          status: 'in Process',
          date: '20/05/2022'
        },
        {
          categories: 'Vehicle Maintenance#3',
          // description: 'Place description here',
          status: 'in Process',
          date: '20/05/2022'
        },
        {
          categories: 'Vehicle Maintenance#4',
          // description: 'Place description here',
          status: 'scheduled',
          date: '20/05/2022'
        },
        {
          categories: 'Vehicle Maintenance#5',
          // description: 'Place description here',
          status: 'scheduled',
          date: '20/05/2022'
        }
      ],
      trailerHistoryHeaders: {
        trailerID: {
          label: 'Trailer ID'
        },
        vinNumber: {
          label: 'VIN Number'
        },
        startDate: {
          label: 'Start Date'
        },
        endDate: {
          label: 'End Date'
        }
      },
      driverHistoryHeaders: {
        driverID: {
          label: 'Driver ID'
        },
        driverName: {
          label: 'Driver Name'
        },
        driverHierarchy: {
          label: 'Driver Hierarchy'
        },
        startDate: {
          label: 'Start Date'
        },
        endDate: {
          label: 'End Date'
        }
      },
      assetHistoryHeaders: {
        assetID: {
          label: 'Asset ID'
        },
        assetType: {
          label: 'Asset Type'
        },
        startDate: {
          label: 'Start Date'
        },
        endDate: {
          label: 'End Date'
        }
      },
      trailerHistoryData: [
        {
          trailerID: 'TRL - 156622565',
          vinNumber: '1234 - 5678 - 9102 - 4568',
          startDate: '20/05/2022',
          endDate: '06/17/2022'
        },
        {
          trailerID: 'TRL - 156622565',
          vinNumber: '1234 - 5678 - 9102 - 4568',
          startDate: '20/05/2022',
          endDate: '06/17/2022'
        },
        {
          trailerID: 'TRL - 156622565',
          vinNumber: '1234 - 5678 - 9102 - 4568',
          startDate: '20/05/2022',
          endDate: '06/17/2022'
        },
        {
          trailerID: 'TRL - 156622565',
          vinNumber: '1234 - 5678 - 9102 - 4568',
          startDate: '20/05/2022',
          endDate: '06/17/2022'
        }
      ],
      driverHistoryData: [
        {
          driverID: '1',
          driverName: 'John',
          driverHierarchy: 'Primary',
          startDate: '20/05/2022',
          endDate: '20/05/2022'
        },
        {
          driverID: '2',
          driverName: 'Alex',
          driverHierarchy: 'Secondary',
          startDate: '20/05/2022',
          endDate: '20/05/2022'
        },
        {
          driverID: '3',
          driverName: 'Kenny',
          driverHierarchy: 'Primary',
          startDate: '20/05/2022',
          endDate: '20/05/2022'
        },
        {
          driverID: '4',
          driverName: 'Ken',
          driverHierarchy: 'Secondary',
          startDate: '20/05/2022',
          endDate: '20/05/2022'
        }
      ],
      assetHistoryData: [
        {
          assetID: '1',
          assetType: 'Best Pass',
          startDate: '06/17/2022',
          endDate: '06/17/2022'
        },
        {
          assetID: '2',
          assetType: 'Gateway',
          startDate: '06/17/2022',
          endDate: '06/17/2022'
        },
        {
          assetID: '3',
          assetType: 'Best Pass',
          startDate: '06/17/2022',
          endDate: '06/17/2022'
        },
        {
          assetID: '4',
          assetType: 'Gateway',
          startDate: '06/17/2022',
          endDate: '06/17/2022'
        }
      ],
      selectedTab: 0
    }
  },
  computed: {
    response (): Truck {
      return this.$store.getters['truck/truck']
    },
    truckDrivers (): Driver[] {
      const mainDriver = this.$store.getters['driver/carrierDrivers'].find((driver: Driver) => `${driver?.first_name} ${driver?.first_name}` === this.response.main_driver_id)
      const coDriver = this.$store.getters['driver/carrierDrivers'].find((driver: Driver) => `${driver?.first_name} ${driver?.last_name}` === this.response.co_driver_id)
      return [mainDriver, coDriver]
    }
  },
  created () {
    this.getDriversByCarrierId({ page_number: 1, id: 1 })
  },
  mounted () {
    this.getTruck(parseInt(this.$route.params.id, 10))
  },
  methods: {
    ...mapActions({
      getTruck: (action, id) => action('truck/getTruck', id),
      removeTruck: (action, id) => action('truck/removeTruck', id),
      getDriversByCarrierId: (action, param) => action('driver/getDriversByCarrierId', param)
    }),
    modalShow () : void {
      (this.$refs.modal as Vue & { showModal: () => Function }).showModal()
    },
    drawer (drawerName: string) {
      (this.$refs.drawer as Vue & { showDrawer: (component: String, routeUrl?: String) => Element }).showDrawer(drawerName)
    }
  }

})
</script>

<style scoped>

</style>
