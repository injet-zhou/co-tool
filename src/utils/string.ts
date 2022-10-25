export const capitalize = (str = "") => {
  return str.replace(/( |^)[a-z]/g, (L) => L.toUpperCase());
};
export const sentence2CamelCase = (str = "") => {
  const pairs = str.split(/[\s-]/);
  return pairs
    .map((pair, index) => {
      if (index === 0) {
        return pair.toLowerCase();
      }
      return capitalize(pair);
    })
    .join("");
};

export const sentence2SnakeCase = (str = "") => {
  return str.replace(/[\s-]/g, "_").toLowerCase();
};

export const words2CamelCase = (words: string[] = []) => {
  return words
    .map((word, index) => {
      if (index === 0) {
        return word.toLowerCase();
      }
      return capitalize(word);
    })
    .join("");
};

export const words2SnakeCase = (words: string[] = []) => {
  return words.map((word) => word.toLowerCase()).join("_");
};
