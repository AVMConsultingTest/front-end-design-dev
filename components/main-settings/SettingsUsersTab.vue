<template>
  <div class="w-full">
    <div class="border border-gray-300/50 bg-gray-300/20 w-full rounded-lg flex flex-row p-3 mb-8 mt-9 filter-drops">
      <div class="row items-center justify-between w-full">
        <div class="col-12">
          <p class="text-c-1 text-grey-dark-200 mb-2">
            Filter by
          </p>
        </div>
        <div class="flex">
          <div class="col-5 flex">
            <div class="col-5 pr-2">
              <m-select
                v-model="selectedFilter"
                wrapper-class="bg-white"
                drop-icon="sort"
                name="Filter"
                placeholder="Filters"
                :options="filters"
              />
            </div>
            <div class="col-5 pr-2">
              <m-select
                v-model="selectedFilter"
                wrapper-class="bg-white"
                name="Filter"
                placeholder="Filters"
                :options="filters"
              />
            </div>
            <div class="col-5 pr-2">
              <m-select
                :multiple="false"
                :options="rangeOptions"
                name="reportRange"
                wrapper-class="!text-c-1"
              />
            </div>
          </div>
          <div class="col-7 flex justify-end">
            <div class="col-4 flex justify-end">
              <Button
                class="flex h-10 max-w-max p-4 !text-b-3"
                :type="ButtonTypeEnum.PRIMARY"
                :size="SizeTypeEnum.MD"
                :action="ActionTypeEnum.BUTTON"
                @click="openModal"
              >
                Add User +
              </Button>
            </div>
            <div class="row items-center relative cursor-pointer  h-10  ml-4 !text-b-2 justify-end">
              <Button
                :type="ButtonTypeEnum.PRIMARY"
                :size="SizeTypeEnum.LG"
                :action="ActionTypeEnum.BUTTON"
                class="!w-48 !h-12 !text-b-3 max-w-max !bg-dark-blue"
                @click="() => { opened = !opened }"
              >
                Actions
              </Button>
              <transition name="slide">
                <div v-if="opened" class="z-10 absolute top-10 rounded-lg bg-white left-0 right-0 w-48 shadow-2xl">
                  <ul class="px-4 py-5">
                    <li
                      v-for="(action, index) in generateActions"
                      :key="index"
                      class="text-c-1 font-medium text-gray-800 w-full flex justify-center items-center cursor-pointer text-center"
                      :class="[
                        { 'mb-7' : index !== generateActions.length - 1}
                      ]"
                    >
                      {{ action }}
                    </li>
                  </ul>
                </div>
              </transition>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="block my-8">
      <h3 class="text-b-2 font-semibold text-start">
        Users
      </h3>
      <p class="text-b-4 font-medium text-gray-400 text-start">
        Admins can add and remove users and manage organization-level settings.
      </p>
    </div>
    <Table
      :multiple-enabled="true"
      :headers="headers"
      :data="testData"
      :left-header:="true"
    >
      <template #item-name="{ item }">
        <div class="flex items-center">
          <div class="mr-2">
            <img class="inline-block h-10 w-10 min-h-[2.5rem] min-w-[2.5rem] max-h-[2.5rem] max-w-[2.5rem] rounded-full ring-2 ring-white" src="/images/Ellipse_49.png" alt="driver">
          </div>
          <div>
            <span class="block whitespace-nowrap">
              {{ item.carrier_name }}
            </span>
            <span class="block text-c-1 text-gray-400">
              {{ item.email }}
            </span>
          </div>
        </div>
      </template>
      <template #item-status="{ item }">
        <Badge
          :title="item.status"
          :class="[
            {'bg-green-100 text-green-800' : item.status === 'Completed'},
            {'bg-green-100 text-green-800' : item.status === 'Active'},
            {'bg-green-100 text-green-800' : item.status === 'Selected'},
            {'bg-red-100 text-red-800' : item.status === 'Not Completed'},
            {'bg-red-100 text-red-800' : item.status === 'Failed'},
            {'bg-gray-100 text-gray-400' : item.status === 'Not Started'},
            {'bg-green-100 text-green-800' : item.status === 'Pass'},
            {'bg-red-100 text-red-800' : item.status === 'Overdue'},
            {'bg-orange-100 text-orange-800' : item.status === 'Pending'},
          ]"
          :size="SizeTypeEnum.LG"
        />
      </template>
      <template #item-actions>
        <div class="w-8 h-8 border border-gray-300 rounded-lg flex items-center justify-center">
          <Icon icon="more-2" color="grey-dark" :alpha="100" :disable-fill="false" class="w-4 h-4 cursor-pointer" />
        </div>
      </template>
    </Table>

    <div class="row mb-5">
      <h6 class="font-semibold text-start mb-2 mt-20">
        Where you’re logged in
      </h6>
      <div class="col-10">
        <p class="text-b-4 text-grey-dark-600">
          We’ll alert you via olivia@untitledui.com if there is any unusual activity on your account.
        </p>
      </div>
    </div>

    <Modal ref="modal" size="sm">
      <div v-if="firstBody" slot="body" class="row flex items-center justify-center" :class="[{ 'py-16' : !firstBody }]">
        <div class="col-12 items-center justify-center my-0">
          <div
            class="flex justify-end"
            @click="modalHide()"
          >
            <Icon
              icon="close-circle"
              color="gray"
              variant="bulk"
              :alpha="400"
              class="w-12 h-12 cursor-pointer"
            />
          </div>
          <h4 class="font-medium text-start mb-2">
            Add User(s)
          </h4>
          <Form fclass="row my-2">
            <div class="col-8 mb-6">
              <Input
                :multiple="false"
                :searchable="true"
                name="mail"
              />
            </div>
            <div class="col-4 mb-6">
              <m-select
                :multiple="false"
                :searchable="true"
                :options="testOptions"
                name="state"
              />
            </div>
            <div class="col-8 mb-6">
              <Input
                :multiple="false"
                :searchable="true"
                name="state"
              />
            </div>
            <div class="col-4 mb-6">
              <m-select
                :multiple="false"
                :searchable="true"
                :options="testOptions"
                name="state"
              />
            </div><div class="col-8 mb-6">
              <Input
                :multiple="false"
                :searchable="true"
                name="state"
              />
            </div>
            <div class="col-4 mb-6">
              <m-select
                :multiple="false"
                :searchable="true"
                :options="testOptions"
                name="state"
              />
            </div>
          </Form>
        </div>
        <div class="row mb-5 items-center">
          <div
            class="col-1 w-14 h-12 bg-white rounded-lg flex items-center justify-center cursor-pointer"
            @click="() => {}"
          >
            <Icon icon="add" color="black" class="w-6 h-6" />
          </div>
          <span class="col-4 text-b-4 font-medium">
            Add another
          </span>
        </div>
        <div class="col-8">
          <Button :type="ButtonTypeEnum.PRIMARY" :size="SizeTypeEnum.LG" @click="(firstBody = false)">
            Send Invite
          </Button>
        </div>
      </div>
      <div v-if="firstBody === false" slot="body" class="row flex items-center justify-center py-16">
        <div class="col-12 flex items-center justify-center">
          <div class="bg-green-400/40 rounded-full w-40 h-40 relative">
            <svg
              width="160"
              height="160"
              viewBox="0 0 1024 1024"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="rgb(41, 45, 50)"
                d="M451.392 664.751c-8.533 0-16.64-3.413-22.613-9.387l-120.749-120.747c-12.373-12.373-12.373-32.853 0-45.227s32.853-12.373 45.227 0l98.135 98.133 219.307-219.307c12.373-12.373 32.853-12.373 45.227 0s12.373 32.853 0 45.227l-241.92 241.92c-5.973 5.973-14.080 9.387-22.613 9.387z"
                stroke="#BAF1DA"
              />
            </svg>
          </div>
        </div>
        <div class="col-8 items-center justify-center my-14">
          <h3 class="font-semibold text-center mb-2">
            We’ve sent your invitations
          </h3>
          <p class="text-b-4 font-medium text-gray-400 text-center">
            Odio eu purus imperdiet feugiat. Faucibus semper volutpat sapien, morbi neque pulvinar velit. Elementum sollicitudin sed sit pellentesque consectetur in neque nisl convallis.
          </p>
        </div>
        <div class="col-8">
          <Button
            :type="ButtonTypeEnum.GREEN"
            :size="SizeTypeEnum.LG"
            @click="modalHide()"
          >
            Done
          </Button>
        </div>
      </div>
      <div class="col-8 items-center justify-center my-14">
        <h3 class="font-semibold text-center mb-2">
          Congratulations !
        </h3>
        <p class="text-b-4 font-medium text-gray-400 text-center">
          Odio eu purus imperdiet feugiat. Faucibus semper volutpat sapien, morbi neque pulvinar velit.
          Elementum sollicitudin sed sit pellentesque consectetur in neque nisl convallis.
        </p>
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
    </Modal>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import {
  SizeTypeEnum,
  ActionTypeEnum,
  ButtonTypeEnum
} from '@/components/ts/enums'
import { SelectOption } from '~/components/ts/interfaces'
export default Vue.extend({
  name: 'SettingsUsersTab',
  layout: 'Dashboard',
  data () {
    return {
      ButtonTypeEnum,
      ActionTypeEnum,
      SizeTypeEnum,
      selectedFilter: '',
      firstBody: true,
      opened: false,
      rangeOptions: [
        {
          id: 'Today',
          text: 'Date Renges',
          selected: true,
          icon: { name: 'calendar', variant: 'bulk' }
        },
        {
          id: 'Next day',
          text: 'Next day',
          selected: false,
          icon: { name: 'calendar', variant: 'bulk' }
        },
        {
          id: 'Next 3 days',
          text: 'Next 3 days',
          selected: false,
          icon: { name: 'calendar', variant: 'bulk' }
        },
        {
          id: 'Next 7 days',
          text: 'Next 7 days',
          selected: false,
          icon: { name: 'calendar', variant: 'bulk' }
        }
      ] as SelectOption[],
      filters: [
            { id: 1, text: 'Filter 1', selected: true },
            { id: 2, text: 'Filter 2', selected: false },
            { id: 3, text: 'Filter 3', selected: false },
            { id: 4, text: 'Filter 4', selected: false }
      ] as SelectOption[],
      testOptions: [
            { id: 1, text: 'Admin', selected: true },
            { id: 2, text: 'Personal', selected: false }
      ] as SelectOption[],
      mode: 'grid',
      headers: {
        carrier_name: {
          label: 'Carrier Name',
          sortable: true
        },
        status: {
          label: 'Status',
          sortable: true
        },
        last_active: {
          label: 'Last Active',
          sortable: true
        },
        role: {
          label: 'Role',
          sortable: true
        },
        email_usage: {
          label: 'Email Usage',
          sortable: true
        },
        actions: {
          label: 'Action',
          sortable: false
        }
      },
      testData: [
        {
          carrier_name: 'Dianne Russell',
          status: 'Active',
          last_active: 'November 7, 2017',
          role: 'Admin',
          email_usage: '0.19 GB',
          email: 'diannerussell@gmail.com'
        },
        {
          carrier_name: 'Dianne Russell',
          status: 'Active',
          last_active: 'November 7, 2017',
          role: 'Admin',
          email_usage: '0.19 GB',
          email: 'diannerussell@gmail.com'
        },
        {
          carrier_name: 'Arlene McCoy',
          status: 'Active',
          last_active: 'May 29, 2017',
          role: 'Team Member',
          email_usage: '0.19 GB',
          email: 'diannerussell@gmail.com'
        },
        {
          carrier_name: 'Brooklyn Simon',
          status: 'Active',
          last_active: 'December 29, 2012',
          role: 'Admin',
          email_usage: '0.19 GB',
          email: 'diannerussell@gmail.com'
        },
        {
          carrier_name: 'Ronald Richard',
          status: 'Active',
          last_active: 'August 24, 2013',
          role: 'Team Member',
          email_usage: '0.19 GB',
          email: 'diannerussell@gmail.com'
        },
        {
          carrier_name: 'Bessie Cooper',
          status: 'Active',
          last_active: 'May 20, 2015',
          role: 'Admin',
          email_usage: '0.19 GB',
          email: 'diannerussell@gmail.com'
        },
        {
          carrier_name: 'Wade Warren',
          status: 'Active',
          last_active: 'November 7, 2017',
          role: 'Team Member',
          email_usage: '0.19 GB',
          email: 'diannerussell@gmail.com'
        }
      ],
      generateActions: [
        'Upload',
        'Download'
      ]
    }
  },
  methods: {
    openModal () {
      (this.$refs.modal as Vue & { showModal: () => Element }).showModal()
    },
    modalHide (): void {
      this.firstBody = true;
      (this.$refs.modal as Vue & { hideModal: () => Function }).hideModal()
    }
  }
})
</script>
