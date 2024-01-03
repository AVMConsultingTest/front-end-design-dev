<template>
  <div class="w-full">
    <Drawer ref="drawer" />
    <PageHeader title="Vendor Profile" class="mb-10" @goback="$router.go(-1)" />
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
              <img src="/images/vendor.png" alt="vendor-picture" class="w-full h-full object-cover rounded-full">
              <div
                :class="[
                  { 'bg-green-400': status === 0 },
                  { 'bg-lime': status !== 0 },
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
                  status === 0 ? "Active" : "Inactive"
                }}</span>
              </div>
            </div>
          </div>
          <div class="pl-10 col-12">
            <div class="mb-6">
              <h5 class="text-gray-800 font-semibold">
                {{ response?.name }}
              </h5>
              <span class="text-c-1 text-gray">{{ response?.vendor_address_1 }}</span>
            </div>
            <div class="flex flex-wrap">
              <InfoBox
                :value="response?.phone_number"
                title="Phone Number"
                icon="call"
                color="grey-dark"
                :alpha="300"
                class="col-4 mb-5"
              />
              <InfoBox
                :value="response.vendor_type"
                title="Type"
                icon="group"
                color="grey-dark"
                :alpha="300"
                class="col-4 mb-5"
              />
              <InfoBox
                :value="response?.bank_name"
                title="Bank"
                icon="category"
                color="grey-dark"
                :alpha="300"
                class="col-4 mb-5"
              />
              <InfoBox
                :value="response?.email"
                title="Business Email"
                icon="sms"
                color="grey-dark"
                :alpha="300"
                class="col-4 mb-5"
              />
              <InfoBox
                :value="response?.country"
                title="Country"
                icon="global"
                color="grey-dark"
                :alpha="300"
                class="col-4 mb-5"
              />

              <InfoBox
                :value="response?.account_number"
                title="Bank Accounting Number"
                icon="bank"
                color="grey-dark"
                :alpha="300"
                class="col-4"
              />
              <InfoBox
                :value="response?.business_hours"
                title="Work Hours"
                icon="clock"
                class="col-4"
              />
              <InfoBox
                :value="response?.city"
                title="City"
                icon="location"
                color="grey-dark"
                :alpha="300"
                class="col-4 mb-5"
              />
              <InfoBox
                :value="response?.state"
                title="State"
                icon="location"
                color="grey-dark"
                :alpha="300"
                class="col-4 mb-5"
              />
              <InfoBox
                :value="response?.routing_number"
                title="Bank Routing Number"
                icon="security-user"
                color="grey-dark"
                :alpha="300"
                class="col-4"
              />
              <InfoBox
                :value="response?.trade_terms"
                title="Trade Terms"
                icon="timer-pause"
                color="grey-dark"
                :alpha="300"
                class="col-4"
              />
            </div>
          </div>
        </div>
      </div>

      <div
        class="!w-9 !h-9 !rounded-full border border-gray-300 absolute top-4 right-4 flex justify-center cursor-pointer items-center"
        @click="drawer('EditVendor')"
      >
        <Icon icon="edit-2" variant="bold" color="dark" :alpha="500" class="w-5 h-5" />
      </div>
    </div>
    <div class="row mb-5">
      <div class="col-12 mt-12 mb-6">
        <div class="row mx-0">
          <div class="col-auto p-0 pr-2">
            <TabButton
              :active="(selectedTab === 0)"
              title="General"
              color="green"
              icon="information"
              @click="select(0)"
            />
          </div>
          <div class="col-auto  p-0  pr-2">
            <TabButton
              :active="(selectedTab === 1)"
              title="Assets"
              color="green"
              icon="wallet-money"
              @click="select(1)"
            />
          </div>
          <div class="col-auto p-0 pr-2">
            <TabButton
              :active="(selectedTab === 2)"
              title="Transactions"
              color="green"
              icon="bitcoin-refresh"
              @click="select(2)"
            />
          </div>
          <div class="col-auto p-0 pr-2">
            <TabButton
              :active="(selectedTab === 3)"
              title="Vendor Payments"
              color="green"
              icon="receipt-2"
              @click="select(3)"
            />
          </div>
          <div class="col-auto p-0 pr-2">
            <TabButton
              :active="(selectedTab === 4)"
              title="Documents"
              color="green"
              icon="folder"
              @click="select(4)"
            />
          </div>
        </div>
      </div>
      <div class="col-12 mb-5">
        <Table
          v-if="selectedTab === 0"
          :key="tableKey"
          title="Contacts"
          icon="people"
          icon-color="blue"
          icon-alpha="800"
          :headers="generalHeader"
          :data="contacts"
          :search-enabled="false"
          :filter-enabled="false"
          :download-enabled="true"
          :delete-enabled="true"
          :delete-function="removeContact"
          :edit-enabled="true"
          edit-page="EditGeneralPage"
          :request-function="getContactsByCarrierId"
          :page-count="contactPageCount"
        >
          <template #item-comments="{item}">
            <NotesEdit
              :item="getContactNoteItem(item)"
              note-prop-key="comments"
              :edit-function="updateContact"
            />
          </template>
          <template #item-contact_status="{ item }">
            <Status
              :item="item"
              :active="extendeds.includes(item.id)"
              :item-status="item.contact_status"
              :dropdown-menu="dropdownMenu"
              :dropdown-style="dropdownStyle"
              @extend="extendItem"
              @set-status="setStatus"
            />
          </template>
          <template #item-contact_name="{ item }">
            <span class="font-semibold">{{ item.contact_name }}</span>
          </template>
          <template #item-phone="{ item }">
            <span class="text-gray">{{ item.phone }}</span>
          </template>
          <template #item-email="{ item }">
            <span class="text-blue-1000">{{ item.email }}</span>
          </template>
          <template #item-business_hours="{ item }">
            <span class="text-gray">{{ item.business_hours }}</span>
          </template>
          <div slot="actions" class="w-full flex items-center justify-end">
            <div
              class="!bg-black max-w-max p-4 !border-none m-input flex items-center justify-center cursor-pointer"
              @click="drawer('AddVendorGeneral')"
            >
              <Icon icon="add" color="white" class="w-6 h-6" />
            </div>
          </div>
        </Table>
        <Table
          v-if="selectedTab === 1"
          :key="tableKey"
          title="Company Assets"
          icon="receipt-search"
          icon-color="green"
          icon-alpha="800"
          :headers="assetHeaders"
          :data="assets"
          :search-enabled="false"
          :filter-enabled="false"
          :download-enabled="true"
          :delete-enabled="true"
          :delete-function="removeAsset"
          :edit-enabled="true"
          edit-page="EditVendorAsset"
          :request-function="getAssetsByCarrierId"
          :page-count="assetPageCount"
        >
          <div slot="actions" class="col-auto flex items-center justify-end">
            <div
              class="!bg-black max-w-max p-4 !border-none m-input flex items-center justify-center cursor-pointer"
              @click="drawer('AddVendorAsset')"
            >
              <Icon icon="add" color="white" class="w-6 h-6" />
            </div>
          </div>
        </Table>

        <Table
          v-if="selectedTab === 2"
          :key="tableKey"
          class="mb-12"
          title="Assets Payments"
          icon="money-change"
          icon-color="green"
          :icon-alpha="800"
          :icon-rounded="true"
          :search-enabled="false"
          :headers="transactionsHeaders"
          :data="transactions"
          :delete-enabled="true"
          :delete-function="removeTransaction"
          :edit-enabled="true"
          edit-page="EditAssetTransaction"
          :request-function="getTransactionsByCarrierId"
          :page-count="transactionPageCount"
          :download-enabled="true"
        >
          <template #item-notes="{item}">
            <NotesEdit
              :item="getAssetPaymentsNoteItem(item)"
              note-prop-key="notes"
              :edit-function="updateTransaction"
            />
          </template>
          <template #item-amount="{ item }">
            <span> {{ item.amount | toCurrency }}</span>
          </template>
          <div slot="actions" class="w-full flex items-center justify-end">
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
              class="!bg-black max-w-max p-4 !border-none m-input flex items-center justify-center cursor-pointer"
              @click="drawer('AddAssetTransaction')"
            >
              <Icon icon="add" color="white" class="w-6 h-6" />
            </div>
          </div>
        </Table>
        <Table
          v-if="selectedTab === 2"
          :key="tableKey"
          title="Operational Payments"
          icon="money-change"
          icon-color="orange"
          :icon-alpha="800"
          :icon-rounded="true"
          :search-enabled="false"
          :headers="operationalHeaders"
          :data="operationals"
          :delete-enabled="true"
          :delete-function="removeOperational"
          :edit-enabled="true"
          edit-page="EditOperationalTransaction"
          :request-function="getOperationals"
          :page-count="operationalPageCount"
          :download-enabled="true"
        >
          <template #item-notes="{item}">
            <NotesEdit
              :item="getOperationalPaymentsNoteItem(item)"
              note-prop-key="notes"
              :edit-function="updateOperational"
            />
          </template>
          <template #item-amount="{ item }">
            <span> {{ item.amount | toCurrency }}</span>
          </template>
          <div slot="actions" class="w-full flex items-center justify-end">
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
              class="!bg-black max-w-max p-4 !border-none m-input flex items-center justify-center cursor-pointer"
              @click="drawer('AddOperationalTransaction')"
            >
              <Icon icon="add" color="white" class="w-6 h-6" />
            </div>
          </div>
        </Table>

        <Table
          v-if="selectedTab === 3"
          :key="tableKey"
          title="Scheduled Payments"
          icon="calendar-2"
          icon-color="green"
          :icon-alpha="800"
          :icon-rounded="true"
          :search-enabled="false"
          :headers="vendorHeaders"
          :data="vendorPayments"
          :delete-enabled="true"
          :delete-function="removeVendorPayment"
          :edit-enabled="true"
          edit-page="EditVendorPayments"
          :request-function="getVendorPaymentByCarrierId"
          :page-count="vendorPaymentPageCount"
          :download-enabled="true"
        >
          <template #item-notes="{item}">
            <NotesEdit
              :item="getVendorPaymentsNoteItem(item)"
              note-prop-key="notes"
              :edit-function="updateVendorPayment"
            />
          </template>

          <template #item-amount="{ item }">
            <span> {{ item.amount | toCurrency }}</span>
          </template>
          <div slot="actions" class="w-full flex items-center justify-end">
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
              class="!bg-black max-w-max p-4 !border-none m-input flex items-center justify-center cursor-pointer"
              @click="drawer('AddVendorPayments')"
            >
              <Icon icon="add" color="white" class="w-6 h-6" />
            </div>
          </div>
        </Table>
        <Table
          v-if="selectedTab === 4"
          :key="tableKey"
          title="Payment Documents"
          icon="document-1"
          icon-color="green"
          :icon-alpha="800"
          :icon-rounded="true"
          :search-enabled="false"
          :headers="documentHeaders"
          :data="documents"
          :download-enabled="true"
          :request-function="getDocumentByCarrierId"
          :page-count="documentPageCount"
        >
          <template #item-actions>
            <div class="flex items-center cursor-pointer">
              <Icon icon="more-square" :alpha="100" :disable-fill="false" color="grey-dark" class="w-6 h-6 mr-2" />
            </div>
          </template>
          <template #item-document_name="{ data, index }">
            <div class="flex">
              <div class="col-auto font-semibold">
                <span>
                  {{ data[index].document_name }}
                </span>
              </div>
            </div>
          </template>
          <template #item-document_size="{ data, index }">
            <div class="flex">
              <div class="col-auto font-normal">
                <span>
                  {{ data[index].document_size }} Kb
                </span>
              </div>
            </div>
          </template>
          <template #item-document_upload_date="{ data, index }">
            <div class="flex">
              <div class="col-auto font-normal">
                <span>
                  {{ data[index].document_upload_date }}
                </span>
              </div>
            </div>
          </template>
          <template #item-uploader_name="{ data, index }">
            <div class="flex">
              <div class="col-auto font-semibold">
                <span>
                  {{ data[index].uploader_name }}
                </span>
              </div>
            </div>
          </template>
          <template #item-document_type="{ data, index }">
            <div class="flex">
              <div class="col-auto font-semibold">
                <span>
                  {{ data[index].document_type }}
                </span>
              </div>
            </div>
          </template>
          <template #item-document="{ data, index }">
            <div class="flex items-center">
              <div class="flex items-center justify-center mr-2">
                <img class="max-h-8 max-w-[32px]" :src="data[index].avatar" :alt="data[index].document">
              </div>
              <div class="col-auto pr-0 mr-2">
                <span class="block whitespace-nowrap">
                  {{ data[index].document }}
                </span>
              </div>
            </div>
          </template>
          <div slot="actions" class="w-full flex items-center justify-end">
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
              class="!bg-black max-w-max p-4 !border-none m-input flex items-center justify-center cursor-pointer"
              @click="drawer('')"
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
import moment from 'moment'
import {
  ActionTypeEnum,
  ButtonTypeEnum,
  SizeTypeEnum
} from '~/components/ts/enums'
import { AssetTransactionsDetail } from '~/models/accounting/assetTransactions/assetTransactionsDetails'
import { AssetsDetails } from '~/models/accounting/assets/assetsDetails'
import { ContactsDetails } from '~/models/accounting/contacts/contactsDetails'
import { OperationalTransactionsDetails } from '~/models/accounting/operationalTransactions/operationalTransactionsDetails'
import { VendorPaymentsDetails } from '~/models/accounting/vendorPayments/vendorPaymentsDetails'
import { VendorsDetails } from '~/models/accounting/vendors/vendorsDetails'

export default Vue.extend({
  name: 'VendorProfilePage',
  layout: 'Dashboard',
  data () {
    return {
      selectedTab: 0,
      ActionTypeEnum,
      ButtonTypeEnum,
      SizeTypeEnum,
      reportRange: '',
      tableKey: 0,
      status: 0,
      extendeds: [] as any[],
      dropdownStyle: 'a',
      dropdownMenu: [
        { text: 'Active', bg: 'green' },
        { text: 'In vocation', bg: 'red' },
        { text: 'Inactive', bg: 'red' }
      ],
      statusOptions: [
        { id: 1, text: 'Active' },
        { id: 2, text: 'In vocation' },
        { id: 3, text: 'Inactive' }
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
      slideToggle: true,
      // response: {
      //   firstName: 'Cameron',
      //   lastName: 'Williamson',
      //   driverId: 13990,
      //   dateOfHire: 'Sep 1, 2018',
      //   dateOfBirth: 'Jan 1, 1970',
      //   driverType: 'Main Captain',
      //   email: 'sara.cruz@example.com',
      //   phone: '(229) 555-0109',
      //   emergencyNumber: '(219) 555-0114',
      //   status: 0,
      pictureURL: {
        url: '/images/Ellipse_49.png'
      },
      //   payPerDrop: '1200,98',
      //   address: {
      //     state: 'California',
      //     address1: '2118 Thornridge Cir. Syracuse, Connecticut 35624'
      //   },
      //   bankrouting: '8393930303',
      //   bankaccounting: '903939393',
      //   payType: 'Cash Payment',
      //   paymentrates: '18',
      //   recurringDeductions: '828,12',
      //   compensation: '982,12',
      //   ssn: 'SSN-123839230292393',
      //   cdlNumber: 'CDL - 202027292',
      //   cdlIssueDate: 'October 31, 2022',
      //   cdlExpirationDate: 'December 1, 2022',
      //   nextDrugTestDate: '12/05/2024',
      //   fscPercentage: 25
      // },
      truck: {
        truckId: 18373823933
      },
      trailer: {
        trailerId: 18373823933
      },
      generalHeader: {
        contact_name: {
          label: 'Contact Name',
          searchable: true,
          sortable: true
        },
        department: {
          label: 'Department',
          searchable: true,
          sortable: true
        },
        phone_number: {
          label: 'Phone Number',
          searchable: true,
          sortable: true
        },
        email: {
          label: 'E-mail',
          searchable: true,
          sortable: true
        },
        contact_hierarchy: {
          label: 'Contact Hierarchy',
          searchable: true,
          sortable: true
        },
        business_hours: {
          label: 'Business Hours',
          searchable: true,
          sortable: true
        },
        contact_status: {
          label: 'Contact Status',
          searchable: true,
          sortable: true
        },
        comments: {
          label: 'Comments',
          searchable: true,
          sortable: true
        }
      },
      generalData: [
        {
          id: 1,
          contact_name: 'Bill Sanders',
          department: 'Accounting',
          phone: '495-233-0987',
          email: 'billsander@gmail.com',
          contact_hierarchy: 1,
          business_hours: '08:00-17:00 EST',
          contact_status: 'Active',
          comments: 'Test'
        },
        {
          id: 2,
          contact_name: 'Brooklyn Simmons',
          department: 'Leasing',
          phone: '495-233-0987',
          email: 'Brookly@gmail.com',
          contact_hierarchy: 2,
          business_hours: '08:00-17:00 EST',
          contact_status: 'Inactive',
          comments: 'Test'
        },
        {
          id: 3,
          contact_name: 'Cameron Williamson',
          department: 'Leasing',
          phone: '495-233-0987',
          email: 'cameronwilliamson@gmail.com',
          contact_hierarchy: 3,
          business_hours: '08:00-17:00 EST',
          contact_status: 'Active',
          comments: 'Test'
        },
        {
          id: 4,
          contact_name: 'John Cage',
          department: 'Accounting',
          phone: '495-233-0987',
          email: 'johncage@gmail.com',
          contact_hierarchy: 1,
          business_hours: '08:00-17:00 EST',
          contact_status: 'Active',
          comments: 'Test'
        }
      ],
      paymentHeaders: {
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
      paymentData: [
        {
          payment_category: 'Truck',
          asset_id: 'ID 1',
          contact_id: 'TL8712',
          vendor_id: 'VL8712',
          scheduled_date: '6/17/2022',
          amount: 130,
          payment_method: 'ACH',
          notes: 'Test'
        },
        {
          payment_category: 'Office Building',
          asset_id: 'ID 2',
          contact_id: 'TL8712',
          vendor_id: 'VL8712',
          scheduled_date: '6/17/2022',
          amount: 130,
          payment_method: 'Wire',
          notes: 'Test'
        },
        {
          payment_category: 'Trailer',
          asset_id: 'ID 3',
          contact_id: 'TL8712',
          vendor_id: 'VL8712',
          scheduled_date: '6/17/2022',
          amount: 130,
          payment_method: 'ACH',
          notes: 'Test'
        },
        {
          payment_category: 'Trailer',
          asset_id: 'ID 4',
          contact_id: 'TL8712',
          vendor_id: 'VL8712',
          scheduled_date: '6/17/2022',
          amount: 130,
          payment_method: 'ACH',
          notes: 'Test'
        },
        {
          payment_category: 'Trailer',
          asset_id: 'ID 5',
          contact_id: 'TL8712',
          vendor_id: 'VL8712',
          scheduled_date: '6/17/2022',
          amount: 130,
          payment_method: 'Wire',
          notes: 'Test'
        },
        {
          payment_category: 'Office Building',
          asset_id: 'ID 6',
          contact_id: 'TL8712',
          vendor_id: 'VL8712',
          scheduled_date: '6/17/2022',
          amount: 130,
          payment_method: 'Wire',
          notes: 'Test'
        },
        {
          payment_category: 'Trailer',
          asset_id: 'ID 5',
          contact_id: 'TL8712',
          vendor_id: 'VL8712',
          scheduled_date: '6/17/2022',
          amount: 130,
          payment_method: 'ACH',
          notes: 'Test'
        }
      ],
      assetHeaders: {
        vendor_id: {
          label: 'Asset ID'
        },
        asset_type: {
          label: 'Asset Type'
        },
        acquisition_type: {
          label: 'Acquisition Type'
        },
        acquisition_date: {
          label: 'Acquisition Date'
        },
        asset_amount: {
          label: 'Asset Amount'
        },
        down_payment: {
          label: 'Down Payment'
        },
        recurring_payment: {
          label: 'Recurring Payment'
        },
        payment_interval: {
          label: 'Payment Interval'
        },
        number_of_payments: {
          label: 'Number of'
        },
        payoff_amount: {
          label: 'Payoff Amount'
        },
        payment_start_date: {
          label: 'Payment Start Date'
        },
        payment_method: {
          label: 'Payment Method'
        },
        contract_id: {
          label: 'Contract ID'
        },
        documents: {
          label: 'Documents'
        }
      },
      assetData: [
        {
          id: 1,
          asset_id: 'Asset ID 1',
          asset_type: 'Truck',
          acquisition_type: 'Lease',
          e_mail: 'billsander@gmail.com',
          acquisition_date: '09/07/2022',
          asset_amount: '$130,000',
          down_payment: '$30,000',
          number_of: '60',
          contract_id: 'LT2938173',
          payoff_amount: '$30,000',
          payment_method: 'ACH',
          recurring_payment: '$1,000',
          payment_interval: 'Monthly',
          documents: 'LeaseAgreement.pdf',
          vendor_id: 'TL97123'
        },
        {
          id: 2,
          asset_id: 'Asset ID 1',
          asset_type: 'Trailer',
          acquisition_type: 'Finance',
          vendor_id: 'TL97123',
          e_mail: 'billsander@gmail.com',
          acquisition_date: '09/07/2022',
          asset_amount: '$130,000',
          down_payment: '$30,000',
          contract_id: 'LT2938173',
          recurring_payment: '$1,000',
          payment_interval: 'Monthly',
          number_of: '60',
          payoff_amount: '$30,000',
          payment_method: 'Wire',
          documents: 'LeaseAgreement.pdf'
        }
      ],
      transactionsHeaders: {
        transaction_id: {
          label: 'Transaction ID'
        },
        payment_category: {
          label: 'Payment Category'
        },
        asset_id: {
          label: 'Asset ID'
        },
        contract_id: {
          label: 'Contract ID'
        },
        transaction_date: {
          label: 'Transaction Date'
        },
        payment_amount: {
          label: 'Amount'
        },
        payment_method: {
          label: 'Payment Method'
        },
        documents: {
          label: 'Documents'
        },
        notes: {
          label: 'Notes'
        }
      },
      transactionsData: [
        {
          transaction_id: 'Txn ID 1',
          payment_category: 'Truck',
          asset_id: 'ID 1',
          contract_id: 'TL8712',
          transaction_date: '09/07/2022',
          amount2: '$130,000',
          payment_method: 'ACH',
          documents: 'documents.pdf',
          notes: 'Test'
        },
        {
          transaction_id: 'Txn ID 1',
          payment_category: 'Truck',
          asset_id: 'ID 2',
          contract_id: 'TL8712',
          transaction_date: '09/07/2022',
          amount2: '$130,000',
          payment_method: 'Wire',
          documents: 'documents.pdf',
          notes: 'Test'
        }
      ],
      vendorHeaders: {
        payment_category: {
          label: 'Payment Category'
        },
        asset_id: {
          label: 'Asset ID'
        },
        contract_id:
        {
          label: 'Contract ID'
        },
        scheduled_date:
        {
          label: 'Scheduled Date'
        },
        payment_amount: {
          label: 'Amount'
        },
        payment_method:
        {
          label: 'Payment Method'
        },
        notes:
        {
          label: 'Notes'
        }
      },
      vendorData: [
        {
          payment_category: 'Truck',
          asset_id: 'ID 1',
          contact_id: 'TL8712',
          scheduled_date: '6/17/2022',
          amount: 130,
          payment_method: 'ACH',
          notes: 'Test'
        },
        {
          payment_category: 'Office Building',
          asset_id: 'ID 2',
          contact_id: 'TL8712',
          scheduled_date: '6/17/2022',
          amount: 130,
          payment_method: 'Wire',
          notes: 'Test'
        },
        {
          payment_category: 'Trailer',
          asset_id: 'ID 3',
          contact_id: 'TL8712',
          vendor_id: 'VL8712',
          scheduled_date: '6/17/2022',
          amount: 130,
          payment_method: 'ACH',
          notes: 'Test'
        },
        {
          payment_category: 'Trailer',
          asset_id: 'ID 4',
          contact_id: 'TL8712',
          vendor_id: 'VL8712',
          scheduled_date: '6/17/2022',
          amount: 130,
          payment_method: 'ACH',
          notes: 'Test'
        },
        {
          payment_category: 'Trailer',
          asset_id: 'ID 5',
          contact_id: 'TL8712',
          vendor_id: 'VL8712',
          scheduled_date: '6/17/2022',
          amount: 130,
          payment_method: 'Wire',
          notes: 'Test'
        },
        {
          payment_category: 'Office Building',
          asset_id: 'ID 6',
          contact_id: 'TL8712',
          vendor_id: 'VL8712',
          scheduled_date: '6/17/2022',
          amount: 130,
          payment_method: 'Wire',
          notes: 'Test'
        },
        {
          payment_category: 'Trailer',
          asset_id: 'ID 5',
          contact_id: 'TL8712',
          vendor_id: 'VL8712',
          scheduled_date: '6/17/2022',
          amount: 130,
          payment_method: 'ACH',
          notes: 'Test'
        }
      ],
      operationalHeaders: {
        transaction_id: {
          label: 'Transaction ID'
        },
        payment_category: {
          label: 'Payment Category'
        },
        transaction_date: {
          label: 'Transaction Date'
        },
        payment_amount: {
          label: 'Amount'
        },
        payment_method: {
          label: 'Payment Method'
        },
        invoice_id: {
          label: 'Invoice ID'
        },
        parent_case_tag: {
          label: 'Parent Case Tag'
        },
        documents: {
          label: 'Documents'
        },
        notes: {
          label: 'Notes'
        }
      },
      operationalData: [
        {
          transaction_id: 'Txn ID 1',
          payment_category: 'Insurance',
          transaction_date: '09/07/2022',
          amount2: '$130,000',
          payment_method: 'ACH',
          invoice_id: 'IN32131',
          parent_case_tag: '',
          documents: 'Invoice.pdf',
          notes: 'Test'
        },
        {
          transaction_id: 'Txn ID 1',
          payment_category: 'IFTA',
          transaction_date: '09/07/2022',
          amount2: '$130,000',
          payment_method: 'Wire',
          invoice_id: 'IN32131',
          parent_case_tag: '',
          documents: 'Invoice.pdf',
          notes: 'Test'
        },
        {
          transaction_id: 'Txn ID 1',
          payment_category: 'PrePass',
          transaction_date: '09/07/2022',
          amount2: '$130,000',
          payment_method: 'Wire',
          invoice_id: 'IN32131',
          parent_case_tag: '',
          documents: 'Invoice.pdf',
          notes: 'Test'
        },
        {
          transaction_id: 'Txn ID 1',
          payment_category: 'Repair',
          transaction_date: '09/07/2022',
          amount2: '$130,000',
          payment_method: 'ACH',
          invoice_id: 'IN32131',
          parent_case_tag: '',
          documents: 'Invoice.pdf',
          notes: 'Test'
        }
      ],
      documentHeaders: {
        document: {
          label: 'Document'
        },
        document_name: {
          label: 'Name'
        },
        document_size: {
          label: 'Size'
        },
        document_upload_date: {
          label: 'Date'
        },
        uploader_name: {
          label: 'Uploader'
        },
        document_type: {
          label: 'Type'
        },
        actions: {
          label: 'Action'
        }
      },
      documentData: [
        {
          avatar: '/images/pdf-icon.png',
          document: 'docname.pdf',
          name: 'Document Name',
          size: '36 Kb',
          date: '09/07/2022',
          uploader: 'Ian Cooper',
          type: 'Invoice'
        },
        {
          avatar: '/images/excel-icon.png',
          document: 'docname.exe',
          name: 'Document Name',
          size: '24 Kb',
          date: '09/07/2022',
          uploader: 'Ronald Richards',
          type: 'Other'
        },
        {
          avatar: '/images/word-icon.png',
          document: 'docname.word',
          name: 'Document Name',
          size: '46 Kb',
          date: '09/07/2022',
          uploader: 'Darlene Robertson',
          type: 'Invoice'
        },
        {
          avatar: '/images/pdf-icon.png',
          document: 'docname.pdf',
          name: 'Document Name',
          size: '12 Kb',
          date: '09/07/2022',
          uploader: 'Robert Fox',
          type: 'Invoice'
        },
        {
          avatar: '/images/word-icon.png',
          document: 'docname.word',
          name: 'Document Name',
          size: '2 Mb',
          date: '09/07/2022',
          uploader: 'Bessie Cooper',
          type: 'Invoice'
        },
        {
          avatar: '/images/pdf-icon.png',
          document: 'docname.pdf',
          name: 'Document Name',
          size: '46 Kb',
          date: '09/07/2022',
          uploader: 'Kristin Watson',
          type: 'Other'
        },
        {
          avatar: '/images/excel-icon.png',
          document: 'docname.exe',
          name: 'Document Name',
          size: '29 Kb',
          date: '09/07/2022',
          uploader: 'Savannah Nguyen',
          type: 'Invoice'
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
    response (): VendorsDetails {
      return (this.$store.getters['accounting/vendors/vendor'])
    },
    contact (): ContactsDetails {
      return (this.$store.getters['accounting/contactsDetails/contact'])
    },
    contacts (): ContactsDetails {
      return (this.$store.getters['accounting/contactsDetails/carrierContacts'])
    },
    contactPageCount () {
      console.log('test', this.$store.getters['accounting/contactsDetails/pageCount'])

      return (this.$store.getters['accounting/contactsDetails/pageCount'])
    },
    asset (): AssetsDetails {
      return (this.$store.getters['accounting/assetsDetails/asset'])
    },
    assets (): AssetsDetails {
      return (this.$store.getters['accounting/assetsDetails/carrierAssets'])
    },
    assetPageCount (): Number {
      return (this.$store.getters['accounting/assetsDetails/pageCount'])
    },
    transaction (): AssetTransactionsDetail {
      return (this.$store.getters['accounting/assetTransactions/transaction'])
    },
    transactions (): AssetTransactionsDetail {
      return (this.$store.getters['accounting/assetTransactions/carrierTransactions'])
    },
    transactionPageCount (): Number {
      return (this.$store.getters['accounting/assetTransactions/pageCount'])
    },
    operational (): OperationalTransactionsDetails {
      return (this.$store.getters['accounting/operationalPayments/operational'])
    },
    operationals (): OperationalTransactionsDetails {
      return (this.$store.getters['accounting/operationalPayments/carrierOperationals'])
    },
    operationalPageCount (): Number {
      return (this.$store.getters['accounting/operationalPayments/pageCount'])
    },
    vendorPayment (): VendorPaymentsDetails {
      return (this.$store.getters['accounting/vendorPayments/vendorPayment'])
    },
    vendorPayments (): VendorPaymentsDetails {
      console.log('rendered:', this.$store.getters['accounting/vendorPayments/carrierVendorPayments'])

      return (this.$store.getters['accounting/vendorPayments/carrierVendorPayments'])
    },
    vendorPaymentPageCount (): Number {
      return (this.$store.getters['accounting/vendorPayments/pageCount'])
    },
    document (): AssetsDetails {
      return (this.$store.getters['accounting/documentsDetails/document'])
    },
    documents (): AssetsDetails {
      return (this.$store.getters['accounting/documentsDetails/carrierDocuments'])
    },
    documentPageCount (): Number {
      return (this.$store.getters['accounting/documentsDetails/pageCount'])
    }
  },
  mounted () {
    // this.getContacts(1)
    this.getAssets({ page_number: 1 })
    this.getTransactionsByCarrierId({ page_number: 1 })
    this.getOperationals({ page_number: 1 })
    this.getContactsByCarrierId({ page_number: 1 })
    this.getVendorPaymentByCarrierId({ page_number: 1 })
    this.getDocumentByCarrierId({ page_number: 1 })
    // this.getVendorPayments(1)
  },
  created () {
    this.getVendor(parseInt(this.$route.params.id, 10))
  },
  methods: {
    ...mapActions({

      // Vendor
      getVendor: (action, id) => action('accounting/vendors/getVendor', id),

      // Contact
      getContacts: (action, page) => action('accounting/contactsDetails/getContacts', page),
      getContactsByCarrierId: (action, page) => action('accounting/contactsDetails/getContactsByCarrierId', page),
      removeContact: (action, page) => action('accounting/contactsDetails/removeContact', page),
      updateContact: (action, request) => action('accounting/contactsDetails/updateContact', request),

      // Asset
      getAsset: (action, id) => action('accounting/assetsDetails/getAsset', id),
      getAssets: (action, id) => action('accounting/assetsDetails/getAssets', id),
      getAssetsByCarrierId: (action, page) => action('accounting/assetsDetails/getAssetsByCarrierId', page),
      removeAsset: (action, page) => action('accounting/assetsDetails/removeAsset', page),

      // Transaction
      getTransaction: (action, id) => action('accounting/assetTransactions/getTransaction', id),
      updateTransaction: (action, request) => action('accounting/assetTransactions/updateTransaction', request),
      getTransactions: (action, id) => action('accounting/assetTransactions/getTransactions', id),
      getTransactionsByCarrierId: (action, page) => action('accounting/assetTransactions/getTransactionsByCarrierId', page),
      removeTransaction: (action, page) => action('accounting/assetTransactions/removeTransaction', page),

      // Operational
      getOperational: (action, id) => action('accounting/operationalPayments/getOperational', id),
      getOperationals: (action, id) => action('accounting/operationalPayments/getOperationalsByCarrierId', id),
      updateOperational: (action, request) => action('accounting/operationalPayments/updateOperational', request),
      removeOperational: (action, page) => action('accounting/operationalPayments/removeOperational', page),

      // Vendor Payment
      getVendorPayment: (action, id) => action('accounting/vendorPayments/getVendorPayment', id),
      getVendorPayments: (action, id) => action('accounting/vendorPayments/getVendorPayments', id),
      getVendorPaymentByCarrierId: (action, page) => action('accounting/vendorPayments/getVendorPaymentByCarrierId', page),
      updateVendorPayment: (action, request) => action('accounting/vendorPayments/updateVendorPayment', request),
      removeVendorPayment: (action, page) => action('accounting/vendorPayments/removeVendorPayment', page),

      // Documents
      getDocument: (action, id) => action('accounting/documentsDetails/getDocument', id),
      getDocuments: (action, id) => action('accounting/documentsDetails/getDocuments', id),
      getDocumentByCarrierId: (action, page) => action('accounting/documentsDetails/getDocumentByCarrierId', page),
      removeDocument: (action, page) => action('accounting/documentsDetails/removeDocument', page)
    }),
    getKey () {
      this.tableKey = Math.random()
    },
    select (index: number) {
      this.selectedTab = index
      this.getKey()
    },
    drawer (componentName: string) {
      this.$refs.drawer.showDrawer(componentName)
    },
    setStatus (id:number, newStatus:any) {
      const data = this.contacts.slice()
      console.log(id, newStatus)
      const item = data.find((w:any) => w.id === id)
      this.updateContact({ ...item, contact_status: newStatus })
    },
    extendItem (event:MouseEvent, item: any, menuItem?:string | null): void {
      if (menuItem) { item.status = menuItem }
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
    getContactNoteItem (item: { [x:string] : any }) {
      return {
        ...item
      }
    },
    getAssetPaymentsNoteItem (item: { [x:string] : any }) {
      return {
        ...item,
        transaction_date: moment(item.transaction_date).toISOString(),
        documents: undefined
      }
    },
    getOperationalPaymentsNoteItem (item: { [x:string] : any }) {
      return {
        ...item,
        transaction_date: moment(item.transaction_date).toISOString(),
        documents: undefined
      }
    },
    getVendorPaymentsNoteItem (item: { [x:string] : any }) {
      return {
        ...item,
        scheduled_date: moment(item.scheduled_date).toISOString(),
        documents: undefined
      }
    }
  }
  // computed: {
  //   scorePosition () {
  //     const test = 180 * (this.response.fscPercentage / 100)
  //     if (test >= 90) {
  //       return (test - 90)
  //     } else {
  //       return (test + 270)
  //     }
  //     // return ((180 * (this.response.fscPercentage / 100)) - this.response.fscPercentage)
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
