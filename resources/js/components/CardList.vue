<template>
  <div class="list bg-gray-300 rounded-sm p-2 mr-2 border-gray-700">
    <div class="flex justify-between">
      <div class="text-gray-800 pl-2 pb-2 font-bold">{{ title }}</div>
    </div>
    <Card
      v-for="card in cards"
      :key="card.id"
      v-bind="card"
      @remove="removeCard"
    />
    <scale-loader
      v-if="isCardBeingAdded"
      :loading="true"
      color="rgba(139, 92, 246)"
    />
    <CardEditor @add="addCard" @close="isEditing = false" v-if="isEditing" />
    <CardAddButton @click="isEditing = true" v-else />
  </div>
</template>

<script>
import { useMutation } from "@vue/apollo-composable";
import { AddCard, RemoveCard } from "../graphql";

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

  emits: ["add-card", "remove-card"],

  methods: {
    addCard({ title }) {
      const { id: listId, newOrder: order } = this;

      this.cardAdder(
        { title, listId, order },
        {
          update: (store, { data: { cardAdd } }) => {
            this.$emit("add-card", { store, data: cardAdd, listId });
            this.showSuccess("Successfully added a new card!");
          },
        }
      );
    },

    removeCard({ id }) {
      this.cardRemover(
        { id },
        {
          update: (store, { data: { cardRemove } }) => {
            this.$emit("remove-card", { store, data: cardRemove });
            this.showSuccess("Successfully removed a card!");
          },
        }
      );
    },

    showSuccess(message) {
      this.$toast.success(message, {
        position: "top-right",
      });
    },
  },

  computed: {
    newOrder: function () {
      return this.cards.length + 1;
    },
  },

  setup() {
    const { mutate: cardAdder, loading: isCardBeingAdded } = useMutation(
      AddCard
    );
    const { mutate: cardRemover, loading: isCardBeinRemoved } = useMutation(
      RemoveCard
    );

    return {
      cardAdder,
      isCardBeingAdded,
      cardRemover,
      isCardBeinRemoved,
    };
  },
};
</script>

<style>
.list {
  width: 250px;
  box-shadow: 2px 2px 0 rgba(9, 30, 66, 0.25);
}
</style>
