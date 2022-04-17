let arr = [1, 2, 3, 4, 5, 6, 7, 8];

let arr2 = [...arr, 9, 10];

console.log("arr2", arr2);

arr2[5] = 10;

console.log("arr2 affter change", arr2);
console.log("arr", arr);

let obj1 = {
  name: "Nguyen Van A",
  age: 20,
};

let obj2 = {
  age: 30,
  add: "HN",
};

// let obj = {
//   ...obj1,
//   ...obj2,
// };

let obj = {
  name: "Nguyen Van A",
  age: 30,
  add: "HN",
};

console.log(obj);

// let name = obj.name;
// let age = obj.age;
// let add = obj.add;

let { name, age, add } = obj;

console.log(name);
console.log(age);
