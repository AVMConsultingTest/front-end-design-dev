<template>
  <div class="w-full">
    <Drawer ref="drawer" />
    <PageHeader title="Vendor Payments" class="mb-10" :no-actions="true" @goback="$router.go(-1)" />
    <div class="row mb-5">
      <div class="col-12">
        <Table
          title="Scheduled Payments"
          icon="calendar-2"
          icon-color="green"
          :icon-alpha="800"
          :icon-rounded="true"
          :search-enabled="false"
          :headers="headers"
          :data="testData"
        >
          <template #item-notes="{item}">
            <NotesEdit :item="item" />
          </template>
          <template #item-amount="{ item }">
            <span> {{ item.amount | toCurrency }}</span>
          </template>
          <template #item-actions>
            <div class="flex items-center cursor-pointer">
              <Icon
                icon="more-square"
                :alpha="100"
                :disable-fill="false"
                color="grey-dark"
                class="w-6 h-6 mr-2"
              />
            </div>
          </template>
          <div slot="actions" class="w-full flex items-center justify-end">
            <div class="!w-52 m-input mr-2 flex items-center cursor-pointer">
              <Icon
                icon="directbox-receive"
                variant="bulk"
                color="gray"
                :alpha="400"
                class="w-6 h-6 ml-5 mr-2"
              />
              <span class="text-c-1 mr-5">Download</span>
            </div>
            <div class="!w-14 m-input flex items-center justify-center cursor-pointer mr-2">
              <Icon
                icon="search-normal"
                variant="linear"
                color="gray"
                :alpha="400"
                class="w-6 h-6"
                :disable-fill="true"
              />
            </div>
            <div
              class="!bg-black !w-14 !border-none m-input flex items-center justify-center cursor-pointer"
              @click="$refs.drawer.showDrawer('AddTransaction')"
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
import { SizeTypeEnum } from '@/components/ts/enums'
import { SelectOption } from '~/components/ts/interfaces'
export default Vue.extend({
  name: 'VendorPayments',
  layout: 'Dashboard',
  data () {
    return {
      SizeTypeEnum,
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
          selected: false
        }
      ] as SelectOption[],
      headers: {
        payment_category: {
          label: 'Payment Category',
          searchable: true,
          sortable: true
        },
        asset_id: {
          label: 'Asset ID',
          searchable: true,
          sortable: true
        },
        contact_id:
        {
          label: 'Contact ID',
          searchable: true,
          sortable: true
        },
        vendor_id:
        {
          label: 'Vendor ID',
          searchable: true,
          sortable: true
        },
        scheduled_date:
        {
          label: 'Scheduled Date',
          searchable: true,
          sortable: true
        },
        amount: {
          label: 'Amount',
          searchable: true,
          sortable: true
        },
        payment_method:
        {
          label: 'Payment Method',
          searchable: true,
          sortable: true
        },
        notes:
        {
          label: 'Notes',
          searchable: true,
          sortable: true
        },
        actions: {
          label: 'Action'
        }
      },
      testData: [
        {
          payment_category: 'Truck',
          asset_id: 'ID 1',
          contact_id: 'TL8712',
          vendor_id: 'VL8712',
          scheduled_date: '6/17/2022',
          amount: 130,
          payment_method: 'ACH'
        },
        {
          payment_category: 'Office Building',
          asset_id: 'ID 2',
          contact_id: 'TL8712',
          vendor_id: 'VL8712',
          scheduled_date: '6/17/2022',
          amount: 130,
          payment_method: 'Wire'
        },
        {
          payment_category: 'Trailer',
          asset_id: 'ID 3',
          contact_id: 'TL8712',
          vendor_id: 'VL8712',
          scheduled_date: '6/17/2022',
          amount: 130,
          payment_method: 'ACH'
        },
        {
          payment_category: 'Trailer',
          asset_id: 'ID 4',
          contact_id: 'TL8712',
          vendor_id: 'VL8712',
          scheduled_date: '6/17/2022',
          amount: 130,
          payment_method: 'ACH'
        },
        {
          payment_category: 'Trailer',
          asset_id: 'ID 5',
          contact_id: 'TL8712',
          vendor_id: 'VL8712',
          scheduled_date: '6/17/2022',
          amount: 130,
          payment_method: 'Wire'
        },
        {
          payment_category: 'Office Building',
          asset_id: 'ID 6',
          contact_id: 'TL8712',
          vendor_id: 'VL8712',
          scheduled_date: '6/17/2022',
          amount: 130,
          payment_method: 'Wire'
        },
        {
          payment_category: 'Trailer',
          asset_id: 'ID 5',
          contact_id: 'TL8712',
          vendor_id: 'VL8712',
          scheduled_date: '6/17/2022',
          amount: 130,
          payment_method: 'ACH'
        }
      ]
    }
  }
})
</script>

<style scoped>

</style>
