<template>
  <div class="w-full">
    <PageHeader title="Accounting Overview">
    </PageHeader>
    <div class="row mt-16 mb-6">
      <SectionHeader
        class="mb-6 2xl:text-2xl"
        title="Receivables Overview"
        icon="info-circle"
        color="grey-dark"
        :icon-alpha="400"
        :disable-fill="true"
        link="/carrier/dashboard/accounting/receivables"
      />
      <div class="col-4">
        <widget
          :title="`Invoices`"
          icon="clipboard-text"
          icon-color="purple"
          :icon-alpha="400"
        >
          <div class="row items-end">
            <StatTracking :stat="receivableSummary?.ready_for_invoicing" class="col-5 border-r border-[#E0E1E5]" sub-title="Ready for invoicing" />
            <StatTracking :stat="receivableSummary?.pending_for_broker_payment" class="col-7 " sub-title="Pending for broker payment" />
          </div>
        </widget>
      </div>
      <div class="col-4">
        <widget :title="`Avg. Payout Per Load`" icon="backward-item" icon-color="dark-blue" :icon-alpha="0">
          <div class="row items-end">
            <StatTracking :currency="true" :stat="receivableSummary?.payout_amazon" class="col-5 border-r border-[#E0E1E5]" sub-title="By Amazon" />
            <StatTracking :currency="true" :stat="receivableSummary?.payout_broker" class="col-7 " sub-title="By Broker" />
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
            <StatTracking :stat="receivableSummary?.new_contracts" class="col-5 border-r border-[#E0E1E5]" sub-title="New Contracts" />
            <StatTracking :stat="receivableSummary?.pending_contracts" class="col-7 " sub-title="Pending Contract" />
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
          :icon-alpha="800"
        >
          <div class="row items-end">
            <StatTracking :stat="receivableSummary?.credit_increase_requests" class="col-auto border-r border-[#E0E1E5]" sub-title="Credit Increase Request" />
            <StatTracking :stat="receivableSummary?.credit_rating_decreased" class="col-auto " sub-title="Credit Rating Decreased" />
          </div>
        </widget>
      </div>
      <div class="col-4">
        <widget :title="`Payment Received`" icon="dollar-square" icon-color="red" :icon-alpha="0">
          <template #actions>
            <Input type="date" class="ml-auto col-3 flex justify-end" input-style="width:44px;height:44px; zoom:0.8" />
          </template>
          <div class="row items-end">
            <StatTracking :cuurency="true" :stat="receivableSummary?.recieved_payment_amazon" class="col-5 border-r border-[#E0E1E5]" sub-title="By Amazon" />
            <StatTracking :cuurency="true" :stat="receivableSummary?.recieved_payment_factoring" class="col-7 " sub-title="By Factoring" />
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
            <StatTracking :stat="receivableSummary?.total_factoring" class="col-5 border-r border-[#E0E1E5]" sub-title="Total Factoring" />
            <StatTracking :stat="receivableSummary?.total_amount" :currency="true" class="col-7 " sub-title="Total Amount" />
          </div>
        </widget>
      </div>
    </div>
    <div class="row">
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
            <apexchart v-if="breakdownDataFetched" height="290" type="bar" :options="barOptions" :series="breakdownBroker" />
          </div>
        </widget>
      </div>
    </div>
    <div class="row mt-16">
      <SectionHeader
        class="mb-6"
        title="Payables Overview"
        icon="info-circle"
        :disable-fill="true"
        link="/carrier/dashboard/accounting/payables"
      />
      <div class="mb-6">
        <widget class="p-2">
          <div class="px-4">
            <span class="text-b-3 font-semibold text-gray-800 pb-11">
              Fleet
            </span>
          </div>
          <div class="row mb-5">
            <div class="col-6">
              <widget
                :title="`Trucks`"
                :no-shadow="true"
                :no-border="true"
                :no-frame-border="true"
                icon="truck"
                icon-color="green"
                :icon-alpha="400"
                class="h-48 border-r border-[#E0E1E5] !rounded-none"
              >
                <img slot="image" src="/images/truck.png" alt="trucks">
                <div class="grid grid-cols-2 gap-4">
                  <StatTracking
                    :stat="payableSummary?.active_trucks"
                    :increase="true"
                    sub-title="Active Trucks"
                    class="pr-4 border-r border-[#E0E1E5]"
                  />
                  <StatTracking
                    :stat="payableSummary?.trucks_in_shop"
                    sub-title="In Shop"
                    stat-color="lime"
                    :stat-alpha="0"
                  />
                </div>
              </widget>
            </div>
            <div class="col-6">
              <widget
                :title="`Trailers`"
                :no-shadow="true"
                :no-border="true"
                :no-frame-border="true"
                icon="box-1"
                icon-color="green"
                :icon-alpha="400"
                class="h-48 !rounded-none"
              >
                <img slot="image" src="/images/trailer.png" alt="trailers">
                <div class="grid grid-cols-2 gap-4">
                  <StatTracking :stat="payableSummary?.active_trailers" :increase="true" sub-title="Active Trailers" class="pr-4 border-r border-[#E0E1E5]" />
                  <StatTracking
                    :stat="payableSummary?.trailers_in_shop"
                    sub-title="In Shop"
                    stat-color="lime"
                    :stat-alpha="0"
                  />
                </div>
              </widget>
            </div>
          </div>
          <hr
            class="-mr-6 -ml-6 border-t border-dashed"
          >
          <div class="row mt-5">
            <div class="col-4">
              <widget
                :title="`Truck Shop`"
                icon="backward-item"
                icon-color="dark-blue"
                :icon-alpha="0"

                :no-shadow="true"
                :no-border="true"
                :no-frame-border="true"
                class="border-r border-[#E0E1E5] !rounded-none"
              >
                <StatTracking :stat="payableSummary?.trucks_in_shop" />
              </widget>
            </div>
            <div class="col-4">
              <widget
                :title="`Parking Lot`"
                icon="personalcard"
                icon-color="purple"

                :no-shadow="true"
                :no-border="true"
                :no-frame-border="true"
                class="border-r border-[#E0E1E5] !rounded-none"
              >
                <StatTracking :stat="payableSummary?.parking_lot" />
              </widget>
            </div>
            <div class="col-4">
              <widget
                :title="`Office Building`"
                icon="chart-3"
                icon-color="red"
                :icon-alpha="0"

                :no-shadow="true"
                :no-border="true"
                :no-frame-border="true"
                class=" !rounded-none"
              >
                <StatTracking :stat="payableSummary?.office_building" />
              </widget>
            </div>
          </div>
        </widget>
      </div>
      <div class="mb-6">
        <div class="row">
          <div class="col-6">
            <widget :title="`Payments`" :no-border="true" class="px-2 pb-4">
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
              <widget
                class="mb-4"
                :title="`Fleet`"
                icon="box-tick"
                icon-color="dark-blue"
                :icon-alpha="0"

                :no-shadow="true"
                :no-border="true"
              >
                <StatTracking :currency="true" :stat="payablePaymentSummary?.fleet_payment" />
              </widget>
              <widget
                class="mb-4"
                :title="`Real Estate`"
                icon="home-trend-up"
                icon-color="green"
                :icon-alpha="800"

                :no-shadow="true"
                :no-border="true"
              >
                <StatTracking :currency="true" :stat="payablePaymentSummary?.real_estate_payment" />
              </widget>
              <widget
                :title="`Operational`"
                icon="convert-3d-cube"
                icon-color="purple"

                :no-shadow="true"
                :no-border="true"
              >
                <StatTracking :currency="true" :stat="payablePaymentSummary?.operational_payment" />
              </widget>
            </widget>
          </div>
          <div class="col-6">
            <widget :title="`Upcoming Vendor Payments`" :no-border="true" class="px-2 pb-4">
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
              <widget
                class="mb-4"
                :title="`Fleet`"
                icon="box-tick"
                icon-color="dark-blue"
                :icon-alpha="0"

                :no-shadow="true"
                :no-border="true"
              >
                <StatTracking :currency="true" :stat="payablePaymentSummary?.upcoming_fleet_payment" />
              </widget>
              <widget
                class="mb-4"
                :title="`Real Estate`"
                icon="home-trend-up"
                :icon-alpha="800"
                icon-color="green"

                :no-shadow="true"
                :no-border="true"
              >
                <StatTracking :currency="true" :stat="payablePaymentSummary?.upcoming_real_estate_payment" />
              </widget>
              <widget
                :title="`Operational`"
                icon="convert-3d-cube"
                icon-color="purple"

                :no-shadow="true"
                :no-border="true"
              >
                <StatTracking :currency="true" :stat="payablePaymentSummary?.upcoming_operational_payment" />
              </widget>
            </widget>
          </div>
        </div>
      </div>
      <div>
        <widget class="mb-8 px-2" title="Payments Trends" :no-border="true">
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
            <apexchart type="area" height="350" :options="chartOptionsPayments" :series="seriesPayments" />
          </div>
        </widget>
      </div>
      <div>
        <widget title="Payments by Top Vendors" :no-border="true" class="px-2">
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
            <apexchart type="area" height="350" :options="chartOptions" :series="seriesTopVendors" />
          </div>
        </widget>
      </div>
    </div>
    <div class="mt-16">
      <SectionHeader class="mb-6" title="Payroll Overview" link="/carrier/dashboard/accounting/payroll" />
      <div class="row">
        <div class="col-6 mb-6">
          <widget title="Driver Breakdown" :no-border="true" class="px-2 h-full  ">
            <template #actions>
              <div class="h-12" />
            </template>
            <div class="row px-2">
              <div class="flex mb-6">
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
                  :stat="payrollMetrics?.total_drivers_curr_month"
                  :increase="payrollMetrics?.total_drivers_curr_month > payrollMetrics?.total_drivers_prev_month"
                  :percentage="payrollMetrics?.total_drivers_change_per"
                  sub-title="Total Drivers"
                />
              </div>
            </div>
            <div class="row flex mb-6 justify-center">
              <StatTracking class="col-3 flex flex-col items-center border-r border-[#E0E1E5]" :stat="payrollMetrics?.companies" sub-title="Company" />
              <StatTracking class="col-3 flex flex-col items-center border-r border-[#E0E1E5]" :stat="payrollMetrics?.leases" sub-title="Lease" />
              <StatTracking class="col-3 flex flex-col items-center" :stat="payrollMetrics?.owner_operators" sub-title="Owner Operator" />
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
              <div class="flex mb-6">
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
                  :stat="payrollMetrics?.total_drivers_paystubs_curr_month"
                  :increase="payrollMetrics?.total_drivers_paystubs_curr_month > payrollMetrics?.total_drivers_paystubs_prev_month"
                  :percentage="payrollMetrics?.total_drivers_paystubs_change_per"
                  sub-title="Total Driver Paystubs"
                />
              </div>
            </div>
            <div class="row ">
              <StatTracking class="col-3 flex flex-col items-center border-r border-[#E0E1E5]" :stat="payrollMetrics?.processing_paystubs " sub-title="Processing" />
              <StatTracking class="col-3 flex flex-col items-center border-r border-[#E0E1E5]" :stat="payrollMetrics?.in_dispute_paystubs" sub-title="In Dispute" />
              <StatTracking class="col-3 flex flex-col items-center border-r border-[#E0E1E5]" :stat="payrollMetrics?.submitted_paystubs" sub-title="Submitted" />
              <StatTracking class="col-3 flex flex-col items-center" :stat="payrollMetrics?.paid_paystubs" sub-title="Paid" />
            </div>
          </widget>
        </div>
      </div>
      <div class="row">
        <div class="col-6">
          <widget title="Trucking Cost" :no-border="true" class="px-2 mb-6">
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
              <div class="flex mb-6">
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
                  stat-class="text-[4rem] leading-[5rem]"
                  :size="SizeTypeEnum.LG"
                  :currency="true"
                  :stat="payrollMetrics?.total_trucking_cost_curr_month"
                  :increase="payrollMetrics?.total_trucking_cost_curr_month > payrollMetrics?.total_trucking_cost_prev_month"
                  :percentage="payrollMetrics?.total_trucking_cost_change_per"
                  sub-title="Total Trucking Cost"
                />
              </div>
            </div>
            <div class="row flex mb-6 justify-center">
              <StatTracking class="col-4 flex flex-col items-center border-r border-[#E0E1E5]" :currency="true" :stat="payrollMetrics?.total_cost" sub-title="Total Cost" />
              <StatTracking class="col-4 flex flex-col items-center border-r border-[#E0E1E5]" :currency="true" :stat="payrollMetrics?.company_driver_cost" sub-title="Company Driver Cost" />
              <StatTracking class="col-4 flex flex-col items-center" :stat="payrollMetrics?.dispatch_cost" :currency="true" sub-title="Dispatch Cost" />
            </div>
          </widget>
        </div>
        <div class="col-6">
          <widget title="Profit & Lost" :no-border="true" class="px-2 mb-6">
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
              <div class="flex mb-6">
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
                  :currency="true"
                  :stat="payrollMetrics?.total_revenue_curr_month"
                  :increase="payrollMetrics?.total_revenue_curr_month > payrollMetrics?.total_revenue_prev_month"
                  :percentage="payrollMetrics?.total_revenue_change_per"
                  sub-title="Total Revenue"
                />
              </div>
            </div>
            <div class="row flex mb-6 justify-center">
              <StatTracking class="col-4 flex flex-col items-center border-r border-[#E0E1E5]" :currency="true" :stat="payrollMetrics?.revenue_company_driver_cost" sub-title="Company Driver Cost" />
              <StatTracking class="col-4 flex flex-col items-center border-r border-[#E0E1E5]" :currency="true" :stat="payrollMetrics?.revenue_dispatch_cost" sub-title="Dispatch Cost" />
              <StatTracking class="col-4 flex flex-col items-center" :currency="true" :stat="payrollMetrics?.revenue_trucking_cost" sub-title="Trucking Cost" />
            </div>
          </widget>
        </div>
      </div>
    </div>
    <div class="">
      <widget :no-border="true" class="p-2">
        <span class="mb-6 text-secondary text-b-3 font-medium flex items-center cursor-pointer dark:text-white" title="Test">
          Gross
          <Icon icon="info-circle" color="grey-dark" :disable-fill="true" :alpha="400" class="ml-2 w-4 h-4" />
        </span>
        <div class="row">
          <div class="col-4">
            <widget
              :title="`Company`"
              icon="box-tick"
              icon-color="dark-blue"
              :icon-alpha="0"
              :no-shadow="true"
            >
              <StatTracking :currency="true" :stat="financialMetric?.gross_company_curr_month" :increase="financialMetric?.gross_company_curr_month > financialMetric?.gross_company_prev_month" :percentage="financialMetric?.gross_company_change_per" />
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
              <StatTracking :currency="true" :stat="financialMetric?.gross_lease_curr_month" :increase="financialMetric?.gross_lease_curr_month > financialMetric?.gross_lease_prev_month" :percentage="financialMetric?.gross_lease_change_per" />
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
              <StatTracking :currency="true" :stat="financialMetric?.gross_owner_operators_curr_month" :increase="financialMetric?.gross_owner_operators_curr_month > financialMetric?.gross_owner_operators_prev_month" :percentage="financialMetric?.gross_owner_operators_change_per" />
            </widget>
          </div>
        </div>
      </widget>
    </div>
    <div class="mt-6 mb-10">
      <widget :no-border="true" class="p-2">
        <span class="mb-6 text-secondary text-b-3 font-medium flex items-center cursor-pointer dark:text-white" title="Test">
          Total Pay
          <Icon icon="info-circle" color="grey-dark" :disable-fill="true" :alpha="400" class="ml-2 w-4 h-4" />
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
              <StatTracking :currency="true" :stat="financialMetric?.total_company_curr_month" :increase="financialMetric?.total_company_curr_month > financialMetric?.total_company_prev_month" :percentage="financialMetric?.total_company_change_per" />
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
              <StatTracking :currency="true" :stat="financialMetric?.total_lease_curr_month" :increase="financialMetric?.total_lease_curr_month > financialMetric?.total_lease_prev_month" :percentage="financialMetric?.total_lease_change_per" />
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
              <StatTracking :currency="true" :stat="financialMetric?.total_owner_operators_curr_month" :increase="financialMetric?.total_owner_operators_curr_month > financialMetric?.total_owner_operators_prev_month" :percentage="financialMetric?.total_owner_operators_change_per" />
            </widget>
          </div>
        </div>
      </widget>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapActions } from 'vuex'
import { SizeTypeEnum } from '../../../components/ts/enums'
import Widget from '../../../components/Widget.vue'
import { SelectOption } from '~/components/ts/interfaces'
import { ReceivablesSummary } from '~/models/accounting/receivables/receivablesSummary'
import { ReceivedPaymentDetails } from '~/models/accounting/receivesPayment/receivedPaymentDetails'
import { BreakdownBrokerPaymentsDetail } from '~/models/accounting/breakdownBrokerPayments/breakdownBrokerPaymentsDetails'
import { PayablePaymentSummary } from '~/models/accounting/payablePaymentSummary/payablePaymentSummary'
import { PayableSummary } from '~/models/accounting/payableSummary/payableSummary'
import { PayrollMetricsSummary } from '~/models/accounting/payrollMetricsSummary/PayrollMetricsSummary'
import { PayrollFinancialSummary } from '~/models/accounting/payrollFinancialSummary/payrollFinancialSummary'
export default Vue.extend({
  components: { Widget },
  layout: 'Dashboard',
  data () {
    return {
      dataFetched: false,
      breakdownDataFetched: false,
      SizeTypeEnum,
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
      },
      {
        name: 'By Factoring',
        data: []
      },
      {
        name: 'By Broker',
        data: []
      }],
      seriesPayments: [{
        name: 'Vendor 1',
        data: [31, 40, 28, 51, 42, 109]
      }, {
        name: 'Vendor 2',
        data: [11, 32, 45, 32, 34, 52]
      }, {
        name: 'Vendor 3',
        data: [15, 20, 15, 12, 14, 22]
      }, {
        name: 'Vendor 4',
        data: [3, 14, 88, 31, 72, 19]
      }, {
        name: 'Vendor 5',
        data: [1, 20, 18, 11, 52, 59]
      }],
      seriesTopVendors: [{
        name: 'Fleet',
        data: [31, 40, 28, 51, 42, 109]
      }, {
        name: 'Real Estate',
        data: [11, 32, 45, 32, 34, 52]
      }, {
        name: 'Operational',
        data: [15, 20, 15, 12, 14, 22]
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
          enabled: false,
          style: {
            fontSize: 12,
            fontFamily: 'Euclid Circular A',
            fontWeight: 600
          }
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
      chartOptionsPayments: {
        grid: {
          show: true,
          borderColor: '#E0E1E5',
          strokeDashArray: 3
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
        colors: ['#FFAA00', '#96E5BE', '#9278E5', '#94E0FC', '#F287A7']
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
    financialMetric (): PayrollFinancialSummary {
      const Data = (this.$store.getters['accounting/payrollFinancialSummary/carrierPayrollFinancialMetrics'])
      console.log('getFinancialMetricByCarrierId', Data)

      return Data[0]
    },
    // financialMetric () : PayrollFinancialSummary {
    //   return (this.$store.getters['accounting/payrollFinancialSummary/payrollFinancialMetric'])
    // },
    // payrollMetrics (): PayrollMetricsSummary {
    //   return (this.$store.getters['accounting/payrollMetricsSummary/payrollMetric'])
    // },
    payrollMetrics (): PayrollMetricsSummary {
      const Data = (this.$store.getters['accounting/payrollMetricsSummary/carrierPayrollMetrics'])
      console.log('getPayrollMetricsByCarrierId', Data)

      return Data[0]
    },
    payments (): PayablePaymentSummary {
      return (this.$store.getters['accounting/payablePaymentSummary/payablePayment'])
    },
    // fleet (): PayableSummary {
    //   return (this.$store.getters['accounting/payableSummary/payable'])
    // },
    // receivedPayment (): ReceivedPaymentDetails {
    //   return (this.$store['accounting/receivedPayment/receivedPayment'])
    // },
    receivedPayment (): ReceivedPaymentDetails {
      const Data = (this.$store.getters['accounting/receivedPayment/carrierReceivedPayments'])
      console.log('getReceivedPaymentsByCarrierId', Data)

      return Data[0]
    },
    // receivable (): ReceivablesSummary {
    //   return (this.$store.getters['accounting/receivables/receivable'])
    // },
    // breakdownBroker () {
    //   const data: BreakdownBrokerPaymentsDetail = this.$store.getters['accounting/breakdownBrokerPending/breakdownBroker']
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
    receivableSummary (): ReceivablesSummary {
      const Data = (this.$store.getters['accounting/receivables/carrierReceivables'])
      console.log('getReceivablesByCarrierId', Data)

      return Data[0]
    },
    payableSummary (): PayableSummary {
      const Data = (this.$store.getters['accounting/payableSummary/carrierPayables'])
      console.log('getPayablesByCarrierId', Data)

      return Data[0]
    },
    payablePaymentSummary (): PayablePaymentSummary {
      const Data = (this.$store.getters['accounting/payablePaymentSummary/carrierPayablePayments'])
      console.log('getPayablePaymentsByCarrierId', Data)

      return Data[0]
    }
  },
  created () {
    // this.getFinancialMetric(3)
    // this.getPayrollMetrics(3)
    // this.getPayablePayment(3)
    // this.getPayable(3)
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
  },
  mounted () {
    this.getReceivablesByCarrierId({ page_number: 1 })
    this.getPayablesByCarrierId({ page_number: 1 })
    this.getPayablePaymentsByCarrierId({ page_number: 1 })
    this.getFinancialMetricByCarrierId({ page_number: 1 })
    this.getPayrollMetricsByCarrierId({ page_number: 1 })
  },
  methods: {
    ...mapActions({
      // getReceivableSummary: (action, id) => action('accounting/receivables/getReceivable', id),
      getReceivablesByCarrierId: (action, id) => action('accounting/receivables/getReceivablesByCarrierId', id),
      getPayablesByCarrierId: (action, id) => action('accounting/payableSummary/getPayablesByCarrierId', id),
      getPayablePaymentsByCarrierId: (action, id) => action('accounting/payablePaymentSummary/getPayablePaymentsByCarrierId', id),
      // getReceivedPayment: (action, id) => action('accounting/receivedPayment/getReceivedPayment', id),
      getReceivedPaymentsByCarrierId: (action, id) => action('accounting/receivedPayment/getReceivedPaymentsByCarrierId', id),
      getBreakdownBrokerByCarrierId: (action, id) => action('accounting/breakdownBrokerPending/getBreakdownBrokerByCarrierId', id),
      // getBreakdownBroker: (action, id) => action('accounting/breakdownBrokerPending/getBreakdownBroker', id),
      // getPayablePayment: (action, id) => action('accounting/payablePaymentSummary/getPayablePayment', id),
      // getPayable: (action, id) => action('accounting/payableSummary/getPayable', id),
      getFinancialMetricByCarrierId: (action, id) => action('accounting/payrollFinancialSummary/getFinancialMetricByCarrierId', id),
      getPayrollMetricsByCarrierId: (action, id) => action('accounting/payrollMetricsSummary/getPayrollMetricsByCarrierId', id)
      // getPayrollMetrics: (action, id) => action('accounting/payrollMetricsSummary/getPayrollMetric', id)
      // getFinancialMetric: (action, id) => action('accounting/payrollFinancialSummary/getFinancialMetric', id)
    })
  }
})
</script>
