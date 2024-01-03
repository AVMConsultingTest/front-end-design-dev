<template>
  <div class="flex mt-5 border-b border-b-grey-blue-200 pb-5">
    <img :src="picture" class="rounded-full w-10 h-10 col-auto ">
    <div class="block ">
      <span class="col-auto pl-3 text-b-4 font-bold">
        {{ name }}
      </span>
      <p class="col-auto text-b-4 font-normal pl-3">
        {{ comment }}
      </p>
      <div class="flex mx-1 flex-wrap pl-3 stars-color">
        <div v-for="index in calculateStars" :key="index" class="mt-5">
          <Icon
            class="w-4 h-4"
            icon="star-normal"
            variant="bold"
            color="orange"
          />
        </div>
      </div>
    </div>
    <div class="col-auto ml-auto flex justify-around">
      <span class="text-c-1">
        {{ date }}
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'ProfileComment',
  props: {
    name: {
      type: String,
      default: '',
      required: true
    },
    starCount: {
      type: Number,
      default: 1,
      required: true
    },
    picture: {
      type: String,
      default: ''
    },
    comment: {
      type: String,
      default: ''
    },
    date: {
      type: String,
      default: ''
    }
  },
  computed: {
    calculateStars () {
      const result = Math.round(this.starCount / 20)
      return result
    }
  }
})
</script>
