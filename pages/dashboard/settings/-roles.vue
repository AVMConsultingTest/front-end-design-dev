<template>
  <div class="w-full">
    <div class="flex flex-row my-8">
      <div>
        <h5 class="font-semibold">
          Roles
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
        <div class="flex items-center" @click="$router.push(`/carrier/dashboard/settings/roles-details`)">
          <div class="col-auto">
            <span class="block font-semibold">
              {{ data[index].role }}
            </span>
          </div>
        </div>
      </template>
      <template #item-members="{ item }">
        <div class="p-5">
          <div class="flex flex-row">
            <div class="avatars -space-x-6 overflow-hidden">
              <img class="inline-block h-6 w-6 rounded-full ring-2 ring-white" src="/images/Ellipse_49.png" alt="driver">
              <img class="inline-block h-6 w-6 rounded-full ring-2 ring-white" src="/images/Ellipse_49.png" alt="driver">
            </div>
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
            @click="modalHide()"
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
        role: {
          label: 'Role',
          sortable: false
        },
        role_desc: {
          label: 'Role Description',
          sortable: false
        },
        members: {
          label: 'Members',
          sortable: false
        },
        actions: {
          label: 'Action',
          sortable: false
        }
      },
      testData: [
        {
          role: 'Accounting Role',
          role_desc: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.',
          members: 'System Role'
        },
        {
          role: 'Safety Role',
          role_desc: 'Velit officia consequat duis enim velit mollit.',
          members: 'System Role'
        },
        {
          role: 'Dispatch Role',
          role_desc: 'Exercitation veniam consequat sunt nostrud amet.',
          members: 'System Role'
        },
        {
          role: 'Admin Role',
          role_desc: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.',
          members: 'System Role'
        },
        {
          role: 'Manager role',
          role_desc: 'Exercitation veniam consequat sunt nostrud amet.',
          members: 'System Role'
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
