<template>
  <Modal ref="modal" size="sm" position="center">
    <div slot="body" class="row flex items-center justify-center pt-16 pb-14">
      <div class="col-8 items-center justify-center">
        <Icon
          icon="trash"
          variant="bulk"
          :alpha="0"
          :disable-fill="false"
          color="lime"
          class=" h-28 mr-auto ml-auto rounded-full bg-[#F8E8E8] p-6"
        />
        <h3 class="font-semibold text-center mt-6 mb-2">
          Are you sure to delete?
        </h3>
        <p class="text-b-4 font-medium text-gray-400 text-center">
          {{ deleteSubtext }}
        </p>
        <div class="pt-16">
          <Button class="text-white bg-lime hover:bg-none" @click="deleteAction()">
            Yes, delete it
          </Button>
          <Button class="!text-gray !bg-white !hover:bg-slate-300" @click="hideModal()">
            No, don’t delete it
          </Button>
        </div>
      </div>
    </div>
  </Modal>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'DeleteModal',
  props: {
    deleteSubtext: {
      type: String,
      default: ''
    },
    deleteFunction: {
      type: [Function, MouseEvent],
      default: () => {}
    },
    deleteId: {
      type: Number,
      default: 0
    },
    popBack: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    hideModal (): void {
      (this.$refs.modal as Vue & { hideModal: () => Function }).hideModal()
    },
    showModal () : void {
      (this.$refs.modal as Vue & { showModal: () => Function }).showModal()
    },
    deleteAction (): void {
      this.deleteFunction(this.deleteId).then(() => {
        this.hideModal()
        if (this.popBack === true) {
          this.$router.back()
        }
      }).catch((err: unknown) => {
        console.warn(err)
      })
    }
  }
})
</script>

<style scoped>

</style>
