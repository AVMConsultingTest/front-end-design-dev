<template>
  <div class="w-full">
    <div class="flex flex-col mt-10 mb-6">
      <span class="text-black text-b-3 font-medium">
        Notes
      </span>
    </div>
    <Table
      :id="tableKey"
      :key="tableKey"
      title="Notes"
      :headers="notesHeaders"
      :data="notesData"
      :search-enabled="true"
      icon="note-21"
      icon-color="orange"
      :alpha="700"
      td-container-classes="!h-[unset]"
    >
      <template #item-load="{ data, index }">
        <div class="flex items-center">
          <div class="col-auto pr-0 mr-2 mb-10">
            <img :src="data[index].avatar" :alt="data[index].load" class="rounded-full w-10 h-10">
          </div>
          <div class="col-auto">
            <span class="block whitespace-nowrap font-bold mt-3">
              {{ data[index].name }}
            </span>
            <span class="block w-[1300px] border-r border-[#92969F] mb-6">
              {{ data[index].load }}
            </span>
          </div>
        </div>
      </template>
      <template #item-date="{ data, index }">
        <div class="flex">
          <div class="col-auto text-[#92969F] pr-16">
            <span>
              {{ data[index].date }}
            </span>
          </div>
        </div>
      </template>
    </Table>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'LoadNotes',
  data () {
    return {
      notesHeaders: {
        load: {
          label: 'Load'
        },
        date: {
          label: 'Date'
        }
      },
      notesData: [
        {
          avatar: '/images/Ellipse_4.png',
          name: 'Cameron Williamson',
          load: 'Test',
          date: 'Nov 12, 2022'
        },
        {
          avatar: '/images/Ellipse_4.png',
          name: 'Brooklyn Simmons',
          load: 'Test',
          date: 'Nov 12, 2022'
        },
        {
          avatar: '/images/Ellipse_4.png',
          name: 'Albert Flores',
          load: 'Test',
          date: 'Nov 12, 2022'
        },
        {
          avatar: '/images/Ellipse_4.png',
          name: 'Annette Black',
          load: 'Test',
          date: 'Nov 12, 2022'
        }
      ]
    }
  }
})
</script>

<style scoped>

</style>
