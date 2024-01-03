<template>
  <div class="w-full">
    <PageHeader title="Open Loads" :no-actions="true" />
    <Drawer ref="drawer" />
    <div class="col-12 my-6">
      <Table
        title="Open Loads"
        icon="archive"
        icon-color="blue"
        :icon-alpha="800"
        :icon-rounded="true"
        :headers="headers"
        :data="loadsDetails"
        :request-function="getLoads"
        :page-count="loadsDetailPageCount"
        :search-enabled="true"
        :filter-enabled="false"
        :multiple-enabled="true"
      >
        <template #item-shipperName="{ data, index }">
          <div class="flex items-center">
            <div class="col-auto pr-0 mr-2">
              <img :src="data[index].avatar" :alt="data[index].shipperName" class="rounded-full w-10 h-10">
            </div>
            <div class="col-auto">
              <span class="block text-c-1 font-semibold whitespace-nowrap">
                {{ data[index].shipperName }}
              </span>
            </div>
          </div>
        </template>
        <template #item-revenue="{ item }">
          <Badge
            :title="item.revenue"
            :class="[
              {'bg-green-100 text-green-800' : item.revenue === '$780'},
            ]"
            :size="SizeTypeEnum.MD"
          />
        </template>
        <template #item-milesRate="{ item }">
          <Badge
            :title="item.milesRate"
            :class="[
              {'bg-dark-blue-100 text-dark-blue' : item.milesRate === '1,200/$3,50'},
            ]"
            :size="SizeTypeEnum.MD"
          />
        </template>
        <template #item-categories="{ item }">
          <div class="block">
            <span class="block">{{ item.categories }}</span>
            <span class="block text-c-1 text-gray-400">
              {{ item.description }}
            </span>
          </div>
        </template>
        <template #item-impact="{ item }">
          <Badge
            :title="item.impact[0].toUpperCase() + item.impact.slice(1)"
            :class="[
              {'bg-green-100 text-green-800' : item.impact === 'active'},
              {'bg-red-100 text-red-800' : item.impact === 'inactive'},
              {'bg-gray-100 text-gray-400' : item.impact === 'not in use'},
            ]"
            :size="SizeTypeEnum.MD"
          />
        </template>
        <div slot="actions" class="flex items-center">
          <div class="w-32 h-10 mr-2 mb-2">
            <Button
              class="flex"
              :type="ButtonTypeEnum.PRIMARY"
              :size="SizeTypeEnum.MD"
              :action="ActionTypeEnum.SUBMIT"
              @click="openModal"
            >
              Publish Loads
            </Button>
            <Modal ref="modal" size="sm">
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
                  <Button
                    :type="ButtonTypeEnum.GREEN"
                    :size="SizeTypeEnum.LG"
                    @click="() => { $refs.modal.hideModal() }"
                  >
                    Done
                  </Button>
                </div>
              </div>
            </Modal>
          </div>
        </div>
      </Table>
    </div>
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
import { LoadsDetails } from '~/models/Broker/loadsDetails/loadsDetails'
export default Vue.extend({
  name: 'Broker',
  layout: 'Dashboard',
  data () {
    return {
      SizeTypeEnum,
      ActionTypeEnum,
      ButtonTypeEnum,
      showModal: false,
      headers: {
        shipper_name: {
          label: 'Shipper Name',
          searchable: true
        },
        broker_id: {
          label: 'Broker Load',
          searchable: true
        },
        cust_ref_number: {
          label: 'Cust. Ref#',
          searchable: true
        },
        load_origin:
          {
            label: 'Origin',
            searchable: true
          },
        load_destination:
          {
            label: 'Destination',
            searchable: true
          },
        total_revenue:
          {
            label: 'Revenue',
            searchable: true
          },
        equipment:
          {
            label: 'Equipm. Type',
            searchable: true
          },
        commodity:
          {
            label: 'Commodity',
            searchable: true
          },
        rate:
          {
            label: 'Miles/Rate',
            searchable: true
          },
        loadboard:
          {
            label: 'Loadboard',
            searchable: true
          }
      },
      testData: [
        {
          avatar: '/images/Intel.png',
          shipper_name: 'Catalog',
          broker_id: 'BL -09621',
          cust_ref_number: 'LD09621',
          origin: 'Roanoke, TX',
          destination: 'Phoenix, AZ',
          revenue: '$780',
          equipment: 'Industrial Equipment',
          commodity: 'Retail Goods',
          miles: '1,200/$3,50',
          loadboard: 'Nebula'
        },
        {
          avatar: '/images/Intel.png',
          shipper_name: 'Catalog',
          broker_id: 'BL -09621',
          cust_ref_number: 'LD09621',
          origin: 'Roanoke, TX',
          destination: 'Phoenix, AZ',
          revenue: '$780',
          equipment: 'Industrial Equipment',
          commodity: 'Retail Goods',
          miles: '1,200/$3,50',
          loadboard: 'Nebula'
        },
        {
          avatar: '/images/Intel.png',
          shipper_name: 'Catalog',
          broker_id: 'BL -09621',
          cust_ref_number: 'LD09621',
          origin: 'Roanoke, TX',
          destination: 'Phoenix, AZ',
          revenue: '$780',
          equipment: 'Industrial Equipment',
          commodity: 'Retail Goods',
          miles: '1,200/$3,50',
          loadboard: 'Nebula'
        },
        {
          avatar: '/images/Intel.png',
          shipper_name: 'Catalog',
          broker_id: 'BL -09621',
          cust_ref_number: 'LD09621',
          origin: 'Roanoke, TX',
          destination: 'Phoenix, AZ',
          revenue: '$780',
          equipment: 'Industrial Equipment',
          commodity: 'Retail Goods',
          miles: '1,200/$3,50',
          loadboard: 'Nebula'
        },
        {
          avatar: '/images/Intel.png',
          shipper_name: 'Catalog',
          broker_id: 'BL -09621',
          cust_ref_number: 'LD09621',
          origin: 'Roanoke, TX',
          destination: 'Phoenix, AZ',
          revenue: '$780',
          equipment: 'Industrial Equipment',
          commodity: 'Retail Goods',
          miles: '1,200/$3,50',
          loadboard: 'Nebula'
        },
        {
          avatar: '/images/Intel.png',
          shipper_name: 'Catalog',
          broker_id: 'BL -09621',
          cust_ref_number: 'LD09621',
          origin: 'Roanoke, TX',
          destination: 'Phoenix, AZ',
          revenue: '$780',
          equipment: 'Industrial Equipment',
          commodity: 'Retail Goods',
          miles: '1,200/$3,50',
          loadboard: 'Nebula'
        },
        {
          avatar: '/images/Intel.png',
          shipper_name: 'Catalog',
          broker_id: 'BL -09621',
          cust_ref_number: 'LD09621',
          origin: 'Roanoke, TX',
          destination: 'Phoenix, AZ',
          revenue: '$780',
          equipment: 'Industrial Equipment',
          commodity: 'Retail Goods',
          miles: '1,200/$3,50',
          loadboard: 'Nebula'
        }
      ]
    }
  },
  computed: {
    loadsDetails (): LoadsDetails[] {
      return (this.$store.getters['Broker/loadsDetails/brokerLoads'])
    },
    loadsDetail (): LoadsDetails {
      return (this.$store.getters['Broker/loadsDetails/load'])
    },
    loadsDetailPageCount (): Number {
      return (this.$store.getters['Broker/loadsDetails/pageCount'])
    }
  },
  methods: {
    ...mapActions({
      getLoads: (action, page) => action('Broker/loadsDetails/getLoadsByBrokerId', page),
      removeLoad: (action, id) => action('Broker/loadsDetails/removeLoad', id),
      getLoad: (action, id) => action('Broker/loadsDetails/getLoad', id),
      updateLoad: (action, request) => action('Broker/loadsDetails/updateLoad', request)
    }),
    openModal () {
      (this.$refs.modal as Vue & { showModal: () => Element }).showModal()
    }
  }
})
</script>

  <style scoped>

  </style>
