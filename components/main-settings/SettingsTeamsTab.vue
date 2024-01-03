<template>
  <div class="w-full mt-9">
    <div class="flex flew-row">
      <div>
        <h5 class="font-semibold">
          Teams (8)
        </h5>
      </div>
      <div class="col-4 ml-auto flex justify-end mt-[-6rem]">
        <Button
          class="flex max-w-max p-4"
          :type="ButtonTypeEnum.PRIMARY"
          :size="SizeTypeEnum.MD"
          :action="ActionTypeEnum.BUTTON"
          @click="openModal"
        >
          Create Teams  +
        </Button>
        <Modal ref="modal" content-class="w-6/12">
          <div slot="body" class="row flex items-center justify-center pt-7 px-2">
            <div class="col-12 items-center justify-center my-0">
              <div
                class="flex justify-end"
                @click="hideModal()"
              >
                <Icon
                  icon="close-circle"
                  color="gray"
                  variant="bulk"
                  :alpha="400"
                  class="w-12 h-12 cursor-pointer"
                />
              </div>
              <h4 class="font-semibold text-start mb-2">
                Team
              </h4>
              <Form fclass="row my-2">
                <div class="col-6 mb-6">
                  <Input
                    v-model="teamName"
                    name="teamName"
                    type="text"
                    label="Team Name"
                    rules="required"
                  />
                </div>
                <div class="col-6 mb-6">
                  <m-select
                    :multiple="false"
                    :searchable="true"
                    :options="testOptions"
                    name="type"
                    label="Type"
                  />
                </div>
                <div class="col-12 mb-6">
                  <m-select
                    :multiple="false"
                    :searchable="true"
                    :options="testOptions"
                    name="authorization"
                    label="Authorization"
                  />
                </div>
                <div class="col-12 mb-6">
                  <Input
                    v-model="description"
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
                  <span class="col-auto text-b-4 font-medium">
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
                @click="hideModal()"
              >
                Create Team
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
    <div class="mt-7 row mb-8">
      <div class="col-4">
        <BrokerSettingsCard
          icon-container-class="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mr-2"
          title="Design Team"
          body="Streamline software projects, sprints, and bug tracking."
          icon="designtools"
          :icon-alpha="500"
          icon-color="purple"
          icon-variant="bulk"
        />
      </div>
      <div class="col-4">
        <BrokerSettingsCard
          icon-container-class="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center mr-2"
          title="Development Team"
          body="Link pull requests and automate workflows."
          icon="devices"
          :icon-alpha="800"
          icon-color="orange"
          icon-variant="bulk"
        />
      </div>
      <div class="col-4">
        <BrokerSettingsCard
          icon-container-class="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-2"
          title="Research Team"
          body="Embed file previews in projects."
          icon="global-search"
          :icon-alpha="700"
          icon-color="green"
          icon-variant="bulk"
        />
      </div>
    </div>
    <div class="mt-7 row mb-8">
      <div class="col-4">
        <BrokerSettingsCard
          icon-container-class="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-2"
          title="Analaysis Team"
          body="Streamline software projects, sprints, and bug tracking."
          icon="trade"
          :icon-alpha="800"
          icon-color="blue"
          icon-variant="bulk"
        />
      </div>
      <div class="col-4">
        <BrokerSettingsCard
          icon-container-class="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center mr-2"
          title="Marketing Team"
          body="Link pull requests and automate workflows."
          icon="clipboard"
          :icon-alpha="700"
          icon-color="red"
          icon-variant="bulk"
        />
      </div>
      <div class="col-4">
        <BrokerSettingsCard
          icon-container-class="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center mr-2"
          title="Product Team"
          body="Embed file previews in projects."
          icon="share"
          :icon-alpha="700"
          icon-color="yellow"
          icon-variant="bulk"
        />
      </div>
    </div>
    <div class="mt-7 row mb-8">
      <div class="col-4">
        <BrokerSettingsCard
          icon-container-class="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center mr-2"
          title="Technical Crew"
          body="Link pull requests and automate workflows."
          icon="cpu-setting"
          :icon-alpha="700"
          icon-color="pink"
          icon-variant="bulk"
        />
      </div>
      <div class="col-4">
        <BrokerSettingsCard
          icon-container-class="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-2"
          title="Logistic Team"
          body="Streamline software projects, sprints, and bug tracking."
          icon="routing"
          :icon-alpha="600"
          icon-color="blue"
          icon-variant="bulk"
        />
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
import { SelectOption } from '~/components/ts/interfaces'
export default Vue.extend({
  data () {
    return {
      ButtonTypeEnum,
      ActionTypeEnum,
      SizeTypeEnum,
      teamName: '',
      description: '',
      testOptions: [
       { id: 1, text: 'System Role', selected: false }
      ] as SelectOption[]
    }
  },
  methods: {
    openModal () {
      // (this.$refs.modal as Vue & { showModal: () => Element }).showModal()
      (this.$refs.modal as Vue & { showModal: () => Element }).showModal()
    },
    hideModal (): void {
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
