<template>
  <div class="w-full">
    <Drawer ref="drawer" />
    <PageHeader title="Company Profile" class="mb-8" />
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
        <div class="col-12 flex">
          <div class="col-2">
            <div class="relative w-[152px] h-[152px] mx-auto">
              <img :src="response.pictureURL.url" alt="driver-picture" class="w-full h-full object-cover rounded-full">
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
            <div class="flex justify-center items-center pt-7">
              <span class="text-c-2 font-medium text-gray-800">
                {{ brokers?.verified_status }}
              </span>
            </div>
          </div>
          <div class="pl-10 col-7">
            <div class="mb-6">
              <h5 class="text-gray-800 font-semibold">
                {{ brokers?.company_name }}
              </h5>
              <span class="text-c-1 text-gray">{{ brokers?.company_address_line1 }}</span>
            </div>
            <div>
              <div class="row">
                <InfoBox
                  :value="brokers?.broker_phone_number"
                  title="Phone Number"
                  icon="call"
                  color="grey-dark"
                  :alpha="300"
                  class="col-4 mb-5"
                />
                <InfoBox
                  :value="brokers?.broker_mc_number"
                  title="MC Number"
                  icon="clipboard-text"
                  color="grey-dark"
                  :alpha="300"
                  class="col-4 mb-5"
                />
                <InfoBox
                  :value="`$ ${brokers?.credit_limit}`"
                  title="Credit Limit"
                  icon="stickynote"
                  color="grey-dark"
                  :alpha="300"
                  class="col-4 mb-5"
                />
              </div>
              <div class="row">
                <InfoBox
                  :value="brokers?.broker_email"
                  title="Business E-mail"
                  icon="sms"
                  color="grey-dark"
                  :alpha="300"
                  class="col-4 mb-5"
                />
                <InfoBox
                  :value="brokers?.broker_dot_number"
                  title="DOT Number"
                  icon="clipboard-text"
                  color="grey-dark"
                  :alpha="300"
                  class="col-4 mb-5"
                />
              </div>
              <div class="row">
                <InfoBox
                  :value="brokers?.id"
                  title="Broker ID"
                  icon="bill"
                  color="grey-dark"
                  :alpha="300"
                  class="col-4 mb-5"
                />
                <InfoBox
                  :value="brokers?.avg_days_to_pay"
                  title="Average Days to Pay"
                  icon="calendar-tick"
                  color="grey-dark"
                  :alpha="300"
                  class="col-4 mb-5"
                />
              </div>
            </div>
          </div>
          <div class="col-3 flex items-center justify-center">
            <div class="w-full performance-bar">
              <span class="indicator" :style="`transform: rotate(${scorePosition}deg)`">
                <span class="indicator-border shadow-sm shadow-gray-400" />
              </span>
              <div class="score text-center absolute bottom-0 left-0 right-0">
                <h1 class="font-semibold flex justify-center items-end">
                  {{ response.fscPercentage }}
                  <h3 class="font-medium leading-[38px]">
                    %
                  </h3>
                </h1>
                <span class="text-c-1 font-medium text-gray-400">Broker Score</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        class="!w-9 !h-9 !rounded-full border border-gray-300 absolute top-4 right-4 flex justify-center cursor-pointer items-center"
        @click="drawer('EditCompanyProfile')"
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
                  Total Revenue
                </div>
                <div class="flex items-center">
                  <h2 class="font-medium">
                    {{ '$' + yearlySummaries?.total_revenue }}
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
                    {{ '$' + yearlySummaries?.total_loads }}
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
    <div class="row mb-5">
      <div class="col-12 mb-8">
        <div class="row mx-0">
          <div class="col-auto p-0 pr-2">
            <TabButton
              :active="(selectedTab === 0)"
              title="Contacts"
              color="green"
              @click="select(0)"
            />
          </div>
          <div class="col-auto p-0 pr-2">
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
              title="Contract Rates"
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
      <Modal ref="fileModal" size="sm" position="center">
        <div slot="body" class="row flex items-center justify-center pt-8 pb-2">
          <div class="col-8 items-center justify-center">
            <h3 class="font-semibold text-center mb-2">
              Upload Document
            </h3>
          </div>
          <div class="col-8 mt-12">
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
              <div class="col-12 mt-12 mb-4">
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
                  @click="hideModal2()"
                >
                  Cancel
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </Modal>
      <Modal ref="noteModal" size="sm" position="center">
        <div slot="body" class="row flex items-center justify-center pt-16 pb-14">
          <div class="col-8 items-center justify-center">
            <h3 class="font-semibold text-center mb-2">
              Add Note
            </h3>
          </div>
          <div class="col-8 mt-10">
            <Form fclass="row my-2" @send="handleSubmit">
              <div class="col-12 mb-6">
                <label for="message" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Notes</label>
                <textarea id="message" rows="6" class="block p-2.5 w-full text-sm text-gray-900  rounded-lg border border-gray-300   dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
              </div>
              <div class="col-12 mt-12">
                <Button
                  :type="ButtonTypeEnum.GREEN"
                  :size="SizeTypeEnum.LG"
                  :action="ActionTypeEnum.SUBMIT"
                >
                  Add
                </Button>
                <Button
                  :type="ButtonTypeEnum.LINK"
                  :size="SizeTypeEnum.LG"
                  :action="ActionTypeEnum.BUTTON"
                  @click="hideNoteModal()"
                >
                  Cancel
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </Modal>
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
          :icon="selectedTab == 3 ? 'note-21': null"
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
          <div slot="actions" class="flex items-center justify-end">
            <div
              v-if="addArr[selectedTab]"
              class="!bg-black !w-14 !border-none m-input flex items-center justify-center cursor-pointer"
              @click="openAction()"
            >
              <Icon icon="add" color="white" class="w-6 h-6" />
            </div>
          </div>
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
import { BrokersDetails } from '~/models/Broker/brokersDetails/brokersDetails'
import { ContactsDetails } from '~/models/Broker/contactsDetails/contactsDetails'
import { ContractRatesDetails } from '~/models/Broker/contractRates/contractRatesDetails'
import { NotesDetails } from '~/models/Broker/notesDetails/notesDetails'
import { YearlySummary } from '~/models/Broker/yearlySummary/yearlySummary'
export default Vue.extend({
  layout: 'Dashboard',
  data () {
    return {
      dataFetched: false,
      ActionTypeEnum,
      ButtonTypeEnum,
      SizeTypeEnum,
      addArr: [true, true, true, true],
      selectedTab: 0,
      contactsHeaders: {
        contact_first_name: {
          label: 'First Name'
        },
        contact_last_name: {
          label: 'Last Name'
        },
        is_verified_contact: {
          label: 'Verified Contact'
        },
        contact_role: {
          label: 'Role'
        },
        contact_email_address: {
          label: 'E-mail'
        },
        contact_phone_number: {
          label: 'Phone Number'
        }
      },
      documentsHeaders: {
        document_category: {
          label: 'Categories'
        },
        document_type: {
          label: 'Type'
        },
        document_status: {
          label: 'Status'
        },
        document_upload_date: {
          label: 'Date'
        },
        actions: {
          label: 'Action'
        }
      },
      contractRatesHeaders: {
        broker_id: {
          label: 'Contract Load ID'
        },
        carrier_name: {
          label: 'Carrier Name'
        },
        carrier_id: {
          label: 'Carrier ID'
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
        contract_priority: {
          label: 'Priority'
        },
        contract_start_date: {
          label: 'Start Date'
        },
        contract_exp_date: {
          label: 'Exp. Date'
        }
      },
      loadHistoryHeaders: {
        load_status: {
          label: 'Load Status'
        },
        brokerage_name: {
          label: 'Brokerage Name'
        },
        broker_id: {
          label: 'Broker ID'
        },
        broker_name: {
          label: 'Broker Name'
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
        note_date: {
          label: 'Date'
        }
      },
      response: {
        companyName: 'Midfest Broker Inc.',
        address: '2188 Thornridge Cir. Syracuse, Connecticut 35624',
        phone: '(229) 555-0109',
        mcNumber: '1155152545651',
        creditLimit: '$250,00.00',
        email: 'sara.cruz@example.com',
        dotNumber: '12345698799',
        borkerID: 'BRK4656521',
        averageDaysToPay: '3 Days',
        status: 0,
        pictureURL: {
          url: '/images/Ellipse_50.png'
        },
        brokerID: 'BRK4656521',
        fscPercentage: 95
      },
      contactsData: [
        {
          avatar: '/images/Ellipse_4.png',
          first_name: 'Rose',
          last_name: 'Ellen',
          status: 'Yes',
          role: 'Boker',
          email: 'ellenrose@gmail.com',
          phone_number: '555-555-1214'
        },
        {
          avatar: '/images/Ellipse_4.png',
          first_name: 'Rose',
          last_name: 'Ellen',
          status: 'Yes',
          role: 'Boker',
          email: 'ellenrose@gmail.com',
          phone_number: '555-555-1214'
        },
        {
          avatar: '/images/Ellipse_4.png',
          first_name: 'Rose',
          last_name: 'Ellen',
          status: 'Yes',
          role: 'Boker',
          email: 'ellenrose@gmail.com',
          phone_number: '555-555-1214'
        },
        {
          avatar: '/images/Ellipse_4.png',
          first_name: 'Rose',
          last_name: 'Ellen',
          status: 'Yes',
          role: 'Boker',
          email: 'ellenrose@gmail.com',
          phone_number: '555-555-1214'
        },
        {
          avatar: '/images/Ellipse_4.png',
          first_name: 'Rose',
          last_name: 'Ellen',
          status: 'Yes',
          role: 'Boker',
          email: 'ellenrose@gmail.com',
          phone_number: '555-555-1214'
        },
        {
          avatar: '/images/Ellipse_4.png',
          first_name: 'Rose',
          last_name: 'Ellen',
          status: 'Yes',
          role: 'Boker',
          email: 'ellenrose@gmail.com',
          phone_number: '555-555-1214'
        },
        {
          avatar: '/images/Ellipse_4.png',
          first_name: 'Jack',
          last_name: 'Dowson',
          status: 'No',
          role: 'Accounting',
          email: 'jack@gmail.com',
          phone_number: '555-555-1214'
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
    scorePosition () {
      const test = 180 * (this.response.fscPercentage / 100)
      if (test >= 90) {
        return (test - 90)
      } else {
        return (test + 270)
      }
      // return ((180 * (this.response.fscPercentage / 100)) - this.response.fscPercentage)
    },
    getPageCount () {
      switch (this.selectedTab) {
        case 0:
          return this.contactPageCount
        case 1:
          return this.documentPageCount
        case 2:
          return this.contractPageCount
        case 3:
          return this.notesPageCount
        default:
          return 0
      }
    },
    getRequest () {
      switch (this.selectedTab) {
        case 0:
          return this.getContacts
        case 1:
          return this.getDocuments
        case 2:
          return this.getContracts
        case 3:
          return this.getNotes
        default:
          return null
      }
    },
    getTitle () {
      switch (this.selectedTab) {
        case 0:
          return 'Contacts'
        case 1:
          return 'Documents'
        case 2:
          return 'Contract Rates'
        case 3:
          return 'Notes'
        default:
          return ''
      }
    },
    getHeader () {
      switch (this.selectedTab) {
        case 0:
          return this.contactsHeaders
        case 1:
          return this.documentsHeaders
        case 2:
          return this.contractRatesHeaders
        case 3:
          return this.notesHeaders
        default:
          return {}
      }
    },
    getTableData () {
      switch (this.selectedTab) {
        case 0:
          return this.contacts
        case 1:
          return this.documents
        case 2:
          return this.contracts
        case 3:
          return this.notes
        case 4:
          return []
        default:
          return []
      }
    },
    brokerId (): number {
      return this.$store.state.brokerId
    },
    brokers (): BrokersDetails {
      console.log('broker:', this.$store.getters['Broker/brokersDetails/broker'])
      return (this.$store.getters['Broker/brokersDetails/broker'])
    },
    yearlySummary (): YearlySummary {
      return (this.$store.getters['Broker/yearlySummary/brokerYearlySummary'])
    },
    yearlySummaries (): YearlySummary {
      const Data = (this.$store.getters['Broker/yearlySummary/brokerYearlySummary'])
      console.log('getYearlySummaryByBrokerId', Data)

      return Data[0]
    },
    contacts (): ContactsDetails {
      return (this.$store.getters['Broker/contactsDetails/brokerContacts'])
    },
    contactPageCount () {
      return (this.$store.getters['Broker/contactsDetails/pageCount'])
    },
    documents (): ContactsDetails {
      return (this.$store.getters['Broker/documentsDetails/brokerDocuments'])
    },
    documentPageCount () {
      return (this.$store.getters['Broker/documentsDetails/pageCount'])
    },
    contracts (): ContractRatesDetails {
      return (this.$store.getters['Broker/contractRates/brokerContracts'])
    },
    contractPageCount () {
      return (this.$store.getters['Broker/contractRates/pageCount'])
    },
    // loadsHistory (): ContractRatesDetails {
    //   return (this.$store.getters['Broker/loadHistory/loads'])
    // },
    // loadHistoryPageCount () {
    //   return (this.$store.getters['Broker/loadHistory/pageCount'])
    // },
    notes (): NotesDetails {
      return (this.$store.getters['Broker/notesDetails/brokerNotes'])
    },
    notesPageCount () {
      return (this.$store.getters['Broker/notesDetails/pageCount'])
    }
  },
  created () {
    this.getBroker(this.brokerId)
    this.getContacts(1)
    this.getContracts(1)
    // this.getLoads(1)
    this.getDocuments(1)
    this.getNotes(1)
    this.getYearlySummaryByBrokerId({ page_number: 1 }).then(() => {
      const yearlySummaryData: YearlySummary[] = this.$store.getters['Broker/yearlySummary/brokerYearlySummary']

      Object.entries(yearlySummaryData[0]).forEach((pair: [string, any]) => {
        if (!pair[0].includes('total')) {
          if (pair[0].includes('loads')) {
            this.series[0].data.push(pair[1])
          } else if (pair[0].includes('revenue')) {
            this.series[1].data.push(pair[1])
          }
        }
      })

      // this.series[0].data.push(yearlySummaryData[0].loads_jan)
      // this.series[0].data.push(yearlySummaryData[0].loads_feb)
      // this.series[0].data.push(yearlySummaryData[0].loads_mar)
      // this.series[0].data.push(yearlySummaryData[0].loads_apr)
      // this.series[0].data.push(yearlySummaryData[0].loads_may)
      // this.series[0].data.push(yearlySummaryData[0].loads_jun)
      // this.series[0].data.push(yearlySummaryData[0].loads_jul)
      // this.series[0].data.push(yearlySummaryData[0].loads_aug)
      // this.series[0].data.push(yearlySummaryData[0].loads_sep)
      // this.series[0].data.push(yearlySummaryData[0].loads_oct)
      // this.series[0].data.push(yearlySummaryData[0].loads_nov)
      // this.series[0].data.push(yearlySummaryData[0].loads_dec)

      // this.series[1].data.push(yearlySummaryData[0].revenue_jan)
      // this.series[1].data.push(yearlySummaryData[0].revenue_feb)
      // this.series[1].data.push(yearlySummaryData[0].revenue_mar)
      // this.series[1].data.push(yearlySummaryData[0].revenue_apr)
      // this.series[1].data.push(yearlySummaryData[0].revenue_may)
      // this.series[1].data.push(yearlySummaryData[0].revenue_jun)
      // this.series[1].data.push(yearlySummaryData[0].revenue_jul)
      // this.series[1].data.push(yearlySummaryData[0].revenue_aug)
      // this.series[1].data.push(yearlySummaryData[0].revenue_sep)
      // this.series[1].data.push(yearlySummaryData[0].revenue_oct)
      // this.series[1].data.push(yearlySummaryData[0].revenue_nov)
      // this.series[1].data.push(yearlySummaryData[0].revenue_dec)
    }).catch((err:unknown) => {
      console.log(err)
    }).finally(() => {
      this.dataFetched = true
    })
  },
  methods: {
    ...mapActions({
      getBroker: (action, id) => action('Broker/brokersDetails/getBroker', id),
      getContact: (action, id) => action('Broker/contactsDetails/getContact', id),
      getContacts: (action, id) => action('Broker/contactsDetails/getContactByCarrierId', id),
      getNote: (action, id) => action('Broker/notesDetails/getNote', id),
      getNotes: (action, id) => action('Broker/notesDetails/getNotesByBrokerId', id),
      getDocument: (action, id) => action('Broker/documentsDetails/getDocument', id),
      getDocuments: (action, id) => action('Broker/documentsDetails/getDocumentsByBrokerId', id),
      updateDocument: (action, id) => action('Broker/documentsDetails/updateDocument', id),
      updateContact: (action, request) => action('Broker/contactsDetails/updateContact', request),
      getContract: (action, id) => action('Broker/contractRates/getContract', id),
      getContracts: (action, id) => action('Broker/contractRates/getContractByBrokerId', id),
      // getLoad: (action, id) => action('Broker/loadHistory/getLoad', id),
      // getLoads: (action, id) => action('Broker/loadHistory/getLoads', id),
      getYearlySummary: (action, id) => action('Broker/yearlySummary/getYearlySummary', id),
      getYearlySummaryByBrokerId: (action, id) => action('Broker/yearlySummary/getYearlySummaryByBrokerId', id)
    }),
    select (index: any) {
      this.selectedTab = index
      this.getKey()
    },
    openAction () {
      switch (this.selectedTab) {
        case 0:
          return this.drawer('CompanyProfileAddContact')
        case 1:
          return this.$refs.fileModal.showModal()
        case 2:
          return this.drawer('CompanyProfileAddContract')
        case 3:
          return this.$refs.noteModal.showModal()
        default:
          return null
      }
    },
    getKey () {
      this.tableKey = Math.random()
    },
    drawer (componentName: any) {
      this.$refs.drawer.showDrawer(componentName)
    },
    hideFileModal (): void {
      (this.$refs.fileModal as Vue & { hideModal: () => Function }).hideModal()
    },
    hideUploadModal (): void {
      (this.$refs.uploadModal as Vue & { hideModal: () => Function }).hideModal()
    },
    hideNoteModal (): void {
      (this.$refs.noteModal as Vue & { hideModal: () => Function }).hideModal()
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
