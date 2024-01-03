<template>
  <div class="h-full">
    <div class="pl-24 pr-28">
      <div class="flex-col justify-center items-start my-8 flex" style="flex: 0.5">
        <Badge title="Step: 1/2" class="bg-purple-100 text-crocus-purple mb-2" :size="SizeTypeEnum.LG" />
        <h3 class="font-semibold mb-1 mt-4 text-center">
          Add Trailer
        </h3>
      </div>
      <Form fclass="row my-2" @send="handleSubmit">
        <div class="col-6 mb-6">
          <m-select
            v-model="request.truck_id"
            :multiple="false"
            :searchable="true"
            name="Truck"
            type="text"
            label="Truck"
            rules="required"
            :options="truckOptions"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model="request.status"
            name="status"
            type="text"
            label="Status"
            rules="required"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model="request.brand"
            name="trailerBrand"
            type="text"
            label="Trailer Brand"
            rules="required"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model="request.model"
            name="trailerModel"
            type="text"
            label="Trailer Model"
            rules="required"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model="request.color"
            name="trailerColor"
            type="text"
            label="Trailer Color"
            rules="required"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model="request.model_year"
            name="trailerModelYear"
            type="text"
            label="Trailer Model Year"
            rules="required"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model="request.plate"
            name="trailerPlate"
            type="text"
            label="Trailer Plate"
            rules="required"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model="request.unit_number"
            name="trailerUnitNumber"
            type="text"
            label="Trailer Unit Number"
            rules="required"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model="request.asset_owner"
            name="assetOwner"
            type="text"
            label="Asset Owner"
            rules="required"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model="request.ownership_type"
            name="ownershipType"
            type="text"
            label="Ownership Type"
            rules="required"
          />
        </div>
        <div class="col-12 mb-6">
          <Input
            v-model="request.notes"
            name="notes"
            type="text"
            label="Notes"
            rules="required"
          />
        </div>
        <h5 class="font-semibold dark:text-white">
          Trailer Size
        </h5>
        <div class="col-6 mb-6">
          <Input
            v-model="request.length"
            name="trailerLength"
            type="text"
            label="Trailer Length"
            rules="required"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model="request.width"
            name="trailerWidth"
            type="text"
            label="Trailer Width"
            rules="required"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model="request.height"
            name="trailerHeight"
            type="text"
            label="Trailer Height"
            rules="required"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model="request.capacity"
            name="trailerCapacity"
            type="text"
            label="Trailer Capacity"
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
import {
  SizeTypeEnum,
  ActionTypeEnum,
  ButtonTypeEnum
} from '@/components/ts/enums'
import { Trailer } from '@/models/trailer/trailer'
export default Vue.extend({
  transition: 'page-left',
  data () {
    return {
      SizeTypeEnum,
      ActionTypeEnum,
      ButtonTypeEnum,
      request: {} as Trailer,
      assetOwner: '',
      trailerLength: '',
      trailerWidth: '',
      trailerHeight: ''
    }
  },
  computed: {
    truckOptions () {
      const list = this.$store.getters['truck/allTrucks']
      if (list && list.length > 0) {
        return list.map((truck: { id: number, unit_number: string }) => {
          return {
            id: truck.id,
            text: truck.unit_number
          }
        })
      } else {
        return []
      }
    }
  },
  created () {
    this.getAllTrucks()
  },
  methods: {
    ...mapActions({
      fillRequest: (action, params) => action('trailer/fillRequest', params),
      getAllTrucks: action => action('truck/getAllTrucks')
    }),
    handleSubmit (): void {
      this.fillRequest(this.request)
      this.$router.push('/carrier/dashboard/safety-management/fleet-management/add-trailer/add-trailer-second-step')
    }
  }
})
</script>
