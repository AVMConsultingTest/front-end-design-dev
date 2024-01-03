<template>
  <div class="h-full">
    <div class="pl-24 pr-28">
      <div class="flex-col justify-center items-start my-8 flex" style="flex: 0.5">
        <h3 class="font-semibold mb-1 mt-4 text-center">
          Add Alert
        </h3>
      </div>
      <Form fclass="row my-2" @send="handleSubmit">
        <div class="col-6 mb-6">
          <Input
            v-model="request.driver_id"
            type="text"
            name="driverId"
            label="Driver Id"
            rules="required"
          />
        </div>
        <!-- <div class="col-6 mb-6">
          <m-select
            v-model="request.driver_name"
            :searchable="true"
            :options="carrierDrivers"
            :addable="true"
            :bind-text="true"
            name="driverName"
            type="text"
            label="Driver Name"
          />
        </div> -->
        <div class="col-6 mb-6">
          <m-select
            v-model="request.status"
            :options="status"
            :addable="true"
            name="alertStatus"
            :bind-text="true"
            type="text"
            label="Alert Status"
            rules="required"
          />
        </div>
        <div class="col-6 mb-6">
          <m-select
            v-model="request.licence_status"
            :options="licenceStatus"
            :addable="true"
            name="licenceStatus"
            :bind-text="true"
            type="text"
            label="Licence Status"
            rules="required"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model="request.description"
            type="text"
            name="alertDescription"
            label="Alert Description"
            rules="required"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model="request.date"
            type="datetime-local"
            name="dateOfAlert"
            label="Date of Alert"
            rules="required"
          />
        </div>
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
          <div class="col-3 ml-auto">
            <Button :type="ButtonTypeEnum.PRIMARY" :size="SizeTypeEnum.LG" :action="ActionTypeEnum.SUBMIT">
              Continue
            </Button>
          </div>
        </div>
      </Form>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapActions } from 'vuex'
import { SelectOption } from '~/components/ts/interfaces'
import {
  SizeTypeEnum,
  ActionTypeEnum,
  ButtonTypeEnum
} from '~/components/ts/enums'
import { AlertsDetails } from '~/models/alerts'
import { Driver } from '~/models/driver'

export default Vue.extend({
  name: 'AddAlertPage',
  data () {
    return {
      ButtonTypeEnum,
      ActionTypeEnum,
      SizeTypeEnum,
      request: {} as AlertsDetails,
      status: [
        { id: 1, text: 'New', selected: false },
        { id: 2, text: 'Viewed', selected: false }
      ] as SelectOption[],
      licenceStatus: [
        { id: 1, text: 'Suspended', selected: false }
      ] as SelectOption[]
    }
  },
  computed: {
    carrierDrivers (): SelectOption[] {
      const driverOptions: SelectOption[] = []
      this.$store.getters['driver/carrierDrivers'].forEach((driver: Driver) => {
        driverOptions.push({ id: driver.id, text: `${driver.first_name} ${driver.last_name}`, selected: false })
      })
      return driverOptions
    }
    // carrierId (): number {
    //   return this.$store.state.carrierId
    // }
  },
  // created () {
  //   this.getDriversByCarrierId({ page_number: 1 })
  // },
  methods: {
    ...mapActions({
      addAlert: (action, param) => action('alerts/addAlert', param),
      getDriversByCarrierId: (action, param) => action('driver/getDriversByCarrierId', param)
    }),
    handleSubmit () {
      this.addAlert({
        ...this.request
      } as AlertsDetails)
      this.$emit('close-drawer')
    }
  }
})
</script>

<style>
.m-modal-overlay {
    @apply bg-dark/80 fixed bottom-0 left-0 right-0 top-0 flex justify-center;
}
.m-modal-content {
    @apply bg-white rounded-3xl shadow-2xl relative overflow-hidden;
}
</style>
