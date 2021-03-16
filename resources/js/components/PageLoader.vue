<template>
  <div class="page-loader">
    <scale-loader :loading="true" :color="color" />
    <p class="text-white">{{ text }}...</p>
  </div>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: () => "Loading",
    },
    color: {
      type: String,
      default: () => "white",
    },
  },
};
</script>

<style lang="postcss" scoped>
.page-loader {
  font-family: "Akaya Telivigala", cursive;
  @apply flex h-full justify-center items-center flex-col text-xl;
}
</style>
