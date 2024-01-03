<template>
    <div class="w-full">
      <Drawer ref="drawer" />
      <PageHeader
        title="Carrier Profile"
        class="mb-8"
        @goback="$router.go(-1)"
      />
      <div
        class="
          mb-8
          col-12
          relative
          bg-white
          shadow-2xl shadow-gray-200
          rounded-xl
          p-8
          dark:bg-[#21293B] dark:shadow-none
        "
      >
        <div class="row">
          <div class="col-9 flex">
            <div class="col-3">
              <div class="relative w-[152px] h-[152px] mx-auto">
                <img :src="pictureURL.url" alt="driver-picture" class="w-full h-full object-cover rounded-full">
                <div
                  :class="[
                    { 'bg-green-400': status === 0 },
                    { 'bg-lime': status !== 0 },
                  ]"
                  class="
                    rounded-full
                    absolute
                    p-2
                    bottom-[-18px]
                    left-1/2
                    -translate-x-1/2
                    flex
                    justify-center
                    items-center
                  "
                >
                  <span class="text-c-1 font-medium text-gray-800">{{
                    status === 0 ? "Active" : "Inactive"
                  }}</span>
                </div>
              </div>
            </div>
            <div class="pl-10 col-12">
              <div class="mb-6">
                <h5 class="text-gray-800 font-semibold">
                  XYZ Carrier, Inc.
                </h5>
                <span class="text-c-1 text-gray">2118 Thornridge Cir. Syracuse, Connecticut 35624</span>
              </div>
              <div class="col-12">
                <div class="row">
                  <div class="row col-3 mb-5">
                    <span class="text-c-1 font-medium text-gray-800">
                      Ellen Rose
                    </span>
                    <span class="text-grey-dark-300 text-c-2 font-normal">
                      Primary contact
                    </span>
                  </div>
                  <div class="row col-3 mb-5">
                    <span class="text-c-1 font-medium text-gray-800">
                      (229) 555-0109
                    </span>
                    <span class="text-grey-dark-300 text-c-2 font-normal">
                      Phone Number
                    </span>
                  </div>
                  <div class="row col-3 mb-5">
                    <span class="text-c-1 font-medium text-gray-800">
                      sara.cruz@gmail.com
                    </span>
                    <span class="text-grey-dark-300 text-c-2 font-normal">
                      Business E-mail
                    </span>
                  </div>
                  <div class="row col-3 mb-5">
                    <span class="text-c-1 font-medium text-gray-800">
                      #24332434
                    </span>
                    <span class="text-grey-dark-300 text-c-2 font-normal">
                      Carrier ID
                    </span>
                  </div>
                </div>
                <div class="row">
                  <div class="row col-3 mb-5">
                    <span class="text-c-1 font-medium text-gray-800">
                      15415151515
                    </span>
                    <span class="text-grey-dark-300 text-c-2 font-normal">
                      MC#
                    </span>
                  </div>
                  <div class="row col-3 mb-5">
                    <span class="text-c-1 font-medium text-gray-800">
                      84825489456
                    </span>
                    <span class="text-grey-dark-300 text-c-2 font-normal">
                      DOT#
                    </span>
                  </div>
                  <div class="row col-3 mb-5">
                    <span class="text-c-1 font-medium text-gray-800">
                      1234
                    </span>
                    <span class="text-grey-dark-300 text-c-2 font-normal">
                      SCAC
                    </span>
                  </div>
                  <div class="row col-3 mb-5">
                    <span class="text-c-1 font-medium text-gray-800">
                      3 Units
                    </span>
                    <span class="text-grey-dark-300 text-c-2 font-normal">
                      Power Units
                    </span>
                  </div>
                </div>
                <div class="row">
                  <div class="row col-3 mb-5">
                    <span class="text-c-1 font-medium text-gray-800">
                      New York
                    </span>
                    <span class="text-grey-dark-300 text-c-2 font-normal">
                      Home Base City
                    </span>
                  </div>
                  <div class="row col-3 mb-5">
                    <span class="text-c-1 font-medium text-gray-800">
                      New York
                    </span>
                    <span class="text-grey-dark-300 text-c-2 font-normal">
                      Home Base State
                    </span>
                  </div>
                  <div class="row col-3 mb-5">
                    <span class="text-c-1 font-medium text-gray-800">
                      Nebula Customer
                    </span>
                    <span class="text-grey-dark-300 text-c-2 font-normal">
                      Connection State
                    </span>
                  </div>
                  <div class="row col-3 mb-5">
                    <span class="text-c-1 font-medium text-gray-800">
                      $ 5,000
                    </span>
                    <span class="text-grey-dark-300 text-c-2 font-normal">
                      Total $ Margin
                    </span>
                  </div>
                </div>
                <div class="row">
                  <div class="row col-3 mb-5">
                    <span class="text-c-1 font-medium text-gray-800">
                      96%
                    </span>
                    <span class="text-grey-dark-300 text-c-2 font-normal">
                      Total % Margin
                    </span>
                  </div>
                  <div class="row col-3 mb-5">
                    <span class="text-c-1 font-medium text-gray-800">
                      200,000
                    </span>
                    <span class="text-grey-dark-300 text-c-2 font-normal">
                      Total Load Count
                    </span>
                  </div>
                </div>
                <div class="row mt-11">
                  <div class="row col-3 mb-5">
                    <div class="flex items-center">
                      <span class="before:content-[''] w-[6px] h-[6px] rounded-full block relative bg-green-800 mr-1">
                      </span>
                      <span class="text-c-1 font-medium text-gray-800">
                        Active
                      </span>
                    </div>
                    <span class="text-grey-dark-300 text-c-2 font-normal">
                      Interstate Authority
                    </span>
                  </div>
                  <div class="row col-3 mb-5">
                    <div class="flex items-center">
                      <span class="before:content-[''] w-[6px] h-[6px] rounded-full block relative bg-green-800 mr-1">
                      </span>
                      <span class="text-c-1 font-medium text-gray-800">
                        Active
                      </span>
                    </div>
                    <span class="text-grey-dark-300 text-c-2 font-normal">
                      Common Authority
                    </span>
                  </div>
                  <div class="row col-3 mb-5">
                    <div class="flex items-center">
                      <span class="before:content-[''] w-[6px] h-[6px] rounded-full block relative bg-green-800 mr-1">
                      </span>
                      <span class="text-c-1 font-medium text-gray-800">
                        Active
                      </span>
                    </div>
                    <span class="text-grey-dark-300 text-c-2 font-normal">
                      Contract Authority
                    </span>
                  </div>
                  <div class="row col-3 mb-5">
                    <div class="flex items-center">
                      <span class="before:content-[''] w-[6px] h-[6px] rounded-full block relative bg-green-800 mr-1">
                      </span>
                      <span class="text-c-1 font-medium text-gray-800">
                        Active
                      </span>
                    </div>
                    <span class="text-grey-dark-300 text-c-2 font-normal">
                      Broker Authority
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          class="!w-9 !h-9 !rounded-full border border-gray-300 absolute top-4 right-4 flex justify-center cursor-pointer items-center"
          @click="drawer('EditCarrierProfile')"
        >
          <Icon
            icon="edit-2"
            variant="bold"
            color="dark"
            :alpha="500"
            class="w-5 h-5"
          />
        </div>
      </div>
      <div
        class="
          mb-8
          col-12
          relative
          bg-white
          shadow-2xl shadow-gray-200
          rounded-xl
          px-4
          py-[26px]
          dark:bg-[#21293B] dark:shadow-none
        "
      >
        <div class="row">
          <div class="col-12">
            <div class="col-12 pr-4">
              <div class="mb-6">
                <h5 class="text-gray-800 font-semibold border-b border-gray-200 pb-8">
                  Other Information
                </h5>
              </div>
                <h6 class="text-gray-800 font-semibold mb-6">
                    Safety
                </h6>
                <div class="col-12 flex">
                  <DetailBox
                    value="95%"
                    title="Carrier Score"
                    :border="true"
                    class="col-4 mb-4 px-4 py-3 mr-2"
                  />
                  <DetailBox
                    value="12"
                    title="Unsafe Driving"
                    :border="true"
                    class="col-4 mb-4 px-4 py-3 mr-2"
                  />
                  <DetailBox
                    value="0.35"
                    title="HOS Compliance"
                    :border="true"
                    class="col-4 mb-4 px-4 py-3"
                  />
                </div>
                <div class="col-12 flex">
                  <DetailBox
                    value="1.97"
                    title="Controlled Substance"
                    :border="true"
                    class="col-4 mb-4 px-4 py-3 mr-2"
                  />
                  <DetailBox
                    value="3.50"
                    title="Driver Fitness"
                    :border="true"
                    class="col-4 mb-4 px-4 py-3 mr-2"
                  />
                  <DetailBox
                    value="3.49"
                    title="Vehicle Maintenance"
                    :border="true"
                    class="col-4 mb-4 px-4 py-3"
                  />
                </div>
                <div class="col-12 flex">
                  <DetailBox
                    value="3.50"
                    title="HM Compliance"
                    :border="true"
                    class="col-4 mb-4 px-4 py-3 mr-2"
                  />
                  <DetailBox
                    value="3.50"
                    title="HM Compliance"
                    :border="true"
                    class="col-4 mb-4 px-4 py-3 mr-2"
                  />
                  <div class="col-4 items-center flex mr-2 mb-5 px-4 py-3 border border-[#E0E1E5] rounded-lg">
                    <img src="/images/pdf-icon.png" alt="" class="w-6 h-6 mr-2">
                    <div class="flex flex-col">
                      <span class="text-c-1 font-medium text-gray-800">
                        Crash Report.pdf
                      </span>
                      <span class="text-gray text-c-2 font-normal">
                        2.1 MB
                      </span>
                    </div>
                  </div>
                </div>
            </div>
          </div>
          <div class="col-12">
            <div class="col-12 pr-4">
                <h6 class="text-gray-800 font-semibold mb-6 mt-6">
                  Insurance - Auto Liability
                </h6>
                <div class="col-12 flex">
                  <DetailBox
                    value="September 31, 2023"
                    title="Expiration Date"
                    :border="true"
                    class="col-4 mb-4 px-4 py-3 mr-2"
                  />
                  <DetailBox
                    value="$ 5,000"
                    title="Coverage Limit"
                    :border="true"
                    class="col-4 mb-4 px-4 py-3 mr-2"
                  />
                  <DetailBox
                    value="XYZ Company Inc"
                    title="Insurance Company Name"
                    :border="true"
                    class="col-4 mb-4 px-4 py-3"
                  />
                </div>
                <div class="col-12 flex">
                  <DetailBox
                    value="123456789"
                    title="Policy #"
                    :border="true"
                    class="col-4 mb-4 px-4 py-3 mr-2"
                  />
                  <DetailBox
                    value="532 568 98 88"
                    title="Phone Number"
                    :border="true"
                    class="col-4 mb-4 px-4 py-3 mr-2"
                  />
                  <DetailBox
                    value="532 568 98 88"
                    title="Fax Number"
                    :border="true"
                    class="col-4 mb-4 px-4 py-3"
                  />
                </div>
            </div>
          </div>
          <div class="col-12">
            <div class="col-12 pr-4">
                <h6 class="text-gray-800 font-semibold mb-6 mt-6">
                  Insurance - Cargo Insurance
                </h6>
                <div class="col-12 flex">
                  <DetailBox
                    value="September 31, 2023"
                    title="Expiration Date"
                    :border="true"
                    class="col-4 mb-4 px-4 py-3 mr-2"
                  />
                  <DetailBox
                    value="$ 5,000"
                    title="Coverage Limit"
                    :border="true"
                    class="col-4 mb-4 px-4 py-3 mr-2"
                  />
                  <DetailBox
                    value="$ 5,000"
                    title="Coverage Limit"
                    :border="true"
                    class="col-4 mb-4 px-4 py-3 mr-2"
                  />
                </div>
                <div class="col-12 flex">
                  <DetailBox
                    value="$ 2,000"
                    title="Reefer Breakdown"
                    :border="true"
                    class="col-4 mb-4 px-4 py-3 mr-2"
                  />
                  <DetailBox
                    value="$ 1,000"
                    title="Reefer Breakdown Deductable"
                    :border="true"
                    class="col-4 mb-4 px-4 py-3 mr-2"
                  />
                  <DetailBox
                    value="123456789"
                    title="Policy #"
                    :border="true"
                    class="col-4 mb-4 px-4 py-3"
                  />
                </div>
                <div class="col-12 flex">
                  <DetailBox
                    value="532 568 98 88"
                    title="Phone Number"
                    :border="true"
                    class="col-4 mb-4 px-4 py-3 mr-2"
                  />
                  <DetailBox
                    value="532 568 98 88"
                    title="Fax Number"
                    :border="true"
                    class="col-4 mb-4 px-4 py-3 mr-2"
                  />
                </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row mb-5">
        <div class="col-12 mb-8">
          <div class="row mx-0">
            <div class="col-auto p-0 pr-2">
              <TabButton 
              :active="(selectedTab === 0)" 
              title="Contract Rates" 
              color="green" 
              @click="select(0)" 
              />
            </div>
            <div class="col-auto  p-0  pr-2">
              <TabButton 
              :active="(selectedTab === 1)" 
              title="Documents" 
              color="green" 
              @click="select(1)" 
              />
            </div>
            <div class="col-auto p-0 pr-2">
              <TabButton 
              :active="(selectedTab === 2)" 
              title="Load History" 
              color="green" 
              @click="select(2)" 
              />
            </div>
            <div class="col-auto p-0 pr-2">
              <TabButton 
              :active="(selectedTab === 3)" 
              title="Notes" 
              color="green"
              @click="select(3)" 
              />
            </div>
          </div>
        </div>
        <div class="col-12 mb-5">
        <Table
          v-if="selectedTab > -1"
          :id="tableKey"
          :key="tableKey"
          :title="getTitle"
          :headers="getHeader"
          :selected-tab="selectedTab"
          :data="getTableData"
          :page-count="getPageCount"
          :request-function="getRequest"
          :search-enabled="true"
          icon-color="orange"
          :alpha="700"
          :td-container-classes="selectedTab === 3 ? '!h-[unset]' : ''"
        >
          <template #item-first_name="{ data, index }">
            <div class="flex items-center">
              <div class="col-auto pr-0 mr-2">
                <img :src="data[index].avatar" :alt="data[index].first_name" class="rounded-full w-10 h-10">
              </div>
              <div class="col-auto">
                <span class="block whitespace-nowrap">
                  {{ data[index].first_name }}
                </span>
              </div>
            </div>
          </template>
          <template #item-load="{ data, index }">
            <div class="flex items-center">
              <div class="col-auto mb-2 pr-0 mr-2">
                <img src="/images/Ellipse_4.png" alt="ellipse" class="rounded-full w-10 h-10">
              </div>
              <div class="col-auto">
                <span class="block whitespace-nowrap font-bold mt-3">
                  {{ data[index].note_name }}
                </span>
                <span class="block w-[800px] border-r border-[#92969F] mb-6">
                  {{ data[index].note_body }}
                </span>
              </div>
            </div>
          </template>
          <template #item-date="{ data, index }">
            <div class="flex">
              <div class="col-auto text-[#92969F] pr-16">
                <span>
                  {{ data[index].date }}
                </span>
              </div>
            </div>
          </template>
          <template #item-actions>
            <div class="flex items-center">
              <Icon
                icon="edit"
                variant="linear"
                :alpha="400"
                :disable-fill="true"
                color="gray"
                class="w-6 h-6 mr-2"
              />
              <Icon
                icon="send-square"
                variant="linear"
                :alpha="400"
                :disable-fill="true"
                color="gray"
                class="w-6 h-6 mr-2"
              />
              <Icon
                icon="sms"
                variant="linear"
                :alpha="400"
                :disable-fill="true"
                color="gray"
                class="w-6 h-6 mr-2"
              />
            </div>
          </template>
          <template #item-status="{ item }">
            <Badge
              :title="item.status"
              :class="[
                {'bg-green-100 text-green-800' : item.status === 'Yes'},
                {'bg-red-100 text-red-600' : item.status === 'No'},
                {'bg-green-100 text-green-800' : item.status === 'Upload'},
                { 'bg-orange-200 text-orange-800': item.status === 'Pending' },
                { 'bg-blue-200 text-dark-blue': item.status === 'Open' },
                { 'bg-[#EEF4FF] text-[#3538CD]': item.status === 'Assigned' },
                { 'bg-orange-100 text-[#FFAA00]': item.status === 'At Pickup' },
                { 'bg-[#FFF1F3] text-[#C01048]': item.status === 'Invoiced' },
                { 'bg-[#F0F9FF] text-[#026AA2]': item.status === 'Paid' },

              ]"
              :size="SizeTypeEnum.MD"
            />
          </template>
          <template #item-load_status="{ item }">
            <Badge
              :title="item.load_status"
              :class="[
                { 'bg-[#ECFDF3] text-green-900': item.load_status === 'Delivered' },
                { 'bg-orange-200 text-orange-800': item.load_status === 'Picked' },
              ]"
              :size="SizeTypeEnum.MD"
            />
          </template>
          <template #item-revenue="{ item }">
            <Badge
              :title="item.revenue"
              :class="[
                {'bg-green-100 text-green-800' : item.revenue === '$4,000'},
              ]"
              :size="SizeTypeEnum.MD"
            />
          </template>
          <template #item-rate="{ item }">
            <Badge
              :title="item.rate"
              :class="[
                {'bg-dark-blue-100 text-dark-blue' : item.rate === '18%'},
              ]"
              :size="SizeTypeEnum.MD"
            />
          </template>
          <template #item-contract_load_id="{ data, index }">
            <div class="flex">
              <div class="col-auto text-dark-blue">
                <span>
                  {{ data[index].contract_load_id }}
                </span>
              </div>
            </div>
          </template>
          <template #item-type="{ data, index }">
            <div class="flex items-center">
              <div class="flex items-center justify-center mr-2">
                <img class="max-h-8 max-w-[32px]" :src="data[index].avatar" :alt="data[index].type">
              </div>
              <div class="col-auto pr-0 mr-2">
                <span class="block whitespace-nowrap">
                  {{ data[index].type }}
                </span>
              </div>
            </div>
          </template>
        </Table>
      </div>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import Vue from 'vue'
  import { mapActions } from 'vuex'
  import {
    ActionTypeEnum,
    ButtonTypeEnum,
    SizeTypeEnum
  } from '~/components/ts/enums'
  import { CustomersDetails } from '~/models/Broker/customersDetails/customersDetails'
  export default Vue.extend({
    layout: 'Dashboard',
    data () {
      return {
        dataFetched: false,
        ActionTypeEnum,
        ButtonTypeEnum,
        SizeTypeEnum,
        selectedTab: 0,
        response: {} as CustomersDetails,
        status: 0,
        testData: {
          credit_limit: 1500,
          available_credit: 1000,
          current_balance: 500
        },
        documentsHeaders: {
          document_category: {
            label: 'Document Type'
          },
          document_type: {
            label: 'Attachment'
          },
          // document_status: {
          //   label: 'Status'
          // },
          document_upload_date: {
            label: 'Upload Date'
          },
          actions: {
            label: 'Action'
          }
        },
        contractRatesHeaders: {
          broker_id: {
            label: 'Contract ID'
          },
          load_origin: {
            label: 'Origin'
          },
          load_destination: {
            label: 'Destination'
          },
          equipment_type: {
            label: 'Equipment Type'
          },
          contract_frequency: {
            label: 'Frequency'
          },
          contract_interval: {
            label: 'Interval'
          },
          contract_rate: {
            label: 'Rate'
          },
          contract_start_date: {
            label: 'Start Date'
          },
          contract_exp_date: {
            label: 'End Date'
          }
        },
        loadHistoryHeaders: {
          load_status: {
            label: 'Load Status'
          },
          // brokerage_name: {
          //   label: 'Brokerage Name'
          // },
          custRef: {
            label: 'Cust. Ref #'
          },
          load_origin: {
            label: 'Origin'
          },
          load_destination: {
            label: 'Destination'
          },
          pickup_date: {
            label: 'Pick Up Date/Time'
          },
          delivery_date: {
            label: 'Delivery Date/Time'
          },
          load_revenue: {
            label: 'Revenue'
          },
          cost: {
            label: 'Cost'
          },
          carrier_name: {
            label: 'Carrier Name'
          },
          equipment_type: {
            label: 'Equipment Type'
          },
          commodity: {
            label: 'Commodity'
          },
          load_weight: {
            label: 'Weight'
          }
        },
        notesHeaders: {
          load: {
            label: 'Load'
          },
          date: {
            label: 'Date'
          }
        },
        documentsData: [
        {
          avatar: '/images/pdf-icon.png',
          categories: 'W-9',
          type: 'PDF',
          status: 'Upload',
          date: '20/05/2022'
        },
        {
          avatar: '/images/word-icon.png',
          categories: 'Broker - Carrier Agreement',
          type: 'Word',
          status: 'Pending',
          date: '20/05/2022'
        },
        {
          avatar: '/images/excel-icon.png',
          categories: 'BMC - 84',
          type: 'Excel',
          status: 'Upload',
          date: '20/05/2022'
        },
        {
          avatar: '/images/pdf-icon.png',
          categories: 'Surety Bond',
          type: 'PDF',
          status: 'Upload',
          date: '20/05/2022'
        },
        {
          avatar: '/images/excel-icon.png',
          categories: 'Surety Bond',
          type: 'Excel',
          status: 'Pending',
          date: '20/05/2022'
        },
        {
          avatar: '/images/word-icon.png',
          categories: 'Other',
          type: 'Word',
          status: 'Upload',
          date: '20/05/2022'
        },
        {
          avatar: '/images/excel-icon.png',
          categories: 'ACH Information',
          type: 'Excel',
          status: 'Upload',
          date: '20/05/2022'
        }
        ],
        loadHistoryData: [
        {
          status: 'Open',
          brokerage_name: 'Bill Sanders',
          broker_id: 'BR131412',
          broker_name: 'Mario Kempes',
          origin: 'Dallas, TX',
          destination: 'Phoenix, AZ',
          pick_up_date_time: '17 Oct, 2020',
          delivery_date_time: '18 Oct, 2020',
          revenue: '$4,000',
          equipment_type: 'Truck',
          commodity: 'Test',
          weight: '450lps'
        },
        {
          status: 'Assigned',
          brokerage_name: 'Bill Sanders',
          broker_id: 'BR131412',
          broker_name: 'Mario Kempes',
          origin: 'Dallas, TX',
          destination: 'Phoenix, AZ',
          pick_up_date_time: '17 Oct, 2020',
          delivery_date_time: '18 Oct, 2020',
          revenue: '$4,000',
          equipment_type: 'Truck',
          commodity: 'Test',
          weight: '450lps'
        },
        {
          status: 'At Pickup',
          brokerage_name: 'Bill Sanders',
          broker_id: 'BR131412',
          broker_name: 'Mario Kempes',
          origin: 'Dallas, TX',
          destination: 'Phoenix, AZ',
          pick_up_date_time: '17 Oct, 2020',
          delivery_date_time: '18 Oct, 2020',
          revenue: '$4,000',
          equipment_type: 'Truck',
          commodity: 'Test',
          weight: '450lps'
        },
        {
          status: 'At Pickup',
          brokerage_name: 'Bill Sanders',
          broker_id: 'BR131412',
          broker_name: 'Mario Kempes',
          origin: 'Dallas, TX',
          destination: 'Phoenix, AZ',
          pick_up_date_time: '17 Oct, 2020',
          delivery_date_time: '18 Oct, 2020',
          revenue: '$4,000',
          equipment_type: 'Truck',
          commodity: 'Test',
          weight: '450lps'
        },
        {
          status: 'Delivered',
          brokerage_name: 'Bill Sanders',
          broker_id: 'BR131412',
          broker_name: 'Mario Kempes',
          origin: 'Dallas, TX',
          destination: 'Phoenix, AZ',
          pick_up_date_time: '17 Oct, 2020',
          delivery_date_time: '18 Oct, 2020',
          revenue: '$4,000',
          equipment_type: 'Truck',
          commodity: 'Test',
          weight: '450lps'
        },
        {
          status: 'Invoiced',
          brokerage_name: 'Bill Sanders',
          broker_id: 'BR131412',
          broker_name: 'Mario Kempes',
          origin: 'Dallas, TX',
          destination: 'Phoenix, AZ',
          pick_up_date_time: '17 Oct, 2020',
          delivery_date_time: '18 Oct, 2020',
          revenue: '$4,000',
          equipment_type: 'Truck',
          commodity: 'Test',
          weight: '450lps'
        },
        {
          status: 'Paid',
          brokerage_name: 'Bill Sanders',
          broker_id: 'BR131412',
          broker_name: 'Mario Kempes',
          origin: 'Dallas, TX',
          destination: 'Phoenix, AZ',
          pick_up_date_time: '17 Oct, 2020',
          delivery_date_time: '18 Oct, 2020',
          revenue: '$4,000',
          equipment_type: 'Truck',
          commodity: 'Test',
          weight: '450lps'
        }
        ],
        contractRatesData: [
        {
          avatar: '/images/Ellipse_4.png',
          contract_load_id: 'LD09621',
          first_name: 'Kristin Watson',
          carrier_id: 'CR131412',
          origin: 'Roanoke,TX',
          destination: 'Dallas,TX',
          equipment_type: 'Box Truck',
          frequency: '2',
          interval: 'Week',
          rate: '18%',
          priority: '1st',
          start_date: '20/05/2022',
          exp_date: '20/05/2022'
        },
        {
          avatar: '/images/Ellipse_4.png',
          contract_load_id: 'LD09621',
          first_name: 'Darlene Robert',
          carrier_id: 'CR131412',
          origin: 'Roanoke,TX',
          destination: 'Dallas,TX',
          equipment_type: 'Box Truck',
          frequency: '2',
          interval: 'Week',
          rate: '18%',
          priority: '1st',
          start_date: '20/05/2022',
          exp_date: '20/05/2022'
        },
        {
          avatar: '/images/Ellipse_4.png',
          contract_load_id: 'LD09621',
          first_name: 'Ralph Edwards',
          carrier_id: 'CR131412',
          origin: 'Roanoke,TX',
          destination: 'Dallas,TX',
          equipment_type: 'Box Truck',
          frequency: '2',
          interval: 'Week',
          rate: '18%',
          priority: '1st',
          start_date: '20/05/2022',
          exp_date: '20/05/2022'
        },
        {
          avatar: '/images/Ellipse_4.png',
          contract_load_id: 'LD09621',
          first_name: 'Cody Fisher',
          carrier_id: 'CR131412',
          origin: 'Roanoke,TX',
          destination: 'Dallas,TX',
          equipment_type: 'Box Truck',
          frequency: '2',
          interval: 'Week',
          rate: '18%',
          priority: '1st',
          start_date: '20/05/2022',
          exp_date: '20/05/2022'
        },
        {
          avatar: '/images/Ellipse_4.png',
          contract_load_id: 'LD09621',
          first_name: 'Esther Howard',
          carrier_id: 'CR131412',
          origin: 'Roanoke,TX',
          destination: 'Dallas,TX',
          equipment_type: 'Box Truck',
          frequency: '2',
          interval: 'Week',
          rate: '18%',
          priority: '1st',
          start_date: '20/05/2022',
          exp_date: '20/05/2022'
        },
        {
          avatar: '/images/Ellipse_4.png',
          contract_load_id: 'LD09621',
          first_name: 'Guy Hawkins',
          carrier_id: 'CR131412',
          origin: 'Roanoke,TX',
          destination: 'Dallas,TX',
          equipment_type: 'Box Truck',
          frequency: '2',
          interval: 'Week',
          rate: '18%',
          priority: '1st',
          start_date: '20/05/2022',
          exp_date: '20/05/2022'
        },
        {
          avatar: '/images/Ellipse_4.png',
          contract_load_id: 'LD09621',
          first_name: 'Jerome Bell',
          carrier_id: 'CR131412',
          origin: 'Roanoke,TX',
          destination: 'Dallas,TX',
          equipment_type: 'Box Truck',
          frequency: '2',
          interval: 'Week',
          rate: '18%',
          priority: '1st',
          start_date: '20/05/2022',
          exp_date: '20/05/2022'
        }
        ],
        notesData: [
        {
          avatar: '/images/Ellipse_4.png',
          name: 'Cameron Williamson',
          load: 'Test',
          date: 'Nov 12, 2022'
        },
        {
          avatar: '/images/Ellipse_4.png',
          name: 'Brooklyn Simmons',
          load: 'Test',
          date: 'Nov 12, 2022'
        },
        {
          avatar: '/images/Ellipse_4.png',
          name: 'Albert Flores',
          load: 'Test',
          date: 'Nov 12, 2022'
        },
        {
          avatar: '/images/Ellipse_4.png',
          name: 'Annette Black',
          load: 'Test',
          date: 'Nov 12, 2022'
        }
        ],
        pictureURL: {
          url: '/images/carrier-profile.png'
        },
      }
    },
    computed: {
      response (): CustomersDetails {
        return (this.$store.getters['Broker/customersDetails/customer'])
      },
      getTitle () {
        switch (this.selectedTab) {
          case 0:
            return 'Contract Rates'
          case 1:
            return 'Documents'
          case 2:
            return 'Load History'
          case 3:
            return 'Notes'
          default:
            return ''
        }
      },
      getHeader () {
        switch (this.selectedTab) {
          case 0:
            return this.contractRatesHeaders
          case 1:
            return this.documentsHeaders
          case 2:
            return this.loadHistoryHeaders
          case 3:
            return this.notesHeaders
          default:
            return {}
        }
      },
      getTableData () {
        switch (this.selectedTab) {
          case 0:
            return this.contractRatesData
          case 1:
            return this.documents
          case 2:
            return this.loadHistory
          case 3:
            return this.loadHistory
          default:
            return []
        }
      },
      getPageCount () {
        switch (this.selectedTab) {
          case 0:
            return this.contractPageCount
          case 1:
            return this.documentPageCount
          case 2:
            return this.loadHistoryPageCount
          default:
            return 0
        }
      },
      getRequest () {
        switch (this.selectedTab) {
          case 0:
            return this.getContracts
          case 1:
            return this.getDocuments
          case 2:
            return this.getLoads
          default:
            return null
        }
      }
    },
    created () {
      this.getCustomer(parseInt(this.$route.params.id, 10))
      this.getContracts(1)
      this.getDocuments(1)
      this.getLoads(1)
    },
    methods: {
      ...mapActions({
        getCustomer: (action, id) => action('Broker/customersDetails/getCustomer', id),
        getContract: (action, id) => action('Broker/contractRates/getContract', id),
        getContracts: (action, id) => action('Broker/contractRates/getContractByBrokerId', id),
        getDocument: (action, id) => action('Broker/documentsDetails/getDocument', id),
        getDocuments: (action, id) => action('Broker/documentsDetails/getDocumentsByBrokerId', id),
        getLoad: (action, id) => action('Broker/loadHistory/getLoad', id),
        getLoads: (action, id) => action('Broker/loadHistory/getLoadsByBrokerId', id)
      }),
      select (index: any) {
        this.selectedTab = index
        this.getKey()
      },
      getKey () {
        this.tableKey = Math.random()
      },
      drawer (componentName: any) {
        this.$refs.drawer.showDrawer(componentName)
      }
    }
  })
  </script>
<style scoped>
</style>
  