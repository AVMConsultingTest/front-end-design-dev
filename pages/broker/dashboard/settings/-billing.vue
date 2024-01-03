<template>
  <div class="w-full">
    <div class="flex flew-row my-8">
      <div>
        <h5 class="font-semibold">
          Billing
        </h5>
      </div>
      <div class="col-4 ml-auto flex justify-end">
        <Button
          class="flex relative p-4 max-w-max"
          :type="ButtonTypeEnum.PRIMARY"
          :size="SizeTypeEnum.MD"
        >
          Download All
          <Icon
            icon="arrow-down"
            color="white"
            :disable-fill="false"
            class="w-6 h-6 p-0 absolute right-11 hidden"
          />
        </Button>
        <Modal ref="modal" content-class="w-6/12">
          <div slot="body" class="row flex items-center justify-center pt-7 px-2">
            <div class="col-12 items-center justify-center my-0">
              <h4 class="font-semibold text-start mb-2">
                Team
              </h4>
              <Form fclass="row my-2">
                <div class="col-6 mb-6">
                  <Input
                    name="teamName"
                    type="text"
                    label="Team Name"
                    rules="required"
                  />
                </div>
                <div class="col-6 mb-6">
                  <m-select
                    v-model="multiSelectedState"
                    :multiple="false"
                    :searchable="true"
                    :options="testOptions"
                    :addable="true"
                    name="type"
                    label="Type"
                  />
                </div>
                <div class="col-12 mb-6">
                  <m-select
                    v-model="multiSelectedState"
                    :multiple="false"
                    :searchable="true"
                    :addable="true"
                    :options="testOptions"
                    name="authorization"
                    label="Authorization"
                  />
                </div>
                <div class="col-12 mb-6">
                  <Input
                    name="description"
                    type="text"
                    label="Description"
                    rules="required"
                  />
                </div>
                <div class="row mt-3 ml-1 mb-20 items-center">
                  <div class="col-1 w-14 h-12rounded-lg flex items-center justify-center cursor-pointer">
                    <Icon icon="add" color="black" class="w-6 h-6" />
                  </div>
                  <span class="col text-b-4 font-medium">
                    Add Member
                  </span>
                </div>
              </Form>
            </div>
            <div class="col-8 mb-14">
              <Button
                class="flex"
                :type="ButtonTypeEnum.PRIMARY"
                :size="SizeTypeEnum.LG"
                :action="ActionTypeEnum.BUTTON"
              >
                Create Team
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
    <div class="flex">
      <div class="flex col-6 my-8 mr-8">
        <div class="bill-card w-full bg-white rounded-xl px-6 py-7 border border-grey-blue-100 dark:border-b-gray-60">
          <div class="bill-card-header flex items-center justify-between">
            <div class="col-auto">
              <h5 class="font-semibold">
                Basic plan
              </h5>
              <span class="text-b-4 text-grey-dark-300">Our most popular plan for small teams.</span>
            </div>
            <div class="col-auto flex items-end gap-1">
              <h1 class="font-bold text-5xl">
                $10
              </h1>
              <span>per month</span>
            </div>
          </div>
          <div class="rounded">
            <div class="mb-1 text-base font-medium mt-4">
              14 of 20 users
            </div>
            <div class="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
              <div class="bg-purple-600 h-2.5 rounded-full dark:bg-purple-500" style="width: 70%" />
            </div>
          </div>
          <div class="mt-20 border-t border-grey-blue-100 flex justify-end">
            <div class="mb-1 text-base font-medium text-purple-700 dark:text-purple-500">
              Upgrade plan
            </div>
          </div>
        </div>
      </div>
      <div class="flex col-6 my-8">
        <div class="bill-card w-full bg-white rounded-xl px-6 py-7 border border-grey-blue-100 dark:border-b-gray-60">
          <div class="bill-card-header flex items-center justify-between">
            <div class="col-auto">
              <h5 class="font-semibold">
                Payment method
              </h5>
              <span class="text-b-4 text-grey-dark-300">Change how you pay for your plan.</span>
            </div>
          </div>
          <div class="flex mt-6 rounded-xl px-6 py-7 border border-grey-blue-100 dark:border-b-gray-60">
            <div clsss="img-visa">
              <img class="inline-block h-10 w-14" src="/images/payment.png" alt="driver">
            </div>
            <div class="flex flex-col ml-3">
              <span class="text-b-4 font-medium">Visa ending in 1234</span>
              <span class="font-normal text-b-4">Expiry 06/2024</span>
              <div class="message flex mt-2">
                <Icon icon="sms" :disable-fill="false" class="w-5 h-5 " />
                <span class="font-normal text-b-4 pl-2">billing@untitledui.com</span>
              </div>
            </div>
            <div class="ml-auto rounded-xl  border border-black dark:border-b-gray-60 h-12 w-20 text-center flex items-center justify-center">
              <button>Edit</button>
            </div>
          </div>
        </div>
      </div>
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
            {'bg-green-100 text-green-800' : item.status === 'Paid'},
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
        <div class="rounded-lg flex items-center justify-center">
          <Icon icon="document-download" color="grey-dark" :alpha="100" :disable-fill="false" class="w-5 h-5 cursor-pointer" />
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
                :addable="true"
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
                :addable="true"
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
                :addable="true"
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
        date: {
          label: 'Date',
          sortable: true
        },
        amount: {
          label: 'Amount',
          sortable: true
        },
        payment_method: {
          label: 'Payment Method',
          sortable: true
        },
        status: {
          label: 'Status',
          sortable: true
        },
        actions: {
          label: 'Invoice',
          sortable: false
        }
      },
      testData: [
        {
          date: '20/05/2022',
          status: 'Paid',
          amount: '$17.84',
          payment_method: 'VISA ****  ****  ****  512'
        },
        {
          date: '20/05/2022',
          status: 'Not Started',
          amount: '$11.70',
          payment_method: 'VISA ****  ****  ****  512'
        },
        {
          date: '20/05/2022',
          status: 'Selected',
          amount: '$14.81',
          payment_method: 'VISA ****  ****  ****  512'
        },
        {
          date: '20/05/2022',
          status: 'Failed',
          amount: '$8.99',
          payment_method: 'VISA ****  ****  ****  512'
        },
        {
          date: '20/05/2022',
          status: 'Pending',
          amount: '$11.70',
          payment_method: 'VISA ****  ****  ****  512'
        }
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

    <style>
    .settings-background-form {
      /* Auto layout */
      padding: 24px;
      gap: 24px;

      /* Base/White */
      background: #ffffff;
      border: 1px solid #E0E1E5;
      border-radius: 12px;
      /* Inside auto layout */

      flex: none;
      order: 0;
      align-self: stretch;
      flex-grow: 0;
    }
    .desc-font{
      font-size: 12px;
      line-height: 16px;
      font-weight: 400;
    }
    .desc-list{
      list-style-type: square;
      padding-left: 12px;
    }
    .desc-title{
      font-size: 14px;
      line-height: 24px;
      font-weight: 600;
    }
    .divider{
      background: #EAECF0;
      flex: none;
      order: 0;
      align-self: stretch;
      flex-grow: 0;
      height: 1px;
    }
    .logged-in-title{
      font-size: 18px;
      font-weight: 600;
      line-height: 28px;
    }
    .logged-in-desc{
      font-weight: 500;
      font-size: 14px;
      line-height: 20px;
    }
    .logged-in-desc-light{
      font-weight: 400;
      font-size: 14px;
      line-height: 20px;
    }
    .dots-icon{
      width: 20px;
      height: 20px;
      margin-right: 2rem;
    }
    .space-between-devices{
      display: flex;
      justify-content: space-between;
    }
    .logged-device{
      padding-left: 4rem;
    }
    </style>
