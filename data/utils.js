// src/utils.js
export const getRandomCategories = (categories) => {
    let shuffled = categories.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 3);
  };
  