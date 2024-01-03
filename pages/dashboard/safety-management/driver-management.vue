<template>
  <div class="w-full">
    <Drawer ref="drawer" />
    <PageHeader title="Driver Management Overview" />
    <div class="row mb-5">
      <div class="col-12">
        <div class="row mx-0">
          <div v-for="(tab, index) in tabs" :id="`tab_${tab.id}`" :key="index" class="col-auto p-0 pr-2">
            <TabButton
              :active="(selectedTab === index)"
              :title="tab.name"
              color="green"
              :icon="tab.icon"
              :is-default="checkDefault(index)"
              :selectable="true"
              @select-method="setTab(index)"
              @click="select(index)"
            />
          </div>
        </div>
      </div>
    </div>

    <div v-if="selectedTab!== 0" class="col-12 mb-5">
      <Table
        v-if="selectedTab > -1"
        :id="tableKey"
        :key="tableKey"
        :title="getTitle"
        :headers="getHeader"
        :data="getTableData"
        :selected-tab="selectedTab"
        :request-function="requestFunc"
        :edit-page="getEditPage"
        :edit-enabled="getEdit"
        :delete-enabled="getDelete"
        :delete-function="getDeleteFunction"
        :delete-subtext="getSubtext"
        :search-enabled="true"
        :download-enabled="true"
        :page-count="getPageCount"
        :download-template-enabled="selectedTab === 1"
        :link="linkArr[selectedTab]"
        :filtering-model="vFilter"
      >
        <template #item-first_name="{ item }">
          <div class="flex items-center">
            <div class="mr-2">
              <img class="inline-block h-10 w-10 min-h-[2.5rem] min-w-[2.5rem] max-h-[2.5rem] max-w-[2.5rem] rounded-full ring-2 ring-white" src="/images/Ellipse_49.png" alt="driver">
            </div>
            <div>
              <span class="block whitespace-nowrap">
                {{ item.first_name }} {{ item.last_name }}
              </span>
              <span class="block text-c-1 text-gray-400">
                {{ item.driver_type }}
              </span>
            </div>
          </div>
        </template>
        <template #item-completion_date="{ item }">
          <span class="whitespace-nowrap">
            {{ formatDate(item.completion_date) }}
          </span>
        </template>
        <template #item-applicant_first_name="{ item }">
          <div class="flex items-center">
            <div>
              <span class="block whitespace-nowrap">
                {{ item.first_name }} {{ item.last_name }}
              </span>
            </div>
          </div>
        </template>
        <template #item-date="{item}">
          <span class="whitespace-nowrap">{{ item.date }}</span>
        </template>
        <template #item-application_date="{item}">
          <span class="whitespace-nowrap">{{ item.application_date }}</span>
        </template>
        <template #item-driver_contact_phone_number="{item}">
          {{ item.driver_contact_phone_number }}
        </template>
        <template #item-applicant_phone_number="{item}">
          <!-- <Icon
            variant="bulk"
            icon="call"
            color="grey-dark"
            :alpha="200"
            class="mr-2 w-5 h-5"
          /> -->
          {{ item.phone_number }}
        </template>
        <template #item-email="{item}">
          {{ item.email }}
        </template>
        <template #item-applicant_email_address="{item}">
          <!-- <Icon
            variant="bulk"
            icon="sms"
            color="grey-dark"
            :alpha="200"
            class="mr-2 w-5 h-5"
          />  -->
          {{ item.email }}
        </template>
        <template #item-pending_doc="{item}">
          <b>{{ item.number_of_pending_docs }}</b>
        </template>
        <template #item-number_of_pending_docs="{item}">
          <b>{{ item.number_of_pending_docs }}</b>
        </template>
        <template #item-driver_status="{ item }">
          <Status
            :item="item"
            :active="extendeds.includes(item.id)"
            :item-status="item.status"
            :dropdown-menu="dropdownMenuDrivers"
            :dropdown-style="dropdownStyle"
            @extend="extendItemDrivers"
            @set-status="setStatusDrivers"
          />
        </template>
        <template #item-status="{ item }">
          <Status
            :item="item"
            :active="extendeds.includes(item.id)"
            :item-status="item.status"
            :dropdown-menu="getOptionsStatus"
            :dropdown-style="dropdownStyle"
            @extend="extendItemAll"
            @set-status="setStatusAll"
          />
        </template>
        <template #item-training_status="{ item }">
          <Status
            :item="item"
            :active="extendeds.includes(item.id)"
            :item-status="item.status"
            :dropdown-menu="dropdownMenuTrainings"
            :dropdown-style="dropdownStyle"
            @extend="extendItemTrainings"
            @set-status="setStatusTrainings"
          />
        </template>
        <template #item-test_status="{ item }">
          <Status
            :item="item"
            :active="extendeds.includes(item.id)"
            :item-status="item.test_status"
            :dropdown-menu="dropdownMenuDrugTest"
            :dropdown-style="dropdownStyle"
            @extend="extendItemDrugTest"
            @set-status="setStatusDrugTest"
          />
        </template>
        <div slot="actions">
          <Modal ref="fileModal" size="sm" position="center">
            <div slot="body" class="row flex items-center justify-center pt-8 pb-2">
              <div class="col-8 items-center justify-center">
                <h3 class="font-semibold text-center">
                  Bulk Upload
                </h3>
              </div>
              <div class="col-8 mt-16">
                <Form fclass="row my-2" @send="hideFileModal">
                  <div class="col-12 mb-6">
                    <div
                      class="!w-52 mx-auto my-0 !bg-white text-black max-w-max m-input flex items-center justify-center cursor-pointer"
                    >
                      <img :src="`/images/excel-icon.png`" alt="pdf-file" class="w-6 h-6 ml-2">
                      <span class="text-c-1 mr-5">Download Template</span>
                    </div>
                    <FileInput class="mt-4" name="document" />
                  </div>
                  <widget :no-shadow="true" :no-border="true">
                    <div class="row">
                      <div class="col-auto">
                        <span class="block text-c-1 font-semibold whitespace-nowrap">
                          Nebula All Truck List.exl
                        </span>
                      </div>
                      <div class="ml-auto col-auto">
                        <Icon icon="trash" variant="variant" color="black" class="w-5 h-5" />
                      </div>
                    </div>
                    <span class="block text-c-1 font-semibold whitespace-nowrap">
                      1.2 mb
                    </span>
                    <div class="row flex justify-center items-center">
                      <div class="col-8 rounded-lg h-2">
                        <div class="h-2 rounded-lg bg-green-500" />
                      </div>
                      <div class="col-2">
                        <span class="block text-c-1 font-semibold whitespace-nowrap">
                          100%
                        </span>
                      </div>
                      <div class="col-2">
                        <Icon
                          icon="tick-circle"
                          color="green"
                          alpha="400"
                          class="w-5 h-5"
                        />
                      </div>
                    </div>
                  </widget>
                  <div class="col-12 mt-12">
                    <Button :type="ButtonTypeEnum.BLACK" :size="SizeTypeEnum.LG" :action="ActionTypeEnum.SUBMIT">
                      Upload
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
          <div class="relative">
            <div
              class="!bg-black !w-14 !border-none m-input flex items-center justify-center cursor-pointer"
              @click="decideTheAddButton"
            >
              <Icon
                icon="add"
                color="white"
                class="w-6 h-6"
              />
            </div>
            <transition name="slide">
              <div v-if="opened" class="z-[8] absolute top-10 rounded-lg bg-white right-0 w-48 shadow-2xl">
                <ul class="px-4 py-5">
                  <li
                    v-for="(action, index) in decideAddNew"
                    :key="index"
                    class="text-c-1 font-medium text-gray-800 w-full flex justify-center items-center cursor-pointer text-center"
                    :class="{ 'mb-7': index !== decideAddNew.length - 1 }"
                    @click="executeAction(action)"
                  >
                    {{ action.name }}
                  </li>
                </ul>
              </div>
            </transition>
          </div>
        </div>
      </Table>
    </div>
    <div v-if="selectedTab=== 0">
      <div class="w-full mt-6">
        <div>
          <span class="text-secondary text-b-2 font-medium flex items-center cursor-pointer dark:text-white">
            Applicants
          </span>
        </div>
      </div>
      <div class="row mb-5">
        <div v-for="(applicant, index) in applicants" :key="index" class="col-4 my-5">
          <widget
            :title="applicant.title"
            :icon="applicant.icon"
            icon-color="orange"
            :icon-alpha="0"
            @action="select(applicant.directToTab, `#tab_${applicant.directToTab}`)"
          >
            <StatTracking :stat="extractObj(applicantsSummary, applicant.value)" :increase="applicant.increase" :percentage="applicant.percentage" />
          </widget>
        </div>
      </div>
      <div class="mt-12">
        <span class="text-secondary text-b-2 font-medium flex items-center cursor-pointer dark:text-white mt-16">
          Drivers
        </span>
      </div>
      <div class="row mt-5">
        <div v-for="(driver, index) in driverWidgets" :key="index" class="col-3 mb-6">
          <widget
            class="h-full"
            :title="driver.title"
            :no-shadow="true"
            :no-border="true"
            :big="false"
          >
            <div :class="`row items-center ${driver.date ? 'justify-center' : ''}`">
              <StatTracking
                :stat="extractObj(driverSummary, driver.value)"
                :increase="driver.increase"
                :percentage="driver.percentage"
                class="col-9"
              />
              <Input v-if="driver.date" type="date" class="col-3 flex justify-end" input-style="width:44px;height:44px" />
            </div>
          </widget>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapActions } from 'vuex'
import moment from 'moment'
import { SizeTypeEnum, ActionTypeEnum, ButtonTypeEnum } from '~/components/ts/enums'
import { ApplicantsDetails, ApplicantsSummary } from '~/models/applicants'
import { DriverSummary } from '~/models/driver'
export default Vue.extend({
  name: 'DriverManagementTest',
  layout: 'Dashboard',
  data () {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const self = this
    return {
      vFilter: {},
      opened: false,
      showModal: false,
      SizeTypeEnum,
      ActionTypeEnum,
      ButtonTypeEnum,
      tableKey: 0,
      extendeds: [] as any[],
      dropdownStyle: 'a',
      dropdownMenuDrivers: [
        { text: 'Active', bg: 'green' },
        { text: 'Terminated', bg: 'orange' },
        { text: 'On vocation', bg: 'blue', w: '36' }
      ],
      dropdownMenuApplicants: [
        { text: 'New Applicant', bg: 'green' },
        { text: 'Application Declined', bg: 'red' },
        { text: 'Disqualified', bg: 'red' },
        { text: 'Training', bg: 'orange' },
        { text: 'Application Approved', bg: 'green' }
      ],
      dropdownMenuTrainings: [
        { text: 'Completed', bg: 'green' },
        { text: 'Pending', bg: 'orange' }
      ],
      dropdownMenuDrugTest: [
        { text: 'Completed', bg: 'green' },
        { text: 'Pending', bg: 'orange' }
      ],
      generateActions: [
        {
          name: 'Add New Driver',
          click: function () { self.openDrawer() }
        },
        {
          name: 'Bulk Upload',
          click: function () { self.openFileModal() }
        }
      ],
      selectedDrawer: [
        '',
        'AddDriver',
        'AddApplicants',
        'AddTrainings',
        'AddDrug'

      ],
      linkArr: [
        null,
        '/carrier/dashboard/safety-management/driver/',
        // '/dashboard/safety-management/applicant/',
        null,
        null
      ],
      funcArr: [false, false, true, true, true],
      editPageArr: ['', '', 'EditApplicant', 'EditTraining', 'EditDrugTest'],
      applicants: [
        // { id: 2, title: 'Applicants Pending Documents', value: 28, increase: true, percentage: 10, icon: 'clipboard-export' },
        // { id: 2, title: 'Applicants Pending Approvals', value: 26, increase: false, percentage: 10, icon: 'note-2' },
        // { id: 3, title: 'Applicants Pending Training', value: 28, increase: true, percentage: 10, icon: 'designtools' }
        { id: 1, directToTab: 2, title: 'Applicants Pending Documents', value: 'pending_documents', icon: 'clipboard-export' },
        { id: 2, directToTab: 2, title: 'Applicants Pending Approvals', value: 'pending_approvals', icon: 'note-2' },
        { id: 3, directToTab: 3, title: 'Applicants Pending Training', value: 'pending_training', icon: 'designtools' }
      ],
      tabs: [
        {
          id: 0,
          name: 'Overview',
          icon: 'monitor-mobbile',
          title: 'Driver Management'
        },
        {
          id: 1,
          name: 'All Drivers',
          icon: 'profile-2user',
          title: 'All Drivers'
        },
        {
          id: 2,
          name: 'Applicants',
          icon: 'user-search',
          title: 'Applicants'
        },
        {
          id: 3,
          name: 'Trainings',
          icon: 'user-cirlce-add',
          title: 'Trainings'
        },
        {
          id: 4,
          name: 'Drug Test',
          icon: 'monitor-mobbile',
          title: 'Drug Test'
        }

      ],
      driverWidgets: [
        { title: 'Pending Documents', value: 'drivers_with_pending_docs', date: false },
        { title: 'Training  Scheduled', value: 'scheduled_trainings', date: false },
        { title: 'Off-Duty Drivers', value: 'off_duty_drivers', date: false },
        { title: 'On-Duty Drivers', value: 'on_duty_drivers', increase: false, date: false },
        { title: 'High Risk Drivers', value: 'high_risk_drivers', increase: false, date: false },
        { title: 'Documents Overdue', value: 'drivers_with_overdue_documents', date: false },
        { title: 'Outstanding DVERs', value: 'outstanding_dvers', date: false }
      ],
      driverHeaders: {
        first_name: {
          label: 'Driver Name',
          sortable: true
        },
        employee_type: {
          label: 'Type',
          sortable: true
        },
        hire_date: {
          label: 'Hire Date',
          sortable: true
        },
        contact_phone_number: {
          label: 'Phone Number',
          sortable: true
        },
        email: {
          label: 'E-mail Address',
          sortable: true
        },
        // driver_pending_docs: {
        //   label: 'Pending Doc',
        //   sortable: true
        // },
        status: {
          label: 'Status',
          sortable: true,
          excludeFromLink: true
        }
      },
      applicantHeaders: {
        applicant_first_name: {
          label: 'Applicant Name',
          sortable: true
        },
        type: {
          label: 'Type',
          sortable: true
        },
        hire_date: {
          label: 'Hire Date',
          sortable: true
        },
        applicant_phone_number: {
          label: 'Phone Number',
          sortable: true
        },
        applicant_email_address: {
          label: 'E-mail Address',
          sortable: true
        },
        // number_of_pending_docs: {
        //   label: 'Pending Doc',
        //   sortable: true
        // },
        status: {
          label: 'Status',
          sortable: true,
          excludeFromLink: true
        }
      },
      trainingHeaders: {
        driver_id: {
          label: 'Driver ID',
          sortable: true
        },
        // document_id: {
        //   label: 'Document ID',
        //   sortable: true
        // },
        employee_type: {
          label: 'Employee Type',
          sortable: true
        },
        type: {
          label: 'Training Type',
          sortable: true
        },
        description: {
          label: 'Training Description',
          sortable: true
        },
        cadence: {
          label: 'Cadence',
          sortable: true
        },
        completion_date: {
          label: 'Completion Date',
          sortable: true
        },
        status: {
          label: 'Status',
          sortable: true,
          excludeFromLink: true
        }
      },
      trainingTestData: [
        {
          employee_type: 'Driver',
          employee_id: 'Driver 1',
          training_type: 'Road',
          training_description: 'Pre driving test',
          cadence: 'One-time',
          completion_date: '08/10/2022',
          document_id: '102',
          status: 'Pass'
        },
        {
          employee_type: 'Driver',
          employee_id: 'Driver 1',
          training_type: 'Road',
          training_description: 'Post driving test',
          cadence: 'One-time',
          completion_date: '08/10/2022',
          document_id: '106',
          status: 'Pass'
        },
        {
          employee_type: 'Driver',
          employee_id: 'Driver 1',
          training_type: 'Classroom',
          training_description: 'HOS',
          cadence: 'Annual',
          completion_date: '08/14/2022',
          document_id: '108',
          status: 'Pass'
        },
        {
          employee_type: 'Driver',
          employee_id: 'Driver 1',
          training_type: 'Classroom',
          training_description: 'Onboarding',
          cadence: 'One-time',
          completion_date: '08/14/2022',
          document_id: '110',
          status: 'Completed'
        },
        {
          employee_type: 'Dispatcher',
          employee_id: 'Dispatcher 1',
          training_type: 'Classroom',
          training_description: 'Onboarding',
          cadence: 'One-time',
          completion_date: '08/14/2022',
          document_id: '112',
          status: 'Completed'
        }
      ],
      drugTestHeaders: {
        id: {
          label: 'ID',
          sortable: true
        },
        driver_id: {
          label: 'Driver ID',
          sortable: true
        },
        // driver_name: {
        //   label: 'Driver Name',
        //   sortable: true
        // },
        type: {
          label: 'Drug Test Type',
          sortable: true
        },
        status: {
          label: 'Status',
          sortable: true,
          excludeFromLink: true
        },
        result: {
          label: 'Result',
          sortable: true
        },
        date: {
          label: 'Test Date',
          sortable: true
        }
      },
      selectedTab: 0
    }
  },
  computed: {
    decideTheAddButton () {
      if (this.selectedTab === 1) {
        return () => { this.opened = !this.opened }
      } else {
        return this.openDrawer
      }
    },
    decideAddNew () {
      if (this.selectedTab === 1) {
        return this.generateActions
      } else {
        this.opened = false
        return null
      }
    },
    applicantsSummary (): ApplicantsSummary {
      return (this.$store.getters['applicants/carrierSummary'])
    },
    driverSummary (): DriverSummary {
      return (this.$store.getters['driver/carrierSummary'])
    },
    applicantsDetails (): ApplicantsDetails[] {
      return (this.$store.getters['applicants/applicants'])
    },
    driverPageCount (): number {
      return (this.$store.getters['driver/pageCount'])
    },
    applicantsPageCount (): number {
      return (this.$store.getters['applicants/pageCount'])
    },
    trainingPageCount (): number {
      return (this.$store.getters['training/pageCount'])
    },
    drugTestPageCount (): number {
      return (this.$store.getters['drugTest/pageCount'])
    },
    defaultTabs (): any {
      return { ...this.$store.getters.tabs }
    },
    getTitle () {
      switch (this.selectedTab) {
        case 0:
          return 'Driver Management'
        case 1:
          return 'All Drivers'
        case 2:
          return 'Applicants'
        case 3:
          return 'Trainings'
        case 4:
          return 'Drug Test'

        default:
          return ''
      }
    },
    getEdit () {
      switch (this.selectedTab) {
        case 0:
          return false
        case 1:
          return false
        case 2:
          return true
        case 3:
          return true
        case 4:
          return true
        default:
          return false
      }
    },
    getEditPage () {
      switch (this.selectedTab) {
        case 0:
          return null
        case 1:
          return null
        case 2:
          return 'EditApplicant'
        case 3:
          return 'EditTraining'
        case 4:
          return 'EditDrugTest'
        default:
          return null
      }
    },
    getDelete () {
      switch (this.selectedTab) {
        case 0:
          return false
        case 1:
          return true
        case 2:
          return true
        case 3:
          return true
        case 4:
          return true
        default:
          return false
      }
    },
    getDeleteFunction () {
      switch (this.selectedTab) {
        case 0:
          return () => {}
        case 1:
          return null
        case 2:
          return this.removeApplicant
        case 3:
          return this.removeTraining
        case 4:
          return this.removeDrug
        default:
          return () => {}
      }
    },
    getSubtext () {
      switch (this.selectedTab) {
        case 0:
          return ''
        case 1:
          return ''
        case 2:
          return 'Applicants'
        case 3:
          return 'Trainings'
        case 4:
          return 'DrugTest'

        default:
          return ''
      }
    },
    getHeader () {
      switch (this.selectedTab) {
        case 0:
          return null
        case 1:
          return this.driverHeaders
        case 2:
          return this.applicantHeaders
        case 3:
          return this.trainingHeaders
        case 4:
          return this.drugTestHeaders
        default:
          return {}
      }
    },
    requestFunc () {
      switch (this.selectedTab) {
        case 0:
          return null
        case 1:
          return this.getDrivers
        case 2:
          return this.getApplicants
        case 3:
          return this.getTrainings
        case 4:
          return this.getDrugs
        default:
          return null
      }
    },
    getDeleteFunc () {
      switch (this.selectedTab) {
        case 0:
          return null
        case 1:
          return null
        case 2:
          return null
        case 3:
          return this.removeTraining
        case 4:
          return this.removeDrug
        default:
          return null
      }
    },
    getTableData () {
      switch (this.selectedTab) {
        case 0:
          return null
        case 1:
          return this.drivers
        case 2:
          return this.applicants2
        case 3:
          return this.trainings
        case 4:
          return this.drugTests
        default:
          return []
      }
    },
    getOptionsStatus () {
      switch (this.selectedTab) {
        case 0:
          return null
        case 1:
          return this.dropdownMenuDrivers
        case 2:
          return this.dropdownMenuApplicants
        case 3:
          return this.dropdownMenuTrainings
        case 4:
          return this.dropdownMenuDrugTest
        default:
          return []
      }
    },
    getPageCount () {
      switch (this.selectedTab) {
        case 1:
          return this.driverPageCount
        case 2:
          return this.applicantsPageCount
        case 3:
          return this.trainingPageCount
        case 4:
          return this.drugTestPageCount
        case 5:
          return 0
        default:
          return 0
      }
    },
    drivers () {
      if (this.$store.getters['driver/carrierDrivers'] !== null &&
        this.$store.getters['driver/carrierDrivers'] !== undefined) {
        return (this.$store.getters['driver/carrierDrivers'])
      } else {
        return []
      }
    },
    applicants2 () {
      if (this.$store.getters['applicants/carrierApplicants'] !== null && this.$store.getters['applicants/carrierApplicants'] !== undefined) {
        return (this.$store.getters['applicants/carrierApplicants'])
      } else {
        return []
      }
    },
    trainings () {
      if (this.$store.getters['training/carrierTrainings'] !== null && this.$store.getters['training/carrierTrainings'] !== undefined) {
        return (this.$store.getters['training/carrierTrainings'])
      } else {
        return []
      }
    },
    drugTests () {
      if (this.$store.getters['drugTest/carrierDrugTests'] !== null && this.$store.getters['drugTest/carrierDrugTests'] !== undefined) {
        return (this.$store.getters['drugTest/carrierDrugTests'])
      } else {
        return []
      }
    },
    drawerSelection () {
      return this.selectedDrawer[this.selectedTab]
    }

  },
  created () {
    this.getApplicantsSummary({ page_number: 1 })
    this.getDriversSummary({ page_number: 1 })
    console.log(this.defaultTabs)
    const queryTab = this.$route.query.tab
    const queryFilter = this.$route.query.filter
    if (queryFilter) {
      if (queryFilter === 'Pending') {
        this.vFilter.test_status = queryFilter
      } else {
        this.vFilter.driver_status = queryFilter
      }
    }
    if (queryTab) {
      this.selectedTab = parseInt(queryTab)
    } else {
      this.select(this.defaultTabs?.safety.driver ?? 10)
    }
  },
  methods: {
    decideTheAddButton () {
      if (this.selectedTab === 1) {
        this.opened = !this.opened
      } else {
        this.openDrawer()
      }
    },
    executeAction (action:any) {
      action.click()
      this.opened = false
    },
    extendItemDrivers (event:MouseEvent, item: any, menuItem?:string | null): void {
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
    setStatusDrivers (id:number, newStatus:any) {
      const data = this.drivers.slice()
      console.log(id, newStatus)
      const item = data.find((w:any) => w.id === id)
      this.updateDriver({
        ...item,
        status: newStatus,
        compensation: parseInt(item.compensation),
        driver_avatar: parseInt(item.driver_avatar),
        driver_pending_docs: parseInt(item.driver_pending_docs),
        driver_score: parseInt(item.driver_score),
        recurring_deductions: parseInt(item.recurring_deductions),
        trailer_id: parseInt(item.trailer_id),
        truck_id: parseInt(item.truck_id),
        cdl_expiration_date: moment(item.cdl_expiration_date).toISOString(),
        cdl_issue_date: moment(item.cdl_issue_date).toISOString(),
        driver_hire_date: moment(item.driver_hire_date).toISOString(),
        next_drug_test_date: moment(item.next_drug_test_date).toISOString(),
        driver_dob: moment(item.driver_dob).toISOString(),
        twic_card: true,
        is_restricted: true,
        w9_exist: true
      })
    },
    extendItemApplicants (event:MouseEvent, item: any, menuItem?:string | null): void {
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
    setStatusApplicants (id:number, newStatus:any) {
      const data = this.applicants2.slice()
      console.log(id, newStatus)
      const item = data.find((w:any) => w.id === id)
      this.updateApplicant({
        ...item,
        status: newStatus
      } as ApplicantsDetails)
    },
    extendItemAll (event:MouseEvent, item: any, menuItem?:string | null): void {
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
    setStatusAll (id: number, newStatus: any) {
      const data = this.getTableData.slice()
      console.log(id, 'gjhgjhg', newStatus)
      const item = data.find((w: any) => w.id === id)
      console.log('testes', this.selectedTab)

      switch (this.selectedTab) {
        case 1:
          this.updateDriver({
            ...item,
            status: newStatus
          })
          break
        case 2:
          this.updateApplicant({
            ...item,
            status: newStatus
          })
          break
        case 3:
          this.updateTraining({
            ...item,
            status: newStatus
          })
          break
        case 4:
          this.updateDrugTest({
            ...item,
            status: newStatus
          })
          break
        default:
          console.log('Unknown status')
      }
    },
    extendItemTrainings (event:MouseEvent, item: any, menuItem?:string | null): void {
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
    setStatusTrainings (id:number, newStatus:any) {
      const data = this.trainings.slice()
      console.log(id, newStatus)
      const item = data.find((w:any) => w.id === id)
      this.updateTraining({
        ...item,
        status: newStatus,
        document_id: item.document_id.toString(),
        employee_id: item.employee_id.toString(),
        completion_date: moment(item.completion_date).toISOString()
      })
    },
    extendItemDrugTest (event:MouseEvent, item: any, menuItem?:string | null): void {
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
    setStatusDrugTest (id:number, newStatus:any) {
      const data = this.drugTests.slice()
      console.log(id, newStatus)
      const item = data.find((w:any) => w.id === id)
      this.updateDrugTest({
        ...item,
        test_status: newStatus,
        carrier_id: item.carrier_id.toString(),
        driver_id: item.driver_id.toString(),
        test_date: moment(item.test_date).toISOString()
      })
    },
    hideFileModal (): void {
      (this.$refs.fileModal as Vue & { hideModal: () => Function }).hideModal()
    },
    openDrawer (): void {
      this.drawer(this.drawerSelection)
    },
    drawer (componentName: string) {
      this.$refs.drawer.showDrawer(componentName)
    },
    ...mapActions({
      setDefaultTab: (action, tabs) => action('setDefaultTab', tabs),

      // Overview
      getApplicantsSummary: (action, id) => action('applicants/getSummaryByCarrierId', id),
      getDriversSummary: (action, id) => action('driver/getSummaryByCarrierId', id),

      // All Drivers
      getDrivers: (action, page) => action('driver/getDriversByCarrierId', page),
      updateDriver: (action, request) => action('driver/updateDriver', request),

      // Applicants
      getApplicants: (action, page) => action('applicants/getApplicantsByCarrierId', page),
      updateApplicant: (action, request) => action('applicants/updateApplicant', request),
      removeApplicant: (action, page) => action('applicants/removeApplicant', page),

      // Trainings
      getTrainings: (action, page) => action('training/getTrainingsByCarrierId', page),
      updateTraining: (action, request) => action('training/updateTraining', request),
      removeTraining: (action, page) => action('training/removeTraining', page),

      // Drug Test
      getDrugs: (action, page) => action('drugTest/getDrugTestsByCarrierId', page),
      removeDrug: (action, page) => action('drugTest/removeDrugTest', page),
      updateDrugTest: (action, request) => action('drugTest/updateDrugTest', request)
    }),
    checkDefault (index:number): boolean {
      return this.defaultTabs.safety?.driver === index
    },
    setTab (index:number) {
      const newTabs = JSON.parse(JSON.stringify(this.defaultTabs))
      newTabs.safety.driver = index
      this.setDefaultTab(newTabs)
    },
    select (index: number, anchor?: keyof HTMLElementTagNameMap | string | null) {
      console.log(index)
      this.vFilter = {}
      this.selectedTab = index
      this.getKey()
      if (anchor) {
        setTimeout(function () {
          (document.querySelector(anchor) as Element).scrollIntoView({ behavior: 'smooth' })
        }, 150)
      }
    },
    openFileModal () {
      (this.$refs.fileModal as Vue & { showModal: () => Element }).showModal()
    },
    formatDate (date: string): string {
      if (date === '0000-00-00 00:00:00') {
        return '00-00-0000 00:00'
      } else {
        return moment(date).format('MM-DD-yyyy hh:mm')
      }
    },
    getKey () {
      this.tableKey = Math.random()
    },
    extractObj (object: any, strIndex: string) {
      if (object) {
        return object[strIndex]
      } else {
        return null
      }
    }
  }
})

</script>
<style scoped>

</style>
