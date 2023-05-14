const consoleLog = function (...rest) {
  console.log(this);
  console.log(rest);
  return `currentValue: ${rest[0]}, index: ${rest[1]}, array: [${rest[2]}]`;
};

Array.prototype.testMap = function (callback, thisArg) {
  //this === Array.prototype
  const mappedArr = [];
  for (let i = 0; i < this.length; i++) {
    const mappedValue = callback.call(thisArg || global, this[i], i, this);
    mappedArr[i] = mappedValue;
  }
  return mappedArr;
};

const arr = ["1", "2", "3"];
console.log(arr.testMap(consoleLog, { name: "testMap" }));
console.log(arr.map(consoleLog, { name: "map" }));
