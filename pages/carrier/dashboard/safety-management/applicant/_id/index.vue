<template>
  <div class="w-full">
    <Drawer ref="drawer" />
    <PageHeader title="Applicant Profile" class="mb-10" @goback="$router.go(-1)" />
    <div
      class="
        mb-12
        col-12
        relative
        bg-white
        shadow-2xl shadow-gray-200
        rounded-xl
        p-12
        dark:bg-[#21293B] dark:shadow-none
      "
    >
      <div class="row col-12">
        <div class="col-7 flex">
          <div class="col-4 p-4">
            <div class="relative w-[152px] h-[152px] mx-auto">
              <img :src="pictureURL" alt="driver-picture" class="w-full h-full object-cover rounded-full">
              <div class="relative">
                <div
                  v-click-outside="() => (opened = false)"
                  :class="[
                    { 'bg-yellow-400': response?.applicant_status === 'Training' },
                    { 'bg-red-400': response?.applicant_status === 'Application Declined' },
                    { 'bg-red-400': response?.applicant_status === 'Disqualified' },
                    { 'bg-green-400': response?.applicant_status === 'New Applicant' },
                    { 'bg-green-400': response?.applicant_status === 'Application Approved' },
                  ]"
                  class="
                      rounded-full
                      absolute
                      p-2
                      px-3
                      bottom-[-18px]
                      left-1/2
                      -translate-x-1/2
                      flex
                      justify-between
                      items-center
                      h-9
                      whitespace-nowrap
                    "
                  @click="() => { opened = false }"
                >
                  <span
                    class="text-c-1 font-medium"
                    :class="[{'text-white' : status !== 0 },
                             {'text-gray-800': status === 0 }]"
                  >
                    {{ response?.applicant_status }}
                  </span>
                </div>
                <transition name="slide">
                  <div v-if="opened" class="absolute top-5 rounded-lg bg-white left-0 right-0 w-60 shadow-2xl z-10">
                    <ul class="px-4 py-5">
                      <li
                        class="text-c-1 font-medium text-gray-800 w-full flex items-center justify-between cursor-pointer mb-7"
                        @click="chooseStatus(0)"
                      >
                        New Applicant
                        <Icon
                          v-if="status === 0"
                          icon="tick-circle"
                          variant="linear"
                          color="green"
                          :disable-fill="true"
                          class="w-6 h-6"
                        />
                      </li>
                      <li
                        class="text-c-1 font-medium text-gray-800 w-full flex items-center justify-between cursor-pointer mb-7"
                        @click="chooseStatus(1)"
                      >
                        Application Approved
                        <Icon
                          v-if="status === 1"
                          icon="tick-circle"
                          variant="linear"
                          color="green"
                          :disable-fill="true"
                          class="w-6 h-6"
                        />
                      </li>
                      <li
                        class="text-c-1 font-medium text-gray-800 w-full flex items-center justify-between cursor-pointer mb-7"
                        @click="chooseStatus(2)"
                      >
                        Application Declined
                        <Icon
                          v-if="status === 2"
                          icon="tick-circle"
                          variant="linear"
                          color="green"
                          :disable-fill="true"
                          class="w-6 h-6"
                        />
                      </li>
                      <li
                        class="text-c-1 font-medium text-gray-800 w-full flex items-center justify-between cursor-pointer mb-7"
                        @click="chooseStatus(3)"
                      >
                        Training
                        <Icon
                          v-if="status === 3"
                          icon="tick-circle"
                          variant="linear"
                          color="green"
                          :disable-fill="true"
                          class="w-6 h-6"
                        />
                      </li>
                      <li
                        class="text-c-1 font-medium text-gray-800 w-full flex items-center justify-between cursor-pointer mb-7"
                        @click="chooseStatus(4)"
                      >
                        Disqualified
                        <Icon
                          v-if="status === 4"
                          icon="tick-circle"
                          variant="linear"
                          color="green"
                          :disable-fill="true"
                          class="w-6 h-6"
                        />
                      </li>
                      <li
                        class="text-c-1 font-medium text-gray-800 w-full flex items-center justify-between cursor-pointer mb-7"
                        @click="chooseStatus(5)"
                      >
                        Active
                        <Icon
                          v-if="status === 5"
                          icon="tick-circle"
                          variant="linear"
                          color="green"
                          :disable-fill="true"
                          class="w-6 h-6"
                        />
                      </li>
                    </ul>
                  </div>
                </transition>
              </div>
            </div>
            <div class="flex justify-center items-center pt-7">
              <span class="ripple-circle w-1 h-1 bg-lime" />
              <span class="ml-[10px] text-c-2 font-medium text-gray-800">
                {{ response?.applicant_state }}
                <span class="text-gray">
                  {{ status === 0 ? "(Live)" : "" }}
                </span>
              </span>
            </div>
          </div>
          <div class="pl-10 col-8">
            <div class="mb-6">
              <h5 class="text-gray-800 font-semibold">
                {{ response?.applicant_first_name }} {{ response?.applicant_last_name }}
              </h5>
              <span class="text-c-1 text-gray hidden">{{ response?.employee_id }}  {{ response?.employee_type }}</span>
            </div>
            <div class="flex flex-wrap">
              <InfoBox
                :value="(response?.application_date)"
                title="Joined Date"
                icon="calendar"
                color="grey-dark"
                :alpha="300"
                class="col-6 mb-5"
              />
              <InfoBox
                :value="response?.applicant_type"
                title="Driver Type"
                icon="category"
                color="grey-dark"
                :alpha="300"
                class="col-6 mb-5"
              />
              <InfoBox
                :value="response?.applicant_phone_number"
                title="Phone Number"
                icon="call"
                color="grey-dark"
                :alpha="300"
                class="col-6 mb-5"
              />
              <InfoBox
                :value="response?.applicant_email_address"
                title="Business Email"
                icon="sms"
                color="grey-dark"
                :alpha="300"
                class="col-6 mb-5"
              />
              <InfoBox
                :value="(response?.birthday_date)"
                title="Birthday"
                icon="cake"
                color="grey-dark"
                :alpha="300"
                class="col-6"
              />
              <InfoBox
                :value="`$ ${response?.payment_rates}`"
                title="Payment Rates"
                icon="wallet-money"
                class="col-6"
                :fontweight="700"
              />
            </div>
          </div>
        </div>
        <div class="col-5 flex items-center justify-center">
          <div class="w-full performance-bar">
            <span class="indicator" :style="`transform: rotate(${scorePosition}deg)`">
              <span class="indicator-border shadow-sm shadow-gray-400" />
            </span>
            <div class="score text-center absolute bottom-0 left-0 right-0">
              <h1 class="font-semibold flex justify-center items-end">
                {{ fscPercentage }}
                <h3 class="font-medium leading-[38px]">
                  %
                </h3>
              </h1>
              <span class="text-c-1 font-medium text-gray-400">Driver Score</span>
            </div>
          </div>
        </div>
      </div>
      <transition name="slide">
        <div v-show="!slideToggle" class="col-12 mt-[4.5rem]">
          <div class="col-12 mb-10">
            <div class="mb-6">
              <h6 class="font-semibold text-gray-800">
                Driver Address
              </h6>
            </div>
            <div class="flex -mx-1 flex-wrap">
              <div class="col-4 px-1 mb-4">
                <InfoBox
                  :value="response?.applicant_address_line_1"
                  title="Address Information"
                  icon="location"
                  :alpha="800"
                  variant="outline"
                  class="p-4"
                  :border="true"
                />
              </div>
              <div class="col-4 px-1 mb-4">
                <InfoBox
                  :value="response?.applicant_emergency_phone_number"
                  title="Emergency Number"
                  icon="call-calling"
                  :alpha="800"
                  variant="outline"
                  class="p-4"
                  :border="true"
                />
              </div>
            </div>
          </div>
          <div class="col-12 mb-10">
            <div class="mb-6">
              <h6 class="font-semibold text-gray-800">
                Driver Statement
              </h6>
            </div>
            <div class="flex -mx-1 flex-wrap">
              <div class="col-4 px-1 mb-4">
                <InfoBox
                  :value="response?.applicant_routing_number"
                  title="Bank Routing Number"
                  icon="security-user"
                  :alpha="800"
                  variant="outline"
                  class="p-4"
                  :border="true"
                />
              </div>
              <div class="col-4 px-1 mb-4">
                <InfoBox
                  :value="response?.applicant_account_number"
                  title="Bank Accounting Number"
                  icon="bank"
                  :alpha="800"
                  variant="outline"
                  class="p-4"
                  :border="true"
                />
              </div>
              <div class="col-4 px-1 mb-4">
                <InfoBox
                  :value="response?.payment_type"
                  title="Payment Type"
                  icon="bank"
                  :alpha="800"
                  variant="outline"
                  class="p-4"
                  :border="true"
                />
              </div>
              <div class="col-4 px-1 mb-4">
                <InfoBox
                  :value="`${response?.applicant_payment_rates}%`"
                  title="Payment Rates"
                  icon="diagram"
                  :alpha="800"
                  variant="outline"
                  class="p-4"
                  :border="true"
                />
              </div>
              <div class="col-4 px-1 mb-4">
                <InfoBox
                  :value="`$${response?.recurring_deductions}`"
                  title="Recurring Deductions"
                  icon="repeate-one"
                  :alpha="800"
                  variant="outline"
                  class="p-4"
                  :border="true"
                />
              </div>
              <div class="col-4 px-1 mb-4">
                <InfoBox
                  :value="`$${response?.compensation}`"
                  title="Compensation"
                  icon="dollar-circle"
                  :alpha="800"
                  variant="outline"
                  class="p-4"
                  :border="true"
                />
              </div>
            </div>
          </div>
          <div class="col-12 mb-12">
            <div class="mb-6">
              <h6 class="font-semibold text-gray-800">
                Other Information
              </h6>
            </div>
            <div class="flex -mx-1 flex-wrap">
              <div class="col-4 px-1 mb-4">
                <InfoBox
                  :value="response?.driver_ssn"
                  title="Social Security Number"
                  icon="security-user"
                  :alpha="800"
                  variant="outline"
                  class="p-4"
                  :border="true"
                />
              </div>
              <div class="col-4 px-1 mb-4">
                <InfoBox
                  :value="response?.truck_id"
                  title="Truck ID"
                  icon="truck"
                  :alpha="800"
                  variant="outline"
                  class="p-4"
                  :border="true"
                />
              </div>
              <div class="col-4 px-1 mb-4">
                <InfoBox
                  :value="response?.trailer_id"
                  title="Trailer ID"
                  icon="document"
                  :alpha="800"
                  variant="outline"
                  class="p-4"
                  :border="true"
                />
              </div>
              <div class="col-4 px-1 mb-4">
                <InfoBox
                  :value="response?.cdl_number"
                  title="CDL Number"
                  icon="firstline"
                  :alpha="800"
                  variant="outline"
                  class="p-4"
                  :border="true"
                />
              </div>
              <div class="col-4 px-1 mb-4">
                <InfoBox
                  :value="response?.cdl_issue_date"
                  title="CDL Issue Date"
                  icon="calendar"
                  :alpha="800"
                  variant="outline"
                  class="p-4"
                  :border="true"
                />
              </div>
              <div class="col-4 px-1 mb-4">
                <InfoBox
                  :value="response?.cdl_expiration_date"
                  title="CDL Expire Date"
                  icon="calendar"
                  :alpha="800"
                  variant="outline"
                  class="p-4"
                  :border="true"
                />
              </div>
              <div class="col-4 px-1 mb-4">
                <InfoBox
                  :value="nextDrugTestDate"
                  title="Next Drug Test Date"
                  icon="calendar"
                  :alpha="800"
                  variant="outline"
                  class="p-4"
                  :border="true"
                />
              </div>
            </div>
          </div>
        </div>
      </transition>

      <Button
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
        @click="slideToggle = !slideToggle"
      >
        <Icon
          icon="arrow-down-1"
          color="white"
          class="w-3 h-3 transition-all"
          :class="{ 'rotate-180': !slideToggle }"
        />
      </Button>
      <div class="flex absolute top-4 right-4">
        <div
          class="!rounded-full border !w-9 !h-9 border-gray-300 flex justify-center items-center cursor-pointer mr-2"
          @click="modalShow()"
        >
          <Icon icon="trash" variant="bold" color="gray" :alpha="400" class="w-5 h-5" />
        </div>
        <div
          class="!rounded-full border !w-9 !h-9 border-gray-300 flex justify-center items-center cursor-pointer"
          @click="drawer('EditApplicant')"
        >
          <Icon icon="edit-2" variant="bold" color="gray" :alpha="400" class="w-5 h-5" />
        </div>
      </div>
    </div>
    <div class="row mb-5">
      <div class="col-12 my-5">
        <Table
          title="Documents Process"
          icon="firstline"
          icon-color="orange"
          :icon-alpha="0"
          :headers="headers"
          :data="documents"
          :request-function="getDocumentRequest"
          :edit-enabled="true"
          edit-page="EditFiles"
          :delete-enabled="true"
          :delete-function="removeDocument"
          :upload-enabled="true"
          :download-enabled="true"
          :sms-enabled="true"
        >
          <template #item-document_category="{ item }">
            <div class="block">
              <span class="block">{{ item.document_category }}</span>
              <span class="block text-c-1 text-gray-400">
                {{ item.document_location }}
              </span>
            </div>
          </template>
          <template #item-document_upload_date="{ item }">
            {{ formatDate(item.document_upload_date) }}
          </template>
          <template #item-document_status="{ item }">
            <Status
              :item="item"
              :active="extendeds.includes(item.id)"
              :item-status="item.document_status"
              :dropdown-menu="dropdownMenuDocuments"
              :dropdown-style="dropdownStyle"
              @extend="extendItemDocuments"
              @set-status="setStatusDocuments"
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

          <div slot="actions" class="w-full flex items-center justify-end">
            <div class="w-40 mr-2">
              <m-select
                v-model="reportRange"
                :multiple="false"
                :options="rangeOptions"
                name="reportRange"
                wrapper-class="!text-c-1"
              />
            </div>

            <div
              class="w-14 h-12 bg-black rounded-lg flex items-center justify-center cursor-pointer"
              @click="drawer('AddFiles')"
            >
              <Icon icon="add" color="white" class="w-6 h-6" />
            </div>
          </div>
        </Table>
        <div class="row mb-5 mt-14">
          <div class="col-12 mt-5 mb-6">
            <div class="row mx-0">
              <div v-for="(tab, index) in tabs" :id="`tab_${tab.id}`" :key="index" class="col-auto p-0 pr-2">
                <TabButton
                  :active="(selectedTab === index)"
                  :title="tab.name"
                  color="green"
                  :icon="tab.icon"
                  @click="select(index, 'tab_' + tab.id.toString())"
                />
              </div>
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
            :search-enabled="true"
            :data="getTableData"
            :download-enabled="true"
            :selected-tab="selectedTab"
          >
            <template #item-categories="{ item }">
              <div class="block">
                <span class="block">{{ item.categories }}</span>
                <span class="block text-c-1 text-gray-400">
                  {{ item.description }}
                </span>
              </div>
            </template>

            <template #item-impact="{ item }">
              <Badge
                :icon="
                  item.impact === 'positive'
                    ? 'increase'
                    : item.impact === 'negative'
                      ? 'decrease'
                      : 'performance'
                "
                :icon-color="
                  item.impact === 'positive'
                    ? 'green'
                    : item.impact === 'negative'
                      ? 'red'
                      : 'gray'
                "
                :icon-alpha="item.impact === 'neutral' ? 400 : 800"
                :title="item.impact[0].toUpperCase() + item.impact.slice(1)"
                :class="[
                  { 'bg-green-100 text-green-800': item.impact === 'positive' },
                  { 'bg-red-100 text-red-800': item.impact === 'negative' },
                  { 'bg-gray-100 text-gray-400': item.impact === 'neutral' },
                ]"
                :size="SizeTypeEnum.MD"
              />
            </template>
            <template #item-status="{ item }">
              <Badge
                :title="item.status"
                :class="[
                  {'bg-green-100 text-green-800' : item.status === 'Completed'},
                  {'bg-green-100 text-green-800' : item.status === 'Open'},
                  {'bg-green-100 text-green-800' : item.status === 'Active'},
                  {'bg-red-100 text-red-800' : item.status === 'Not Completed'},
                  {'bg-gray-100 text-gray-400' : item.status === 'Not Started'},
                  {'bg-green-100 text-green-800' : item.status === 'Pass'},
                  {'bg-orange-100 text-orange-800' : item.status === 'Pending'},
                ]"
                :size="SizeTypeEnum.LG"
              />
            </template>
            <div slot="actions" />
          </Table>
        </div>
      </div>
      <DeleteModal
        ref="modal"
        :delete-id="parseInt($route.params.id, 10)"
        :delete-function="removeApplicant"
        :delete-subtext="deleteSubtext"
        :pop-back="true"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapActions } from 'vuex'
import moment from 'moment'
import {
  ActionTypeEnum,
  ButtonTypeEnum,
  SizeTypeEnum
} from '~/components/ts/enums'
import { DocumentsDetails } from '@/models/documents/documentsDetails'
import { ApplicantsDetails } from '~/models/applicants'
export default Vue.extend({
  name: 'ApplicantProfilePage',
  layout: 'Dashboard',
  // asyncData ({ params }) {
  //   const slug: string = params.slug
  //   return { slug }
  // },
  data () {
    return {
      selectedTab: 0,
      opened: false,
      tableKey: 0,
      ActionTypeEnum,
      ButtonTypeEnum,
      SizeTypeEnum,
      reportRange: '',
      deleteSubtext: '',
      extendeds: [] as any[],
      dropdownStyle: 'a',
      dropdownMenuDocuments: [
        { text: 'Expired', bg: 'green' },
        { text: 'Renewed', bg: 'orange' },
        { text: 'Soon Expiring', bg: 'blue' },
        { text: 'Valid', bg: 'green' }
      ],
      rangeOptions: [
        {
          id: 'Monthly',
          text: 'Monthly',
          selected: true,
          icon: { name: 'calendar', variant: 'bulk' }
        },
        {
          id: 'Yearly',
          text: 'Yearly',
          selected: false,
          icon: { name: 'calendar', variant: 'bulk' }
        }
      ],
      test: {
        applicant_first_name: '',
        application_date: '28/04/2022',
        applicant_type: 'Company Driver',
        applicant_phone_number: '229 - 555 - 0109',
        applicant_state: 'New York',
        birthday_date: '01/09/1984',
        payment_rates: '1090',
        applicant_email_address: 'test.mail@gmail.com',
        applicant_address_line_1: '2118 Thornridge Cir. Syracuse, New York 35624',
        applicant_emergency_phone_number: '(219) - 610 - 5132',
        applicant_routing_number: '125894451',
        applicant_account_number: '42464161',
        payment_type: 'Cash Payment',
        applicant_payment_rates: '142',
        recurring_deductions: '1048',
        compensation: '108',
        truck_id: 154253165,
        driver_ssn: 'SSN-402024921',
        trailer_id: 18373823933,
        cdl_number: 'CDL - 202027292',
        cdl_issue_date: 'October 10, 2022',
        cdl_expiration_date: 'December 21, 2022'
      },
      tabs: [
        {
          id: 0,
          name: 'Violations',
          icon: 'chart-fail',
          title: 'Violations'
        },
        {
          id: 1,
          name: 'Incidents',
          icon: 'note-add',
          title: 'Incidents'
        },
        {
          id: 2,
          name: 'Accidents',
          icon: 'health',
          title: 'Accidents'
        },
        {
          id: 3,
          name: 'Drug Test',
          icon: 'monitor-mobbile',
          title: 'Drug Test'
        }
      ],
      status: 0,
      pictureURL: '/images/Ellipse_49.png',
      fscPercentage: 50,
      nextDrugTestDate: '12/05/2024',
      slideToggle: true,
      headers: {
        document_category: {
          label: 'Category',
          searchable: true,
          sortable: true
        },
        document_type: {
          label: 'Type',
          searchable: true,
          sortable: true
        },
        document_status: {
          label: 'Status',
          searchable: true,
          sortable: true
        },
        document_upload_date: {
          label: 'Date',
          searchable: true,
          sortable: true
        }
      },
      testData: [
        {
          categories: 'Document Files',
          // description: 'Place description here',
          type: 'Medical Card',
          date: '20/05/2022',
          status: 'uploaded'
        },
        {
          categories: 'Document Files',
          // description: 'Place description here',
          type: 'CDL',
          date: '20/05/2022',
          status: 'pending'
        },
        {
          categories: 'Document Files',
          // description: 'Place description here',
          type: 'Certificate of Vialotions',
          date: '20/05/2022',
          status: 'uploaded'
        },
        {
          categories: 'Document Files',
          // description: 'Place description here',
          type: 'PSP',
          date: '20/05/2022',
          status: 'uploaded'
        },
        {
          categories: 'Document Files',
          // description: 'Place description here',
          type: 'W9',
          date: '20/05/2022',
          status: 'pending'
        }
      ],
      violationsHeaders: {
        categories: {
          label: 'Category',
          searchable: true,
          sortable: true
        },
        falling_point: {
          label: 'Falling Point',
          searchable: true,
          sortable: true
        },
        new_point: {
          label: 'New Point',
          searchable: true,
          sortable: true
        },
        impact: {
          label: 'Impact',
          searchable: true,
          sortable: true
        }
      },
      incidentsHeaders: {
        incident_id: {
          label: 'Incident ID',
          searchable: true,
          sortable: true
        },
        driver_name: {
          label: 'Driver Name',
          searchable: true,
          sortable: true
        },
        unit_number: {
          label: 'Unit Number',
          searchable: true,
          sortable: true
        },
        event_type: {
          label: 'Event Type',
          searchable: true,
          sortable: true
        },
        incident_date: {
          label: 'Incident date',
          searchable: true,
          sortable: true
        },
        training_required: {
          label: 'Training Required',
          searchable: true,
          sortable: true
        },
        training_comp: {
          label: 'Training Completed',
          searchable: true,
          sortable: true
        }
      },
      incidentsData: [
        {
          incident_id: 'ID',
          driver_name: 'George Brown',
          unit_number: '1234',
          event_type: 'Blocked Camera',
          incident_date: 'Date',
          training_required: 'Yes',
          training_comp: 'No'
        },
        {
          incident_id: 'ID',
          driver_name: 'George Brown',
          unit_number: '1234',
          event_type: 'Speeding',
          incident_date: 'Date',
          training_required: 'No',
          training_comp: 'No'
        }
      ],
      drugTestHeaders: {
        driver_id: {
          label: 'Driver ID',
          sortable: true
        },
        driver_name: {
          label: 'Driver Name',
          sortable: true
        },
        drug_test_type: {
          label: 'Drug Test Type',
          sortable: true
        },
        status: {
          label: 'Status',
          sortable: true
        },
        result: {
          label: 'Result',
          sortable: true
        },
        test_date: {
          label: 'Test Date',
          sortable: true
        }
      },
      violationsData: [
        {
          categories: 'Vehicle Maintenance',
          // description: 'Place description here',
          falling_point: 125,
          new_point: 222,
          impact: 'positive'
        },
        {
          categories: 'Unsafe Driving',
          // description: 'Place description here',
          falling_point: 44,
          new_point: 45,
          impact: 'negative'
        },
        {
          categories: 'Driver Fitness',
          // description: 'Place description here',
          falling_point: 2,
          new_point: 0,
          impact: 'neutral'
        },
        {
          categories: 'HOS Compliance',
          // description: 'Place description here',
          falling_point: 3,
          new_point: 0,
          impact: 'positive'
        },
        {
          categories: 'Substance & Alcohol',
          // description: 'Place description here',
          falling_point: 5,
          new_point: 0,
          impact: 'negative'
        },
        {
          categories: 'HM Compliance',
          // description: 'Place description here',
          falling_point: 1,
          new_point: 0,
          impact: 'neutral'
        },
        {
          categories: 'Crash Indicator',
          // description: 'Place description here',
          falling_point: 5,
          new_point: 18,
          impact: 'positive'
        }
      ],
      drugTest: [
        {
          driver_id: '108',
          driver_name: 'John Hawking',
          drug_test_type: 'Resonable Suspicion',
          status: 'Pending',
          result: 'Positive',
          test_date: '18/02/2022'
        },
        {
          driver_id: '110',
          driver_name: 'Bill Sanders',
          drug_test_type: 'Resonable Suspicion',
          status: 'Completed',
          result: 'Diluted',
          test_date: '18/02/2022'
        }
      ],
      accidentsHeaders: {
        driver_name: {
          label: 'Driver Name',
          sortable: true
        },
        unit_number: {
          label: 'Unit Number',
          sortable: true
        },
        ticketed: {
          label: 'Ticketed',
          sortable: true
        },
        towed: {
          label: 'Towed',
          sortable: true
        },
        state: {
          label: 'State',
          sortable: true
        },
        at_fault: {
          label: 'At Fault',
          sortable: true
        },
        injury: {
          label: 'Injury',
          sortable: true
        },
        dot_recordable: {
          label: 'DOT Recordable',
          sortable: true
        },
        status: {
          label: 'Status',
          sortable: true
        },
        accident_timestamp: {
          label: 'Accident Timestamp',
          sortable: true
        },
        post_accident: {
          label: 'Post-Accident DS',
          sortable: true
        }
      },
      accidentsData: [
        {
          driver_name: 'George Brown',
          unit_number: '1234',
          ticketed: 'Yes',
          towed: 'Yes',
          state: 'GA',
          at_fault: 'Yes',
          injury: 'Yes',
          dot_recordable: 'Yes',
          status: 'Open',
          accident_timestamp: 'Positive',
          post_accident: '10/02/2023 14:20'
        }
      ]
    }
  },
  computed: {
    getDocumentRequest () {
      return this.getDocuments
    },
    response (): ApplicantsDetails {
      const res = { ...this.$store.getters['applicants/applicant'] }
      const res2 = { ...this.test }
      return { ...res2, ...res }
    },
    documents (): DocumentsDetails[] {
      return (this.$store.getters['documents/documents'])
    },
    scorePosition () {
      const test = 180 * (this.response?.fscPercentage / 100)
      if (test >= 90) {
        return (test - 90)
      } else {
        return (test + 270)
      }
      // return ((180 * (this.response?.fscPercentage / 100)) - this.response?.fscPercentage)
    },
    getTitle () {
      switch (this.selectedTab) {
        case 0:
          return 'Violations'
        case 1:
          return 'Incidents'
        case 2:
          return 'Accidents'
        case 3:
          return 'Drug Test'
        default:
          return ''
      }
    },
    getHeader () {
      switch (this.selectedTab) {
        case 0:
          return this.violationsHeaders
        case 1:
          return this.incidentsHeaders
        case 2:
          return this.accidentsHeaders
        case 3:
          return this.drugTestHeaders
        default:
          return {}
      }
    },
    getTableData () {
      switch (this.selectedTab) {
        case 0:
          return this.violationsData
        case 1:
          return this.incidentsData
        case 2:
          return this.accidentsData
        case 3:
          return this.drugTest
        default:
          return []
      }
    }
  },
  created () {
    this.getApplicant(parseInt(this.$route.params.id, 10))
  },
  methods: {
    extendItemDocuments (event:MouseEvent, item: any, menuItem?:string | null): void {
      if (menuItem) { item.impact = menuItem }

      if (this.extendeds.includes(item.id)) {
        this.extendeds = this.extendeds.filter((a: any) => {
          return a !== item.id
        })
      } else {
        this.extendeds.push(item.id)
        const { clientX, clientY } = event
        this.dropdownStyle = {
          top: `${clientY + 20}px`,
          left: `${clientX - 100}px`
        }
      }
    },
    setStatusDocuments (id:number, newStatus:any) {
      const data = this.documents.slice()
      console.log(id, newStatus)
      const item = data.find((w:any) => w.id === id)
      this.updateDocument({
        ...item,
        document_status: newStatus,
        carrier_id: item.carrier_id.toString(),
        driver_id: item.driver_id.toString(),
        document_upload_date: moment(item.document_upload_date).toISOString(),
        document_expire_date: moment(item.document_expire_date).toISOString()
      } as DocumentsDetails)
    },
    ...mapActions({
      getApplicant: (action, id) => action('applicants/getApplicant', id),
      getDocuments: (action, page) => action('documents/getDocuments', page),
      updateDocument: (action, page) => action('documents/updateDocument', page),
      removeApplicant: (action, id) => action('applicants/removeApplicant', id),
      removeDocument: (action, id) => action('documents/removeDocument', id)
    }),
    select (index:number, anchor?:string) {
      console.log(index)
      this.selectedTab = index
      this.getKey()
      if (anchor) {
        setTimeout(function () {
          const element = document.querySelector(anchor)
          console.log(element, anchor)
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' })
          }
        }, 350)
      }
    },
    getKey () {
      this.tableKey = Math.random()
    },
    drawer (drawerName: string) {
      (this.$refs.drawer as Vue & { showDrawer: (component: String, routeUrl?: String) => Element }).showDrawer(drawerName)
    },
    modalShow () : void {
      (this.$refs.modal as Vue & { showModal: () => Function }).showModal()
    },
    formatDate (date: Date) {
      return moment(date).format('MMMM D, yyyy')
    },
    chooseStatus (index:number): void {
      this.status = index
      this.opened = false
      console.log(this.status)
      console.log(this.getStatusText())
    },
    getStatusText (): string {
      switch (true) {
        case (this.status === 0):
          return 'New Applicant'
        case (this.status === 1):
          return 'Application Approved'
        case (this.status === 2):
          return 'Application Declined'
        case (this.status === 3):
          return 'Training'
        case (this.status === 4):
          return 'Disqualified'
        case (this.status === 5):
          return 'Active'
        default:
          return ''
      }
    }
  }
  // computed: {
  //   scorePosition () {
  //     const test = 180 * (this.response?.fscPercentage / 100)
  //     if (test >= 90) {
  //       return (test - 90)
  //     } else {
  //       return (test + 270)
  //     }
  //     // return ((180 * (this.response?.fscPercentage / 100)) - this.response?.fscPercentage)
  //   },
  // methods: {
  //   drawer () {
  //     (this.$refs.drawer as Vue & { showDrawer: (component: String, routeUrl?: String) => Element }).showDrawer('AddDriver')
  //   }
  // }
})
</script>

<style scoped>
.performance-bar {
  background-image: url("/images/performance_bar.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: relative;
  width: 305px;
  height: 157px;
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
