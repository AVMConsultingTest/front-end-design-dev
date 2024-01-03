<template>
  <div class="w-full">
    <Drawer ref="drawer" />
    <PageHeader title="Transactions" class="mb-6" @goback="$router.go(-1)" />
    <div class="row mb-5">
      <div class="col-12 mb-5">
        <Table
          title="Asset Payments"
          icon="money-change"
          icon-color="green"
          icon-alpha="800"
          :headers="headers"
          :data="testData"
          :search-enabled="true"
        >
          <template #item-notes="{item}">
            <NotesEdit :item="item" />
          </template>
          <template #item-broker_name="{ item, data, index }">
            <div class="row" @click="$router.push(`/carrier/dashboard/dispatch/driver-board/${item.id}`)">
              <div class="col-auto">
                <span class="block text-c-1 text-gray-400">
                  {{ data[index].broker_name }}
                </span>
              </div>
            </div>
          </template>
          <template #item-documents="{ item }">
            <div class="flex items-center gap-2">
              <Icon icon="document-text" color="purple-blue" :alpha="0" variant="bulk" class="w-4 h-4" />
              <span> {{ item.documents.length }} Doc(s)</span>
            </div>
          </template>
          <div slot="actions" class="w-full flex items-center justify-end">
            <div class="!w-52 m-input mr-2 flex items-center cursor-pointer">
              <Icon icon="directbox-receive" variant="bulk" color="gray" :alpha="400" class="w-6 h-6 ml-5 mr-2" />
              <span class="text-c-1 mr-5">Download</span>
            </div>
            <div
              class="!bg-black !w-14 !border-none m-input flex items-center justify-center cursor-pointer"
              @click="drawer('TransactionsAssetStep')"
            >
              <Icon icon="add" color="white" class="w-6 h-6" />
            </div>
          </div>
        </Table>
        <Table
          title="Operational Payments"
          icon="money-change"
          icon-color="orange"
          icon-alpha="800"
          :headers="headers2"
          :data="testData2"
          :search-enabled="true"
          class="mt-12"
        >
          <template #item-notes="{item}">
            <NotesEdit :item="item" />
          </template>
          <template #item-broker_name="{ item, data, index }">
            <div class="row" @click="$router.push(`/carrier/dashboard/dispatch/driver-board/${item.id}`)">
              <div class="col-auto">
                <span class="block text-c-1 text-gray-400">
                  {{ data[index].broker_name }}
                </span>
              </div>
            </div>
          </template>
          <div slot="actions" class="w-full flex items-center justify-end">
            <div class="!w-52 m-input mr-2 flex items-center cursor-pointer">
              <Icon icon="directbox-receive" variant="bulk" color="gray" :alpha="400" class="w-6 h-6 ml-5 mr-2" />
              <span class="text-c-1 mr-5">Download</span>
            </div>
            <div
              class="!bg-black !w-14 !border-none m-input flex items-center justify-center cursor-pointer"
              @click="drawer('TransactionsOperationalStep')"
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
      SizeTypeEnum,
      headers: {
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
        vendor_id: {
          label: 'Vendor ID'
        },
        transaction_date: {
          label: 'Transaction Date'
        },
        amount: {
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
      headers2: {
        transaction_id: {
          label: 'Transaction ID'
        },
        payment_category: {
          label: 'Payment Category'
        },
        transaction_date: {
          label: 'Transaction Date'
        },
        amount: {
          label: 'Amount'
        },
        payment_method: {
          label: 'Payment Method'
        },
        invoice_id: {
          label: 'Invoice ID'
        },
        vendor_id: {
          label: 'Vendor ID'
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
      testData: [
        {
          id: 1,
          transaction_id: 'Txn ID 1',
          payment_category: 'Truck',
          asset_id: 'ID 1',
          contract_id: 'TL8712',
          vendor_id: 'VTL8712',
          transaction_date: '09/07/2022',
          amount: '$130,000',
          payment_method: 'ACH',
          documents: ['doc1', 'doc2', 'doc3'],
          notes: 'Test'
        },
        {
          id: 2,
          transaction_id: 'Txn ID 1',
          payment_category: 'Truck',
          asset_id: 'ID 2',
          contract_id: 'TL8712',
          vendor_id: 'ID 2',
          transaction_date: '09/07/2022',
          amount: '$130,000',
          payment_method: 'Wire',
          documents: ['doc1', 'doc2', 'doc3'],
          notes: 'Test'
        }
      ],
      testData2: [
        {
          id: 1,
          transaction_id: 'Txn ID 1',
          payment_category: 'Insurance',
          transaction_date: '09/07/2022',
          amount: '$130,000',
          payment_method: 'ACH',
          invoice_id: 'IN32131',
          vendor_id: 'VN32138',
          parent_case_tag: '',
          documents: 'Invoice.pdf',
          notes: 'Test'
        },
        {
          id: 2,
          transaction_id: 'Txn ID 1',
          payment_category: 'IFTA',
          transaction_date: '09/07/2022',
          amount: '$130,000',
          payment_method: 'Wire',
          invoice_id: 'IN32131',
          vendor_id: 'VN32138',
          parent_case_tag: '',
          documents: 'Invoice.pdf',
          notes: 'Test'
        }
      ]
    }
  },
  methods: {
    drawer (componentName: String) {
      (this.$refs.drawer as Vue & { showDrawer: (component: String, routeUrl?: String) => Element }).showDrawer(componentName)
    }
  }

})
</script>

      <style scoped>

      </style>
