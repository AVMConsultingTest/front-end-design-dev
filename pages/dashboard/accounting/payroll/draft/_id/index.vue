<template>
  <div class="new-invoice-page pb-8">
    <div class="table-header">
      <div class="title flex items-center">
       <div class="flex">
          <div
            class="col-auto pt-1 cursor-pointer self-start"
            @click="$router.back()"
          >
            <Icon icon="arrow-left" color="black" class="w-6 h-6 mr-4" />
          </div>
          <span class="text-b-1 font-semibold">Draft Invoice</span>
        </div>
      </div>
      <div class="actions flex items-center first:justify-start">
        <Button
          :type="editable ? ButtonTypeEnum.GREEN : ButtonTypeEnum.PRIMARY"
          :size="SizeTypeEnum.LG"
          :action="ActionTypeEnum.BUTTON"
          class="text-c-1 !w-40 !h-10"
          @click="(editable = !editable)"
        >
          {{ editable ? 'Save' : 'Edit' }} Invoice
        </Button>
      </div>
    </div>
    <div class="table-container">
      <div class="table-header bg-[#E4F4F9] rounded-t-2xl">
        <div class="title flex items-center">
          <div class="flex flex-col">
            <span class="text-b-1 font-semibold">{{ `${$route.query.driver_type || ""} ` }}Gross</span>
          </div>
        </div>
      </div>
      <div class="text-c-1 font-bold px-6 py-2">
        <div class="flex items-center">
          <div class="col-auto pr-0 mr-2">
            <img src="https://sap.github.io/ui5-webcomponents/assets/images/avatars/man_avatar_3.png" alt="Halley" class="rounded-full w-10 h-10">
          </div> <div class="col-auto">
            <span class="block text-c-1 font-semibold whitespace-nowrap">
              Halley
            </span> <span class="block text-c-1 text-gray-400">
              Caption
            </span>
          </div>
        </div>
      </div>
      <div>
        <table class="w-full">
          <thead style="background-color: #F2F4F7;">
            <tr>
              <th class="h-11 px-4 py-6 font-medium text-[#475467] text-c-1 text-center">
                <p class="relative">
                  Load Id
                </p>
              </th>
              <th class="h-11 px-4 py-6 font-medium text-[#475467] text-c-1">
                <p class="relative ">
                  Pickup
                </p>
              </th>
              <th class="h-11 px-4 py-6 font-medium text-[#475467] text-c-1">
                <p class="relative">
                  Delivery
                </p>
              </th>
              <th class="h-11 px-4 py-6 font-medium text-[#475467] text-c-1">
                <p class="relative">
                  Status
                </p>
              </th>
              <th class="h-11 px-4 py-6 font-medium text-[#475467] text-c-1">
                <p class="relative">
                  Pay Code
                </p>
              </th>
              <th class="h-11 px-4 py-6 font-medium text-[#475467] text-c-1">
                <p class="relative">
                  Distance(Mile)
                </p>
              </th>
              <th class="h-11 px-4 py-6 font-medium text-[#475467] text-c-1">
                <p class="relative">
                  Deadhead
                </p>
              </th>
              <th class="h-11 px-4 py-6 font-medium text-[#475467] text-c-1 text-center">
                <p class="relative">
                  Gross
                </p>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in tableData" :key="item.load_id" class="border-b border-solid border-gray-200">
              <td class="text-b-4 font-medium  px-6 py-4 text-center">
                <span class="relative">{{ item.load_id }}
                </span>
              </td>
              <td class="text-b-4 font-medium text-center px-6 py-4 flex flex-col">
                <span class="relative font-bold">{{ item.pickup }}
                </span>
                <span class="relative">{{ item.date }}
                </span>
              </td>
              <td class="text-b-4 font-medium text-center px-6 py-4">
                <span class="relative">{{ item.delivery }}
                </span>
              </td>
              <td class="text-b-4 font-medium text-center px-6 py-4">
                <Badge
                  :title="item.status"
                  :size="SizeTypeEnum.SM"
                  class="items-center justify-center"
                  :class="[
                    {'bg-green-100 text-green-700' : item.status === 'Delivered'},
                    {'bg-red-100 text-red' : item.status === 'Canceled'},
                  ]"
                />
              </td>
              <td class="text-b-4 font-medium text-center px-6 py-4">
                <span class="relative">{{ item.pay_code }}
                </span>
              </td>
              <td class="text-b-4 font-medium text-center px-6 py-4">
                <span class="relative">{{ item.distance }}
                </span>
              </td>
              <td class="text-b-4 font-medium text-center px-6 py-4">
                <span class="relative">{{ item.deadhead }}
                </span>
              </td>
              <td class="text-b-4 font-medium text-center px-6 py-4">
                <span class="relative">{{ item.gross | toCurrency }}
                </span>
              </td>
            </tr>
            <tr>
              <td colspan="2" />
              <td class="text-b-4 font-bold py-1 border-b">
                <span class="relative">Total:
                </span>
              </td>
              <td colspan="2" class="border-b" />
              <td class="text-b-4 text-center py-1 border-b">
                <span class="relative">225
                </span>
              </td>
              <td class="text-b-4 text-right font-bold py-1 pr-2 border-b">
                <span class="relative">2,750 miles
                </span>
              </td>
              <td class="text-b-4 text-right font-bold py-1 pr-2 border-b">
                <span class="relative">{{ calculateSum(tableData, 'gross') | toCurrency }}
                </span>
              </td>
            </tr>
            <tr>
              <td colspan="2" />
              <td class="text-b-4 font-bold py-1 border-b">
                <span class="relative">Total Millage:
                </span>
              </td>
              <td colspan="2" class="border-b" />
              <td class="text-b-4 text-center py-1 border-b">
                <span class="relative">
                  -
                </span>
              </td>
              <td class="text-b-4 text-right font-bold py-1 pr-2 border-b">
                <span class="relative"> -
                </span>
              </td>
              <td class="text-b-4 text-right font-bold py-1 pr-2 border-b">
                <span class="relative">
                  -
                </span>
              </td>
            </tr>
            <tr>
              <td colspan="2" />
              <td class="text-b-4 font-bold py-1 border-b">
                <span class="relative">Pay Per Millage:
                </span>
              </td>
              <td colspan="2" class="border-b" />
              <td class="text-b-4 text-center py-1 border-b">
                <span class="relative">1,166.42 mi * $0.70
                </span>
              </td>
              <td class="text-b-4 text-right font-bold py-1 pr-2 border-b">
                <span class="relative">-
                </span>
              </td>
              <td class="text-b-4 text-right font-bold py-1 pr-2 border-b">
                <span class="relative">-
                </span>
              </td>
            </tr>
            <tr>
              <td colspan="2" />
              <td class="text-b-4 font-bold py-1 border-b">
                <span class="relative">Guaranteed Payment:
                </span>
              </td>
              <td colspan="2" class="border-b" />
              <td class="text-b-4 text-center py-1 border-b">
                <span class="relative">-
                </span>
              </td>
              <td class="text-b-4 text-right font-bold py-1 pr-2 border-b">
                <span class="relative">-
                </span>
              </td>
              <td class="text-b-4 text-right font-bold py-1 pr-2 border-b">
                <span class="relative">$2,000
                </span>
              </td>
            </tr>
            <tr>
              <td colspan="2" />
              <td class="text-b-4 font-bold py-1 border-b">
                <span class="relative">Driver Payment:
                </span>
              </td>
              <td colspan="2" class="border-b" />
              <td class="text-b-4 text-center py-1 border-b">
                <span class="relative">-
                </span>
              </td>
              <td class="text-b-4 text-right font-bold py-1 pr-2 border-b">
                <span class="relative">-
                </span>
              </td>
              <td class="text-b-4 text-right font-bold py-1 pr-2 border-b">
                <span class="relative">$2,082,50
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="table-header bg-[#E4F4F9]">
        <div class="title flex items-center">
          <div class="flex flex-col">
            <span class="text-b-1 font-semibold">Deductions</span>
          </div>
        </div>
      </div>
      <div>
        <div
          v-for="(deduction, index) in deductions"
          :key="index"
          class="table-header"
          :class="[{ 'border-t': index > 0 }]"
        >
          <div class="title flex items-center">
            <div v-if="editable" @click="removeDeduction(index)">
              <Icon
                icon="trash"
                :alpha="0"
                color="black"
                class=" h-5 w-5 cursor-pointer mr-2"
              />
            </div>
            <div v-if="!editable" class="flex flex-col">
              <span class="text-b-4 font-medium">{{ deduction.name }}</span>
            </div>
            <div v-else class="flex flex-col">
              <Input v-model="deduction.name" type="text" class="text-b-4 font-medium" />
            </div>
          </div>
          <div v-if="!editable" class="flex flex-col">
            <span class="text-b-4 font-medium">{{ deduction.amount | toCurrency }}</span>
          </div>
          <div v-else class="flex flex-col">
            <Input v-model.number="deduction.amount" type="number" class="text-b-1 font-semibold" />
          </div>
        </div>
        <div v-if="editable" class="table-header cursor-pointer border-t" @click="addDeduction()">
          <div class="title flex items-center">
            <div class="flex flex-col">
              <span class="text-b-4 font-medium text-dark-blue"> + Add More</span>
            </div>
          </div>
        </div>
        <div class="table-header cursor-pointer border-t">
          <div class="title flex items-center">
            <div class="flex flex-col">
              <span class="text-b-3 font-bold">Total Deductions</span>
            </div>
          </div>
          <div class="flex flex-col">
            <span class="text-b-3 font-bold">{{ calculateSum(deductions, 'amount') | toCurrency }}</span>
          </div>
        </div>
        <div class="table-header cursor-pointer border-t bg-[#FCFCFD] rounded-b-2xl">
          <div class="title flex items-center">
            <Input v-model="note" label="Note" name="note" type="text" placeholder="Optional" />
          </div>
          <div class="flex flex-col">
            <span class="text-b-4 font-medium">Net Payment</span>
            <h3 class="font-bold">
              {{ calculateSum(deductions, 'amount') + calculateSum(tableData, 'gross') | toCurrency }}
            </h3>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { SizeTypeEnum, ActionTypeEnum, ButtonTypeEnum } from '~/components/ts/enums'
export default Vue.extend({
  layout: 'Dashboard',
  data () {
    return {
      SizeTypeEnum,
      ButtonTypeEnum,
      ActionTypeEnum,
      editable: false,
      note: '',
      tableHeaders: {
        load_id: {
          label: 'Load ID'
        },
        pickup: {
          label: 'Pickup'
        },
        status: {
          label: 'Status'
        },
        delivery: {
          label: 'Delivery'
        },
        pay_code: {
          label: 'Pay Code'
        },
        distance: {
          label: 'Distance'
        },
        deadhead: {
          label: 'Deadhead'
        },
        gross: {
          label: 'Gross'
        },
        date: {
          label: 'Date'
        }
      },
      innerTableRows: [
        'Total:',
        'Total Mileage:',
        'Pay per Mileage:',
        'Guaranteed Payment:',
        'Driver Payment:'
      ],
      tableData: [
        {
          load_id: '113RTFQTL',
          pickup: 'CMH2K - Groveport, OH',
          delivery: 'MKE5N - Kenosha, WI',
          status: 'Delivered',
          pay_code: 'LEASE INSURANCE',
          distance: '1,200',
          deadhead: '0',
          gross: 4800,
          date: ' 11 Oct, 2020 10:00 AM'
        },
        {
          load_id: '113RTFQTL',
          pickup: 'CMH2K - Groveport, OH',
          delivery: 'MKE5N - Kenosha, WI',
          status: 'Canceled',
          pay_code: 'LEASE INSURANCE',
          distance: '0',
          deadhead: '60',
          gross: 0,
          date: ' 11 Oct, 2020 10:00 AM'
        },
        {
          load_id: '113RTFQTL',
          pickup: 'CMH2K - Groveport, OH',
          delivery: 'MKE5N - Kenosha, WI',
          status: 'Delivered',
          pay_code: 'LEASE INSURANCE',
          distance: '850',
          deadhead: '80',
          gross: 3400,
          date: ' 11 Oct, 2020 10:00 AM'
        }
        // Add more data as needed
      ],
      deductions: [
        {
          name: 'Adminstrative Fee',
          amount: 150
        }
      ]
    }
  },
  computed: {
    totalData () {
      const arr = [
        ...this.tableData, {
          load_id: '',
          pickup: '',
          delivery: '',
          status: '',
          pay_code: '',
          distance: '',
          deadhead: '',
          gross: '',
          date: ''
        }
      ]
      return arr
    }
  },
  methods: {
    calculateSum (array: { [x:string]: number | string }[], property: string): number {
      const total = array.reduce((accumulator, object) => {
        return accumulator + (object[property] as number)
      }, 0)

      return total
    },
    addDeduction (): void {
      this.deductions.push({
        name: '',
        amount: 0
      })
    },
    removeDeduction (index: number): void {
      this.deductions.splice(index, 1)
    }
  }
})
</script>

<style>
.new-invoice-page .table-content{
  overflow-x: unset !important;
}
.table-content table tbody tr:last-child{
  border: unset !important;
}
</style>
