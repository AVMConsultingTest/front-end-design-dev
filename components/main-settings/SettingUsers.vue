<template>
  <div class="w-full">
    <div class="table-container" :class="[{'!border-0': listMode }]">
      <div v-if="showHeader" class="table-header">
        <div class="title flex items-center">
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
        <div v-if="$slots.actions || searchEnabled" class="actions flex items-center">
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
        <slot name="custom-filter" />
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
        <slot name="custom-actions" />
      </div>
      <div class="table-content w-full overflow-x-auto relative">
        <table class="w-full table-auto">
          <thead>
            <tr>
              <th
                v-for="(header, i) in headers"
                :key="i"
                class="text-b-4"
                :class="[{ 'sticky right-0  bg-[#fcfcfc] drop-shadow-2xl min-w-[11rem] text-center': header.sticky }]"
              >
                <div
                  class="heade flex items-center"
                  :class="[{ 'cursor-pointer': header.sortable }, { 'justify-center': header.sticky }]"
                  @click="() => (header.sortable ? sortData(i.toString()) : true)"
                >
                  <span v-if="header.icon">
                    <span v-if="header.sortable">
                      <Icon :icon="header.icon" color="grey-dark" :alpha="200" variant="bulk" class="w-5 h-5 mr-2" />
                    </span>
                  </span>
                  <span>
                    {{ header.label || header }}
                  </span>
                  <span v-if="header.sortable">
                    <Icon icon="arrow-3" color="gray" class="w-3 h-3 ml-2" />
                  </span>
                </div>
              </th>
              <th v-if="editEnabled || deleteEnabled">
                <div class="heade flex items-center">
                  <span>Action</span>
                </div>
              </th>
            </tr>
          </thead>
          <tbody v-if="fetchCompleted">
            <template v-for="(item, i) of pagedData">
              <tr
                v-if="true"
                :key="`${i}${tableKey}`"
                class="text-b-4 transition-all hover:bg-gray-50 cursor-pointer"
                :class="[{'!border-0': listMode }]"
                :data-link="item.link"
                @click="
                  () => {
                    link
                      ? $router.push(`${link}${item.id}`)
                      : (extendEnabled
                        ? extendItem(item)
                        : true);
                  }
                "
              >
                <td
                  v-for="(td, j) of slotsProceced"
                  :key="i + '-' + j"
                  class="px-6"
                  :class="[
                    { 'sticky right-0  bg-[#fcfcfc] text-center drop-shadow-2xl': headers[td.key]?.sticky },
                    { 'py-1 !px-0': listMode },
                  ]"
                >
                  <div
                    class="h-16 inline-flex items-center"
                    :class="[
                      { 'rounded-r-lg': slotsProceced.length === j+1 && listMode },
                      { 'rounded-l-lg': j === 0 && listMode },
                      { 'td-inner px-6 w-full bg-white': listMode },
                    ]"
                  >
                    <slot v-if="td.hasSlot" :name="td.slotName" :item="item" :data="pagedData" :index="i" />
                    <span v-else class="overflow-hidden truncate max-w-[10rem]">{{ item[td.key] }}</span>
                  </div>
                </td>
                <td v-if="editEnabled || deleteEnabled || uploadEnabled || smsEnabled" class="px-6">
                  <div class="h-16 inline-flex items-center">
                    <div class="flex">
                      <div v-if="editEnabled" @click="fillEditId(item.id)">
                        <Icon
                          icon="edit-2"
                          variant="linear"
                          :alpha="400"
                          :disable-fill="true"
                          color="gray"
                          class="w-6 h-6 mr-2"
                        />
                      </div>
                      <div v-if="deleteEnabled" @click="fillDeleteId(item.id)">
                        <Icon
                          icon="trash"
                          variant="linear"
                          :alpha="400"
                          :disable-fill="true"
                          color="gray"
                          class="w-6 h-6 mr-2"
                        />
                      </div>
                      <div v-if="uploadEnabled" @click="uploadFunction">
                        <Icon
                          icon="send-square"
                          variant="linear"
                          :alpha="400"
                          :disable-fill="true"
                          color="gray"
                          class="w-6 h-6 mr-2"
                        />
                      </div>
                      <div v-if="smsEnabled" @click="smsFunction">
                        <Icon
                          icon="sms"
                          variant="linear"
                          :alpha="400"
                          :disable-fill="true"
                          color="gray"
                          class="w-6 h-6 mr-2"
                        />
                      </div>
                    </div>
                  </div>
                </td>
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
import Vue, { reactive, Ref, ref } from 'vue'
import { PropOptions } from 'vue/types/umd'
import { SelectOption } from '../ts/interfaces'
import {
  SizeTypeEnum,
  ActionTypeEnum,
  ButtonTypeEnum
} from '~/components/ts/enums'

  interface CustomFilter {
    header: String;
    value: Array<String | Number | Boolean | SelectOption | Date>;
  }

export default Vue.extend({
  props: {
    title: {
      type: String,
      default: null
    },
    subtitle: {
      type: String,
      default: null
    },
    deleteSubtext: {
      type: String,
      default: ''
    },
    hint: {
      type: String,
      default: null
    },
    icon: {
      type: String,
      default: null
    },
    iconColor: {
      type: String,
      default: null
    },
    iconAlpha: {
      type: Number,
      default: 500
    },
    iconVariant: {
      type: String,
      default: 'outline'
    },
    iconRounded: {
      type: Boolean,
      default: false
    },
    iconBg: {
      type: String,
      default: null
    },
    headers: {
      type: Object,
      required: true
    },
    data: {
      type: Array,
      required: true
    },
    link: {
      type: String,
      default: ''
    },
    page_size: {
      type: Number,
      default: 12
    },
    selectedTab: {
      type: Number,
      default: 0
    },
    searchEnabled: {
      type: Boolean,
      default: false
    },
    filterEnabled: {
      type: Boolean,
      default: false
    },
    extendEnabled: {
      type: Boolean,
      default: false
    },
    showHeader: {
      type: Boolean,
      default: true
    },
    requestFunction: {
      type: Function,
      default: null
    },
    listMode: {
      type: Boolean,
      default: false
    },
    customFilterValues: {
      type: Array,
      default () {
        return []
      }
    } as PropOptions<CustomFilter[]>,
    editEnabled: {
      type: Boolean,
      default: false
    },
    editPage: {
      type: String,
      default: ''
    },
    deleteEnabled: {
      type: Boolean,
      default: false
    },
    deleteFunction: {
      type: [Function, MouseEvent],
      default: () => { }
    },
    uploadEnabled: {
      type: Boolean,
      default: false
    },
    uploadFunction: {
      type: [Function, MouseEvent],
      default: () => { }
    },
    smsEnabled: {
      type: Boolean,
      default: false
    },
    smsFunction: {
      type: [Function, MouseEvent],
      default: () => { }
    },
    pageCount: {
      type: Number,
      default: 0
    },
    multipleEnabled: {
      type: Boolean,
      default: false
    }
  },
  setup (props, { slots }) {
    const slotsProceced = []
    const filterModel: { [key: string]: Ref<String> } = reactive({})
    for (const key in props.headers) {
      const initialVal = ref('')
      filterModel[key] = initialVal
    }
    const dataValues: { [key: string]: SelectOption[] } = {}
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
      currentPage: 1,
      deleteId: 0,
      tableKey: 0,
      editId: 0,
      fetchCompleted: false,
      sorteds: [] as String[],
      loaderArr: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}] as Object[],
      searchTerm: '',
      customFilterArray: this.customFilterValues,
      SizeTypeEnum,
      ActionTypeEnum,
      ButtonTypeEnum,
      selected: [],
      extendedItems: [] as any[],
      testArr: [] as any[],
      pageRanges: []
    }
  },
  computed: {

    pagedData (): any[] {
      if (this.extendEnabled === true) {
        const extendableItems = this.items
        extendableItems.map((item: any) => {
          item.isActive = false
          return null
        })
        return extendableItems
      } else {
        console.log('items:', this.items)
        return this.items
      }
    },
    hasNextPage (): boolean {
      return this.currentPage < this.pageCount
    },
    hasPrevPage (): boolean {
      return this.currentPage > 1
    },
    items (): Array<Object> {
      if (this.searchEnabled === true) {
        let listItems = [] as Array<any>

        if (this.searchTerm !== '') {
          listItems = this.customFilters.filter((item: any) => {
            let added = false as Boolean

            Object.keys(this.headers).map((val) => {
              if (!added) {
                added = item[val]
                  ?.toString()
                  .toLowerCase()
                  .includes(this.searchTerm.toLowerCase())
              }
              return added
            })
            return added ? item : null
          })
        } else {
          listItems = this.customFilters
        }

        return listItems
      } else {
        return this.data
      }
    },
    customFilters (): Array<Object> {
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
                added =
                    item[header]?.toString().toLowerCase() === $value.toString().toLowerCase() ?? false
              }
              return added
            })
            return added ? item : null
          })
        }
        return null
      })
      return filterItems
    }
  },
  created () {
    this.fetchCompleted = false
    setTimeout(() => {
      this.requestFunction(this.currentPage).then(() => {
        this.fetchCompleted = true
        this.pageRanges = this.paginationTest(this.currentPage, this.pageCount)
      }).catch((err: unknown) => {
        console.warn(err)
      })
    }, 100)
  },
  methods: {
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
    modalHide (): void {
      (this.$refs.modal as Vue & { hideModal: () => Function }).hideModal()
    },
    modalShow (): void {
      (this.$refs.modal as Vue & { showModal: () => Function }).showModal()
    },
    deleteAction (): void {
      this.deleteFunction(this.deleteId).then(() => {
        this.modalHide()
      }).catch((err: unknown) => {
        console.warn(err)
      })
    },
    fillDeleteId (id: number | string): void {
      this.deleteId = id
      this.modalShow()
    },
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
    changePage (page: number) {
      this.currentPage = page
      this.fetchCompleted = false
      this.pageRanges = this.paginationTest(page, this.pageCount)
      setTimeout(() => {
        this.requestFunction(this.currentPage).then(() => {
          this.fetchCompleted = true
          this.tableKey = Math.random()
        }).catch((err: unknown) => {
          console.warn(err)
        })
      }, 100)
    },
    sortData (columnName: string) {
      if (this.sorteds.includes(columnName)) {
        this.dataSet = this.dataSet.sort().reverse()
      } else {
        this.dataSet = this.dataSet.sort();
        (this.sorteds as string[]).push(columnName)
      }
    },
    clearAll () {
      Object.values(this.filterModel).map((val: any) => {
        if (val.value !== null) {
          val.value = ''
        }
        return null
      })
    },
    search ($value: string): void {
      if ($value && $value.length > 2) {
        this.searchTerm = $value
      } else {
        this.searchTerm = ''
      }
    },
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
    },
    select (item: unknown) {
      if (this.selected.includes(item)) {
        this.selected = this.selected.filter(w => w !== item)
      } else {
        this.selected.push(item)
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
