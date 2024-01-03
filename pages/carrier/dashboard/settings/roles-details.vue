<template>
  <div class="w-full">
    <PageHeader title="Roles" class="mb-10" @goback="$router.go(-1)" />
    <div
      class="
          mb-12
          col-12
          relative
          bg-white
          shadow-2xl shadow-gray-200
          rounded-xl
          p-6
          dark:bg-[#21293B] dark:shadow-none
        "
    >
      <div class="row col-12">
        <div class="flex items-center justify-between">
          <h5 class="font-semibold">
            Admin Role Accesses
          </h5>
          <div class="flex items-center">
            <span class="text-dark-blue text-end text-b-4 font-medium mr-7">
              + Add new access
            </span>
            <div
              class="rounded-lg border !w-9 !h-9 border-gray-300 flex justify-center items-center cursor-pointer"
              @click="openModal"
            >
              <Icon icon="edit-2" color="grey-dark" :alpha="100" class="w-5 h-5" />
            </div>
          </div>
        </div>
        <div class="col-12 flex mb-3">
          <div class="col-3 flex">
            <label class="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" value="" class="sr-only peer">
              <div class="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-700" />
              <span class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">Trips</span>
            </label>
          </div>
          <div class="col-3 flex">
            <label class="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" value="" class="sr-only peer">
              <div class="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-700" />
              <span class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">Drivers</span>
            </label>
          </div>
          <div class="col-3 flex">
            <label class="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" value="" class="sr-only peer">
              <div class="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-700" />
              <span class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">Live Booked Loads</span>
            </label>
          </div>
        </div>
        <div class="col-12 flex mb-3">
          <div class="col-3 flex">
            <label class="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" value="" class="sr-only peer">
              <div class="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-700" />
              <span class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">Documents</span>
            </label>
          </div>
          <div class="col-3 flex">
            <label class="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" value="" class="sr-only peer">
              <div class="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-700" />
              <span class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">Load Drivers</span>
            </label>
          </div>
        </div>
        <div class="col-12 flex mb-3">
          <div class="col-3 flex">
            <label class="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" value="" class="sr-only peer">
              <div class="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-700" />
              <span class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">Company Load Tracker</span>
            </label>
          </div>
          <div class="col-3 flex">
            <label class="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" value="" class="sr-only peer">
              <div class="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-700" />
              <span class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">Load Company Document</span>
            </label>
          </div>
        </div>
      </div>
    </div>
    <div class="flex flex-row my-8">
      <div>
        <h5 class="font-semibold">
          Admin Role - Users
        </h5>
      </div>
      <div class="col-2 ml-auto">
        <Button
          class="flex h-10 max-w-max p-4 !text-b-3"
          :type="ButtonTypeEnum.PRIMARY"
          :size="SizeTypeEnum.MD"
          :action="ActionTypeEnum.BUTTON"
          @click="openModal2"
        >
          Add User
        </Button>
      </div>
    </div>
    <Table
      :multiple-enabled="true"
      :headers="headers"
      :data="testData"
      :left-header:="true"
      class="mb-10"
    >
      <template #item-role="{ data, index }">
        <div class="flex items-center">
          <div class="col-auto">
            <span class="block font-semibold">
              {{ data[index].role }}
            </span>
          </div>
        </div>
      </template>
      <template #item-member="{ item }">
        <div class="flex items-center">
          <div class="col-auto pr-0 mr-2">
            <img v-if="item?.avatar !== null && item?.avatar !== undefined" :src="item.avatar" :alt="item.member" class="rounded-full w-10 h-10">
          </div>
          <div class="col-auto">
            <span class="block whitespace-nowrap text-c-1 font-semibold">
              {{ item.member }}
            </span>
            <span class="text-c-2 text-gray font-medium">
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
          <Icon icon="trash" color="grey-dark" :alpha="100" :disable-fill="false" class="w-4 h-4 cursor-pointer" />
        </div>
      </template>
    </Table>
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
          <h4 class="font-medium text-start mb-10">
            Edit Role
          </h4>
          <Form fclass="row my-2">
            <div class="col-12 mb-6">
              <Input
                :multiple="false"
                :searchable="true"
                name="roleName"
                label="Role Name"
              />
            </div>
            <div class="col-12 mb-6">
              <m-select
                :multiple="false"
                :searchable="true"
                :options="testOptions"
                :addable="true"
                name="status"
                label="Status"
              />
            </div>
            <div class="col-12 mb-14">
              <Input
                :multiple="false"
                :searchable="true"
                name="desc"
                label="Description"
              />
            </div>
          </Form>
        </div>
        <div class="col-6 mb-14">
          <Button
            :type="ButtonTypeEnum.PRIMARY"
            :size="SizeTypeEnum.LG"
            @click="modalHide()"
          >
            Save Changes
          </Button>
        </div>
      </div>
    </Modal>
    <Modal ref="modal2" size="sm">
      <div v-if="firstBody" slot="body" class="row flex items-center justify-center" :class="[{ 'py-16' : !firstBody }]">
        <div class="col-12 items-center justify-center my-0">
          <div
            class="flex justify-end"
            @click="modalHide2()"
          >
            <Icon
              icon="close-circle"
              color="gray"
              variant="bulk"
              :alpha="400"
              class="w-12 h-12 cursor-pointer"
            />
          </div>
          <h4 class="font-medium text-start mb-10">
            Add New Role
          </h4>
          <Form fclass="row my-2">
            <div class="col-12 mb-6">
              <Input
                :multiple="false"
                :searchable="true"
                name="roleName"
                label="Role Name"
              />
            </div>
            <div class="col-12 mb-6">
              <m-select
                :multiple="false"
                :searchable="true"
                :options="testOptions"
                :addable="true"
                name="status"
                label="Status"
              />
            </div>
            <div class="col-12 mb-14">
              <Input
                :multiple="false"
                :searchable="true"
                name="desc"
                label="Description"
              />
            </div>
          </Form>
        </div>
        <div class="col-6 mb-14">
          <Button
            :type="ButtonTypeEnum.PRIMARY"
            :size="SizeTypeEnum.LG"
            @click="modalHide2()"
          >
            Create Role
          </Button>
        </div>
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
  name: 'SettingsAdminTab',
  layout: 'Dashboard',
  data () {
    return {
      ButtonTypeEnum,
      ActionTypeEnum,
      SizeTypeEnum,
      selectedFilter: '',
      firstBody: true,
      opened: false,
      testOptions: [
        { id: 1, text: 'Active', selected: true },
        { id: 2, text: 'Inactive', selected: false }
      ] as SelectOption[],
      mode: 'grid',
      headers: {
        member: {
          label: 'Member',
          sortable: false
        },
        status: {
          label: 'Status',
          sortable: false
        },
        last_active: {
          label: 'Last Active',
          sortable: false
        },
        role: {
          label: 'Role',
          sortable: false
        },
        e_mail: {
          label: 'E-mail Usage',
          sortable: false
        },
        actions: {
          label: 'Action',
          sortable: false
        }
      },
      testData: [
        {
          avatar: '/images/Ellipse_4.png',
          member: 'Dianne Russell',
          status: 'Active',
          last_active: 'November 7, 2017',
          role: 'Admin',
          e_mail: '0.19 GB',
          email: 'diannerussel@gmail.com'
        },
        {
          avatar: '/images/Ellipse_4.png',
          member: 'Arlene McCoy',
          status: 'Active',
          last_active: 'May 29, 2017',
          role: 'Admin',
          e_mail: '0.19 GB',
          email: 'arlenemccoy@gmail.com'
        },
        {
          avatar: '/images/Ellipse_4.png',
          member: 'Brooklyn Simon',
          status: 'Active',
          last_active: 'December 29, 2012',
          role: 'Admin',
          e_mail: '0.19 GB',
          email: 'brooklynsimon@gmail.com'
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
    openModal2 () {
      (this.$refs.modal2 as Vue & { showModal: () => Element }).showModal()
    },
    modalHide (): void {
      this.firstBody = true;
      (this.$refs.modal as Vue & { hideModal: () => Function }).hideModal()
    },
    modalHide2 (): void {
      this.firstBody = true;
      (this.$refs.modal2 as Vue & { hideModal: () => Function }).hideModal()
    }
  }
})
</script>
