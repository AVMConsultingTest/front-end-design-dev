<template>
  <div>
    <span>This is a temporary page</span>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import axios from 'axios'
import * as qs from 'qs'
export default Vue.extend({
  mounted () {
    console.log(this.$route.query.code)
    // const data = qs.stringify({
    //   grant_type: 'authorization_code',
    //   client_id: '5km6pm3853laonaqt647rt0v3u',
    //   code: this.$route.query.code,
    //   redirect_uri: 'http://localhost:3000/temp',
    //   scope: 'TMSBackendResourceServer/*',
    //   status: this.$route.query.status
    // })

    // const config = {
    //   method: 'post',
    //   maxBodyLength: Infinity,
    //   url: 'https://tms-backend.auth.us-east-1.amazoncognito.com/oauth2/token',
    //   headers: {
    //     Authorization: 'Basic NWttNnBtMzg1M2xhb25hcXQ2NDdydDB2M3U6MXNiODFpbnNpOWg1OWM2NzJtODVhcGRucXA3dm8yZ2RobmdxZGh0c2k1NXRmcmRlMGp1Ng==',
    //     'Content-Type': 'application/x-www-form-urlencoded',
    //     Cookie: 'XSRF-TOKEN=d9d24c6d-6f9f-4de0-bac0-60cb5728edf0'
    //   },
    //   data
    // }

    // axios.request(config)
    //   .then((response) => {
    //     console.log(JSON.stringify(response.data))
    //   })
    //   .catch((error) => {
    //     console.log(error)
    //   })
    // const body = new URLSearchParams()
    // body.append('code', this.$route.query.code)
    // body.append('client_id', '5km6pm3853laonaqt647rt0v3u')
    // body.append('redirect_uri', 'http://localhost:3000/temp')
    // body.append('grant_type', 'authorization_code')
    // // body.append('state', this.$route.query.state)
    // const textDecoder = new TextDecoder('utf-8')
    // const encoder = new TextEncoder()
    // const test = btoa('5km6pm3853laonaqt647rt0v3u:1sb81insi9h59c672m85apdnqp7vo2gdhngqdhtsi55tfrde0ju6')
    // const byteArray = encoder.encode(test)
    // const sea = textDecoder.decode(byteArray)
    // axios.post('https://tms-backend.auth.us-east-1.amazoncognito.com/oauth2/token', body, {
    //   headers: {
    //     // 'application/json' is the modern content-type for JSON, but some
    //     // older servers may use 'text/json'.
    //     // See: http://bit.ly/text-json
    //     'Content-Type': 'application/x-www-form-urlencoded',
    //     Authorization: 'Basic ' + sea
    //   }
    // }).then(
    //   (response) => {
    //     console.log(JSON.stringify(response.data))
    //     console.log(response)
    //     console.log(JSON.stringify(response))
    //   }
    // ).catch((response) => {
    //   console.log(JSON.stringify(response.data))
    //   console.log(response)
    //   console.log(JSON.stringify(response))
    // }
    // )

    console.log(this.$route.query.code)
    axios.post('https://qo93wkhskd.execute-api.us-east-1.amazonaws.com/prod/auth', { authorization_code: this.$route.query.code },
      {
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json'
        }
      }).then(
      (response) => {
        console.log(response)
      }
    )
  }
})
</script>

<style scoped>

</style>
