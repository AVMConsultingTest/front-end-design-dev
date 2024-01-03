<template>
  <div class="w-full">
    <PageHeader title="Gross Board" />
    <div class="row mb-5">
      <div class="col-12 mb-9 mt-6">
        <Table
          title="Gross Board"
          icon="status-up"
          icon-color="blue"
          :icon-alpha="800"
          :headers="headers"
          :data="grosses"
          :download-enabled="true"
          :search-enabled="true"
          :request-function="getGrosses"
          :page-count="grossPageCount"
          :filtering-model="vfilter"
        >
          <template #item-driver_name="{ data, index,item }">
            <div class="flex items-center mr-4" @click="$router.push(`/carrier/dashboard/dispatch/driver-board/${item.id}`)">
              <div class="col-auto pr-0 mr-2">
                <img :src="testData[0].avatar" :alt="data[index].driver_name" class="rounded-full w-10 h-10">
              </div>
              <div class="col-auto">
                <span class="block text-c-1 font-semibold whitespace-nowrap">
                  {{ data[index].driver_name }}
                </span>
                <span class="block text-c-1 text-gray-400">
                  {{ 'Caption' }}
                </span>
              </div>
            </div>
          </template>
          <template #item-gross_day_1="{data, index}">
            <div class="flex justify-center items-center">
              {{ '$' + data[index].gross_day_1 }}
              <br>
              {{ 'Load: ' + data[index].load_id_1 }}
            </div>
          </template>
          <template #item-gross_day_2="{data, index}">
            <div class="flex justify-center items-center">
              {{ '$' + data[index].gross_day_2 }}
              <br>
              {{ 'Load: ' + data[index].load_id_2 }}
            </div>
          </template>
          <template #item-gross_day_3="{data, index}">
            <div class="flex justify-center items-center">
              {{ '$' + data[index].gross_day_3 }}
              <br>
              {{ 'Load: ' + data[index].load_id_3 }}
            </div>
          </template>
          <template #item-gross_day_4="{data, index}">
            <div class="flex justify-center items-center">
              {{ '$' + data[index].gross_day_4 }}
              <br>
              {{ 'Load: ' + data[index].load_id_4 }}
            </div>
          </template>
          <template #item-gross_day_5="{data, index}">
            <div class="flex justify-center items-center">
              {{ '$' + data[index].gross_day_5 }}
              <br>
              {{ 'Load: ' + data[index].load_id_5 }}
            </div>
          </template>
          <template #item-gross_day_6="{data, index}">
            <div class="flex justify-center items-center">
              {{ '$' + data[index].gross_day_6 }}
              <br>
              {{ 'Load: ' + data[index].load_id_6 }}
            </div>
          </template>
          <template #item-gross_day_7="{data, index}">
            <div class="flex justify-center items-center">
              {{ '$' + data[index].gross_day_7 }}
              <br>
              {{ 'Load: ' + data[index].load_id_7 }}
            </div>
          </template>

          <template #custom-filter>
            <div class="flex">
              <div class="col-6">
                <div class="flex flex-wrap p-6 border-t border-grey-blue-100">
                  <span class="col-12 text-c-1 text-grey-dark-200 font-medium px-1 mb-2">Filter By</span>
                  <div
                    v-for="(filter, index) in filterModelsOne"
                    :key="index"
                    :class="`col-${filter.colSpan} px-1 mb-2`"
                  >
                    <Input
                      v-if="filter.inputType === 'input' || filter.inputType === 'date'"
                      v-model="vfilter[filter.modelName]"
                      :name="filter.options"
                      :type="filter.inputType === 'input' ? 'text' : 'date'"
                      :placeholder="filter.filterName"
                    />
                    <m-select
                      v-else
                      v-model="vfilter[filter.modelName]"
                      :options="filter.options"
                      :name="filter.filterName"
                      :placeholder="filter.filterName"
                      :bind-text="true"
                      :is-nullable="true"
                    />
                  </div>
                </div>
              </div>
            </div>
          </template>
        </Table>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapActions } from 'vuex'
import { SizeTypeEnum } from '~/components/ts/enums'
import { GrossBoardDetails } from '~/models/DISPATCH/grossBoard/grossBoardDetails'
export default Vue.extend({
  name: 'DispatchDashboard',
  layout: 'Dashboard',
  data () {
    return {
      SizeTypeEnum,
      headers: {
        driver_name: {
          label: 'Drivers',
          searchable: true
        },
        truck_id: {
          label: 'Truck ID'
        },
        gross_day_1: {
          label: '09/10/2022'
        },
        gross_day_2: {
          label: '10/10/2022'
        },
        gross_day_3: {
          label: '11/10/2022'
        },
        gross_day_4: {
          label: '12/10/2022'
        },
        gross_day_5: {
          label: '13/10/2022'
        },
        gross_day_6: {
          label: '14/10/2022'
        },
        gross_day_7: {
          label: '15/10/2022'
        },
        gross_total: {
          label: 'Total'
        },
        plan_reach: {
          label: 'Plan Reach $17K'
        },
        dispatcher_name: {
          label: 'Dispatcher'
        }
      },
      testData: [
        {
          id: 1,
          avatar: 'https://sap.github.io/ui5-webcomponents/assets/images/avatars/man_avatar_3.png',
          driver: 'Bill Sanders',
          driver_type: 'Driver',
          title: 'Caption',
          truck_id: 'LD6548',
          date_09: '$1 Load#1',
          date_10: '$2 Load#2',
          date_11: '$3 Load#3',
          date_12: 'OFF',
          date_13: '$4 Load#4',
          date_14: '$5 Load#5',
          date_15: '$6 Load#6',
          total: '$23',
          plan_reach: '-$16,821',
          dispatcher: 'Mike Lowry'
        },
        {
          id: 1,
          avatar: 'https://sap.github.io/ui5-webcomponents/assets/images/avatars/man_avatar_3.png',
          driver: 'Jamy King',
          title: 'Caption',
          driver_type: 'Operator',
          truck_id: 'LD6548',
          date_09: '$1 Load#1',
          date_10: '$2 Load#2',
          date_11: '$3 Load#3',
          date_12: 'OFF',
          date_13: '$4 Load#4',
          date_14: '$5 Load#5',
          date_15: '$6 Load#6',
          total: '$23',
          plan_reach: '-$16,821',
          dispatcher: 'Bob Donald'
        }
      ],
      filterModelsOne: [
        {
          modelName: 'driver_name',
          filterName: 'Driver Name',
          inputType: 'input',
          colSpan: 4
        },
        {
          modelName: 'start_date',
          filterName: 'Start Date',
          inputType: 'date',
          colSpan: 4
        },
        {
          modelName: 'end_Date',
          filterName: 'End Date',
          inputType: 'date',
          colSpan: 4
        }
      ],
      filterModelsTwo: [
        {
          modelName: 'delivery_date',
          filterName: 'Delivery Date',
          inputType: 'select',
          colSpan: 6,
          options: [
            { id: 1, text: '$1 Load#1' },
            { id: 2, text: '$1 Load#2' },
            { id: 3, text: '$1 Load#3' },
            { id: 4, text: '$1 Load#4' }
          ]
        },
        {
          modelName: 'daily',
          filterName: 'Daily',
          inputType: 'select',
          colSpan: 6,
          options: [
            { id: 1, text: 'Daily' },
            { id: 2, text: 'Weekly' },
            { id: 2, text: 'Monthly' }
          ]
        }
      ],
      vfilter: {} as { [key: string]: unknown }
    }
  },
  computed: {
    grosses (): GrossBoardDetails[] {
      return (this.$store.getters['grossBoard/carrierGrosses'])
    },
    grossPageCount (): Number {
      console.log('page:', this.$store.getters['grossBoard/pageCount'])
      return (this.$store.getters['grossBoard/pageCount'])
    }
  },
  methods: {
    ...mapActions({
      // getGrosses: (action, page) => action('grossBoard/getGrosses', page)
      getGrosses: (action, page) => action('grossBoard/getGrossesByCarrierId', page)

    })
  }
})
</script>
