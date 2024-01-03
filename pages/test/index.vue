<template>
  <div>
    <div v-if="false" class="row mx-0 flex-col items-center justify-around gap-14">
      <div class="col-6">
        <Button
          :type="ButtonTypeEnum.PRIMARY"
          :size="SizeTypeEnum.LG"
          :action="ActionTypeEnum.BUTTON"
          @click="()=> $router.push('/carrier/dashboard')"
        >
          Dashboard
          <Icon
            slot="icon"
            icon="arrow-right-2"
            color="white"
            variant="outline"
            :alpha="0"
            class="w-5 h-5 ml-3"
          />
        </Button>
      </div>
      <div class="col-6">
        <Button
          :type="ButtonTypeEnum.PRIMARY"
          :size="SizeTypeEnum.LG"
          :action="ActionTypeEnum.BUTTON"
          @click="()=> $router.push('/request-free-demo')"
        >
          Request for demo
          <Icon
            slot="icon"
            icon="arrow-right-2"
            color="white"
            variant="outline"
            :alpha="0"
            class="w-5 h-5 ml-3"
          />
        </Button>
      </div>
      <div class="col-6">
        <Button
          :type="ButtonTypeEnum.PRIMARY"
          :size="SizeTypeEnum.LG"
          :action="ActionTypeEnum.BUTTON"
          @click="()=> $router.push('/signup')"
        >
          Sign Up
          <Icon
            slot="icon"
            icon="arrow-right-2"
            color="white"
            variant="outline"
            :alpha="0"
            class="w-5 h-5 ml-3"
          />
        </Button>
      </div>
      <div class="col-6">
        <Button
          :type="ButtonTypeEnum.PRIMARY"
          :size="SizeTypeEnum.LG"
          :action="ActionTypeEnum.BUTTON"
          @click="()=> $router.push('/signin')"
        >
          Sign In
          <Icon
            slot="icon"
            icon="arrow-right-2"
            color="white"
            variant="outline"
            :alpha="0"
            class="w-5 h-5 ml-3"
          />
        </Button>
      </div>
      <div class="col-6">
        <Button
          :type="ButtonTypeEnum.PRIMARY"
          :size="SizeTypeEnum.LG"
          :action="ActionTypeEnum.BUTTON"
          @click="()=> $router.push('/landing-page')"
        >
          Landing Page
          <Icon
            slot="icon"
            icon="arrow-right-2"
            color="white"
            variant="outline"
            :alpha="0"
            class="w-5 h-5 ml-3"
          />
        </Button>
      </div>
    </div>
    <div>
      <NuxtLoading />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapActions } from 'vuex'
// import NuxtLoading from './-loading.vue'
import { SizeTypeEnum, ActionTypeEnum, ButtonTypeEnum } from '~/components/ts/enums'
export default Vue.extend({
  name: 'IndexPage',
  // components: { NuxtLoading },
  // layout: 'Splitted',
  data () {
    return {
      SizeTypeEnum, ActionTypeEnum, ButtonTypeEnum
    }
  },
  created () {
    console.log(this.$route.query.code)
    if (this.$route.query.code) {
      console.log('test:query', this.$route.query.code)
      this.getAccessToken(this.$route.query.code)
    }
    this.$router.push('/landing-page')
  },
  methods: {
    ...mapActions({
      getAccessToken: (action, param) => action('getAccessToken', param)
    })
  }
})
</script>
