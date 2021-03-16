<template>
  <div class="page">
    <TheHeader />
    <Board />
    <TheFooter class="fixed bottom-0" />
  </div>
</template>

<script>
import { Board, TheHeader, TheFooter } from "./components";

export default {
  components: {
    Board,
    TheHeader,
    TheFooter,
  },
};
</script>

<style lang="postcss" scoped>
.page {
  @apply h-full flex flex-col items-stretch bg-blue-400;
}
</style>
