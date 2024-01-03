<template>
  <div style="margin: 50px 30px">
    <img class="mb-6 w-52 h-12 ml-4 mt-5 " src="/images/Logo_White.png">
    <div>
      <div class="row mb-10">
        <div class="col-auto">
          <div class="text-c-2 font-semibold text-gray-800">
            Dirilis Trans Inc
          </div>
          <div class="text-c-2 font-normal text-[#344054]">
            22036 Maplewood Circle Null, Naperville, IL 60563
          </div>
          <div class="text-c-2 font-normal text-[#344054]">
            E-mail: info@dirilistrans.com
          </div>
          <div class="text-c-2 font-normal text-[#344054]">
            Phone: (312) 617-9140
          </div>
        </div>
        <div class="col-auto ml-auto">
          <div class="text-c-2 font-semibold text-right text-gray-800">
            Evaris Edane
          </div>
          <div class="text-c-2 text-right text-[#344054]">
            22036 Maplewood Circle Null, Naperville, IL 60563
          </div>
          <div class="text-c-2 text-right text-[#344054]">
            E-mail: info@dirilistrans.com - Phone: (312) 617-9140
          </div>
          <div class="text-c-2 text-right">
            <span class="font-bold">Period:</span> 03/13/2023 -03/19/2023  ·  <span class="font-bold">Check Date:</span> 03/31/2023  <span class="font-bold">Batch No:</span>188
          </div>
        </div>
      </div>
      <div class="text-c-1 font-semibold mb-4">
        Dispatch Pay
      </div>
      <div class="mb-5">
        <table class="w-full">
          <thead class="bg-[#F2F4F7]">
            <tr>
              <th class="text-c-2 text-[#667085] font-medium">
                <span class="relative">Load Id</span>
              </th>
              <th class="text-c-2 text-[#667085] font-medium">
                <span class="relative">Pickup
                </span>
              </th>
              <th class="text-c-2 text-[#667085] font-medium">
                <span class="relative">Delivery
                </span>
              </th>
              <th class="text-c-2 text-[#667085] font-medium">
                <span class="relative">Pay Code
                </span>
              </th>
              <th class="text-c-2 text-[#667085] font-medium">
                <span class="relative">Distance(Mile)
                </span>
              </th>
              <th class="text-c-2 text-[#667085] font-medium">
                <span class="relative">Deadhead
                </span>
              </th>
              <th class="text-c-2 text-[#667085] font-medium">
                <span class="relative">Gross
                </span>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in tableData" :key="item.loadId">
              <td class="text-c-2 py-2">
                <span class="relative -top-1.5">{{ item.loadId }}
                </span>
              </td>
              <td class="text-c-2 text-center py-2">
                <span class="relative -top-1.5">{{ item.pickup }}
                </span>
              </td>
              <td class="text-c-2 text-center py-2">
                <span class="relative -top-1.5">{{ item.delivery }}
                </span>
              </td>
              <td class="text-c-2 text-center py-2">
                <span class="relative -top-1.5">{{ item.payCode }}
                </span>
              </td>
              <td class="text-c-2 text-center py-2">
                <span class="relative -top-1.5">{{ item.distance }}
                </span>
              </td>
              <td class="text-c-2 text-center py-2">
                <span class="relative -top-1.5">{{ item.deadhead }}
                </span>
              </td>
              <td class="text-c-2 text-right py-2">
                <span class="relative -top-1.5">{{ item.gross }}
                </span>
              </td>
            </tr>
            <tr style="background-color: #F2F4F7;">
              <td colspan="4" />
              <td class="text-c-2 text-right font-bold py-1">
                <span class="relative -top-1.5">Sub Total:
                </span>
              </td>
              <td class="text-c-2 text-center py-1">
                <span class="relative -top-1.5">0.00 mi
                </span>
              </td>
              <td class="text-c-2 text-right font-bold py-1 pr-2">
                <span class="relative -top-1.5">1,166.42 mi
                </span>
              </td>
            </tr>
            <tr style="background-color: #F2F4F7;">
              <td colspan="4" />
              <td class="text-c-2 text-right font-bold py-1">
                <span class="relative -top-1.5">Total Millage:
                </span>
              </td>
              <td class="text-c-2 text-center py-1">
                <span class="relative -top-1.5">-
                </span>
              </td>
              <td class="text-c-2 text-right font-bold py-1 pr-2">
                <span class="relative -top-1.5">1,166.42 mi
                </span>
              </td>
            </tr>
            <tr style="background-color: #F2F4F7;">
              <td colspan="4" />
              <td class="text-c-2 text-right font-bold py-1">
                <span class="relative -top-1.5">Pay Per Millage:
                </span>
              </td>
              <td class="text-c-2 text-center py-1">
                <span class="relative -top-1.5">1,166.42 mi * $0.70
                </span>
              </td>
              <td class="text-c-2 text-right font-bold py-1 pr-2">
                <span class="relative -top-1.5">$ 816.48
                </span>
              </td>
            </tr>
            <tr style="background-color: #F2F4F7;">
              <td colspan="4" />
              <td class="text-c-2 text-right font-bold py-1">
                <span class="relative -top-1.5">Driver Salary:
                </span>
              </td>
              <td class="text-c-2 text-center py-1">
                <span class="relative -top-1.5">0 mi
                </span>
              </td>
              <td class="text-c-2 text-right font-bold py-1 pr-2">
                <span class="relative -top-1.5">$ 2,000.00
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="text-c-1 font-bold mb-4">
        Recurring Payments
      </div>
      <div class="mb-5">
        <table class="text-right w-full ml-auto" style="background-color: #F2F4F7;">
          <tbody>
            <tr>
              <td class="text-c-2 font-bold py-1">
                <span class="relative -top-1.5">M&K Truck Center:
                </span>
              </td>
              <td class="text-c-2 py-1">
                <span class="relative -top-1.5 pr-2">$24.63
                </span>
              </td>
            </tr>
            <tr>
              <td class="text-c-2 font-bold py-1">
                <span class="relative -top-1.5">Check Engine Reset Charge:
                </span>
              </td>
              <td class="text-c-2 py-1">
                <span class="relative -top-1.5 pr-2">$70.00
                </span>
              </td>
            </tr>
            <tr>
              <td class="text-c-2 font-bold py-1">
                <span class="relative -top-1.5">Truck Wash:
                </span>
              </td>
              <td class="text-c-2 py-1">
                <span class="relative -top-1.5 pr-2">$56.00
                </span>
              </td>
            </tr>
            <tr>
              <td class="text-c-2 font-bold py-1">
                <span class="relative -top-1.5">TA Truck Service:
                </span>
              </td>
              <td class="text-c-2 py-1">
                <span class="relative -top-1.5 pr-2">$71.17
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="text-c-1 font-bold mb-2">
        Recurring Deducations
      </div>
      <div class="mb-4">
        <table class="w-full">
          <tr>
            <td class="text-c-2 font-bold py-2 pl-2">
              <span class="relative -top-1.5">Administrative Fee:
              </span>
            </td>
            <td class="text-c-2 ml-auto text-right py-2 pr-2">
              <span class="relative -top-1.5">$24.63
              </span>
            </td>
          </tr>
          <tr style="background-color: #F2F4F7;">
            <td class="text-c-2 font-bold py-2 pl-2">
              <span class="relative -top-1.5">Insurance Fee:
              </span>
            </td>
            <td class="text-c-2 ml-auto text-right py-2 pr-2">
              <span class="relative -top-1.5">$70.00
              </span>
            </td>
          </tr>
          <tr>
            <td class="text-c-2 font-bold py-2 pl-2">
              <span class="relative -top-1.5">Trailer Fee:
              </span>
            </td>
            <td class="text-c-2 ml-auto text-right py-2 pr-2">
              <span class="relative -top-1.5">$ 56.00
              </span>
            </td>
          </tr>
          <tr style="background-color: #F2F4F7;">
            <td class="text-c-2 font-bold py-2 pl-2">
              <span class="relative -top-1.5">Truck Lease:
              </span>
            </td>
            <td class="text-c-2 ml-auto text-right py-2 pr-2">
              <span class="relative -top-1.5">$ 71.17
              </span>
            </td>
          </tr>
          <tr>
            <td class="text-c-2 font-bold py-2 pl-2">
              <span class="relative -top-1.5">Truck Millage Lease:
              </span>
            </td>
            <td class="text-c-2 ml-auto text-right py-2 pr-2">
              <span class="relative -top-1.5">$ 56.00
              </span>
            </td>
          </tr>
          <tr style="background-color: #F2F4F7;">
            <td class="text-c-2 font-bold py-2 pl-2">
              <span class="relative -top-1.5">Tolls:
              </span>
            </td>
            <td class="text-c-2 ml-auto text-right py-2 pr-2">
              <span class="relative -top-1.5">$ 71.17
              </span>
            </td>
          </tr>
          <tr>
            <td class="text-c-2 font-bold py-2 pl-2">
              <span class="relative -top-1.5">Fue Charges:
              </span>
            </td>
            <td class="text-c-2 ml-auto text-right py-2 pr-2">
              <span class="relative -top-1.5">$ 56.00
              </span>
            </td>
          </tr>
          <tr style="background-color: #F2F4F7;">
            <td class="text-c-2 font-bold py-2 pl-2">
              <span class="relative -top-1.5">Cash Advance
              </span>
            </td>
            <td class="text-c-2 ml-auto text-right py-2 pr-2">
              <span class="relative -top-1.5">$ 71.17
              </span>
            </td>
          </tr>
        </table>
      </div>

      <div class="w-full bg-[#192038] rounded-md">
        <div class="flex flex-row py-2">
          <div class="text-c-1 font-bold text-white ml-2">
            <span class="relative -top-1.5">TOTAL
            </span>
          </div>
          <div class="text-c-1 font-bold text-white text-right mr-2 ml-auto pr-2">
            <span class="relative -top-1.5">$6,335.45
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'Pdf',
  data () {
    return {
      tableData: [
        { loadId: '113RTFQTL', pickup: 'CMH2K - Groveport, OH', delivery: 'MKE5N - Kenosha, WI', payCode: 'LEASE INSURANCE', distance: '428 mi.', deadhead: '0 mi', gross: '$ 4.800' },
        { loadId: '113RTFQTL', pickup: 'CMH2K - Groveport, OH', delivery: 'MKE5N - Kenosha, WI', payCode: 'LEASE INSURANCE', distance: '428 mi.', deadhead: '0 mi', gross: '$ 4.800' },
        { loadId: '113RTFQTL', pickup: 'CMH2K - Groveport, OH', delivery: 'MKE5N - Kenosha, WI', payCode: 'LEASE INSURANCE', distance: '428 mi.', deadhead: '0 mi', gross: '$ 4.800' }
        // Add more data as needed
      ]
    }
  }
})
</script>

<style scoped>

</style>
