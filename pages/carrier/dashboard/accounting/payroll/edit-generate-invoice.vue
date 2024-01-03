<template>
  <div class="h-full">
    <div class="pl-24 pr-28">
      <div class="flex-col justify-center items-start my-8 flex" style="flex: 0.5">
        <h3 class="font-semibold mb-1 mt-4 text-center">
          Edit Generate Invoice
        </h3>
      </div>
      <Form fclass="row my-2">
        <div class="col-6 mb-6">
          <Input
            name="payments"
            type="text"
            label="Payments"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            name="deductions"
            type="text"
            label="Deductions"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            name="driverSalary"
            type="text"
            label="Driver Salary"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            name="charges"
            type="text"
            label="Charges"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            name="profit"
            type="text"
            label="Profit"
          />
        </div>
        <div class="row mt-10 justify-between mx-0">
          <div class="col-3 ml-auto">
            <Button
              :type="ButtonTypeEnum.PRIMARY"
              :size="SizeTypeEnum.LG"
              :action="ActionTypeEnum.SUBMIT"
            >
            Save
            </Button>
          </div>
        </div>
      </Form>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
// import { mapActions } from 'vuex'
import {
  SizeTypeEnum,
  ActionTypeEnum,
  ButtonTypeEnum
} from '@/components/ts/enums'
import { SelectOption } from '@/components/ts/interfaces'
import { PermitsDetails } from '@/models/permits/permitsDetails'
export default Vue.extend({
  props: {
    editId: {
      type: [String, Number],
      default: null
    }
  },
  data () {
    return {
      SizeTypeEnum,
      ActionTypeEnum,
      ButtonTypeEnum,
      testOptions: [
        { id: 1, text: 'Cameron Williamson', selected: false },
        { id: 2, text: 'Other Option', selected: false }
      ] as SelectOption[]
    }
  }
//   computed: {
//     permit (): PermitsDetails {
//       return this.$store.getters['permits/permit']
//     }
//   },
//   mounted () {
//     this.getPermit(this.editId).then(() => {
//       this.request = { ...this.permit }
//     })
//   },
//   methods: {
//     ...mapActions({
//       getPermit: (action, id) => action('permits/getPermit', id),
//       updatePermit: (action, params) => action('permits/updatePermit', params)
//     }),
//     handleSumbit (): void {
//       this.updatePermit(this.request).then(() => {
//         this.$emit('close-drawer')
//       })
//     }
//   }
})
</script>
