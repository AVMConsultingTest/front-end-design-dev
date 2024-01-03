<template>
  <div class="h-full">
    <div class="pl-24 pr-28">
      <div class="flex-col justify-center items-start my-8 flex" style="flex: 0.5">
        <h3 class="font-semibold mb-1 mt-4 text-center">
          Add Permit
        </h3>
      </div>
      <Form fclass="row my-2" @send="handleSubmit">
        <div class="col-6 mb-6">
          <Input
            v-model.number="request.truck_id"
            name="truckId"
            label="Truck ID"
            type="number"
            rules="required"
          />
        </div>
        <div class="col-6 mb-6">
          <m-select
            v-model="request.type"
            :addable="true"
            :bind-text="true"
            :multiple="false"
            :searchable="true"
            :options="permitOptions"
            name="permitType"
            label="Permit Type"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model="request.number"
            name="permitNumber"
            type="text"
            label="Permit Number"
            rules="required"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model="request.number"
            name="startDate"
            type="datetime-local"
            label="Start Date"
            rules="required"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model="request.duration"
            name="startDate"
            type="datetime-local"
            label="Start Date"
            rules="required"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model="request.start_date"
            name="startDate"
            type="datetime-local"
            label="Start Date"
            rules="required"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model="request.end_date"
            name="endDate"
            type="datetime-local"
            label="End Date"
            rules="required"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model="request.purchased_date"
            name="purchaseDate"
            type="datetime-local"
            label="Purchase Date"
            rules="required"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model.number="request.cost"
            name="cost"
            type="number"
            label="Cost"
            rules="required"
          />
        </div>
        <div class="col-6 mb-6">
          <m-select
            v-model="request.delivery_status"
            :addable="true"
            :bind-text="true"
            :multiple="false"
            :searchable="true"
            :options="deliveryOptions"
            name="deliveryStatus"
            label="Delivery Status"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model="request.vendor_url"
            name="vendorUrl"
            type="text"
            label="Vendor URL"
            rules="required"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model="request.installed"
            name="installed"
            type="text"
            label="Installed"
            rules="required"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model="request.notes"
            name="notes"
            type="text"
            label="Notes"
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
              Go Back
            </Button>
          </div>
          <div class="col-3 ml-auto">
            <Button
              :type="ButtonTypeEnum.PRIMARY"
              :size="SizeTypeEnum.LG"
              :action="ActionTypeEnum.SUBMIT"
            >
              Save
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
import moment from 'moment'
import {
  SizeTypeEnum,
  ActionTypeEnum,
  ButtonTypeEnum
} from '@/components/ts/enums'
import { SelectOption } from '@/components/ts/interfaces'
import { PermitsDetails } from '@/models/permits/permitsDetails'
export default Vue.extend({
  data () {
    return {
      SizeTypeEnum,
      ActionTypeEnum,
      ButtonTypeEnum,
      request: {} as PermitsDetails,
      testOptions: [
        { id: 1, text: 'Cameron Williamson', selected: false },
        { id: 2, text: 'Other Option', selected: false }
      ] as SelectOption[],
      permitOptions: [
        { id: 1, text: 'IFTA', selected: false },
        { id: 2, text: 'Permit - Oregon', selected: false }
      ] as SelectOption[],
      deliveryOptions: [
        { id: 1, text: 'Mailed', selected: false },
        { id: 2, text: 'Enrolled', selected: false }
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
      addPermit: (action, params: PermitsDetails) => action('permits/addPermit', params)
    }),
    logRequest () {
      console.log(moment('2023-01-12').toISOString())
      console.log(moment().toISOString())

      console.log(this.request)
    },
    handleSubmit (): void {
      this.addPermit({ ...this.request }).then(() => {
        this.$emit('close-drawer')
      })
    }
  }
})
</script>
