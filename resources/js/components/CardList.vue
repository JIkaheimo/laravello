<template>
  <div class="list bg-gray-300 rounded-sm p-2 mr-2 border-gray-700">
    <div class="flex justify-between">
      <div class="text-gray-800 pl-2 pb-2 font-bold">{{ title }}</div>
    </div>
    <Card v-for="card in cards" :key="card.id" v-bind="card" />
    <scale-loader
      v-if="isCardBeingAdded"
      :loading="true"
      color="rgba(139, 92, 246)"
    />
    <CardEditor
      @addCard="addCard"
      @close="isEditing = false"
      v-if="isEditing"
    />
    <CardAddButton @click="isEditing = true" v-else />
  </div>
</template>

<script>
import { useMutation } from "@vue/apollo-composable";
import { AddCard, addCard } from "../graphql";

import Card from "./Card";
import CardAddButton from "./CardAddButton";
import CardEditor from "./CardEditor";

export default {
  components: {
    Card,
    CardAddButton,
    CardEditor,
  },

  data() {
    return {
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
    cards: {
      type: Array,
      required: false,
      default: () => [],
    },
  },

  methods: {
    addCard({ title }) {
      addCard(this.cardAdder, title, this.id, {
        order: this.cards.length + 1,
        callback: () => {
          this.$toast.success("Successfully added a new card!", {
            position: "top-right",
          });
        },
      });
    },
  },

  setup() {
    const { mutate: cardAdder, loading: isCardBeingAdded } = useMutation(
      AddCard
    );
    return { cardAdder, isCardBeingAdded };
  },
};
</script>

<style>
.list {
  width: 250px;
  box-shadow: 2px 2px 0 rgba(9, 30, 66, 0.25);
}
</style>
