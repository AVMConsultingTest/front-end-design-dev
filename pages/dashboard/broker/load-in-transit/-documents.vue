<template>
  <div class="mt-10 mb-40">
    <div class="row -mx-2.5">
      <div v-for="(document, index) in documents" :key="index" class="col-4 px-2.5">
        <div class="p-6 mb-4 rounded-xl transition-all duration-500 hover:border-transparent dark:bg-[#21293B] shadow-md shadow-gray-500/10 dark:shadow-none">
          <div class="relative flex flex-col">
            <img :src="`/images/${document.document_type}-icon.png`" alt="pdf-file" class="w-6 h-8 mb-4">
            <span class="text-b-3 font-medium text-gray-800 mb-2">
              {{ document.name }}.{{ document.document_type }}
            </span>
            <div class="flex items-center">
              <Icon
                icon="calendar"
                variant="bulk"
                color="grey-dark"
                :alpha="300"
                class="w-4 h-4 mr-1.5"
              />
              <span class="text-c-1 font-medium text-gray-400">{{ document.document_date }}</span>
            </div>
            <div class="flex items-center cursor-pointer absolute right-0 top-0">
              <Icon
                icon="more-square"
                :alpha="100"
                :disable-fill="false"
                color="grey-dark"
                class="w-6 h-6 mr-2"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'LoadDocuments',
  data () {
    return {
      documents: [
        {
          name: 'Broker-Carrier Agreement',
          document_type: 'pdf',
          document_date: '20/05/2022'
        },
        {
          name: 'Broker-Carrier Agreement',
          document_type: 'pdf',
          document_date: '20/05/2022'
        },
        {
          name: 'Broker-Carrier Agreement',
          document_type: 'pdf',
          document_date: '20/05/2022'
        },
        {
          name: 'Broker-Carrier Agreement',
          document_type: 'pdf',
          document_date: '20/05/2022'
        },
        {
          name: 'Broker-Carrier Agreement',
          document_type: 'pdf',
          document_date: '20/05/2022'
        },
        {
          name: 'Broker-Carrier Agreement',
          document_type: 'pdf',
          document_date: '20/05/2022'
        },
        {
          name: 'Broker-Carrier Agreement',
          document_type: 'pdf',
          document_date: '20/05/2022'
        },
        {
          name: 'Broker-Carrier Agreement',
          document_type: 'pdf',
          document_date: '20/05/2022'
        },
        {
          name: 'Broker-Carrier Agreement',
          document_type: 'pdf',
          document_date: '20/05/2022'
        }
      ]
    }
  }
})
</script>

<style scoped>

</style>
