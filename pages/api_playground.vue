<template>
  <div class="md:w-[1100px] mx-auto my-10 relative p-5">
    <div class="row my-5 client-test">
      <div class="col-12 md:col-6 my-5">
        <Widget :title="`Test Single Client Json (${singleId})`">
          <json-viewer :value="singleClient" class="sweet-scroll overflow-y-scroll max-h-[500px]" />
        </Widget>
      </div>
      <div class="col-12 md:col-6 my-5">
        <Widget title="Test Client List Json">
          {{ clientCount }}
          <json-viewer :value="getterClients" class="sweet-scroll overflow-y-scroll max-h-[500px]" />
        </Widget>
      </div>
      <div class="col-12 my-5">
        <Widget title="Test Client List Table">
          <table class="table-auto">
            <thead>
              <tr>
                <th>Client Id</th>
                <th>Client Name</th>
                <th>E-Mail</th>
                <th>Contact First Name</th>
                <th>Contact Last Name</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="truck in trucks" :key="truck.truck_id">
                <td>{{ truck.truck_id }}</td>
                <td>{{ truck.truck_brand }}</td>
                <td>{{ truck.truck_asset_owner }}</td>
                <td>{{ truck.truck_model_year }} <input v-model="truck.truck_model_year"></td>
                <td>{{ truck.truck_vin_number }}</td>
              </tr>
            </tbody>
          </table>
        </Widget>
      </div>
    </div>
  </div>
</template>

<script>
import JsonViewer from 'vue-json-viewer'
import { mapActions } from 'vuex'
import Widget from '~/components/Widget.vue'
export default {
  components: {
    JsonViewer,
    Widget
  },
  data () {
    return {
      singleId: 10
    }
  },
  computed: {
    getterClients () {
      return (this.$store.getters['client/clients'])
    },
    clientCount () {
      return this.$store.getters['client/clientCount']
    },
    clients () {
      return this.$store.state.client.clients
    },
    singleClient () {
      return (this.$store.getters['client/client'])
    },
    trucks () {
      return this.$store.getters['truck/trucks']
    }
  },
  mounted () {
    this.getTruckList()
  },
  methods: {
    ...mapActions({
      getList: action => action('client/list'),
      getTruckList: action => action('truck/getTrucks'),
      getClient: (action, param) => action('client/get', param)
    })
  }
}
</script>

<style scoped>

</style>

<style>

</style>
