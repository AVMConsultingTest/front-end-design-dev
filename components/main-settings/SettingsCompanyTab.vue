<template>
  <div id="settings-tab" class="h-full mt-9 pr-[5.525rem]">
    <div class="row justify-between mb-6 col-12">
      <div class="col-4">
        <h3 class="text-b-4 desc-title">
          Company Information
        </h3>
        <h6 class="text-gray-400 desc-font">
          Update your photo and personal details.
        </h6>
      </div>
      <div class="col-8 settings-background-form row mb-6">
        <Form class="my-2">
          <div class="row">
            <div class="col-12 mb-6">
              <Input name="CompanyName" label="Company Name" />
            </div>
          </div>
          <div class="row">
            <div class="col-12 mb-6">
              <m-select
                :multiple="false"
                :searchable="true"
                name="CompanyType"
                type="text"
                label="Company Type"
                rules="required"
                :options="companyOptions"
              />
            </div>
          </div>
          <div class="row">
            <div class="col-3 border-grey-blue-100 px-4">
              <div v-for="(driver, index) in drivers" :key="index" class="pt-6">
                <div class="flex justify-center">
                  <img
                    :src="driver.img"
                    class="w-20 h-20 min-w-20 min-h-20 max-h-20 max-w-20 mr-4"
                  >
                </div>
              </div>
            </div>
            <div class="col-9 mb-6">
              <FileInput label="" name="logo" />
            </div>
          </div>
          <div class="divider" />
          <div class="row mt-5 justify-between mx-0">
            <div class="col-4 ml-auto flex justify-end p-0">
              <Button class="max-w-max p-4">
                Save Changes
              </Button>
            </div>
          </div>
        </Form>
      </div>
    </div>
    <div class="row justify-between mb-6 col-12">
      <div class="col-3">
        <h3 class="text-b-4 desc-title">
          Company Account Information
        </h3>
        <h6 class="text-gray-400 desc-font">
          Update your photo and personal details.
        </h6>
      </div>
      <div class="col-8 settings-background-form row mb-6">
        <Form class="my-2">
          <div class="row">
            <div class="col-6 mb-6">
              <Input name="AccountNumber" label="Account Number" />
            </div>
            <div class="col-6 mb-6">
              <Input name="RoutingNumber" label="Routing Number" />
            </div>
          </div>
          <div class="row">
            <div class="col-6 mb-6">
              <Input
                name="EmployerId"
                label="Employer ID Number (EIN)"
              />
            </div>
            <div class="col-6 mb-6">
              <Input
                name="MotorCarrierNumber"
                label="Motor Carrier Number (MC)"
              />
            </div>
          </div>
          <div class="row">
            <div class="col-6 mb-6">
              <Input
                name="usNumber"
                label="US DOT Number"
              />
            </div>
          </div>
          <div class="divider" />
          <div class="row mt-5 justify-between mx-0">
            <div class="col-4 ml-auto flex justify-end p-0">
              <Button class="max-w-max p-4">
                Save Changes
              </Button>
            </div>
          </div>
        </Form>
      </div>
    </div>
    <div class="row justify-between mb-6 col-12">
      <div class="col-3">
        <h3 class="text-b-4 desc-title">
          Location Information
        </h3>
        <h6 class="text-gray-400 desc-font">
          Update your portfolio and bio.
        </h6>
      </div>
      <div class="col-8 settings-background-form row">
        <Form class="my-2">
          <div class="row">
            <div class="mb-6 col-6">
              <m-select
                :multiple="false"
                :searchable="true"
                name="Country"
                type="text"
                label="Country"
                rules="required"
                :options="countryOptions"
              />
            </div>
            <StateSelects :city.sync="request.city" :state.sync="request.state" />
            <div class="col-6 mb-6">
              <Input name="Zip Code" label="Zip Code" />
            </div>
          </div>
          <div class="row">
          </div>
          <div class="row">
            <div class="col-6 mb-6">
              <Input type="mail" name="companyMail" label="Company E-mail Address">
                <template slot="addonLeft">
                  <Icon
                    icon="search-normal"
                    color="#3C4049"
                    :alpha="0"
                    class="w-5 h-5 ml-4 mr-2"
                    :disable-fill="true"
                  />
                </template>
              </Input>
            </div>

            <phone-input
              v-model="stop.phoneNumber"
              name="phoneNumber"
              class="col-6 mb-6"
              label="Contact Phone Number"
              :thin="true"
              rules="required|min:14|max:14"
            />
          </div>
          <div class="row">
            <m-select
              class="col-6 mb-6"
              :multiple="false"
              :searchable="true"
              name="Timezone"
              type="text"
              label="Timezone"
              rules="required"
              :options="timeOptions"
            />
            <div class="col-6 mb-6">
              <Input type="text" name="website" label="Website" />
            </div>
          </div>
          <div class="row">
            <Input
              class="border-b-[1px] pb-4"
              type="text"
              name="Adress"
              label="Address"
            />
          </div>
          <div class="divider" />
          <div class="row mt-4 justify-between mx-0">
            <div class="col-4 ml-auto flex justify-end p-0">
              <Button class="max-w-max p-4">
                Save Changes
              </Button>
            </div>
          </div>
        </Form>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { SelectOption } from '~/components/ts/interfaces'
import { SizeTypeEnum, ActionTypeEnum, ButtonTypeEnum } from '~/components/ts/enums'
export default Vue.extend({
  name: 'SettingsCompanyTab',
  transition: 'page-left',
  data () {
    return {
      ButtonTypeEnum,
      ActionTypeEnum,
      SizeTypeEnum,
      showPasswordType: 'password',
      request: {
        city: '',
        state: ''
      },
      cityOptions: [
          { id: 1, text: 'Melbourne', selected: true },
          { id: 2, text: 'Sydney', selected: true },
          { id: 3, text: 'Townsville', selected: true }
      ] as SelectOption[],
      stateOptions: [
          { id: 1, text: 'South Australia', selected: true },
          { id: 2, text: 'North Australia', selected: true }
      ] as SelectOption[],
      companyOptions: [
          { id: 1, text: 'Logistics', selected: true },
          { id: 2, text: 'First Party Logistics', selected: true },
          { id: 3, text: 'Second Party Logistics', selected: true }
      ] as SelectOption[],
      timeOptions: [
          { id: 1, text: 'UTC 03:00', selected: true },
          { id: 2, text: 'UTC 06:00', selected: true },
          { id: 3, text: 'UTC 04:00', selected: true }
      ] as SelectOption[],
      countryOptions: [
          { id: 1, text: 'United States', selected: true },
          { id: 2, text: 'United Kingdom', selected: true },
          { id: 3, text: 'Australia', selected: true }
      ] as SelectOption[],
      drivers: [
        {
          img: '/images/Ellipse_49.png'
        }
      ],
      stop: {
        phoneNumber: ''
      }
    }
  },
  methods: {

  }
})
</script>
  <style>
  .settings-background-form {
    /* Auto layout */
    padding: 24px;
    gap: 24px;

    /* Base/White */
    background: #ffffff;
    border: 1px solid #E0E1E5;
    border-radius: 12px;
    /* Inside auto layout */

    flex: none;
    order: 0;
    align-self: stretch;
    flex-grow: 0;
  }
  .desc-font{
    font-size: 12px;
    line-height: 16px;
    font-weight: 400;
  }
  .desc-list{
    list-style-type: square;
    padding-left: 12px;
  }
  .desc-title{
    font-size: 14px;
    line-height: 24px;
    font-weight: 600;
  }
  .divider{
    background: #EAECF0;
    flex: none;
    order: 0;
    align-self: stretch;
    flex-grow: 0;
    height: 1px;
  }
  .logged-in-title{
    font-size: 18px;
    font-weight: 600;
    line-height: 28px;
  }
  .logged-in-desc{
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
  }
  .logged-in-desc-light{
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
  }
  .dots-icon{
    width: 20px;
    height: 20px;
    margin-right: 2rem;
  }
  .space-between-devices{
    display: flex;
    justify-content: space-between;
  }
  .logged-device{
    padding-left: 4rem;
  }
  </style>
