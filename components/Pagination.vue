<template>
  <div v-if="pageCount > 1 " class="row my-5 justify-center items-center">
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
</template>

<script lang="ts">
import Vue from 'vue'
import { GetPayload } from '~/models/common/GetPayload'

export default Vue.extend({
  name: 'Pagination',
  props: {
    // Shows how many pages are going to be shown in the pagination
    // (e.g. 5)
    pageCount: {
      type: Number,
      default: 1
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
    // Request function to get data
    // (e.g. () => { return axios.get('/users') })
    // The function must return a promise
    // Mapped store actions are also accepted
    requestFunction: {
      type: Function,
      default: null
    },
    // Callback function that is called after
    // component makes an api request
    // (e.g. () => { console.log("callback") })
    requestCallback: {
      type: Function,
      default: null
    }
  },
  data () {
    return {
      currentPage: 1,
      sorteds: '',
      pageRanges: [],
      tableKey: 0,
      fetchCompleted: false
    }
  },
  computed: {
    hasNextPage (): boolean {
      console.log('next:', this.pageCount)
      return this.currentPage < this.pageCount
    },
    hasPrevPage (): boolean {
      return this.currentPage > 1
    }
  },
  watch: {
    filteringModel: {
      handler (val: any) {
        if (this.requestFunction !== null) {
          console.log('filteringModel', val)
          this.fetchCompleted = false
          setTimeout(() => {
            this.requestFunction({ page_number: this.currentPage, filterModel: val } as GetPayload).then(() => {
              if (this.requestCallback) { this.requestCallback() }
              this.pageRanges = this.paginationTest(this.currentPage, this.pageCount)
              // this.fetchCompleted = true
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
    if (this.requestFunction !== null) {
      this.fetchCompleted = false
      setTimeout(() => {
        this.requestFunction({ page_number: this.currentPage, filterModel: this.filteringModel } as GetPayload).then(() => {
          this.pageRanges = this.paginationTest(this.currentPage, this.pageCount)
          if (this.requestCallback) { this.requestCallback() }
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
    changePage (page: number) {
      this.currentPage = page
      this.pageRanges = this.paginationTest(page, this.pageCount)
      setTimeout(() => {
        this.requestFunction({ page_number: this.currentPage, filterModel: this.filteringModel, sortedHeader: this.sorteds } as GetPayload).then(() => {
          if (this.requestCallback) { this.requestCallback() }
        }).catch((err: unknown) => {
          console.warn(err)
        })
      }, 100)
    },
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
    }
  }
})
</script>

<style scoped>
.pagination .prev, .pagination .next {
  @apply transition-all text-sm w-8 h-8 border-gray-200 mr-2 flex items-center justify-center border rounded-lg dark:border-grey-dark-800 dark:text-white;
}

.pagination .page-number {
  @apply transition-all text-sm w-8 h-8 flex items-center justify-center rounded-lg cursor-pointer mr-2 hover:bg-gray-800 hover:text-white dark:text-grey-dark-100 dark:hover:text-white;
}
</style>
