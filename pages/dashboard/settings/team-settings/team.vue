<template>
  <div class="w-full">
    <PageHeader
      title="Team"
      @goback="$router.go(-1)"
    >
      <template #actions>
        <div class="w-8 h-8 border  relative rounded-lg flex items-center justify-center">
          <Icon
            icon="search-normal-1"
            variant="linear"
            color="gray"
            :alpha="400"
            class="w-4 h-4 cursor-pointer"
            :disable-fill="true"
          />
        </div>
      </template>
    </PageHeader>

    <div class="flex flew-row">
      <div>
        <h5 class="font-semibold">
          Design Team
        </h5>
      </div>
      <div class="col-3 ml-auto">
        <Button
          class="flex"
          :type="ButtonTypeEnum.PRIMARY"
          :size="SizeTypeEnum.LG"
          :action="ActionTypeEnum.BUTTON"
          @click="openModal"
        >
          Add User  +
        </Button>
      </div>
    </div>
    <div class="col-12 mb-5 mt-8">
      <Table
        :headers="getHeader"
        :data="testData"
        :show-header="false"
        :multiple-enabled="true"
      >
        <div slot="actions" class="w-full flex items-center justify-end">
          <div class="!w-52 m-input mr-2 flex items-center cursor-pointer">
            <Icon icon="directbox-receive" variant="bulk" color="gray" :alpha="400" class="w-6 h-6 ml-5 mr-2" />
            <span class="text-c-1 mr-5">Download</span>
          </div>
        </div>
        <template #item-status="{ item }">
          <Badge
            :icon-color="item.status === 'Submitted' ? 'green' : item.status.includes('pute') ? 'red' : 'orange'"
            :title="item.status[0].toUpperCase() + item.status.slice(1)"
            :class="[
              { 'bg-green-100 text-green-800': item.status === 'Active' },
              { 'bg-orange-100 text-orange-800': item.status === 'Open' },
              { 'bg-red-100 text-red-800': item.status.includes('pute') },
            ]"
            :size="SizeTypeEnum.MD"
          />
        </template>
        <template #item-actions>
          <div class="w-8 h-8 border border-gray-300 rounded-lg flex items-center justify-center">
            <Icon icon="more-2" color="grey-dark" :alpha="100" :disable-fill="false" class="w-4 h-4 cursor-pointer" />
          </div>
        </template>
      </Table>
    </div>
    <div class="row mt-16">
      <div class="col-1" />
      <div class="col-10">
        <div class="space-between-devices">
          <h4 class="logged-in-title">
            Where you’re logged in
          </h4>
          <Icon
            icon="more-2"
            class="dots-icon"
          />
        </div>
      </div>
    </div>
    <div class="col-1" />
    <div class="row mb-5">
      <div class="col-1" />
      <div class="col-10">
        <h6 class="logged-in-desc">
          We’ll alert you via olivia@untitledui.com if there is any unusual activity on your account.
        </h6>
      </div>
      <div class="col-1" />
    </div>
    <div class="divider" />
    <div class="row mb-4 col-12 tester mt-5 logged-device">
      <div class="col-1 flex py-2 flex-row-reverse">
        <Icon
          icon="monitor-05"
          color="gray"
          :disable-fill="true"
          variant="outline"
          :alpha="0"
          class="w-5 h-5 p-0"
        />
      </div>
      <div class="flex flex-col col-10 pb-4 border-b-[1px]">
        <div class="ml-10" />
        <h6 class="logged-in-desc-light col-10">
          2018 Macbook Pro 15-inch
        </h6>
        <div class="ml-10" />
        <h6 class="logged-in-desc-light col-10">
          Melbourne, Australia • 22 Jan at 10:40am
        </h6>
      </div>
    </div>
    <div class="row mb-28 col-12 tester mt-5 logged-device">
      <div class="col-1 flex py-2 flex-row-reverse">
        <Icon
          icon="monitor-05"
          color="gray"
          :disable-fill="true"
          variant="outline"
          :alpha="0"
          class="w-5 h-5 p-0"
        />
      </div>
      <div class="flex flex-col col-10 pb-4 border-b-[1px]">
        <div class="ml-10" />
        <h6 class="logged-in-desc-light flex col-10">
          2018 Macbook Pro 15-inch
        </h6>
        <div class="ml-10" />
        <h6 class="logged-in-desc-light col-10">
          Melbourne, Australia • 22 Jan at 10:40am
        </h6>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {
  SizeTypeEnum,
  ActionTypeEnum,
  ButtonTypeEnum
} from '@/components/ts/enums'
export default Vue.extend({
  layout: 'Dashboard',
  data () {
    return {
      ButtonTypeEnum,
      ActionTypeEnum,
      SizeTypeEnum,
      headers: {
        member: {
          label: 'Member'
        },
        status: {
          label: 'Status'
        },
        last_active: {
          label: 'Last Active'
        },
        role: {
          label: 'Role'
        },
        email_usage: {
          label: 'Email Usage'
        },
        actions: {
          label: 'Action'
        }
      },
      testData: [
        {
          member: 'Dianne Russel',
          status: 'Active',
          last_active: 'November 7, 2017',
          role: 'Admin',
          email_usage: '0.19 GB'
        },
        {
          member: 'Arlene McCoy',
          status: 'Active',
          last_active: 'May 29, 2017',
          role: 'Team Member',
          email_usage: '0.19 GB'
        },
        {
          member: 'Brooklyn Simon',
          status: 'Active',
          last_active: 'December 29, 2012',
          role: 'Team Member',
          email_usage: '0.19 GB'
        },
        {
          member: 'Ronald Richard',
          status: 'Active',
          last_active: 'August 24, 2013',
          role: 'Team Member',
          email_usage: '0.19 GB'
        },
        {
          member: 'Bessie Cooper',
          status: 'Active',
          last_active: 'May 20, 2015',
          role: 'Team Member',
          email_usage: '0.19 GB'
        },
        {
          member: 'Wade Warren',
          status: 'Active',
          last_active: 'May 20, 2015',
          role: 'Admin',
          email_usage: '0.19 GB'
        },
        {
          member: 'Darrell Steward',
          status: 'Active',
          last_active: 'May 20, 2015',
          role: 'Admin',
          email_usage: '0.19 GB'
        },
        {
          member: 'Darlene Robertson',
          status: 'Active',
          last_active: 'May 20, 2015',
          role: 'Admin',
          email_usage: '0.19 GB'
        },
        {
          member: 'Jenny Wilson',
          status: 'Active',
          last_active: 'May 20, 2015',
          role: 'Admin',
          email_usage: '0.19 GB'
        }
      ]
    }
  },
  computed: {
    getHeader () {
      return this.headers
    },
    getTableData () {
      return []
    }
  }
})
</script>
