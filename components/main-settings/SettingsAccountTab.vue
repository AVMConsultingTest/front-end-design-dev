<template>
  <div class="mt-9 pr-[5.525rem]">
    <div class="row justify-between mb-6 col-12">
      <div class="col-3">
        <h3 class="text-b-4 desc-title">
          Contact Information
        </h3>
        <h6 class="text-gray-400 desc-font">
          Update your contact information
        </h6>
      </div>
      <div class="col-8 settings-background-form row mb-6">
        <Form class="my-2">
          <div class="row">
            <div class="col-6 mb-6">
              <Input 
                name="Title" 
                label="Title" 
              />
            </div>
            <div class="col-6 mb-6">
              <Input 
                name="FullName" 
                label="Full Name" 
              />
            </div>
          </div>
          <div class="row">
            <div class="col-6 mb-6">
              <Input 
                type="mail" 
                label="E-mail Address" 
              />
            </div>
            <div class="col-6 mb-6">
              <phone-input
                label="Phone Number"
                name="phoneNumber"
                :thin="true"
                minlength="14"
                maxlength="14"
                rules="required|min:14|max:14"
              />
            </div>
          </div>
          <div class="row">
            <div class="col-6 mb-6">
              <phone-input
                label="Fax Number"
                name="faxNumber"
                :thin="true"
                minlength="14"
                maxlength="14"
                rules="min:14|max:14"
              />
            </div>
          </div>
          <div class="row">
            <div class="col-2 border-grey-blue-100 pl-4">
              <div v-for="(driver, index) in drivers" :key="index" class="pt-6">
                <div class="flex justify-center">
                  <img
                    :src="driver.img"
                    class="w-16 h-16 min-w-16 min-h-16 max-h-16 max-w-16 object-contain"
                  >
                </div>
              </div>
            </div>
            <div class="col-10 mb-6">
              <FileInput label="Document Upload" name="logo" />
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
          User Information
        </h3>
        <h6 class="text-gray-400 desc-font">
          Update your photo and personal details.
        </h6>
      </div>
      <div class="col-8 settings-background-form row">
        <Form class="my-2">
          <div class="row">
            <div class="mb-6 col-6">
              <Input name="Username" label="Username" />
            </div>
            <div class="col-6">
              <m-select
                :multiple="false"
                :searchable="true"
                name="AccessLevel"
                type="text"
                label="Access Level"
                rules="required"
                :options="userOptions"
                :addable="true"
              />
            </div>
          </div>
          <div class="row">
            <div class="col-6 mb-6">
              <m-select
                :multiple="false"
                :searchable="true"
                name="JobProfile"
                type="text"
                label="Job Profile"
                rules="required"
                :options="roleOptions"
                :addable="true"
              />
            </div>
            <div class="col-6 mb-6">
              <m-select
                :multiple="false"
                :searchable="true"
                name="PartyAccess"
                type="text"
                label="3rd Party Access"
                rules="required"
                :options="jobOptions"
                :addable="true"
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
          Address Information
        </h3>
        <h6 class="text-gray-400 desc-font">
          Update your address information
        </h6>
      </div>
      <div class="col-8 settings-background-form row">
        <Form class="my-2">
          <div class="row">
            <div class="mb-6 col-12">
              <Input name="AddressName" label="Address Name" />
            </div>
          </div>
          <div class="row mb-6">
            <div class="col-6">
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
            <div class="col-6">
              <m-select
                :multiple="false"
                :searchable="true"
                name="State"
                type="text"
                label="State"
                rules="required"
                :options="stateOptions"
              />
            </div>
          </div>

          <div class="row">
            <div class="col-12 mb-6">
              <Input name="Address" label="Address" />
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
          Password
        </h3>
        <h6 class="text-gray-400 desc-font">
          Please enter your current password to change your password.
          <br>
          <br>
          Password Rules:
          <ul style="padding-left: 16px;" class="desc-list">
            <li>Password must be at least 8 characters long.</li>
            <li>Password must contain a number Password must contain an upper case letter.</li>
            <li>Password must contain a lower case letter.</li>
            <li>
              Password cannot include the word password
            </li>
            <li>
              Password must not contain your username, first name, last name, company name, or email.
            </li>
            <li>A previously used password is not allowed.</li>
          </ul>
        </h6>
      </div>
      <div class="col-8 settings-background-form row">
        <Form class="my-2">
          <div class="row">
            <div class="mb-6 col-12">
              <Input
                name="CurrentPassword"
                label="Current Password"
                rules="required"
                :type="showPasswordType"
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
          </div>
          <div class="row mb-6">
            <div class="col-12">
              <Input
                name="NewPassword"
                label="New Password"
                rules="required"
                :type="showPasswordType"
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
          </div>

          <div class="row">
            <div class="col-12 mb-6">
              <Input
                name="ConfirmNewPassword"
                label="Confirm New Password"
                rules="required"
                :type="showPasswordType"
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
          </div>
          <div class="divider" />
          <div class="row mt-10 justify-between mx-0">
            <div class="col-4 ml-auto flex justify-end p-0">
              <Button class="max-w-max p-4">
                Update Password
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
  name: 'SettingsAccountTab',
  data () {
    return {
      activeTab: 1,
      ButtonTypeEnum,
      ActionTypeEnum,
      SizeTypeEnum,
      showPasswordType: 'password',
      testOptions: [
        { id: 1, text: 'Truck', selected: true }
      ] as SelectOption[],
      paymentOptions: [
        { id: 1, text: 'Test', selected: true }
      ] as SelectOption[],
      userOptions: [
        { id: 1, text: 'user 1', selected: true },
        { id: 2, text: 'user 2', selected: true },
        { id: 3, text: 'user 3', selected: true }
      ] as SelectOption[],
      roleOptions: [
        { id: 1, text: 'Admin', selected: true },
        { id: 2, text: 'Driver', selected: true },
        { id: 3, text: 'Client', selected: true }
      ] as SelectOption[],
      jobOptions: [
        { id: 1, text: 'Enable', selected: true },
        { id: 2, text: 'Disable', selected: true }
      ] as SelectOption[],
      countryOptions: [
        { id: 1, text: 'United States', selected: true },
        { id: 2, text: 'United Kingdom', selected: true },
        { id: 3, text: 'Germany', selected: true }
      ] as SelectOption[],
      stateOptions: [
        { id: 1, text: 'Chicago', selected: true },
        { id: 2, text: 'New York', selected: true },
        { id: 3, text: 'London', selected: true }
      ] as SelectOption[],
      drivers: [
        {
          img: '/images/Ellipse_49.png'
        }
      ]
    }
  },
  methods: {
    handleSubmit () {
      this.$router.push('')
    },
    showPassword () {
      console.log('shw pw')
      this.showPasswordType = this.showPasswordType === 'password' ? 'text' : 'password'
    }
  }
})
</script>
<style>
.tab-menu-active-color:active{
  background-color: #E4F4F9;
}
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
</style>
