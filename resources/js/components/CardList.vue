<template>
  <div class="card-list">
    <div class="flex justify-between">
      <h3 class="card-list-header">{{ title }}</h3>
    </div>

    <div class="card-list-content">
      <Card
        class="card-list-card"
        v-for="card in cards"
        :key="card.id"
        v-bind="card"
        @removed="cardRemoved"
        @edited="cardUpdated"
        @editor-toggled="cardEditorToggled({ ...$event, card })"
      />

      <scale-loader
        v-if="addingCard"
        :loading="true"
        :size="8"
        color="rgba(139, 92, 246)"
      />

      <CardEditor
        v-if="isEditing"
        buttonText="Edit card"
        @edited="cardAdded"
        @closed="isEditing = false"
      />

      <icon-button
        class="card-list-new-button"
        v-else
        text="Add new card"
        :src="addIcon"
        alt="Add card"
        @click="isEditing = true"
      />
    </div>
  </div>
</template>

<script>
import { useMutation } from "@vue/apollo-composable";

import { actions } from "../utils";
import { AddCard, RemoveCard, UpdateCard } from "../graphql";

import Card from "./Card";
import CardEditor from "./CardEditor";

import { AddIcon } from "../../assets";

export default {
  components: {
    Card,
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

  emits: ["card-added", "card-removed", "card-updated"],

  methods: {
    /**
     * Gets called whenever a card gets added.
     *
     * @param {{ title: String }} card
     * Required information to add a new card.
     */
    cardAdded({ title }) {
      const addAction = this.createAction({
        mutator: this.cardAdder,
        action: actions.CARD_ADDED,
        dataParser: ({ cardAdd }) => cardAdd,
        variables: { title, listId: this.id, order: this.newOrder },
        message: "Succesfully added a new card!",
      });
      addAction("card-added");
    },

    /**
     * Gets called whenever a card gets removed from
     * a child Card component.
     *
     * @param {{ id: Number }} card
     * Required information to delete a card.
     */
    cardRemoved({ id }) {
      const removeAction = this.createAction({
        mutator: this.cardRemover,
        action: actions.CARD_REMOVED,
        dataParser: ({ cardRemove }) => cardRemove,
        variables: { id },
        message: "Successfully removed a card!",
      });
      removeAction("card-removed");
    },

    /**
     * Gets called whenever a card gets updated from
     * a child Card component.
     *
     * @param {{ id: Number, title: String }} card
     * Required information to update a card.
     */
    cardUpdated({ id, title }) {
      const updateAction = this.createAction({
        mutator: this.cardUpdater,
        action: actions.CARD_UPDATED,
        dataParser: ({ cardUpdate }) => cardUpdate,
        variables: { id, title },
        message: "Successfully updated a card!",
      });
      updateAction("card-updated");
    },

    /**
     *
     * Initializes and returns a new action based on the
     * given options.
     *
     * @param {{
     *    mutator: MutateFunction<any, any>,
     *    action: String,
     *    dataParser: (data: Object) => any,
     *    variables: Object,
     *    message: String
     * }} options
     * Options to modify the action with.
     *
     * @returns {(event: String) => void}
     * The action function.
     */
    createAction({ mutator, action, dataParser, variables, message }) {
      return (event) =>
        mutator(
          { ...variables },
          {
            update: (store, { data }) => {
              this.$emit(event, {
                type: action,
                store,
                data: dataParser(data),
                listId: this.id,
              });

              message && this.showSuccess(message);
            },
          }
        );
    },

    /**
     * Gets called whenever one of the card specific
     * editors gets toggled.
     */
    cardEditorToggled({ card, state }) {
      console.log({ card, state });
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

  created() {
    this.addIcon = AddIcon;
  },

  setup() {
    const { mutate: cardAdder, loading: addingCard } = useMutation(AddCard);
    const { mutate: cardUpdater, loading: updatingCard } = useMutation(
      UpdateCard
    );
    const { mutate: cardRemover, loading: removingCard } = useMutation(
      RemoveCard
    );

    return {
      cardAdder,
      addingCard,
      cardRemover,
      removingCard,
      cardUpdater,
      updatingCard,
    };
  },
};
</script>

<style scoped lang="postcss">
.card-list {
  width: 250px;
  box-shadow: 2px 2px 0 rgba(9, 30, 66, 0.25);
  @apply bg-gray-200 rounded-sm p-1 mr-2 border-gray-700;
}

.card-list-header {
  font-family: "Akaya Telivigala", cursive;
  @apply text-gray-800 p-1 font-bold;
}

.card-list-content {
  @apply p-1;
}

.card-list-card {
  @apply my-2;
}

.card-list-new-button {
  @apply w-full text-left;
}
</style>
