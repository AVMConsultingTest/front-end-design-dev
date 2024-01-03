<template>
  <div>
    <hr class="mb-6">
    <div class="row mb-2">
      <div class="col-auto">
        <div class=" bg-blue-100 w-7 h-7 rounded-full flex items-center justify-center">
          <Icon
            icon="truck"
            variant="bulk"
            color="dark-blue"
            :alpha="0"
            class="w-4 h-4"
          />
        </div>
      </div>
      <div class="col-auto font-bold">
        <h6>{{ data.vehicle_id }}</h6>
      </div>
      <div class="col-auto ml-auto">
        <Badge
          :title="data.current_speed + ' MPH'"
          icon-color="green"
          :icon-alpha="800"
          :size="SizeTypeEnum.SM"
          :class="[{'bg-green-100 text-green-800' : true},{'ml-0': true}]"
        />
      </div>
    </div>
    <div class="row">
      <div class="col-auto">
        <Icon
          icon="location"
          variant="bulk"
          color="gray"
          :alpha="800"
          class="w-4 h-4"
        />
      </div>
      <div class="col-auto text-c-1">
        {{ data.vehicle_location }}
      </div>
    </div>
    <div class="row">
      <div class="col-auto">
        <Icon
          icon="user"
          variant="bulk"
          color="gray"
          :alpha="800"
          class="w-4 h-4"
        />
      </div>
      <div class="col-auto text-c-1">
        {{ data.driver_name }}
      </div>
    </div>
    <div class="row">
      <div class="col-auto">
        <Icon
          variant="bulk"
          icon="gas-station"
          color="gray"
          :alpha="800"
          class="w-4 h-4"
        />
      </div>
      <div class="flex items-center col-auto">
        <div class="w-7 rounded-lg h-1 bg-orange-200">
          <div class="h-1 rounded-lg bg-orange-900" :style="{'width':data.current_fuel + '%'}" />
        </div>
        <div class="ml-1 font-bold text-c-1">
          {{ data.current_fuel + '%' }}
        </div>
      </div>
    </div>
    <hr class="mt-6">
  </div>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue'
import { VehiclesStatusDetails } from '~/models/eld/vehiclesStatus/vehiclesStatusDetails'
import {
  SizeTypeEnum,
  ActionTypeEnum,
  ButtonTypeEnum
} from '@/components/ts/enums'

export default Vue.extend({
  name: 'EldOperationalMapCard',
  props: {
    data: {
      type: Object,
      required: true,
      default: null
    } as PropOptions<VehiclesStatusDetails>
  },
  data () {
    return {
      SizeTypeEnum,
      ActionTypeEnum,
      ButtonTypeEnum,
      barPercentage: 40
    }
  }
})
</script>
