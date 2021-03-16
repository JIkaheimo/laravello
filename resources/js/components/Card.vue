<template>
  <div class="wrapper">
    <div v-if="!isEditing" class="group card-wrapper">
      <h4 class="px-2 overflow-x-auto">{{ title }}</h4>
      <div class="card-btn-container">
        <icon-button
          class="p-2"
          alt="Edit card"
          :src="editIcon"
          :disabled="!isEnabled"
          @click="isEditing = true"
        />

        <icon-button
          class="p-2"
          alt="Delete card"
          :src="removeIcon"
          :disabled="!isEnabled"
          @click="removeCard"
        />
      </div>
    </div>
    <CardEditor
      v-else
      buttonText="Confirm"
      :initialText="title"
      @edited="$emit('edited', { ...$event, id })"
      @closed="isEditing = false"
    />
  </div>
</template>

<script>
import { EditIcon, CloseIcon } from "./../../assets";
import CardEditor from "./CardEditor";

export default {
  components: {
    CardEditor,
  },

  data() {
    return {
      isEnabled: true,
      isEditing: false,
    };
  },

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

  emits: ["removed", "edited", "editor-toggled"],

  methods: {
    removeCard() {
      this.isEnabled = false;
      const { id } = this;
      this.$emit("removed", { id });
    },
  },

  watch: {
    isEditing(state) {
      this.$emit("editor-toggled", { state });
    },
  },

  created() {
    this.editIcon = EditIcon;
    this.removeIcon = CloseIcon;
  },
};
</script>

<style lang="postcss" scoped>
.card-wrapper {
  @apply flex items-center justify-between shadow-card bg-white rounded-sm cursor-pointer text-sm  mb-2;
}

.card-btn-container {
  @apply opacity-0 group-hover:opacity-80 transition-opacity ease-out duration-300;
}
</style>
