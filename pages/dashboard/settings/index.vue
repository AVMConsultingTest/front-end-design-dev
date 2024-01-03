<template>
  <div class="px-12">
    <PageHeader title="Settings" @search="() => {}" />
    <TabManager :tab-names="tabNames" color="blue">
      <template #my_account>
        <SettingsAccountTab />
      </template>
      <template #company>
        <SettingsCompanyTab />
      </template>
      <template #manage_user>
        <SettingsUsersTab />
      </template>
      <template #roles>
        <SettingsAdminTab />
      </template>
      <template #teams>
        <SettingsTeamsTab />
      </template>
      <template #billing>
        <SettingsBilling />
      </template>
    </TabManager>
    <div class="row justify-between mb-6 col-12 mt-16">
      <div class="col-12 border-b border-gray-200 pb-5 flex justify-between">
        <div class="">
          <h4 class="logged-in-title block">
            Where you’re logged in
          </h4>
          <h6 class="logged-in-desc block">
            We’ll alert you via olivia@untitledui.com if there is any unusual activity on your account.
          </h6>
        </div>
        <Icon
          icon="more-2"
          class="dots-icon rotate-90"
        />
      </div>

      <div class="row mb-4 col-12 tester mt-5 logged-device !px-4 border-b-[1px]">
        <div class="col-auto flex py-2 flex-row-reverse">
          <Icon
            icon="monitor-05"
            color="gray"
            :disable-fill="true"
            variant="outline"
            :alpha="0"
            class="w-5 h-5 p-0"
          />
        </div>
        <div class="flex flex-col col-10 pb-4 ">
          <div class="ml-10" />
          <h6 class="logged-in-desc-light col-auto flex gap-5 items-center mb-2">
            2018 Macbook Pro 15-inch
            <Badge
              icon-color="green"
              title="• Active now"
              class="border border-green-800 text-green-800 "
              size="sm"
            />
          </h6>

          <div class="ml-10" />
          <h6 class="logged-in-desc-light col-10">
            Melbourne, Australia • 22 Jan at 10:40am
          </h6>
        </div>
      </div>
      <div class="row mb-4 col-12 tester mt-5 logged-device !px-4  border-b-[1px]">
        <div class="col-auto flex py-2 flex-row-reverse">
          <Icon
            icon="monitor-05"
            color="gray"
            :disable-fill="true"
            variant="outline"
            :alpha="0"
            class="w-5 h-5 p-0"
          />
        </div>
        <div class="flex flex-col col-10 pb-4">
          <div class="ml-10" />
          <h6 class="text-sm flex col-10  mb-2">
            2018 Macbook Pro 15-inch
          </h6>
          <div class="ml-10" />
          <h6 class="text-sm col-10">
            Melbourne, Australia • 22 Jan at 10:40am
          </h6>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import SettingsBilling from './-billing.vue'
import SettingsAdminTab from './-roles.vue'
import SettingsAccountTab from '~/components/main-settings/SettingsAccountTab.vue'
import SettingsUsersTab from '~/components/main-settings/SettingsUsersTab.vue'
import SettingsTeamsTab from '~/components/main-settings/SettingsTeamsTab.vue'
import SettingsCompanyTab from '~/components/main-settings/SettingsCompanyTab.vue'

export default Vue.extend({
  name: 'TransactionsOperationalStep',
  components: {
    SettingsAccountTab,
    SettingsUsersTab,
    SettingsAdminTab,
    SettingsTeamsTab,
    SettingsBilling,
    SettingsCompanyTab
  },
  layout: 'Dashboard',
  transition: 'page-left',
  data () {
    return {
      tabNames: ['My Account', 'Company', 'Manage User', 'Roles', 'Teams', 'Billing']
    }
  }
})
</script>

<style>
</style>
