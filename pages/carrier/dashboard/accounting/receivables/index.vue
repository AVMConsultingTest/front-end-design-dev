<template>
  
  <div class="w-full">
    <PageHeader title="Receivables Dashboard">
    </PageHeader>
    <Drawer ref="drawer" />
    <div class="row mb-8">
      <div class="col-12">
        <div class="row mx-0">
          <div class="col-12 p-0 pr-2 flex">
            <TabButton
              v-for="(tab, index) in tabs"
              :key="index"
              class="mr-2"
              :title="tab.name"
              color="green"
              :icon="tab.icon"
              :active="(selectedTab === index)"
              @click="() => {select(index); if(hideIndex !== 0) {
                resetHideIndex()
              }}"
            />
            <div v-if="(selectedTab === 1)" class="m-0 ml-auto">
              <div class="flex justify-between">
                <Button
                  :type="ButtonTypeEnum.PRIMARY"
                  :size="SizeTypeEnum.LG"
                  :action="ActionTypeEnum.SUBMIT"
                  class="!h-12 max-w-max p-4 !w-20 flex text-b-3"
                  @click="drawer('CreateInvoice')"
                >
                  Create
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Modal ref="modal" size="sm" position="center">
      <div slot="body" class="row flex items-center justify-center pt-16 pb-14">
        <div class="col-8 items-center justify-center">
          <h3 class="font-semibold text-center mb-2">
            Add Notes
          </h3>
        </div>
        <div class="col-8 mt-10">
          <Form fclass="row my-2" @send="handleSubmit">
            <div class="col-12 mb-6">
              <label for="message" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your notes</label>
              <textarea id="message" rows="6" class="block p-2.5 w-full text-sm text-gray-900  rounded-lg border border-gray-300   dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
            </div>
            <div class="col-12 flex justify-around items-baseline">
              <div class="col-6">
                <Button
                  :type="ButtonTypeEnum.GREEN"
                  :size="SizeTypeEnum.LG"
                  :action="ActionTypeEnum.SUBMIT"
                  class="!bg-orange-700 !text-white max-w-max p-4"
                >
                  Add Notes
                </Button>
              </div>

              <div class="col-auto ml-auto">
                <Button
                  :type="ButtonTypeEnum.PRIMARY"
                  :size="SizeTypeEnum.LG"
                  :action="ActionTypeEnum.BUTTON"
                  class="mt-2 max-w-max p-4"
                  @click="hideModal()"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </Form>
        </div>
      </div>
    </Modal>
    <div v-if="(selectedTab === 0)">
      <div class="row mt-12 mb-6">
        <SectionHeader title="Popular Metrics" class="mb-6" />
        <div class="col-4">
          <widget
            :title="`Invoices`"
            icon="clipboard-text"
            icon-color="purple"
            :icon-alpha="400"
          >
            <div class="row items-end">
              <StatTracking :stat="receivable?.ready_for_invoicing" class="col-5 border-r border-[#E0E1E5]" sub-title="Ready for invoicing" />
              <StatTracking :stat="receivable?.pending_for_broker_payment" class="col-7 " sub-title="Pending for broker payment" />
            </div>
          </widget>
        </div>
        <div class="col-4">
          <widget :title="`Avg. Payout Per Load`" icon="backward-item" icon-color="dark-blue" :icon-alpha="0">
            <div class="row items-end">
              <StatTracking :currency="true" :stat="receivable?.payout_amazon" class="col-5 border-r border-[#E0E1E5]" sub-title="By Amazon" />
              <StatTracking :currency="true" :stat="receivable?.payout_broker" class="col-7 " sub-title="By Broker" />
            </div>
          </widget>
        </div>
        <div class="col-4">
          <widget
            :title="`Broker Onboarding`"
            icon="profile"
            icon-color="orange"
            :icon-fill="true"
            :icon-alpha="0"
          >
            <div class="row items-end">
              <StatTracking :stat="receivable?.new_contracts" class="col-5 border-r border-[#E0E1E5]" sub-title="New Contracts" />
              <StatTracking :stat="receivable?.pending_contracts" class="col-7 " sub-title="Pending Contract" />
            </div>
          </widget>
        </div>
      </div>
      <div class="row mb-6">
        <div class="col-4">
          <widget
            :title="`Broker Management`"
            icon="briefcase"
            icon-color="green"
            :icon-alpha="400"
          >
            <div class="row items-end">
              <StatTracking :stat="receivable?.credit_increase_requests" class="col-5 border-r border-[#E0E1E5]" sub-title="Credit Increase Request" />
              <StatTracking :stat="receivable?.credit_rating_decreased" class="col-7 " sub-title="Credit Rating Decreased" />
            </div>
          </widget>
        </div>
        <div class="col-4">
          <widget class="h-full" :title="`Payment Received`" icon="dollar-square" icon-color="red" :icon-alpha="0">
            <template #actions>
              <Input type="date" class="ml-auto col-3 flex justify-end" input-style="width:44px;height:44px; zoom:0.8" />
            </template>
            <div class="row items-end">
              <StatTracking :currency="true" :stat="receivable?.recieved_payment_amazon" class="col-5 border-r border-[#E0E1E5]" sub-title="By Amazon" />
              <StatTracking :currency="true" :stat="receivable?.recieved_payment_factoring" class="col-7 " sub-title="By Factoring" />
            </div>
          </widget>
        </div>
        <div class="col-4">
          <widget
            go-to="/carrier/dashboard/accounting/receivables/factoring"
            class="h-full"
            :title="`Factoring`"
            icon="document-sketch"
            icon-color="purple"
            :icon-alpha="800"
          >
            <div class="row items-end">
              <StatTracking :stat="receivable?.total_factoring" class="col-5 border-r border-[#E0E1E5]" sub-title="Total Factoring" />
              <StatTracking :stat="receivable?.total_amount" :currency="true" class="col-7 " sub-title="Total Amount" />
            </div>
          </widget>
        </div>
      </div>
      <div class="row mb-24">
        <div class="col-6">
          <widget title="Payment Recieved" :no-border="true" class="p-2">
            <template #actions>
              <div class="w-40">
                <m-select
                  :multiple="false"
                  :options="rangeOptions"
                  name="reportRange"
                  wrapper-class="!text-c-1"
                />
              </div>
            </template>
            <div id="graph-chart">
              <apexchart v-if="dataFetched" type="area" height="350" :options="chartOptions" :series="series" />
            </div>
          </widget>
        </div>
        <div class="col-6">
          <widget title="Breakdown of Broker Pending Payments" :no-border="true" class="p-2">
            <template #actions>
              <div class="w-40">
                <m-select
                  :multiple="false"
                  :options="rangeOptions"
                  name="reportRange"
                  wrapper-class="!text-c-1"
                />
              </div>
            </template>
            <div class="row ml-24 mb-8">
              <div class="col-auto">
                <span class="text-b-4 font-medium">To Factoring</span>
              </div>
              <div class="col-auto ml-32">
                <span class="text-b-4 font-medium">To Carrier</span>
              </div>
            </div>
            <div id="bar-chart">
              <apexchart height="290" type="bar" :options="barOptions" :series="breakdownBroker" />
            </div>
          </widget>
        </div>
      </div>
    </div>
    <div v-if="(selectedTab === 1 || selectedTab === 2)" class="row mt-16 mb-6">
      <div class="col-12 mb-5">
        <Table
          :key="tableKey"
          :title="getTitle"
          icon="bill"
          icon-color="green"
          :icon-alpha="800"
          :headers="getHeaders"
          
        
          :data="getData"
          :request-function="getRequest"
          :page-count="getPageCount"
          :filtering-model="vfilter"
          :search-enabled="true"
          :selected-tab="selectedTab"
          content-style="!tw-unset"
        >
          <template #custom-filter>
            <div class="flex flex-wrap p-6">
              <div
                v-for="(filter, index) in filterModels"
                v-if="filter.tabShown === selectedTab"
                :key="index"
                :class="`col-${filter.colSpan} px-1 mb-2`"
              >
                <Input
                  v-if="filter.inputType === 'input' || filter.inputType === 'date'"
                  v-model="vfilter[filter.modelName]"
                  :name="filter.modelName"
                  :type="filter.inputType === 'input' ? 'text' : 'date'"
                  :placeholder="filter.filterName"
                  :debounce-timer="1000"
                />
                <m-select
                  v-else
                  v-model="vfilter[filter.modelName]"
                  :options="filter.options"
                  :name="filter.filterName"
                  :horizontal="filter.multiple !== undefined && filter.multiple"
                  :placeholder="filter.filterName"
                  :bind-text="true"
                  :is-nullable="true"
                />
              </div>
            </div>
          </template>
          <template #item-load="{ item }">
            <div v-if="(selectedTab === 1)" class="flex items-center">
              <div class="col-auto">
                <span class="block text-dark-blue">
                  {{ item.load }}
                </span>
              </div>
            </div>
            <nuxt-link v-else to="#">
              <span class="text-dark-blue"> {{ item.load }}</span>
            </nuxt-link>
          </template>
          <template #item-broker_name="{ data, index }">
            <div class="row">
              <div class="col-auto">
                <span class="block font-semibold">
                  {{ data[index].broker_name }}
                </span>
              </div>
            </div>
          </template>
          <template #item-broker_id="{ item }">
            <div v-if="(selectedTab === 1)" class="flex items-center">
              <div class="col-auto">
                <span class="block text-gray-400">
                  {{ item.broker_id }}
                </span>
              </div>
            </div>
            <span v-else class="text-gray-400"> {{ item.broker_id }}</span>
          </template>
          <template #item-driver_name="{ data, index }">
            <div class="row">
              <div class="col-auto">
                <span class="block font-semibold">
                  {{ data[index].driver_name }}
                </span>
              </div>
            </div>
          </template>
          <template #item-note="{item}">
            <NotesEdit
              :item="getNoteItem(item)"
              note-prop-key="notes"
              :edit-function="updateInvoice"
            />
          </template>
          <template #item-load_complete_date="{ item }">
            <span class="font-medium"> {{ item.load_complete_date }}</span>
          </template>
          <template #item-driver_id="{ item }">
            <span class="font-normal"> {{ item.driver_id }}</span>
          </template>
          <template #item-payout="{ item }">
            <span> {{ item.payout | toCurrency }}</span>
          </template>
          <template #item-invoice_status="{ item }">
            <Status
              :item="item"
              :active="extendeds.includes(item.id)"
              :item-status="item.invoice_status"
              :dropdown-menu="dropdownMenu"
              :dropdown-style="dropdownStyle"
              @extend="extendItem"
              @set-status="setStatus"
            />
          </template>
          <template #item-documents="{ item }">
            <div
              class="flex items-center gap-2 relative p-c"
              @click="(e)=> {
                getPosition(e,item.id,hideIndex);
                incrementHideIndex();
                
              }"
            >
              <Icon icon="document-text" color="purple-blue" :alpha="0" variant="bulk" class="w-4 h-4 p-c" />
              <!-- <span class="p-c"> {{ item.documents }} Doc(s)</span>  gives .length is an unknown prop error -->
              <span class="p-c"> {{ 3 }} Doc(s)</span>
              <transition name="slide">
                <div v-if="hoverId === item.id" :style="dropdownStyle" class="fixed text-left rounded-lg bg-white left-0 right-0 w-60 shadow-2xl dp">
                  <div @click="()=>{resetHideIndex(); incrementHideIndex()}"
                  class="p-1 absolute top-1 right-3 text-lg">×</div>
                  <ul class="px-4 py-3">
                    <li class="text-c-1 font-semibold mb-4">
                      Documents
                    </li>
                    <li class="text-c-2 font-semibold text-gray-800 w-full flex items-center gap-4 cursor-pointer mb-2">
                      <Icon icon="document-text" color="red" :alpha="0" variant="bulk" class="w-4 h-4" />
                      <span>RateConf.pdf</span>
                      <Icon icon="arrow-down-1" color="gray" :alpha="0" class="w-4 h-4 ml-auto" />
                    </li>
                    <li class="text-c-2 font-semibold text-gray-800 w-full flex items-center gap-4 cursor-pointer mb-2">
                      <Icon icon="document-text" color="red" :alpha="0" variant="bulk" class="w-4 h-4" />
                      <span>Document Name.pdf</span>
                      <Icon icon="arrow-down-1" color="gray" :alpha="0" class="w-4 h-4 ml-auto" />
                    </li>
                    <li class="text-c-2 font-semibold text-gray-800 w-full flex items-center gap-4 cursor-pointer">
                      <Icon icon="document-text" color="red" :alpha="0" variant="bulk" class="w-4 h-4" />
                      <span>Document Name.pdf</span>
                      <Icon icon="arrow-down-1" color="gray" :alpha="0" class="w-4 h-4 ml-auto" />
                    </li>
                  </ul>
                  
                  <div class="p-1 bg-white w-4 h-4 rotate-45 relative left-[50%] top-[6px] rounded-[3px]"></div>
                </div>
              </transition>
            </div>
          </template>
          <template #item-invoice_action="{ item }">
            <div v-if="(selectedTab === 1)" class="flex items-center">
              <div class="inline-flex justify-end items-start gap-1">
                
                  <Button class="flex w-12 h-8 justify-center items-center px-3.5 py-1.5 border rounded-lg border-solid border-[#192038] bg-white hover:!bg-slate-300">
                    
                      <Icon icon="edit-2" variant="transparent" color="black"  class="w-5 h-5"  />
                    
                  </Button>
                  <Button class="flex w-16 h-8 justify-center items-center pl-[0.6875rem] pr-[0.8125rem] py-2">
                    <span class="text-white text-center text-xs not-italic font-medium leading-4">Submit</span>
                  </Button>
              
              </div>
            </div>
            <nuxt-link v-else to="#">
              <span class="text-dark-blue"> {{ item.load }}</span>
            </nuxt-link>
          </template>
        </Table>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapActions } from 'vuex'
import moment from 'moment'
import { SizeTypeEnum, ButtonTypeEnum, ActionTypeEnum } from '../../../../../components/ts/enums'
import { SelectOption } from '~../../../components/ts/interfaces'
import { ReceivablesSummary } from '~../../../models/accounting/receivables/receivablesSummary'
import { ReceivedPaymentDetails } from '~../../../models/accounting/receivesPayment/receivedPaymentDetails'
import { BreakdownBrokerPaymentsDetail } from '~../../../models/accounting/breakdownBrokerPayments/breakdownBrokerPaymentsDetails'
import { InvoicingDetails } from '~../../../models/accounting/invoicingDetails/invoicingDetails'
import { InvoiceBoardDetails } from '~../../../models/accounting/invoiceBoard/invoiceBoardDetails'
export default Vue.extend({
  layout: 'Dashboard',
  data () {
    return {
      SizeTypeEnum,
      ActionTypeEnum,
      ButtonTypeEnum,
      showModal: false,
      selectedTab: 0,
      tableKey: 0,
      hoverId: 0,
      dataFetched: false,
      request: {} as ReceivablesSummary,
      extendeds: [] as any[],
      dropdownStyle: 'a',
      hideIndex: 0,
      isHidden: true,
      dropdownMenu: [
        { text: 'Open', bg: 'green' },
        { text: 'Submitted', bg: 'orange' },
        { text: 'In-dispute', bg: 'red', W: '36' }
      ],
      statusOptions: [
        { id: 1, text: 'Open' },
        { id: 2, text: 'Submitted' },
        { id: 3, text: 'In-dispute' }
      ],
      tabs: [
        {
          name: 'Dashboard',
          icon: 'monitor-mobbile'
        },
        {
          name: 'Invoice',
          icon: 'document'
        },
        {
          name: 'Invoice Board',
          icon: 'document'
        }
      ],
      vfilter: {} as { [key: string]: unknown },
      filterModels: [
        {
          modelName: 'broker_name',
          filterName: 'Broker Name',
          inputType: 'input',
          colSpan: 3,
          multiple: true,
          tabShown: 1,
          options: [
            { id: 1, text: 'Tabbatha Sawford' },
            { id: 2, text: 'Queenie McHale' },
            { id: 3, text: 'Giralda Kilfoyle' }
          ]
        },
        {
          modelName: 'driver_name',
          filterName: 'Driver Name',
          inputType: 'input',
          colSpan: 2,
          multiple: true,
          tabShown: 1,
          options: [
            { id: 1, text: 'Driving' }
          ]
        },
        {
          modelName: 'gross_pay',
          filterName: 'Gross Pay',
          inputType: 'input',
          colSpan: 2,
          multiple: true,
          tabShown: 1,
          options: [
            { id: 1, text: 'Option 1' },
            { id: 2, text: 'Option 2' },
            { id: 3, text: 'Option 3' }
          ]
        },
        {
          modelName: 'invoice_id',
          filterName: 'Invoice ID',
          inputType: 'input',
          colSpan: 2,
          multiple: true,
          tabShown: 1,
          options: [
            { id: 1, text: 'Option 1' },
            { id: 2, text: 'Option 2' },
            { id: 3, text: 'Option 3' }
          ]
        },
        {
          modelName: 'load_id',
          filterName: 'Load ID',
          inputType: 'input',
          colSpan: 2,
          multiple: true,
          tabShown: 2,
          options: [
            { id: 1, text: 'Option 1' },
            { id: 2, text: 'Option 2' },
            { id: 3, text: 'Option 3' }
          ]
        },
        {
          modelName: 'broker_id',
          filterName: 'Broker ID',
          inputType: 'input',
          colSpan: 2,
          multiple: true,
          tabShown: 2,
          options: [
            { id: 1, text: 'Option 1' },
            { id: 2, text: 'Option 2' },
            { id: 3, text: 'Option 3' }
          ]
        },
        {
          modelName: 'driver_name',
          filterName: 'Driver Name',
          inputType: 'input',
          colSpan: 2,
          multiple: true,
          tabShown: 2,
          options: [
            { id: 1, text: 'Driving' }
          ]
        },
        {
          modelName: 'invoice_id',
          filterName: 'ID',
          inputType: 'input',
          colSpan: 2,
          multiple: true,
          tabShown: 2,
          options: [
            { id: 1, text: 'Option 1' },
            { id: 2, text: 'Option 2' },
            { id: 3, text: 'Option 3' }
          ]
        }
      ],
      invoiceHeaders: {
        load_id: {
          label: 'Load'
        },
        load_complete_date: {
          label: 'Load Complete Date'
        },
        broker_name: {
          label: 'Broker Name',
          sortable: true
        },
        broker_id: {
          label: 'Broker ID'
        },
        driver_name: {
          label: 'Driver Name'
        },
        driver_id: {
          label: 'Driver ID'
        },
        gross_pay: {
          label: 'Gross Pay'
        },
        documents: {
          label: 'Documents'
        },
        invoice_id: {
          label: 'Invoice ID'
        },
        notes: {
          label: 'Notes'
        },
        invoice_action: {
          label:  'Action'
        }
      },
      invoiceData: [
        {
          id: 1,
          load: 'Load 1',
          load_comp_date: '09/07/2022',
          broker_name: 'Bill Sanders',
          broker_id: 'MC #1',
          driver_name: 'Bill Sanders',
          driver_id: 'Driver 1 ID',
          gross_pay: '$3.122',
          documents: 'safety.pdf',
          invoice_id: '3498',
          note: ''
        },
        {
          id: 2,
          load: 'Load 2',
          load_comp_date: '09/07/2022',
          broker_name: 'Bill Sanders',
          broker_id: 'MC #1',
          driver_name: 'Bill Sanders',
          driver_id: 'Driver 1 ID',
          gross_pay: '$3.122',
          documents: 'broker.pdf',
          invoice_id: '3498',
          note: ''
        }
      ],
      boardHeaders: {
        load_id: {
          label: 'Load',
          searchable: true,
          sortable: true
        },
        load_complete_date: {
          label: 'Load Complete Date',
          searchable: true,
          sortable: true
        },
        broker_name:
        {
          label: 'Broker Name',
          searchable: true,
          sortable: true
        },
        broker_id:
        {
          label: 'Broker ID',
          searchable: true,
          sortable: true
        },
        driver_name:
        {
          label: 'Driver Name',
          searchable: true,
          sortable: true
        },
        driver_id: {
          label: 'Driver ID',
          searchable: true,
          sortable: true
        },
        payout:
        {
          label: 'Payout',
          searchable: true,
          sortable: true
        },
        documents:
        {
          label: 'Documents',
          searchable: true,
          sortable: true
        },
        invoice_id:
        {
          label: 'Invoice ID',
          searchable: true,
          sortable: true
        },
        billing:
        {
          label: 'Billing',
          searchable: true,
          sortable: true
        },
        factoring_payment:
        {
          label: 'Factory Payment',
          searchable: true,
          sortable: true
        },
        invoice_status:
        {
          label: 'Status',
          searchable: true,
          sortable: true,
          sticky: false
        }
      },
      boardData: [
        {
          id: 1,
          load: 'Load 1',
          load_complete_date: '6/17/2022',
          broker_name: 'Amazon',
          broker_id: 'MC #1',
          driver_name: 'Bill Sanders',
          driver_id: '#1123',
          payout: 3.122,
          documents: ['doc1', 'doc2', 'doc3'],
          invoice_id: 3498,
          billing: 'Factory',
          factory_payment: 'Paid',
          status: 'Paid'
        },
        {
          id: 2,
          load: 'Load 1',
          load_complete_date: '6/17/2022',
          broker_name: 'Amazon',
          broker_id: 'MC #1',
          driver_name: 'Bill Sanders',
          driver_id: '#1123',
          payout: 3.122,
          documents: ['doc1', 'doc2', 'doc3'],
          invoice_id: 3498,
          billing: 'Factory',
          factory_payment: 'Paid',
          status: 'Rejected'
        },
        {
          id: 3,
          load: 'Load 1',
          load_complete_date: '6/17/2022',
          broker_name: 'Amazon',
          broker_id: 'MC #1',
          driver_name: 'Bill Sanders',
          driver_id: '#1123',
          payout: 3.122,
          documents: ['doc1', 'doc2', 'doc3'],
          invoice_id: 3498,
          billing: 'Factory',
          factory_payment: 'Paid',
          status: 'Paid'
        },
        {
          id: 4,
          load: 'Load 1',
          load_complete_date: '6/17/2022',
          broker_name: 'Amazon',
          broker_id: 'MC #1',
          driver_name: 'Bill Sanders',
          driver_id: '#1123',
          payout: 3.122,
          documents: ['doc1', 'doc2', 'doc3'],
          invoice_id: 3498,
          billing: 'Factory',
          factory_payment: 'Pending',
          status: 'Rejected'
        },
        {
          id: 5,
          load: 'Load 1',
          load_complete_date: '6/17/2022',
          broker_name: 'Amazon',
          broker_id: 'MC #1',
          driver_name: 'Bill Sanders',
          driver_id: '#1123',
          payout: 3.122,
          documents: ['doc1', 'doc2', 'doc3'],
          invoice_id: 3498,
          billing: 'Factory',
          factory_payment: 'Paid',
          status: 'In-dispute'
        },
        {
          id: 6,
          load: 'Load 1',
          load_complete_date: '6/17/2022',
          broker_name: 'Amazon',
          broker_id: 'MC #1',
          driver_name: 'Bill Sanders',
          driver_id: '#1123',
          payout: 3.122,
          documents: ['doc1', 'doc2', 'doc3'],
          invoice_id: 3498,
          billing: 'Factory',
          factory_payment: 'Paid',
          status: 'Paid'
        },
        {
          id: 7,
          load: 'Load 1',
          load_complete_date: '6/17/2022',
          broker_name: 'Amazon',
          broker_id: 'MC #1',
          driver_name: 'Bill Sanders',
          driver_id: '#1123',
          payout: 3.122,
          documents: ['doc1', 'doc2', 'doc3'],
          invoice_id: 3498,
          billing: 'Factory',
          factory_payment: 'Pending',
          status: 'In-dispute'
        }
      ],
      rangeOptions: [
        {
          id: 'Weekly',
          text: 'Weekly',
          selected: true,
          icon: { name: 'calendar', variant: 'bulk' }
        },
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
      ] as SelectOption[],
      series: [{
        name: 'By Amazon',
        data: []
      }, {
        name: 'By Factoring',
        data: []
      }, {
        name: 'By Broker',
        data: []
      }],
      chartOptions: {
        grid: {
          show: true,
          borderColor: '#E0E1E5',
          strokeDashArray: 3
        },
        legend: {
          itemMargin: {
            horizontal: 24,
            vertical: 0
          },
          position: 'top',
          horizontalAlign: 'center',
          fontSize: 12,
          fontFamily: 'Euclid Circular A',
          fontWeight: 400,
          markers: {
            width: 6,
            height: 16,
            radius: 9999,
            offsetY: 0,
            offsetX: -4
          },
          labels: {
            colors: ['#92969F']
          }
        },
        chart: {
          toolbar: {
            show: false
          },
          height: 350,
          type: 'area'
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: 'smooth'
        },
        xaxis: {
          type: 'category',
          categories: ['Week 40', 'Week 41', 'Week 42', 'Week43', 'Week 44', 'Week 45'],
          labels: {
            style: {
              colors: '#979CB7',
              fontSize: 10,
              fontFamily: 'Euclid Circular A',
              fontWeight: 400
            }
          }
        },
        yaxis: {
          labels: {
            style: {
              colors: ['#979CB7'],
              fontSize: 10,
              fontFamily: 'Euclid Circular A',
              fontWeight: 400
            }
          }
        },
        tooltip: {
          marker: {
            show: true
          },
          custom ({ series, dataPointIndex }: any) {
            return '<div class="pl-2 pr-10 py-4">' +
      '<span class="text-c-2"><p>29 July 00:00</p></span>' +
      '<h5 class="flex font-medium items-center"><div class="mx-1 w-1 h-5 bg-orange rounded"></div>$' + series[0][dataPointIndex] + ' <div class="ml-2 mr-1 w-1 h-4 bg-green-400 rounded"></div><span class="flex font-normal text-grey-dark-400 text-b-3">$' + series[1][dataPointIndex] + '</span>' + ' <div class="ml-2 mr-1 w-1 h-4 bg-purple-400 rounded"></div><span class="flex font-normal text-grey-dark-400 text-b-3">$' + series[2][dataPointIndex] + '</span> ' + '</h5>' +
      '<p class="text-c-2 pt-1">Increase ' + Math.round(series[0][dataPointIndex] / series[1][dataPointIndex] * 100) + '% since last week</p>' +
            '</div>'
          }
        },
        colors: ['#FFAA00', '#96E5BE', '#9278E5']
      },
      barOptions: {
        grid: {
          show: true,
          borderColor: '#E0E1E5',
          strokeDashArray: 3
        },
        fill: {
          colors: ['#96E5BE', '#F29E61', '#9278E5', '#96E5BE', '#F29E61'],
          opacity: 1
        },
        chart: {
          id: 'breakdown-of-broker-pending-payments-barchart',
          toolbar: {
            show: false,
            offsetX: -132
          }
        },
        xaxis: {
          categories: ['Non-Aged', 'Aged', 'Charge Back', 'Non-Aged', 'Aged'],
          position: 'right',
          labels: {
            style: {
              colors: '#979CB7',
              fontSize: 10,
              fontFamily: 'Euclid Circular A',
              fontWeight: 400
            }
          },
          axisBorder: {
            show: false
          }
        },
        yaxis: {
          tickAmount: 5,
          min: 0,
          max: 5,
          axisTicks: {
            borderType: 'dotted',
            color: '#E0E1E5'
          },
          labels: {
            style: {
              colors: ['#979CB7'],
              fontSize: 10,
              fontFamily: 'Euclid Circular A',
              fontWeight: 400
            }
          }
        },
        legend: {
          show: false,
          position: 'left',
          fontSize: 12,
          fontFamily: 'Euclid Circular A',
          fontWeight: 400,
          horizontalAlign: 'right',
          markers: {
            width: 6,
            height: 16,
            radius: 9999,
            offsetY: 3,
            offsetX: -13
          },
          labels: {
            colors: ['#92969F']
          },
          itemMargin: {
            horizontal: 24,
            vertical: 12
          }
        },
        dataLabels: {
          textAnchor: 'middle',
          style: {
            fontSize: 12,
            fontFamily: 'Euclid Circular A',
            fontWeight: 600
          },
          offsetY: 10
        },
        plotOptions: {
          bar: {
            distributed: true,
            borderRadius: 16,
            borderRadiusApplication: 'around',
            dataLabels: {
              position: 'top'
            }
          }
        }
      },
      barSeries: [{
        name: 'Devices',
        data: [4, 5, 3, 4, 5]
      }]
    }
  },
  computed: {
    getTitle () {
      switch (this.selectedTab) {
        case 1:
          return 'Invoicing'
        case 2:
          return 'Invoice Board'
        default:
          return null
      }
    },
    getRequest () {
      switch (this.selectedTab) {
        case 1:
          return this.getInvoices
        case 2:
          return this.getInvoiceBoards
        default:
          return null
      }
    },
    getPageCount () {
      switch (this.selectedTab) {
        case 1:
          return this.invoicePageCount
        case 2:
          return this.invoiceBoardPageCount
        default:
          return null
      }
    },
    getHeaders () {
      switch (this.selectedTab) {
        case 1:
          return this.invoiceHeaders
        case 2:
          return this.boardHeaders
        default:
          return null
      }
    },
    getData () {
      switch (this.selectedTab) {
        case 1:
          return this.invoices
        case 2:
          return this.invoiceBoards
        default:
          return null
      }
    },
    // breakdownBroker () {
    //   const data: BreakdownBrokerPaymentsDetail = this.$store.getters['Accounting/breakdownBrokerPending/breakdownBroker']
    //   const series = [{
    //     name: 'Devices',
    //     data: [data?.factoring_non_aged, data?.factoring_aged, data?.factoring_charge_back, data?.carrier_non_aged, data?.carrier_aged]
    //   }]
    //   return series
    // },
    breakdownBroker () {
      const data: BreakdownBrokerPaymentsDetail = (this.$store.getters['accounting/breakdownBrokerPending/carrierBreakdown'][0])
      console.log('getBreakdownBrokerByCarrierId', data)
      const series = [{
        name: 'Devices',
        data: [data?.factoring_non_aged, data?.factoring_aged, data?.factoring_charge_back, data?.carrier_non_aged, data?.carrier_aged]
      }]
      return series
    },
    // receivable (): ReceivablesSummary {
    //   return (this.$store.getters['accounting/receivables/receivable'])
    // },
    // receivedPayment (): ReceivedPaymentDetails {
    //   return (this.$store['accounting/receivedPayment/receivedPayment'])
    // },
    receivedPayment (): ReceivedPaymentDetails {
      const Data = (this.$store.getters['accounting/receivedPayment/carrierReceivedPayments'])
      console.log('getReceivedPaymentsByCarrierId', Data)

      return Data[0]
    },
    invoices (): InvoicingDetails {
      return (this.$store.getters['accounting/invoicingDetails/carrierInvoices'])
    },
    invoicePageCount () {
      return (this.$store.getters['accounting/invoicingDetails/pageCount'])
    },
    invoiceBoards (): InvoiceBoardDetails {
      return (this.$store.getters['accounting/invoiceBoard/carrierInvoiceBoards'])
    },
    invoiceBoardPageCount () {
      return (this.$store.getters['accounting/invoiceBoard/pageCount'])
    },
    receivable (): ReceivablesSummary {
      const Data = (this.$store.getters['accounting/receivables/carrierReceivables'])
      console.log('getReceivablesByCarrierId', Data)

      return Data[0]
    }
  },
  created () {
    this.getBreakdownBrokerByCarrierId({ page_number: 1 }).then(() => {
      this.breakdownDataFetched = true
    })
    this.getReceivedPaymentsByCarrierId({ page_number: 1 }).then(() => {
      const receivedPaymentData: ReceivedPaymentDetails[] = this.$store.getters['accounting/receivedPayment/carrierReceivedPayments']

      this.series[0].data.push(receivedPaymentData[0].payment_by_amazon_week_1)
      this.series[0].data.push(receivedPaymentData[0].payment_by_amazon_week_2)
      this.series[0].data.push(receivedPaymentData[0].payment_by_amazon_week_3)
      this.series[0].data.push(receivedPaymentData[0].payment_by_amazon_week_4)
      this.series[0].data.push(receivedPaymentData[0].payment_by_amazon_week_5)
      this.series[0].data.push(receivedPaymentData[0].payment_by_amazon_week_6)

      this.series[1].data.push(receivedPaymentData[0].payment_by_broker_week_1)
      this.series[1].data.push(receivedPaymentData[0].payment_by_broker_week_2)
      this.series[1].data.push(receivedPaymentData[0].payment_by_broker_week_3)
      this.series[1].data.push(receivedPaymentData[0].payment_by_broker_week_4)
      this.series[1].data.push(receivedPaymentData[0].payment_by_broker_week_5)
      this.series[1].data.push(receivedPaymentData[0].payment_by_broker_week_6)

      this.series[2].data.push(receivedPaymentData[0].payment_by_factoring_week_1)
      this.series[2].data.push(receivedPaymentData[0].payment_by_factoring_week_2)
      this.series[2].data.push(receivedPaymentData[0].payment_by_factoring_week_3)
      this.series[2].data.push(receivedPaymentData[0].payment_by_factoring_week_4)
      this.series[2].data.push(receivedPaymentData[0].payment_by_factoring_week_5)
      this.series[2].data.push(receivedPaymentData[0].payment_by_factoring_week_6)
    }).catch((err:unknown) => {
      console.log(err)
    }).finally(() => {
      this.dataFetched = true
    })

    console.log('mount')
    this.getReceivablesByCarrierId({ page_number: 1 })
  },
  methods: {
    ...mapActions({
      getReceivablesByCarrierId: (action, id) => action('accounting/receivables/getReceivablesByCarrierId', id),
      // getReceivableSummary: (action, id) => action('accounting/receivables/getReceivable', id),
      // getReceivedPayment: (action, id) => action('accounting/receivedPayment/getReceivedPayment', id),
      getReceivedPaymentsByCarrierId: (action, id) => action('accounting/receivedPayment/getReceivedPaymentsByCarrierId', id),
      // getBreakdownBroker: (action, id) => action('accounting/breakdownBrokerPending/getBreakdownBroker', id),
      getBreakdownBrokerByCarrierId: (action, id) => action('accounting/breakdownBrokerPending/getBreakdownBrokerByCarrierId', id),
      // getInvoice: (action, id) => action('accounting/invoicingDetails/getInvoice', id),
      getInvoices: (action, page) => action('accounting/invoicingDetails/getInvoicesByCarrierId', page),
      getInvoiceBoard: (action, id) => action('accounting/invoiceBoard/getInvoiceBoard', id),
      getInvoiceBoards: (action, page) => action('accounting/invoiceBoard/getInvoiceBoardByCarrierId', page),
      updateInvoice: (action, request) => action('accounting/invoicingDetails/updateInvoice', request),
      updateInvoiceBoard: (action, request) => action('accounting/invoiceBoard/updateInvoiceBoard', request)
    }),
    incrementHideIndex() {
      this.hideIndex++;
    },
    resetHideIndex() {
      this.hideIndex = 0
      this.dropdownStyle = {
          top: `5000px`,
          left: `5000px`
        }
    },
    getKey () {
      this.tableKey = Math.random()
    },
    select (index: number): void {
      this.selectedTab = index
      this.getKey()
    },
    drawer (componentName: any) {
      this.$refs.drawer.showDrawer(componentName)
    },
    getNoteItem (item: { [x:string] : any }) {
      switch (this.selectedTab) {
        case 1:
          return {
            ...item,
            load_complete_date: moment(item.load_complete_date).toISOString(),
            invoice_date: moment(item.invoice_date).toISOString(),
            invoice_end_date: moment(item.invoice_end_date).toISOString(),
            invoice_end_time: moment(item.invoice_end_time).toISOString(),
            invoice_start_date: moment(item.invoice_start_date).toISOString(),
            invoice_start_time: moment(item.invoice_start_time).toISOString(),
            documents: {}
          }

        default:
          return item
      }
    },
    getPosition (event:any, id:number, hideIndex:number): void { 
      if (event.target.classList.contains('p-c')) {
        const position = {
          x: event.pageX,
          y: event.pageY
        }
        console.log(position, hideIndex)
        this.hoverId = id
        this.showDownloads = true
        const { clientX, clientY } = event
        if(hideIndex % 2 === 0) {
        this.dropdownStyle = {
          top: `${clientY - 165}px`,
          left: `${clientX - 130}px`
        }
      }
      else if(hideIndex % 2 === 1) {
        this.dropdownStyle = {
          top: `5000px`,
          left: `5000px`
        }
      }
      } else if (event.target.classList.contains('dp')) {
        this.hoverId = 0
        this.showDownloads = false
        
        
      }
      // this.getPos()
      console.log(event.pageX, event.pageX)
    },
    getPos () {
      const left = this.$refs.busstop.getBoundingClientRect().left
      const top = this.$refs.busstop.getBoundingClientRect().top
      console.log(left, top)
    },
    handleSubmit () {
      (this.$refs.modal as Vue & { showModal: () => Element }).showModal()
    },
    hideModal (): void {
      (this.$refs.modal as Vue & { hideModal: () => Function }).hideModal()
    },
    findDiv (id: number) {
      if (id === undefined) { return '' }
      const offsets = ((document as Document).getElementById(id.toString()) as HTMLElement).getBoundingClientRect()
      const top = offsets.top
      const left = offsets.left
      return `left: ${left}; top: ${top}`
    },
    extendItem (event:any, item: any): void {
      if (this.extendeds.includes(item.id)) {
        this.extendeds = this.extendeds.filter((a: any) => {
          return a !== item.id
        })
      } else {
        this.extendeds.push(item.id)
        const { clientX, clientY } = event
        console.log(clientX, clientY)
        this.dropdownStyle = {
          top: `${clientY + 20}px`,
          left: `${clientX - 100}px`
        }
      }
    },
    setStatus (id:number, newStatus:any) {
      const data = this.invoiceBoards.slice()
      console.log(id, newStatus)
      const item = data.find((w:any) => w.id === id)
      this.updateInvoiceBoard({
        ...item,
        invoice_status: newStatus,
        documents: {
        },
        // driver_id: item.driver_id.toString(),
        // load_id: item.load_id.toString(),
        // broker_id: item.broker_id.toString(),
        // payout: item.payout.toString(),
        // carrier_id: item.carrier_id.toString(),
        // invoice_id: item.invoice_id.toString(),
        load_complete_date: moment(item.load_complete_date).toISOString()
      })
      data.find((w:any) => w.id === id).status = newStatus
    },
    formatDate (date: string) {
      return moment(date).format('MM-DD-yyyy')
    }
  }
})
</script>
