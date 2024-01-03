<template>
  <div class="centered-layout ">
    <div class="absolute top-14 left-14">
      <nuxt-link to="/">
        <img
          src="/images/Logo_White.png"
          class="max-h-8"
          alt="Nebula GTS"
        >
      </nuxt-link>
    </div>
    <div class="content">
      <Nuxt />
    </div>
  </div>
</template>

<script>
export default {
  middleware: 'secureAuth'
}
</script>

<style>
.centered-layout {
  @apply relative w-full min-h-screen overflow-hidden bg-sidebar-bg bg-rotate-pattern bg-no-repeat bg-center bg-cover flex items-center justify-items-stretch md:justify-center;
}
.centered-layout .content {
  @apply sm:w-[90%] xl:w-[30%] lg:rounded-3xl lg:mx-0 lg:p-0 xl:min-h-[700px] w-full mx-4  px-6 py-8  flex items-center overflow-hidden bg-white rounded-xl  dark:bg-[#21293B] relative;
}
</style>
