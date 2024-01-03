<template>
  <div class="w-full">
    <PageHeader title="Load In Transit" :no-border="true" class="mb-0">
      <template #actions>
        <div class="col-auto ml-auto hidden justify-around items-center">
          <div
            class="
            icon-con
            w-12
            h-12
            min-w-[3rem]
            min-h-[3rem]
            rounded-lg
            border border-gray-200
            hover:bg-gray-100
            transition-all
            flex
            items-center
            justify-center
            cursor-pointer
            mr-2
          "
          >
            <Icon
              icon="calendar"
              variant="linear"
              color="gray"
              :alpha="400"
              class="w-5 h-5"
              :disable-fill="true"
            />
          </div>
          <div
            class="
            icon-con
            w-12
            h-12
            min-w-[3rem]
            min-h-[3rem]
            rounded-lg
            border border-gray-200
            hover:bg-gray-100
            transition-all
            flex
            items-center
            justify-center
            cursor-pointer
            mr-2
          "
          >
            <Icon
              icon="search-normal"
              variant="linear"
              color="gray"
              :alpha="400"
              class="w-5 h-5"
              :disable-fill="true"
            />
          </div>
          <Button class="px-9 h-12 max-h-12" :type="ButtonTypeEnum.PRIMARY" :size="SizeTypeEnum.MD" :action="ActionTypeEnum.BUTTON">
            Edit Load
          </Button>
        </div>
      </template>
    </PageHeader>
    <div class="border border-gray-300/50 bg-gray-300/20 -mx-12 px-6 pb-8">
      <span class="text-black text-c-1 py-6 font-medium flex items-center cursor-pointer dark:text-white">
        Load Details
      </span>
      <div class="flex justify-between">
        <div class="flex">
          <InfoBox
            value="BL-09362"
            title="Load ID"
            icon="box"
            :with-bg="true"
            color="dark-blue"
            :alpha="0"
            :fontweight="600"
            class="mr-12"
          />
          <InfoBox
            value="Intel Corporate"
            title="Customer"
            custom-icon-src="/images/Intel.png"
            :with-bg="true"
            color="dark-blue"
            :alpha="0"
            :fontweight="600"
            class="mr-12"
          />
          <InfoBox
            value="$ 2,500"
            title="Revenue"
            icon="wallet"
            :with-bg="true"
            color="green"
            :alpha="800"
            :fontweight="600"
            class="mr-12"
          />
          <InfoBox
            value="$ 2,200"
            title="Max Buy"
            icon="money-send"
            :with-bg="true"
            color="green"
            :alpha="800"
            :fontweight="600"
            class="mr-12"
          />
          <InfoBox
            value="$ 2,100"
            title="Book It Now"
            icon="moneys"
            :with-bg="true"
            color="green"
            :alpha="800"
            :fontweight="600"
            class="mr-12"
          />
          <InfoBox
            value="$ 2,100"
            title="Cost"
            icon="money-recive"
            :with-bg="true"
            color="red"
            :alpha="0"
            :fontweight="600"
            class="mr-12"
          />
        </div>
        <div>
          <m-select
            :multiple="false"
            :options="loadOptions"
            name="loadOptions"
            wrapper-class="!text-c-1 pl-2 pr-16"
          />
        </div>
      </div>
    </div>
    <div class="-mx-12 h-[30rem] bg-gray-200 flex justify-center items-center">
      <h1>MAP</h1>
    </div>
    <div class="load-cards">
      <TabManager class="mt-10" :tab-names="tabNames">
        <template #overview>
          <LoadOverview />
        </template>
        <template #details>
          <LoadDetails />
        </template>
        <template #messages>
          <LoadMessages />
        </template>
        <template #documents>
          <LoadDocuments />
        </template>
      </TabManager>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import moment from 'moment'
import LoadOverview from './-overview.vue'
import LoadDocuments from './-documents.vue'
import LoadDetails from './-details.vue'
import LoadMessages from './-messages.vue'
import {
  SizeTypeEnum,
  ActionTypeEnum,
  ButtonTypeEnum
} from '@/components/ts/enums'
import { SelectOption } from '~/components/ts/interfaces'
export default Vue.extend({
  name: 'LoadTransit',
  components: {
    LoadOverview,
    LoadDocuments,
    LoadDetails,
    LoadMessages
  },
  layout: 'Dashboard',
  data () {
    return {
      ButtonTypeEnum,
      ActionTypeEnum,
      SizeTypeEnum,
      tabNames: ['Overview', 'Details', 'Tendering', 'Messages', 'Notes', 'Documents'],
      loadOptions: [
        {
          id: 'In-Transit',
          text: 'In-Transit',
          selected: true,
          icon: { name: 'map-1', variant: 'bulk', color: 'orange' }
        },
        {
          id: 'In-Transit',
          text: 'In-Transit',
          selected: false,
          icon: { name: 'map-1', variant: 'bulk', color: 'orange' }
        },
        {
          id: 'In-Transit',
          text: 'In-Transit',
          selected: false,
          icon: { name: 'map-1', variant: 'bulk' }
        }
      ] as SelectOption[],
      mode: 'list'
    }
  },
  methods: {
    formatDate (date: string) {
      return moment(date).format('MM-DD-yyyy')
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
