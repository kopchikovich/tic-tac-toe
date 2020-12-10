const getPairs = (arr) => {
  if (arr.length <= 2 || !Array.isArray(arr)) {
    return arr;
  }
  const pairs = [];
  const lastIndex = arr.length - 1;
  for (let item of arr) {
    const firstIndex = arr.indexOf(item);
    if (firstIndex === lastIndex) break;
    arr.forEach((_, secondIndex) => {
      if (firstIndex >= secondIndex) return;
      pairs.push([arr[firstIndex], arr[secondIndex]]);
    });
  }
  return pairs;
};

export default getPairs;
