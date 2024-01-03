<template>
  <div class="w-full">
    <PageHeader
      title="Marketplace"
      class="mb-10"
      @goback="$router.go(-1)"
      @search="''"
    />
    <div key="list">
      <Table
        ref="table"
        icon-color="green"
        title="Marketplace"
        :icon-alpha="800"
        :headers="headers"
        :data="testData"
        :extend-enabled="true"
        :download-enabled="true"
        :search-enabled="true"
        class="mb-6"
      >
        <template #custom-filter>
          <div class="flex mb-6 mt-2">
            <m-select
              v-model="origin"
              :options="originOptions"
              name="Origin"
              :bind-text="true"
              :addable="true"
              class="col-3 ml-3"
            />

            <m-select
              v-model="destination"
              :options="destinationOptions"
              name="Destination"
              :bind-text="true"
              :addable="true"
              class="col-3 ml-3"
            />
          </div>
        </template>
        <template #item-broker_id="{ item }">
          <div class="block text-dark-blue whitespace-nowrap">
            {{ item.broker_load_id }}
          </div>
        </template>
        <template #item-actions>
          <div class="col-auto ml-auto">
            <div class="flex gap-1">
              <div class="flex flex-col">
                <div class="w-28 h-10">
                  <Button
                    class="flex !bg-white border border-green-800 text-green-800"
                    :type="ButtonTypeEnum.PRIMARY"
                    :size="SizeTypeEnum.MD"
                    :action="ActionTypeEnum.BUTTON"
                    @click="openModal1"
                  >
                    Place Bid
                  </Button>
                  <Modal ref="modal1" size="sm">
                    <div slot="body" class="row flex items-center justify-center py-16">
                      <div class="col-8 items-center justify-center my-0">
                        <h3 class="font-semibold text-center mb-2">
                          Place Bid
                        </h3>
                        <p class="text-b-4 font-medium text-gray-400 text-center">
                          Something.
                        </p>
                        <Form fclass="row my-2">
                          <div class="col-12 mb-6">
                            <Input
                              name="ratePerMile"
                              type="text"
                              label="Rate Per Mile"
                              rules="required"
                            />
                          </div>
                          <div class="col-12 mb-6">
                            <Input
                              name="allInRate"
                              type="text"
                              label="All-in Rate"
                              rules="required"
                            />
                          </div>
                        </Form>
                      </div>
                      <div class="col-8">
                        <Button :type="ButtonTypeEnum.GREEN" :size="SizeTypeEnum.LG">
                          Submit
                        </Button>
                        <Button
                          :type="ButtonTypeEnum.LINK"
                          :size="SizeTypeEnum.LG"
                          :action="ActionTypeEnum.BUTTON"
                          class="mt-2"
                          @click="hideModal1()"
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </Modal>
                </div>
              </div>
            </div>
          </div>
          <div class="col-auto ml-4">
            <div class="flex gap-1">
              <div class="flex flex-col">
                <div class="w-28 h-10">
                  <Button
                    class="flex !bg-green-400 !text-sidebar-bg"
                    :type="ButtonTypeEnum.PRIMARY"
                    :size="SizeTypeEnum.MD"
                    :action="ActionTypeEnum.BUTTON"
                    @click="openModal2"
                  >
                    Book Now
                  </Button>
                  <Modal ref="modal2" size="sm">
                    <div slot="body" class="row flex items-center justify-center py-16">
                      <div class="col-8 items-center justify-center my-0">
                        <h3 class="font-semibold text-center mb-2">
                          Book Now
                        </h3>
                        <p class="text-b-4 font-medium text-gray-400 text-center">
                          Odio eu purus imperdiet feugiat.
                          Faucibus semper volutpat sapien, morbi neque
                          pulvinar velit. Elementum.
                        </p>
                        <Form fclass="row mb-2 mt-12">
                          <div class="col-12 mt-6">
                            <div class="title-label mb-2">
                              Rate Per Mile
                            </div>
                            <div
                              name=""
                              type=""
                              label="rate permite"
                              rules=""
                              class="bg-[#F9FAFB] p-5"
                            >
                              $3,50
                            </div>
                          </div>
                        </Form>
                      </div>
                      <div class="col-8 mt-14">
                        <Button :type="ButtonTypeEnum.GREEN" :size="SizeTypeEnum.LG">
                          Submit
                        </Button>
                        <Button
                          :type="ButtonTypeEnum.LINK"
                          :size="SizeTypeEnum.LG"
                          :action="ActionTypeEnum.BUTTON"
                          class="mt-2"
                          @click="hideModal2()"
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </Modal>
                </div>
              </div>
            </div>
          </div>
        </template>
      </Table>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {
  SizeTypeEnum,
  ActionTypeEnum,
  ButtonTypeEnum
} from '@/components/ts/enums'
export default Vue.extend({
  name: 'MarketPlaceDetails',
  layout: 'Dashboard',
  data () {
    return {
      ButtonTypeEnum,
      ActionTypeEnum,
      SizeTypeEnum,
      searchTerm: '',
      origin: '',
      destination: '',
      originOptions: [{
        id: 0,
        text: 'Roanoke, TX'
      }],
      destinationOptions: [{
        id: 0,
        text: 'Phoenix, AZ'
      }],
      headers: {
        icon: '',
        broker_load_id: {
          label: 'Broker Load ID',
          searchable: true
        },
        origin: {
          label: 'Origin',
          searchable: true
        },
        destination: {
          label: 'Destination',
          searchable: true
        },
        origin_time: {
          label: 'Origin Time',
          searchable: true
        },
        destination_time: {
          label: 'Destination Time',
          searchable: true
        },
        miles: {
          label: 'Miles',
          searchable: true
        },
        all_in_rate: {
          label: 'All in Rate',
          searchable: true
        },
        book_now: {
          label: 'Book Now',
          searchable: true
        },
        actions: ''
      },
      testData: [
        {
          broker_load_id: 'BL - 09362',
          origin: 'Roanoke, TX',
          destination: 'Phoenix, AZ',
          origin_time: '17 Oct, 2020 10:23 PM',
          destination_time: '24 Oct, 2020 10:00 AM',
          miles: '$1,100.0 $10,58 per Mile',
          all_in_rate: '$10,58',
          book_now: '$10,58'
        },
        {
          broker_load_id: 'BL - 09362',
          origin: 'Roanoke, TX',
          destination: 'Phoenix, AZ',
          origin_time: '17 Oct, 2020 10:23 PM',
          destination_time: '24 Oct, 2020 10:00 AM',
          miles: '$1,100.0 $10,58 per Mile',
          all_in_rate: '$10,58',
          book_now: '$10,58'
        },
        {
          broker_load_id: 'BL - 09362',
          origin: 'Roanoke, TX',
          destination: 'Phoenix, AZ',
          origin_time: '17 Oct, 2020 10:23 PM',
          destination_time: '24 Oct, 2020 10:00 AM',
          miles: '$1,100.0 $10,58 per Mile',
          all_in_rate: '$10,58',
          book_now: '$10,58'
        },
        {
          broker_load_id: 'BL - 09362',
          origin: 'Roanoke, TX',
          destination: 'Phoenix, AZ',
          origin_time: '17 Oct, 2020 10:23 PM',
          destination_time: '24 Oct, 2020 10:00 AM',
          miles: '$1,100.0 $10,58 per Mile',
          all_in_rate: '$10,58',
          book_now: '$10,58'
        },
        {
          broker_load_id: 'BL - 09362',
          origin: 'Roanoke, TX',
          destination: 'Phoenix, AZ',
          origin_time: '17 Oct, 2020 10:23 PM',
          destination_time: '24 Oct, 2020 10:00 AM',
          miles: '$1,100.0 $10,58 per Mile',
          all_in_rate: '$10,58',
          book_now: '$10,58'
        },
        {
          broker_load_id: 'BL - 09362',
          origin: 'Roanoke, TX',
          destination: 'Phoenix, AZ',
          origin_time: '17 Oct, 2020 10:23 PM',
          destination_time: '24 Oct, 2020 10:00 AM',
          miles: '$1,100.0 $10,58 per Mile',
          all_in_rate: '$10,58',
          book_now: '$10,58'
        },
        {
          broker_load_id: 'BL - 09362',
          origin: 'Roanoke, TX',
          destination: 'Phoenix, AZ',
          origin_time: '17 Oct, 2020 10:23 PM',
          destination_time: '24 Oct, 2020 10:00 AM',
          miles: '$1,100.0 $10,58 per Mile',
          all_in_rate: '$10,58',
          book_now: '$10,58'
        }
      ]
    }
  },
  methods: {
    hideModal1 (): void {
      (this.$refs.modal1 as Vue & { hideModal: () => Function }).hideModal()
    },
    hideModal2 (): void {
      (this.$refs.modal2 as Vue & { hideModal: () => Function }).hideModal()
    },
    openModal1 () {
      // (this.$refs.modal as Vue & { showModal: () => Element }).showModal()
      (this.$refs.modal1 as Vue & { showModal: () => Element }).showModal()
    },
    openModal2 () {
      // (this.$refs.modal as Vue & { showModal: () => Element }).showModal()
      (this.$refs.modal2 as Vue & { showModal: () => Element }).showModal()
    }
  }
})
</script>

<style scoped>

</style>
