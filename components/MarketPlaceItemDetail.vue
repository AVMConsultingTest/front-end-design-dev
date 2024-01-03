<template>
  <div v-if="data" class="w-full">
    <div
      v-for="(detailData, dataIndex) in splittedData"
      :key="dataIndex"
      class="relative"
      :class="[
        { 'hidden': splitted ? (added ? false : (dataIndex === data.stops.length - 1)) : false },
        { 'my-5': splitted }
      ]"
    >
      <div :class="[{ 'rounded-2xl overflow-hidden': splitted }]">
        <table
          class="load-item-detail table-auto bg-[#92BBFA]/5 w-full"
          :class="[
            { '!bg-white' : splitted }
          ]"
        >
          <thead
            class="h-12 text-left text-c-1 bg-gray-300/10 border-b border-b-grey-blue-100"
            :class="[
              { '!bg-white' : splitted }
            ]"
          >
            <th>Load ID</th>
            <th>Stops</th>
            <th>Total Miles</th>
            <th>Total Duration</th>
            <th>Driver</th>
            <th>Document</th>
            <th>Action</th>
          </thead>
          <tbody class="text-c-1 font-medium">
            <tr
              v-for="(col, index) in dataSplit(detailData, dataIndex)"
              :key="index"
              class="border-b border-b-grey-blue-100"
              :class="[
                {'border-b-grey-blue-100' : index !== data.stops.length-1},
                {'hidden ' : added ? false : index === data.stops.length-1},
                {'border-b-0 ' : index === data.stops.length-2},
              ]"
            >
              <td :class="`${splitted ? 'text-dark' : 'text-dark-blue'}`">
                <div class="flex items-center gap-2">
                  {{ data.broker_load_id }} <Icon
                    v-if="!splitted"
                    variant="linear"
                    color="dark-blue"
                    :alpha="0"
                    :disable-fill="true"
                    icon="arrow-right"
                    class="w-4 h-4"
                    :class="[{ 'rotate-45': extendeds.includes(detailData?.id) }]"
                  />
                </div>
              </td>
              <td>
                <div class="flex gap-2 items-center">
                  <div class="flex items-center gap-2">
                    <span
                      class="w-5 h-5 rounded-full flex items-center justify-center text-c-1"
                      :class="[
                        {'bg-green-400 text-white border border-transparent' : ((splitted ? dataIndex+1 : index+1)) <= data.currentStop && data.status !== 'Waiting'},
                        {'bg-transparent text-gray-400 border border-gray-400' : ((splitted ? dataIndex+1 : index+1)) >= data.currentStop || data.status === 'Waiting'},
                        { '!w-4 !h-4': splitted },
                        {'!bg-green-400 !text-white border !border-transparent' : data.currentStop === (splitted ? dataIndex+1 : index+1)},
                      ]"
                    >
                      {{ splitted ? dataIndex+1 : index+1 }}
                    </span>
                    <span>
                      {{ splitted ? data.stops[dataIndex]?.pickup_zipcode : data.stops[index]?.pickup_zipcode }}
                    </span>
                  </div>
                  <div
                    class="h-[1px] w-12 border-b border-dashed"
                    :class="[
                      {'border-b-green-400' : ((splitted ? dataIndex+1 : index+1)) <= data.currentStop && (splitted ? dataIndex+2 : index+2) <= data.currentStop},
                      {'border-b-gray-400' : !(((splitted ? dataIndex+1 : index+1)) <= data.currentStop && (splitted ? dataIndex+2 : index+2) <= data.currentStop)},
                    ]"
                  />
                  <div class="flex items-center gap-2">
                    <span
                      class="w-5 h-5 rounded-full flex items-center justify-center text-c-1"
                      :class="[
                        {'bg-green-400 text-white border border-transparent' : (splitted ? dataIndex+2 : index+2) <= data.currentStop && data.status !== 'Waiting'},
                        {'bg-transparent text-gray-400 border border-gray-400' : ((splitted ? dataIndex+1 : index+1)) >= data.currentStop || data.status === 'Waiting'},
                        { '!w-4 !h-4': splitted },
                      ]"
                    >
                      {{ splitted ? dataIndex+2 : index+2 }}
                    </span>
                    <span>
                      {{ splitted ? data.stops[dataIndex+1]?.drop_off_zipcode : data.stops[index+1]?.drop_off_zipcode }}
                    </span>
                  </div>
                </div>
              </td>
              <td>{{ data.miles }}</td>
              <td>
                <div class="flex items-center gap-2">
                  <Icon
                    icon="timer"
                    variant="bulk"
                    color="gray"
                    :alpha="400"
                    :disable-fill="false"
                    class="w-4 h-4 cursor-pointer"
                  />
                  <span>
                    {{ calculateDuration(data.stops[dataIndex]?.pickup_date, data.stops[dataIndex]?.drop_off_date) }}

                  </span>
                </div>
              </td>
              <td>{{ col.contact_first_name + ' ' + col.contact_last_name }}</td>
              <td>
                <div class="flex items-center cursor-pointer gap-2" @click="showFileModal()">
                  <div v-if="(splitted ? data.stops[dataIndex]?.documents?.length === 0 : data.stops[index]?.documents?.length === 0)" class="items-center flex">
                    <Icon icon="document-upload" variant="bulk" color="dark-blue" :alpha="0" class="w-4 h-4" />
                  </div>

                  <span :class="`text-c-1 font-medium ${(splitted ? data.stops[dataIndex]?.documents?.length > 0 : data.stops[index]?.documents?.length >0) ? 'text-tuna' : 'text-dark-blue underline'}`">
                    {{ (splitted ? data.stops[dataIndex]?.documents?.length > 0 : data.stops[index]?.documents?.length >0) ? (splitted ? data.stops[dataIndex]?.documents?.length : data.stops[index]?.documents?.length) + " Docs" : "Upload" }}
                  </span>
                  <div v-if="(splitted ? data.stops[dataIndex]?.documents?.length > 0 : data.stops[index]?.documents?.length >0)" class="items-center flex">
                    <Icon icon="document-upload" variant="bulk" color="dark-blue" :alpha="0" class="w-4 h-4" />
                  </div>
                </div>
              </td>
              <td>
                <div class="flex items-center gap-2">
                  <div v-if="!splitted" class="w-8 h-8 border border-red-200 relative rounded-lg flex items-center justify-center" @click="$emit('openMessages')">
                    <Icon
                      icon="sms"
                      variant="bold"
                      color="red"
                      :alpha="0"
                      class="w-4 h-4 cursor-pointer"
                    />
                    <div class="rounded-full border border-white w-3 h-3 flex items-center justify-center text-[8px] text-white absolute -mr-3 -mt-3 bg-red">
                      2
                    </div>
                  </div>
                  <div class="w-8 h-8 border border-gray-300 rounded-lg flex items-center justify-center">
                    <Icon icon="more-2" color="grey-dark" :alpha="100" :disable-fill="false" class="w-4 h-4 cursor-pointer" />
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <Modal ref="completionModal" size="sm" position="center">
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
        </div>
        <div class="col-8">
          <Button :type="ButtonTypeEnum.GREEN" :size="SizeTypeEnum.LG" @click="hideCompletionModal()">
            Done
          </Button>
        </div>
      </div>
    </Modal>
    <Modal ref="fileModal" size="sm" position="center">
      <div slot="body" class="row flex items-center justify-center pt-16 pb-14">
        <div class="col-8 items-center justify-center">
          <h3 class="font-semibold text-center mb-2">
            Upload Document
          </h3>
        </div>
        <div class="col-8 mt-16">
          <Form fclass="row my-2" @send="hideFileModal">
            <div class="col-12 mb-6">
              <FileInput label="Document Upload" name="document" />
            </div>
            <div class="mb-1 text-base font-medium dark:text-white">
              Progress
            </div>
            <div class="w-full bg-gray-200 rounded-full h-2.5 mb-4 dark:bg-gray-700">
              <div class="bg-gray-600 h-2.5 rounded-full dark:bg-gray-300" style="width: 45%" />
            </div>
            <div class="col-12 mt-12">
              <Button :type="ButtonTypeEnum.GREEN" :size="SizeTypeEnum.LG" :action="ActionTypeEnum.SUBMIT">
                Submit
              </Button>
              <Button
                :type="ButtonTypeEnum.LINK"
                :size="SizeTypeEnum.LG"
                :action="ActionTypeEnum.BUTTON"
                @click="hideFileModal()"
              >
                Cancel
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </Modal>
    <Modal ref="uploadModal" size="sm" position="center" class="z-20">
      <div slot="body" class="row flex items-center justify-center pt-16 pb-14">
        <div class="col-8 items-center justify-center">
          <h3 class="font-semibold text-center mb-2">
            Upload Document
          </h3>
          <p class="text-b-4 font-medium text-gray-400 text-center">
            To ensure payment, upload the BOL for load
          </p>
        </div>
        <div class="col-8 mt-16">
          <Form fclass="row my-2" @send="handleSubmit">
            <div class="col-12 mb-6">
              <FileInput label="Document Upload" name="document" />
            </div>
            <div class="col-12 mt-12">
              <Button :type="ButtonTypeEnum.GREEN" :size="SizeTypeEnum.LG" :action="ActionTypeEnum.SUBMIT">
                Submit
              </Button>
              <Button
                :type="ButtonTypeEnum.LINK"
                :size="SizeTypeEnum.LG"
                :action="ActionTypeEnum.BUTTON"
                @click="hideUploadModal()"
              >
                Cancel
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </Modal>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import moment, { duration } from 'moment'
import { SelectOption } from './ts/interfaces'
import { SizeTypeEnum, ActionTypeEnum, ButtonTypeEnum } from '~/components/ts/enums'
import { Stop } from '@/models/stops'

export default Vue.extend({
  name: 'MarketPlaceItemDetail',
  props: {
    data: {
      type: Object,
      default: null
    },
    splitted: {
      type: Boolean,
      default: false
    },
    added: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      SizeTypeEnum,
      ActionTypeEnum,
      ButtonTypeEnum,
      showModal: false,
      extendeds: [] as any[],
      names: [
        'Stop',
        'Equipment/ID',
        'Arrival',
        'Departure',
        'Status'
      ],
      request: {
        load: '',
        stop: '',
        reason: ''
      },
      loadOptions: [
          { id: 1, text: 'BL093662', selected: false },
          { id: 2, text: 'BL093663', selected: false },
          { id: 3, text: 'BL093664', selected: false },
          { id: 4, text: 'BL093665', selected: false }
      ] as SelectOption[],
      stopOptions: [
          { id: 1, text: '1', selected: false },
          { id: 2, text: '2', selected: false },
          { id: 3, text: '3', selected: false },
          { id: 4, text: '4', selected: false }
      ] as SelectOption[],
      reasonOptions: [
          { id: 1, text: 'Reason 1', selected: false },
          { id: 2, text: 'Reason 2', selected: false }
      ] as SelectOption[]
    }
  },
  computed: {
    toggleableStops (): Stop[] {
      return this.data?.stops
    },
    splittedData (): any[] {
      if (this.splitted) {
        this.toggleableStops?.forEach((stop: any) => {
          stop.isActive = false
          console.log(stop.isActive)
        })
        return this.toggleableStops
      } else {
        return [this.data]
      }
    }
  },
  methods: {
    handleSubmit () {
      (this.$refs.completionModal as Vue & { showModal: () => Element }).showModal()
    },
    hideCompletionModal (): void {
      (this.$refs.completionModal as Vue & { hideModal: () => Function }).hideModal()
    },
    hideFileModal (): void {
      (this.$refs.fileModal as Vue & { hideModal: () => Function }).hideModal()
    },
    showFileModal (): void {
      (this.$refs.fileModal as Vue & { showModal: () => Function }).showModal()
    },
    hideUploadModal (): void {
      (this.$refs.uploadModal as Vue & { hideModal: () => Function }).hideModal()
    },
    calculateDuration (startDate: string, endDate: string): string {
      const start = moment(startDate)
      const end = moment(endDate)
      const dur = duration(end.diff(start))
      const hours = dur.asHours()
      return `${hours} Hours`
    },
    dataSplit (arr: any, index:number): any[] {
      console.log(arr, index)
      if (this.splitted) {
        return [arr]
      } else {
        return arr.stops
      }
    }
  }
})
</script>

  <style>
  .load-item-detail th {
      @apply px-6  font-medium text-gray-400
  }
  .load-item-detail tbody tr {
      @apply h-16
  }
  .load-item-detail tbody tr td {
      @apply px-6
  }
  .info-container{
    margin-left: calc(-1.7rem - 1px)
  }
  </style>
