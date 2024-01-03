<template>
  <div class="h-full">
    <div class="pl-24 pr-28">
      <div class="flex-col justify-center items-start mt-16 flex" style="flex: 0.5">
        <h3 class="font-semibold">
          Add New Carrier 1/2       
         </h3>
         <h6 class="font-semibold mt-10 mb-6">
          General Information
         </h6>
      </div>
      <Form fclass="row my-2" @send="handleSubmit">
        <div class="col-6 mb-6">
          <Input
            v-model="request.carrier_name"
            name="carrierName"
            type="text"
            label="Carrier Name"
          />
        </div>
        <div class="col-6 mb-6">
          <m-select
            v-model="request.carrier_status"
            :options="testOptions"
            :bind-text="true"
            :addable="true"
            name="status"
            type="text"
            label="Status"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model="request.carrier_dba_name"
            name="legalName"
            type="text"
            label="Legal Name"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            name="adress"
            type="text"
            label="Address"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model="request.carrier_mc_number"
            name="mcNumber"
            type="text"
            label="MC Number"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model="request.carrier_dot_number"
            name="dotNumber"
            type="text"
            label="DOT Number"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            name="primaryContact"
            type="text"
            label="Primary Contact"
          />
        </div>
        <div class="col-6 mb-6">
          <phone-input
          v-model="request.carrier_dot_number"
            name="phoneNumber"
            label="Contact Phone Number"
            :thin="true"
            rules="required|min:14|max:14"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            name="eMail"
            type="text"
            label="E-mail Address"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            name="scas"
            type="text"
            label="SCAS"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            name="powerUnits"
            type="text"
            label="Power Units"
          />
        </div>
        <StateSelects :city.sync="request.carrier_base_city" :state.sync="request.carrier_base_state" />
        <div class="col-6 mb-6">
          <m-select
          v-model="request.carrier_dot_number"
            :options="connectionStatus"
            :bind-text="true"
            :addable="true"
            name="connectionStatus"
            type="text"
            label="Connection Status"
            rules="required"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            name="margin"
            type="number"
            label="Total $ Margin (Last 12 Mo)"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            name="loadCount"
            type="number"
            label="Total Load Count (Last 12 Mo)"
          />
        </div>
        <div class="col-6">
          <Input
            name="margin"
            type="number"
            label="Total % Margin (Last 12 Mo)"
          />
        </div>
        <h6 class="font-semibold mt-16 mb-6">
          Authority
         </h6>
        <div class="col-6 mb-6">
          <m-select
          v-model="request.carrier_dot_number"
            :options="interstateAuthority"
            :bind-text="true"
            name="interstateAuthority"
            type="text"
            label="Interstate Authority"
            rules="required"
          />
        </div>
        <div class="col-6 mb-6">
          <m-select
          v-model="request.carrier_dot_number"
            :options="commonAuthority"
            :bind-text="true"
            name="commonAuthority"
            type="text"
            label="Common Authority"
            rules="required"
          />
        </div>
        <div class="col-6 mb-6">
          <m-select
          v-model="request.carrier_dot_number"
            :options="contractAuthority"
            :bind-text="true"
            name="contractAuthority"
            type="text"
            label="Contract Authority"
            rules="required"
          />
        </div>
        <div class="col-6 mb-6">
          <m-select
          v-model="request.carrier_dot_number"
            :options="brokerAuthority"
            :bind-text="true"
            name="brokerAuthority"
            type="text"
            label="Broker Authority"
            rules="required"
          />
        </div>
        <div class="row mt-10 justify-between mx-0">
          <div class="col-3">
            <Button
              :type="ButtonTypeEnum.LINK"
              :size="SizeTypeEnum.LG"
              :action="ActionTypeEnum.BUTTON"
              class="!justify-start"
              @click="$emit('close-drawer')"
            >
              Cancel
            </Button>
          </div>
          <div class="col-4 ml-auto">
            <Button
              class="flex"
              :type="ButtonTypeEnum.PRIMARY"
              :size="SizeTypeEnum.LG"
              :action="ActionTypeEnum.SUBMIT"
              @click="$router.push('/broker/dashboard/listening-profile-carriers/add-new-carrier/second-step')"
            >
              Next
            </Button>
          </div>
        </div>
      </Form>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapActions } from 'vuex'
import { SelectOption } from '~/components/ts/interfaces'
import {
  SizeTypeEnum,
  ActionTypeEnum,
  ButtonTypeEnum
} from '~/components/ts/enums'
import { CarriersDetails } from '~/models/Broker/carriersDetails/carriersDetails'
export default Vue.extend({
  name: 'AddNewCarrier',
  data () {
    return {
      ButtonTypeEnum,
      ActionTypeEnum,
      SizeTypeEnum,
      request: {} as CarriersDetails,
      testOptions: [
        { id: 1, text: 'Active', selected: false },
        { id: 2, text: 'Pending', selected: false },
        { id: 3, text: 'Review', selected: false },
        { id: 4, text: 'Rejected', selected: false }
      ] as SelectOption[],
      activeOptions: [
        { id: 1, text: 'Yes', selected: false },
        { id: 2, text: 'No', selected: false }
      ] as SelectOption[],
      paymentTerms: [
        { id: 1, text: 'Quick Pay', selected: false },
        { id: 2, text: 'Net 7', selected: false },
        { id: 3, text: 'Net 30', selected: false }
      ] as SelectOption[],
      paymentMethod: [
        { id: 1, text: 'ACH', selected: false },
        { id: 2, text: 'Paper check', selected: false }
      ] as SelectOption[],
      connectionStatus: [
        { id: 1, text: 'Nebula Customer', selected: false },
        { id: 2, text: 'Nebula User', selected: false },
        { id: 3, text: 'External', selected: false }
      ] as SelectOption[],
      interstateAuthority: [
        { id: 1, text: 'Active', selected: false },
        { id: 2, text: 'Inactive', selected: false }
      ] as SelectOption[],
      commonAuthority: [
        { id: 1, text: 'Active', selected: false },
        { id: 2, text: 'Inactive', selected: false }
      ] as SelectOption[],
      contractAuthority: [
        { id: 1, text: 'Active', selected: false },
        { id: 2, text: 'Inactive', selected: false }
      ] as SelectOption[],
      brokerAuthority: [
        { id: 1, text: 'Active', selected: false },
        { id: 2, text: 'Inactive', selected: false }
      ] as SelectOption[],
    }
  },
  computed: {
    brokerId (): number {
      return this.$store.state.brokerId
    }
  },
  methods: {
    ...mapActions({
      addCarrier: (action, param) => action('Broker/carriersDetails/addCarrier', param)
    }),
    handleSubmit () {
      this.addCarrier({
        ...this.request,
        broker_id: this.brokerId
      })
      this.$emit('close-drawer')
    }
  }
})
</script>
