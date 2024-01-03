<template>
  <div class="w-full">
    <PageHeader title="Hello Farooq!" class="mb-10">
      <template #actions>
        <div class="w-8 h-8 border  relative rounded-lg flex items-center justify-center">
          <Icon
            icon="search-normal-1"
            variant="linear"
            color="gray"
            :alpha="400"
            class="w-4 h-4 cursor-pointer"
            :disable-fill="true"
          />
        </div>
        <div class="w-8 h-8 mx-2 border  relative rounded-lg flex items-center justify-center">
          <Icon
            icon="calendar"
            variant="linear"
            color="gray"
            :alpha="400"
            class="w-4 h-4 cursor-pointer"
            :disable-fill="true"
          />
        </div>
      </template>
    </PageHeader>
    <div class="row mb-8">
      <div class="col-4">
        <widget :no-border="true" :is-h-full="true">
          <div class="row mb-4">
            <div class="col-6">
              <Icon
                icon="clipboard-text"
                color="dark-blue"
                :alpha="0"
                variant="bulk"
                class="w-10 h-10"
              />
            </div>
            <div class="col-6">
              <m-select
                :multiple="false"
                :options="rangeOptions"
                name="reportRange"
                wrapper-class="!text-c-1"
              />
            </div>
          </div>
          <div class="row">
            <div class="col-auto flex justify-center items-center">
              <div class="text-c-1 font-bold">
                OPEN QUOTES
              </div>
            </div>
            <div class="col-auto">
              <Badge
                title="7.4%"
                icon="arrow-up-3"
                icon-color="green"
                :icon-alpha="800"
                :size="SizeTypeEnum.MD"
                :class="[{'bg-green-100 text-green-800' : true}, {'!text-md': true},{'ml-2': true}]"
              />
            </div>
          </div>

          <div class="row mt-5">
            <div class="col-6">
              <StatTracking
                :no-icon="true"
                :size="SizeTypeEnum.SM"
                sub-title="Open Quotes"
                :stat="brokerSummary.open_quotes"
              />
            </div>
            <div class="col-6">
              <StatTracking
                :is-red-dot="true"
                :no-icon="true"
                :size="SizeTypeEnum.SM"
                sub-title="Needs Appointment"
                :stat="brokerSummary.quotes_appointment"
              />
            </div>
          </div>
          <div class="row mt-5">
            <div class="col-6">
              <StatTracking
                :no-icon="true"
                :size="SizeTypeEnum.SM"
                sub-title="Open Loads"
                :stat="brokerSummary.open_loads"
              />
            </div>
          </div>
        </widget>
      </div>
      <div class="col-4">
        <widget :no-border="true" :is-h-full="true">
          <div class="row mb-4">
            <div class="col-6">
              <Icon
                icon="box-1"
                color="purple"
                :alpha="500"
                variant="bulk"
                class="w-10 h-10"
              />
            </div>
            <div class="col-6">
              <m-select
                :multiple="false"
                :options="rangeOptions"
                name="reportRange"
                wrapper-class="!text-c-1"
              />
            </div>
          </div>
          <div class="row">
            <div class="col-auto flex justify-center items-center">
              <div class="text-c-1 font-bold">
                SHIP LOADS
              </div>
            </div>
            <div class="col-auto">
              <Badge
                title="5%"
                icon="arrow-up-3"
                icon-color="green"
                :icon-alpha="800"
                :size="SizeTypeEnum.MD"
                :class="[{'bg-green-100 text-green-800' : true}, {'!text-md': true},{'ml-2': true}]"
              />
            </div>
          </div>

          <div class="row mt-5">
            <div class="col-6">
              <StatTracking
                :no-icon="true"
                :size="SizeTypeEnum.SM"
                sub-title="Not Picked"
                :stat="brokerSummary.ship_not_picked"
              />
            </div>
            <div class="col-6">
              <StatTracking
                :is-red-dot="true"
                :no-icon="true"
                :size="SizeTypeEnum.SM"
                sub-title="Needs ETA"
                :stat="brokerSummary.ship_needs_eta"
              />
            </div>
          </div>
          <div class="row mt-5">
            <div class="col-6">
              <StatTracking
                :no-icon="true"
                :size="SizeTypeEnum.SM"
                sub-title="Needs Driver Info"
                :stat="brokerSummary.ship_needs_driver_info"
              />
            </div>
            <div class="col-6">
              <StatTracking
                :no-icon="true"
                :size="SizeTypeEnum.SM"
                sub-title="Running Late"
                :stat="brokerSummary.ship_late"
              />
            </div>
          </div>
        </widget>
      </div>
      <div class="col-4">
        <widget :no-border="true" :is-h-full="true">
          <div class="row mb-4">
            <div class="col-6">
              <Icon
                icon="check"
                color="orange"
                :alpha="0"
                variant="bulk"
                class="w-10 h-10"
              />
            </div>
          </div>
          <div class="row">
            <div class="col-auto flex justify-center items-center">
              <div class="text-c-1 font-bold">
                IN TRANSIT LOADS
              </div>
            </div>
            <div class="col-auto">
              <Badge
                title="3%"
                icon="arrow-up-3"
                icon-color="green"
                :icon-alpha="800"
                :size="SizeTypeEnum.MD"
                :class="[{'bg-green-100 text-green-800' : true}, {'!text-md': true},{'ml-2': true}]"
              />
            </div>
          </div>

          <div class="row mt-5">
            <div class="col-6">
              <StatTracking
                :no-icon="true"
                :size="SizeTypeEnum.SM"
                sub-title="Delivering Today"
                :stat="brokerSummary.delivered_today"
              />
            </div>
            <div class="col-6">
              <StatTracking
                :is-red-dot="true"
                :no-icon="true"
                :size="SizeTypeEnum.SM"
                sub-title="Running Late"
                :stat="brokerSummary.transit_late"
              />
            </div>
          </div>
          <div class="row mt-5">
            <div class="col-6">
              <StatTracking
                :is-red-dot="true"
                :no-icon="true"
                :size="SizeTypeEnum.SM"
                sub-title="Needs Update"
                :stat="brokerSummary.transit_update"
              />
            </div>
            <div class="col-6">
              <StatTracking
                :no-icon="true"
                :size="SizeTypeEnum.SM"
                sub-title="No Tracking"
                :stat="brokerSummary.transit_notracking"
              />
            </div>
          </div>
        </widget>
      </div>
    </div>
    <div class="row mb-8">
      <div class="col-4">
        <widget :no-border="true" :is-h-full="true">
          <div class="row mb-4">
            <div class="col-6">
              <Icon
                icon="copy-success"
                color="green"
                :alpha="400"
                variant="bulk"
                class="w-10 h-10"
              />
            </div>
          </div>
          <div class="row">
            <div class="col-auto flex justify-center items-center">
              <div class="text-c-1 font-bold">
                DELIVERED LOADS
              </div>
            </div>
            <div class="col-auto">
              <Badge
                title="5%"
                icon="arrow-up-3"
                icon-color="green"
                :icon-alpha="800"
                :size="SizeTypeEnum.MD"
                :class="[{'bg-green-100 text-green-800' : true}, {'!text-md': true},{'ml-2': true}]"
              />
            </div>
          </div>
          <div class="row mt-5">
            <div class="col-6">
              <StatTracking
                :no-icon="true"
                :size="SizeTypeEnum.SM"
                sub-title="Delivering Today"
                :stat="brokerSummary.delivered_today"
              />
            </div>
            <div class="col-6">
              <StatTracking
                :is-red-dot="true"
                :no-icon="true"
                :size="SizeTypeEnum.SM"
                sub-title="Running Late"
                :stat="brokerSummary.delivered_late"
              />
            </div>
          </div>
          <div class="row mt-5">
            <div class="col-6">
              <StatTracking
                :is-red-dot="true"
                :no-icon="true"
                :size="SizeTypeEnum.SM"
                sub-title="Needs Update"
                :stat="brokerSummary.delivered_update"
              />
            </div>
            <div class="col-6">
              <StatTracking
                :no-icon="true"
                :size="SizeTypeEnum.SM"
                sub-title="No Tracking"
                :stat="brokerSummary.delivered_notracking"
              />
            </div>
          </div>
        </widget>
      </div>
      <div class="col-8">
        <widget :no-border="true" :is-h-full="true">
          <div class="row mb-4">
            <div class="col-6">
              <Icon
                icon="fatrows"
                color="blue"
                :alpha="500"
                variant="bulk"
                class="w-10 h-10"
              />
            </div>
            <div class="col-3 ml-auto">
              <m-select
                :multiple="false"
                :options="rangeOptions"
                name="reportRange"
                wrapper-class="!text-c-1"
              />
            </div>
          </div>
          <div class="row">
            <div class="col-auto flex justify-center items-center">
              <div class="text-c-1 font-bold">
                REVENUE/MARGIN
              </div>
            </div>
          </div>
          <div class="row mt-3 flex items-center">
            <div class="col-2 text-b-3 text-gray-500">
              COVERED
            </div>
            <div class="col-2">
              <StatTracking
                :currency="true"
                :no-icon="true"
                :size="SizeTypeEnum.SM"
                sub-title="Revenue"
                :stat="brokerSummary.covered_revenue"
              />
            </div>
            <div class="col-2">
              <StatTracking
                :currency="true"
                :no-icon="true"
                :size="SizeTypeEnum.SM"
                sub-title="Dollar Margin"
                :stat="brokerSummary.covered_dollar_margin"
              />
            </div>
            <div class="col-2">
              <StatTracking
                :no-icon="true"
                :size="SizeTypeEnum.SM"
                sub-title="% Margin"
                :stat="brokerSummary.covered_percentage_margin"
              />
            </div>
            <div class="col-2">
              <StatTracking
                :no-icon="true"
                :size="SizeTypeEnum.SM"
                sub-title="Load Count"
                :stat="brokerSummary.covered_load_count"
              />
            </div>
          </div>
          <div class="row mt-4 flex items-center">
            <div class="col-2 text-b-3 text-gray-500">
              CLOSED
            </div>
            <div class="col-2">
              <StatTracking
                :currency="true"
                :no-icon="true"
                :size="SizeTypeEnum.SM"
                sub-title="Revenue"
                :stat="brokerSummary.closed_revenue"
              />
            </div>
            <div class="col-2">
              <StatTracking
                :currency="true"
                :no-icon="true"
                :size="SizeTypeEnum.SM"
                sub-title="Dollar Margin"
                :stat="brokerSummary.closed_dollar_margin"
              />
            </div>
            <div class="col-2">
              <StatTracking
                :no-icon="true"
                :size="SizeTypeEnum.SM"
                sub-title="% Margin"
                :stat="brokerSummary.closed_percentage_margin"
              />
            </div>
            <div class="col-2">
              <StatTracking
                :no-icon="true"
                :size="SizeTypeEnum.SM"
                sub-title="Load Count"
                :stat="brokerSummary.closed_load_count"
              />
            </div>
          </div>
        </widget>
      </div>
    </div>
    <div class="row my-5">
      <div class="col-12 mb-8">
        <div class="row mx-0">
          <div class="col-auto p-0 pr-2">
            <TabButton :active="(selectedTab === 0)" title="Top Carriers" color="green" @click="select(0)" />
          </div>
          <div class="col-auto p-0 pr-2">
            <TabButton :active="(selectedTab === 1)" title="Carrier Sales Leaders" color="green" @click="select(1)" />
          </div>
          <div class="col-auto p-0 pr-2">
            <TabButton :active="(selectedTab === 2)" title="Top Customers" color="green" @click="select(2)" />
          </div>
          <div class="col-auto  p-0  pr-2">
            <TabButton :active="(selectedTab === 3)" title="Customer Sales Leaders" color="green" @click="select(3)" />
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
          :request-function="getRequestFunction"
          :page-count="getPageCount"
          :download-enabled="true"
        >
          <template #item-customer_name="{ data, index }">
            <div class="flex items-center">
              <div class="mr-2">
                <img class="rounded-full w-10 h-10" src="/images/adidas.png" :alt="data[index].broker_name">
              </div>
              <div>
                <span class="block whitespace-nowrap">
                  {{ data[index].customer_name }}
                </span>
                <span class="block font-normal text-c-1 text-gray-400">
                  {{ response.since }}
                </span>
              </div>
            </div>
          </template>
          <template #item-sales_rep_name="{ data, index }">
            <div class="flex items-center">
              <div class="mr-2">
                <img class="rounded-full w-10 h-10" src="/images/adidas.png">
              </div>
              <div>
                <span class="block whitespace-nowrap">
                  {{ data[index].sales_rep_name }}
                </span>
                <span class="block font-normal text-c-1 text-gray-400">
                  {{ data[index].email }}
                </span>
              </div>
            </div>
          </template>
          <template #item-margin="{ item }">
            <Badge
              :title="item.margin"
              :class="[
                {'bg-green-100 text-green-800' : item.margin === '$300'},
              ]"
              :size="SizeTypeEnum.LG"
            />
          </template>
          <template #item-load_count="{ data, index }">
            <div class="flex items-center">
              <div class=" bg-purple-100 w-10 h-10 rounded-full flex items-center justify-center mr-2">
                <Icon
                  icon="box"
                  color="purple"
                  :alpha="400"
                  variant="bulk"
                  class="w-5 h-5"
                />
              </div>
              <div class="col-auto pr-0 mr-2">
                <span class="block whitespace-nowrap">
                  {{ data[index].load_count }} Loads
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
import { SelectOption } from '~/components/ts/interfaces'
import { BrokerSummary } from '~/models/Broker/brokerSummary/brokerSummary'
import { TopCustomersDetails } from '~/models/Broker/topCustomers/topCustomersDetails'
import { TopCarriersDetails } from '~/models/Broker/topCarriers/topCarriers'
import { CustomerSalesLeaders } from '~/models/Broker/customerSalesLeaders/customerSalesLeaders'
import { CarrierSalesLeaders } from '~/models/Broker/carrierSalesLeaders/carrierSalesLeaders'
export default Vue.extend({
  layout: 'Dashboard',
  data () {
    return {
      ActionTypeEnum,
      ButtonTypeEnum,
      SizeTypeEnum,
      selectedTab: 0,
      topCarriersHeaders: {
        rep_name: {
          label: 'Sales Rep Name'
        },
        revenue: {
          label: 'Revenue'
        },
        margin: {
          label: '% Margin'
        },
        ranking: {
          label: 'Rank'
        }
      },
      carriersSalesLeadersHeaders: {
        rep_name: {
          label: 'Sales Rep Name'
        },
        revenue: {
          label: 'Revenue'
        },
        margin: {
          label: '% Margin'
        },
        load_count: {
          label: 'Load Count'
        },
        ranking: {
          label: 'Rank'
        }
      },
      topCustomersHeaders: {
        customer_name: {
          label: 'Customer Name'
        },
        revenue: {
          label: 'Revenue'
        },
        margin: {
          label: '$ Margin'
        },
        margin_per: {
          label: '% Margin'
        },
        load_count: {
          label: 'Load Count'
        }
      },
      customerSalesLeadersHeaders: {
        rep_name: {
          label: 'Sales Rep Name'
        },
        revenue: {
          label: 'Revenue'
        },
        margin: {
          label: '$ Margin'
        },
        margin_per: {
          label: '% Margin'
        },
        load_count: {
          label: 'Load Count'
        }
      },
      response: {
        since: 'Since 01/01/2020'
      },
      topCarriersData: [
        {
          avatar: '/images/Ellipse_4.png',
          sales_rep_name: 'Dianne Russell',
          email: 'diannerussel@gmail.com',
          revenue: '$ 1,200',
          margin_per: '15%',
          rank: '1'
        },
        {
          avatar: '/images/Ellipse_4.png',
          sales_rep_name: 'Ronald Richard',
          email: 'ronaldrichard@gmail.com',
          revenue: '$ 1,000',
          margin_per: '15%',
          rank: '2'
        },
        {
          avatar: '/images/Ellipse_4.png',
          sales_rep_name: 'Wade Warren',
          email: 'wadewarren@gmail.com',
          revenue: '$ 900',
          margin_per: '15%',
          rank: '3'
        },
        {
          avatar: '/images/Ellipse_4.png',
          sales_rep_name: 'Darlene Robertson',
          email: 'darlenerobertson@gmail.com',
          revenue: '$ 850',
          margin_per: '15%',
          rank: '4'
        },
        {
          avatar: '/images/Ellipse_4.png',
          sales_rep_name: 'Bessie Cooper',
          email: 'bessiecooper@gmail.com',
          revenue: '$ 500',
          margin_per: '15%',
          rank: '5'
        }
      ],
      carriersSalesLeadersData: [
        {
          avatar: '/images/Ellipse_4.png',
          sales_rep_name: 'Dianne Russell',
          email: 'diannerussel@gmail.com',
          revenue: '$ 1,200',
          margin_per: '15%',
          load_count: '9 Loads',
          rank: '1'
        },
        {
          avatar: '/images/Ellipse_4.png',
          sales_rep_name: 'Ronald Richard',
          email: 'ronaldrichard@gmail.com',
          revenue: '$ 1,000',
          margin_per: '15%',
          load_count: '9 Loads',
          rank: '2'
        },
        {
          avatar: '/images/Ellipse_4.png',
          sales_rep_name: 'Wade Warren',
          email: 'wadewarren@gmail.com',
          revenue: '$ 900',
          margin_per: '15%',
          load_count: '9 Loads',
          rank: '3'
        },
        {
          avatar: '/images/Ellipse_4.png',
          sales_rep_name: 'Darlene Robertson',
          email: 'darlenerobertson@gmail.com',
          revenue: '$ 850',
          margin_per: '15%',
          load_count: '9 Loads',
          rank: '4'
        },
        {
          avatar: '/images/Ellipse_4.png',
          sales_rep_name: 'Bessie Cooper',
          email: 'bessiecooper@gmail.com',
          revenue: '$ 500',
          margin_per: '15%',
          load_count: '9 Loads',
          rank: '5'
        }
      ],
      topCustomersData: [
        {
          avatar: '/images/yahoo.png',
          customer_name: 'Yahoo!',
          revenue: '$ 1,200',
          margin: '$300',
          margin_per: '15%',
          load_count: '9 Loads'
        },
        {
          avatar: '/images/adidas.png',
          customer_name: 'Adidas',
          revenue: '$ 1,200',
          margin: '$300',
          margin_per: '15%',
          load_count: '9 Loads'
        },
        {
          avatar: '/images/microsoft.png',
          customer_name: 'Microsoft',
          revenue: '$ 1,200',
          margin: '$300',
          margin_per: '15%',
          load_count: '9 Loads'
        },
        {
          avatar: '/images/ikea.png',
          customer_name: 'IKEA',
          revenue: '$ 1,200',
          margin: '$300',
          margin_per: '15%',
          load_count: '9 Loads'
        },
        {
          avatar: '/images/vtb.png',
          customer_name: 'VTB',
          revenue: '$ 1,200',
          margin: '$300',
          margin_per: '15%',
          load_count: '9 Loads'
        }
      ],
      customerSalesLeadersData: [
        {
          avatar: '/images/Ellipse_4.png',
          sales_rep_name: 'Dianne Russell',
          email: 'diannerussel@gmail.com',
          revenue: '$ 1,200',
          margin: '$300',
          margin_per: '15%',
          load_count: '9 Loads'
        },
        {
          avatar: '/images/Ellipse_4.png',
          sales_rep_name: 'Ronald Richard',
          email: 'ronaldrichard@gmail.com',
          revenue: '$ 1,000',
          margin: '$300',
          margin_per: '15%',
          load_count: '9 Loads'
        },
        {
          avatar: '/images/Ellipse_4.png',
          sales_rep_name: 'Wade Warren',
          email: 'wadewarren@gmail.com',
          revenue: '$ 900',
          margin: '$300',
          margin_per: '15%',
          load_count: '9 Loads'
        },
        {
          avatar: '/images/Ellipse_4.png',
          sales_rep_name: 'Darlene Robertson',
          email: 'darlenerobertson@gmail.com',
          revenue: '$ 850',
          margin: '$300',
          margin_per: '15%',
          load_count: '9 Loads'
        },
        {
          avatar: '/images/Ellipse_4.png',
          sales_rep_name: 'Bessie Cooper',
          email: 'bessiecooper@gmail.com',
          revenue: '$ 500',
          margin: '$300',
          margin_per: '15%',
          load_count: '9 Loads'
        }
      ],
      rangeOptions: [
        {
          id: 'Today',
          text: 'Today',
          selected: true,
          icon: { name: 'calendar', variant: 'bulk' }
        }
      ] as SelectOption[]

    }
  },
  computed: {
    topCustomers (): TopCustomersDetails {
      return (this.$store.getters['Broker/topCustomers/brokerCustomers'])
    },
    customersSalesLeaders (): CustomerSalesLeaders[] {
      return (this.$store.getters['Broker/customerSalesLeadersDetails/brokerCustomers'])
    },
    carriersSalesLeaders (): CarrierSalesLeaders {
      return (this.$store.getters['Broker/carrierSalesLeadersDetails/brokerSalesLeaders'])
    },
    brokerSummary (): BrokerSummary {
      return (this.$store.getters['Broker/brokerSummary/brokerBrokerSummary'])
    },
    topCarriers (): TopCarriersDetails {
      return (this.$store.getters['Broker/topCarriersDetails/brokerCarriers'])
    },
    getRequestFunction () {
      switch (this.selectedTab) {
        case 0:
          return this.getCarriersByBrokerId
        case 1:
          return this.getSalesLeaderByBrokerId
        case 2:
          return this.getCustomersByBrokerId
        case 3:
          return this.getCustomerByBrokerId
        default:
          return {}
      }
    },
    getHeader () {
      switch (this.selectedTab) {
        case 0:
          return this.topCarriersHeaders
        case 1:
          return this.carriersSalesLeadersHeaders
        case 2:
          return this.topCustomersHeaders
        case 3:
          return this.customerSalesLeadersHeaders
        default:
          return {}
      }
    },
    getTitle () {
      switch (this.selectedTab) {
        case 0:
          return 'Top 10 Carriers'
        case 1:
          return 'Top 10 Carrier Sales Leaders'
        case 2:
          return 'Top 10 Customers'
        case 3:
          return 'Top 10 Customer Sales Leaders'
        default:
          return ''
      }
    },
    getTableData () {
      switch (this.selectedTab) {
        case 0:
          return this.topCarriers
        case 1:
          return this.carriersSalesLeaders
        case 2:
          return this.topCustomers
        case 3:
          return this.customersSalesLeaders
        default:
          return []
      }
    },
    getPageCount () {
      switch (this.selectedTab) {
        case 0:
          return this.topCarriersPageCount
        case 1:
          return this.carrierSalesLeadersPageCount
        case 2:
          return this.topCustomersPageCount
        case 3:
          return this.customerSalesLeadersPageCount
        default:
          return 0
      }
    },
    topCustomersPageCount () {
      return (this.$store.getters['Broker/topCustomers/pageCount'])
    },
    customerSalesLeadersPageCount () {
      return (this.$store.getters['Broker/customerSalesLeadersDetails/pageCount'])
    },
    carrierSalesLeadersPageCount () {
      return (this.$store.getters['Broker/carrierSalesLeadersDetails/pageCount'])
    },
    topCarriersPageCount () {
      return (this.$store.getters['Broker/topCarriersDetails/pageCount'])
    }
  },
  created () {
    this.getBrokerSummaryByBrokerId({ page_number: 1 })
  },
  // mounted () {
  //   this.getBrokerSummary(3)
  // },
  methods: {
    ...mapActions({
      // BrokerSummary
      getBrokerSummaryByBrokerId: (action, id) => action('Broker/brokerSummary/getBrokerSummaryByBrokerId', id),

      // Top Carriers
      getCarriersByBrokerId: (action, page) => action('Broker/topCarriersDetails/getCarriersByBrokerId', page),

      // Carrier Sales Leaders
      getSalesLeaderByBrokerId: (action, page) => action('Broker/carrierSalesLeadersDetails/getSalesLeaderByBrokerId', page),

      // Top Customers
      getCustomersByBrokerId: (action, page) => action('Broker/topCustomers/getCustomersByBrokerId', page),

      // Customer Sales Leaders
      getCustomerByBrokerId: (action, page) => action('Broker/customerSalesLeadersDetails/getCustomerByBrokerId', page)
    }),
    select (index: any) {
      this.selectedTab = index
      this.getKey()
    },
    getKey () {
      this.tableKey = Math.random()
    }
  }
})
</script>

  <style>

  </style>
