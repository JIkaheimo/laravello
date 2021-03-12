//@ts-check

import { GetBoard } from ".";

/**
 * Copies cached query data. Has to be used because
 * returned data does not allow any mutations.
 *
 * @param {Object} data The data to copy.
 * @returns Copied data.
 */
const copify = (data) => JSON.parse(JSON.stringify(data));

/**
 * Executes the given card add mutator.
 *
 * @param {Function} mutator The mutate function.
 * @param {String} title The title of the card.
 * @param {Number} listId The id of the card list.
 * @param {*} options
 */
export const addCard = (
  mutator,
  title,
  listId,
  { order = 1, callback = () => {} }
) => {
  const cardData = { title, listId, order };

  mutator(cardData, {
    update: (cache, { data: { cardAdd } }) => {
      // Get the originally fetched board.
      const { board } = copify(
        cache.readQuery({
          query: GetBoard,
          variables: {
            id: 1,
          },
        })
      );

      // Add new card to the board.
      const list = board.lists.find(({ id }) => id == listId);
      list.cards.push(cardAdd);

      // Update the board.
      cache.writeQuery({ query: GetBoard, data: { board } });

      // Call the callback.
      callback && callback();
    },
  });
};
