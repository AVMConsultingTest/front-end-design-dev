<template>
  <div
    class="dropzone-container"
    @dragover="dragover"
    @dragleave="dragleave"
    @drop="drop"
  >
    <label :for="fInputId" class="block">
      <span
        v-if="label"
        class="font-medium text-b-4 mb-1 transition-all duration-200 flex items-center"
        :class="[
          {'text-secondary dark:text-grey-dark-100' : files.length === 0 },
          {'text-gray-400 dark:text-grey-dark-400' : files.length > 1 },
        ]"
      >{{ label }}
        <span v-if="hint" v-tooltip="hint" class="ml-2 cursor-pointer" :title="hint">
          <Icon
            icon="info-circle"
            color="grey-dark"
            :alpha="200"
            class="w-4 h-4"
            :disable-fill="true"
          />
        </span>
      </span>
      <div v-if="mini" class="flex items-center cursor-pointer">
        <div class="w-16 flex items-center justify-center rounded-lg text-[#192038] bg-white border border-gray-200 hover:border-gray-300 min-h-[2.5rem] text-b-3">
          <Icon
            icon="document-upload"
            color="green"
            variant="linear"
            :alpha="600"
            class="w-4 h-4"
            :disable-fill="true"
          />
          <input
            :id="fInputId"
            v-bind="$attrs"
            ref="file"
            :name="name"
            type="file"
            class="text-b-4 text-secondary opacity-0 absolute w-0 h-0"
            v-on="listeners"
          >
        </div>
        <div v-if="files.length" class="preview-container pl-2">
          <div :key="files[0].name" class="preview-card row items-start justify-between">
            <div class="col-6 text-left text-b-4">
              <p class="text-[#2B2E3A] block">
                {{ files[0].name }}
              </p>
              <p class="block text-gray-400 text-c-2">
                {{ Math.round(files[0].size / (1024*1024)).toFixed(2) + "mb" }}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div
        v-else
        class="border border-dashed border-[#B1B2B8] rounded-lg p-4 flex flex-col cursor-pointer"
        :class="{'p-10 items-center justify-center' : files.length === 0}"
      >
        <div v-if="files.length === 0" class="mb-4">

          <svg width="40" height="36" viewBox="0 0 40 36" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4.5 30C4.5 29.7239 4.27614 29.5 4 29.5C2.067 29.5 0.5 27.933 0.5 26V4C0.5 2.067 2.067 0.5 4 0.5H36C37.933 0.5 39.5 2.067 39.5 4V20.9901V21.0084V26C39.5 27.933 37.933 29.5 36 29.5C35.7239 29.5 35.5 29.7239 35.5 30V32C35.5 33.933 33.933 35.5 32 35.5H8C6.067 35.5 4.5 33.933 4.5 32V30ZM32.5 30C32.5 29.7239 32.2761 29.5 32 29.5H8C7.72386 29.5 7.5 29.7239 7.5 30V32C7.5 32.2761 7.72386 32.5 8 32.5H32C32.2761 32.5 32.5 32.2761 32.5 32V30ZM36 26.5C36.2761 26.5 36.5 26.2761 36.5 26V22V21.7604C36.5 21.6379 36.4551 21.5197 36.3737 21.4282L30.1659 14.4444C29.9865 14.2427 29.6795 14.2197 29.4721 14.3925L18.9603 23.1523C18.5025 23.5338 17.8622 23.6082 17.3292 23.3416L10.4062 19.8802C10.2406 19.7973 10.0427 19.8129 9.89199 19.9205L3.87186 24.2206C3.83183 24.2492 3.79099 24.2755 3.74951 24.2995C3.59508 24.3889 3.5 24.5538 3.5 24.7322V26C3.5 26.2761 3.72386 26.5 4 26.5H6H8H32H34H36ZM35.6263 16.0718C35.7642 16.2269 35.9837 16.2807 36.1777 16.207C36.3717 16.1332 36.5 15.9472 36.5 15.7396V8V4C36.5 3.72386 36.2761 3.5 36 3.5H32H8H4C3.72386 3.5 3.5 3.72386 3.5 4V8V19.8279C3.5 20.0152 3.60467 20.1868 3.77121 20.2725C3.93774 20.3582 4.13821 20.3436 4.29062 20.2348L9.12814 16.7794C9.58027 16.4565 10.1739 16.4099 10.6708 16.6584L17.5009 20.0734C17.6786 20.1622 17.892 20.1375 18.0446 20.0103L29.0397 10.8477C29.6618 10.3292 30.5831 10.3982 31.1211 11.0035L35.6263 16.0718ZM14.5 11C14.5 9.61929 15.6193 8.5 17 8.5C18.3807 8.5 19.5 9.61929 19.5 11C19.5 12.3807 18.3807 13.5 17 13.5C15.6193 13.5 14.5 12.3807 14.5 11Z" fill="#979CB7" stroke="white" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </div>
        <div v-if="isDragging" class="text-c-1 font-medium">Release to drop files here.</div>
        <div v-else-if="files.length === 0" class="text-c-1 font-medium text-gray-400 text-center">
          Drag & drop your file here, or
          <span class="text-[#313A4B]">browse</span>
          <span class="text-c-1 font-normal text-gray-400 block mt-1">Max 5MB &Supports .jpg, .png</span>
        </div>
        <input
          :id="fInputId"
          v-bind="$attrs"
          ref="file"
          :name="name"
          type="file"
          class="text-b-4 text-secondary opacity-0 absolute w-0 h-0"
          v-on="listeners"
        >
        <div v-if="files.length" class="preview-container mt-4">
          <div v-for="file in files" :key="file.name" class="preview-card row items-start justify-between">
            <div class="col-3">
              <img :src="createURL(file)" :alt="file.name" class="w-14 h-14 rounded-lg object-contain">
            </div>
            <div class="col-6 text-left text-b-4">
              <p class="text-[#2B2E3A] block">
                {{ file.name }}
              </p>
              <p class="block text-gray-400 text-c-2">
                {{ Math.round(file.size / (1024*1024)).toFixed(2) + "mb" }}
              </p>
            </div>
            <div class="col-2">
              <Button
                type="button"
                size="md"
                title="Remove file"
                class="bg-gray-300"
                @click="remove(files.indexOf(file))"
              >
                <svg
                  slot="icon"
                  width="12"
                  height="14"
                  viewBox="0 0 12 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M8.83983 2.33301L8.66667 2.33301C8.66667 1.22844 7.77124 0.333008 6.66667 0.333008H5.33333C4.22876 0.333008 3.33333 1.22844 3.33333 2.33301L2.89552 2.33301L2.66667 2.33301L2.66588 2.33301L0.666667 2.33301C0.298477 2.33301 0 2.63148 0 2.99967C0 3.36786 0.298477 3.66634 0.666667 3.66634L1.33333 3.66634L1.33333 11.6663C1.33333 12.7709 2.22877 13.6663 3.33333 13.6663H8.66667C9.77124 13.6663 10.6667 12.7709 10.6667 11.6663L10.6667 3.66634L11.3333 3.66634C11.7015 3.66634 12 3.36786 12 2.99967C12 2.63148 11.7015 2.33301 11.3333 2.33301L9.33456 2.33301L9.33333 2.33301L8.83983 2.33301ZM9.33333 3.66634H8L7.33333 3.66634L4.66667 3.66634L4 3.66634L2.66667 3.66634L2.66667 4.99967L2.66667 11.6663C2.66667 12.0345 2.96514 12.333 3.33333 12.333H8.66667C9.03486 12.333 9.33333 12.0345 9.33333 11.6663L9.33333 4.99967V3.66634ZM4.66667 2.33301H5.33333H6H6.66667H7.33333C7.33333 1.96482 7.03486 1.66634 6.66667 1.66634L5.33333 1.66634C4.96514 1.66634 4.66667 1.96482 4.66667 2.33301ZM4.66667 4.99967C5.03486 4.99967 5.33333 5.29815 5.33333 5.66634V10.333C5.33333 10.7012 5.03486 10.9997 4.66667 10.9997C4.29848 10.9997 4 10.7012 4 10.333V5.66634C4 5.29815 4.29848 4.99967 4.66667 4.99967ZM8 5.66634C8 5.29815 7.70152 4.99967 7.33333 4.99967C6.96514 4.99967 6.66667 5.29815 6.66667 5.66634V10.333C6.66667 10.7012 6.96514 10.9997 7.33333 10.9997C7.70152 10.9997 8 10.7012 8 10.333V5.66634Z" fill="white" />
                </svg>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </label>
    <div v-if="showProgress" class="">
      <span>Progress: {{ currentProgress }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { Ref, ref } from 'vue'
import { SizeTypeEnum, ActionTypeEnum, ButtonTypeEnum } from '~/components/ts/enums'
export default Vue.extend({
  name: 'FileInput',
  props: {
    name: {
      type: String,
      default: null
    },
    label: {
      type: String,
      default: null
    },
    hint: {
      type: String,
      default: null
    },
    showProgress: {
      type: Boolean,
      default: false
    },
    mini: {
      type: Boolean,
      default: false
    }
  },
  setup (props) {
    if (props.showProgress) {
      const eventNames: Array<keyof FileReaderEventMap> = [
        'loadstart',
        'load',
        'loadend',
        'progress',
        'error',
        'abort'
      ]
      const reader = new FileReader()
      const fileUrl: Ref<string | ArrayBuffer | null> = ref(null)
      const totalSize: Ref<number> = ref(0)
      const currentProgress: Ref<string> = ref('0%')
      function handleEvent (event: ProgressEvent) {
        if (['loadend', 'load'].includes(event.type)) {
          console.log('finished loading file')
          currentProgress.value = 'Finished loading file'
          fileUrl.value = reader.result
        }
        if (event.type === 'progress') {
          currentProgress.value = `${((event.loaded / totalSize.value) as any).toFixed(2) * 100}%`
          console.log('Progress: ', currentProgress.value)
          console.log('Bytes transferred: ', event.loaded, 'bytes')
        }
        if (event.type === 'loadstart') {
          totalSize.value = event.total
        }
      }
      function addListeners (reader: FileReader) {
        eventNames.forEach((event) => {
          reader.addEventListener(event, handleEvent)
        })
      }
      function handleSelected (e: ProgressEvent<HTMLInputElement>) {
        console.log(e.type)
        const selectedFile = ((e.target as HTMLInputElement).files as FileList)[0]
        if (selectedFile) {
          addListeners(reader)
          reader.readAsDataURL(selectedFile)
        }
      }
      return {
        handleSelected,
        fileUrl,
        currentProgress
      }
    }
  },
  data () {
    return {
      isDragging: false,
      files: [] as File[],
      fInputId: '',
      SizeTypeEnum,
      ActionTypeEnum,
      ButtonTypeEnum
    }
  },
  computed: {
    listeners () {
      return {
        ...this.$listeners,
        change: this.onChange
      }
    }
  },
  mounted () {
    this.fInputId = Math.random().toString(16).slice(2)
  },
  methods: {
    onChange (): void {
      this.files = [...this.$refs.file.files]
      this.$emit('change', this.files)
    },
    dragover (e: DragEvent): void {
      e.preventDefault()
      this.isDragging = true
    },
    dragleave (): void {
      this.isDragging = false
    },
    drop (e: DragEvent): void {
      e.preventDefault()
      this.$refs.file.files = (e.dataTransfer as DataTransfer).files
      this.onChange()
      this.isDragging = false
    },
    remove (i: number): void {
      this.files.splice(i, 1)
    },
    createURL (file: Blob | MediaSource) {
      console.log(file, URL)
      return URL.createObjectURL(file)
    }
  }
})
</script>

<style>
</style>
