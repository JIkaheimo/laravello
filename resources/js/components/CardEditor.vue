<template>
  <div class="card-editor">
    <div>
      <textarea
        class="textarea"
        placeholder="Enter a title for a card..."
        v-model="title"
        rows="2"
        draggable="false"
        ref="titleTextarea"
        @keydown.enter.prevent=""
        @keyup.enter="onEdit"
        @keyup.esc="close"
      ></textarea>
      <span class="card-editor-title-hint">{{ hintText }}</span>
    </div>

    <div class="flex mt-1">
      <button @click="onEdit" class="btn shadow-card" :disabled="!isAllowed">
        {{ buttonText }}
      </button>

      <icon-button
        class="ml-1"
        @click="close"
        :src="closeIcon"
        alt="Close editor"
      />
    </div>
  </div>
</template>

<script>
import { CloseIcon } from "../../assets";
import { capitalized } from "../utils";

export default {
  emits: ["closed", "edited"],

  data() {
    return {
      title: this.initialText,
    };
  },

  props: {
    maxLength: {
      type: Number,
      required: false,
      default: () => 50,
    },
    buttonText: {
      type: String,
      required: false,
      default: () => "Confirm",
    },
    initialText: {
      type: String,
      required: false,
      default: () => "",
    },
  },

  computed: {
    isAllowed() {
      return this.title.length > 0;
    },
    hintText() {
      return `${this.title.length}/${this.maxLength}`;
    },
    allowEdit() {
      return this.title.length < this.maxLength;
    },
  },

  watch: {
    title(newTitle) {
      newTitle = newTitle.slice(0, this.maxLength);
      if (!newTitle.length) return;
      this.title = capitalized(newTitle);
    },
  },

  methods: {
    onEdit() {
      this.$emit("edited", { title: this.title });
      this.close();
    },

    close() {
      this.$emit("closed");
    },
  },

  created() {
    this.closeIcon = CloseIcon;
  },

  mounted() {
    this.$refs.titleTextarea.focus();
  },
};
</script>

<style lang="postcss" scoped>
.card-editor {
  @apply relative;
}

.card-editor-title-hint {
  @apply absolute bottom-1 right-1 text-xs text-gray-400;
}
</style>
