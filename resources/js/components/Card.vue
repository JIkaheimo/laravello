<template>
  <div
    class="group flex items-center justify-between shadow-card bg-white rounded-sm cursor-pointer text-sm hover:bg-gray-100 mb-2"
  >
    <p class="h-full px-2">{{ title }}</p>
    <div
      class="flex opacity-0 group-hover:opacity-80 h-full transition-opacity ease-out duration-300"
    >
      <button class="btn btn-transparent p-2">
        <img
          svg-inline
          svg-sprite
          class="icon w-5 h-5"
          src="../../assets/Edit.svg"
          alt="example"
        />
      </button>
      <button class="btn btn-transparent p-2" @click="removeCard">
        <img
          svg-inline
          svg-sprite
          class="icon w-5 h-5"
          src="../../assets/Close.svg"
          alt="example"
        />
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
  },

  emits: ["remove"],

  methods: {
    removeCard() {
      this.$emit("remove", { id: this.id });
    },
  },
};
</script>
