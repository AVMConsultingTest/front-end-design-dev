<template>
    <div class="h-full">
      <div class="pl-24 pr-28">
        <div class="flex-col justify-center items-start mt-16 flex" style="flex: 0.5">
          <h3 class="font-semibold">
            Add New Carrier 2/2       
           </h3>
           <h6 class="font-semibold mt-10 mb-6">
            Safety
           </h6>
        </div>
        <Form fclass="row my-2" @send="handleSubmit">
          <div class="col-6 mb-6">
            <Input
              v-model="request.carrier_name"
              name="carrierScore"
              type="text"
              label="Carrier Score"
            />
          </div>
          <div class="col-6 mb-6">
            <Input
              v-model="request.carrier_dba_name"
              name="unsafeDriving"
              type="text"
              label="Unsafe Driving"
            />
          </div>
          <div class="col-6 mb-6">
            <Input
              name="hosCompliance"
              type="text"
              label="HOS Compliance"
            />
          </div>
          <div class="col-6 mb-6">
            <Input
              v-model="request.carrier_mc_number"
              name="controlledSubstance"
              type="text"
              label="Controlled Substance"
            />
          </div>
          <div class="col-6 mb-6">
            <Input
              v-model="request.carrier_dot_number"
              name="driverFitness"
              type="text"
              label="Driver Fitness"
            />
          </div>
          <div class="col-6 mb-6">
            <Input
              name="vehicleMaintenance"
              type="text"
              label="Vehicle Maintenance"
            />
          </div>
          <div class="col-6 mb-6">
            <Input
              name="hmCompliance"
              type="text"
              label="HM Compliance"
            />
          </div>
          <h6 class="font-semibold mt-16 mb-6">
            Insurance - Auto Liability
           </h6>
           <div class="col-6 mb-6">
            <Input
              name="expirationDate"
              type="date"
              label="Expiration Date"
            />
          </div>
          <div class="col-6 mb-6">
            <Input
              name="coverageLimit"
              type="text"
              label="Coverage Limit"
            />
          </div>
          <div class="col-6 mb-6">
            <Input
              name="insuranceCompanyName"
              type="text"
              label="Insurance Company Name"
            />
          </div>
          <div class="col-6 mb-6">
            <Input
              name="policy"
              type="text"
              label="Policy #"
            />
          </div>
          <div class="col-6 mb-6">
            <phone-input
            v-model="request.carrier_dot_number"
            name="phoneNumber"
            label="Phone Number"
            :thin="true"
            rules="required|min:14|max:14"
            />
          </div>
          <div class="col-6 mb-6">
            <phone-input
            v-model="request.carrier_dot_number"
            name="faxNumber"
            label="Fax Number"
            :thin="true"
            rules="required|min:14|max:14"
            />
          </div>
          <h6 class="font-semibold mt-16 mb-6">
            Insurance - Cargo Insurance
           </h6>
           <div class="col-6 mb-6">
            <Input
              name="expirationDate"
              type="date"
              label="Expiration Date"
            />
          </div>
          <div class="col-6 mb-6">
            <Input
              name="coverageLimit"
              type="text"
              label="Coverage Limit"
            />
          </div>
          <div class="col-6 mb-6">
            <Input
              name="reeferBreakdown"
              type="text"
              label="Reefer Breakdown"
            />
          </div>
          <div class="col-6 mb-6">
            <Input
              name="reeferBreakdownDeductable"
              type="text"
              label="Reefer Breakdown Deductable"
            />
          </div>
          <div class="col-6 mb-6">
            <Input
              name="insuranceCompanyName"
              type="text"
              label="Insurance Company Name"
            />
          </div>
          <div class="col-6 mb-6">
            <Input
              name="policy"
              type="text"
              label="Policy #"
            />
          </div>
          <div class="col-6 mb-6">
            <phone-input
              v-model="request.carrier_dot_number"
              name="phoneNumber"
              label="Phone Number"
              :thin="true"
              rules="required|min:14|max:14"
              />
          </div>
          <div class="col-6 mb-6">
            <phone-input
              v-model="request.carrier_dot_number"
              name="faxNumber"
              label="Fax Number"
              :thin="true"
              rules="required|min:14|max:14"
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
  import { mapActions } from 'vuex'
  import { SelectOption } from '~/components/ts/interfaces'
  import {
    SizeTypeEnum,
    ActionTypeEnum,
    ButtonTypeEnum
  } from '~/components/ts/enums'
  import { CarriersDetails } from '~/models/Broker/carriersDetails/carriersDetails'
  export default Vue.extend({
    name: 'AddNewCarrierTwo',
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
  