<template>
  <div class="w-full">
    <div class="border border-gray-300/50 bg-gray-300/20 w-full rounded-lg flex flex-row p-3 mb-8 mt-9 filter-drops">
      <div class="row items-center justify-between w-full">
        <div class="col-12">
          <p class="text-c-1 text-grey-dark-200 mb-2">
            Filter by
          </p>
        </div>
        <div class="col-5 flex">
          <div class="col-5 pr-2">
            <m-select
              v-model="selectedFilter"
              wrapper-class="bg-white"
              drop-icon="sort"
              name="Filter"
              placeholder="Filters"
              :options="filters"
              :addable="true"
            />
          </div>
          <div class="col-7 pr-2">
            <m-select
              v-model="selectedFilter"
              wrapper-class="bg-white"
              name="Filter"
              placeholder="Filters"
              :options="filters"
              :addable="true"
            />
          </div>
        </div>
        <div class="w-40">
          <Button
            class="flex h-10"
            :type="ButtonTypeEnum.PRIMARY"
            :size="SizeTypeEnum.MD"
            :action="ActionTypeEnum.BUTTON"
            @click="openModal"
          >
            Add User +
          </Button>
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
    <Table :multiple-enabled="true" />

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
    <div class="row mb-4 col-12 tester mt-5">
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
      mode: 'grid'
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
