<template>
  <div class="the-header">
    <div class="ml-2 w-1/3">x</div>
    <h1 class="the-header-title">Laravello</h1>
    <div class="mr-2 w-1/3 flex justify-end">x</div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="postcss" scoped>
.the-header {
  @apply text-white flex justify-between items-center mb-2 bg-indigo-500;
  height: 3rem;
}

.the-header-title {
  @apply text-lg opacity-50 cursor-pointer hover:opacity-75 font-bold;
}
</style>
