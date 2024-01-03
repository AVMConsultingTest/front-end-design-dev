<template>
  <div class="h-full">
    <div class="pl-24 pr-28">
      <div class="flex-col justify-center items-start my-8 flex" style="flex: 0.5">
        <h3 class="font-semibold mb-1 mt-4 text-center">
          Edit Permit
        </h3>
      </div>
      <Form fclass="row my-2" @send="handleSumbit">
        <div class="col-6 mb-6">
          <m-select
            v-model="request.type"
            :addable="true"
            :bind-text="true"
            :multiple="false"
            :searchable="true"
            :options="testOptions"
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
        <!-- <div class="col-6 mb-6">
          <Input
            v-model="request.duration"
            name="duration"
            type="text"
            label="Duration"
            rules="required"
          />
        </div> -->
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
            v-model="request.cost"
            name="cost"
            type="text"
            label="Cost"
            rules="required"
          />
        </div>
        <div class="col-6 mb-6">
          <m-select
            v-model="request.delivery_status"
            :addable="true"
            :multiple="false"
            :bind-text="true"
            :searchable="true"
            :options="testOptions"
            name="deliveryStatus"
            label="Delivery Status"
            type="text"
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
              @click="$router.back()"
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
import {
  SizeTypeEnum,
  ActionTypeEnum,
  ButtonTypeEnum
} from '@/components/ts/enums'
import { SelectOption } from '@/components/ts/interfaces'
import { PermitsDetails } from '@/models/permits/permitsDetails'
export default Vue.extend({
  props: {
    editId: {
      type: [String, Number],
      default: null
    }
  },
  data () {
    return {
      SizeTypeEnum,
      ActionTypeEnum,
      ButtonTypeEnum,
      request: {} as PermitsDetails,
      testOptions: [
        { id: 1, text: 'Completed', selected: false },
        { id: 2, text: 'In-Transit', selected: false }
      ] as SelectOption[]
    }
  },
  computed: {
    permit (): PermitsDetails {
      return this.$store.getters['permits/permit']
    }
  },
  mounted () {
    this.getPermit(this.editId).then(() => {
      setTimeout(() => {
        console.log(this.permit)
        this.request = { ...this.permit }
      }, 1000)
    })
  },
  methods: {
    ...mapActions({
      getPermit: (action, id) => action('permits/getPermit', id),
      updatePermit: (action, params) => action('permits/updatePermit', params)
    }),
    handleSumbit (): void {
      if (this.request.duration || this.request.truck_id) {
        delete this.request.duration
        delete this.request.truck_id
      }
      this.updatePermit(this.request).then(() => {
        this.$emit('close-drawer')
      })
    }
  }
})
</script>
