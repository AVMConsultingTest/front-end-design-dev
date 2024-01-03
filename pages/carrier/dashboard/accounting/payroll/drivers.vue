<template>
  <div class="w-full">
    <Drawer ref="drawer" />
    <PageHeader title="Drivers" class="mb-6" :no-actions="true" @goback="$router.go(-1)" />
    <div class="row mb-8">
      <div class="col-12">
        <div class="row mx-0">
          <div class="col-auto p-0 pr-2 flex">
            <TabButton
              class="mr-2"
              :active="(selectedTab === 0)"
              title="Dashboard"
              color="green"
              icon="monitor-mobbile"
              @click="$router.push('/carrier/dashboard/accounting')"
            />
            <TabButton
              class="mr-2"
              :active="(selectedTab === 1)"
              title="Drivers"
              color="green"
              icon="user"
              @click="selectedTab=1"
            />
            <TabButton
              class="mr-2"
              :active="(selectedTab === 2)"
              title="Invoices"
              color="green"
              icon="document"
              @click="$router.push('/carrier/dashboard/accounting/receivables/invoice-board')"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12 mb-5">
        <Table
          title="Drivers"
          icon="car"
          icon-color="blue"
          icon-alpha="800"
          :headers="headers"
          :data="testData"
          :search-enabled="true"
          :filter-enabled="true"
        >
          <template #item-driver_id="{ data, index }">
            <div class="row" @click="$router.push(`/carrier/dashboard/accounting/payroll/drivers-details`)">
              <span>
                {{ data[index].driver_id }}
              </span>
            </div>
          </template>
          <template #item-phone_number="{ item }">
            <span class="text-gray">{{ item.phone_number }}</span>
          </template>
          <template #item-email="{ item }">
            <span class="text-blue-1000">{{ item.email }}</span>
          </template>
          <template #item-invoice_period="{ item }">
            <div class="flex whitespace-nowrap items-center">
              <Icon
                icon="calendar"
                variant="bulk"
                color="grey-dark"
                :alpha="300"
                class="w-4 h-4 mr-1"
              />
              <span>{{ item.invoice_period }}</span>
            </div>
          </template>
          <template #item-status="{ item }">
            <Badge
              :title="item.status[0].toUpperCase() + item.status.slice(1)"
              :class="[
                { 'bg-green-100 text-green-800': item.status === 'Home' },
                { 'bg-green-100 text-green-800': item.status === 'Ready' },
                { 'bg-red-100 text-red-800': item.status === 'Dispatched' },
                { 'bg-gray-100 text-gray-400': item.status === 'En-Route' },
                { 'bg-grey-blue-200 text-gray-400': item.status === 'Reserved' },
              ]"
              :size="SizeTypeEnum.MD"
            />
          </template>
          <div slot="actions" class="flex items-center justify-end">
            <div
              class="!bg-black !w-14 !border-none m-input flex items-center justify-center cursor-pointer"
              @click="drawer('PayrollAddDriver')"
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
import { SizeTypeEnum } from '~/components/ts/enums'
export default Vue.extend({
  layout: 'Dashboard',
  data () {
    return {
      selectedTab: 1,
      SizeTypeEnum,
      headers: {
        driver_id: {
          label: 'Driver ID',
          sortable: true
        },
        driver_name: {
          label: 'Driver Name'
        },
        phone_number: {
          label: 'Phone Number'
        },
        email: {
          label: 'E-mail'
        },
        address: {
          label: 'Address'
        },
        invoice_period: {
          label: 'Invoice Period'
        },
        invoice_number: {
          label: 'Invoice Number'
        },
        driver_net_pay: {
          label: 'Driver Net Pay'
        }
      },
      testData: [
        {
          id: 1,
          avatar: 'https://sap.github.io/ui5-webcomponents/assets/images/avatars/man_avatar_3.png',
          driver_id: 'Driver ID 1',
          driver_name: 'Bill Sanders',
          phone_number: '0555 555 55 55',
          email: 'billsander@gmail.com',
          address: 'Some Address',
          invoice_period: '09/07/2022 -  09/07/2022',
          invoice_number: '465626226',
          driver_net_pay: '$3.122'
        },
        {
          id: 1,
          avatar: 'https://sap.github.io/ui5-webcomponents/assets/images/avatars/man_avatar_3.png',
          driver_id: 'Driver ID 3',
          driver_name: 'Bill Sanders',
          phone_number: '0555 555 55 55',
          email: 'billsander@gmail.com',
          address: 'Some Address',
          invoice_period: '09/07/2022 -  09/07/2022',
          invoice_number: '465626226',
          driver_net_pay: '$3.122'
        },
        {
          id: 1,
          avatar: 'https://sap.github.io/ui5-webcomponents/assets/images/avatars/man_avatar_3.png',
          driver_id: 'Driver ID 2',
          driver_name: 'Bill Sanders',
          phone_number: '0555 555 55 55',
          email: 'billsander@gmail.com',
          address: 'Some Address',
          invoice_period: '09/07/2022 -  09/07/2022',
          invoice_number: '465626226',
          driver_net_pay: '$3.122'
        },
        {
          id: 1,
          avatar: 'https://sap.github.io/ui5-webcomponents/assets/images/avatars/man_avatar_3.png',
          driver_id: 'Driver ID 1',
          driver_name: 'Bill Sanders',
          phone_number: '0555 555 55 55',
          email: 'billsander@gmail.com',
          address: 'Some Address',
          invoice_period: '09/07/2022 -  09/07/2022',
          invoice_number: '465626226',
          driver_net_pay: '$3.122'
        },
        {
          id: 1,
          avatar: 'https://sap.github.io/ui5-webcomponents/assets/images/avatars/man_avatar_3.png',
          driver_id: 'Driver ID 1',
          driver_name: 'Bill Sanders',
          phone_number: '0555 555 55 55',
          email: 'billsander@gmail.com',
          address: 'Some Address',
          invoice_period: '09/07/2022 -  09/07/2022',
          invoice_number: '465626226',
          driver_net_pay: '$3.122'
        },
        {
          id: 1,
          avatar: 'https://sap.github.io/ui5-webcomponents/assets/images/avatars/man_avatar_3.png',
          driver_id: 'Driver ID 1',
          driver_name: 'Bill Sanders',
          phone_number: '0555 555 55 55',
          email: 'billsander@gmail.com',
          address: 'Some Address',
          invoice_period: '09/07/2022 -  09/07/2022',
          invoice_number: '465626226',
          driver_net_pay: '$3.122'
        },
        {
          id: 1,
          avatar: 'https://sap.github.io/ui5-webcomponents/assets/images/avatars/man_avatar_3.png',
          driver_id: 'Driver ID 1',
          driver_name: 'Bill Sanders',
          phone_number: '0555 555 55 55',
          email: 'billsander@gmail.com',
          address: 'Some Address',
          invoice_period: '09/07/2022 -  09/07/2022',
          invoice_number: '465626226',
          driver_net_pay: '$3.122'
        }
      ]
    }
  },
  methods: {
    drawer (drawerName: string) {
      (this.$refs.drawer as Vue & { showDrawer: (component: String, routeUrl?: String) => Element }).showDrawer(drawerName)
    }
  }
})
</script>
