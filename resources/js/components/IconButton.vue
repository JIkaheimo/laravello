<template>
  <button class="icon-button btn btn-transparent">
    <img class="icon" svg-inline svg-sprite :src="src" :alt="alt" />
    <span class="icon-button-text" v-if="text">{{ text }}</span>
  </button>
</template>

<script>
export default {
  props: {
    src: {
      type: String,
      required: true,
    },
    alt: {
      type: String,
      default: () => "No description",
    },
    text: {
      type: String,
      default: () => "",
    },
  },
};
</script>

<style lang="postcss" scoped>
.icon {
  @apply inline;
}

.icon-button {
  @apply px-1 opacity-60 hover:opacity-100;
}

.icon-button-text {
  @apply ml-1;
}
</style>
