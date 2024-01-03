<template>
  <div class="h-full">
    <div class="pl-24 pr-28">
      <div class="flex-col justify-center items-start my-8 flex" style="flex: 0.5">
        <h3 class="font-semibold mb-1 mt-4 text-center">
          Edit (trailer second step)
        </h3>
      </div>
      <Form fclass="row my-2" @send="handleSubmit">
        <div class="col-6 mb-6">
          <Input
            v-model="request.category"
            name="category"
            type="text"
            label="Category"
            rules="required"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            name="description"
            type="text"
            label="Description"
            rules="required"
          />
        </div>
        <div class="col-6 mb-6">
          <m-select
            v-model="request.status"
            :addable="true"
            :multiple="false"
            :searchable="true"
            :options="testOptions"
            name="state"
            label="Status"
          />
        </div>

        <div class="col-6 mb-6">
          <Input
            name="date"
            type="date"
            label="Date"
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
            <Button :type="ButtonTypeEnum.PRIMARY" :size="SizeTypeEnum.LG" :action="ActionTypeEnum.SUBMIT">
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
import {
  SizeTypeEnum,
  ActionTypeEnum,
  ButtonTypeEnum
} from '~/components/ts/enums'
import { SelectOption } from '~/components/ts/interfaces'
import { Trailer } from '~/models/trailer/trailer'
export default Vue.extend({
  data () {
    return {
      SizeTypeEnum,
      ActionTypeEnum,
      ButtonTypeEnum,
      request: {} as Trailer,
      testOptions: [
        { id: 1, text: 'Done', selected: true },
        { id: 2, text: 'Not Done', selected: false }
      ] as SelectOption[]
    }
  },
  methods: {
    handleSubmit () {

    }
  }
})
</script>
