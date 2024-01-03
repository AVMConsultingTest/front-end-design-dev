<template>
  <div class="min-h-screen h-full">
    <div class="transition-all pl-24 pr-28">
      <div
        class="flex flex-col justify-center items-start my-8"
        style="flex: 0.5"
      >
        <h3 class="font-semibold mb-1 mt-4 text-center">
          Add Files
        </h3>
      </div>
      <Form ref="form" fclass="row my-2" @send="handleSubmit">
        <div class="col-6 mb-6">
          <m-select
            v-model="request.driver_id"
            :searchable="true"
            :options="carrierDrivers"
            :addable="true"
            name="driverName"
            type="text"
            label="Driver"
            rules="required"
          />
        </div>
        <div class="col-6 mb-2">
          <m-select
            v-model="request.document_category"
            :bind-text="true"
            :multiple="false"
            :searchable="true"
            :options="testOptionsDocumentCategory"
            :addable="true"
            name="category"
            label="Document Category"
          />
        </div>
        <div class="col-6 mb-2">
          <m-select
            v-model="request.document_type"
            :bind-text="true"
            :multiple="false"
            :searchable="true"
            :options="testOptionsDocumentType"
            :addable="true"
            name="type"
            label="Document Type"
          />
        </div>
        <div class="col-6 mb-2">
          <m-select
            v-model="request.document_status"
            :bind-text="true"
            :searchable="true"
            :options="docStatuses"
            :addable="true"
            name="status"
            label="Document Status"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model="request.document_description"
            name="description"
            type="text"
            label="Document Description"
            rules="required"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model="request.document_location"
            name="location"
            type="text"
            label="Document Location"
            rules="required"
          />
        </div>
        <div class="col-6 mb-6">
          <FileInput label="Document Upload" name="logo" />
        </div>

        <div class="col-6 mb-6">
          <Input
            v-model="request.document_expire_date"
            name="ExpireDate"
            type="datetime-local"
            hint="Please choose a date"
            label="Expire Date"
            rules="required"
          />
        </div>
        <div class="row">
          <div class="col-3 mt-10 ml-auto pt-40">
            <Button
              class="flex"
              :type="ButtonTypeEnum.PRIMARY"
              :size="SizeTypeEnum.LG"
              :action="ActionTypeEnum.BUTTON"
              @click="handleSubmit"
            >
              Save
            </Button>
          </div>
        </div>
      </Form>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
// import { DriverDocument } from '@/models/driver/driverDocuments'
import { mapActions } from 'vuex'
import moment from 'moment'
import { DocumentsDetails } from '@/models/documents/documentsDetails'
import {
  SizeTypeEnum,
  ActionTypeEnum,
  ButtonTypeEnum
} from '@/components/ts/enums'
import { SelectOption } from '@/components/ts/interfaces'
import { Driver } from '~/models/driver'

export default Vue.extend({
  name: 'AddFiles',
  layout: 'Dashboard',
  data () {
    return {
      ButtonTypeEnum,
      ActionTypeEnum,
      SizeTypeEnum,
      showDrawer: false,
      request: {} as DocumentsDetails,
      multiSelectedState: [],
      testOptionsDocumentCategory: [
        { id: 1, text: 'Financial', selected: false },
        { id: 2, text: 'DQ', selected: false },
        { id: 3, text: 'General', selected: false },
        { id: 4, text: 'Policies/Constracts', selected: false },
        { id: 5, text: 'Training', selected: false },
        { id: 6, text: 'Reference', selected: false },
        { id: 7, text: 'Inspections', selected: false },
        { id: 8, text: 'Drug Test', selected: false },
        {
          id: 9,
          text: 'TEST DOCUMENT CATEGORY',
          selected: false
        }
      ] as SelectOption[],
      testOptionsDocumentType: [
        { id: 1, text: 'W9', selected: false },
        { id: 2, text: 'Bank Account Info', selected: false },
        { id: 3, text: 'MVR', selected: false },
        { id: 4, text: 'CDL', selected: false },
        { id: 5, text: 'PSP', selected: false },
        { id: 6, text: 'DQ files types', selected: false },
        { id: 7, text: 'Dot', selected: false },
        { id: 8, text: 'Police', selected: false },
        { id: 9, text: 'TEST DOCUMENT TYPE', selected: false }
      ],
      docStatuses: [
        { id: 1, text: 'Valid', selected: false },
        { id: 2, text: 'Renewed', selected: false },
        { id: 3, text: 'Soon Expiring', selected: false },
        { id: 4, text: 'Pending', selected: false },
        { id: 5, text: 'Expired', selected: false }
      ]
    }
  },
  computed: {
    carrierDrivers (): SelectOption[] {
      const driverOptions: SelectOption[] = []
      this.$store.getters['driver/carrierDrivers'].forEach((driver: Driver) => {
        driverOptions.push({ id: driver.id, text: `${driver.first_name} ${driver.last_name}`, selected: false })
      })
      return driverOptions
    },
    carrierId (): number {
      return this.$store.state.carrierId
    }
  },
  created () {
    this.getDriversByCarrierId({ page_number: 1, id: 1 })
  },
  methods: {
    ...mapActions({
      addDocument: (action, params: Document) => action('documents/addDocument', params),
      getDriversByCarrierId: (action, param) => action('driver/getDriversByCarrierId', param)
    }),
    handleSubmit () :void {
      const rest = {
        carrier_id: this.carrierId,
        document_upload_date: moment().toISOString()
        // document_category: '',
        // updated_date: '2023-01-11T09:00:47.168Z'
        // document_expire_date: '2023-01-11T09:00:47.168Z',
        // document_type: ''
      }
      console.log('Request is....: ' + this.request)
      console.log(this.request.document_expire_date)

      this.addDocument({ ...this.request, ...rest }).then(() => {
        this.$emit('close-drawer')
      })
    }
  }
})
</script>

  <style scoped></style>
