//@ts-check

/**
 * Copies cached query data. Has to be used because
 * returned data does not allow any mutations.
 *
 * @param {Object} data The data to copy.
 * @returns Copied data.
 */
export const copify = (data) => JSON.parse(JSON.stringify(data));

/**
 * Executes the given card remove mutator and updates cache.
 * @param {Function} mutator The remove mutator function.
 * @param {Number} id The id of the card to be removed.
 * @param {*} options
 */
export const removeCard = (mutator, id, { callback = () => {} }) => {
  mutator(
    { id },
    {
      update: (cache, { data: { cardRemove } }) => {
        // Execute the callback.
        console.log(cache);
        console.log(cardRemove);

        callback && callback();
      },
    }
  );
};
