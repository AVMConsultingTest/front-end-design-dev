<template>
  <div class="w-full">
    <PageHeader title="OOS Rate - Hazmat Details" class="mb-10" @search="''" @goback="$router.go(-1)" />
    <div class="row mb-5">
      <div class="col-12">
        <Table
          title="OOS Rate - Hazmat"
          icon="gps-slash"
          icon-color="grey-dark"
          icon-bg="grey-blue"
          :icon-alpha="1000"
          :icon-rounded="true"
          :headers="headers"
          :download-enabled="true"
          :data="testData"
        >
          <template #item-categories="{ item }">
            <div class="block">
              <span class="block">{{ item.categories }}</span>
              <span class="block text-c-1 text-gray-400">
                {{ item.description }}
              </span>
            </div>
          </template>
          <template #item-net="{ item }">
            <Badge
              :icon="item.impact === 'positive' ? 'increase' : item.impact === 'negative' ? 'decrease' : 'performance'"
              :icon-color="item.impact === 'positive' ? 'green' : item.impact === 'negative' ? 'red' : 'gray'"
              :icon-alpha="item.impact === 'neutral' ? 400 : 800"
              :title="item.impact[0].toUpperCase() + item.impact.slice(1)"
              :class="[
                {'bg-green-100 text-green-800' : item.impact === 'positive'},
                {'bg-red-100 text-red-800' : item.impact === 'negative'},
                {'bg-gray-100 text-gray-400' : item.impact === 'neutral'},
              ]"
              :size="SizeTypeEnum.MD"
            />
          </template>
        </Table>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { SizeTypeEnum } from '@/components/ts/enums'

export default Vue.extend({
  name: 'OosRateHazmatPage',
  layout: 'Dashboard',
  data () {
    return {
      SizeTypeEnum,
      headers: {
        categories: {
          label: 'Categories',
          icon: 'category',
          searchable: true,
          sortable: true
        },
        falling_point: {
          label: 'Falling Point',
          icon: 'activity',
          searchable: true,
          sortable: true
        },
        new_point:
                  {
                    label: 'New Point',
                    icon: 'bill',
                    searchable: true,
                    sortable: true
                  },
        net:
                  {
                    label: 'Net',
                    icon: 'check',
                    searchable: true,
                    sortable: true
                  }
      },
      testData: [
        {
          categories: 'Vehicle Maintenance',
          // description: 'Place description here',
          falling_point: 125,
          new_point: 222,
          impact: 'positive'
        },
        {
          categories: 'Unsafe Driving',
          // description: 'Place description here',
          falling_point: 44,
          new_point: 45,
          impact: 'negative'
        },
        {
          categories: 'Driver Fitness',
          // description: 'Place description here',
          falling_point: 2,
          new_point: 0,
          impact: 'neutral'
        },
        {
          categories: 'HOS Compliance',
          // description: 'Place description here',
          falling_point: 3,
          new_point: 0,
          impact: 'positive'
        },
        {
          categories: 'Substance & Alcohol',
          // description: 'Place description here',
          falling_point: 5,
          new_point: 0,
          impact: 'negative'
        },
        {
          categories: 'HM Compliance',
          // description: 'Place description here',
          falling_point: 1,
          new_point: 0,
          impact: 'neutral'
        },
        {
          categories: 'Crash Indicator',
          // description: 'Place description here',
          falling_point: 5,
          new_point: 18,
          impact: 'positive'
        }
      ]
    }
  }
})
</script>

          <style scoped>

          </style>
