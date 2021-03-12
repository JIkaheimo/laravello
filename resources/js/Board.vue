<template>
  <div class="h-full flex flex-col items-stretch bg-purple-500">
    <div
      class="header text-white flex justify-between items-center mb-2 bg-purple-600"
    >
      <div class="ml-2 w-1/3">x</div>
      <div class="text-lg opacity-50 cursor-pointer hover:opacity-75">
        Laravello
      </div>
      <div class="mr-2 w-1/3 flex justify-end">x</div>
    </div>

    <div class="h-full flex flex-1 flex-col items-stretch">
      <div class="mx-4 mb-2 text-white font-bold text-lg">
        <span v-if="isLoading">Loading board...</span>
        <span v-else>{{ board.title }}</span>
      </div>
      <div v-if="board" class="flex flex-1 items-start overflow-x-auto mx-2">
        <CardList v-for="list in board.lists" :key="list.id" v-bind="list" />
      </div>
    </div>
  </div>
</template>

<script>
import { useQuery, useResult } from "@vue/apollo-composable";

import CardList from "./components/CardList";
import { GetBoard } from "./graphql";

export default {
  components: {
    CardList,
  },
  setup() {
    const { result, loading } = useQuery(GetBoard, { id: 1 });
    const board = useResult(result);
    return { board, isLoading: loading };
  },
};
</script>

<style scoped>
.header {
  height: 3rem;
}
</style>
