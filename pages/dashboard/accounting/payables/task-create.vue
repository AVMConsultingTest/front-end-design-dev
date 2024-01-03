<template>
  <div class="h-full">
    <div class="pl-24 pr28">
      <div class="flex-col justify-center items-start my-8 flex" style="flex: 0.5" />
      <Form fclass="row my-2" @send="handleSubmit">
        <div class="col-12 mb-10">
          <Input class="font-medium pb-6 mb-1 mt-4 w-full border-b" :minimal="true" />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model="request.due_date"
            name="due_date"
            type="datetime-local"
            label="Due Date"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model="request.reminder_date"
            name="reminder"
            type="datetime-local"
            label="Set Reminder"
          />
        </div>
        <div class="col-6 mb-6">
          <m-select
            v-model="request.assigned_to"
            name="assigned_to"
            :multiple="false"
            :searchable="true"
            :options="assignedOptions"
            :bind-text="true"
            :addable="true"
            label="Assing To"
          />
        </div>
        <div class="col-12 mb-6">
          <Input
            v-model="request.task_description"
            name="reminder"
            type="text"
            label="Description"
            :text-area="true"
            :rows="20"
          />
        </div>
        <div class="row mt-28 justify-between mx-0">
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
    <Modal ref="modal" size="sm" position="center">
      <div slot="body" class="row flex items-center justify-center py-16">
        <div class="col-12 flex items-center justify-center">
          <div class="bg-green-400/40 rounded-full w-40 h-40 relative">
            <svg
              width="160"
              height="160"
              viewBox="0 0 1024 1024"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="rgb(41, 45, 50)"
                d="M451.392 664.751c-8.533 0-16.64-3.413-22.613-9.387l-120.749-120.747c-12.373-12.373-12.373-32.853 0-45.227s32.853-12.373 45.227 0l98.135 98.133 219.307-219.307c12.373-12.373 32.853-12.373 45.227 0s12.373 32.853 0 45.227l-241.92 241.92c-5.973 5.973-14.080 9.387-22.613 9.387z"
                stroke="#BAF1DA"
              />
            </svg>
          </div>
        </div>
        <div class="col-8 items-center justify-center my-14">
          <h3 class="font-semibold text-center mb-2">
            Congratulations !
          </h3>
          <p class="text-b-4 font-medium text-gray-400 text-center">
            Odio eu purus imperdiet feugiat. Faucibus semper volutpat sapien, morbi neque pulvinar velit.
            Elementum sollicitudin sed sit pellentesque consectetur in neque nisl convallis.
          </p>
        </div>
        <div class="col-8">
          <Button
            :type="ButtonTypeEnum.GREEN"
            :size="SizeTypeEnum.LG"
            @click="() => { $refs.modal.hideModal() }"
          >
            Done
          </Button>
        </div>
      </div>
    </Modal>
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
import { TaskDetails } from '~/models/accounting/taskDetails/taskDetails'
export default Vue.extend({
  name: 'CreateTask',
  transition: 'page-left',
  data () {
    return {
      ButtonTypeEnum,
      ActionTypeEnum,
      SizeTypeEnum,
      request: {} as TaskDetails,
      assignedOptions: [
        { id: 1, text: 'Bill Sanders' },
        { id: 2, text: 'John Doe' }
      ] as SelectOption[]
    }
  },
  computed: {
    carrierId (): number {
      return this.$store.state.carrierId
    }
  },
  methods: {
    ...mapActions({
      addTask: (action, param) => action('accounting/taskDetails/addTask', param)
    }),
    handleSubmit () {
      this.addTask({
        ...this.request,
        carrier_id: this.carrierId,
        social_media: 'test',
        email_address: 'test',
        task_status: 'test',
        phone_number: 'test'
      })
      this.$emit('close-drawer')
    }
  }
})
</script>
