<template>
  <div class="w-full">
    <Drawer ref="drawer" />
    <nuxt-child />
    <PageHeader title="Trailer Profile" class="mb-10" :data="response" @goback="$router.go(-1)" />
    <div
      v-if="response"
      class="mb-12 col-12 relative bg-white shadow-2xl shadow-gray-200 rounded-xl p-12 dark:bg-[#21293B] dark:shadow-none"
    >
      <div class="row col-12">
        <div class="col-3">
          <div>
            <div class="flex items-center">
              <span class="text-b-3 font-semibold text-gray-800 mr-[11px]">{{ response.brand }} Trailer</span>
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
              <img src="/images/trailer_big.png" class="w-full h-auto">
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
              <div class="bg-orange-50 flex flex-col items-center justify-center p-3 rounded-xl">
                <div class="icon w-8 h-8 bg-orange-200 flex items-center justify-center rounded-full mb-2">
                  <Icon icon="category" :size="20" color="dark" variant="outline" class="w-5 h-5" />
                </div>
                <div class="info">
                  <span class="font-semibold text-c-1 block text-center">{{ response.trailer_id }}</span>
                  <span class="text-gray-400 text-c-2 block text-center">Trailer ID</span>
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
          </div>
        </div>
        <div class="col-3 border-l border-grey-blue-100 px-4">
          <div class="flex flex-col">
            <span class="text-b-3 font-semibold">Trailer Size</span>
            <span class="text-c-1 font-semibold text-gray-400">Convallis id pharetra porta massa.</span>
          </div>
          <div class="flex flex-col pt-6">
            <span class="text-c-1 mb-2"><strong>Length :</strong> {{ response.length }}</span>
            <span class="text-c-1 mb-2"><strong>Width :</strong> {{ response.width }}</span>
            <span class="text-c-1 mb-2"><strong>Height :</strong> {{ response.height }}</span>
            <span class="text-c-1 mb-2"><strong>Capacity :</strong> {{ response.capacity }}</span>
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
                  color="tuna"
                  :alpha="800"
                  variant="outline"
                  class="p-4"
                  :border="true"
                />
              </div>
              <div class="col-4 px-1 mb-4">
                <InfoBox
                  :value="convertToDate(response.registration_renewal_date)"
                  title="Registration Rewenal Date"
                  icon="calendar-1"
                  color="tuna"
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
                  color="tuna"
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
                  color="tuna"
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
                  color="tuna"
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
                  color="tuna"
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
          @click="drawer('EditTrailer')"
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
              title="Trailer Maintenance"
              color="green"
              icon="setting"
              @click="(selectedTab = 0)"
            />
          </div>
          <div class="col-auto  p-0  pr-2">
            <TabButton
              :active="(selectedTab === 1)"
              title="Truck History"
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
        <Table v-show="(selectedTab === 0)" title="Trailer Maintenance" :headers="mainHeaders" :data="mainData">
          <template #item-status="{ item }">
            <Badge
              :title="item.status[0].toUpperCase() + item.status.slice(1)"
              :class="[
                { 'bg-green-100 text-green-800': item.status === 'done' },
                { 'bg-orange-100 text-orange': item.status === 'soon' },
              ]"
              :size="SizeTypeEnum.MD"
            />
          </template>
          <template #item-actions>
            <div class="flex items-center" @click="drawer('EditTrailerMaintenance')">
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
        <Table v-show="(selectedTab === 1)" title="Trailer History" :headers="truckHistoryHeaders" :data="truckHistoryData" />
        <Table v-show="(selectedTab === 2)" title="Driver History" :headers="driverHistoryHeaders" :data="driverHistoryData" />
        <Table v-show="(selectedTab === 3)" title="Asset History" :headers="assetHistoryHeaders" :data="assetHistoryData" />
      </div>
    </div>
    <DeleteModal
      ref="modal"
      :delete-id="parseInt($route.params.id, 10)"
      :delete-function="removeTrailer"
      :delete-subtext="deleteSubtext"
      :pop-back="true"
    />
  </div>
</template>

<script lang="ts">
import moment from 'moment'
import Vue from 'vue'
import { mapActions } from 'vuex'
import { ActionTypeEnum, ButtonTypeEnum, SizeTypeEnum } from '~/components/ts/enums'
import { Trailer } from '~/models/trailer/trailer'

export default Vue.extend({
  name: 'TrailerProfilePage',
  layout: 'Dashboard',
  data () {
    return {
      ActionTypeEnum,
      ButtonTypeEnum,
      SizeTypeEnum,
      slideToggle: true,
      deleteSubtext: 'Test',
      drivers: [
        {
          firstName: 'Cameron',
          lastName: 'Williams',
          driverType: 'Main Captain',
          phone: '495 - 233 - 0987',
          img: '/images/Ellipse_49.png'
        },
        {
          firstName: 'Cameron',
          lastName: 'Williams',
          driverType: 'Co Driver',
          phone: '495 - 233 - 0987',
          img: '/images/Ellipse_49.png'
        }
      ], // TODO: Truck drivers a hangi servis ile ulaşılacak?
      status: 1, // TODO: status activity anlamına mı geliyor?
      // response: {
      //   trailer_id: 'TRL - 1533520',
      //   brand: 'Volvo',
      //   model: 'VNL 860',
      //   color: 'White',
      //   model_year: '2020',
      //   length: '48 - 53 feet (576 - 636 inches)',
      //   width: '8.5 feet (102 inches)',
      //   height: '13.5 feet (162 inches)',
      //   capacity: '100 m3',
      //   plate: 'ABC - 1234',
      //   truck_id: 24567897,
      //   asset_owner: 'Leslie Alexander',
      //   vin_number: '1234-5678-9101-456 -7896',
      //   annual_inspection_date: 'October 27, 2022',
      //   registration_renewal_date: 'September 31, 2023',
      //   preventive_maintenance_date: 'September 31, 2023',
      //   in_service_date: 'October 31, 2022',
      //   out_of_service_date: 'December 1, 2022',
      //   unit_number: '4'
      // } as Trailer,
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
          description: 'Vehicle 1 description here',
          status: 'done',
          date: '20/05/2022'
        },
        {
          categories: 'Vehicle Maintenance#2',
          description: 'Vehicle 2 description here',
          status: 'done',
          date: '20/05/2022'
        },
        {
          categories: 'Vehicle Maintenance#3',
          description: 'Vehicle 3 description here',
          status: 'done',
          date: '20/05/2022'
        },
        {
          categories: 'Vehicle Maintenance#4',
          description: 'Vehicle 4 description here',
          status: 'soon',
          date: '20/05/2022'
        },
        {
          categories: 'Vehicle Maintenance#5',
          description: 'Vehicle 5 description here',
          status: 'soon',
          date: '20/05/2022'
        }
      ],
      truckHistoryHeaders: {
        truckID: {
          label: 'Truck ID'
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
      truckHistoryData: [
        {
          truckID: 'TRL - 156622565',
          vinNumber: '1234 - 5678 - 9102 - 4568',
          startDate: '20/05/2022',
          endDate: '06/17/2022'
        },
        {
          truckID: 'TRL - 156622565',
          vinNumber: '1234 - 5678 - 9102 - 4568',
          startDate: '20/05/2022',
          endDate: '06/17/2022'
        },
        {
          truckID: 'TRL - 156622565',
          vinNumber: '1234 - 5678 - 9102 - 4568',
          startDate: '20/05/2022',
          endDate: '06/17/2022'
        },
        {
          truckID: 'TRL - 156622565',
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
    response (): Trailer {
      return this.$store.getters['trailer/trailer']
    }
  },
  mounted () {
    this.getTrailer(parseInt(this.$route.params.id, 10))
  },
  methods: {
    ...mapActions({
      getTrailer: (action, id) => action('trailer/getTrailer', id),
      removeTrailer: (action, id) => action('trailer/removeTrailer', id)

    }),
    convertToDate (dateString:string | Date): string {
      return moment(dateString).format('yyyy-MM-DD hh:mm')
    },
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
