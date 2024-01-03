<template>
    <table>
      <thead>
        <tr v-if="groupedHeaders.length">
          <th v-for="(group, index) in groupedHeaders" :key="index" :colspan="group.colspan">{{ group.title }}</th>
        </tr>
        <tr>
          <th v-for="(header, index) in headers" :key="index">{{ header }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, rowIndex) in data" :key="rowIndex">
          <td v-for="(header, index) in headers" :key="index">{{ row[header] }}</td>
        </tr>
      </tbody>
    </table>
  </template>
  
  <script>
  export default {
    name: 'TableTest',
    props: {
      headers: {
        type: Array,
        required: true
      },
      groupedHeaders: {
        type: Array,
        default: () => []
      },
      data: {
        type: Array,
        required: true
      }
    }
  }
  </script>
  