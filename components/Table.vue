<template>
  <div class="w-full">
    <Drawer ref="drawer" :edit-id="editId" />
    <div class="table-container" :class="[{'!border-0': listMode }, tableContainerClasses]">
      <div v-if="showHeader" class="table-header">
        <div v-if="!$slots.header" class="title flex items-center">
          <div
            v-if="icon"
            :class="`bg-${iconColor}-100 p-2 rounded-${iconRounded === true ? 'full' : '2xl'} mr-4 bg-${iconBg}-100`"
          >
            <Icon :icon="icon" :color="iconColor" :alpha="iconAlpha" :variant="iconVariant" class="w-8 h-8" />
          </div>
          <div class="flex flex-col">
            <span class="text-b-1 font-semibold">{{ title }}</span>
            <span v-if="subtitle" class="text-b-4 text-grey-dark-100">{{
              subtitle
            }}</span>
          </div>
        </div>
        <slot name="header" />
        <div v-if="$slots.actions || searchEnabled || downloadEnabled" class="actions flex items-center first:justify-start">
          <Input
            v-if="searchEnabled"
            v-model="searchTerm"
            name="search"
            class="mr-2 w-full"
            type="text"
            @on-input="search"
          >
            <template slot="addonLeft">
              <Icon
                icon="search-normal"
                variant="linear"
                color="gray"
                :alpha="400"
                class="w-5 h-5 ml-4"
                :disable-fill="true"
              />
            </template>
          </Input>
          <div
            v-if="requestReportEnabled"
            class="relative mr-2"
          >
            <Button
              v-click-outside="() => { opened = false }"
              :type="ButtonTypeEnum.PRIMARY"
              :size="SizeTypeEnum.LG"
              :action="ActionTypeEnum.BUTTON"
              class="text-c-1 !w-40 !h-12 !bg-black"
              @click="() => { opened = !opened }"
            >
              Request Report
            </Button>
            <transition name="slide">
              <div v-if="opened" class="z-10 absolute top-12 rounded-lg bg-white left-0 right-0 w-40 shadow-2xl">
                <ul class="px-4 py-5">
                  <li
                    v-for="(action, index) in generateActions"
                    :key="index"
                    class="text-c-1 font-medium text-gray-800 w-full flex justify-center items-center cursor-pointer text-center"
                    :class="[
                      { 'mb-7' : index !== generateActions.length - 1}
                    ]"
                  >
                    {{ action }}
                  </li>
                </ul>
              </div>
            </transition>
          </div>
          <div v-if="downloadTemplateEnabled" class="mx-2">
            <vue-excel-xlsx
              :data="[{}]"
              :columns="headerArr"
              :file-name="title !== null && title !== undefined ? `${title.toLowerCase().replace(' ', '_')}_template` : 'table_template'"
              file-type="xlsx"
              :sheet-name="title !== null && title !== undefined ? `${title.toLowerCase().replace(' ', '_')}_template` : 'table_template'"
            >
              <div
                v-if="downloadTemplateEnabled"
                class="!w-52 mx-auto my-0 !bg-white text-black max-w-max m-input flex items-center justify-center cursor-pointer"
              >
                <img :src="`/images/excel-icon.png`" alt="pdf-file" class="w-6 h-6 ml-2">
                <span class="text-c-1 mr-5">Download Template</span>
              </div>
            </vue-excel-xlsx>
          </div>
          <div v-if="downloadEnabled === true">
            <template
              v-if="downloadFormat === 'csv'"
            >
              <VueJsonToCsv
                :json-data="data"
                :labels="headerObj"
                :csv-title="title !== null && title !== undefined ? `${title.toLowerCase().replace(' ', '_')}` : 'table'"
              >
                <div
                  v-if="downloadEnabled"
                  class="!w-52 !bg-black text-white max-w-max m-input mr-2 flex items-center cursor-pointer"
                >
                  <Icon icon="directbox-receive" variant="variant" color="white" :alpha="400" class="w-6 h-6 ml-5 mr-2" />
                  <span class="text-c-1 mr-5">Download</span>
                </div>
              </VueJsonToCsv>
            </template>
            <template
              v-else-if="downloadFormat === 'xlsx' || downloadFormat === 'xls'"
            >
              <vue-excel-xlsx
                :data="data"
                :columns="headerArr"
                :file-name="title !== null && title !== undefined ? `${title.toLowerCase().replace(' ', '_')}` : 'table'"
                :file-type="downloadFormat"
                :sheet-name="title !== null && title !== undefined ? `${title.toLowerCase().replace(' ', '_')}` : 'table'"
              >
                <div
                  v-if="downloadEnabled"
                  class="!w-52 !bg-black text-white max-w-max m-input mr-2 flex items-center cursor-pointer"
                >
                  <Icon icon="directbox-receive" variant="variant" color="white" :alpha="400" class="w-6 h-6 ml-5 mr-2" />
                  <span class="text-c-1 mr-5">Download</span>
                </div>
              </vue-excel-xlsx>
            </template>
          </div>

          <slot name="actions" />
        </div>
      </div>
      <div v-if="filterEnabled" class="table-filters flex flex-wrap p-6 border-t border-grey-blue-100">
        <span class="col-12 mb-2 px-1 text-c-1 font-medium text-grey-dark-200">Filter By</span>
        <div v-for="(key, index) in Object.keys(dataValues)" :key="index" class="col-2 px-1 mb-2">
          <m-select
            v-model="filterModel[key].value"
            :multiple="false"
            :searchable="false"
            :options="dataValues[key]"
            :name="headers[key].label"
            :placeholder="headers[key].label"
            :bind-text="true"
            :is-nullable="true"
          />
        </div>
        <div class="col-2 mb-2 px-1">
          <Button
            class="h-12 border border-gray-300"
            :type="ButtonTypeEnum.LINK"
            :size="SizeTypeEnum.MD"
            :action="ActionTypeEnum.BUTTON"
            @click="clearAll()"
          >
            <Icon
              slot="icon"
              icon="close-circle"
              color="gray"
              variant="outline"
              :alpha="400"
              class="w-5 h-5 ml-3"
            />
            Clear All
          </Button>
        </div>
      </div>
      <div class="w-full flex justify-between border-t">
        <div class="col-10">
          <slot name="custom-filter" />
        </div>
        <slot name="custom-actions" />
      </div>

      <div class="table-content w-full overflow-x-auto relative" :class="contentStyle">
        <table class="w-full table-auto" :class="tableClasses">
          <thead>
            <tr :class="[{'!border-0': listMode }]">
              <th v-if="multipleEnabled" class="px-1">
                <check-box
                  v-model="headCheckBox"
                  :value="headCheckBox"
                  @change="onHeadCheckboxChange()"
                />
              </th>
              <th
                v-for="(header, i) in Object.keys(headers)"
                :key="i"
                class="text-b-4 group"
                :class="[{ 'sticky right-0  bg-[#fcfcfc] drop-shadow-2xl min-w-[9rem] text-center': headers[header].sticky }]"
              >
                <div
                  class="heade flex items-center justify-left group-first:!justify-start"
                  :class="[{ 'cursor-pointer': headers[header].sortable }, { 'justify-center': headers[header].sticky }]"
                  @click="() => (headers[header].sortable ? sortData(header) : true)"
                >
                  <span v-if="headers[header].icon">
                    <span v-if="headers[header].sortable">
                      <Icon :icon="headers[header].icon" color="grey-dark" :alpha="200" variant="bulk" class="w-5 h-5 mr-2" />
                    </span>
                  </span>
                  <span>
                    {{ headers[header].label || header }}
                  </span>
                  <span v-if="headers[header].sortable">
                    <Icon v-if="sorteds === header + '+asc'" icon="arrow-up-3" color="gray" class="w-3 h-3 ml-2" />
                    <Icon v-else-if="sorteds === header + '+desc'" icon="arrow-down" color="gray" class="w-3 h-3 ml-2" />
                    <Icon v-else icon="arrow-3" color="gray" class="w-3 h-3 ml-2" />
                  </span>
                </div>
              </th>
              <th v-if="editEnabled || deleteEnabled || viewEnabled">
                <div class="heade flex items-center justify-end text-b-4">
                  <span>Action</span>
                </div>
              </th>
            </tr>
          </thead>
          <tbody v-if="fetchCompleted">
            <template v-for="(item, i) of pagedData">
              <tr
                v-if="true"
                :id="`${i}${tableKey}`"
                :key="`${i}${tableKey}`"
                class="text-b-4 transition-all hover:bg-gray-50 cursor-pointer group"
                :class="[{'!border-0': listMode }]"
                :data-link="item.link"
                @click="
                  () => {
                    link &&
                      !Object.values(headers).some((h) => h.excludeFromLink) &&
                      !(addEnabled || editEnabled || deleteEnabled || uploadEnabled || smsEnabled || viewEnabled)
                      ? $router.push({ path: `${link}${item.id}`, query: dynamicLinkQueries.length > 0 ? linkQuery(item) : undefined })
                      : (extendEnabled
                        ? extendItem(item)
                        : true);
                  }
                "
              >
                <td v-if="multipleEnabled">
                  <check-box v-model="item.isSelected" class="flex justify-center" :value="item.isSelected" />
                </td>
                <td
                  v-for="(td, j) of slotsProceced"
                  :key="i + '-' + j"
                  class="px-6 text-start"
                  :class="[
                    { 'sticky right-0 bg-[#fcfcfc] text-center drop-shadow-2xl !p-0 flex justify-center': headers[td.key]?.sticky },
                    { 'py-1 !px-0': listMode },
                  ]"
                  @click="link &&
                    Object.values(headers).some((h) => h.excludeFromLink) &&
                    headers[td.key]?.excludeFromLink !== true
                    ? $router.push({ path: `${link}${item.id}`, query: dynamicLinkQueries.length > 0 ? linkQuery(item) : undefined }) : null"
                >
                  <div
                    class="h-16 inline-flex items-center"
                    :class="[
                      { 'rounded-r-lg': slotsProceced.length === j+1 && listMode },
                      { 'rounded-l-lg': j === 0 && listMode },
                      { 'td-inner px-6 w-full bg-white': listMode },
                      tdContainerClasses,
                    ]"
                  >
                    <slot
                      v-if="td.hasSlot"
                      :name="td.slotName"
                      :item="item"
                      :extended="(extendEnabled ? extendedItems.includes(item) : undefined)"
                      :data="pagedData"
                      :index="i"
                    />
                    <span v-else class="!overflow-visible truncate max-w-[40rem]">{{ item[td.key] }}</span>
                  </div>
                </td>
                <TableActions
                  :add-enabled="addEnabled"
                  :edit-enabled="editEnabled"
                  :delete-enabled="deleteEnabled"
                  :upload-enabled="uploadEnabled"
                  :sms-enabled="smsEnabled"
                  :view-enabled="viewEnabled"
                  :actions-as-dropdown="actionsAsDropdown"
                  @add="drawer(addPage)"
                  @edit="fillEditId(item.id)"
                  @delete="fillDeleteId(item.id)"
                  @upload="uploadFunction"
                  @sms="smsFunction"
                />
              </tr>
              <transition v-if="true" :key="i" name="table" class="overflow-hidden">
                <tr v-if="extendEnabled && extendedItems.includes(item)">
                  <td class="w-100" :colspan="Object.keys(headers).length">
                    <slot name="extended-area" :item="item" :data="pagedData" />
                  </td>
                </tr>
              </transition>
            </template>
          </tbody>
          <tbody v-else>
            <tr v-for="(loader, index) in loaderArr" :key="index">
              <td class="h-[67px]" />
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div v-if="pageCount > 1" class="row my-5 justify-center items-center">
      <div class="pagination col-auto">
        <div class="row justify-between">
          <div
            :title="hasPrevPage ? `Go to page ${currentPage - 1}` : ''"
            class="prev"
            :class="[
              {
                'cursor-pointer hover:bg-gray-800 hover:text-white':
                  hasPrevPage,
              },
              { 'text-grey-dark-100 bg-grey-blue-200': !hasPrevPage },
            ]"
            @click="() => (hasPrevPage ? (changePage(currentPage - 1)) : true)"
          >
            <i class="fa-solid fa-chevron-left" />
          </div>
          <div
            v-for="(pnumber, index) in pageRanges"
            :key="index"
            class="page-number"
            :class="[
              {
                'bg-gray-800 text-white font-semibold ': pnumber === currentPage,
              },
            ]"
            :alt="pageRanges[index + 1]"
            @click="() => {
              pnumber === '...' ? changePage(pageRanges[index - 1]+1) : changePage(pnumber)
            }"
          >
            {{ pnumber }}
          </div>
          <div
            :title="hasNextPage ? `Go to page ${currentPage + 1}` : ''"
            class="next"
            :class="[
              {
                'cursor-pointer hover:bg-gray-800 hover:text-white':
                  hasNextPage,
              },
              { 'text-grey-dark-100 bg-grey-blue-200': !hasNextPage },
            ]"
            @click="() => (hasNextPage ? (changePage(currentPage + 1)) : true)"
          >
            <i class="fa-solid fa-chevron-right" />
          </div>
        </div>
      </div>
    </div>
    <DeleteModal ref="modal" :delete-id="deleteId" :delete-function="deleteFunction" :delete-subtext="deleteSubtext" />
  </div>
</template>

<script lang="ts">
import Vue, { PropType, reactive, Ref, ref } from 'vue'
import { PropOptions } from 'vue/types/umd'
import { SelectOption } from './ts/interfaces'
import TableActions from './TableActions.vue'
import { GetPayload } from '@/models/common/GetPayload'
import {
  SizeTypeEnum,
  ActionTypeEnum,
  ButtonTypeEnum
} from '~/components/ts/enums'

interface CustomFilter {
  header: String;
  value: Array<String | Number | Boolean | SelectOption | Date>;
}

type IFormat = 'xlsx' | 'xls' | 'csv'

export default Vue.extend({
  components: { TableActions },
  props: {
    // Shows the table header on the left side of the table
    // (e.g. true)
    leftHeader: {
      type: Boolean,
      default: false
    },
    // Sets the title that is going to be show above table
    // (e.g. 'Users')
    title: {
      type: String,
      default: null
    },
    // Sets the subtitle that is going to be show above table and below title
    // (e.g. 'List of users')
    subtitle: {
      type: String,
      default: null
    },
    // Sets the subtext that is going to be shown on the delete modal
    // (e.g. 'Are you sure you want to delete this user?')
    deleteSubtext: {
      type: String,
      default: ''
    },
    // Sets the hint that is going to be shown besides the title
    // (e.g. 'This is a list of users')
    hint: {
      type: String,
      default: null
    },
    // Sets the icon that is going to be shown on the left side of the title
    // (e.g. 'user')
    icon: {
      type: String,
      default: null
    },
    // Sets the color of the icon
    // (e.g. 'red')
    iconColor: {
      type: String,
      default: null
    },
    // Sets the alpha value of the icon
    // (e.g. 700)
    iconAlpha: {
      type: Number,
      default: 500
    },
    // Sets icons variant
    // (e.g. 'bulk')
    iconVariant: {
      type: String,
      default: 'outline'
    },
    // Displays the icon in a rounded background
    // (e.g. true)
    iconRounded: {
      type: Boolean,
      default: false
    },
    // Sets the background color of the icon
    // (e.g. 'red')
    iconBg: {
      type: String,
      default: null
    },
    // Header of the table
    // (e.g. { name: 'Name', key: 'name', sortable: true, filterable: true })
    headers: {
      type: Object,
      required: true
    },
    // Data of the table
    // (e.g. [{ name: 'John Doe', email: 'john.doe@email.com' }])
    data: {
      type: Array,
      required: true
    },
    // The link that is going to be used to redirect the user when clicking on a row
    // (e.g. '/users/:id')
    // id is going to be replaced by the id of the row
    link: {
      type: String,
      default: ''
    },
    // Class that is going to be applied to the table
    // (e.g. 'w-1/2')
    tableClasses: {
      type: String,
      default: ''
    },
    // Class that is going to be applied to the td container
    // (e.g. 'w-1/2')
    tdContainerClasses: {
      type: String,
      default: ''
    },
    // Class that is going to be applied to the table container
    // (e.g. 'w-1/2')
    tableContainerClasses: {
      type: String,
      default: ''
    },
    // Sets how many items are going to be shown per page
    // (e.g. 10)
    page_size: {
      type: Number,
      default: 12
    },
    // Tracks which tab is selected
    // (e.g. 0)
    // deprecated
    selectedTab: {
      type: Number,
      default: 0
    },
    // Enables search in table data
    // (e.g. true)
    searchEnabled: {
      type: Boolean,
      default: false
    },
    // Enables downloading table data and headers as an excel file
    // (e.g. true)
    downloadEnabled: {
      type: Boolean,
      default: false
    },
    // Enables downloading table headers as excel file
    // (e.g. true)
    downloadTemplateEnabled: {
      type: Boolean,
      default: false
    },
    // Enables requesting report modal
    // (e.g. true)
    requestReportEnabled: {
      type: Boolean,
      default: false
    },
    // Sets the format of the excel file
    // (e.g. 'xlsx')
    // Possible values: 'xlsx', 'xls', 'csv'
    downloadFormat: {
      type: String as PropType<IFormat>,
      default () {
        return 'xlsx'
      }
    },
    // Enables filtering in table data
    // shows all the table headers as filters
    // (e.g. true)
    // it is depracted, use filteringModel instead
    filterEnabled: {
      type: Boolean,
      default: false
    },
    // Enables extending in table rows
    // (e.g. true)
    extendEnabled: {
      type: Boolean,
      default: false
    },
    // Enables selecting in table rows
    // (e.g. true)
    multipleEnabled: {
      type: Boolean,
      default: false
    },
    // Shows the header of the table
    // (e.g. true)
    showHeader: {
      type: Boolean,
      default: true
    },
    // Request function to get data
    // (e.g. () => { return axios.get('/users') })
    // The function must return a promise
    // Mapped store actions are also accepted
    requestFunction: {
      type: Function,
      default: null
    },
    // Shows the table in a list mode
    // (e.g. true)
    listMode: {
      type: Boolean,
      default: false
    },
    // Custom filters object for the table
    // (e.g. [{ name: 'Name', key: 'name', type: 'text', value: '' }])
    // it is depracted, use filteringModel instead
    customFilterValues: {
      type: Array,
      default () {
        return []
      }
    } as PropOptions<CustomFilter[]>,
    // Enables adding in table data
    // (e.g. true)
    addEnabled: {
      type: Boolean,
      default: false
    },
    // Sets the page that is going to be used to redirected indise the drawer when user clicks on add button
    // (e.g. 'AddUserPage')
    addPage: {
      type: String,
      default: ''
    },
    // Enables editing in table data
    // (e.g. true)
    editEnabled: {
      type: Boolean,
      default: false
    },
    // Sets the page that is going to be used to redirected indise the drawer when user clicks on edit button
    // (e.g. 'EditUserPage')
    editPage: {
      type: String,
      default: ''
    },
    // Enables deleting in table data
    // (e.g. true)
    deleteEnabled: {
      type: Boolean,
      default: false
    },
    // Enables viewing in table data
    // (e.g. true)
    // not in use right now
    viewEnabled: {
      type: Boolean,
      default: false
    },
    // Delete function that is going to be called when user clicks on delete button on delete modal
    // (e.g. () => { return axios.delete('/users') })
    // The function must return a promise
    // Mapped store actions are also accepted
    deleteFunction: {
      type: [Function, MouseEvent],
      default: () => { }
    },
    // Enables uploading in table data
    // (e.g. true)
    uploadEnabled: {
      type: Boolean,
      default: false
    },
    // Upload function that is going to be called when user clicks on upload button on upload modal
    // (e.g. () => { return axios.post('/users') })
    // The function must return a promise
    // Mapped store actions are also accepted
    uploadFunction: {
      type: [Function, MouseEvent],
      default: () => { }
    },
    // Enables sending sms in table data
    // (e.g. true)
    smsEnabled: {
      type: Boolean,
      default: false
    },
    // Sms function that is going to be called when user clicks on sms button on sms modal
    // (e.g. () => { return axios.post('/users') })
    // The function must return a promise
    // Mapped store actions are also accepted
    // Not in use right now
    smsFunction: {
      type: [Function, MouseEvent],
      default: () => { }
    },
    // Shows how many pages are going to be shown in the pagination
    // (e.g. 5)
    pageCount: {
      type: Number,
      default: 1
    },
    // Adds classes to the table content container
    // (e.g. 'my-class')
    contentStyle: {
      type: String,
      default: ''
    },
    // Filter model object that contains the values of the filters
    // (e.g. { name: 'John', age: 20 })
    // filter object keys must match the keys of the headers
    // filter object values must match the type of the headers
    // automatically activates filtering when the object is not empty
    filteringModel: {
      type: Object,
      default: () => { }
    },
    // Shows actions in the table header as a dropdown
    // (e.g. true)
    // Enabled actions will be shown in the dropdown
    // Actions will be shown in the order they are defined in the table
    // Possible actions: add, edit, delete, upload, sms, view
    actionsAsDropdown: {
      type: Boolean,
      default: true
    },
    // The query parameters that is going to
    // passed by link when navigating to another page
    // e.g. ['id', 'name' }]
    dynamicLinkQueries: {
      type: Array,
      default: () => []
    }
  },
  /**
   * In setup part of the table filter model gets processed
   * to send in the api and slots get created for specific item headers
   * It also converts headers into auto filters //depracated
   * @param props
   */
  setup (props, { slots }) {
    const slotsProceced = []
    const filterModel: {
            [key: string]: Ref<String>;
        } = reactive({})
    for (const key in props.headers) {
      const initialVal = ref('')
      filterModel[key] = initialVal
    }
    const dataValues: {
            [key: string]: SelectOption[];
        } = {}
    for (const key in props.headers) {
      filterModel[key].value = ''
      if (Object.prototype.hasOwnProperty.call(props.headers, key)) {
        const slotName = 'item-' + key
        slotsProceced.push({
          key,
          hasSlot: !!slots[slotName],
          slotName
        })
      }
      dataValues[key] = []
      props.data.map((item: any, index: number) => {
        if (!dataValues[key].some(w => w.text === item[key])) {
          dataValues[key].push({
            id: index,
            text: item[key],
            selected: false
          })
        }
        return null
      })
    }
    const dataSet = props.data
    return { slotsProceced, dataSet, dataValues, filterModel }
  },
  data () {
    return {
      opened: false,
      actionDropdown: false,
      generateActions: [
        'MVR Report',
        'CSA Report'
      ],
      currentPage: 1,
      deleteId: 0,
      tableKey: 0,
      editId: 0,
      fetchCompleted: false,
      sorteds: '',
      loaderArr: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}] as Object[],
      searchTerm: '',
      customFilterArray: this.customFilterValues,
      SizeTypeEnum,
      ActionTypeEnum,
      ButtonTypeEnum,
      headCheckBox: false,
      extendedItems: [] as any[],
      testArr: [] as any[],
      pageRanges: [],
      actionDropdowns: []
    }
  },
  computed: {
    // pageCount (): number {
    //   if (this.items.length) {
    //     return Math.ceil(this.items.length / this.page_size)
    //   } else {
    //     return 0
    //   }
    // },
    /**
     * Adds of extendibility and selectibility to the paginated items
     */
    pagedData (): any[] {
      if (this.extendEnabled === true) {
        this.items.map((item: any) => {
          item.isActive = false
          return null
        })
      }
      if (this.multipleEnabled === true) {
        this.items.map((item: any) => {
          item.isSelected = false
          return null
        })
      }
      console.log('items:', this.items)
      return this.items
    },
    /**
     * Checks if there is a next page
     */
    hasNextPage (): boolean {
      console.log('next:', this.pageCount)
      return this.currentPage < this.pageCount
    },
    /**
     * Checks if theres is a previous page
     */
    hasPrevPage (): boolean {
      return this.currentPage > 1
    },
    /**
     * Makes a search in the current page //depracated
     * Currently it only checks if data is an array or not
     */
    items (): Array<Object> {
      // if (this.searchEnabled === true) {
      //   let listItems = [] as Array<any>
      //   if (this.searchTerm !== '') {
      //     listItems = this.customFilters.filter((item: any) => {
      //       let added = false as Boolean
      //       Object.keys(this.headers).map((val) => {
      //         if (!added) {
      //           added = item[val]
      //             ?.toString()
      //             .toLowerCase()
      //             .includes(this.searchTerm.toLowerCase())
      //         }
      //         return added
      //       })
      //       return added ? item : null
      //     })
      //   } else {
      //     listItems = this.customFilters
      //   }
      //   return listItems
      // } else {
      return Array.isArray(this.data) ? this.data : []
      // }
    },
    /**
     * Takes an custom filters array makes a filtering to items //depracated
     */
    customFilters (): Array<Object> {
      // let customList: Array<Object> = this.filteredItems
      // let customList = this.$set({}, 'filters', this.filteredItems)
      const customList: Ref<Array<Object>> = reactive(ref(this.filteredItems))
      console.log('custom')
      if (this.customFilterArray !== undefined && this.customFilterArray.length > 0) {
        this.customFilterArray.map((filter: any) => {
          console.log(customList)
          if (filter.value !== null && filter.value !== undefined && filter.value.toString().toLowerCase() !== '') {
            customList.value = customList.value.filter((item: any) => {
              let added = false as Boolean
              Object.keys(this.headers).filter(fil => fil === filter.header).map((header) => {
                console.log(header, item[header])
                if (!added) {
                  added = item[header]?.toString().toLowerCase() === filter.value.toString().toLowerCase()
                }
                return added
              })
              return added ? item : null
            })
          }
          return null
        })
      }
      return customList.value
    },
    /**
     * Filters the items according to auto generated filters from the headers //depracated
     */
    filteredItems (): Array<Object> {
      let filterItems = this.dataSet as Array<any>
      Object.entries(this.filterModel).map((val: any) => {
        let $value = val[1]?.value ?? ''
        $value = $value.toString()
        const headerKey = val[0]
        if ($value && $value !== '') {
          filterItems = filterItems.filter((item: any) => {
            let added = false as Boolean
            Object.keys(this.headers).filter(fil => fil === headerKey).map((header) => {
              if (!added) {
                added = item[header]?.toString().toLowerCase() === $value.toString().toLowerCase() ?? false
              }
              return added
            })
            return added ? item : null
          })
        }
        return null
      })
      return filterItems
    },
    /**
     * Turns headers into a suitable object for csv
     */
    headerObj () {
      const headerObj: {
                [key: string]: {
                    title: string;
                };
            } = {}
      Object.entries(this.headers).forEach((headerPair: [
                string,
                ({
                    label: string;
                } | unknown)
            ]) => {
        headerObj[headerPair[0]] = {
          title: (headerPair[1] as {
                        label: string;
                    }).label
        }
      })
      return headerObj
    },
    /**
     * Turns headers into an array for xls and xlsl
     */
    headerArr () {
      const headerArr: {
                label: string;
                field: string;
                dataFormat?: string;
            }[] = []
      Object.entries(this.headers).forEach((headerPair: [
                string,
                ({
                    label: string;
                } | unknown)
            ]) => {
        headerArr.push({
          field: headerPair[0],
          label: (headerPair[1] as {
                        label: string;
                    }).label
        })
        // headerObj[headerPair[0]] = {
        //   title: (headerPair[1] as { label: string }).label
        // }
      })
      return headerArr
    }
  },
  watch: {
    /**
     * Watches the changes in filtering model and sends an api request
     * according to filtering changes in the object
     */
    filteringModel: {
      handler (val: any) {
        if (this.requestFunction !== null) {
          console.log('filteringModel', val)
          this.fetchCompleted = false
          setTimeout(() => {
            this.requestFunction({ page_number: this.currentPage, filterModel: val } as GetPayload).then(() => {
              this.pageRanges = this.paginationTest(this.currentPage, this.pageCount)
              this.fetchCompleted = true
            }).catch((err: unknown) => {
              console.warn(err)
            })
          }, 100)
        } else {
          this.fetchCompleted = true
        }
      },
      deep: true
    }
  },
  created () {
    /**
     * Sends an api request on mount
     */
    if (this.requestFunction !== null) {
      this.fetchCompleted = false
      setTimeout(() => {
        console.log('created', { page_number: this.currentPage, filterModel: this.filteringModel })
        this.requestFunction({ page_number: this.currentPage, filterModel: this.filteringModel } as GetPayload).then(() => {
          this.pageRanges = this.paginationTest(this.currentPage, this.pageCount)
          this.fetchCompleted = true
        }).catch((err: unknown) => {
          console.warn(err)
        })
      }, 100)
    } else {
      this.fetchCompleted = true
    }
    this.tableKey = Math.random()
  },
  methods: {
    /**
     * Creates pagination for table
     */
    paginationTest (c: number, m: number): Array<any> {
      const current = c
      const last = m
      const delta = 2
      const left = current - delta
      const right = current + delta + 12
      const range = []
      const rangeWithDots = []
      let l
      for (let i = 1; i <= last; i++) {
        if ((i === 1 || i === last) || (i >= left && i < right + delta)) {
          range.push(i)
        }
      }
      for (const i of range) {
        if (l) {
          if (i - l === 2) {
            rangeWithDots.push(l + 1)
          } else if (i - l !== 1) {
            rangeWithDots.push('...')
          }
        }
        rangeWithDots.push(i)
        l = i
      }
      return rangeWithDots
    },
    /**
     * Opens the drawer with drawer component's name that is
     * given as a parameter
     * @param drawerName string
     */
    drawer (drawerName: string) {
      (this.$refs.drawer as Vue & {
                showDrawer: (component: String, routeUrl?: String) => Element;
            }).showDrawer(drawerName)
    },
    /**
     * Hides the delete modal
     */
    modalHide (): void {
      (this.$refs.modal as Vue & {
                hideModal: () => Function;
            }).hideModal()
    },
    /**
     * Shows the delete modal
     */
    modalShow (): void {
      (this.$refs.modal as Vue & {
                showModal: () => Function;
            }).showModal()
    },
    /**
     * Returns the paged data
     * It's for getting the data outside of the component using refs
     */
    getPagedData (): any[] {
      return this.pagedData
    },
    /**
     * Sends a delete request when yes is clicked on the delete modal
     */
    deleteAction (): void {
      this.deleteFunction(this.deleteId).then(() => {
        this.modalHide()
      }).catch((err: unknown) => {
        console.warn(err)
      })
    },
    /**
     * Returns an query object for add to the link as an query paramaters
     * @param item any
     */
    linkQuery (item: any) : { [x:string]: any } {
      let queryObj = {}
      this.dynamicLinkQueries.forEach((q: string) => {
        queryObj = {
          ...queryObj,
          [q]: item[q]
        }
      })
      return queryObj
    },
    /**
     * Fills state's delete id with the item's id that was clicked
     * @param id number | string
     */
    fillDeleteId (id: number | string): void {
      this.deleteId = id
      this.modalShow()
    },
    /**
     * Fills state's edit id with the item's id that was clicked
     * @param id number | string
     */
    fillEditId (id: number | string): void {
      this.editId = id
      this.drawer(this.editPage)
    },
    /**
     * Opens each item's actions as a dropdown
     * @param item any
     */
    openActionDropdown (item): void {
      if (this.actionDropdowns.includes(item.id)) {
        this.actionDropdowns = this.actionDropdowns.filter((a: any) => {
          return a !== item.id
        })
      } else {
        this.actionDropdowns.push(item.id)
      }
    },
    /**
     * Extends the items that was clicked
     * @param item any
     */
    extendItem (item: any) {
      if (this.extendedItems.includes(item)) {
        this.extendedItems = this.extendedItems.filter((a: any) => {
          return a !== item
        })
      } else {
        this.extendedItems.push(item)
      }
      return !item.isActive
    },
    /**
     * Returns the extended items
     * It's for getting the data outside of the component using refs
     */
    getExtendedItems (): any[] {
      return this.extendedItems
    },
    /**
     * Sends an api request when page is changed while keeping the current
     * active filters
     * @param page number
     */
    changePage (page: number) {
      this.currentPage = page
      this.fetchCompleted = false
      this.pageRanges = this.paginationTest(page, this.pageCount)
      setTimeout(() => {
        this.requestFunction({ page_number: this.currentPage, filterModel: this.filteringModel, sortedHeader: this.sorteds } as GetPayload).then(() => {
          this.fetchCompleted = true
          this.tableKey = Math.random()
        }).catch((err: unknown) => {
          console.warn(err)
        })
      }, 100)
    },
    /**
     * Selects every item if none of the items is checked
     * or uncheck every item if some of them are checked
     */
    onHeadCheckboxChange (): void {
      if (this.headCheckBox === true) {
        this.pagedData.forEach((item: any) => {
          item.isSelected = true
        })
      } else {
        this.pagedData.forEach((item: any) => {
          item.isSelected = false
        })
      }
    },
    /**
     * Takes the header name and sends an api request with a sort query.
     * If it's not sorted, first sorts in a descending order.
     * If it's in descending order it changes to ascending order
     * If it's in ascending order it removes the sort and gets the default
     * data order
     * @param columnName string
     */
    sortData (columnName: string) {
      console.log('sorts', this.sorteds)
      if (this.sorteds === columnName + '+desc' || this.sorteds === columnName + '+asc') {
        const splittedName = this.sorteds.split('+')
        if (splittedName[1] === 'desc') {
          this.sorteds = columnName + '+asc'
          if (this.requestFunction !== null) {
            this.fetchCompleted = false
            setTimeout(() => {
              this.requestFunction({
                page_number: this.currentPage,
                filterModel: this.filteringModel,
                sortedHeader: columnName + '+asc'
              } as GetPayload).then(() => {
                this.pageRanges = this.paginationTest(this.currentPage, this.pageCount)
                this.fetchCompleted = true
              }).catch((err: unknown) => {
                console.warn(err)
              })
            }, 100)
          } else {
            this.fetchCompleted = true
          }
        } else {
          this.sorteds = ''
          if (this.requestFunction !== null) {
            this.fetchCompleted = false
            setTimeout(() => {
              this.requestFunction({
                page_number: this.currentPage,
                filterModel: this.filteringModel
              } as GetPayload).then(() => {
                this.pageRanges = this.paginationTest(this.currentPage, this.pageCount)
                this.fetchCompleted = true
              }).catch((err: unknown) => {
                console.warn(err)
              })
            }, 100)
          } else {
            this.fetchCompleted = true
          }
        }
        // this.dataSet = this.dataSet.sort((a:any, b:any) => {
        //   this.sorteds = this.sorteds.filter(item => item !== columnName)
        //   if (a[columnName] > b[columnName]) {
        //     return -1
        //   }
        //   if (b[columnName] > a[columnName]) {
        //     return 1
        //   }
        //   return 0
        // })
        // this.dataSet = this.dataSet.sort().reverse()
      } else {
        this.sorteds = columnName + '+desc'
        if (this.requestFunction !== null) {
          this.fetchCompleted = false
          setTimeout(() => {
            this.requestFunction({
              page_number: this.currentPage,
              filterModel: this.filteringModel,
              sortedHeader: columnName + '+desc'
            } as GetPayload).then(() => {
              this.pageRanges = this.paginationTest(this.currentPage, this.pageCount)
              this.fetchCompleted = true
            }).catch((err: unknown) => {
              console.warn(err)
            })
          }, 100)
        } else {
          this.fetchCompleted = true
        }
        // this.dataSet = this.dataSet.sort()
        // this.sorteds.push(columnName)
      }
    },
    /**
     * Clears all filters in custom filters //depracated
     */
    clearAll () {
      Object.values(this.filterModel).map((val: any) => {
        if (val.value !== null) {
          val.value = ''
        }
        return null
      })
    },
    /**
     * Makes a search in the current page //depracated
     */
    search ($value: string): void {
      if ($value && $value.length > 2) {
        this.searchTerm = $value
      } else {
        this.searchTerm = ''
      }
    },
    /**
     * Converts headers into an array for download //depracated
     */
    propCheck (obj: any, key: string | undefined): any {
      console.log('key:', obj)
      // eslint-disable-next-line no-prototype-builtins
      if (key && obj && obj.hasOwnProperty(key)) {
        return obj[key]
      } else {
        return ''
      }
    },
    download (): void {
      const head = Object.values(this.headers)
      const headerArr = []
      for (let index = 0; index < head.length; index++) {
        const element = head[index].label
        headerArr.push(element)
      }
      // jsontoexcel.getXlsx(this.data, Object.keys(this.headers), (this.title !== null && this.title !== undefined ? `${this.title.toLowerCase().replace(' ', '_')}.xlsx` : 'table.xlsx'))
    },
    /**
     * It re-renders the table slots //depracated
     */
    reSlot (): void {
      this.slotsProceced = []
      for (const key in this.headers) {
        this.filterModel[key].value = ''
        if (Object.prototype.hasOwnProperty.call(this.headers, key)) {
          const slotName = 'item-' + key
          this.slotsProceced.push({
            key,
            hasSlot: !!this.slots[slotName],
            slotName
          })
        }
        this.dataValues[key] = [] as Array<SelectOption>
        this.data.map((item: any, index: number) => {
          if (!this.dataValues[key].some((w: SelectOption) => w.text === item[key])) {
            this.dataValues[key].push({
              id: index,
              text: item[key],
              selected: false
            })
          }
          return null
        })
      }
    }
  }
})
</script>

<style>
.table-container {
  @apply bg-white rounded-2xl w-full border border-grey-blue-100;
}

.table-header {
  @apply flex items-center justify-between p-6;
}

.table-content table thead {
  @apply bg-[#E0E1E5]/10 h-12 border-y border-grey-blue-100;
}

.table-content table thead th {
  @apply px-6 text-left font-medium text-gray-400 whitespace-nowrap;
}

.table-content table tbody tr {
  @apply border-y border-grey-blue-100 last:border-b-0 first:border-t-0 font-medium;
}

.table-content table tbody tr .td-inner{
  box-shadow: 0px 156px 62px rgba(189, 189, 189, 0.01), 0px 88px 53px rgba(189, 189, 189, 0.05), 0px 39px 39px rgba(189, 189, 189, 0.09), 0px 10px 21px rgba(189, 189, 189, 0.1), 0px 0px 0px rgba(189, 189, 189, 0.1);
}

.pagination .prev,
.pagination .next {
  @apply transition-all text-sm w-8 h-8 border-gray-200 mr-2 flex items-center justify-center border rounded-lg dark:border-grey-dark-800 dark:text-white;
}

.pagination .page-number {
  @apply transition-all text-sm w-8 h-8 flex items-center justify-center rounded-lg cursor-pointer mr-2 hover:bg-gray-800 hover:text-white dark:text-grey-dark-100 dark:hover:text-white;
}
</style>
