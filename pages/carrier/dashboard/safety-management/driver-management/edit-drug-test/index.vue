<template>
  <div class="h-full">
    <div class="pl-24 pr-28">
      <div class="flex-col justify-center items-start my-8 flex" style="flex: 0.5">
        <h3 class="font-semibold mb-1 mt-4 text-center">
          Edit Drug Test
        </h3>
      </div>
      <Form fclass="row my-2" @send="handleSubmit">
        <div class="col-6 mb-6">
          <Input
            v-model.number="request.driver_id"
            name="driverId"
            type="number"
            label="Driver ID"
            rules="required"
          />
        </div>
        <div class="col-6 mb-6">
          <m-select
            v-model="request.type"
            :addable="true"
            :bind-text="true"
            name="testType"
            :options="testDrugType"
            label="Drug Test Type"
            rules="required"
          />
        </div>
        <div class="col-6 mb-6">
          <m-select
            v-model="request.status"
            :addable="true"
            :bind-text="true"
            name="status"
            :options="testOptions"
            label="Status"
            rules="required"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model="request.result"
            name="result"
            type="text"
            label="Result"
            rules="required"
          />
        </div>
        <!-- <div class="col-6 mb-6">
          <FileInput label="Document Upload" name="logo" />
        </div> -->
        <div class="col-6 mb-6">
          <Input
            v-model="request.date"
            name="testDate"
            type="datetime-local"
            label="Test Date"
            rules="required"
          />
        </div>
        <div class="row mt-10 justify-between mx-0">
          <div class="col-3">
            <Button
              :type="ButtonTypeEnum.LINK"
              :size="SizeTypeEnum.LG"
              :action="ActionTypeEnum.BUTTON"
              class="!justify-start"
              @click="$emit('close-drawer')"
            >
              Cancel
            </Button>
          </div>
          <div class="col-3 ml-auto">
            <Button :type="ButtonTypeEnum.PRIMARY" :size="SizeTypeEnum.LG" :action="ActionTypeEnum.SUBMIT">
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
import { mapActions } from 'vuex'
import { SelectOption } from '~/components/ts/interfaces'
import {
  SizeTypeEnum,
  ActionTypeEnum,
  ButtonTypeEnum
} from '~/components/ts/enums'
import { DrugTest } from '~/models/drugs/drugTest'
export default Vue.extend({
  name: 'EditDrugTest',
  props: {
    editId: {
      type: [String, Number],
      default: null
    }
  },
  data () {
    return {
      ButtonTypeEnum,
      ActionTypeEnum,
      SizeTypeEnum,
      showDrawer: false,
      request: {} as DrugTest,
      selectedState: 0,
      multiSelectedState: [],
      checkBoxTest: false,
      testOptions: [
        { id: 1, text: 'Completed', selected: true },
        { id: 2, text: 'Pending', selected: false },
        { id: 3, text: 'Selected', selected: false }
      ] as SelectOption[],
      testDrugType: [
        { id: 1, text: 'Pre-Employment', selected: true },
        { id: 2, text: 'Random Breath Alcohol', selected: false }
      ] as SelectOption[]
    }
  },
  computed: {
    drugtest (): DrugTest {
      return (this.$store.getters['drugTest/drugTest'])
    }
  },
  mounted () {
    this.getDrugTest(this.editId).then(() => {
      setTimeout(() => {
        console.log(this.drugtest)
        this.request = { ...this.drugtest }
      }, 1000)
    })
  },
  methods: {
    ...mapActions({
      getDrugTest: (action, id) => action('drugTest/getDrugTest', id),
      editDrugTest: (action, param) => action('drugTest/updateDrugTest', param)
    }),
    handleSubmit () {
      this.editDrugTest({ ...this.request } as DrugTest)

      this.$emit('close-drawer')
    }
  }
})
</script>

        <style>
        .m-modal-overlay {
            @apply bg-dark/80 fixed bottom-0 left-0 right-0 top-0 flex justify-center;
        }
        .m-modal-content {
            @apply bg-white rounded-3xl shadow-2xl relative overflow-hidden;
        }
        </style>
