<template>
  <div class="h-full">
    <div class="pl-24 pr-28">
      <div class="flex-col justify-center items-start mt-20 mb-12 flex" style="flex: 0.5">
        <h3 class="font-semibold text-center">
          Add Driver Board
        </h3>
      </div>
      <Form fclass="row my-2" @send="handleSubmit">
        <div class="col-6 mb-6">
          <Input
            v-model.number="request.driver_id"
            :multiple="false"
            :searchable="true"
            name="DriverId"
            type="number"
            label="Driver Id"
            rules="required"
          />
        </div>
        <!-- <div class="col-6 mb-6">
          <Input
            v-model="request.driver_first_name"
            :multiple="false"
            :searchable="true"
            name="DriverFirst"
            type="text"
            label="Driver First Name"
            rules="required"
          />
        </div> -->
        <!-- <div class="col-6 mb-6">
          <Input
            v-model="request.driver_last_name"
            :multiple="false"
            :searchable="true"
            name="DriverLast"
            type="text"
            label="Driver Last Name"
            rules="required"
          />
        </div> -->
        <!-- <div class="col-6 mb-6">
          <m-select
            v-model="request.driver_type"
            :multiple="false"
            :searchable="true"
            :options="testOptions"
            :bind-text="true"
            :addable="true"
            name="DriverType"
            type="text"
            label="Driver Type"
            rules="required"
          />
        </div> -->
        <!-- <div class="col-6 mb-6">
          <phone-input
            v-model="request.driver_phone_number"
            name="phoneNumber"
            label="Contact Phone Number"
            :thin="true"
            minlength="14"
            maxlength="14"
            rules="required|min:14|max:14"
          />
        </div> -->
        <!-- <div class="col-6 mb-6">
          <Input
            v-model="request.driver_email_address"
            name="email"
            type="text"
            label="E-mail Address"
            rules="required"
          />
        </div> -->
        <!-- <div class="col-6 mb-6">
          <m-select
            v-model="request.status"
            :multiple="false"
            :searchable="true"
            :options="status"
            :bind-text="true"
            :addable="true"
            name="status"
            type="text"
            label="Status"
            rules="required"
          />
        </div> -->
        <div class="col-6 mb-6">
          <Input
            v-model="request.notes"
            name="notes"
            type="text"
            label="Notes"
            rules="required"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model.number="request.on_time"
            name="ontime"
            type="number"
            label="On Time (%)"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model.number="request.acceptance"
            name="acceptance"
            type="number"
            label="Acceptance (%)"
          />
        </div>
        <div>
          <div class="row mt-10 justify-between mx-0">
            <div class="col-3">
              <Button
                :type="ButtonTypeEnum.LINK"
                :size="SizeTypeEnum.LG"
                :action="ActionTypeEnum.BUTTON"
                class="!justify-start"
                @click="$emit('close-drawer')"
              >
                Cancel
              </Button>
            </div>
            <div class="col-4 flex justify-end p-0 ml-auto">
              <Button class="max-w-max p-4" :type="ButtonTypeEnum.PRIMARY" :size="SizeTypeEnum.LG" :action="ActionTypeEnum.SUBMIT">
                Save
              </Button>
            </div>
          </div>
        </div>
      </Form>
    </div>
    <Modal ref="modal" size="sm" position="center">
      <div slot="body" class="row flex items-center justify-center py-16">
        <div class="col-12 flex items-center justify-center">
          <div class="bg-green-400/40 rounded-full w-40 h-40 relative">
            <svg
              width="160"
              height="160"
              viewBox="0 0 1024 1024"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path fill="rgb(41, 45, 50)" d="M451.392 664.751c-8.533 0-16.64-3.413-22.613-9.387l-120.749-120.747c-12.373-12.373-12.373-32.853 0-45.227s32.853-12.373 45.227 0l98.135 98.133 219.307-219.307c12.373-12.373 32.853-12.373 45.227 0s12.373 32.853 0 45.227l-241.92 241.92c-5.973 5.973-14.080 9.387-22.613 9.387z" stroke="#BAF1DA" />   </svg>
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
          <Button :type="ButtonTypeEnum.GREEN" :size="SizeTypeEnum.LG" @click="()=> {showModal = false; $emit('close-drawer')}">
            Let’s Get Start
          </Button>
        </div>
      </div>
    </Modal>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapActions } from 'vuex'
import {
  SizeTypeEnum,
  ActionTypeEnum,
  ButtonTypeEnum
} from '@/components/ts/enums'
import { SelectOption } from '@/components/ts/interfaces'
import { DriversDetails } from '~/models/DISPATCH/drivers/driversDetails'
export default Vue.extend({
  name: 'AddDriverBoardPage',
  layout: 'Dashboard',
  transition: 'page-left',
  data () {
    return {
      SizeTypeEnum,
      ActionTypeEnum,
      ButtonTypeEnum,
      request: {} as DriversDetails,
      selectedState: 0,
      showModal: false,
      multiSelectedState: [],
      checkBoxTest: false,
      testOptions: [
        { id: 1, text: 'Lease Driver', selected: false },
        { id: 2, text: 'Company Driver', selected: false },
        { id: 2, text: 'Owner Operator', selected: false }
      ] as SelectOption[],
      status: [
        { id: 1, text: 'Active', selected: false },
        { id: 2, text: 'Terminated', selected: false },
        { id: 3, text: 'Vacation', selected: false }
      ] as SelectOption[]
    }
  },
  computed: {
    carrierId (): number {
      return this.$store.state.carrierId
    }
  },
  methods: {
    ...mapActions({
      addDriver: (action, param) => action('driverBoard/addDriver', param)
    }),
    handleSubmit () {
      this.addDriver({
        ...this.request
      } as DriversDetails)
      this.$emit('close-drawer')
    }
  }

})
</script>
