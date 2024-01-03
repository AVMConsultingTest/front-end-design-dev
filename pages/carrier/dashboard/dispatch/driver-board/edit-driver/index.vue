<template>
  <div class="h-full">
    <div class="pl-24 pr-28">
      <div class="flex-col justify-center items-start my-8 flex" style="flex: 0.5">
        <h3 class="font-semibold mb-1 mt-4 text-center">
          Edit Driver Board
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
        <div class="col-6 mb-6">
          <Input
            v-model="request.notes"
            name="notes"
            type="text"
            label="Notes"
            rules="required"
          />
        </div>
        <!-- <div class="col-6 mb-6">
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
        </div> -->
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
import { DriversDetails } from '~/models/DISPATCH/drivers/driversDetails'
export default Vue.extend({
  name: 'EditDriverBoard',
  props: {
    editId: {
      type: [String, Number],
      default: null
    }
  },
  data () {
    return {
      ButtonTypeEnum,
      ActionTypeEnum,
      SizeTypeEnum,
      showDrawer: false,
      request: {} as DriversDetails,
      selectedState: 0,
      multiSelectedState: [],
      checkBoxTest: false,
      testOptions: [
        { id: 1, text: 'Active', selected: true },
        { id: 2, text: 'Terminated', selected: false },
        { id: 3, text: 'Vacation', selected: false }
      ] as SelectOption[]
    }
  },
  computed: {
    driver (): DriversDetails {
      return (this.$store.getters['driverBoard/driver'])
    }
  },
  mounted () {
    this.getDriver(this.editId).then(() => {
      setTimeout(() => {
        console.log(this.driver)
        this.request = { ...this.driver }
      }, 1000)
    })
  },
  methods: {
    ...mapActions({
      getDriver: (action, id) => action('driverBoard/getDriver', id),
      editDriver: (action, param) => action('driverBoard/updateDriver', param)
    }),
    handleSubmit () {
      this.editDriver({ ...this.request } as DriversDetails)

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
