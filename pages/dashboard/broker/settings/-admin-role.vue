<template>
  <div class="w-full">
    <div class="flex flex-row my-8">
      <div>
        <h5 class="font-semibold">
          Admin Role
        </h5>
      </div>
      <div class="col-2 ml-auto flex justify-end mt-[-6rem]">
        <Button
          class="flex h-10 max-w-max p-4 !text-b-3"
          :type="ButtonTypeEnum.PRIMARY"
          :size="SizeTypeEnum.MD"
          :action="ActionTypeEnum.BUTTON"
          @click="openModal"
        >
          Create Role +
        </Button>
      </div>
    </div>
    <Table
      :multiple-enabled="true"
      :headers="headers"
      :data="testData"
      :left-header:="true"
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
      <template #item-actions>
        <div class="w-8 h-8 border border-gray-300 rounded-lg flex items-center justify-center">
          <Icon icon="more-2" color="grey-dark" :alpha="100" :disable-fill="false" class="w-4 h-4 cursor-pointer" />
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
            Role
          </h4>
          <Form fclass="row my-2">
            <div class="col-6 mb-6">
              <Input
                :multiple="false"
                :searchable="true"
                name="roleName"
                label="Role Name"
              />
            </div>
            <div class="col-6 mb-6">
              <m-select
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
                :multiple="false"
                :searchable="true"
                :options="testAuthorization"
                :addable="true"
                name="authorization"
                label="Authorization"
              />
            </div>
            <div class="col-12 mb-6">
              <Input
                :multiple="false"
                :searchable="true"
                name="desc"
                label="Description"
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
            Add another role
          </span>
        </div>
        <div class="col-8">
          <Button :type="ButtonTypeEnum.PRIMARY" :size="SizeTypeEnum.LG" @click="(firstBody = false)">
            Create Role
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
            New role successfully defined!
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
        { id: 1, text: 'System Role', selected: true },
        { id: 2, text: 'Admin', selected: false },
        { id: 3, text: 'Personal', selected: false }
      ] as SelectOption[],
      testAuthorization: [
        { id: 1, text: 'Define authorization', selected: true },
        { id: 2, text: 'Admin', selected: false },
        { id: 3, text: 'Personal', selected: false }
      ] as SelectOption[],
      mode: 'grid',
      headers: {
        role: {
          label: 'Role',
          sortable: true
        },
        role_desc: {
          label: 'Role Description',
          sortable: true
        },
        role_type: {
          label: 'Role Type',
          sortable: true
        },
        actions: {
          label: 'Action',
          sortable: false
        }
      },
      testData: [
        {
          role: 'Super Admin',
          role_desc: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.',
          role_type: 'System Role'
        },
        {
          role: 'Groups Admin',
          role_desc: 'Velit officia consequat duis enim velit mollit.',
          role_type: 'System Role'
        },
        {
          role: 'Groups Reader',
          role_desc: 'Exercitation veniam consequat sunt nostrud amet.',
          role_type: 'System Role'
        },
        {
          role: 'Groups Editor',
          role_desc: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.',
          role_type: 'System Role'
        },
        {
          role: 'Use Management Admin',
          role_desc: 'Exercitation veniam consequat sunt nostrud amet.',
          role_type: 'System Role'
        },
        {
          role: 'Help Desk Admin',
          role_desc: 'Velit officia consequat duis enim velit mollit.',
          role_type: 'System Role'
        },
        {
          role: 'Service Admin',
          role_desc: 'Non deserunt ullamco est sit aliqua dolor do amet sint. ',
          role_type: 'System Role'
        },
        {
          role: 'Stroage Admin',
          role_desc: 'Elit officia consequat duis enim velit.',
          role_type: 'System Role'
        },
        {
          role: 'Admin',
          role_desc: 'Officia consequat duis enim velit nostrud amet.',
          role_type: 'System Role'
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
