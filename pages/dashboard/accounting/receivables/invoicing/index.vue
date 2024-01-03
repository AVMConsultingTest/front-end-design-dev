<template>
  <div class="w-full">
    <Drawer ref="drawer" />
    <PageHeader title="Invoicing" class="mb-6" @goback="$router.go(-1)" />
    <div class="row mb-5">
      <div class="col-12 mb-5">
        <Table
          title="Invoicing"
          icon="bill"
          icon-color="green"
          :icon-alpha="800"
          :headers="headers"
          :data="testData"
          :search-enabled="true"
          :filter-enabled="true"
        >
          <template #item-load="{ data, index }">
            <div class="flex items-center">
              <div class="col-auto">
                <span class="block text-dark-blue">
                  {{ data[index].load }}
                </span>
              </div>
            </div>
          </template>
          <template #item-broker_name="{ item, data, index }">
            <div class="row" @click="$router.push(`/carrier/dashboard/dispatch/driver-board/${item.id}`)">
              <div class="col-auto">
                <span class="block font-semibold">
                  {{ data[index].broker_name }}
                </span>
              </div>
            </div>
          </template>
          <template #item-broker_id="{ data, index }">
            <div class="flex items-center">
              <div class="col-auto">
                <span class="block text-gray-400">
                  {{ data[index].broker_id }}
                </span>
              </div>
            </div>
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
          <template #item-documents="{ item }">
            <div
              class="flex items-center gap-2 relative p-c"
              @click="(e)=> {getPosition(e,item.id)}"
            >
              <Icon icon="document-text" color="purple-blue" :alpha="0" variant="bulk" class="w-4 h-4 p-c" />
              <span class="p-c"> {{ item.documents.length }} Doc(s)</span>
              <transition name="slide">
                <div v-if="hoverId === item.id" :style="dropdownStyle" class="fixed text-left rounded-lg bg-white left-0 right-0 w-60 shadow-2xl dp">
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
                </div>
              </transition>
            </div>
          </template>
          <template #item-action="{item}">
            <div>
              <Button
                :type="ButtonTypeEnum.PRIMARY"
                :size="SizeTypeEnum.LG"
                :action="ActionTypeEnum.SUBMIT"
                class="!h-10 max-w-max p-4 !w-20 text-c-1"
              >
                Create
              </Button>
              <b>{{ item.action }}</b>
            </div>
          </template>
        </Table>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {
  SizeTypeEnum,
  ActionTypeEnum,
  ButtonTypeEnum
} from '~/components/ts/enums'
export default Vue.extend({
  layout: 'Dashboard',
  data () {
    return {
      SizeTypeEnum,
      ButtonTypeEnum,
      ActionTypeEnum,
      hoverId: 0,
      showDownloads: false,
      headers: {
        load: {
          label: 'Load'
        },
        load_comp_date: {
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
        note: {
          label: 'Notes'
        },
        action: {
          label: 'Action'
        }
      },
      testData: [
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
          note: 'Test'
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
          note: 'Test'
        }
      ],
      dropdownStyle: {}
    }
  },
  methods: {
    drawer () {
      (this.$refs.drawer as Vue & { showDrawer: (component: String, routeUrl?: String) => Element }).showDrawer('')
    },
    getPosition (event:any, id:number) {
      if (event.target.classList.contains('p-c')) {
        const position = {
          x: event.pageX,
          y: event.pageY
        }
        console.log(position)
        this.hoverId = id
        this.showDownloads = true
        const { clientX, clientY } = event
        this.dropdownStyle = {
          top: `${clientY - 180}px`,
          left: `${clientX - 120}px`
        }
      } else if (event.target.classList.contains('dp')) {
        this.hoverId = 0
        this.showDownloads = false
      }
    }
  }

})
</script>

<style scoped>

</style>
