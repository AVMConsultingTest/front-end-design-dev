<template>
  <div class="h-full">
    <div class="pl-24 pr-28">
      <div class="flex-col justify-center items-start my-8 flex" style="flex: 0.5">
        <h3 class="font-semibold mb-1 mt-4 text-center">
          Upload Report
        </h3>
      </div>
      <Form fclass="row my-2" @send="handleSubmit">
        <div class="col-6 mb-6">
          <m-select
            :multiple="false"
            :searchable="true"
            :options="testOptions"
            :addable="true"
            name="fileType"
            type="text"
            label="File Type"
            rules="required"
          />
        </div>
        <div class="col-6 mb-6">
          <m-select
            :multiple="false"
            :searchable="true"
            :options="testOptions2"
            :addable="true"
            name="reportType"
            label="Report Type"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            name="StartDate"
            type="date"
            label="Start Date"
            rules="required"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            name="endDate"
            type="date"
            label="End Date"
            rules="required"
          />
        </div>
        <div class="col-6 mb-6">
          <FileInput label="Document Upload" name="logo" />
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
            <Button
              :type="ButtonTypeEnum.PRIMARY"
              :size="SizeTypeEnum.LG"
              :action="ActionTypeEnum.BUTTON"
              @click="$emit('close-drawer')"
            >
              Upload
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
} from '@/components/ts/enums'
import { SelectOption } from '@/components/ts/interfaces'

export default Vue.extend({
  data () {
    return {
      SizeTypeEnum,
      ActionTypeEnum,
      ButtonTypeEnum,
      testOptions: [
        { id: 1, text: 'Aggregate', selected: true },
        { id: 2, text: 'Other Option', selected: false }
      ] as SelectOption[],
      testOptions2: [
        { id: 1, text: 'Mileage', selected: true },
        { id: 2, text: 'Other Option', selected: false }
      ] as SelectOption[]
    }
  },
  methods: {
    handleSubmit () {
      this.$router.push('')
    }
  }
})
</script>
