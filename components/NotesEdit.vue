<template>
  <div>
    <div slot="actions" class="flex justify-end">
      <div class="flex items-center justify-center">
        <div class="row items-center relative cursor-pointer">
          <transition name="">
            <div class="absolute left-4 right-0 w-20 shadow-2xl">
              <ul class="py-5">
                <li
                  v-for="(action, index) in generateActions"
                  :key="index"
                  class="text-c-1 font-medium text-gray-800 w-full flex justify-center items-center cursor-pointer text-center"
                  :class="[{ 'mb-7': index !== generateActions.length - 1 }]"
                >
                  {{ action }}
                </li>
                <div class="flex justify-center items-center">
                  <div v-if="viewEnabled" class="flex justify-center items-center mr-2">
                    <div @click="showViewModal()">
                      <Icon
                        icon="eye"
                        variant="linear"
                        :alpha="400"
                        :disable-fill="true"
                        color="gray"
                        class="w-4 h-4 mx-0.5"
                      />
                    </div>
                  </div>
                  <div v-if="addEnabled && temp[notePropKey]?.length === 0" @click="showAddModal()">
                    <Icon
                      icon="add"
                      variant="linear"
                      :alpha="1000"
                      :disable-fill="true"
                      color="black"
                      class="w-4 h-4 mx-0.5"
                    />
                  </div>
                  <div v-if="editEnabled && temp[notePropKey]?.length > 0" @click="showEditModal()">
                    <Icon
                      icon="edit"
                      variant="linear"
                      :alpha="1000"
                      :disable-fill="true"
                      color="blue"
                      class="w-4 h-4 mr-2"
                    />
                  </div>
                  <div v-if="deleteEnabled && temp[notePropKey]?.length > 0" @click="showDeleteModal()">
                    <Icon
                      icon="trash"
                      variant="linear"
                      :alpha="600"
                      :disable-fill="true"
                      color="red"
                      class="w-4 h-4 mx-0.5"
                    />
                  </div>
                </div>
              </ul>
            </div>
          </transition>
        </div>
      </div>
    </div>

    <Modal ref="addModal" size="sm" position="center">
      <div slot="body" class="row flex items-center justify-center pt-16 pb-14">
        <div class="col-8 items-center justify-center">
          <h3 class="font-semibold text-center mb-2">
            Add Notes
          </h3>
        </div>
        <div class="col-8 mt-10">
          <Form fclass="row my-2" @send="edit($refs.addModal)">
            <div class="col-12 mb-6">
              <label
                for="message"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              />
              <textarea
                id="message"
                v-model="temp[notePropKey]"
                rows="6"
                class="block p-2.5 w-full text-sm text-gray-900 max-h-64 min-h-[150px] rounded-lg border border-gray-300 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            <div class="col-12 flex justify-around items-baseline">
              <div class="col-6">
                <Button
                  :size="SizeTypeEnum.LG"
                  :action="ActionTypeEnum.SUBMIT"
                  class="!bg-orange-700 !text-white max-w-max p-4"
                >
                  Add Notes
                </Button>
              </div>
              <div class="col-auto ml-auto">
                <Button
                  :type="ButtonTypeEnum.PRIMARY"
                  :size="SizeTypeEnum.LG"
                  :action="ActionTypeEnum.BUTTON"
                  class="mt-2 max-w-max p-4"
                  @click="hideAddModal()"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </Form>
        </div>
      </div>
    </Modal>

    <Modal ref="editModal" size="sm" position="center">
      <div slot="body" class="row flex items-center justify-center pt-16 pb-14">
        <div class="col-8 items-center justify-center">
          <h3 class="font-semibold text-center mb-2">
            Edit Notes
          </h3>
        </div>
        <div class="col-8 mt-10">
          <Form fclass="row my-2" @send="edit($refs.editModal)">
            <div class="col-12 mb-6">
              <label
                for="message"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              />
              <textarea
                id="message"
                v-model="temp[notePropKey]"
                rows="6"
                class="block p-2.5 w-full text-sm text-gray-900 max-h-64 min-h-[150px] rounded-lg border border-gray-300 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            <div class="col-12 flex justify-around items-baseline">
              <div class="col-6">
                <Button
                  :size="SizeTypeEnum.LG"
                  :action="ActionTypeEnum.SUBMIT"
                  class="!bg-orange-700 !text-white max-w-max p-4"
                >
                  Save Notes
                </Button>
              </div>

              <div class="col-auto ml-auto">
                <Button
                  :type="ButtonTypeEnum.PRIMARY"
                  :size="SizeTypeEnum.LG"
                  :action="ActionTypeEnum.BUTTON"
                  class="mt-2 max-w-max p-4"
                  @click="hideEditModal()"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </Form>
        </div>
      </div>
    </Modal>

    <Modal ref="deleteModal" size="sm" position="center">
      <div slot="body" class="row flex items-center justify-center pt-16 pb-14">
        <div class="col-8 items-center justify-center">
          <Icon
            icon="trash"
            variant="bulk"
            :alpha="0"
            :disable-fill="false"
            color="lime"
            class="h-28 mr-auto ml-auto rounded-full bg-[#F8E8E8] p-6"
          />
          <h3 class="font-semibold text-center mt-6 mb-2">
            Are you sure to delete?
          </h3>
          <div class="pt-16">
            <Button
              class="text-white bg-lime hover:bg-none"
              @click="deleteAction()"
            >
              Yes, delete it
            </Button>
            <Button
              class="text-gray bg-inherit hover:bg-inherit"
              @click="hideDeleteModal()"
            >
              No, don’t delete it
            </Button>
          </div>
        </div>
      </div>
    </Modal>

    <Modal ref="viewModal" size="sm" position="center">
      <div slot="body" class="row flex items-center justify-center pt-16 pb-14">
        <div class="col-8 items-center justify-center">
          <h3 class="font-semibold text-center mb-2">
            Your Notes
          </h3>
        </div>
        <div class="col-8 mt-10">
          <Form fclass="row my-2">
            <div
              class="col-12 mb-6"
              :class="[
                { 'text-center' : temp[notePropKey]?.length === 0}
              ]"
            >
              {{ temp[notePropKey]?.length > 0 ? temp[notePropKey] : 'No notes' }}
            </div>
            <div class="col-12 flex justify-around items-baseline">
              <div v-if="viewEnabled" class="col-auto mx-auto">
                <Button
                  :type="ButtonTypeEnum.PRIMARY"
                  :size="SizeTypeEnum.LG"
                  :action="ActionTypeEnum.BUTTON"
                  class="mt-2 max-w-max p-4"
                  @click="hideViewModal()"
                >
                  Close
                </Button>
              </div>
            </div>
          </Form>
        </div>
      </div>
    </Modal>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {
  SizeTypeEnum,
  ButtonTypeEnum,
  ActionTypeEnum
} from '~/components/ts/enums'
export default Vue.extend({
  layout: 'NotesEdit',
  props: {
    // The item to be edited
    // The item will be passed to the edit function
    // e.g. { id: 1, name: 'John Doe', age: 30 }
    // default: {}
    item: {
      type: Object,
      default: () => {
        return {}
      }
    },
    // The key of the note property
    // e.g. 'notes'
    // default: ''
    notePropKey: {
      type: String,
      default: ''
    },
    // Enables/disables the view button
    // default: true
    viewEnabled: {
      type: Boolean,
      default: true
    },
    // Enables/disables the add button
    // default: true
    addEnabled: {
      type: Boolean,
      default: true
    },
    // Enables/disables the edit button
    // default: true
    editEnabled: {
      type: Boolean,
      default: true
    },
    // Enables/disables the delete button
    // default: true
    deleteEnabled: {
      type: Boolean,
      default: true
    },
    // Function to be called when add/edit/delete button is clicked
    // e.g. (item) => { axios.post('/api/notes', item) }
    // default: null
    editFunction: {
      type: Function,
      default: null
    }
  },
  data () {
    return {
      SizeTypeEnum,
      ActionTypeEnum,
      ButtonTypeEnum,
      opened: false,
      temp: {} as { [x:string]: any },
      generateActions: []
    }
  },
  created () {
    this.temp = this.item
  },
  methods: {
    // Edit function that edits the item
    // and closes the modal according to the given modalRef
    edit (modalRef: any): void {
      if (this.editFunction) { this.editFunction({ ...this.temp }) }
      modalRef.hideModal()
    },
    deleteAction (): void {
      this.temp[this.notePropKey] = ''
      this.edit(this.$refs.deleteModal)
    },
    showAddModal () {
      this.$refs.addModal.showModal()
    },
    showEditModal () {
      (this.$refs.editModal as Vue & { showModal: () => Element }).showModal()
    },
    showDeleteModal () {
      (this.$refs.deleteModal as Vue & { showModal: () => Element }).showModal()
    },
    showViewModal () {
      (this.$refs.viewModal as Vue & { showModal: () => Element }).showModal()
    },
    hideAddModal (): void {
      (this.$refs.addModal as Vue & { hideModal: () => Function }).hideModal()
    },
    hideEditModal (): void {
      (this.$refs.editModal as Vue & { hideModal: () => Function }).hideModal()
    },
    hideDeleteModal (): void {
      (this.$refs.deleteModal as Vue & { hideModal: () => Function }).hideModal()
    },
    hideViewModal (): void {
      (this.$refs.viewModal as Vue & { hideModal: () => Function }).hideModal()
    }
  }
})
</script>
