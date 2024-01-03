<template>
  <div class="w-full">
    <Drawer ref="drawer" />
    <PageHeader title="Invoices" />

    <div class="row mb-5 mt-14">
      <div class="col-12 mt-5 mb-6">
        <div class="row mx-0">
          <div v-for="(entit, index) in entities" :key="index" class="col-auto p-0 pr-2">
            <TabButton
              :active="(selectedTab === index)"
              :title="entit.name"
              color="green"
              :icon="entit.icon"
              @click="select(index)"
            />
          </div>
        </div>
      </div>

      <div class="col-12 mb-5">
        <template v-for="(ent, index) in entities">
          <Table
            v-show="(index === selectedTab)"
            v-if="ent.dataSet"
            :key="index"
            :title="ent.title"
            :headers="ent.dataSet?.headers"
            :data="ent.dataSet?.data"
            :search-enabled="true"
            :filter-enabled="true"
            icon="bill"
            icon-color="green"
            icon-alpha="800"
          >
            <template #item-truckID="{ item }">
              <nuxt-link :to="`/carrier/dashboard/safety-management/truck-profile/${item.truckID}`">
                {{ item.truckID }}
              </nuxt-link>
            </template>
            <template #item-edit>
              <div class="flex items-center">
                <Icon
                  icon="edit"
                  variant="linear"
                  :alpha="400"
                  :disable-fill="true"
                  color="gray"
                  class="w-6 h-6 mr-2"
                />
              </div>
            </template>
            <template #item-status="{ item }">
              <Badge
                :icon-color="item.status === 'active' ? 'green' : 'orange'"
                :title="item.status[0].toUpperCase() + item.status.slice(1)"
                :class="[
                  {'bg-green-100 text-green-800' : item.status === 'paids'},
                  {'bg-red-100 text-red-800' : item.status === 'unpaid'},
                  {'bg-green-100 text-green-800' : item.status === 'delivered'},
                  {'bg-green-100 text-green-800' : item.status === 'mailed'},
                  {'bg-green-100 text-green-800' : item.status === 'enrolled'},
                  {'bg-red-100 text-red-800' : item.status === 'undelivered'}
                ]"
                :size="SizeTypeEnum.MD"
              />
            </template>
            <template #item-actions>
              <div class="flex items-center">
                <Icon
                  icon="edit"
                  variant="linear"
                  :alpha="400"
                  :disable-fill="true"
                  color="gray"
                  class="w-6 h-6 mr-2"
                />
                <Icon
                  icon="document-download"
                  variant="linear"
                  :alpha="400"
                  :disable-fill="true"
                  color="gray"
                  class="w-6 h-6 mr-2"
                />
              </div>
            </template>

            <div slot="actions" class="w-full flex items-center justify-end">
              <div class="!w-52 m-input mr-2 flex items-center cursor-pointer">
                <Icon icon="directbox-receive" variant="bulk" color="gray" :alpha="400" class="w-6 h-6 ml-5 mr-2" />
                <span class="text-c-1 mr-5">Download</span>
              </div>
              <div
                class="!bg-black !w-14 !border-none m-input flex items-center justify-center cursor-pointer"
                @click="drawer(entity.component)"
              >
                <Icon icon="add" color="white" class="w-6 h-6" />
              </div>
            </div>
          </Table>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { SizeTypeEnum } from '~/components/ts/enums'
export default {
  layout: 'Dashboard',
  data () {
    return {
      accidentData: [
        {
          driver_name: 'Tom Hanks',
          mvr_score: 9,
          description: 'Accident',
          accident_date: '05/04/2021',
          accident_score: 8,
          location: 'Palm Beach, FL',
          mvr_date: '05/04/2022',
          most_recent_violation: 'Speeding 15+ MPH Over',
          most_recent_violation_date: '05/04/2022'
        }
      ],
      entities: [
        {
          name: 'Invoices',
          icon: 'bill',
          title: 'Invoices',
          dataSet: {
            headers: {
              driver_id: {
                label: 'Driver ID',
                searchable: true
              },
              driver_name: {
                label: 'Driver Name',
                searchable: true
              },
              invoice_id: {
                label: 'Invoice ID',
                searchable: true
              },
              invoice_period: {
                label: 'Invoice Period',
                searchable: true
              },
              due_date: {
                label: 'Due Date',
                searchable: true
              },
              net_pay: {
                label: 'Net Pay'
              },
              invoice_document: {
                label: 'Invoice Document'
              },
              invoice_sent: {
                label: 'Invoice Sent'
              },
              status: {
                label: 'Status',
                searchable: true
              }
            },
            data: [
              {
                driver_id: 'Driver ID 1',
                driver_name: 'Bill Sanders',
                invoice_id: 'Truck 1 ID',
                invoice_period: '09/07/2022 - 09/07/2022',
                due_date: '09/07/2022',
                net_pay: '$3.122',
                invoice_document: 'RateConf.pdf',
                invoice_sent: '09/07/2022',
                status: 'paid'
              }
            ]
          }
        },
        {
          name: 'Mileage Report',
          icon: 'routing',
          title: 'Mileage Report',
          dataSet: {
            headers: {
              driver_id: {
                label: 'Driver ID',
                searchable: true
              },
              driver_name: {
                label: 'Driver Name',
                searchable: true
              },
              truck_id: {
                label: 'Truck ID',
                searchable: true
              },
              mileage_period: {
                label: 'Mileage Period',
                searchable: true
              },
              start_date: {
                label: 'Start Date',
                searchable: true
              },
              end_date: {
                label: 'End Date'
              },
              driver_designation: {
                label: 'Driver Designation'
              },
              mileage: {
                label: 'Mileage'
              },
              deadhead: {
                label: 'Deadhead'
              },
              comments: {
                label: 'Comments',
                searchable: true
              }
            },
            data: [
              {
                driver_id: 'Trailer 1 VIN',
                driver_name: 'Bill Sanders',
                truck_id: 'Truck 1',
                mileage_period: '09/07/2022 - 09/07/2022',
                start_date: '09/07/2022',
                end_date: '09/07/2022',
                driver_designation: '09/07/2022',
                mileage: '600',
                deadhead: '30',
                comments: 'Test'
              },
              {
                driver_id: 'Trailer 1 VIN',
                driver_name: 'Bill Sanders',
                truck_id: 'Truck 1',
                mileage_period: '09/07/2022 - 09/07/2022',
                start_date: '09/07/2022',
                end_date: '09/07/2022',
                driver_designation: '09/07/2022',
                mileage: '300',
                deadhead: '40',
                comments: 'Test'
              }
            ]
          },
          component: 'UploadMileageReport'
        },
        {
          name: 'Fuel Report',
          icon: 'radar',
          title: 'Fuel Report',
          dataSet: {
            headers: {
              driver_id: {
                label: 'Driver ID',
                searchable: true,
                sortable: true
              },
              driver_name: {
                label: 'Driver Name',
                searchable: true
              },
              card_number: {
                label: 'Card Number',
                searchable: true
              },
              invoice_period: {
                label: 'Invoice Period',
                searchable: true
              },
              start_date: {
                label: 'Start Date',
                searchable: true
              },
              end_date: {
                label: 'End Date',
                searchable: true
              },
              full_amount: {
                label: 'Full Amount',
                searchable: true
              },
              merchandise_amount: {
                label: 'Merchandise Amount',
                searchable: true
              },
              cash_advance_amount: {
                label: 'Cash Advance Amount',
                searchable: true
              },
              comments: {
                label: 'Comments',
                searchable: true
              }

            },
            data: [
              {
                driver_id: 'Driver ID 1',
                driver_name: 'Bill Sanders',
                card_number: 'Truck 1',
                invoice_period: '09/07/2022 - 09/07/2022',
                start_date: '09/07/2022',
                end_date: '09/07/2023',
                full_amount: '$3,600',
                merchandise_amount: '$0',
                cash_advance_amount: '$0',
                comments: 'Test'
              },
              {
                driver_id: 'Driver ID 1',
                driver_name: 'Brooklyn Simmons',
                card_number: 'Truck 1',
                invoice_period: '09/07/2022 - 09/07/2022',
                start_date: '09/07/2022',
                end_date: '09/07/2023',
                full_amount: '$3,600',
                merchandise_amount: '$50',
                cash_advance_amount: '$50',
                comments: 'Test'
              }
            ]
          },
          component: 'UploadFullReport'
        },
        {
          name: 'Toll Report',
          icon: 'money-4',
          title: 'Toll Report',
          dataSet: {
            headers: {
              driver_id: {
                label: 'Driver ID',
                searchable: true
              },
              driver_name: {
                label: 'Driver Name',
                searchable: true
              },
              unit_id: {
                label: 'Unit ID',
                searchable: true
              },
              pre_pass_id: {
                label: 'PrePass ID',
                searchable: true
              },
              start_date: {
                label: 'Start Date',
                searchable: true
              },
              end_date: {
                label: 'End Date',
                searchable: true
              },
              total_charges: {
                label: 'Total Charges',
                searchable: true
              },
              comments: {
                label: 'Comments'
              }

            },
            data: [
              {
                driver_id: 'Driver ID 1',
                driver_name: 'Bill Sanders',
                unit_id: 'Unit 1',
                pre_pass_id: 'Pass 1',
                start_date: '09/07/2022.',
                end_date: '09/07/2022',
                total_charges: '$0',
                comments: 'Test'
                // most_recent_violation: 'Speeding 15+ MPH Over',
                // most_recent_violation_date: '05/04/2022'
              }
            ]
          },
          component: 'UploadTollReport'
        }
      ],
      selectedTab: 0,
      SizeTypeEnum
    }
  },
  computed: {
    entity () {
      return {
        ...this.entities[this.selectedTab]
      }
    }
  },

  methods: {
    log () {
      console.log(this.selectedTab)
    },
    select (index) {
      this.selectedTab = index
    },
    drawer (componentName) {
      this.$refs.drawer.showDrawer(componentName)
    }
  }
}
</script>

  <style>
  </style>
