<template>
  <div class="w-full">
    <Drawer ref="drawer" />
    <PageHeader
      title="Customer Profile"
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
        <div class="col-8 flex">
          <div class="col-3">
            <div class="relative w-[152px] h-[152px] mx-auto">
              <img :src="pictureURL.url" alt="driver-picture" class="w-full h-full object-cover rounded-full">
              <div
                :class="[
                  { 'bg-green-400': response.status === 0 },
                  { 'bg-lime': response.status !== 0 },
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
                  response.status === 0 ? "Active" : "Inactive"
                }}</span>
              </div>
            </div>
          </div>
          <div class="pl-10 col-12">
            <div class="mb-6">
              <h5 class="text-gray-800 font-semibold">
                {{ response.customer_name }}
              </h5>
              <span class="text-c-1 text-gray">{{ response.customer_address }}</span>
            </div>
            <div>
              <div class="row">
                <InfoBox
                  :value="response?.customer_phone_number"
                  title="Phone Number"
                  icon="call"
                  color="grey-dark"
                  :alpha="300"
                  class="col-4 mb-5"
                />
                <InfoBox
                  :value="response?.sales_representative"
                  title="Sales Rep"
                  icon="user"
                  color="grey-dark"
                  :alpha="300"
                  class="col-4 mb-5"
                />
                <InfoBox
                  :value="`$ ${testData?.credit_limit}`"
                  title="Credit Limit"
                  icon="stickynote"
                  color="grey-dark"
                  :alpha="300"
                  class="col-4 mb-5"
                />
              </div>
              <div class="row">
                <InfoBox
                  :value="response?.customer_business_email"
                  title="Business E-mail"
                  icon="sms"
                  color="grey-dark"
                  :alpha="300"
                  class="col-4 mb-5"
                />
                <InfoBox
                  :value="response?.account_manager"
                  title="Account Manager"
                  icon="user-octagon"
                  color="grey-dark"
                  :alpha="300"
                  class="col-4 mb-5"
                />
                <InfoBox
                  :value="`$ ${testData?.available_credit}`"
                  title="Available Credit"
                  icon="clipboard-text"
                  color="grey-dark"
                  :alpha="300"
                  class="col-4 mb-5"
                />
              </div>
              <div class="row">
                <InfoBox
                  :value="response?.shipper_id"
                  title="Customer ID"
                  icon="bill"
                  color="grey-dark"
                  :alpha="300"
                  class="col-4 mb-5"
                />
                <InfoBox
                  :value="response?.avg_days_to_pay"
                  title="Average Days to Pay"
                  icon="calendar-tick"
                  color="grey-dark"
                  :alpha="300"
                  class="col-4 mb-5"
                />
                <InfoBox
                  :value="`$ ${testData?.current_balance}`"
                  title="Current Balance"
                  icon="clipboard-text"
                  color="grey-dark"
                  :alpha="300"
                  class="col-4 mb-5"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        class="!w-9 !h-9 !rounded-full border border-gray-300 absolute top-4 right-4 flex justify-center cursor-pointer items-center"
        @click="drawer('EditListeningProfile')"
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
    <div class="mb-20">
      <widget title="Yearly Revenue & Loads" :no-border="true">
        <div class="row">
          <div class="col-8">
            <div id="chart">
              <apexchart
                v-if="dataFetched"
                type="bar"
                height="350"
                :options="options"
                :series="series"
              />
            </div>
          </div>
          <div class="col-4">
            <div class="mt-16 ml-10">
              <div class="mb-5">
                <div class="d-block text-grey-dark-200 text-c-1">
                  Current Balance
                </div>
                <div class="flex items-center">
                  <h2 class="font-medium">
                    {{ '$' + yearlySummary.current_balance }}
                  </h2>
                  <Badge
                    title="7.4%"
                    icon="arrow-up-3"
                    icon-color="green"
                    :icon-alpha="800"
                    :size="SizeTypeEnum.LG"
                    :class="[{'bg-green-100 text-green-800' : true}, {'!text-xl': true},{'ml-2': true}]"
                  />
                </div>
                <div class="d-block text-grey-dark-200 text-c-1">
                  Increase %10 since last week
                </div>
              </div>
              <div class="mb-5">
                <div class="d-block text-grey-dark-200 text-c-1">
                  Total Revenue
                </div>
                <div class="flex items-center">
                  <h2 class="font-medium">
                    {{ '$' + yearlySummary.total_revenue }}
                  </h2>
                  <Badge
                    title="7.4%"
                    icon="arrow-up-3"
                    icon-color="green"
                    :icon-alpha="800"
                    :size="SizeTypeEnum.LG"
                    :class="[{'bg-green-100 text-green-800' : true}, {'!text-xl': true},{'ml-2': true}]"
                  />
                </div>
                <div class="d-block text-grey-dark-200 text-c-1">
                  Increase %10 since last week
                </div>
              </div>
              <div class="mb-5">
                <div class="d-block text-grey-dark-200 text-c-1">
                  Total Loads
                </div>
                <div class="flex items-center">
                  <h2 class="font-medium">
                    {{ '$' + yearlySummary.total_loads }}
                  </h2>
                  <Badge
                    title="7.4%"
                    icon="arrow-down"
                    icon-color="red"
                    :icon-alpha="800"
                    :size="SizeTypeEnum.LG"
                    :class="[{'bg-red-100 text-red-800' : true}, {'!text-xl': true},{'ml-2': true}]"
                  />
                </div>
                <div class="d-block text-grey-dark-200 text-c-1">
                  Increase %10 since last week
                </div>
              </div>
            </div>
          </div>
        </div>
      </widget>
    </div>
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
        <div class="col-12">
          <div class="pl-10 col-12">
            <div class="col-2">
            </div>
            <div class="mb-6">
              <h5 class="text-gray-800 font-semibold">
                Contact Information
              </h5>
            </div>
            <div>
              <div class="row mb-10">
                <InfoBox
                  :value="response.customer_legal_name"
                  title="Legal Name"
                  icon="ranking-1"
                  color="jordy-blue"
                  :alpha="300"
                  class="col-2 mb-5"
                />
                <InfoBox
                  :value="response.customer_dba_name"
                  title="DBA"
                  icon="award"
                  color="jordy-blue"
                  :alpha="300"
                  class="col-2 mb-5"
                />
                <InfoBox
                  :value="response.customer_address"
                  title="Address"
                  icon="location"
                  color="jordy-blue"
                  :alpha="300"
                  class="col-3 mb-5"
                />
                <InfoBox
                  :value="response.contact_phone_number"
                  title="Phone Number"
                  icon="call"
                  color="jordy-blue"
                  :alpha="300"
                  class="col-2 mb-5"
                />
                <InfoBox
                  :value="response.bill_fax"
                  title="Fax"
                  icon="archive-2"
                  color="jordy-blue"
                  :alpha="300"
                  class="col-3 mb-5"
                />
              </div>
            </div>
          </div>
          <div class="pl-10 col-12">
            <div class="mb-6">
              <h5 class="text-gray-800 font-semibold">
                Billing Information
              </h5>
            </div>
            <div>
              <div class="row mb-10">
                <InfoBox
                  :value="response.bill_method"
                  title="Invoicing Method"
                  icon="recovery-convert"
                  color="purple"
                  :alpha="500"
                  class="col-2 mb-5"
                />
                <InfoBox
                  :value="response.bill_frequency"
                  title="Invoice Frequency"
                  icon="refresh"
                  color="purple"
                  :alpha="500"
                  class="col-2 mb-5"
                />
                <InfoBox
                  :value="response.bill_type"
                  title="Transmission Type"
                  icon="bill"
                  color="purple"
                  :alpha="500"
                  class="col-2 mb-5"
                />
                <InfoBox
                  :value="response.pod_required"
                  title="POD Required"
                  icon="document-text"
                  color="purple"
                  :alpha="500"
                  class="col-2 mb-5"
                />
                <InfoBox
                  :value="response.payment_term"
                  title="Payment Terms"
                  icon="moneys"
                  color="purple"
                  :alpha="500"
                  class="col-2 mb-5"
                />
                <InfoBox
                  :value="`$ ${response.credit_limit}`"
                  title="Credit Limit"
                  icon="card"
                  color="purple"
                  :alpha="500"
                  class="col-2 mb-5"
                />
              </div>
            </div>
          </div>
          <div class="pl-10 col-12">
            <div class="mb-6">
              <h5 class="text-gray-800 font-semibold">
                Contact Information
              </h5>
            </div>
            <div>
              <div class="row">
                <InfoBox
                  :value="response.contact_name"
                  title="Name"
                  icon="ranking-1"
                  color="green"
                  :alpha="400"
                  class="col-2 mb-5"
                />
                <InfoBox
                  :value="response.contact_phone_number"
                  title="Phone Number"
                  icon="call"
                  color="green"
                  :alpha="400"
                  class="col-2 mb-5"
                />
                <InfoBox
                  :value="response.contact_email"
                  title="E-mail"
                  icon="sms"
                  color="green"
                  :alpha="400"
                  class="col-2 mb-5"
                />
                <InfoBox
                  :value="response.contact_role"
                  title="Role"
                  icon="user-edit"
                  color="green"
                  :alpha="400"
                  class="col-2 mb-5 ml-8"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row mb-5">
      <div class="col-12 mb-8">
        <div class="row mx-0">
          <div class="col-auto p-0 pr-2">
            <TabButton :active="(selectedTab === 0)" title="Contract Rates" color="green" @click="select(0)" />
          </div>
          <div class="col-auto  p-0  pr-2">
            <TabButton :active="(selectedTab === 1)" title="Documents" color="green" @click="select(1)" />
          </div>
          <div class="col-auto p-0 pr-2">
            <TabButton :active="(selectedTab === 2)" title="Load History" color="green" @click="select(2)" />
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
        >
          <template #item-contract_load_id="{ data, index }">
            <div class="flex">
              <div class="col-auto text-dark-blue">
                <span>
                  {{ data[index].contract_load_id }}
                </span>
              </div>
            </div>
          </template>
          <template #item-document_type="{ data, index }">
            <div class="flex items-center">
              <div class="flex items-center justify-center mr-2">
                <img :src="data[index].avatar" :alt="data[index].type">
              </div>
              <div class="col-auto pr-0 mr-2">
                <span class="block whitespace-nowrap">
                  {{ data[index].document_type }}
                </span>
              </div>
            </div>
          </template>
          <template #item-document_status="{ item }">
            <Badge
              :title="item.document_status"
              :class="[
                {'bg-green-100 text-green-800' : item.document_status === 'Valid'},
                {'bg-red-100 text-red-600' : item.document_status === 'Expired'},
              ]"
              :size="SizeTypeEnum.MD"
            />
          </template>
          <template #item-load_status="{ item }">
            <Badge
              :title="item.load_status"
              :class="[
                { 'bg-orange-100 text-[#FFAA00]': item.load_status === 'Picked' },
                { 'bg-[#ECFDF3] text-green-900': item.load_status === 'Delivered' },
              ]"
              :size="SizeTypeEnum.MD"
            />
          </template>
          <template #item-date="{item}">
            <Icon
              variant="bulk"
              icon="calendar"
              color="grey-dark"
              :alpha="200"
              class="mr-2 w-5 h-5"
            />
            <span class="whitespace-nowrap">{{ item.date }}</span>
          </template>
          <template #item-carrier_name="{ item }">
            <div class="flex items-center">
              <div class="col-auto pr-0 mr-2">
                <img v-if="item?.avatar !== null && item?.avatar !== undefined" :src="item.avatar" :alt="item.carrier_name" class="rounded-full w-10 h-10">
              </div>
              <div class="col-auto">
                <span class="block text-c-1 font-semibold whitespace-nowrap">
                  {{ item.carrier_name }}
                </span>
              </div>
            </div>
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
import { ContractRatesDetails } from '~/models/Broker/contractRates/contractRatesDetails'
import { CustomersDetails } from '~/models/Broker/customersDetails/customersDetails'
import { DocumentsDetails } from '~/models/Broker/documentsDetails/documentsDetails'
import { LoadHistoryDetails } from '~/models/Broker/loadHistory/loadHistoryDetails'
import { YearlySummary } from '~/models/Broker/yearlySummary/yearlySummary'
export default Vue.extend({
  layout: 'Dashboard',
  data () {
    return {
      dataFetched: false,
      ActionTypeEnum,
      ButtonTypeEnum,
      SizeTypeEnum,
      selectedTab: 0,
      testData: {
        credit_limit: 1500,
        available_credit: 1000,
        current_balance: 500
      },
      // contactsHeaders: {
      //   first_name: {
      //     label: 'First Name'
      //   },
      //   last_name: {
      //     label: 'Last Name'
      //   },
      //   verified_contract: {
      //     label: 'Verified Contract'
      //   },
      //   role: {
      //     label: 'Role'
      //   },
      //   email: {
      //     label: 'Email'
      //   },
      //   phone_number: {
      //     label: 'Phone Number'
      //   }
      // },
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
      // response: {
      //   companyName: 'LC Waikiki, Inc.',
      //   address: '2188 Thornridge Cir. Syracuse, Connecticut 35624',
      //   phone: '(229) 555-0109',
      //   mcNumber: 'Ellen Rose',
      //   creditLimit: '$250,00.00',
      //   creditLimit2: '$1,000.000',
      //   email: 'sara.cruz@example.com',
      //   dotNumber: 'Ian Cooper',
      //   price: '$200,000',
      //   netName: 'Net 30',
      //   borkerID: 'SHP-4656521',
      //   averageDaysToPay: '3 Days',
      //   status: 0,
      //   contactInformation: 'Contact Information',
      //   contactAdress: 'Pharetra, velit, commodo vivamus diam ut mauris.',
      //   legalName: 'LCW',
      //   dba: 'LCW, Inc.',
      //   addressInfo: '8502 Preston Rd. Inglewood, Maine 98380',
      //   phoneNumberInfo: '(270) 555-0117',
      //   faxInfo: '07-4041-9059',
      //   bilingInformation: 'Billing Information',
      //   bilingAdress: 'Pharetra, velit, commodo vivamus diam ut mauris.',
      //   platform: 'Platform Invoice',
      //   monthly: 'Monthly',
      //   shipments: 'Single Shipments',
      //   pod: 'Yes',
      //   payment: 'Net 60',
      //   contactName: 'Ellen Rose',
      //   phoneNumber: '(270) 555-0117',
      //   role: 'Owner',
      pictureURL: {
        url: '/images/lcw.png'
      },
      //   brokerID: 'BRK4656521',
      //   fscPercentage: 95
      // },
      contractRatesData: [
        {
          contract_load_id: 'BL - 093662',
          origin: 'Roanoke, TX',
          destination: 'Roanoke, TX',
          equipment_type: 'Truck',
          frequency: 'Monthly',
          interval: '$500 / 12 %',
          rate: '$780',
          start_date: '21/12/2022',
          end_date: '27/12/2022'
        },
        {
          contract_load_id: 'BL - 093662',
          origin: 'Roanoke, TX',
          destination: 'Roanoke, TX',
          equipment_type: 'Truck',
          frequency: 'Monthly',
          interval: '$500 / 12 %',
          rate: '$780',
          start_date: '21/12/2022',
          end_date: '27/12/2022'
        },
        {
          contract_load_id: 'BL - 093662',
          origin: 'Roanoke, TX',
          destination: 'Roanoke, TX',
          equipment_type: 'Truck',
          frequency: 'Monthly',
          interval: '$500 / 12 %',
          rate: '$780',
          start_date: '21/12/2022',
          end_date: '27/12/2022'
        },
        {
          contract_load_id: 'BL - 093662',
          origin: 'Roanoke, TX',
          destination: 'Roanoke, TX',
          equipment_type: 'Truck',
          frequency: 'Monthly',
          interval: '$500 / 12 %',
          rate: '$780',
          start_date: '21/12/2022',
          end_date: '27/12/2022'
        },
        {
          contract_load_id: 'BL - 093662',
          origin: 'Roanoke, TX',
          destination: 'Roanoke, TX',
          equipment_type: 'Truck',
          frequency: 'Monthly',
          interval: '$500 / 12 %',
          rate: '$780',
          start_date: '21/12/2022',
          end_date: '27/12/2022'
        }, {
          contract_load_id: 'BL - 093662',
          origin: 'Roanoke, TX',
          destination: 'Roanoke, TX',
          equipment_type: 'Truck',
          frequency: 'Monthly',
          interval: '$500 / 12 %',
          rate: '$780',
          start_date: '21/12/2022',
          end_date: '27/12/2022'
        },
        {
          contract_load_id: 'BL - 093662',
          origin: 'Roanoke, TX',
          destination: 'Roanoke, TX',
          equipment_type: 'Truck',
          frequency: 'Monthly',
          interval: '$500 / 12 %',
          rate: '$780',
          start_date: '21/12/2022',
          end_date: '27/12/2022'
        }
      ],
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
          avatar: '/images/Ellipse_4.png',
          status: 'Open',
          brokerage_name: 'Bill Sanders',
          custRef: 'BR131412',
          origin: 'Dallas, TX',
          destination: 'Phoenix, AZ',
          pick_up_date_time: '17 Oct, 2020',
          delivery_date_time: '18 Oct, 2020',
          revenue: '$4,000',
          cost: '$5,000',
          carrier_name: 'Kristin W...',
          equipment_type: 'Truck',
          commodity: 'Test',
          weight: '450lps'
        },
        {
          status: 'Assigned',
          brokerage_name: 'Bill Sanders',
          custRef: 'BR131412',
          origin: 'Dallas, TX',
          destination: 'Phoenix, AZ',
          pick_up_date_time: '17 Oct, 2020',
          delivery_date_time: '18 Oct, 2020',
          revenue: '$4,000',
          cost: '$5,000',
          carrier_name: 'Guy Haw...',
          equipment_type: 'Truck',
          commodity: 'Test',
          weight: '450lps'
        },
        {
          avatar: '/images/Ellipse_4.png',
          status: 'At Pickup',
          brokerage_name: 'Bill Sanders',
          custRef: 'BR131412',
          origin: 'Dallas, TX',
          destination: 'Phoenix, AZ',
          pick_up_date_time: '17 Oct, 2020',
          delivery_date_time: '18 Oct, 2020',
          revenue: '$4,000',
          cost: '$5,000',
          carrier_name: 'Jenny Wil...',
          equipment_type: 'Truck',
          commodity: 'Test',
          weight: '450lps'
        },
        {
          status: 'At Pickup',
          brokerage_name: 'Bill Sanders',
          custRef: 'BR131412',
          origin: 'Dallas, TX',
          destination: 'Phoenix, AZ',
          pick_up_date_time: '17 Oct, 2020',
          delivery_date_time: '18 Oct, 2020',
          revenue: '$4,000',
          cost: '$5,000',
          carrier_name: 'Leslie Ale...',
          equipment_type: 'Truck',
          commodity: 'Test',
          weight: '450lps'
        },
        {
          avatar: '/images/Ellipse_4.png',
          status: 'Delivered',
          brokerage_name: 'Bill Sanders',
          custRef: 'BR131412',
          origin: 'Dallas, TX',
          destination: 'Phoenix, AZ',
          pick_up_date_time: '17 Oct, 2020',
          delivery_date_time: '18 Oct, 2020',
          revenue: '$4,000',
          cost: '$5,000',
          carrier_name: 'Courtney...',
          equipment_type: 'Truck',
          commodity: 'Test',
          weight: '450lps'
        },
        {
          avatar: '/images/Ellipse_4.png',
          status: 'Invoiced',
          brokerage_name: 'Bill Sanders',
          custRef: 'BR131412',
          origin: 'Dallas, TX',
          destination: 'Phoenix, AZ',
          pick_up_date_time: '17 Oct, 2020',
          delivery_date_time: '18 Oct, 2020',
          revenue: '$4,000',
          cost: '$5,000',
          carrier_name: 'Floyd Miles',
          equipment_type: 'Truck',
          commodity: 'Test',
          weight: '450lps'
        },
        {
          avatar: '/images/Ellipse_4.png',
          status: 'Paid',
          brokerage_name: 'Bill Sanders',
          custRef: 'BR131412',
          origin: 'Dallas, TX',
          destination: 'Phoenix, AZ',
          pick_up_date_time: '17 Oct, 2020',
          delivery_date_time: '18 Oct, 2020',
          revenue: '$4,000',
          cost: '$5,000',
          carrier_name: 'Robert Fox',
          equipment_type: 'Truck',
          commodity: 'Test',
          weight: '450lps'
        }
      ],
      testDataContacts: [{
        first_name: 'Name',
        last_name: 'LastName',
        verified_contract: 'verCont',
        role: 'myrole',
        email: 'myemail@x.com',
        phone_number: '0502123523'
      }],
      options: {
        tooltip: {
          enabled: false
        },
        chart: {
          stacked: true,
          toolbar: {
            show: false
          }
        },
        dataLabels: {
          enabled: false
        },
        colors: ['#7C5CFC', '#CABDF9'],
        xaxis: {
          categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        },
        plotOptions: {
          bar: {
            borderRadius: 8,
            borderRadiusApplication: 'end',
            borderRadiusWhenStacked: 'last'
          }
        },
        legend: {
          itemMargin: {
            horizontal: 24,
            vertical: 0
          },
          labels: {
            colors: ['#92969F']
          },
          position: 'top',
          horizontalAlign: 'right',
          fontSize: 12,
          fontFamily: 'Euclid Circular A',
          fontWeight: 400,
          markers: {
            width: 6,
            height: 16,
            radius: 9999,
            offsetY: 3,
            offsetX: -10
          }
        }
      },
      series: [
        {
          name: 'Loads',
          data: []
        },
        {
          name: 'Revenue',
          data: []
        }
      ]
    }
  },
  computed: {
    response (): CustomersDetails {
      return (this.$store.getters['Broker/customersDetails/customer'])
    },
    yearlySummary (): YearlySummary {
      return (this.$store.getters['Broker/yearlySummary/yearlySummary'])
    },
    contracts (): ContractRatesDetails {
      return (this.$store.getters['Broker/contractRates/brokerContracts'])
    },
    contractPageCount () {
      return (this.$store.getters['Broker/contractRates/pageCount'])
    },
    documents (): DocumentsDetails {
      return (this.$store.getters['Broker/documentsDetails/brokerDocuments'])
    },
    documentPageCount () {
      return (this.$store.getters['Broker/documentsDetails/pageCount'])
    },
    loadHistory (): LoadHistoryDetails {
      return (this.$store.getters['Broker/loadHistory/brokerLoads'])
    },
    loadHistoryPageCount () {
      return (this.$store.getters['Broker/loadHistory/pageCount'])
    },
    scorePosition () {
      const test = 180 * (this.response.fscPercentage / 100)
      if (test >= 90) {
        return (test - 90)
      } else {
        return (test + 270)
      }
      // return ((180 * (this.response.fscPercentage / 100)) - this.response.fscPercentage)
    },
    getTitle () {
      switch (this.selectedTab) {
        case 0:
          return 'Contract Rates'
        case 1:
          return 'Documents'
        case 2:
          return 'Load History'
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
        default:
          return {}
      }
    },
    getTableData () {
      switch (this.selectedTab) {
        case 0:
          return this.contracts
        case 1:
          return this.documents
        case 2:
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
    this.getYearlySummary(3).then(() => {
      const yearlySummaryData: YearlySummary = this.$store.getters['Broker/yearlySummary/yearlySummary']
      console.log('Data..:')

      console.log(yearlySummaryData)

      this.series[0].data.push(yearlySummaryData.loads_jan)
      this.series[0].data.push(yearlySummaryData.loads_feb)
      this.series[0].data.push(yearlySummaryData.loads_mar)
      this.series[0].data.push(yearlySummaryData.loads_apr)
      this.series[0].data.push(yearlySummaryData.loads_may)
      this.series[0].data.push(yearlySummaryData.loads_jun)
      this.series[0].data.push(yearlySummaryData.loads_jul)
      this.series[0].data.push(yearlySummaryData.loads_aug)
      this.series[0].data.push(yearlySummaryData.loads_sep)
      this.series[0].data.push(yearlySummaryData.loads_oct)
      this.series[0].data.push(yearlySummaryData.loads_nov)
      this.series[0].data.push(yearlySummaryData.loads_dec)

      this.series[1].data.push(yearlySummaryData.revenue_jan)
      this.series[1].data.push(yearlySummaryData.revenue_feb)
      this.series[1].data.push(yearlySummaryData.revenue_mar)
      this.series[1].data.push(yearlySummaryData.revenue_apr)
      this.series[1].data.push(yearlySummaryData.revenue_may)
      this.series[1].data.push(yearlySummaryData.revenue_jun)
      this.series[1].data.push(yearlySummaryData.revenue_jul)
      this.series[1].data.push(yearlySummaryData.revenue_aug)
      this.series[1].data.push(yearlySummaryData.revenue_sep)
      this.series[1].data.push(yearlySummaryData.revenue_oct)
      this.series[1].data.push(yearlySummaryData.revenue_nov)
      this.series[1].data.push(yearlySummaryData.revenue_dec)
    }).catch((err:unknown) => {
      console.log(err)
    }).finally(() => {
      this.dataFetched = true
    })
  },
  methods: {
    ...mapActions({
      getCustomer: (action, id) => action('Broker/customersDetails/getCustomer', id),
      getYearlySummary: (action, id) => action('Broker/yearlySummary/getYearlySummary', id),
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
.performance-bar {
  background-image: url("/images/performance_bar.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: relative;
  width: 200px;
  height: 100px;
}

.performance-bar .indicator {
  position: absolute;
  top: -3px;
  left: calc(50% - 2.5px);
  bottom: 0;
  width: 5px;
  border-radius: 5px;
  transform: rotate(360deg);
  transform-origin: bottom center;
  transition: all 0.5s ease-in-out;
}

.performance-bar .indicator .indicator-border {
  background: rgba(255, 255, 255, .5);
  width: 7px;
  height: 42px;
  position: absolute;
  border-radius: 5px;
  backdrop-filter: blur(10px);
}
</style>
