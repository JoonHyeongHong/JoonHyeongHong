function solution(k, dungeons) {
  let max = Number.MIN_SAFE_INTEGER;

  const tour = (k, dungeons, count) => {
    if (dungeons.length === 0 || k === 0) {
      console.log(count);
      return (max = Math.max(max, count));
    }
    dungeons.forEach((dungeon, idx) => {
      const [need, use] = dungeon;
      if (k >= need) {
        const newDungeons = [...dungeons];
        newDungeons.splice(idx, 1);
        tour(k - use, newDungeons, count + 1);
      }
      return (max = Math.max(max, count));
    });
  };

  tour(k, dungeons, 0);

  return max;
}
