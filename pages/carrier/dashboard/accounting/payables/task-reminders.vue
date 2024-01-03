<template>
  <div class="w-full">
    <Drawer ref="drawer" />
    <PageHeader title="Task & Reminders" class="mb-10" :no-actions="true" @goback="$router.go(-1)" />
    <div class="row hidden">
      <div class="col-12 mt-5 mb-6">
        <div class="row mx-0">
          <div class="col-auto p-0 pr-2">
            <TabButton
              :active="(selectedTab === 0)"
              title="Tasks"
              color="green"
              icon="task-square"
              @click="(selectedTab = 0)"
            />
          </div>
          <div class="col-auto  p-0  pr-2b">
            <TabButton
              :active="(selectedTab === 1)"
              title="Reminders"
              color="green"
              icon="task"
              @click="(selectedTab = 1)"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="row mb-5">
      <div class="col-12">
        <Table
          v-if="selectedTab == 0"
          title="Tasks"
          icon="task-square"
          variant="linear"
          :disable-fill="true"
          icon-color="orange"
          :icon-alpha="800"
          :icon-rounded="true"
          :search-enabled="true"
          :headers="headers"
          :filtering-model="vfilter"
          :data="tasks"
          :delete-enabled="true"
          :delete-function="removeTask"
          :edit-enabled="true"
          edit-page="EditTask"
          :request-function="getTasks"
          :page-count="tasksPageCount"
        >
          <template #item-task_status="{ item }">
            <Status
              :item="item"
              :active="extendeds.includes(item.id)"
              :item-status="item.task_status"
              :dropdown-menu="dropdownMenu"
              :dropdown-style="dropdownStyle"
              @extend="extendItem"
              @set-status="setStatus"
            />
          </template>
          <template #item-email_address="{ item }">
            <span class="text-dark-blue"> {{ item.email_address }}</span>
          </template>
          <template #item-reminder_date="{ item }">
            <span class="text-orange-700"> {{ item.reminder_date }}</span>
          </template>
          <template #custom-filter>
            <div class="flex flex-wrap p-6">
              <div
                v-for="(filter, index) in filterModels"
                v-if="filter.tabShown === selectedTab"
                :key="index"
                :class="`col-${filter.colSpan} px-1 mb-2`"
              >
                <Input
                  v-if="filter.inputType === 'input' || filter.inputType === 'date'"
                  v-model="vfilter[filter.modelName]"
                  :name="filter.modelName"
                  :type="filter.inputType === 'input' ? 'text' : 'date'"
                  :placeholder="filter.filterName"
                  :debounce-timer="1000"
                />
                <m-select
                  v-else
                  v-model="vfilter[filter.modelName]"
                  :options="filter.options"
                  :name="filter.filterName"
                  :horizontal="filter.multiple !== undefined && filter.multiple"
                  :placeholder="filter.filterName"
                  :bind-text="true"
                  :is-nullable="true"
                />
              </div>
            </div>
          </template>
          <template #item-actions>
            <div class="flex items-center cursor-pointer">
              <Icon
                icon="more-square"
                :alpha="100"
                :disable-fill="false"
                color="grey-dark"
                class="w-6 h-6 mr-2"
              />
            </div>
          </template>
          <template #custom-actions>
            <div class="flex items-center cursor-pointer ml-auto col-auto mr-6">
              <Button
                :type="ButtonTypeEnum.PRIMARY"
                :size="SizeTypeEnum.SM"
                :action="ActionTypeEnum.BUTTON"
                class="!h-12 !w-[7.5rem]"
                @click="drawer('CreateTask')"
              >
                New Task
              </Button>
            </div>
          </template>
        </Table>
        <Table
          v-if="selectedTab == 1"
          title="Reminders"
          icon="task-square"
          variant="linear"
          :disable-fill="true"
          icon-color="green"
          :icon-alpha="800"
          :icon-rounded="true"
          :search-enabled="true"
          :headers="headers"
          :data="testData"
          :filter-enabled="true"
        >
          <template #item-email_address="{ item }">
            <span class="text-dark-blue"> {{ item.email_address }}</span>
          </template>
          <template #item-reminder_date="{ item }">
            <span class="text-dark-blue"> {{ item.reminder_date }}</span>
          </template>
          <template #item-actions>
            <div class="flex items-center cursor-pointer">
              <Icon
                icon="more-square"
                :alpha="400"
                :disable-fill="false"
                color="gray"
                class="w-6 h-6 mr-2"
              />
            </div>
          </template>
        </Table>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapActions } from 'vuex'
import moment from 'moment'
import { SizeTypeEnum, ButtonTypeEnum, ActionTypeEnum } from '@/components/ts/enums'
import { SelectOption } from '~/components/ts/interfaces'
import { TaskDetails } from '~/models/accounting/taskDetails/taskDetails'
export default Vue.extend({
  name: 'TaskReminders',
  layout: 'Dashboard',
  data () {
    return {
      SizeTypeEnum,
      ButtonTypeEnum,
      ActionTypeEnum,
      selectedTab: 0,
      extendeds: [] as any[],
      dropdownStyle: 'a',
      dropdownMenu: [
        { text: 'Received', bg: 'green' },
        { text: 'Pending', bg: 'orange' }
      ],
      rangeOptions: [
        {
          id: 'Monthly',
          text: 'Monthly',
          selected: true,
          icon: { name: 'calendar', variant: 'bulk' }
        },
        {
          id: 'Yearly',
          text: 'Yearly',
          selected: false
        }
      ] as SelectOption[],
      headers: {
        id: {
          label: 'Task ID',
          searchable: true,
          sortable: true
        },
        task_description: {
          label: 'Task Description',
          searchable: true,
          sortable: true
        },
        assigned_to:
          {
            label: 'Assigned To',
            searchable: true,
            sortable: true
          },
        phone_number:
          {
            label: 'Phone',
            searchable: true,
            sortable: true
          },
        email_address:
          {
            label: 'E-mail',
            searchable: true,
            sortable: true
          },
        social_media:
        {
          label: 'Social Media',
          searchable: true,
          sortable: true
        },
        due_date:
          {
            label: 'Due Date',
            searchable: true,
            sortable: true
          },
        task_status:
          {
            label: 'Status',
            searchable: true,
            sortable: true
          },
        reminder_date:
          {
            label: 'Reminder',
            searchable: true,
            sortable: true
          }
        // actions: {
        //   label: 'Action',
        //   sticky: true
        // }
      },
      testData: [
        {
          id: 'Task ID 1',
          task_description: 'Call Vendor',
          assigned_to: 'Bill Sanders',
          phone_number: '555-555-1234',
          email_address: 'billsander@gmail.com',
          social_media: 'SM Handle',
          due_date: '09/07/2022',
          task_status: 'Completed',
          reminder_date: '09/07/2022'
        },
        {
          id: 'Task ID 2',
          task_description: 'Call Vendor',
          assigned_to: 'Bill Sanders',
          phone_number: '555-555-1234',
          email_address: 'billsander@gmail.com',
          social_media: 'SM Handle',
          due_date: '09/07/2022',
          task_status: 'Started',
          reminder_date: '09/07/2022'
        },
        {
          id: 'Task ID 3',
          task_description: 'Call Vendor',
          assigned_to: 'Bill Sanders',
          phone_number: '555-555-1234',
          email_address: 'billsander@gmail.com',
          social_media: 'SM Handle',
          due_date: '09/07/2022',
          task_status: 'Cancelled',
          reminder_date: '09/07/2022'
        },
        {
          id: 'Task ID 4',
          task_description: 'Call Vendor',
          assigned_to: 'Bill Sanders',
          phone_number: '555-555-1234',
          email_address: 'billsander@gmail.com',
          social_media: 'SM Handle',
          due_date: '09/07/2022',
          task_status: 'Completed',
          reminder_date: '09/07/2022'

        },
        {
          id: 'Task ID 5',
          task_description: 'Call Vendor',
          assigned_to: 'Bill Sanders',
          phone_number: '555-555-1234',
          email_address: 'billsander@gmail.com',
          social_media: 'SM Handle',
          due_date: '09/07/2022',
          task_status: 'Not Started',
          reminder_date: '09/07/2022'

        },
        {
          id: 'Task ID 6',
          task_description: 'Call Vendor',
          assigned_to: 'Bill Sanders',
          phone_number: '555-555-1234',
          email_address: 'billsander@gmail.com',
          social_media: 'SM Handle',
          due_date: '09/07/2022',
          task_status: 'Completed',
          reminder_date: '09/07/2022'

        },
        {
          id: 'Task ID 7',
          task_description: 'Call Vendor',
          assigned_to: 'Bill Sanders',
          phone_number: '555-555-1234',
          email_address: 'billsander@gmail.com',
          social_media: 'SM Handle',
          due_date: '09/07/2022',
          task_status: 'Completed',
          reminder_date: '09/07/2022'
        }
      ],
      vfilter: {} as { [key: string]: unknown },
      filterModels: [
        {
          modelName: 'assigned_to',
          filterName: 'Assigned To',
          inputType: 'input',
          colSpan: 2,
          multiple: true,
          tabShown: 0,
          options: [
            { id: 1, text: 'Tabbatha Sawford' },
            { id: 2, text: 'Queenie McHale' },
            { id: 3, text: 'Giralda Kilfoyle' }
          ]
        },
        {
          modelName: 'phone_number',
          filterName: 'Phone',
          inputType: 'input',
          colSpan: 3,
          multiple: true,
          tabShown: 0,
          options: [
            { id: 1, text: 'Driving' }
          ]
        },
        {
          modelName: 'social_media',
          filterName: 'Social Media',
          inputType: 'select',
          colSpan: 3,
          multiple: true,
          tabShown: 0,
          options: [
            { id: 1, text: 'Twitter' },
            { id: 2, text: 'Facebook' },
            { id: 3, text: 'Instagram' }
          ]
        },
        {
          modelName: 'task_status',
          filterName: 'Status',
          inputType: 'select',
          colSpan: 2,
          multiple: true,
          tabShown: 0,
          options: [
            { id: 1, text: 'Pending' },
            { id: 2, text: 'Received' }
          ]
        }
      ]
    }
  },
  computed: {
    task (): TaskDetails {
      return (this.$store.getters['accounting/taskDetails/task'])
    },
    tasks (): TaskDetails[] {
      return (this.$store.getters['accounting/taskDetails/tasks'])
    },
    tasksPageCount (): Number {
      return (this.$store.getters['accounting/taskDetails/pageCount'])
    }
  },
  methods: {
    ...mapActions({
      getTask: (action, id) => action('accounting/taskDetails/getTask', id),
      getTasks: (action, page) => action('accounting/taskDetails/getTasks', page),
      updateTask: (action, request) => action('accounting/taskDetails/updateTask', request),
      removeTask: (action, page) => action('accounting/taskDetails/removeTask', page)
    }),
    drawer (drawerName: string) {
      (this.$refs.drawer as Vue & { showDrawer: (component: String, routeUrl?: String) => Element }).showDrawer(drawerName)
    },
    extendItem (event:MouseEvent, item: any, menuItem?:string | null): void {
      if (menuItem) { item.impact = menuItem }

      if (this.extendeds.includes(item.id)) {
        this.extendeds = this.extendeds.filter((a: any) => {
          return a !== item.id
        })
      } else {
        this.extendeds.push(item.id)
        const { clientX, clientY } = event
        this.dropdownStyle = {
          top: `${clientY + 20}px`,
          left: `${clientX - 100}px`
        }
      }
    },
    setStatus (id:number, newStatus:any) {
      const data = this.tasks.slice()
      console.log(id, newStatus)
      const item = data.find((w:any) => w.id === id)
      this.updateTask({
        ...item,
        task_status: newStatus,
        due_date: moment(item.due_date).toISOString(),
        reminder_date: moment(item.reminder_date).toISOString()
      })
    },
    formatDate (date: string) {
      return moment(date).format('MM-DD-yyyy')
    }
  }
})
</script>

<style scoped>

</style>
