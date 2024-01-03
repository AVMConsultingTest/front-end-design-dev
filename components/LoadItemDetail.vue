<template>
  <div v-if="data" class="w-full">
    <div
      v-for="(detailData, dataIndex) in splittedData"
      :key="dataIndex"
      class="relative"
      :class="[
        { 'hidden': splitted ? (added ? false : (dataIndex === data.load_stops.length - 1)) : false },
        { 'my-5': splitted }
      ]"
    >
      <Button
        v-if="splitted"
        :type="ButtonTypeEnum.PRIMARY"
        :action="ActionTypeEnum.BUTTON"
        class="
          !w-5
          !h-5
          !rounded-full
          absolute
          -bottom-2.5
          left-1/2
          -translate-x-1/2
        "
        @click="extendItem(detailData)"
      >
        <Icon
          icon="arrow-down-1"
          color="white"
          class="w-3 h-3 transition-all"
          :class="{ 'rotate-180': extendeds.includes(detailData?.id) }"
        />
      </Button>
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
            <th>Bill of Lading</th>
            <th>Action</th>
          </thead>
          <tbody class="text-c-1 font-medium">
            <tr
              v-for="(col, index) in dataSplit(detailData, dataIndex)"
              :key="index"
              class="border-b border-b-grey-blue-100"
              :class="[
                {'border-b-grey-blue-100' : index !== data.load_stops.length-1},
                {'hidden ' : added ? false : index === data.load_stops.length-1},
                {'border-b-0 ' : index === data.load_stops.length-2},
              ]"
            >
              <td :class="`${splitted ? 'text-dark' : 'text-dark-blue'}`">
                <div class="flex items-center gap-2">
                  {{ data.load_stops[index].id }} <Icon
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
                        {'bg-green-400 text-white border border-transparent' : ((splitted ? dataIndex+1 : index+1)) <= data.current_stop_id && data.status !== 'Waiting'},
                        {'bg-transparent text-gray-400 border border-gray-400' : ((splitted ? dataIndex+1 : index+1)) >= data.current_stop_id || data.status === 'Waiting'},
                        { '!w-4 !h-4': splitted },
                        {'!bg-green-400 !text-white border !border-transparent' : data.current_stop_id === (splitted ? dataIndex+1 : index+1)},
                      ]"
                    >
                      {{ splitted ? dataIndex+1 : index+1 }}
                    </span>
                    <span>
                      {{ splitted ? data.load_stops[dataIndex]?.pickup_city : data.load_stops[index]?.pickup_city }}
                    </span>
                  </div>
                  <div
                    class="h-[1px] w-12 border-b border-dashed"
                    :class="[
                      {'border-b-green-400' : ((splitted ? dataIndex+1 : index+1)) <= data.current_stop_id && (splitted ? dataIndex+2 : index+2) <= data.current_stop_id},
                      {'border-b-gray-400' : !(((splitted ? dataIndex+1 : index+1)) <= data.current_stop_id && (splitted ? dataIndex+2 : index+2) <= data.current_stop_id)},
                    ]"
                  />
                  <div class="flex items-center gap-2">
                    <span
                      class="w-5 h-5 rounded-full flex items-center justify-center text-c-1"
                      :class="[
                        {'bg-green-400 text-white border border-transparent' : (splitted ? dataIndex+2 : index+2) <= data.current_stop_id && data.status !== 'Waiting'},
                        {'bg-transparent text-gray-400 border border-gray-400' : ((splitted ? dataIndex+1 : index+1)) >= data.current_stop_id || data.status === 'Waiting'},
                        { '!w-4 !h-4': splitted },
                      ]"
                    >
                      {{ splitted ? dataIndex+2 : index+2 }}
                    </span>
                    <span>
                      {{ splitted ? data.load_stops[dataIndex+1]?.drop_off_city : data.load_stops[index+1]?.drop_off_city }}
                    </span>
                  </div>
                </div>
              </td>
              <td>{{ data.load_stops[dataIndex+1].distance }}</td>
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
                    {{ calculateDuration(data.load_stops[index]?.pickup_date, data.load_stops[index]?.drop_off_date) }}

                  </span>
                </div>
              </td>
              <td>{{ data?.load_stops[0]?.first_name + " " + data?.load_stops[0].last_name }}</td>
              <td>
                <div class="flex items-center cursor-pointer gap-2" @click="$refs.fileModal.showModal()">
                  <div v-if="(splitted ? data.load_stops[dataIndex]?.documents?.length === 0 : data.load_stops[index]?.documents?.length === 0)" class="items-center flex">
                    <Icon icon="document-upload" variant="bulk" color="dark-blue" :alpha="0" class="w-4 h-4" />
                  </div>

                  <span :class="`text-c-1 font-medium ${(splitted ? data.load_stops[dataIndex]?.documents?.length > 0 : data.load_stops[index]?.documents?.length >0) ? 'text-tuna' : 'text-dark-blue underline'}`">
                    {{ (splitted ? data.load_stops[dataIndex]?.documents?.length > 0 : data.load_stops[index]?.documents?.length >0) ? (splitted ? data.load_stops[dataIndex]?.documents?.length : data.load_stops[index]?.documents?.length) + " Docs" : "Upload" }}
                  </span>
                  <div v-if="(splitted ? data.load_stops[dataIndex]?.documents?.length > 0 : data.load_stops[index]?.documents?.length >0)" class="items-center flex">
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
        <div
          v-if="!splitted"
          class="w-100 gap-2 flex px-6 py-6 border-t border-t-grey-blue-100 border-dashed bg-[#92BBFA]/5"
          :class="[
            { '!bg-white' : splitted }
          ]"
        >
          <div class="w-12 h-10 flex items-center justify-center cursor-pointer rounded-lg bg-green-700" @click="$refs.drawer.showDrawer()">
            <Icon
              icon="dollar-circle"
              color="white"
              :alpha="0"
              :disable-fill="false"
              class="w-5 h-5 cursor-pointer"
            />
          </div>
          <div class="w-12 h-10 flex items-center justify-center cursor-pointer rounded-lg bg-green-700" @click="$emit('openDrawer')">
            <Icon
              icon="map"
              color="white"
              :alpha="0"
              :disable-fill="false"
              class="w-5 h-5 cursor-pointer"
            />
          </div>
          <div
            class="border max-w-max border-tuna text-tuna rounded-lg px-5 text-b-4 w-44 h-10 font-medium cursor-pointer flex items-center justify-center"
            @click="$refs.formModal.showModal()"
          >
            Report Delay
          </div>
        </div>
        <transition name="slide">
          <div v-if="splitted" v-show="extendeds.includes(detailData?.id)">
            <div>
              <div class="flex border-b border-grey-blue py-4 pr-[1.7rem]">
                <div class="tw-col-[56px]" />
                <div class="tw-col flex">
                  <div v-for="(name, index) in names" :key="index" class="col first:pr-16">
                    <span class="text-dark-blue text-c-1 font-medium ">
                      {{ name }}
                    </span>
                  </div>
                </div>
              </div>
              <div class="flex">
                <div class="tw-col-[56px]" />
                <div class="tw-col pt-5 pb-7">
                  <div class="mb-1 pr-[1.7rem]">
                    <div class="flex w-full">
                      <div class="tw-col-[35px] -ml-[2.2rem]">
                        <span
                          class="w-4 h-4 rounded-full flex items-center justify-center text-c-1"
                          :class="[
                            {'bg-green-400 text-white border border-transparent' : ((dataIndex+1)) <= data.current_stop_id && data.status !== 'Waiting'},
                            {'bg-transparent text-gray-400 border border-gray-400' : ((dataIndex+1)) >= data.current_stop_id || data.status === 'Waiting'},
                            {'!bg-green-400 !text-white border !border-transparent' : data.current_stop_id === dataIndex+1},
                          ]"
                        >
                          {{ dataIndex+1 }}
                        </span>
                      </div>
                      <div class="tw-col flex flex-col pr-16">
                        <span class="text-gray-800 text-c-1 font-bold pb-1 !leading-4">
                          {{ data.load_stops[dataIndex]?.code }}
                        </span>
                      </div>
                      <div class="tw-col flex flex-col">
                        <div class="flex">
                          <div class="flex flex-col col-6">
                            <span class="text-grey-dark-200 text-c-2 font-normal">
                              Truck ID
                            </span>
                          </div>
                          <div class="flex flex-col col-6">
                            <span class="text-grey-dark-200 text-c-2 font-normal">
                              Trailer ID
                            </span>
                          </div>
                        </div>
                      </div>
                      <div class="tw-col flex flex-col" />
                      <div class="tw-col flex flex-col" />
                      <div class="tw-col flex flex-col" />
                    </div>
                  </div>
                  <div>
                    <div class="info-container pl-[1.7rem] border-l border-gray border-dashed">
                      <div class="flex w-full pr-[1.7rem]">
                        <div class="tw-col flex flex-col pr-16">
                          <span class="text-c-2 font-medium text-[#3C4049]">
                            {{ data.load_stops[dataIndex]?.pickup_address_line1 + " " + data.load_stops[dataIndex]?.pickup_address_line2 }}
                          </span>
                        </div>
                        <div class="tw-col flex flex-col">
                          <div class="flex flex-wrap">
                            <div class="flex flex-col col-6">
                              <span class="text-gray-800 text-c-1 font-medium">
                                {{ data?.truck_id }}
                              </span>
                            </div>
                            <div class="flex flex-col col-6">
                              <span class="text-gray-800 text-c-1 font-medium">
                                {{ data?.trailer_id }}
                              </span>
                            </div>
                            <div class="col-12 mt-2">
                              <span class="text-orange text-c-1 font-medium">
                                {{ data.load_stops[dataIndex]?.status }}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div class="tw-col flex flex-col -mt-4">
                          <span class="text-c-1 text-gray-800 font-medium !leading-4">
                            {{ data.load_stops[dataIndex]?.drop_off_date }}
                          </span>
                          <span class="text-c-1 text-gray font-normal !leading-4">
                            Sch: {{ data.load_stops[dataIndex]?.pickup_date }}
                          </span>
                        </div>
                        <div class="tw-col flex flex-col -mt-4">
                          <div class="flex">
                            <span class="text-c-1 text-gray-800 font-medium !leading-4 mr-2">
                              {{ data.load_stops[dataIndex]?.pickup_date }}
                            </span>
                            <Icon
                              icon="warning-2"
                              color="lime"
                              :alpha="0"
                              variant="bold"
                              class="w-4 h-4"
                            />
                          </div>
                          <span class="text-c-1 text-gray font-normal !leading-4">
                            Sch: {{ data.load_stops[dataIndex]?.pickup_date }}
                          </span>
                        </div>
                        <div class="tw-col flex flex-col -mt-3">
                          <div class="flex justify-center">
                            <Badge
                              class="!text-green-700 !bg-green-200 !py-1.5 !h-6"
                              :title="data.status"
                              :size="SizeTypeEnum.SM"
                              icon="arrow-circle-down"
                              icon-color="green"
                              :icon-alpha="700"
                              icon-class="!w-3 !h-3"
                            />
                          </div>
                        </div>
                      </div>
                      <div class="flex flex-col mt-7">
                        <span class="text-c-1 font-medium text-[#3C4049] mb-2">
                          Pick-up Instructions
                        </span>
                        <div class="bg-white rounded-lg border border-gray-300 h-12 flex items-center pl-5 mb-10">
                          <span class="text-c-1 font-normal text-gray-800">
                            {{ data.load_stops[dataIndex]?.instructions }}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="flex -mt-10">
                <div class="tw-col-[56px]" />
                <div class="tw-col pt-5 pb-7">
                  <div class="mb-1 pr-[1.7rem]">
                    <div class="flex w-full">
                      <div class="tw-col-[35px] -ml-[2.2rem]">
                        <span
                          class="w-4 h-4 rounded-full flex items-center justify-center text-c-1"
                          :class="[
                            {'bg-green-400 text-white border border-transparent' : ((dataIndex+2)) <= data.current_stop_id && data.status !== 'Waiting'},
                            {'bg-transparent text-gray-400 border border-gray-400' : ((dataIndex+1)) >= data.current_stop_id || data.status === 'Waiting'},
                          ]"
                        >
                          {{ dataIndex+2 }}
                        </span>
                      </div>
                      <div class="tw-col flex flex-col pr-16">
                        <span class="text-gray-800 text-c-1 font-bold pb-1 !leading-4">
                          {{ data.load_stops[dataIndex+1]?.id }}
                        </span>
                      </div>
                      <div class="tw-col flex flex-col">
                        <div class="flex">
                          <div class="flex flex-col col-6">
                            <span class="text-grey-dark-200 text-c-2 font-normal">
                              Truck ID
                            </span>
                          </div>
                          <div class="flex flex-col col-6">
                            <span class="text-grey-dark-200 text-c-2 font-normal">
                              Trailer ID
                            </span>
                          </div>
                        </div>
                      </div>
                      <div class="tw-col flex flex-col" />
                      <div class="tw-col flex flex-col" />
                      <div class="tw-col flex flex-col" />
                    </div>
                  </div>
                  <div>
                    <div class="info-container pl-[1.7rem]">
                      <div class="flex w-full pr-[1.7rem]">
                        <div class="tw-col flex flex-col pr-16">
                          <span class="text-c-2 font-medium text-[#3C4049]">
                            {{ data.load_stops[dataIndex+1]?.pickup_address_line1 + " " + data.load_stops[dataIndex+1]?.pickup_address_line2 }}
                          </span>
                        </div>
                        <div class="tw-col flex flex-col">
                          <div class="flex flex-wrap">
                            <div class="flex flex-col col-6">
                              <span class="text-gray-800 text-c-1 font-medium">
                                {{ data?.truck_id }}
                              </span>
                            </div>
                            <div class="flex flex-col col-6">
                              <span class="text-gray-800 text-c-1 font-medium">
                                {{ data?.trailer_id }}
                              </span>
                            </div>
                            <div class="col-12 mt-2">
                              <span class="text-orange text-c-1 font-medium">
                                {{ data.load_stops[dataIndex+1]?.status }}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div class="tw-col flex flex-col -mt-4">
                          <span class="text-c-1 text-gray-800 font-medium !leading-4">
                            {{ data.load_stops[dataIndex+1]?.drop_off_date }}
                          </span>
                          <span class="text-c-1 text-gray font-normal !leading-4">
                            Sch: {{ data.load_stops[dataIndex+1]?.pickup_date }}
                          </span>
                        </div>
                        <div class="tw-col flex flex-col -mt-4">
                          <div class="flex">
                            <span class="text-c-1 text-gray-800 font-medium !leading-4 mr-2">
                              {{ data.load_stops[dataIndex+1]?.drop_off_date }}
                            </span>
                            <Icon
                              icon="warning-2"
                              color="lime"
                              :alpha="0"
                              variant="bold"
                              class="w-4 h-4"
                            />
                          </div>
                          <span class="text-c-1 text-gray font-normal !leading-4">
                            Sch: {{ data.load_stops[dataIndex+1]?.drop_off_date }}
                          </span>
                        </div>
                        <div class="tw-col flex flex-col -mt-3">
                          <div class="flex justify-center">
                            <Badge
                              class="!text-green-700 !bg-green-200 !py-1.5 !h-6"
                              :title="data.load_status"
                              :size="SizeTypeEnum.SM"
                              icon="arrow-circle-down"
                              icon-color="green"
                              :icon-alpha="700"
                              icon-class="!w-3 !h-3"
                            />
                          </div>
                        </div>
                      </div>
                      <div class="flex flex-col mt-7">
                        <span class="text-c-1 font-medium text-[#3C4049] mb-2">
                          Drop-off Instructions
                        </span>
                        <div class="bg-white rounded-lg border border-gray-300 h-12 flex items-center pl-5 mb-10">
                          <span class="text-c-1 font-normal text-gray-800">
                            {{ data.load_stops[dataIndex+1]?.instructions }}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              class="w-100 gap-2 flex px-6 py-6 border-t border-t-grey-blue-100 border-dashed bg-[#92BBFA]/5"
              :class="[
                { '!bg-white' : splitted }
              ]"
            >
              <div class="w-12 h-10 flex items-center justify-center cursor-pointer rounded-lg bg-green-700" @click="$refs.drawer.showDrawer()">
                <Icon
                  icon="dollar-circle"
                  color="white"
                  :alpha="0"
                  :disable-fill="false"
                  class="w-5 h-5 cursor-pointer"
                />
              </div>
              <div class="w-12 h-10 flex items-center justify-center cursor-pointer rounded-lg bg-green-700">
                <Icon
                  icon="map"
                  color="white"
                  :alpha="0"
                  :disable-fill="false"
                  class="w-5 h-5 cursor-pointer"
                />
              </div>
              <div
                class="border max-w-max border-tuna text-tuna rounded-lg px-5 text-b-4 w-44 h-10 font-medium cursor-pointer flex items-center justify-center"
                @click="$refs.formModal.showModal()"
              >
                Report Delay
              </div>
            </div>
          </div>
        </transition>
      </div>
    </div>
    <Modal ref="formModal" size="sm" position="center">
      <div slot="body" class="row flex items-center justify-center pt-16 pb-14">
        <div class="col-8 items-center justify-center">
          <h3 class="font-semibold text-center mb-2">
            Report Delay
          </h3>
        </div>
        <div class="col-8 mt-16">
          <Form fclass="row my-2" @send="handleSubmit">
            <div class="col-12 mb-6">
              <m-select
                v-model="request.load"
                :multiple="false"
                :searchable="true"
                :options="loadOptions"
                :addable="true"
                name="Load"
                type="text"
                label="Load"
                rules="required"
              />
            </div>
            <div class="col-12 mb-6">
              <m-select
                v-model="request.stop"
                :multiple="false"
                :searchable="true"
                :options="stopOptions"
                :addable="true"
                name="Stop"
                type="text"
                label="Stop"
                rules="required"
              />
            </div>
            <div class="col-12 mb-6">
              <m-select
                v-model="request.reason"
                :multiple="false"
                :searchable="true"
                :options="reasonOptions"
                :addable="true"
                name="Stop"
                type="text"
                label="Select Delay Reason"
                rules="required"
              />
            </div>
            <div class="col-12 mt-12">
              <Button :type="ButtonTypeEnum.GREEN" :size="SizeTypeEnum.LG" :action="ActionTypeEnum.SUBMIT">
                Submit
              </Button>
              <Button
                :type="ButtonTypeEnum.LINK"
                :size="SizeTypeEnum.LG"
                :action="ActionTypeEnum.BUTTON"
                @click="hideFormModal()"
              >
                Cancel
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </Modal>
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
              <Button 
              :type="ButtonTypeEnum.GREEN" 
              :size="SizeTypeEnum.LG" 
              :action="ActionTypeEnum.SUBMIT"
              >
                Submit
              </Button>
              <Button
                :type="ButtonTypeEnum.LINK"
                :size="SizeTypeEnum.LG"
                :action="ActionTypeEnum.BUTTON"
                @click="hideModal2()"
              >
                Cancel
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </Modal>
    <Drawer ref="drawer" :close-button="true">
      <div class="full">
        <div class="w-full py-16 px-14 flex gap-5 items-center">
          <Icon
            icon="money-send"
            color="green"
            variant="bulk"
            :alpha="700"
            :disable-fill="false"
            class="w-10 h-10 cursor-pointer"
          />
          <h3 class="font-semibold">
            Estimated Payout
          </h3>
        </div>
        <div class="w-full px-14 mt-16">
          <table class="table-auto w-full">
            <thead class="bg-[#E0E1E5]/5 h-12 border-b border-grey-blue-100">
              <tr>
                <th class="text-left font-semibold text-b-3">
                  Stop
                </th>
                <th class="text-left font-semibold text-b-3">
                  Base Rate
                </th>
                <th class="text-left font-semibold text-b-3">
                  Full Surcharge
                </th>
                <th class="text-left font-semibold text-b-3">
                  Total
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="index in 5" :key="index" class="border-y border-grey-blue-100 first:border-t-0 font-medium h-16">
                <td class="text-dark-blue">
                  Load 112BJTC9F{{ index }}
                </td>
                <td class="">
                  <div class="flex items-center gap-2 h-16">
                    <Icon
                      icon="dollar-circle"
                      color="green"
                      :alpha="400"
                      :disable-fill="false"
                      class="w-5 h-5"
                    />{{ 1500.12 | toCurrency }}
                  </div>
                </td>
                <td>
                  <div class="flex items-center gap-2 h-16">
                    <Icon
                      icon="dollar-circle"
                      color="green"
                      :alpha="400"
                      :disable-fill="false"
                      class="w-5 h-5"
                    />{{ 500.12 | toCurrency }}
                  </div>
                </td>
                <td>
                  <div class="flex items-center gap-2 h-16">
                    {{ 2000.12 | toCurrency }}
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </Drawer>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import moment, { duration } from 'moment'
import { SelectOption } from './ts/interfaces'
import { SizeTypeEnum, ActionTypeEnum, ButtonTypeEnum } from '~/components/ts/enums'
export default Vue.extend({
  name: 'LoadItemDetail',
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
    toggleableStops () {
      return this.data?.load_stops
    },
    splittedData () {
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
    hideFormModal (): void {
      (this.$refs.formModal as Vue & { hideModal: () => Function }).hideModal()
    },
    hideCompletionModal (): void {
      (this.$refs.completionModal as Vue & { hideModal: () => Function }).hideModal()
    },
    hideFileModal (): void {
      (this.$refs.fileModal as Vue & { hideModal: () => Function }).hideModal()
    },
    hideUploadModal (): void {
      (this.$refs.uploadModal as Vue & { hideModal: () => Function }).hideModal()
    },
    dataSplit (arr: any, index:number): any[] {
      console.log(arr, index)
      if (this.splitted) {
        return [arr]
      } else {
        return arr.load_stops
      }
    },
    calculateDuration (startDate: string, endDate: string): string {
      const start = moment(startDate)
      const end = moment(endDate)
      const dur = duration(end.diff(start))
      const hours = dur.asHours()
      return `${hours} Hours`
    },
    drawer (componentName: String) {
      (this.$refs.drawer as Vue & { showDrawer: (component: String, routeUrl?: String) => Element }).showDrawer(componentName)
    },
    extendItem (item: any): void {
      if (this.extendeds.includes(item.id)) {
        this.extendeds = this.extendeds.filter((a: any) => {
          return a !== item.id
        })
      } else {
        this.extendeds.push(item.id)
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
