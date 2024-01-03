<template>
  <ValidationObserver
    v-slot="{ handleSubmit }"
    ref="observer"
    tag="div"
  >
    <form :class="fclass" @submit.prevent="handleSubmit(onSubmit)">
      <slot />
    </form>
  </ValidationObserver>
</template>

<script>
export default {
  name: 'Form',
  props: {
    fclass: {
      type: String,
      default: null
    }
  },
  methods: {
    onSubmit () {
      this.$emit('send')
    }
  }
}
</script>

<style>

</style>
