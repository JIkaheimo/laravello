<template>
  <div>
    <textarea
      class="rounded-md shadow-card py-1 px-2 outline-none w-full text-gray-900 text-sm bg-white h-16 resize-none"
      placeholder="Enter a title for a card..."
      v-model="title"
      ref="titleTextarea"
      @keydown.enter.prevent=""
      @keyup.enter="addCard"
      @keyup.esc="close"
    ></textarea>
  </div>
  <div class="flex mt-2">
    <button @click="addCard" class="btn shadow-card" :disabled="!isAllowed">
      Add Card
    </button>
    <button @click="close" class="btn btn-transparent ml-2">
      <svg
        class="w-4 h-4"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </button>
  </div>
</template>

<script>
export default {
  emits: ["close", "addCard"],

  data() {
    return {
      title: "",
    };
  },

  computed: {
    isAllowed() {
      return this.title.length > 0;
    },
  },

  methods: {
    addCard() {
      this.$emit("addCard", { title: this.title });
      this.close();
    },

    close() {
      this.$emit("close");
    },
  },

  mounted() {
    this.$refs.titleTextarea.focus();
  },
};
</script>
