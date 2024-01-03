<template>
  <div class="w-full">
    <Drawer ref="drawer" />
    <PageHeader title="Marketplace" class="mb-10" />
    <div class="row mb-8">
      <div class="col-12">
        <div class="row mx-0">
          <div class="col-auto p-0 pr-2 flex">
            <TabButton
              v-for="(tab, index) in tabs"
              :key="index"
              class="mr-2"
              :title="tab.name"
              color="green"
              :icon="tab.icon"
              :active="(selectedTab === index)"
              @click="select(index)"
            />
          </div>
        </div>
      </div>
    </div>
    <div v-if="selectedTab === 0">
      <div class="flex">
        <div class="col-9">
          <div class="flex flex-wrap p-6 border-t border-grey-blue-100">
            <div
              v-for="(filter, index) in filterModels"
              :key="index"
              :class="`col-${filter.colSpan} px-1 mb-2`"
            >
              <Input
                v-if="filter.inputType === 'input' || filter.inputType === 'date'"
                v-model="vfilter[filter.modelName]"
                :name="filter.options"
                :debounce-timer="1000"
                :type="filter.inputType === 'input' ? 'text' : 'date'"
                :placeholder="filter.filterName"
              />
              <m-select
                v-else
                v-model="vfilter[filter.modelName]"
                :options="filter.options"
                :name="filter.filterName"
                :placeholder="filter.filterName"
                :bind-text="true"
                :is-nullable="true"
              />
            </div>
          </div>
        </div>
        <div class="col-3">
          <div class="flex p-6 items-end h-full">
            <Button
              class="flex flex-1 !bg-transparent text-gray col-6"
              :type="ButtonTypeEnum.PRIMARY"
              :action="ActionTypeEnum.BUTTON"
            >
              Clear All
            </Button>
            <Button
              class="flex flex-1 max-w-max p-4 !w-32 !bg-dark-blue border border-dark-blue text-white col-6"
              :type="ButtonTypeEnum.PRIMARY"
              :action="ActionTypeEnum.BUTTON"
            >
              Search
            </Button>
          </div>
        </div>
      </div>
      <div v-if="loads.length > 0">
        <DispatchMarketPlaceCard v-for="(load, index) in loads" :key="index" :data="load" class="mb-3" />
      </div>
      <Pagination :request-function="getLoadsDetails" :page-count="loadsPageCount" :filtering-model="vfilter" />
    </div>
    <div v-if="selectedTab === 1">
      <div class="flex">
        <div class="col-9">
          <div class="flex flex-wrap p-6 border-t border-grey-blue-100 border-b">
            <div
              v-for="(filter, index) in filterModels"
              :key="index"
              :class="`col-${filter.colSpan} px-1 mb-2`"
            >
              <Input
                v-if="filter.inputType === 'input' || filter.inputType === 'date'"
                v-model="vfilter[filter.modelName]"
                :name="filter.options"
                :debounce-timer="1000"
                :type="filter.inputType === 'input' ? 'text' : 'date'"
                :placeholder="filter.filterName"
              />
              <m-select
                v-else
                v-model="vfilter[filter.modelName]"
                :options="filter.options"
                :name="filter.filterName"
                :placeholder="filter.filterName"
                :bind-text="true"
                :is-nullable="true"
              />
            </div>
          </div>
        </div>
        <div class="col-3">
          <div class="flex p-6 items-end h-full">
            <Button
              class="flex flex-1 !bg-transparent text-gray col-6"
              :type="ButtonTypeEnum.PRIMARY"
              :action="ActionTypeEnum.BUTTON"
            >
              Clear All
            </Button>
            <Button
              class="flex flex-1 max-w-max p-4 !w-32 !bg-dark-blue border border-dark-blue text-white col-6"
              :type="ButtonTypeEnum.PRIMARY"
              :action="ActionTypeEnum.BUTTON"
            >
              Search
            </Button>
          </div>
        </div>
      </div>
      <div class="flex justify-center pt-28 flex-col items-center">
        <div class="flex rounded-full bg-white shadow-2xl shadow-gray-200">
          <img src="/images/amazon_big.png" alt="" class="w-[127px] h-[127px] rounded-full">
        </div>
        <div class="flex pt-10">
          <span class="text-32 font-semibold leading-10 text-[#2B2E3A]">
            Amazon Login
          </span>
        </div>
        <div class="col-4 flex justify-center items-center pb-[173px]">
          <Button
            class="mt-10 !col-4 !w-[200px] !h-10 text-c-1 font-medium leading-4"
            :type="ButtonTypeEnum.PRIMARY"
            :size="SizeTypeEnum.MD"
            :action="ActionTypeEnum.SUBMIT"
            @click="openModal"
          >
            Login Amazon
          </Button>
        </div>
      </div>
      <Modal ref="modal" size="sm" position="center">
        <div slot="body" class="row flex items-center justify-center pt-16 pb-14">
          <div class="col-8 items-center justify-center">
            <h3 class="font-semibold text-32 leading-10 text-center mb-2">
              Amazon Login
            </h3>
          </div>
          <div class="col-8 mt-10">
            <Form fclass="row my-2" @send="handleSubmit">
              <div class="col-12 mb-6">
                <Input
                  name="email"
                  type="email"
                  label="E-mail Address"
                  rules="required|email"
                  :thin="true"
                />
              </div>
              <div class="col-12 mb-6">
                <Input
                  vid="password"
                  name="password"
                  :type="showPasswordType"
                  label="Password"
                  rules="required"
                  placeholder="At least 8 characters"
                  :thin="true"
                >
                  <Icon
                    slot="addonRight"
                    :icon="showPasswordType === 'password' ? 'eye-slash' : 'eye'"
                    variant="linear"
                    color="gray"
                    :alpha="400"
                    class="w-4 h-4 cursor-pointer"
                    :disable-fill="true"
                    @click.native="showPassword"
                  />
                </Input>
              </div>
              <div class="col-12 mt-[88px]">
                <Button
                  :type="ButtonTypeEnum.GREEN"
                  :size="SizeTypeEnum.LG"
                  :action="ActionTypeEnum.SUBMIT"
                >
                  Continue
                </Button>
                <Button
                  :type="ButtonTypeEnum.LINK"
                  :size="SizeTypeEnum.LG"
                  :action="ActionTypeEnum.BUTTON"
                  @click="modalHide()"
                >
                  Cancel
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </Modal>
    </div>
    <div v-if="selectedTab === 2">
      <div class="flex">
        <div class="col-9">
          <div class="flex flex-wrap p-6 border-t border-grey-blue-100 border-b">
            <div
              v-for="(filter, index) in filterModels"
              :key="index"
              :class="`col-${filter.colSpan} px-1 mb-2`"
            >
              <Input
                v-if="filter.inputType === 'input' || filter.inputType === 'date'"
                v-model="vfilter[filter.modelName]"
                :name="filter.options"
                :debounce-timer="1000"
                :type="filter.inputType === 'input' ? 'text' : 'date'"
                :placeholder="filter.filterName"
              />
              <m-select
                v-else
                v-model="vfilter[filter.modelName]"
                :options="filter.options"
                :name="filter.filterName"
                :placeholder="filter.filterName"
                :bind-text="true"
                :is-nullable="true"
              />
            </div>
          </div>
        </div>
        <div class="col-3">
          <div class="flex p-6 items-end h-full">
            <Button
              class="flex flex-1 !bg-transparent text-gray col-6"
              :type="ButtonTypeEnum.PRIMARY"
              :action="ActionTypeEnum.BUTTON"
            >
              Clear All
            </Button>
            <Button
              class="flex flex-1 max-w-max p-4 !w-32 !bg-dark-blue border border-dark-blue text-white col-6"
              :type="ButtonTypeEnum.PRIMARY"
              :action="ActionTypeEnum.BUTTON"
            >
              Search
            </Button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapActions } from 'vuex'
import {
  SizeTypeEnum,
  ActionTypeEnum,
  ButtonTypeEnum
} from '@/components/ts/enums'
import { LoadBoardDetails } from '~/models/Marketplace/LoadBoardDetails/LoadBoardDetails'
export default Vue.extend({
  layout: 'Dashboard',
  data () {
    return {
      ButtonTypeEnum,
      ActionTypeEnum,
      SizeTypeEnum,
      selectedTab: 0,
      showPasswordType: 'password',
      tabs: [
        {
          name: 'Nebula',
          icon: 'monitor-mobbile'
        },
        {
          name: 'Amazon',
          icon: 'document'
        },
        {
          name: 'DAT',
          icon: 'document'
        }
      ],
      filterModels: [
        {
          modelName: 'origin',
          filterName: 'Origin',
          inputType: 'select',
          colSpan: 2,
          options: [
            { id: 1, text: 'Roanoke, TX' },
            { id: 2, text: 'Oxnard, CA' }
          ]
        },
        {
          modelName: 'destination',
          filterName: 'Destination',
          inputType: 'input',
          colSpan: 4
        },
        // {
        //   modelName: 'radius',
        //   filterName: 'Radius',
        //   inputType: 'select',
        //   colSpan: 2,
        //   options: [
        //     { id: 1, text: 'Driver' },
        //     { id: 2, text: 'Operator' }
        //   ]
        // },
        {
          modelName: 'price_max',
          filterName: 'Max Rate Per Mile',
          inputType: 'input',
          colSpan: 3
        },
        {
          modelName: 'price_min',
          filterName: 'Min Rate Per Mile',
          inputType: 'input',
          colSpan: 3
        },
        {
          modelName: 'payout_max',
          filterName: 'Max Payout',
          inputType: 'input',
          colSpan: 2
        },
        {
          modelName: 'payout_min',
          filterName: 'Min Payout',
          inputType: 'select',
          colSpan: 2,
          options: [
            { id: 1, text: '100' },
            { id: 2, text: '200' },
            { id: 3, text: '300' },
            { id: 4, text: '400' }
          ]
        },
        {
          modelName: 'start_date',
          filterName: 'Pick Up Dates',
          inputType: 'date',
          colSpan: 2
        },
        {
          modelName: 'end_Date',
          filterName: 'Drop off Dates',
          inputType: 'date',
          colSpan: 2
        },
        {
          modelName: 'min_number_of_stops',
          filterName: 'Min Stops',
          inputType: 'input',
          colSpan: 2
        },
        {
          modelName: 'max_number_of_stops',
          filterName: 'Max Stops',
          inputType: 'input',
          colSpan: 2
        }
      ],
      vfilter: {} as { [key: string]: unknown }
    }
  },
  computed: {
    loads (): LoadBoardDetails[] {
      return (this.$store.getters['marketplace/loadBoardDetails/loads'])
    },
    loadsPageCount (): LoadBoardDetails[] {
      return (this.$store.getters['marketplace/loadBoardDetails/page'])
    }
  },
  created () {
    // this.getLoadsDetails({ page_number: 1 })
  },
  methods: {
    ...mapActions({
      getLoadsDetails: (action, page) => action('marketplace/loadBoardDetails/getLoads', page)
    }),
    getKey () {
      this.tableKey = Math.random()
    },
    select (index: number): void {
      this.selectedTab = index
      this.getKey()
    },
    openModal () {
      (this.$refs.modal as Vue & { showModal: () => Element }).showModal()
    },
    modalHide (): void {
      this.firstBody = true;
      (this.$refs.modal as Vue & { hideModal: () => Function }).hideModal()
    },
    showPassword () {
      console.log('shw pw')
      this.showPasswordType = this.showPasswordType === 'password' ? 'text' : 'password'
    }
  }
})
</script>
