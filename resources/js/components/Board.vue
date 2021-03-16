<template>
  <div class="board">
    <h2 v-if="!isLoading" class="board-title">{{ board.title }}</h2>
    <PageLoader v-if="isLoading" color="white" text="Loading board" />
    <div v-if="board" class="board-content">
      <CardList
        v-for="list in board.lists"
        :key="list.id"
        v-bind="list"
        @card-added="updateQueryCache($event)"
        @card-removed="updateQueryCache($event)"
        @card-updated="updateQueryCache($event)"
      />
    </div>
  </div>
</template>

<script>
import { useQuery, useResult } from "@vue/apollo-composable";

import { copify, GetBoard } from "../graphql";
import { actions } from "../utils";

import CardList from "./CardList";
import PageLoader from "./PageLoader";

export default {
  components: {
    CardList,
    PageLoader,
  },

  setup() {
    const { result, loading } = useQuery(GetBoard, { id: 1 });
    const board = useResult(result);
    return { board, isLoading: loading };
  },

  methods: {
    updateQueryCache({ store, listId, data: eventData, type }) {
      // Fetch cached query data.
      const data = copify(
        store.readQuery({
          query: GetBoard,
          variables: { id: +this.board.id },
        })
      );

      const list = data.board.lists.find(({ id }) => id == listId);

      // Perform action.
      switch (type) {
        case actions.CARD_ADDED:
          list.cards.push(eventData);
          break;

        case actions.CARD_REMOVED:
          list.cards = list.cards.filter(({ id }) => id != eventData.id);
          break;

        case actions.CARD_UPDATED:
          list.cards.find(({ id }) => id == eventData.id).title =
            eventData.title;
          break;

        default:
          console.error("Unknown action type: " + type);
      }

      // Update cached query data.
      store.writeQuery({ query: GetBoard, data });
    },
  },
};
</script>

<style scoped lang="postcss">
.board {
  @apply h-full flex flex-1 flex-col items-stretch;
}

.board-title {
  font-family: "Akaya Telivigala", cursive;
  @apply mx-4 mb-2 text-white font-bold text-xl;
}

.board-content {
  @apply flex flex-1 items-start overflow-x-auto mx-2;
}
</style>
