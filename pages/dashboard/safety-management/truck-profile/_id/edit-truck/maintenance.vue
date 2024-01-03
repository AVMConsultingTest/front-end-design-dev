<template>
  <div class="h-full">
    <div class="pl-24 pr-28">
      <div class="flex-col justify-center items-start my-8 flex" style="flex: 0.5">
        <h3 class="font-semibold mb-1 mt-4 text-center">
          Edit
        </h3>
      </div>
      <Form fclass="row my-2" @send="handleSubmit">
        <div class="col-6 mb-6">
          <Input
            name="category"
            type="text"
            label="Category"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            name="description"
            type="text"
            label="Description"
          />
        </div>
        <div class="col-6 mb-6">
          <m-select
            v-model="multiSelectedState"
            :addable="true"
            :multiple="false"
            :searchable="true"
            :options="testOptions"
            name="status"
            type="text"
            label="Status"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            name="date"
            type="date"
            label="Date"
          />
        </div>
      </Form>
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
import { Truck } from '~/models/truck/truck'
export default Vue.extend({
  name: 'EditTruck',
  data () {
    return {
      ButtonTypeEnum,
      ActionTypeEnum,
      SizeTypeEnum,
      showDrawer: false,
      request: {} as Truck,
      selectedState: 0,
      multiSelectedState: [],
      checkBoxTest: false,
      testOptions: [
        { id: 1, text: 'Done', selected: true },
        { id: 2, text: 'None', selected: false }
      ] as SelectOption[]
    }
  },
  computed: {
    updateTruck ():Truck {
      return (this.$store.getters['truck/truck']) as Truck
    }
  },
  methods: {
    ...mapActions({
      setTruck: (action, param) => action('truck/updateTruck', param)
    }),
    handleSubmit () {
      this.setTruck({ truck: this.request })
      console.log(this.updateTruck)
      this.$router.push('/carrier/dashboard/safety-management/fleet-management/edit-truck/truck-complete')
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
