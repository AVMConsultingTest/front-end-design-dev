<template>
  <div class="w-full">
    <Drawer ref="drawer" />
    <PageHeader title="Fleet Overview" />
    <div class="row">
      <div class="mb-5">
        <div class="row mx-0">
          <div class="col-auto p-0 pr-2">
            <TabButton
              id="fleetManagement"
              :active="(selectedTab === 10)"
              title="Overview"
              color="green"
              icon="truck"
              :is-default="checkDefault(10)"
              :selectable="true"
              @select-method="setTab(10)"
              @click="select(10)"
            />
          </div>
          <div class="col-auto p-0 pr-2">
            <TabButton
              id="trucks"
              :active="(selectedTab === 0)"
              title="Trucks"
              color="green"
              icon="truck"
              :is-default="checkDefault(0)"
              :selectable="true"
              @select-method="setTab(0)"
              @click="select(0)"
            />
          </div>
          <div class="col-auto  p-0  pr-2">
            <TabButton
              id="trailer"
              :active="(selectedTab === 1)"
              title="Trailers"
              color="green"
              icon="routing-2"
              :is-default="checkDefault(1)"
              :selectable="true"
              @select-method="setTab(1)"
              @click="select(1)"
            />
          </div>
          <div class="col-auto p-0 pr-2">
            <TabButton
              id="permits"
              :active="(selectedTab === 2)"
              title="Permits"
              color="green"
              icon="clipboard-tick"
              :is-default="checkDefault(2)"
              :selectable="true"
              @select-method="setTab(2)"
              @click="select(2)"
            />
          </div>
          <div class="col-auto p-0 pr-2">
            <TabButton
              id="devices"
              :active="(selectedTab === 3)"
              title="Devices"
              color="green"
              icon="monitor-mobbile"
              :is-default="checkDefault(3)"
              :selectable="true"
              @select-method="setTab(3)"
              @click="select(3)"
            />
          </div>
          <div class="col-auto p-0 pr-2">
            <TabButton
              id="services"
              :active="(selectedTab === 4)"
              title="Services"
              color="green"
              icon="support"
              :is-default="checkDefault(4)"
              :selectable="true"
              @select-method="setTab(4)"
              @click="select(4)"
            />
          </div>
          <div class="col-auto p-0 pr-2">
            <TabButton
              id="checkInOut"
              :active="(selectedTab === 5)"
              title="Check In/Out"
              color="green"
              icon="task"
              :is-default="checkDefault(5)"
              :selectable="true"
              @select-method="setTab(5)"
              @click="select(5)"
            />
          </div>
        </div>
      </div>
      <div class="col-12">
        <Table
          v-if="selectedTab!==10"
          :id="tableKey"
          :key="tableKey"
          class="mb-6"
          :title="getTitle"
          :headers="getHeader"
          :data="getTableData"
          :selected-tab="selectedTab"
          :request-function="getRequest"
          :link="getLink"
          :edit-enabled="getEdit"
          :delete-enabled="getDelete"
          :delete-function="getDeleteFunction"
          :search-enabled="true"
          :edit-page="getEditPage"
          :page-count="getPageCount"
          :delete-subtext="getSubtext"
          :actions-as-dropdown="true"
          :download-enabled="true"
          :download-template-enabled="selectedTab === 0 || selectedTab === 1"
          :filtering-model="vFilter"
        >
          <template #item-status="{ item }">
            <Status
              :item="item"
              :active="extendeds.includes(item.id)"
              :item-status="item.status"
              :dropdown-menu="dropdownMenuTruck"
              :dropdown-style="dropdownStyle"
              @extend="extendItemTruck"
              @set-status="setStatusTruck"
            />
          </template>
          <template #item-delivery_status="{ item }">
            <Status
              :item="item"
              :active="extendeds.includes(item.id)"
              :item-status="item.delivery_status"
              :dropdown-menu="dropdownMenuPermit"
              :dropdown-style="dropdownStyle"
              @extend="extendItemPermit"
              @set-status="setStatusPermit"
            />
          </template>
          <template #item-approval_status="{ item }">
            <Status
              :item="item"
              :active="extendeds.includes(item.id)"
              :item-status="item.approval_status"
              :dropdown-menu="dropdownMenuService"
              :dropdown-style="dropdownStyle"
              @extend="extendItemService"
              @set-status="setStatusService"
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
                icon="send-square"
                variant="linear"
                :alpha="400"
                :disable-fill="true"
                color="gray"
                class="w-6 h-6 mr-2"
              />
              <Icon
                icon="sms"
                variant="linear"
                :alpha="400"
                :disable-fill="true"
                color="gray"
                class="w-6 h-6 mr-2"
              />
            </div>
          </template>
          <template #item-check_in_out_id="{ data, index }">
            <div class="flex">
              <div class="col-auto text-dark-blue">
                <span>
                  {{ data[index].check_in_out_id }}
                </span>
              </div>
            </div>
          </template>
          <template #item-binder="{ item }">
            <Badge
              :title="item.binder"
              class=""
              :class="[
                {'bg-green-100 text-green-800' : item.binder === 'Incomplete'},
                {'bg-red-100 text-red-600 w-36' : item.binder === 'Not Provided'},
                {'bg-purple-100 text-purple-800' : item.binder === 'Provided'}
              ]"
              :size="SizeTypeEnum.LG"
            />
          </template>
          <template #item-check_in_out="{ item }">
            <Badge
              :title="item.check_in_out"
              class=""
              :class="[
                {'bg-green-100 text-green-800' : item.check_in_out === 'In'},
                {'bg-orange-100 text-orange' : item.check_in_out === 'Out'}
              ]"
              :size="SizeTypeEnum.LG"
            />
          </template>
          <template #item-ky_permit_current="{ data, index }">
            <div class="flex">
              <div class="col-auto" :class="[{'text-green-900': data[index].ky_permit_current === 'Yes'},{'text-red-900': data[index].ky_permit_current === 'No'}]">
                <span>
                  {{ data[index].ky_permit_current }}
                </span>
              </div>
            </div>
          </template>
          <template #item-nv_permit_current="{ data, index }">
            <div class="flex">
              <div class="col-auto" :class="[{'text-green-900': data[index].nv_permit_current === 'Yes'},{'text-red-900': data[index].nv_permit_current === 'No'}]">
                <span>
                  {{ data[index].nv_permit_current }}
                </span>
              </div>
            </div>
          </template>
          <template #item-nm_permit_current="{ data, index }">
            <div class="flex">
              <div class="col-auto" :class="[{'text-green-900': data[index].nm_permit_current === 'Yes'},{'text-red-900': data[index].nm_permit_current === 'No'}]">
                <span>
                  {{ data[index].nm_permit_current }}
                </span>
              </div>
            </div>
          </template>
          <template #item-or_permit_current="{ data, index }">
            <div class="flex">
              <div class="col-auto" :class="[{'text-green-900': data[index].or_permit_current === 'Yes'},{'text-red-900': data[index].or_permit_current === 'No'}]">
                <span>
                  {{ data[index].or_permit_current }}
                </span>
              </div>
            </div>
          </template>
          <template #item-ct_permit_current="{ data, index }">
            <div class="flex">
              <div class="col-auto" :class="[{'text-green-900': data[index].ct_permit_current === 'Yes'},{'text-red-900': data[index].ct_permit_current === 'No'}]">
                <span>
                  {{ data[index].ct_permit_current }}
                </span>
              </div>
            </div>
          </template>
          <template #item-registration_current="{ data, index }">
            <div class="flex">
              <div class="col-auto" :class="[{'text-green-900': data[index].registration_current === 'Yes'},{'text-red-900': data[index].registration_current === 'No'}]">
                <span>
                  {{ data[index].registration_current }}
                </span>
              </div>
            </div>
          </template>
          <template #item-valid_insurance="{ data, index }">
            <div class="flex">
              <div class="col-auto" :class="[{'text-green-900': data[index].valid_insurance === 'Yes'},{'text-red-900': data[index].valid_insurance === 'No'}]">
                <span>
                  {{ data[index].valid_insurance }}
                </span>
              </div>
            </div>
          </template>
          <template #item-tablet_charger="{ data, index }">
            <div class="flex">
              <div class="col-auto" :class="[{'text-green-900': data[index].tablet_charger === 'Yes'},{'text-red-900': data[index].tablet_charger === 'No'}]">
                <span>
                  {{ data[index].tablet_charger }}
                </span>
              </div>
            </div>
          </template>
          <template #item-fuel_card="{ data, index }">
            <div class="flex">
              <div class="col-auto" :class="[{'text-green-900': data[index].fuel_card === 'Yes'},{'text-red-900': data[index].fuel_card === 'No'}]">
                <span>
                  {{ data[index].fuel_card }}
                </span>
              </div>
            </div>
          </template>
          <template #item-damage="{ data, index }">
            <div class="flex">
              <div class="col-auto" :class="[{'text-green-900': data[index].damage === 'Yes'},{'text-red-900': data[index].damage === 'No'}]">
                <span>
                  {{ data[index].damage }}
                </span>
              </div>
            </div>
          </template>
          <template #item-notes="{item}">
            <NotesEdit
              :item="getNoteItem(item)"

              note-prop-key="notes"

              :edit-function="updateTruck"
            />
          </template>
          <div slot="actions">
            <Modal ref="fileModal" size="sm" position="center">
              <div slot="body" class="row flex items-center justify-center pt-8 pb-2">
                <div class="col-8 items-center justify-center">
                  <h3 class="font-semibold text-center">
                    Bulk Upload
                  </h3>
                </div>
                <div class="col-8 mt-16">
                  <Form fclass="row my-2" @send="hideFileModal">
                    <div class="col-12 mb-6">
                      <div
                        class="!w-52 mx-auto my-0 !bg-white text-black max-w-max m-input flex items-center justify-center cursor-pointer"
                      >
                        <img :src="`/images/excel-icon.png`" alt="pdf-file" class="w-6 h-6 ml-2">
                        <span class="text-c-1 mr-5">Download Template</span>
                      </div>
                      <FileInput class="mt-4" name="document" />
                    </div>
                    <widget :no-shadow="true" :no-border="true">
                      <div class="row">
                        <div class="col-auto">
                          <span class="block text-c-1 font-semibold whitespace-nowrap">
                            Nebula All Truck List.exl
                          </span>
                        </div>
                        <div class="ml-auto col-auto">
                          <Icon icon="trash" variant="variant" color="black" class="w-5 h-5" />
                        </div>
                      </div>
                      <span class="block text-c-1 font-semibold whitespace-nowrap">
                        1.2 mb
                      </span>
                      <div class="row flex justify-center items-center">
                        <div class="col-8 rounded-lg h-2">
                          <div class="h-2 rounded-lg bg-green-500" />
                        </div>
                        <div class="col-2">
                          <span class="block text-c-1 font-semibold whitespace-nowrap">
                            100%
                          </span>
                        </div>
                        <div class="col-2">
                          <Icon
                            icon="tick-circle"
                            color="green"
                            alpha="400"
                            class="w-5 h-5"
                          />
                        </div>
                      </div>
                    </widget>
                    <div class="col-12 mt-12">
                      <Button :type="ButtonTypeEnum.BLACK" :size="SizeTypeEnum.LG" :action="ActionTypeEnum.SUBMIT">
                        Upload
                      </Button>
                      <Button
                        :type="ButtonTypeEnum.LINK"
                        :size="SizeTypeEnum.LG"
                        :action="ActionTypeEnum.BUTTON"
                        @click="hideFileModal()"
                      >
                        Cancel
                      </Button>
                    </div>
                  </Form>
                </div>
              </div>
            </Modal>
            <div class="relative">
              <div
                class="!bg-black !w-14 !border-none m-input flex items-center justify-center cursor-pointer"
                @click="decideTheAddButton"
              >
                <Icon
                  icon="add"
                  color="white"
                  class="w-6 h-6"
                />
              </div>
              <transition name="slide">
                <div v-if="opened" class="z-[8] absolute top-10 rounded-lg bg-white right-0 w-48 shadow-2xl">
                  <ul class="px-4 py-5">
                    <li
                      v-for="(action, index) in decideAddNew"
                      :key="index"
                      class="text-c-1 font-medium text-gray-800 w-full flex justify-center items-center cursor-pointer text-center"
                      :class="{ 'mb-7': index !== decideAddNew.length - 1 }"
                      @click="executeAction(action)"
                    >
                      {{ action.name }}
                    </li>
                  </ul>
                </div>
              </transition>
            </div>
          </div>
        </Table>
      </div>
    </div>
    <div v-if="selectedTab===10">
      <div class="row mb-5">
        <div class="col-6">
          <widget :no-shadow="false" :no-border="true" class="pt-2">
            <div class="px-4 flex items-center justify-between">
              <span class="text-b-3 font-semibold text-gray-800 pb-11">
                Active Devices
              </span>
              <div class="w-40">
                <m-select
                  :multiple="false"
                  :options="rangeOptions"
                  name="reportRange"
                  wrapper-class="!text-c-1"
                />
              </div>
            </div>
            <apexchart height="232" type="bar" :options="barOptions" :series="devicesSummary" />
          </widget>
        </div>
        <div class="col-6">
          <widget :no-shadow="false" :no-border="true" class="h-full">
            <div class="px-4 flex items-center justify-between">
              <span class="text-b-3 font-semibold text-gray-800 pb-11">
                Permits Expiring in 30 Days
              </span>
              <div class="w-40" />
            </div>
            <apexchart height="232" type="donut" :options="donutOptions" :series="expiringPermitsSummary" />
          </widget>
        </div>
      </div>
      <div class="row mb-5 mt-16">
        <div class="w-full flex items-center justify-between">
          <div>
            <span
              class="text-secondary text-b-3 font-medium flex items-center cursor-pointer dark:text-white"
              title="Test"
            >
              Highlighted Metrics
            </span>
          </div>
        </div>
        <div class="col-3 my-5">
          <widget
            :title="`Service Reminders`"
            :no-shadow="true"
            :no-border="true"
          >
            <div class="flex gap-4 items-end">
              <StatTracking
                :stat="vehicleSummary?.service_reminders"
                :increase="true"
                class="pr-4 col-span-2"
                sub-title="Due in 30 Days"
              />
              <StatTracking sub-title="Overdue" :stat="vehicleSummary?.service_reminders_overdue" />
              <div slot="customGoto" class="goto custom group-hover:opacity-100" @click="select(4, '#services')">
                <Icon
                  icon="arrow-right-1"
                  color="white"
                  :alpha="0"
                  class="w-6 h-6"
                />
              </div>
            </div>
          </widget>
        </div>
        <div class="col-3 my-5">
          <widget
            :title="`Inspections`"
            :no-shadow="true"
            :no-border="true"
          >
            <div class="flex gap-4 items-end">
              <StatTracking
                :stat="vehicleSummary?.inspections"
                :increase="true"
                class="pr-4 col-span-2"
                sub-title="Due in 30 Days"
              />
              <StatTracking sub-title="Overdue" :stat="vehicleSummary?.inspections_overdue" />
              <div slot="customGoto" class="goto custom group-hover:opacity-100" @click="select(5, '#inspections')">
                <Icon
                  icon="arrow-right-1"
                  color="white"
                  :alpha="0"
                  class="w-6 h-6"
                />
              </div>
            </div>
          </widget>
        </div>
        <div class="col-3 my-5">
          <widget
            :title="`Trucks`"
            :no-shadow="true"
            :no-border="true"
          >
            <div class="flex gap-4 items-end">
              <StatTracking
                :stat="vehicleSummary?.active_trucks"
                :increase="true"
                class="pr-4 col-span-2"
                sub-title="Active"
              />
              <StatTracking sub-title="In Shop" :stat="vehicleSummary?.in_shop_trucks" />
              <div slot="customGoto" class="goto custom group-hover:opacity-100" @click="select(0, '#trucks')">
                <Icon
                  icon="arrow-right-1"
                  color="white"
                  :alpha="0"
                  class="w-6 h-6"
                />
              </div>
            </div>
          </widget>
        </div>
        <div class="col-3 my-5">
          <widget
            :title="`Trailers`"
            :no-shadow="true"
            :no-border="true"
          >
            <div class="flex gap-4 items-end">
              <StatTracking
                :stat="vehicleSummary?.active_trailers"
                :increase="true"
                class="pr-4 col-span-2"
                sub-title="Active"
              />
              <StatTracking sub-title="In Shop" :stat="vehicleSummary?.in_shop_trailers" />
              <div slot="customGoto" class="goto custom group-hover:opacity-100" @click="select(1, '#trailer')">
                <Icon
                  icon="arrow-right-1"
                  color="white"
                  :alpha="0"
                  class="w-6 h-6"
                />
              </div>
            </div>
          </widget>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { mapActions } from 'vuex'
import moment from 'moment'
import { SizeTypeEnum, ActionTypeEnum, ButtonTypeEnum } from '~/components/ts/enums'
import { DevicesSummary } from '~/models/devices'
import { ExpiringPermitsSummary } from '~/models/expiringPermitsSummary'
import { VehiclesSummary } from '~/models/vehicles'
export default {
  name: 'FleetManagement',
  layout: 'Dashboard',
  data () {
    let self:any
    // eslint-disable-next-line @typescript-eslint/no-this-alias, prefer-const
    self = this
    return {
      vFilter: {},
      SizeTypeEnum,
      ActionTypeEnum,
      ButtonTypeEnum,
      opened: false,
      extendeds: [] as any[],
      dropdownStyle: 'a',
      dropdownMenuTruck: [
        { text: 'Enroute', bg: 'blue' },
        { text: 'Route', bg: 'green' },
        { text: 'InShop', bg: 'orange' },
        { text: 'InTerminal', bg: 'orange' }
      ],
      dropdownMenuPermit: [
        { text: 'Completed', bg: 'green' },
        { text: 'Pending', bg: 'orange' }
      ],
      dropdownMenuService: [
        { text: 'Completed', bg: 'green' },
        { text: 'Pending', bg: 'orange' }
      ],
      generateTruckActions: [
        {
          name: 'Add New Truck',
          click: function () { self.openDrawer() }
        },
        {
          name: 'Bulk Upload',
          click: function () { self.$refs.fileModal.showModal() }
        }
      ],
      generateTrailerActions: [
        {
          name: 'Add New Trailer',
          click: function () { self.openDrawer() }
        },
        {
          name: 'Bulk Upload',
          click: function () { self.$refs.fileModal.showModal() }
        }
      ],
      showModal: false,
      tableKey: 0,
      selectedDrawer: [
        'AddTruckPage',
        'AddTrailerPage',
        'AddPermit',
        'AddDevice',
        'AddService',
        'AddCheckList'
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
          selected: false,
          icon: { name: 'calendar', variant: 'bulk' }
        }
      ],
      barOptions: {
        colors: ['#96E5BE', '#F29E61', '#9278E5', '#4478FF'],
        fill: {
          opacity: 1
        },
        chart: {
          id: 'devices-barchart',
          toolbar: {
            show: false
          },
          animations: {
            enabled: false
          },
          events: {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            dataPointSelection: (event: any, chartContext: any, config: any) => {
              self.selectedTab = 3
              switch (config.dataPointIndex) {
                case 0:
                  self.vFilter.device_type = 'iPass'
                  break
                case 1:
                  self.vFilter.device_type = 'BestPass'
                  break
                case 2:
                  self.vFilter.device_type = 'EZPass'
                  break
                case 3:
                  self.vFilter.device_type = 'ELD'
                  break
                default:
                  break
              }
              console.log(config.dataPointIndex)
            }
          }
        },
        grid: {
          show: true,
          borderColor: '#E0E1E5',
          strokeDashArray: 3
        },
        xaxis: {
          categories: ['iPass', 'BestPass', 'EZPass', 'ELD'],
          position: 'right',
          labels: {
            show: true,
            style: {
              colors: ['#979CB7', '#979CB7', '#979CB7', '#979CB7'],
              fontSize: 15,
              fontFamily: 'Euclid Circular A',
              fontWeight: 400
            }
          },
          axisBorder: {
            show: false
          },
          axisTicks: {
            show: false
          }
        },
        yaxis: {
          tickAmount: 5,
          min: 0,
          max: 100,
          axisTicks: {
            show: false
          },
          labels: {
            style: {
              colors: ['#979CB7'],
              fontSize: 10,
              fontFamily: 'Euclid Circular A',
              fontWeight: 400
            }
          }
        },
        legend: {
          show: false,
          position: 'right',
          fontSize: 12,
          fontFamily: 'Euclid Circular A',
          fontWeight: 400,
          horizontalAlign: 'right',
          markers: {
            width: 6,
            height: 16,
            radius: 9999,
            offsetY: 3,
            offsetX: -13
          },
          labels: {
            colors: ['#92969F']
          },
          itemMargin: {
            horizontal: 24,
            vertical: 12
          }
        },
        dataLabels: {
          textAnchor: 'middle',
          style: {
            fontSize: 15,
            fontFamily: 'Euclid Circular A',
            fontWeight: 600,
            colors: ['#92969F']
          },
          offsetY: -22
        },
        plotOptions: {
          bar: {
            distributed: true,
            borderRadius: 16,
            borderRadiusApplication: 'around',
            dataLabels: {
              position: 'top'
            }
          }
        }
      },
      barSeries: [{
        name: 'Devices',
        data: []
      }],
      donutOptions: {
        radius: 50,
        colors: ['#F6C0C0', '#92BAFB', '#CABDF9', '#ECC095', '#96E5BE'],
        labels: ['IFTA', 'NY', 'OR', 'KY', 'NM'],
        legend: {
          position: 'right',
          fontSize: 15,
          fontFamily: 'Euclid Circular A',
          fontWeight: 400,
          horizontalAlign: 'right',
          markers: {
            width: 6,
            height: 16,
            radius: 9999,
            offsetY: 3,
            offsetX: -13
          },
          labels: {
            colors: ['#92969F']
          },
          itemMargin: {
            horizontal: 24,
            vertical: 8
          }
        },
        chart: {
          animations: {
            enabled: false
          }
        },
        dataLabels: {
          textAnchor: 'middle',
          style: {
            fontSize: 12,
            fontFamily: 'Euclid Circular A',
            fontWeight: 600
          },
          offsetY: 10
        },
        stroke: {
          width: 5
        },
        plotOptions: {
          pie: {
            radius: 50,
            borderRadius: 50,
            expandOnClick: true,
            customScale: 1,
            dataLabels: {
              offset: 0,
              minAngleToShowLabel: 9999
            },
            donut: {
              radius: 50,
              borderRadius: 50,
              size: '85%',
              stroke: {
                width: 6,
                radius: 50,
                borderRadius: 50
              },
              labels: {
                show: true,
                name: {
                  offsetY: 30
                },
                value: {
                  fontSize: '50px',
                  fontFamily: 'Euclid Circular A',
                  fontWeight: 500,
                  offsetY: -8
                },
                total: {
                  show: true,
                  fontSize: '20px',
                  fontFamily: 'Euclid Circular A',
                  fontWeight: 500,
                  color: '#979CB7'
                }
              }
            }
          }
        }
      },
      donutSeries: [3, 2, 4, 5, 1],
      selectedTab: 10,
      truckHeaders: {
        // id: {
        //   label: 'Truck ID',
        //   searchable: true,
        //   sortable: true
        // },
        main_driver_name: {
          label: 'Truck Main Driver',
          searchable: true,
          sortable: true
        },
        co_driver_name: {
          label: 'Truck Co Driver',
          searchable: true,
          sortable: true
        },
        status: {
          label: 'Truck Status',
          searchable: true,
          sortable: true,
          excludeFromLink: true
        },
        brand: {
          label: 'Truck Brand',
          searchable: true,
          sortable: true
        },
        model: {
          label: 'Truck Model',
          searchable: true,
          sortable: true
        },
        color: {
          label: 'Truck Color',
          searchable: true,
          sortable: true
        },
        model_year: {
          label: 'Truck Model Year',
          searchable: true,
          sortable: true
        },
        plate: {
          label: 'Truck Plate',
          searchable: true,
          sortable: true
        },
        unit_number: {
          label: 'Unit Number',
          searchable: true,
          sortable: true
        },
        vin_number: {
          label: 'VIN',
          searchable: true,
          sortable: true
        },
        registration_renewal_date: {
          label: 'Registration Renewal Date',
          searchable: true,
          sortable: true
        },
        annual_inspection_date: {
          label: 'Annual Inspection Due Date',
          searchable: true,
          sortable: true
        },
        preventive_maintenance_date: {
          label: 'Preventative Maintanence Due Date',
          searchable: true,
          sortable: true
        },
        in_service_date: {
          label: 'In SVC Date',
          searchable: true,
          sortable: true
        },
        out_of_service_date: {
          label: 'Out SVC Date',
          searchable: true,
          sortable: true
        },
        acquisition_type: {
          label: 'Ownership Type',
          searchable: true,
          sortable: true
        },
        asset_owner: {
          label: 'Asset Owner',
          searchable: true,
          sortable: true
        },
        notes: {
          label: 'Notes',
          searchable: true,
          sortable: true,
          excludeFromLink: true
        }
      },
      trailerHeaders: {
        // id: {
        //   label: 'Trailer ID',
        //   searchable: true,
        //   sortable: true
        // },
        brand: {
          label: 'Trailer Brand',
          searchable: true,
          sortable: true
        },
        model: {
          label: 'Trailer Model',
          searchable: true,
          sortable: true
        },
        color: {
          label: 'Trailer Color',
          searchable: true,
          sortable: true
        },
        model_year: {
          label: 'Trailer Model Year',
          searchable: true,
          sortable: true
        },
        plate: {
          label: 'Plate Number',
          searchable: true,
          sortable: true
        },
        unit_number: {
          label: 'Unit Number',
          searchable: true,
          sortable: true
        },
        asset_owner: {
          label: 'Asset Owner',
          searchable: true,
          sortable: true
        },
        length: {
          label: 'Trailer Lenght',
          searchable: true,
          sortable: true
        },
        width: {
          label: 'Trailer Width',
          searchable: true,
          sortable: true
        },
        height: {
          label: 'Trailer Height',
          searchable: true,
          sortable: true
        },
        capacity: {
          label: 'Trailer Capaticy',
          searchable: true,
          sortable: true
        },
        vin_number: {
          label: 'VIN',
          searchable: true,
          sortable: true
        },
        registration_renewal_date: {
          label: 'Registration Renewal Date',
          searchable: true,
          sortable: true
        },
        annual_inspection_date: {
          label: 'Annual Inspection Due Date',
          searchable: true,
          sortable: true
        },
        preventive_maintenance_date: {
          label: 'Preventative Maintenance Due Date',
          searchable: true,
          sortable: true
        },
        in_service_date: {
          label: 'IN SVC Date',
          searchable: true,
          sortable: true
        },
        out_of_service_date: {
          label: 'Out SVC Date',
          searchable: true,
          sortable: true
        },
        equipment_type: {
          label: 'Equipment Type',
          searchable: true,
          sortable: true
        },
        equipment_weight: {
          label: 'Equipment Weight',
          searchable: true,
          sortable: true
        }
      },
      permitHeaders: {
        truck_id: {
          label: 'Truck ID',
          searchable: true,
          sortable: true
        },
        type: {
          label: 'Permit Type',
          searchable: true,
          sortable: true
        },
        number: {
          label: 'Permit number',
          searchable: true,
          sortable: true
        },
        duration: {
          label: 'Duration',
          searchable: true,
          sortable: true
        },
        start_date: {
          label: 'Start Date',
          searchable: true,
          sortable: true
        },
        end_date: {
          label: 'End Date',
          searchable: true,
          sortable: true
        },
        purchased_date: {
          label: 'Purchase Date',
          searchable: true,
          sortable: true
        },
        cost: {
          label: 'Cost',
          searchable: true,
          sortable: true
        },
        delivery_status: {
          label: 'Delivery Status',
          searchable: true,
          sortable: true
        },
        vendor_url: {
          label: 'Vendor URL',
          searchable: true,
          sortable: true
        },
        notes: {
          label: 'Notes',
          searchable: true,
          sortable: true
        }
      },
      deviceHeaders: {
        truck_id: {
          label: 'Truck ID',
          searchable: true,
          sortable: true
        },
        type: {
          label: 'Device Type',
          searchable: true,
          sortable: true
        },
        vendor: {
          label: 'Vendor',
          searchable: true,
          sortable: true
        },
        service_start_date: {
          label: 'IN SVC Date',
          searchable: true,
          sortable: true
        },
        service_end_date: {
          label: 'Out SVC Date',
          searchable: true,
          sortable: true
        },
        returned_date: {
          label: 'Returned Device Date',
          searchable: true,
          sortable: true
        },
        notes: {
          label: 'Notes',
          searchable: true,
          sortable: true
        }
      },
      serviceHeaders: {
        driver_id: {
          label: 'Driver ID',
          searchable: true,
          sortable: true
        },
        vendor_id: {
          label: 'vendor ID',
          searchable: true,
          sortable: true
        },
        vehicle_id: {
          label: 'vehicle Id',
          searchable: true,
          sortable: true
        },
        type: {
          label: 'Type',
          searchable: true,
          sortable: true
        },
        vehicle_type: {
          label: 'Vehicle Type',
          searchable: true,
          sortable: true
        },
        vehicle_status: {
          label: 'Vehicle Status',
          searchable: true,
          sortable: true
        },
        dot_inspection_number: {
          label: 'Dot Inspection Number',
          searchable: true,
          sortable: true
        },
        repair_start_date: {
          label: 'Repair Start Date',
          searchable: true,
          sortable: true
        },
        repair_completion_date: {
          label: 'Repair Completion Date',
          searchable: true,
          sortable: true
        },
        repair_description: {
          label: 'Repair Description',
          searchable: true,
          sortable: true
        },
        repair_facility: {
          label: 'Repair Facility',
          searchable: true,
          sortable: true
        },
        notes: {
          label: 'Notes',
          searchable: true,
          sortable: true
        }

      },
      checkInOutHeaders: {
        check_in_out_id: {
          label: 'Check In/Out #',
          searchable: true,
          sortable: true
        },
        unit_number: {
          label: 'Unit Number',
          searchable: true,
          sortable: true
        },
        vin_number: {
          label: 'VIN Number',
          searchable: true,
          sortable: true
        },
        dot_number: {
          label: 'D.O.T Number',
          searchable: true,
          sortable: true
        },
        plate_number: {
          label: 'Plate Number',
          searchable: true,
          sortable: true
        },
        ifta_number: {
          label: 'IFTA Number',
          searchable: true,
          sortable: true
        },
        ny_number: {
          label: 'NY Number',
          searchable: true,
          sortable: true
        },
        binder: {
          label: 'Binder',
          searchable: true,
          sortable: true
        },
        ky_permit_current: {
          label: 'KY Permit Current',
          searchable: true,
          sortable: true
        },
        nv_permit_current: {
          label: 'NV Permit Current',
          searchable: true,
          sortable: true
        },
        nm_permit_current: {
          label: 'NM Permit Current',
          searchable: true,
          sortable: true
        },
        or_permit_current: {
          label: 'OR Permit Current',
          searchable: true,
          sortable: true
        },
        ct_permit_current: {
          label: 'CT Permit Current',
          searchable: true,
          sortable: true
        },
        registration_current: {
          label: 'Registration Current',
          searchable: true,
          sortable: true
        },
        valid_insurance: {
          label: 'Valid Insurance',
          searchable: true,
          sortable: true
        },
        tablet_charger: {
          label: 'Tablet/Charger',
          searchable: true,
          sortable: true
        },
        fuel_card: {
          label: 'Fuel Card',
          searchable: true,
          sortable: true
        },
        mileage: {
          label: 'Mileage',
          searchable: true,
          sortable: true
        },
        damage: {
          label: 'Damage',
          searchable: true,
          sortable: true
        },
        damage_type: {
          label: 'Damage Type',
          searchable: true,
          sortable: true
        },
        main_captain: {
          label: 'Main Captain',
          searchable: true,
          sortable: true
        },
        co_driver: {
          label: 'Co-Driver',
          searchable: true,
          sortable: true
        },
        fleet_rep: {
          label: 'Fleet Rep',
          searchable: true,
          sortable: true
        },
        uploaded_documents: {
          label: 'Uploaded Documents',
          searchable: true,
          sortable: true
        },
        check_in_out: {
          label: 'Check In/Out',
          searchable: true,
          sortable: true
        }
      },
      checkInOutTestData: [
        {
          check_in_out_id: 1234,
          unit_number: 28190,
          vin_number: 1245,
          dot_number: 370,
          plate_number: 'abs-123',
          ifta_number: 2312412,
          ny_number: 424121,
          binder: 'Provided',
          ky_permit_current: 'Yes',
          nv_permit_current: 'Yes',
          nm_permit_current: 'Yes',
          or_permit_current: 'Yes',
          ct_permit_current: 'Yes',
          registration_current: 'Yes',
          valid_insurance: 'Yes',
          tablet_charger: 'Yes',
          fuel_card: 'Yes',
          mileage: 10461,
          damage: 'Yes',
          damage_type: 'Interior',
          main_captain: 'James Smith',
          co_driver: 'Roger Brown',
          fleet_rep: 'John Grey',
          uploaded_documents: '3 Doc',
          check_in_out: 'In'
        },
        {
          check_in_out_id: 1234,
          unit_number: 28190,
          vin_number: 1245,
          dot_number: 370,
          plate_number: 'abs-123',
          ifta_number: 2312412,
          ny_number: 424121,
          binder: 'Incomplete',
          ky_permit_current: 'No',
          nv_permit_current: 'Yes',
          nm_permit_current: 'No',
          or_permit_current: 'Yes',
          ct_permit_current: 'No',
          registration_current: 'Yes',
          valid_insurance: 'Yes',
          tablet_charger: 'No',
          fuel_card: 'Yes',
          mileage: 10461,
          damage: 'Yes',
          damage_type: 'Interior',
          main_captain: 'James Smith',
          co_driver: 'Roger Brown',
          fleet_rep: 'John Grey',
          uploaded_documents: '3 Doc',
          check_in_out: 'Out'
        },
        {
          check_in_out_id: 1234,
          unit_number: 28190,
          vin_number: 1245,
          dot_number: 370,
          plate_number: 'abs-123',
          ifta_number: 2312412,
          ny_number: 424121,
          binder: 'Not Provided',
          ky_permit_current: 'Yes',
          nv_permit_current: 'Yes',
          nm_permit_current: 'No',
          or_permit_current: 'Yes',
          ct_permit_current: 'No',
          registration_current: 'Yes',
          valid_insurance: 'Yes',
          tablet_charger: 'No',
          fuel_card: 'Yes',
          mileage: 10461,
          damage: 'Yes',
          damage_type: 'Interior',
          main_captain: 'James Smith',
          co_driver: 'Roger Brown',
          fleet_rep: 'John Grey',
          uploaded_documents: '3 Doc',
          check_in_out: 'In'
        },
        {
          check_in_out_id: 1234,
          unit_number: 28190,
          vin_number: 1245,
          dot_number: 370,
          plate_number: 'abs-123',
          ifta_number: 2312412,
          ny_number: 424121,
          binder: 'Provided',
          ky_permit_current: 'Yes',
          nv_permit_current: 'Yes',
          nm_permit_current: 'No',
          or_permit_current: 'No',
          ct_permit_current: 'No',
          registration_current: 'Yes',
          valid_insurance: 'Yes',
          tablet_charger: 'No',
          fuel_card: 'No',
          mileage: 10461,
          damage: 'No',
          damage_type: 'Interior',
          main_captain: 'James Smith',
          co_driver: 'Roger Brown',
          fleet_rep: 'John Grey',
          uploaded_documents: '3 Doc',
          check_in_out: 'Out'
        },
        {
          check_in_out_id: 1234,
          unit_number: 28190,
          vin_number: 1245,
          dot_number: 370,
          plate_number: 'abs-123',
          ifta_number: 2312412,
          ny_number: 424121,
          binder: 'Incomplete',
          ky_permit_current: 'No',
          nv_permit_current: 'No',
          nm_permit_current: 'No',
          or_permit_current: 'Yes',
          ct_permit_current: 'No',
          registration_current: 'Yes',
          valid_insurance: 'Yes',
          tablet_charger: 'No',
          fuel_card: 'Yes',
          mileage: 10461,
          damage: 'No',
          damage_type: 'Interior',
          main_captain: 'James Smith',
          co_driver: 'Roger Brown',
          fleet_rep: 'John Grey',
          uploaded_documents: '3 Doc',
          check_in_out: 'Out'
        },
        {
          check_in_out_id: 1234,
          unit_number: 28190,
          vin_number: 1245,
          dot_number: 370,
          plate_number: 'abs-123',
          ifta_number: 2312412,
          ny_number: 424121,
          binder: 'Not Provided',
          ky_permit_current: 'Yes',
          nv_permit_current: 'Yes',
          nm_permit_current: 'No',
          or_permit_current: 'Yes',
          ct_permit_current: 'No',
          registration_current: 'Yes',
          valid_insurance: 'Yes',
          tablet_charger: 'No',
          fuel_card: 'Yes',
          mileage: 10461,
          damage: 'No',
          damage_type: 'Interior',
          main_captain: 'James Smith',
          co_driver: 'Roger Brown',
          fleet_rep: 'John Grey',
          uploaded_documents: '3 Doc',
          check_in_out: 'In'
        },
        {
          check_in_out_id: 1234,
          unit_number: 28190,
          vin_number: 1245,
          dot_number: 370,
          plate_number: 'abs-123',
          ifta_number: 2312412,
          ny_number: 424121,
          binder: 'Provided',
          ky_permit_current: 'No',
          nv_permit_current: 'No',
          nm_permit_current: 'No',
          or_permit_current: 'Yes',
          ct_permit_current: 'No',
          registration_current: 'Yes',
          valid_insurance: 'Yes',
          tablet_charger: 'No',
          fuel_card: 'No',
          mileage: 10461,
          damage: 'No',
          damage_type: 'Interior',
          main_captain: 'James Smith',
          co_driver: 'Roger Brown',
          fleet_rep: 'John Grey',
          uploaded_documents: '3 Doc',
          check_in_out: 'In'
        }
      ]
    }
  },
  computed: {
    decideTheAddButton () {
      if (this.selectedTab === 0) {
        return () => { this.opened = !this.opened }
      } else if (this.selectedTab === 1) {
        return () => { this.opened = !this.opened }
      } else {
        return this.openDrawer
      }
    },
    decideAddNew () {
      if (this.selectedTab === 0) {
        return this.generateTruckActions
      } else if (this.selectedTab === 1) {
        return this.generateTrailerActions
      } else {
        this.opened = false
        return null
      }
    },
    getTitle () {
      switch (this.selectedTab) {
        case 0:
          return 'Truck List'
        case 1:
          return 'Trailers List'
        case 2:
          return 'Permits List'
        case 3:
          return 'Devices List'
        case 4:
          return 'Services Table'
        case 5:
          return 'Check List'
        default:
          return ''
      }
    },
    getSubtext () {
      switch (this.selectedTab) {
        case 0:
          return 'Trucks'
        case 1:
          return 'Trailers'
        case 2:
          return 'Test'
        case 3:
          return 'Devices'
        case 4:
          return 'Services'
        case 5:
          return 'Main Inspections'
        default:
          return ''
      }
    },
    getPageCount () {
      switch (this.selectedTab) {
        case 0:
          return this.truckPageCount
        case 1:
          return this.trailerPageCount
        case 2:
          return this.permitPageCount
        case 3:
          return this.devicePageCount
        case 4:
          return this.servicePageCount
        case 5:
          return 0
        default:
          return 0
      }
    },
    getEdit () {
      switch (this.selectedTab) {
        case 0:
          return false
        case 1:
          return false
        case 2:
          return true
        case 3:
          return true
        case 4:
          return true
        case 5:
          return true
        default:
          return false
      }
    },
    getDelete () {
      switch (this.selectedTab) {
        case 0:
          return false
        case 1:
          return false
        case 2:
          return true
        case 3:
          return true
        case 4:
          return true
        case 5:
          return true
        default:
          return false
      }
    },
    getEditPage () {
      switch (this.selectedTab) {
        case 0:
          return null
        case 1:
          return null
        case 2:
          return 'EditPermit'
        case 3:
          return 'EditDevice'
        case 4:
          return 'EditServices'
        case 5:
          return 'EditCheckList'
        default:
          return null
      }
    },
    getDeleteFunction () {
      switch (this.selectedTab) {
        case 0:
          return () => {}
        case 1:
          return this.removeTrailer
        case 2:
          return this.removePermit
        case 3:
          return this.removeDevice
        case 4:
          return this.removeService
        case 5:
          return this.removeInspection
        default:
          return () => {}
      }
    },
    getHeader () {
      switch (this.selectedTab) {
        case 0:
          return this.truckHeaders
        case 1:
          return this.trailerHeaders
        case 2:
          return this.permitHeaders
        case 3:
          return this.deviceHeaders
        case 4:
          return this.serviceHeaders
        case 5:
          return this.checkInOutHeaders
        default:
          return {}
      }
    },
    expiringPermitsSummary () {
      const data: ExpiringPermitsSummary = this.$store.getters['expiringPermitsSummary/carrierSummary']
      const series = [data?.ifta_permits, data?.ky_permits, data?.nm_permits, data?.ny_permits, data?.or_permits]

      return series
    },
    devicesSummary () {
      const data: DevicesSummary = this.$store.getters['devicesSummary/device']
      const series = [{
        name: 'Devices',
        data: [data?.total_ipass, data?.total_bestpass, data?.total_ezpass, data?.total_eld]
      }]
      return series
    },
    drawerSelection () {
      return this.selectedDrawer[this.selectedTab]
    },
    // vehicleSummary () {
    //   return (this.$store.getters['vehicles/summary'])
    // },
    vehicleSummary (): VehiclesSummary {
      return (this.$store.getters['vehicles/carrierSummary'])
    },
    truckPageCount () {
      return (this.$store.getters['truck/pageCount'])
    },
    trailerPageCount () {
      return (this.$store.getters['trailer/pageCount'])
    },
    permitPageCount () {
      return (this.$store.getters['permits/pageCount'])
    },
    servicePageCount () {
      return (this.$store.getters['services/pageCount'])
    },
    devicePageCount () {
      return (this.$store.getters['devices/pageCount'])
    },
    trucks () {
      console.log('test-truck', this.$store.getters['truck/trucks'])
      if (this.$store.getters['truck/trucks'] !== null &&
       this.$store.getters['truck/trucks'] !== undefined) {
        return this.$store.getters['truck/trucks']
      } else {
        return []
      }
    },
    trailers () {
      if (this.$store.getters['trailer/trailers'] !== null &&
       this.$store.getters['trailer/trailers'] !== undefined) {
        return this.$store.getters['trailer/trailers']
      } else {
        return []
      }
    },
    permits () {
      if (this.$store.getters['permits/permits'] !== null &&
       this.$store.getters['permits/permits'] !== undefined) {
        return this.$store.getters['permits/permits']
      } else {
        return []
      }
    },
    services () {
      if (this.$store.getters['services/services'] !== null &&
       this.$store.getters['services/services'] !== undefined) {
        return this.$store.getters['services/services']
      } else {
        return []
      }
    },
    devices () {
      if (this.$store.getters['devices/devices'] !== null &&
       this.$store.getters['devices/devices'] !== undefined) {
        return this.$store.getters['devices/devices']
      } else {
        return []
      }
    },
    inspections () {
      if (this.$store.getters['inspections/inspections'] !== null && this.$store.getters['inspections/inspections'] !== undefined) {
        return this.$store.getters['inspections/inspections']
      } else {
        return []
      }
    },
    defaultTabs () {
      return { ...this.$store.getters.tabs }
    },
    getRequest () {
      switch (this.selectedTab) {
        case 0:
          return this.getTrucks
        case 1:
          return this.getTrailers
        case 2:
          return this.getPermits
        case 3:
          return this.getDevices
        case 4:
          return this.getServices
        case 5:
          return this.getInspections
        default:
          return null
      }
    },
    getTableData () {
      switch (this.selectedTab) {
        case 0:
          return this.trucks
        case 1:
          return this.trailers
        case 2:
          return this.permits
        case 3:
          return this.devices
        case 4:
          return this.services
        case 5:
          return this.checkInOutTestData
        default:
          return []
      }
    },
    getLink () {
      switch (this.selectedTab) {
        case 0:
          return '/carrier/dashboard/safety-management/truck-profile/'
        case 1:
          return '/carrier/dashboard/safety-management/trailer-profile/'
        default:
          return null
      }
    }
  },
  mounted () {
    this.getExpiringPermitsSummary({ page_number: 1 })
    this.getDeviceSummary(49)
    const queryTab = this.$route.query.tab
    const queryFilter = this.$route.query.filter
    if (queryFilter) {
      if (queryFilter === 'Pending') {
        this.vFilter.approval_status = queryFilter
      } else {
        this.vFilter.status = queryFilter
      }
    }
    if (queryTab) {
      this.selectedTab = parseInt(queryTab)
    } else {
      this.select(this.defaultTabs?.safety.fleet ?? 10)
    }
    // this.getVehiclesSummary(1)
    // this.getTrucks(1)
    // this.getPermitsDetails()
    // this.getServicesDetails()
    // this.getDevicesDetails()
    this.getSummaryByCarrierId({ page_number: 1 })
  },
  methods: {
    decideTheAddButton () {
      if (this.selectedTab === 1) {
        this.opened = !this.opened
      } else {
        this.openDrawer()
      }
    },
    executeAction (action:any) {
      action.click()
      this.opened = false
    },
    extendItemTruck (event:MouseEvent, item: any, menuItem?:string | null): void {
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
    getNoteItem (item: { [x:string] : any }) {
      return {
        ...item,
        hire_date: moment(item.hire_date).toISOString(),
        driver_dob: moment(item.driver_dob).toISOString()
      }
    },
    setStatusTruck (id: number, newStatus: any) {
      const data = this.trucks.slice()
      console.log(id, newStatus)
      const item = data.find((w: any) => w.id === id)
      if (!item) {
        console.error("ID'ye sahip truck bulunamadı.")
        return
      }
      const updatedTruck = {
        ...item,
        status: newStatus
      }
      const truckToSend = { ...updatedTruck }
      if ('primary_driver_id' in truckToSend) {
        delete truckToSend.primary_driver_id
      }
      if ('secondary_driver_id' in truckToSend) {
        delete truckToSend.secondary_driver_id
      }
      if ('main_driver_name' in truckToSend) {
        delete truckToSend.main_driver_name
      }
      if ('co_driver_name' in truckToSend) {
        delete truckToSend.co_driver_name
      }
      this.updateTruck(truckToSend)
    },
    extendItemPermit (event:MouseEvent, item: any, menuItem?:string | null): void {
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
    setStatusPermit (id: number, newStatus: any) {
      const data = this.permits.slice()
      console.log(id, newStatus)
      const item = data.find((w: any) => w.id === id)
      const updatedPermit = {
        ...item,
        delivery_status: newStatus
      }
      const permitToSend = { ...updatedPermit }
      if ('duration' in permitToSend) {
        delete permitToSend.duration
      }
      if ('truck_id' in permitToSend) {
        delete permitToSend.truck_id
      }
      this.updatePermit(permitToSend)
    },
    extendItemService (event:MouseEvent, item: any, menuItem?:string | null): void {
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
    setStatusService (id:number, newStatus:any) {
      const data = this.services.slice()
      console.log(id, newStatus)
      const item = data.find((w:any) => w.id === id)
      this.updateService({
        ...item,
        approval_status: newStatus,
        service_start_date: moment(item.service_start_date).toISOString(),
        service_completion_date: moment(item.service_completion_date).toISOString()
      })
    },
    ...mapActions({
      // getVehiclesSummary: (action, id) => action('vehicles/getSummary', id),
      getSummaryByCarrierId: (action, param) => action('vehicles/getSummaryByCarrierId', param),
      getTrucks: (action, page) => action('truck/getTrucks', page),
      updateTruck: (action, request) => action('truck/updateTruck', request),
      getTrailers: (action, page) => action('trailer/getTrailers', page),
      getPermits: (action, page) => action('permits/getPermits', page),
      updatePermit: (action, request) => action('permits/updatePermit', request),
      getServices: (action, page) => action('services/getServices', page),
      updateService: (action, request) => action('services/updateService', request),
      getDevices: (action, page) => action('devices/getDevices', page),
      getInspections: (action, page) => action('inspections/getInspections', page),
      removePermit: (action, id) => action('permits/removePermit', id),
      removeDevice: (action, id) => action('devices/removeDevice', id),
      removeService: (action, id) => action('services/removeService', id),
      removeInspection: (action, id) => action('inspections/removeInspection', id),
      setDefaultTab: (action, tabs) => action('setDefaultTab', tabs),
      getDeviceSummary: (action, id) => action('devicesSummary/getDevice', id),
      getExpiringPermitsSummary: (action, id) => action('expiringPermitsSummary/getSummaryByCarrierId', id)
    }),
    checkDefault (index: number) {
      return this.defaultTabs.safety?.fleet === index
    },
    setTab (index: number) {
      const newTabs = JSON.parse(JSON.stringify(this.defaultTabs))
      newTabs.safety.fleet = index
      this.setDefaultTab(newTabs)
    },
    getKey () {
      this.tableKey = Math.random()
    },
    log () {
      console.log(this.selectedTab)
    },
    formatDate (date: string) {
      return moment(date).format('MM-DD-yyyy')
    },
    select (index: number, anchor?: keyof HTMLElementTagNameMap | string | null) {
      console.log(index)
      this.vFilter = {}
      this.selectedTab = index
      this.getKey()
      if (anchor) {
        setTimeout(function () {
          (document.querySelector(anchor) as Element).scrollIntoView({ behavior: 'smooth' })
        }, 150)
      }
    },
    drawer (componentName:string) {
      this.$refs.drawer.showDrawer(componentName)
    },
    hideFileModal (): void {
      (this.$refs.fileModal as Vue & { hideModal: () => Function }).hideModal()
    },
    openDrawer (): void {
      this.drawer(this.drawerSelection)
    }

  }
}
</script>

<style src="vue-svg-map/dist/index.css">

</style>
<style>
.svg-map__location {
  stroke: none;
  fill: #EEEFF1;
  transition: all .3s ease-in-out;
}

.svg-map__location.green {
  fill: #BAF1DA;
  stroke: #EEEFF1;
  stroke-width: 2px;
}

.svg-map__location.green:hover {
  fill: #96E5BE;
  /* z-index: 99!important;
  transform: scale(1.05) translate(-25px, -10px);
    filter: drop-shadow(2px 4px 6px rgba(0,0,0,.3)); */
}

.svg-map__location.orange {
  fill: #F2B487;
  stroke: #EEEFF1;
  stroke-width: 2px;
}

.svg-map__location.orange:hover {
  fill: #FC8416;
  /* z-index: 99!important;
  transform: scale(1.05) translate(-25px, -10px);
    filter: drop-shadow(2px 4px 6px rgba(0,0,0,.3)); */
}

.svg-map__location.disabled:hover {
  fill: #EEEFF1 !important;
}

.svg-map__location::before {
  content: 'attr(name)' !important;
  z-index: 9;
  position: absolute;
  top: 50%;
  left: 50%;
  font-size: 12px;
  font-weight: 500;
  text-transform: uppercase;
  transform: translate(-50%, -50%);
}
</style>
