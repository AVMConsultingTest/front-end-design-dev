<template>
  <div class="w-full">
    <Drawer ref="drawer" />
    <PageHeader title="Accounting Payroll" />
    <Modal ref="modal2" size="sm" position="center">
      <div slot="body" class="row flex items-center justify-center pt-16 pb-14">
        <div class="col-8 items-center justify-center">
          <Icon
            icon="trash"
            variant="bulk"
            :alpha="0"
            :disable-fill="false"
            color="lime"
            class=" h-28 mr-auto ml-auto rounded-full bg-[#F8E8E8] p-6"
          />
          <h3 class="font-semibold text-center mt-6 mb-2">
            Are you sure to delete?
          </h3>
          <p class="text-b-4 font-medium text-gray-400 text-center">
            {{ deleteSubtext }}
          </p>
          <div class="pt-16">
            <Button class="text-white bg-lime hover:bg-none" @click="hideModal()">
              Yes, delete it
            </Button>
            <Button class="text-gray bg-inherit hover:bg-inherit" @click="hideModal()">
              No, don’t delete it
            </Button>
          </div>
        </div>
      </div>
    </Modal>
    <div class="row mb-8">
      <div class="col-12">
        <div class="row mx-0 justify-between">
          <div class="col-auto p-0 pr-2 flex">
            <TabButton
              class="mr-2"
              :active="(selectedTab === 0)"
              title="Dashboard"
              color="green"
              icon="monitor-mobbile"
              @click="select(0)"
            />
            <TabButton
              class="mr-2"
              :active="(selectedTab === 2)"
              title="Invoices"
              color="green"
              icon="document"
              @click="select(2)"
            />
          </div>
          <div v-if="selectedTab === 2" class="col-auto ml-auto ">
            <vue-excel-xlsx
              :data="tableData"
              :columns="headerArr"
              :file-name="title !== null && title !== undefined ? `${title.toLowerCase().replace(' ', '_')}` : 'table'"
              file-type="xlsx"
              :sheet-name="title !== null && title !== undefined ? `${title.toLowerCase().replace(' ', '_')}` : 'table'"
            >
              <div
                class="max-w-max !bg-[#192038] text-white m-input mr-2 flex items-center cursor-pointer"
              >
                <Icon icon="directbox-receive" variant="variant" color="white" :alpha="400" class="w-6 h-6 ml-5 mr-2" />
                <span class="text-c-1 mr-5">Download</span>
              </div>
            </vue-excel-xlsx>
          </div>
        </div>
      </div>
    </div>
    <div v-if="selectedTab === 0">
      <div class="row mt-12">
        <div class="col-6 mb-6">
          <widget title="Driver Breakdown" :no-border="true" class="px-2 h-full ">
            <template #actions>
              <div class="h-12" />
            </template>
            <div class="row px-2">
              <div class="flex">
                <div class="flex-initial mb-6">
                  <div class=" bg-purple-100 w-20 h-20 rounded-full flex items-center justify-center mr-6">
                    <Icon
                      icon="user-tick"
                      color="purple"
                      :alpha="400"
                      variant="bulk"
                      class="w-10 h-10"
                    />
                  </div>
                </div>
                <StatTracking
                  class="flex-initial"
                  stat-class="text-[4rem] leading-[5rem]"
                  :size="SizeTypeEnum.LG"
                  :stat="matricsSumarry?.total_drivers_curr_month"
                  :increase="matricsSumarry?.total_drivers_curr_month > matricsSumarry?.total_drivers_prev_month"
                  :percentage="matricsSumarry?.total_drivers_change_per"
                  sub-title="Total Drivers"
                />
              </div>
            </div>
            <div class="row flex justify-center">
              <StatTracking stat-class="text-b-1" class="col-3 flex flex-col items-center border-r border-[#E0E1E5]" :stat="matricsSumarry?.companies" sub-title="Company" />
              <StatTracking stat-class="text-b-1" class="col-3 flex flex-col items-center border-r border-[#E0E1E5]" :stat="matricsSumarry?.leases" sub-title="Lease" />
              <StatTracking stat-class="text-b-1" class="col-3 flex flex-col items-center" :stat="matricsSumarry?.owner_operators" sub-title="Owner Operator" />
            </div>
          </widget>
        </div>
        <div class="col-6">
          <widget title="Driver Paystubs" :no-border="true" class="px-2 mb-6 pb-6">
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
            <div class="row px-2">
              <div class="flex">
                <div class="flex-initial mb-6">
                  <div class=" bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mr-6">
                    <Icon
                      icon="wallet-check"
                      color="green"
                      :alpha="400"
                      variant="bulk"
                      class="w-10 h-10"
                    />
                  </div>
                </div>
                <StatTracking
                  class="flex-initial"
                  stat-class="text-[4rem] leading-[5rem]"
                  :size="SizeTypeEnum.LG"
                  :stat="matricsSumarry?.total_drivers_paystubs_curr_month"
                  :increase="matricsSumarry?.total_drivers_paystubs_curr_month > matricsSumarry?.total_drivers_paystubs_prev_month"
                  :percentage="matricsSumarry?.total_drivers_paystubs_change_per"
                  sub-title="Total Driver Paystubs"
                />
              </div>
            </div>
            <div class="row ">
              <StatTracking stat-class="text-b-1" class="col-3 flex flex-col items-center border-r border-[#E0E1E5]" :stat="matricsSumarry?.processing_paystubs" sub-title="Processing" />
              <StatTracking stat-class="text-b-1" class="col-3 flex flex-col items-center border-r border-[#E0E1E5]" :stat="matricsSumarry?.in_dispute_paystubs" sub-title="In Dispute" />
              <StatTracking stat-class="text-b-1" class="col-3 flex flex-col items-center border-r border-[#E0E1E5]" :stat="matricsSumarry?.submitted_paystubs" sub-title="Submitted" />
              <StatTracking stat-class="text-b-1" class="col-3 flex flex-col items-center" :stat="matricsSumarry?.paid_paystubs" sub-title="Paid" />
            </div>
          </widget>
        </div>
      </div>
      <div class="row">
        <div class="col-6">
          <widget title="Trucking Cost" :no-border="true" class="px-2 mb-6 pb-6">
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
            <div class="row px-2">
              <div class="flex">
                <div class="flex-initial mb-6">
                  <div class=" bg-orange-100 w-20 h-20 rounded-full flex items-center justify-center mr-6">
                    <Icon
                      icon="money-recive"
                      color="orange"
                      :alpha="0"
                      variant="bulk"
                      class="w-10 h-10"
                    />
                  </div>
                </div>
                <StatTracking
                  class="flex-initial"
                  :currency="true"
                  stat-class="text-[4rem] leading-[5rem]"
                  :size="SizeTypeEnum.LG"
                  :stat="matricsSumarry?.total_trucking_cost_curr_month"
                  :increase="matricsSumarry?.total_trucking_cost_curr_month > matricsSumarry?.total_trucking_cost_prev_month"
                  :percentage="matricsSumarry?.total_trucking_cost_change_per"
                  sub-title="Total Trucking Cost"
                  :compact="true"
                />
              </div>
            </div>
            <div class="row flex justify-center">
              <StatTracking
                :currency="true"
                stat-class="text-b-1"
                class="col-4 flex flex-col items-center border-r border-[#E0E1E5]"
                :stat="matricsSumarry?.total_cost"
                sub-title="Total Cost"
                :compact="true"
              />
              <StatTracking
                :currency="true"
                stat-class="text-b-1"
                class="col-4 flex flex-col items-center border-r border-[#E0E1E5]"
                :stat="matricsSumarry?.company_driver_cost"
                sub-title="Company Driver Cost"
                :compact="true"
              />
              <StatTracking
                :currency="true"
                stat-class="text-b-1"
                class="col-4 flex flex-col items-center"
                :stat="matricsSumarry?.dispatch_cost"
                sub-title="Dispatch Cost"
                :compact="true"
              />
            </div>
          </widget>
        </div>
        <div class="col-6">
          <widget title="Profit & Lost" :no-border="true" class="px-2 mb-6 pb-6">
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
            <div class="row px-2">
              <div class="flex">
                <div class="flex-initial mb-6">
                  <div class=" bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mr-6">
                    <Icon
                      icon="wallet-add"
                      color="dark-blue"
                      :alpha="0"
                      variant="bulk"
                      class="w-10 h-10"
                    />
                  </div>
                </div>
                <StatTracking
                  class="flex-initial"
                  stat-class="text-[4rem] leading-[5rem]"
                  :size="SizeTypeEnum.LG"
                  :stat="matricsSumarry?.total_revenue_curr_month"
                  :increase="matricsSumarry?.total_revenue_curr_month > matricsSumarry?.total_revenue_prev_month"
                  :percentage="matricsSumarry?.total_revenue_change_per"
                  :compact="true"
                  :currency="true"
                  sub-title="Total Revenue"
                />
              </div>
            </div>
            <div class="row flex justify-center">
              <StatTracking
                stat-class="text-b-1"
                class="col-4 flex flex-col items-center border-r border-[#E0E1E5]"
                :currency="true"
                :compact="true"
                :stat="matricsSumarry?.revenue_company_driver_cost"
                sub-title="Company Driver Cost"
              />
              <StatTracking
                :currency="true"
                stat-class="text-b-1"
                class="col-4 flex flex-col items-center border-r border-[#E0E1E5]"
                :stat="matricsSumarry?.revenue_dispatch_cost"
                :compact="true"
                sub-title="Dispatch Cost"
              />
              <StatTracking
                :currency="true"
                stat-class="text-b-1"
                class="col-4 flex flex-col items-center"
                :compact="true"
                :stat="matricsSumarry?.revenue_trucking_cost"
                sub-title="Trucking Cost"
              />
            </div>
          </widget>
        </div>
      </div>
      <div class="">
        <span class="mt-8 mb-6 text-secondary text-b-3 font-medium flex items-center cursor-pointer dark:text-white">
          Gross
        </span>

        <div class="row mb-12">
          <div class="col-4">
            <widget
              :title="`Company`"
              icon="box-tick"
              icon-color="dark-blue"
              :icon-alpha="0"
              :no-shadow="true"
            >
              <StatTracking
                :currency="true"
                :stat="financialMetric?.gross_company_curr_month"
                :increase="financialMetric?.gross_company_curr_month > financialMetric?.gross_company_prev_month"
                :percentage="financialMetric?.gross_company_change_per"
                :compact="true"
              />
            </widget>
          </div>
          <div class="col-4">
            <widget
              :title="`Lease`"
              icon="box-tick"
              icon-color="dark-blue"
              :icon-alpha="0"
              :no-shadow="true"
            >
              <StatTracking :currency="true" :stat="financialMetric?.gross_lease_curr_month" :increase="financialMetric?.gross_lease_curr_month > financialMetric?.gross_lease_prev_month" :percentage="financialMetric?.gross_lease_change_per" :compact="true" />
            </widget>
          </div>
          <div class="col-4">
            <widget
              :title="`Owner Operator`"
              icon="box-tick"
              icon-color="dark-blue"
              :icon-alpha="0"
              :no-shadow="true"
            >
              <StatTracking
                :compact="true"
                :currency="true"
                :stat="financialMetric?.gross_owner_operators_curr_month"
                :increase="financialMetric?.gross_owner_operators_curr_month > financialMetric?.gross_owner_operators_prev_month"
                :percentage="financialMetric?.gross_owner_operators_change_per"
              />
            </widget>
          </div>
        </div>
      </div>
      <div class="mt-6 mb-20">
        <span class="mb-6 text-secondary text-b-3 font-medium flex items-center cursor-pointer dark:text-white">
          Total Pay
        </span>

        <div class="row">
          <div class="col-4">
            <widget
              :title="`Company`"
              icon="empty-wallet"
              icon-color="green"
              :icon-alpha="800"
              :no-shadow="true"
            >
              <StatTracking
                :currency="true"
                :compact="true"
                :stat="financialMetric?.total_company_curr_month"
                :increase="financialMetric?.total_company_curr_month > financialMetric?.total_company_prev_month"
                :percentage="financialMetric?.total_company_change_per"
              />
            </widget>
          </div>
          <div class="col-4">
            <widget
              :title="`Lease`"
              icon="empty-wallet"
              icon-color="green"
              :icon-alpha="800"
              :no-shadow="true"
            >
              <StatTracking
                :compact="true"
                :currency="true"
                :stat="financialMetric?.total_lease_curr_month"
                :increase="financialMetric?.total_lease_curr_month > financialMetric?.total_lease_prev_month"
                :percentage="financialMetric?.total_lease_change_per"
              />
            </widget>
          </div>
          <div class="col-4">
            <widget
              :title="`Owner Operator`"
              icon="empty-wallet"
              icon-color="green"
              :icon-alpha="800"
              :no-shadow="true"
            >
              <StatTracking
                :compact="true"
                :currency="true"
                :stat="financialMetric?.total_owner_operators_curr_month"
                :increase="financialMetric?.total_owner_operators_curr_month > financialMetric?.total_owner_operators_prev_month"
                :percentage="financialMetric?.total_owner_operators_change_per"
              />
            </widget>
          </div>
        </div>
      </div>
    </div>
    <div v-if="(selectedTab === 1) || (selectedTab === 2)" class="row mt-12">
      <div class="col-12 mb-5">
        <Table
          :key="tableKey"
          ref="table"
          :title="selectedTab === 1 ? 'Drivers' : null"
          :icon="selectedTab === 1 ? 'car' : null"
          :icon-color="selectedTab === 1 ? 'blue' : null"
          :icon-alpha="selectedTab === 1 ? 800 : null"
          :headers="tableHeaders"
          :data="tableData"
          :request-function="getRequest"
          :icon-rounded="selectedTab === 2 ? true : false"
          :search-enabled="selectedTab === 1 ? true : false"
          :page-count="getPageCount"
          :filtering-model="vfilter"
          :link="innerTab === 4 ? draftLink : undefined"
          :dynamic-link-queries="['driver_type']"
          :multiple-enabled="multiple"
        >
          <tr v-for="(row, index) in tableDatas" :key="index">
            <td>{{ row }}</td>
          </tr>
          <template #custom-filter>
            <div class="flex flex-wrap p-6">
              <div
                v-for="(filter, index) in filterModels"
                v-if="filter.tabShown === innerTab"
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
          <template #item-phone_number="{ item }">
            <span class="text-gray">{{ item.phone_number }}</span>
          </template>
          <template #item-name="{ item }">
            <span class="font-semibold">{{ item.driver_first_name }} {{ item.driver_last_name }}</span>
          </template>
          <template #item-email="{ item }">
            <span class="text-blue-1000">{{ item.email }}</span>
          </template>
          <template #item-reports="{ item }">
            <Badge
              :title="item.reports"
              :class="[
                {'bg-green-100 text-green-800' : item.reports === 'Driver'}
              ]"
              :size="SizeTypeEnum.MD"
            />
          </template>
          <template #item-status="{ item }">
            <Badge
              :title="item.status"
              :class="[
                {'bg-green-100 text-green-800' : item.status === 'Generated'},
                {'bg-red-100 text-red-800' : item.status === 'Not generated'},
                {'bg-orange-100 text-orange-800' : item.status === 'Submitted'}
              ]"
              :size="SizeTypeEnum.MD"
            />
          </template>
          <template #item-load="{ item }">
            <nuxt-link to="#">
              <span class="text-dark-blue"> {{ item.load }}</span>
            </nuxt-link>
          </template>
          <template #item-load_complete_date="{ item }">
            <span class="font-normal"> {{ item.load_complete_date }}</span>
          </template>
          <template #item-broker_id="{ item }">
            <span class="text-gray-400"> {{ item.broker_id }}</span>
          </template>
          <template #item-payout="{ item }">
            <span> {{ item.payout | toCurrency }}</span>
          </template>
          <template #item-documents=" { item }">
            <div v-if="item.documents === 'PDF'" class="flex items-center cursor-pointer" @click="openNewTab">
              <img src="/images/pdf-icon.png" alt="" class="w-6 h-6 mr-2">
              <span>PDF</span>
            </div>
          </template>
          <template #item-documents2>
            <div class="flex items-center cursor-pointer" @click="openNewTab">
              <img src="/images/pdf-icon.png" alt="" class="w-6 h-6 mr-2">
              <span>PDF</span>
            </div>
          </template>
          <div v-if="(selectedTab === 2)" slot="header">
            <div class="flex">
              <button
                v-for="(tab, index) in innerFilters"
                ref="innerTabs"
                :key="index"
                class="rounded-full py-2 px-5 mx-1 flex items-center justify-center cursor-pointer"
                :class="[
                  { 'border border-gray-300' : innerTab !== index },
                  { 'bg-dark-blue' : innerTab === index }
                ]"
                @click="innerSelect(index)"
              >
                <span
                  class="text-c-1 font-medium"
                  :class="[
                    { 'text-gray': innerTab !== index },
                    { 'text-white': innerTab === index },
                  ]"
                >{{ tab }}</span>
              </button>
            </div>
          </div>
          <div slot="actions" class="flex justify-end">
            <div v-if="selectedTab === 2" class="flex items-center justify-center">
              <div v-if="innerTab === 0" class="row items-center cursor-pointer col-12" />
              <div v-else-if="innerTab === 4" class="row items-center pr-4">
                <Button
                  v-if="multiple"
                  :type="ButtonTypeEnum.LINK"
                  :size="SizeTypeEnum.LG"
                  :action="ActionTypeEnum.BUTTON"
                  class="text-c-1 !w-24 !h-10 mr-2"
                  @click="multiple = false"
                >
                  Cancel
                </Button>
                <Button
                  v-if="multiple"
                  :type="ButtonTypeEnum.GREEN"
                  :size="SizeTypeEnum.LG"
                  :action="ActionTypeEnum.BUTTON"
                  class="text-c-1 !w-24 !h-10 mr-2"
                  @click="successText === 'Generate' ? removeSelected() : showSendModal()"
                >
                  {{ successText }}
                </Button>
                <div v-if="!multiple" class="relative w-40 cursor-pointer">
                  <Button
                    v-click-outside="() => { opened = false }"
                    :type="ButtonTypeEnum.PRIMARY"
                    :size="SizeTypeEnum.LG"
                    :action="ActionTypeEnum.BUTTON"
                    class="text-c-1 !w-40 !h-10"
                    @click="() => { opened = !opened }"
                  >
                    Batch Action
                  </Button>
                  <transition name="slide">
                    <div v-if="opened" class="z-10 absolute top-10 rounded-lg bg-white left-0 right-0 w-48 shadow-2xl">
                      <ul class="px-4 py-5">
                        <li
                          v-for="(action, index) in generateActions"
                          :key="index"
                          class="text-c-1 font-medium text-gray-800 w-full flex justify-center items-center cursor-pointer text-center"
                          :class="[
                            { 'mb-7' : index !== generateActions.length - 1}
                          ]"
                          @click="batchActions(index)"
                        >
                          {{ action }}
                        </li>
                      </ul>
                    </div>
                  </transition>
                </div>
              </div>
            </div>
            <div
              v-if="addArr[selectedTab]"
              class="!bg-black !border-none m-input flex items-center justify-center cursor-pointer max-w-max p-4"
              @click="drawer('PayrollAddDriver')"
            >
              <Icon icon="add" color="white" class="w-6 h-6" />
            </div>
          </div>
        </Table>
      </div>
    </div>
    <Modal v-if="innerTab === 4" ref="modal" size="sm">
      <div slot="body" class="row flex items-center justify-center py-16">
        <div class="col-12 flex items-center justify-center">
          <div class="bg-[#EAECF0] rounded-full w-28 h-28 relative justify-center items-center flex">
            <Icon
              icon="info-circle"
              variant="bulk"
              :disable-fill="true"
              :alpha="100"
              color="grey-dark"
              class="w-14 h-14"
            />
          </div>
        </div>
        <div class="col-10 text-center items-center justify-center my-14">
          <span class="text-b-1 font-bold text-center mb-2">
            Are you sure to send the {{ modalText }}
          </span>
        </div>
        <div class="col-8">
          <Button
            :type="ButtonTypeEnum.GREEN"
            :size="SizeTypeEnum.LG"
            @click="() => { $refs.modal.hideModal() }"
          >
            Send
          </Button>
          <Button
            :type="ButtonTypeEnum.LINK"
            :size="SizeTypeEnum.LG"
            class="mt-4"
            @click="() => { $refs.modal.hideModal() }"
          >
            No, don’t send
          </Button>
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
            Invoices are Submitted for Processing!
          </h3>
          <p class="text-b-4 font-medium text-gray-400 text-center">
            After the submission process is over. Statuses of the submitted invoices will be updated.
          </p>
        </div>
        <div class="col-8">
          <Button :type="ButtonTypeEnum.GREEN" :size="SizeTypeEnum.LG" @click="hideCompletionModal()">
            Done
          </Button>
        </div>
      </div>
    </Modal>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapActions } from 'vuex'
import moment from 'moment'
import { SelectOption } from '~/components/ts/interfaces'
import { SizeTypeEnum, ActionTypeEnum, ButtonTypeEnum } from '~/components/ts/enums'
import { InvoicesDetails } from '~/models/accounting/invoices/invoicesDetails'
// import { DriversDetails } from '~/models/accounting/drivers/driversDetail'
import { PayrollMetricsSummary } from '~/models/accounting/payrollMetricsSummary/PayrollMetricsSummary'
import { PayrollFinancialSummary } from '~/models/accounting/payrollFinancialSummary/payrollFinancialSummary'
import { MileageReport } from '~/models/accounting/mileageReport'
import { FuelReport } from '~/models/accounting/fuelReport'
import { TollReport } from '~/models/accounting/tollReport'

export default Vue.extend({
  layout: 'Dashboard',
  data () {
    return {
      SizeTypeEnum,
      ButtonTypeEnum,
      ActionTypeEnum,
      selectedTab: 0,
      addArr: [false, true, false],
      drawerArr: ['', 'AddAccidentReport', ''],
      tableKey: 0,
      innerTab: 0,
      tableDatas: [],
      modalText: 'invoices to all drivers?',
      innerInvoice: 0,
      opened: false,
      multiple: false,
      generateText: 1,
      successText: 'Generate',
      generateActions: [
        'Draft Invoice',
        'Generate Invoice',
        'Send Invoice',
        'Submit for Processing'
      ],
      extendeds: [] as any[],
      dropdownStyle: 'a',
      dropdownMenu: [
        { text: 'Paid', bg: 'green' },
        { text: 'Rejected', bg: 'red' },
        { text: 'In-dispute', bg: 'blue', w: '36' }
      ],
      dropdownMenuInvoice: [
        { text: 'Paid', bg: 'green' },
        { text: 'Unpaid', bg: 'red' }
      ],
      statusOptions: [
        { id: 1, text: 'Paid' },
        { id: 2, text: 'Rejected' },
        { id: 3, text: 'In-dispute' }
      ],
      innerFilters: [
        'Invoices',
        'Milage Report',
        'Fuel Report',
        'Toll Report',
        'Generate Invoice'
      ],
      invoiceDriver: [
        'Company Driver',
        'Lease Driver',
        'Owner Operator'
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
      allHeaders: {
        payments: {
          label: 'Payments',
          searchable: true
        },
        deductions: {
          label: 'Deductions',
          searchable: true
        },
        driver_salary: {
          label: 'Driver Salary',
          searchable: true
        },
        charges: {
          label: 'Charges',
          searchable: true
        },
        profit: {
          label: 'Profit',
          searchable: true
        },
        notes:
        {
          label: 'Notes',
          searchable: true
        },
        reports: {
          label: 'Reports',
          searchable: true
        },
        status: {
          label: 'Status',
          searchable: true
        },
        documents: {
          label: 'Documents',
          searchable: true
        }
      },
      allData: [
        {
          payments: '$0.80',
          deductions: '$0.80',
          driver_salary: '$4.800',
          charges: '$4.800',
          profit: '$4.800',
          notes: 'Test',
          reports: 'Driver',
          status: 'Generated',
          documents: 'PDF'
        },
        {
          payments: '$0.80',
          deductions: '$0.80',
          driver_salary: '$4.800',
          charges: '$4.800',
          profit: '$4.800',
          notes: 'Test',
          reports: 'Driver',
          status: 'Not generated',
          documents: 'PDF'
        },
        {
          payments: '$0.80',
          deductions: '$0.80',
          driver_salary: '$4.800',
          charges: '$4.800',
          profit: '$4.800',
          notes: 'Test',
          reports: 'Driver',
          status: 'Submitted',
          documents: 'PDF'
        },
        {
          payments: '$0.80',
          deductions: '$0.80',
          driver_salary: '$4.800',
          charges: '$4.800',
          profit: '$4.800',
          notes: 'Test',
          reports: 'Driver',
          status: 'Generated',
          documents: 'PDF'
        },
        {
          payments: '$0.80',
          deductions: '$0.80',
          driver_salary: '$4.800',
          charges: '$4.800',
          profit: '$4.800',
          notes: 'Test',
          reports: 'Driver',
          status: 'Not generated',
          documents: 'PDF'
        },
        {
          payments: '$0.80',
          deductions: '$0.80',
          driver_salary: '$4.800',
          charges: '$4.800',
          profit: '$4.800',
          notes: 'Test',
          reports: 'Driver',
          status: 'Submitted',
          documents: 'PDF'
        },
        {
          payments: '$0.80',
          deductions: '$0.80',
          driver_salary: '$4.800',
          charges: '$4.800',
          profit: '$4.800',
          notes: 'Test',
          reports: 'Driver',
          status: 'Generated',
          documents: 'PDF'
        }
      ],
      draftData: [
        {
          id: 1,
          invoice_id: '144',
          driver: 'Esther Howard',
          driver_type: 'Company Driver',
          report_period: '09/07/2022 - 09/07/2022',
          report_date: '21 Oct, 2020',
          loads: '5',
          payout: '$4.800',
          loaded_miles: '2.250.90',
          rate: '$0.80',
          payments: '$0.80'
        },
        {
          id: 2,
          invoice_id: '144',
          driver: 'Esther Howard',
          driver_type: 'Lease Driver',
          report_period: '09/07/2022 - 09/07/2022',
          report_date: '21 Oct, 2020',
          loads: '5',
          payout: '$4.800',
          loaded_miles: '2.250.90',
          rate: '$0.80',
          payments: '$0.80'
        },
        {
          id: 3,
          invoice_id: '144',
          driver: 'Esther Howard',
          driver_type: 'Company Driver',
          report_period: '09/07/2022 - 09/07/2022',
          report_date: '21 Oct, 2020',
          loads: '5',
          payout: '$4.800',
          loaded_miles: '2.250.90',
          rate: '$0.80',
          payments: '$0.80'
        },
        {
          id: 4,
          invoice_id: '144',
          driver: 'Esther Howard',
          driver_type: 'Owner Operator',
          report_period: '09/07/2022 - 09/07/2022',
          report_date: '21 Oct, 2020',
          loads: '5',
          payout: '$4.800',
          loaded_miles: '2.250.90',
          rate: '$0.80',
          payments: '$0.80'
        },
        {
          id: 5,
          invoice_id: '144',
          driver: 'Esther Howard',
          driver_type: 'Company Driver',
          report_period: '09/07/2022 - 09/07/2022',
          report_date: '21 Oct, 2020',
          loads: '5',
          payout: '$4.800',
          loaded_miles: '2.250.90',
          rate: '$0.80',
          payments: '$0.80'
        },
        {
          id: 6,
          invoice_id: '144',
          driver: 'Esther Howard',
          driver_type: 'Lease Driver',
          report_period: '09/07/2022 - 09/07/2022',
          report_date: '21 Oct, 2020',
          loads: '5',
          payout: '$4.800',
          loaded_miles: '2.250.90',
          rate: '$0.80',
          payments: '$0.80'
        },
        {
          id: 7,
          invoice_id: '144',
          driver: 'Esther Howard',
          driver_type: 'Owner Operator',
          report_period: '09/07/2022 - 09/07/2022',
          report_date: '21 Oct, 2020',
          loads: '5',
          payout: '$4.800',
          loaded_miles: '2.250.90',
          rate: '$0.80',
          payments: '$0.80'
        }
      ],
      mileageHeaders: {
        driver_id: {
          label: 'Driver ID',
          searchable: true,
          sortable: true
        },
        driver_name: {
          label: 'Driver Name',
          searchable: true,
          sortable: true
        },
        driver_type: {
          label: 'Driver Type',
          searchable: true,
          sortable: true
        },
        truck_id: {
          label: 'Truck ID',
          searchable: true,
          sortable: true
        },
        mileage_invoice_period:
        {
          label: 'Invoice Period',
          searchable: true,
          sortable: true
        },
        report_start_date:
        {
          label: 'Start Date',
          searchable: true,
          sortable: true
        },
        report_end_date:
        {
          label: 'End Date',
          searchable: true,
          sortable: true
        },
        driver_designation: {
          label: 'Driver Designation',
          searchable: true,
          sortable: true
        },
        mileage:
        {
          label: 'Mileage',
          searchable: true,
          sortable: true
        },
        deadhead:
        {
          label: 'Deadhead',
          searchable: true,
          sortable: true
        },
        comments: {
          label: 'Comments',
          searchable: true,
          sortable: true
        }
      },
      companyData: [
        {
          payments: '$0.80',
          deductions: '$0.80',
          driver_salary: '$4.800',
          charges: '$4.800',
          profit: '$4.800',
          notes: 'Test',
          reports: 'Driver',
          status: 'Generated',
          documents: 'PDF'
        },
        {
          payments: '$0.80',
          deductions: '$0.80',
          driver_salary: '$4.800',
          charges: '$4.800',
          profit: '$4.800',
          notes: 'Test',
          reports: 'Driver',
          status: 'Not generated',
          documents: 'PDF'
        }
      ],
      fullReportHeaders: {
        driver_id: {
          label: 'Driver ID',
          searchable: true,
          sortable: true
        },
        driver_name: {
          label: 'Driver Name',
          searchable: true,
          sortable: true
        },
        driver_type: {
          label: 'Driver Type',
          searchable: true,
          sortable: true
        },
        card_number: {
          label: 'Card Number',
          searchable: true,
          sortable: true
        },
        invoice_period:
        {
          label: 'Invoice Period',
          searchable: true,
          sortable: true
        },
        report_start_date:
        {
          label: 'Start Date',
          searchable: true,
          sortable: true
        },
        report_end_date:
        {
          label: 'End Date',
          searchable: true,
          sortable: true
        },
        fuel_amount: {
          label: 'Fuel Amount',
          searchable: true,
          sortable: true
        },
        merchandise_amount:
        {
          label: 'Merchandise Amount',
          searchable: true,
          sortable: true
        },
        cash_advance_amount:
        {
          label: 'Cash Advance Amount',
          searchable: true,
          sortable: true
        },
        comments: {
          label: 'Comments',
          searchable: true,
          sortable: true
        }
      },
      leaseData: [
        {
          payments: '$0.80',
          deductions: '$0.80',
          driver_salary: '$4.800',
          charges: '$4.800',
          profit: '$4.800',
          notes: 'Test',
          reports: 'Driver',
          status: 'Submitted',
          documents: 'PDF'
        },
        {
          payments: '$0.80',
          deductions: '$0.80',
          driver_salary: '$4.800',
          charges: '$4.800',
          profit: '$4.800',
          notes: 'Test',
          reports: 'Driver',
          status: 'Generated',
          documents: 'PDF'
        }
      ],
      tollReportHeaders: {
        driver_id: {
          label: 'Driver ID',
          searchable: true,
          sortable: true
        },
        driver_name: {
          label: 'Driver Name',
          searchable: true,
          sortable: true
        },
        driver_type: {
          label: 'Driver Type',
          searchable: true,
          sortable: true
        },
        unit_id: {
          label: 'Unit ID',
          searchable: true,
          sortable: true
        },
        // invoice_period: {
        //   label: 'Invoice Period',
        //   searchable: true,
        //   sortable: true
        // },
        prepass_id:
        {
          label: 'PrePass ID',
          searchable: true,
          sortable: true
        },
        report_start_date:
        {
          label: 'Start Date',
          searchable: true,
          sortable: true
        },
        report_end_date:
        {
          label: 'End Date',
          searchable: true,
          sortable: true
        },
        total_charges: {
          label: 'Total Charges',
          searchable: true,
          sortable: true
        },
        comments: {
          label: 'Comments',
          searchable: true,
          sortable: true
        }
      },
      ownerData: [
        {
          payments: '$0.80',
          deductions: '$0.80',
          driver_salary: '$4.800',
          charges: '$4.800',
          profit: '$4.800',
          notes: 'Test',
          reports: 'Driver',
          status: 'Not generated',
          documents: 'PDF'
        },
        {
          payments: '$0.80',
          deductions: '$0.80',
          driver_salary: '$4.800',
          charges: '$4.800',
          profit: '$4.800',
          notes: 'Test',
          reports: 'Driver',
          status: 'Submitted',
          documents: 'PDF'
        },
        {
          payments: '$0.80',
          deductions: '$0.80',
          driver_salary: '$4.800',
          charges: '$4.800',
          profit: '$4.800',
          notes: 'Test',
          reports: 'Driver',
          status: 'Generated',
          documents: 'PDF'
        }
      ],
      generateInvoiceHeaders: {
        invoice_id: {
          label: 'Invoice#',
          searchable: true
        },
        driver: {
          label: 'Driver',
          searchable: true
        },
        driver_type: {
          label: 'Driver Type',
          searchable: true
        },
        report_period: {
          label: 'Report Period',
          searchable: true
        },
        report_date: {
          label: 'Report Date',
          searchable: true
        },
        loads: {
          label: 'Loads#',
          searchable: true
        },
        payout:
        {
          label: 'Payout',
          searchable: true
        },
        loaded_miles: {
          label: 'Loaded Miles',
          searchable: true
        },
        rate: {
          label: 'Rate',
          searchable: true
        },
        payments: {
          label: 'Payments',
          searchable: true
        }
      },
      filterModels: [
        {
          modelName: 'driver_name',
          filterName: 'Driver Name',
          inputType: 'input',
          colSpan: 2,
          multiple: true,
          tabShown: 0,
          options: [
            { id: 1, text: 'Bill Sanders' },
            { id: 2, text: 'Brooklyn Simmons' },
            { id: 3, text: 'Cameron Williamson' },
            { id: 4, text: 'John Cage' },
            { id: 5, text: 'Tom Harrison' },
            { id: 6, text: 'Tom Buckberry' }
          ]
        },
        {
          modelName: 'invoice_period',
          filterName: 'Invoice Period',
          inputType: 'date',
          colSpan: 2,
          tabShown: 0
        },
        {
          modelName: 'driver_type',
          filterName: 'Driver Type',
          inputType: 'select',
          colSpan: 2,
          tabShown: 0,
          options: [
            { id: 1, text: 'Company Driver' },
            { id: 2, text: 'Lease Driver' },
            { id: 3, text: 'Owner Operator' }
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
            { id: 1, text: 'Bill Sanders' },
            { id: 2, text: 'Brooklyn Simmons' },
            { id: 3, text: 'Cameron Williamson' },
            { id: 4, text: 'John Cage' },
            { id: 5, text: 'Tom Harrison' },
            { id: 6, text: 'Tom Buckberry' }
          ]
        },
        {
          modelName: 'invoice_period',
          filterName: 'Invoice Period',
          inputType: 'date',
          colSpan: 2,
          tabShown: 1
        },
        {
          modelName: 'driver_type',
          filterName: 'Driver Type',
          inputType: 'select',
          colSpan: 2,
          tabShown: 1,
          options: [
            { id: 1, text: 'Company Driver' },
            { id: 2, text: 'Lease Driver' },
            { id: 3, text: 'Owner Operator' }
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
            { id: 1, text: 'Bill Sanders' },
            { id: 2, text: 'Brooklyn Simmons' },
            { id: 3, text: 'Cameron Williamson' },
            { id: 4, text: 'John Cage' },
            { id: 5, text: 'Tom Harrison' },
            { id: 6, text: 'Tom Buckberry' }
          ]
        },
        {
          modelName: 'invoice_period',
          filterName: 'Invoice Period',
          inputType: 'date',
          colSpan: 2,
          tabShown: 2
        },
        {
          modelName: 'driver_type',
          filterName: 'Driver Type',
          inputType: 'select',
          colSpan: 2,
          tabShown: 2,
          options: [
            { id: 1, text: 'Company Driver' },
            { id: 2, text: 'Lease Driver' },
            { id: 3, text: 'Owner Operator' }
          ]
        },
        {
          modelName: 'driver_name',
          filterName: 'Driver Name',
          inputType: 'input',
          colSpan: 2,
          multiple: true,
          tabShown: 3,
          options: [
            { id: 1, text: 'Bill Sanders' },
            { id: 2, text: 'Brooklyn Simmons' },
            { id: 3, text: 'Cameron Williamson' },
            { id: 4, text: 'John Cage' },
            { id: 5, text: 'Tom Harrison' },
            { id: 6, text: 'Tom Buckberry' }
          ]
        },
        {
          modelName: 'invoice_period',
          filterName: 'Invoice Period',
          inputType: 'date',
          colSpan: 2,
          tabShown: 3
        },
        {
          modelName: 'driver_type',
          filterName: 'Driver Type',
          inputType: 'select',
          colSpan: 2,
          tabShown: 3,
          options: [
            { id: 1, text: 'Company Driver' },
            { id: 2, text: 'Lease Driver' },
            { id: 3, text: 'Owner Operator' }
          ]
        }
      ],
      vfilter: {} as { [key: string]: unknown }
    }
  },
  computed: {
    invoices (): InvoicesDetails {
      return (this.$store.getters['accounting/invoices/carrierInvoices'])
    },
    invoicesPageCount () {
      return (this.$store.getters['accounting/invoices/pageCount'])
    },
    mileageReports (): MileageReport[] {
      return (this.$store.getters['accounting/mileageReport/carrierReports'])
    },
    mileageReportsPageCount () {
      return (this.$store.getters['accounting/mileageReport/pageCount'])
    },
    fuelReports (): FuelReport[] {
      console.log(this.$store.getters['accounting/fuelReport/carrierReports'])
      return (this.$store.getters['accounting/fuelReport/carrierReports'])
    },
    fuelReportsPageCount () {
      return (this.$store.getters['accounting/fuelReport/pageCount'])
    },
    tollReports (): TollReport[] {
      return (this.$store.getters['accounting/tollReport/carrierTollReports'])
    },
    tollReportsPageCount () {
      return (this.$store.getters['accounting/tollReport/pageCount'])
    },
    generateInvoices (): FuelReport[] {
      console.log(this.$store.getters['accounting/generateInvoice/generates'])
      return (this.$store.getters['accounting/generateInvoice/generates'])
    },
    generateInvoicesPageCount () {
      return (this.$store.getters['accounting/generateInvoice/pageCount'])
    },
    matricsSumarry (): PayrollMetricsSummary {
      return (this.$store.getters['accounting/payrollMetricsSummary/carrierPayrollMetrics'])
    },
    // financialMetric (): PayrollFinancialSummary {
    //   return (this.$store.getters['accounting/payrollFinancialSummary/carrierPayrollFinancialMetrics'])
    // },
    getPageCount () {
      switch (this.selectedTab) {
        case 1:
          return null
        case 2:
          return this.getInnerPageCount
        default:
          return 0
      }
    },
    innerTableHeaders () {
      switch (this.innerTab) {
        case 0:
          return this.allHeaders
        case 1:
          return this.mileageHeaders
        case 2:
          return this.fullReportHeaders
        case 3:
          return this.tollReportHeaders
        case 4:
          return this.generateInvoiceHeaders
        default:
          return null
      }
    },
    tableHeaders () {
      switch (this.selectedTab) {
        case 1:
          return null
        case 2:
          return this.innerTableHeaders
        default:
          return null
      }
    },
    getRequest () {
      switch (this.selectedTab) {
        case 1:
          return null
        case 2:
          return this.getInnerRequest
        default:
          return null
      }
    },
    getInnerRequest () {
      switch (this.innerTab) {
        case 0:
          return this.getInvoices
        case 1:
          return this.getMileageReports
        case 2:
          return this.getFuelReports
        case 3:
          return this.getTollReports
        case 4:
          return this.getGenerateInvoices
        default:
          return null
      }
    },
    getInnerPageCount () {
      switch (this.innerTab) {
        case 0:
          return this.invoicesPageCount
        case 1:
          return this.mileageReportsPageCount
        case 2:
          return this.fuelReportsPageCount
        case 3:
          return this.tollReportsPageCount
        case 4:
          return this.generateInvoicesPageCount
        default:
          return null
      }
    },
    innerTableData () {
      switch (this.innerTab) {
        case 0:
          return this.allData
        case 1:
          return this.mileageReports
        case 2:
          return this.fuelReports
        case 3:
          return this.tollReports
        case 4:
          return this.draftData
        default:
          return null
      }
    },
    tableData () {
      switch (this.selectedTab) {
        case 1:
          return this.drivers
        case 2:
          return this.innerTableData
        default:
          return null
      }
    },
    draftLink (): string |undefined {
      return this.multiple ? undefined : '/carrier/dashboard/accounting/payroll/draft/'
    },
    getEditPage () {
      return 'EditGenerateInvoice'
    },
    headerArr () {
      const headerArr: { label: string; field: string; dataFormat?: string }[] = []
      if (this.tableHeaders !== undefined && this.tableHeaders !== null) {
        Object.entries(this.tableHeaders)?.forEach((headerPair: [string, ({ label: string } | unknown)]) => {
          headerArr.push({
            field: headerPair[0],
            label: (headerPair[1] as { label: string }).label
          })
          // headerObj[headerPair[0]] = {
          //   title: (headerPair[1] as { label: string }).label
          // }
        })
      }
      return headerArr
    }
  },
  created () {
    // this.getFinancialMetric(3)
    // this.getPayrollMetric(3)
    this.getPayrollMetricsByCarrierId({ page_number: 1 })
    // this.getFinancialMetricByCarrierId({ page_number: 1 })
  },
  methods: {
    ...mapActions({
      getInvoices: (action, page) => action('accounting/invoices/getInvoiceByCarrierId', page),
      updateMileageReports: (action, page) => action('accounting/mileageReport/updateMileageReports', page),
      getMileageReports: (action, page) => action('accounting/mileageReport/getMileageReportByCarrierId', page),
      getFuelReports: (action, page) => action('accounting/fuelReport/getFuelReportsByCarrierId', page),
      getTollReports: (action, page) => action('accounting/tollReport/getTollReportsByCarrierId', page),
      getGenerateInvoices: (action, page) => action('accounting/generateInvoice/getGenerateInvoices', page),
      // getFinancialMetric: (action, id) => action('accounting/payrollFinancialSummary/getFinancialMetric', id),
      getPayrollMetricsByCarrierId: (action, id) => action('accounting/payrollMetricsSummary/getPayrollMetricsByCarrierId', id),
      // getFinancialMetricByCarrierId: (action, id) => action('accounting/payrollFinancialSummary/getFinancialMetricByCarrierId', id),
      // getPayrollMetric: (action, page) => action('accounting/payrollMetricsSummary/getPayrollMetric', page),
      removeInvoice: (action, id) => action('accounting/invoices/removeInvoice', id),
      getInvoice: (action, id) => action('accounting/invoices/getInvoice', id),
      updateInvoice: (action, request) => action('accounting/invoices/updateInvoice', request),
      getDrivers: (action, page) => action('accounting/drivers/getDrivers', page),
      removeDriver: (action, id) => action('accounting/drivers/removeDriver', id),
      getDriver: (action, id) => action('accounting/drivers/getDriver', id),
      updateDriver: (action, request) => action('accounting/drivers/updateDriver', request)
    }),
    addEmptyRow () {
      this.tableData.unshift({
        payments: '0',
        deductions: '0',
        driver_salary: '0',
        charges: '0',
        profit: '0',
        notes: '',
        reports: '',
        status: 'Not generated',
        documents: ''
      })
    },
    openNewTab () {
      window.open('/demo-pdf-generate', '_blank')
    },
    getKey () {
      this.tableKey = Math.random()
    },
    select (index: number): void {
      this.selectedTab = index
      this.getKey()
    },
    innerSelect (index: number): void {
      this.innerTab = index
      this.getKey()
    },
    driverTypeFilter (index: number): void {
      if (this.vfilter.driver_type === this.invoiceDriver[index]) {
        this.vfilter.driver_type = undefined
      } else {
        this.vfilter.driver_type = this.invoiceDriver[index]
      }
      this.getKey()
    },
    drawer (componentName: any) {
      this.$refs.drawer.showDrawer(componentName)
    },
    showCompletionModal () {
      (this.$refs.completionModal as Vue & { showModal: () => Element }).showModal()
    },
    hideCompletionModal (): void {
      (this.$refs.completionModal as Vue & { hideModal: () => Function }).hideModal()
    },
    batchActions (index:number): (() => void) | undefined {
      switch (index) {
        case 0:
          return this.addEmptyRow()
        case 1:
          this.successText = 'Generate'
          this.multiple = true
          break
        case 2:
          this.successText = 'Send'
          this.multiple = true
          break
        case 3:
          return this.showCompletionModal()
        default:
          break
      }
    },
    removeSelected (): void {
      if (this.$refs.table.getPagedData().filter((w:any) => w.isSelected).length > 0) {
        this.allData = this.allData.concat(this.$refs.table.getPagedData().filter((w:any) => w.isSelected))
        this.draftData = this.$refs.table.getPagedData().filter((w:any) => !w.isSelected)
        this.multiple = false
        this.$refs.innerTabs[0].click()
      }
    },
    checkSendCount (): string {
      const selects: any[] = this.$refs.table.getPagedData().filter((w:any) => w.isSelected)
      if (selects.length === 1) {
        return `invoice #${selects[0].id} to driver ${selects[0].driver}?`
      } else {
        return 'invoices to all drivers?'
      }
    },
    findDiv (id: number) {
      if (id === undefined) { return '' }
      const offsets = ((document as Document).getElementById(id.toString()) as HTMLElement).getBoundingClientRect()
      const top = offsets.top
      const left = offsets.left
      return `left: ${left}; top: ${top}`
    },
    handleSubmit () {
      (this.$refs.modal as Vue & { showModal: () => Element }).showModal()
    },
    showModal () {
      this.$refs.modal.showModal()
    },
    formatDate (date: string) {
      return moment(date).format('MM-DD-yyyy')
    },
    showSendModal () {
      if (this.$refs.table.getPagedData().filter((w:any) => w.isSelected).length > 0) {
        (this.$refs.modal as Vue & { showModal: () => Element }).showModal()
        this.modalText = this.checkSendCount()
      }
    },
    showModal2 () {
      (this.$refs.modal2 as Vue & { showModal: () => Element }).showModal()
    },
    hideModal (): void {
      (this.$refs.modal as Vue & { hideModal: () => Function }).hideModal()
    },
    openModal () {
      (this.$refs.modal as Vue & { showModal: () => Element }).showModal()
    }
  }
})
</script>
