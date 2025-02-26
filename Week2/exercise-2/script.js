const longestCollatz = (num) => {
  let counter = 1;
  while (num > 1) {
    if (num % 2 === 0) {
      num /= 2;
    } else if (num % 2 !== 0) {
      num = 3 * num + 1;
    }
    counter++;
  }
  return counter;
};

const findLongestNum = () => {
  let maxNum = 1;
  let maxCollatz = 0;
  for (let i = 1; i < 1000000; i++) {
    let temp = longestCollatz(i);
    if (temp > maxCollatz) {
      maxCollatz = temp;
      maxNum = i;
    }
  }

  return `En uzun zincir değeri : ${maxCollatz} - En büyük sayı değeri : ${maxNum} `;
};

console.log(findLongestNum());
