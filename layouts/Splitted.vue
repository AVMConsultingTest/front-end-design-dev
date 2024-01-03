<template>
  <div class="w-full min-h-screen max-h-screen flex overflow-hidden">
    <div class="tw-col-[55%] items-stretch">
      <div class="m-10">
        <nuxt-link to="/">
          <img
            src="/images/Logo_White.png"
            class="max-h-10"
            alt="Nebuga GTS"
          >
        </nuxt-link>
      </div>
      <div class="h-full sweet-scroll overflow-y-scroll">
        <Nuxt />
      </div>
    </div>
    <div class="tw-col-[45%]">
      <img
        src="/images/demo_pic.png"
        class="w-full h-full object-cover"
        alt="Demo Picture"
      >
    </div>
  </div>
</template>

<script>
export default {
  name: 'Splitted',
  middleware: 'secureAuth'
}
</script>

<style></style>
